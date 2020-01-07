package com.kuzin.newsapp.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.persistence.RollbackException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.*;

@ControllerAdvice
@RestController
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
	                                                              HttpHeaders headers,
	                                                              HttpStatus status, WebRequest request) {
		Map<String, String> errors = new HashMap<>();

		for (FieldError error : ex.getBindingResult().getFieldErrors())
			errors.put(error.getField(), error.getDefaultMessage());

		return new ResponseEntity<>(errors, headers, status);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleProjectIdException(NotFoundException ex) {
		return new ResponseEntity<>(new NotFoundExceptionResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleStorageException(StorageException ex) {
		return new ResponseEntity<>(new StorageExceptionResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleFileNotFoundException(FileNotFoundException ex) {
		return new ResponseEntity<>(new FileNotFoundExceptionResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleUsernameExistsException(UsernameExistsException ex) {
		return new ResponseEntity<>(new UsernameExistsResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public final ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
		return new ResponseEntity<>(new StorageExceptionResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
	}


	//TODO use Validator with reject value to throw those Exceptions

	@ExceptionHandler
	protected ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
		Map<String, String> errors = new HashMap<>();

		for (ConstraintViolation<?> error : ex.getConstraintViolations()) {
			errors.put(error.getPropertyPath().toString(), error.getMessage());
		}

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	protected ResponseEntity<Object> handleTransactionException(TransactionSystemException ex) throws Throwable {
		Throwable cause = ex.getCause();
		if (!(cause instanceof RollbackException)) throw cause;
		if (!(cause.getCause() instanceof ConstraintViolationException)) throw cause.getCause();

		ConstraintViolationException exception = (ConstraintViolationException) cause.getCause();

		Map<String, String> errors = new HashMap<>();

		for (ConstraintViolation<?> error : exception.getConstraintViolations()) {
			errors.put(error.getPropertyPath().toString(), error.getMessage());
		}

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	protected ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) throws Throwable {
		Map<String, String> errors = new HashMap<>();
		errors.put("title", "Post with this title already exists");

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}
}
