import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass' | 'minimal';
  loading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  loading = false,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const variants = {
    default: {
      container: 'relative',
      input: cn(
        'block w-full rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300',
        'focus:shadow-lg focus:scale-[1.02] focus:bg-white',
        'placeholder:text-neutral-400 text-neutral-900',
        error 
          ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' 
          : isFocused
          ? 'border-primary-500 ring-4 ring-primary-500/20'
          : 'border-neutral-200 hover:border-neutral-300',
        leftIcon && 'pl-12',
        (rightIcon || loading) && 'pr-12'
      ),
      label: 'block text-sm font-semibold text-neutral-700 mb-2',
      error: 'text-sm text-error-600 mt-1 font-medium',
      helper: 'text-sm text-neutral-600 mt-1',
      icon: 'absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200',
      rightIcon: 'absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none transition-colors duration-200'
    },
    glass: {
      container: 'relative',
      input: cn(
        'block w-full rounded-xl border-2 bg-white/20 backdrop-blur-md shadow-lg transition-all duration-300',
        'focus:shadow-xl focus:scale-[1.02] focus:bg-white/30',
        'placeholder:text-white/60 text-white',
        error 
          ? 'border-error-400 focus:border-error-400 focus:ring-error-400/30' 
          : isFocused
          ? 'border-white/40 ring-4 ring-white/20'
          : 'border-white/20 hover:border-white/30',
        leftIcon && 'pl-12',
        (rightIcon || loading) && 'pr-12'
      ),
      label: 'block text-sm font-semibold text-white/90 mb-2',
      error: 'text-sm text-error-300 mt-1 font-medium',
      helper: 'text-sm text-white/70 mt-1',
      icon: 'absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200',
      rightIcon: 'absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none transition-colors duration-200'
    },
    minimal: {
      container: 'relative',
      input: cn(
        'block w-full rounded-lg border-0 bg-transparent shadow-sm transition-all duration-300',
        'focus:shadow-md focus:scale-[1.01]',
        'placeholder:text-neutral-400 text-neutral-900',
        error 
          ? 'border-b-2 border-error-500' 
          : isFocused
          ? 'border-b-2 border-primary-500'
          : 'border-b-2 border-neutral-200',
        'py-3 px-0',
        leftIcon && 'pl-8',
        (rightIcon || loading) && 'pr-8'
      ),
      label: 'block text-xs font-medium text-neutral-600 mb-1 uppercase tracking-wider',
      error: 'text-xs text-error-600 mt-1 font-medium',
      helper: 'text-xs text-neutral-500 mt-1',
      icon: 'absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none transition-colors duration-200',
      rightIcon: 'absolute inset-y-0 right-0 pr-0 flex items-center pointer-events-none transition-colors duration-200'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className={currentVariant.label}
        >
          {label}
        </label>
      )}
      
      <div className={currentVariant.container}>
        {leftIcon && (
          <div className={currentVariant.icon}>
            <div className={cn(
              'h-5 w-5 transition-colors duration-200',
              variant === 'glass' ? 'text-white/60' : 'text-neutral-400',
              isFocused && (variant === 'glass' ? 'text-white/80' : 'text-primary-500')
            )}>
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          id={inputId}
          ref={ref}
          className={cn(currentVariant.input, className)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {(rightIcon || loading) && (
          <div className={currentVariant.rightIcon}>
            {loading ? (
              <svg
                className="animate-spin h-5 w-5"
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
            ) : (
              <div className={cn(
                'h-5 w-5 transition-colors duration-200',
                variant === 'glass' ? 'text-white/60' : 'text-neutral-400',
                isFocused && (variant === 'glass' ? 'text-white/80' : 'text-primary-500')
              )}>
                {rightIcon}
              </div>
            )}
          </div>
        )}

        {/* Focus indicator */}
        {variant !== 'minimal' && (
          <div className={cn(
            'absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300',
            isFocused ? 'opacity-100' : 'opacity-0'
          )}>
            <div className={cn(
              'absolute inset-0 rounded-xl',
              variant === 'glass' 
                ? 'bg-gradient-to-r from-white/10 to-white/5' 
                : 'bg-gradient-to-r from-primary-500/5 to-primary-600/5'
            )} />
          </div>
        )}
      </div>
      
      {error && (
        <p className={currentVariant.error}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className={currentVariant.helper}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
