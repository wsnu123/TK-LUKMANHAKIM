import React from 'react';
import {
  MapPin,
  Instagram,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IdentityCardSection: React.FC = () => {
  const { schoolIdentity: SCHOOL_IDENTITY } = useApp();
  const waDigits = (SCHOOL_IDENTITY.whatsapp || '6287713551412').replace(/\D/g, '').replace(/^0/, '62');

  return (
    <section className="py-5 sm:py-12 bg-[#FAFBFD]">
      <div className="max-w-[1560px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-2xl sm:rounded-[28px] bg-white border border-slate-200/85 shadow-[0_14px_40px_-20px_rgba(9,35,56,0.12)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Architectural Dossier */}
            <div className="lg:col-span-7 p-4 sm:p-8 lg:p-10 space-y-3 sm:space-y-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#006699]">
                Identitas Satuan Pendidikan Resmi <span className="text-slate-300 mx-1">·</span> NPSN {SCHOOL_IDENTITY.npsn}
              </p>

              <div>
                <h2 className="font-display text-lg sm:text-3xl font-extrabold tracking-tight text-[#092338] leading-tight">
                  {SCHOOL_IDENTITY.nama}
                </h2>
                <p className="text-[11px] sm:text-sm text-slate-500 font-medium mt-1">
                  {SCHOOL_IDENTITY.statusSekolah} <span className="mx-1.5 text-slate-300">·</span> {SCHOOL_IDENTITY.bentukPendidikan} <span className="mx-1.5 text-slate-300">·</span> {SCHOOL_IDENTITY.yayasan}
                </p>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 pt-1 text-[11.5px] sm:text-sm text-slate-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#006699] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-[#092338]">{SCHOOL_IDENTITY.alamat}</span>
                  <span className="block text-slate-500 text-[11px] sm:text-xs mt-0.5">
                    Kel. {SCHOOL_IDENTITY.desaKelurahan}, Kec. {SCHOOL_IDENTITY.kecamatan}, {SCHOOL_IDENTITY.kabupaten}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Harmonized Quick-Connect Panel */}
            <div className="lg:col-span-5 bg-[#092338] text-white p-3.5 sm:p-8 lg:p-9 flex flex-col justify-center editorial-hairline-grid">
              <p className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 mb-3">
                Akses Cepat Sekolah
              </p>

              <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-2.5">
                {/* WhatsApp Resmi */}
                <a
                  href={`https://wa.me/${waDigits}?text=Assalamu%E2%80%99alaikum%20Admin%20${encodeURIComponent(SCHOOL_IDENTITY.nama)}%2C%20saya%20ingin%20konsultasi%20informasi%20sekolah.`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:px-4 lg:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer text-center lg:text-left"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </span>
                    <div className="min-w-0">
                      <span className="hidden lg:block text-[10px] uppercase tracking-wider text-emerald-100 font-semibold">
                        Hotline WhatsApp Resmi
                      </span>
                      <span className="font-bold text-[10.5px] lg:text-xs text-white block leading-tight truncate">
                        <span className="lg:hidden">WhatsApp</span>
                        <span className="hidden lg:inline">{SCHOOL_IDENTITY.whatsapp}</span>
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden lg:block w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* Google Maps */}
                <a
                  href={`https://maps.google.com/?q=${SCHOOL_IDENTITY.mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:px-4 lg:py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/12 text-white transition-colors cursor-pointer text-center lg:text-left"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-sky-300" />
                    </span>
                    <div className="min-w-0">
                      <span className="hidden lg:block text-[10px] uppercase tracking-wider text-sky-200/80 font-semibold">
                        Navigasi Lokasi Kampus
                      </span>
                      <span className="font-bold text-[10.5px] lg:text-xs text-white block leading-tight truncate">
                        <span className="lg:hidden">Rute Maps</span>
                        <span className="hidden lg:inline">Buka Petunjuk Arah Google Maps</span>
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden lg:block w-4 h-4 text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* Instagram Resmi */}
                <a
                  href={SCHOOL_IDENTITY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col lg:flex-row items-center lg:justify-between gap-1.5 lg:gap-3 p-2.5 lg:px-4 lg:py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/12 text-white transition-colors cursor-pointer text-center lg:text-left"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
                      <Instagram className="w-4 h-4 text-amber-300" />
                    </span>
                    <div className="min-w-0">
                      <span className="hidden lg:block text-[10px] uppercase tracking-wider text-amber-200/80 font-semibold">
                        Galeri Kegiatan Harian
                      </span>
                      <span className="font-bold text-[10.5px] lg:text-xs text-white block leading-tight truncate">
                        <span className="lg:hidden">Instagram</span>
                        <span className="hidden lg:inline">@{SCHOOL_IDENTITY.instagram}</span>
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden lg:block w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
