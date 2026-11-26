import React from 'react';
import { 
  School, 
  MapPin, 
  Instagram, 
  Phone, 
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IdentityCardSection: React.FC = () => {
  const { schoolIdentity: SCHOOL_IDENTITY } = useApp();
  return (
    <section className="py-5 sm:py-12 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-br from-slate-900 via-[#0B3B5B] to-sky-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-lg sm:shadow-xl relative overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="hidden sm:block absolute right-4 -bottom-10 opacity-5 pointer-events-none select-none text-9xl font-black">
            TK
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left: School Profile */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <School className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Identitas Satuan Pendidikan Resmi</span>
              </div>

              <div>
                <h2 className="text-lg sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  {SCHOOL_IDENTITY.nama}
                </h2>
                <p className="text-[11px] sm:text-sm text-sky-200 font-medium mt-1">
                  NPSN: <span className="text-white font-mono font-bold tracking-wider">{SCHOOL_IDENTITY.npsn}</span> • <span className="text-emerald-300 font-semibold">{SCHOOL_IDENTITY.statusSekolah}</span> • <span className="text-sky-300 font-semibold">{SCHOOL_IDENTITY.bentukPendidikan}</span>
                </p>
              </div>

              {/* Address card */}
              <div className="flex items-start gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 text-[11px] sm:text-xs text-slate-200">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <p className="font-bold text-white text-xs sm:text-sm">
                    {SCHOOL_IDENTITY.alamat}
                  </p>
                  <p className="text-slate-300 mt-0.5">
                    Kel. {SCHOOL_IDENTITY.desaKelurahan}, Kec. {SCHOOL_IDENTITY.kecamatan}, {SCHOOL_IDENTITY.kabupaten}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Connect (3-col compact row on mobile, stacked bars on lg+) */}
            <div className="lg:col-span-5 grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-3">
              {/* Instagram */}
              <a
                href={SCHOOL_IDENTITY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:p-4 rounded-xl lg:rounded-2xl bg-white/10 hover:bg-white/15 lg:bg-gradient-to-r lg:from-purple-600/90 lg:to-pink-600/90 border border-white/20 lg:border-pink-400/40 text-white shadow-xs lg:shadow-md transition-all cursor-pointer text-center lg:text-left"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4 lg:w-5 lg:h-5 text-amber-300 lg:text-white" />
                  </div>
                  <div>
                    <span className="hidden lg:block text-[11px] uppercase tracking-wider text-pink-200 font-semibold">Instagram Resmi</span>
                    <span className="font-bold text-[10.5px] lg:text-sm text-white block leading-tight">
                      <span className="lg:hidden">Instagram</span>
                      <span className="hidden lg:inline">@{SCHOOL_IDENTITY.instagram}</span>
                    </span>
                  </div>
                </div>
                <ExternalLink className="hidden lg:block w-4 h-4 text-pink-200 group-hover:text-white group-hover:translate-x-0.5 transition" />
              </a>

              {/* Google Maps Nav Button */}
              <a
                href={`https://maps.google.com/?q=${SCHOOL_IDENTITY.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:p-4 rounded-xl lg:rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-all cursor-pointer text-center lg:text-left"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-sky-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-sky-300" />
                  </div>
                  <div>
                    <span className="hidden lg:block text-[11px] uppercase tracking-wider text-sky-200 font-semibold">Petunjuk Arah Lokasi</span>
                    <span className="font-bold text-[10.5px] lg:text-sm text-white block leading-tight">
                      <span className="lg:hidden">Rute Maps</span>
                      <span className="hidden lg:inline">Buka Navigasi Google Maps</span>
                    </span>
                  </div>
                </div>
                <ExternalLink className="hidden lg:block w-4 h-4 text-sky-300" />
              </a>

              {/* WA Quick Contact */}
              <a
                href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/[^0-9]/g, '') || '6287713551412'}?text=Assalamu%E2%80%99alaikum%20Admin%20${encodeURIComponent(SCHOOL_IDENTITY.nama)}%2C%20saya%20ingin%20konsultasi%20informasi%20sekolah.`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:p-3.5 rounded-xl lg:rounded-2xl bg-emerald-600/85 hover:bg-emerald-600 border border-emerald-400/40 text-white transition cursor-pointer text-center lg:text-left"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3">
                  <div className="w-8 h-8 lg:w-auto lg:h-auto rounded-lg bg-white/15 lg:bg-transparent flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-emerald-100 lg:text-emerald-200 lg:ml-2" />
                  </div>
                  <span className="text-[10.5px] lg:text-xs font-bold leading-tight">
                    <span className="lg:hidden">WhatsApp</span>
                    <span className="hidden lg:inline">Hotline WhatsApp: {SCHOOL_IDENTITY.whatsapp}</span>
                  </span>
                </div>
                <span className="hidden lg:inline text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Fast Response</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
