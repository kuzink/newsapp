package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.*;
import com.kuzin.newsapp.entity.Post;
import com.kuzin.newsapp.entity.Video;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.repository.CommentRepository;
import com.kuzin.newsapp.repository.PostRepository;
import com.kuzin.newsapp.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

	private PostRepository postRepository;
	private CommentRepository commentRepository;
	private ImageService imageService;
	private VideoService videoService;
	private UserProfileService userProfileService;
	private SecurityContextService securityContextService;

	public PostServiceImpl(PostRepository postRepository, CommentRepository commentRepository,
	                       ImageService imageService, VideoService videoService,
	                       UserProfileService userProfileService, SecurityContextService securityContextService) {
		this.postRepository = postRepository;
		this.commentRepository = commentRepository;
		this.imageService = imageService;
		this.videoService = videoService;
		this.userProfileService = userProfileService;
		this.securityContextService = securityContextService;
	}

	@Override
	public PagedResponse<Post> getPosts(int page, int size, String search) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
		Page<Post> posts = search.trim().isEmpty()
			? postRepository.findAll(pageable)
			: postRepository.findAllByTitleContainsOrTextContains(search, search, pageable);

		posts.forEach(post -> {
			post.setImages(imageService.getPostImages(post.getId()));
			post.setUserFullName(userProfileService.findProfile(post.getUserId()).getFullName());
			post.setCommentsCount(commentRepository.countByPostId(post.getId()));
		});
		return new PagedResponse<>(posts.getContent(), new PageDto(posts.getSize(),
			posts.getTotalElements(), posts.getTotalPages(), posts.getNumber(), posts.isLast()));
	}

	@Override
	public Post getPost(Long id) {
		Post post = findPost(id);
		post.setViewsCount(post.getViewsCount() + 1L);
		postRepository.save(post);
		post.setImages(imageService.getPostImages(id));
		post.setVideo(videoService.getPostVideo(id));
		post.setUserFullName(userProfileService.findProfile(post.getUserId()).getFullName());
		return post;
	}

	@Override
	public Post createPost(Post post) {
		post.setUserId(securityContextService.currentlyLoggedUserId());
		return postRepository.save(post);
	}

	@Override
	public Post updatePost(Long id, Post updatedPost) {
		Post post = findPost(id);

		if (!securityContextService.hasPermission(Permission.ROLE_POST_EDIT) &&
			!post.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Post with ID '" + id + "' doesn't belong to you");

		post.setTitle(updatedPost.getTitle());
		post.setText(updatedPost.getText());
		return postRepository.save(post);
	}

	@Override
	public void deletePost(Long id) {
		Post post = findPost(id);

		if (!securityContextService.hasPermission(Permission.ROLE_POST_DELETE) &&
			!post.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Post with ID '" + id + "' doesn't belong to you");

		commentRepository.deleteByPost(post);
		imageService.getPostImages(id).forEach(img -> imageService.deleteImage(img.getId()));
		Video video = videoService.getPostVideo(id);
		if (video != null) videoService.deleteVideo(video.getId());
		postRepository.deleteById(id);
	}

	@Override
	public Post findPost(Long id) {
		return postRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Post with ID '" + id + "' doesn't exist"));
	}
}
