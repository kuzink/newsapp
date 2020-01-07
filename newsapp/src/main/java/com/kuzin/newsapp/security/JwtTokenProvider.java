package com.kuzin.newsapp.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import static com.kuzin.newsapp.security.SecurityConstants.EXPIRATION_TIME;
import static com.kuzin.newsapp.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	public String generateToken(Authentication auth) {
		CustomUserDetails customUserDetails = (CustomUserDetails) auth.getPrincipal();

		Date now = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

		Map<String, Object> claims = new HashMap<>();
		claims.put("id", (Long.toString(customUserDetails.getId())));
		claims.put("username", customUserDetails.getUsername());

		return Jwts.builder()
			.setClaims(claims)
			.setSubject(customUserDetails.getUsername())
			.setIssuedAt(now)
			.setExpiration(expiryDate)
			.signWith(SignatureAlgorithm.HS512, SECRET)
			.compact();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			logger.error("SignatureException");
		} catch (MalformedJwtException e) {
			logger.error("MalformedJwtException");
		} catch (ExpiredJwtException e) {
			logger.error("ExpiredJwtException");
		} catch (UnsupportedJwtException e) {
			logger.error("UnsupportedJwtException");
		} catch (IllegalArgumentException e) {
			logger.error("IllegalArgumentException");
		}
		return false;
	}

	public String getUsernameFromJWT(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(SECRET)
			.parseClaimsJws(token)
			.getBody();
		return claims.getSubject();
	}
}
