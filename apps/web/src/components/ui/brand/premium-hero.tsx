'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumHeroProps {
  className?: string;
  variant?: 'default' | 'dark' | 'light';
}

export function PremiumHero({ className, variant = 'default' }: PremiumHeroProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <div className={cn(
        'relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 transition-all duration-500',
        'animate-float' // We will add this animation in tailwind config
      )}>
        {/* Glowing backdrop */}
        <div
          className={cn(
            'absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse-slow',
            variant === 'dark' ? 'bg-indigo-500/30' : 'bg-indigo-400/40'
          )}
        />

        {/* Main Hero Visual */}
        <img
          src="/hero-visual.png"
          alt="CharterFlow Premium Hero"
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
        />

        {/* Glassmorphism reflection overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-50 pointer-events-none" />
      </div>
    </div>
  );
}

// Premium hero section component
export function PremiumHeroSection({
  title = "Transform knowledge into products",
  subtitle = "AI-powered platform for founders, operators, and product strategists",
  ctaText = "Get Started",
  onCtaClick,
  variant = 'default'
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'default' | 'dark' | 'light';
}) {
  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center relative overflow-hidden',
      variant === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : variant === 'light'
          ? 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
          : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    )}>
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial lighting from center */}
      <div
        className="absolute inset-0"
        style={{
          background: variant === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 sm:space-y-12">
          {/* Premium Hero Emblem */}
          <div className="flex justify-center">
            <PremiumHero variant={variant} />
          </div>

          {/* Headline with clear hierarchy */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className={cn(
                'bg-clip-text text-transparent',
                variant === 'dark'
                  ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600'
              )}>
                {title}
              </span>
            </h1>

            <p className={cn(
              'text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed',
              variant === 'dark' ? 'text-slate-300' : 'text-slate-600'
            )}>
              {subtitle}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className={cn(
              'px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300',
              'hover:scale-105 hover:shadow-xl active:scale-100',
              variant === 'dark'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg'
            )}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
