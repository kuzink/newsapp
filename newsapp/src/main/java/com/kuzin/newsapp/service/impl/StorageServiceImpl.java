package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.exception.StorageException;
import com.kuzin.newsapp.service.StorageService;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.PostConstruct;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageServiceImpl implements StorageService {

	private final Path rootLocation;

	public StorageServiceImpl(@Value("${file-storage-location}") String fileStorageLocation) {
		this.rootLocation = Paths.get(fileStorageLocation);
	}

	@Override
	public String store(MultipartFile file) {
		try {
			String uuid = UUID.randomUUID().toString();
			FileUtils.forceMkdir(rootLocation.toFile());
			FileUtils.copyInputStreamToFile(file.getInputStream(), rootLocation.resolve(uuid).toFile());
			return uuid;
		} catch (IOException e) {
			throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
		}
	}

	@Override
	public void delete(String uuid) {
		FileUtils.deleteQuietly(rootLocation.resolve(uuid).toFile());
	}

	@Override
	public byte[] loadAsByteArray(String uuid) {
		File file = rootLocation.resolve(uuid).toFile();
		if (file.exists())
			try {
				return FileUtils.readFileToByteArray(file);
			} catch (IOException e) {
				throw new StorageException("Failed to read file " + uuid, e);
			}
		else throw new StorageException("Failed to read file: " + uuid);
	}

	@Override
	public String resizeAndStoreImage(MultipartFile file, int width, int height) {
		try {
			String uuid = UUID.randomUUID().toString();
			FileUtils.forceMkdir(rootLocation.toFile());
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			Thumbnails.of(file.getInputStream()).size(width, height).toOutputStream(os);
			FileUtils.writeByteArrayToFile(rootLocation.resolve(uuid).toFile(), os.toByteArray());
			return uuid;
		} catch (IOException e) {
			throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
		}
	}

	/*@PostConstruct
	public void deleteImagesDirectoryOnStartUp() {
		try {
			FileUtils.deleteDirectory(rootLocation.toFile());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}*/
}
