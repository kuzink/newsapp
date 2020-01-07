package com.kuzin.newsapp.service;

import com.kuzin.newsapp.entity.Image;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ImageService {

	// доступен всем
	byte[] getImageBytes(String uuid);

	//нет эндпойнта, вызывается в PostServiceImpl
	List<Image> getPostImages(Long postId);

	// загружать картинки могут только авт. юзеры и только к своим постам
	// админ может загружать картинки к любым постам
	List<Image> uploadImages(MultipartFile[] images, Long ownerId);

	// удалять картинки могут только авт. юзеры и только у своих постов
	// админ может удалять картинки у любых постов
	void deleteImage(Long id);
}
