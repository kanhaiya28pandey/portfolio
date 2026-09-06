import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={(e) => toggleTheme(e)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-2xl overflow-hidden backdrop-blur-xl border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDark
          ? 'bg-slate-900/80 border-blue-500/30 text-blue-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
          : 'bg-white/90 border-amber-500/40 text-amber-600 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] shadow-[0_4px_16px_rgba(245,158,11,0.15)]'
      } ${className || ''}`}
    >
      {/* Ambient background glow orb */}
      <motion.div
        animate={{
          scale: isDark ? [1, 1.2, 1] : [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-0 rounded-full blur-md pointer-events-none ${
          isDark ? 'bg-blue-600/30' : 'bg-amber-400/30'
        }`}
      />

      {/* Rotating and scaling icon morph */}
      <motion.div
        key={theme}
        initial={{ rotate: isDark ? -90 : 90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: isDark ? 90 : -90, scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="relative z-10 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
        )}
      </motion.div>

      {/* Micro sparkle element */}
      <motion.span
        animate={{ opacity: isDark ? [0.4, 0.9, 0.4] : [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1.5 right-1.5 pointer-events-none"
      >
        <Sparkles className={`w-2 h-2 ${isDark ? 'text-blue-400' : 'text-amber-400'}`} />
      </motion.span>
    </motion.button>
  );
};
