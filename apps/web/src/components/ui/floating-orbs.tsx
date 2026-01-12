'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}

interface FloatingOrbsProps {
  className?: string;
  count?: number;
}

export function FloatingOrbs({ className, count = 6 }: FloatingOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize orbs
    const colors = [
      'from-primary-400/20 to-primary-600/10',
      'from-secondary-400/20 to-secondary-600/10',
      'from-accent-400/20 to-accent-600/10',
    ];

    orbsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const animate = () => {
      orbsRef.current = orbsRef.current.map(orb => {
        let newX = orb.x + orb.speed;
        let newY = orb.y + orb.speed * 0.5;

        // Wrap around when orb goes off screen
        if (newX > 110) newX = -10;
        if (newY > 110) newY = -10;

        return { ...orb, x: newX, y: newY };
      });

      // Update DOM
      const orbElements = container.querySelectorAll('.floating-orb');
      orbElements.forEach((element, index) => {
        const orb = orbsRef.current[index];
        if (orb) {
          (element as HTMLElement).style.transform = `translate(${orb.x}%, ${orb.y}%)`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {orbsRef.current.map((orb) => (
        <div
          key={orb.id}
          className="floating-orb absolute transition-transform duration-1000 ease-linear"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            transform: `translate(${orb.x}%, ${orb.y}%)`,
            opacity: orb.opacity,
          }}
        >
          <div 
            className={cn(
              'w-full h-full rounded-full bg-gradient-to-br blur-3xl',
              orb.color
            )}
          />
        </div>
      ))}
    </div>
  );
}

// Animated gradient background component
export function AnimatedGradient({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 opacity-30', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-transparent to-secondary-400 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-400 via-transparent to-primary-400 animate-gradient-shift-reverse" />
      <style jsx>{`
        @keyframes gradient-shift {
          0% { transform: translateX(0%) translateY(0%); }
          33% { transform: translateX(-20%) translateY(20%); }
          66% { transform: translateX(20%) translateY(-20%); }
          100% { transform: translateX(0%) translateY(0%); }
        }
        @keyframes gradient-shift-reverse {
          0% { transform: translateX(0%) translateY(0%); }
          33% { transform: translateX(20%) translateY(-20%); }
          66% { transform: translateX(-20%) translateY(20%); }
          100% { transform: translateX(0%) translateY(0%); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }
        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
