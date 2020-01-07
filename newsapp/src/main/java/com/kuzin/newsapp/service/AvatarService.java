package com.kuzin.newsapp.service;

import com.kuzin.newsapp.dto.AvatarResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;

public interface AvatarService {

	AvatarResponse getAvatar(Long userId);

	@PreAuthorize("hasRole('ROLE_AVATAR_EDIT') or #userId == principal.getId()")
	AvatarResponse uploadAvatar(MultipartFile avatar, Long userId);

	@PreAuthorize("hasRole('ROLE_AVATAR_DELETE') or #userId == principal.getId()")
	void deleteAvatar(Long userId);
}
