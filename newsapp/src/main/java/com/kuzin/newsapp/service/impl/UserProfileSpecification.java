package com.kuzin.newsapp.service.impl;

import com.kuzin.newsapp.dto.UserProfileSearchFilter;
import com.kuzin.newsapp.entity.UserProfile;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class UserProfileSpecification implements Specification<UserProfile> {

	private UserProfileSearchFilter filter;

	public UserProfileSpecification(UserProfileSearchFilter filter) {
		this.filter = filter;
	}

	@Override
	public Predicate toPredicate(Root<UserProfile> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
		List<Predicate> result = new ArrayList<>();

		if (StringUtils.hasText(filter.getFirstName()))
			result.add(cb.like(root.get("firstName"), "%" + filter.getFirstName().trim() + "%"));

		if (StringUtils.hasText(filter.getLastName()))
			result.add(cb.like(root.get("lastName"), "%" + filter.getLastName().trim() + "%"));

		if (filter.getBirthDateFrom() != null)
			result.add(cb.greaterThanOrEqualTo(root.get("birthDate"), filter.getBirthDateFrom()));

		if (filter.getBirthDateTo() != null)
			result.add(cb.lessThanOrEqualTo(root.get("birthDate"), filter.getBirthDateTo()));

		if (filter.getSex() != null)
			result.add(root.get("sex").in(filter.getSex()));

		return cb.and(result.toArray(new Predicate[0]));
	}
}
