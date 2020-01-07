package com.kuzin.newsapp.security;

public interface SecurityConstants {

	String AUTH_URLS = "/api/auth/**";
	String POST_URLS = "/api/posts/**";
	String COMMENT_URLS = "/api/comments/**";
	String IMAGE_URLS = "/api/images/**";
	String VIDEO_URLS = "/api/videos/**";
	String AVATAR_URLS = "/api/avatars/**";
	String ROLE_URLS = "/api/roles/**";

	String SECRET = "SecretKeyToGenJWTs";
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
	long EXPIRATION_TIME = 60_000 * 60 * 24; //1 min * 60 * 24
}
