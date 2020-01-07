package com.kuzin.newsapp.web;

import com.kuzin.newsapp.dto.PagedResponse;
import com.kuzin.newsapp.entity.Post;
import com.kuzin.newsapp.service.PostService;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("api/posts")
@CrossOrigin
public class PostController {

	private PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping
	public PagedResponse<Post> getPosts(@RequestParam(value = "page", defaultValue = "0") int page,
	                                    @RequestParam(value = "size", defaultValue = "9") int size,
	                                    @RequestParam(value = "search", defaultValue = "") String search) {
		return postService.getPosts(page, size, search);
	}

	@GetMapping("/{id}")
	public Post getPost(@PathVariable Long id) {
		return postService.getPost(id);
	}

	@PostMapping
	public Post createPost(@Valid @RequestBody Post post){
		return postService.createPost(post);
	}

	@PatchMapping("/{id}")
	public Post updatePost(@PathVariable Long id, @Valid @RequestBody Post post) {
		return postService.updatePost(id, post);
	}

	@DeleteMapping("/{id}")
	public void deletePost(@PathVariable Long id) {
		postService.deletePost(id);
	}
}


