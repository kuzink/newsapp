package com.kuzin.newsapp.service;

import com.kuzin.newsapp.entity.Video;
import com.kuzin.newsapp.model.VideoResource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {

	// доступен всем
	VideoResource getVideo(String name, HttpHeaders headers);


	VideoResource getFullVideo(String name);



	// нет эндпойнта, исп-ся в PostServiceImpl
	Video getPostVideo(Long postId);

	// юзер может загружать видео только к своему посту
	// админ может загружать видео к любым постам
	Video uploadVideo(MultipartFile file, Long ownerId);

	// юзер может удалять только то видео, которое принажлежит ему
	// админ может удалять любое видео
	void deleteVideo(Long id);
}
