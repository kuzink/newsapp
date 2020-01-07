package com.kuzin.newsapp.service;

import com.kuzin.newsapp.dto.PagedResponse;
import com.kuzin.newsapp.entity.Comment;

public interface CommentService {

	// доступен всем
	PagedResponse<Comment> getComments(Long postId, int page, int size);

	// создавать комменты могут только авт. юзеры
	Comment createComment(Long postId, Comment comment);

	// редактировать комменты могут только авт. юзеры и только свои комменты
	// админ может редактировать любые комменты
	Comment updateComment(Long id, Comment updatedComment);

	// удалять комменты могут только авт. юзеры и только свои комменты
	// админ может удалять любые комменты
	void deleteComment(Long id);
}
