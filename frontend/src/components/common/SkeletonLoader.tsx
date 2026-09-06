import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle' | 'card';
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
}) => {
  const baseClasses =
    'relative overflow-hidden bg-white/5 dark:bg-white/5 light:bg-slate-200/70 border border-white/10 dark:border-white/10 light:border-slate-300/60 animate-pulse';

  if (variant === 'circle') {
    return <div className={clsx(baseClasses, 'rounded-full', className)} />;
  }

  if (variant === 'text') {
    return <div className={clsx(baseClasses, 'h-4 rounded-md', className)} />;
  }

  if (variant === 'card') {
    return (
      <div className={clsx(baseClasses, 'rounded-2xl p-6 space-y-4', className)}>
        <div className="h-44 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-300/50" />
        <div className="h-6 w-3/4 rounded-md bg-white/10 dark:bg-white/10 light:bg-slate-300/70" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-white/5 dark:bg-white/5 light:bg-slate-300/50" />
          <div className="h-4 w-5/6 rounded bg-white/5 dark:bg-white/5 light:bg-slate-300/50" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-300/60" />
          <div className="h-6 w-20 rounded-full bg-white/10 dark:bg-white/10 light:bg-slate-300/60" />
        </div>
      </div>
    );
  }

  return <div className={clsx(baseClasses, 'rounded-xl', className)} />;
};
