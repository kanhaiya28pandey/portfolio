package com.pandeyjee.portfolio.controller;

import com.pandeyjee.portfolio.dto.AuthRequest;
import com.pandeyjee.portfolio.dto.AuthResponse;
import com.pandeyjee.portfolio.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/auth")
public class AdminAuthController {

    private final AuthService authService;

    public AdminAuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody AuthRequest request,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse) {

        String ip = servletRequest.getHeader("X-Forwarded-For");
        if (ip == null || ip.isBlank()) {
            ip = servletRequest.getRemoteAddr();
        }

        AuthResponse response = authService.login(request, ip, servletResponse);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse servletResponse) {
        authService.logout(servletResponse);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentAdmin(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("authenticated", false));
        }
        return ResponseEntity.ok(Map.of(
                "username", userDetails.getUsername(),
                "role", userDetails.getAuthorities().iterator().next().getAuthority(),
                "authenticated", true
        ));
    }
}
