import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Registration } from '../types';
import {
  GraduationCap,
  MessageCircle,
  X,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Home,
  FileCheck,
  Search,
  ExternalLink,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Sparkles,
  HeartHandshake,
  Mail,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface PpdbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestLogin?: () => void;
}

export const PpdbModal: React.FC<PpdbModalProps> = ({ isOpen, onClose, onRequestLogin }) => {
  const { addRegistration, registrations, schoolIdentity, sendPpdbConfirmationEmail, currentUser, signInWithGoogleAccount } = useApp();

  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');
  const [step, setStep] = useState(1);
  const [registrationMethod, setRegistrationMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [submittedReg, setSubmittedReg] = useState<Registration | null>(null);
  const [emailComposeUrl, setEmailComposeUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Form states pre-filled with authenticated Google user
  const [childName, setChildName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nik, setNik] = useState('');
  const [birthPlace, setBirthPlace] = useState('Purwokerto');
  const [birthDate, setBirthDate] = useState('2021-04-10');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [program, setProgram] = useState<Registration['program']>('TK A (Usia 4-5 Th)');
  const [parentName, setParentName] = useState(() => currentUser?.displayName || '');
  const [motherName, setMotherName] = useState('');
  const [parentEmail, setParentEmail] = useState(() => currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Keep parent details synchronized if currentUser logs in while modal is mounted
  React.useEffect(() => {
    if (currentUser?.email && !parentEmail) {
      setParentEmail(currentUser.email);
    }
    if (currentUser?.displayName && !parentName) {
      setParentName(currentUser.displayName);
    }
  }, [currentUser]);

  // Status search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Registration | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  // Route Guard: SPMB form is protected and requires active Google authentication
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-[#006699] flex items-center justify-center mx-auto mb-4 border border-sky-100 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider mb-2">
            <span>Akses SPMB Terproteksi</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
            Masuk dengan Akun Google
          </h3>

          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            Untuk menjamin keamanan data pendaftar calon santri dan kemudahan pengiriman bukti resmi ke Gmail/WhatsApp, formulir SPMB Online 2026/2027 hanya dapat diisi oleh Ayah & Bunda yang telah terautentikasi dengan akun Google (Gmail).
          </p>

          <button
            type="button"
            onClick={() => {
              if (onRequestLogin) {
                onRequestLogin();
              } else {
                signInWithGoogleAccount();
              }
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#006699] hover:bg-[#00527a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4 text-amber-300" />
            <span>Masuk Akun Google (Gmail) Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Clean WhatsApp phone number configured by admin
  const rawAdminWa = (schoolIdentity.whatsapp || '6287713551412').replace(/[^0-9]/g, '');
  const targetWaNumber = rawAdminWa.startsWith('0')
    ? '62' + rawAdminWa.slice(1)
    : rawAdminWa.startsWith('62')
    ? rawAdminWa
    : '62' + rawAdminWa;

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      setFormError('Mohon isi nama lengkap calon santri.');
      return;
    }
    setFormError(null);
    setStep(2);
  };

  const generateWaMessage = (reg: Registration) => {
    return (
      `*PENDAFTARAN MURID BARU (SPMB ONLINE)*\n` +
      `*${schoolIdentity.nama.toUpperCase()}*\n` +
      `*TAHUN AJARAN 2026 / 2027*\n\n` +
      `Assalamu’alaikum Warahmatullahi Wabarakatuh Panitia SPMB.\n` +
      `Saya telah mengisi formulir online di website resmi. Berikut rincian data calon santri kami:\n\n` +
      `📌 *No. Registrasi:* ${reg.regNumber}\n` +
      `👶 *Nama Santri:* ${reg.childName} (${reg.nickname})\n` +
      `🆔 *NIK Santri:* ${reg.nik}\n` +
      `📅 *TTL:* ${reg.birthPlace}, ${reg.birthDate}\n` +
      `🚻 *Jenis Kelamin:* ${reg.gender}\n` +
      `🏫 *Jenjang / Program:* ${reg.program}\n` +
      `👨‍👩‍👦 *Nama Orang Tua:* ${reg.parentName} / ${reg.motherName || '-'}\n` +
      (reg.email ? `📧 *Email Wali:* ${reg.email}\n` : '') +
      `📱 *No. WhatsApp Wali:* ${reg.phone}\n` +
      `🏡 *Alamat Domisili:* ${reg.address || '-'}\n` +
      (reg.notes ? `📝 *Catatan Khusus:* ${reg.notes}\n\n` : `\n`) +
      `Mohon dibantu verifikasi berkas pendaftaran dan konfirmasi jadwal observasi/trial class santri. Jazakumullah Khairan Katsiran.`
    );
  };

  const handleSendToWhatsApp = (reg: Registration) => {
    const text = encodeURIComponent(generateWaMessage(reg));
    const waUrl = `https://wa.me/${targetWaNumber}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyWaText = (reg: Registration) => {
    const text = generateWaMessage(reg);
    navigator.clipboard.writeText(text);
    setCopyStatus('Pesan pendaftaran berhasil disalin! Buka WhatsApp Anda dan tempelkan (paste).');
    setTimeout(() => setCopyStatus(null), 4000);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !phone.trim()) {
      setFormError('Mohon lengkapi Nama Orang Tua dan Nomor WhatsApp aktif.');
      return;
    }

    if (registrationMethod === 'email' && !parentEmail.trim()) {
      setFormError('Mohon masukkan alamat email aktif jika memilih metode konfirmasi email.');
      return;
    }

    setFormError(null);

    const reg = addRegistration({
      childName: childName.trim(),
      nickname: nickname.trim() || childName.trim().split(' ')[0],
      nik: nik.trim() || '3302000000000000',
      birthPlace: birthPlace.trim() || 'Purwokerto',
      birthDate,
      gender,
      program,
      parentName: parentName.trim(),
      motherName: motherName.trim(),
      email: parentEmail.trim(),
      phone: phone.trim(),
      occupation: occupation.trim(),
      address: address.trim(),
      status: 'Menunggu Verifikasi',
      notes: notes.trim(),
    });

    setSubmittedReg(reg);
    setStep(3);

    if (registrationMethod === 'whatsapp') {
      // Auto trigger WhatsApp send on first submit
      setTimeout(() => {
        handleSendToWhatsApp(reg);
      }, 400);
    } else {
      // Send confirmation email via context (with fail-safe client URL fallback)
      const emailRes = await sendPpdbConfirmationEmail(reg);
      const url = emailRes.composeUrl || emailRes.gmailWebLink;
      if (url) {
        setEmailComposeUrl(url);
      }
    }
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    const cleanQueryDigits = query.replace(/[^0-9]/g, '');

    const found = registrations.find((r) => {
      const matchReg = r.regNumber.toLowerCase().includes(query);
      const matchName = r.childName.toLowerCase().includes(query) || r.nickname.toLowerCase().includes(query);
      const matchPhone = cleanQueryDigits.length >= 4 && r.phone.replace(/[^0-9]/g, '').includes(cleanQueryDigits);
      return matchReg || matchName || matchPhone;
    });

    setSearchResult(found || null);
  };

  const handleResetForm = () => {
    setSubmittedReg(null);
    setChildName('');
    setNickname('');
    setNik('');
    setParentName('');
    setMotherName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setStep(1);
    setActiveTab('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
        {/* Header Bersih & Elegan */}
        <div className="bg-[#0F2937] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">
                SPMB Online {schoolIdentity.nama}
              </h3>
              <p className="text-xs text-sky-200 flex items-center gap-1.5">
                <span>Tahun Ajaran 2026/2027</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">Konfirmasi Langsung via WhatsApp</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === 'form'
                ? 'border-[#006699] text-[#006699] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Formulir Pendaftaran Murid Baru
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === 'status'
                ? 'border-[#006699] text-[#006699] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Cek Status Pendaftaran (SPMB)
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-white space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: FORMULIR PENDAFTARAN (LANGSUNG WHATSAPP)            */}
          {/* ========================================================= */}
          {activeTab === 'form' && (
            <>
              {/* Stepper Indikator */}
              {step < 3 && (
                <div className="flex items-center justify-between max-w-sm mx-auto mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === 1 ? 'bg-[#006699] text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      1
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Data Santri</span>
                  </div>
                  <div className="w-12 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === 2 ? 'bg-[#006699] text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      2
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Wali & WhatsApp</span>
                  </div>
                </div>
              )}

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{formError}</span>
                </div>
              )}

              {/* Authenticated Parent Identity Chip */}
              {currentUser && (
                <div className="bg-sky-50/80 border border-sky-200 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 truncate">
                      Terautentikasi Google: <strong className="text-slate-900">{currentUser.displayName || currentUser.email}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#006699] font-bold bg-white px-2 py-0.5 rounded-md border border-sky-200 shrink-0">
                    {currentUser.email}
                  </span>
                </div>
              )}

              {/* STEP 1: DATA SANTRI */}
              {step === 1 && (
                <form onSubmit={handleNextToStep2} className="space-y-4">
                  <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#006699] text-white flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        Langkah 1: Identitas Calon Santri
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Isi nama ananda dan pilih jenjang kelas yang dituju.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Lengkap Calon Santri *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Muhammad Fatih Al-Ayyubi"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Fatih"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        NIK Calon Santri (16 Digit)
                      </label>
                      <input
                        type="text"
                        maxLength={16}
                        placeholder="3302xxxxxxxxxxxx"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        placeholder="Purwokerto"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Jenis Kelamin
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs bg-white"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pilihan Program / Jenjang Kelas *
                      </label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs bg-white font-medium text-slate-800"
                      >
                        <option value="Playgroup (Usia 2-3 Th)">Playgroup / KB (Usia 2-3 Th)</option>
                        <option value="TK A (Usia 4-5 Th)">TK A (Usia 4-5 Th)</option>
                        <option value="TK B (Usia 5-6 Th)">TK B (Usia 5-6 Th)</option>
                        <option value="Kelas Tahfidz Cilik (Usia 4-6 Th)">
                          Kelas Tahfidz Cilik (Usia 4-6 Th)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
                    >
                      <span>Lanjut: Data Orang Tua</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: DATA ORANG TUA & PILIHAN METODE PENDAFTARAN */}
              {step === 2 && (
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  {/* Pilihan Dual Metode Pendaftaran (WhatsApp vs Email) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Pilih Metode Jalur Konfirmasi Pendaftaran:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Pilihan 1: WhatsApp (Rekomendasi Utama) */}
                      <button
                        type="button"
                        onClick={() => setRegistrationMethod('whatsapp')}
                        className={`text-left p-3.5 rounded-2xl border-2 transition relative cursor-pointer ${
                          registrationMethod === 'whatsapp'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600/30'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                              <MessageCircle className="w-4 h-4" />
                            </div>
                            <span className="font-extrabold text-xs text-slate-900">
                              Via WhatsApp Resmi
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider">
                            Rekomendasi
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Paling cepat & praktis! Formulir langsung terhubung ke panitia SPMB di{' '}
                          <strong className="text-emerald-700 font-bold">{schoolIdentity.whatsapp}</strong> untuk jadwal observasi langsung.
                        </p>
                      </button>

                      {/* Pilihan 2: Email Resmi (Alternatif) */}
                      <button
                        type="button"
                        onClick={() => setRegistrationMethod('email')}
                        className={`text-left p-3.5 rounded-2xl border-2 transition relative cursor-pointer ${
                          registrationMethod === 'email'
                            ? 'border-[#006699] bg-sky-50/70 shadow-sm ring-1 ring-[#006699]/30'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#006699] text-white flex items-center justify-center">
                              <Mail className="w-4 h-4" />
                            </div>
                            <span className="font-extrabold text-xs text-slate-900">
                              Via Email Resmi
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-[#006699] text-[9px] font-bold uppercase tracking-wider">
                            Alternatif
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Terkirim ke email sekretariat{' '}
                          <strong className="text-sky-800 font-bold">{schoolIdentity.email}</strong> dan salinan otomatis ke inbox Ayah & Bunda.
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Ayah / Wali *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap Ayah"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Ibu
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Lengkap Ibu"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nomor WhatsApp Aktif Wali (08... / 62...) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alamat Email Wali {registrationMethod === 'email' ? '*' : '(Opsional)'}
                      </label>
                      <input
                        type="email"
                        required={registrationMethod === 'email'}
                        placeholder="nama.wali@gmail.com"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pekerjaan Orang Tua
                      </label>
                      <input
                        type="text"
                        placeholder="PNS / Swasta / Wirausaha"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alamat Domisili Lengkap
                      </label>
                      <input
                        type="text"
                        placeholder="Jl. ..., RT/RW, Kelurahan, Kec. Purwokerto..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Catatan Khusus / Minat Ananda (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Alergi makanan, minat seni/hafalan, atau waktu observasi yang diharapkan"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#006699] focus:ring-1 focus:ring-[#006699] text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
                    >
                      ← Kembali
                    </button>

                    <button
                      type="submit"
                      className={`px-6 py-2.5 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
                        registrationMethod === 'whatsapp'
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-[#006699] hover:bg-[#00527a]'
                      }`}
                    >
                      {registrationMethod === 'whatsapp' ? (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Kirim via WhatsApp (+62 877-1355-1412)</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Kirim Pendaftaran via Email Resmi</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: SUKSES & KONFIRMASI */}
              {step === 3 && submittedReg && (
                <div className="space-y-6 text-center animate-in fade-in py-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2937]">
                      Alhamdulillah, Formulir Berhasil Diterima!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      {registrationMethod === 'whatsapp'
                        ? 'Data pendaftaran ananda telah tersimpan. Silakan kirimkan pesan WhatsApp ke Panitia SPMB di bawah untuk konfirmasi jadwal observasi/trial class.'
                        : 'Data pendaftaran ananda telah tersimpan dan konfirmasi email telah diproses. Ayah & Bunda juga dapat menghubungi panitia via WhatsApp untuk respon cepat.'}
                    </p>
                  </div>

                  {/* Kartu Registrasi */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3.5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Nomor Registrasi Resmi
                        </span>
                        <span className="font-mono font-black text-base sm:text-lg text-[#006699]">
                          {submittedReg.regNumber}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold block">
                          {submittedReg.status}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Jalur: {registrationMethod === 'whatsapp' ? 'WhatsApp Cepat' : 'Email Resmi'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Nama Santri:</span>
                        <span className="font-bold text-slate-800">{submittedReg.childName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Jenjang Kelas:</span>
                        <span className="font-bold text-slate-800">{submittedReg.program}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Orang Tua / Wali:</span>
                        <span className="font-semibold text-slate-800">{submittedReg.parentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">WhatsApp Wali:</span>
                        <span className="font-mono font-semibold text-slate-800">{submittedReg.phone}</span>
                      </div>
                      {submittedReg.email && (
                        <div className="col-span-2">
                          <span className="text-slate-500 block text-[11px]">Email Wali:</span>
                          <span className="font-mono text-slate-800">{submittedReg.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {copyStatus && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 max-w-lg mx-auto">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{copyStatus}</span>
                    </div>
                  )}

                  {/* Tombol Aksi Utama */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleSendToWhatsApp(submittedReg)}
                      className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Kirim ke WhatsApp Panitia (+62 877-1355-1412)</span>
                    </button>

                    {emailComposeUrl && (
                      <a
                        href={emailComposeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-5 py-3 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Buka di Gmail</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => handleCopyWaText(submittedReg)}
                      className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Salin Format Pesan</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-slate-500" />
                      <span>Cetak Bukti</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleResetForm}
                      className="text-xs font-semibold text-slate-500 hover:text-[#006699] underline transition cursor-pointer"
                    >
                      Daftarkan Santri Lainnya
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CEK STATUS PENDAFTARAN (TANPA EMAIL)                */}
          {/* ========================================================= */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Cek Status Pendaftaran Calon Santri
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Masukkan Nomor Registrasi (PPDB-LHP-...), Nama Santri, atau Nomor WhatsApp wali santri.
                </p>

                <form onSubmit={handleSearchStatus} className="mt-3 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Contoh: PPDB-LHP-2026 atau Nama Santri..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#006699]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    Cari Data
                  </button>
                </form>
              </div>

              {/* Hasil Pencarian */}
              {hasSearched && (
                <div>
                  {searchResult ? (
                    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Nomor Registrasi
                          </span>
                          <h4 className="text-base font-black text-[#006699] font-mono">
                            {searchResult.regNumber}
                          </h4>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            searchResult.status === 'Diterima'
                              ? 'bg-emerald-100 text-emerald-800'
                              : searchResult.status === 'Wawancara Terjadwal'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {searchResult.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[11px]">Nama Santri:</span>
                          <span className="font-bold text-slate-800">{searchResult.childName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Jenjang / Program:</span>
                          <span className="font-semibold text-slate-800">{searchResult.program}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">Orang Tua / Wali:</span>
                          <span className="font-semibold text-slate-800">{searchResult.parentName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[11px]">WhatsApp Terdaftar:</span>
                          <span className="font-mono text-slate-800">{searchResult.phone}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-500 block text-[11px]">Tanggal Mendaftar:</span>
                          <span className="text-slate-700">{searchResult.createdAt}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-2.5 border-t border-slate-100">
                        <button
                          onClick={() => handleSendToWhatsApp(searchResult)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi Panitia SPMB di WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleCopyWaText(searchResult)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Data Pendaftaran</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-600">
                        Data pendaftaran tidak ditemukan untuk kata kunci <strong>"{searchQuery}"</strong>.
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Pastikan Nomor Registrasi atau Nomor WhatsApp yang dimasukkan sudah benar.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bantuan Layanan WhatsApp */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Butuh Bantuan Pendaftaran?</span>
                  <span className="text-slate-500 text-[11px]">
                    Hubungi Customer Service & Panitia SPMB via WhatsApp.
                  </span>
                </div>
                <a
                  href={`https://wa.me/${targetWaNumber}?text=Assalamu’alaikum%20Panitia%20SPMB%20TK%20Lukman%20Hakim,%20saya%20ingin%20berkonsultasi%20mengenai%20pendaftaran.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat CS</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
