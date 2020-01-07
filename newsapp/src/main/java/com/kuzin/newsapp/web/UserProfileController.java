package com.kuzin.newsapp.web;

import com.kuzin.newsapp.dto.UserProfileSearchFilter;
import com.kuzin.newsapp.dto.UserProfileResponse;
import com.kuzin.newsapp.entity.UserProfile;
import com.kuzin.newsapp.service.UserProfileService;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/profiles")
@CrossOrigin
public class UserProfileController {

	private UserProfileService profileService;

	public UserProfileController(UserProfileService profileService) {
		this.profileService = profileService;
	}

	@GetMapping
	public List<UserProfileResponse> getProfiles() {
		return profileService.getProfiles();
	}

	@PostMapping("/search")
	public List<UserProfileResponse> searchByFilter(@RequestBody UserProfileSearchFilter filter) {
		return profileService.searchByFilter(filter);
	}

	@GetMapping("/{id}")
	public UserProfile getProfile(@PathVariable Long id) {
		return profileService.getProfile(id);
	}

	@PatchMapping("/{id}")
	public UserProfile updateProfile(@PathVariable Long id, @Valid @RequestBody UserProfile profile){
		return profileService.updateProfile(id, profile);
	}
}


