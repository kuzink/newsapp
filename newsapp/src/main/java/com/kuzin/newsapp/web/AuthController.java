package com.kuzin.newsapp.web;

import com.kuzin.newsapp.dto.RegisterRequest;
import com.kuzin.newsapp.security.JwtTokenProvider;
import com.kuzin.newsapp.service.UserService;
import com.kuzin.newsapp.validator.RegisterRequestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.kuzin.newsapp.dto.JwtAuthenticationResponse;
import com.kuzin.newsapp.dto.LoginRequest;
import static com.kuzin.newsapp.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/auth")
@CrossOrigin
public class AuthController {

	private UserService userService;
	private RegisterRequestValidator registerRequestValidator;
	private JwtTokenProvider tokenProvider;
	private AuthenticationManager authenticationManager;

	@InitBinder("registerRequest")
	public void addUserValidator(WebDataBinder binder) {
		binder.addValidators(registerRequestValidator);
	}

	public AuthController(UserService userService, RegisterRequestValidator registerRequestValidator,
	                      JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
		this.userService = userService;
		this.registerRequestValidator = registerRequestValidator;
		this.tokenProvider = tokenProvider;
		this.authenticationManager = authenticationManager;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
		return new ResponseEntity<>(userService.register(request), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
		Authentication authentication = authenticationManager
			.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@GetMapping("/isUsernameAvailable")
	public ResponseEntity<?> isUsernameAvailable(@RequestParam(value = "username") String username) {
		return new ResponseEntity<>(userService.isUsernameAvailable(username), HttpStatus.OK);
	}
}
