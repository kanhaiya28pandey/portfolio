import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const DynamicBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 select-none"
    >
      {/* 1. Base Gradient Canvas (Deep Cyber Void in Dark / Luminous Aurora Pearl in Light) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-[#050811] via-[#070b16] to-[#050811] opacity-100'
            : 'bg-gradient-to-b from-[#f8faff] via-[#edf4fe] to-[#f5f9ff] opacity-100'
        }`}
      />

      {/* 2. High-Tech Cyber / Blueprint Dot-Matrix Grid */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(59, 130, 246, 0.18) 1.2px, transparent 1.2px)'
            : 'radial-gradient(rgba(59, 130, 246, 0.15) 1.2px, transparent 1.2px)',
          backgroundSize: isDark ? '36px 36px' : '32px 32px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%, black 50%, transparent 95%)',
          opacity: isDark ? 0.75 : 0.8,
        }}
      />

      {/* 2b. Subtle Architectural Grid Lines in Light Mode */}
      {!isDark && (
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
      )}

      {/* 3. Horizontal Subtle Scanlines (Dark only) */}
      {isDark && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* 4. Top Ambient Glow Beam */}
      <div
        className={`absolute top-0 inset-x-0 h-96 transition-opacity duration-700 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-blue-600/15 via-purple-600/5 to-transparent'
            : 'bg-gradient-to-b from-blue-400/20 via-indigo-300/10 to-transparent'
        }`}
      />

      {/* 5. Animated Luminous Floating Ambient Orbs (GPU Accelerated) */}
      {/* Orb 1: Top Left - Cyan / Azure */}
      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full blur-3xl transition-colors duration-700 pointer-events-none ${
          isDark ? 'bg-cyan-500/15' : 'bg-sky-400/25'
        }`}
      />

      {/* Orb 2: Center Right - Blue / Indigo */}
      <motion.div
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 40, -35, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/3 -right-32 w-[40rem] h-[40rem] rounded-full blur-3xl transition-colors duration-700 pointer-events-none ${
          isDark ? 'bg-blue-600/15' : 'bg-indigo-300/25'
        }`}
      />

      {/* Orb 3: Bottom Left - Purple / Violet */}
      <motion.div
        animate={{
          x: [0, 35, -30, 0],
          y: [0, -25, 35, 0],
          scale: [0.95, 1.1, 1, 0.95],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-1/4 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl transition-colors duration-700 pointer-events-none ${
          isDark ? 'bg-purple-600/15' : 'bg-purple-300/20'
        }`}
      />

      {/* Orb 4: Bottom Right - Emerald / Cyan Accent */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -bottom-28 right-1/4 w-[34rem] h-[34rem] rounded-full blur-3xl transition-colors duration-700 pointer-events-none ${
          isDark ? 'bg-emerald-500/10' : 'bg-teal-300/22'
        }`}
      />

      {/* 6. Sparkling Star & Light Shimmer Nodes (Available in BOTH Dark & Light modes) */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-60' : 'opacity-40'}`}>
        {[
          { top: '14%', left: '18%', size: 2.5, delay: 0 },
          { top: '26%', left: '84%', size: 3, delay: 1.5 },
          { top: '42%', left: '10%', size: 2, delay: 2.2 },
          { top: '64%', left: '76%', size: 2.5, delay: 0.8 },
          { top: '78%', left: '32%', size: 2, delay: 3.1 },
          { top: '20%', left: '54%', size: 2.5, delay: 1.8 },
          { top: '70%', left: '92%', size: 3, delay: 2.7 },
          { top: '90%', left: '16%', size: 2, delay: 0.5 },
        ].map((star, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: isDark ? [0.2, 0.9, 0.2] : [0.3, 0.85, 0.3],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 3 + (idx % 3),
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            className={`absolute rounded-full ${
              isDark
                ? 'bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                : idx % 2 === 0
                ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                : 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
