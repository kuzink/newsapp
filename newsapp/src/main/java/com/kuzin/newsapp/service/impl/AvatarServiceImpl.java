package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.AvatarResponse;
import com.kuzin.newsapp.entity.Avatar;
import com.kuzin.newsapp.exception.StorageException;
import com.kuzin.newsapp.repository.AvatarRepository;
import com.kuzin.newsapp.service.AvatarService;
import com.kuzin.newsapp.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.util.Objects;
import static com.kuzin.newsapp.util.AppConstants.SUPPORTED_AVATAR_TYPES;

@Service
@Transactional
public class AvatarServiceImpl implements AvatarService {

	private AvatarRepository avatarRepository;
	private StorageService storageService;

	public AvatarServiceImpl(AvatarRepository avatarRepository, StorageService storageService) {
		this.avatarRepository = avatarRepository;
		this.storageService = storageService;
	}

	@Override
	public AvatarResponse getAvatar(Long userId) {
		Avatar avatar = avatarRepository.findFirstByUserId(userId);
		if (avatar != null)
			return new AvatarResponse(storageService.loadAsByteArray(avatar.getUUID()));
		return new AvatarResponse();
	}

	@Override
	public AvatarResponse uploadAvatar(MultipartFile avatar, Long userId) {
		String name = StringUtils.cleanPath(Objects.requireNonNull(avatar.getOriginalFilename()));
		if (avatar.isEmpty() || !SUPPORTED_AVATAR_TYPES.contains(avatar.getContentType()))
			throw new StorageException("Failed to store file " + name + ". File is empty or of unsupported type");
		deleteAvatar(userId);
		avatarRepository.save(new Avatar(storageService.resizeAndStoreImage(avatar, 100, 100), userId));
		return getAvatar(userId);
	}

	@Override
	public void deleteAvatar(Long userId) {
		Avatar avatar = avatarRepository.findFirstByUserId(userId);
		if (avatar != null) {
			storageService.delete(avatar.getUUID());
			avatarRepository.deleteById(avatar.getId());
		}
	}
}
