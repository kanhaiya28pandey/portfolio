import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Award,
  FileText,
  ExternalLink,
  Download,
  X,
  Building2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Trophy,
  GraduationCap,
} from 'lucide-react';
import type { Education, ExperienceCertificate } from '../types/portfolio';
import { resolveAssetUrl } from '../utils/assetUrl';

interface EducationSectionProps {
  educations: Education[];
}

interface ActiveModalDoc {
  doc: ExperienceCertificate;
  institution: string;
  degree: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  const [activeModalDoc, setActiveModalDoc] = useState<ActiveModalDoc | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (activeModalDoc) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeModalDoc]);
  const [isDark, setIsDark] = useState(true);

  // Sync with document theme class
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Keyboard escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalDoc(null);
    };
    if (activeModalDoc) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalDoc]);

  if (!educations || educations.length === 0) return null;

  // Sorted by displayOrder
  const sortedEducations = [...educations].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  // Helper for Academic Level Metadata
  const getLevelInfo = (degree: string, duration: string) => {
    const lowerDeg = degree.toLowerCase();
    const lowerDur = duration.toLowerCase();
    const isOngoing = lowerDur.includes('present') || lowerDur.includes('ongoing') || lowerDur.includes('2027');

    if (lowerDeg.includes('mca') || lowerDeg.includes('master')) {
      return {
        level: 'POST-GRADUATION (PG)',
        badgeColor: isDark
          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
          : 'bg-cyan-50 text-cyan-800 border-cyan-300',
        accentGradient: 'from-cyan-500 to-blue-600',
        icon: '🎓',
        isOngoing,
        statusLabel: isOngoing ? 'Ongoing / Final Year' : 'Completed',
        honorTitle: 'Premier Tier University',
      };
    }
    if (lowerDeg.includes('bca') || lowerDeg.includes('bachelor')) {
      return {
        level: 'UNDER-GRADUATION (UG)',
        badgeColor: isDark
          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
          : 'bg-purple-50 text-purple-800 border-purple-300',
        accentGradient: 'from-purple-500 to-indigo-600',
        icon: '🏛️',
        isOngoing: false,
        statusLabel: 'Graduated (First Class)',
        honorTitle: 'Graduation with Honors',
      };
    }
    if (lowerDeg.includes('12th') || lowerDeg.includes('senior secondary') || lowerDeg.includes('intermediate')) {
      return {
        level: 'HIGHER SECONDARY (12TH)',
        badgeColor: isDark
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          : 'bg-amber-50 text-amber-800 border-amber-300',
        accentGradient: 'from-amber-500 to-orange-600',
        icon: '📐',
        isOngoing: false,
        statusLabel: 'First Division (BSEB)',
        honorTitle: 'Science & Mathematics Track',
      };
    }
    if (lowerDeg.includes('10th') || lowerDeg.includes('matric') || lowerDeg.includes('secondary')) {
      return {
        level: 'SECONDARY SCHOOLING (10TH)',
        badgeColor: isDark
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-800 border-emerald-300',
        accentGradient: 'from-emerald-500 to-teal-600',
        icon: '📘',
        isOngoing: false,
        statusLabel: 'First Division (BSEB)',
        honorTitle: 'Foundational Excellence',
      };
    }
    return {
      level: 'ACADEMIC MILESTONE',
      badgeColor: isDark
        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        : 'bg-blue-50 text-blue-800 border-blue-300',
      accentGradient: 'from-blue-500 to-indigo-600',
      icon: '🎓',
      isOngoing: false,
      statusLabel: 'Academic Record',
      honorTitle: 'Verified Credential',
    };
  };

  // Helper for Marksheets & Certificates
  const getAttachedDocuments = (edu: Education): ExperienceCertificate[] => {
    if (edu.certificates && edu.certificates.length > 0) {
      return edu.certificates;
    }
    if (edu.certificatesJson) {
      try {
        const parsed = JSON.parse(edu.certificatesJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // ignore JSON parse error
      }
    }

    // Default fallback certificates based on degree if none provided
    const lowerDeg = edu.degree.toLowerCase();
    if (lowerDeg.includes('mca') || lowerDeg.includes('master')) {
      return [
        {
          title: 'Semester Grade Card / Marksheet',
          fileUrl: '/assets/certificates/srm_mca_grade_card.pdf',
          type: 'MARKSHEET',
        },
        {
          title: 'Student ID & Enrollment Verification',
          fileUrl: '/assets/certificates/srm_student_id.pdf',
          type: 'CERTIFICATE',
        },
      ];
    }
    if (lowerDeg.includes('bca') || lowerDeg.includes('bachelor')) {
      return [
        {
          title: 'BCA Degree Certificate',
          fileUrl: '/assets/certificates/bca_degree_certificate.pdf',
          type: 'CERTIFICATE',
        },
        {
          title: 'Consolidated Final Marksheet',
          fileUrl: '/assets/certificates/bca_consolidated_marksheet.pdf',
          type: 'MARKSHEET',
        },
      ];
    }
    if (lowerDeg.includes('12th') || lowerDeg.includes('senior secondary')) {
      return [
        {
          title: '12th Board Marksheet',
          fileUrl: '/assets/certificates/12th_board_marksheet.pdf',
          type: 'MARKSHEET',
        },
        {
          title: '12th Passing Certificate',
          fileUrl: '/assets/certificates/12th_passing_certificate.pdf',
          type: 'CERTIFICATE',
        },
      ];
    }
    if (lowerDeg.includes('10th') || lowerDeg.includes('matric')) {
      return [
        {
          title: '10th Board Marksheet',
          fileUrl: '/assets/certificates/10th_board_marksheet.pdf',
          type: 'MARKSHEET',
        },
        {
          title: '10th Matriculation Passing Certificate',
          fileUrl: '/assets/certificates/10th_passing_certificate.pdf',
          type: 'CERTIFICATE',
        },
      ];
    }
    return [];
  };

  // Helper for Coursework tags
  const getCourseworkTags = (edu: Education): string[] => {
    const lowerDeg = edu.degree.toLowerCase();
    if (lowerDeg.includes('mca') || lowerDeg.includes('master')) {
      return [
        'Data Structures & Algorithms',
        'Distributed Systems',
        'Database Management (DBMS)',
        'Cloud Computing',
        'Advanced Java & Spring',
        'Software Engineering',
      ];
    }
    if (lowerDeg.includes('bca') || lowerDeg.includes('bachelor')) {
      return [
        'Object-Oriented Programming (Java/C++)',
        'Data Structures',
        'Relational Databases & SQL',
        'Web Technologies',
        'Operating Systems',
        'Computer Networks',
      ];
    }
    if (lowerDeg.includes('12th') || lowerDeg.includes('senior secondary')) {
      return [
        'Advanced Mathematics',
        'Calculus & Algebra',
        'Classical & Modern Physics',
        'Organic & Physical Chemistry',
      ];
    }
    if (lowerDeg.includes('10th') || lowerDeg.includes('matric')) {
      return [
        'Mathematics & Geometry',
        'General Science',
        'Social Studies',
        'Language & Literature',
      ];
    }
    return ['Computer Science', 'Analytical Foundations', 'Applied Problem Solving'];
  };

  return (
    <section
      id="education"
      aria-label="Education and Academic Journey"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-[0.22em] uppercase shadow-sm transition-colors ${
              isDark
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                : "bg-cyan-50 border border-cyan-200 text-cyan-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC FOUNDATIONS & CREDENTIALS</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Education &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </h2>

          <p
            className={`text-xs sm:text-sm font-sans max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Engineering rigor built on computer science foundations, mathematics, and graduate coursework in scalable software architectures.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. DYNAMIC & ELEVATED ACADEMIC CARDS GRID                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {sortedEducations.map((edu, idx) => {
            const levelInfo = getLevelInfo(edu.degree, edu.duration);
            const attachedDocs = getAttachedDocuments(edu);
            const coursework = getCourseworkTags(edu);

            // Dynamic academic crest monogram and icon
            const lowerDeg = edu.degree.toLowerCase();
            const crestIcon = lowerDeg.includes('mca') ? (
              <GraduationCap className="w-5 h-5 text-white" />
            ) : lowerDeg.includes('bca') ? (
              <Award className="w-5 h-5 text-white" />
            ) : lowerDeg.includes('12th') ? (
              <BookOpen className="w-5 h-5 text-white" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            );

            const crestGradient = lowerDeg.includes('mca')
              ? 'from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/25'
              : lowerDeg.includes('bca')
              ? 'from-purple-600 via-indigo-600 to-blue-600 shadow-purple-500/25'
              : lowerDeg.includes('12th')
              ? 'from-emerald-600 via-teal-600 to-cyan-600 shadow-emerald-500/25'
              : 'from-amber-500 via-orange-600 to-yellow-500 shadow-amber-500/25';

            return (
              <motion.div
                key={edu.id || idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="h-full flex"
              >
                <div
                  className={`w-full rounded-2xl sm:rounded-3xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all duration-300 relative group overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-b from-[#0d162a]/95 via-[#0a1122]/95 to-[#070c17]/95 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-blue-400/40 hover:shadow-[0_16px_45px_rgba(59,130,246,0.18)]'
                      : 'bg-gradient-to-b from-white/98 via-[#f8faff]/95 to-[#edf3fe]/95 border-slate-200/90 shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:border-blue-500/50 hover:shadow-[0_16px_40px_rgba(59,130,246,0.14)]'
                  }`}
                >
                  {/* Top Holographic Neon Accent Line matching specialization */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${crestGradient} opacity-90`} />

                  {/* Subtle top corner ambient flare */}
                  <div
                    className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${levelInfo.accentGradient} opacity-15 pointer-events-none rounded-tr-3xl`}
                  />

                  {/* Top Content */}
                  <div className="space-y-3 relative z-10 text-left">
                    {/* Header Row: Academic Crest + Badges + Duration */}
                    <div className="flex items-center justify-between gap-2.5 flex-wrap pb-2 border-b border-white/10 dark:border-white/10 light:border-slate-200">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Illuminated Academic Crest */}
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${crestGradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ring-2 ring-white/10 dark:ring-white/10 light:ring-black/5`}
                        >
                          {crestIcon}
                        </div>

                        {/* Level Ribbon */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border tracking-wider uppercase ${levelInfo.badgeColor}`}
                        >
                          <span>{levelInfo.level}</span>
                        </span>

                        {/* Status / Ongoing Beacon Badge */}
                        {levelInfo.isOngoing ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                              isDark
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                : 'bg-emerald-100/80 text-emerald-800 border-emerald-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>{levelInfo.statusLabel}</span>
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                              isDark
                                ? 'bg-white/5 text-slate-300 border-white/10'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{levelInfo.statusLabel}</span>
                          </span>
                        )}
                      </div>

                      {/* Duration Pill */}
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 bg-white/5 dark:bg-white/5 light:bg-slate-100 px-2.5 py-1 rounded-lg border border-white/5 dark:border-white/5 light:border-slate-200 flex-shrink-0 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-purple-400 dark:text-purple-400 light:text-purple-600" />
                        <span>{edu.duration}</span>
                      </div>
                    </div>

                    {/* Degree Title & Academic Distinction Score */}
                    <div className="space-y-1.5 pt-0.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3
                          className={`text-base sm:text-lg font-bold font-sans tracking-tight leading-snug group-hover:text-blue-500 dark:group-hover:text-cyan-300 transition-colors ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {edu.degree}
                        </h3>

                        {/* Prominent Distinction Score Ribbon */}
                        {edu.gradeOrPercentage && (
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-bold text-xs shadow-sm border ${
                            isDark
                              ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/10 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                              : 'bg-gradient-to-r from-amber-100/90 via-yellow-50 to-amber-100/80 border-amber-300 text-amber-900 shadow-sm'
                          }`}>
                            <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 flex-shrink-0" />
                            <span>{edu.gradeOrPercentage}</span>
                          </div>
                        )}
                      </div>

                      {/* Field of Study & Institution Row */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-sans">
                        <span className="font-semibold text-cyan-400 dark:text-cyan-400 light:text-blue-600 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{edu.fieldOfStudy}</span>
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">•</span>
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                          <span>{edu.institution}</span>
                        </span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    {edu.description && (
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {edu.description}
                      </p>
                    )}

                    {/* Key Coursework Tags */}
                    {coursework.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {coursework.slice(0, 5).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-medium border transition-colors ${
                              isDark
                                ? 'bg-[#060c18] text-slate-300 border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300'
                                : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-blue-400 hover:text-blue-700 font-medium'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action: Verified Marksheets & Credentials Bar */}
                  <div className="pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 relative z-10 flex flex-wrap items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">
                      <Award className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-400 light:text-blue-600" />
                      <span>{attachedDocs.length} Verified Document{attachedDocs.length > 1 ? 's' : ''}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {attachedDocs.map((doc, dIdx) => (
                        <button
                          key={dIdx}
                          type="button"
                          onClick={() =>
                            setActiveModalDoc({
                              doc,
                              institution: edu.institution,
                              degree: edu.degree,
                            })
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold shadow-sm transition-all duration-200 cursor-pointer ${
                            dIdx % 2 === 0
                              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:scale-[1.03] active:scale-[0.97]'
                              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_2px_10px_rgba(147,51,234,0.3)] hover:scale-[1.03] active:scale-[0.97]'
                          }`}
                        >
                          <FileText className="w-3 h-3" />
                          <span>{doc.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MARKSHEET / CERTIFICATE VIEWER MODAL                       */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MARKSHEET / CERTIFICATE VIEWER MODAL                       */}
      {/* ========================================================================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeModalDoc && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Inspect ${activeModalDoc.doc.title}`}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto isolate"
                onClick={() => setActiveModalDoc(null)}
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[99999]"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`relative w-full max-w-lg max-h-[88vh] sm:max-h-[85vh] flex flex-col rounded-3xl border p-5 sm:p-7 space-y-4 text-left shadow-2xl transition-all z-[100000] overflow-y-auto overscroll-contain ${
                    isDark
                      ? 'bg-[#091124] border-cyan-500/30 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                      : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
                  }`}
                >
                  {/* Modal Top Header */}
                  <div
                    className={`flex items-center justify-between pb-3 border-b ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-500">
                      <Award className="w-4 h-4 text-cyan-500" />
                      <span>Verified Academic Document</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModalDoc(null)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isDark
                          ? 'text-slate-400 hover:text-white hover:bg-white/10'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="space-y-4">
                    <div>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono border uppercase ${
                          isDark
                            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30'
                            : 'bg-cyan-50 text-cyan-800 border-cyan-300'
                        }`}
                      >
                        {activeModalDoc.doc.type || 'DOCUMENT'}
                      </span>
                      <h4
                        className={`text-xl font-bold mt-1.5 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {activeModalDoc.doc.title}
                      </h4>
                      <p
                        className={`text-xs font-mono mt-0.5 ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700 font-medium'
                        }`}
                      >
                        {activeModalDoc.degree}
                      </p>
                      <p
                        className={`text-xs font-sans mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {activeModalDoc.institution}
                      </p>
                    </div>

                    {/* Preview / Academic Credential Card (No raw file path) */}
                    <div
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2.5 text-center ${
                        isDark
                          ? 'bg-white/[0.03] border-cyan-500/20'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`text-sm font-bold font-mono ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          Official Academic Record
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Authentic &amp; Verified Document</span>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-xs leading-relaxed font-sans ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      This marksheet/credential certifies academic performance and curriculum completion for Kanhaiya Pandey at {activeModalDoc.institution}.
                    </p>
                  </div>

                  {/* Modal Actions */}
                  <div
                    className={`pt-3 border-t flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModalDoc(null)}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono transition-colors text-center cursor-pointer ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      Close
                    </button>

                    <a
                      href={resolveAssetUrl(activeModalDoc.doc.fileUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold shadow-lg transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Document ↗</span>
                    </a>

                    <a
                      href={resolveAssetUrl(activeModalDoc.doc.fileUrl)}
                      download
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        isDark
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
