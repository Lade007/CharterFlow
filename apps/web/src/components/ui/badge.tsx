import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    primary: 'bg-primary-100 text-primary-800 border border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    success: 'bg-success-100 text-success-800 border border-success-200',
    warning: 'bg-warning-100 text-warning-800 border border-warning-200',
    error: 'bg-error-100 text-error-800 border border-error-200',
    glass: 'bg-white/20 backdrop-blur-md text-white border border-white/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-0.5 text-sm font-medium',
    lg: 'px-3 py-1 text-sm font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full transition-all duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
