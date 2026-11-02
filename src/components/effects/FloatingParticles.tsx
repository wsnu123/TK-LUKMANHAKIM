import React, { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  variant?: 'cyan-gold' | 'emerald-teal' | 'white-sparkle';
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 14,
  variant = 'cyan-gold',
  className = '',
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.floor(Math.random() * 8) + 4; // 4px to 12px
      const left = Math.floor(Math.random() * 100);
      const top = Math.floor(Math.random() * 100);
      const duration = Math.floor(Math.random() * 10) + 12; // 12s - 22s
      const delay = (Math.random() * 5).toFixed(1);
      const blur = size > 8 ? 'blur-xs' : '';

      let color = 'bg-sky-400/40';
      if (variant === 'cyan-gold') {
        color = i % 3 === 0 ? 'bg-amber-300/50' : i % 3 === 1 ? 'bg-sky-400/50' : 'bg-teal-300/40';
      } else if (variant === 'emerald-teal') {
        color = i % 2 === 0 ? 'bg-emerald-400/40' : 'bg-teal-300/40';
      } else {
        color = 'bg-white/60';
      }

      return {
        id: i,
        size,
        left,
        top,
        duration,
        delay,
        color,
        blur,
      };
    });
  }, [count, variant]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full animate-pulse transition-transform ${p.color} ${p.blur}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 12px currentColor',
          }}
        />
      ))}
    </div>
  );
};
