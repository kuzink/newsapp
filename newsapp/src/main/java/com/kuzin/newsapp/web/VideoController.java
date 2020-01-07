package com.kuzin.newsapp.web;

import com.kuzin.newsapp.model.VideoResource;
import com.kuzin.newsapp.service.VideoService;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/videos")
@CrossOrigin
public class VideoController {

	private VideoService videoService;

	public VideoController(VideoService videoService) {
		this.videoService = videoService;
	}

	@PostMapping
	public ResponseEntity<?> uploadVideo(@RequestParam("video") MultipartFile video,
	                                     @RequestParam("ownerId") Long ownerId) {
		return new ResponseEntity<>(videoService.uploadVideo(video, ownerId), HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public void deleteVideo(@PathVariable Long id) {
		videoService.deleteVideo(id);
	}

	@GetMapping("/{name}/full")
	public ResponseEntity<UrlResource> getFullVideo(@PathVariable String name) {
		VideoResource resource = videoService.getFullVideo(name);
		return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
			.contentType(MediaTypeFactory.getMediaType(resource.getVideo()).orElse(MediaType.APPLICATION_OCTET_STREAM))
			.body(resource.getVideo());
	}

	@GetMapping("/{name}")
	public ResponseEntity<ResourceRegion> getVideo(@PathVariable String name,
	                                               @RequestHeader HttpHeaders headers) {
		VideoResource resource = videoService.getVideo(name, headers);
		return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
			.contentType(MediaTypeFactory.getMediaType(resource.getVideo()).orElse(MediaType.APPLICATION_OCTET_STREAM))
			.body(resource.getRegion());
	}
}
