'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PremiumHeroProps {
  className?: string;
  variant?: 'default' | 'dark' | 'light';
}

export function PremiumHero({ className, variant = 'default' }: PremiumHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 400 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '400px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    let animationFrame: number;
    let time = 0;

    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Hexagon path
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = size * Math.cos(angle);
        const py = size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      
      // Gradient fill
      const gradient = ctx.createLinearGradient(-size, -size, size, size);
      if (variant === 'dark') {
        gradient.addColorStop(0, '#6366f1'); // Indigo
        gradient.addColorStop(0.5, '#8b5cf6'); // Violet
        gradient.addColorStop(1, '#a855f7'); // Purple
      } else if (variant === 'light') {
        gradient.addColorStop(0, '#e0e7ff'); // Light indigo
        gradient.addColorStop(0.5, '#c7d2fe'); // Light violet
        gradient.addColorStop(1, '#f3e8ff'); // Light purple
      } else {
        gradient.addColorStop(0, '#4f46e5'); // Darker indigo
        gradient.addColorStop(0.5, '#7c3aed'); // Darker violet
        gradient.addColorStop(1, '#9333ea'); // Darker purple
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Thin stroke
      ctx.strokeStyle = variant === 'dark' ? '#ffffff' : '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    };

    const drawQFMonogram = (x: number, y: number, size: number, time: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Q - chat bubble with orbiting dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = variant === 'dark' ? '#ffffff' : '#1e293b';
      ctx.fill();
      
      // Orbiting dot
      const orbitAngle = time * 0.002;
      const orbitRadius = size * 0.4;
      const dotX = Math.cos(orbitAngle) * orbitRadius;
      const dotY = Math.sin(orbitAngle) * orbitRadius;
      
      ctx.beginPath();
      ctx.arc(dotX, dotY, size * 0.08, 0, Math.PI * 2);
      const dotGradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, size * 0.08);
      dotGradient.addColorStop(0, '#fbbf24'); // Amber
      dotGradient.addColorStop(1, '#f59e0b'); // Orange
      ctx.fillStyle = dotGradient;
      ctx.fill();
      
      // F - geometric and bold
      ctx.font = `bold ${size * 0.4}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = variant === 'dark' ? '#ffffff' : '#1e293b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('F', size * 0.6, 0);
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, 400 * dpr, 400 * dpr);
      
      // Subtle noise texture
      const imageData = ctx.createImageData(400 * dpr, 400 * dpr);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 5;
        data[i] = data[i] + noise;     // R
        data[i + 1] = data[i + 1] + noise; // G
        data[i + 2] = data[i + 2] + noise; // B
        data[i + 3] = 255;               // A
      }
      ctx.putImageData(imageData, 0, 0);
      
      // Center hexagon with subtle rotation
      const hexRotation = time * 0.0005;
      drawHexagon(200, 200, 120, hexRotation);
      
      // QF monogram
      drawQFMonogram(200, 200, 80, time);
      
      // Light reflections
      const reflectionAngle = time * 0.001;
      const reflectionX = 200 + Math.cos(reflectionAngle) * 60;
      const reflectionY = 200 + Math.sin(reflectionAngle) * 60;
      
      const reflectionGradient = ctx.createRadialGradient(
        reflectionX, reflectionY, 0,
        reflectionX, reflectionY, 40
      );
      reflectionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      reflectionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = reflectionGradient;
      ctx.fillRect(0, 0, 400 * dpr, 400 * dpr);
      
      time += 16; // ~60fps
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [variant]);

  return (
    <div className={cn('relative inline-block', className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          'w-24 h-24 sm:w-32 sm:h-32 rounded-2xl transition-all duration-500',
          'backdrop-blur-md border border-white/10 shadow-2xl',
          'hover:shadow-3xl hover:scale-105',
          !isLoaded && 'opacity-0'
        )}
        style={{
          background: variant === 'dark' 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : variant === 'light'
            ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            : 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
        }}
      />
      {/* Subtle glow effect */}
      <div 
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500',
          isLoaded && 'opacity-100',
          'pointer-events-none'
        )}
        style={{
          background: variant === 'dark'
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        }}
      />
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
