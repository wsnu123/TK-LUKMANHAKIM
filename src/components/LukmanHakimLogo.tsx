import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCacheBustedUrl } from '../utils/cacheBuster';

interface LukmanHakimLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'emblem' | 'seal' | 'badge';
  subtitle?: string;
  customLogoUrl?: string;
}

export const LukmanHakimLogo: React.FC<LukmanHakimLogoProps> = ({
  className = '',
  size = 64,
  variant = 'seal',
  customLogoUrl: propCustomLogoUrl,
}) => {
  const [fallbackStep, setFallbackStep] = useState(0);
  let contextLogoUrl: string | undefined = undefined;
  let schoolName = 'TK LUKMAN HAKIM';

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const app = useApp();
    contextLogoUrl = app?.schoolIdentity?.customLogoUrl;
    if (app?.schoolIdentity?.nama) {
      schoolName = app.schoolIdentity.nama.toUpperCase();
    }
  } catch {
    // If rendered outside AppProvider, fallback gracefully
  }

  // Consistent logo sources: Primary -> fallback 1 -> fallback 2
  const candidateLogos = [
    propCustomLogoUrl || contextLogoUrl || '/logo.png',
    '/assets/logo.png',
    '/assets/logo.jpg',
  ].filter(Boolean) as string[];

  const currentLogoSrc = candidateLogos[Math.min(fallbackStep, candidateLogos.length - 1)] || '/logo.png';
  const activeLogoUrl = getCacheBustedUrl(currentLogoSrc);
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  const handleImageError = () => {
    if (fallbackStep < candidateLogos.length - 1) {
      setFallbackStep((prev) => prev + 1);
    }
  };

  // 1. EMBLEM (Clean, compact rounded logo for Navbar, Footer, Buttons)
  if (variant === 'emblem') {
    return (
      <div
        style={{ width: sizeValue, height: sizeValue }}
        className={`shrink-0 flex items-center justify-center overflow-hidden rounded-full bg-white shadow-xs border border-slate-100 ${className}`}
      >
        <img
          src={activeLogoUrl}
          alt={schoolName}
          onError={handleImageError}
          className="w-full h-full object-contain p-0.5"
          loading="lazy"
        />
      </div>
    );
  }

  // 2. BADGE (Prominent hero & feature badge with orbital satellites)
  if (variant === 'badge') {
    return (
      <div
        style={{ width: sizeValue, height: sizeValue }}
        className={`relative flex items-center justify-center ${className}`}
      >
        {/* Outer Orbit Ring with Decorative Nodes */}
        <div className="absolute inset-0 rounded-full border-4 border-[#0084d6] shadow-xl flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
          {/* Top Node */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-[#0084d6] flex items-center justify-center shadow-xs">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b]" />
          </div>

          {/* Top Right Node */}
          <div className="absolute top-1/4 -right-2.5 w-5 h-5 rounded-full bg-[#f59e0b] border-2 border-white shadow-xs" />

          {/* Bottom Right Node */}
          <div className="absolute bottom-1/4 -right-2 w-5 h-5 rounded-full bg-white border-3 border-[#38bdf8] shadow-xs" />

          {/* Bottom Left Node */}
          <div className="absolute bottom-1/4 -left-2.5 w-5 h-5 rounded-full bg-[#10b981] border-2 border-white shadow-xs" />

          {/* Left Node */}
          <div className="absolute top-1/4 -left-2.5 w-5 h-5 rounded-full bg-white border-3 border-[#38bdf8] shadow-xs" />

          {/* Inner Content Disc with Actual Logo */}
          <div className="w-[84%] h-[84%] rounded-full bg-white border-2 border-[#006699]/20 shadow-inner flex flex-col items-center justify-center p-3 sm:p-5 text-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden flex items-center justify-center bg-white p-1">
              <img
                src={activeLogoUrl}
                alt={schoolName}
                onError={handleImageError}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-[12px] sm:text-xs font-black uppercase tracking-wider text-[#0F2937] mt-1.5 leading-tight line-clamp-1">
              {schoolName}
            </span>
            <span className="text-[9px] font-bold text-[#006699] uppercase tracking-widest mt-0.5">
              PURWOKERTO
            </span>
            <span className="text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
              Akreditasi A • NPSN 69981337
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. SEAL (Official Circular Institution Seal with Actual Logo Center)
  return (
    <div
      style={{ width: sizeValue, height: sizeValue }}
      className={`relative shrink-0 flex items-center justify-center rounded-full bg-white shadow-md border-3 border-sky-200/80 p-2.5 overflow-hidden group ${className}`}
      aria-label="Logo Resmi TK Lukman Hakim Purwokerto"
    >
      <img
        src={activeLogoUrl}
        alt={schoolName}
        onError={handleImageError}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
