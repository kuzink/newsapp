package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface VideoRepository extends JpaRepository<Video, Long> {

	Video findFirstByOwnerId(Long postId);
}
