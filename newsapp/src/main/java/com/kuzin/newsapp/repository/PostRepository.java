package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findAllByTitleContainsOrTextContains(String title, String text, Pageable pageable);
}