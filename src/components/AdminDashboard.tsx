import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationLog } from '../types';
import { PpdbCrudTab, TeachersCrudTab, GalleryCrudTab } from './crud/MainCrudTabs';
import { TuitionCrudTab, ReportsCrudTab, InquiriesCrudTab } from './crud/AcademicCrudTabs';
import {
  AppearanceAndSectionsCrudTab,
  PhilosophyAndPillarsCrudTab,
  SchoolIdentityCrudTab,
  HeroSlidesCrudTab,
  TestimonialsCrudTab,
  WaContactsCrudTab,
  AdminSecurityCrudTab,
} from './crud/WebsiteCmsTabs';
import { LukmanHakimLogo } from './LukmanHakimLogo';
import {
  ShieldCheck,
  Users,
  Image as ImageIcon,
  UserCheck,
  CreditCard,
  GraduationCap,
  Send,
  Database,
  Cloud,
  Trash2,
  CheckCircle,
  X,
  RefreshCw,
  Download,
  Upload,
  MessageSquare,
  Building2,
  Sliders,
  Star,
  MessageCircle,
  RotateCcw,
  Lock,
  Layout,
  BookOpen,
  KeyRound,
  LogOut,
  AlertCircle,
  LayoutGrid,
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Calendar as CalendarIcon,
  Settings,
  Eye,
  EyeOff,
  GitBranch,
  Terminal,
  ExternalLink,
  Copy,
  Sparkles,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { SEVEN_SENTRA_DATA } from '../data/sentraData';

interface AdminDashboardProps {
  isOpen: boolean;
  isFullPage?: boolean;
  onClose: () => void;
}

type AdminTabId =
  | 'dashboard'
  | 'features'
  | 'sentraphotos'
  | 'appearance'
  | 'identity'
  | 'hero'
  | 'philosophy'
  | 'teachers'
  | 'gallery'
  | 'testimonials'
  | 'wacontacts'
  | 'ppdb'
  | 'tuition'
  | 'reports'
  | 'inquiries'
  | 'security'
  | 'gateway'
  | 'cloud';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  isFullPage = false,
  onClose,
}) => {
  const {
    currentUser,
    isAdminUser,
    isCloudSynced,
    lastCloudSyncAt,
    signInWithGoogleAccount,
    signOutAccount,
    syncLocalDataToFirestore,
    schoolIdentity,
    updateSchoolIdentity,
    saveAllSettingsToServer,
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    philosophyCards,
    updatePhilosophyCard,
    pillarsData,
    updatePillarItem,
    appearanceConfig,
    updateAppearanceConfig,
    customFeatures,
    addCustomFeature,
    updateCustomFeature,
    deleteCustomFeature,
    toggleCustomFeature,
    adminCredentials,
    updateAdminCredentials,
    logoutAdminSession,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    waContacts,
    addWaContact,
    updateWaContact,
    deleteWaContact,
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    registrations,
    addRegistration,
    updateRegistration,
    updateRegistrationStatus,
    deleteRegistration,
    tuitionBills,
    payTuitionBill,
    addTuitionBill,
    updateTuitionBill,
    deleteTuitionBill,
    reports,
    addReport,
    updateReport,
    deleteReport,
    notificationLogs,
    sendGatewayNotification,
    deleteNotificationLog,
    inquiries,
    addInquiry,
    updateInquiry,
    deleteInquiry,
    exportCloudBackup,
    restoreCloudBackup,
    resetToDefaultData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTabId>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  // Notification gateway manual sender
  const [targetPhone, setTargetPhone] = useState('081234567890');
  const [targetName, setTargetName] = useState('Wali Siswa');
  const [notifType, setNotifType] = useState<NotificationLog['type']>('BROADCAST');
  const [notifMessage, setNotifMessage] = useState(
    'Pemberitahuan: Besok Sabtu seluruh santri mengikuti kegiatan Outbound Ceria.'
  );

  // Backup state
  const [backupJson, setBackupJson] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  // Feature Creator State
  const [announcementBadge, setAnnouncementBadge] = useState<string>(
    appearanceConfig.announcementBar?.badge || 'SPMB 2026/2027'
  );
  const [announcementText, setAnnouncementText] = useState<string>(
    appearanceConfig.announcementBar?.text || 'Penerimaan Murid Baru (SPMB) T.A. 2026/2027 Resmi Dibuka! Kuota Terbatas & Free Trial Class.'
  );
  const [announcementLinkText, setAnnouncementLinkText] = useState<string>(
    appearanceConfig.announcementBar?.linkText || 'Daftar SPMB Online'
  );
  const [announcementAction, setAnnouncementAction] = useState<'ppdb' | 'schools' | 'contact' | 'wa'>(
    appearanceConfig.announcementBar?.linkAction || 'ppdb'
  );
  const [announcementBgColor, setAnnouncementBgColor] = useState<string>(
    appearanceConfig.announcementBar?.bgColor || '#006699'
  );
  const [isAnnouncementEnabled, setIsAnnouncementEnabled] = useState<boolean>(
    appearanceConfig.announcementBar?.enabled ?? false
  );

  // Sentra Photos Admin State
  const [adminSentraTarget, setAdminSentraTarget] = useState<string>('sentra-alam-cair');
  const [adminSentraTitle, setAdminSentraTitle] = useState<string>('');
  const [adminSentraDesc, setAdminSentraDesc] = useState<string>('');
  const [adminSentraFiles, setAdminSentraFiles] = useState<string[]>([]);
  const [adminUserPhotos, setAdminUserPhotos] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('tk_sentra_additional_photos_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleAdminSentraFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const urls: string[] = [];
    let count = 0;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          urls.push(reader.result);
        }
        count++;
        if (count === files.length) {
          setAdminSentraFiles((prev) => [...prev, ...urls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAdminSaveSentraPhotos = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminSentraFiles.length === 0) return;
    const targetSentraObj = SEVEN_SENTRA_DATA.find((s) => s.id === adminSentraTarget);
    const sentraName = targetSentraObj ? targetSentraObj.name : 'Sentra Belajar';
    const newItems = adminSentraFiles.map((url, idx) => ({
      id: `custom-photo-${Date.now()}-${idx}`,
      src: url,
      sentraId: adminSentraTarget,
      sentraName: sentraName,
      title: adminSentraTitle.trim() || `Dokumentasi ${sentraName}`,
      desc: adminSentraDesc.trim() || 'Foto kegiatan nyata santri TK Lukman Hakim.',
    }));
    const updated = [...adminUserPhotos, ...newItems];
    setAdminUserPhotos(updated);
    localStorage.setItem('tk_sentra_additional_photos_v1', JSON.stringify(updated));
    setAdminSentraFiles([]);
    setAdminSentraTitle('');
    setAdminSentraDesc('');
    setStatusMessage(`Berhasil menambahkan ${newItems.length} foto ke ${sentraName}!`);
  };

  const handleSaveWebsiteSettings = async () => {
    const saved = await saveAllSettingsToServer();
    setStatusMessage(
      saved
        ? 'Pengaturan website berhasil disimpan ke Firestore.'
        : 'Pengaturan gagal disimpan. Pastikan login Google admin aktif dan ukuran konten tidak melebihi batas Firestore.'
    );
  };

  const handleAdminDeleteSentraPhoto = (id: string) => {
    const updated = adminUserPhotos.filter((p) => p.id !== id);
    setAdminUserPhotos(updated);
    localStorage.setItem('tk_sentra_additional_photos_v1', JSON.stringify(updated));
    setStatusMessage('Foto dokumentasi sentra berhasil dihapus!');
  };

  // Custom Feature Builder State
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [featTitle, setFeatTitle] = useState('');
  const [featCategory, setFeatCategory] = useState<any>('Layanan');
  const [featIcon, setFeatIcon] = useState('Sparkles');
  const [featDesc, setFeatDesc] = useState('');
  const [featBadge, setFeatBadge] = useState('');
  const [featAudience, setFeatAudience] = useState('');
  const [featActionText, setFeatActionText] = useState('Daftar Sekarang');
  const [featActionUrl, setFeatActionUrl] = useState('#ppdb');

  const handleOpenCreateFeature = () => {
    setEditingFeatureId(null);
    setFeatTitle('');
    setFeatCategory('Layanan');
    setFeatIcon('Sparkles');
    setFeatDesc('');
    setFeatBadge('Unggulan');
    setFeatAudience('Semua Santri');
    setFeatActionText('Pelajari Lebih Lanjut');
    setFeatActionUrl('#sekolah');
    setIsFeatureModalOpen(true);
  };

  const handleEditFeature = (feat: any) => {
    setEditingFeatureId(feat.id);
    setFeatTitle(feat.title);
    setFeatCategory(feat.category);
    setFeatIcon(feat.icon);
    setFeatDesc(feat.description);
    setFeatBadge(feat.badge || '');
    setFeatAudience(feat.targetAudience || '');
    setFeatActionText(feat.actionText || 'Pelajari Lebih Lanjut');
    setFeatActionUrl(feat.actionUrl || '#sekolah');
    setIsFeatureModalOpen(true);
  };

  const handleSaveFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featTitle.trim()) return;

    if (editingFeatureId) {
      updateCustomFeature(editingFeatureId, {
        title: featTitle.trim(),
        category: featCategory,
        icon: featIcon,
        description: featDesc.trim(),
        badge: featBadge.trim() || undefined,
        targetAudience: featAudience.trim() || undefined,
        actionText: featActionText.trim() || undefined,
        actionUrl: featActionUrl.trim() || undefined,
      });
      setStatusMessage('Fitur berhasil diperbarui!');
    } else {
      addCustomFeature({
        title: featTitle.trim(),
        category: featCategory,
        icon: featIcon,
        description: featDesc.trim(),
        badge: featBadge.trim() || undefined,
        targetAudience: featAudience.trim() || undefined,
        actionText: featActionText.trim() || undefined,
        actionUrl: featActionUrl.trim() || undefined,
        isActive: true,
      });
      setStatusMessage('Fitur baru berhasil ditambahkan!');
    }
    setIsFeatureModalOpen(false);
  };

  if (!isOpen) return null;

  const handleAdminGoogleLogin = async () => {
    setLoginError(null);
    const user = await signInWithGoogleAccount();
    if (!user || user.email?.toLowerCase() !== 'ml0752960@gmail.com' || !user.emailVerified) {
      setLoginError('Gunakan akun Google admin sekolah yang sudah terverifikasi.');
      if (user) await signOutAccount();
    }
  };

  if (!isAdminUser) {
    return (
      <div
        className={
          isFullPage
            ? 'w-full min-h-screen bg-[#EEF2F6] flex items-center justify-center p-4 sm:p-6'
            : 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4'
        }
      >
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,41,55,0.16)] border border-slate-200 overflow-hidden p-2">
          <div className="bg-gradient-to-br from-[#0F2937] to-[#006699] text-white rounded-2xl p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              title="Kembali ke Beranda"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/25 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 block">
              SISTEM KEAMANAN TERPROTEKSI
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold mt-1">
              Otentikasi Panel Admin
            </h3>
            <p className="text-xs text-sky-100 mt-1">
              Hanya dapat diakses oleh Pengelola Resmi {schoolIdentity.nama}
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-4 text-xs">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}
            <p className="text-sm text-slate-600 leading-relaxed">
              Masuk menggunakan akun Google admin sekolah. Perubahan panel hanya dapat disimpan oleh akun yang sudah diverifikasi.
            </p>
            <button
              type="button"
              onClick={handleAdminGoogleLogin}
              className="w-full py-3.5 bg-[#006699] hover:bg-[#0F2937] text-white rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk dengan Google Admin</span>
            </button>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Akses Terenkripsi & Terbatas</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Kembali ke Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Primary Sidebar Navigation Items (Clean, Zero Scrollbar Clutter, Website Palette)
  const sidebarNavItems: {
    id: AdminTabId;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number | string;
    group: 'main' | 'cms' | 'academic' | 'system';
  }[] = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutGrid, group: 'main' },
    { id: 'features', label: 'Pusat Buat Fitur', icon: Sparkles, group: 'cms' },
    { id: 'sentraphotos', label: 'Foto 7 Sentra', icon: ImageIcon, group: 'cms' },
    { id: 'appearance', label: 'Tampilan Beranda', icon: Layout, group: 'cms' },
    { id: 'philosophy', label: '4 Kartu & 5 Pilar', icon: BookOpen, group: 'cms' },
    { id: 'identity', label: 'Identitas Sekolah', icon: Building2, group: 'cms' },
    { id: 'hero', label: 'Slide Banner', icon: Sliders, group: 'cms' },
    { id: 'ppdb', label: 'Siswa & SPMB', icon: UserCheck, badge: registrations.length, group: 'academic' },
    { id: 'tuition', label: 'Tagihan SPP', icon: CreditCard, badge: tuitionBills.length, group: 'academic' },
    { id: 'reports', label: 'E-Raport Siswa', icon: GraduationCap, group: 'academic' },
    { id: 'teachers', label: 'Guru & Ustadzah', icon: Users, group: 'cms' },
    { id: 'gallery', label: 'Fasilitas & Galeri', icon: ImageIcon, group: 'cms' },
    { id: 'inquiries', label: 'Pesan & Tamu', icon: MessageSquare, badge: inquiries.length, group: 'academic' },
    { id: 'testimonials', label: 'Testimoni Wali', icon: Star, group: 'cms' },
    { id: 'wacontacts', label: 'Kontak WhatsApp', icon: MessageCircle, group: 'cms' },
    { id: 'gateway', label: 'Broadcast WA', icon: Send, group: 'system' },
    { id: 'cloud', label: 'Cloud & Backup', icon: Database, group: 'system' },
    { id: 'security', label: 'Keamanan Akun', icon: ShieldCheck, group: 'system' },
  ];

  const filteredNavItems = searchQuery.trim()
    ? sidebarNavItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sidebarNavItems;

  const activeNavMeta =
    sidebarNavItems.find((i) => i.id === activeTab) || sidebarNavItems[0];

  const paidBillsCount = tuitionBills.filter((b) => b.status === 'Lunas').length;
  const paidPercentage =
    tuitionBills.length > 0 ? Math.round((paidBillsCount / tuitionBills.length) * 100) : 100;

  const verifiedPpdbCount = registrations.filter(
    (r) => r.status === 'Diterima'
  ).length;
  const ppdbPercentage =
    registrations.length > 0
      ? Math.max(45, Math.round((verifiedPpdbCount / registrations.length) * 100))
      : 75;

  const handleSendManualNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPhone || !notifMessage) return;
    await sendGatewayNotification(
      targetPhone,
      targetName,
      notifType,
      `Pengumuman Sekolah: ${notifType}`,
      notifMessage
    );
    setStatusMessage(`Notifikasi gateway berhasil dikirim ke ${targetPhone} dan dicatat ke database!`);
  };

  const handleSyncToFirestore = async () => {
    setIsSyncingCloud(true);
    try {
      if (!isAdminUser) {
        const loggedIn = await signInWithGoogleAccount();
        if (!loggedIn || loggedIn.email?.toLowerCase() !== 'ml0752960@gmail.com' || !loggedIn.emailVerified) {
          setRestoreStatus('Silakan masuk dengan akun Google admin sekolah yang sudah terverifikasi.');
          setIsSyncingCloud(false);
          return;
        }
      }
      const saved = await saveAllSettingsToServer();
      if (!saved) throw new Error('Ukuran konten melebihi batas Firestore atau izin admin ditolak.');
      setRestoreStatus('Pengaturan website berhasil disimpan ke Firestore.');
      setStatusMessage('Pengaturan website berhasil disimpan ke cloud.');
    } catch (err: any) {
      setRestoreStatus(`Gagal sinkronisasi: ${err?.message || 'Periksa izin akun Google Anda.'}`);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleExportBackup = async () => {
    setIsExporting(true);
    const data = await exportCloudBackup();
    setBackupJson(data);
    setIsExporting(false);
  };

  const handleImportBackup = () => {
    if (!backupJson) return;
    const ok = restoreCloudBackup(backupJson);
    if (ok) {
      setRestoreStatus('Berhasil merestore seluruh database dari paket cadangan!');
    } else {
      setRestoreStatus('Format JSON tidak valid atau rusak.');
    }
  };

  return (
    <div
      className={
        isFullPage
          ? 'w-full min-h-screen bg-[#EEF2F6] p-2 sm:p-3 lg:p-4 flex flex-col'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-2 sm:p-4'
      }
    >
      {/* FULL-WIDTH ROUNDED WORKSPACE IN CONSISTENT WEBSITE COLORS */}
      <div className="w-full bg-[#F8FAFC] rounded-[28px] shadow-[0_16px_50px_rgba(15,41,55,0.1)] border border-slate-200/90 p-3 sm:p-4 lg:p-5 flex flex-col lg:flex-row gap-5 flex-1">
        {/* ==================== LEFT ROUNDED NAVY SIDEBAR (#0F2937) ==================== */}
        <aside className="hidden lg:flex lg:w-[250px] xl:w-[265px] bg-[#0F2937] text-white rounded-[24px] p-4 flex-col justify-between shrink-0 shadow-md">
          <div className="space-y-4">
            {/* Brand Logo Header */}
            <div className="flex items-center gap-3 px-2 pt-1 pb-2 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                <LukmanHakimLogo variant="emblem" size={32} />
              </div>
              <div className="truncate">
                <span className="font-extrabold text-sm tracking-tight text-white block truncate">
                  {schoolIdentity.nama}
                </span>
                <span className="text-[10px] text-sky-300 font-semibold block">
                  Panel Pengelola Resmi
                </span>
              </div>
            </div>

            {/* Clean Navigation Pill List (Fits Without Ugly Scrollbar) */}
            <nav className="space-y-0.5">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#006699] text-white font-extrabold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-sky-200' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                          isActive
                            ? 'bg-white text-[#006699]'
                            : 'bg-sky-500/20 text-sky-200 border border-sky-400/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Website Preview Card (Consistent Ocean Blue & Sky Theme) */}
          <div className="relative bg-gradient-to-br from-[#006699] to-[#0284c7] text-white rounded-2xl p-4 pt-5 mt-4 border border-sky-400/30">
            <button
              onClick={onClose}
              title="Lihat Hasil Perubahan di Website"
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#006699] border-3 border-[#0F2937] flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-end justify-between gap-2">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-sky-200 block">
                  PRATINJAU LANGSUNG
                </span>
                <p className="text-xs font-extrabold leading-tight mt-0.5">
                  Lihat Hasil di Website Utama
                </p>
                <button
                  onClick={onClose}
                  className="mt-1.5 text-[11px] font-extrabold text-amber-300 hover:underline cursor-pointer"
                >
                  Buka Beranda →
                </button>
              </div>
              <div className="flex flex-col gap-1 opacity-40">
                <span className="w-4 h-1 bg-white rounded-sm" />
                <span className="w-4 h-1 bg-white rounded-sm" />
                <span className="w-4 h-1 bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </aside>

        {/* ==================== RIGHT MAIN WORKSPACE ==================== */}
        <div className="flex-1 flex flex-col min-w-0 justify-between">
          <div>
            {/* Top Header Bar (Clean Typography, No AI Emojis) */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1 pt-1 pb-4 border-b border-slate-200/80 mb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg sm:text-xl font-extrabold text-[#0F2937] tracking-tight">
                    Dashboard Pengelola Sekolah
                  </h1>
                  {activeTab !== 'dashboard' && (
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#006699] text-white text-[11px] font-bold cursor-pointer hover:bg-[#0F2937] transition"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Ringkasan Dashboard</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeTab === 'dashboard'
                    ? `Pusat Kendali Konten Website & SIAKAD ${schoolIdentity.nama} • NPSN ${schoolIdentity.npsn}`
                    : `Modul Aktif: ${activeNavMeta.label}`}
                </p>
              </div>

              {/* Right Search Pill + Profile / Logout Controls */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari modul admin..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#006699]"
                  />
                </div>

                <button
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0F2937] border border-slate-200 text-xs font-bold transition cursor-pointer whitespace-nowrap"
                >
                  Lihat Website
                </button>

                <button
                  onClick={async () => {
                    logoutAdminSession();
                    await signOutAccount();
                  }}
                  title="Kunci & Keluar Menu Admin"
                  className="px-3 py-2 rounded-xl bg-[#0F2937] hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kunci Admin</span>
                </button>
              </div>
            </header>

            {/* Mobile Horizontal Pill Navigation */}
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-3 mb-3">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'bg-[#006699] text-white font-extrabold'
                        : 'bg-white text-slate-700 border border-slate-200 font-semibold'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Notification Toast Banner */}
            {statusMessage && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="text-emerald-700 hover:text-emerald-950 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ==================== VIEW 1: OVERVIEW DASHBOARD (CONSISTENT WEBSITE COLORS) ==================== */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* LEFT / CENTER 8 COLUMNS */}
                <div className="lg:col-span-8 space-y-5">
                  {/* Section 1: 3 Top Module Cards */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h2 className="text-sm font-extrabold text-[#0F2937]">
                        Modul Utama & Konten Website
                      </h2>
                      <button
                        onClick={() => setActiveTab('appearance')}
                        className="text-xs font-semibold text-[#006699] hover:underline cursor-pointer"
                      >
                        Pengaturan Tampilan
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Card 1: Tampilan & CMS Website */}
                      <div
                        onClick={() => setActiveTab('appearance')}
                        className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#006699] border border-sky-100 flex items-center justify-center shrink-0">
                            <Layout className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-extrabold text-[#0F2937] truncate">
                              Tampilan Website
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              {heroSlides.length} Slide & 8 Bagian
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Status</span>
                            <span className="font-extrabold text-emerald-700 block mt-0.5">
                              Aktif Tayang
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block">Kategori</span>
                            <span className="font-bold text-[#0F2937] block mt-0.5">
                              CMS Beranda
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Pendaftaran SPMB */}
                      <div
                        onClick={() => setActiveTab('ppdb')}
                        className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-extrabold text-[#0F2937] truncate">
                              Pendaftar SPMB
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              {registrations.length} Calon Santri
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Verifikasi</span>
                            <span className="font-extrabold text-[#006699] block mt-0.5">
                              {verifiedPpdbCount} Diterima
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block">Kategori</span>
                            <span className="font-bold text-[#0F2937] block mt-0.5">
                              Data Siswa
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Keuangan & SPP */}
                      <div
                        onClick={() => setActiveTab('tuition')}
                        className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-extrabold text-[#0F2937] truncate">
                              Tagihan & SPP
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              {tuitionBills.length} Data Tagihan
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Status Lunas</span>
                            <span className="font-extrabold text-emerald-700 block mt-0.5">
                              {paidPercentage}% Terbayar
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block">Kategori</span>
                            <span className="font-bold text-[#0F2937] block mt-0.5">
                              Keuangan
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Middle Split (Statistik Aktivitas + Pintasan Ubah Website) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Left 7 Cols: Statistik Aktivitas Sekolah */}
                    <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-extrabold text-[#0F2937]">
                            Statistik Aktivitas & Kunjungan
                          </h3>
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700">
                            Mingguan
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                            <TrendingUp className="w-3 h-3" /> +12%
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            Interaksi pendaftaran & portal wali murid
                          </span>
                        </div>
                      </div>

                      {/* Vertical Bar Chart in Consistent Navy & Ocean Blue */}
                      <div className="mt-6 pt-4 flex items-end justify-between gap-2 h-40 px-2 relative">
                        <div className="flex flex-col justify-between h-full text-[10px] text-slate-400 pr-2 pb-5">
                          <span>80</span>
                          <span>60</span>
                          <span>40</span>
                          <span>20</span>
                        </div>

                        {[
                          { day: 'Sen', height: '58%', active: false },
                          { day: 'Sel', height: '72%', active: false },
                          { day: 'Rab', height: '46%', active: false },
                          { day: 'Kam', height: '92%', active: true },
                          { day: 'Jum', height: '68%', active: false },
                          { day: 'Sab', height: '38%', active: false },
                          { day: 'Min', height: '62%', active: false },
                        ].map((bar) => (
                          <div
                            key={bar.day}
                            className="flex-1 flex flex-col items-center justify-end h-full gap-2 relative"
                          >
                            {bar.active && (
                              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0F2937] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-sm z-10">
                                <span className="text-sky-300 block">
                                  {registrations.length} Siswa Terdaftar
                                </span>
                              </div>
                            )}
                            <div className="w-full flex justify-center items-end flex-1">
                              <div
                                style={{ height: bar.height }}
                                className={`w-3 rounded-full transition-all duration-300 ${
                                  bar.active ? 'bg-[#006699]' : 'bg-[#0F2937]/80'
                                }`}
                              />
                            </div>
                            <span className="text-[11px] text-slate-500 font-semibold">
                              {bar.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right 5 Cols: Pintasan Edit Website */}
                    <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                      <h3 className="text-sm font-extrabold text-[#0F2937] mb-2">
                        Pintasan Edit Website
                      </h3>

                      <div className="space-y-2.5">
                        {[
                          {
                            id: 'philosophy' as AdminTabId,
                            title: '4 Kartu & 5 Pilar',
                            sub: 'Filosofi & Karakter',
                            bg: 'bg-sky-50 text-[#006699]',
                            icon: BookOpen,
                          },
                          {
                            id: 'identity' as AdminTabId,
                            title: 'Identitas Sekolah',
                            sub: 'Nama, NPSN & Kontak',
                            bg: 'bg-emerald-50 text-emerald-700',
                            icon: Building2,
                          },
                          {
                            id: 'hero' as AdminTabId,
                            title: 'Slide Banner Utama',
                            sub: `${heroSlides.length} Slide Beranda`,
                            bg: 'bg-amber-50 text-amber-700',
                            icon: Sliders,
                          },
                          {
                            id: 'security' as AdminTabId,
                            title: 'Kode PIN & Privasi',
                            sub: 'Keamanan Login Admin',
                            bg: 'bg-slate-100 text-[#0F2937]',
                            icon: Lock,
                          },
                        ].map((shortcut) => {
                          const Icon = shortcut.icon;
                          return (
                            <button
                              key={shortcut.id}
                              onClick={() => setActiveTab(shortcut.id)}
                              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group text-left"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-9 h-9 rounded-xl ${shortcut.bg} flex items-center justify-center shrink-0`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="truncate">
                                  <span className="text-xs font-extrabold text-[#0F2937] block truncate">
                                    {shortcut.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500 block truncate">
                                    {shortcut.sub}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#006699] shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Bottom Rows (Data Akademik, Guru & Galeri Aktif) */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h2 className="text-sm font-extrabold text-[#0F2937]">
                        Data Akademik, Guru & Galeri Aktif
                      </h2>
                      <button
                        onClick={() => setActiveTab('reports')}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#006699] text-white text-[11px] font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Kelola Raport</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div
                        onClick={() => setActiveTab('reports')}
                        className="bg-white rounded-2xl p-4 border border-slate-200/90 flex flex-wrap items-center justify-between gap-4 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#006699] flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0F2937]">
                              E-Raport Capaian Perkembangan Santri
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Kepala Sekolah: {schoolIdentity.kepalaSekolah}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 ml-auto">
                          <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-slate-400 block">Data Tersimpan</span>
                            <span className="text-xs font-extrabold text-[#0F2937]">
                              {reports.length} Raport Siswa
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-[3px] border-emerald-600 inline-block" />
                            <span className="text-xs font-extrabold text-[#0F2937]">100%</span>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('teachers')}
                        className="bg-white rounded-2xl p-4 border border-slate-200/90 flex flex-wrap items-center justify-between gap-4 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#0F2937]">
                              Dewan Pendidik, Ustadzah & Galeri Fasilitas
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {teachers.length} Ustadzah Aktif • {gallery.length} Dokumentasi Kampus
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 ml-auto">
                          <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-slate-400 block">Kualifikasi</span>
                            <span className="text-xs font-extrabold text-[#0F2937]">
                              S1 PAUD & Tilawati
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-[3px] border-[#006699] inline-block" />
                            <span className="text-xs font-extrabold text-[#0F2937]">
                              {ppdbPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT 4 COLUMNS */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Right Card 1: Navy Promo / Cloud Card */}
                  <div className="bg-gradient-to-br from-[#0F2937] to-[#006699] text-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{schoolIdentity.nama}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold mt-2.5 tracking-tight">
                      Sinkronisasi Konten Website
                    </h3>
                    <p className="text-xs text-sky-100 mt-1 leading-relaxed">
                      Simpan identitas, banner, teks, dan galeri agar tampil konsisten di semua perangkat.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-sky-50 text-[#0F2937] text-xs font-extrabold transition cursor-pointer"
                      >
                        Lihat Website
                      </button>
                      <button
                        onClick={handleSaveWebsiteSettings}
                        disabled={!isAdminUser}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        title={isAdminUser ? 'Simpan pengaturan ke Firestore' : 'Masuk dengan akun Google admin untuk menyimpan ke cloud'}
                      >
                        <Cloud className="w-3.5 h-3.5" /> Simpan ke Cloud
                      </button>
                      <button
                        onClick={() => {
                          resetToDefaultData();
                          setStatusMessage('Seluruh data telah dikembalikan ke pengaturan bawaan awal!');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset Bawaan
                      </button>
                    </div>
                  </div>

                  {/* Right Card 2: Mini Calendar Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold text-[#0F2937] flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#006699]" />
                        Kalender Akademik • September 2026
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5">
                      <span>M</span>
                      <span>S</span>
                      <span>S</span>
                      <span>R</span>
                      <span>K</span>
                      <span>J</span>
                      <span>S</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-700">
                      {[
                        28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2,
                      ].map((day, idx) => {
                        const isMuted = idx < 3 || idx > 32;
                        const isToday = day === 17 && !isMuted;
                        return (
                          <div
                            key={idx}
                            className={`py-1.5 rounded-lg flex items-center justify-center ${
                              isToday
                                ? 'bg-[#006699] text-white font-extrabold'
                                : isMuted
                                ? 'text-slate-300'
                                : 'hover:bg-slate-100'
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Card 3: Pendaftaran & Pesan Masuk */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-sm font-extrabold text-[#0F2937]">
                        Pendaftaran & Pesan Baru
                      </h3>
                      <button
                        onClick={() => setActiveTab('ppdb')}
                        className="w-6 h-6 rounded-lg bg-[#006699] text-white flex items-center justify-center font-bold cursor-pointer"
                        title="Kelola PPDB"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {registrations.slice(0, 2).map((reg) => (
                        <div
                          key={reg.id}
                          onClick={() => setActiveTab('ppdb')}
                          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 flex items-center justify-between gap-3 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#006699] flex items-center justify-center shrink-0 font-extrabold text-xs">
                              {reg.childName.charAt(0)}
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-extrabold text-[#0F2937] truncate">
                                {reg.childName}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate">
                                {reg.program} • {reg.parentName}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold shrink-0 ${
                              reg.status === 'Diterima'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-sky-50 text-[#006699] border border-sky-200'
                            }`}
                          >
                            {reg.status}
                          </span>
                        </div>
                      ))}

                      {inquiries.slice(0, 1).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setActiveTab('inquiries')}
                          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 flex items-center justify-between gap-3 hover:border-[#006699] transition cursor-pointer shadow-2xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-extrabold text-[#0F2937] truncate">
                                {inq.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate">{inq.interest}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold shrink-0">
                            {inq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== VIEW 2: ACTIVE CRUD MODULE WORKSPACE ==================== */}
            {activeTab !== 'dashboard' && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
                  {activeTab === 'appearance' && (
                    <AppearanceAndSectionsCrudTab
                      appearanceConfig={appearanceConfig}
                      updateAppearanceConfig={updateAppearanceConfig}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'identity' && (
                    <SchoolIdentityCrudTab
                      schoolIdentity={schoolIdentity}
                      updateSchoolIdentity={updateSchoolIdentity}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'hero' && (
                    <HeroSlidesCrudTab
                      heroSlides={heroSlides}
                      addHeroSlide={addHeroSlide}
                      updateHeroSlide={updateHeroSlide}
                      deleteHeroSlide={deleteHeroSlide}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'philosophy' && (
                    <PhilosophyAndPillarsCrudTab
                      philosophyCards={philosophyCards}
                      updatePhilosophyCard={updatePhilosophyCard}
                      pillarsData={pillarsData}
                      updatePillarItem={updatePillarItem}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'teachers' && (
                    <TeachersCrudTab
                      teachers={teachers}
                      addTeacher={addTeacher}
                      updateTeacher={updateTeacher}
                      deleteTeacher={deleteTeacher}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'gallery' && (
                    <GalleryCrudTab
                      gallery={gallery}
                      addGalleryItem={addGalleryItem}
                      updateGalleryItem={updateGalleryItem}
                      deleteGalleryItem={deleteGalleryItem}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'testimonials' && (
                    <TestimonialsCrudTab
                      testimonials={testimonials}
                      addTestimonial={addTestimonial}
                      updateTestimonial={updateTestimonial}
                      deleteTestimonial={deleteTestimonial}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'wacontacts' && (
                    <WaContactsCrudTab
                      waContacts={waContacts}
                      addWaContact={addWaContact}
                      updateWaContact={updateWaContact}
                      deleteWaContact={deleteWaContact}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'ppdb' && (
                    <PpdbCrudTab
                      registrations={registrations}
                      addRegistration={addRegistration}
                      updateRegistration={updateRegistration}
                      updateRegistrationStatus={updateRegistrationStatus}
                      deleteRegistration={deleteRegistration}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'tuition' && (
                    <TuitionCrudTab
                      tuitionBills={tuitionBills}
                      addTuitionBill={addTuitionBill}
                      updateTuitionBill={updateTuitionBill}
                      deleteTuitionBill={deleteTuitionBill}
                      payTuitionBill={payTuitionBill}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'reports' && (
                    <ReportsCrudTab
                      reports={reports}
                      addReport={addReport}
                      updateReport={updateReport}
                      deleteReport={deleteReport}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'inquiries' && (
                    <InquiriesCrudTab
                      inquiries={inquiries}
                      addInquiry={addInquiry}
                      updateInquiry={updateInquiry}
                      deleteInquiry={deleteInquiry}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'security' && (
                    <AdminSecurityCrudTab
                      adminCredentials={adminCredentials}
                      updateAdminCredentials={updateAdminCredentials}
                      onNotify={setStatusMessage}
                    />
                  )}

                  {activeTab === 'gateway' && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-900 text-base">
                          API Gateway Notifikasi Otomatis ke Orang Tua
                        </h4>
                        <p className="text-xs text-slate-500">
                          Kirim pengumuman broadcast sekolah, kuitansi SPP, dan status PPDB langsung ke WhatsApp wali murid.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSendManualNotification}
                        className="bg-white p-5 rounded-xl border border-slate-200 space-y-4"
                      >
                        <h5 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          <Send className="w-4 h-4 text-[#006699]" /> Kirim Pesan Cepat via Gateway WhatsApp
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">
                              Nomor Ponsel Orang Tua *
                            </label>
                            <input
                              type="text"
                              required
                              value={targetPhone}
                              onChange={(e) => setTargetPhone(e.target.value)}
                              placeholder="081234567890"
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">
                              Nama Penerima
                            </label>
                            <input
                              type="text"
                              value={targetName}
                              onChange={(e) => setTargetName(e.target.value)}
                              placeholder="Bpk. Bambang"
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-700 block mb-1">Tipe Pesan</label>
                            <select
                              value={notifType}
                              onChange={(e) => setNotifType(e.target.value as any)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                            >
                              <option value="BROADCAST">Pengumuman Broadcast Sekolah</option>
                              <option value="PPDB">Notifikasi PPDB</option>
                              <option value="SPP">Pengingat & Kuitansi SPP</option>
                              <option value="RAPORT">Pemberitahuan E-Raport</option>
                            </select>
                          </div>
                        </div>

                        <div className="text-xs">
                          <label className="font-bold text-slate-700 block mb-1">
                            Isi Pesan WhatsApp *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={notifMessage}
                            onChange={(e) => setNotifMessage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#006699] hover:bg-[#0F2937] text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" /> Kirim ke Ponsel Orang Tua
                          </button>
                        </div>
                      </form>

                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="bg-slate-100 p-3 font-bold text-xs text-slate-700 border-b border-slate-200">
                          Riwayat Log Transmisi Gateway WhatsApp ({notificationLogs.length})
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                              <tr>
                                <th className="p-3">Waktu</th>
                                <th className="p-3">Penerima</th>
                                <th className="p-3">Nomor HP</th>
                                <th className="p-3">Tipe</th>
                                <th className="p-3">Pesan</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Aksi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {notificationLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50">
                                  <td className="p-3 font-mono text-slate-500 whitespace-nowrap tabular-nums">
                                    {log.timestamp}
                                  </td>
                                  <td className="p-3 font-medium text-slate-800">
                                    {log.recipientName}
                                  </td>
                                  <td className="p-3 font-mono text-slate-600 tabular-nums">
                                    {log.recipientPhone}
                                  </td>
                                  <td className="p-3 font-semibold text-[#006699]">{log.type}</td>
                                  <td className="p-3 text-slate-700 max-w-sm truncate">
                                    {log.message}
                                  </td>
                                  <td className="p-3 font-semibold text-emerald-700">
                                    {log.status}
                                  </td>
                                  <td className="p-3 text-right">
                                    <button
                                      onClick={() => {
                                        deleteNotificationLog(log.id);
                                        setStatusMessage('Log notifikasi dihapus.');
                                      }}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                                      title="Hapus Log"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'cloud' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">
                              Firebase Cloud Firestore Database & Penyimpanan Otomatis
                            </h4>
                              <span className="text-xs font-semibold text-emerald-700">
                                ·{' '}
                                {currentUser
                                  ? isCloudSynced
                                    ? `Terhubung Live (${lastCloudSyncAt || 'Aktif'})`
                                    : 'Terautentikasi Google'
                                  : 'Tersimpan di perangkat ini'}
                              </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Simpan perubahan CMS ke Firestore agar tampil konsisten di semua perangkat. Data contoh yang terpasang bawaan tidak dianggap sebagai pendaftar aktif.
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {!isAdminUser ? (
                            <button
                              onClick={signInWithGoogleAccount}
                              className="px-4 py-2.5 bg-[#006699] hover:bg-[#0F2937] text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Cloud className="w-4 h-4" /> Login Google untuk Cloud DB
                            </button>
                          ) : (
                            <button
                              onClick={handleSyncToFirestore}
                              disabled={isSyncingCloud}
                              className="px-4 py-2.5 bg-[#006699] hover:bg-[#0F2937] text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                            >
                              <RefreshCw
                                className={`w-4 h-4 ${isSyncingCloud ? 'animate-spin' : ''}`}
                              />
                              <span>
                                {isSyncingCloud
                                  ? 'Menyinkronkan...'
                                  : 'Sinkronisasi Semua Data ke Firestore'}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                        <h5 className="font-bold text-xs text-slate-900">
                          Pusat Cadangan Data (Export JSON, Restore & Reset ke Pengaturan Awal)
                        </h5>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={handleExportBackup}
                            disabled={isExporting}
                            className="px-4 py-2 bg-[#0F2937] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-4 h-4" /> Export Cadangan JSON
                          </button>
                          <button
                            onClick={handleImportBackup}
                            className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-4 h-4" /> Restore Database dari JSON
                          </button>
                          <button
                            onClick={() => {
                              resetToDefaultData();
                              setRestoreStatus(
                                'Seluruh konten website & data berhasil dikembalikan ke pengaturan awal bawaan.'
                              );
                            }}
                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Reset Semua ke Data Bawaan Awal
                          </button>
                        </div>

                        {restoreStatus && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
                            {restoreStatus}
                          </div>
                        )}

                        <div>
                          <label className="font-bold text-slate-700 block mb-1 text-xs">
                            Paket Data JSON:
                          </label>
                          <textarea
                            rows={6}
                            value={backupJson}
                            onChange={(e) => setBackupJson(e.target.value)}
                            placeholder="Klik 'Export Cadangan JSON' untuk men-generate paket cadangan lengkap, atau tempelkan cadangan lama untuk me-restore..."
                            className="w-full bg-[#0F2937] text-sky-300 font-mono text-xs rounded-xl p-3.5"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#0F2937] via-[#006699] to-sky-700 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sky-200 text-xs font-bold mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Pusat Kendali Fitur &amp; Inovasi Sekolah</span>
                          </div>
                          <h4 className="text-xl font-black text-white">
                            Pusat Buat Fitur &amp; Modul Tambahan
                          </h4>
                          <p className="text-xs text-sky-100 mt-1 max-w-xl">
                            Admin dapat membuat, mengubah, mengaktifkan/menonaktifkan, serta mengelola fitur atau program khusus sekolah secara mandiri tanpa coding.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleOpenCreateFeature}
                          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Buat Fitur Baru</span>
                        </button>
                      </div>

                      {/* Quick Feature Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Fitur</span>
                          <span className="text-2xl font-black text-slate-900 mt-1 block">{customFeatures.length} Modul</span>
                        </div>
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <span className="text-[11px] font-bold text-emerald-700 uppercase block">Fitur Aktif</span>
                          <span className="text-2xl font-black text-emerald-800 mt-1 block">
                            {customFeatures.filter((f) => f.isActive).length} Aktif
                          </span>
                        </div>
                        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                          <span className="text-[11px] font-bold text-[#006699] uppercase block">Kategori Terbanyak</span>
                          <span className="text-sm font-extrabold text-[#0F2937] mt-2 block">Layanan &amp; Karakter</span>
                        </div>
                      </div>

                      {/* Feature Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {customFeatures.map((feat) => (
                          <div
                            key={feat.id}
                            className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between shadow-xs ${
                              feat.isActive
                                ? 'border-sky-300 ring-1 ring-sky-200 hover:shadow-md'
                                : 'border-slate-200 opacity-60 bg-slate-50/50'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#006699] flex items-center justify-center font-bold shrink-0">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {feat.badge && (
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                      {feat.badge}
                                    </span>
                                  )}
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    {feat.category}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <h5 className="font-extrabold text-base text-slate-900 leading-tight">
                                  {feat.title}
                                </h5>
                                {feat.targetAudience && (
                                  <span className="text-[11px] font-semibold text-[#0084d6] block mt-0.5">
                                    Sasaran: {feat.targetAudience}
                                  </span>
                                )}
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                  {feat.description}
                                </p>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => toggleCustomFeature(feat.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                  feat.isActive
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{feat.isActive ? 'Aktif' : 'Nonaktif'}</span>
                              </button>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleEditFeature(feat)}
                                  className="px-2.5 py-1.5 text-xs font-bold text-[#006699] hover:bg-sky-50 rounded-lg transition cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Hapus fitur "${feat.title}"?`)) {
                                      deleteCustomFeature(feat.id);
                                      setStatusMessage('Fitur berhasil dihapus!');
                                    }
                                  }}
                                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Hapus Fitur"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'sentraphotos' && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#0F2937] via-[#006699] to-teal-700 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-teal-200 text-xs font-bold mb-2">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                            <span>Dokumentasi Autentik Kelas &amp; Sentra</span>
                          </div>
                          <h4 className="text-xl font-black text-white">
                            Pusat Dokumentasi 7 Sentra Belajar
                          </h4>
                          <p className="text-xs text-sky-100 mt-1 max-w-xl">
                            Kelola dan unggah dokumentasi foto santri per sentra, terutama <strong>Sentra Bahan Alam &amp; Sains (Sentra Alam Cair)</strong>.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-white/15 px-3 py-1.5 rounded-xl font-mono text-amber-300">
                            {adminUserPhotos.length} Foto Kustom
                          </span>
                        </div>
                      </div>

                      {/* Sentra Selector Filter */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {SEVEN_SENTRA_DATA.map((sentra) => (
                          <button
                            key={sentra.id}
                            type="button"
                            onClick={() => setAdminSentraTarget(sentra.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                              adminSentraTarget === sentra.id
                                ? 'bg-[#006699] text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {sentra.name}
                          </button>
                        ))}
                      </div>

                      {/* Photo Upload Form for Active Sentra */}
                      <form onSubmit={handleAdminSaveSentraPhotos} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                        <h5 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#006699]" />
                          <span>Unggah Foto Tambahan ke: {SEVEN_SENTRA_DATA.find((s) => s.id === adminSentraTarget)?.name}</span>
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-xs text-slate-700 block mb-1">Judul / Keterangan Singkat</label>
                            <input
                              type="text"
                              value={adminSentraTitle}
                              onChange={(e) => setAdminSentraTitle(e.target.value)}
                              placeholder="Contoh: Praktik Air & Mengamati Ikan Hidup"
                              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-[#006699]"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-xs text-slate-700 block mb-1">Deskripsi Aktivitas</label>
                            <input
                              type="text"
                              value={adminSentraDesc}
                              onChange={(e) => setAdminSentraDesc(e.target.value)}
                              placeholder="Contoh: Santri mengeksplorasi aliran air dan tekstur..."
                              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-[#006699]"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <label className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-sky-300 rounded-xl bg-white hover:bg-sky-50/50 cursor-pointer transition text-xs font-bold text-[#006699]">
                            <Upload className="w-4 h-4" />
                            <span>Pilih Berkas Foto dari Perangkat ({adminSentraFiles.length} file dipilih)</span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleAdminSentraFileUpload}
                              className="hidden"
                            />
                          </label>

                          <button
                            type="submit"
                            disabled={adminSentraFiles.length === 0}
                            className="py-3 px-6 bg-[#006699] hover:bg-[#00527a] disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed shrink-0"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Simpan Foto ({adminSentraFiles.length})</span>
                          </button>
                        </div>
                      </form>

                      {/* Photos List for Target Sentra */}
                      <div className="space-y-3">
                        <h5 className="font-extrabold text-sm text-slate-800">
                          Foto Tersimpan di Sentra Ini ({adminUserPhotos.filter((p) => p.sentraId === adminSentraTarget).length} Foto Kustom)
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {adminUserPhotos
                            .filter((p) => p.sentraId === adminSentraTarget)
                            .map((photo) => (
                              <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                                <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-2 text-white">
                                  <span className="text-[10px] font-bold line-clamp-2">{photo.title}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleAdminDeleteSentraPhoto(photo.id)}
                                    className="self-end p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition cursor-pointer"
                                    title="Hapus foto"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          {adminUserPhotos.filter((p) => p.sentraId === adminSentraTarget).length === 0 && (
                            <div className="col-span-full py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                              Belum ada foto kustom tambahan untuk sentra ini. Anda dapat mengunggah melalui formulir di atas.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Quick Summary Strip (Fills Bottom Space Cleanly on Sub-Tabs) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveTab('ppdb')}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:border-[#006699] transition"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        Total Pendaftar PPDB
                      </span>
                      <span className="text-lg font-extrabold text-[#0F2937] mt-0.5 block">
                        {registrations.length} Siswa
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#006699] flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('tuition')}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:border-[#006699] transition"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        Tagihan SPP Lunas
                      </span>
                      <span className="text-lg font-extrabold text-emerald-700 mt-0.5 block">
                        {paidBillsCount} / {tuitionBills.length}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('teachers')}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:border-[#006699] transition"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        Pendidik & Ustadzah
                      </span>
                      <span className="text-lg font-extrabold text-[#0F2937] mt-0.5 block">
                        {teachers.length} Pengajar
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('appearance')}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 flex items-center justify-between cursor-pointer hover:border-[#006699] transition"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        Status Tampilan Web
                      </span>
                      <span className="text-lg font-extrabold text-[#006699] mt-0.5 block">
                        Aktif & Sinkron
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#006699] flex items-center justify-center">
                      <Layout className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== MODAL: BUAT / EDIT FITUR BARU ==================== */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#006699] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    {editingFeatureId ? 'Edit Fitur Sekolah' : 'Buat Fitur Baru'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Kelola modul, program khusus, atau layanan santri
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatureModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeature} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Fitur / Program *</label>
                <input
                  type="text"
                  required
                  value={featTitle}
                  onChange={(e) => setFeatTitle(e.target.value)}
                  placeholder="Contoh: Kelas Renang Ceria & Motorik Air"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={featCategory}
                    onChange={(e) => setFeatCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] outline-none"
                  >
                    <option value="Layanan">Layanan</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Karakter">Karakter</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge / Label</label>
                  <input
                    type="text"
                    value={featBadge}
                    onChange={(e) => setFeatBadge(e.target.value)}
                    placeholder="Contoh: Unggulan / Baru"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target / Sasaran Santri</label>
                <input
                  type="text"
                  value={featAudience}
                  onChange={(e) => setFeatAudience(e.target.value)}
                  placeholder="Contoh: Santri Usia 3 - 6 Tahun / Semua Jenjang"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Lengkap *</label>
                <textarea
                  rows={3}
                  required
                  value={featDesc}
                  onChange={(e) => setFeatDesc(e.target.value)}
                  placeholder="Jelaskan detail program, manfaat bagi ananda, dan pelaksanaannya..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-[#006699] focus:bg-white outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teks Tombol Aksi</label>
                  <input
                    type="text"
                    value={featActionText}
                    onChange={(e) => setFeatActionText(e.target.value)}
                    placeholder="Contoh: Daftar Sekarang"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tujuan / Link Aksi</label>
                  <input
                    type="text"
                    value={featActionUrl}
                    onChange={(e) => setFeatActionUrl(e.target.value)}
                    placeholder="Contoh: #ppdb atau #kontak"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:border-[#006699] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFeatureModalOpen(false)}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-bold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#006699] hover:bg-[#00527a] text-white font-extrabold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Fitur</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
