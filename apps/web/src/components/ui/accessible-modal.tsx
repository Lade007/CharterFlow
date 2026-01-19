'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { FocusTrap } from './focus-trap';
import { cn } from '@/lib/utils';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnEscape = true,
  closeOnOverlay = true,
  size = 'md'
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before modal opened
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Announce modal opening to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `${title} modal opened`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    return () => {
      // Restore body scroll and focus
      document.body.style.overflow = '';
      if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }

      // Announce modal closing
      const closeAnnouncement = document.createElement('div');
      closeAnnouncement.setAttribute('aria-live', 'polite');
      closeAnnouncement.setAttribute('aria-atomic', 'true');
      closeAnnouncement.className = 'sr-only';
      closeAnnouncement.textContent = `${title} modal closed`;
      document.body.appendChild(closeAnnouncement);

      setTimeout(() => {
        document.body.removeChild(closeAnnouncement);
      }, 1000);
    };
  }, [isOpen, title]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === modalRef.current) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <FocusTrap isActive={isOpen} onEscape={closeOnEscape ? onClose : undefined}>
        <div
          ref={modalRef}
          className={cn(
            'relative w-full mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl',
            sizeClasses[size]
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-neutral-900"
            >
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close modal"
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </Button>
          </div>

          {/* Description */}
          {description && (
            <div className="px-6 py-4">
              <p
                id="modal-description"
                className="text-neutral-600"
              >
                {description}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="px-6 pb-6">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}

// Screen reader only utility
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {children}
    </div>
  );
}
