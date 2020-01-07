package com.kuzin.newsapp.service;

import com.kuzin.newsapp.dto.RegisterRequest;
import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.Set;

public interface UserService {

	User register(RegisterRequest request);

	Boolean isUsernameAvailable(String username);

	@PreAuthorize("hasRole('ROLE_USER_ROLE_EDIT')")
	Set<Role> getUserRoles(Long id);

	@PreAuthorize("hasRole('ROLE_USER_ROLE_EDIT')")
	Set<Role> setRolesToUser(Long id, Long[] roleIds);
}
