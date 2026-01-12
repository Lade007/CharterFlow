import React from 'react';
import { cn } from '@/lib/utils';
import { colors } from '@/tokens/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  asChild = false,
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  if (asChild) {
    return <>{children}</>;
  }

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group';
  
  const variants = {
    primary: `bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 disabled:from-primary-300 disabled:to-primary-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`,
    secondary: `bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 focus:ring-secondary-500 disabled:from-secondary-300 disabled:to-secondary-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`,
    outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 active:scale-95`,
    ghost: `text-primary-600 hover:bg-primary-100 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95`,
    danger: `bg-gradient-to-r from-error-600 to-error-500 text-white hover:from-error-700 hover:to-error-600 focus:ring-error-500 disabled:from-error-300 disabled:to-error-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`,
    glass: `bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`,
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon && !loading) return null;
    
    const iconContent = loading ? (
      <svg
        className="animate-spin h-4 w-4"
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
      <span className="flex-shrink-0">{icon}</span>
    );

    return position === 'left' ? (
      <span className="flex-shrink-0">{iconContent}</span>
    ) : (
      <span className="flex-shrink-0">{iconContent}</span>
    );
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (loading || disabled) && 'opacity-50 cursor-not-allowed transform-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
      
      {/* Gradient shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
      
      {/* Content */}
      <span className="relative flex items-center justify-center w-full">
        {iconPosition === 'left' && renderIcon('left')}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
        {iconPosition === 'right' && renderIcon('right')}
      </span>
    </button>
  );
}
