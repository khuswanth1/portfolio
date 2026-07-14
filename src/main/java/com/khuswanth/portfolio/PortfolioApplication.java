package com.khuswanth.portfolio;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {

    static {
        try {
            // Load environment variables from the .env file in the project root
            Dotenv dotenv = Dotenv.configure()
                    .directory("./")
                    .ignoreIfMissing()
                    .load();
            dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        } catch (Exception e) {
            System.err.println("Warning: Could not load .env file. Using system environment variables.");
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }
}