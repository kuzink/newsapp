package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface AvatarRepository extends JpaRepository<Avatar, Long> {

	Avatar findFirstByUserId(Long userId);
}
