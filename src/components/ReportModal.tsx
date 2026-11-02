import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentReport, AspectRating } from '../types';
import {
  GraduationCap,
  X,
  Search,
  Printer,
  Award,
  Calendar,
  BookOpen,
  Heart,
  CheckCircle,
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const { reports } = useApp();
  const [searchNis, setSearchNis] = useState('2024001');

  if (!isOpen) return null;

  const currentReport =
    reports.find((r) => r.nis === searchNis || r.studentName.toLowerCase().includes(searchNis.toLowerCase())) ||
    reports[0];

  const getRatingBadge = (rating: AspectRating) => {
    switch (rating) {
      case 'BSB':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">BSB (Sangat Baik ⭐⭐⭐⭐)</span>;
      case 'BSH':
        return <span className="bg-sky-100 text-sky-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">BSH (Sesuai Harapan ⭐⭐⭐)</span>;
      case 'MB':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">MB (Mulai Berkembang ⭐⭐)</span>;
      case 'BB':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">BB (Perlu Bimbingan ⭐)</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#1a4a62] text-white p-5 flex items-center justify-between border-b border-sky-600/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-300/40 flex items-center justify-center text-sky-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Pengumuman E-Raport & Hasil Belajar Siswa</h3>
              <p className="text-xs text-sky-200">Kurikulum Merdeka PAUD • TK Lukman Hakim Purwokerto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NIS Search & Sample Buttons */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Masukkan NIS:</span>
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                value={searchNis}
                onChange={(e) => setSearchNis(e.target.value)}
                placeholder="contoh: 2024001"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] overflow-x-auto w-full sm:w-auto">
            <span className="text-slate-400 font-semibold whitespace-nowrap">Pilih Siswa:</span>
            {reports.map((r) => (
              <button
                key={r.id}
                onClick={() => setSearchNis(r.nis)}
                className={`px-2.5 py-1 rounded-md border font-medium transition ${
                  searchNis === r.nis
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {r.studentName.split(' ')[0]} ({r.nis})
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Authentic PAUD Report Card */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white space-y-6">
          {currentReport ? (
            <div className="space-y-6 print:p-0">
              {/* Report Header Letterhead */}
              <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-sm">
                    LAPORAN CAPAIAN PEMBELAJARAN SISWA (E-RAPORT PAUD)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {currentReport.studentName}
                  </h2>
                  <p className="text-xs text-slate-600">
                    NIS: <strong>{currentReport.nis}</strong> • Kelompok: <strong>{currentReport.classGroup}</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right text-xs space-y-0.5">
                  <p className="text-slate-500">Semester / Tahun Ajaran:</p>
                  <p className="font-bold text-slate-900 text-sm">
                    {currentReport.semester} • {currentReport.academicYear}
                  </p>
                  <p className="text-slate-500">
                    Wali Kelas: <span className="font-medium text-slate-800">{currentReport.teacherName}</span>
                  </p>
                </div>
              </div>

              {/* 6 Aspects of Development Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600" />
                  Capaian Elemen Perkembangan Anak Usia Dini
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. Nilai Agama & Moral */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        1. Nilai Agama & Budi Pekerti
                      </span>
                      {getRatingBadge(currentReport.aspects.religiousMoral.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.religiousMoral.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.religiousMoral.evidenceNotes}
                    </div>
                  </div>

                  {/* 2. Fisik Motorik */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        2. Fisik & Motorik (Kasar & Halus)
                      </span>
                      {getRatingBadge(currentReport.aspects.motorSkills.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.motorSkills.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.motorSkills.evidenceNotes}
                    </div>
                  </div>

                  {/* 3. Kognitif */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        3. Kognitif & Eksplorasi Sains
                      </span>
                      {getRatingBadge(currentReport.aspects.cognitive.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.cognitive.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.cognitive.evidenceNotes}
                    </div>
                  </div>

                  {/* 4. Bahasa */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        4. Bahasa & Komunikasi Interaktif
                      </span>
                      {getRatingBadge(currentReport.aspects.language.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.language.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.language.evidenceNotes}
                    </div>
                  </div>

                  {/* 5. Sosial Emosional */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        5. Sosial-Emosional & Kemandirian
                      </span>
                      {getRatingBadge(currentReport.aspects.socialEmotional.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.socialEmotional.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.socialEmotional.evidenceNotes}
                    </div>
                  </div>

                  {/* 6. Seni */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-sky-900">
                        6. Seni, Musik & Kreativitas
                      </span>
                      {getRatingBadge(currentReport.aspects.arts.rating)}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {currentReport.aspects.arts.description}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                      Bukti Perilaku: {currentReport.aspects.arts.evidenceNotes}
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance & Teacher Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 text-xs space-y-2">
                  <h5 className="font-bold text-slate-700 uppercase tracking-wider">
                    Rekapitulasi Kehadiran
                  </h5>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Hadir:</span>
                      <span className="font-bold text-emerald-700">{currentReport.attendance.present} Hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sakit:</span>
                      <span className="font-medium text-amber-700">{currentReport.attendance.sick} Hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Izin:</span>
                      <span className="font-medium text-sky-700">{currentReport.attendance.permit} Hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tanpa Keterangan:</span>
                      <span className="font-medium text-slate-500">{currentReport.attendance.absent} Hari</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 border border-slate-200 rounded-2xl p-4 bg-sky-50/40 text-xs space-y-2">
                  <h5 className="font-bold text-sky-900 uppercase tracking-wider">
                    Catatan & Pesan Guru Wali Kelas
                  </h5>
                  <p className="text-slate-700 italic leading-relaxed text-sm">
                    &ldquo;{currentReport.teacherNotes}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak E-Raport (PDF)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-500">
              Data raport tidak ditemukan untuk NIS tersebut.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
