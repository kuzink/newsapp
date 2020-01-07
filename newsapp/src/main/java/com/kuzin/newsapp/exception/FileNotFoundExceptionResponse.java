package com.kuzin.newsapp.exception;

public class FileNotFoundExceptionResponse {

	private String fileError;

	public FileNotFoundExceptionResponse(String fileError) {
		this.fileError = fileError;
	}

	public String getFileError() {
		return fileError;
	}

	public void setFileError(String fileError) {
		this.fileError = fileError;
	}
}
