import React, { useState } from "react";
import {
  Calendar,
  Folder,
  Zap,
  ExternalLink,
  Award,
  Shield,
  CheckCircle2,
  Sparkles,
  X,
  Download,
  FileText,
  Lock,
  Briefcase,
  Layers,
  Cpu,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { Experience, ExperienceCertificate } from "../types/portfolio";
import { resolveAssetUrl } from "../utils/assetUrl";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Selected certificate for preview modal
  const [activeModalCert, setActiveModalCert] = useState<{
    cert: ExperienceCertificate;
    organization: string;
    role: string;
  } | null>(null);

  if (!experiences || experiences.length === 0) return null;

  // Helper to scroll smoothly to a project in the projects section
  const handleScrollToProject = (_slug?: string) => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to parse certificates safely
  const getCertificates = (exp: Experience): ExperienceCertificate[] => {
    if (exp.certificatesJson) {
      try {
        const parsed = JSON.parse(exp.certificatesJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    if (exp.certificates && exp.certificates.length > 0) {
      return exp.certificates;
    }

    // Default fallbacks by organization
    const o = (exp.organization || "").toLowerCase();
    if (o.includes("elevance")) {
      return [
        { title: "Completion Certificate", fileUrl: "/assets/certificates/elevanceskill_certificate.pdf", type: "CERTIFICATE" },
        { title: "Experience Letter", fileUrl: "/assets/certificates/elevanceskill_experience_letter.pdf", type: "LETTER" },
        { title: "Letter of Recommendation (LOR)", fileUrl: "/assets/certificates/elevanceskill_lor.pdf", type: "LOR" },
      ];
    }
    if (o.includes("google") || (exp.role || "").toLowerCase().includes("aiml")) {
      return [
        { title: "Google AI-ML Internship Certificate", fileUrl: "/assets/certificates/google_aiml_eduskills_certificate.pdf", type: "CERTIFICATE" },
      ];
    }
    if (o.includes("palo") || (exp.role || "").toLowerCase().includes("cyber")) {
      return [
        { title: "Cybersecurity Fundamentals", fileUrl: "/assets/certificates/paloalto_cybersecurity_fundamentals.pdf", type: "CERTIFICATE" },
        { title: "Network Security Fundamentals", fileUrl: "/assets/certificates/paloalto_network_security.pdf", type: "CERTIFICATE" },
        { title: "Cloud Security Fundamentals", fileUrl: "/assets/certificates/paloalto_cloud_security.pdf", type: "CERTIFICATE" },
        { title: "SOC Operations Fundamentals", fileUrl: "/assets/certificates/paloalto_soc_operations.pdf", type: "CERTIFICATE" },
        { title: "AI in Cybersecurity Fundamentals", fileUrl: "/assets/certificates/paloalto_ai_cybersecurity.pdf", type: "CERTIFICATE" },
        { title: "Final EduSkills Internship Certificate", fileUrl: "/assets/certificates/paloalto_eduskills_final.pdf", type: "CERTIFICATE" },
      ];
    }
    return [];
  };

  // Helper to parse technologies
  const getTechnologies = (exp: Experience): string[] => {
    if (exp.technologies) {
      return exp.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    const o = (exp.organization || "").toLowerCase();
    if (o.includes("elevance")) {
      return ["Next.js 15", "React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Razorpay", "WebRTC", "Socket.IO"];
    }
    if (o.includes("google")) {
      return ["Python", "Machine Learning", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Deep Learning", "Model Evaluation"];
    }
    if (o.includes("palo")) {
      return ["Network Security", "Next-Gen Firewalls", "Cloud Security", "SOC Operations", "AI Cyber Defense", "Zero Trust", "Threat Intelligence"];
    }
    return ["Software Engineering", "System Architecture", "Problem Solving"];
  };

  // Helper to extract 5 to 6 key responsibilities
  const getResponsibilities = (markdown: string): string[] => {
    if (!markdown) return [];
    const lines = markdown.split("\n");
    const bullets: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      if (trimmed.toLowerCase().includes("verified credential")) continue;
      const clean = trimmed.replace(/^[-*•]\s+/, "").replace(/^\*\*(.*?)\*\*[:\-]?\s*/, "$1: ").trim();
      if (clean) bullets.push(clean);
    }

    return bullets.slice(0, 6);
  };

  // Get icon for certificate button
  const getCertButtonIcon = (title: string, type?: string) => {
    const t = (title + " " + (type || "")).toLowerCase();
    if (t.includes("lor") || t.includes("recommendation")) {
      return <Award className="w-3.5 h-3.5 flex-shrink-0" />;
    }
    if (t.includes("letter") || t.includes("experience")) {
      return <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />;
    }
    if (t.includes("nda") || t.includes("security") || t.includes("lock")) {
      return <Lock className="w-3.5 h-3.5 flex-shrink-0" />;
    }
    return <FileText className="w-3.5 h-3.5 flex-shrink-0" />;
  };

  // Timeline badge icon helper
  const getTimelineIcon = (org: string, role: string) => {
    const o = (org || "").toLowerCase();
    const r = (role || "").toLowerCase();
    if (o.includes("elevance") || r.includes("fullstack")) {
      return <Layers className="w-4 h-4 text-cyan-400" />;
    }
    if (o.includes("google") || r.includes("aiml") || r.includes("ai")) {
      return <Cpu className="w-4 h-4 text-pink-400" />;
    }
    if (o.includes("palo") || r.includes("security") || r.includes("cyber")) {
      return <Shield className="w-4 h-4 text-emerald-400" />;
    }
    return <Briefcase className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <section
      id="experience"
      aria-label="Engineering Experience and Internships"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden select-text"
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(79, 70, 229, 0.10) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-[0.22em] uppercase shadow-sm transition-colors ${
              isDark
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                : "bg-cyan-50 border border-cyan-200 text-cyan-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INDUSTRY TRACKS • VERIFIED INTERNSHIPS</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p
            className={`text-xs sm:text-sm font-sans max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Production engineering, intelligent system architecture, and enterprise cybersecurity internships backed by verified industry credentials.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. TIMELINE + COMPACT FULL-WIDTH CARDS                                    */}
        {/* ========================================================================= */}
        <div className="relative space-y-8 sm:space-y-10">
          {/* Vertical Connecting Timeline Line */}
          <div
            className={`absolute left-4 sm:left-6 top-6 bottom-6 w-0.5 pointer-events-none hidden md:block transition-colors ${
              isDark
                ? "bg-gradient-to-b from-cyan-500/50 via-indigo-500/40 to-transparent"
                : "bg-gradient-to-b from-blue-400/60 via-indigo-400/40 to-transparent"
            }`}
          />

          {experiences.map((exp, idx) => {
            const certs = getCertificates(exp);
            const technologies = getTechnologies(exp);
            const responsibilities = getResponsibilities(exp.descriptionMarkdown);

            // Assigned project logic
            const assignedProjName =
              exp.assignedProjectName ||
              (exp.organization.toLowerCase().includes("elevance") ? "YourTube (YouTube Clone Platform)" : null);
            const assignedProjSlug =
              exp.assignedProjectSlug ||
              (exp.organization.toLowerCase().includes("elevance") ? "youtube-clone" : null);

            // Employment type logic
            const empType =
              exp.employmentType ||
              (exp.organization.toLowerCase().includes("elevance") ? "Fully Remote" : "Virtual Internship");

            return (
              <div key={exp.id || idx} className="relative flex items-start gap-4 sm:gap-6 text-left">
                {/* Timeline Avatar / Node (visible on md+) */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10 pt-5">
                  <div
                    className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isDark
                        ? "bg-[#091124] border-cyan-400/60 shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                        : "bg-white border-blue-500 shadow-[0_4px_16px_rgba(59,130,246,0.2)]"
                    }`}
                  >
                    {getTimelineIcon(exp.organization, exp.role)}
                  </div>
                </div>

                {/* Main Full-Width Compact Card */}
                <div
                  className={`w-full rounded-2xl sm:rounded-3xl border p-5 sm:p-7 space-y-5 transition-all duration-300 relative group overflow-hidden ${
                    isDark
                      ? "bg-[#060e1d]/90 sm:bg-[#071122]/90 border-cyan-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)]"
                      : "bg-white border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:border-blue-400 hover:shadow-[0_12px_32px_rgba(59,130,246,0.1)]"
                  }`}
                >
                  {/* Card Subtle Top Corner Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                  {/* ----------------------------------------------------------------- */}
                  {/* TOP HEADER ROW                                                    */}
                  {/* ----------------------------------------------------------------- */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 relative z-10">
                    {/* Left: Role & Company */}
                    <div className="space-y-1">
                      <h3
                        className={`text-xl sm:text-2xl font-bold font-sans tracking-tight ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm sm:text-base font-bold font-sans text-cyan-400 hover:text-cyan-300 transition-colors">
                          @{exp.organization}
                        </span>
                        {exp.location && (
                          <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            • {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Badges & Duration Date */}
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center gap-2 flex-wrap sm:justify-end">
                        {/* Employment Type Badge */}
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-colors ${
                            isDark
                              ? "bg-cyan-950/50 border-cyan-500/40 text-cyan-300"
                              : "bg-cyan-50 border-cyan-300 text-cyan-800"
                          }`}
                        >
                          {empType}
                        </span>

                        {/* Status Badge */}
                        {exp.isCurrent ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                              isDark
                                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                                : "bg-emerald-50 border-emerald-300 text-emerald-800"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Currently Working
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                              isDark
                                ? "bg-indigo-950/60 border-indigo-500/40 text-indigo-300"
                                : "bg-indigo-50 border-indigo-200 text-indigo-800"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Duration Date with Calendar icon */}
                      <div
                        className={`inline-flex items-center gap-1.5 text-xs font-mono ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>
                          {exp.isCurrent
                            ? `${exp.duration || "Started"} – Present`
                            : exp.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* ASSIGNED PROJECT FOLDER BANNER (Only if project assigned)         */}
                  {/* ----------------------------------------------------------------- */}
                  {assignedProjName && (
                    <div
                      onClick={() => handleScrollToProject(assignedProjSlug || undefined)}
                      className={`group/proj p-3 sm:p-4 rounded-xl sm:rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 ${
                        isDark
                          ? "bg-[#040914]/80 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#050e20]"
                          : "bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <Folder className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400">
                            ASSIGNED PROJECT
                          </div>
                          <div
                            className={`text-xs sm:text-sm font-bold font-sans transition-colors ${
                              isDark ? "text-white group-hover/proj:text-cyan-300" : "text-slate-900 group-hover/proj:text-blue-600"
                            }`}
                          >
                            {assignedProjName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 group-hover/proj:translate-x-1 transition-transform">
                        <span className="hidden sm:inline text-[11px]">View in Showcase</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* KEY RESPONSIBILITIES (5 to 6 lines with lightning bolt ⚡)       */}
                  {/* ----------------------------------------------------------------- */}
                  <div className="space-y-2.5">
                    <div
                      className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      KEY RESPONSIBILITIES
                    </div>

                    <div className="space-y-2">
                      {responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5 fill-amber-400/30" />
                          <p
                            className={`text-xs sm:text-[13px] leading-relaxed ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {resp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* SKILLS & TECHNOLOGIES PILLS                                       */}
                  {/* ----------------------------------------------------------------- */}
                  <div className="space-y-2 pt-1">
                    <div
                      className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      SKILLS & TECHNOLOGIES
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border transition-colors ${
                            isDark
                              ? "bg-[#06182c]/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/60"
                              : "bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* CERTIFICATE BUTTONS ROW                                           */}
                  {/* ----------------------------------------------------------------- */}
                  {certs.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10 light:border-slate-200">
                      <div
                        className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        OFFICIAL CERTIFICATES & CREDENTIALS
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        {certs.map((cert, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() =>
                              setActiveModalCert({
                                cert,
                                organization: exp.organization,
                                role: exp.role,
                              })
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-md transition-all duration-200 cursor-pointer ${
                              cIdx % 2 === 0
                                ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:scale-[1.02]"
                                : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white shadow-[0_4px_14px_rgba(168,85,247,0.35)] hover:scale-[1.02]"
                            }`}
                          >
                            {getCertButtonIcon(cert.title, cert.type)}
                            <span>{cert.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE CREDENTIAL VIEWER MODAL                                    */}
      {/* ========================================================================= */}
      {activeModalCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-7 space-y-5 text-left shadow-2xl transition-all ${
              isDark ? "bg-[#091124] border-cyan-500/30 text-slate-100" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verified Industry Credential</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalCert(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Credential Details */}
            <div className="space-y-2">
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  isDark ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40" : "bg-cyan-50 text-cyan-800 border-cyan-200"
                }`}
              >
                {activeModalCert.cert.type || "Official Credential"}
              </span>

              <h3 className="text-xl font-bold font-sans pt-1 text-white dark:text-white light:text-slate-900">
                {activeModalCert.cert.title}
              </h3>

              <div className="text-xs font-mono text-purple-400">
                Issued for: {activeModalCert.role} @ {activeModalCert.organization}
              </div>
            </div>

            {/* Authentication Badge */}
            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                isDark ? "bg-white/[0.03] border-white/10 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authenticated Industry Training Credential</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                File: {activeModalCert.cert.fileUrl.split("/").pop()}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={resolveAssetUrl(activeModalCert.cert.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-mono font-bold shadow-[0_4px_14px_rgba(99,102,241,0.35)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View / Download Certificate</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveModalCert(null)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                  isDark ? "bg-white/5 hover:bg-white/10 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
