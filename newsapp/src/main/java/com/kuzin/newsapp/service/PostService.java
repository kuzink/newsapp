package com.kuzin.newsapp.service;

import com.kuzin.newsapp.dto.PagedResponse;
import com.kuzin.newsapp.entity.Post;

public interface PostService {

	// доступен всем
	PagedResponse<Post> getPosts(int page, int size, String search);

	// доступен всем
	Post getPost(Long id);

	// создавать посты могут только авт. юзеры
	Post createPost(Post post);

	// редактировать посты могут только авт. юзеры и только свои посты
	// админ может редактировать любые посты
	Post updatePost(Long id, Post updatedPost);

	// удалять посты могут только авт. юзеры и только свои посты
	// админ может удалять любые посты
	void deletePost(Long id);

	// нет эндпойнта, ипсользуется в CommentServiceImpl
	Post findPost(Long id);
}
