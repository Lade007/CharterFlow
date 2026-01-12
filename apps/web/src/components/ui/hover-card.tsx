'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverContent: React.ReactNode;
  delay?: number;
}

export function HoverCard({ children, className, hoverContent, delay = 200 }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setShowContent(true), delay);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowContent(false);
  };

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && (
        <div
          className={cn(
            'absolute z-50 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl',
            'transition-all duration-300 ease-out',
            showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            'min-w-max max-w-sm'
          )}
        >
          <div className="relative">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-white/95 border-r border-b border-white/30 transform rotate-45" />
            </div>
            {hoverContent}
          </div>
        </div>
      )}
    </div>
  );
}

// Magnetic button effect
export function MagneticButton({ 
  children, 
  className,
  strength = 0.3 
}: { 
  children: React.ReactNode; 
  className?: string; 
  strength?: number; 
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Spotlight effect on hover
export function SpotlightCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPosition({ x, y });
  };

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlightPosition({ x: 0, y: 0 });
      }}
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 150px at ${spotlightPosition.x}px ${spotlightPosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
}

// Glitch effect on hover
export function GlitchText({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn('relative z-10', isHovered && 'animate-pulse')}>
        {children}
      </span>
      {isHovered && (
        <>
          <span 
            className="absolute inset-0 text-primary-500 opacity-50 animate-pulse"
            style={{ animationDelay: '0.1s' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-secondary-500 opacity-50 animate-pulse"
            style={{ animationDelay: '0.2s' }}
          >
            {children}
          </span>
        </>
      )}
    </div>
  );
}
