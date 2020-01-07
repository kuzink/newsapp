package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Comment;
import com.kuzin.newsapp.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findByPostId(Long postId, Pageable pageable);

    @Transactional
    void deleteByPost(Post post);

    Long countByPostId(Long postId);
}