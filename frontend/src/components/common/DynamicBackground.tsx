import React from 'react';
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

      {/* 5. High-Performance Luminous Ambient Glow Fields (Zero GPU Recomposition Cost) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Cyan Field */}
        <div
          className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 68%)'
              : 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 68%)',
          }}
        />

        {/* Center-Right Indigo Field */}
        <div
          className="absolute top-1/3 -right-32 w-[40rem] h-[40rem] rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 68%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 68%)',
          }}
        />

        {/* Bottom-Left Purple Field */}
        <div
          className="absolute bottom-1/4 -left-20 w-[36rem] h-[36rem] rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(147,51,234,0.11) 0%, transparent 68%)'
              : 'radial-gradient(circle, rgba(168,85,247,0.16) 0%, transparent 68%)',
          }}
        />

        {/* Bottom-Right Emerald Field */}
        <div
          className="absolute -bottom-28 right-1/4 w-[34rem] h-[34rem] rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 68%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 68%)',
          }}
        />
      </div>

      {/* 6. Sparkling Star Nodes (Clean CSS Glow) */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-50' : 'opacity-35'}`}>
        {[
          { top: '14%', left: '18%', size: 2.5 },
          { top: '26%', left: '84%', size: 3 },
          { top: '42%', left: '10%', size: 2 },
          { top: '64%', left: '76%', size: 2.5 },
          { top: '78%', left: '32%', size: 2 },
          { top: '20%', left: '54%', size: 2.5 },
          { top: '70%', left: '92%', size: 3 },
          { top: '90%', left: '16%', size: 2 },
        ].map((star, idx) => (
          <div
            key={idx}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            className={`absolute rounded-full ${
              isDark
                ? 'bg-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                : idx % 2 === 0
                ? 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]'
                : 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.7)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
