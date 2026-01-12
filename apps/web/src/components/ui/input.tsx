import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  className,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-secondary-700"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-secondary-400 h-5 w-5">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-md border-secondary-300 shadow-sm',
            'focus:border-primary-500 focus:ring-primary-500',
            'placeholder-secondary-400 text-secondary-900',
            error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : 'border-secondary-300',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-secondary-400 h-5 w-5">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-secondary-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
