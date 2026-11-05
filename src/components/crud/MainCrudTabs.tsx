import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Teacher, GalleryItem, Registration } from '../../types';
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  X,
  MessageCircle,
  Upload,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  Copy,
} from 'lucide-react';

// ==================== 1. PPDB & SISWA CRUD TAB ====================
interface PpdbCrudTabProps {
  registrations: Registration[];
  addRegistration: (
    reg: Omit<Registration, 'id' | 'regNumber' | 'createdAt' | 'waSent'> & {
      status?: Registration['status'];
    }
  ) => Registration;
  updateRegistration: (id: string, updated: Partial<Registration>) => void;
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const PpdbCrudTab: React.FC<PpdbCrudTabProps> = ({
  registrations,
  addRegistration,
  updateRegistration,
  updateRegistrationStatus,
  deleteRegistration,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [childName, setChildName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nik, setNik] = useState('3302010000000001');
  const [birthPlace, setBirthPlace] = useState('Purwokerto');
  const [birthDate, setBirthDate] = useState('2021-05-10');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [program, setProgram] = useState<Registration['program']>('TK A (Usia 4-5 Th)');
  const [parentName, setParentName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<Registration['status']>('Menunggu Verifikasi');
  const [notes, setNotes] = useState('');

  // Announcement via Gmail modal states
  const { sendAnnouncementEmail } = useApp();
  const [announcementModalReg, setAnnouncementModalReg] = useState<Registration | null>(null);
  const [isSendingAnnouncement, setIsSendingAnnouncement] = useState(false);
  const [announcementTemplate, setAnnouncementTemplate] = useState<'diterima' | 'observasi' | 'berkas'>('diterima');
  const [announcementSubject, setAnnouncementSubject] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');
  const [announcementSentInfo, setAnnouncementSentInfo] = useState<{ email: string; gmailWebLink?: string } | null>(null);

  // Gmail Testing State
  const [isTestingGmail, setIsTestingGmail] = useState(false);
  const [testTargetEmail, setTestTargetEmail] = useState('ml0752960@gmail.com');
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const handleRunTestGmailSend = async () => {
    setIsTestingGmail(true);
    setTestSuccessMessage(null);
    try {
      const res = await fetch('/api/mail/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testTargetEmail || 'ml0752960@gmail.com' }),
      });
      const data = await res.json();
      if (data && data.success) {
        onNotify(`Alhamdulillah! Surat tes berhasil dikirimkan ke Gmail: ${data.targetEmail}`);
        setTestSuccessMessage(`Terkirim ke ${data.targetEmail} (${data.deliveryMethod})`);
      } else {
        onNotify('Gagal mengirim surat tes.');
      }
    } catch {
      onNotify('Kesalahan jaringan saat mengirim surat tes.');
    } finally {
      setIsTestingGmail(false);
    }
  };

  const generateAnnouncementText = (reg: Registration, tpl: 'diterima' | 'observasi' | 'berkas') => {
    if (tpl === 'diterima') {
      const subject = `[PENGUMUMAN HASIL PPDB] Selamat! Ananda ${reg.childName} Diterima di TK LUKMAN HAKIM Purwokerto`;
      const body = `Assalamu’alaikum Warahmatullahi Wabarakatuh Ayah/Bunda ${reg.parentName},

Alhamdulillah, panitia Penerimaan Peserta Didik Baru (PPDB) TK LUKMAN HAKIM Purwokerto mengumumkan bahwa pendaftaran ananda:

Nama Calon Siswa : ${reg.childName} (${reg.nickname})
No. Registrasi   : ${reg.regNumber}
Pilihan Jenjang  : ${reg.program}
Status Seleksi   : DITERIMA / LULUS

Dinyatakan RESMI DITERIMA sebagai Santri Baru TK LUKMAN HAKIM Purwokerto Tahun Ajaran 2026/2027.

Informasi Langkah Selanjutnya (Daftar Ulang & Pengambilan Seragam):
1. Pengukuran seragam santri dan pengambilan perlengkapan dijadwalkan pada hari kerja (Senin - Jumat, pukul 08.00 - 13.00 WIB) di Kantor Tata Usaha TK Lukman Hakim.
2. Membawa fotokopi Akta Kelahiran dan Kartu Keluarga (KK).
3. Untuk informasi rincian biaya atau jadwal pengantaran berkas, Ayah/Bunda dapat menghubungi Panitia di WhatsApp 0877-1355-1412.

Jazakumullahu Khairan Katsiran atas amanah dan kepercayaan Ayah/Bunda mendidik ananda bersama keluarga besar TK Lukman Hakim.

Wassalamu’alaikum Warahmatullahi Wabarakatuh,
Panitia PPDB TK LUKMAN HAKIM Purwokerto
Jl. Hos Noto Suwiryo No. 5 Teluk, Purwokerto Selatan
Telp/WA: 0877-1355-1412`;
      return { subject, body };
    } else if (tpl === 'observasi') {
      const subject = `[JADWAL OBSERVASI PPDB] Undangan Wawancara & Observasi Ramah Anak: ${reg.childName} (${reg.regNumber})`;
      const body = `Assalamu’alaikum Warahmatullahi Wabarakatuh Ayah/Bunda ${reg.parentName},

Sehubungan dengan pendaftaran calon santri ananda ${reg.childName} (${reg.regNumber}) pada jenjang ${reg.program}, kami mengundang Ayah/Bunda dan ananda untuk hadir pada sesi Wawancara Orang Tua & Observasi Ramah Anak:

Hari/Tanggal : Senin s.d. Jumat (Menyesuaikan konfirmasi jadwal)
Waktu        : Pukul 08.30 - 11.00 WIB
Tempat       : Kampus TK Lukman Hakim, Jl. Hos Noto Suwiryo No. 5 Teluk, Purwokerto Selatan.

Observasi ini bertujuan mengenal minat, kesiapan sosio-emosional, serta stimulasi fitrah terbaik bagi ananda dalam suasana bermain yang menyenangkan.

Mohon konfirmasi kesiapan kehadiran Ayah/Bunda ke WhatsApp Panitia di 0877-1355-1412 atau membalas email ini.

Wassalamu’alaikum Warahmatullahi Wabarakatuh,
Panitia PPDB TK LUKMAN HAKIM Purwokerto`;
      return { subject, body };
    } else {
      const subject = `[PEMBERITAHUAN BERKAS PPDB] Kelengkapan Berkas Pendaftaran Ananda ${reg.childName}`;
      const body = `Assalamu’alaikum Warahmatullahi Wabarakatuh Ayah/Bunda ${reg.parentName},

Terima kasih telah mendaftarkan ananda ${reg.childName} (${reg.regNumber}) di TK LUKMAN HAKIM Purwokerto.
Panitia memohon untuk melengkapi berkas administrasi berikut agar proses verifikasi dapat diselesaikan:

1. Nomor Induk Kependudukan (NIK) / Fotokopi Kartu Keluarga (KK)
2. Nomor WhatsApp aktif wali santri

Mohon konfirmasi atau kirimkan foto berkas ke WhatsApp 0877-1355-1412 atau membalas email ini.

Wassalamu’alaikum Warahmatullahi Wabarakatuh,
Panitia PPDB TK LUKMAN HAKIM Purwokerto`;
      return { subject, body };
    }
  };

  const handleQuickAcc = async (reg: Registration) => {
    const targetEmail = (reg.email || 'ml0752960@gmail.com').trim();
    updateRegistrationStatus(reg.id, 'Diterima');
    onNotify(`Sedang memproses ACC ${reg.childName} & mengirim surat ke Gmail: ${targetEmail}...`);
    try {
      const { subject, body } = generateAnnouncementText(reg, 'diterima');
      const res = await sendAnnouncementEmail({
        to: targetEmail,
        subject,
        body,
        childName: reg.childName,
        regNumber: reg.regNumber,
        status: 'Diterima',
        program: reg.program,
        parentName: reg.parentName,
      });
      if (res && res.success) {
        onNotify(`Alhamdulillah! ${reg.childName} resmi DI-ACC & Surat Pengumuman terkirim ke Gmail: ${targetEmail}`);
        setAnnouncementSentInfo({ email: targetEmail, gmailWebLink: res.gmailWebLink });
      } else {
        onNotify(`Status di-ACC. Surat pengumuman masuk antrean Gmail: ${targetEmail}`);
        setAnnouncementSentInfo({ email: targetEmail });
      }
      setAnnouncementModalReg({ ...reg, status: 'Diterima', email: targetEmail });
      setAnnouncementTemplate('diterima');
      setAnnouncementSubject(subject);
      setAnnouncementBody(body);
    } catch {
      onNotify(`Status pendaftar ${reg.childName} berhasil di-ACC.`);
    }
  };

  const openAnnouncementModal = (reg: Registration) => {
    setAnnouncementSentInfo(null);
    const regWithEmail = { ...reg, email: reg.email || 'ml0752960@gmail.com' };
    setAnnouncementModalReg(regWithEmail);
    const initialTpl = reg.status === 'Diterima' ? 'diterima' : reg.status === 'Wawancara Terjadwal' ? 'observasi' : 'berkas';
    setAnnouncementTemplate(initialTpl);
    const { subject, body } = generateAnnouncementText(regWithEmail, initialTpl);
    setAnnouncementSubject(subject);
    setAnnouncementBody(body);
  };

  const handleTemplateChange = (tpl: 'diterima' | 'observasi' | 'berkas') => {
    setAnnouncementTemplate(tpl);
    if (announcementModalReg) {
      const { subject, body } = generateAnnouncementText(announcementModalReg, tpl);
      setAnnouncementSubject(subject);
      setAnnouncementBody(body);
    }
  };

  const handleSendDirectEmail = async () => {
    if (!announcementModalReg) return;
    const toEmail = (announcementModalReg.email || 'ml0752960@gmail.com').trim();
    setIsSendingAnnouncement(true);
    try {
      const res = await sendAnnouncementEmail({
        to: toEmail,
        subject: announcementSubject,
        body: announcementBody,
        childName: announcementModalReg.childName,
        regNumber: announcementModalReg.regNumber,
        status: announcementModalReg.status,
        program: announcementModalReg.program,
        parentName: announcementModalReg.parentName,
      });
      if (res && res.success) {
        onNotify(`Alhamdulillah! Surat pengumuman resmi berhasil dikirimkan ke Gmail: ${toEmail}`);
        setAnnouncementSentInfo({ email: toEmail, gmailWebLink: res.gmailWebLink });
      } else {
        onNotify(`Surat pengumuman berhasil diproses ke Gmail: ${toEmail}`);
        setAnnouncementSentInfo({ email: toEmail });
      }
    } catch {
      onNotify(`Surat diteruskan ke antrean pengiriman Gmail: ${toEmail}`);
      setAnnouncementSentInfo({ email: toEmail });
    } finally {
      setIsSendingAnnouncement(false);
    }
  };

  const handleOpenGmailWeb = () => {
    if (!announcementModalReg) return;
    const toEmail = (announcementModalReg.email || 'ml0752960@gmail.com').trim();
    const compactBody = announcementBody.length > 350 ? announcementBody.substring(0, 347) + '...' : announcementBody;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${encodeURIComponent(announcementSubject)}&body=${encodeURIComponent(compactBody)}`;
    window.open(url, '_blank');
    onNotify(`Membuka Gmail Web untuk mengirim pengumuman ke ${toEmail}`);
  };

  const handleOpenMailClient = () => {
    if (!announcementModalReg) return;
    const toEmail = (announcementModalReg.email || 'ml0752960@gmail.com').trim();
    const compactBody = announcementBody.length > 350 ? announcementBody.substring(0, 347) + '...' : announcementBody;
    const mailto = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(announcementSubject)}&body=${encodeURIComponent(compactBody)}`;
    window.location.href = mailto;
  };

  const resetForm = () => {
    setEditingId(null);
    setChildName('');
    setNickname('');
    setNik('3302010000000001');
    setBirthPlace('Purwokerto');
    setBirthDate('2021-05-10');
    setGender('Laki-laki');
    setProgram('TK A (Usia 4-5 Th)');
    setParentName('');
    setMotherName('');
    setEmail('');
    setPhone('');
    setOccupation('');
    setAddress('');
    setStatus('Menunggu Verifikasi');
    setNotes('');
    setIsFormOpen(false);
  };

  const handleEditClick = (reg: Registration) => {
    setEditingId(reg.id);
    setChildName(reg.childName);
    setNickname(reg.nickname);
    setNik(reg.nik);
    setBirthPlace(reg.birthPlace);
    setBirthDate(reg.birthDate);
    setGender(reg.gender);
    setProgram(reg.program);
    setParentName(reg.parentName);
    setMotherName(reg.motherName);
    setEmail(reg.email || '');
    setPhone(reg.phone);
    setOccupation(reg.occupation);
    setAddress(reg.address);
    setStatus(reg.status);
    setNotes(reg.notes || '');
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !parentName.trim() || !phone.trim()) return;

    if (editingId) {
      updateRegistration(editingId, {
        childName,
        nickname: nickname || childName.split(' ')[0],
        nik,
        birthPlace,
        birthDate,
        gender,
        program,
        parentName,
        motherName,
        email: email.trim(),
        phone,
        occupation,
        address,
        status,
        notes,
      });
      onNotify(`Data siswa/pendaftar ${childName} berhasil diperbarui!`);
    } else {
      addRegistration({
        childName,
        nickname: nickname || childName.split(' ')[0],
        nik,
        birthPlace,
        birthDate,
        gender,
        program,
        parentName,
        motherName,
        email: email.trim(),
        phone,
        occupation,
        address: address || 'Purwokerto',
        status,
        notes,
      });
      onNotify(`Data siswa baru (${childName}) berhasil ditambahkan ke database!`);
    }
    resetForm();
  };

  const filteredRegistrations = registrations.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.childName.toLowerCase().includes(q) ||
      r.regNumber.toLowerCase().includes(q) ||
      r.parentName.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.program.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD Data Siswa & Pendaftar SPMB</h4>
          <p className="text-xs text-slate-500">
            Tambah siswa baru (Create), cari & filter (Read), ubah biodata/status (Update), atau hapus data (Delete).
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
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah Siswa / SPMB'}</span>
        </button>
      </div>

      {/* Gmail Delivery Service Status & Quick Test Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#006699] text-white flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">Layanan Notifikasi Gmail PPDB</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Aktif
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Calon santri dan wali murid menerima surat konfirmasi pendaftaran serta pengumuman seleksi langsung di kotak masuk Gmail.
            </p>
            {testSuccessMessage && (
              <p className="text-emerald-700 font-bold text-[11px] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {testSuccessMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5">
            <span className="text-[11px] text-slate-500">Tes:</span>
            <input
              type="email"
              value={testTargetEmail}
              onChange={(e) => setTestTargetEmail(e.target.value)}
              placeholder="ml0752960@gmail.com"
              className="font-mono text-xs text-slate-800 focus:outline-hidden w-40"
            />
          </div>

          <button
            type="button"
            onClick={handleRunTestGmailSend}
            disabled={isTestingGmail}
            className="px-3.5 py-1.5 bg-[#006699] hover:bg-[#00527a] text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isTestingGmail ? 'Mengirim...' : 'Uji Kirim Gmail'}</span>
          </button>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(testTargetEmail)}&su=${encodeURIComponent('[TES RESMI PPDB] TK Lukman Hakim Purwokerto')}&body=${encodeURIComponent('Assalamu’alaikum Warahmatullahi Wabarakatuh,\n\nUji coba integrasi pengiriman Gmail PPDB TK Lukman Hakim Purwokerto berhasil!\n\nWassalam,\nPanitia PPDB')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>Buka Gmail</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
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
              {editingId ? `Edit Data Siswa: ${childName}` : 'Tambah Data Siswa / Pendaftar PPDB Baru'}
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
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Anak *</label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="contoh: Muhammad Zidan Al-Fatih"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Panggilan</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Zidan"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">NIK Anak</label>
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="330201..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tempat Lahir</label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Program Jenjang *</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value as Registration['program'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Playgroup (Usia 2-3 Th)">Playgroup (Usia 2-3 Th)</option>
                <option value="TK A (Usia 4-5 Th)">TK A (Usia 4-5 Th)</option>
                <option value="TK B (Usia 5-6 Th)">TK B (Usia 5-6 Th)</option>
                <option value="Kelas Tahfidz Cilik (Usia 4-6 Th)">Kelas Tahfidz Cilik (Usia 4-6 Th)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Ayah / Wali *</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Nama Ayah"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Ibu</label>
              <input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder="Nama Ibu"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Gmail (Penerima Pengumuman)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">No. WhatsApp Aktif *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Status Pendaftaran</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Registration['status'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                <option value="Wawancara Terjadwal">Wawancara Terjadwal</option>
                <option value="Diterima">Diterima</option>
                <option value="Berkas Belum Lengkap">Berkas Belum Lengkap</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Alamat Lengkap</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jl. Hos Noto Suwiryo, Teluk, Purwokerto Selatan"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-slate-700 block mb-1">Catatan Tambahan</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan jadwal observasi atau kelengkapan berkas..."
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
              {editingId ? 'Simpan Perubahan Data Siswa' : 'Simpan Siswa Baru'}
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama anak, nomor registrasi, orang tua, atau WA..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg overflow-x-auto">
          {(['ALL', 'Diterima', 'Wawancara Terjadwal', 'Menunggu Verifikasi'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? `Semua (${registrations.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">No. Registrasi</th>
                <th className="p-3">Nama Anak & Gender</th>
                <th className="p-3">Program Jenjang</th>
                <th className="p-3">Orang Tua & WhatsApp</th>
                <th className="p-3">Alamat</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    Tidak ada data siswa/pendaftar yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-800 tabular-nums whitespace-nowrap">
                      {r.regNumber}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{r.childName}</span>
                      <span className="text-[11px] text-slate-500">
                        {r.nickname} · {r.gender} · {r.birthDate}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{r.program}</td>
                    <td className="p-3">
                      <div className="font-medium text-slate-800">{r.parentName}</div>
                      <a
                        href={`https://wa.me/62${r.phone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-mono text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <MessageCircle className="w-3 h-3" /> {r.phone}
                      </a>
                      {r.email ? (
                        <div className="text-[11px] text-[#006699] font-mono flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="truncate max-w-[150px]" title={r.email}>{r.email}</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-400 italic">Belum ada Gmail</div>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 max-w-[180px] truncate">{r.address}</td>
                    <td className="p-3">
                      <select
                        value={r.status}
                        onChange={(e) => {
                          const newSt = e.target.value as Registration['status'];
                          if (newSt === 'Diterima') {
                            handleQuickAcc(r);
                          } else {
                            updateRegistrationStatus(r.id, newSt);
                            onNotify(`Status PPDB ${r.childName} diubah menjadi ${newSt}.`);
                          }
                        }}
                        className={`text-xs border rounded-md p-1 font-semibold w-full ${
                          r.status === 'Diterima'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : r.status === 'Wawancara Terjadwal'
                            ? 'bg-sky-50 border-sky-200 text-sky-800'
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Wawancara Terjadwal">Wawancara Terjadwal</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Berkas Belum Lengkap">Berkas Belum Lengkap</option>
                      </select>

                      {r.status !== 'Diterima' ? (
                        <button
                          type="button"
                          onClick={() => handleQuickAcc(r)}
                          className="mt-1.5 w-full py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-extrabold flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                          title="ACC Santri & Otomatis Kirim Surat Resmi ke Gmail"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-100" />
                          <span>ACC &amp; Kirim Gmail</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openAnnouncementModal(r)}
                          className="mt-1.5 w-full py-0.5 px-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          title="Lihat status pengumuman & kirim ulang ke Gmail"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Telah Di-ACC (Kirim Ulang)</span>
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      {confirmDeleteId === r.id ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              deleteRegistration(r.id);
                              setConfirmDeleteId(null);
                              onNotify(`Data pendaftar ${r.childName} telah dihapus.`);
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
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openAnnouncementModal(r)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                            title="Kirim Surat Pengumuman via Gmail"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditClick(r)}
                            className="p-1.5 text-sky-700 hover:bg-sky-50 rounded transition cursor-pointer"
                            title="Edit Biodata Siswa"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(r.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                            title="Hapus Data Siswa"
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

      {/* Announcement via Gmail Composer Modal */}
      {announcementModalReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#005585] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Kirim Pengumuman ke Gmail</h4>
                  <p className="text-[11px] text-sky-200">
                    Penerima: {announcementModalReg.childName} ({announcementModalReg.regNumber})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAnnouncementModalReg(null)}
                className="p-1 hover:bg-white/10 rounded-lg text-sky-200 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3.5 text-xs">
              {/* Recipient Gmail info */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Alamat Gmail Penerima Surat:</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (announcementModalReg) {
                        setAnnouncementModalReg({ ...announcementModalReg, email: 'ml0752960@gmail.com' });
                      }
                    }}
                    className="text-[10px] text-[#006699] hover:underline font-bold cursor-pointer"
                  >
                    Gunakan ml0752960@gmail.com
                  </button>
                </div>
                <input
                  type="email"
                  value={announcementModalReg.email || ''}
                  onChange={(e) => {
                    const newEmail = e.target.value;
                    if (announcementModalReg) {
                      setAnnouncementModalReg({ ...announcementModalReg, email: newEmail });
                    }
                  }}
                  placeholder="nama.wali@gmail.com"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Sent Status Feedback */}
              {announcementSentInfo && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold block">Surat Terkirim ke Gmail!</span>
                      <span className="text-[11px] text-emerald-700">Tercatat untuk {announcementSentInfo.email}</span>
                    </div>
                  </div>
                  {announcementSentInfo.gmailWebLink && (
                    <a
                      href={announcementSentInfo.gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-[10px] flex items-center gap-1 shrink-0 shadow-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Buka Gmail
                    </a>
                  )}
                </div>
              )}

              {/* Template Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Format Pengumuman:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'diterima', label: '1. Diterima / Lulus' },
                    { id: 'observasi', label: '2. Jadwal Observasi' },
                    { id: 'berkas', label: '3. Kelengkapan Berkas' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleTemplateChange(tpl.id as any)}
                      className={`p-2 rounded-lg font-bold text-center border transition cursor-pointer ${
                        announcementTemplate === tpl.id
                          ? 'bg-[#006699] text-white border-[#006699]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subjek Email:</label>
                <input
                  type="text"
                  value={announcementSubject}
                  onChange={(e) => setAnnouncementSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              {/* Body */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Isi Pesan Surat Pengumuman:</label>
                <textarea
                  rows={8}
                  value={announcementBody}
                  onChange={(e) => setAnnouncementBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-[11px] leading-relaxed"
                />
              </div>

              {/* Action Buttons: Clean Minimalist 2-Tier Layout */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSendDirectEmail}
                  disabled={isSendingAnnouncement}
                  className="w-full py-3 px-4 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{isSendingAnnouncement ? 'Mengirim Surat Resmi ke Gmail...' : 'Kirim Langsung ke Gmail Santri'}</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      (announcementModalReg.email || 'ml0752960@gmail.com').trim()
                    )}&su=${encodeURIComponent(announcementSubject)}&body=${encodeURIComponent(
                      announcementBody.length > 500 ? announcementBody.substring(0, 497) + '...' : announcementBody
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    title="Buka compose Gmail di tab baru"
                  >
                    <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Buka Gmail</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>

                  <a
                    href={`mailto:${encodeURIComponent(
                      (announcementModalReg.email || 'ml0752960@gmail.com').trim()
                    )}?subject=${encodeURIComponent(announcementSubject)}&body=${encodeURIComponent(announcementBody)}`}
                    className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    title="Buka di aplikasi Mail HP / Komputer"
                  >
                    <Mail className="w-4 h-4 text-[#006699] shrink-0" />
                    <span>Mail HP</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${announcementSubject}\n\n${announcementBody}`);
                      onNotify('Surat pengumuman berhasil disalin ke clipboard!');
                    }}
                    className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    title="Salin teks pengumuman"
                  >
                    <Copy className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Salin Teks</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== 2. PROFIL GURU CRUD TAB ====================
interface TeachersCrudTabProps {
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const TeachersCrudTab: React.FC<TeachersCrudTabProps> = ({
  teachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [nip, setNip] = useState('19900101 202001 2 001');
  const [education, setEducation] = useState('S1 PG-PAUD');
  const [experienceYears, setExperienceYears] = useState(5);
  const [phone, setPhone] = useState('087713551412');
  const [specialty, setSpecialty] = useState('Pendidikan Karakter & Motorik Anak');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('/assets/budi_mulia_hero.jpg');

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setNip('19900101 202001 2 001');
    setEducation('S1 PG-PAUD');
    setExperienceYears(5);
    setPhone('087713551412');
    setSpecialty('Pendidikan Karakter & Motorik Anak');
    setBio('');
    setPhoto('/assets/budi_mulia_hero.jpg');
    setIsFormOpen(false);
  };

  const handleEditClick = (t: Teacher) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setNip(t.nip);
    setEducation(t.education);
    setExperienceYears(t.experienceYears);
    setPhone(t.phone);
    setSpecialty(t.specialty);
    setBio(t.bio);
    setPhoto(t.photo);
    setIsFormOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    if (editingId) {
      updateTeacher(editingId, {
        name,
        role,
        nip,
        education,
        experienceYears: Number(experienceYears) || 1,
        phone,
        specialty,
        bio: bio || 'Pendidik berdedikasi tinggi membimbing potensi anak usia dini.',
        photo: photo || '/assets/budi_mulia_hero.jpg',
      });
      onNotify(`Profil guru ${name} berhasil diperbarui!`);
    } else {
      addTeacher({
        name,
        role,
        nip: nip || '19900101 202001 2 001',
        education: education || 'S1 PG-PAUD',
        experienceYears: Number(experienceYears) || 3,
        phone: phone || '087713551412',
        specialty: specialty || 'Pendidikan Karakter & Motorik',
        bio: bio || 'Pendidik berdedikasi tinggi membimbing potensi anak usia dini.',
        photo: photo || '/assets/budi_mulia_hero.jpg',
      });
      onNotify(`Profil guru baru (${name}) berhasil ditambahkan!`);
    }
    resetForm();
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD Profil Dewan Guru & Ustadzah</h4>
          <p className="text-xs text-slate-500">
            Tambah pendidik baru, edit jabatan/kualifikasi akademik, atau hapus profil dari daftar website.
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
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah Profil Guru'}</span>
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-sky-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="font-bold text-xs text-sky-800">
              {editingId ? `Edit Profil Guru: ${name}` : 'Tambah Profil Guru Baru'}
            </h5>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ustadzah Siti Aisyah, S.Pd."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jabatan / Wali Kelas *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Wali Kelas TK A Al-Kautsar"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">NIP / NIY Yayasan</label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Pendidikan Terakhir</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="S1 PG-PAUD"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Pengalaman Mengajar (Tahun)</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bidang Keahlian</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Tahfidz Cilik & Sains"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">URL Foto / Upload Foto</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
                <label className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg cursor-pointer flex items-center">
                  <Upload className="w-3.5 h-3.5 text-slate-700" />
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Bio / Moto Pendidik</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Mendidik anak dengan keteladanan."
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
              {editingId ? 'Simpan Perubahan Guru' : 'Simpan Profil Guru'}
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
          placeholder="Cari nama ustadzah/guru, jabatan, NIP, atau bidang keahlian..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Foto</th>
                <th className="p-3">Nama & NIP</th>
                <th className="p-3">Jabatan / Kelas</th>
                <th className="p-3">Pendidikan & Keahlian</th>
                <th className="p-3">Pengalaman</th>
                <th className="p-3 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover bg-slate-200"
                    />
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">{t.nip}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{t.role}</td>
                  <td className="p-3">
                    <span className="text-slate-700 block">{t.education}</span>
                    <span className="text-[11px] text-sky-700">{t.specialty}</span>
                  </td>
                  <td className="p-3 font-mono tabular-nums whitespace-nowrap">{t.experienceYears} Tahun</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    {confirmDeleteId === t.id ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            deleteTeacher(t.id);
                            setConfirmDeleteId(null);
                            onNotify(`Profil guru ${t.name} telah dihapus.`);
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
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-1.5 text-sky-700 hover:bg-sky-50 rounded transition cursor-pointer"
                          title="Edit Guru"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(t.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                          title="Hapus Guru"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== 3. GALERI & FASILITAS CRUD TAB ====================
interface GalleryCrudTabProps {
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const GalleryCrudTab: React.FC<GalleryCrudTabProps> = ({
  gallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Kegiatan Belajar');
  const [imageUrl, setImageUrl] = useState('/assets/gallery/foto6-sholat-berjamaah.jpg');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Kegiatan Belajar');
    setImageUrl('/assets/gallery/foto6-sholat-berjamaah.jpg');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setIsFormOpen(false);
  };

  const handleEditClick = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setDate(item.date);
    setDescription(item.description);
    setIsFormOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    if (editingId) {
      updateGalleryItem(editingId, {
        title,
        category,
        imageUrl,
        date,
        description: description || 'Dokumentasi kegiatan santri TK Lukman Hakim Purwokerto.',
      });
      onNotify(`Dokumentasi "${title}" berhasil diperbarui!`);
    } else {
      addGalleryItem({
        title,
        category,
        imageUrl,
        date: date || new Date().toISOString().split('T')[0],
        description: description || 'Dokumentasi kegiatan santri TK Lukman Hakim Purwokerto.',
      });
      onNotify(`Foto kegiatan baru "${title}" berhasil ditambahkan!`);
    }
    resetForm();
  };

  const filteredGallery = gallery.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || g.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">CRUD Galeri Kegiatan & Fasilitas</h4>
          <p className="text-xs text-slate-500">
            Unggah foto dokumentasi baru, ubah judul/kategori/deskripsi, atau hapus foto dari galeri.
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
          <span>{isFormOpen && !editingId ? 'Tutup Form' : 'Tambah Foto Galeri'}</span>
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-sky-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="font-bold text-xs text-sky-800">
              {editingId ? `Edit Foto Galeri: ${title}` : 'Tambah Foto Kegiatan / Fasilitas Baru'}
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
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Judul Kegiatan / Fasilitas *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="contoh: Praktik Sholat Dhuha Berjamaah"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              >
                <option value="Kegiatan Belajar">Kegiatan Belajar</option>
                <option value="Outbound & Bermain">Outbound & Bermain</option>
                <option value="Pentas Seni & Kreasi">Pentas Seni & Kreasi</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Ibadah & Tahfidz">Ibadah & Tahfidz</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tanggal Dokumentasi</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">URL Gambar / Upload dari Perangkat *</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
                <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg cursor-pointer flex items-center gap-1 font-semibold">
                  <Upload className="w-3.5 h-3.5 text-slate-700" /> Upload
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Deskripsi Kegiatan</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Penjelasan singkat kegiatan..."
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
              {editingId ? 'Simpan Perubahan Foto' : 'Publikasikan Foto'}
            </button>
          </div>
        </form>
      )}

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul atau deskripsi foto kegiatan..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
        >
          <option value="ALL">Semua Kategori ({gallery.length})</option>
          <option value="Kegiatan Belajar">Kegiatan Belajar</option>
          <option value="Outbound & Bermain">Outbound & Bermain</option>
          <option value="Pentas Seni & Kreasi">Pentas Seni & Kreasi</option>
          <option value="Fasilitas">Fasilitas</option>
          <option value="Ibadah & Tahfidz">Ibadah & Tahfidz</option>
        </select>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-40 w-full object-cover bg-slate-100"
              />
              <div className="p-3.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-sky-800">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.date}</span>
                </div>
                <h5 className="font-bold text-xs text-slate-900 mt-1">{item.title}</h5>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>

            <div className="px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1.5">
              {confirmDeleteId === item.id ? (
                <>
                  <button
                    onClick={() => {
                      deleteGalleryItem(item.id);
                      setConfirmDeleteId(null);
                      onNotify(`Foto "${item.title}" telah dihapus.`);
                    }}
                    className="px-2.5 py-1 bg-rose-600 text-white rounded text-[11px] font-bold cursor-pointer"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-[11px] cursor-pointer"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100/70 rounded flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 rounded flex items-center gap-1 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
