package com.kuzin.newsapp.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class RegisterRequest {

    @Pattern(regexp = "^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$",
      message = "First name is required. First letter must be capital. Size must be between 2 and 20")
    private String firstName;

    @Pattern(regexp = "^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$",
      message = "Last name is required. First letter must be capital. Size must be between 2 and 20")
    private String lastName;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "Username is required")
    @Column(unique = true)
    private String username;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String confirmPassword;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
