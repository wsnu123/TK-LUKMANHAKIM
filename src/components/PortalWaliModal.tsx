import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AspectRating } from '../types';
import {
  X,
  Search,
  CreditCard,
  GraduationCap,
  Calendar,
  QrCode,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Award,
  BookOpen,
  Heart,
  MessageCircle,
  Clock,
  Utensils,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { playCelebrationChime } from '../utils/audioChime';

interface PortalWaliModalProps {
  isOpen: boolean;
  initialTab?: 'raport' | 'jadwal';
  onClose: () => void;
}

export const PortalWaliModal: React.FC<PortalWaliModalProps> = ({
  isOpen,
  initialTab = 'raport',
  onClose,
}) => {
  const { reports, schoolIdentity } = useApp();
  const [activeTab, setActiveTab] = useState<'raport' | 'jadwal'>(initialTab);
  const [searchNis, setSearchNis] = useState('2024001');

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Match student bills & report
  const currentReport =
    reports.find(
      (r) => r.nis === searchNis || r.studentName.toLowerCase().includes(searchNis.toLowerCase())
    ) || reports[0];

  const renderRatingBadge = (rating: AspectRating) => {
    switch (rating) {
      case 'BSB':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-1 rounded-md">
            BSB â€¢ Berkembang Sangat Baik
          </span>
        );
      case 'BSH':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-extrabold px-2.5 py-1 rounded-md">
            BSH â€¢ Berkembang Sesuai Harapan
          </span>
        );
      case 'MB':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-extrabold px-2.5 py-1 rounded-md">
            MB â€¢ Mulai Berkembang
          </span>
        );
      case 'BB':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-extrabold px-2.5 py-1 rounded-md">
            BB â€¢ Belum Berkembang
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[93vh] bg-[#F9F8F6] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.45)] flex flex-col border border-slate-200">
        {/* Top Institutional Header */}
        <div className="bg-gradient-to-r from-[#0F2937] via-[#12384B] to-[#006699] text-white px-5 sm:px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300 font-bold">
                  PORTAL DIGITAL WALI MURID TERPADU
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md font-bold">
                  Terverifikasi Dapodik â€¢ {schoolIdentity.npsn}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight mt-0.5">
                Layanan E-Raport & Agenda Santri
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-center p-2 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup Portal Wali"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Selector & Unified Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-5 sm:px-7 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Student NIS Search & Quick Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchNis}
                onChange={(e) => {
                  setSearchNis(e.target.value);
                  setShowReceipt(false);
                }}
                placeholder="Cari NIS / Nama Santri..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#006699] focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Santri Aktif:</span>
              {reports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSearchNis(r.nis);
                    setShowReceipt(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
                    searchNis === r.nis
                      ? 'bg-[#0F2937] text-white border-[#0F2937]'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {r.studentName.split(' ')[0]} ({r.nis})
                </button>
              ))}
            </div>
          </div>

          {/* 2 Portal Feature Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('raport')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'raport'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>1. E-Raport Semester</span>
            </button>

            <button
              onClick={() => setActiveTab('jadwal')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'jadwal'
                  ? 'bg-[#006699] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>2. Menu Gizi & Agenda</span>
            </button>
          </div>
        </div>

        {/* Active Student Banner */}
        {currentReport && (
          <div className="bg-[#F3F1EC] border-b border-slate-200 px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#006699] text-white font-extrabold text-sm flex items-center justify-center">
                {currentReport.studentName.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {currentReport.studentName}
                </h3>
                <p className="text-[11px] text-slate-600">
                  NIS: <strong className="font-mono">{currentReport.nis}</strong> Â· Kelompok:{' '}
                  <strong>{currentReport.classGroup}</strong> Â· Wali Kelas:{' '}
                  <strong>{currentReport.teacherName}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500">Kehadiran: </span>
                <strong className="text-emerald-700">{currentReport.attendance.hadir ?? currentReport.attendance.present ?? 56} Hari Hadir</strong>
              </div>
              <a
                href={`https://wa.me/${schoolIdentity.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Assalamuâ€™alaikum Ustadzah, saya wali murid dari ${currentReport.studentName} (NIS: ${currentReport.nis}) ingin berkonsultasi.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hubungi Wali Kelas</span>
              </a>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 1: E-RAPORT CAPAIAN PERKEMBANGAN ANAK */}
          {activeTab === 'raport' && currentReport && (
            <div className="space-y-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#006699] font-bold block">
                    LAPORAN CAPAIAN PERKEMBANGAN SANTRI â€¢ KURIKULUM MERDEKA PAUD
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {currentReport.studentName} â€” {currentReport.semester} ({currentReport.academicYear})
                  </h3>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2937] hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer self-start"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak E-Raport Resmi</span>
                </button>
              </div>

              {/* Physical Growth & Tahfidz Highlight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" /> Capaian Tahfidz Juz 30 & Doa
                  </div>
                  <p className="text-xs text-slate-800 font-semibold mt-2 leading-relaxed">
                    {currentReport.tahfidzProgress}
                  </p>
                </div>

                <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-[#006699] font-extrabold text-xs uppercase tracking-wider">
                    <Heart className="w-4 h-4" /> Pertumbuhan Fisik & Kesehatan
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Tinggi Badan</span>
                      <strong className="text-slate-900 text-sm">{currentReport.heightCm} cm</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Berat Badan</span>
                      <strong className="text-slate-900 text-sm">{currentReport.weightKg} kg</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" /> Rekapitulasi Kehadiran
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Hadir</span>
                      <strong className="text-emerald-700 text-sm">{currentReport.attendance.hadir ?? currentReport.attendance.present ?? 56} hr</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Sakit</span>
                      <strong className="text-slate-800 text-sm">{currentReport.attendance.sakit ?? currentReport.attendance.sick ?? 0} hr</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Izin</span>
                      <strong className="text-slate-800 text-sm">{currentReport.attendance.izin ?? currentReport.attendance.permit ?? 1} hr</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 Aspects Evaluation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Array.isArray(currentReport.aspects)
                  ? currentReport.aspects
                  : Object.entries(currentReport.aspects || {}).map(([key, val]: [string, any]) => ({
                      aspect: val?.ratingLabel || key,
                      rating: val?.rating || 'BSB',
                      description: val?.description || val?.evidenceNotes || '',
                    }))
                ).map((aspect: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-extrabold text-slate-900">
                        0{idx + 1}. {aspect.aspect}
                      </span>
                      {renderRatingBadge(aspect.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{aspect.description}</p>
                  </div>
                ))}
              </div>

              {/* Homeroom Teacher Note */}
              <div className="bg-[#F3F1EC] border-l-4 border-[#006699] p-4 rounded-r-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699] block">
                  Catatan & Apresiasi Wali Kelas ({currentReport.teacherName})
                </span>
                <p className="text-xs sm:text-sm text-slate-800 italic mt-1 leading-relaxed">
                  â€œ{currentReport.teacherNote || currentReport.teacherNotes}â€
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: MENU GIZI HARIAN & AGENDA PEKANAN SANTRI */}
          {activeTab === 'jadwal' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Healthy Catering Menu */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Jadwal Menu Katering Sehat & Kudapan (Non-MSG)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Disiapkan higienis setiap pagi untuk mendukung gizi & konsentrasi santri
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { day: 'Senin', snack: 'Bubur Kacang Hijau & Kurma', lunch: 'Sup Ayam Kampung Wortel, Tahu Kukus & Buah Pisang' },
                    { day: 'Selasa', snack: 'Puding Susu Kurma & Apel', lunch: 'Nasi Tim Ikan Dori Fillet, Sayur Bening Bayam & Pepaya' },
                    { day: 'Rabu', snack: 'Roti Gandum Panggang Keju', lunch: 'Soto Ayam Bening Non-MSG, Telur Rebus & Jeruk Manis' },
                    { day: 'Kamis', snack: 'Jagung Manis Pipil Keju Susu', lunch: 'Rolade Daging Sapi Homemade, Capcay Sayur Segar & Semangka' },
                    { day: 'Jumat', snack: 'Susu Segar & Biskuit Gandum', lunch: 'Jumat Berkah: Berbagi Bekal Sehat & Buah Potong Bersama' },
                  ].map((item) => (
                    <div key={item.day} className="py-3 flex items-start gap-3">
                      <span className="w-16 font-extrabold text-[#006699] shrink-0">{item.day}</span>
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900">{item.lunch}</p>
                        <p className="text-slate-500">Kudapan Pagi (09.15 WIB): {item.snack}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic & Character Habit Agenda */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#006699] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Agenda Pembiasaan Karakter & Seragam Harian
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Panduan seragam dan kegiatan tematik santri TK Lukman Hakim
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { day: 'Senin', uniform: 'Seragam Biru-Putih Khas Yayasan', activity: 'Upacara Ceria, Ikrar Santri, Sholat Dhuha & Sentra Persiapan' },
                    { day: 'Selasa', uniform: 'Seragam Batik Khas TK Lukman Hakim', activity: 'Halaqah Tahfidz Tilawati, Sentra Balok & Konstruksi' },
                    { day: 'Rabu', uniform: 'Seragam Kaos Olahraga & Eksplorasi', activity: 'Senam Irama Pagi, Taman Lalu Lintas & Eksplorasi Kebun Merpati' },
                    { day: 'Kamis', uniform: 'Seragam Kotak-Kotak / Cambridge', activity: 'Cambridge Fun English, Show & Tell, & Sains Eksperimen' },
                    { day: 'Jumat', uniform: 'Busana Muslim / Muslimah Putih-Putih', activity: 'Praktik Wudhu & Sholat Berjamaah, Kisah Nabawiyah & Infaq Jumat' },
                  ].map((item) => (
                    <div key={item.day} className="py-3 flex items-start gap-3">
                      <span className="w-16 font-extrabold text-emerald-800 shrink-0">{item.day}</span>
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900">{item.uniform}</p>
                        <p className="text-slate-600">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
