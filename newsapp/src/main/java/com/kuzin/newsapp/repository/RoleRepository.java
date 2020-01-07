package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

	@Override
		//@Secured("ROLE_ALL_ROLES_READ")
	List<Role> findAll();

	@Override
		//@Secured("ROLE_ALL_ROLES_READ")
	Optional<Role> findById(Long aLong);
}
