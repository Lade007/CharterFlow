'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleBackgroundProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'gradient';
}

export function SimpleBackground({ className, variant = 'default' }: SimpleBackgroundProps) {
  const variants = {
    default: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </>
    ),
    minimal: (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
    ),
    gradient: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100" />
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary-100 via-transparent to-primary-100 opacity-50 animate-gradient-shift" />
      </>
    ),
  };

  return (
    <div className={cn('fixed inset-0 overflow-hidden pointer-events-none', className)}>
      {variants[variant]}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { transform: translateX(0%) translateY(0%); }
          50% { transform: translateX(-10%) translateY(10%); }
          100% { transform: translateX(0%) translateY(0%); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
