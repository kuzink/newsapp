package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.RegisterRequest;
import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.entity.User;
import com.kuzin.newsapp.entity.UserProfile;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.exception.UsernameExistsException;
import com.kuzin.newsapp.repository.RoleRepository;
import com.kuzin.newsapp.repository.UserProfileRepository;
import com.kuzin.newsapp.repository.UserRepository;
import com.kuzin.newsapp.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private UserProfileRepository profileRepository;
	private BCryptPasswordEncoder passwordEncoder;
	private RoleRepository roleRepository;

	public UserServiceImpl(UserRepository userRepository, UserProfileRepository profileRepository,
	                       BCryptPasswordEncoder passwordEncoder, RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.profileRepository = profileRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleRepository = roleRepository;
	}

	@Override
	public User register(RegisterRequest request) {
		try {
			User user = userRepository.save(new User(request.getUsername(), passwordEncoder.encode(request.getPassword())));
			profileRepository.save(new UserProfile(user, request.getFirstName(), request.getLastName()));
			return user;
		} catch (Exception e) {
			throw new UsernameExistsException("Username '" + request.getUsername() + "' already exists");
		}
	}

	@Override
	public Boolean isUsernameAvailable(String username){
		return !userRepository.existsByUsername(username);
	}

	@Override
	public Set<Role> getUserRoles(Long id) {
		return findUser(id).getRoles();
	}

	@Override
	public Set<Role> setRolesToUser(Long id, Long[] roleIds) {
		User user = findUser(id);
		Set<Role> roles = new HashSet<>();
		Arrays.stream(roleIds).forEach(x -> roleRepository.findById(x).ifPresent(roles::add));
		user.setRoles(roles);
		return userRepository.save(user).getRoles();
	}

	private User findUser(Long id) {
		return userRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("User with ID '" + id + "' doesn't exist"));
	}
}
