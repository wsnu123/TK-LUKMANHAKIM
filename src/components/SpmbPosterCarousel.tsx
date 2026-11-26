import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Globe,
  MessageCircle,
  Phone,
  Maximize2,
  X,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  HeartHandshake,
  Sparkles,
  Instagram,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';
import spmbStudentsCutout from '../assets/images/spmb_tk_students_cutout_1795668354024.jpg';
import spmbBuildingFacade from '../assets/images/spmb_tk_building_facade_1795668355691.jpg';
import spmbSentraClassroom from '../assets/images/spmb_tk_sentra_outdoor_1795668353787.jpg';

interface SpmbPosterCarouselProps {
  onOpenPpdb: () => void;
  onNavigate?: (page: PageTab, section?: string) => void;
}

type PosterId = 'spmb-utama' | 'spmb-trial' | 'spmb-sentra' | 'spmb-daycare';

const POSTER_META: { id: PosterId; label: string }[] = [
  { id: 'spmb-utama', label: 'Poster Resmi SPMB 2026/2027' },
  { id: 'spmb-trial', label: 'Free Trial Class & Jalur Pendaftaran' },
  { id: 'spmb-sentra', label: '7 Sentra Ber-AC & Metode Tilawati' },
  { id: 'spmb-daycare', label: 'Daycare & KB Batita Ceria' },
];

const stickerTextStyle = (strokePx = 8): React.CSSProperties => ({
  WebkitTextStroke: `${strokePx}px #ffffff`,
  paintOrder: 'stroke fill',
  filter: 'drop-shadow(0 6px 12px rgba(11, 59, 91, 0.22))',
});

export const SpmbPosterCarousel: React.FC<SpmbPosterCarouselProps> = ({
  onOpenPpdb,
  onNavigate,
}) => {
  const { schoolIdentity } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomedPoster, setZoomedPoster] = useState<PosterId | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: 2 portrait official posters side-by-side per slide (2 slides total)
  // Mobile: 1 portrait official poster per slide (4 slides total)
  const totalPages = isMobile ? POSTER_META.length : 2;

  useEffect(() => {
    setCurrentPage((prev) => (prev >= totalPages ? 0 : prev));
  }, [totalPages]);

  // Gentle auto-advance every 8s, paused on hover or while lightbox is open
  useEffect(() => {
    if (isPaused || zoomedPoster) return;
    const timer = setInterval(() => {
      setCurrentPage((curr) => (curr + 1) % totalPages);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, zoomedPoster, totalPages]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!zoomedPoster) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedPoster(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedPoster]);

  const rawWa = (schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '');
  const waTarget = rawWa.startsWith('0')
    ? '62' + rawWa.slice(1)
    : rawWa.startsWith('62')
    ? rawWa
    : '62' + rawWa;

  const displayPhone = (() => {
    const local = waTarget.startsWith('62') ? '0' + waTarget.slice(2) : waTarget;
    if (local.length >= 11) {
      return `${local.slice(0, 4)}-${local.slice(4, 8)}-${local.slice(8)}`;
    }
    return schoolIdentity.whatsapp || '0877-1355-1412';
  })();

  const schoolShortName = (schoolIdentity.nama || 'TK Islam Lukman Hakim Purwokerto').toUpperCase();

  const openWa = (topic: string) => {
    const msg = `Assalamu'alaikum Panitia SPMB ${schoolIdentity.nama}. Saya ingin mendapatkan informasi mengenai ${topic} Tahun Ajaran 2026/2027. Terima kasih.`;
    window.open(`https://wa.me/${waTarget}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const openFacilities = () => {
    if (onNavigate) {
      onNavigate('facilities', 'facilities-list');
    } else {
      document.getElementById('facilities-list')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const renderPosterById = (id: PosterId, inLightbox = false) => {
    switch (id) {
      case 'spmb-utama':
        return (
          <PosterSpmbUtama
            schoolShortName={schoolShortName}
            displayPhone={displayPhone}
            onOpenPpdb={onOpenPpdb}
            onOpenWa={() => openWa('Pendaftaran SPMB 2026/2027')}
            onZoom={!inLightbox ? () => setZoomedPoster('spmb-utama') : undefined}
          />
        );
      case 'spmb-trial':
        return (
          <PosterFreeTrial
            schoolShortName={schoolShortName}
            displayPhone={displayPhone}
            onOpenPpdb={onOpenPpdb}
            onOpenWa={() => openWa('Free Trial Class & Observasi Bakat')}
            onZoom={!inLightbox ? () => setZoomedPoster('spmb-trial') : undefined}
          />
        );
      case 'spmb-sentra':
        return (
          <PosterSentraTilawati
            schoolShortName={schoolShortName}
            displayPhone={displayPhone}
            onOpenPpdb={onOpenPpdb}
            onOpenFacilities={openFacilities}
            onOpenWa={() => openWa('Program 7 Sentra Ber-AC & Metode Tilawati')}
            onZoom={!inLightbox ? () => setZoomedPoster('spmb-sentra') : undefined}
          />
        );
      case 'spmb-daycare':
        return (
          <PosterDaycareBatita
            schoolShortName={schoolShortName}
            displayPhone={displayPhone}
            onOpenPpdb={onOpenPpdb}
            onOpenWa={() => openWa('Layanan Daycare & KB Batita Ceria')}
            onZoom={!inLightbox ? () => setZoomedPoster('spmb-daycare') : undefined}
          />
        );
    }
  };

  return (
    <section
      id="spmb-landscape-showcase"
      className="relative w-full bg-[#F8FAFC] py-12 sm:py-16 border-y border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#006699] tracking-wide">
              <span>Publikasi Resmi SPMB</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">Tahun Ajaran 2026/2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B253A] tracking-tight mt-1.5 [text-wrap:balance]">
              Poster Informasi Pendaftaran &amp; Program
            </h2>
          </div>

          {/* Crisp Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPage(idx)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    currentPage === idx
                      ? 'bg-[#006699] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {isMobile ? `0${idx + 1}` : idx === 0 ? 'SPMB Utama' : 'Sentra & Daycare'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Poster Sebelumnya"
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-[#006699] text-slate-700 hover:text-[#006699] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Poster Selanjutnya"
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-[#006699] text-slate-700 hover:text-[#006699] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Slider Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {isMobile ? (
              POSTER_META.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-0.5">
                  <div className="max-w-[520px] mx-auto">{renderPosterById(item.id)}</div>
                </div>
              ))
            ) : (
              <>
                <div className="w-full flex-shrink-0 grid grid-cols-2 gap-6 lg:gap-8 px-0.5 items-stretch">
                  {renderPosterById('spmb-utama')}
                  {renderPosterById('spmb-trial')}
                </div>
                <div className="w-full flex-shrink-0 grid grid-cols-2 gap-6 lg:gap-8 px-0.5 items-stretch">
                  {renderPosterById('spmb-sentra')}
                  {renderPosterById('spmb-daycare')}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subtle Footer Meta & Quick Action Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 tabular-nums">
              Halaman {currentPage + 1} dari {totalPages}
            </span>
            <span aria-hidden="true">·</span>
            <span>Klik tombol perbesar pada poster untuk melihat tampilan penuh</span>
          </div>
          <button
            type="button"
            onClick={onOpenPpdb}
            className="inline-flex items-center gap-1.5 font-bold text-[#006699] hover:text-[#004c73] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Buka Formulir SPMB Online</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen Poster Lightbox */}
      {zoomedPoster && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setZoomedPoster(null)}
        >
          <div
            className="relative w-full max-w-[560px] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedPoster(null)}
              aria-label="Tutup pratinjau poster"
              className="absolute -top-3 -right-3 z-30 w-10 h-10 rounded-full bg-white text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {renderPosterById(zoomedPoster, true)}
          </div>
        </div>
      )}
    </section>
  );
};

/* ============================================================================
 * POSTER 1: TELAH DIBUKA SPMB 2026/2027 (Gaya Poster Resmi Referensi 1)
 * ============================================================================ */
interface PosterCommonProps {
  schoolShortName: string;
  displayPhone: string;
  onOpenPpdb: () => void;
  onOpenWa: () => void;
  onZoom?: () => void;
}

const PosterSpmbUtama: React.FC<PosterCommonProps> = ({
  schoolShortName,
  displayPhone,
  onOpenPpdb,
  onOpenWa,
  onZoom,
}) => {
  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between min-h-[650px] sm:min-h-[700px] text-slate-900 select-none">
      {/* Zoom Trigger */}
      {onZoom && (
        <button
          type="button"
          onClick={onZoom}
          title="Perbesar Poster"
          aria-label="Perbesar Poster SPMB Utama"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-white/90 hover:bg-[#006699] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer shadow-xs"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}

      {/* Subtle Left Dot Matrix Pattern (Like Reference 1) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-36 w-20 h-28 pointer-events-none opacity-35"
        style={{
          backgroundImage: 'radial-gradient(#006699 1.6px, transparent 1.6px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Subtle Right Isometric Geometric Wireframe Accent (Like Reference 1) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 140 200"
        className="absolute right-0 top-16 w-28 h-44 pointer-events-none opacity-15 text-[#006699]"
        fill="none"
      >
        <polygon points="95,12 135,34 135,78 95,100 55,78 55,34" stroke="currentColor" strokeWidth="1.5" />
        <line x1="95" y1="12" x2="95" y2="56" stroke="currentColor" strokeWidth="1.2" />
        <line x1="95" y1="56" x2="135" y2="34" stroke="currentColor" strokeWidth="1.2" />
        <line x1="95" y1="56" x2="55" y2="34" stroke="currentColor" strokeWidth="1.2" />
        <polygon points="35,28 50,20 50,36" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="105,112 138,130 138,166 105,184 72,166 72,130" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="75,136 90,145 75,154" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* TOP INSTITUTIONAL BRAND BAR */}
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.png"
            alt="Logo Resmi TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-11 h-11 object-contain shrink-0"
          />
          <div className="leading-tight min-w-0">
            <p className="text-[11px] font-black text-[#0B3B5B] tracking-tight truncate">
              YAYASAN LUKMAN AL HAKIM
            </p>
            <p className="text-[10px] font-bold text-[#006699] truncate">
              TK Islam Lukman Hakim Purwokerto
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 pr-6 sm:pr-0">
          <p className="text-[10px] font-black text-[#006699] tracking-tight">AKREDITASI A</p>
          <p className="text-[9px] font-semibold text-slate-500">NPSN 69981337</p>
        </div>
      </div>

      {/* HERO SCULPTED TILTED DISPLAY HEADLINE */}
      <div className="relative z-10 px-5 pt-4 pb-3 text-center">
        <div className="-rotate-2 inline-flex flex-col items-center">
          <span
            className="text-lg sm:text-xl font-black tracking-wide text-[#006699] uppercase leading-none"
            style={stickerTextStyle(5)}
          >
            TELAH DIBUKA
          </span>
          <h3
            className="text-[3.75rem] sm:text-[4.5rem] font-black tracking-tight text-[#006699] leading-[0.95] mt-0.5"
            style={stickerTextStyle(11)}
          >
            SPMB
          </h3>
          <p className="mt-2 text-sm sm:text-base font-black text-[#0B3B5B] tracking-tight leading-tight uppercase">
            {schoolShortName}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#006699] leading-tight tabular-nums">
            2026/2027
          </p>
        </div>
      </div>

      {/* MAIN BORDERED CARD: JALUR PENDAFTARAN (Matches Reference 1 Center Frame) */}
      <div className="relative z-10 px-5 mt-3">
        <div className="relative bg-white border-2 border-[#006699] rounded-2xl pt-5 pb-4 px-4 shadow-xs">
          {/* Floating Top Center Tab */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#006699] text-white px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase whitespace-nowrap shadow-xs">
            JALUR PENDAFTARAN
          </div>

          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Left Side: Early Admission / Program Block */}
            <div className="col-span-6 flex flex-col justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#006699]" />
                </div>
                <div className="leading-none">
                  <p className="text-base sm:text-lg font-black text-[#0B3B5B] tracking-tight">
                    REGULER
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                    DAYCARE · KB · TK A · TK B
                  </p>
                </div>
              </div>

              <div className="-rotate-1 border border-[#006699] rounded-full px-2.5 py-1 text-center bg-sky-50/70">
                <span className="text-[9.5px] sm:text-[10px] font-extrabold text-[#006699] uppercase tracking-tight block">
                  GELOMBANG 1 &amp; 2 · USIA 1,5–6 TH
                </span>
              </div>
            </div>

            {/* Right Side: Bold Tilted CTA Block */}
            <div className="col-span-6 flex flex-col items-center">
              <button
                type="button"
                onClick={onOpenPpdb}
                className="w-full -rotate-2 hover:rotate-0 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl p-3 text-center shadow-md transition-transform duration-200 cursor-pointer"
              >
                <span className="block text-sm sm:text-base font-black leading-tight tracking-tight uppercase">
                  AYO DAFTAR
                  <br />
                  SEKARANG!
                </span>
                <span className="block text-[9px] font-bold text-amber-300 mt-1 leading-tight uppercase">
                  FREE TRIAL CLASS &amp; OBSERVASI BAKAT
                </span>
              </button>
              <p className="text-[10px] font-bold text-[#0B3B5B] mt-2 text-center">
                Info Lengkap:{' '}
                <span className="text-[#006699] font-extrabold">tklukmanhakim.sch.id</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SCHOOL BUILDING + OVERLAPPING JOIN US / HUBUNGI KAMI CARDS */}
      <div className="relative mt-4 pt-3 flex-1 flex flex-col justify-end">
        {/* School Facade Photo blended seamlessly from white at top */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={spmbBuildingFacade}
            alt="Gedung dan Playground TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/75 to-transparent h-[55%]" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#004c73]/80 to-transparent" />
        </div>

        {/* Dual Side-by-Side Official Info Boxes */}
        <div className="relative z-10 px-5 grid grid-cols-12 gap-2.5 items-stretch">
          {/* Left Box: JOIN US NOW + Real Scannable QR */}
          <button
            type="button"
            onClick={onOpenPpdb}
            className="col-span-5 bg-white/98 hover:bg-white border-2 border-[#006699] rounded-xl p-2.5 shadow-md flex flex-col justify-between text-left transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="leading-none">
                <span className="block text-[11px] sm:text-xs font-black text-[#006699] tracking-tight">
                  JOIN US
                </span>
                <span className="block text-[11px] sm:text-xs font-black text-[#0B3B5B] tracking-tight mt-0.5">
                  NOW !
                </span>
              </div>
              <img
                src="/assets/qr_website.png"
                alt="QR Code Pendaftaran SPMB TK Islam Lukman Hakim"
                referrerPolicy="no-referrer"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain border border-slate-200 rounded-md p-0.5 bg-white shrink-0"
              />
            </div>
            <span className="text-[8.5px] font-extrabold text-[#006699] mt-1.5 truncate block">
              tklukmanhakim.sch.id/#spmb
            </span>
          </button>

          {/* Right Box: Hubungi Kami */}
          <button
            type="button"
            onClick={onOpenWa}
            className="col-span-7 bg-white/98 hover:bg-white border-2 border-[#006699] rounded-xl p-2.5 shadow-md flex flex-col justify-center text-center transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            <p className="text-xs sm:text-sm font-black text-[#0B3B5B] leading-tight">
              Hubungi Kami :
            </p>
            <div className="mt-1.5 space-y-0.5">
              <p className="text-[10px] font-bold text-[#006699]">Panitia SPMB Resmi</p>
              <p className="text-xs sm:text-sm font-black text-slate-900 tabular-nums">
                ({displayPhone})
              </p>
              <p className="text-[9px] font-semibold text-slate-500 truncate">
                Jl. Hos Noto Suwiryo No. 5, Purwokerto
              </p>
            </div>
          </button>
        </div>

        {/* Tagline Ribbon Floating over School Building */}
        <div className="relative z-10 px-5 mt-14 mb-3 flex justify-center">
          <p className="bg-white/95 backdrop-blur-xs text-[#0B3B5B] text-[10.5px] sm:text-[11px] font-extrabold italic px-4 py-1.5 rounded-full shadow-sm border border-white text-center">
            “Bersekolah dengan Senang dan Senang di Sekolah”
          </p>
        </div>

        {/* SOLID BOTTOM CONTACT BAR (Matches Reference 1 Footer) */}
        <div className="relative z-10 bg-[#006699] text-white px-4 py-2.5 flex items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-1.5 font-semibold truncate">
            <Globe className="w-3.5 h-3.5 shrink-0 text-sky-200" />
            <span className="truncate">tklukmanhakim.sch.id</span>
          </div>

          <button
            type="button"
            onClick={onOpenPpdb}
            className="bg-white text-[#006699] hover:bg-amber-300 hover:text-slate-950 font-black px-3 py-1 rounded-lg text-[10px] whitespace-nowrap transition-colors shadow-xs cursor-pointer shrink-0"
          >
            Daftar Online
          </button>

          <button
            type="button"
            onClick={onOpenWa}
            className="hidden sm:flex items-center gap-1 font-semibold text-sky-100 hover:text-white whitespace-nowrap cursor-pointer shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>@tklukmanhakim</span>
          </button>
        </div>
      </div>
    </article>
  );
};

/* ============================================================================
 * POSTER 2: DIBUKA SPMB — FREE TRIAL CLASS & JALUR PENDAFTARAN (Referensi 2)
 * ============================================================================ */
const PosterFreeTrial: React.FC<PosterCommonProps> = ({
  schoolShortName,
  displayPhone,
  onOpenPpdb,
  onOpenWa,
  onZoom,
}) => {
  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between min-h-[650px] sm:min-h-[700px] text-slate-900 select-none">
      {onZoom && (
        <button
          type="button"
          onClick={onZoom}
          title="Perbesar Poster"
          aria-label="Perbesar Poster Free Trial Class"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-white/90 hover:bg-[#006699] text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer shadow-xs"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}

      {/* TOP BAR + GEOMETRIC BRAND MOSAIC CORNER (Matches Reference 2) */}
      <div className="relative z-10 px-5 pt-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.png"
            alt="Logo Resmi TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="leading-tight min-w-0">
            <p className="text-[11px] font-black text-[#0B3B5B] truncate">TK ISLAM LUKMAN HAKIM</p>
            <p className="text-[9.5px] font-bold text-[#006699] truncate">
              Purwokerto · Akreditasi A
            </p>
          </div>
        </div>

        {/* Geometric Corner Mosaic Accent */}
        <div className="flex flex-col items-end pr-6 sm:pr-0 shrink-0">
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="w-3.5 h-3.5 rounded-tl-full bg-[#006699]" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
            <span className="w-3.5 h-3.5 rounded-br-full bg-[#0B3B5B]" />
            <span className="w-3.5 h-3.5 rounded-tr-full bg-emerald-600" />
          </div>
          <span className="text-[9.5px] font-extrabold text-[#006699] mt-1 tracking-tight">
            #GenerasiQuraniCeria
          </span>
        </div>
      </div>

      {/* HERO STUDENT CUTOUT + FADED SCHOOL BACKDROP + OVERLAPPING STICKER TITLE */}
      <div className="relative px-4 pt-2 flex flex-col items-center">
        {/* Soft faded school architectural silhouette on side margins */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-6 bottom-6 overflow-hidden pointer-events-none"
        >
          <img
            src={spmbBuildingFacade}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-white" />
          {/* Pure white center halo so studio cutout students stay crisp and seamless */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 68% 82% at 50% 45%, #ffffff 55%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div>

        {/* Crisp Studio Portrait of Smiling TK Islam Students */}
        <div className="relative z-10 w-full max-w-[300px] sm:max-w-[325px] h-[205px] sm:h-[225px] overflow-hidden flex items-start justify-center">
          <img
            src={spmbStudentsCutout}
            alt="Santri Ceria TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* Sculpted Overlapping Title Block (Matches Reference 2) */}
        <div className="relative z-20 -mt-14 text-center flex flex-col items-center">
          <div className="-rotate-2 flex flex-col items-center">
            <span
              className="text-lg sm:text-xl font-black text-[#006699] tracking-wide uppercase leading-none"
              style={stickerTextStyle(5)}
            >
              DIBUKA
            </span>
            <h3
              className="text-[3.5rem] sm:text-[4.25rem] font-black text-[#006699] tracking-tight leading-[0.92]"
              style={stickerTextStyle(10)}
            >
              SPMB
            </h3>
            <p
              className="text-xs sm:text-sm font-extrabold text-[#0B3B5B] mt-1 leading-tight"
              style={stickerTextStyle(4)}
            >
              Sistem Penerimaan Murid Baru
            </p>
            <p className="text-[11px] sm:text-xs font-black text-[#006699] tracking-tight uppercase mt-0.5">
              {schoolShortName}
            </p>
          </div>
          <div className="-rotate-1 mt-1.5 bg-[#0B3B5B] text-white text-[10px] font-extrabold tracking-wider px-4 py-1 rounded-full shadow-xs uppercase tabular-nums">
            TAHUN AJARAN 2026–2027
          </div>
        </div>
      </div>

      {/* LOWER DUAL CARDS (Solid Highlight Left + Bordered Schedule & QR Right) */}
      <div className="relative z-10 px-4 sm:px-5 mt-5 grid grid-cols-12 gap-3 items-stretch">
        {/* Left Solid Deep-Ocean Card */}
        <div className="col-span-6 relative bg-gradient-to-b from-[#006699] to-[#08344f] text-white rounded-2xl pt-5 pb-3.5 px-3.5 shadow-sm flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#006699] border border-[#006699] px-3 py-0.5 rounded-full text-[9.5px] font-black whitespace-nowrap shadow-xs">
            Dapatkan Kesempatan
          </div>

          <div>
            <p className="text-base sm:text-lg font-black leading-tight tracking-tight">
              FREE TRIAL CLASS
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-amber-300 leading-tight mt-0.5">
              &amp; Observasi Bakat
            </p>
            <p className="text-[9.5px] font-bold text-sky-100 mt-2">Keunggulan Layanan:</p>
            <ul className="mt-1 space-y-1 text-[9.5px] text-white/95 leading-snug">
              <li className="flex items-start gap-1">
                <span className="text-amber-300 font-bold">•</span>
                <span>Rasio ideal 2 Ustadzah / kelas</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-amber-300 font-bold">•</span>
                <span>Tanpa tes calistung memaksa</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-amber-300 font-bold">•</span>
                <span>7 Sentra Ber-AC &amp; Tilawati</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onOpenWa}
            className="mt-2.5 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Jadwalkan Trial Gratis
          </button>
        </div>

        {/* Right Bordered White Card: Jalur Pendaftaran + QR */}
        <div className="col-span-6 relative bg-white border-2 border-[#006699] rounded-2xl pt-5 pb-3 px-3 flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#006699] border border-[#006699] px-3 py-0.5 rounded-full text-[9.5px] font-black whitespace-nowrap shadow-xs">
            Jalur Pendaftaran
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-[#006699] shrink-0 mt-0.5" />
              <div className="leading-tight">
                <p className="text-[11px] font-black text-[#0B3B5B]">Gelombang 1</p>
                <p className="text-[9.5px] text-slate-600">Daycare, KB, TK A &amp; TK B</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-[#006699] shrink-0 mt-0.5" />
              <div className="leading-tight">
                <p className="text-[11px] font-black text-[#0B3B5B]">Gelombang 2</p>
                <p className="text-[9.5px] text-slate-600">Kuota Terbatas T.A. 2026/2027</p>
              </div>
            </div>
          </div>

          {/* Inner Solid CTA Strip with QR Code (Matches Reference 2) */}
          <button
            type="button"
            onClick={onOpenPpdb}
            className="mt-3 w-full bg-[#006699] hover:bg-[#00527a] text-white rounded-xl p-2 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer"
          >
            <div className="leading-tight min-w-0">
              <span className="block text-[10.5px] sm:text-[11px] font-black tracking-tight">
                JOIN US NOW !
              </span>
              <span className="block text-[8.5px] text-sky-100 truncate mt-0.5">
                tklukmanhakim.sch.id
              </span>
            </div>
            <img
              src="/assets/qr_website.png"
              alt="QR Pendaftaran Online"
              referrerPolicy="no-referrer"
              className="w-10 h-10 bg-white p-0.5 rounded-md object-contain shrink-0"
            />
          </button>
        </div>
      </div>

      {/* ROUNDED BOTTOM CONTACT BAR (Matches Reference 2 Footer) */}
      <div className="relative z-10 px-4 sm:px-5 pt-3.5 pb-4">
        <div className="bg-[#006699] text-white rounded-xl px-3.5 py-2 flex items-center justify-between gap-2 text-[9.5px]">
          <button
            type="button"
            onClick={onOpenWa}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer min-w-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <div className="text-left leading-tight truncate">
              <span className="block text-[8px] text-sky-200">WhatsApp Panitia</span>
              <span className="font-extrabold tabular-nums">{displayPhone}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenPpdb}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer min-w-0"
          >
            <Globe className="w-3.5 h-3.5 text-sky-200 shrink-0" />
            <div className="text-left leading-tight truncate">
              <span className="block text-[8px] text-sky-200">Pendaftaran</span>
              <span className="font-extrabold">tklukmanhakim.sch.id</span>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <Instagram className="w-3.5 h-3.5 text-sky-200" />
            <span className="font-bold">@tklukmanhakim</span>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ============================================================================
 * POSTER 3: 7 SENTRA BER-AC & METODE TILAWATI (Slide 2 Left)
 * ============================================================================ */
interface PosterSentraProps extends PosterCommonProps {
  onOpenFacilities: () => void;
}

const PosterSentraTilawati: React.FC<PosterSentraProps> = ({
  schoolShortName,
  displayPhone,
  onOpenPpdb,
  onOpenFacilities,
  onOpenWa,
  onZoom,
}) => {
  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between min-h-[650px] sm:min-h-[700px] text-slate-900 select-none">
      {onZoom && (
        <button
          type="button"
          onClick={onZoom}
          title="Perbesar Poster"
          aria-label="Perbesar Poster 7 Sentra dan Tilawati"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-white/90 hover:bg-emerald-700 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer shadow-xs"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}

      {/* TOP BAR */}
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.png"
            alt="Logo Resmi TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="leading-tight min-w-0">
            <p className="text-[11px] font-black text-emerald-900 truncate">KURIKULUM UNGGULAN</p>
            <p className="text-[9.5px] font-bold text-emerald-700 truncate">{schoolShortName}</p>
          </div>
        </div>
        <span className="text-[9.5px] font-extrabold text-emerald-800 pr-6 sm:pr-0 shrink-0">
          #CintaQuranSejakDini
        </span>
      </div>

      {/* DUAL PHOTO COLLAGE + SCULPTED TITLE */}
      <div className="relative px-5 pt-4">
        <div className="grid grid-cols-12 gap-2.5">
          <div className="col-span-7 h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src={spmbSentraClassroom}
              alt="Pembelajaran Sentra Balok Montessori TK Islam Lukman Hakim"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-5 h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src="/assets/gallery/foto6-sholat-berjamaah.jpg"
              alt="Pembiasaan Sholat Berjamaah dan Tilawati PAUD"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sculpted Overlapping Title */}
        <div className="relative z-20 -mt-9 text-center flex flex-col items-center">
          <div className="-rotate-2 flex flex-col items-center">
            <span
              className="text-sm sm:text-base font-black text-emerald-700 uppercase tracking-wide leading-none"
              style={stickerTextStyle(5)}
            >
              KARAKTER QUR’ANI
            </span>
            <h3
              className="text-[2.4rem] sm:text-[2.85rem] font-black text-emerald-700 tracking-tight leading-none mt-0.5"
              style={stickerTextStyle(9)}
            >
              7 SENTRA BER-AC
            </h3>
          </div>
          <div className="mt-2 bg-emerald-800 text-white text-[10px] font-extrabold tracking-wider px-4 py-1 rounded-full uppercase">
            METODE TILAWATI PAUD &amp; KURIKULUM MERDEKA
          </div>
        </div>
      </div>

      {/* STRUCTURED INFO CARDS */}
      <div className="relative z-10 px-5 mt-4 grid grid-cols-12 gap-3 items-stretch">
        <div className="col-span-6 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white rounded-2xl p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-black uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pembiasaan Harian</span>
            </div>
            <p className="text-sm font-black mt-1 leading-snug">
              Belajar Bermain Penuh Makna &amp; Beradab
            </p>
            <ul className="mt-2 space-y-1.5 text-[10px] text-emerald-50">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Mengaji praktis &amp; ceria metode Tilawati</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Sholat Dhuha, hafalan doa &amp; surat pendek</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Ruang kelas ber-AC, aman &amp; higienis</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenFacilities}
            className="mt-3 w-full bg-white text-emerald-900 hover:bg-amber-300 font-black text-[10px] py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Lihat Fasilitas Sentra
          </button>
        </div>

        <div className="col-span-6 bg-white border-2 border-emerald-700 rounded-2xl p-3.5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-black text-emerald-900 uppercase tracking-tight">
              7 Sentra Pembelajaran
            </p>
            <div className="mt-2 grid grid-cols-1 gap-1 text-[10px] font-semibold text-slate-700">
              <span>01. Sentra Imtaq &amp; Ibadah</span>
              <span>02. Sentra Balok &amp; Konstruksi</span>
              <span>03. Sentra Bahan Alam &amp; Sains</span>
              <span>04. Sentra Seni &amp; Kreativitas</span>
              <span>05. Sentra Main Peran &amp; Persiapan</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPpdb}
            className="mt-3 w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl p-2 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer"
          >
            <div className="leading-tight min-w-0">
              <span className="block text-[10.5px] font-black">DAFTAR SPMB</span>
              <span className="block text-[8.5px] text-emerald-100 truncate">
                tklukmanhakim.sch.id
              </span>
            </div>
            <img
              src="/assets/qr_website.png"
              alt="QR Pendaftaran Online"
              referrerPolicy="no-referrer"
              className="w-9 h-9 bg-white p-0.5 rounded-md object-contain shrink-0"
            />
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 px-5 pt-3.5 pb-4">
        <div className="bg-emerald-800 text-white rounded-xl px-3.5 py-2 flex items-center justify-between gap-2 text-[9.5px]">
          <button
            type="button"
            onClick={onOpenWa}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-extrabold tabular-nums">{displayPhone}</span>
          </button>
          <span className="font-bold text-emerald-100 truncate">tklukmanhakim.sch.id</span>
        </div>
      </div>
    </article>
  );
};

/* ============================================================================
 * POSTER 4: DAYCARE & KB BATITA CERIA (Slide 2 Right)
 * ============================================================================ */
const PosterDaycareBatita: React.FC<PosterCommonProps> = ({
  schoolShortName,
  displayPhone,
  onOpenPpdb,
  onOpenWa,
  onZoom,
}) => {
  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col justify-between min-h-[650px] sm:min-h-[700px] text-slate-900 select-none">
      {onZoom && (
        <button
          type="button"
          onClick={onZoom}
          title="Perbesar Poster"
          aria-label="Perbesar Poster Daycare dan KB Batita"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-lg bg-white/90 hover:bg-amber-600 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer shadow-xs"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}

      {/* TOP BAR */}
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.png"
            alt="Logo Resmi TK Islam Lukman Hakim Purwokerto"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="leading-tight min-w-0">
            <p className="text-[11px] font-black text-[#0B3B5B] truncate">
              LAYANAN PENGASUHAN &amp; KB
            </p>
            <p className="text-[9.5px] font-bold text-amber-700 truncate">{schoolShortName}</p>
          </div>
        </div>
        <span className="text-[9.5px] font-extrabold text-amber-700 pr-6 sm:pr-0 shrink-0">
          #AmanNyamanHigienis
        </span>
      </div>

      {/* HERO PHOTO + SCULPTED TITLE */}
      <div className="relative px-5 pt-4">
        <div className="h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
          <img
            src="/assets/gallery/foto4-snack-area-bermain.jpg"
            alt="Area Makan Bergizi dan Bermain Daycare TK Islam Lukman Hakim"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
        </div>

        <div className="relative z-20 -mt-9 text-center flex flex-col items-center">
          <div className="-rotate-2 flex flex-col items-center">
            <span
              className="text-sm sm:text-base font-black text-[#0B3B5B] uppercase tracking-wide leading-none"
              style={stickerTextStyle(5)}
            >
              PENGASUHAN RAMAH ANAK
            </span>
            <h3
              className="text-[2.35rem] sm:text-[2.8rem] font-black text-amber-600 tracking-tight leading-none mt-0.5"
              style={stickerTextStyle(9)}
            >
              DAYCARE &amp; KB
            </h3>
          </div>
          <div className="mt-2 bg-[#0B3B5B] text-amber-300 text-[10px] font-extrabold tracking-wider px-4 py-1 rounded-full uppercase">
            BATITA CERIA · USIA 1,5 – 6 TAHUN
          </div>
        </div>
      </div>

      {/* DUAL STRUCTURED CARDS */}
      <div className="relative z-10 px-5 mt-4 grid grid-cols-12 gap-3 items-stretch">
        <div className="col-span-6 bg-gradient-to-b from-[#0B3B5B] to-[#062236] text-white rounded-2xl p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-black uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Penuh Kasih Sayang</span>
            </div>
            <p className="text-sm font-black mt-1 leading-snug">
              Tenang Bekerja, Ananda Terjaga &amp; Ceria
            </p>
            <ul className="mt-2 space-y-1.5 text-[10px] text-sky-100">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Menu makan siang &amp; snack sehat higienis</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Kamar istirahat ber-AC &amp; matras lembut</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Laporan digital harian makan &amp; aktivitas</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenWa}
            className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Konsultasi Paket Daycare
          </button>
        </div>

        <div className="col-span-6 bg-white border-2 border-amber-500 rounded-2xl p-3.5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-black text-[#0B3B5B] uppercase tracking-tight">
              Pilihan Program
            </p>
            <div className="mt-2 space-y-2 text-[10px] text-slate-700">
              <div className="border-b border-slate-100 pb-1.5">
                <p className="font-extrabold text-[#0B3B5B]">Full Day Care</p>
                <p className="text-slate-500">07.00 – 16.00 WIB · Makan &amp; Stimulasi</p>
              </div>
              <div className="border-b border-slate-100 pb-1.5">
                <p className="font-extrabold text-[#0B3B5B]">Half Day Care</p>
                <p className="text-slate-500">Fleksibel pendampingan pagi / siang</p>
              </div>
              <div>
                <p className="font-extrabold text-[#0B3B5B]">KB Batita (2–4 Th)</p>
                <p className="text-slate-500">Stimulasi motorik, sosial &amp; adab</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPpdb}
            className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl p-2 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer"
          >
            <div className="leading-tight min-w-0">
              <span className="block text-[10.5px] font-black">DAFTAR ONLINE</span>
              <span className="block text-[8.5px] text-amber-950/80 font-bold truncate">
                tklukmanhakim.sch.id
              </span>
            </div>
            <img
              src="/assets/qr_website.png"
              alt="QR Pendaftaran Online"
              referrerPolicy="no-referrer"
              className="w-9 h-9 bg-white p-0.5 rounded-md object-contain shrink-0"
            />
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 px-5 pt-3.5 pb-4">
        <div className="bg-[#0B3B5B] text-white rounded-xl px-3.5 py-2 flex items-center justify-between gap-2 text-[9.5px]">
          <button
            type="button"
            onClick={onOpenWa}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-extrabold tabular-nums">{displayPhone}</span>
          </button>
          <span className="font-bold text-sky-200 truncate">tklukmanhakim.sch.id</span>
        </div>
      </div>
    </article>
  );
};
