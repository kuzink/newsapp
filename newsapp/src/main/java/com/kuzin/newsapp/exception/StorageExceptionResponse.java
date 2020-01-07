package com.kuzin.newsapp.exception;

public class StorageExceptionResponse {

    private String error;

    public StorageExceptionResponse(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
