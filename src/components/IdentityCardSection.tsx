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
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none select-none text-9xl font-black">
            TK
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: School Profile */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold uppercase tracking-wider">
                <School className="w-3.5 h-3.5" />
                <span>Identitas Satuan Pendidikan Resmi</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  {SCHOOL_IDENTITY.nama}
                </h2>
                <p className="text-xs sm:text-sm text-sky-200 font-medium mt-1">
                  NPSN: <span className="text-white font-mono font-bold tracking-wider">{SCHOOL_IDENTITY.npsn}</span> • Status: <span className="text-emerald-300 font-semibold">{SCHOOL_IDENTITY.statusSekolah}</span> • Bentuk: <span className="text-sky-300 font-semibold">{SCHOOL_IDENTITY.bentukPendidikan} ({SCHOOL_IDENTITY.jenjangPendidikan})</span>
                </p>
              </div>

              {/* Address card */}
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 text-xs text-slate-200">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">
                    {SCHOOL_IDENTITY.alamat}
                  </p>
                  <p className="text-slate-300 mt-0.5">
                    Desa/Kel: {SCHOOL_IDENTITY.desaKelurahan} • Kecamatan: {SCHOOL_IDENTITY.kecamatan}
                  </p>
                  <p className="text-slate-300">
                    {SCHOOL_IDENTITY.kabupaten} • {SCHOOL_IDENTITY.provinsi}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Connect & Official Instagram */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Instagram Card */}
              <a
                href={SCHOOL_IDENTITY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-600 hover:to-pink-600 border border-pink-400/40 text-white shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-pink-200 block font-semibold">Instagram Resmi</span>
                    <span className="font-bold text-sm text-white">@{SCHOOL_IDENTITY.instagram}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-200 group-hover:text-white group-hover:translate-x-0.5 transition" />
              </a>

              {/* Google Maps Nav Button */}
              <a
                href={`https://maps.google.com/?q=${SCHOOL_IDENTITY.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-sky-200 block font-semibold">Petunjuk Arah Lokasi</span>
                    <span className="font-bold text-sm text-white">Buka Navigasi Google Maps</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-sky-300" />
              </a>

              {/* WA Quick Contact */}
              <a
                href={`https://wa.me/${SCHOOL_IDENTITY.whatsapp.replace(/[^0-9]/g, '') || '6287713551412'}?text=Assalamu%E2%80%99alaikum%20Admin%20${encodeURIComponent(SCHOOL_IDENTITY.nama)}%2C%20saya%20ingin%20konsultasi%20informasi%20sekolah.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-white transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-200 ml-2" />
                  <span className="text-xs font-bold">Hotline WhatsApp: {SCHOOL_IDENTITY.whatsapp}</span>
                </div>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Fast Response</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
