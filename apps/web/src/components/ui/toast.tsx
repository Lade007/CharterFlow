import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  const variants = {
    default: 'bg-white border-neutral-200 text-neutral-900',
    success: 'bg-success-50 border-success-200 text-success-900',
    error: 'bg-error-50 border-error-200 text-error-900',
    warning: 'bg-warning-50 border-warning-200 text-warning-900',
  };

  return (
    <div
      className={cn(
        'max-w-sm rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform',
        'animate-in slide-in-from-right-full fade-in-0',
        variants[toast.variant || 'default']
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-semibold text-sm">{toast.title}</h4>
          )}
          {toast.description && (
            <p className="text-sm opacity-90 mt-1">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium underline mt-2 hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          title="Dismiss notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Convenience functions
export const toast = {
  success: (title: string, description?: string) => ({
    title,
    description,
    variant: 'success' as const,
  }),
  error: (title: string, description?: string) => ({
    title,
    description,
    variant: 'error' as const,
  }),
  warning: (title: string, description?: string) => ({
    title,
    description,
    variant: 'warning' as const,
  }),
  info: (title: string, description?: string) => ({
    title,
    description,
    variant: 'default' as const,
  }),
};
