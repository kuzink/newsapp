package com.kuzin.newsapp.security;

import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.entity.User;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

	private UserRepository userRepository;

	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User with username '" + username + "' not found"));

		return new CustomUserDetails(
			user.getId(),
			user.getUsername(),
			user.getPassword(),
			getAuthorities(user.getRoles()));
	}

	private Set<Permission> getAuthorities(Set<Role> roles) {
		Set<Permission> permissions = new HashSet<>();
		roles.forEach(role -> permissions.addAll(role.getPermissions()));
		return permissions;
	}
}
