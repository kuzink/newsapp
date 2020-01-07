package com.kuzin.newsapp.service;

import com.kuzin.newsapp.model.Permission;
import java.util.Set;

public interface SecurityContextService {

	//вспомогательный сервис, методы которого исп-ся в других сервисах
	// кроме currentlyLoggedUserPermissions(),
	// который исп-ся в RoleController для получения списка пермишенов текущего юзера

	Boolean hasPermission(Long userId, Permission... permissions);

	Boolean hasPermission(Long userId);

	Boolean hasPermission(Permission... permissions);

	Long currentlyLoggedUserId();

	Set<Permission> currentlyLoggedUserPermissions();
}
