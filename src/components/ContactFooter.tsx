import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Heart,
  ShieldCheck,
  QrCode,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';

interface ContactFooterProps {
  currentPage?: PageTab;
  hidePreFooter?: boolean;
  onOpenPpdb: () => void;
  onOpenSpp: () => void;
  onOpenReport: () => void;
  onOpenChatbot?: () => void;
  onOpenAdmin: () => void;
  onOpenQr?: () => void;
  onScrollTo?: (sectionId: string) => void;
  onNavigate?: (page: PageTab) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  currentPage,
  hidePreFooter,
  onOpenPpdb,
  onOpenSpp,
  onOpenReport,
  onOpenAdmin,
  onOpenQr,
  onScrollTo,
  onNavigate,
}) => {
  const { schoolIdentity: SCHOOL_IDENTITY } = useApp();

  const handleNav = (page: PageTab) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onScrollTo) {
      onScrollTo(page);
    }
  };

  const shouldShowPreFooter = !hidePreFooter;

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#F9F8F6] select-none">
      {/* ==================== 1. SCENIC PRE-FOOTER BANNER (MATCHING REFERENCE SCREENSHOT IN WEBSITE COLORS) ==================== */}
      {shouldShowPreFooter && (
        <div className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 bg-gradient-to-b from-[#F9F8F6] via-[#F0F7FF] to-[#E0F2FE] overflow-hidden">
          {/* Decorative Outlined Clouds */}
          <svg
            viewBox="0 0 120 60"
            className="hidden md:block absolute top-14 right-[26%] w-28 h-14 text-sky-300/80 pointer-events-none"
            fill="none"
          >
            <path
              d="M25 45H95C103.284 45 110 38.2843 110 30C110 22.1895 104.022 15.7746 96.382 15.065C93.4573 6.86752 85.6339 1 76.5 1C65.3888 1 56.2981 9.57526 55.4323 20.4562C52.4534 18.8906 49.0667 18 45.5 18C34.7304 18 26 26.7304 26 37.5C26 38.011 26.0197 38.5175 26.0581 39.0186"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            viewBox="0 0 120 60"
            className="hidden sm:block absolute top-8 right-[6%] w-32 h-16 text-sky-300/90 pointer-events-none"
            fill="none"
          >
            <path
              d="M25 45H95C103.284 45 110 38.2843 110 30C110 22.1895 104.022 15.7746 96.382 15.065C93.4573 6.86752 85.6339 1 76.5 1C65.3888 1 56.2981 9.57526 55.4323 20.4562C52.4534 18.8906 49.0667 18 45.5 18C34.7304 18 26 26.7304 26 37.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Decorative Butterfly Accents */}
          <svg
            viewBox="0 0 40 40"
            className="hidden md:block absolute top-10 left-[35%] w-8 h-8 text-amber-400 -rotate-12 pointer-events-none"
            fill="currentColor"
          >
            <path d="M20 20 C12 8, 2 10, 6 20 C2 28, 12 30, 20 20 Z" fill="#38bdf8" />
            <path d="M20 20 C28 8, 38 10, 34 20 C38 28, 28 30, 20 20 Z" fill="#fbbf24" />
            <line x1="20" y1="13" x2="20" y2="27" stroke="#0F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Rolling Blue/Teal Hills in the Background */}
          <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none">
            <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M0,90 C320,20 620,140 960,70 C1180,25 1340,65 1440,90 L1440,160 L0,160 Z"
                fill="#0284c7"
                fillOpacity="0.22"
              />
              <path
                d="M0,115 C380,55 780,145 1140,80 C1300,50 1390,85 1440,105 L1440,160 L0,160 Z"
                fill="#006699"
                fillOpacity="0.45"
              />
            </svg>
          </div>

          {/* Right Side Playful Windmill Illustration (Consistent Website Palette) */}
          <div className="hidden lg:block absolute bottom-6 right-[7%] w-36 h-44 pointer-events-none z-10">
            <svg viewBox="0 0 140 170" className="w-full h-full">
              {/* Windmill Tower */}
              <polygon points="48,75 92,75 104,160 36,160" fill="#FDE68A" stroke="#0F2937" strokeWidth="2.5" />
              {/* Roof */}
              <polygon points="42,75 70,45 98,75" fill="#0284c7" stroke="#0F2937" strokeWidth="2.5" />
              {/* Door */}
              <path d="M60,160 L60,130 C60,122 80,122 80,130 L80,160 Z" fill="#0F2937" />
              {/* Window */}
              <circle cx="70" cy="98" r="8" fill="#ffffff" stroke="#0F2937" strokeWidth="2.5" />
              {/* Blades */}
              <g transform="translate(70, 58)">
                <polygon points="-4,-4 -42,-36 -30,-46 4,-4" fill="#ffffff" stroke="#0F2937" strokeWidth="2" />
                <polygon points="4,-4 42,-36 30,-46 -4,-4" fill="#38bdf8" stroke="#0F2937" strokeWidth="2" />
                <polygon points="4,4 42,36 30,46 -4,4" fill="#ffffff" stroke="#0F2937" strokeWidth="2" />
                <polygon points="-4,4 -42,36 -30,46 4,4" fill="#38bdf8" stroke="#0F2937" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#fbbf24" stroke="#0F2937" strokeWidth="2.5" />
              </g>
            </svg>
          </div>

          {/* Left Side Stacking Toys & Picket Fence Illustration */}
          <div className="hidden lg:block absolute bottom-4 left-[18%] w-40 h-24 pointer-events-none z-10">
            <svg viewBox="0 0 180 100" className="w-full h-full">
              {/* Fence */}
              {[10, 28, 46, 64].map((x, idx) => (
                <g key={idx}>
                  <rect x={x} y="48" width="11" height="44" rx="3" fill={idx % 2 === 0 ? '#38bdf8' : '#ffffff'} stroke="#0F2937" strokeWidth="2" />
                </g>
              ))}
              <rect x="6" y="60" width="74" height="6" rx="2" fill="#006699" />
              <rect x="6" y="76" width="74" height="6" rx="2" fill="#006699" />
              {/* Stacking Ring Toy */}
              <rect x="115" y="76" width="46" height="12" rx="6" fill="#0F2937" />
              <rect x="120" y="64" width="36" height="12" rx="6" fill="#0284c7" />
              <rect x="125" y="52" width="26" height="12" rx="6" fill="#38bdf8" />
              <rect x="130" y="40" width="16" height="12" rx="6" fill="#fbbf24" />
              <circle cx="138" cy="33" r="6" fill="#10b981" />
            </svg>
          </div>

          {/* Main Pre-Footer Container */}
          <div className="relative z-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Text & Button ("Happy Children, Bright Futures!") */}
              <div className="lg:col-span-5 text-center lg:text-left space-y-5">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0F2937] leading-[1.15]">
                    Happy Children,
                    <span className="block text-[#006699] mt-1">
                      Bright Futures!
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2.5 max-w-md mx-auto lg:mx-0">
                    Bersekolah dengan senang, dan senang di sekolah bersama keluarga besar {SCHOOL_IDENTITY.nama}.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <button
                    onClick={() => handleNav('facilities')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#006699] hover:bg-[#0F2937] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_24px_rgba(0,102,153,0.3)] transition cursor-pointer"
                  >
                    <span>Lihat Galeri & Fasilitas</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenPpdb}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white hover:bg-sky-50 text-[#0F2937] border border-sky-200 font-extrabold text-xs sm:text-sm shadow-2xs transition cursor-pointer"
                  >
                    <span>Daftar SPMB</span>
                  </button>

                  {onOpenQr && (
                    <button
                      onClick={onOpenQr}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs sm:text-sm shadow-2xs transition cursor-pointer"
                      title="Lihat & Unduh QR Code Resmi"
                    >
                      <QrCode className="w-4 h-4 text-amber-600" />
                      <span>Scan QR Web</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Center Circular Official Logo Emblem of TK Lukman Hakim Purwokerto */}
              <div className="lg:col-span-7 flex justify-center lg:justify-start lg:pl-8">
                <div className="relative w-64 h-64 sm:w-76 sm:h-76 rounded-full p-3.5 bg-gradient-to-tr from-[#006699] via-[#0284c7] to-[#38bdf8] shadow-[0_20px_50px_rgba(0,102,153,0.32)]">
                  {/* Decorative Floral / Leaf Badges on the Ring */}
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-300 border-4 border-white shadow-xs flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#006699]" />
                  </span>
                  <span className="absolute top-10 -left-2 w-6 h-6 rounded-full bg-white border-4 border-sky-300 shadow-xs" />
                  <span className="absolute top-12 -right-2 w-6 h-6 rounded-full bg-amber-300 border-4 border-white shadow-xs" />
                  <span className="absolute bottom-10 -left-2 w-6 h-6 rounded-full bg-emerald-300 border-4 border-white shadow-xs" />
                  <span className="absolute bottom-12 -right-2 w-6 h-6 rounded-full bg-white border-4 border-sky-300 shadow-xs" />

                  {/* Official Logo Container */}
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white flex flex-col items-center justify-center p-4 sm:p-5 shadow-inner select-none relative group">
                    {/* Concentric Golden Ring */}
                    <div className="absolute inset-2 rounded-full border border-amber-300/60 pointer-events-none" />
                    <div className="absolute inset-3 rounded-full border border-sky-200/60 pointer-events-none" />

                    {/* Official Logo Icon */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center drop-shadow-md p-1">
                      <img
                        src="/logo.png"
                        alt="Logo Resmi TK Lukman Hakim"
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('assets/logo.png')) {
                            target.src = '/assets/logo.png';
                          }
                        }}
                      />
                    </div>
                      <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                        <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-800">
                          NPSN {SCHOOL_IDENTITY.npsn} • TERAKREDITASI A
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* ==================== 2. SCALLOPED WAVE BORDER & CONSISTENT BLUE/NAVY FOOTER ==================== */}
      <div className="relative bg-gradient-to-b from-[#006699] to-[#0F2937] text-white pt-12 pb-12">
        {/* Scalloped Wave Top Edge (Matching Reference Image) */}
        <div className="absolute -top-5 left-0 right-0 h-6 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
            className="w-full h-full text-[#006699] fill-current"
          >
            <path d="M0,30 Q15,0 30,30 Q45,0 60,30 Q75,0 90,30 Q105,0 120,30 Q135,0 150,30 Q165,0 180,30 Q195,0 210,30 Q225,0 240,30 Q255,0 270,30 Q285,0 300,30 Q315,0 330,30 Q345,0 360,30 Q375,0 390,30 Q405,0 420,30 Q435,0 450,30 Q465,0 480,30 Q495,0 510,30 Q525,0 540,30 Q555,0 570,30 Q585,0 600,30 Q615,0 630,30 Q645,0 660,30 Q675,0 690,30 Q705,0 720,30 Q735,0 750,30 Q765,0 780,30 Q795,0 810,30 Q825,0 840,30 Q855,0 870,30 Q885,0 900,30 Q915,0 930,30 Q945,0 960,30 Q975,0 990,30 Q1005,0 1020,30 Q1035,0 1050,30 Q1065,0 1080,30 Q1095,0 1110,30 Q1125,0 1140,30 Q1155,0 1170,30 Q1185,0 1200,30 L1200,30 L0,30 Z" />
          </svg>
        </div>

        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/15">
            {/* Column 1 (4 Cols): Emblem Logo & Tagline */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                {/* Cheerful Emblem / Custom Logo */}
                <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                  <LukmanHakimLogo variant="emblem" size={42} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {SCHOOL_IDENTITY.nama}
                  </h3>
                  <p className="text-xs font-semibold text-sky-200 mt-0.5">
                    Where Little Minds Bloom • NPSN {SCHOOL_IDENTITY.npsn}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed max-w-sm">
                {SCHOOL_IDENTITY.yayasan}. Mendampingi tumbuh kembang fitrah anak dengan kasih sayang, karakter Al-Qur’an, dan kegembiraan bereksplorasi.
              </p>
            </div>

            {/* Column 2 (3 Cols): Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-base font-extrabold text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-sky-100">
                <li>
                  <button
                    onClick={() => handleNav('about')}
                    className="hover:text-amber-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>About Us (Profil Sekolah)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('schools')}
                    className="hover:text-amber-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>Programs (4 Jenjang Kelas)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('facilities')}
                    className="hover:text-amber-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>Gallery & Fasilitas</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('contact')}
                    className="hover:text-amber-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>Contact Us & Lokasi</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenPpdb}
                    className="hover:text-amber-300 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>Pendaftaran SPMB Online</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 (3 Cols): Contact Us */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-base font-extrabold text-white">Contact Us</h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-sky-100">
                <a
                  href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-amber-300 transition"
                >
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{SCHOOL_IDENTITY.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${SCHOOL_IDENTITY.email}`}
                  className="flex items-center gap-2.5 hover:text-amber-300 transition"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="truncate">{SCHOOL_IDENTITY.email}</span>
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-1" />
                  <span className="leading-snug">
                    {SCHOOL_IDENTITY.alamat}, Kel. {SCHOOL_IDENTITY.desaKelurahan},{' '}
                    {SCHOOL_IDENTITY.kecamatan}, {SCHOOL_IDENTITY.kabupaten}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4 (2 Cols): Follow Us */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-base font-extrabold text-white">Follow Us</h4>
              <div className="flex items-center gap-2.5">
                <a
                  href={SCHOOL_IDENTITY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] hover:scale-105 text-white flex items-center justify-center transition shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={SCHOOL_IDENTITY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 hover:scale-105 text-white flex items-center justify-center transition shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:scale-105 text-white flex items-center justify-center transition shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${SCHOOL_IDENTITY.mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#FF0000] hover:scale-105 text-white flex items-center justify-center transition shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReport}
                  className="text-xs font-bold text-sky-200 hover:text-white underline cursor-pointer"
                >
                  Lihat E-Raport Siswa →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 sm:pr-48 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/80">
            <p>
              © {new Date().getFullYear()} {SCHOOL_IDENTITY.nama} (NPSN {SCHOOL_IDENTITY.npsn}). All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenAdmin}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Panel Pengelola & Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
