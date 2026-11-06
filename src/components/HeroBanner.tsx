import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Sparkles
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
}) => {
  // Mengambil data banner slide dari Global Context
  const { heroSlides } = useApp();
  
  // State untuk melacak indeks slide aktif saat ini
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State untuk mendeteksi apakah kursor mouse sedang berada di atas banner
  const [isHovered, setIsHovered] = useState(false);

  // Mencegah error 'out of bounds' jika jumlah slide berubah dinamis
  const safeIndex = currentSlide >= heroSlides.length ? 0 : currentSlide;

  // [LOGIKA TEKNIS 1]: Auto-Slide Otomatis setiap 6.5 detik
  // Jika mouse hover aktif (isHovered = true), interval dihentikan sementara
  // agar wali murid dapat membaca informasi slide dengan tenang tanpa terpotong.
  useEffect(() => {
    if (isHovered || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  // Fungsi navigasi manual: Slide Sebelumnya
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Fungsi navigasi manual: Slide Berikutnya
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
  };

  if (!heroSlides || heroSlides.length === 0) return null;
  const slide = heroSlides[safeIndex] || heroSlides[0];

  return (
    <div 
      className="relative w-full h-screen min-h-screen overflow-hidden bg-slate-950 select-none flex items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* [LOGIKA TEKNIS 2]: Stacked Cross-Fade Background
          Semua gambar dirender bertumpuk (stacked) dengan transisi CSS 'opacity'.
          Teknik ini mencegah layout-shifting, flicker, atau jeda putih saat gambar berganti. */}
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

      {/* Natural Dark Gradient for Perfect Text Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 sm:h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

      {/* Main Text & Content: Stable Typography with Smooth CSS Fade per Slide */}
      <div className="relative z-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-16 sm:pb-20 lg:pb-24 w-full">
        <div 
          key={safeIndex} 
          className="max-w-3xl text-left space-y-2 sm:space-y-3 transition-opacity duration-500 ease-out"
        >
          {/* Badge: Welcome Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{slide.welcome}</span>
            </span>
          </div>

          {/* Main Title: Crisp, bold, solid without layout shifting or jitter */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-lg">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl lg:text-2xl font-black text-amber-300 sm:text-white tracking-wide uppercase drop-shadow-md">
            {slide.subtitle}
          </p>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-sm lg:text-base text-white/95 max-w-2xl leading-relaxed drop-shadow">
            {slide.description}
          </p>

          {/* Action Button: Lets Join Us */}
          <div className="pt-2 sm:pt-3">
            <button
              type="button"
              onClick={onOpenPpdb}
              className="relative group overflow-hidden inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#0084d6] hover:bg-[#0070b8] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-cyan-500/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10">{slide.primaryButton || 'Daftar SPMB Online'}</span>
              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5 relative z-10" />
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>

      {/* Left Slider Arrow */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-20 sm:h-24 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-xs transition rounded-r-lg cursor-pointer"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Right Slider Arrow */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-20 sm:h-24 bg-black/30 hover:bg-black/60 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-xs transition rounded-l-lg cursor-pointer"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Bottom Slider Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              safeIndex === i ? 'w-6 bg-white shadow-xs' : 'w-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
