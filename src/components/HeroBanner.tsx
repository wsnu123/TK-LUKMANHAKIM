import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { getCacheBustedUrl } from '../utils/cacheBuster';

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
    <div
      className="relative w-full h-[80svh] min-h-[540px] max-h-[680px] md:h-screen md:min-h-[680px] md:max-h-none overflow-hidden bg-slate-950 select-none flex items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stacked Cross-Fade Background */}
      <div className="absolute inset-0 w-full h-full">
        {heroSlides.map((s, idx) => {
          const isActive = idx === safeIndex;
          return (
            <div
              key={s.id || idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={getCacheBustedUrl(s.image)}
                alt={s.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center sm:object-top brightness-105 contrast-102"
              />
            </div>
          );
        })}
      </div>

      {/* Measured Contrast Scrim for Crisp Daylight & Mobile Readability */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 sm:h-3/5 bg-gradient-to-t from-[#071926]/96 via-[#071926]/65 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />

      {/* Main Text & Action Zone */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-14 sm:pb-20 lg:pb-24 w-full">
        <div
          key={safeIndex}
          className="max-w-3xl text-left space-y-2.5 sm:space-y-3 transition-opacity duration-500 ease-out"
        >
          {/* Quiet Kicker */}
          <p className="text-[11px] sm:text-sm font-extrabold tracking-widest text-amber-300 uppercase">
            {slide.welcome}
          </p>

          {/* Main Display Title */}
          <h1 className="text-[1.85rem] sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.12] drop-shadow-md [text-wrap:balance]">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl lg:text-2xl font-extrabold text-sky-200 sm:text-white tracking-wide uppercase drop-shadow-sm">
            {slide.subtitle}
          </p>

          {/* Concise Description */}
          <p className="text-xs sm:text-sm lg:text-base text-white/90 max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">
            {slide.description}
          </p>

          {/* Mobile-Friendly Thumb-Zone Actions -> Desktop Single Primary CTA */}
          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenPpdb}
              className="min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl sm:rounded-full bg-amber-400 hover:bg-amber-300 sm:bg-[#0084d6] sm:hover:bg-[#0070b8] text-[#0B253A] sm:text-white font-black sm:font-bold text-xs sm:text-sm shadow-xl transition-transform active:scale-95 cursor-pointer"
            >
              <span>{slide.primaryButton || 'Daftar SPMB Online'}</span>
              <Play className="hidden sm:inline w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
              <ArrowRight className="sm:hidden w-4 h-4" />
            </button>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('schools')}
                className="sm:hidden min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-bold text-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-200" />
                <span>Lihat Jenjang &amp; 7 Sentra</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Left/Right Arrows (Hidden on Mobile where Touch Swipe is Native) */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-24 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white items-center justify-center backdrop-blur-xs transition rounded-r-lg cursor-pointer"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-24 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white items-center justify-center backdrop-blur-xs transition rounded-l-lg cursor-pointer"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Bottom Slider Dots */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/45 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              safeIndex === i ? 'w-6 bg-amber-400 sm:bg-white shadow-xs' : 'w-2 bg-white/45 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
