package com.kuzin.newsapp.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

	//вспомогательный сервис по работе с файлами, методы которого исп-ся в других сервисах

	String store(MultipartFile file);

	String resizeAndStoreImage(MultipartFile file, int width, int height);

	void delete(String uuid);

	byte[] loadAsByteArray(String uuid);
}
