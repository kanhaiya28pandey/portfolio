import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FuturisticButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  className?: string;
}

export const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  href,
  target,
  rel,
  download,
  className,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 overflow-hidden cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-blue-500/50';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_28px_rgba(139,92,246,0.55)] hover:scale-[1.02] active:scale-[0.98] border border-white/15',
    secondary:
      'bg-dark-card dark:bg-dark-card/80 light:bg-white/90 backdrop-blur-md text-dark-text dark:text-dark-text light:text-light-text border border-blue-500/25 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'bg-transparent text-blue-400 border border-blue-500/40 hover:bg-blue-500/10 hover:border-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.25)]',
    ghost:
      'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
  };

  const content = (
    <>
      {/* Background specular sweep on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};
