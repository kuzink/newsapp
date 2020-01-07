package com.kuzin.newsapp.dto;

import com.kuzin.newsapp.model.Sex;
import java.time.LocalDate;

public class UserProfileSearchFilter {

    private String firstName;
    private String lastName;
    private LocalDate birthDateFrom;
    private LocalDate birthDateTo;
    private Sex sex;
    private boolean withPhoto;

    public UserProfileSearchFilter(String firstName, String lastName, LocalDate birthDateFrom,
                                   LocalDate birthDateTo, Sex sex, boolean withPhoto) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDateFrom = birthDateFrom;
        this.birthDateTo = birthDateTo;
        this.sex = sex;
        this.withPhoto = withPhoto;
    }

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

    public LocalDate getBirthDateFrom() {
        return birthDateFrom;
    }

    public void setBirthDateFrom(LocalDate birthDateFrom) {
        this.birthDateFrom = birthDateFrom;
    }

    public LocalDate getBirthDateTo() {
        return birthDateTo;
    }

    public void setBirthDateTo(LocalDate birthDateTo) {
        this.birthDateTo = birthDateTo;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public boolean isWithPhoto() {
        return withPhoto;
    }

    public void setWithPhoto(boolean withPhoto) {
        this.withPhoto = withPhoto;
    }
}
