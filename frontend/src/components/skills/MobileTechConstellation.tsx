import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TechLogo } from '../common/TechIcons';
import { NeonBadge } from '../common/NeonBadge';
import type { Skill } from '../../types/portfolio';

interface MobileTechConstellationProps {
  skills: Skill[];
  activeCategory: string;
  onSelectSkill: (skill: Skill) => void;
}

export const MobileTechConstellation: React.FC<MobileTechConstellationProps> = ({
  skills,
  activeCategory,
  onSelectSkill,
}) => {
  const filteredSkills =
    activeCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category?.toUpperCase() === activeCategory.toUpperCase());

  const [activeIndex, setActiveIndex] = useState(0);
  const currentSkill = filteredSkills[activeIndex] || filteredSkills[0];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-blue-500/25 bg-gradient-to-b from-[#050816] via-[#081120] to-[#0B1020] p-5 sm:p-6 space-y-6 shadow-2xl text-left select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header & Central Energy Core Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          {/* Central Mini Nucleus */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <span className="font-mono text-xs font-bold text-cyan-300">{'</>'}</span>
            <span className="absolute -inset-1 rounded-2xl border border-blue-500/30 animate-ping opacity-30" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              Developer Core
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Touch Radar • {filteredSkills.length} Technologies Active
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 animate-pulse text-cyan-400" />
          <span>Mobile Ecosystem</span>
        </span>
      </div>

      {/* 2. Interactive Constellation Node Radar (Touch Grid / Carousel) */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
        {filteredSkills.map((skill, idx) => {
          const isSelected = skill.id === currentSkill?.id;
          return (
            <button
              key={skill.id}
              onClick={() => {
                setActiveIndex(idx);
                onSelectSkill(skill);
              }}
              className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                isSelected
                  ? 'bg-blue-600/25 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.45)] scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20 active:scale-95'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900/80 flex items-center justify-center shadow-sm">
                <TechLogo name={skill.name} iconKey={skill.iconKey} className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-200 truncate w-full text-center">
                {skill.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Featured Constellation Node Card */}
      {currentSkill && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSkill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            onClick={() => onSelectSkill(currentSkill)}
            className="p-4 rounded-2xl bg-white/5 border border-blue-500/30 backdrop-blur-xl shadow-lg flex items-center justify-between cursor-pointer group hover:border-cyan-400"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-white/15 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <TechLogo name={currentSkill.name} iconKey={currentSkill.iconKey} className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm">{currentSkill.name}</h4>
                  <NeonBadge variant="cyan" size="sm">
                    {currentSkill.proficiencyLevel}
                  </NeonBadge>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {currentSkill.category} • Tap to Inspect Full Details
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
