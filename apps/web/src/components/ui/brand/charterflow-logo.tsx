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
          <stop offset="0%" stopColor="rgb(99 102 241)" />
          <stop offset="100%" stopColor="rgb(139 92 246)" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer hexagon */}
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#logoGlow)"
        className="opacity-80"
      />
      
      {/* Inner stylized C and F */}
      <g fill="url(#logoGradient)" className="opacity-90">
        {/* C shape */}
        <path d="M10 12C10 10.8954 10.8954 10 12 10H14C15.1046 10 16 10.8954 16 12V14C16 15.1046 15.1046 16 14 16H12C10.8954 16 10 15.1046 10 14V12Z" />
        {/* F shape */}
        <path d="M18 10H22V12H20V14H22V16H20V18H18V10Z" />
      </g>
      
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.5" fill="url(#logoGradient)" className="opacity-100" />
    </svg>
  );
}
