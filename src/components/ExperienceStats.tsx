import React from 'react';
import { CountUpNumber } from './effects/CountUpNumber';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

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
    title: string;
    timeMeta: string;
    dayMeta: string;
    image: string;
    desc: string;
    btnLabel: string;
  }[] = [
    {
      id: 'about',
      title: 'Tentang Yayasan',
      timeMeta: '25+ Tahun',
      dayMeta: 'Akreditasi A',
      image: '/src/assets/images/wisuda_pentas_seni_1790826113606.jpg',
      desc: 'Sejarah pengabdian yayasan, Visi & Misi, 5 Pilar Karakter, 8 Basis Pembelajaran, dan profil dewan ustadzah.',
      btnLabel: 'Lihat Profil',
    },
    {
      id: 'schools',
      title: 'Jenjang & Kelas',
      timeMeta: '07.00 - 16.00',
      dayMeta: 'Senin - Jumat',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
      desc: 'Program Daycare Batita Ceria, Kelompok Bermain (KB), TK Kelompok A, dan TK Kelompok B persiapan SD.',
      btnLabel: 'Lihat Kelas',
    },
    {
      id: 'facilities',
      title: 'Fasilitas Sekolah',
      timeMeta: '8 Zona Utama',
      dayMeta: 'Aman & Asri',
      image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
      desc: 'Playground taman lalu lintas, kebun edukasi satwa, 7 ruang kelas sentra ber-AC, studio seni, dan musholla.',
      btnLabel: 'Lihat Fasilitas',
    },
    {
      id: 'contact',
      title: 'Kontak & Lokasi',
      timeMeta: '07.00 - 15.30',
      dayMeta: 'Senin - Sabtu',
      image: '/src/assets/images/seni_lukis_angklung_1790826091504.jpg',
      desc: 'Peta lokasi kampus Teluk Purwokerto Selatan, direktori WhatsApp resmi, dan reservasi jadwal kunjungan.',
      btnLabel: 'Hubungi Kami',
    },
  ];

  return (
    <section id="experience" className="relative w-full overflow-hidden bg-white">
      {/* ==================================================================== */}
      {/* BAGIAN ATAS: DEDIKASI & PENGALAMAN (SESUAI BAGIAN ATAS IMAGE KANAN)  */}
      {/* ==================================================================== */}
      {showDedication && (
        <div className="relative pt-14 sm:pt-20 pb-20 sm:pb-28 bg-white overflow-hidden">
          {/* Top Sky & Clouds Decorative Border */}
          <div className="absolute top-0 inset-x-0 h-14 pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 1440 90"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <rect width="1440" height="90" fill="#d8effc" />
              <path
                d="M0,45 Q60,90 130,55 Q200,95 280,50 Q360,85 450,45 Q540,95 640,50 Q730,85 820,45 Q920,95 1020,55 Q1120,90 1210,45 Q1320,90 1440,50 L1440,90 L0,90 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Top-Left Floating Earth Globe Illustration (Consistent Ocean & Teal Palette) */}
          <div className="hidden sm:block absolute left-4 lg:left-10 top-12 w-24 h-24 lg:w-28 lg:h-28 pointer-events-none z-0">
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xs">
              <circle cx="60" cy="60" r="48" fill="#38bdf8" />
              {/* Continents in consistent emerald-teal */}
              <path
                d="M32,35 C42,28 55,34 52,46 C49,56 36,58 34,70 C32,78 24,75 20,62 C16,48 22,42 32,35 Z"
                fill="#10b981"
              />
              <path
                d="M68,26 C82,24 96,36 98,52 C100,66 88,82 76,86 C68,88 64,76 68,66 C72,56 60,48 64,38 C66,32 62,28 68,26 Z"
                fill="#10b981"
              />
              <path
                d="M46,84 C54,82 62,88 60,96 C56,102 44,100 42,92 C40,88 43,85 46,84 Z"
                fill="#0d9488"
              />
              {/* Subtle shine arc */}
              <path
                d="M30,30 A42,42 0 0,1 85,25"
                stroke="#bae6fd"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Right Floating Galaxy / Star Portal Badge (Consistent Navy & Ocean Blue Palette) */}
          <div className="hidden md:block absolute -right-6 lg:right-6 bottom-6 lg:bottom-10 w-36 h-36 lg:w-44 lg:h-44 pointer-events-none z-10">
            <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-18">
              <ellipse cx="90" cy="90" rx="76" ry="54" fill="#bae6fd" opacity="0.65" />
              <ellipse cx="90" cy="90" rx="64" ry="44" fill="#38bdf8" opacity="0.75" />
              <ellipse cx="90" cy="90" rx="52" ry="35" fill="#006699" />
              <ellipse cx="90" cy="90" rx="38" ry="24" fill="#0F2937" />
              {/* Big 4-Point Star */}
              <polygon
                points="95,42 104,76 138,85 104,94 95,128 86,94 52,85 86,76"
                fill="#38bdf8"
              />
              <polygon
                points="95,52 101,78 127,85 101,92 95,118 89,92 63,85 89,78"
                fill="#e0f2fe"
              />
              {/* Small Secondary Star */}
              <polygon
                points="62,92 65,102 75,105 65,108 62,118 59,108 49,105 59,102"
                fill="#bae6fd"
              />
            </svg>
          </div>

          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left 6 Cols: Circular Happy Children Joining Hands Illustration */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center">
                  {/* Soft ambient circle glow */}
                  <div className="absolute inset-6 rounded-full bg-sky-50 border-2 border-dashed border-sky-200/80" />

                  <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-xs">
                    {/* Center Joined Hands Starburst */}
                    <circle cx="200" cy="200" r="34" fill="#e0f2fe" />

                    {/* 6 Children arranged in a joyful circle */}
                    {[
                      { angle: 0, shirt: '#0084d6', hair: '#1e293b', cap: '#ef4444' },
                      { angle: 60, shirt: '#00a896', hair: '#7c2d12', cap: '#38bdf8' },
                      { angle: 120, shirt: '#f59e0b', hair: '#451a03', cap: '' },
                      { angle: 180, shirt: '#0284c7', hair: '#78350f', cap: '#10b981' },
                      { angle: 240, shirt: '#0F2937', hair: '#1e293b', cap: '#f43f5e' },
                      { angle: 300, shirt: '#10b981', hair: '#3b0764', cap: '' },
                    ].map((kid, idx) => {
                      const deg = kid.angle;
                      return (
                        <g key={idx} transform={`rotate(${deg} 200 200)`}>
                          {/* Arms reaching to the center (200, 200) */}
                          <path
                            d="M176,128 L194,194"
                            stroke={kid.shirt}
                            strokeWidth="14"
                            strokeLinecap="round"
                          />
                          <path
                            d="M224,128 L206,194"
                            stroke={kid.shirt}
                            strokeWidth="14"
                            strokeLinecap="round"
                          />
                          {/* Hands in center */}
                          <circle cx="195" cy="195" r="7" fill="#fbd3b4" />
                          <circle cx="205" cy="195" r="7" fill="#fbd3b4" />

                          {/* Shoulders / Torso */}
                          <rect
                            x="168"
                            y="106"
                            width="64"
                            height="36"
                            rx="18"
                            fill={kid.shirt}
                          />

                          {/* White Collar */}
                          <path d="M186,108 L200,122 L214,108 Z" fill="#ffffff" />

                          {/* Head */}
                          <circle cx="200" cy="78" r="32" fill="#fde2c4" />

                          {/* Hair / Cap */}
                          <path
                            d="M168,76 C168,52 182,42 200,42 C218,42 232,52 232,76 C222,64 212,60 200,60 C188,60 178,64 168,76 Z"
                            fill={kid.hair}
                          />
                          {kid.cap && (
                            <path
                              d="M172,62 C176,44 224,44 228,62 Z"
                              fill={kid.cap}
                            />
                          )}

                          {/* Rosy Cheeks */}
                          <circle cx="183" cy="84" r="4.5" fill="#fca5a5" opacity="0.7" />
                          <circle cx="217" cy="84" r="4.5" fill="#fca5a5" opacity="0.7" />

                          {/* Happy Eyes */}
                          <circle cx="188" cy="75" r="3.2" fill="#0F2937" />
                          <circle cx="212" cy="75" r="3.2" fill="#0F2937" />
                          <circle cx="189" cy="74" r="1" fill="#ffffff" />
                          <circle cx="213" cy="74" r="1" fill="#ffffff" />

                          {/* Big Smile */}
                          <path
                            d="M189,85 Q200,96 211,85 Z"
                            fill="#e11d48"
                          />
                        </g>
                      );
                    })}

                    {/* Center Emblem Circle */}
                    <circle cx="200" cy="200" r="18" fill="#006699" stroke="#ffffff" strokeWidth="4" />
                    <text
                      x="200"
                      y="204"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="900"
                    >
                      25+
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right 6 Cols: Editorial Dedication Story, 4 Stats & CTA Button */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-[#0084d6] tracking-wide block">
                    Belajar, Bermain, dan Bereksplorasi
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2937] leading-tight tracking-tight">
                    Dedikasi & Pengalaman {schoolIdentity.nama}
                  </h2>
                </div>

                <blockquote className="text-xs sm:text-sm italic text-[#006699] bg-sky-50/80 border-l-4 border-[#006699] px-4 py-2.5 rounded-r-xl">
                  &ldquo;Tanpa Olah Pikir (Tafakur), Mustahil Ada Kreativitas. Tafakur Adalah Pelajaran Penting dalam Al-Qur&apos;an.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Selama lebih dari 25 tahun pengabdian di Purwokerto, {schoolIdentity.nama} menjadi rumah kedua yang hangat bagi ananda untuk berbagi, belajar, dan tumbuh berakhlak mulia melalui Kurikulum Merdeka PAUD, Tahfidz Tilawati, serta 5 Pilar Karakter.
                </p>

                {/* 4 Consistent Stat Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-[#F4F9FD] border border-sky-100 rounded-xl p-3 text-center">
                    <span className="block text-xl sm:text-2xl font-extrabold text-[#006699] tabular-nums">
                      <CountUpNumber end={25} suffix="+" duration={1600} />
                    </span>
                    <span className="text-[11px] font-bold text-[#0F2937] block mt-0.5">
                      Tahun Dedikasi
                    </span>
                  </div>

                  <div className="bg-[#F4F9FD] border border-sky-100 rounded-xl p-3 text-center">
                    <span className="block text-xl sm:text-2xl font-extrabold text-[#006699] tabular-nums">
                      <CountUpNumber end={48} suffix="+" duration={1800} />
                    </span>
                    <span className="text-[11px] font-bold text-[#0F2937] block mt-0.5">
                      Pendidik & Staf
                    </span>
                  </div>

                  <div className="bg-[#F4F9FD] border border-sky-100 rounded-xl p-3 text-center">
                    <span className="block text-xl sm:text-2xl font-extrabold text-[#006699] tabular-nums">
                      <CountUpNumber end={3200} suffix="+" duration={2000} />
                    </span>
                    <span className="text-[11px] font-bold text-[#0F2937] block mt-0.5">
                      Alumni Santri
                    </span>
                  </div>

                  <div className="bg-[#F4F9FD] border border-sky-100 rounded-xl p-3 text-center">
                    <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600">
                      Grade A
                    </span>
                    <span className="text-[11px] font-bold text-[#0F2937] block mt-0.5">
                      NPSN {schoolIdentity.npsn}
                    </span>
                  </div>
                </div>

                {onNavigate && (
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('about')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#006699] hover:bg-[#0F2937] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
                    >
                      <span>Selengkapnya</span>
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
      {/* BAGIAN BAWAH: JELAJAHI TK LUKMAN HAKIM (SESUAI BAGIAN BIRU IMAGE 2)  */}
      {/* ==================================================================== */}
      {showExplore && (
        <div className="relative pt-14">
          {/* Fluffy Cloud-Scalloped Top Wave in Consistent Ocean Blue (#005585) */}
          <div className="w-full overflow-hidden leading-none -mt-14 pointer-events-none relative z-10">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-14 sm:h-20 lg:h-24"
            >
              <path
                d="M0,65 Q55,10 115,60 Q180,5 250,55 Q320,15 390,60 Q460,5 535,55 Q610,15 685,60 Q760,5 835,55 Q910,15 985,60 Q1060,5 1135,55 Q1210,15 1285,60 Q1360,10 1440,55 L1440,100 L0,100 Z"
                fill="#005585"
              />
            </svg>
          </div>

          {/* Main Ocean Blue Section Body */}
          <div className="bg-gradient-to-b from-[#005585] via-[#004c78] to-[#0F2937] pt-6 pb-24 sm:pb-28 relative overflow-hidden">
            {/* Decorative Rainbow Arch on Top-Left (in Consistent Teal/Sky/Gold Palette) */}
            <div className="hidden sm:block absolute left-6 lg:left-16 top-2 w-48 h-32 pointer-events-none opacity-85">
              <svg viewBox="0 0 220 130" fill="none" className="w-full h-full">
                <path
                  d="M10,120 A100,100 0 0,1 200,80"
                  stroke="#38bdf8"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M22,122 A86,86 0 0,1 188,88"
                  stroke="#2dd4bf"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <path
                  d="M34,124 A72,72 0 0,1 176,96"
                  stroke="#fbbf24"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Decorative Twinkling Stars (Matching Reference Image) */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-amber-300 absolute left-[18%] top-8 pointer-events-none opacity-90"
              fill="currentColor"
            >
              <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-amber-300 absolute right-[12%] top-6 pointer-events-none opacity-90"
              fill="currentColor"
            >
              <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-sky-300 absolute right-[18%] top-28 pointer-events-none opacity-80"
              fill="currentColor"
            >
              <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-amber-300 absolute left-[65%] bottom-8 pointer-events-none opacity-85"
              fill="currentColor"
            >
              <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
            </svg>

            <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
              {/* Centered Section Header */}
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
                <span className="text-xs sm:text-sm font-bold text-sky-300 tracking-wide block">
                  Direktori Informasi Sekolah
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                  Jelajahi {schoolIdentity.nama}
                </h2>
                <p className="text-xs sm:text-sm text-sky-100/90 mt-2.5 leading-relaxed">
                  Informasi lengkap seputar sejarah sekolah, jenjang pendidikan, sarana bermain ramah anak, dan pendaftaran santri baru.
                </p>
              </div>

              {/* 4 Cards with Top Photo + Overlapping Dark Navy Card Box + Bottom Pill Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {exploreCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => onNavigate && onNavigate(card.id)}
                    className="group flex flex-col cursor-pointer"
                  >
                    {/* Top Photo Frame */}
                    <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden shadow-lg bg-slate-800 border-2 border-white/15">
                      <img
                        src={card.image}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Overlapping Dark Navy Box (Matches Reference Image Cards) */}
                    <div className="relative z-10 -mt-10 mx-2.5 bg-[#0F2937] group-hover:bg-[#133243] border border-sky-400/20 rounded-2xl pt-5 pb-9 px-5 shadow-2xl flex-1 flex flex-col justify-between transition-colors">
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-sky-300 transition">
                          {card.title}
                        </h3>

                        {/* Clock & Calendar Metadata Row */}
                        <div className="flex items-center flex-wrap gap-3 mt-2 text-[11px] font-semibold text-sky-200/90">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            {card.timeMeta}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            {card.dayMeta}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>

                      {/* Bottom Overlapping Pill CTA Button */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0084d6] group-hover:bg-[#38bdf8] text-white group-hover:text-[#0F2937] text-xs font-extrabold shadow-lg transition whitespace-nowrap">
                          {card.btnLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
