package com.kuzin.newsapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FileNotFoundException extends RuntimeException {

	public FileNotFoundException(String message) {
		super(message);
	}
}
