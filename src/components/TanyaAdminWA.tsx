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
    <section id="contact-admin" className="py-20 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic School Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md min-h-[340px] lg:min-h-[400px] group border border-slate-200/70">
            <img
              src="/assets/gallery/foto6-sholat-berjamaah.jpg"
              alt={`Kegiatan Santri ${schoolIdentity.nama}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
                Sekretariat & Panitia SPMB
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                Konsultasi & Jadwal Kunjungan Sekolah
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                Ayah dan Bunda dapat menghubungi langsung ustadzah narahubung masing-masing unit melalui WhatsApp resmi sekolah.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Official Contacts */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006699] uppercase tracking-wider mb-1.5">
                <MessageCircle className="w-4 h-4 text-[#006699]" />
                <span>Layanan Informasi Wali Murid</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Narahubung Resmi {schoolIdentity.nama}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Silakan pilih kontak unit pendidikan di bawah ini untuk terhubung langsung melalui WhatsApp pada jam kerja:
              </p>
            </div>

            {/* Admin Grid - Clean Institutional Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {waContacts.map((admin, idx) => (
                <button
                  key={admin.id || idx}
                  onClick={() => handleOpenWA(admin)}
                  className="w-full bg-slate-50 hover:bg-white text-left p-4 rounded-xl border border-slate-200/80 hover:border-[#006699] hover:shadow-md transition-all duration-200 group flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#006699] bg-sky-50 px-2 py-0.5 rounded">
                      {admin.unit}
                    </span>
                    <span className="block text-sm font-bold text-slate-900 group-hover:text-[#006699] transition pt-0.5">
                      {admin.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {admin.role}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Sekretariat {schoolIdentity.nama} • {schoolIdentity.alamat}
              </span>
              <span className="text-slate-500 font-medium">Senin – Sabtu (07.30 – 15.30 WIB)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
