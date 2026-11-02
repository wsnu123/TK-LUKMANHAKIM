import React, { useEffect, useState, useCallback } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const RIPPLE_COLORS = [
  'rgba(46, 125, 50, 0.45)', // Emerald/Forest green
  'rgba(124, 181, 24, 0.55)', // Fresh lime
  'rgba(0, 168, 255, 0.45)', // Sky blue
  'rgba(245, 158, 11, 0.55)', // Warm gold
];

const PARTICLE_COLORS = [
  '#2e7d32',
  '#7cb518',
  '#00a8ff',
  '#fbbf24',
  '#10b981',
  '#38bdf8',
];

export const ClickEffect: React.FC = () => {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [particles, setParticles] = useState<ClickParticle[]>([]);

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Avoid creating effect if clicked on text inputs to prevent visual distraction
    const target = e.target as HTMLElement | null;
    const isTextInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now() + Math.random();
    const color = RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)];

    // 1. Add Ripple Wave
    setRipples((prev) => [...prev.slice(-8), { id, x, y, color }]);

    // 2. Add mini burst of 6 playful particles
    if (!isTextInput) {
      const newParticles: ClickParticle[] = [];
      const count = 7;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const speed = 1.8 + Math.random() * 2.2;
        newParticles.push({
          id: id + i + 1,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 3,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        });
      }
      setParticles((prev) => [...prev.slice(-20), ...newParticles]);
    }

    // Auto cleanup ripple after animation finishes (650ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);

    // Auto cleanup particles after 550ms
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => Math.floor(p.id) !== Math.floor(id)));
    }, 550);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Expanding Ripple Rings */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-click-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
          }}
        />
      ))}

      {/* Floating Sparkle Particles */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-click-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
            '--vx': `${particle.vx * 18}px`,
            '--vy': `${particle.vy * 18}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
