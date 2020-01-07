package com.kuzin.newsapp.exception;

public class UsernameExistsResponse {

	private String notUnique;

	public UsernameExistsResponse(String notUnique) {
		this.notUnique = notUnique;
	}

	public String getNotUnique() {
		return notUnique;
	}

	public void setNotUnique(String notUnique) {
		this.notUnique = notUnique;
	}
}
