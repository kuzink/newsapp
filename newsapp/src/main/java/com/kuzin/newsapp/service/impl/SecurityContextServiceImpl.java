package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.security.CustomUserDetails;
import com.kuzin.newsapp.service.SecurityContextService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SecurityContextServiceImpl implements SecurityContextService {

	@Override
	public Boolean hasPermission(Long userId, Permission... permissions) {
		return hasPermission(permissions) && hasPermission(userId);
	}

	@Override
	public Boolean hasPermission(Long userId) {
		return currentlyLoggedUserId().equals(userId);
	}

	@Override
	public Boolean hasPermission(Permission... permissions) {
		return currentlyLoggedUserPermissions().containsAll(new HashSet<>(Arrays.asList(permissions)));
	}

	@Override
	public Long currentlyLoggedUserId() {
		return ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
	}

	@Override
	public Set<Permission> currentlyLoggedUserPermissions() {
		return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
			.stream().map(x -> Permission.valueOf(x.getAuthority())).collect(Collectors.toSet());
	}
}
