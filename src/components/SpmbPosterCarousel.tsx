import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Zap,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';
import { PageTab } from '../types';

interface SpmbPosterCarouselProps {
  onOpenPpdb: () => void;
  onNavigate?: (page: PageTab, section?: string) => void;
}

interface PosterData {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  ctaAction: 'ppdb' | 'wa_trial' | 'wa_daycare' | 'facilities';
  bgGradient: string;
  accentBorder: string;
  accentGlow: string;
  accentColor: string;
  imageSrc: string;
  imageAlt: string;
}

export const SpmbPosterCarousel: React.FC<SpmbPosterCarouselProps> = ({
  onOpenPpdb,
  onNavigate,
}) => {
  const { schoolIdentity } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const SLIDE_DURATION = 5000; // 5 detik per slide

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cleanPhone = (schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '');
  const waTarget = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  // 4 Poster Landscape Spesifikasi Unggulan TK Islam Lukman Hakim Purwokerto
  const posters: PosterData[] = [
    {
      id: 'poster-spmb-utama',
      badge: 'SPMB RESMI DIBUKA • T.A. 2026/2027',
      badgeColor: 'bg-amber-400 text-slate-950',
      title: 'SPMB ONLINE',
      titleHighlight: '2026/2027',
      subtitle: 'Penerimaan Murid Baru Berbasis Sentra, Tilawati & Montessori Islam',
      highlights: [
        'Kuota Terbatas (Rasio Ideal 2 Ustadzah / Kelas)',
        'Tanpa Tes Calistung Memaksa & Pendampingan Ramah Anak',
        'Free Trial Class Eksklusif & Konsultasi Bakat Santri',
      ],
      ctaLabel: 'Daftar SPMB Online',
      ctaAction: 'ppdb',
      bgGradient: 'from-[#061826] via-[#08304c] to-[#006699]',
      accentBorder: 'border-sky-400/50 hover:border-sky-300',
      accentGlow: 'rgba(2, 132, 199, 0.35)',
      accentColor: '#006699',
      imageSrc: '/assets/school_hero_students.jpg',
      imageAlt: 'Santri TK Islam Lukman Hakim Purwokerto Ceria',
    },
    {
      id: 'poster-free-trial',
      badge: 'PROGRAM EKSKLUSIF CALON SANTRI',
      badgeColor: 'bg-emerald-400 text-slate-950',
      title: 'FREE TRIAL CLASS',
      titleHighlight: '& TOUR KAMPUS',
      subtitle: 'Rasakan Langsung Serunya Belajar di 7 Sentra Ber-AC & Playground Alam Asri',
      highlights: [
        'Eksplorasi Sentra Alam Cair, Balok, Seni & Peran',
        'Observasi Minat, Bakat & Tumbuh Kembang Bersama Guru',
        'Jadwal Terbuka Setiap Hari Kerja (Dengan Janji Temu)',
      ],
      ctaLabel: 'Jadwalkan Trial Class',
      ctaAction: 'wa_trial',
      bgGradient: 'from-[#032018] via-[#064e3b] to-[#047857]',
      accentBorder: 'border-emerald-400/50 hover:border-emerald-300',
      accentGlow: 'rgba(16, 185, 129, 0.35)',
      accentColor: '#047857',
      imageSrc: '/assets/gallery/foto8-eksplorasi-alam-burung.jpg',
      imageAlt: 'Kegiatan Outdoor & Eksplorasi Alam Santri',
    },
    {
      id: 'poster-karakter-tilawati',
      badge: 'AKREDITASI A (UNGGUL) KEMENDIKBUD',
      badgeColor: 'bg-cyan-400 text-slate-950',
      title: 'KARAKTER QUR’ANI',
      titleHighlight: '& SENTRA BER-AC',
      subtitle: 'Pembiasaan Adab Harian, Sholat Dhuha & Metode Tilawati Berirama Gembira',
      highlights: [
        'Metode Tilawati PAUD: Mengaji Praktis & Bahagia',
        '7 Sentra Tematik & Kurikulum Merdeka Terpadu',
        'Fasilitas Lengkap: Kebun Botanika, Musholla & Pentas',
      ],
      ctaLabel: 'Jelajahi Fasilitas Sentra',
      ctaAction: 'facilities',
      bgGradient: 'from-[#0b1329] via-[#172554] to-[#0284c7]',
      accentBorder: 'border-cyan-400/50 hover:border-cyan-300',
      accentGlow: 'rgba(56, 189, 248, 0.35)',
      accentColor: '#0284c7',
      imageSrc: '/assets/gallery/foto6-sholat-berjamaah.jpg',
      imageAlt: 'Pembiasaan Ibadah dan Tilawati PAUD',
    },
    {
      id: 'poster-daycare-stimulasi',
      badge: 'LAYANAN USIA 1.5 – 6 TAHUN',
      badgeColor: 'bg-amber-300 text-slate-950',
      title: 'DAYCARE & KB',
      titleHighlight: 'BATITA CERIA',
      subtitle: 'Pengasuhan Penuh Kasih, Menu Gizi Higienis & Stimulasi Sensorik Optimal',
      highlights: [
        'Kamar Istirahat Ber-AC & Matras Sensorik Lembut',
        'Laporan Digital Harian Gizi, Nafsu Makan & Perkembangan',
        'Pemeriksaan Kesehatan Berkala & Pendamping Terlatih',
      ],
      ctaLabel: 'Konsultasi Daycare & KB',
      ctaAction: 'wa_daycare',
      bgGradient: 'from-[#2e1003] via-[#78350f] to-[#b45309]',
      accentBorder: 'border-amber-400/50 hover:border-amber-300',
      accentGlow: 'rgba(245, 158, 11, 0.35)',
      accentColor: '#b45309',
      imageSrc: '/assets/gallery/foto4-snack-area-bermain.jpg',
      imageAlt: 'Area Daycare & Bermain Santri Usia Dini',
    },
  ];

  // Pada desktop: 2 poster berdampingan per slide (total 2 halaman: [0,1] & [2,3])
  // Pada mobile: 1 poster per slide (total 4 halaman)
  const totalPages = isMobile ? posters.length : Math.ceil(posters.length / 2);

  // Auto-slide otomatis & live progress timer
  useEffect(() => {
    setProgress(0);
    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentPage((curr) => (curr + 1) % totalPages);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentPage, totalPages]);

  const handleNext = () => {
    setProgress(0);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleAction = (action: PosterData['ctaAction']) => {
    if (action === 'ppdb') {
      onOpenPpdb();
    } else if (action === 'wa_trial') {
      const msg = `Assalamu’alaikum Admin ${schoolIdentity.nama}. Saya ingin mendaftarkan Ananda untuk program Free Trial Class & Tour Kampus. Mohon informasi jadwal yang tersedia. Terima kasih.`;
      window.open(`https://wa.me/${waTarget}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    } else if (action === 'wa_daycare') {
      const msg = `Assalamu’alaikum Admin ${schoolIdentity.nama}. Saya ingin berkonsultasi mengenai pendaftaran Daycare / KB Batita Ceria untuk Ananda. Mohon informasi paket dan jam layanan. Terima kasih.`;
      window.open(`https://wa.me/${waTarget}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    } else if (action === 'facilities') {
      if (onNavigate) {
        onNavigate('facilities', 'facilities-list');
      } else {
        const el = document.getElementById('facilities-list');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="spmb-landscape-showcase"
      className="relative w-full bg-slate-900/5 py-6 sm:py-8 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-[#006699]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-14 relative">
        {/* Carousel Slider Track: True Panoramic Landscape */}
        <div className="relative group/carousel">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isMobile ? (
                // Mobile: 1 Landscape Card per slide
                posters.map((poster) => (
                  <div key={poster.id} className="w-full flex-shrink-0 px-1">
                    <LandscapePosterCard
                      poster={poster}
                      schoolName={schoolIdentity.nama}
                      waTarget={waTarget}
                      onAction={() => handleAction(poster.ctaAction)}
                    />
                  </div>
                ))
              ) : (
                // Desktop: 2 Landscape Cards side-by-side per slide
                Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const pair = posters.slice(pageIdx * 2, pageIdx * 2 + 2);
                  return (
                    <div
                      key={`slide-${pageIdx}`}
                      className="w-full flex-shrink-0 grid grid-cols-2 gap-4 xl:gap-6 px-1"
                    >
                      {pair.map((poster) => (
                        <LandscapePosterCard
                          key={poster.id}
                          poster={poster}
                          schoolName={schoolIdentity.nama}
                          waTarget={waTarget}
                          onAction={() => handleAction(poster.ctaAction)}
                        />
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Floating Navigation Controls (Glassmorphism Arrows) */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Poster Sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            type="button"
            aria-label="Poster Selanjutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Bar: Live Auto-Scroll Indicator & Quick Dots */}
        <div className="flex items-center justify-between gap-4 mt-3 px-2">
          {/* Status Label with Live Pulsing Dot */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Pembaruan Otomatis</span>
            <span className="text-slate-400">•</span>
            <span>Slide {currentPage + 1} / {totalPages}</span>
          </div>

          {/* Central Animated Progress Countdown Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md h-1.5 bg-slate-200/90 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#006699] to-amber-500 rounded-full transition-all ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setProgress(0);
                  setCurrentPage(idx);
                }}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx
                    ? 'w-6 h-2 bg-[#006699]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface LandscapePosterCardProps {
  poster: PosterData;
  schoolName: string;
  waTarget: string;
  onAction: () => void;
}

const LandscapePosterCard: React.FC<LandscapePosterCardProps> = ({
  poster,
  schoolName,
  waTarget,
  onAction,
}) => {
  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl bg-gradient-to-r ${poster.bgGradient} border ${poster.accentBorder} shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between text-white min-h-[260px] sm:min-h-[280px] lg:min-h-[290px] xl:min-h-[305px]`}
    >
      {/* 1. Shimmer Gleam Light Sweep Effect (Kilau Bergerak Biar Josjis & Ga Boring) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* 2. Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${poster.accentGlow}, transparent 70%)`,
        }}
      />

      {/* 3. Curved Glowing Orbital Neon Lines (Lekukan Cahaya Berpendar Ala Banner Telkom) */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/15 pointer-events-none" />
      <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full border border-amber-300/20 pointer-events-none" />
      <div className="absolute -bottom-24 -right-12 w-88 h-88 rounded-full border border-sky-400/20 pointer-events-none" />

      {/* 4. Right-Side Landscape Photography with Seamless Diagonal Gradient Mask */}
      <div className="absolute top-0 right-0 bottom-0 w-[42%] sm:w-[46%] overflow-hidden pointer-events-none">
        <img
          src={poster.imageSrc}
          alt={poster.imageAlt}
          className="w-full h-full object-cover object-center opacity-90 scale-100 group-hover:scale-108 transition-transform duration-1000 ease-out"
        />
        {/* Horizontal Gradient Mask: Melebur Alami dengan Warna Banner Kiri */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061826] via-transparent to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* 5. Main Landscape Content Area (Left 60% Zone) */}
      <div className="relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full max-w-[70%] sm:max-w-[62%]">
        <div>
          {/* Header Baris 1: Logo & Kicker Badge Dinamis */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
              <LukmanHakimLogo variant="emblem" size={20} />
              <span className="text-[10px] font-black tracking-wider text-white uppercase">
                {schoolName}
              </span>
            </div>

            <span
              className={`px-2 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-xs ${poster.badgeColor}`}
            >
              {poster.badge}
            </span>
          </div>

          {/* Headline Landscape Besar & Berenergi */}
          <h3 className="text-xl sm:text-2xl xl:text-3xl font-black leading-tight tracking-tight drop-shadow-md text-white mt-1">
            {poster.title}{' '}
            <span className="text-amber-300 drop-shadow-sm">{poster.titleHighlight}</span>
          </h3>

          {/* Subtitle Ringkas */}
          <p className="text-[11px] sm:text-xs text-sky-100/90 font-medium leading-relaxed mt-1 line-clamp-1">
            {poster.subtitle}
          </p>

          {/* 3 Checklist Keunggulan Ringkas */}
          <ul className="mt-2.5 space-y-1">
            {poster.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-white/95 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span className="leading-snug line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Area: Tombol Aksi + Mini QR Badge Interaktif */}
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
          {/* Tombol Utama */}
          <button
            onClick={onAction}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md hover:shadow-xl active:scale-95 transition-all cursor-pointer group/btn"
          >
            <span>{poster.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          {/* Mini QR Box Interaktif (Khas Poster Resmi Seperti Referensi SMK Telkom) */}
          <div
            onClick={onAction}
            title="Klik untuk langsung terhubung WhatsApp Panitia SPMB"
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-900 shadow-md border border-white cursor-pointer transition transform hover:scale-105 active:scale-95"
          >
            <QrCode className="w-5 h-5 text-[#006699]" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">Panitia SPMB</span>
              <span className="text-[9.5px] font-black text-[#006699]">Chat WA &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
