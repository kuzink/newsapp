package com.kuzin.newsapp.dto;

import java.util.List;

public class PagedResponse<T> {

	private List<T> content;
	private PageDto page;

	public PagedResponse(List<T> content, PageDto page) {
		this.content = content;
		this.page = page;
	}

	public List<T> getContent() {
		return content;
	}

	public void setContent(List<T> content) {
		this.content = content;
	}

	public PageDto getPage() {
		return page;
	}

	public void setPage(PageDto page) {
		this.page = page;
	}
}
