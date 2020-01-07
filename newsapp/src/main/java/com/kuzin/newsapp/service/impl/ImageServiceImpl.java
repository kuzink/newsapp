package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.entity.Image;
import com.kuzin.newsapp.entity.Post;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.exception.StorageException;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.repository.ImageRepository;
import com.kuzin.newsapp.repository.PostRepository;
import com.kuzin.newsapp.service.ImageService;
import com.kuzin.newsapp.service.SecurityContextService;
import com.kuzin.newsapp.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import static com.kuzin.newsapp.util.AppConstants.SUPPORTED_IMAGE_TYPES;

@Service
public class ImageServiceImpl implements ImageService {

	private ImageRepository imageRepository;
	private StorageService storageService;
	private PostRepository postRepository;
	private SecurityContextService securityContextService;

	public ImageServiceImpl(ImageRepository imageRepository, StorageService storageService,
	                        PostRepository postRepository, SecurityContextService securityContextService) {
		this.imageRepository = imageRepository;
		this.storageService = storageService;
		this.postRepository = postRepository;
		this.securityContextService = securityContextService;
	}

	@Override
	public byte[] getImageBytes(String uuid) {
		return storageService.loadAsByteArray(uuid);
	}

	@Override
	public List<Image> getPostImages(Long postId) {
		List<Image> images = imageRepository.findByOwnerId(postId);
		images.forEach(img -> img.setThumbnail(storageService.loadAsByteArray(img.getThumbnailUUID())));
		return images;
	}

	@Override
	public List<Image> uploadImages(MultipartFile[] images, Long ownerId) {
		Post post = postRepository.findById(ownerId)
			.orElseThrow(() -> new NotFoundException("Post with ID '" + ownerId + "' doesn't exist"));

		if (!securityContextService.hasPermission(Permission.ROLE_IMAGE_EDIT) &&
			!post.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Post with ID '" + ownerId + "' doesn't belong to you");

		return Arrays
			.stream(images)
			.map(image -> uploadImage(image, ownerId))
			.collect(Collectors.toList());
	}

	@Override
	public void deleteImage(Long id) {
		Image image = imageRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Image with ID '" + id + "' doesn't exist"));

		if (!securityContextService.hasPermission(Permission.ROLE_IMAGE_DELETE) &&
			!image.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Image with ID '" + id + "' doesn't belong to you");

		storageService.delete(image.getUUID());
		storageService.delete(image.getThumbnailUUID());
		imageRepository.deleteById(id);
	}

	private Image uploadImage(MultipartFile file, Long ownerId) {
		String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
		if (file.isEmpty() || !SUPPORTED_IMAGE_TYPES.contains(file.getContentType()))
			throw new StorageException("Failed to store file " + fileName + ". File is empty or of unsupported type");
		return imageRepository.save(
			new Image(
				storageService.store(file),
				storageService.resizeAndStoreImage(file, 480, 270),
				fileName,
				file.getContentType(),
				file.getSize(),
				securityContextService.currentlyLoggedUserId(),
				ownerId
			)
		);
	}
}
