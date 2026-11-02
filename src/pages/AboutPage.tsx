import React, { useState } from 'react';
import {
  Eye,
  Compass,
  Sprout,
  Heart,
  Globe,
  Lightbulb,
  ArrowRight,
  Phone,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTab } from '../types';

interface AboutPageProps {
  activeSection?: string;
  onNavigate?: (page: PageTab, section?: string) => void;
  onOpenPpdb?: () => void;
  onOpenChatbot?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenPpdb,
}) => {
  const { schoolIdentity, teachers } = useApp();
  const [showAllTeachers, setShowAllTeachers] = useState(false);

  const handleContactTeacher = (phone: string, name: string) => {
    const text = encodeURIComponent(
      `Assalamu’alaikum Warahmatullahi Wabarakatuh ${name}. Saya orang tua calon murid ingin bertanya seputar profil dan kegiatan belajar di ${schoolIdentity.nama}.`
    );
    window.open(`https://wa.me/62${phone.replace(/^0/, '')}?text=${text}`, '_blank');
  };

  const displayedTeachers = showAllTeachers ? teachers : teachers.slice(0, 4);

  return (
    <div className="bg-[#F9F8F6] min-h-screen text-slate-800 antialiased font-sans">
      {/* ==================================================================== */}
      {/* 1. HERO TOP BANNER: BRAND OCEAN BLUE & NAVY PALETTE                 */}
      {/* ==================================================================== */}
      <section className="relative bg-gradient-to-br from-[#005585] via-[#004670] to-[#0F2937] text-white pt-16 sm:pt-20 pb-20 sm:pb-28 overflow-hidden">
        {/* Subtle Background Image Overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src="/assets/school_hero_students.jpg"
            alt="TK Lukman Hakim Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#004670]/40 to-[#F9F8F6] pointer-events-none" />

        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-sky-200 text-xs font-bold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Profil Lembaga &bull; {schoolIdentity.nama}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
            Menumbuhkan Fitrah. <br />
            <span className="text-[#fbbf24]">Menguatkan Generasi Rabbani.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-sky-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Membina masa emas ananda dengan cinta kasih, pondasi tauhid, adab islami, serta kegembiraan bereksplorasi di lingkungan belajar yang ramah anak.
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. "OUR STORY" SECTION: EDITORIAL STORY & 3 CAPSULE PILL PHOTOS     */}
      {/* ==================================================================== */}
      <section id="our-story" className="py-12 sm:py-20 -mt-10 sm:-mt-14 relative z-20">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2937] inline-block relative pb-2.5">
              Our Story
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#006699] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left 6 Cols: Story Narrative & CTA */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                &ldquo;Lahir dari komitmen tulus mendampingi masa emas (<em>golden age</em>) anak-anak usia dini di Purwokerto, {schoolIdentity.nama} hadir sebagai rumah kedua yang aman, hangat, dan ramah fitrah.
              </blockquote>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Kami meyakini bahwa setiap anak adalah amanah istimewa yang berhak mendapatkan pendidikan berkualitas dengan bimbingan penuh kasih sayang. Melalui keterpaduan adab Al-Qur&apos;an, pembiasaan ibadah harian, metode 7 sentra bermain, dan keteladanan nyata ustadzah, kami mendampingi santri menjadi pribadi yang kokoh imannya, santun perilakunya, cerdas, dan mandiri.&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    if (onOpenPpdb) {
                      onOpenPpdb();
                    } else if (onNavigate) {
                      onNavigate('contact');
                    }
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#006699] hover:bg-[#0F2937] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <span>Daftar PPDB Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('schools')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-sky-50 text-[#0F2937] border border-slate-300 font-bold text-xs sm:text-sm shadow-2xs transition duration-200 cursor-pointer"
                  >
                    <span>Lihat 4 Jenjang Kelas</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right 6 Cols: 3 Staggered Pill Portrait Photos (Exact Reference Layout) */}
            <div className="lg:col-span-6 flex items-center justify-center gap-3 sm:gap-4 pt-4 lg:pt-0">
              {/* Capsule 1: Sentra Balok & Konstruksi */}
              <div className="w-28 sm:w-36 h-64 sm:h-80 rounded-[38px] sm:rounded-full overflow-hidden shadow-md border-2 border-white bg-slate-200 group transform hover:-translate-y-1 transition duration-300">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg"
                  alt="Sentra Balok & Konstruksi 3D"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Capsule 2: Adab Santri & Pesan Edukatif (Taller Center Pill) */}
              <div className="w-28 sm:w-36 h-76 sm:h-92 rounded-[38px] sm:rounded-full overflow-hidden shadow-xl border-2 border-white bg-slate-200 group transform hover:-translate-y-1 transition duration-300 ring-2 ring-[#006699]/15">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01__1__8276c776.jpeg"
                  alt="Santri Koko Putih Berkarakter"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Capsule 3: Eksplorasi Sains & Alam Cair */}
              <div className="w-28 sm:w-36 h-64 sm:h-80 rounded-[38px] sm:rounded-full overflow-hidden shadow-md border-2 border-white bg-slate-200 group transform hover:-translate-y-1 transition duration-300">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg"
                  alt="Eksplorasi Ikan & Sains Air"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. "ABOUT US": OUR IDENTITY, VISION AND VALUES                       */}
      {/* ==================================================================== */}
      <section id="identity-vision-values" className="py-14 sm:py-24 bg-[#F9F8F6] border-t border-slate-200/80 relative">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Tag & Title */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699] block mb-2">
              ABOUT US
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F2937] tracking-tight">
              Our Identity, <br className="sm:hidden" />
              Vision and Values
            </h2>
          </div>

          {/* Floating Core Values Pill Bar (Brand Blue Container Matching Website Palette) */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#006699] via-[#005585] to-[#0284c7] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_12px_32px_rgba(0,102,153,0.22)] relative z-20 -mb-7 sm:-mb-9">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              {/* Value 1 */}
              <div className="flex flex-col items-center justify-center p-2">
                <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-[#fbbf24] mb-2" />
                <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                  Iman &amp; Taqwa
                </span>
                <span className="text-[10px] text-sky-100/90 mt-0.5 hidden sm:block">
                  Pondasi Tauhid
                </span>
              </div>

              {/* Value 2 */}
              <div className="flex flex-col items-center justify-center p-2">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-sky-200 mb-2" />
                <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                  Akhlak &amp; 5S
                </span>
                <span className="text-[10px] text-sky-100/90 mt-0.5 hidden sm:block">
                  Adab &amp; Kejujuran
                </span>
              </div>

              {/* Value 3 */}
              <div className="flex flex-col items-center justify-center p-2">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300 mb-2" />
                <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                  Peduli Lingkungan
                </span>
                <span className="text-[10px] text-sky-100/90 mt-0.5 hidden sm:block">
                  Cinta Alam Semesta
                </span>
              </div>

              {/* Value 4 */}
              <div className="flex flex-col items-center justify-center p-2">
                <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-[#fbbf24] mb-2" />
                <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                  Kreatif &amp; Mandiri
                </span>
                <span className="text-[10px] text-sky-100/90 mt-0.5 hidden sm:block">
                  7 Sentra Belajar
                </span>
              </div>
            </div>
          </div>

          {/* Connected Pristine Dual-Column Card (Vision & Mission Side-by-Side) */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl sm:rounded-[36px] border border-sky-100 shadow-sm pt-14 sm:pt-18 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
              {/* Left Column: Vision (Visi) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#006699] flex items-center justify-center shrink-0 border border-sky-100">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2937] tracking-tight">
                    Vision
                  </h3>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FD] border border-sky-100">
                  <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic">
                    &ldquo;Terwujudnya Generasi Anak Usia Dini yang <span className="text-[#006699] font-bold">Beriman &amp; Bertakwa</span> kepada Allah SWT, <span className="text-[#006699] font-bold">Berakhlakul Karimah</span>, Cerdas, Kreatif, Mandiri, serta Mencintai Al-Qur&apos;an dan Lingkungan Hidup.&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Visi luhur ini menjadi kompas utama bagi seluruh pendidik di {schoolIdentity.nama} dalam mendampingi tumbuh kembang fitrah ananda agar siap melangkah ke jenjang Sekolah Dasar dengan percaya diri dan beradab.
                </p>
              </div>

              {/* Vertical Divider for Large Screens */}
              <div className="hidden lg:block absolute left-1/2 top-2 bottom-2 w-px bg-slate-200 -translate-x-1/2" />

              {/* Right Column: Mission (Misi) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-[#006699] flex items-center justify-center shrink-0 border border-sky-100">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2937] tracking-tight">
                    Mission
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-[#006699] flex items-center justify-center font-extrabold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-[#0F2937]">Pondasi Tauhid &amp; Ibadah:</strong> Menanamkan kecintaan pada Allah SWT melalui pembiasaan sholat dhuha berjamaah, doa harian, dan Al-Qur&apos;an metode Tilawati.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-[#006699] flex items-center justify-center font-extrabold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-[#0F2937]">Akhlakul Karimah:</strong> Menumbuhkan karakter santun, jujur, dan empati sosial melalui pembiasaan budaya 5S (Senyum, Salam, Sapa, Sopan, Santun).
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-[#006699] flex items-center justify-center font-extrabold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-[#0F2937]">Sentra Ramah Fitrah:</strong> Menyelenggarakan 7 sentra bermain terarah (Alam Cair, Balok, Olah Tubuh, Peran, Seni, Persiapan 1 & 2) yang aktif, kreatif, dan menstimulasi keunikan potensi setiap anak.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-[#006699] flex items-center justify-center font-extrabold text-[11px] shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong className="text-[#0F2937]">Kemandirian &amp; Cinta Alam:</strong> Melatih kedisiplinan positif, kemandirian merapikan perlengkapan diri, serta kepedulian pada tanaman dan satwa.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-[#006699] flex items-center justify-center font-extrabold text-[11px] shrink-0 mt-0.5">
                      5
                    </span>
                    <span>
                      <strong className="text-[#0F2937]">Sinergi Orang Tua:</strong> Menjalin kemitraan yang transparan dan harmonis bersama wali murid demi kesinambungan pembiasaan baik di rumah.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. "MEET OUR TEAM": CIRCULAR PORTRAITS GRID (FROM REFERENCE)        */}
      {/* ==================================================================== */}
      <section id="our-team" className="py-14 sm:py-24 bg-[#F9F8F6]">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Tag & Title */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699] block mb-2">
              MEET OUR TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2937] tracking-tight">
              Our Team
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Didampingi oleh dewan pendidik dan ustadzah berdedikasi yang membimbing ananda dengan ketulusan hati, kesabaran, dan profesionalisme.
            </p>
          </div>

          {/* Circular Avatar Grid (Matching Bottom of Reference Image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {displayedTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Portrait with Ring Accent */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-md ring-4 ring-sky-100 border-2 border-white group-hover:ring-[#006699]/40 transition duration-300 bg-slate-200">
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-sm sm:text-base font-extrabold text-[#0F2937] leading-tight">
                  {teacher.name}
                </h4>

                {/* Role */}
                <span className="text-xs font-semibold text-[#006699] mt-1 block">
                  {teacher.role}
                </span>

                {/* Education / Specialty Badge */}
                <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 mt-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{teacher.specialty}</span>
                </div>

                {/* Short Bio / Dedication Quote */}
                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed max-w-xs font-normal">
                  &ldquo;{teacher.bio}&rdquo;
                </p>

                {/* Quick WhatsApp Contact */}
                <button
                  onClick={() => handleContactTeacher(teacher.phone, teacher.name)}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#006699] hover:text-[#0F2937] transition cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Sapa via WhatsApp</span>
                </button>
              </div>
            ))}
          </div>

          {/* Toggle Button for More Teachers if Available */}
          {teachers.length > 4 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllTeachers(!showAllTeachers)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-sky-50 border border-slate-300 text-[#0F2937] text-xs font-bold shadow-2xs transition cursor-pointer"
              >
                <span>{showAllTeachers ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Guru (${teachers.length})`}</span>
                {showAllTeachers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
