package com.kuzin.newsapp.web;

import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.service.RoleService;
import com.kuzin.newsapp.service.SecurityContextService;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/roles")
@CrossOrigin
public class RoleController {

	private RoleService roleService;
	private SecurityContextService securityContextService;

	public RoleController(RoleService roleService, SecurityContextService securityContextService) {
		this.roleService = roleService;
		this.securityContextService = securityContextService;
	}

	@GetMapping
	public List<Role> getAllRoles() {
		return roleService.getAllRoles();
	}

	@GetMapping("/permissions")
	public Set<Permission> getAllPermissions() {
		return roleService.getAllPermissions();
	}

	@GetMapping("/currentPermissions")
	public Set<Permission> getCurrentPermissions() {
		return securityContextService.currentlyLoggedUserPermissions();
	}

	@PostMapping
	public Role createRole(@Valid @RequestBody Role role) {
		return roleService.createRole(role);
	}

	@PatchMapping("/{id}")
	public Role updateRole(@PathVariable Long id, @Valid @RequestBody Role role){
		return roleService.updateRole(id, role);
	}

	@DeleteMapping("/{id}")
	public void deleteRole(@PathVariable Long id) {
		roleService.deleteRole(id);
	}
}
