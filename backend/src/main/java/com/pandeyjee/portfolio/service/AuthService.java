package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.dto.AuthRequest;
import com.pandeyjee.portfolio.dto.AuthResponse;
import com.pandeyjee.portfolio.security.JwtTokenProvider;
import com.pandeyjee.portfolio.security.LoginAttemptService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final LoginAttemptService loginAttemptService;
    private final AuditLogService auditLogService;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider,
            LoginAttemptService loginAttemptService,
            AuditLogService auditLogService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.loginAttemptService = loginAttemptService;
        this.auditLogService = auditLogService;
    }

    public AuthResponse login(AuthRequest request, String ipAddress, HttpServletResponse response) {
        String rateLimitKey = ipAddress + "_" + request.getUsername();

        if (loginAttemptService.isBlocked(rateLimitKey)) {
            log.warn("Login attempt blocked due to brute-force rate limit for: {}", rateLimitKey);
            throw new BadCredentialsException("Too many failed attempts. Account temporarily locked for 15 minutes.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            loginAttemptService.loginSucceeded(rateLimitKey);

            String role = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("ROLE_ADMIN");

            String token = tokenProvider.generateToken(request.getUsername(), role);

            ResponseCookie cookie = ResponseCookie.from(tokenProvider.getCookieName(), token)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(Duration.ofMillis(tokenProvider.getExpirationMs()))
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            auditLogService.logAction(request.getUsername(), "LOGIN", "ADMIN", request.getUsername(), "Successful login", ipAddress);

            return AuthResponse.builder()
                    .token(token)
                    .username(request.getUsername())
                    .role(role)
                    .message("Authentication successful")
                    .authenticated(true)
                    .build();

        } catch (BadCredentialsException ex) {
            loginAttemptService.loginFailed(rateLimitKey);
            auditLogService.logAction(request.getUsername(), "LOGIN_FAILED", "ADMIN", request.getUsername(), "Invalid credentials", ipAddress);
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    public void logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(tokenProvider.getCookieName(), "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
