import React, { useState } from 'react';
import {
  SchoolIdentity,
  HeroSlide,
  TestimonialItem,
  WaAdminContact,
  PhilosophyCardItem,
  PillarItem,
  WebsiteAppearanceConfig,
  AdminCredentials,
} from '../../types';
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Upload,
  Save,
  Star,
  MessageCircle,
  Building2,
  Layout,
  BookOpen,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

// ==================== 1. PENGATURAN TAMPILAN & BAGIAN WEBSITE (CMS) ====================
interface AppearanceCrudProps {
  appearanceConfig: WebsiteAppearanceConfig;
  updateAppearanceConfig: (updated: Partial<WebsiteAppearanceConfig>) => void;
  onNotify: (msg: string) => void;
}

export const AppearanceAndSectionsCrudTab: React.FC<AppearanceCrudProps> = ({
  appearanceConfig,
  updateAppearanceConfig,
  onNotify,
}) => {
  const sectionToggles: { key: keyof WebsiteAppearanceConfig; label: string; desc: string }[] = [
    { key: 'showHeroBanner', label: '1. Banner Utama (Hero Slider)', desc: 'Slide gambar besar dan sambutan utama di bagian paling atas Beranda' },
    { key: 'showBalokStrip', label: '2. Strip 3 Balok Keunggulan', desc: 'Informasi ringkas Akreditasi A, Pengalaman 25+ Tahun, dan Program Unggulan' },
    { key: 'showIdentityCard', label: '3. Kartu Identitas Resmi Sekolah', desc: 'Kartu informasi NPSN, Alamat Kampus, Instagram, dan Kontak Resmi' },
    { key: 'showTrustConversion', label: '4. Mengapa Memilih Kami (3 Kartu Trust)', desc: 'Penjelasan Sekolah Ramah Anak, Tahfidz Cilik, dan Gizi Sehat' },
    { key: 'showPosterCarousel', label: '5. Poster Showcase SPMB & Keunggulan (4 Poster Geser 2x2 Mulus)', desc: 'Poster banner promosi SPMB 2026/2027, Free Trial Class, Karakter Qurani, dan Daycare tepat di atas Apakah Kalian Tahu' },
    { key: 'showPhilosophySection', label: '6. Apakah Kalian Tahu & 4 Pilar Keunggulan', desc: 'Kartu Filosofi, Pendidik, Fasilitas, Kurikulum, 5 Pilar, dan 8 Basis Pembelajaran' },
    { key: 'showCharacterWheel', label: '6. Lingkaran Interaktif 8 Basis Pembelajaran', desc: 'Diagram interaktif roda 8 basis pendidikan karakter' },
    { key: 'showDirectoryHub', label: '7. Direktori Navigasi Cepat', desc: '4 kartu pintasan menuju halaman Tentang, Jenjang Kelas, Fasilitas, dan Kontak' },
    { key: 'showNatureSection', label: '8. Belajar Riang di Alam Terbuka', desc: 'Kartu kegiatan eksplorasi kebun, taman lalu lintas, dan rumah satwa' },
    { key: 'showExperienceStats', label: '9. Statistik Pengalaman & Alumni', desc: 'Angka capaian jumlah alumni, tahun dedikasi, dan pendidik' },
    { key: 'showWaHotline', label: '10. Seksi Tanya Admin WhatsApp', desc: 'Daftar kontak langsung WhatsApp Ustadzah & Panitia PPDB' },
    { key: 'showTestimonials', label: '11. Testimoni Wali Murid', desc: 'Ulasan dan kesan orang tua santri di bagian bawah Beranda' },
    { key: 'showActivityGallery', label: '12. Galeri Keseharian Ceria (Nonaktif / Dihapus)', desc: 'Bagian ini telah dinonaktifkan sesuai permintaan Anda (bisa diaktifkan lagi kapan saja)' },
  ];

  const handleToggle = (key: keyof WebsiteAppearanceConfig) => {
    const current = Boolean(appearanceConfig[key]);
    updateAppearanceConfig({ [key]: !current });
    onNotify('Tampilan bagian Beranda berhasil diperbarui secara langsung!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Layout className="w-4 h-4 text-[#006699]" />
            Atur Tampilan & Bagian Halaman Website (Tampilkan / Sembunyikan)
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Anda memegang kendali penuh atas seluruh isi halaman depan website. Klik saklar di bawah untuk menampilkan atau menyembunyikan bagian tertentu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionToggles.map((item) => {
          const isEnabled = Boolean(appearanceConfig[item.key]);
          return (
            <div
              key={item.key}
              className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                isEnabled
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-100/80 border-slate-200/60 opacity-75'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">{item.label}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isEnabled ? 'Tampil' : 'Disembunyikan'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
                  isEnabled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isEnabled ? 'Aktif' : 'Nonaktif'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== 2. EDIT 4 KARTU FILOSOFI & 5 PILAR KARAKTER ====================
interface PhilosophyCrudProps {
  philosophyCards: PhilosophyCardItem[];
  updatePhilosophyCard: (id: string, updated: Partial<PhilosophyCardItem>) => void;
  pillarsData: PillarItem[];
  updatePillarItem: (id: string, updated: Partial<PillarItem>) => void;
  onNotify: (msg: string) => void;
}

export const PhilosophyAndPillarsCrudTab: React.FC<PhilosophyCrudProps> = ({
  philosophyCards,
  updatePhilosophyCard,
  pillarsData,
  updatePillarItem,
  onNotify,
}) => {
  const [editingCard, setEditingCard] = useState<PhilosophyCardItem | null>(null);
  const [editingPillar, setEditingPillar] = useState<PillarItem | null>(null);

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    updatePhilosophyCard(editingCard.id, editingCard);
    setEditingCard(null);
    onNotify('Kartu Keunggulan berhasil diperbarui!');
  };

  const handleSavePillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar) return;
    updatePillarItem(editingPillar.id, editingPillar);
    setEditingPillar(null);
    onNotify('Pilar Karakter berhasil diperbarui!');
  };

  const handlePillarPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPillar) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditingPillar({ ...editingPillar, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Bagian A: 4 Kartu Filosofi & Keunggulan */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#006699]" />
            A. Edit 4 Kartu Keunggulan (Filosofi, Guru, Fasilitas & Kurikulum)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik tombol "Edit Kartu" untuk mengubah judul maupun penjelasan pada ke-4 kartu keunggulan di Beranda.
          </p>
        </div>

        {editingCard && (
          <form onSubmit={handleSaveCard} className="bg-amber-50/80 p-5 rounded-xl border-2 border-amber-300 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h5 className="font-bold text-sm text-amber-900">Edit Kartu: {editingCard.title}</h5>
              <button type="button" onClick={() => setEditingCard(null)} className="text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Kartu *</label>
                <input
                  type="text"
                  required
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Isi Penjelasan Kartu *</label>
                <textarea
                  rows={3}
                  required
                  value={editingCard.desc}
                  onChange={(e) => setEditingCard({ ...editingCard, desc: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingCard(null)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-bold">
                Batal
              </button>
              <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold">
                Simpan Kartu
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {philosophyCards.map((card, idx) => (
            <div key={card.id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006699] bg-sky-50 px-2 py-0.5 rounded">
                  Kartu #0{idx + 1}
                </span>
                <h5 className="font-bold text-sm text-slate-900 mt-2">{card.title}</h5>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{card.desc}</p>
              </div>
              <button
                onClick={() => setEditingCard(card)}
                className="mt-4 w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Kartu Ini
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian B: 5 Pilar Karakter */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-extrabold text-slate-900 text-base">
            B. Edit 5 Pilar Karakter Utama Beserta Fotonya
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Ubah judul, deskripsi, maupun foto pada setiap pilar karakter sekolah.
          </p>
        </div>

        {editingPillar && (
          <form onSubmit={handleSavePillar} className="bg-amber-50/80 p-5 rounded-xl border-2 border-amber-300 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h5 className="font-bold text-sm text-amber-900">Edit Pilar: {editingPillar.title}</h5>
              <button type="button" onClick={() => setEditingPillar(null)} className="text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Pilar *</label>
                <input
                  type="text"
                  required
                  value={editingPillar.title}
                  onChange={(e) => setEditingPillar({ ...editingPillar, title: e.target.value, badgeText: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Foto Pilar (URL / Upload)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPillar.image}
                    onChange={(e) => setEditingPillar({ ...editingPillar, image: e.target.value })}
                    className="flex-1 bg-white border border-slate-300 rounded-lg p-2 font-mono"
                  />
                  <label className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-bold flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Upload
                    <input type="file" accept="image/*" onChange={handlePillarPhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Penjelasan Pilar *</label>
                <textarea
                  rows={3}
                  required
                  value={editingPillar.desc}
                  onChange={(e) => setEditingPillar({ ...editingPillar, desc: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingPillar(null)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-bold">
                Batal
              </button>
              <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold">
                Simpan Pilar
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillarsData.map((pillar) => (
            <div key={pillar.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
              <img src={pillar.image} alt={pillar.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200" />
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-xs sm:text-sm text-slate-900">{pillar.title}</h5>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{pillar.desc}</p>
              </div>
              <button
                onClick={() => setEditingPillar(pillar)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 3. IDENTITAS & PROFIL SEKOLAH CRUD ====================
interface SchoolIdentityCrudProps {
  schoolIdentity: SchoolIdentity;
  updateSchoolIdentity: (updates: Partial<SchoolIdentity>) => void;
  onNotify: (msg: string) => void;
}

export const SchoolIdentityCrudTab: React.FC<SchoolIdentityCrudProps> = ({
  schoolIdentity,
  updateSchoolIdentity,
  onNotify,
}) => {
  const [form, setForm] = useState<SchoolIdentity>(schoolIdentity);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (PNG, JPG, SVG, atau WebP)');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setUploadError('Ukuran gambar maksimal 3 MB.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setForm((prev) => ({ ...prev, customLogoUrl: result }));
      onNotify('Logo baru berhasil dimuat. Klik "Simpan Perubahan" untuk menerapkan permanen.');
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefaultLogo = () => {
    setForm((prev) => ({ ...prev, customLogoUrl: undefined }));
    onNotify('Logo dikembalikan ke Logo Resmi Standar (Baling-baling 5 Warna).');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolIdentity(form);
    onNotify('Identitas, Logo & Kontak Sekolah berhasil disimpan permanen ke sistem!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#006699]" />
            Pengaturan Identitas & Logo Resmi Sekolah
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Ubah logo sekolah, nama, nomor WhatsApp utama PPDB, NPSN, akreditasi, hingga alamat. Perubahan berlaku permanen di seluruh web.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-sm shrink-0"
        >
          <Save className="w-4 h-4" /> Simpan Permanen
        </button>
      </div>

      {/* 1. SEKSI MANAJEMEN LOGO SEKOLAH */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699]">
              Branding & Identitas Visual
            </span>
            <h5 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Logo Sekolah (Tampil di Navbar, Footer, Badge & PPDB)
            </h5>
          </div>
          {form.customLogoUrl && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Menggunakan Logo Kustom
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Preview Box */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 mb-2">
              Preview Logo Saat Ini:
            </span>
            <div className="w-28 h-28 rounded-2xl bg-white border border-slate-200 p-2 shadow-inner flex items-center justify-center overflow-hidden">
              {form.customLogoUrl ? (
                <img
                  src={form.customLogoUrl}
                  alt="Logo Sekolah"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-20 h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50,50 C38,32 30,12 48,6 C66,0 68,26 50,50 Z" fill="#00a2e8" />
                    <path d="M50,50 C68,38 88,30 94,48 C100,66 74,68 50,50 Z" fill="#a349a4" />
                    <path d="M50,50 C62,68 70,88 52,94 C34,100 32,74 50,50 Z" fill="#ff7f27" />
                    <path d="M50,50 C32,68 12,70 6,52 C0,34 26,32 50,50 Z" fill="#fff200" />
                    <path d="M50,50 C28,42 12,24 26,12 C40,0 48,26 50,50 Z" fill="#22b14c" />
                    <circle cx="50" cy="50" r="16" fill="#ffffff" />
                    <circle cx="50" cy="50" r="9" fill="#006699" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-[11px] font-semibold text-slate-600 mt-2">
              {form.customLogoUrl ? 'Logo Kustom Terpasang' : 'Logo Standar TK Lukman Hakim'}
            </span>
          </div>

          {/* Upload & Controls */}
          <div className="md:col-span-8 space-y-3">
            <div>
              <label className="font-bold text-slate-800 text-xs block mb-1">
                Unggah File Logo Baru (PNG, JPG, SVG, WebP)
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <label className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Pilih File dari Komputer/HP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {form.customLogoUrl && (
                  <button
                    type="button"
                    onClick={handleResetToDefaultLogo}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Gunakan Logo Standar</span>
                  </button>
                )}
              </div>
              {uploadError && (
                <p className="text-xs text-rose-600 font-medium mt-1">{uploadError}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-700 text-xs block mb-1">
                Atau Tempelkan Tautan URL Gambar Logo
              </label>
              <input
                type="text"
                placeholder="https://domain-anda.com/logo.png"
                value={form.customLogoUrl || ''}
                onChange={(e) => setForm({ ...form, customLogoUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#006699]"
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 Rekomendasi: Gunakan gambar berlatar transparan (PNG) rasio 1:1 (persegi) agar terlihat tajam dan rapi di semua perangkat.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FORM DATA IDENTITAS & KONTAK LENGKAP */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699] block mb-1">
            Informasi Kelembagaan
          </span>
          <h5 className="font-extrabold text-slate-900 text-sm">Profil & Legalitas Sekolah</h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Nama Resmi Sekolah *</label>
            <input
              type="text"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nomor NPSN *</label>
            <input
              type="text"
              required
              value={form.npsn}
              onChange={(e) => setForm({ ...form, npsn: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono text-slate-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Status Akreditasi</label>
            <input
              type="text"
              placeholder="Terakreditasi A"
              value={form.akreditasi || 'Terakreditasi A'}
              onChange={(e) => setForm({ ...form, akreditasi: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Bentuk Pendidikan</label>
            <input
              type="text"
              value={form.bentukPendidikan}
              onChange={(e) => setForm({ ...form, bentukPendidikan: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Status Kepemilikan</label>
            <input
              type="text"
              value={form.statusSekolah}
              onChange={(e) => setForm({ ...form, statusSekolah: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Yayasan / Penyelenggara</label>
            <input
              type="text"
              placeholder="Lukman Al Hakim Foundation Purwokerto"
              value={form.yayasan || 'Lukman Al Hakim Foundation'}
              onChange={(e) => setForm({ ...form, yayasan: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kepala Sekolah</label>
            <input
              type="text"
              placeholder="Ustadzah Kepala Sekolah"
              value={form.kepalaSekolah || ''}
              onChange={(e) => setForm({ ...form, kepalaSekolah: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:bg-white"
            />
          </div>
        </div>

        {/* KONTAK UTAMA & WHATSAPP PPDB */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699] block mb-1">
            Saluran Komunikasi Langsung
          </span>
          <h5 className="font-extrabold text-slate-900 text-sm mb-3">Kontak WhatsApp & Telepon</h5>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <label className="font-bold text-emerald-900 block mb-1 flex items-center justify-between">
                <span>No. WhatsApp Utama (PPDB) *</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Tujuan Formulir</span>
              </label>
              <input
                type="text"
                required
                placeholder="6287713551412"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full bg-white border border-emerald-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
              />
              <span className="text-[10px] text-emerald-700 block mt-1">
                Format: 628... (Semua formulir pendaftaran PPDB akan otomatis terkirim ke nomor ini).
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Telepon Kantor / CS</label>
              <input
                type="text"
                placeholder="(0281) 634xxx / 0812..."
                value={form.telepon || '+62 877-1355-1412'}
                onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jam Operasional Layanan</label>
              <input
                type="text"
                placeholder="Senin – Jumat: 07.30 – 15.30 WIB"
                value={form.jamOperasional || 'Senin – Jumat: 07.30 – 15.30 WIB'}
                onChange={(e) => setForm({ ...form, jamOperasional: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Resmi</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Instagram (@username)</label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Link URL Instagram</label>
              <input
                type="text"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono"
              />
            </div>
          </div>
        </div>

        {/* ALAMAT FISIK KAMPUS SEKOLAH */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006699] block mb-1">
            Lokasi Kampus
          </span>
          <h5 className="font-extrabold text-slate-900 text-sm mb-3">Alamat Lengkap & Peta</h5>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-4">
              <label className="font-bold text-slate-700 block mb-1">Alamat Jalan & Nomor</label>
              <input
                type="text"
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Desa / Kelurahan</label>
              <input
                type="text"
                value={form.desaKelurahan}
                onChange={(e) => setForm({ ...form, desaKelurahan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kecamatan</label>
              <input
                type="text"
                value={form.kecamatan}
                onChange={(e) => setForm({ ...form, kecamatan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={form.kabupaten}
                onChange={(e) => setForm({ ...form, kabupaten: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Provinsi</label>
              <input
                type="text"
                value={form.provinsi}
                onChange={(e) => setForm({ ...form, provinsi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" /> Simpan Semua Perubahan Identitas Sekolah
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== 4. BANNER SLIDE BERANDA (HERO) CRUD ====================
interface HeroSlidesCrudProps {
  heroSlides: HeroSlide[];
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const HeroSlidesCrudTab: React.FC<HeroSlidesCrudProps> = ({
  heroSlides,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  onNotify,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [welcome, setWelcome] = useState('Selamat Datang di');
  const [title, setTitle] = useState('TK LUKMAN HAKIM');
  const [subtitle, setSubtitle] = useState('Pendidikan Anak Usia Dini Berkarakter Qurani & Ramah Anak');
  const [description, setDescription] = useState('Membangun fondasi iman, akhlak mulia, dan kecerdasan majemuk di lingkungan belajar yang asri.');
  const [primaryButton, setPrimaryButton] = useState('Daftar SPMB 2026/2027');
  const [image, setImage] = useState('/assets/gallery/foto1-menara-teratai.jpg');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (isEdit && editingSlide) {
          setEditingSlide({ ...editingSlide, image: reader.result });
        } else {
          setImage(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addHeroSlide({ welcome, title, subtitle, description, primaryButton, image });
    setShowAdd(false);
    onNotify('Slide Banner Utama baru berhasil ditambahkan ke Beranda!');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    updateHeroSlide(editingSlide.id, editingSlide);
    setEditingSlide(null);
    onNotify('Slide Banner Utama berhasil diperbarui!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base">
            Manajemen Slide Banner Utama (Hero Beranda) ({heroSlides.length} Slide)
          </h4>
          <p className="text-xs text-slate-500">
            Ubah teks judul besar, subjudul, deskripsi, dan foto latar belakang pada bagian paling atas halaman depan.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> {showAdd ? 'Tutup Form' : 'Tambah Slide Banner Baru'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white p-5 rounded-xl border-2 border-sky-200 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h5 className="font-bold text-sm text-sky-900">Tambah Slide Banner Beranda Baru</h5>
            <button type="button" onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teks Sambutan Atas</label>
              <input
                type="text"
                required
                value={welcome}
                onChange={(e) => setWelcome(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Utama Slide *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Subjudul Slide *</label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Deskripsi Paragraf *</label>
              <textarea
                rows={2}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teks Tombol Utama</label>
              <input
                type="text"
                value={primaryButton}
                onChange={(e) => setPrimaryButton(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">URL Gambar atau Upload Foto</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                />
                <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, false)} className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold">
              Simpan Slide Baru
            </button>
          </div>
        </form>
      )}

      {editingSlide && (
        <form onSubmit={handleUpdate} className="bg-amber-50/70 p-5 rounded-xl border-2 border-amber-300 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <h5 className="font-bold text-sm text-amber-900">Edit Slide Banner: {editingSlide.title}</h5>
            <button type="button" onClick={() => setEditingSlide(null)} className="text-slate-500 hover:text-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teks Sambutan Atas</label>
              <input
                type="text"
                required
                value={editingSlide.welcome}
                onChange={(e) => setEditingSlide({ ...editingSlide, welcome: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Utama Slide *</label>
              <input
                type="text"
                required
                value={editingSlide.title}
                onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Subjudul Slide *</label>
              <input
                type="text"
                required
                value={editingSlide.subtitle}
                onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Deskripsi Paragraf *</label>
              <textarea
                rows={2}
                required
                value={editingSlide.description}
                onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teks Tombol Utama</label>
              <input
                type="text"
                value={editingSlide.primaryButton}
                onChange={(e) => setEditingSlide({ ...editingSlide, primaryButton: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">URL Gambar atau Upload Foto Baru</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingSlide.image}
                  onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                  className="flex-1 bg-white border border-slate-300 rounded-lg p-2 font-mono"
                />
                <label className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" /> Ganti Foto
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, true)} className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditingSlide(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold">
              Simpan Perubahan Slide
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
            <div className="relative h-44 bg-slate-900">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Slide #{index + 1} • {slide.welcome}
                </span>
                <h5 className="font-extrabold text-sm leading-snug mt-0.5">{slide.title}</h5>
                <p className="text-[11px] text-white/80 line-clamp-2 mt-1">{slide.subtitle}</p>
              </div>
            </div>
            <div className="p-3.5 flex items-center justify-between bg-slate-50 mt-auto">
              <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[200px]">
                Tombol: {slide.primaryButton}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingSlide(slide)}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Slide
                </button>
                {confirmDeleteId === slide.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        deleteHeroSlide(slide.id);
                        setConfirmDeleteId(null);
                        onNotify('Slide berhasil dihapus.');
                      }}
                      className="px-2.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(slide.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Hapus Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 5. TESTIMONI WALI MURID CRUD ====================
interface TestimonialsCrudProps {
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const TestimonialsCrudTab: React.FC<TestimonialsCrudProps> = ({
  testimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  onNotify,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('Wali Murid Kelompok TK B');
  const [quote, setQuote] = useState('');
  const [photo, setPhoto] = useState('/assets/gallery/foto6-sholat-berjamaah.jpg');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({ name, role, quote, photo });
    setName('');
    setQuote('');
    setShowAdd(false);
    onNotify('Testimoni Wali Murid baru berhasil ditambahkan!');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateTestimonial(editingItem.id, editingItem);
    setEditingItem(null);
    onNotify('Testimoni Wali Murid berhasil diperbarui!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Manajemen Testimoni Wali Murid ({testimonials.length} Ulasan)
          </h4>
          <p className="text-xs text-slate-500">
            Tambah, ubah, atau hapus ulasan dan kesan wali murid yang tampil di halaman depan.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAdd ? 'Tutup Form' : 'Tambah Testimoni Baru'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white p-5 rounded-xl border-2 border-sky-200 space-y-4 text-xs">
          <h5 className="font-bold text-sm text-sky-900">Tambah Testimoni Orang Tua Siswa</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Orang Tua / Wali *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Bunda dr. Rina Kusuma"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Keterangan Wali / Kelas Anak *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Wali Murid Kelompok TK B"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Isi Kutipan Testimoni *</label>
              <textarea
                rows={3}
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">URL Foto Profil</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold">
              Simpan Testimoni
            </button>
          </div>
        </form>
      )}

      {editingItem && (
        <form onSubmit={handleUpdate} className="bg-amber-50/70 p-5 rounded-xl border-2 border-amber-300 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <h5 className="font-bold text-sm text-amber-900">Edit Testimoni: {editingItem.name}</h5>
            <button type="button" onClick={() => setEditingItem(null)} className="text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Orang Tua / Wali *</label>
              <input
                type="text"
                required
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Peran / Kelas Anak *</label>
              <input
                type="text"
                required
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Isi Kutipan Testimoni *</label>
              <textarea
                rows={3}
                required
                value={editingItem.quote}
                onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">URL Foto Profil</label>
              <input
                type="text"
                value={editingItem.photo}
                onChange={(e) => setEditingItem({ ...editingItem, photo: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold">
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <h5 className="font-bold text-xs text-slate-900">{item.name}</h5>
                  <p className="text-[11px] text-slate-500">{item.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">"{item.quote}"</p>
            </div>
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem(item)}
                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                {confirmDeleteId === item.id ? (
                  <button
                    onClick={() => {
                      deleteTestimonial(item.id);
                      setConfirmDeleteId(null);
                      onNotify('Testimoni dihapus.');
                    }}
                    className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold cursor-pointer"
                  >
                    Ya, Hapus
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 6. HOTLINE ADMIN WHATSAPP CRUD ====================
interface WaContactsCrudProps {
  waContacts: WaAdminContact[];
  addWaContact: (contact: Omit<WaAdminContact, 'id'>) => void;
  updateWaContact: (id: string, updates: Partial<WaAdminContact>) => void;
  deleteWaContact: (id: string) => void;
  onNotify: (msg: string) => void;
}

export const WaContactsCrudTab: React.FC<WaContactsCrudProps> = ({
  waContacts,
  addWaContact,
  updateWaContact,
  deleteWaContact,
  onNotify,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingContact, setEditingContact] = useState<WaAdminContact | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [unit, setUnit] = useState('KB & TK Islam');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('6287713551412');
  const [role, setRole] = useState('Layanan Informasi PPDB & Kurikulum');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addWaContact({ unit, name, phone, role });
    setName('');
    setShowAdd(false);
    onNotify('Kontak Admin WhatsApp baru berhasil ditambahkan!');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact) return;
    updateWaContact(editingContact.id, editingContact);
    setEditingContact(null);
    onNotify('Kontak Admin WhatsApp berhasil diperbarui!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            Manajemen Nomor Hotline Admin WhatsApp ({waContacts.length} Kontak)
          </h4>
          <p className="text-xs text-slate-500">
            Ubah daftar nomor WhatsApp panitia PPDB, Kepala Sekolah, Bendahara SPP, dan Layanan Daycare.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {showAdd ? 'Tutup Form' : 'Tambah Kontak WA Baru'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white p-5 rounded-xl border-2 border-sky-200 space-y-4 text-xs">
          <h5 className="font-bold text-sm text-sky-900">Tambah Nomor Admin WhatsApp</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Unit Layanan *</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Admin / Ustadzah *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ustadzah Siti Aminah, S.Pd"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor WA (Format 628...) *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jabatan / Bidang Layanan *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold">
              Simpan Kontak WA
            </button>
          </div>
        </form>
      )}

      {editingContact && (
        <form onSubmit={handleUpdate} className="bg-amber-50/70 p-5 rounded-xl border-2 border-amber-300 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <h5 className="font-bold text-sm text-amber-900">Edit Kontak WA: {editingContact.name}</h5>
            <button type="button" onClick={() => setEditingContact(null)} className="text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Unit Layanan *</label>
              <input
                type="text"
                required
                value={editingContact.unit}
                onChange={(e) => setEditingContact({ ...editingContact, unit: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Admin / Ustadzah *</label>
              <input
                type="text"
                required
                value={editingContact.name}
                onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nomor WA (Format 628...) *</label>
              <input
                type="text"
                required
                value={editingContact.phone}
                onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Jabatan / Bidang Layanan *</label>
              <input
                type="text"
                required
                value={editingContact.role}
                onChange={(e) => setEditingContact({ ...editingContact, role: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditingContact(null)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-bold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold">
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {waContacts.map((contact) => (
          <div key={contact.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {contact.unit}
              </span>
              <h5 className="font-bold text-sm text-slate-900 mt-1">{contact.name}</h5>
              <p className="text-xs font-mono text-slate-600 mt-0.5">+{contact.phone}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{contact.role}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setEditingContact(contact)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              {confirmDeleteId === contact.id ? (
                <button
                  onClick={() => {
                    deleteWaContact(contact.id);
                    setConfirmDeleteId(null);
                    onNotify('Kontak WA berhasil dihapus.');
                  }}
                  className="px-2.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Ya, Hapus
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(contact.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 7. KEAMANAN & PRIVASI LOGIN ADMIN ====================
interface AdminSecurityCrudProps {
  adminCredentials: AdminCredentials;
  updateAdminCredentials: (updated: Partial<AdminCredentials>) => void;
  onNotify: (msg: string) => void;
}

export const AdminSecurityCrudTab: React.FC<AdminSecurityCrudProps> = ({
  adminCredentials,
  updateAdminCredentials,
  onNotify,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminCredentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (currentPassword !== adminCredentials.password) {
      setErrorMsg('Password saat ini tidak sesuai. Perubahan dibatalkan demi keamanan.');
      return;
    }

    if (!newUsername.trim() || newUsername.trim().length < 3) {
      setErrorMsg('Username baru minimal terdiri dari 3 karakter.');
      return;
    }

    const targetPassword = newPassword.trim() ? newPassword : adminCredentials.password;
    if (newPassword.trim()) {
      if (newPassword.length < 6) {
        setErrorMsg('Password baru minimal terdiri dari 6 karakter.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg('Konfirmasi password baru tidak cocok.');
        return;
      }
    }

    updateAdminCredentials({
      username: newUsername.trim(),
      password: targetPassword,
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onNotify('Username & Password Panel Admin berhasil diperbarui dan diamankan!');
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white p-5 rounded-2xl border border-slate-200">
        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#006699]" />
          Pengaturan Keamanan Akun Admin (Username & Password)
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Akses Panel Admin dilindungi secara ketat hanya menggunakan Username dan Password resmi. Masukkan password saat ini untuk memperbarui kredensial.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Verifikasi Password Saat Ini *
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Masukkan password aktif saat ini..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Username Admin Baru *</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Password Baru (Kosongkan jika tetap)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Ulangi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang password baru..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Proteksi Penuh Aktif (Tanpa Hint Publik)
          </span>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#006699] hover:bg-[#00527a] text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Simpan Username & Password
          </button>
        </div>
      </form>
    </div>
  );
};
