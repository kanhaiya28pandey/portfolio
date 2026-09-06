import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BrandLogo3DProps {
  className?: string;
}

export const BrandLogo3D: React.FC<BrandLogo3DProps> = ({ className }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Fluid 3D tilt
    setTilt({
      x: -(y / (rect.height / 2)) * 18,
      y: (x / (rect.width / 2)) * 18,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`flex items-center gap-2.5 sm:gap-3 group select-none flex-shrink-0 whitespace-nowrap ${className || ''}`}
      style={{ perspective: 1000 }}
    >
      {/* 3D Interactive Dimensional Emblem */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex items-center justify-center w-11 h-11 flex-shrink-0"
      >
        {/* Ambient Glow Aura (Adaptive for Dark and Light) */}
        <motion.div
          animate={{
            scale: isHovered ? [1.1, 1.25, 1.1] : 1,
            opacity: isHovered ? 0.95 : 0.45,
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-500 dark:via-blue-600 dark:to-purple-600 light:from-blue-600 light:via-indigo-500 light:to-cyan-400 blur-md pointer-events-none"
        />

        {/* Outer Rotating Energy Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1.5 rounded-2xl border border-dashed border-cyan-400/40 dark:border-cyan-400/40 light:border-blue-500/50 pointer-events-none"
          style={{ transform: 'translateZ(-6px)' }}
        />

        {/* 3D Prism Card Body */}
        <div
          className="relative w-full h-full rounded-2xl bg-[#080D1A]/95 dark:bg-[#080D1A]/95 light:bg-white backdrop-blur-xl border border-cyan-500/40 dark:border-cyan-500/40 light:border-blue-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] light:shadow-[0_8px_24px_rgba(37,99,235,0.22)] flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(12px)' }}
        >
          {/* Specular Diagonal Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 light:via-blue-400/10 to-transparent pointer-events-none" />

          {/* Isometric Faceted Tech Glyph (SVG Geometric Prism) */}
          <svg
            viewBox="0 0 40 40"
            className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Isometric Diamond Facet */}
            <path
              d="M20 5 L33 13 L20 21 L7 13 Z"
              className="fill-cyan-400 dark:fill-cyan-400 light:fill-blue-600 opacity-90 transition-colors"
            />
            {/* Left Isometric Facet */}
            <path
              d="M7 13 L20 21 L20 35 L7 27 Z"
              className="fill-blue-600 dark:fill-blue-600 light:fill-blue-900 opacity-80 dark:opacity-85 light:opacity-95 transition-colors"
            />
            {/* Right Isometric Facet */}
            <path
              d="M20 21 L33 13 L33 27 L20 35 Z"
              className="fill-purple-600 dark:fill-purple-600 light:fill-indigo-600 opacity-80 dark:opacity-85 light:opacity-90 transition-colors"
            />
            {/* Center Razor-Sharp Futuristic "K" Laser Glyph */}
            <path
              d="M17 12 L17 28 M17 20 L24 13 M20 17 L25 27"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]"
            />
            {/* Central Photon Node */}
            <circle
              cx="20"
              cy="20"
              r="1.5"
              className="fill-cyan-300 dark:fill-cyan-300 light:fill-white drop-shadow-[0_0_8px_rgba(6,182,212,1)]"
            />
          </svg>

          {/* Corner Cyber HUD Accents */}
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-400 dark:border-cyan-400 light:border-blue-600 pointer-events-none" />
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-purple-400 dark:border-purple-400 light:border-indigo-600 pointer-events-none" />
        </div>
      </motion.div>

      {/* Brand Name: Kanhaiya Pandey */}
      <div className="flex items-center flex-shrink-0 whitespace-nowrap">
        <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 font-sans transition-colors duration-200 whitespace-nowrap">
          Kanhaiya <span className="bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-blue-500 light:from-blue-600 light:to-indigo-600 bg-clip-text text-transparent group-hover:brightness-125 transition-all">Pandey</span>
        </span>
      </div>
    </div>
  );
};
