import React from 'react';
import { CountUpNumber } from './effects/CountUpNumber';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';
import { ArrowUpRight } from 'lucide-react';
import heroGoldenCampus from '../assets/images/hero_campus_golden_1795672459358.jpg';
import montessoriPhoto from '../assets/images/editorial_sentra_montessori_1795672459355.jpg';

interface ExperienceStatsProps {
  onNavigate?: (page: PageTab) => void;
  showDedication?: boolean;
  showExplore?: boolean;
}

export const ExperienceStats: React.FC<ExperienceStatsProps> = ({
  onNavigate,
  showDedication = true,
  showExplore = true,
}) => {
  const { schoolIdentity } = useApp();

  const exploreCards: {
    id: PageTab;
    num: string;
    title: string;
    meta: string;
    image: string;
    desc: string;
    btnLabel: string;
  }[] = [
    {
      id: 'about',
      num: '01',
      title: 'Tentang Yayasan',
      meta: '25+ Tahun · Akreditasi A',
      image: '/assets/images/wisuda_pentas_seni_1790826113606.jpg',
      desc: 'Sejarah pengabdian yayasan, Visi & Misi, sambutan Kepala Sekolah, dan profil dewan ustadzah.',
      btnLabel: 'Lihat Profil',
    },
    {
      id: 'schools',
      num: '02',
      title: 'Jenjang & Kelas',
      meta: '07.00 – 16.00 · Senin – Jumat',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
      desc: 'Program Daycare Batita Ceria, Kelompok Bermain (KB), TK Kelompok A, dan TK Kelompok B persiapan SD.',
      btnLabel: 'Lihat Kelas',
    },
    {
      id: 'facilities',
      num: '03',
      title: 'Fasilitas Kampus',
      meta: '8 Zona Utama · Aman & Asri',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
      desc: 'Playground taman lalu lintas, kebun edukasi satwa, 7 ruang kelas sentra ber-AC, studio seni, dan musholla.',
      btnLabel: 'Lihat Fasilitas',
    },
    {
      id: 'contact',
      num: '04',
      title: 'Kontak & Lokasi',
      meta: '07.00 – 15.30 · Senin – Sabtu',
      image: '/assets/images/seni_lukis_angklung_1790826091504.jpg',
      desc: 'Peta lokasi kampus Teluk Purwokerto Selatan, direktori WhatsApp resmi, dan reservasi kunjungan.',
      btnLabel: 'Hubungi Kami',
    },
  ];

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-white">
      {/* ==================================================================== */}
      {/* BAGIAN ATAS: DEDIKASI & PENGALAMAN (EDITORIAL PHOTO COLLAGE + STATS) */}
      {/* ==================================================================== */}
      {showDedication && (
        <div className="relative py-10 sm:py-24 bg-white overflow-hidden">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left 6 Cols: Editorial Overlapping Photo Collage */}
              <div className="lg:col-span-6 relative">
                <div className="relative pb-8 sm:pb-12 pr-4 sm:pr-10">
                  {/* Primary Golden-Hour Campus Photograph */}
                  <div className="aspect-[16/11] rounded-2xl sm:rounded-[32px] overflow-hidden shadow-[0_24px_55px_-22px_rgba(9,35,56,0.28)] border border-slate-200/70 bg-slate-100">
                    <img
                      src={heroGoldenCampus}
                      alt={`Suasana Belajar di ${schoolIdentity.nama}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlapping Secondary Montessori Inset Photograph */}
                  <div className="hidden sm:block absolute bottom-0 right-0 w-48 lg:w-56 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-[0_18px_40px_-12px_rgba(9,35,56,0.28)] bg-slate-100">
                    <img
                      src={montessoriPhoto}
                      alt="Kelas Sentra Montessori Ber-AC"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Architectural Heritage Plaque */}
                  <div className="absolute -bottom-1 left-4 sm:bottom-4 sm:left-6 bg-[#092338] text-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl border border-white/15">
                    <span className="font-display text-xl sm:text-3xl font-extrabold text-amber-300 leading-none block tabular-nums">
                      25+ Tahun
                    </span>
                    <span className="text-[10px] sm:text-xs text-sky-100/85 font-semibold block mt-0.5">
                      Pengabdian PAUD Purwokerto
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 6 Cols: Editorial Story, Playfair Pull-Quote & Tabular Stats */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2.5">
                  <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                    Belajar, Bermain &amp; Bereksplorasi
                  </p>
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] leading-[1.1] tracking-tight [text-wrap:balance]">
                    Dedikasi &amp; Pengalaman {schoolIdentity.nama}
                  </h2>
                </div>

                {/* Editorial Pull-Quote (No heavy left border bar) */}
                <figure className="bg-[#F4F8FC] rounded-2xl px-4 py-3.5 sm:px-6 sm:py-5 border border-sky-100/90">
                  <blockquote className="font-serif italic text-xs sm:text-base text-[#092338] leading-relaxed">
                    &ldquo;Tanpa Olah Pikir (Tafakur), Mustahil Ada Kreativitas. Tafakur Adalah Pelajaran Penting dalam Al-Qur&apos;an.&rdquo;
                  </blockquote>
                </figure>

                <p className="text-xs sm:text-[15px] text-slate-600 leading-relaxed">
                  Selama lebih dari 25 tahun pengabdian di Purwokerto, {schoolIdentity.nama} menjadi rumah kedua yang hangat bagi ananda untuk berbagi, belajar, dan tumbuh berakhlak mulia melalui Kurikulum Merdeka PAUD, Tahfidz Tilawati, serta 5 Pilar Karakter.
                </p>

                {/* 4 Clean Tabular Stat Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1">
                  <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-3 sm:p-4">
                    <span className="font-display block text-xl sm:text-2xl font-extrabold text-[#092338] tabular-nums">
                      <CountUpNumber end={25} suffix="+" duration={1600} />
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-500 block mt-0.5">
                      Tahun Dedikasi
                    </span>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-3 sm:p-4">
                    <span className="font-display block text-xl sm:text-2xl font-extrabold text-[#092338] tabular-nums">
                      <CountUpNumber end={48} suffix="+" duration={1800} />
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-500 block mt-0.5">
                      Pendidik &amp; Staf
                    </span>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-3 sm:p-4">
                    <span className="font-display block text-xl sm:text-2xl font-extrabold text-[#006699] tabular-nums">
                      <CountUpNumber end={3200} suffix="+" duration={2000} />
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-500 block mt-0.5">
                      Alumni Santri
                    </span>
                  </div>

                  <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-3 sm:p-4">
                    <span className="font-display block text-xl sm:text-2xl font-extrabold text-emerald-600">
                      Grade A
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-500 block mt-0.5 truncate">
                      NPSN {schoolIdentity.npsn}
                    </span>
                  </div>
                </div>

                {onNavigate && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate('about')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#092338] hover:bg-[#006699] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                    >
                      <span>Selengkapnya Tentang Kami</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* BAGIAN BAWAH: JELAJAHI KAMPUS (DEEP ROYAL NAVY EDITORIAL DIRECTORY)  */}
      {/* ==================================================================== */}
      {showExplore && (
        <div className="relative bg-[#092338] text-white py-12 sm:py-24 overflow-hidden editorial-hairline-grid">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            {/* Editorial Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-7 sm:mb-14">
              <div className="space-y-1.5 sm:space-y-2.5 max-w-2xl">
                <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Direktori Informasi Sekolah
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Jelajahi {schoolIdentity.nama}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-sky-100/80 max-w-md leading-relaxed">
                Temukan informasi lengkap seputar sejarah yayasan, 4 jenjang pendidikan, fasilitas ramah anak, dan layanan kontak sekolah.
              </p>
            </div>

            {/* 4 Editorial Photo Directory Cards (Compact Horizontal Snap on Mobile, 4-Col Grid on Desktop) */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
              {exploreCards.map((card) => (
                <article
                  key={card.id}
                  onClick={() => onNavigate && onNavigate(card.id)}
                  className="w-[250px] shrink-0 snap-start sm:w-auto group rounded-2xl sm:rounded-[26px] bg-white/[0.05] hover:bg-white/[0.09] border border-white/12 hover:border-amber-300/40 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#092338]/75 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 font-display text-xs font-extrabold text-amber-300 bg-[#092338]/75 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/10 tabular-nums">
                      {card.num}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-sky-300/90 tracking-wide">
                        {card.meta}
                      </p>
                      <h3 className="font-display text-base sm:text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors mt-1">
                        {card.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300/90 mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white transition-colors">
                      <span>{card.btnLabel}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
