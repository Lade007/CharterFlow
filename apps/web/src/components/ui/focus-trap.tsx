'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  onEscape?: () => void;
  className?: string;
}

export function FocusTrap({ children, isActive, onEscape, className }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (el): el is HTMLElement => 
        !el.hasAttribute('disabled') && 
        !el.hasAttribute('aria-hidden')
    ) as HTMLElement[];
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive) return;

    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        const focusableElements = getFocusableElements();
        const currentIndex = focusableElements.indexOf(
          document.activeElement as HTMLElement
        );
        
        if (event.shiftKey) {
          // Shift + Tab: Go to previous
          const previousIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
          focusableElements[previousIndex]?.focus();
        } else {
          // Tab: Go to next
          const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
          focusableElements[nextIndex]?.focus();
        }
        break;
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
    }
  }, [isActive, onEscape, getFocusableElements]);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = getFocusableElements();
    
    // Set initial focus to first focusable element
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Add keyboard event listener
    container.addEventListener('keydown', handleKeyDown);
    
    // Prevent focus from leaving the container
    const previousActiveElement = document.activeElement as HTMLElement;
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Restore focus when trap is deactivated
      if (previousActiveElement && document.contains(previousActiveElement)) {
        previousActiveElement.focus();
      }
    };
  }, [isActive, handleKeyDown, getFocusableElements]);

  return (
    <div
      ref={containerRef}
      className={cn(
        isActive && 'focus-trap-active',
        className
      )}
      aria-hidden={isActive ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}
