import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  X,
  Sparkles,
  Users,
  Building2,
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getCacheBustedUrl } from '../utils/cacheBuster';
import { LukmanHakimLogo } from './LukmanHakimLogo';
import heroGoldenCampus from '../assets/images/hero_campus_golden_1795672459358.jpg';

export const PhilosophyCards: React.FC = () => {
  const { schoolIdentity, philosophyCards, pillarsData } = useApp();
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoImgFallback, setVideoImgFallback] = useState(false);

  const cardIcons = [Sparkles, Users, Building2, BookOpenCheck];

  const eightBasesOrdered = [
    {
      num: '01',
      title: 'Anak = Unik',
      desc: 'Setiap individu adalah unik, sehingga ia mempunyai cara dan kemampuan masing-masing untuk berkembang menjadi dirinya sendiri.',
    },
    {
      num: '02',
      title: 'Prestasi',
      desc: 'Penghargaan tulus pada setiap usaha, keberanian mencoba, dan capaian perkembangan setiap anak.',
    },
    {
      num: '03',
      title: 'Living Values',
      desc: 'Pendidikan berbasis nilai kehidupan nyata: iman, kasih sayang, syukur, dan kedamaian hati.',
    },
    {
      num: '04',
      title: 'Lugas',
      desc: 'Orientasi pada kelugasan berpikir, keberanian berekspresi santun, dan kemandirian bertindak.',
    },
    {
      num: '05',
      title: 'Proses',
      desc: 'Pembelajaran adalah proses eksplorasi yang terbuka, partisipatif, dan menggembirakan.',
    },
    {
      num: '06',
      title: 'Toleransi',
      desc: 'Penghargaan dan toleransi pada perbedaan, saling menolong, serta empati sosial sejak dini.',
    },
    {
      num: '07',
      title: 'Praktek OASE',
      desc: 'Olah Agama, Seni, dan Olahraga dipraktikkan langsung secara nyata dan ceria setiap hari.',
    },
    {
      num: '08',
      title: 'Disiplin Positif',
      desc: 'Ditanamkan melalui pembiasaan dan keteladanan hangat sehari-hari di sekolah tanpa paksaan.',
    },
  ];

  return (
    <section id="philosophy" className="relative w-full bg-white pt-10 sm:pt-24 overflow-hidden">
      {/* ==================================================================== */}
      {/* BAGIAN 1: EDITORIAL INTRO & CINEMATIC VIDEO PREVIEW                  */}
      {/* ==================================================================== */}
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-10 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Editorial Prose */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-5 text-left">
            <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
              Filosofi Pendidikan <span className="text-slate-300 mx-1">·</span> Kurikulum Terpadu
            </p>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#092338] tracking-tight leading-[1.1] [text-wrap:balance]">
              Mengenal Lebih Dekat {schoolIdentity.nama}
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {schoolIdentity.nama} adalah sekolah Islam Terpadu, Bilingual, dan ramah anak di Purwokerto. Kurikulum kami memadukan Cambridge (Science, Math, English), Kurikulum Nasional Merdeka PAUD, Islamic Montessori, dan Tahfidz Tilawati untuk mendidik generasi berakhlak mulia bagi kebahagiaan dunia dan akhirat
              {showFullIntro
                ? ' melalui pembiasaan ibadah harian, eksplorasi alam terbuka, serta pendampingan penuh kasih sayang sesuai fitrah tumbuh kembang setiap ananda.'
                : '.'}
            </p>

            <div>
              <button
                type="button"
                onClick={() => setShowFullIntro(!showFullIntro)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#006699] hover:text-[#092338] transition cursor-pointer"
              >
                <span>{showFullIntro ? 'Tampilkan Ringkas' : 'Baca Selengkapnya'}</span>
                {showFullIntro ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Right Framed Video Story Card */}
          <div className="lg:col-span-6">
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="relative aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-[28px] overflow-hidden border border-slate-200/80 shadow-[0_22px_50px_-20px_rgba(9,35,56,0.28)] group cursor-pointer bg-[#092338]"
            >
              <img
                src={videoImgFallback ? heroGoldenCampus : '/assets/gallery/foto1-menara-teratai.jpg'}
                onError={() => setVideoImgFallback(true)}
                alt={schoolIdentity.nama}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#061826]/85 via-[#061826]/25 to-transparent" />

              {/* Top Left Emblem */}
              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 flex items-center gap-2.5 bg-white/95 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1 shadow-md">
                <LukmanHakimLogo variant="emblem" size={28} className="w-7 h-7 border-0 shadow-none" />
                <span className="text-[10px] sm:text-xs font-extrabold text-[#092338] tracking-tight">
                  Profil Kampus · 03:34
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400 group-hover:bg-amber-300 text-[#092338] flex items-center justify-center shadow-[0_12px_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#092338] ml-0.5" />
                </div>
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
                <p className="font-serif italic text-xs sm:text-base text-white/95 leading-snug max-w-md">
                  &ldquo;Bersekolah dengan senang, dan senang di sekolah.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isPlayingVideo && (
        <div
          onClick={() => setIsPlayingVideo(false)}
          className="fixed inset-0 z-50 bg-[#061826]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="bg-[#092338] text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-display font-bold text-sm sm:text-base">
                Profil Singkat {schoolIdentity.nama}
              </h4>
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 sm:p-7 space-y-4 text-center">
              <img
                src={videoImgFallback ? heroGoldenCampus : '/assets/gallery/foto1-menara-teratai.jpg'}
                alt={schoolIdentity.nama}
                className="w-full h-56 sm:h-72 object-cover rounded-2xl"
              />
              <h5 className="font-serif italic font-bold text-lg sm:text-xl text-[#092338]">
                &ldquo;Bersekolah dengan Senang, dan Senang di Sekolah&rdquo;
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Selamat datang di kampus {schoolIdentity.nama} ({schoolIdentity.alamat}, {schoolIdentity.kecamatan}, {schoolIdentity.kabupaten}). Kami menghadirkan pendidikan ramah anak yang memadukan 5 Pilar Karakter dan 8 Basis Pembelajaran.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* BAGIAN 2: LUMINOUS SKY-MIST ARCHITECTURAL STAGE                      */}
      {/* 4 KEUNGGULAN + 5 PILAR + 8 BASIS PEMBELAJARAN                        */}
      {/* ==================================================================== */}
      <div className="relative bg-[#F2F7FB] rounded-t-[28px] sm:rounded-t-[56px] border-t border-sky-100/90 py-10 sm:py-24">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 sm:space-y-24">
          {/* 4 KEUNGGULAN CARDS: Crisp Porcelain & Deep Ocean Architecture */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-1.5 sm:space-y-2.5">
              <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                Mengapa Orang Tua Memilih Kami
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] tracking-tight">
                4 Keunggulan Inti {schoolIdentity.nama}
              </h2>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 xl:gap-6 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
              {philosophyCards.map((card, idx) => {
                const Icon = cardIcons[idx % cardIcons.length];
                const isFeatured = idx === 1;
                return (
                  <div
                    key={card.id || idx}
                    className={`w-[240px] shrink-0 snap-start sm:w-auto rounded-2xl sm:rounded-[26px] p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 school-card-hover ${
                      isFeatured
                        ? 'bg-[#092338] text-white border border-white/10 shadow-[0_20px_44px_-18px_rgba(9,35,56,0.35)]'
                        : 'bg-white text-[#092338] border border-slate-200/85 shadow-[0_10px_28px_-18px_rgba(9,35,56,0.1)]'
                    }`}
                  >
                    <div className="space-y-3 sm:space-y-5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${
                            isFeatured
                              ? 'bg-amber-400/15 text-amber-300 border border-amber-300/25'
                              : 'bg-[#F2F7FB] text-[#006699] border border-sky-100'
                          }`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span
                          className={`font-display text-xs sm:text-sm font-extrabold tabular-nums ${
                            isFeatured ? 'text-amber-300/80' : 'text-slate-300'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3
                          className={`font-display text-base sm:text-xl font-extrabold leading-snug tracking-tight ${
                            isFeatured ? 'text-white' : 'text-[#092338]'
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`text-[11.5px] sm:text-sm leading-relaxed mt-2 ${
                            isFeatured ? 'text-sky-100/85' : 'text-slate-600'
                          }`}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 PILAR PENDIDIKAN: Clean Magazine Photo Cards */}
          <div className="bg-white rounded-2xl sm:rounded-[36px] border border-slate-200/80 p-5 sm:p-10 lg:p-14 shadow-[0_14px_40px_-24px_rgba(9,35,56,0.1)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-12">
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                  Fondasi Karakter Islami
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] tracking-tight">
                  5 Pilar {schoolIdentity.nama}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                Lima nilai utama yang dihidupkan dalam setiap interaksi belajar, bermain, dan beribadah di sekolah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {pillarsData.map((pillar, idx) => (
                <div
                  key={pillar.id || idx}
                  className="group flex flex-row md:flex-col items-center md:items-stretch gap-3.5 md:gap-4 p-3 md:p-0 rounded-2xl md:rounded-none bg-[#FAFBFD] md:bg-transparent border border-slate-100 md:border-0"
                >
                  <div className="relative w-20 h-20 md:w-full md:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={getCacheBustedUrl(pillar.image)}
                      alt={pillar.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="hidden md:inline-flex absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#092338]/80 backdrop-blur-xs text-amber-300 font-display text-[11px] font-bold tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#006699] block">
                      {pillar.badgeText}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-[#092338] leading-snug mt-0.5">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8 BASIS PEMBELAJARAN: Ultra-Clean Architectural Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-1.5 sm:space-y-2.5">
              <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                Metodologi Ramah Fitrah
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] tracking-tight">
                8 Basis Pembelajaran
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
              {eightBasesOrdered.map((base) => (
                <div
                  key={base.num}
                  className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 hover:border-[#006699]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="font-display text-xs sm:text-sm font-extrabold text-[#006699] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-lg tabular-nums">
                        {base.num}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <h3 className="font-display text-xs sm:text-lg font-extrabold text-[#092338] leading-snug">
                      {base.title}
                    </h3>
                    <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed mt-1 sm:mt-2">
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
