package com.pandeyjee.portfolio.security;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCK_DURATION_MINUTES = 15;

    private static class AttemptRecord {
        int attempts;
        LocalDateTime lockedUntil;

        AttemptRecord(int attempts, LocalDateTime lockedUntil) {
            this.attempts = attempts;
            this.lockedUntil = lockedUntil;
        }
    }

    private final Map<String, AttemptRecord> attemptsCache = new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {
        AttemptRecord record = attemptsCache.get(key);
        if (record == null) {
            return false;
        }
        if (record.lockedUntil != null) {
            if (LocalDateTime.now().isBefore(record.lockedUntil)) {
                return true;
            } else {
                // Lock expired, reset
                attemptsCache.remove(key);
                return false;
            }
        }
        return false;
    }

    public void loginFailed(String key) {
        attemptsCache.compute(key, (k, record) -> {
            if (record == null) {
                return new AttemptRecord(1, null);
            }
            int newAttempts = record.attempts + 1;
            LocalDateTime lock = null;
            if (newAttempts >= MAX_ATTEMPTS) {
                lock = LocalDateTime.now().plusMinutes(LOCK_DURATION_MINUTES);
            }
            return new AttemptRecord(newAttempts, lock);
        });
    }

    public void loginSucceeded(String key) {
        attemptsCache.remove(key);
    }
}
