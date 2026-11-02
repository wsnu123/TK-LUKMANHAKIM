import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Volume2, Settings, Maximize, X } from 'lucide-react';

const CribMobileIcon = () => (
  <svg viewBox="0 0 48 48" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6v5" />
    <path d="M13 11h22" strokeWidth="2.2" />
    <path d="M16 11v8" />
    <path d="M24 11v12" />
    <path d="M32 11v8" />
    <path d="M14 22c0-2 2-3.5 4-2 1.5-1.5 4 0 4 2 0 2.5-4 4.5-4 4.5s-4-2-4-4.5z" fill="#fbbf24" />
    <circle cx="24" cy="27" r="3.5" fill="#38bdf8" />
    <path d="M30 20a4 4 0 1 0 4.8 4.8 3.2 3.2 0 0 1-4.8-4.8z" fill="#60a5fa" />
  </svg>
);

const TeacherEducatorIcon = () => (
  <svg viewBox="0 0 48 48" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 16c0-4 3-6.5 7-6.5s7 2.5 7 6.5" fill="#2dd4bf" />
    <path d="M15 16h18" strokeWidth="2" />
    <path d="M18 16v5a6 6 0 0 0 12 0v-5" fill="#fde68a" />
    <rect x="19" y="18" width="4.2" height="3.2" rx="1" fill="#ffffff" />
    <rect x="24.8" y="18" width="4.2" height="3.2" rx="1" fill="#ffffff" />
    <path d="M23.2 19.5h1.6" />
    <path d="M15 35c0-5.5 3.8-7.5 9-7.5s9 2 9 7.5" fill="#38bdf8" />
    <path d="M21 27.5l3 4.5 3-4.5" fill="#fef08a" />
  </svg>
);

const FacilitiesIcon = () => (
  <svg viewBox="0 0 48 48" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="10" width="28" height="20" rx="2" fill="#fbbf24" />
    <rect x="13" y="13" width="22" height="14" fill="#38bdf8" />
    <rect x="15" y="18" width="4" height="9" fill="#60a5fa" />
    <rect x="21" y="15" width="4" height="12" fill="#93c5fd" />
    <rect x="27" y="20" width="5" height="7" fill="#fde047" />
    <path d="M24 30v5" />
    <rect x="21" y="35" width="6" height="3" rx="0.8" fill="#cbd5e1" />
  </svg>
);

const CurriculumIcon = () => (
  <svg viewBox="0 0 48 48" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="9" width="18" height="26" rx="1.5" fill="#ffffff" />
    <rect x="20" y="13" width="16" height="24" rx="1.5" fill="#f8fafc" />
    <rect x="15" y="12" width="12" height="5" fill="#fef08a" />
    <rect x="15" y="20" width="5" height="5" fill="#38bdf8" />
    <path d="M22 21h6" />
    <path d="M22 24h6" />
    <path d="M15 28h12" />
    <path d="M15 31h9" />
    <rect x="28" y="17" width="5" height="4" fill="#f43f5e" />
    <rect x="28" y="24" width="5" height="4" fill="#60a5fa" />
  </svg>
);

const BaseIllustration = ({ num }: { num: number }) => {
  switch (num) {
    case 8:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#f4a261] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <path d="M17 8h6v9h9v6h-9v9h-6v-9H8v-6h9V8z" fill="#16a34a" />
          </svg>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            8
          </span>
        </div>
      );
    case 7:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#f28482] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <path
              d="M20 8c-7 0-12 5-12 11.5 0 6.2 5 11.5 11 11.5 2 0 3.2-1 3.2-2.4 0-.7-.3-1.3-.7-1.8-.4-.5-.6-1-.6-1.6 0-1.3 1-2.2 2.4-2.2h2.7c4 0 7-3 7-7.2C33 11.3 27.2 8 20 8z"
              fill="#ffffff"
            />
            <circle cx="14" cy="16" r="1.8" fill="#ef4444" />
            <circle cx="18" cy="13" r="1.8" fill="#f59e0b" />
            <circle cx="23" cy="14" r="1.8" fill="#10b981" />
            <circle cx="14" cy="21" r="1.8" fill="#8b5cf6" />
            <path d="M23 27l6-12" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="absolute bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            7
          </span>
        </div>
      );
    case 6:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#e56b92] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <path d="M12 25l8-8 5 5-8 8-5-5z" fill="#fbcfe8" />
            <path d="M20 15l6 6-4 4-6-6 4-4z" fill="#fde2e4" />
            <circle cx="24" cy="14" r="2.5" fill="#ffffff" />
          </svg>
          <span className="absolute top-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            6
          </span>
        </div>
      );
    case 5:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#4cc9bd] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <circle cx="20" cy="22" r="7" fill="#fbbf24" />
            <circle cx="20" cy="14" r="4" fill="#fde68a" />
            <path d="M14 10l3 3M26 10l-3 3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="absolute top-0 right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            5
          </span>
        </div>
      );
    case 4:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#f4c04e] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <polygon points="20,8 23,15 30,16 25,21 26,28 20,24.5 14,28 15,21 10,16 17,15" fill="#ffffff" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            4
          </span>
        </div>
      );
    case 3:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#4ea8de] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <path d="M20 28s-8-4.8-8-10.5A4.5 4.5 0 0 1 20 14a4.5 4.5 0 0 1 8 3.5C28 23.2 20 28 20 28z" fill="#ffffff" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            3
          </span>
        </div>
      );
    case 2:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#6ab04c] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <path d="M13 11h14v6a7 7 0 0 1-14 0v-6z" fill="#fbbf24" />
            <rect x="18" y="23" width="4" height="5" fill="#ffffff" />
            <rect x="14" y="28" width="12" height="3" rx="1" fill="#ffffff" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            2
          </span>
        </div>
      );
    default:
      return (
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#7cb518] flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 40 40" className="w-11 h-11">
            <circle cx="20" cy="15" r="5.5" fill="#fef08a" />
            <path d="M12 29c0-4.5 3.5-7 8-7s8 2.5 8 7" fill="#ffffff" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ef4444] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            1
          </span>
        </div>
      );
  }
};

export const PhilosophyCards: React.FC = () => {
  const { schoolIdentity, philosophyCards, pillarsData } = useApp();
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const cardIcons = [
    <CribMobileIcon />,
    <TeacherEducatorIcon />,
    <FacilitiesIcon />,
    <CurriculumIcon />,
  ];

  // Ordered 8 down to 1 to match the reference layout
  const eightBasesOrdered = [
    {
      num: 8,
      title: 'Disiplin Positif',
      desc: 'Ditanamkan dari kebiasaan sehari-hari di sekolah',
    },
    {
      num: 7,
      title: 'Praktek OASE',
      desc: 'Agama, seni dan olahraga sebagai praktek',
    },
    {
      num: 6,
      title: 'Toleransi',
      desc: 'Penghargaan dan toleransi pada perbedaan',
    },
    {
      num: 5,
      title: 'Proses',
      desc: 'Pembelajaran adalah proses yg terbuka dan partisiparis',
    },
    {
      num: 4,
      title: 'Lugas',
      desc: 'Orientasi pada kelugasan berfikir dan bertindak',
    },
    {
      num: 3,
      title: 'Living Values',
      desc: 'Pendidikan berbasis living values',
    },
    {
      num: 2,
      title: 'Prestasi',
      desc: 'Penghargaan pada setiap usaha dan capaian anak',
    },
    {
      num: 1,
      title: 'Anak = Unik',
      desc: 'Setiap individu adalah unik, sehingga ia mempunyai cara dan kemampuan masing-masing untuk berkembang menjadi dirinya sendiri',
    },
  ];

  return (
    <section id="philosophy" className="relative w-full bg-white pt-16 sm:pt-24 overflow-hidden">
      {/* ==================================================================== */}
      {/* BAGIAN 1: "APAKAH KALIAN TAU ..." & VIDEO GRAND CENTERED (SESUAI BMD) */}
      {/* ==================================================================== */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16">
        {/* Grand Centered Heading & Intro */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2c3e50] tracking-tight">
            Apakah kalian Tau {schoolIdentity.nama} ?
          </h2>
          <div className="w-28 h-1 bg-[#0d6efd] mx-auto rounded-full" />
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            {schoolIdentity.nama} adalah sekolah Islam Terpadu, Bilingual, dan ramah anak di Purwokerto. Kurikulum di{' '}
            {schoolIdentity.nama} terdiri dari Cambridge (Science, Math, English), Kurikulum Nasional Merdeka PAUD, Islamic Montessori, dan Tahfidz Tilawati yang dikembangkan oleh tim dan pendidik di {schoolIdentity.nama}. Mendidik generasi berakhlak mulia untuk kebahagiaan Dunia Akhirat
            {showFullIntro
              ? ' melalui pembiasaan ibadah harian, eksplorasi alam terbuka, serta pendampingan penuh kasih sayang sesuai fitrah tumbuh kembang setiap ananda.'
              : '...'}
          </p>
          <div>
            <button
              type="button"
              onClick={() => setShowFullIntro(!showFullIntro)}
              className="px-6 py-2.5 bg-[#007bb6] hover:bg-[#006699] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {showFullIntro ? 'Tampilkan Ringkas' : 'Load More'}
            </button>
          </div>
        </div>

        {/* Compact Centered Video Preview (Ukuran kecil, proporsional dan rapi) */}
        <div className="max-w-md sm:max-w-lg mx-auto">
          <div
            onClick={() => setIsPlayingVideo(true)}
            className="relative aspect-16/9 rounded-xl sm:rounded-2xl overflow-hidden border border-sky-400/70 shadow-lg group cursor-pointer bg-sky-950 transition-all hover:shadow-xl hover:border-sky-400"
          >
            <img
              src="/assets/gallery/foto1-menara-teratai.jpg"
              alt={schoolIdentity.nama}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Bright Sky Overlay & Tagline Graphic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/60 via-sky-900/20 to-transparent flex items-center justify-between p-4 sm:p-5">
              {/* School Emblem Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-xl p-1.5 shadow-md flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,50 C38,32 30,12 48,6 C66,0 68,26 50,50 Z" fill="#00a2e8" />
                  <path d="M50,50 C68,38 88,30 94,48 C100,66 74,68 50,50 Z" fill="#00a896" />
                  <path d="M50,50 C62,68 70,88 52,94 C34,100 32,74 50,50 Z" fill="#2ecc71" />
                  <path d="M50,50 C32,62 12,70 6,52 C0,34 26,32 50,50 Z" fill="#3498db" />
                  <path d="M50,50 C40,40 25,20 40,15 C55,10 60,35 50,50 Z" fill="#a2d240" />
                  <circle cx="50" cy="50" r="7" fill="#ffffff" />
                </svg>
              </div>

              {/* Stylized Quote */}
              <div className="text-right max-w-[200px] sm:max-w-xs select-none">
                <div className="font-extrabold text-xs sm:text-sm leading-snug tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] uppercase">
                  “BERSEKOLAH DENGAN SENANG, DAN SENANG DI SEKOLAH”
                </div>
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00a8ff] hover:bg-[#0097e6] text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,168,255,0.7)] group-hover:scale-110 transition duration-300">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Compact Video Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 py-2 flex items-center gap-2.5 text-white text-[11px] sm:text-xs">
              <Play className="w-3.5 h-3.5 fill-white shrink-0 cursor-pointer" />
              <div className="flex-1 h-1.5 bg-white/30 rounded-full relative flex items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs opacity-90">-03:34</span>
              <Volume2 className="w-3.5 h-3.5 opacity-90 cursor-pointer" />
              <div className="w-10 h-1 bg-white/40 rounded-full hidden sm:block" />
              <Settings className="w-3.5 h-3.5 opacity-90 cursor-pointer" />
              <Maximize className="w-3.5 h-3.5 opacity-90 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isPlayingVideo && (
        <div
          onClick={() => setIsPlayingVideo(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="bg-[#0F2937] text-white px-5 py-3.5 flex items-center justify-between">
              <h4 className="font-bold text-sm">Profil Singkat {schoolIdentity.nama}</h4>
              <button onClick={() => setIsPlayingVideo(false)} className="text-slate-300 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-center">
              <img
                src="/assets/gallery/foto1-menara-teratai.jpg"
                alt={schoolIdentity.nama}
                className="w-full h-64 object-cover rounded-xl"
              />
              <h5 className="font-extrabold text-lg text-slate-900">
                “Bersekolah dengan Senang, dan Senang di Sekolah”
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Selamat datang di kampus {schoolIdentity.nama} ({schoolIdentity.alamat}, {schoolIdentity.kecamatan}, {schoolIdentity.kabupaten}). Kami menghadirkan pendidikan ramah anak yang memadukan 5 Pilar Karakter dan 8 Basis Pembelajaran.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* BAGIAN 2: 4 KARTU BIRU MEGAH + 5 PILAR + 8 BASIS (SESUAI BMD SCREENSHOT) */}
      {/* ==================================================================== */}
      <div className="relative pt-20 sm:pt-24">
        {/* Rounded-Top Soft Teal Background Plane starting halfway behind the 4 blue cards */}
        <div
          className="absolute inset-x-0 top-[230px] sm:top-[260px] bottom-0 bg-[#86b7c6] rounded-t-[48px] sm:rounded-t-[64px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #82b4c3 0%, #9dc7d4 55%, #b3d6e0 100%)',
          }}
        />

        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 pb-24 sm:pb-32">
          {/* Decorative Blue Circle Ring on Left (Matches BMD Screenshot) */}
          <div className="hidden lg:block absolute -left-6 top-[130px] w-48 h-48 rounded-full border-[6px] border-[#3b82f6]/70 pointer-events-none z-0" />
          <div className="hidden lg:block absolute left-14 top-[320px] w-12 h-12 rounded-full border-[5px] border-[#93c5fd]/80 pointer-events-none z-0" />

          {/* 4 GRAND BLUE CARDS WITH PASTEL PINK TOP CIRCLE ICONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch relative z-10">
            {philosophyCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className={`relative bg-gradient-to-b from-[#0084d6] via-[#006fb8] to-[#005a9c] rounded-3xl sm:rounded-[32px] pt-24 sm:pt-28 pb-12 sm:pb-14 px-7 sm:px-8 xl:px-9 text-center shadow-[0_20px_45px_rgba(0,102,153,0.30)] flex flex-col items-center justify-start mt-12 lg:mt-0 transition-transform duration-300 hover:-translate-y-2 ${
                  idx === 1 ? 'lg:-mt-3 lg:pb-16' : ''
                }`}
              >
                {/* Pastel Pink Icon Circle Overlapping Top (Grand Scale w-28 to w-32) */}
                <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#fae5e8] border-4 border-white flex items-center justify-center shadow-lg">
                  {cardIcons[idx % cardIcons.length]}
                </div>

                {/* Pure White Bold Title (Matches BMD Image 1) */}
                <h3 className="text-xl sm:text-2xl xl:text-[25px] font-black text-white leading-tight mb-4 text-center tracking-tight drop-shadow-xs">
                  {card.title}
                </h3>

                {/* Pure White Crisp Readable Body Text */}
                <p className="text-sm sm:text-[15px] xl:text-base text-white/95 leading-relaxed font-normal text-center">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ==================================================================== */}
          {/* 5 PILAR SECTION (INSIDE TEAL CONTAINER - MATCHES BMD SCREENSHOT 1) */}
          {/* ==================================================================== */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#105187] tracking-tight inline-flex items-center justify-center flex-wrap gap-3">
                <span>5 Pilar</span>
                <span className="bg-white text-[#105187] px-4 py-1 sm:px-5 sm:py-1.5 font-black uppercase tracking-wider shadow-sm">
                  {schoolIdentity.nama}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-12 sm:gap-y-14 max-w-6xl xl:max-w-7xl mx-auto">
              {pillarsData.map((pillar, idx) => (
                <div key={pillar.id || idx} className="flex items-start gap-5 sm:gap-6">
                  {/* Circular Photo with Green/Blue Ring & Centered Overlay Label */}
                  <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full p-[3.5px] bg-gradient-to-tr from-[#2ecc71] via-[#00a8ff] to-[#38bdf8] shadow-lg shrink-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center p-1 text-center">
                        <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider drop-shadow">
                          {pillar.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-base sm:text-xl font-black text-[#1e293b] uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed mt-1.5 font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================================================================== */}
          {/* 8 BASIS PEMBELAJARAN SECTION (ORDERED 8 DOWN TO 1 - MATCHES BMD SCREENSHOT) */}
          {/* ==================================================================== */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#105187] tracking-tight inline-flex items-center justify-center flex-wrap gap-3">
                <span>8 Basis Pembelajaran</span>
                <span className="bg-white text-[#105187] px-4 py-1 sm:px-5 sm:py-1.5 font-black uppercase tracking-wider shadow-sm">
                  {schoolIdentity.nama}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-10 sm:gap-y-12 max-w-6xl xl:max-w-7xl mx-auto">
              {eightBasesOrdered.map((base) => (
                <div key={base.num} className="flex items-center gap-5 sm:gap-6">
                  <BaseIllustration num={base.num} />
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl font-bold text-[#1e293b]">
                      {base.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed mt-1 font-normal">
                      {base.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
