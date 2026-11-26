import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { getCacheBustedUrl } from '../utils/cacheBuster';
import heroGoldenCampus from '../assets/images/hero_campus_golden_1795672459358.jpg';

interface HeroBannerProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
  onNavigate?: (page: PageTab) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenPpdb,
  onNavigate,
}) => {
  const { heroSlides } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const safeIndex = currentSlide >= heroSlides.length ? 0 : currentSlide;

  useEffect(() => {
    if (isHovered || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  if (!heroSlides || heroSlides.length === 0) return null;
  const slide = heroSlides[safeIndex] || heroSlides[0];

  return (
    <section
      className="relative w-full h-[60svh] min-h-[385px] max-h-[470px] md:h-[92vh] md:min-h-[680px] md:max-h-[940px] overflow-hidden bg-[#061826] select-none flex items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stacked Cross-Fade + Subtle Ken Burns Background */}
      <div className="absolute inset-0 w-full h-full">
        {heroSlides.map((s, idx) => {
          const isActive = idx === safeIndex;
          const imgSrc = failedImages[idx] ? heroGoldenCampus : getCacheBustedUrl(s.image);
          return (
            <div
              key={s.id || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={imgSrc}
                alt={s.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [idx]: true,
                  }))
                }
                className={`w-full h-full object-cover object-center sm:object-top ${
                  isActive ? 'animate-ken-burns' : ''
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Warm Atmospheric Scrims for Magazine-Grade Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/95 via-[#061826]/55 to-[#061826]/20 pointer-events-none z-10" />
      <div className="hidden md:block absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#061826]/75 via-[#061826]/30 to-transparent pointer-events-none z-10" />

      {/* Main Editorial Content Zone */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-10 sm:pb-16 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          {/* Left Editorial Statement */}
          <div
            key={safeIndex}
            className="lg:col-span-8 text-left space-y-2 sm:space-y-4 animate-fade-up"
          >
            {/* Unboxed Editorial Kicker */}
            <p className="text-[10.5px] sm:text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
              {slide.welcome} <span className="text-white/40 mx-1.5">·</span> Akreditasi A
            </p>

            {/* Monumental Display Headline */}
            <h1 className="font-display text-[1.6rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-white tracking-tight leading-[1.06] [text-wrap:balance] drop-shadow-sm">
              {slide.title}
            </h1>

            {/* Poetic / Accent Subtitle */}
            <p className="font-serif italic text-sm sm:text-xl lg:text-2xl text-sky-100/95 leading-snug max-w-2xl">
              {slide.subtitle}
            </p>

            {/* Concise Editorial Copy */}
            <p className="text-[11.5px] sm:text-sm lg:text-[15px] text-slate-200/90 max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
              {slide.description}
            </p>

            {/* Single Primary CTA + Clean Ghost Action */}
            <div className="pt-2 sm:pt-3 flex flex-row items-center gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={onOpenPpdb}
                className="flex-1 sm:flex-initial min-h-[42px] sm:min-h-[50px] inline-flex items-center justify-center gap-2 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#092338] font-extrabold text-xs sm:text-sm shadow-[0_14px_30px_-8px_rgba(245,158,11,0.5)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{slide.primaryButton || 'Daftar SPMB Online'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('schools')}
                  className="min-h-[42px] sm:min-h-[50px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/12 hover:bg-white/22 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 shrink-0" />
                  <span className="sm:hidden">4 Jenjang</span>
                  <span className="hidden sm:inline">Jelajahi 4 Jenjang</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Desktop Slide Counter & Segmented Progress Controls */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-end gap-4 pb-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-white tabular-nums">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-white/40">/</span>
              <span className="font-display text-sm font-semibold text-white/60 tabular-nums">
                {String(heroSlides.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-1.5 ml-3">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Slide sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Slide selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Progress Bar Track */}
            <div className="flex items-center gap-2 w-60">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer relative"
                  aria-label={`Pilih Slide ${i + 1}`}
                >
                  {safeIndex === i && (
                    <span
                      key={`prog-${safeIndex}-${isHovered ? 'p' : 'r'}`}
                      className={`absolute inset-0 bg-amber-400 rounded-full ${
                        isHovered ? 'scale-x-100' : 'animate-hero-progress'
                      }`}
                    />
                  )}
                  {i < safeIndex && (
                    <span className="absolute inset-0 bg-white/70 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Compact Progress Dots */}
      <div className="lg:hidden absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              safeIndex === i ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/45'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
