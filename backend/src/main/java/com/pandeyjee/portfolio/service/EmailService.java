package com.pandeyjee.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pandeyjee.portfolio.entity.ContactMessage;
import com.pandeyjee.portfolio.entity.SiteSetting;
import com.pandeyjee.portfolio.repository.SiteSettingRepository;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.HtmlUtils;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm:ss a");

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Autowired
    private SiteSettingRepository siteSettingRepository;

    @Value("${spring.mail.username:}")
    private String mailFrom;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    @Value("${portfolio.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${portfolio.mail.recipient:kanhaiya542112@gmail.com}")
    private String configuredRecipient;

    @Value("${portfolio.mail.resend-api-key:}")
    private String configuredResendApiKey;

    @Value("${portfolio.mail.web3forms-key:}")
    private String configuredWeb3formsKey;

    @Value("${portfolio.mail.brevo-api-key:}")
    private String configuredBrevoApiKey;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getEffectiveRecipient() {
        Optional<SiteSetting> setting = siteSettingRepository.findBySettingKey("recipient_email");
        if (setting.isPresent() && StringUtils.hasText(setting.get().getSettingValue())) {
            return setting.get().getSettingValue().trim();
        }
        return StringUtils.hasText(configuredRecipient) ? configuredRecipient.trim() : "kanhaiya542112@gmail.com";
    }

    public String getEffectiveResendApiKey() {
        if (StringUtils.hasText(configuredResendApiKey)) {
            return configuredResendApiKey.trim();
        }
        return siteSettingRepository.findBySettingKey("resend_api_key")
                .map(s -> s.getSettingValue().trim())
                .filter(StringUtils::hasText)
                .orElse("");
    }

    public String getEffectiveWeb3FormsKey() {
        if (StringUtils.hasText(configuredWeb3formsKey)) {
            return configuredWeb3formsKey.trim();
        }
        return siteSettingRepository.findBySettingKey("web3forms_key")
                .map(s -> s.getSettingValue().trim())
                .filter(StringUtils::hasText)
                .orElse("");
    }

    public String getEffectiveBrevoApiKey() {
        if (StringUtils.hasText(configuredBrevoApiKey)) {
            return configuredBrevoApiKey.trim();
        }
        return siteSettingRepository.findBySettingKey("brevo_api_key")
                .map(s -> s.getSettingValue().trim())
                .filter(StringUtils::hasText)
                .orElse("");
    }

    @Async
    public void sendContactNotification(ContactMessage message) {
        if (!mailEnabled) {
            log.info("Email notification disabled by configuration (portfolio.mail.enabled=false). Message #{} from {} saved in DB.",
                    message.getId(), message.getEmail());
            return;
        }

        String recipient = getEffectiveRecipient();
        String resendKey = getEffectiveResendApiKey();
        String web3FormsKey = getEffectiveWeb3FormsKey();
        String brevoKey = getEffectiveBrevoApiKey();

        String typeStr = message.getInquiryType() != null ? message.getInquiryType().name() : "GENERAL";
        String subjectText = "⚡ [Portfolio Inquiry • " + typeStr + "] " + message.getSubject() + " - " + message.getName();
        String plainText = buildPlainText(message, typeStr);
        String htmlText = buildHtmlContent(message, typeStr);

        // 1. Try Resend REST API (HTTPS Port 443 - 100% allowed on Render Free Tier)
        if (StringUtils.hasText(resendKey)) {
            try {
                boolean sent = sendViaResend(resendKey, recipient, message.getEmail(), message.getName(), subjectText, htmlText);
                if (sent) {
                    log.info("Contact notification #{} successfully sent to {} via Resend REST API (HTTPS).",
                            message.getId(), recipient);
                    return;
                }
            } catch (Exception e) {
                log.warn("Resend API attempt failed for message #{}: {}. Falling back to next channel.",
                        message.getId(), e.getMessage());
            }
        }

        // 2. Try Web3Forms REST API (HTTPS Port 443 - 100% allowed on Render Free Tier)
        if (StringUtils.hasText(web3FormsKey)) {
            try {
                boolean sent = sendViaWeb3Forms(web3FormsKey, message.getName(), message.getEmail(), subjectText, plainText);
                if (sent) {
                    log.info("Contact notification #{} successfully sent to {} via Web3Forms API (HTTPS).",
                            message.getId(), recipient);
                    return;
                }
            } catch (Exception e) {
                log.warn("Web3Forms API attempt failed for message #{}: {}. Falling back to next channel.",
                        message.getId(), e.getMessage());
            }
        }

        // 3. Try Brevo REST API (HTTPS Port 443)
        if (StringUtils.hasText(brevoKey)) {
            try {
                String senderEmail = StringUtils.hasText(mailFrom) ? mailFrom.trim() : "kanhaiya542112@gmail.com";
                boolean sent = sendViaBrevo(brevoKey, senderEmail, recipient, message.getEmail(), message.getName(), subjectText, htmlText);
                if (sent) {
                    log.info("Contact notification #{} successfully sent to {} via Brevo API (HTTPS).",
                            message.getId(), recipient);
                    return;
                }
            } catch (Exception e) {
                log.warn("Brevo API attempt failed for message #{}: {}. Falling back to next channel.",
                        message.getId(), e.getMessage());
            }
        }

        // 4. Fallback to JavaMailSender SMTP (works on localhost or paid cloud hosting)
        if (mailSender != null) {
            try {
                sendViaSmtp(message, recipient, subjectText, plainText, htmlText);
                log.info("Contact notification #{} successfully sent to {} via JavaMail SMTP.",
                        message.getId(), recipient);
                return;
            } catch (Exception e) {
                log.error("JavaMail SMTP failed for message #{} to {}: {}. " +
                          "Note: Render Free Tier restricts outbound SMTP ports (25, 465, 587). " +
                          "To receive emails on Render, configure RESEND_API_KEY or WEB3FORMS_ACCESS_KEY in Render environment variables or Admin Settings.",
                        message.getId(), recipient, e.getMessage());
            }
        } else {
            log.warn("No active email channel configured. Message #{} from {} is safely stored in database.",
                    message.getId(), message.getEmail());
        }
    }

    public Map<String, Object> sendDiagnosticTestEmail() {
        Map<String, Object> result = new HashMap<>();
        String recipient = getEffectiveRecipient();
        result.put("recipient", recipient);
        result.put("timestamp", LocalDateTime.now().format(DATE_FORMATTER));

        ContactMessage testMsg = ContactMessage.builder()
                .id(999999L)
                .name("Kanhaiya Portfolio Diagnostics")
                .email(recipient)
                .subject("Test Email Verification • Portfolio System")
                .message("This is a live diagnostic verification email from your Kanhaiya Pandey Portfolio System. If you received this, your email delivery pipeline is fully functional!")
                .ipAddress("127.0.0.1")
                .createdAt(LocalDateTime.now())
                .build();

        String subjectText = "⚡ [Portfolio Diagnostics] Verification Email - " + recipient;
        String plainText = buildPlainText(testMsg, "DIAGNOSTIC_TEST");
        String htmlText = buildHtmlContent(testMsg, "DIAGNOSTIC_TEST");

        String resendKey = getEffectiveResendApiKey();
        String web3FormsKey = getEffectiveWeb3FormsKey();
        String brevoKey = getEffectiveBrevoApiKey();

        // 1. Try Resend
        if (StringUtils.hasText(resendKey)) {
            try {
                boolean sent = sendViaResend(resendKey, recipient, recipient, "Portfolio Admin", subjectText, htmlText);
                if (sent) {
                    result.put("success", true);
                    result.put("channel", "RESEND_API (HTTPS 443)");
                    result.put("message", "Test email successfully delivered to " + recipient + " via Resend REST API!");
                    return result;
                }
            } catch (Exception e) {
                result.put("resendError", e.getMessage());
            }
        }

        // 2. Try Web3Forms
        if (StringUtils.hasText(web3FormsKey)) {
            try {
                boolean sent = sendViaWeb3Forms(web3FormsKey, "Portfolio Admin", recipient, subjectText, plainText);
                if (sent) {
                    result.put("success", true);
                    result.put("channel", "WEB3FORMS_API (HTTPS 443)");
                    result.put("message", "Test email successfully delivered to " + recipient + " via Web3Forms REST API!");
                    return result;
                }
            } catch (Exception e) {
                result.put("web3formsError", e.getMessage());
            }
        }

        // 3. Try Brevo
        if (StringUtils.hasText(brevoKey)) {
            try {
                String senderEmail = StringUtils.hasText(mailFrom) ? mailFrom.trim() : recipient;
                boolean sent = sendViaBrevo(brevoKey, senderEmail, recipient, recipient, "Portfolio Admin", subjectText, htmlText);
                if (sent) {
                    result.put("success", true);
                    result.put("channel", "BREVO_API (HTTPS 443)");
                    result.put("message", "Test email successfully delivered to " + recipient + " via Brevo REST API!");
                    return result;
                }
            } catch (Exception e) {
                result.put("brevoError", e.getMessage());
            }
        }

        // 4. Try SMTP
        if (mailSender != null) {
            try {
                sendViaSmtp(testMsg, recipient, subjectText, plainText, htmlText);
                result.put("success", true);
                result.put("channel", "JAVA_MAIL_SMTP (Port 587)");
                result.put("message", "Test email successfully delivered to " + recipient + " via SMTP!");
                return result;
            } catch (Exception e) {
                result.put("smtpError", e.getMessage());
            }
        }

        result.put("success", false);
        result.put("channel", "NONE_AVAILABLE");
        result.put("message", "Email delivery failed on all channels.");
        result.put("troubleshooting",
                "Render's Free Tier blocks outbound SMTP ports 25, 465, and 587. " +
                "To deliver emails reliably on Render, obtain a free API key from Resend (https://resend.com - 3000 emails/mo free) " +
                "or Web3Forms (https://web3forms.com - free instant key) and add RESEND_API_KEY or WEB3FORMS_ACCESS_KEY in Render Environment Variables or Admin Settings.");
        return result;
    }

    private boolean sendViaResend(String apiKey, String toEmail, String replyToEmail, String replyToName, String subject, String htmlContent) throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("from", "Portfolio Alert <onboarding@resend.dev>");
        payload.put("to", List.of(toEmail));
        payload.put("subject", subject);
        payload.put("html", htmlContent);
        if (StringUtils.hasText(replyToEmail)) {
            payload.put("reply_to", replyToEmail);
        }

        String json = objectMapper.writeValueAsString(payload);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 200 && response.statusCode() < 300) {
            log.info("Resend API response: status={} body={}", response.statusCode(), response.body());
            return true;
        } else {
            log.warn("Resend API returned non-2xx status: {} body: {}", response.statusCode(), response.body());
            throw new RuntimeException("Resend API HTTP " + response.statusCode() + ": " + response.body());
        }
    }

    private boolean sendViaWeb3Forms(String accessKey, String fromName, String fromEmail, String subject, String messageText) throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("access_key", accessKey);
        payload.put("name", fromName);
        payload.put("email", fromEmail);
        payload.put("subject", subject);
        payload.put("message", messageText);
        payload.put("from_name", "Portfolio System • " + fromName);

        String json = objectMapper.writeValueAsString(payload);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.web3forms.com/submit"))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 200 && response.statusCode() < 300) {
            log.info("Web3Forms API response: status={} body={}", response.statusCode(), response.body());
            return true;
        } else {
            log.warn("Web3Forms API returned non-2xx status: {} body: {}", response.statusCode(), response.body());
            throw new RuntimeException("Web3Forms API HTTP " + response.statusCode() + ": " + response.body());
        }
    }

    private boolean sendViaBrevo(String apiKey, String senderEmail, String toEmail, String replyToEmail, String replyToName, String subject, String htmlContent) throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("sender", Map.of("name", "Portfolio Alert", "email", senderEmail));
        payload.put("to", List.of(Map.of("email", toEmail, "name", "Kanhaiya Pandey")));
        if (StringUtils.hasText(replyToEmail)) {
            payload.put("replyTo", Map.of("email", replyToEmail, "name", replyToName != null ? replyToName : "Inquirer"));
        }
        payload.put("subject", subject);
        payload.put("htmlContent", htmlContent);

        String json = objectMapper.writeValueAsString(payload);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
                .header("api-key", apiKey)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 200 && response.statusCode() < 300) {
            log.info("Brevo API response: status={} body={}", response.statusCode(), response.body());
            return true;
        } else {
            throw new RuntimeException("Brevo API HTTP " + response.statusCode() + ": " + response.body());
        }
    }

    private void sendViaSmtp(ContactMessage message, String recipient, String subjectText, String plainText, String htmlText) throws Exception {
        if (mailSender instanceof JavaMailSenderImpl impl) {
            if (StringUtils.hasText(impl.getPassword())) {
                impl.setPassword(impl.getPassword().replace(" ", "").trim());
            }
            if (StringUtils.hasText(impl.getUsername())) {
                impl.setUsername(impl.getUsername().trim());
            }
        }

        String effectiveFrom = StringUtils.hasText(mailFrom) ? mailFrom.trim() : recipient;
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(recipient);
        String fromDisplayName = "Portfolio Alert • " + (message.getName() != null ? message.getName() : "Visitor");
        helper.setFrom(effectiveFrom, fromDisplayName);
        if (StringUtils.hasText(message.getEmail())) {
            helper.setReplyTo(message.getEmail(), message.getName());
        }
        helper.setSubject(subjectText);
        helper.setText(plainText, htmlText);

        mailSender.send(mimeMessage);
    }

    private String buildPlainText(ContactMessage message, String typeStr) {
        return "=================================================\n" +
               "  NEW INQUIRY RECEIVED VIA YOUR PORTFOLIO WEBSITE\n" +
               "=================================================\n\n" +
               "Sender Name : " + message.getName() + "\n" +
               "Sender Email: " + message.getEmail() + "\n" +
               "Inquiry Type: " + typeStr + "\n" +
               "Subject     : " + message.getSubject() + "\n" +
               "Received At : " + (message.getCreatedAt() != null ? message.getCreatedAt().format(DATE_FORMATTER) : "Just now") + "\n" +
               "Sender IP   : " + (message.getIpAddress() != null ? message.getIpAddress() : "N/A") + "\n\n" +
               "------------------- MESSAGE ---------------------\n" +
               message.getMessage() + "\n" +
               "-------------------------------------------------\n\n" +
               "Direct Reply: mailto:" + message.getEmail() + "?subject=Re:" + URLEncoder.encode(message.getSubject() != null ? message.getSubject() : "Portfolio Message", StandardCharsets.UTF_8) + "\n" +
               "Manage inquiries in your Admin Panel: /admin\n";
    }

    private String buildHtmlContent(ContactMessage message, String typeStr) {
        String safeName = HtmlUtils.htmlEscape(message.getName() != null ? message.getName() : "Anonymous");
        String safeEmail = HtmlUtils.htmlEscape(message.getEmail() != null ? message.getEmail() : "no-email@example.com");
        String safeSubject = HtmlUtils.htmlEscape(message.getSubject() != null ? message.getSubject() : "No Subject");
        String safeMessage = HtmlUtils.htmlEscape(message.getMessage() != null ? message.getMessage() : "")
                .replace("\n", "<br/>");
        String safeIp = HtmlUtils.htmlEscape(message.getIpAddress() != null ? message.getIpAddress() : "127.0.0.1");
        String formattedDate = message.getCreatedAt() != null ? message.getCreatedAt().format(DATE_FORMATTER) : "Just now";

        String badgeBg = "#1e293b";
        String badgeColor = "#38bdf8";
        String badgeBorder = "#0284c7";
        if (typeStr.contains("HIR") || typeStr.contains("JOB")) {
            badgeBg = "#064e3b";
            badgeColor = "#34d399";
            badgeBorder = "#059669";
        } else if (typeStr.contains("PROJ") || typeStr.contains("COLLAB")) {
            badgeBg = "#312e81";
            badgeColor = "#a5b4fc";
            badgeBorder = "#6366f1";
        } else if (typeStr.contains("FREE")) {
            badgeBg = "#451a03";
            badgeColor = "#fbbf24";
            badgeBorder = "#d97706";
        }

        String mailtoUrl = "mailto:" + safeEmail + "?subject=" + URLEncoder.encode("Re: " + (message.getSubject() != null ? message.getSubject() : "Portfolio Inquiry"), StandardCharsets.UTF_8);

        return """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #111827; border-radius: 18px; border: 1px solid #1f293d; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
    
    <!-- Top Gradient Accent -->
    <tr>
      <td style="height: 5px; background: linear-gradient(90deg, #3b82f6 0%%, #8b5cf6 50%%, #06b6d4 100%%);"></td>
    </tr>

    <!-- Header Section -->
    <tr>
      <td style="padding: 32px 32px 20px 32px; text-align: center;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 14px auto;">
          <tr>
            <td style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 30px; padding: 6px 16px;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #60a5fa; text-transform: uppercase;">
                ✦ PORTFOLIO DISPATCH
              </span>
            </td>
          </tr>
        </table>
        <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
          New Inquiry Received
        </h1>
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
          A visitor has sent a new message through your personal portfolio contact portal.
        </p>
      </td>
    </tr>

    <!-- Inquiry Type Badge Bar -->
    <tr>
      <td style="padding: 0 32px 18px 32px; text-align: center;">
        <span style="display: inline-block; background-color: %s; color: %s; border: 1px solid %s; padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">
          %s
        </span>
      </td>
    </tr>

    <!-- Sender Details Card -->
    <tr>
      <td style="padding: 0 32px 20px 32px;">
        <table role="presentation" width="100%%" border="0" cellpadding="0" cellspacing="0" style="background-color: #1a2234; border: 1px solid #26334d; border-radius: 14px; padding: 18px 20px;">
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; width: 110px; font-weight: 500;">
              👤 Sender
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #f8fafc; font-weight: 700;">
              %s
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 500;">
              ✉️ Email
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #38bdf8; font-weight: 600;">
              <a href="%s" style="color: #38bdf8; text-decoration: none;">%s</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 500;">
              📌 Subject
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #f1f5f9; font-weight: 600;">
              %s
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 500;">
              🕒 Received At
            </td>
            <td style="padding: 6px 0; font-size: 13px; color: #cbd5e1; font-family: monospace;">
              %s
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 500;">
              🌐 Origin IP
            </td>
            <td style="padding: 6px 0; font-size: 12px; color: #64748b; font-family: monospace;">
              %s
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Message Callout Box -->
    <tr>
      <td style="padding: 0 32px 28px 32px;">
        <table role="presentation" width="100%%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border-left: 4px solid #3b82f6; border-radius: 4px 12px 12px 4px; padding: 18px 20px;">
          <tr>
            <td style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #60a5fa; padding-bottom: 8px;">
              💬 Inquirer's Message
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #e2e8f0; line-height: 1.6; font-style: normal;">
              %s
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Direct Reply Action Button -->
    <tr>
      <td style="padding: 0 32px 32px 32px; text-align: center;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="border-radius: 12px; background: linear-gradient(135deg, #2563eb 0%%, #7c3aed 100%%); box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);">
              <a href="%s" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 12px; letter-spacing: 0.2px;">
                ✉️ Reply Directly to %s
              </a>
            </td>
          </tr>
        </table>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
          Clicking will open your email client with sender address and subject pre-filled.
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="border-top: 1px solid #1e293b;"></td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #0d121f; text-align: center;">
        <p style="margin: 0 0 6px 0; font-size: 12px; color: #94a3b8; font-weight: 600;">
          Kanhaiya Pandey Portfolio System
        </p>
        <p style="margin: 0; font-size: 11px; color: #475569;">
          This is an automated notification dispatched by Spring Boot SMTP Service.
          All messages are securely stored in your Portfolio Database and Admin Dashboard.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
""".formatted(
                badgeBg, badgeColor, badgeBorder,
                typeStr,
                safeName,
                mailtoUrl, safeEmail,
                safeSubject,
                formattedDate,
                safeIp,
                safeMessage,
                mailtoUrl, safeName
        );
    }
}

