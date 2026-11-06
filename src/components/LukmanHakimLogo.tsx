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
  const [imageError, setImageError] = useState(false);
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

  const rawLogoUrl = !imageError ? (propCustomLogoUrl || contextLogoUrl || '/assets/logo.png') : '/assets/logo.png';
  const activeLogoUrl = rawLogoUrl ? getCacheBustedUrl(rawLogoUrl) : '/assets/logo.png';
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  if (variant === 'emblem') {
    return (
      <div
        style={{ width: sizeValue, height: sizeValue }}
        className={`shrink-0 flex items-center justify-center overflow-hidden rounded-xl ${className}`}
      >
        <img
          src={activeLogoUrl}
          alt={schoolName}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'badge') {
    // Large circular orbital badge replacing child photo in hero & sections
    return (
      <div
        style={{ width: sizeValue, height: sizeValue }}
        className={`relative flex items-center justify-center ${className}`}
      >
        {/* Outer Orbit Ring with 5 Decorative Colored Satellite Nodes */}
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

          {/* Inner Content Disc */}
          <div className="w-[82%] h-[82%] rounded-full bg-white border-2 border-[#006699]/20 shadow-inner flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-white p-1">
              <img
                src={activeLogoUrl}
                alt={schoolName}
                onError={() => setImageError(true)}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#0F2937] mt-1 leading-tight line-clamp-1">
              {schoolName}
            </span>
            <span className="text-[9px] font-bold text-[#006699] uppercase tracking-widest mt-0.5">
              PURWOKERTO
            </span>
            <span className="text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
              Akreditasi A • NPSN 69981337
            </span>
          </div>
        </div>
      </div>
    );
  }

  // variant === 'seal' (Default Circular Seal)
  return (
    <div
      style={{ width: sizeValue, height: sizeValue }}
      className={`relative shrink-0 select-none ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        aria-label="Stempel Resmi TK Lukman Hakim Purwokerto"
      >
        <defs>
          <path id="seal-top-path" d="M 28 100 A 72 72 0 1 1 172 100" fill="none" />
          <path id="seal-bottom-path" d="M 166 106 A 68 68 0 0 1 34 106" fill="none" />
        </defs>

        {/* Outer Golden Border */}
        <circle cx="100" cy="100" r="97" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="#006699" strokeWidth="2.5" />

        {/* Inner Rim Background */}
        <circle cx="100" cy="100" r="88" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="100" cy="100" r="54" fill="#ffffff" stroke="#006699" strokeWidth="2" />

        {/* Curved Upper Text */}
        <text fill="#006699" fontSize="13" fontWeight="900" letterSpacing="0.16em">
          <textPath href="#seal-top-path" startOffset="50%" textAnchor="middle">
            {schoolName.length > 20 ? schoolName.slice(0, 20) : schoolName}
          </textPath>
        </text>

        {/* Decorative Star Accents */}
        <polygon points="100,18 102,23 107,23 103,26 105,31 100,28 95,31 97,26 93,23 98,23" fill="#f59e0b" />
        <circle cx="34" cy="98" r="3" fill="#f59e0b" />
        <circle cx="166" cy="98" r="3" fill="#f59e0b" />

        {/* Curved Lower Text */}
        <text fill="#0F2937" fontSize="10.5" fontWeight="800" letterSpacing="0.22em">
          <textPath href="#seal-bottom-path" startOffset="50%" textAnchor="middle">
            TERAKREDITASI A
          </textPath>
        </text>

        {/* Center Logo Placement */}
        <foreignObject x="50" y="50" width="100" height="100">
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-full p-2 bg-white">
            <img
              src={activeLogoUrl}
              alt={schoolName}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain"
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
