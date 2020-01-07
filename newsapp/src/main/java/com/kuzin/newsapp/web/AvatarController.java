package com.kuzin.newsapp.web;

import com.kuzin.newsapp.service.AvatarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/avatars")
@CrossOrigin
public class AvatarController {

	private AvatarService avatarService;

	public AvatarController(AvatarService avatarService) {
		this.avatarService = avatarService;
	}

	@GetMapping("/{userId}")
	public ResponseEntity<?> getAvatar(@PathVariable Long userId) {
		return new ResponseEntity<>(avatarService.getAvatar(userId), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> uploadAvatar(@RequestParam("avatar") MultipartFile avatar,
	                                      @RequestParam("userId") Long userId) {
		return new ResponseEntity<>(avatarService.uploadAvatar(avatar, userId), HttpStatus.OK);
	}

	@DeleteMapping("/{userId}")
	public void deleteAvatar(@PathVariable Long userId) {
		avatarService.deleteAvatar(userId);
	}
}
