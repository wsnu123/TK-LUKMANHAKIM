import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  BookOpen,
  UserCheck,
  MapPin,
  Phone,
  Instagram,
  CheckCircle2,
  Star,
  Sparkles,
  Users,
  Building2,
  BookOpenCheck,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { PageTab, WaAdminContact } from '../types';
import { useApp } from '../context/AppContext';
import { getCacheBustedUrl } from '../utils/cacheBuster';
import { SpmbPosterCarousel } from './SpmbPosterCarousel';
import { SchoolActivityGallery } from './SchoolActivityGallery';
import heroGoldenCampus from '../assets/images/hero_campus_golden_1795672459358.jpg';
import montessoriPhoto from '../assets/images/editorial_sentra_montessori_1795672459355.jpg';
import tahfidzPhoto from '../assets/images/editorial_tahfidz_garden_1795672461872.jpg';
import artPhoto from '../assets/images/editorial_art_exploration_1795672463487.jpg';

interface MobileHomeProMaxProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
  onNavigate: (page: PageTab, section?: string) => void;
}

const EIGHT_BASES = [
  {
    num: 1,
    title: 'Anak = Unik',
    desc: 'Setiap individu anak adalah unik dengan potensi dan cara berkembang masing-masing untuk menjadi dirinya sendiri.',
  },
  {
    num: 2,
    title: 'Prestasi',
    desc: 'Penghargaan tulus pada setiap usaha, keberanian mencoba, dan capaian perkembangan setiap anak.',
  },
  {
    num: 3,
    title: 'Living Values',
    desc: 'Pendidikan berbasis nilai kehidupan nyata: keimanan, kasih sayang, rasa syukur, dan kedamaian hati.',
  },
  {
    num: 4,
    title: 'Lugas',
    desc: 'Orientasi pada kelugasan berpikir, kejujuran berekspresi santun, dan keberanian bertindak.',
  },
  {
    num: 5,
    title: 'Proses',
    desc: 'Pembelajaran adalah proses eksplorasi yang terbuka, partisipatif, dan menggembirakan bagi anak.',
  },
  {
    num: 6,
    title: 'Toleransi',
    desc: 'Penghargaan dan toleransi pada perbedaan, saling menolong, serta melatih empati sosial sejak dini.',
  },
  {
    num: 7,
    title: 'Praktek OASE',
    desc: 'Olah Agama, Seni, dan Raga dipraktikkan langsung secara nyata dan menyenangkan setiap hari.',
  },
  {
    num: 8,
    title: 'Disiplin Positif',
    desc: 'Ditanamkan dari kebiasaan sehari-hari di sekolah dengan keteladanan dan kasih sayang tanpa paksaan.',
  },
];

export const MobileHomeProMax: React.FC<MobileHomeProMaxProps> = ({
  onOpenPpdb,
  onNavigate,
}) => {
  const {
    heroSlides,
    schoolIdentity,
    philosophyCards,
    pillarsData,
    waContacts,
    testimonials,
    appearanceConfig,
    customFeatures,
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'keunggulan' | 'pilar' | 'basis'>('keunggulan');
  const [activeBasis, setActiveBasis] = useState<number>(1);
  const [activeTesti, setActiveTesti] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const safeSlideIndex = currentSlide >= heroSlides.length ? 0 : currentSlide;
  const slide = heroSlides[safeSlideIndex] || heroSlides[0];
  const activeCustomFeatures = (customFeatures || []).filter((f) => f.isActive);
  const announcement = appearanceConfig.announcementBar;

  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || heroSlides.length <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 36) {
      setCurrentSlide((prev) =>
        diff > 0
          ? prev >= heroSlides.length - 1
            ? 0
            : prev + 1
          : prev === 0
            ? heroSlides.length - 1
            : prev - 1
      );
    }
    touchStartX.current = null;
  };

  const waDigits = (schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '').replace(/^0/, '62');

  const handleOpenWaBooking = () => {
    const text = encodeURIComponent(
      `Assalamu’alaikum Admin ${schoolIdentity.nama}. Saya ingin berkonsultasi & menjadwalkan Kunjungan Sekolah / Trial Class Gratis untuk Ananda. Mohon informasi jadwal yang tersedia.`
    );
    window.open(`https://wa.me/${waDigits}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenAdminWa = (admin: WaAdminContact) => {
    const digits = admin.phone.replace(/\D/g, '');
    const phone = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
    const text = encodeURIComponent(
      `Assalamu’alaikum Warahmatullahi Wabarakatuh ${admin.name} (${admin.unit} ${schoolIdentity.nama}). Saya ingin berkonsultasi mengenai informasi ${admin.role}. Mohon dibantu ya Ustadzah. Terima kasih.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleAnnouncementClick = () => {
    if (!announcement) return;
    if (announcement.linkAction === 'ppdb') onOpenPpdb();
    else if (announcement.linkAction === 'schools') onNavigate('schools');
    else if (announcement.linkAction === 'contact') onNavigate('contact');
    else if (announcement.linkAction === 'wa') {
      window.open(`https://wa.me/${waDigits}`, '_blank');
    }
  };

  const editorialStories = [
    {
      num: '01',
      tag: 'Disiplin Positif · Ber-AC',
      title: 'Sentra Montessori Ramah Anak',
      desc: '7 ruang sentra ber-AC, rasio guru ideal, dan pendampingan penuh kasih tanpa bentakan.',
      proof: 'Standar Sekolah Ramah Anak',
      image: montessoriPhoto,
    },
    {
      num: '02',
      tag: 'Tahfidz Tilawati · Adab',
      title: 'Tahfidz Cilik & Ibadah Harian',
      desc: 'Hafalan Juz 30, doa harian, dan adab Islami dibimbing ceria tanpa tekanan.',
      proof: 'Metode Tilawati PAUD',
      image: tahfidzPhoto,
    },
    {
      num: '03',
      tag: 'Seni, Alam & Gizi Sehat',
      title: 'Eksplorasi Kreativitas & E-Raport',
      desc: 'Melukis, berkebun, makan bergizi tanpa MSG, serta laporan tumbuh kembang real-time.',
      proof: 'Pantauan Transparan Wali',
      image: artPhoto,
    },
  ];

  const exploreItems: {
    id: PageTab;
    title: string;
    sub: string;
    image: string;
  }[] = [
    {
      id: 'about',
      title: 'Profil & Kepsek',
      sub: '25+ Tahun · Visi Misi',
      image: heroGoldenCampus,
    },
    {
      id: 'schools',
      title: '4 Jenjang Kelas',
      sub: 'Daycare · KB · TK A · B',
      image: montessoriPhoto,
    },
    {
      id: 'facilities',
      title: 'Fasilitas & 360°',
      sub: '7 Sentra · Playground',
      image: tahfidzPhoto,
    },
    {
      id: 'contact',
      title: 'Kontak & Lokasi',
      sub: 'Teluk Purwokerto Selatan',
      image: artPhoto,
    },
  ];

  const keunggulanIcons = [Sparkles, Users, Building2, BookOpenCheck];
  const selectedBasis = EIGHT_BASES.find((b) => b.num === activeBasis) || EIGHT_BASES[0];
  const safeTestiIndex = activeTesti >= testimonials.length ? 0 : activeTesti;
  const currentTesti = testimonials[safeTestiIndex] || testimonials[0];

  return (
    <div className="lg:hidden bg-[#F6F9FC] text-[#092338] pt-[56px] pb-6 space-y-5">
      {/* Optional Announcement Ribbon */}
      {announcement?.enabled && announcement.text && (
        <div
          className="mx-3.5 mt-2 rounded-2xl px-3.5 py-2.5 text-white text-[11px] font-bold flex items-center justify-between gap-2 shadow-xs"
          style={{ backgroundColor: announcement.bgColor || '#006699' }}
        >
          <span className="leading-snug flex-1">{announcement.text}</span>
          {announcement.linkText && (
            <button
              type="button"
              onClick={handleAnnouncementClick}
              className="px-2.5 py-1 rounded-full bg-white text-[#092338] text-[10px] font-extrabold shrink-0 cursor-pointer"
            >
              {announcement.linkText}
            </button>
          )}
        </div>
      )}

      {/* ==================== 1. FRAMED STORY HERO CARD ==================== */}
      {appearanceConfig.showHeroBanner && slide && (
        <section className="px-3.5 pt-2">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[390px] rounded-[26px] overflow-hidden bg-[#061826] shadow-[0_18px_42px_-16px_rgba(9,35,56,0.45)] border border-white/60 select-none"
          >
            {/* Background Image Crossfade */}
            {heroSlides.map((s, idx) => {
              const isActive = idx === safeSlideIndex;
              const imgSrc = failedSlides[idx] ? heroGoldenCampus : getCacheBustedUrl(s.image);
              return (
                <img
                  key={s.id || idx}
                  src={imgSrc}
                  alt={s.title}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedSlides((prev) => ({ ...prev, [idx]: true }))}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              );
            })}

            {/* Rich Warm-Navy Atmospheric Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/95 via-[#061826]/45 to-[#061826]/25" />

            {/* Top Story Progress Bars & Unboxed Location Tag */}
            <div className="absolute top-3 inset-x-3.5 z-20 space-y-2.5">
              <div className="flex items-center gap-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden cursor-pointer"
                    aria-label={`Slide ${idx + 1}`}
                  >
                    {idx < safeSlideIndex && <span className="block w-full h-full bg-white/90" />}
                    {idx === safeSlideIndex && (
                      <span
                        key={`mprog-${safeSlideIndex}`}
                        className="block w-full h-full bg-amber-300 animate-mobile-story"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.12em] uppercase text-white/90">
                <span className="bg-[#061826]/55 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                  Akreditasi A · NPSN {schoolIdentity.npsn}
                </span>
                <span className="font-display tabular-nums text-white/80">
                  0{safeSlideIndex + 1}/0{heroSlides.length}
                </span>
              </div>
            </div>

            {/* Bottom Content Inside Story Frame */}
            <div className="absolute bottom-0 inset-x-0 p-4 z-20 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-300">
                {slide.welcome}
              </p>
              <h1 className="font-display text-[1.42rem] font-extrabold text-white leading-[1.12] tracking-tight [text-wrap:balance]">
                {slide.title}
              </h1>
              <p className="font-serif italic text-xs text-sky-100/95 leading-snug line-clamp-2">
                {slide.subtitle}
              </p>

              {/* Crisp Single-Row Action Bar */}
              <div className="pt-1.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenPpdb}
                  className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#092338] font-extrabold text-xs shadow-lg cursor-pointer whitespace-nowrap"
                >
                  <span>Daftar SPMB</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('schools')}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold text-xs cursor-pointer whitespace-nowrap"
                >
                  <span>4 Jenjang</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 2. NATIVE APP QUICK DOCK (4 BENTO TILES) ==================== */}
      <section aria-label="Pintasan Cepat Mobile" className="px-3.5">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={onOpenPpdb}
            className="bg-white rounded-2xl py-2.5 px-1.5 border border-slate-200/80 shadow-[0_8px_20px_-12px_rgba(9,35,56,0.16)] flex flex-col items-center justify-center gap-1.5 cursor-pointer min-h-[70px]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#092338] text-amber-300 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#092338] leading-none">SPMB</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('schools')}
            className="bg-white rounded-2xl py-2.5 px-1.5 border border-slate-200/80 shadow-[0_8px_20px_-12px_rgba(9,35,56,0.16)] flex flex-col items-center justify-center gap-1.5 cursor-pointer min-h-[70px]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#006699] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#092338] leading-none">Jenjang</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about', 'profil-kepala-sekolah')}
            className="bg-white rounded-2xl py-2.5 px-1.5 border border-slate-200/80 shadow-[0_8px_20px_-12px_rgba(9,35,56,0.16)] flex flex-col items-center justify-center gap-1.5 cursor-pointer min-h-[70px]"
          >
            <span className="w-9 h-9 rounded-xl bg-amber-400 text-[#092338] flex items-center justify-center shadow-xs">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#092338] leading-none">Kepsek</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="bg-white rounded-2xl py-2.5 px-1.5 border border-slate-200/80 shadow-[0_8px_20px_-12px_rgba(9,35,56,0.16)] flex flex-col items-center justify-center gap-1.5 cursor-pointer min-h-[70px]"
          >
            <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#092338] leading-none">Lokasi</span>
          </button>
        </div>
      </section>

      {/* ==================== 3. DEEP ROYAL NAVY IDENTITY & PROOF CARD ==================== */}
      {(appearanceConfig.showBalokStrip || appearanceConfig.showIdentityCard) && (
        <section className="px-3.5">
          <div className="rounded-[24px] bg-[#092338] text-white p-4 shadow-[0_18px_38px_-18px_rgba(9,35,56,0.5)] border border-white/10 mobile-hairline-grid space-y-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-amber-300">
                  Identitas Resmi · {schoolIdentity.statusSekolah}
                </p>
                <h2 className="font-display text-base font-extrabold text-white leading-snug mt-0.5">
                  {schoolIdentity.nama}
                </h2>
                <p className="text-[11px] text-sky-100/80 mt-0.5 leading-snug">
                  {schoolIdentity.alamat}, {schoolIdentity.kecamatan}
                </p>
              </div>
            </div>

            {/* 3-Col Tabular Metrics Bar */}
            <div className="grid grid-cols-3 divide-x divide-white/12 bg-white/[0.06] rounded-2xl py-2.5 border border-white/10 text-center">
              <div className="px-1">
                <span className="font-display text-sm font-extrabold text-amber-300 block leading-none">
                  Grade A
                </span>
                <span className="text-[9.5px] text-sky-100/75 font-semibold block mt-1">
                  Akreditasi
                </span>
              </div>
              <div className="px-1">
                <span className="font-display text-sm font-extrabold text-white block leading-none tabular-nums">
                  25+ Thn
                </span>
                <span className="text-[9.5px] text-sky-100/75 font-semibold block mt-1">
                  Pengabdian
                </span>
              </div>
              <div className="px-1">
                <span className="font-display text-sm font-extrabold text-emerald-300 block leading-none tabular-nums">
                  3.200+
                </span>
                <span className="text-[9.5px] text-sky-100/75 font-semibold block mt-1">
                  Alumni Santri
                </span>
              </div>
            </div>

            {/* 3 Quick Connect Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`https://wa.me/${waDigits}?text=Assalamu%E2%80%99alaikum%20Admin%20${encodeURIComponent(schoolIdentity.nama)}%2C%20saya%20ingin%20konsultasi%20informasi%20sekolah.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] font-bold"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${schoolIdentity.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/10 border border-white/15 text-white text-[10.5px] font-bold"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>Maps</span>
              </a>
              <a
                href={schoolIdentity.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/10 border border-white/15 text-white text-[10.5px] font-bold"
              >
                <Instagram className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 4. SWIPEABLE EDITORIAL PHOTO STORIES ==================== */}
      {appearanceConfig.showTrustConversion && (
        <section className="space-y-3">
          <div className="px-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006699]">
                Suasana Belajar Ananda
              </p>
              <h2 className="font-display text-lg font-extrabold text-[#092338] leading-tight mt-0.5">
                Ramah Anak &amp; Berakhlak
              </h2>
            </div>
            <span className="text-[10.5px] font-bold text-slate-400">Geser →</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-3.5 pb-1 no-scrollbar">
            {editorialStories.map((item) => (
              <article
                key={item.num}
                className="w-[258px] shrink-0 snap-start bg-white rounded-[22px] border border-slate-200/80 overflow-hidden shadow-[0_12px_28px_-16px_rgba(9,35,56,0.15)] flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092338]/50 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 font-display text-[11px] font-extrabold text-amber-300 bg-[#092338]/80 backdrop-blur-md px-2 py-0.5 rounded-lg">
                    {item.num}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                  <div>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#006699]">
                      {item.tag}
                    </p>
                    <h3 className="font-display text-sm font-extrabold text-[#092338] leading-snug mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10.5px] font-bold text-[#092338]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.proof}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 5. OFFICIAL SPMB POSTER CAROUSEL ==================== */}
      {(appearanceConfig.showPosterCarousel ?? true) && (
        <div className="bg-white border-y border-slate-200/70">
          <SpmbPosterCarousel onOpenPpdb={onOpenPpdb} onNavigate={onNavigate} />
        </div>
      )}

      {/* ==================== 6. APP-STYLE SEGMENTED EXPLORER (KEUNGGULAN | 5 PILAR | 8 BASIS) ==================== */}
      {(appearanceConfig.showPhilosophySection || appearanceConfig.showCharacterWheel) && (
        <section className="px-3.5 space-y-3.5">
          <div className="flex items-end justify-between gap-2 px-0.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006699]">
                Kurikulum &amp; Karakter
              </p>
              <h2 className="font-display text-lg font-extrabold text-[#092338] leading-tight mt-0.5">
                Fondasi Pendidikan Kami
              </h2>
            </div>
          </div>

          {/* Sleek iOS-style Segmented Tab Bar */}
          <div className="grid grid-cols-3 p-1 bg-slate-200/75 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('keunggulan')}
              className={`py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === 'keunggulan'
                  ? 'bg-white text-[#092338] shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              4 Keunggulan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pilar')}
              className={`py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === 'pilar'
                  ? 'bg-white text-[#092338] shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              5 Pilar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('basis')}
              className={`py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                activeTab === 'basis'
                  ? 'bg-white text-[#092338] shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              8 Basis
            </button>
          </div>

          {/* Tab Panel 1: 4 Keunggulan */}
          {activeTab === 'keunggulan' && (
            <div className="grid grid-cols-2 gap-2.5">
              {philosophyCards.map((card, idx) => {
                const Icon = keunggulanIcons[idx % keunggulanIcons.length];
                const isDark = idx === 1;
                return (
                  <div
                    key={card.id || idx}
                    className={`rounded-2xl p-3.5 border flex flex-col justify-between gap-2 ${
                      isDark
                        ? 'bg-[#092338] text-white border-white/10 shadow-md'
                        : 'bg-white text-[#092338] border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isDark
                            ? 'bg-amber-400/15 text-amber-300'
                            : 'bg-sky-50 text-[#006699]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`font-display text-[11px] font-extrabold ${
                          isDark ? 'text-amber-300/80' : 'text-slate-300'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-extrabold leading-snug">
                        {card.title}
                      </h3>
                      <p
                        className={`text-[10.5px] leading-snug mt-1 ${
                          isDark ? 'text-sky-100/80' : 'text-slate-600'
                        }`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab Panel 2: 5 Pilar */}
          {activeTab === 'pilar' && (
            <div className="space-y-2.5">
              {pillarsData.map((pillar, idx) => (
                <div
                  key={pillar.id || idx}
                  className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex items-center gap-3"
                >
                  <img
                    src={getCacheBustedUrl(pillar.image)}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#006699] block">
                      0{idx + 1} · {pillar.badgeText}
                    </span>
                    <h3 className="font-display text-xs font-extrabold text-[#092338] leading-snug mt-0.5">
                      {pillar.title}
                    </h3>
                    <p className="text-[10.5px] text-slate-600 leading-snug mt-0.5 line-clamp-2">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Panel 3: Interactive 8 Basis */}
          {activeTab === 'basis' && (
            <div className="rounded-[22px] bg-[#092338] text-white p-4 space-y-3.5 shadow-lg mobile-hairline-grid border border-white/10">
              <div className="grid grid-cols-4 gap-1.5">
                {EIGHT_BASES.map((b) => {
                  const active = b.num === activeBasis;
                  return (
                    <button
                      key={b.num}
                      type="button"
                      onClick={() => setActiveBasis(b.num)}
                      className={`py-2 px-1.5 rounded-xl text-[10px] font-bold transition cursor-pointer truncate border ${
                        active
                          ? 'bg-amber-400 text-[#092338] border-amber-300'
                          : 'bg-white/[0.06] text-sky-100/85 border-white/10'
                      }`}
                    >
                      {b.num}. {b.title}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white/[0.07] rounded-2xl p-3.5 border border-white/15 space-y-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-300">
                  Basis #{selectedBasis.num} · {selectedBasis.title}
                </p>
                <p className="font-serif italic text-xs text-white leading-relaxed">
                  &ldquo;{selectedBasis.desc}&rdquo;
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ==================== 7. SCHOOL TOUR & TRIAL CLASS CARD ==================== */}
      {appearanceConfig.showTrustConversion && (
        <section className="px-3.5">
          <div className="relative rounded-[24px] overflow-hidden bg-[#092338] text-white p-4 shadow-lg border border-white/10">
            <img
              src={heroGoldenCampus}
              alt="Kampus TK Lukman Hakim Purwokerto"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10 space-y-2.5">
              <p className="text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-amber-300">
                Trial Class &amp; School Tour Gratis
              </p>
              <h3 className="font-display text-base font-extrabold leading-snug">
                Ajak Ananda Merasakan Langsung Belajar dengan Senang
              </h3>
              <p className="text-[11px] text-sky-100/85 leading-relaxed">
                Kunjungi langsung ruang sentra ber-AC, playground alami, dan konsultasi santai bersama Kepala Sekolah.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleOpenWaBooking}
                  className="min-h-[40px] rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Jadwal Tour</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenPpdb}
                  className="min-h-[40px] rounded-full bg-amber-400 text-[#092338] font-extrabold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Daftar SPMB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 8. OPTIONAL CUSTOM FEATURES ==================== */}
      {activeCustomFeatures.length > 0 && (
        <section className="px-3.5 space-y-2.5">
          <h2 className="font-display text-base font-extrabold text-[#092338] px-0.5">
            Inovasi Layanan Sekolah
          </h2>
          <div className="space-y-2.5">
            {activeCustomFeatures.map((feat) => (
              <div
                key={feat.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#006699]">
                  {feat.category}
                  {feat.badge ? ` · ${feat.badge}` : ''}
                </p>
                <h3 className="font-display text-sm font-extrabold text-[#092338] mt-0.5">
                  {feat.title}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 9. JELAJAHI SEKOLAH (2x2 MINI PHOTO GRID) ==================== */}
      {appearanceConfig.showDirectoryHub && (
        <section className="px-3.5 space-y-2.5">
          <div className="px-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006699]">
              Direktori Halaman
            </p>
            <h2 className="font-display text-lg font-extrabold text-[#092338] leading-tight mt-0.5">
              Jelajahi {schoolIdentity.nama}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {exploreItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group relative h-[126px] rounded-2xl overflow-hidden text-left shadow-sm border border-slate-200/70 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-active:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/92 via-[#061826]/35 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-2.5 text-white">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-display text-xs font-extrabold leading-tight">
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  </div>
                  <span className="text-[9.5px] text-sky-200/90 font-medium block mt-0.5 truncate">
                    {item.sub}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Optional Activity Gallery */}
      {appearanceConfig.showActivityGallery && <SchoolActivityGallery />}

      {/* ==================== 10. NARAHUBUNG WA RESMI (COMPACT 2-COL) ==================== */}
      {appearanceConfig.showWaHotline && (
        <section className="px-3.5 space-y-2.5">
          <div className="px-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006699] flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>Layanan Wali Murid</span>
            </p>
            <h2 className="font-display text-lg font-extrabold text-[#092338] leading-tight mt-0.5">
              Narahubung WhatsApp Resmi
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {waContacts.map((admin, idx) => (
              <button
                key={admin.id || idx}
                type="button"
                onClick={() => handleOpenAdminWa(admin)}
                className="bg-white rounded-2xl p-3 border border-slate-200/85 text-left shadow-2xs flex flex-col justify-between gap-2 cursor-pointer active:scale-95 transition"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#006699] block truncate">
                    {admin.unit}
                  </span>
                  <span className="font-display text-xs font-extrabold text-[#092338] block mt-0.5 leading-snug">
                    {admin.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-2 leading-snug">
                    {admin.role}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Chat WhatsApp →</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 11. SUARA ORANG TUA (EDITORIAL QUOTE CARD) ==================== */}
      {appearanceConfig.showTestimonials && currentTesti && (
        <section className="px-3.5 space-y-2.5">
          <div className="px-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#006699]">
              Suara Ayah &amp; Bunda
            </p>
            <h2 className="font-display text-lg font-extrabold text-[#092338] leading-tight mt-0.5">
              Testimoni Wali Murid
            </h2>
          </div>

          <div className="bg-white rounded-[22px] p-4 border border-slate-200/85 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Terverifikasi</span>
              </span>
            </div>

            <blockquote className="font-serif italic text-xs text-[#092338] leading-relaxed">
              &ldquo;{currentTesti.quote}&rdquo;
            </blockquote>

            <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2.5">
              <img
                src={currentTesti.photo}
                alt={currentTesti.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-sky-100 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-xs font-extrabold text-[#092338] truncate">
                  {currentTesti.name}
                </p>
                <p className="text-[10px] text-[#006699] font-semibold truncate">
                  {currentTesti.role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 no-scrollbar pb-0.5">
            {testimonials.map((t, idx) => {
              const active = idx === safeTestiIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTesti(idx)}
                  className={`shrink-0 px-3 py-2 rounded-full text-[10.5px] font-bold transition cursor-pointer flex items-center gap-2 border ${
                    active
                      ? 'bg-[#092338] text-white border-[#092338]'
                      : 'bg-white text-[#092338] border-slate-200'
                  }`}
                >
                  <img
                    src={t.photo}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
