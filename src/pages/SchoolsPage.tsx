import React, { useState, useEffect } from 'react';
import {
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  Sparkles,
  GraduationCap,
  Heart,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { SevenSentraShowcase } from '../components/SevenSentraShowcase';
import { LukmanHakimLogo } from '../components/LukmanHakimLogo';

interface SchoolsPageProps {
  activeSection?: string;
  onOpenPpdb: () => void;
  onNavigate: (page: PageTab) => void;
}

interface SchoolUnitItem {
  id: string;
  name: string;
  ageRange: string;
  schedule: string;
  ratio: string;
  quota: string;
  image: string;
  badgeBg: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  tahfidzTarget: string;
}

const SCHOOL_PROGRAMS: SchoolUnitItem[] = [
  {
    id: 'unit-daycare',
    name: 'Daycare & Batita',
    ageRange: '1.5 – 3 Tahun',
    schedule: '07.00 – 16.00 WIB (Senin – Jumat)',
    ratio: '1 Ustadzah : 3 Anak',
    quota: '12 Anak / Kelas',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.53_daac45a0.jpeg',
    badgeBg: 'bg-sky-500',
    icon: Heart,
    description:
      'Layanan pengasuhan dan stimulasi dini penuh kasih sayang dengan jadwal makan sehat teratur, tidur siang nyaman, toilet training bertahap, dan stimulasi sensorik.',
    highlights: [
      'Pendampingan toilet training & kemandirian dasar',
      'Stimulasi motorik kasar-halus & kosakata harian',
      'Katering sehat Non-MSG & laporan harian orang tua',
    ],
    tahfidzTarget: 'Pengenalan kalimat thayyibah, doa makan, doa tidur & surat pendek.',
  },
  {
    id: 'unit-kb',
    name: 'Playgroup (KB)',
    ageRange: '3 – 4 Tahun',
    schedule: '07.30 – 10.30 WIB (Senin – Jumat)',
    ratio: '1 Ustadzah : 6 Anak',
    quota: '15 Anak / Kelas',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49_7575f5ef.jpeg',
    badgeBg: 'bg-amber-500',
    icon: Sparkles,
    description:
      'Tahap awal ananda mengenal dunia sosial di luar rumah, belajar berbagi bersama teman sebaya, eksplorasi alam terbuka, dan pembiasaan adab Islami.',
    highlights: [
      'Sosialisasi teman sebaya & budaya 5S',
      'Eksplorasi taman, rumah merpati & jembatan motorik',
      'Seni kriya, meronce, mewarnai & lagu edukatif',
    ],
    tahfidzTarget: 'Surat Al-Fatihah, An-Naas s/d Al-Lahab & 8 doa harian pilihan.',
  },
  {
    id: 'unit-tka',
    name: 'TK Kelompok A',
    ageRange: '4 – 5 Tahun',
    schedule: '07.30 – 11.15 WIB (Senin – Jumat)',
    ratio: '1 Ustadzah : 10 Anak',
    quota: '20 Anak / Kelas',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.48_df009c44.jpeg',
    badgeBg: 'bg-emerald-500',
    icon: BookOpen,
    description:
      'Mengembangkan pondasi akhlak mulia, pra-literasi fonik (Joyful Phonics), konsep logika-matematika benda konkret, serta eksplorasi sains sederhana.',
    highlights: [
      'Kurikulum Merdeka PAUD & pembelajaran 7 sentra',
      'Pra-membaca menyenangkan & pengenalan angka',
      'Praktik wudhu tertib & Sholat Dhuha berjamaah',
    ],
    tahfidzTarget: 'Metode Tilawati Jilid 1–2, 12 surat pendek Juz 30 & 8 hadits akhlak.',
  },
  {
    id: 'unit-tkb',
    name: 'TK Kelompok B',
    ageRange: '5 – 6 Tahun',
    schedule: '07.30 – 11.45 WIB (Senin – Jumat)',
    ratio: '1 Ustadzah : 12 Anak',
    quota: '20 Anak / Kelas',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.55_945243a3.jpeg',
    badgeBg: 'bg-[#006699]',
    icon: GraduationCap,
    description:
      'Program pematangan kesiapan masuk Sekolah Dasar (SD/MI) secara menyeluruh—meliputi kesiapan fokus belajar, keaksaraan, numerasi, dan kepemimpinan.',
    highlights: [
      'Kesiapan membaca, menulis & berhitung kontekstual',
      'Cambridge Fun English & proyek sains eksperimen',
      'Kemandirian penuh & berani tampil di depan umum',
    ],
    tahfidzTarget: 'Metode Tilawati Jilid 2–3, target Juz 30 & bacaan sholat lengkap.',
  },
  {
    id: 'unit-tahfidz',
    name: 'Tahfidz Tilawati',
    ageRange: 'Semua Jenjang',
    schedule: 'Setiap Pagi (08.00 – 09.00 WIB)',
    ratio: 'Bimbingan Talaqqi',
    quota: 'Kelompok Kecil',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01__1__8276c776.jpeg',
    badgeBg: 'bg-teal-500',
    icon: ShieldCheck,
    description:
      'Pembiasaan mencintai Al-Qur’an dengan irama rost metode Tilawati PAUD yang lembut, menyenangkan, dan mudah diingat oleh anak usia dini.',
    highlights: [
      'Murojaah pagi & Sholat Dhuha di Musholla sekolah',
      'Pengenalan huruf hijaiyah sesuai makhraj sejak dini',
      'Hafalan hadits pilihan & doa adab keseharian',
    ],
    tahfidzTarget: 'Juz 30 bertahap, 15 doa harian & 12 hadits pendek.',
  },
  {
    id: 'unit-ekskul',
    name: 'Ekstrakurikuler',
    ageRange: '3 – 6 Tahun',
    schedule: 'Kamis & Jumat Pagi',
    ratio: 'Pelatih Pendamping',
    quota: 'Minat & Bakat',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01_031c3324.jpeg',
    badgeBg: 'bg-[#0F2937]',
    icon: Compass,
    description:
      'Wadah penyaluran bakat seni, olahraga, sains alam, dan keberanian tampil santri melalui kegiatan pekanan dan puncak tema Outing Class.',
    highlights: [
      'Berenang terbimbing, angklung & musik perkusi',
      'Menggambar, melukis & kriya bahan alam',
      'Outing Class edukatif & berkebun botanika',
    ],
    tahfidzTarget: 'Tafakur alam & mengagumi kebesaran ciptaan Allah SWT.',
  },
];

export const SchoolsPage: React.FC<SchoolsPageProps> = ({
  activeSection,
  onOpenPpdb,
  onNavigate,
}) => {
  const { schoolIdentity, appearanceConfig } = useApp();
  const [selectedId, setSelectedId] = useState<string>('unit-tka');

  useEffect(() => {
    if (activeSection && SCHOOL_PROGRAMS.some((u) => u.id === activeSection)) {
      setSelectedId(activeSection);
      const el = document.getElementById('program-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  const currentUnit =
    SCHOOL_PROGRAMS.find((u) => u.id === selectedId) || SCHOOL_PROGRAMS[2];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* ==================================================================== */}
      {/* 1. HERO BANNER (KIDDYLAND REFERENCE LAYOUT IN CONSISTENT WEB COLORS) */}
      {/* ==================================================================== */}
      <section className="relative bg-gradient-to-br from-[#005585] via-[#004670] to-[#0F2937] text-white pt-10 sm:pt-14 pb-24 sm:pb-28 overflow-hidden">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-amber-300/80 absolute left-[10%] top-12 pointer-events-none"
          fill="currentColor"
        >
          <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-sky-300/60 absolute right-[10%] top-14 pointer-events-none"
          fill="currentColor"
        >
          <polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" />
        </svg>

        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Unit Pendidikan Resmi • Usia 1.5 – 6 Tahun</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.12] text-white">
                Program Pendidikan Sesuai{' '}
                <span className="text-[#fbbf24]">Usia Ananda</span>
              </h1>

              <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Kurikulum bertahap yang disusun khusus menyesuaikan kematangan usia anak—mulai dari pengasuhan batita hingga kesiapan masuk Sekolah Dasar favorit.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={onOpenPpdb}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fbbf24] hover:bg-amber-300 text-[#0F2937] font-extrabold text-xs sm:text-sm shadow-lg transition cursor-pointer"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('program-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-sky-50 text-[#0F2937] font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  <span>Pilih Jenjang Kelas</span>
                  <span className="w-5 h-5 rounded-full bg-[#006699] text-white flex items-center justify-center text-[10px]">
                    ▸
                  </span>
                </button>
              </div>

              {/* 3 Horizontal Feature Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-7">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-400 text-[#0F2937] flex items-center justify-center shadow-md shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white">2 Ustadzah / Kelas</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-sky-400 text-[#0F2937] flex items-center justify-center shadow-md shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white">Metode Tilawati</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-[#0F2937] flex items-center justify-center shadow-md shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white">Siap SD Favorit</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Official TK Lukman Hakim Logo Badge with Satellites */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative flex items-center justify-center">
                <LukmanHakimLogo variant="badge" size={320} className="sm:scale-110" />

                <div className="absolute -left-3 top-1/4 w-12 h-12 rounded-2xl bg-[#fbbf24] text-[#0F2937] flex items-center justify-center shadow-xl transform -rotate-12 z-20">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="absolute -right-2 bottom-1/4 px-3.5 py-1.5 rounded-full bg-[#006699] text-white font-extrabold text-[11px] shadow-xl z-20 border border-white/40">
                  4 Jenjang Utama
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. OVERLAPPING WHITE STRIP ("TAHAPAN USIA EMAS")                     */}
      {/* ==================================================================== */}
      <section className="relative z-20 -mt-12 bg-white rounded-t-[36px] sm:rounded-t-[48px] border-b border-slate-100 shadow-[0_-10px_30px_rgba(15,41,55,0.06)]">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-sky-100 border-2 border-[#0084d6]/30 shrink-0 shadow-md">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg"
                  alt="Santri TK Lukman Hakim"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0084d6] block">
                  Kurikulum Sesuai Fitrah
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2937] leading-tight mt-0.5">
                  Tumbuh Optimal di{' '}
                  <span className="text-[#006699]">Setiap Usia</span>
                </h2>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div className="text-left sm:text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-[#0084d6] block">
                  1.5 – 3 Thn
                </span>
                <span className="text-xs font-bold text-[#0F2937] block mt-1">
                  Daycare Ceria
                </span>
                <span className="text-[11px] text-slate-500">Rasio 1 : 3</span>
              </div>

              <div className="text-left sm:text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-[#006699] block">
                  3 – 4 Thn
                </span>
                <span className="text-xs font-bold text-[#0F2937] block mt-1">
                  Playgroup (KB)
                </span>
                <span className="text-[11px] text-slate-500">Rasio 1 : 6</span>
              </div>

              <div className="text-left sm:text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-teal-600 block">
                  4 – 5 Thn
                </span>
                <span className="text-xs font-bold text-[#0F2937] block mt-1">
                  TK Kelompok A
                </span>
                <span className="text-[11px] text-slate-500">Rasio 1 : 10</span>
              </div>

              <div className="text-left sm:text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block">
                  5 – 6 Thn
                </span>
                <span className="text-xs font-bold text-[#0F2937] block mt-1">
                  TK Kelompok B
                </span>
                <span className="text-[11px] text-slate-500">Persiapan SD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. OUR PROGRAMS (LEFT 2x3 ICON GRID + RIGHT FEATURED SPLIT CARD)     */}
      {/* ==================================================================== */}
      <section id="program-showcase" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 5 Cols: 2x3 Programs Grid matching Reference Image */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0084d6] block">
                  Pilih Jenjang Pendidikan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2937] tracking-tight mt-1">
                  Program Pendidikan Kami
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {SCHOOL_PROGRAMS.map((prog) => {
                  const Icon = prog.icon;
                  const isSelected = currentUnit.id === prog.id;
                  return (
                    <button
                      key={prog.id}
                      onClick={() => setSelectedId(prog.id)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#F4F9FD] border-[#0084d6] shadow-xs'
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${prog.badgeBg} text-white flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-extrabold text-[#0F2937] truncate">
                          {prog.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate">
                          ({prog.ageRange})
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div>
                <button
                  onClick={onOpenPpdb}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2937] hover:bg-[#006699] text-white text-xs font-extrabold shadow-md transition cursor-pointer"
                >
                  <span>Daftar Jenjang {currentUnit.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Featured Split Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#F4F9FD] border border-sky-100 rounded-[32px] p-6 sm:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-6 space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699] bg-white px-3 py-1 rounded-full border border-sky-100">
                      Usia {currentUnit.ageRange}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {currentUnit.ratio}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2937] leading-tight">
                    {currentUnit.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentUnit.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {currentUnit.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006699] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-sky-200/60">
                    <span className="inline-flex items-center gap-1 font-bold text-[#0F2937]">
                      <Clock className="w-3.5 h-3.5 text-[#0084d6]" />
                      {currentUnit.schedule}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-6 space-y-3">
                  <div className="h-56 sm:h-64 rounded-[24px] overflow-hidden shadow-md border-4 border-white bg-slate-100">
                    <img
                      src={currentUnit.image}
                      alt={currentUnit.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-3 border border-sky-100 text-xs">
                    <span className="font-extrabold text-[#006699] block">
                      Target Tahfidz & Ibadah:
                    </span>
                    <span className="text-slate-600 text-[11px] leading-snug block mt-0.5">
                      {currentUnit.tahfidzTarget}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. WAVY OCEAN BLUE SECTION ("RITME KEGIATAN HARIAN SANTRI")          */}
      {/* ==================================================================== */}
      <section className="relative">
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16"
          >
            <path
              d="M0,40 Q240,90 480,45 T960,50 T1440,35 L1440,90 L0,90 Z"
              fill="#005585"
            />
          </svg>
        </div>

        <div className="bg-gradient-to-b from-[#005585] to-[#0F2937] py-12 sm:py-16 text-white relative overflow-hidden">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left 5 Cols: Arch Framed Photo */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[14px] border-emerald-400/80 border-r-sky-400 border-b-sky-400" />
                  <div className="w-52 h-52 sm:w-58 sm:h-58 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src="/assets/images/tahfidz_tilawati_ceria_1790826065441.jpg"
                      alt="Rutinitas Santri"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: 4 Daily Rhythm Steps */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#fbbf24] block">
                    Jadwal Harian Santri
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
                    Rutinitas Belajar yang Terstruktur & Menyenangkan
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3.5 bg-white/10 border border-white/15 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0F2937] flex items-center justify-center shrink-0 font-extrabold text-xs">
                      07.30
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Penyambutan 5S & Dhuha</h4>
                      <p className="text-xs text-sky-200 mt-0.5">
                        Jurnal pagi, ikrar santri, wudhu tertib & Sholat Dhuha berjamaah.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/10 border border-white/15 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-400 text-[#0F2937] flex items-center justify-center shrink-0 font-extrabold text-xs">
                      08.15
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Tahfidz & Tilawati</h4>
                      <p className="text-xs text-sky-200 mt-0.5">
                        Murojaah Juz 30, mengaji metode Tilawati & hafalan doa harian.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/10 border border-white/15 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400 text-[#0F2937] flex items-center justify-center shrink-0 font-extrabold text-xs">
                      09.00
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Eksplorasi 7 Sentra</h4>
                      <p className="text-xs text-sky-200 mt-0.5">
                        Kegiatan tematik di 7 sentra: alam cair, balok, olah tubuh, peran, seni, serta persiapan 1 & 2.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/10 border border-white/15 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-400 text-[#0F2937] flex items-center justify-center shrink-0 font-extrabold text-xs">
                      10.15
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Makan Sehat & Refleksi</h4>
                      <p className="text-xs text-sky-200 mt-0.5">
                        Cuci tangan, adab makan bersama, evaluasi harian & doa pulang.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cloud Wave */}
        <div className="w-full overflow-hidden leading-none bg-[#0F2937] pointer-events-none">
          <svg
            viewBox="0 0 1440 95"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16"
          >
            <path
              d="M0,60 Q60,10 130,55 Q200,5 280,55 Q360,15 440,60 Q520,5 610,55 Q700,15 790,60 Q880,5 970,55 Q1060,15 1150,60 Q1240,5 1340,55 Q1400,25 1440,55 L1440,95 L0,95 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4.5. EKSPLORASI 7 SENTRA BELAJAR (DOKUMENTASI FOTO ASLI CLIENT)      */}
      {/* ==================================================================== */}
      {(appearanceConfig?.showSentraInSchools ?? true) && (
        <SevenSentraShowcase onOpenPpdb={onOpenPpdb} onNavigate={onNavigate} />
      )}

      {/* ==================================================================== */}
      {/* 5. TRANSISI PAUD KE SD & BOTTOM ADMISSIONS BANNER                    */}
      {/* ==================================================================== */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0084d6] block">
                Transisi PAUD ke SD yang Menyenangkan
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2937] leading-tight">
                Kesiapan Matang Masuk SD Favorit Tanpa Stres
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lulusan {schoolIdentity.nama} memiliki kemandirian sosial, fokus belajar yang baik, keaksaraan fonik yang kuat, serta logika berhitung kontekstual tanpa tekanan hafalan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  'Joyful Phonics & Keaksaraan Bermakna',
                  'Logika Matematika dengan Benda Konkret',
                  'Kematangan Emosi & Fokus Menyimak Guru',
                  'Kemandirian Mengurus Perlengkapan Sendiri',
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#0F2937]">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#E8F5E9] border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Tahun Ajaran 2026 / 2027
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2937]">
                      Pendaftaran SPMB Resmi Dibuka
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Kuota santri per kelas dibatasi agar rasio 2 ustadzah per kelas optimal. Daftarkan ananda sekarang dan dapatkan kesempatan Free Trial Class.
                </p>
                <div>
                  <button
                    onClick={onOpenPpdb}
                    className="w-full py-3 rounded-full bg-[#0F2937] hover:bg-[#006699] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <span>Isi Formulir SPMB Online</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
