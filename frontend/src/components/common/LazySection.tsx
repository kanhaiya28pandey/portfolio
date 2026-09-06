import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader';

interface LazySectionProps {
  id?: string;
  className?: string;
  minHeight?: string;
  children: React.ReactNode;
  fallbackTitle?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  id,
  className = '',
  minHeight = 'min-h-[380px]',
  children,
  fallbackTitle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the page was loaded with a hash matching this section, mount immediately
    if (id && window.location.hash === `#${id}`) {
      setIsVisible(true);
      return;
    }

    // Listen for direct navigation events from the Navbar
    const handleNavTarget = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (id && customEvent.detail === id) {
        setIsVisible(true);
      }
    };

    window.addEventListener('portfolio-nav-target', handleNavTarget);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '800px 0px 800px 0px', // Preload smoothly 800px before reaching viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('portfolio-nav-target', handleNavTarget);
    };
  }, [id]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative ${minHeight} ${className}`}
    >
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Suspense fallback={<SectionSkeletonPlaceholder title={fallbackTitle} />}>
            {children}
          </Suspense>
        </motion.div>
      ) : (
        <SectionSkeletonPlaceholder title={fallbackTitle} />
      )}
    </div>
  );
};

const SectionSkeletonPlaceholder: React.FC<{ title?: string }> = ({ title }) => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[380px] select-none">
    <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-white/80 border border-white/5 dark:border-white/5 light:border-slate-200/80 shadow-sm backdrop-blur-sm flex flex-col items-center space-y-4 text-center">
      {/* Sci-Fi Loading Indicator */}
      <div className="relative flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
      </div>

      <SkeletonLoader variant="text" className="w-44 h-5" />
      <SkeletonLoader variant="text" className="w-64 h-3.5 opacity-60" />

      {title && (
        <div className="inline-flex items-center gap-2 pt-1 font-mono text-xs tracking-widest uppercase font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Synchronizing {title}...</span>
        </div>
      )}

      {/* Subtle bottom placeholder bar */}
      <div className="w-full grid grid-cols-3 gap-3 pt-2">
        <SkeletonLoader variant="rect" className="h-16 rounded-xl" />
        <SkeletonLoader variant="rect" className="h-16 rounded-xl" />
        <SkeletonLoader variant="rect" className="h-16 rounded-xl" />
      </div>
    </div>
  </div>
);
