import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'white';
  className?: string;
}

export function Spinner({ size = 'md', variant = 'default', className }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variants = {
    default: 'text-neutral-600',
    primary: 'text-primary-600',
    white: 'text-white',
  };

  return (
    <div
      className={cn(
        'animate-spin',
        sizes[size],
        variants[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Loading overlay component
export function LoadingOverlay({ 
  message = 'Loading...', 
  size = 'lg' 
}: { 
  message?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Spinner size={size} />
      <p className="text-sm text-neutral-600 animate-pulse">{message}</p>
    </div>
  );
}

// Skeleton loading component
export function Skeleton({ 
  className, 
  lines = 3,
  delay = 0
}: { 
  className?: string; 
  lines?: number;
  delay?: number;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-neutral-200 rounded animate-pulse',
            i === lines - 1 && 'w-3/4'
          )}
          style={{
            animationDelay: `${delay + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
