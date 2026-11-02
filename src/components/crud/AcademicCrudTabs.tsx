import React, { useState } from 'react';
import { TuitionBill, StudentReport, Inquiry, AspectRating } from '../../types';
import { RATING_LABELS } from '../../context/AppContext';
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle,
  X,
  MessageCircle,
} from 'lucide-react';

// ==================== 1. SPP DIGITAL (TUITION) CRUD TAB ====================
interface TuitionCrudTabProps {
  tuitionBills: TuitionBill[];
  addTuitionBill: (bill: Omit<TuitionBill, 'id'>) => void;
  updateTuitionBill: (id: string, updated: Partial<TuitionBill>) => void;
  deleteTuitionBill: (id: string) => void;
  payTuitionBill: (id: string, method?: TuitionBill['paymentMethod']) => void;
  onNotify: (msg: string) => void;
}

export const TuitionCrudTab: React.FC<TuitionCrudTabProps> = ({
  tuitionBills,
  addTuitionBill,
  updateTuitionBill,
  deleteTuitionBill,
  payTuitionBill,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Lunas' | 'Belum Lunas'>('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [nis, setNis] = useState('2025005');
  const [studentName, setStudentName] = useState('');
  const [classGroup, setClassGroup] = useState('TK A - Al-Kautsar');
  const [month, setMonth] = useState('Maret');
  const [year, setYear] = useState(2025);
  const [tuitionFee, setTuitionFee] = useState(350000);
  const [cateringFee, setCateringFee] = useState(150000);
  const [activityFee, setActivityFee] = useState(50000);
  const [status, setStatus] = useState<TuitionBill['status']>('Belum Lunas');
  const [paymentMethod, setPaymentMethod] = useState<TuitionBill['paymentMethod']>('QRIS');

  const resetForm = () => {
    setEditingId(null);
    setNis(`202500${tuitionBills.length + 1}`);
    setStudentName('');
    setClassGroup('TK A - Al-Kautsar');
    setMonth('Maret');
    setYear(2025);
    setTuitionFee(350000);
    setCateringFee(150000);
    setActivityFee(50000);
    setStatus('Belum Lunas');
    setPaymentMethod('QRIS');
    setIsFormOpen(false);
  };

  const handleEditClick = (bill: TuitionBill) => {
    setEditingId(bill.id);
    setNis(bill.nis);
    setStudentName(bill.studentName);
    setClassGroup(bill.classGroup);
    setMonth(bill.month);
    setYear(bill.year);
    setTuitionFee(bill.tuitionFee);
    setCateringFee(bill.cateringFee);
    setActivityFee(bill.activityFee);
    setStatus(bill.status);
    setPaymentMethod(bill.paymentMethod || 'QRIS');
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !nis.trim()) return;
    const totalAmount = Number(tuitionFee) + Number(cateringFee) + Number(activityFee);
    const nowStr = `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    if (editingId) {
      updateTuitionBill(editingId, {
        nis,
        studentName,
        classGroup,
        month,
        year: Number(year),
        tuitionFee: Number(tuitionFee),
        cateringFee: Number(cateringFee),
        activityFee: Number(activityFee),
        totalAmount,
        status,
        paymentMethod: status === 'Lunas' ? paymentMethod : undefined,
        paidAt: status === 'Lunas' ? nowStr : undefined,
        receiptNumber:
          status === 'Lunas'
            ? `KW-LHP-${year}-${Math.floor(100 + Math.random() * 900)}`
            : undefined,
      });
      onNotify(`Data tagihan SPP ${studentName} (${month} ${year}) berhasil diperbarui!`);
    } else {
      addTuitionBill({
        studentId: `std_${Date.now()}`,
        nis,
        studentName,
        classGroup,
        month,
        year: Number(year),
        tuitionFee: Number(tuitionFee),
        cateringFee: Number(cateringFee),
        activityFee: Number(activityFee),
        totalAmount,
        status,
        paymentMethod: status === 'Lunas' ? paymentMethod : undefined,
        paidAt: status === 'Lunas' ? nowStr : undefined,
        receiptNumber:
          status === 'Lunas'
            ? `KW-LHP-${year}-${Math.floor(100 + Math.random() * 900)}`
            : undefined,
      });
      onNotify(`Tagihan SPP baru untuk ${studentName} berhasil ditambahkan!`);
    }
    resetForm();
  };

  const filteredBills = tuitionBills.filter((b) => {
    const matchesSearch =
      b.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.classGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.month.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLunas = tuitionBills
    .filter((b) => b.status === 'Lunas')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTunggakan = tuitionBills
    .filter((b) => b.status === 'Belum Lunas')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD Tagihan & Pembayaran SPP Digital</h4>
          <p className="text-xs text-slate-500">
            Tambah tagihan bulanan, ubah rincian biaya, verifikasi pelunasan QRIS/VA Bank, atau hapus tagihan.
          </p>
        </div>
        <button
          onClick={() => {
            if (isFormOpen && !editingId) {
              setIsFormOpen(false);
            } else {
              resetForm();
              setIsFormOpen(true);
            }
          }}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah Tagihan SPP'}</span>
        </button>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block">Total Data Tagihan</span>
          <span className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
            {tuitionBills.length} Tagihan
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block">Total Terbayar (Lunas)</span>
          <span className="text-lg font-extrabold text-emerald-700 font-mono tabular-nums">
            Rp {totalLunas.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block">Menunggu Pembayaran</span>
          <span className="text-lg font-extrabold text-amber-700 font-mono tabular-nums">
            Rp {totalTunggakan.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Create / Edit Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-sky-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="font-bold text-xs text-sky-800">
              {editingId ? 'Edit Data Tagihan SPP Siswa' : 'Buat Tagihan SPP Bulanan Baru'}
            </h5>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">NIS Siswa *</label>
              <input
                type="text"
                required
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                placeholder="2025001"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Muhammad Fatih Al-Farisi"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Kelompok Kelas *</label>
              <select
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Playgroup - Bintang Kecil">Playgroup - Bintang Kecil</option>
                <option value="TK A - Al-Kautsar">TK A - Al-Kautsar</option>
                <option value="TK B - Ar-Rahman">TK B - Ar-Rahman</option>
                <option value="Tahfidz Cilik - Al-Hafidz">Tahfidz Cilik - Al-Hafidz</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bulan</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                {[
                  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tahun</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">SPP Pokok (Rp)</label>
              <input
                type="number"
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Katering (Rp)</label>
              <input
                type="number"
                value={cateringFee}
                onChange={(e) => setCateringFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Kegiatan (Rp)</label>
              <input
                type="number"
                value={activityFee}
                onChange={(e) => setActivityFee(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end text-xs pt-1">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Status Pembayaran</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TuitionBill['status'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Lunas">Lunas</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="QRIS">QRIS</option>
                <option value="BSI Virtual Account">BSI Virtual Account</option>
                <option value="Bank Mandiri">Bank Mandiri</option>
                <option value="Bank BRI">Bank BRI</option>
                <option value="BCA">BCA</option>
              </select>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Total Tagihan:</span>
                <strong className="text-sm font-mono text-emerald-700">
                  Rp {(Number(tuitionFee) + Number(cateringFee) + Number(activityFee)).toLocaleString('id-ID')}
                </strong>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer"
              >
                {editingId ? 'Simpan Perubahan' : 'Simpan Tagihan'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, NIS, kelas, atau bulan..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start">
          {(['ALL', 'Lunas', 'Belum Lunas'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">NIS</th>
                <th className="p-3">Nama Siswa & Kelas</th>
                <th className="p-3">Periode</th>
                <th className="p-3 text-right">Total Tagihan</th>
                <th className="p-3">Status</th>
                <th className="p-3">Kuitansi</th>
                <th className="p-3 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    Tidak ada data tagihan SPP yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-800 tabular-nums">{bill.nis}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{bill.studentName}</span>
                      <span className="text-[11px] text-slate-500">{bill.classGroup}</span>
                    </td>
                    <td className="p-3 whitespace-nowrap">{bill.month} {bill.year}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                      Rp {bill.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-bold text-xs ${
                          bill.status === 'Lunas' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono text-[11px] tabular-nums">
                      {bill.receiptNumber || '-'}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      {confirmDeleteId === bill.id ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              deleteTuitionBill(bill.id);
                              setConfirmDeleteId(null);
                              onNotify(`Tagihan SPP ${bill.studentName} telah dihapus.`);
                            }}
                            className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Ya, Hapus
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          {bill.status === 'Belum Lunas' && (
                            <button
                              onClick={() => {
                                payTuitionBill(bill.id, 'QRIS');
                                onNotify(`Tagihan SPP ${bill.studentName} diverifikasi Lunas!`);
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] transition cursor-pointer"
                            >
                              Lunas
                            </button>
                          )}
                          <button
                            onClick={() => handleEditClick(bill)}
                            className="p-1.5 text-sky-700 hover:bg-sky-50 rounded transition cursor-pointer"
                            title="Edit Tagihan"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(bill.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                            title="Hapus Tagihan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== 2. E-RAPORT SISWA CRUD TAB ====================
interface ReportsCrudTabProps {
  reports: StudentReport[];
  addReport: (report: Omit<StudentReport, 'id'>) => void;
  updateReport: (id: string, updated: Partial<StudentReport>) => void;
  deleteReport: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const ReportsCrudTab: React.FC<ReportsCrudTabProps> = ({
  reports,
  addReport,
  updateReport,
  deleteReport,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [nis, setNis] = useState('2025005');
  const [studentName, setStudentName] = useState('');
  const [classGroup, setClassGroup] = useState('TK A - Al-Kautsar');
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  const [academicYear, setAcademicYear] = useState('2025/2026');
  const [teacherName, setTeacherName] = useState('Ustadzah Annisa Dwi Lestari, S.Psi.');
  const [religiousMoral, setReligiousMoral] = useState<AspectRating>('BSB');
  const [motorSkills, setMotorSkills] = useState<AspectRating>('BSH');
  const [cognitive, setCognitive] = useState<AspectRating>('BSB');
  const [language, setLanguage] = useState<AspectRating>('BSH');
  const [socialEmotional, setSocialEmotional] = useState<AspectRating>('BSB');
  const [arts, setArts] = useState<AspectRating>('BSB');
  const [presentDays, setPresentDays] = useState(95);
  const [sickDays, setSickDays] = useState(1);
  const [permitDays, setPermitDays] = useState(1);
  const [teacherNotes, setTeacherNotes] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const resetForm = () => {
    setEditingId(null);
    setNis(`202500${reports.length + 1}`);
    setStudentName('');
    setClassGroup('TK A - Al-Kautsar');
    setSemester('Ganjil');
    setAcademicYear('2025/2026');
    setTeacherName('Ustadzah Annisa Dwi Lestari, S.Psi.');
    setReligiousMoral('BSB');
    setMotorSkills('BSH');
    setCognitive('BSB');
    setLanguage('BSH');
    setSocialEmotional('BSB');
    setArts('BSB');
    setPresentDays(95);
    setSickDays(1);
    setPermitDays(1);
    setTeacherNotes('');
    setIsPublished(true);
    setIsFormOpen(false);
  };

  const handleEditClick = (rep: StudentReport) => {
    setEditingId(rep.id);
    setNis(rep.nis);
    setStudentName(rep.studentName);
    setClassGroup(rep.classGroup);
    setSemester(rep.semester);
    setAcademicYear(rep.academicYear);
    setTeacherName(rep.teacherName);
    setReligiousMoral(rep.aspects.religiousMoral.rating);
    setMotorSkills(rep.aspects.motorSkills.rating);
    setCognitive(rep.aspects.cognitive.rating);
    setLanguage(rep.aspects.language.rating);
    setSocialEmotional(rep.aspects.socialEmotional.rating);
    setArts(rep.aspects.arts.rating);
    setPresentDays(rep.attendance.present);
    setSickDays(rep.attendance.sick);
    setPermitDays(rep.attendance.permit);
    setTeacherNotes(rep.teacherNotes);
    setIsPublished(rep.isPublished);
    setIsFormOpen(true);
  };

  const buildAspect = (rating: AspectRating, defaultDesc: string) => ({
    rating,
    ratingLabel: RATING_LABELS[rating],
    description: defaultDesc,
    evidenceNotes: 'Terdokumentasi pada portofolio harian santri.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !nis.trim()) return;

    const aspectsPayload = {
      religiousMoral: buildAspect(religiousMoral, 'Capaian nilai agama, doa harian, dan akhlak mulia.'),
      motorSkills: buildAspect(motorSkills, 'Perkembangan fisik motorik kasar dan halus.'),
      cognitive: buildAspect(cognitive, 'Kemampuan berpikir logis, berhitung, dan eksplorasi sains.'),
      language: buildAspect(language, 'Kemampuan berbahasa santun, kosakata, dan keaksaraan awal.'),
      socialEmotional: buildAspect(socialEmotional, 'Kemandirian, kedisiplinan, dan empati bersama teman.'),
      arts: buildAspect(arts, 'Kreativitas seni, irama, dan imajinasi karya.'),
    };

    if (editingId) {
      updateReport(editingId, {
        nis,
        studentName,
        classGroup,
        semester,
        academicYear,
        teacherName,
        aspects: aspectsPayload,
        attendance: {
          present: Number(presentDays) || 0,
          sick: Number(sickDays) || 0,
          permit: Number(permitDays) || 0,
          absent: 0,
        },
        teacherNotes:
          teacherNotes ||
          `Alhamdulillah, Ananda ${studentName} menunjukkan perkembangan karakter dan semangat belajar yang sangat baik.`,
        isPublished,
      });
      onNotify(`E-Raport Ananda ${studentName} berhasil diperbarui!`);
    } else {
      addReport({
        studentId: `std_${Date.now()}`,
        nis,
        studentName,
        classGroup,
        semester,
        academicYear,
        teacherName,
        aspects: aspectsPayload,
        attendance: {
          present: Number(presentDays) || 95,
          sick: Number(sickDays) || 0,
          permit: Number(permitDays) || 0,
          absent: 0,
        },
        teacherNotes:
          teacherNotes ||
          `Alhamdulillah, Ananda ${studentName} tumbuh menjadi anak yang sholeh, mandiri, dan antusias belajar.`,
        publishedAt: new Date().toISOString().split('T')[0],
        isPublished,
      });
      onNotify(`E-Raport baru untuk Ananda ${studentName} berhasil diterbitkan!`);
    }
    resetForm();
  };

  const filteredReports = reports.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.classGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD E-Raport Kurikulum Merdeka PAUD</h4>
          <p className="text-xs text-slate-500">
            Tambah rapor semester baru, edit capaian 6 aspek perkembangan anak, atau hapus data rapor.
          </p>
        </div>
        <button
          onClick={() => {
            if (isFormOpen && !editingId) {
              setIsFormOpen(false);
            } else {
              resetForm();
              setIsFormOpen(true);
            }
          }}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah E-Raport Siswa'}</span>
        </button>
      </div>

      {/* Create / Edit Report Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-sky-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="font-bold text-xs text-sky-800">
              {editingId ? `Edit E-Raport: ${studentName}` : 'Tambah E-Raport Semester Baru'}
            </h5>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">NIS Siswa *</label>
              <input
                type="text"
                required
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Nama lengkap santri"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Kelompok Kelas</label>
              <select
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Playgroup - Bintang Kecil">Playgroup - Bintang Kecil</option>
                <option value="TK A - Al-Kautsar">TK A - Al-Kautsar</option>
                <option value="TK B - Ar-Rahman">TK B - Ar-Rahman</option>
                <option value="Tahfidz Cilik - Al-Hafidz">Tahfidz Cilik - Al-Hafidz</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as 'Ganjil' | 'Genap')}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Wali Kelas</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* 6 Developmental Aspects */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Capaian 6 Aspek Perkembangan (BSB = Berkembang Sangat Baik, BSH = Sesuai Harapan, MB = Mulai Berkembang, BB = Belum Berkembang)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-xs">
              {[
                { label: 'Agama & Moral', val: religiousMoral, set: setReligiousMoral },
                { label: 'Fisik Motorik', val: motorSkills, set: setMotorSkills },
                { label: 'Kognitif', val: cognitive, set: setCognitive },
                { label: 'Bahasa', val: language, set: setLanguage },
                { label: 'Sosial Emosi', val: socialEmotional, set: setSocialEmotional },
                { label: 'Seni & Karya', val: arts, set: setArts },
              ].map((asp) => (
                <div key={asp.label}>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">{asp.label}</label>
                  <select
                    value={asp.val}
                    onChange={(e) => asp.set(e.target.value as AspectRating)}
                    className="w-full bg-white border border-slate-300 rounded-md p-1.5 font-bold text-slate-800"
                  >
                    <option value="BSB">BSB</option>
                    <option value="BSH">BSH</option>
                    <option value="MB">MB</option>
                    <option value="BB">BB</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Hadir (Hari)</label>
              <input
                type="number"
                value={presentDays}
                onChange={(e) => setPresentDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Sakit / Izin (Hari)</label>
              <input
                type="number"
                value={sickDays}
                onChange={(e) => setSickDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Catatan Wali Kelas *</label>
              <input
                type="text"
                required
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                placeholder="Narasi perkembangan dan apresiasi untuk ananda..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              {editingId ? 'Simpan Perubahan E-Raport' : 'Simpan & Terbitkan E-Raport'}
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari rapor berdasarkan nama siswa, NIS, atau kelompok kelas..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((rep) => (
          <div key={rep.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
              <div>
                <h5 className="font-extrabold text-sm text-slate-900">{rep.studentName}</h5>
                <p className="text-xs text-slate-500 font-mono tabular-nums">
                  NIS {rep.nis} · {rep.classGroup} · Sem {rep.semester} ({rep.academicYear})
                </p>
              </div>
              <div className="flex items-center gap-1">
                {confirmDeleteId === rep.id ? (
                  <>
                    <button
                      onClick={() => {
                        deleteReport(rep.id);
                        setConfirmDeleteId(null);
                        onNotify(`E-Raport ${rep.studentName} telah dihapus.`);
                      }}
                      className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] cursor-pointer"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(rep)}
                      className="p-1.5 text-sky-700 hover:bg-sky-50 rounded transition cursor-pointer"
                      title="Edit E-Raport"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(rep.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                      title="Hapus E-Raport"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Agama & Moral</span>
                <strong className="text-emerald-700">{rep.aspects.religiousMoral.rating}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Fisik Motorik</span>
                <strong className="text-sky-700">{rep.aspects.motorSkills.rating}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Kognitif</span>
                <strong className="text-sky-700">{rep.aspects.cognitive.rating}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Bahasa</span>
                <strong className="text-sky-700">{rep.aspects.language.rating}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Sosial Emosi</span>
                <strong className="text-emerald-700">{rep.aspects.socialEmotional.rating}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Seni & Karya</span>
                <strong className="text-sky-700">{rep.aspects.arts.rating}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              &ldquo;{rep.teacherNotes}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 3. BUKU TAMU & KONSULTASI (INQUIRIES) CRUD TAB ====================
interface InquiriesCrudTabProps {
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<Inquiry>;
  updateInquiry: (id: string, updated: Partial<Inquiry>) => void;
  deleteInquiry: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const InquiriesCrudTab: React.FC<InquiriesCrudTabProps> = ({
  inquiries,
  addInquiry,
  updateInquiry,
  deleteInquiry,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [childAge, setChildAge] = useState('4 Tahun');
  const [interest, setInterest] = useState('Informasi PPDB & Kunjungan Sekolah');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPhone('');
    setChildAge('4 Tahun');
    setInterest('Informasi PPDB & Kunjungan Sekolah');
    setMessage('');
    setIsFormOpen(false);
  };

  const handleEditClick = (inq: Inquiry) => {
    setEditingId(inq.id);
    setName(inq.name);
    setPhone(inq.phone);
    setChildAge(inq.childAge || '4 Tahun');
    setInterest(inq.interest);
    setMessage(inq.message);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    if (editingId) {
      updateInquiry(editingId, {
        name,
        phone,
        childAge,
        interest,
        message,
      });
      onNotify(`Data konsultasi ${name} berhasil diperbarui!`);
    } else {
      await addInquiry({
        name,
        phone,
        childAge,
        interest,
        message,
      });
      onNotify(`Catatan buku tamu / konsultasi baru (${name}) berhasil ditambahkan!`);
    }
    resetForm();
  };

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.interest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD Buku Tamu & Konsultasi Orang Tua</h4>
          <p className="text-xs text-slate-500">
            Kelola daftar pertanyaan orang tua, jadwal survei lokasi sekolah, dan riwayat tindak lanjut admin.
          </p>
        </div>
        <button
          onClick={() => {
            if (isFormOpen && !editingId) {
              setIsFormOpen(false);
            } else {
              resetForm();
              setIsFormOpen(true);
            }
          }}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah Tamu / Konsultasi'}</span>
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-sky-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="font-bold text-xs text-sky-800">
              {editingId ? `Edit Konsultasi: ${name}` : 'Catat Konsultasi / Buku Tamu Baru'}
            </h5>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Orang Tua *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ibu / Bapak..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Usia Anak</label>
              <input
                type="text"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="4.5 Tahun"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Topik Minat *</label>
              <input
                type="text"
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="Pendaftaran TK A / Trial Class"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-slate-700 block mb-1">Pesan / Catatan Tindak Lanjut *</label>
            <textarea
              rows={2}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detail pertanyaan atau jadwal kunjungan..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              {editingId ? 'Simpan Perubahan' : 'Simpan Data Konsultasi'}
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama orang tua, nomor WA, topik minat, atau isi pesan..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Waktu</th>
                <th className="p-3">Nama Orang Tua & WA</th>
                <th className="p-3">Usia Anak</th>
                <th className="p-3">Topik Minat</th>
                <th className="p-3">Pesan / Catatan</th>
                <th className="p-3 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    Belum ada data konsultasi yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500 whitespace-nowrap tabular-nums">
                      {inq.createdAt}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <a
                        href={`https://wa.me/62${inq.phone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-mono text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <MessageCircle className="w-3 h-3" /> {inq.phone}
                      </a>
                    </td>
                    <td className="p-3 text-slate-700">{inq.childAge || '-'}</td>
                    <td className="p-3 font-semibold text-sky-800">{inq.interest}</td>
                    <td className="p-3 text-slate-600 max-w-xs">{inq.message}</td>
                    <td className="p-3 text-right whitespace-nowrap">
                      {confirmDeleteId === inq.id ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              deleteInquiry(inq.id);
                              setConfirmDeleteId(null);
                              onNotify(`Data konsultasi ${inq.name} telah dihapus.`);
                            }}
                            className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Ya, Hapus
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(inq)}
                            className="p-1.5 text-sky-700 hover:bg-sky-50 rounded transition cursor-pointer"
                            title="Edit Konsultasi"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(inq.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                            title="Hapus Konsultasi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
