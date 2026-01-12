'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function TextReveal({ 
  children, 
  className, 
  delay = 0, 
  duration = 800,
  direction = 'up' 
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translateY(30px)';
    }
  };

  return (
    <div
      ref={ref}
      className={cn('overflow-hidden', className)}
      style={{
        transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

// Staggered text reveal for multiple lines
export function StaggeredTextReveal({ 
  children, 
  className, 
  staggerDelay = 100 
}: { 
  children: React.ReactNode[]; 
  className?: string; 
  staggerDelay?: number; 
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <TextReveal key={index} delay={index * staggerDelay}>
          {child}
        </TextReveal>
      ))}
    </div>
  );
}

// Typewriter effect component
export function TypewriterText({ 
  text, 
  className, 
  speed = 50,
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  speed?: number; 
  delay?: number; 
}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={cn('inline-block', className)}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Fade in scale component
export function FadeInScale({ 
  children, 
  className, 
  delay = 0,
  scale = 0.9 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  scale?: number; 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn('transition-all duration-700 ease-out', className)}
      style={{
        transform: isVisible ? 'scale(1)' : `scale(${scale})`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
