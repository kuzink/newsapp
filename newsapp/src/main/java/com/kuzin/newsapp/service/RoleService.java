package com.kuzin.newsapp.service;

import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.model.Permission;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import java.util.Set;

public interface RoleService {

	// все методы доступны только аут. юзерам
	// совершать действия может только админ ( роль ROLE_MANAGEMENT с пермишенами ROLE_ROLE_READ, ROLE_ROLE_EDIT, ROLE_ROLE_DELETE)

	@PreAuthorize("hasRole('ROLE_ROLE_READ')")
	List<Role> getAllRoles();

	@PreAuthorize("hasRole('ROLE_ROLE_READ')")
	Set<Permission> getAllPermissions();

	@PreAuthorize("hasRole('ROLE_ROLE_EDIT') and hasRole('ROLE_ROLE_READ')")
	Role createRole(Role role);

	@PreAuthorize("hasRole('ROLE_ROLE_EDIT') and hasRole('ROLE_ROLE_READ')")
	Role updateRole(Long id, Role updatedRole);

	@PreAuthorize("hasRole('ROLE_ROLE_DELETE') and hasRole('ROLE_ROLE_READ')")
	void deleteRole(Long id);
}
