import React from 'react';
import {
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import montessoriPhoto from '../assets/images/editorial_sentra_montessori_1795672459355.jpg';
import tahfidzPhoto from '../assets/images/editorial_tahfidz_garden_1795672461872.jpg';
import artPhoto from '../assets/images/editorial_art_exploration_1795672463487.jpg';
import heroGoldenCampus from '../assets/images/hero_campus_golden_1795672459358.jpg';

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

  const editorialPillars = [
    {
      num: '01',
      tag: 'Disiplin Positif · Kelas Ber-AC',
      title: 'Sentra Montessori & Lingkungan Ramah Anak',
      desc: 'Menerapkan pendekatan Disiplin Positif tanpa bentakan, rasio guru-murid ideal, dan 7 ruang sentra ber-AC yang aman serta hangat bagai rumah kedua.',
      proof: 'Standar Sekolah Ramah Anak',
      image: montessoriPhoto,
      alt: 'Ruang Kelas Sentra Montessori TK Lukman Hakim Purwokerto',
      spanClass: 'md:col-span-2 lg:col-span-5',
    },
    {
      num: '02',
      tag: 'Tahfidz Tilawati · Adab Qur’ani',
      title: 'Tahfidz Cilik Juz 30 & Pembiasaan Ibadah',
      desc: 'Hafalan surat pendek, doa harian, dan adab sopan santun Islami dibimbing dengan metode Tilawati PAUD yang ceria tanpa tekanan.',
      proof: 'Target Hafalan Gembira Tanpa Tekanan',
      image: tahfidzPhoto,
      alt: 'Pendopo Tahfidz dan Tilawati Anak TK Lukman Hakim Purwokerto',
      spanClass: 'md:col-span-1 lg:col-span-4',
    },
    {
      num: '03',
      tag: 'Seni, Alam & Portal Wali',
      title: 'Eksplorasi Kreativitas, Gizi Sehat & E-Raport',
      desc: 'Eksplorasi seni lukis, kebun alam, makan sehat bergizi tanpa MSG, serta pantauan tumbuh kembang transparan langsung dari ponsel Ayah & Bunda.',
      proof: 'Laporan Tumbuh Kembang Real-Time',
      image: artPhoto,
      alt: 'Studio Seni dan Eksplorasi Alam Anak Usia Dini',
      spanClass: 'md:col-span-1 lg:col-span-3',
    },
  ];

  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-[#FAFBFD] relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-7 sm:mb-14">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
              Keunggulan Utama <span className="text-slate-300 mx-1">·</span> Keluarga Muslim Purwokerto
            </p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092338] tracking-tight leading-[1.1] [text-wrap:balance]">
              Pendidikan Ramah Anak, Berakhlak &amp; Terpercaya
            </h2>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] max-w-md leading-relaxed">
            Setiap sudut ruang dirancang untuk menumbuhkan rasa ingin tahu, kemandirian, dan kecintaan pada Al-Qur&apos;an sejak masa emas ananda.
          </p>
        </div>

        {/* Asymmetric Editorial Photo Bento Grid (Compact Horizontal Snap-Scroll on Mobile, 12-Col Bento on Desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-12 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible mb-8 sm:mb-16">
          {editorialPillars.map((item) => (
            <article
              key={item.num}
              className={`w-[270px] shrink-0 snap-start md:w-auto ${item.spanClass} group bg-white rounded-2xl sm:rounded-[26px] border border-slate-200/80 overflow-hidden shadow-[0_10px_30px_-18px_rgba(9,35,56,0.12)] hover:shadow-[0_24px_48px_-20px_rgba(9,35,56,0.18)] hover:border-sky-200 transition-all duration-300 flex flex-col`}
            >
              {/* Crisp 4:3 Editorial Photograph */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092338]/55 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 font-display text-xs sm:text-sm font-extrabold text-white bg-[#092338]/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 tabular-nums">
                  {item.num}
                </span>
              </div>

              {/* Editorial Card Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5 sm:space-y-2.5">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#006699]">
                    {item.tag}
                  </p>
                  <h3 className="font-display text-base sm:text-xl font-extrabold text-[#092338] leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#092338]">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>{item.proof}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Architectural Conversion Banner: Trial Class & School Tour Gratis */}
        <div className="relative rounded-2xl sm:rounded-[32px] bg-[#092338] text-white overflow-hidden shadow-[0_24px_60px_-24px_rgba(9,35,56,0.45)] border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Content */}
            <div className="lg:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-center space-y-3 sm:space-y-5 relative z-10 editorial-hairline-grid">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                Program Trial Class &amp; School Tour Gratis
              </p>

              <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.12] [text-wrap:balance]">
                Ajak Ananda Merasakan Langsung Belajar dengan Senang
              </h3>

              <p className="text-xs sm:text-sm lg:text-[15px] text-sky-100/85 max-w-xl leading-relaxed">
                Ayah dan Bunda dipersilakan berkunjung langsung melihat ruang sentra ber-AC, playground kayu alami, dan berkonsultasi hangat bersama Kepala Sekolah.
              </p>

              <div className="pt-1 sm:pt-2 flex flex-row flex-wrap items-center gap-2.5 sm:gap-3.5">
                <button
                  type="button"
                  onClick={onOpenPpdb}
                  className="flex-1 sm:flex-initial min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#092338] font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Daftar SPMB</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenWaBooking}
                  className="flex-1 sm:flex-initial min-h-[44px] inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm border border-emerald-400/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Jadwalkan Tour</span>
                  <ArrowUpRight className="hidden sm:inline w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Sunlit Campus Photo Bleed */}
            <div className="hidden lg:block lg:col-span-5 relative min-h-[320px]">
              <img
                src={heroGoldenCampus}
                alt={`Suasana Kampus ${schoolIdentity.nama}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#092338] via-[#092338]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
