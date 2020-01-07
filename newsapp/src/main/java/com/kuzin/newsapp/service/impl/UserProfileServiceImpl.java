package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.UserProfileResponse;
import com.kuzin.newsapp.dto.UserProfileSearchFilter;
import com.kuzin.newsapp.entity.UserProfile;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.repository.UserProfileRepository;
import com.kuzin.newsapp.service.AvatarService;
import com.kuzin.newsapp.service.UserProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

	private UserProfileRepository profileRepository;
	private AvatarService avatarService;

	public UserProfileServiceImpl(UserProfileRepository profileRepository, AvatarService avatarService) {
		this.profileRepository = profileRepository;
		this.avatarService = avatarService;
	}

	@Override
	public UserProfile getProfile(Long id) {
		return findProfile(id);
	}

	@Override
	public List<UserProfileResponse> getProfiles() {
		return profileRepository.findAll()
			.stream()
			.map(profile -> new UserProfileResponse(profile.getId(), profile.getFirstName(), profile.getLastName(),
				profile.getBirthDate(), profile.getSex(), avatarService.getAvatar(profile.getId()).getAvatar()))
			.collect(Collectors.toList());
	}

	@Override
	public UserProfile updateProfile(Long id, UserProfile updatedProfile) {
		UserProfile profile = findProfile(id);
		profile.setFirstName(updatedProfile.getFirstName());
		profile.setLastName(updatedProfile.getLastName());
		profile.setBirthDate(updatedProfile.getBirthDate());
		profile.setSex(updatedProfile.getSex());
		profile.setCountry(updatedProfile.getCountry());
		profile.setCity(updatedProfile.getCity());
		profile.setAboutMe(updatedProfile.getAboutMe());
		return profileRepository.save(profile);
	}

	@Override
	public List<UserProfileResponse> searchByFilter(UserProfileSearchFilter filter) {
		//TODO maybe create validator for this check
		if (filter.getBirthDateFrom() != null && filter.getBirthDateTo() != null) {
			if (filter.getBirthDateFrom().isAfter(filter.getBirthDateTo()))
				throw new IllegalArgumentException("Date FROM should be before date TO");
		}

		List<UserProfileResponse> profiles = profileRepository.findAll(new UserProfileSpecification(filter))
			.stream()
			.map(profile -> new UserProfileResponse(
				profile.getId(),
				profile.getFirstName(),
				profile.getLastName(),
				profile.getBirthDate(),
				profile.getSex(),
				avatarService.getAvatar(profile.getId()).getAvatar()))
			.collect(Collectors.toList());

		if (filter.isWithPhoto())
			return profiles.stream().filter(profile -> profile.getAvatar() != null).collect(Collectors.toList());
		return profiles;
	}

	public UserProfile findProfile(Long id) {
		return profileRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Profile with ID '" + id + "' doesn't exist"));
	}
}
