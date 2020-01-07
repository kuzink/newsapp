package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin
public interface ImageRepository extends JpaRepository<Image, Long> {

	List<Image> findByOwnerId(Long postId);
}
