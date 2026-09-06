package com.pandeyjee.portfolio.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private String message;
    private boolean authenticated;

    public AuthResponse() {}

    public AuthResponse(String token, String username, String role, String message, boolean authenticated) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.message = message;
        this.authenticated = authenticated;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String token;
        private String username;
        private String role;
        private String message;
        private boolean authenticated;

        public Builder token(String token) { this.token = token; return this; }
        public Builder username(String username) { this.username = username; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder authenticated(boolean authenticated) { this.authenticated = authenticated; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, username, role, message, authenticated);
        }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean authenticated) { this.authenticated = authenticated; }
}
