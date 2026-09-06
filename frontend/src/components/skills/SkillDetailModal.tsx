import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { TechLogo } from '../common/TechIcons';
import { getCategoryColor } from './textureHelper';
import type { Skill } from '../../types/portfolio';

interface SkillDetailModalProps {
  skill: Skill | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  // Accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skill) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const { main, glow } = getCategoryColor(skill.category);

  // Qualitative segmented proficiency dot count (out of 10)
  const getProficiencyCount = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'ADVANCED':
      case 'STRONG':
        return 8;
      case 'INTERMEDIATE':
        return 6;
      case 'LEARNING':
        return 4;
      case 'BEGINNER':
        return 2;
      default:
        return 7;
    }
  };

  const activeDotCount = getProficiencyCount(skill.proficiencyLevel);

  // Default concepts if not seeded
  const concepts =
    skill.relatedConcepts && skill.relatedConcepts.length > 0
      ? skill.relatedConcepts
      : ['Clean Architecture', 'System Design', 'Performance Optimization', 'Modular Code'];

  // Default projects if not seeded
  const projects =
    skill.usedInProjects && skill.usedInProjects.length > 0
      ? skill.usedInProjects
      : ['Digital Universe Portfolio & CMS', 'ResumeIQ (JobFit AI)'];

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Inspect ${skill.name} expertise`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* 1. Backdrop Universe Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* 2. Glassmorphic Technology Inspector Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-3xl bg-[#0A1223]/95 dark:bg-[#0A1223]/95 light:bg-white/95 backdrop-blur-2xl border border-blue-500/25 dark:border-blue-500/25 light:border-slate-300 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden text-left"
        >
          {/* Subtle Cyber Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Edge Ambient Specular Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

          {/* Sticky Header with Prominent Close Button */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-white/10 dark:border-white/10 light:border-slate-200 bg-[#0A1223]/90 dark:bg-[#0A1223]/90 light:bg-white/90 backdrop-blur-md z-20 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-600 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technology Inspector</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Inspector"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-mono font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4 text-red-400" />
              <span>Close</span>
            </button>
          </div>

          {/* Scrollable Inspector Content Grid */}
          <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10 overflow-y-auto overscroll-contain flex-1">
            {/* Left Column: Technology Holographic Emblem (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4 pt-2">
              {/* Holographic Glowing Circular Frame */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                {/* Ambient Outer Halo Pulse */}
                <div
                  className="absolute inset-0 rounded-full blur-xl animate-pulse opacity-60 pointer-events-none"
                  style={{ backgroundColor: glow }}
                />

                {/* Outer Concentric Orbit Ring */}
                <div
                  className="absolute inset-1.5 rounded-full border border-dashed animate-spin-slow opacity-60"
                  style={{ borderColor: main, animationDuration: '28s' }}
                />

                {/* Inner Glass Frame */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border-2 border-white/20 dark:border-white/20 light:border-slate-300 shadow-2xl flex items-center justify-center">
                  <TechLogo
                    name={skill.name}
                    iconKey={skill.iconKey}
                    className="w-12 h-12 sm:w-14 sm:h-14"
                  />
                </div>
              </div>

              {/* Title & Category Badge */}
              <div className="space-y-1.5 w-full">
                <h3 className="text-2xl font-black tracking-tight text-white dark:text-white light:text-slate-900">
                  {skill.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100 border border-blue-500/30 dark:border-blue-500/30 light:border-blue-300 text-[11px] font-mono font-semibold text-cyan-300 dark:text-cyan-300 light:text-blue-700 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{skill.category} ECOSYSTEM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Architecture Metrics (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              {/* 1. Proficiency Level (Segmented Animated Indicator) */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider font-semibold">
                    Proficiency Status
                  </span>
                  <span
                    className="font-bold px-2 py-0.5 rounded-md text-xs font-mono"
                    style={{ color: main, backgroundColor: `${main}15` }}
                  >
                    {skill.proficiencyLevel}
                  </span>
                </div>

                {/* Animated 10-Dot Segmented Bar */}
                <div className="flex items-center gap-2 pt-1">
                  {[...Array(10)].map((_, i) => {
                    const isFilled = i < activeDotCount;
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.04, duration: 0.2 }}
                        className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                          isFilled
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]'
                            : 'bg-white/10 dark:bg-white/10 light:bg-slate-300'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 2. About & Context */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  About &amp; Core Experience
                </div>
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-sans">
                  {skill.description ||
                    'Core technology component applied across scalable enterprise architectures, real-time data pipelines, and responsive digital systems.'}
                </p>
              </div>

              {/* 3. Key Concepts Tags */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Key Concepts &amp; Architecture</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-200/80 border border-white/10 dark:border-white/10 light:border-slate-300 text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-800 shadow-sm"
                    >
                      [ {concept} ]
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Applied In Projects */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Used In Projects
                </div>
                <div className="space-y-1 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-medium">
                        {proj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile-Friendly Full-Width Close Button at bottom */}
              <div className="pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-white/15 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4 text-red-400" />
                  <span>Close Inspector</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
