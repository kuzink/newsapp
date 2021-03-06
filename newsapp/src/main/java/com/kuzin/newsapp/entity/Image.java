package com.kuzin.newsapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "images")
public class Image extends AbstractEntity {

	@Column(name = "uuid")
	private String UUID;

	@Column(name = "thumbnail_uuid")
	@JsonIgnore
	private String thumbnailUUID;

	private String fileName;

	@JsonIgnore
	private String fileType;

	@JsonIgnore
	private Long fileSize;

	@Column(name = "user_id", nullable = false, updatable = false)
	private Long userId;

	@NotNull
	@Column(name = "owner_Id", nullable = false, updatable = false)
	@JsonIgnore
	private Long ownerId;

	@Transient
	private byte[] thumbnail;

	public Image() {
	}

	public Image(String UUID, String thumbnailUUID, String fileName, String fileType, Long fileSize, Long userId, Long ownerId) {
		this.UUID = UUID;
		this.thumbnailUUID = thumbnailUUID;
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.userId = userId;
		this.ownerId = ownerId;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String UUID) {
		this.UUID = UUID;
	}

	public String getThumbnailUUID() {
		return thumbnailUUID;
	}

	public void setThumbnailUUID(String thumbnailUUID) {
		this.thumbnailUUID = thumbnailUUID;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public byte[] getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
