package com.kuzin.newsapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kuzin.newsapp.model.Permission;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

	@NotBlank(message ="Name is required")
	@Column(unique = true)
	private String name = "";

	@Enumerated(EnumType.STRING)
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "roles_permissions", joinColumns = @JoinColumn(name = "role_id"))
	@Column(name = "permission")
	private Set<Permission> permissions = new HashSet<>();

	@ManyToMany(mappedBy = "roles")
	@JsonIgnore
	private Set<User> users = new HashSet<>();

	public Role() {
	}

	public Role(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}
