package com.khuswanth.portfolio.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khuswanth.portfolio.model.Contact;
import com.khuswanth.portfolio.repository.ContactRepository;
import com.khuswanth.portfolio.service.MailService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "${portfolio.cors.allowed-origin}") // Allows the configured frontend to communicate with the backend
public class ContactController {

    private final ContactRepository contactRepository;
    private final MailService mailService;

    // Simple Email regex pattern matching the validator
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    public ContactController(ContactRepository contactRepository, MailService mailService) {
        this.contactRepository = contactRepository;
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveContact(@RequestBody Contact contact) {
        Map<String, Object> response = new HashMap<>();

        // Validate Input fields manually to match Node.js validation constraints
        List<Map<String, String>> validationErrors = new ArrayList<>();

        // Name Validation
        if (contact.getName() == null || contact.getName().trim().isEmpty()) {
            addValidationError(validationErrors, "name", "Identification (Name) is required");
        } else if (contact.getName().trim().length() < 2 || contact.getName().trim().length() > 80) {
            addValidationError(validationErrors, "name", "Name must be 2-80 characters");
        }

        // Email Validation
        if (contact.getEmail() == null || contact.getEmail().trim().isEmpty()) {
            addValidationError(validationErrors, "email", "Contact link (Email) is required");
        } else if (!EMAIL_PATTERN.matcher(contact.getEmail().trim()).matches()) {
            addValidationError(validationErrors, "email", "Invalid email format");
        }

        // Subject Validation
        if (contact.getSubject() == null || contact.getSubject().trim().isEmpty()) {
            addValidationError(validationErrors, "subject", "Transmission subject is required");
        } else if (contact.getSubject().trim().length() < 3 || contact.getSubject().trim().length() > 120) {
            addValidationError(validationErrors, "subject", "Subject must be 3-120 characters");
        }

        // Message Validation
        if (contact.getMessage() == null || contact.getMessage().trim().isEmpty()) {
            addValidationError(validationErrors, "message", "Message payload is required");
        } else if (contact.getMessage().trim().length() < 10 || contact.getMessage().trim().length() > 2000) {
            addValidationError(validationErrors, "message", "Payload must be 10-2000 characters");
        }

        // Return Validation Errors if any exist
        if (!validationErrors.isEmpty()) {
            response.put("success", false);
            response.put("message", "Validation Protocol Failed");
            response.put("errors", validationErrors);
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
        }

        // Clean values before processing
        contact.setName(contact.getName().trim());
        contact.setEmail(contact.getEmail().trim().toLowerCase());
        contact.setSubject(contact.getSubject().trim());
        contact.setMessage(contact.getMessage().trim());
        if (contact.getLinkedIn() != null) {
            contact.setLinkedIn(contact.getLinkedIn().trim());
        }
        if (contact.getCompany() != null) {
            contact.setCompany(contact.getCompany().trim());
        }

        // Log inbound transmission
        System.out.println("\n--- INBOUND TRANSMISSION RECEIVED ---");
        System.out.println("Name     : " + contact.getName());
        System.out.println("Email    : " + contact.getEmail());
        System.out.println("Subject  : " + contact.getSubject());
        if (contact.getLinkedIn() != null && !contact.getLinkedIn().isEmpty()) {
            System.out.println("LinkedIn : " + contact.getLinkedIn());
        }
        if (contact.getCompany() != null && !contact.getCompany().isEmpty()) {
            System.out.println("Company  : " + contact.getCompany());
        }
        System.out.println("Message  : " + contact.getMessage().length() + " chars");
        System.out.println("----------------------------------------\n");

        if (mailService.isDevMode()) {
            // Save to database anyway
            contactRepository.save(contact);

            System.out.println("SYSTEM WARNING: Email passkey not configured. Simulation mode active.");
            response.put("success", true);
            response.put("message", "Transmission logged in simulation mode (Backend configured for dev).");
            return ResponseEntity.ok(response);
        }

        try {
            // Save Contact Submission to Database
            Contact savedContact = contactRepository.save(contact);

            // Phase 1: Notify Owner
            mailService.sendContactNotification(savedContact);
            System.out.println("Transmission routed to portfolio owner.");


            response.put("success", true);
            response.put("message", "Your message has been successfully transmitted. Deployment of response initiated.");
            response.put("transmission_mode", "live");
            return ResponseEntity.ok(response);

        } catch (Exception err) {
            System.err.println("CRITICAL SYSTEM ERROR: " + err.getMessage());
            response.put("success", false);
            response.put("message", "Communication uplink failed. Please contact khuswanthraojadav@gmail.com directly.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private void addValidationError(List<Map<String, String>> errors, String field, String message) {
        Map<String, String> error = new HashMap<>();
        error.put("field", field);
        error.put("message", message);
        errors.add(error);
    }
}