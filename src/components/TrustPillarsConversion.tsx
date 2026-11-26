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
    <section className="py-8 sm:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Clean Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-14 space-y-1.5 sm:space-y-3">
          <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-widest text-[#0077b6] block">
            Pilihan Utama Keluarga Muslim Purwokerto
          </span>

          <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Pendidikan Ramah Anak, Berakhlak &amp; Terpercaya
          </h2>

          <p className="text-slate-600 text-[11.5px] sm:text-sm max-w-xl mx-auto leading-relaxed">
            Menghadirkan lingkungan tumbuh kembang yang aman, bahagia, dan penuh kehangatan layaknya rumah kedua bagi ananda tercinta.
          </p>
        </div>

        {/* 3 Core Conversion Highlights Cards (Swipeable horizontal strip on mobile, 3-col grid on md+) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:pb-0 md:overflow-visible mb-6 sm:mb-14">
          {/* Card 1 */}
          <div className="w-[255px] shrink-0 snap-start md:w-auto bg-slate-50/80 rounded-2xl p-4 sm:p-7 border border-slate-200/80 hover:border-sky-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-100 text-[#0077b6] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                Aman, Nyaman &amp; Bebas Bentakan
              </h3>
              <p className="text-[11.5px] sm:text-sm text-slate-600 leading-relaxed">
                Menerapkan pendekatan <strong>Disiplin Positif</strong> tanpa kekerasan atau bentakan. Didukung pantauan keamanan, rasio guru-murid ideal, dan ruang kelas ber-AC.
              </p>
            </div>
            <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0077b6]">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
              <span>Standar Sekolah Ramah Anak</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[255px] shrink-0 snap-start md:w-auto bg-slate-50/80 rounded-2xl p-4 sm:p-7 border border-slate-200/80 hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                Tahfidz Cilik &amp; Cambridge Fun
              </h3>
              <p className="text-[11.5px] sm:text-sm text-slate-600 leading-relaxed">
                Perpaduan harmonis antara hafalan surat pendek Juz 30, doa harian, adab sopan santun Islami, serta pengenalan bahasa Inggris interaktif yang gembira.
              </p>
            </div>
            <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
              <span>Target Hafalan Tanpa Tekanan</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-[255px] shrink-0 snap-start md:w-auto bg-slate-50/80 rounded-2xl p-4 sm:p-7 border border-slate-200/80 hover:border-amber-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                Gizi Sehat &amp; Portal Digital Wali
              </h3>
              <p className="text-[11.5px] sm:text-sm text-slate-600 leading-relaxed">
                Program makan sehat bergizi bersama tanpa pengawet/MSG. Pantau E-Raport dan tagihan SPP langsung dari HP Ayah/Bunda secara transparan.
              </p>
            </div>
            <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-amber-700">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
              <span>Laporan Perkembangan Real-Time</span>
            </div>
          </div>
        </div>

        {/* Action Callout: Kunjungan Sekolah / Trial Class Gratis */}
        <div className="bg-gradient-to-r from-[#0e3b48] via-[#145585] to-[#0077b6] rounded-2xl sm:rounded-3xl p-4 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-1.5 sm:space-y-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Program Trial Class &amp; School Tour Gratis
              </span>
              <h3 className="text-base sm:text-3xl font-black text-white tracking-tight leading-snug">
                Ajak Ananda Merasakan Langsung Belajar dengan Senang!
              </h3>
              <p className="text-[11.5px] sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
                Ayah dan Bunda dipersilakan datang langsung melihat ruang kelas ber-AC, playground alami, dan berkonsultasi santai bersama Kepala Sekolah.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-2 sm:gap-3">
              <button
                onClick={handleOpenWaBooking}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-[11px] sm:text-sm whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Jadwal Tour</span>
              </button>

              <button
                onClick={onOpenPpdb}
                className="w-full bg-white hover:bg-sky-50 text-[#145585] font-bold py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-[11px] sm:text-sm whitespace-nowrap"
              >
                <span>Daftar SPMB</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
