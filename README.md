# 🚀 Kanhaiya Pandey — Full-Stack Portfolio & Dynamic CMS

![Java 21](https://img.shields.io/badge/Java-21_LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot 3](https://img.shields.io/badge/Spring_Boot-3.3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> A production-grade, enterprise-architected **Full-Stack Developer Portfolio & Content Management System (CMS)**. Built with high-performance reactive animations, 2.5D/3D visual canvas components, real-time SMTP email notifications, dynamic UPI payment QR generation, automated database migrations, and a secure administration control panel.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
  - [Public User Panel](#1-public-user-panel)
  - [Administration Control Panel (CMS)](#2-administration-control-panel-cms)
- [System Architecture](#-system-architecture)
- [Tech Stack & Tools Required](#-tech-stack--tools-required)
- [Getting Started (Local Development)](#-getting-started-local-development)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Environment Configuration (.env)](#2-environment-configuration-env)
  - [3. Start the Backend](#3-start-the-backend)
  - [4. Start the Frontend](#4-start-the-frontend)
- [Docker Deployment (All-in-One)](#-docker-deployment-all-in-one)
- [Cloud Deployment Guide](#-cloud-deployment-guide)
  - [Step 1: Free Cloud PostgreSQL (Neon / Render)](#step-1-free-cloud-postgresql-neon--render)
  - [Step 2: Deploy Spring Boot Backend (Render)](#step-2-deploy-spring-boot-backend-render)
  - [Step 3: Deploy React Frontend (Vercel)](#step-3-deploy-react-frontend-vercel)
- [Admin Panel Guide](#-admin-panel-guide)
- [Project Directory Structure](#-project-directory-structure)
- [Security & Best Practices](#-security--best-practices)
- [Author & Credits](#-author--credits)

---

## 🌟 Key Features

### 1. Public User Panel
- **Hero & Identity Core**: Dynamic headline rotator, 3D Monogram badge, live status indicators, interactive resume download, and quick contact call-to-actions.
- **Interactive Skills Universe**: Dynamic 2.5D node constellation with particle links, filtering by category (Frontend, Backend, Database, AI/ML, DevOps), search bar, and detailed skill inspector modal.
- **Featured Projects**: Filterable project cards with live demos, GitHub links, technology tags, and comprehensive modal overview showing problem statements, solutions, and key takeaways.
- **Work Experience & Internships**: Timeline showing engineering roles, tech stacks, responsibilities, and achievements.
- **Education & Academics**: Clean academic cards highlighting institutions, degrees, duration, and coursework.
- **Verified Credentials & Certificates**: Filterable certifications with verified credential URLs and direct image/PDF preview.
- **Real-Time Contact & Inquiry Engine**: Validated contact form with anti-spam rate limiting, storing messages in PostgreSQL and instantly triggering a **formatted HTML email alert** to your personal Gmail.
- **Dynamic UPI Support Modal**: Amount selection (₹50, ₹100, ₹250, ₹500, Custom), live dynamic UPI QR code generator, 1-click UPI ID copy, and direct mobile deep-linking for Google Pay, PhonePe, and Paytm.
- **Responsive Dark / Light Mode**: Smooth theme toggling across the entire site with high-contrast, accessible palettes and CSS glassmorphism.

### 2. Administration Control Panel (CMS)
- **Protected Access**: Route-guarded (`/admin` and `/admin/dashboard`) with BCrypt hashed passwords and encrypted `HttpOnly` JWT session cookies.
- **Inquiry Management Inbox**: Real-time listing of all contact form messages with status toggling (`NEW`, `READ`, `REPLIED`, `ARCHIVED`).
- **Visitor Telemetry & Analytics**: Live tracking of visitor count, page paths, browser types, and device breakdown (Mobile vs. Desktop).
- **Dynamic Content Management**:
  - Add, edit, or delete **Projects**, **Skills**, **Certificates**, **Education**, and **Experience**.
  - Update **Profile details**, bio, availability badge, and UPI Support handle in real time without code modifications.
- **Audit Logging**: Automatic timestamped audit trails of all administrative actions.

---

## 🏗 System Architecture

```
                                  ┌───────────────────────────┐
                                  │      Client Browser       │
                                  │   (Desktop / Mobile)      │
                                  └─────────────┬─────────────┘
                                                │
                                    HTTPS / REST API Calls
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Vite + React 19 Frontend                              │
│                                                                                         │
│  • Public Layout (Hero, About, Skills Universe, Projects, Experience, Contact, Support) │
│  • Admin Protected Routes (/admin, /admin/dashboard)                                    │
│  • SupportModalContext (Centralized Unified Modal Engine)                               │
│  • ThemeContext (Dark / Light Theme Engine)                                             │
└───────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                │
                                    JSON API / JWT Cookie Auth
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               Spring Boot 3.3.5 Backend API                             │
│                                                                                         │
│  • Spring Security 6 + JJWT Cookie Authentication Filter                                │
│  • Public Endpoints (/api/v1/public/*) & Protected Admin Endpoints (/api/v1/admin/*)   │
│  • ContactService & Async JavaMailSender (Live Gmail SMTP Notification Engine)          │
│  • VisitorAnalyticsService (Real-time IP & Device Telemetry)                            │
│  • Flyway Database Migrations (V1, V2, V3, V4 automatic schema synchronization)         │
└───────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                │
                                    JDBC Connection (HikariCP)
                                                │
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                             PostgreSQL 16+ Relational Database                          │
│                                                                                         │
│  • profiles, skills, projects, project_skills, experiences, educations                  │
│  • certificates, achievements, contact_messages, visitor_logs, admins, audit_logs       │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack & Tools Required

### Development Tools Required
To run and modify this project locally, ensure you have the following installed:

| Tool | Version Required | Download Link |
| :--- | :--- | :--- |
| **Java Development Kit (JDK)** | 21 LTS | [Download Eclipse Temurin 21](https://adoptium.net/temurin/releases/?version=21) |
| **Node.js** | 20.x or 22.x LTS | [Download Node.js](https://nodejs.org/) |
| **PostgreSQL** (or pgAdmin 4) | 16 or newer | [Download PostgreSQL](https://www.postgresql.org/download/) |
| **Git** | 2.x+ | [Download Git](https://git-scm.com/) |
| **Docker & Compose** *(Optional)* | Latest | [Download Docker Desktop](https://www.docker.com/) |

### Libraries & Frameworks
- **Backend**: Spring Boot 3.3.5, Spring Security 6, Spring Data JPA, Hibernate 6, Flyway, JJWT 0.12.6, Apache Tika.
- **Frontend**: React 19, Vite 8, TypeScript 5.6, Tailwind CSS 3.4, Framer Motion 12, Lucide React, Three.js.

---

## 💻 Getting Started (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-portfolio-repo.git
cd your-portfolio-repo
```

### 2. Environment Configuration (.env)
Duplicate the provided `.env.example` file to create your local `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your values (replace placeholders with your real values):

```env
# 1. Environment Profile ('prod' for PostgreSQL, 'dev' for embedded H2)
SPRING_PROFILES_ACTIVE=prod

# 2. Admin Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# 3. JWT Security Key (At least 64 random characters)
JWT_SECRET=replace_with_at_least_64_characters_random_hex_or_base64_string

# 4. Live SMTP Gmail Notifications (Optional)
MAIL_ENABLED=true
MAIL_RECIPIENT=your_notification_email@gmail.com
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your_sender_gmail@gmail.com
SPRING_MAIL_PASSWORD=your_16_letter_google_app_password

# 5. CORS Allowed Origins
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173

# 6. PostgreSQL Database
DATABASE_URL=jdbc:postgresql://localhost:5432/portfolio_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_postgres_password

# 7. Frontend API URL
VITE_API_URL=http://localhost:8080/api/v1
```

> ⚠️ **IMPORTANT**: `.env` is strictly listed in `.gitignore`. **NEVER** push your `.env` file containing real passwords or Google App Passwords to GitHub!

### 3. Start the Backend
Open a terminal in the `backend` directory:

```bash
# Windows
cd backend
.\mvnw.cmd spring-boot:run

# Linux / macOS
cd backend
./mvnw spring-boot:run
```

- When the backend boots, **Flyway automatically connects to PostgreSQL, creates all 14 tables, and seeds initial data**.
- The backend API will be live at: `http://localhost:8080`
- Health check endpoint: `http://localhost:8080/api/v1/public/health`

### 4. Start the Frontend
Open a second terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

- Open your browser at: `http://localhost:5173`
- The user panel will load dynamically using data from your local PostgreSQL database!

---

## 🐳 Docker Deployment (All-in-One)

You can launch the entire stack (PostgreSQL + Spring Boot + React + Nginx) with a single command:

```bash
docker compose up -d --build
```

- **Frontend**: `http://localhost` (Port 80)
- **Backend API**: `http://localhost:8080`
- **PostgreSQL**: `localhost:5432`

To shut down:
```bash
docker compose down
```

---

## ☁️ Cloud Deployment Guide

Here is the recommended 100% free production deployment architecture:

### Step 1: Free Cloud PostgreSQL (Neon / Render)
1. Sign up for free at [Neon.tech](https://neon.tech) or [Render.com](https://render.com).
2. Create a new PostgreSQL database (e.g., `portfolio_db`).
3. Copy your database connection credentials:
   - **Host**: `ep-xyz.region.aws.neon.tech`
   - **Database**: `portfolio_db`
   - **Username**: `your_username`
   - **Password**: `your_password`
   - **JDBC URL**: `jdbc:postgresql://ep-xyz.region.aws.neon.tech/portfolio_db?sslmode=require`

### Step 2: Deploy Spring Boot Backend (Render)
1. Push your repository to GitHub.
2. Log in to [Render.com](https://render.com) ➔ Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Root Directory**: `backend`
   - **Runtime**: `Docker` (Render will automatically detect `backend/Dockerfile`)
   - **Instance Type**: `Free`
5. Add Environment Variables:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DATABASE_URL`: `jdbc:postgresql://<host>:5432/<dbname>?sslmode=require`
   - `DATABASE_USERNAME`: `<db_username>`
   - `DATABASE_PASSWORD`: `<db_password>`
   - `SPRING_MAIL_USERNAME`: `<your_gmail>`
   - `SPRING_MAIL_PASSWORD`: `<your_16_char_google_app_password>`
   - `MAIL_RECIPIENT`: `<your_gmail>`
   - `MAIL_ENABLED`: `true`
   - `JWT_SECRET`: `<64_char_random_secret>`
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `<your_admin_password>`
   - `CORS_ALLOWED_ORIGINS`: `https://your-portfolio.vercel.app`
6. Click **Deploy**. When it finishes, Render will provide your public backend URL (e.g., `https://portfolio-api.onrender.com`).

### Step 3: Deploy React Frontend (Vercel)
1. Log in to [Vercel.com](https://vercel.com) ➔ Click **Add New...** ➔ **Project**.
2. Select your GitHub repository.
3. Configure project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://portfolio-api.onrender.com/api/v1` *(your Render backend URL)*
5. Click **Deploy**!
6. Copy your live Vercel URL (e.g. `https://your-portfolio.vercel.app`) and ensure it matches `CORS_ALLOWED_ORIGINS` in your Render backend dashboard.

---

## 🔐 Admin Panel Guide

- **URL**: Navigate to `/admin` on your deployed site (e.g. `https://your-portfolio.vercel.app/admin`).
- **Security**: There are no public buttons linking to the admin panel on the user-facing site.
- **Authentication**: Enter your `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- **Capabilities**:
  - Read, filter, and respond to incoming contact inquiries.
  - View real-time visitor analytics, browser distributions, and device metrics.
  - Add, modify, or archive projects, skills, certifications, educations, and career experiences.
  - Change your profile bio, status banner, contact email, and UPI Support handle instantly.

---

## 📂 Project Directory Structure

```
My Portfolio/
├── .env.example               # Sanitized environment template (Safe for Git)
├── .gitignore                 # Strict ignore rules protecting secrets & builds
├── docker-compose.yml         # Container orchestration (PostgreSQL + Spring + React)
├── package.json               # Root monorepo scripts runner
├── README.md                  # Comprehensive documentation
├── scripts/
│   ├── backup-db.ps1          # Automated database backup script (Windows PowerShell)
│   └── backup-db.sh           # Automated database backup script (Linux / Mac Bash)
│
├── backend/                   # Spring Boot 3.3.5 Backend Engine
│   ├── Dockerfile             # Multi-stage production container build (Temurin 21)
│   ├── pom.xml                # Maven project configuration & dependencies
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/pandeyjee/portfolio/
│   │   │   │   ├── config/    # Security, CORS, JWT & Data Initializer configs
│   │   │   │   ├── controller/# REST Controllers (Public & Admin)
│   │   │   │   ├── entity/    # JPA Relational Entities
│   │   │   │   ├── repository/# Spring Data JPA Repositories
│   │   │   │   └── service/   # Business logic (Contact, Email, Analytics)
│   │   │   └── resources/
│   │   │       ├── application.yml        # Base application settings
│   │   │       ├── application-dev.yml    # Development profile (Embedded H2)
│   │   │       ├── application-prod.yml   # Production profile (PostgreSQL)
│   │   │       └── db/migration/          # Flyway SQL schema & seed scripts
│   │   └── test/                          # Unit & integration test suites
│
└── frontend/                  # React 19 + TypeScript + Vite Frontend
    ├── Dockerfile             # Multi-stage container build with Nginx
    ├── nginx.conf             # Nginx reverse proxy & SPA fallback configuration
    ├── vercel.json            # Vercel Single-Page Application rewrites
    ├── package.json           # Frontend dependencies & build scripts
    ├── tailwind.config.js     # Custom design system tokens & theme palettes
    ├── vite.config.ts         # Vite build bundler configuration
    ├── public/                # Static assets, logos, and project screenshots
    └── src/
        ├── components/        # Reusable UI, 3D Canvas, Hero, Modals, Navbar, Footer
        ├── context/           # SupportModalContext, ThemeContext
        ├── pages/             # HomePage, AdminLoginPage, AdminDashboardPage
        ├── sections/          # Hero, About, Skills, Projects, Experience, Contact
        ├── services/          # API integration client with fallback dataset
        └── styles/            # Design tokens & animation definitions
```

---

## 🛡 Security & Best Practices

- **Zero Credentials in Git**: `.env` and `uploads/` are strictly ignored by `.gitignore`.
- **JWT HttpOnly Cookies**: Admin tokens are transmitted via `HttpOnly`, `SameSite=Strict` cookies to safeguard against Cross-Site Scripting (XSS).
- **BCrypt Encryption**: Passwords are never stored in plaintext and are hashed using BCrypt.
- **CORS Restricted**: Backend endpoints only permit requests originating from explicitly configured frontend domains.
- **SQL Injection Defense**: All database transactions utilize JPA prepared statements via Spring Data repositories.
- **MIME & File Validation**: Uploads are verified using Apache Tika magic-byte inspection to prevent arbitrary file upload vulnerabilities.

---

## 👨‍💻 Author & Credits

**Kanhaiya Pandey**  
- **Role**: Software Engineer • Full-Stack Developer • MCA Graduate  
- **GitHub**: [@kanhaiya28pandey](https://github.com/kanhaiya28pandey/)  
- **LinkedIn**: [Kanhaiya Pandey](https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/)  
- **Email**: [kanhaiya542112@gmail.com](mailto:kanhaiya542112@gmail.com)  

---

⭐ *If you find this portfolio architecture helpful, feel free to star the repository!*
