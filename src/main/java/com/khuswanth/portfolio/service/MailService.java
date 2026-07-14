package com.khuswanth.portfolio.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.khuswanth.portfolio.model.Contact;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:khuswanthraojadav@gmail.com}")
    private String emailUser;

    @Value("${spring.mail.password:}")
    private String emailPass;

    @Value("${portfolio.email.to:khuswanthraojadav@gmail.com}")
    private String emailTo;

    @Value("${portfolio.email.from:khuswanthraojadav@gmail.com}")
    private String emailFrom;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean isDevMode() {
        return emailPass == null || emailPass.trim().isEmpty()
                || emailPass.equals("REPLACE_WITH_YOUR_GMAIL_APP_PASSWORD");
    }

    public void sendContactNotification(Contact contact) throws Exception {
        if (isDevMode()) {
            System.out.println("DEV MODE: Email not configured. Skipping send.");
            System.out.println("From: " + contact.getName() + " <" + contact.getEmail() + ">");
            System.out.println("Subject: " + contact.getSubject());
            System.out.println("Message: " + contact.getMessage());
            return;
        }

        String timestamp = LocalDateTime.now(ZoneId.of("Asia/Kolkata"))
                .format(DateTimeFormatter.ofPattern("dd/MM/yyyy, hh:mm:ss a"));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(String.format("\"Portfolio Contact\" <%s>", emailFrom));
        helper.setTo(emailTo);
        helper.setReplyTo(contact.getEmail());
        helper.setSubject(contact.getName() + " — " + contact.getSubject());
        helper.setText(buildEmailBody(contact, timestamp), false);

        mailSender.send(message);
    }

    private String buildEmailBody(Contact contact, String timestamp) {
        StringBuilder sb = new StringBuilder();
        sb.append("Dear Khuswanth Rao Jadav,\n\n");
        sb.append("You have received a new message from your portfolio website.\n\n");
        sb.append(contact.getMessage()).append("\n\n");
        sb.append("This message was submitted through your portfolio contact form.\n");
        sb.append("Please reply directly to ").append(contact.getEmail()).append(" to respond to the sender.\n\n");
        sb.append("Best Regards,\n\n");
        sb.append("CONTACT DETAILS\n");
        sb.append("Name:  ").append(contact.getName()).append("\n");
        sb.append("Email: ").append(contact.getEmail()).append("\n");
        
        if (contact.getLinkedIn() != null && !contact.getLinkedIn().trim().isEmpty()) {
            sb.append("LinkedIn: ").append(contact.getLinkedIn()).append("\n");
        }
        if (contact.getCompany() != null && !contact.getCompany().trim().isEmpty()) {
            sb.append("Company: ").append(contact.getCompany()).append("\n");
        }
        
        return sb.toString();
    }
}
