package com.kuzin.newsapp.service;

import com.kuzin.newsapp.dto.UserProfileResponse;
import com.kuzin.newsapp.dto.UserProfileSearchFilter;
import com.kuzin.newsapp.entity.UserProfile;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

public interface UserProfileService {

	// все методы доступны только авт. юзерам
	@PreAuthorize("hasRole('ROLE_USER_PROFILE_READ')")
	List<UserProfileResponse> getProfiles();

	@PreAuthorize("hasRole('ROLE_USER_PROFILE_READ')")
	List<UserProfileResponse> searchByFilter(UserProfileSearchFilter filter);

	@PreAuthorize("hasRole('ROLE_USER_PROFILE_READ') or #id == principal.getId()")
	UserProfile getProfile(Long id);

	// нет эндпойнта, исп-ся в PostServiceImpl и CommentServiceImpl
	UserProfile findProfile(Long id);

	@PreAuthorize("(hasRole('ROLE_USER_PROFILE_READ') and hasRole('ROLE_USER_PROFILE_EDIT')) or #id == principal.getId()")
	UserProfile updateProfile(Long id, UserProfile updatedProfile);
}
