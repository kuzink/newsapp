package com.kuzin.newsapp.model;

import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;

public class VideoResource {

	private UrlResource video;
	private ResourceRegion region;

	public VideoResource(UrlResource video) {
		this.video = video;
	}

	public VideoResource(UrlResource video, ResourceRegion region) {
		this.video = video;
		this.region = region;
	}

	public UrlResource getVideo() {
		return video;
	}

	public void setVideo(UrlResource video) {
		this.video = video;
	}

	public ResourceRegion getRegion() {
		return region;
	}

	public void setRegion(ResourceRegion region) {
		this.region = region;
	}
}
