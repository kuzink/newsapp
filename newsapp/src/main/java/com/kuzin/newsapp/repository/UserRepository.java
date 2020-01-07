package com.kuzin.newsapp.repository;

import com.kuzin.newsapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Optional;

@CrossOrigin
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	@Override
	Optional<User> findById(Long id);

	Boolean existsByUsername(String username);
}
