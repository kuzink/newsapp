package com.kuzin.newsapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post extends AbstractEntity {

	@NotBlank(message ="Title is required")
	@Column(unique = true)
	private String title;

	@Lob
	@NotBlank(message ="Text is required")
	private String text;

	@Column(name = "user_id", nullable = false, updatable = false)
	private Long userId;

	@Column(name = "views_count", columnDefinition="bigint(20) default 0")
	private Long viewsCount = 0L;

	@Transient
	private List<Image> images = new ArrayList<>();

	@Transient
	private Video video;

	@Transient
	private String userFullName;

	@Transient
	private Long commentsCount;

	public Post() {}

	public Post(String title, String text, Long userId) {
		this.title = title;
		this.text = text;
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public Video getVideo() {
		return video;
	}

	public void setVideo(Video video) {
		this.video = video;
	}

	public String getUserFullName() {
		return userFullName;
	}

	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}

	public Long getViewsCount() {
		return viewsCount;
	}

	public void setViewsCount(Long viewsCount) {
		this.viewsCount = viewsCount;
	}

	public Long getCommentsCount() {
		return commentsCount;
	}

	public void setCommentsCount(Long commentsCount) {
		this.commentsCount = commentsCount;
	}
}