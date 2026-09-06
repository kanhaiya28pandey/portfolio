import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Calendar, Code2 } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { useTheme } from '../../context/ThemeContext';
import type { Project } from '../../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// Structured Markdown Parser for Project Descriptions
const renderMarkdownDescription = (markdown: string, isDark: boolean) => {
  if (!markdown) return null;

  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let currentBullets: { title: string; desc: string }[] = [];

  const flushBullets = (keyIndex: number) => {
    if (currentBullets.length === 0) return;
    const bulletsToRender = [...currentBullets];
    currentBullets = [];

    elements.push(
      <div key={`bullets-group-${keyIndex}`} className="space-y-2 pt-1">
        {bulletsToRender.map((b, bIdx) => (
          <div
            key={bIdx}
            className={`p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.05]'
                : 'bg-slate-50 border-slate-200/90 hover:border-blue-400/50 hover:bg-blue-50/40'
            }`}
          >
            {/* Glowing Indicator Pip */}
            <div className="mt-1 flex-shrink-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  isDark
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22D3EE]'
                    : 'bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]'
                }`}
              />
            </div>

            {/* Feature Content */}
            <div className="text-xs sm:text-[13px] leading-relaxed font-sans">
              {b.title && (
                <span
                  className={`font-bold mr-1.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {b.title}:
                </span>
              )}
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                {b.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushBullets(idx);
      return;
    }

    // Check for H3 heading (### Title)
    if (trimmed.startsWith('### ')) {
      flushBullets(idx);
      const title = trimmed.replace(/^###\s+/, '');
      elements.push(
        <div
          key={`h3-${idx}`}
          className={`pt-2 pb-1 border-b ${
            isDark ? 'border-white/10 text-cyan-300' : 'border-slate-200 text-blue-700'
          }`}
        >
          <h5 className="text-xs sm:text-sm font-bold font-sans tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-3.5 rounded-full bg-cyan-400" />
            <span>{title}</span>
          </h5>
        </div>
      );
      return;
    }

    // Check for H4 heading (#### Title)
    if (trimmed.startsWith('#### ')) {
      flushBullets(idx);
      const title = trimmed.replace(/^####\s+/, '');
      elements.push(
        <div key={`h4-${idx}`} className="pt-2 pb-0.5">
          <h6
            className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {title}
          </h6>
        </div>
      );
      return;
    }

    // Check for Bullet point (- **Title**: Description or * **Title**: Description)
    const bulletMatch = trimmed.match(/^[-*]\s+(\*\*(.*?)\*\*[:\-]?\s*)?(.*)$/);
    if (bulletMatch) {
      const boldTitle = bulletMatch[2] ? bulletMatch[2].replace(/:$/, '').trim() : '';
      const desc = bulletMatch[3] ? bulletMatch[3].trim() : '';
      currentBullets.push({ title: boldTitle, desc: desc });
      return;
    }

    // Regular paragraph
    flushBullets(idx);
    elements.push(
      <p
        key={`p-${idx}`}
        className={`text-xs sm:text-sm leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {trimmed}
      </p>
    );
  });

  flushBullets(lines.length);

  return <div className="space-y-2.5">{elements}</div>;
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  // Extract tools
  const getTools = (p: Project): string[] => {
    if (p.skills && p.skills.length > 0) {
      return p.skills.map((s) => s.name);
    }
    const t = (p.slug || p.title).toLowerCase();
    if (t.includes('resume')) {
      return ['React 19', 'FastAPI', 'Python', 'Gemini AI', 'MongoDB', 'ATS Engine'];
    }
    if (t.includes('youtube') || t.includes('yourtube')) {
      return ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Socket.IO'];
    }
    if (t.includes('bank')) {
      return ['Java 17', 'Spring Boot 3.2', 'Spring Security', 'JWT', 'MongoDB', 'React 19', 'TypeScript', 'WebSocket'];
    }
    if (t.includes('student')) {
      return ['Python', 'Flask', 'MySQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'React', 'REST APIs'];
    }
    return ['Full Stack', 'Web Architecture', 'REST APIs'];
  };

  // Extract banner / thumbnail
  const getThumbnail = (p: Project): string => {
    if (p.bannerUrl && p.bannerUrl.trim().length > 0) return p.bannerUrl;
    if (p.thumbnailUrl && p.thumbnailUrl.trim().length > 0) return p.thumbnailUrl;
    const t = (p.slug || p.title).toLowerCase();
    if (t.includes('resume')) return '/assets/projects/resumeiq.jpg';
    if (t.includes('youtube') || t.includes('yourtube')) return '/assets/projects/youtube_clone.jpg';
    if (t.includes('bank')) return '/assets/projects/banking_system.jpg';
    if (t.includes('student')) return '/assets/projects/student_system.jpg';
    return '/assets/projects/resumeiq.jpg';
  };

  // Extract tag / period
  const getTag = (p: Project): string => {
    if (p.tag) return p.tag;
    return '2026';
  };

  const tools = getTools(project);
  const bannerImg = getThumbnail(project);
  const tag = getTag(project);
  const isFeatured = project.isFeatured ?? (project as any).featured ?? true;
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return createPortal(
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Inspect ${project.title}`}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto isolate"
      >
        {/* 1. Backdrop Blur Overlay (Clicking anywhere closes modal immediately) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer z-[99999]"
        />

        {/* 2. Compact, Proportioned Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-xl sm:max-w-2xl max-h-[88vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-[100000] border overflow-hidden text-left ${
            isDark
              ? 'bg-[#091124] border-white/15 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Ambient Top Highlight */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent pointer-events-none z-30" />

          {/* Sticky Top Header Bar with Centered Close Button */}
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-b z-30 flex-shrink-0 transition-colors ${
              isDark
                ? 'bg-[#091124]/95 backdrop-blur-md border-white/10'
                : 'bg-white/95 backdrop-blur-md border-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-indigo-400">
              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Project Architecture & Blueprint</span>
            </div>

            {/* High-Visibility, Cleanly Centered Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              title="Close modal (Esc)"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold shadow-[0_2px_10px_rgba(239,68,68,0.4)] border border-red-400/40 active:scale-95 transition-all cursor-pointer flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Close</span>
            </button>
          </div>

          {/* Scrollable Modal Content (Constrained Height & Smooth Scrolling) */}
          <div className="overflow-y-auto overscroll-contain flex-1 custom-scrollbar">
            {/* Compact Cinematic Banner */}
            <div className="relative h-32 sm:h-40 md:h-44 w-full overflow-hidden bg-slate-950 flex-shrink-0">
              <img
                src={bannerImg}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/projects/resumeiq.jpg';
                }}
              />
              <div
                className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t ${
                  isDark ? 'from-[#091124] to-transparent' : 'from-white to-transparent'
                }`}
              />

              {/* Badges on Banner */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
                {isFeatured && (
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-md ${
                      isDark
                        ? 'bg-blue-950/85 border-blue-400/40 text-blue-300'
                        : 'bg-blue-100/95 border-blue-300 text-blue-800'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>FEATURED</span>
                  </div>
                )}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${
                    isDark
                      ? 'bg-purple-950/80 border-purple-400/30 text-purple-300'
                      : 'bg-purple-100/90 border-purple-300 text-purple-800'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{project.category}</span>
                </div>
              </div>

              {tag && (
                <div className="absolute bottom-2.5 right-3 pointer-events-none">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border shadow-sm ${
                      isDark
                        ? 'bg-slate-950/85 border-white/15 text-slate-300'
                        : 'bg-white/90 border-slate-300 text-slate-700'
                    }`}
                  >
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    <span>{tag}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Title & Summary */}
              <div className="space-y-1.5">
                <h3
                  className={`text-xl sm:text-2xl font-black tracking-tight font-sans ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {project.summary}
                </p>
              </div>

              {/* Technologies / Tools Pills */}
              <div className="space-y-1.5">
                <h4
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap items-center gap-1.5">
                  {tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border transition-colors ${
                        isDark
                          ? 'bg-[#061B2E]/70 text-cyan-300 border-cyan-500/30'
                          : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights & Architecture Capabilities */}
              {project.descriptionMarkdown && (
                <div className="space-y-3 pt-1">
                  <h4
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Engineering & Architecture Blueprint</span>
                  </h4>
                  {renderMarkdownDescription(project.descriptionMarkdown, isDark)}
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Action Buttons */}
          <div
            className={`px-4 sm:px-6 py-3 border-t flex items-center justify-between gap-3 z-30 flex-shrink-0 transition-colors ${
              isDark ? 'bg-[#091124] border-white/10' : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5 flex-1">
              {/* Live Button (Only if deployed / liveUrl present) */}
              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-mono font-bold tracking-wide shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}

              {/* GitHub Button */}
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide active:scale-95 transition-all ${
                    hasLive
                      ? 'bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-[0_4px_14px_rgba(67,56,202,0.35)]'
                      : 'flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)]'
                  }`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Bottom Close Button */}
            <button
              type="button"
              onClick={onClose}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
