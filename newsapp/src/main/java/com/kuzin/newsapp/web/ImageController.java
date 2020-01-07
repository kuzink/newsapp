package com.kuzin.newsapp.web;

import com.kuzin.newsapp.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/images")
@CrossOrigin
public class ImageController {

	private ImageService imageService;

	public ImageController(ImageService ImageService) {
		this.imageService = ImageService;
	}

	@GetMapping("/{uuid}")
	public ResponseEntity<?> getImageBytes(@PathVariable String uuid) {
		return ResponseEntity
			.status(HttpStatus.OK)
			.contentType(MediaType.IMAGE_JPEG) //TODO
			.body(imageService.getImageBytes(uuid));
	}

	@PostMapping
	public ResponseEntity<?> uploadImages(@RequestParam("images") MultipartFile[] images,
	                                      @RequestParam("ownerId") Long ownerId) {
		return new ResponseEntity<>(imageService.uploadImages(images, ownerId), HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public void deleteImage(@PathVariable Long id) {
		imageService.deleteImage(id);
	}
}
