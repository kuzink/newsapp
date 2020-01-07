package com.kuzin.newsapp.web;

import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{id}/roles")
	public Set<Role> getUserRoles(@PathVariable Long id) {
		return userService.getUserRoles(id);
	}

	@PatchMapping("/{id}/roles")
	public Set<Role> setRolesToUser(@PathVariable Long id, @RequestParam("roleIds") Long[] roleIds) {
		return userService.setRolesToUser(id, roleIds);
	}
}
