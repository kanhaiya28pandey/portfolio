package com.pandeyjee.portfolio.service;

import com.pandeyjee.portfolio.entity.ContactMessage;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.HtmlUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm:ss a");

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailFrom;

    @Value("${portfolio.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${portfolio.mail.recipient:kanhaiya542112@gmail.com}")
    private String recipientEmail;

    @Async
    public void sendContactNotification(ContactMessage message) {
        if (!mailEnabled || mailSender == null || !StringUtils.hasText(mailFrom)) {
            log.info("Email notification skipped (enabled={}, hasSender={}, hasFrom={}). Message #{} from {} ({}) saved in database.",
                    mailEnabled, mailSender != null, StringUtils.hasText(mailFrom),
                    message.getId(), message.getName(), message.getEmail());
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(recipientEmail);
            String fromDisplayName = "Portfolio Alert • " + message.getName();
            helper.setFrom(mailFrom, fromDisplayName);
            helper.setReplyTo(message.getEmail(), message.getName());

            String typeStr = message.getInquiryType() != null ? message.getInquiryType().name() : "GENERAL";
            String subjectText = "⚡ [Portfolio Inquiry • " + typeStr + "] " + message.getSubject() + " - " + message.getName();
            helper.setSubject(subjectText);

            String plainText = buildPlainText(message, typeStr);
            String htmlText = buildHtmlContent(message, typeStr);

            helper.setText(plainText, htmlText);

            mailSender.send(mimeMessage);
            log.info("Stylish HTML contact notification email sent successfully to {} for message #{} from {}",
                    recipientEmail, message.getId(), message.getEmail());
        } catch (Exception e) {
            log.error("Failed to send contact notification email for message #{}: {}", message.getId(), e.getMessage(), e);
        }
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

