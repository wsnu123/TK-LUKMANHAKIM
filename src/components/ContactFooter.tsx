import React, { useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
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
  hidePreFooter,
  onOpenPpdb,
  onOpenReport,
  onOpenAdmin,
  onOpenQr,
  onScrollTo,
  onNavigate,
}) => {
  const { schoolIdentity: SCHOOL_IDENTITY } = useApp();
  const tapCountRef = useRef(0);
  const lastTapAtRef = useRef(0);

  // Akses tersembunyi untuk Pengelola: klik teks hak cipta 5x berturut-turut
  const handleSecretCopyrightTap = () => {
    const now = Date.now();
    if (now - lastTapAtRef.current > 2000) {
      tapCountRef.current = 1;
    } else {
      tapCountRef.current += 1;
    }
    lastTapAtRef.current = now;
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      onOpenAdmin();
    }
  };

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
    <footer id="contact" className="relative overflow-hidden bg-[#FAFBFD] select-none">
      {/* ==================== 1. SERENE ARCHITECTURAL PRE-FOOTER ==================== */}
      {shouldShowPreFooter && (
        <div className="relative py-10 sm:py-20 bg-gradient-to-b from-[#FAFBFD] to-[#EEF6FC] border-t border-slate-200/70 overflow-hidden">
          <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 shadow-[0_20px_50px_-26px_rgba(9,35,56,0.16)] p-6 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
                {/* Left Editorial Callout */}
                <div className="lg:col-span-7 text-center lg:text-left space-y-3 sm:space-y-5">
                  <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                    Penerimaan Murid Baru 2026/2027
                  </p>
                  <h2 className="font-display text-2xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-[#092338] leading-[1.08] [text-wrap:balance]">
                    Happy Children,{' '}
                    <span className="text-[#006699] block sm:inline">Bright Futures!</span>
                  </h2>
                  <p className="font-serif italic text-xs sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0">
                    Bersekolah dengan senang, dan senang di sekolah bersama keluarga besar {SCHOOL_IDENTITY.nama}.
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={onOpenPpdb}
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#092338] hover:bg-[#006699] text-white font-extrabold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                    >
                      <span>Daftar SPMB Online</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNav('facilities')}
                      className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#F2F7FB] hover:bg-sky-100 text-[#092338] border border-sky-200/80 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <span>Galeri &amp; Fasilitas</span>
                    </button>

                    {onOpenQr && (
                      <button
                        type="button"
                        onClick={onOpenQr}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-3.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                        title="Lihat & Unduh QR Code Resmi"
                      >
                        <QrCode className="w-4 h-4 text-amber-600" />
                        <span>QR Web</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Official Emblem Medallion */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full p-2.5 sm:p-3.5 bg-gradient-to-tr from-[#092338] via-[#006699] to-sky-400 shadow-[0_20px_45px_-16px_rgba(9,35,56,0.3)]">
                    <div className="w-full h-full rounded-full bg-white border-4 border-white flex flex-col items-center justify-center p-3 sm:p-5 relative group">
                      <div className="absolute inset-2 rounded-full border border-amber-300/60 pointer-events-none" />
                      <LukmanHakimLogo
                        variant="emblem"
                        size={104}
                        className="w-16 h-16 sm:w-24 sm:h-24 border-0 shadow-none transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="mt-1 text-[8px] sm:text-[10px] font-extrabold text-[#006699] uppercase tracking-[0.14em] whitespace-nowrap">
                        NPSN {SCHOOL_IDENTITY.npsn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. QUIET DEEP ROYAL NAVY FOOTER ==================== */}
      <div className="relative bg-[#092338] text-white pt-10 pb-24 lg:pt-14 lg:pb-12 editorial-hairline-grid">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-10 pb-8 sm:pb-12 border-b border-white/10">
            {/* Column 1: Brand Identity */}
            <div className="col-span-2 lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                  <LukmanHakimLogo variant="emblem" size={42} className="w-8 h-8 sm:w-10 sm:h-10 border-0 shadow-none" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                    {SCHOOL_IDENTITY.nama}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-amber-300/90 mt-0.5">
                    Where Little Minds Bloom · NPSN {SCHOOL_IDENTITY.npsn}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed max-w-sm">
                {SCHOOL_IDENTITY.yayasan}. Mendampingi tumbuh kembang fitrah anak dengan kasih sayang, karakter Al-Qur&apos;an, dan kegembiraan bereksplorasi.
              </p>
            </div>

            {/* Column 2: Navigasi */}
            <div className="col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-3">
              <h4 className="font-display text-sm sm:text-base font-bold text-white">Navigasi</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-sky-100/80">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('about')}
                    className="hover:text-amber-300 transition cursor-pointer text-left"
                  >
                    Tentang Kami
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('schools')}
                    className="hover:text-amber-300 transition cursor-pointer text-left"
                  >
                    4 Jenjang Kelas
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('facilities')}
                    className="hover:text-amber-300 transition cursor-pointer text-left"
                  >
                    Fasilitas &amp; Galeri
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('contact')}
                    className="hover:text-amber-300 transition cursor-pointer text-left"
                  >
                    Kontak &amp; Lokasi
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenPpdb}
                    className="hover:text-amber-300 transition cursor-pointer text-left font-bold text-amber-300"
                  >
                    SPMB Online 2026/2027
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Kontak */}
            <div className="col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-3">
              <h4 className="font-display text-sm sm:text-base font-bold text-white">Hubungi Kami</h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-sky-100/80">
                <a
                  href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                  <span className="truncate">{SCHOOL_IDENTITY.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${SCHOOL_IDENTITY.email}`}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                  <span className="truncate">{SCHOOL_IDENTITY.email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {SCHOOL_IDENTITY.alamat}, {SCHOOL_IDENTITY.kecamatan}, {SCHOOL_IDENTITY.kabupaten}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4: Sosial Media */}
            <div className="col-span-2 lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm sm:text-base font-bold text-white">Ikuti Kami</h4>
              <div className="flex items-center gap-2">
                <a
                  href={SCHOOL_IDENTITY.facebookUrl || SCHOOL_IDENTITY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006699] border border-white/10 text-white flex items-center justify-center transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={SCHOOL_IDENTITY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#092338] border border-white/10 text-white flex items-center justify-center transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 border border-white/10 text-white flex items-center justify-center transition"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={
                    SCHOOL_IDENTITY.youtubeUrl ||
                    SCHOOL_IDENTITY.googleMapsUrl ||
                    `https://www.google.com/maps/search/?api=1&query=${SCHOOL_IDENTITY.mapsQuery}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006699] border border-white/10 text-white flex items-center justify-center transition"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenReport}
                  className="text-xs font-bold text-sky-200 hover:text-amber-300 underline underline-offset-4 cursor-pointer transition"
                >
                  Portal E-Raport Siswa →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 sm:pr-44 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/70">
            <p onClick={handleSecretCopyrightTap} className="select-none cursor-default">
              © {new Date().getFullYear()} {SCHOOL_IDENTITY.nama} (NPSN {SCHOOL_IDENTITY.npsn}). All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-white font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Panel Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
