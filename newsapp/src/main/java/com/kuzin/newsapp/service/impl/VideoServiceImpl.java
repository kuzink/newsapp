package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.entity.Post;
import com.kuzin.newsapp.entity.Video;
import com.kuzin.newsapp.exception.FileNotFoundException;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.exception.StorageException;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.model.VideoResource;
import com.kuzin.newsapp.repository.PostRepository;
import com.kuzin.newsapp.repository.VideoRepository;
import com.kuzin.newsapp.service.SecurityContextService;
import com.kuzin.newsapp.service.StorageService;
import com.kuzin.newsapp.service.VideoService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Objects;
import static com.kuzin.newsapp.util.AppConstants.SUPPORTED_VIDEO_TYPES;

@Service
public class VideoServiceImpl implements VideoService {

	@Value("${video.location}")
	private String videoLocation;
	private VideoRepository videoRepository;
	private PostRepository postRepository;
	private StorageService storageService;
	private SecurityContextService securityContextService;

	public VideoServiceImpl(VideoRepository videoRepository, PostRepository postRepository,
	                        StorageService storageService, SecurityContextService securityContextService) {
		this.videoRepository = videoRepository;
		this.postRepository = postRepository;
		this.storageService = storageService;
		this.securityContextService = securityContextService;
	}

	@Override
	public Video uploadVideo(MultipartFile file, Long ownerId) {
		String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
		if (file.isEmpty() || !SUPPORTED_VIDEO_TYPES.contains(file.getContentType()))
			throw new StorageException("Failed to store file " + fileName  + ". File is empty or of unsupported type");

		Post post = postRepository.findById(ownerId)
			.orElseThrow(() -> new NotFoundException("Post with ID '" + ownerId + "' doesn't exist"));
		if (!securityContextService.hasPermission(Permission.ROLE_VIDEO_EDIT) &&
			!post.getUserId().equals(securityContextService.currentlyLoggedUserId()))
		throw new NotFoundException("Post with ID '" + ownerId + "' doesn't belong to you");

		Video video = videoRepository.findFirstByOwnerId(ownerId);
		if (video != null) deleteVideo(video.getId());
		return videoRepository.save(
			new Video(
				storageService.store(file),
				fileName,
				file.getContentType(),
				file.getSize(),
				securityContextService.currentlyLoggedUserId(),
				ownerId
			)
		);
	}

	@Override
	public void deleteVideo(Long id) {
		Video video = videoRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Video with ID '" + id + "' doesn't exist"));

		if (!securityContextService.hasPermission(Permission.ROLE_VIDEO_DELETE) &&
			!video.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Video with ID '" + id + "' doesn't belong to you");

		storageService.delete(video.getUUID());
		videoRepository.deleteById(id);
	}

	@Override
	public VideoResource getFullVideo(String name) {
		return new VideoResource(getFile(name));
	}

	@Override
	public VideoResource getVideo(String name, HttpHeaders headers) {
		UrlResource video = getFile(name);
		ResourceRegion region = resourceRegion(video, headers);
		return new VideoResource(video, region);
	}

	@Override
	public Video getPostVideo(Long postId) {
		return videoRepository.findFirstByOwnerId(postId);
	}

	private UrlResource getFile(String name) {
		try {
			UrlResource	video = new UrlResource("file:" + videoLocation + "/" + name);
			if (!video.exists())
				throw new FileNotFoundException("File '" + name + "' doesn't exist");
			return video;
		} catch (MalformedURLException e) {
			throw new FileNotFoundException("File '" + name + "' doesn't exist");
		}
	}

	private ResourceRegion resourceRegion(UrlResource video, HttpHeaders headers) {
		try {
			long contentLength = video.contentLength();
			if (headers.getRange().size() > 0) {
				HttpRange range = headers.getRange().get(0);
				long start = range.getRangeStart(contentLength);
				long end = range.getRangeEnd(contentLength);
				long rangeLength = Long.min(1024 * 1024, end - start + 1);
				return new ResourceRegion(video, start, rangeLength);
			} else {
				long rangeLength = Long.min(1024 * 1024, contentLength);
				return new ResourceRegion(video, 0, rangeLength);
			}
		} catch (IOException e) {
			throw new FileNotFoundException("File '" + video.getFilename() + "' doesn't exist");
		}
	}
}
