import React from 'react';
import clsx from 'clsx';

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'cyan' | 'green' | 'amber';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const NeonBadge: React.FC<NeonBadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  pulse = false,
  className,
}) => {
  const variantStyles = {
    blue: 'bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100/90 text-blue-400 dark:text-blue-400 light:text-blue-700 border-blue-500/30 dark:border-blue-500/30 light:border-blue-300 font-semibold shadow-[0_0_12px_rgba(59,130,246,0.2)] light:shadow-none',
    purple: 'bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-100/90 text-purple-400 dark:text-purple-400 light:text-purple-700 border-purple-500/30 dark:border-purple-500/30 light:border-purple-300 font-semibold shadow-[0_0_12px_rgba(139,92,246,0.2)] light:shadow-none',
    cyan: 'bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-100/90 text-cyan-400 dark:text-cyan-400 light:text-cyan-800 border-cyan-500/30 dark:border-cyan-500/30 light:border-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.2)] light:shadow-none',
    green: 'bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-100/90 text-emerald-400 dark:text-emerald-400 light:text-emerald-800 border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)] light:shadow-none',
    amber: 'bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-100/90 text-amber-400 dark:text-amber-400 light:text-amber-800 border-amber-500/30 dark:border-amber-500/30 light:border-amber-300 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.2)] light:shadow-none',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md transition-all duration-300',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};
