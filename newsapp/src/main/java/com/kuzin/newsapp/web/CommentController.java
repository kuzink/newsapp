package com.kuzin.newsapp.web;

import com.kuzin.newsapp.dto.PagedResponse;
import com.kuzin.newsapp.entity.Comment;
import com.kuzin.newsapp.service.CommentService;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("api/comments")
@CrossOrigin
public class CommentController {

	private CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

	@GetMapping("/post/{postId}")
	public PagedResponse<Comment> getComments(@PathVariable Long postId,
	                                          @RequestParam(value = "page", defaultValue = "0") int page,
	                                          @RequestParam(value = "size", defaultValue = "5") int size) {
		return commentService.getComments(postId, page, size);
	}

	@PostMapping("/{postId}")
	public Comment createComment(@PathVariable Long postId, @Valid @RequestBody Comment comment) {
		return commentService.createComment(postId, comment);
	}

	@PatchMapping("/{id}")
	public Comment updateComment(@PathVariable Long id, @Valid @RequestBody Comment comment){
		return commentService.updateComment(id, comment);
	}

	@DeleteMapping("/{id}")
	public void deleteComment(@PathVariable Long id) {
		commentService.deleteComment(id);
	}
}
