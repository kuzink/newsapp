package com.kuzin.newsapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kuzin.newsapp.model.Sex;
import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Entity
@Table(name = "user_profiles")
public class UserProfile extends AbstractEntity {

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Upr_Id")
	@MapsId
	@JsonIgnore
	private User user;

	@Pattern(regexp = "^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$",
		message = "First name is required. First letter must be capital. Size must be between 2 and 20")
	@Column(name = "Upr_First", length = 20)
	private String firstName;

	@Pattern(regexp = "^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$",
		message = "Last name is required. First letter must be capital. Size must be between 2 and 20")
	@Column(name = "Upr_Last", length = 20)
	private String lastName;

	@Column(name = "Upr_Birth_Date", columnDefinition = "DATE")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate birthDate;

	private Sex sex;
	private String country;
	private String city;
	private String aboutMe;

	public UserProfile() {
	}

	public UserProfile(User user, String firstName, String lastName) {
		this.user = user;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public String getFullName() {
		return this.firstName + " " + this.lastName;
	}
}