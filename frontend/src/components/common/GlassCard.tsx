import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps, type TargetAndTransition } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'glow-blue' | 'glow-purple';
  hoverEffect?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  hoverEffect = true,
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'border-[var(--border-glass)]',
    interactive:
      'border-[var(--border-glass)] hover:border-[var(--border-glass-hover)] hover:shadow-[0_16px_40px_var(--glow-color)]',
    'glow-blue':
      'border-blue-500/20 hover:border-blue-500/45 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    'glow-purple':
      'border-purple-500/20 hover:border-purple-500/45 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
  };

  const defaultHover: TargetAndTransition | undefined = hoverEffect
    ? { y: -4, transition: { duration: 0.22, ease: 'easeOut' } }
    : undefined;

  return (
    <motion.div
      whileHover={props.whileHover || defaultHover}
      className={clsx(
        'relative rounded-2xl bg-[var(--bg-card)] backdrop-blur-glass border p-6 overflow-hidden transition-[border-color,box-shadow,background-color] duration-300',
        hoverEffect && variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Subtle top inner edge highlight for depth */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
