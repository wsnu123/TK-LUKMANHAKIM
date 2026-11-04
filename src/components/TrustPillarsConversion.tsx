import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  PhoneCall,
  ArrowRight
} from 'lucide-react';

import { useApp } from '../context/AppContext';

interface TrustPillarsConversionProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
}

export const TrustPillarsConversion: React.FC<TrustPillarsConversionProps> = ({
  onOpenPpdb,
}) => {
  const { schoolIdentity } = useApp();
  const handleOpenWaBooking = () => {
    const targetWa = (schoolIdentity.whatsapp || '6287713551412').replace(/[^0-9]/g, '');
    const cleanWa = targetWa.startsWith('0') ? '62' + targetWa.slice(1) : targetWa;
    const text = encodeURIComponent(
      `Assalamu’alaikum Admin ${schoolIdentity.nama}. Saya ingin berkonsultasi & menjadwalkan Kunjungan Sekolah / Trial Class Gratis untuk Ananda. Mohon informasi jadwal yang tersedia.`
    );
    window.open(`https://wa.me/${cleanWa}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Clean Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077b6] block">
            Pilihan Utama Keluarga Muslim Purwokerto
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Pendidikan Ramah Anak, Berakhlak & Terpercaya
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Menghadirkan lingkungan tumbuh kembang yang aman, bahagia, dan penuh kehangatan layaknya rumah kedua bagi ananda tercinta.
          </p>
        </div>

        {/* 3 Core Conversion Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {/* Card 1 */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-sky-100 text-[#0077b6] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Aman, Nyaman & Bebas Bentakan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Menerapkan pendekatan <strong>Disiplin Positif</strong> tanpa kekerasan atau bentakan. Didukung pantauan keamanan, rasio guru-murid ideal, dan ruang kelas ber-AC.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#0077b6]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Standar Sekolah Ramah Anak</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Tahfidz Cilik & Cambridge Fun
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Perpaduan harmonis antara hafalan surat pendek Juz 30, doa harian, adab sopan santun Islami, serta pengenalan bahasa Inggris interaktif yang gembira.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Target Hafalan Tanpa Tekanan</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-amber-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Gizi Sehat & Portal Digital Wali
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Program makan sehat bergizi bersama tanpa pengawet/MSG. Pantau E-Raport dan tagihan SPP langsung dari HP Ayah/Bunda secara transparan.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Laporan Perkembangan Real-Time</span>
            </div>
          </div>
        </div>

        {/* Action Callout: Kunjungan Sekolah / Trial Class Gratis */}
        <div className="bg-gradient-to-r from-[#0e3b48] via-[#145585] to-[#0077b6] rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Program Trial Class & School Tour Gratis
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ajak Ananda Merasakan Langsung Belajar dengan Senang!
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
                Ayah dan Bunda dipersilakan datang langsung melihat lingkungan sekolah, ruang kelas ber-AC, playground alami, dan berkonsultasi santai bersama Kepala Sekolah.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={handleOpenWaBooking}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Jadwalkan Kunjungan (WA)</span>
              </button>

              <button
                onClick={onOpenPpdb}
                className="w-full bg-white hover:bg-sky-50 text-[#145585] font-bold py-3 px-5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <span>Daftar SPMB Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
