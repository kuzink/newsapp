package com.kuzin.newsapp.validator;

import com.kuzin.newsapp.dto.RegisterRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class RegisterRequestValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return RegisterRequest.class.equals(aClass);
	}

	@Override
	public void validate(Object object, Errors errors) {
		RegisterRequest request = (RegisterRequest) object;
		if (request.getPassword() != null && !request.getPassword().equals(request.getConfirmPassword()))
			errors.rejectValue("confirmPassword", "Match", "Password must match");
	}
}
