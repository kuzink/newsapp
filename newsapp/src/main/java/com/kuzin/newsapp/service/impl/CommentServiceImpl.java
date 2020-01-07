package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.PageDto;
import com.kuzin.newsapp.dto.PagedResponse;
import com.kuzin.newsapp.entity.Comment;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.repository.CommentRepository;
import com.kuzin.newsapp.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

	private CommentRepository commentRepository;
	private PostService postService;
	private AvatarService avatarService;
	private UserProfileService userProfileService;
	private SecurityContextService securityContextService;

	public CommentServiceImpl(CommentRepository commentRepository, PostService postService, AvatarService avatarService,
	                          UserProfileService userProfileService, SecurityContextService securityContextService) {
		this.commentRepository = commentRepository;
		this.postService = postService;
		this.userProfileService = userProfileService;
		this.securityContextService = securityContextService;
		this.avatarService = avatarService;
	}

	@Override
	public PagedResponse<Comment> getComments(Long postId, int page, int size) {
		postService.findPost(postId);
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
		Page<Comment> comments = commentRepository.findByPostId(postId, pageable);
		comments.forEach(comment -> {
			comment.setUserFullName(userProfileService.findProfile(comment.getUserId()).getFullName());
			comment.setUserAvatar(avatarService.getAvatar(comment.getUserId()).getAvatar());
		});
		return new PagedResponse<>(comments.getContent(), new PageDto(comments.getSize(),
			comments.getTotalElements(), comments.getTotalPages(), comments.getNumber(), comments.isLast()));
	}

	@Override
	public Comment createComment(Long postId, Comment comment) {
		comment.setPost(postService.findPost(postId));
		comment.setUserId(securityContextService.currentlyLoggedUserId());
		return commentRepository.save(comment);
	}

	@Override
	public Comment updateComment(Long id, Comment updatedComment) {
		Comment comment = findComment(id);
		if (!securityContextService.hasPermission(Permission.ROLE_COMMENT_EDIT) &&
			!comment.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Comment with ID '" + id + "' doesn't belong to you");
		comment.setText(updatedComment.getText());
		return commentRepository.save(comment);
	}

	@Override
	public void deleteComment(Long id) {
		Comment comment = findComment(id);
		if (!securityContextService.hasPermission(Permission.ROLE_COMMENT_DELETE) &&
			!comment.getUserId().equals(securityContextService.currentlyLoggedUserId()))
			throw new NotFoundException("Comment with ID '" + id + "' doesn't belong to you");
		commentRepository.delete(comment);
	}

	private Comment findComment(Long id) {
		return commentRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Comment with ID '" + id + "' doesn't exist"));
	}
}


/*System.out.println("user permissions: " + securityContextService.currentlyLoggedUserPermissions());
		System.out.println("user has permissions 'ROLE_COMMENT_EDIT': " + securityContextService.hasPermission(Permission.ROLE_COMMENT_EDIT));
		System.out.println("user is owner of the comment: " + comment.getUserId().equals(securityContextService.currentlyLoggedUserId()));*/