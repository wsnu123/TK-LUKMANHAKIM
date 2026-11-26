import React from 'react';
import { MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WaAdminContact } from '../types';

interface TanyaAdminWAProps {
  onOpenChatbot?: () => void;
}

export const TanyaAdminWA: React.FC<TanyaAdminWAProps> = () => {
  const { waContacts, schoolIdentity } = useApp();

  const handleOpenWA = (admin: WaAdminContact) => {
    const digits = admin.phone.replace(/\D/g, '');
    const phone = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
    const text = encodeURIComponent(
      `Assalamu’alaikum Warahmatullahi Wabarakatuh ${admin.name} (${admin.unit} ${schoolIdentity.nama}). Saya ingin berkonsultasi mengenai informasi ${admin.role}. Mohon dibantu ya Ustadzah. Terima kasih.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-admin" className="py-8 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          {/* Left Column: Authentic School Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md h-44 sm:h-72 lg:min-h-[400px] group border border-slate-200/70">
            <img
              src="/assets/gallery/foto6-sholat-berjamaah.jpg"
              alt={`Kegiatan Santri ${schoolIdentity.nama}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1 sm:space-y-2">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[9.5px] sm:text-[11px] font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md uppercase tracking-wider">
                Sekretariat &amp; Panitia SPMB
              </span>
              <h3 className="text-base sm:text-2xl font-bold leading-tight">
                Konsultasi &amp; Jadwal Kunjungan Sekolah
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                Ayah dan Bunda dapat menghubungi langsung ustadzah narahubung masing-masing unit melalui WhatsApp resmi sekolah.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Official Contacts */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs font-bold text-[#006699] uppercase tracking-wider mb-1 sm:mb-1.5">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#006699]" />
                <span>Layanan Informasi Wali Murid</span>
              </div>
              <h2 className="text-lg sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Narahubung Resmi {schoolIdentity.nama}
              </h2>
              <p className="text-[11.5px] sm:text-sm text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                Pilih kontak unit pendidikan di bawah ini untuk terhubung langsung via WhatsApp:
              </p>
            </div>

            {/* Admin Grid - Clean 2-col Institutional Cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {waContacts.map((admin, idx) => (
                <button
                  key={admin.id || idx}
                  onClick={() => handleOpenWA(admin)}
                  className="w-full bg-slate-50 hover:bg-white text-left p-3 sm:p-4 rounded-xl border border-slate-200/80 hover:border-[#006699] hover:shadow-md transition-all duration-200 group flex items-start justify-between gap-2 cursor-pointer"
                >
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#006699] bg-sky-50 px-1.5 sm:px-2 py-0.5 rounded truncate max-w-full">
                      {admin.unit}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#006699] transition pt-0.5 leading-snug">
                      {admin.name}
                    </span>
                    <span className="block text-[10.5px] sm:text-xs text-slate-500 leading-tight line-clamp-2">
                      {admin.role}
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition">
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>{schoolIdentity.alamat}</span>
              </span>
              <span className="text-slate-500 font-medium">Senin – Sabtu (07.30 – 15.30 WIB)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
