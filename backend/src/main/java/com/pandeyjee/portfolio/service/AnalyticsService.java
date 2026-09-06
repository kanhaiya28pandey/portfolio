package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.entity.VisitorLog;
import com.pandeyjee.portfolio.repository.ContactMessageRepository;
import com.pandeyjee.portfolio.repository.VisitorLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnalyticsService {

    private final VisitorLogRepository visitorLogRepository;
    private final ContactMessageRepository contactMessageRepository;

    public AnalyticsService(VisitorLogRepository visitorLogRepository, ContactMessageRepository contactMessageRepository) {
        this.visitorLogRepository = visitorLogRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public void trackVisit(String ipAddress, String userAgent, String referrer, String pagePath) {
        String deviceType = "Desktop";
        String browser = "Other";
        String os = "Other";

        if (userAgent != null) {
            String ua = userAgent.toLowerCase();

            // Detect Device
            if (ua.contains("ipad") || ua.contains("tablet")) {
                deviceType = "Tablet";
            } else if (ua.contains("mobile") || ua.contains("android") || ua.contains("iphone")) {
                deviceType = "Mobile";
            }

            // Detect Browser
            if (ua.contains("edg/") || ua.contains("edge/")) {
                browser = "Edge";
            } else if (ua.contains("opr/") || ua.contains("opera")) {
                browser = "Opera";
            } else if (ua.contains("chrome") && !ua.contains("edg/")) {
                browser = "Chrome";
            } else if (ua.contains("safari") && !ua.contains("chrome")) {
                browser = "Safari";
            } else if (ua.contains("firefox")) {
                browser = "Firefox";
            }

            // Detect OS
            if (ua.contains("windows")) {
                os = "Windows";
            } else if (ua.contains("iphone") || ua.contains("ipad") || ua.contains("ios")) {
                os = "iOS";
            } else if (ua.contains("android")) {
                os = "Android";
            } else if (ua.contains("mac os") || ua.contains("macintosh")) {
                os = "MacOS";
            } else if (ua.contains("linux")) {
                os = "Linux";
            }
        }

        VisitorLog log = VisitorLog.builder()
                .ipAddress(ipAddress != null ? ipAddress : "127.0.0.1")
                .userAgent(userAgent != null && userAgent.length() > 490 ? userAgent.substring(0, 490) : userAgent)
                .deviceType(deviceType)
                .browser(browser)
                .operatingSystem(os)
                .referrer(referrer != null && referrer.length() > 490 ? referrer.substring(0, 490) : referrer)
                .pagePath(pagePath != null ? pagePath : "/")
                .visitedAt(LocalDateTime.now())
                .build();

        visitorLogRepository.save(log);
    }

    public Map<String, Object> getAnalyticsSummary() {
        Map<String, Object> summary = new HashMap<>();

        long totalVisits = visitorLogRepository.count();
        long uniqueVisitors = visitorLogRepository.countDistinctIp();

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        long todayVisits = visitorLogRepository.countByVisitedAtAfter(todayStart);

        LocalDateTime weekStart = LocalDate.now().minusDays(7).atStartOfDay();
        long thisWeekVisits = visitorLogRepository.countByVisitedAtAfter(weekStart);

        long totalInquiries = contactMessageRepository.count();
        double conversionRate = totalVisits > 0 ? ((double) totalInquiries / (double) totalVisits) * 100.0 : 0.0;

        List<VisitorLog> recentLogs = visitorLogRepository.findTop100ByOrderByVisitedAtDesc();

        // Device Breakdown
        Map<String, Long> deviceBreakdown = recentLogs.stream()
                .collect(Collectors.groupingBy(VisitorLog::getDeviceType, Collectors.counting()));

        // Browser Breakdown
        Map<String, Long> browserBreakdown = recentLogs.stream()
                .collect(Collectors.groupingBy(VisitorLog::getBrowser, Collectors.counting()));

        // Daily visits for last 7 days
        List<Map<String, Object>> dailyVisits = new ArrayList<>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM dd");
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.plusDays(1).atStartOfDay();

            long count = recentLogs.stream()
                    .filter(v -> v.getVisitedAt().isAfter(start) && v.getVisitedAt().isBefore(end))
                    .count();

            Map<String, Object> dayMap = new HashMap<>();
            dayMap.put("date", date.format(dtf));
            dayMap.put("count", count);
            dailyVisits.add(dayMap);
        }

        summary.put("totalVisits", totalVisits);
        summary.put("uniqueVisitors", uniqueVisitors);
        summary.put("todayVisits", todayVisits);
        summary.put("thisWeekVisits", thisWeekVisits);
        summary.put("totalInquiries", totalInquiries);
        summary.put("conversionRate", Math.round(conversionRate * 10.0) / 10.0);
        summary.put("deviceBreakdown", deviceBreakdown);
        summary.put("browserBreakdown", browserBreakdown);
        summary.put("dailyVisits", dailyVisits);
        summary.put("recentVisitors", recentLogs);

        return summary;
    }

    public List<VisitorLog> getAllVisitors() {
        return visitorLogRepository.findAllByOrderByVisitedAtDesc();
    }

    public void deleteVisitor(Long id) {
        visitorLogRepository.deleteById(id);
    }

    public void deleteVisitorsBatch(List<Long> ids) {
        visitorLogRepository.deleteAllById(ids);
    }

    public void deleteVisitorsOlderThan(int days) {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(days);
        visitorLogRepository.deleteByVisitedAtBefore(cutoff);
    }

    public void clearAllVisitors() {
        visitorLogRepository.deleteAll();
    }
}
