import React, { useState } from 'react';
import {
  Quote,
  GraduationCap,
  Award,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import defaultPrincipalPortrait from '../assets/images/principal_portrait_tk_1795669689936.jpg';

interface PrincipalProfileSectionProps {
  onOpenPpdb?: () => void;
  compact?: boolean;
}

export const PrincipalProfileSection: React.FC<PrincipalProfileSectionProps> = ({
  onOpenPpdb,
  compact = false,
}) => {
  const { teachers, schoolIdentity } = useApp();
  const [expandedMobile, setExpandedMobile] = useState(false);

  // Ambil data Kepala Sekolah langsung dari CMS Guru/Staff agar bisa diubah lewat Panel Admin
  const principal =
    teachers.find((t) => t.role.toLowerCase().includes('kepala')) ||
    teachers[0] || {
      id: 't-1',
      name: 'Ustadzah Hj. Siti Nur Azizah, S.Pd.I., M.Pd.',
      nip: '19840512 200801 2 003',
      role: 'Kepala Sekolah & Pembina Kurikulum',
      education: 'S2 Manajemen Pendidikan Islam (UIN Saizu Purwokerto)',
      experienceYears: 16,
      photo: defaultPrincipalPortrait,
      bio: 'Berpengalaman lebih dari 15 tahun membina pendidikan anak usia dini dengan pendekatan tauhid dan cinta kasih.',
      phone: schoolIdentity.whatsapp || '087713551412',
      specialty: 'Leadership & Islamic Character Building',
    };

  // Jika foto masih berupa placeholder eksternal Unsplash lama atau kosong, pakai potret resmi lokal
  const isLegacyUnsplash =
    !principal.photo || principal.photo.includes('images.unsplash.com');
  const resolvedPhoto = isLegacyUnsplash ? defaultPrincipalPortrait : principal.photo;

  const rawPhone = (principal.phone || schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '');
  const waTarget = rawPhone.startsWith('0')
    ? '62' + rawPhone.slice(1)
    : rawPhone.startsWith('62')
    ? rawPhone
    : '62' + rawPhone;

  const handleChatPrincipal = () => {
    const msg = `Assalamu'alaikum Warahmatullahi Wabarakatuh ${principal.name}. Saya orang tua calon santri ingin berkonsultasi mengenai pendidikan dan pendaftaran di ${schoolIdentity.nama}.`;
    window.open(`https://wa.me/${waTarget}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="profil-kepala-sekolah"
      className={`relative bg-white border-y border-slate-200/80 ${
        compact ? 'py-10 sm:py-16' : 'py-12 sm:py-20'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Kicker & Heading */}
        <div className="mb-7 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006699] tracking-wide">
              <span>Profil Pimpinan Sekolah</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">{schoolIdentity.nama}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B5B] tracking-tight mt-1.5 [text-wrap:balance]">
              Sambutan Kepala Sekolah
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
            Mendampingi masa emas ananda dengan keteladanan adab, kasih sayang, dan kurikulum ramah fitrah.
          </p>
        </div>

        {/* Main Editorial Card: Mobile-First Stacked Card -> Desktop 12-Col Asymmetric Split */}
        <div className="bg-[#F9FBFD] border border-sky-100 rounded-3xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* LEFT / TOP: Portrait Frame */}
            <div className="lg:col-span-5 relative bg-gradient-to-b from-[#EAF4FC] to-[#DCEEF9] p-5 sm:p-7 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[290px] sm:max-w-[330px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
                <img
                  src={resolvedPhoto}
                  alt={principal.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== defaultPrincipalPortrait) {
                      target.src = defaultPrincipalPortrait;
                    }
                  }}
                  className="w-full h-full object-cover object-top"
                />
                {/* Crisp Bottom Scrim with Name on Mobile/Desktop */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B253A]/92 via-[#0B253A]/60 to-transparent pt-12 pb-3.5 px-4 text-white">
                  <p className="text-sm sm:text-base font-extrabold leading-snug">
                    {principal.name}
                  </p>
                  <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
                    {principal.role}
                  </p>
                </div>
              </div>

              {/* Quiet Verified Credential Row Below Portrait */}
              <div className="mt-4 w-full max-w-[330px] grid grid-cols-2 gap-2.5 text-left">
                <div className="bg-white rounded-xl p-3 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-[#006699] text-[11px] font-bold">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Pengalaman</span>
                  </div>
                  <p className="text-sm font-black text-[#0B3B5B] mt-0.5 tabular-nums">
                    {principal.experienceYears || 16}+ Tahun
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-[#006699] text-[11px] font-bold">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span>Bidang Keahlian</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#0B3B5B] mt-0.5 leading-snug line-clamp-2">
                    {principal.specialty || 'Pendidikan Anak Usia Dini'}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT / BOTTOM: Welcome Speech & Commitments */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 text-[#006699] mb-3">
                  <Quote className="w-6 h-6 text-amber-500 shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#006699]">
                    Assalamu’alaikum Warahmatullahi Wabarakatuh
                  </span>
                </div>

                <p className="text-base sm:text-lg font-bold text-[#0B3B5B] leading-relaxed">
                  “Setiap anak terlahir istimewa dengan fitrah kebaikan. Tugas kita bersama sebagai
                  orang tua dan pendidik adalah menjaga keceriaannya sambil menanamkan pondasi tauhid,
                  adab mulia, dan kemandirian sejak dini.”
                </p>

                <div
                  className={`mt-4 space-y-3 text-sm text-slate-600 leading-relaxed ${
                    !expandedMobile ? 'line-clamp-4 sm:line-clamp-none' : ''
                  }`}
                >
                  <p>{principal.bio}</p>
                  <p>
                    Di <strong>{schoolIdentity.nama}</strong>, kami menghadirkan suasana belajar
                    berbasis 7 Sentra, metode Al-Qur’an Tilawati PAUD, serta pendampingan penuh kasih
                    sayang tanpa tekanan calistung memaksa agar ananda tumbuh percaya diri dan siap
                    melangkah ke jenjang Sekolah Dasar.
                  </p>
                </div>

                {/* Mobile Expand/Collapse for Clean Scannability */}
                <button
                  type="button"
                  onClick={() => setExpandedMobile((prev) => !prev)}
                  className="sm:hidden mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#006699] py-1.5 cursor-pointer"
                >
                  <span>{expandedMobile ? 'Ringkas Sambutan' : 'Baca Sambutan Lengkap'}</span>
                  {expandedMobile ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Education & 3 Commitments */}
                <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500">
                    Pendidikan:{' '}
                    <span className="text-slate-800 font-bold">{principal.education}</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {[
                      'Komunikasi Terbuka dengan Wali Murid',
                      'Pembiasaan Ibadah & Adab 5S Harian',
                      'Observasi Tumbuh Kembang Personal',
                    ].map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-[#F4F9FD] rounded-xl p-2.5 border border-sky-100/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#006699] shrink-0 mt-0.5" />
                        <span className="text-[11.5px] font-semibold text-[#0B3B5B] leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Row: Thumb-Friendly on Mobile */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleChatPrincipal}
                  className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#006699] hover:bg-[#0B3B5B] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi dengan Kepala Sekolah</span>
                </button>

                {onOpenPpdb && (
                  <button
                    type="button"
                    onClick={onOpenPpdb}
                    className="min-h-[46px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B253A] font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Daftar SPMB 2026/2027</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
