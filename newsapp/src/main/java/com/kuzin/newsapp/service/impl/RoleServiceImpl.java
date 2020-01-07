package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.entity.Role;
import com.kuzin.newsapp.exception.NotFoundException;
import com.kuzin.newsapp.exception.UsernameExistsException;
import com.kuzin.newsapp.model.Permission;
import com.kuzin.newsapp.repository.RoleRepository;
import com.kuzin.newsapp.service.RoleService;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RoleServiceImpl implements RoleService {

	private RoleRepository roleRepository;

	public RoleServiceImpl(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	@Override
	public List<Role> getAllRoles(){
		return roleRepository.findAll();
	}

	@Override
	public Set<Permission> getAllPermissions() {
		return new LinkedHashSet<>(Arrays.asList(Permission.values()));
	}

	@Override
	public Role createRole(Role role) {
		try {
			return roleRepository.save(role);
		} catch (Exception e) {
			throw new UsernameExistsException("Role with name '" + role.getName() + "' already exists");
		}
	}

	@Override
	public Role updateRole(Long id, Role updatedRole) {
		Role role = getRole(id);
		role.setName(updatedRole.getName());
		role.setPermissions(updatedRole.getPermissions());
		return createRole(role);
	}

	@Override
	public void deleteRole(Long id) {
		Role role = getRole(id);
		role.getUsers().forEach(user -> user.getRoles().remove(role));
		roleRepository.delete(role);
	}

	private Role getRole(Long id) {
		return roleRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Role with ID '" + id + "' doesn't exist"));
	}
}
