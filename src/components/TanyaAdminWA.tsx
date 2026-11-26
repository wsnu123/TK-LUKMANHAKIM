import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WaAdminContact } from '../types';
import tahfidzPhoto from '../assets/images/editorial_tahfidz_garden_1795672461872.jpg';

interface TanyaAdminWAProps {
  onOpenChatbot?: () => void;
}

export const TanyaAdminWA: React.FC<TanyaAdminWAProps> = () => {
  const { waContacts, schoolIdentity } = useApp();
  const [imgFailed, setImgFailed] = useState(false);

  const handleOpenWA = (admin: WaAdminContact) => {
    const digits = admin.phone.replace(/\D/g, '');
    const phone = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
    const text = encodeURIComponent(
      `Assalamu’alaikum Warahmatullahi Wabarakatuh ${admin.name} (${admin.unit} ${schoolIdentity.nama}). Saya ingin berkonsultasi mengenai informasi ${admin.role}. Mohon dibantu ya Ustadzah. Terima kasih.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-admin" className="py-10 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Framed Editorial Photo */}
          <div className="lg:col-span-5 relative rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_22px_50px_-20px_rgba(9,35,56,0.28)] h-48 sm:h-76 lg:min-h-[420px] group border border-slate-200/80 bg-[#092338]">
            <img
              src={imgFailed ? tahfidzPhoto : '/assets/gallery/foto6-sholat-berjamaah.jpg'}
              onError={() => setImgFailed(true)}
              alt={`Kegiatan Santri ${schoolIdentity.nama}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/92 via-[#061826]/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-7 sm:left-7 sm:right-7 text-white space-y-1.5 sm:space-y-2">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                Sekretariat &amp; Panitia SPMB
              </p>
              <h3 className="font-display text-lg sm:text-2xl font-extrabold leading-tight">
                Konsultasi &amp; Jadwal Kunjungan Sekolah
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-sky-100/85 leading-relaxed">
                Ayah dan Bunda dapat menghubungi langsung ustadzah narahubung masing-masing unit melalui WhatsApp resmi sekolah.
              </p>
            </div>
          </div>

          {/* Right Column: Official WA Directory */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699] flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Layanan Informasi Wali Murid</span>
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#092338] leading-tight">
                Narahubung Resmi {schoolIdentity.nama}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pilih kontak unit pendidikan di bawah ini untuk terhubung langsung via WhatsApp resmi sekolah:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {waContacts.map((admin, idx) => (
                <button
                  key={admin.id || idx}
                  type="button"
                  onClick={() => handleOpenWA(admin)}
                  className="w-full bg-[#FAFBFD] hover:bg-white text-left p-3.5 sm:p-5 rounded-2xl border border-slate-200/85 hover:border-[#006699] hover:shadow-[0_14px_30px_-14px_rgba(9,35,56,0.16)] transition-all duration-200 group flex items-start justify-between gap-2.5 cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="block text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#006699] truncate">
                      {admin.unit}
                    </span>
                    <span className="font-display block text-xs sm:text-base font-extrabold text-[#092338] group-hover:text-[#006699] transition leading-snug">
                      {admin.name}
                    </span>
                    <span className="block text-[10.5px] sm:text-xs text-slate-500 leading-snug line-clamp-2">
                      {admin.role}
                    </span>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{schoolIdentity.alamat}</span>
              </span>
              <span className="font-semibold text-[#092338]">Senin – Sabtu · 07.30 – 15.30 WIB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
