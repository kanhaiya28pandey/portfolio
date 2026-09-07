package com.pandeyjee.portfolio.config;

import com.pandeyjee.portfolio.entity.*;
import com.pandeyjee.portfolio.entity.enums.ContentStatus;
import com.pandeyjee.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AdminRepository adminRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final AchievementRepository achievementRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificateRepository certificateRepository;
    private final SiteSettingRepository siteSettingRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${portfolio.admin.default-username:admin}")
    private String defaultUsername;

    @Value("${portfolio.admin.default-password:PandeyJee@2026Secure}")
    private String defaultPassword;

    public DataInitializer(
            AdminRepository adminRepository,
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            AchievementRepository achievementRepository,
            EducationRepository educationRepository,
            ExperienceRepository experienceRepository,
            CertificateRepository certificateRepository,
            SiteSettingRepository siteSettingRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.achievementRepository = achievementRepository;
        this.educationRepository = educationRepository;
        this.experienceRepository = experienceRepository;
        this.certificateRepository = certificateRepository;
        this.siteSettingRepository = siteSettingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Initialize Admin
        if (adminRepository.count() == 0) {
            log.info("No admin account found. Bootstrapping default admin account: {}", defaultUsername);
            Admin admin = Admin.builder()
                    .username(defaultUsername)
                    .passwordHash(passwordEncoder.encode(defaultPassword))
                    .role("ROLE_ADMIN")
                    .build();
            adminRepository.save(admin);
            log.info("Admin account initialized successfully with username: {}", defaultUsername);
        }

        // 2. Initialize Profile
        if (profileRepository.count() == 0) {
            log.info("Bootstrapping authentic profile data for Kanhaiya Pandey...");
            Profile profile = new Profile();
            profile.setFullName("Kanhaiya Pandey");
            profile.setTitle("Software Engineer | Full Stack Developer | Problem Solver");
            profile.setBio("I build modern, scalable and impactful applications with a passion for clean code, robust backend architectures, and continuous learning.");
            profile.setAboutMarkdown("I am an MCA final year student specializing in Computer Applications with an emphasis on backend architectures, full-stack web development, and problem solving. My core focus lies in building scalable enterprise systems using Java, Spring Boot, and PostgreSQL, paired with responsive modern user interfaces built with React and TypeScript.\n\nI treat software development as an engineering craft: prioritizing maintainable architectures, secure API design, and intuitive user experiences.");
            profile.setAvailabilityStatus("Available for Internships & Opportunities");
            profile.setLocation("India");
            profile.setEmail("kanhaiyapandey.dev@gmail.com");
            profile.setLinkedinUrl("https://linkedin.com");
            profile.setGithubUrl("https://github.com");
            profile.setCoffeeUrl("https://buymeacoffee.com");
            profileRepository.save(profile);
        } else {
            profileRepository.findAll().forEach(p -> {
                if ("Pandey Jee".equals(p.getFullName())) {
                    p.setFullName("Kanhaiya Pandey");
                    p.setEmail("kanhaiyapandey.dev@gmail.com");
                    profileRepository.save(p);
                }
            });
        }

        // 3. Initialize Skills Ecosystem (Seed only if clean database)
        if (skillRepository.count() == 0) {
            syncSkillsEcosystem();
        } else {
            log.info("Skills ecosystem already populated ({} skills present). Preserving user data.", skillRepository.count());
        }

        // 3.1 Initialize Projects Ecosystem (Seed only if clean database)
        if (projectRepository.count() == 0) {
            syncProjectsEcosystem();
        } else {
            log.info("Projects ecosystem already populated ({} projects present). Preserving user data.", projectRepository.count());
        }

        // 3.2 Initialize Experience Ecosystem (Seed only if clean database)
        if (experienceRepository.count() == 0) {
            syncExperienceEcosystem();
        } else {
            log.info("Experience ecosystem already populated ({} entries present). Preserving user data.", experienceRepository.count());
        }

        // 4. Initialize Achievements (Seed only if clean database)
        if (achievementRepository.count() == 0) {
            log.info("Bootstrapping milestone achievements for Kanhaiya Pandey...");
            Achievement a1 = Achievement.builder()
                    .title("Competitive Programming & DSA Milestone")
                    .metricValue("350+ Solved")
                    .description("Solved 150+ DSA questions on LeetCode and 200+ on GeeksforGeeks (GFG). Practicing algorithmic problem solving, time complexity optimization, and core data structures.")
                    .organization("LeetCode & GeeksforGeeks")
                    .issueDate("2024 - Present")
                    .iconKey("flame")
                    .proofUrl("")
                    .displayOrder(1)
                    .status(ContentStatus.PUBLISHED)
                    .build();
            achievementRepository.save(a1);

            Achievement a2 = Achievement.builder()
                    .title("Class Representative (CR) — MCA")
                    .metricValue("Leadership")
                    .description("Responsible Class Representative (CR) of MCA - E section in SRM University, KTR Campus. Coordinating academic schedules, technical seminars, and student-faculty communication.")
                    .organization("SRM University, KTR Campus")
                    .issueDate("2024 - Present")
                    .iconKey("crown")
                    .proofUrl("")
                    .displayOrder(2)
                    .status(ContentStatus.PUBLISHED)
                    .build();
            achievementRepository.save(a2);
            log.info("Bootstrapped 2 milestone achievements successfully.");
        } else {
            log.info("Achievements already populated ({} entries present). Preserving user data.", achievementRepository.count());
        }

        // 4.1 Initialize Education Ecosystem (Seed only if clean database)
        if (educationRepository.count() == 0) {
            syncEducationEcosystem();
        } else {
            log.info("Education ecosystem already populated ({} entries present). Preserving user data.", educationRepository.count());
        }

        // 4.2 Initialize Certificates Ecosystem (Seed only if clean database)
        if (certificateRepository.count() == 0) {
            syncCertificatesEcosystem();
        } else {
            log.info("Certificates ecosystem already populated ({} entries present). Preserving user data.", certificateRepository.count());
        }

        // 5. Initialize Site Settings
        Map<String, String> defaultSettings = new LinkedHashMap<>();
        defaultSettings.put("site_title", "Kanhaiya | techwithkanhaiya");
        defaultSettings.put("meta_description", "Official portfolio of Kanhaiya Pandey - Full Stack Developer & Software Engineer.");
        defaultSettings.put("support_coffee_url", "https://buymeacoffee.com");
        defaultSettings.put("availability_badge", "Available for Full-Stack & AI Roles");
        defaultSettings.put("dsa_solved_count", "150+");
        defaultSettings.put("github_url", "https://github.com/kanhaiya28pandey/");
        defaultSettings.put("linkedin_url", "https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/");
        defaultSettings.put("email", "kanhaiya542112@gmail.com");
        defaultSettings.put("phone_number", "+91 9801573326");
        defaultSettings.put("whatsapp_number", "+91 9801573326");
        defaultSettings.put("about_avatar_url", "/assets/kanhaiya_real.jpg");
        defaultSettings.put("about_stream_badge", "Software Engineer");
        defaultSettings.put("about_text", "I am a passionate Software Engineer focused on building robust full-stack applications and solving real-world problems. With strong foundations in Data Structures & Algorithms, Java, Spring Boot, and modern React, I enjoy crafting seamless user experiences backed by reliable database architectures.");
        defaultSettings.put("leetcode_url", "");
        defaultSettings.put("gfg_url", "");
        defaultSettings.put("codeforces_url", "");
        defaultSettings.put("instagram_url", "");

        for (Map.Entry<String, String> entry : defaultSettings.entrySet()) {
            if (siteSettingRepository.findBySettingKey(entry.getKey()).isEmpty()) {
                siteSettingRepository.save(new SiteSetting(null, entry.getKey(), entry.getValue(), entry.getKey(), null));
            }
        }
        log.info("Baseline data initialization check complete.");
    }

    private void syncSkillsEcosystem() {
        log.info("Synchronizing comprehensive technology universe ecosystem...");

        // Migrate legacy names if present
        skillRepository.findByName("Java 21").ifPresent(s -> {
            s.setName("Java");
            s.setCategory("CORE");
            skillRepository.save(s);
        });
        skillRepository.findByName("Data Structures & Algorithms").ifPresent(s -> {
            s.setName("DSA");
            s.setCategory("CORE");
            skillRepository.save(s);
        });
        skillRepository.findByName("HTML & CSS").ifPresent(s -> {
            s.setName("HTML5");
            s.setCategory("FRONTEND");
            s.setIconKey("html");
            skillRepository.save(s);
        });
        skillRepository.findByName("Node.js").ifPresent(skillRepository::delete);

        List<SkillSeedData> seeds = List.of(
            // CORE (6)
            new SkillSeedData("DSA", "CORE", "ADVANCED", "Data Structures & Algorithms: trees, graphs, dynamic programming, algorithmic efficiency, and memory optimization.", "dsa", 1),
            new SkillSeedData("OOP", "CORE", "ADVANCED", "Object-Oriented Programming: modular system decomposition, SOLID principles, design patterns, and clean architecture.", "oop", 2),
            new SkillSeedData("Problem Solving", "CORE", "ADVANCED", "Analytical problem solving, edge-case mitigation, competitive logic, and production system debugging.", "problem-solving", 3),
            new SkillSeedData("Python", "CORE", "ADVANCED", "Python scripting, data structures, automation pipelines, and machine learning libraries.", "python", 4),
            new SkillSeedData("C & C++", "CORE", "INTERMEDIATE", "Foundational systems programming, memory management, pointers, and algorithmic implementation.", "cpp", 5),
            new SkillSeedData("FastAPI", "CORE", "INTERMEDIATE", "Modern asynchronous Python REST API framework, Pydantic schemas, and fast ML inference microservices.", "fastapi", 6),

            // BACKEND (5)
            new SkillSeedData("Java", "BACKEND", "ADVANCED", "Core Java, OOP principles, Collections framework, Multithreading, Concurrency, Lambda expressions and Streams.", "java", 7),
            new SkillSeedData("Spring Boot", "BACKEND", "ADVANCED", "Production backend engineering: Spring MVC, Spring Data JPA, Actuator, and microservice architectures.", "spring", 8),
            new SkillSeedData("Spring Security", "BACKEND", "ADVANCED", "Stateless JWT & cookie security, password encryption, role-based access control (RBAC), and brute-force protection.", "security", 9),
            new SkillSeedData("REST APIs", "BACKEND", "ADVANCED", "Stateless RESTful endpoint design, standard HTTP status codes, DTO mapping, and OpenAPI contracts.", "api", 10),
            new SkillSeedData("Hibernate / JPA", "BACKEND", "ADVANCED", "Object-Relational Mapping (ORM), entity relationships, lazy/eager loading, transactions, and caching.", "hibernate", 11),

            // FRONTEND (5)
            new SkillSeedData("React", "FRONTEND", "ADVANCED", "Modern component-driven UI development, hooks, state machines, Virtual DOM, and responsive glassmorphism.", "react", 12),
            new SkillSeedData("TypeScript", "FRONTEND", "ADVANCED", "Strict type systems, custom interfaces, generics, union types, and robust compile-time safety.", "typescript", 13),
            new SkillSeedData("JavaScript", "FRONTEND", "ADVANCED", "Modern ES6+, closures, promises, async/await, DOM APIs, and functional programming patterns.", "javascript", 14),
            new SkillSeedData("HTML5", "FRONTEND", "ADVANCED", "Semantic HTML5 structure, modern layout tags, responsive accessibility, and fluid standards.", "html", 15),
            new SkillSeedData("CSS3", "FRONTEND", "ADVANCED", "Modern CSS3 layout (Flexbox/Grid), Tailwind utilities, glassmorphic styling, and fluid responsive animations.", "css", 16),

            // DATABASE
            new SkillSeedData("PostgreSQL", "DATABASE", "ADVANCED", "Relational database schema modeling, indexing, joins, transactions, and query optimization.", "postgresql", 17),
            new SkillSeedData("MySQL", "DATABASE", "ADVANCED", "Normalized database design, relational foreign keys, complex joins, and stored queries.", "mysql", 18),
            new SkillSeedData("MongoDB", "DATABASE", "ADVANCED", "NoSQL document database, schema design, aggregation pipelines, and persistent cloud storage.", "mongodb", 19),

            // TOOLS
            new SkillSeedData("Git & GitHub", "TOOLS", "ADVANCED", "Version control, feature branching, pull request workflows, merge conflict resolution, and CI/CD foundations.", "git", 20),
            new SkillSeedData("Docker", "TOOLS", "INTERMEDIATE", "Containerization, Dockerfile multi-stage builds, container isolation, and reproducible deployments.", "docker", 21),
            new SkillSeedData("Postman", "TOOLS", "ADVANCED", "API testing, collection runner, environment variables, automated response assertions, and documentation.", "postman", 22),
            new SkillSeedData("VS Code", "TOOLS", "ADVANCED", "Modern developer workflow: integrated debugging, Git lens, linting configurations, and productivity extensions.", "vscode", 23)
        );

        for (SkillSeedData seed : seeds) {
            Optional<Skill> existing = skillRepository.findByName(seed.name);
            if (existing.isPresent()) {
                Skill s = existing.get();
                s.setCategory(seed.category);
                s.setProficiencyLevel(seed.level);
                s.setDescription(seed.description);
                s.setIconKey(seed.iconKey);
                s.setDisplayOrder(seed.displayOrder);
                skillRepository.save(s);
            } else {
                Skill s = Skill.builder()
                        .name(seed.name)
                        .category(seed.category)
                        .proficiencyLevel(seed.level)
                        .description(seed.description)
                        .iconKey(seed.iconKey)
                        .displayOrder(seed.displayOrder)
                        .status(ContentStatus.PUBLISHED)
                        .build();
                skillRepository.save(s);
            }
        }
        log.info("Technology universe ecosystem synchronized. Total skills: {}", skillRepository.count());
    }

    private void syncProjectsEcosystem() {
        log.info("Synchronizing portfolio projects ecosystem with authentic GitHub repositories...");

        // Remove any old placeholder or previous projects to guarantee clean state
        projectRepository.findAll().forEach(p -> {
            String slug = p.getSlug();
            if (!"resumeiq".equals(slug) &&
                !"youtube-clone".equals(slug) &&
                !"banking-system".equals(slug) &&
                !"student-performance-system".equals(slug)) {
                log.info("Purging old project from database: {}", slug);
                projectRepository.delete(p);
            }
        });

        // 1. ResumeIQ
        Optional<Project> optResume = projectRepository.findBySlug("resumeiq");
        Project resume = optResume.orElseGet(Project::new);
        resume.setTitle("ResumeIQ — AI Resume Analyzer & ATS Score Engine");
        resume.setSlug("resumeiq");
        resume.setSummary("AI-powered resume analysis platform that evaluates ATS compatibility, identifies missing skills with semantic matching, and generates automated improvement roadmaps using Google Gemini AI.");
        resume.setDescriptionMarkdown("### Intelligent Resume & ATS Optimization Platform\nResumeIQ combines traditional ATS parsing with modern generative AI and sentence transformers to evaluate resumes against target job descriptions with deep semantic precision.\n\n#### Core Architectural Capabilities\n- **Multimodal Document Parsing**: High-fidelity text extraction from PDF and DOCX files using PDFPlumber and Python-DOCX.\n- **Semantic Vector Similarity**: Sentence-transformer embeddings analyze contextual relevance beyond basic keyword matching.\n- **Automated ATS Scoring Engine**: Evaluates section structure, formatting, quantifiable achievements, and contact health.\n- **Google Gemini AI Recommendations**: Generates candidate strengths, weaknesses, actionable suggestions, and tailored cover letters.\n- **Interactive Analytics Dashboard**: Visualizes match trends, ATS grade distributions, and missing skill heatmaps with Recharts.");
        resume.setCategory("AI_ML");
        resume.setThumbnailUrl("/assets/projects/resumeiq.jpg");
        resume.setBannerUrl("/assets/projects/resumeiq.jpg");
        resume.setLiveUrl(""); // Localhost development
        resume.setGithubUrl("https://github.com/kanhaiya28pandey/ResumeIQ");
        resume.setFeatured(true);
        resume.setDisplayOrder(1);
        resume.setStatus(ContentStatus.PUBLISHED);
        Set<Skill> resumeSkills = new HashSet<>();
        skillRepository.findByName("React").ifPresent(resumeSkills::add);
        skillRepository.findByName("FastAPI").ifPresent(resumeSkills::add);
        skillRepository.findByName("Python").ifPresent(resumeSkills::add);
        skillRepository.findByName("MongoDB").ifPresent(resumeSkills::add);
        skillRepository.findByName("JavaScript").ifPresent(resumeSkills::add);
        resume.setSkills(resumeSkills);
        projectRepository.save(resume);

        // 2. YourTube — Video Streaming Platform
        Optional<Project> optYt = projectRepository.findBySlug("youtube-clone");
        Project yt = optYt.orElseGet(Project::new);
        yt.setTitle("YourTube — Full-Stack Video Streaming Platform");
        yt.setSlug("youtube-clone");
        yt.setSummary("Feature-rich YouTube-style video streaming platform with video upload/playback, OTP authentication, Razorpay payments, premium subscriptions, watch history, and WebRTC video calling.");
        yt.setDescriptionMarkdown("### High-Performance Media Streaming & Social Interaction Engine\nYourTube delivers a production-ready video sharing experience built with Next.js 15, Node.js, Express, and MongoDB.\n\n#### Core Architectural Capabilities\n- **Video Processing & Adaptive Streaming**: Chunked video uploads, stream playback, and responsive media controls.\n- **Secure Authentication & Phone OTP**: Multi-tier authentication with JWT, Twilio SMS/OTP verification, and email alerts.\n- **Monetization & Razorpay Integration**: Premium subscriber plans, checkout workflow, and automated payment verification.\n- **Real-Time Communication**: Peer-to-peer video calling powered by WebRTC and instant notifications via Socket.IO.\n- **Social Engagement**: Nested comments, likes/dislikes, watch later playlists, and chronological watch history tracking.");
        yt.setCategory("FULLSTACK");
        yt.setThumbnailUrl("/assets/projects/youtube_clone.jpg");
        yt.setBannerUrl("/assets/projects/youtube_clone.jpg");
        yt.setLiveUrl("https://youtube-clone-xi-teal.vercel.app");
        yt.setGithubUrl("https://github.com/kanhaiya28pandey/youtube-clone");
        yt.setFeatured(true);
        yt.setDisplayOrder(2);
        yt.setStatus(ContentStatus.PUBLISHED);
        Set<Skill> ytSkills = new HashSet<>();
        skillRepository.findByName("React").ifPresent(ytSkills::add);
        skillRepository.findByName("TypeScript").ifPresent(ytSkills::add);
        skillRepository.findByName("MongoDB").ifPresent(ytSkills::add);
        skillRepository.findByName("REST APIs").ifPresent(ytSkills::add);
        yt.setSkills(ytSkills);
        projectRepository.save(yt);

        // 3. Enterprise Digital Banking System
        Optional<Project> optBank = projectRepository.findBySlug("banking-system");
        Project bank = optBank.orElseGet(Project::new);
        bank.setTitle("Enterprise Digital Banking & Security System");
        bank.setSlug("banking-system");
        bank.setSummary("Enterprise-grade banking and transaction platform featuring 6-layer transaction validation, 5 automated fraud detection algorithms, role-based access control (RBAC), multi-step KYC, and immutable audit logs.");
        bank.setDescriptionMarkdown("### Mission-Critical Financial Transaction Architecture\nAn enterprise-grade financial core built with Spring Boot 3.2, Spring Security, MongoDB, and React 19 + Redux Toolkit.\n\n#### Core Architectural Capabilities\n- **6-Layer Transaction Security**: Multi-tier verification pipeline validating balance constraints, transaction limits, and OTP authorizations.\n- **Algorithmic Fraud Detection**: 5 real-time anomaly detection rules tracking rapid transfers, abnormal geographical shifts, and frequency spikes.\n- **Real-Time Balance Synchronization**: Spring WebSocket endpoints pushing immediate ledger balance updates to active user sessions.\n- **Multi-Step KYC Onboarding**: Comprehensive customer registration with document verification and account state machines.\n- **Tamper-Evident Audit Trails**: Immutable event logging for sensitive operations, administrative overrides, and transaction lifecycles.");
        bank.setCategory("BACKEND");
        bank.setThumbnailUrl("/assets/projects/banking_system.jpg");
        bank.setBannerUrl("/assets/projects/banking_system.jpg");
        bank.setLiveUrl(""); // Enterprise system
        bank.setGithubUrl("https://github.com/kanhaiya28pandey/banking-system");
        bank.setFeatured(true);
        bank.setDisplayOrder(3);
        bank.setStatus(ContentStatus.PUBLISHED);
        Set<Skill> bankSkills = new HashSet<>();
        skillRepository.findByName("Java").ifPresent(bankSkills::add);
        skillRepository.findByName("Spring Boot").ifPresent(bankSkills::add);
        skillRepository.findByName("Spring Security").ifPresent(bankSkills::add);
        skillRepository.findByName("MongoDB").ifPresent(bankSkills::add);
        skillRepository.findByName("TypeScript").ifPresent(bankSkills::add);
        bank.setSkills(bankSkills);
        projectRepository.save(bank);

        // 4. Student Performance Analytics & Prediction System
        Optional<Project> optStudent = projectRepository.findBySlug("student-performance-system");
        Project student = optStudent.orElseGet(Project::new);
        student.setTitle("Student Performance Analytics & Prediction System");
        student.setSlug("student-performance-system");
        student.setSummary("Machine learning-driven academic intelligence platform that predicts student academic outcomes, identifies at-risk students, and provides actionable performance analytics using Flask, MySQL, and Scikit-Learn.");
        student.setDescriptionMarkdown("### Predictive Educational Analytics & Risk Early-Warning Engine\nAn academic intelligence platform designed to empower educators with data-driven predictive student performance forecasting.\n\n#### Core Architectural Capabilities\n- **Predictive Machine Learning Pipeline**: Scikit-Learn regression and classification models trained on historical student assessment records.\n- **At-Risk Student Identification**: Automated early-warning indicators highlighting students needing academic intervention.\n- **Relational Data Modeling**: Structured MySQL schema with Flask-SQLAlchemy migrations and JWT authenticated teacher/student portals.\n- **Actionable Diagnostic Dashboards**: Subject score breakdowns, attendance correlation charts, and semester progress tracking.\n- **Automated Grade Reports**: Summary exports and analytical performance digests for academic advisors.");
        student.setCategory("AI_ML");
        student.setThumbnailUrl("/assets/projects/student_system.jpg");
        student.setBannerUrl("/assets/projects/student_system.jpg");
        student.setLiveUrl(""); // Academic ML system
        student.setGithubUrl("https://github.com/kanhaiya28pandey/student-performance-system");
        student.setFeatured(true);
        student.setDisplayOrder(4);
        student.setStatus(ContentStatus.PUBLISHED);
        Set<Skill> studentSkills = new HashSet<>();
        skillRepository.findByName("Python").ifPresent(studentSkills::add);
        skillRepository.findByName("MySQL").ifPresent(studentSkills::add);
        skillRepository.findByName("React").ifPresent(studentSkills::add);
        skillRepository.findByName("REST APIs").ifPresent(studentSkills::add);
        student.setSkills(studentSkills);
        projectRepository.save(student);

        log.info("Projects ecosystem synchronized with authentic repositories. Total projects: {}", projectRepository.count());
    }

    private void syncExperienceEcosystem() {
        log.info("Synchronizing authentic engineering internships ecosystem...");

        // 1. ElevanceSkill — Remote Full Stack Web Development Internship
        Optional<Experience> optElevance = experienceRepository.findAll().stream()
                .filter(e -> e.getOrganization().toLowerCase().contains("elevance"))
                .findFirst();
        Experience elevance = optElevance.orElseGet(Experience::new);
        elevance.setOrganization("ElevanceSkill");
        elevance.setRole("Full-Stack Web Development Intern");
        elevance.setLocation("Remote, India");
        elevance.setDuration("Jun 2024 – Aug 2024");
        elevance.setEmploymentType("Fully Remote");
        elevance.setAssignedProjectName("YourTube (YouTube Clone Platform)");
        elevance.setAssignedProjectSlug("youtube-clone");
        elevance.setTechnologies("Next.js 15, React 19, TypeScript, Node.js, Express, MongoDB, Razorpay, WebRTC, Socket.IO");
        elevance.setCertificatesJson("[" +
            "{\"title\":\"Completion Certificate\",\"fileUrl\":\"/assets/certificates/elevanceskill_certificate.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"Experience Letter\",\"fileUrl\":\"/assets/certificates/elevanceskill_experience_letter.pdf\",\"type\":\"LETTER\"}," +
            "{\"title\":\"Letter of Recommendation (LOR)\",\"fileUrl\":\"/assets/certificates/elevanceskill_lor.pdf\",\"type\":\"LOR\"}" +
        "]");
        elevance.setDescriptionMarkdown(
            "Joined ElevanceSkill as a Full-Stack Web Development Intern to build high-performance streaming architectures.\n" +
            "Architected and engineered \"YourTube\", an end-to-end media streaming platform replicating production YouTube capabilities.\n" +
            "Engineered chunked multipart video upload processing and responsive video playback using Next.js 15, Node.js, and Express.\n" +
            "Integrated JWT authentication with multi-factor SMS/phone OTP verification for zero-trust user onboarding.\n" +
            "Configured Razorpay payment workflows for premium channel subscriptions and automated billing pipelines.\n" +
            "Implemented real-time WebRTC peer-to-peer calling and Socket.IO instant messaging and notification hubs."
        );
        elevance.setCurrent(false);
        elevance.setDisplayOrder(1);
        elevance.setStatus(ContentStatus.PUBLISHED);
        experienceRepository.save(elevance);

        // 2. Google AI-ML Virtual Internship — Supported by EduSkills
        Optional<Experience> optGoogle = experienceRepository.findAll().stream()
                .filter(e -> e.getOrganization().toLowerCase().contains("google"))
                .findFirst();
        Experience google = optGoogle.orElseGet(Experience::new);
        google.setOrganization("Google AI-ML • EduSkills Foundation");
        google.setRole("Artificial Intelligence & Machine Learning Intern");
        google.setLocation("Virtual / Remote, India");
        google.setDuration("Jul 2024 – Sep 2024");
        google.setEmploymentType("Virtual Internship");
        google.setAssignedProjectName(null);
        google.setAssignedProjectSlug(null);
        google.setTechnologies("Python, Machine Learning, TensorFlow, Scikit-Learn, Pandas, NumPy, Deep Learning, Model Evaluation");
        google.setCertificatesJson("[" +
            "{\"title\":\"Google AI-ML Internship Certificate\",\"fileUrl\":\"/assets/certificates/google_aiml_eduskills_certificate.pdf\",\"type\":\"CERTIFICATE\"}" +
        "]");
        google.setDescriptionMarkdown(
            "Selected for the Google for Developers & EduSkills Foundation artificial intelligence and machine learning industry internship track.\n" +
            "Engineered end-to-end predictive modeling pipelines using Scikit-Learn regression, classification, and clustering algorithms.\n" +
            "Built and fine-tuned neural network architectures with TensorFlow and Keras for pattern recognition and image classification.\n" +
            "Executed automated exploratory data analysis (EDA), statistical validation, missing value imputation, and feature scaling with Pandas.\n" +
            "Conducted hyperparameter grid searches, ROC-AUC curve analysis, and confusion matrix evaluations for production readiness.\n" +
            "Collaborated in technical mentorship sessions, code reviews, and industry evaluation milestones under Google engineering mentors."
        );
        google.setCurrent(false);
        google.setDisplayOrder(2);
        google.setStatus(ContentStatus.PUBLISHED);
        experienceRepository.save(google);

        // 3. Palo Alto Networks Cybersecurity Virtual Internship — EduSkills
        Optional<Experience> optPaloAlto = experienceRepository.findAll().stream()
                .filter(e -> e.getOrganization().toLowerCase().contains("palo alto") || e.getOrganization().toLowerCase().contains("paloalto"))
                .findFirst();
        Experience paloAlto = optPaloAlto.orElseGet(Experience::new);
        paloAlto.setOrganization("Palo Alto Networks • EduSkills Foundation");
        paloAlto.setRole("Cybersecurity Virtual Intern");
        paloAlto.setLocation("Virtual / Remote, India");
        paloAlto.setDuration("Jan 2024 – Mar 2024");
        paloAlto.setEmploymentType("Virtual Internship");
        paloAlto.setAssignedProjectName(null);
        paloAlto.setAssignedProjectSlug(null);
        paloAlto.setTechnologies("Network Security, Next-Gen Firewalls, Cloud Security, SOC Operations, AI Cyber Defense, Zero Trust, Threat Intelligence");
        paloAlto.setCertificatesJson("[" +
            "{\"title\":\"Cybersecurity Fundamentals\",\"fileUrl\":\"/assets/certificates/paloalto_cybersecurity_fundamentals.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"Network Security Fundamentals\",\"fileUrl\":\"/assets/certificates/paloalto_network_security.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"Cloud Security Fundamentals\",\"fileUrl\":\"/assets/certificates/paloalto_cloud_security.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"SOC Operations Fundamentals\",\"fileUrl\":\"/assets/certificates/paloalto_soc_operations.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"AI in Cybersecurity Fundamentals\",\"fileUrl\":\"/assets/certificates/paloalto_ai_cybersecurity.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"Final EduSkills Internship Certificate\",\"fileUrl\":\"/assets/certificates/paloalto_eduskills_final.pdf\",\"type\":\"CERTIFICATE\"}" +
        "]");
        paloAlto.setDescriptionMarkdown(
            "Completed the enterprise cybersecurity virtual internship conducted by Palo Alto Networks Academy and EduSkills Foundation.\n" +
            "Mastered Next-Generation Firewall (NGFW) configuration, granular traffic inspection, and encrypted tunnel enforcement.\n" +
            "Conducted cloud security posture assessments, evaluating attack surface reduction and micro-segmentation policies.\n" +
            "Performed Security Operations Center (SOC) triage, multi-source log correlation, threat hunting, and automated incident alerting.\n" +
            "Explored predictive AI models for behavioral threat intelligence, anomaly detection, and automated zero-day mitigation.\n" +
            "Successfully earned 5 official Palo Alto Networks Academy credentials plus the comprehensive EduSkills final internship certificate."
        );
        paloAlto.setCurrent(false);
        paloAlto.setDisplayOrder(3);
        paloAlto.setStatus(ContentStatus.PUBLISHED);
        experienceRepository.save(paloAlto);

        log.info("Engineering internships ecosystem synchronized. Total experiences: {}", experienceRepository.count());
    }

    private void syncEducationEcosystem() {
        log.info("Synchronizing academic journey ecosystem for Kanhaiya Pandey...");

        // 1. Post-Graduation: MCA at SRM IST
        Optional<Education> optMca = educationRepository.findAll().stream()
                .filter(e -> e.getDegree().toLowerCase().contains("mca") || e.getDegree().toLowerCase().contains("master"))
                .findFirst();
        Education mca = optMca.orElseGet(Education::new);
        mca.setInstitution("SRM Institute of Science and Technology, Kattankulathur, Chennai, Tamil Nadu");
        mca.setDegree("Master of Computer Applications (MCA)");
        mca.setFieldOfStudy("Computer Applications & Software Engineering");
        mca.setDuration("2025 – 2027 (Present)");
        mca.setGradeOrPercentage("CGPA: 9.885");
        mca.setDescription("Advanced graduate coursework focusing on Data Structures & Algorithms, Distributed Backend Systems, Database Architecture, Cloud Computing, and Scalable Full-Stack Engineering.");
        mca.setDisplayOrder(1);
        mca.setStatus(ContentStatus.PUBLISHED);
        mca.setCertificatesJson("[" +
            "{\"title\":\"Semester Grade Card / Marksheet\",\"fileUrl\":\"/assets/certificates/srm_mca_grade_card.pdf\",\"type\":\"MARKSHEET\"}," +
            "{\"title\":\"Student Identity & Enrollment Verification\",\"fileUrl\":\"/assets/certificates/srm_student_id.pdf\",\"type\":\"CERTIFICATE\"}" +
        "]");
        educationRepository.save(mca);

        // 2. Under-Graduation: BCA at SVBP College
        Optional<Education> optBca = educationRepository.findAll().stream()
                .filter(e -> e.getDegree().toLowerCase().contains("bca") || e.getDegree().toLowerCase().contains("bachelor"))
                .findFirst();
        Education bca = optBca.orElseGet(Education::new);
        bca.setInstitution("Sardar Vallabh Bhai Patel College, Bhabua (Kaimur), Bihar / Veer Kunwar Singh University");
        bca.setDegree("Bachelor of Computer Applications (BCA)");
        bca.setFieldOfStudy("Computer Applications");
        bca.setDuration("2021 – 2024");
        bca.setGradeOrPercentage("74.52% (First Class)");
        bca.setDescription("Comprehensive undergraduate curriculum covering Object-Oriented Programming (Java & C++), Data Structures, Relational Database Management Systems (SQL), Web Technologies, and Software Project Development.");
        bca.setDisplayOrder(2);
        bca.setStatus(ContentStatus.PUBLISHED);
        bca.setCertificatesJson("[" +
            "{\"title\":\"BCA Degree Certificate\",\"fileUrl\":\"/assets/certificates/bca_degree_certificate.pdf\",\"type\":\"CERTIFICATE\"}," +
            "{\"title\":\"Consolidated Final Marksheet\",\"fileUrl\":\"/assets/certificates/bca_consolidated_marksheet.pdf\",\"type\":\"MARKSHEET\"}" +
        "]");
        educationRepository.save(bca);

        // 3. Higher Secondary: 12th Intermediate in Science
        Optional<Education> opt12th = educationRepository.findAll().stream()
                .filter(e -> e.getDegree().toLowerCase().contains("12th") || e.getDegree().toLowerCase().contains("senior secondary"))
                .findFirst();
        Education edu12th = opt12th.orElseGet(Education::new);
        edu12th.setInstitution("Atal Bihari Singh High School, Bhabua (Kaimur), Bihar / BSEB");
        edu12th.setDegree("Senior Secondary (12th / Intermediate in Science)");
        edu12th.setFieldOfStudy("Physics, Chemistry & Mathematics (PCM)");
        edu12th.setDuration("2019 – 2021");
        edu12th.setGradeOrPercentage("71% (First Division)");
        edu12th.setDescription("Higher secondary curriculum specializing in advanced Mathematics, Physics, Chemistry, and analytical problem solving with First Division honors.");
        edu12th.setDisplayOrder(3);
        edu12th.setStatus(ContentStatus.PUBLISHED);
        edu12th.setCertificatesJson("[" +
            "{\"title\":\"12th Board Marksheet\",\"fileUrl\":\"/assets/certificates/12th_board_marksheet.pdf\",\"type\":\"MARKSHEET\"}," +
            "{\"title\":\"12th Passing Certificate\",\"fileUrl\":\"/assets/certificates/12th_passing_certificate.pdf\",\"type\":\"CERTIFICATE\"}" +
        "]");
        educationRepository.save(edu12th);

        // 4. Secondary: 10th Matriculation
        Optional<Education> opt10th = educationRepository.findAll().stream()
                .filter(e -> e.getDegree().toLowerCase().contains("10th") || e.getDegree().toLowerCase().contains("matric"))
                .findFirst();
        Education edu10th = opt10th.orElseGet(Education::new);
        edu10th.setInstitution("Atal Bihari Singh High School, Bhabua (Kaimur), Bihar / BSEB");
        edu10th.setDegree("Secondary School Examination (10th / Matriculation)");
        edu10th.setFieldOfStudy("General Science, Mathematics & Social Studies");
        edu10th.setDuration("2017 – 2019");
        edu10th.setGradeOrPercentage("First Division");
        edu10th.setDescription("Foundational academic education with focus on Mathematics, Science, and Social Sciences, completed with First Division distinction.");
        edu10th.setDisplayOrder(4);
        edu10th.setStatus(ContentStatus.PUBLISHED);
        edu10th.setCertificatesJson("[" +
            "{\"title\":\"10th Board Marksheet\",\"fileUrl\":\"/assets/certificates/10th_board_marksheet.pdf\",\"type\":\"MARKSHEET\"}," +
            "{\"title\":\"10th Matriculation Passing Certificate\",\"fileUrl\":\"/assets/certificates/10th_passing_certificate.pdf\",\"type\":\"CERTIFICATE\"}" +
        "]");
        educationRepository.save(edu10th);

        log.info("Academic journey ecosystem synchronized. Total education entries: {}", educationRepository.count());
    }

    private void syncCertificatesEcosystem() {
        log.info("Synchronizing authentic certificates and credentials ecosystem...");

        // Remove legacy placeholder/sample certificates if present
        List<Certificate> allCerts = certificateRepository.findAll();
        for (Certificate c : allCerts) {
            if (c.getIssuingOrg() != null && (c.getIssuingOrg().contains("Coursera") 
                    || c.getTitle().startsWith("IBM") 
                    || c.getTitle().startsWith("Meta") 
                    || c.getTitle().startsWith("Amazon") 
                    || c.getTitle().startsWith("AWS"))) {
                certificateRepository.delete(c);
            }
        }

        record CertSeed(String title, String org, String date, String url, String iconKey, int order) {}

        List<CertSeed> seeds = List.of(
            new CertSeed("OpenAI & Generative AI", "SRM University", "2025", "https://www.srmist.edu.in", "brain", 1),
            new CertSeed("Full Stack Developer", "Oasis Technologies Pvt. Ltd.", "2024", "/assets/certificates/oasis_fullstack_certificate.pdf", "layers", 2),
            new CertSeed("Microsoft Python", "Microsoft", "2025", "https://learn.microsoft.com", "terminal", 3),
            new CertSeed("Web Development with Python", "Microsoft", "2025", "https://learn.microsoft.com", "globe", 4),
            new CertSeed("Advanced Python Development Techniques", "Microsoft", "2025", "https://learn.microsoft.com", "cpu", 5),
            new CertSeed("Python Programming Fundamentals", "Microsoft", "2025", "https://learn.microsoft.com", "book", 6),
            new CertSeed("Data Analysis & Visualization with Python", "Microsoft", "2025", "https://learn.microsoft.com", "chart", 7),
            new CertSeed("Automation and Scripting with Python", "Microsoft", "2025", "https://learn.microsoft.com", "cog", 8)
        );

        for (CertSeed s : seeds) {
            Optional<Certificate> opt = certificateRepository.findByTitle(s.title());
            Certificate cert = opt.orElseGet(Certificate::new);
            cert.setTitle(s.title());
            cert.setIssuingOrg(s.org());
            cert.setIssueDate(s.date());
            cert.setIconKey(s.iconKey());
            if (cert.getCredentialUrl() == null || cert.getCredentialUrl().isBlank() || opt.isEmpty()) {
                cert.setCredentialUrl(s.url());
            }
            cert.setDisplayOrder(s.order());
            cert.setStatus(ContentStatus.PUBLISHED);
            certificateRepository.save(cert);
        }

        log.info("Certificates ecosystem synchronized successfully. Total certificates: {}", certificateRepository.count());
    }

    private record SkillSeedData(String name, String category, String level, String description, String iconKey, int displayOrder) {}
}
