import { cn } from '@/lib/utils';

interface CharterFlowLogoProps {
  className?: string;
}

export function CharterFlowLogo({ className }: CharterFlowLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feComposite in="coloredBlur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hexagon Container */}
      <path
        d="M16 2L28.1 9V23L16 30L3.9 23V9L16 2Z"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
      />

      {/* "C" Monogram - Modern & Geometric */}
      <path
        d="M16.5 11C15 11 13.5 11.5 12.5 12.5C11.5 13.5 11 14.8 11 16C11 17.2 11.5 18.5 12.5 19.5C13.5 20.5 15 21 16.5 21"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-100"
      />

      {/* "F" Monogram - Abstracted as a data flow line */}
      <path
        d="M21 11H17V21"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-100"
      />
      <path
        d="M17 16H20"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-100"
      />

      {/* Orbiting Dot (Intel) */}
      <circle cx="21" cy="21" r="1.5" fill="#f43f5e" className="opacity-90 animate-pulse" />

    </svg>
  );
}
