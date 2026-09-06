import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Database, Sparkles, Cpu } from 'lucide-react';

import heroAvatar from '../../assets/hero.png';

interface FloatingBadgeProps {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay?: number;
  duration?: number;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  label,
  className,
  delay = 0,
  duration = 4,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -8, 0],
    }}
    transition={{
      opacity: { duration: 0.6, delay },
      scale: { duration: 0.6, delay },
      y: {
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      },
    }}
    className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-card/90 dark:bg-dark-card/90 light:bg-white/90 backdrop-blur-glass border border-blue-500/30 shadow-[0_8px_20px_rgba(59,130,246,0.25)] text-xs font-mono font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 ${className}`}
  >
    <span className="text-blue-400">{icon}</span>
    <span>{label}</span>
  </motion.div>
);

interface HeroPortraitProps {
  avatarUrl?: string;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ avatarUrl }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const shiftX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const shiftY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] aspect-[4/5] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Ambient Radial Glowing Orb */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-purple-600/20 to-cyan-500/25 rounded-full blur-3xl -z-10 animate-pulse-glow pointer-events-none" />

      {/* Cybernetic Geometric Ring Background Layer */}
      <motion.div
        style={{ x: shiftX, y: shiftY }}
        className="absolute inset-4 rounded-3xl border border-blue-500/20 dark:border-blue-500/20 light:border-blue-500/10 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/60 rounded-bl-xl" />
      </motion.div>

      {/* Main 3D Portrait Frame with Parallax Tilt */}
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
        className="relative w-[90%] h-[92%] rounded-3xl overflow-hidden border border-white/15 dark:border-white/15 light:border-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-b from-dark-surface/90 via-dark-bg/95 to-dark-bg dark:from-dark-surface/90 dark:to-dark-bg light:from-white/90 light:to-slate-100 flex items-center justify-center"
      >
        {/* Cinematic Lighting Highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />

        {/* Full-Card 3D Character Portrait Display */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden group">
          <img
            src={
              avatarUrl
                ? avatarUrl.startsWith('http') || avatarUrl.startsWith('data:')
                  ? avatarUrl
                  : avatarUrl.startsWith('/uploads/')
                  ? `http://localhost:8080${avatarUrl}`
                  : avatarUrl
                : heroAvatar
            }
            alt="Kanhaiya Pandey"
            className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle cinematic gradient overlays for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-transparent to-[#060913]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/15 pointer-events-none" />

          {/* Top Glassmorphic Telemetry Chips */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#060913]/75 dark:bg-[#060913]/75 light:bg-white/85 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>System Online</span>
          </div>

          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[#060913]/75 dark:bg-[#060913]/75 light:bg-white/85 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono text-purple-300 font-semibold shadow-sm">
            DSA • Full-Stack • ML
          </div>

          {/* Bottom Identity Pill */}
          <div className="absolute bottom-4 inset-x-4 py-2.5 px-4 rounded-2xl bg-[#0a0f1d]/85 dark:bg-[#0a0f1d]/85 light:bg-white/90 backdrop-blur-xl border border-blue-500/30 flex items-center justify-between shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-xs font-mono font-medium text-slate-100 dark:text-slate-100 light:text-slate-800">Kanhaiya Pandey</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold">Ready to Build</span>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Floating Glass Technology Badges (Reflecting Kanhaiya's Core Competencies) */}
      <FloatingBadge
        icon={<Code2 className="w-4 h-4 text-cyan-400" />}
        label="DSA & Algorithms"
        className="-top-2 -left-4 sm:top-6 sm:-left-8"
        delay={0.2}
        duration={5}
      />
      <FloatingBadge
        icon={<Cpu className="w-4 h-4 text-amber-400" />}
        label="Java & Python"
        className="top-1/4 -right-4 sm:top-1/4 sm:-right-8"
        delay={0.5}
        duration={4.2}
      />
      <FloatingBadge
        icon={<Code2 className="w-4 h-4 text-blue-400" />}
        label="React & TS"
        className="bottom-1/3 -left-4 sm:bottom-1/3 sm:-left-8"
        delay={0.8}
        duration={4.6}
      />
      <FloatingBadge
        icon={<Database className="w-4 h-4 text-purple-400" />}
        label="MySQL & MongoDB"
        className="-bottom-3 right-4 sm:bottom-2 sm:right-2"
        delay={1.1}
        duration={5.2}
      />
      <FloatingBadge
        icon={<Sparkles className="w-4 h-4 text-emerald-400" />}
        label="Applied ML / AI"
        className="top-0 right-12 sm:top-2 sm:right-16"
        delay={1.4}
        duration={4.8}
      />
    </div>
  );
};
