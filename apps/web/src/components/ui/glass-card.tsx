import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
  style?: React.CSSProperties;
}

export function GlassCard({ children, className, variant = 'default', style }: GlassCardProps) {
  const variants = {
    default: 'bg-white/60 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
    subtle: 'bg-white/40 backdrop-blur-sm border border-white/10 shadow-sm',
    strong: 'bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl shadow-black/10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-black/10',
        variants[variant],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
