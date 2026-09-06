package com.pandeyjee.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PortfolioApplication {

	public static void main(String[] args) {
		loadDotenv();
		SpringApplication.run(PortfolioApplication.class, args);
	}

	private static void loadDotenv() {
		java.nio.file.Path[] candidatePaths = new java.nio.file.Path[] {
			java.nio.file.Paths.get(".env"),
			java.nio.file.Paths.get("../.env"),
			java.nio.file.Paths.get("../../.env")
		};

		for (java.nio.file.Path path : candidatePaths) {
			if (java.nio.file.Files.exists(path)) {
				try {
					java.util.List<String> lines = java.nio.file.Files.readAllLines(path);
					int loadedCount = 0;
					for (String line : lines) {
						String trimmed = line.trim();
						if (trimmed.isEmpty() || trimmed.startsWith("#") || !trimmed.contains("=")) {
							continue;
						}
						int eqIdx = trimmed.indexOf('=');
						String key = trimmed.substring(0, eqIdx).trim();
						String val = trimmed.substring(eqIdx + 1).trim();
						if (val.startsWith("\"") && val.endsWith("\"") && val.length() >= 2) {
							val = val.substring(1, val.length() - 1);
						} else if (val.startsWith("'") && val.endsWith("'") && val.length() >= 2) {
							val = val.substring(1, val.length() - 1);
						}
						if ("SPRING_MAIL_PASSWORD".equalsIgnoreCase(key)) {
							val = val.replace(" ", "");
						}
						if ("SPRING_PROFILES_ACTIVE".equalsIgnoreCase(key)) {
							System.setProperty("spring.profiles.active", val);
						}
						if (!key.isEmpty()) {
							System.setProperty(key, val);
							loadedCount++;
						}
					}
					System.out.println("[INFO] Successfully loaded " + loadedCount + " environment variables from: " + path.toAbsolutePath().normalize());
					break;
				} catch (Exception e) {
					System.err.println("[WARN] Could not parse .env file from " + path + ": " + e.getMessage());
				}
			}
		}
	}

}
