import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { TechLogo } from '../common/TechIcons';
import {
  getCategoryTheme,
  getTechDetails,
} from '../../utils/techRelationships';
import { useTheme } from '../../context/ThemeContext';
import type { Skill } from '../../types/portfolio';

interface TechInspectorCardProps {
  skill: Skill | null;
  onClose?: () => void;
  onSelectRelated?: (techName: string) => void;
  className?: string;
}

export const getSkillProficiencyPercentage = (skill: Skill): number => {
  if (skill.proficiencyPercentage && skill.proficiencyPercentage > 0) {
    return skill.proficiencyPercentage;
  }
  const details = getTechDetails(skill.name);
  if (details.proficiency) return details.proficiency;

  const level = skill.proficiencyLevel?.toUpperCase();
  if (level === 'EXPERT' || level === 'STRONG') return 95;
  if (level === 'ADVANCED') return 85;
  if (level === 'INTERMEDIATE') return 75;
  return 65;
};

export const TechInspectorCard: React.FC<TechInspectorCardProps> = ({
  skill,
  onClose,
  onSelectRelated,
  className = '',
}) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Default / Empty State
  if (!skill) {
    return (
      <div
        className={`w-full rounded-2xl backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 transition-colors duration-300 ${
          isDark
            ? 'bg-[#0B1226]/85 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
        } ${className}`}
      >
        <div className="w-16 h-16 rounded-full border border-cyan-400/30 bg-slate-950/80 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.25)] animate-pulse">
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="space-y-1.5">
          <h4
            className={`text-base font-bold font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Select a Technology
          </h4>
          <p
            className={`text-xs max-w-xs font-sans leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Click on any technology node in the constellation or card below to inspect its architecture.
          </p>
        </div>
      </div>
    );
  }

  const categoryTheme = getCategoryTheme(skill.category);
  const details = getTechDetails(skill.name);
  const percentage = getSkillProficiencyPercentage(skill);
  const filledCapsules = Math.round((percentage / 100) * 10);

  const concepts =
    skill.relatedConcepts && skill.relatedConcepts.length > 0
      ? skill.relatedConcepts
      : details.keyConcepts;

  const usedIn =
    skill.usedInProjects && skill.usedInProjects.length > 0
      ? skill.usedInProjects
      : details.usedInProjects;

  const relatedTechs = details.relatedTechNames || [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={skill.id || skill.name}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`w-full rounded-2xl backdrop-blur-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 text-left select-none relative transition-colors duration-300 ${
          isDark
            ? 'bg-[#0B1226]/85 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
        } ${className}`}
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: categoryTheme.main }}
        />

        {/* 1. Header: Circular Avatar + Name + Badges + Close Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Glowing Circular Frame */}
            <div
              className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center relative flex-shrink-0 ${
                isDark ? 'bg-slate-950' : 'bg-slate-50'
              }`}
              style={{
                borderColor: categoryTheme.main,
                boxShadow: `0 0 25px ${categoryTheme.glow}`,
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <TechLogo name={skill.name} iconKey={skill.iconKey} className="w-7 h-7" />
              </div>
            </div>

            {/* Title & Badges */}
            <div className="space-y-1">
              <h3
                className={`text-xl sm:text-2xl font-black tracking-wide font-sans ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {skill.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                    isDark
                      ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                      : 'bg-blue-50 border-blue-300 text-blue-700'
                  }`}
                >
                  {skill.category || 'CORE'}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                    isDark
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  }`}
                >
                  {skill.proficiencyLevel || details.level}
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 shadow-sm active:scale-95 cursor-pointer flex-shrink-0"
              aria-label="Close Technology Inspector"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          )}
        </div>

        {/* 2. Description Paragraph */}
        <p
          className={`text-xs leading-relaxed font-sans ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {skill.description || details.description}
        </p>

        {/* 3. Segmented 10-Capsule Proficiency Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span
              className={`uppercase tracking-wider text-[11px] font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Proficiency
            </span>
            <span
              className={`font-bold font-mono ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}
            >
              {percentage}%
            </span>
          </div>

          {/* 10 Glowing Capsule Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isFilled = idx < filledCapsules;
              return (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    isFilled
                      ? 'bg-cyan-400 shadow-[0_0_8px_#22D3EE]'
                      : isDark
                      ? 'bg-slate-800/80 border border-white/5'
                      : 'bg-slate-200 border border-slate-300'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* 4. Key Concepts Chips */}
        {concepts && concepts.length > 0 && (
          <div className="space-y-1.5">
            <div
              className={`text-[11px] font-mono font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Key Concepts
            </div>
            <div className="flex flex-wrap gap-1.5">
              {concepts.map((concept) => (
                <span
                  key={concept}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                    isDark
                      ? 'bg-slate-900/90 border-white/10 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 5. Used In Section */}
        {usedIn && usedIn.length > 0 && (
          <div className="space-y-1.5">
            <div
              className={`text-[11px] font-mono font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Used In
            </div>
            <div className="space-y-1">
              {usedIn.map((proj) => (
                <button
                  type="button"
                  key={proj}
                  onClick={scrollToProjects}
                  className={`flex items-center gap-2 text-xs transition-colors group text-left font-sans ${
                    isDark
                      ? 'text-slate-300 hover:text-cyan-300'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span className="truncate">{proj}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. Action Button: View Related Projects */}
        <div className="pt-1">
          <button
            type="button"
            onClick={scrollToProjects}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 transition-all group"
          >
            <span>View Related Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 7. Related Technologies Row */}
        {relatedTechs.length > 0 && (
          <div
            className={`space-y-2 pt-1 border-t ${
              isDark ? 'border-white/5' : 'border-slate-200'
            }`}
          >
            <div
              className={`text-[11px] font-mono font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Related Technologies
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {relatedTechs.map((techName) => (
                <button
                  key={techName}
                  type="button"
                  onClick={() => onSelectRelated && onSelectRelated(techName)}
                  title={`Inspect ${techName}`}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] flex-shrink-0 ${
                    isDark
                      ? 'bg-slate-900/90 border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/60'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-blue-500'
                  }`}
                >
                  <TechLogo name={techName} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 8. Bottom Action: Close Inspector button */}
        {onClose && (
          <div className="pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all border shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <X className="w-3.5 h-3.5 text-red-400" />
              <span>Close Inspector</span>
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
