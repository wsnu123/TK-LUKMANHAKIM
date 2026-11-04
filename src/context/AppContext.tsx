import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  db,
  auth,
  loginWithGoogle,
  logoutFirebase,
  serverTimestamp,
  handleFirestoreError,
  OperationType,
  BOOTSTRAPPED_ADMIN_EMAIL,
  VALIDATION_LIMITS,
  sanitizeId,
  sanitizeString,
} from '../firebase';
import {
  Teacher,
  GalleryItem,
  Registration,
  TuitionBill,
  StudentReport,
  NotificationLog,
  Inquiry,
  LaravelBridgeConfig,
  AspectRating,
  HeroSlide,
  SchoolIdentity,
  TestimonialItem,
  WaAdminContact,
  SchoolActivityPhoto,
  PhilosophyCardItem,
  PillarItem,
  WebsiteAppearanceConfig,
  AdminCredentials,
  CustomFeature,
} from '../types';
import {
  INITIAL_TEACHERS,
  INITIAL_GALLERY,
  INITIAL_REGISTRATIONS,
  INITIAL_TUITION_BILLS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATION_LOGS,
  INITIAL_INQUIRIES,
  INITIAL_HERO_SLIDES,
  SCHOOL_IDENTITY,
  TESTIMONIALS,
  WA_ADMIN_CONTACTS,
  SCHOOL_ACTIVITY_PHOTOS,
} from '../data/initialData';

interface AppContextType {
  currentUser: User | any | null;
  isAuthReady: boolean;
  isAdminUser: boolean;
  isCloudSynced: boolean;
  lastCloudSyncAt: string | null;
  signInWithGoogleAccount: () => Promise<User | any | null>;
  signInWithGmailAddress: (email: string, name?: string) => Promise<any>;
  signOutAccount: () => Promise<void>;
  syncLocalDataToFirestore: () => Promise<void>;
  sendPpdbConfirmationEmail: (reg: Registration) => Promise<{ success: boolean; messageId?: string; previewUrl?: string }>;
  sendAnnouncementEmail: (data: {
    to: string;
    subject: string;
    body: string;
    childName: string;
    regNumber: string;
    status: string;
    program: string;
    parentName?: string;
  }) => Promise<{ success: boolean; messageId?: string; email?: any; gmailWebLink?: string }>;
  sendTuitionReceiptEmail: (data: {
    to: string;
    studentName: string;
    nis: string;
    month: string;
    year: number;
    totalAmount: number;
    paymentMethod: string;
    receiptNumber?: string;
  }) => Promise<any>;
  fetchInboxEmails: (email: string) => Promise<any[]>;

  schoolIdentity: SchoolIdentity;
  updateSchoolIdentity: (updated: Partial<SchoolIdentity>) => void;
  saveAllSettingsToServer: () => Promise<boolean>;

  heroSlides: HeroSlide[];
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updated: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;

  activityPhotos: SchoolActivityPhoto[];
  addActivityPhoto: (photo: Omit<SchoolActivityPhoto, 'id' | 'order'>) => void;
  updateActivityPhoto: (id: string, updated: Partial<SchoolActivityPhoto>) => void;
  deleteActivityPhoto: (id: string) => void;
  resetActivityPhotos: () => void;

  philosophyCards: PhilosophyCardItem[];
  updatePhilosophyCard: (id: string, updated: Partial<PhilosophyCardItem>) => void;

  pillarsData: PillarItem[];
  updatePillarItem: (id: string, updated: Partial<PillarItem>) => void;

  appearanceConfig: WebsiteAppearanceConfig;
  updateAppearanceConfig: (updated: Partial<WebsiteAppearanceConfig>) => void;

  adminCredentials: AdminCredentials;
  updateAdminCredentials: (updated: Partial<AdminCredentials>) => void;
  isAdminAuthenticated: boolean;
  loginAdminWithCredentials: (username: string, password: string) => boolean;
  logoutAdminSession: () => void;

  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  waContacts: WaAdminContact[];
  addWaContact: (contact: Omit<WaAdminContact, 'id'>) => void;
  updateWaContact: (id: string, updated: Partial<WaAdminContact>) => void;
  deleteWaContact: (id: string) => void;

  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'regNumber' | 'createdAt' | 'waSent'> & { status?: Registration['status'] }) => Registration;
  updateRegistration: (id: string, updated: Partial<Registration>) => void;
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;

  tuitionBills: TuitionBill[];
  payTuitionBill: (id: string, method?: TuitionBill['paymentMethod']) => void;
  addTuitionBill: (bill: Omit<TuitionBill, 'id'>) => void;
  updateTuitionBill: (id: string, updated: Partial<TuitionBill>) => void;
  deleteTuitionBill: (id: string) => void;

  reports: StudentReport[];
  updateReport: (id: string, updated: Partial<StudentReport>) => void;
  addReport: (report: Omit<StudentReport, 'id'>) => void;
  deleteReport: (id: string) => void;

  notificationLogs: NotificationLog[];
  sendGatewayNotification: (
    phone: string,
    recipientName: string,
    type: NotificationLog['type'],
    title: string,
    message: string,
    channel?: NotificationLog['channel']
  ) => Promise<{ success: boolean; messageId: string }>;
  deleteNotificationLog: (id: string) => void;

  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<Inquiry>;
  updateInquiry: (id: string, updated: Partial<Inquiry>) => void;
  deleteInquiry: (id: string) => void;

  laravelConfig: LaravelBridgeConfig;
  updateLaravelConfig: (cfg: Partial<LaravelBridgeConfig>) => void;

  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;

  customFeatures: CustomFeature[];
  addCustomFeature: (feat: Omit<CustomFeature, 'id' | 'createdAt'>) => void;
  updateCustomFeature: (id: string, updated: Partial<CustomFeature>) => void;
  deleteCustomFeature: (id: string) => void;
  toggleCustomFeature: (id: string) => void;

  exportCloudBackup: () => Promise<string>;
  restoreCloudBackup: (jsonString: string) => boolean;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TEACHERS: 'tklh_teachers_v1',
  GALLERY: 'tklh_gallery_v3',
  REGISTRATIONS: 'tklh_registrations_v1',
  TUITION: 'tklh_tuition_v1',
  REPORTS: 'tklh_reports_v1',
  NOTIFICATIONS: 'tklh_notifications_v1',
  INQUIRIES: 'tklh_inquiries_v1',
  LARAVEL_CFG: 'tklh_laravel_cfg_v1',
  LOGGED_GMAIL_USER: 'tklh_logged_gmail_user_v1',
  SCHOOL_IDENTITY: 'tklh_school_identity_v1',
  HERO_SLIDES: 'tklh_hero_slides_v3',
  ACTIVITY_PHOTOS: 'tklh_school_activity_photos_v3',
  TESTIMONIALS: 'tklh_testimonials_v1',
  WA_CONTACTS: 'tklh_wa_contacts_v1',
  PHILOSOPHY_CARDS: 'tklh_philosophy_cards_v2',
  PILLARS_DATA: 'tklh_pillars_data_v3',
  APPEARANCE_CFG: 'tklh_appearance_cfg_v5',
  ADMIN_CREDS: 'tklh_admin_creds_v2_sec',
  ADMIN_SESSION: 'tklh_admin_session_v2_sec',
  CUSTOM_FEATURES: 'tklh_custom_features_v1',
};

const DEFAULT_CUSTOM_FEATURES: CustomFeature[] = [
  {
    id: 'feat_trial',
    title: 'Free Trial Class Santri Baru',
    category: 'Layanan',
    icon: 'Sparkles',
    description: 'Program observasi kelas langsung selama 1 hari bagi calon ananda santri baru bersama ustadzah.',
    badge: 'Populer',
    isActive: true,
    targetAudience: 'Usia 2 - 6 Tahun',
    actionText: 'Daftar Sekarang',
    actionUrl: '#ppdb',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'feat_antar_jemput',
    title: 'Layanan Antar Jemput Amanah',
    category: 'Fasilitas',
    icon: 'Truck',
    description: 'Armada antar-jemput ramah anak dengan pendamping ustadzah untuk area Purwokerto Selatan & sekitarnya.',
    badge: 'Amanah',
    isActive: true,
    targetAudience: 'Semua Jenjang',
    actionText: 'Konsultasi Rute',
    actionUrl: '#kontak',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'feat_pmt',
    title: 'Menu Gizi PMT Harian Sehat Non-MSG',
    category: 'Karakter',
    icon: 'Utensils',
    description: 'Pemberian Makanan Tambahan (PMT) dan makan siang bergizi seimbang tanpa MSG untuk daya tahan tubuh anak.',
    badge: 'Sehat & Halal',
    isActive: true,
    targetAudience: 'Seluruh Santri',
    actionText: 'Lihat Jadwal Menu',
    actionUrl: '#fasilitas',
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_PHILOSOPHY_CARDS: PhilosophyCardItem[] = [
  {
    id: 'phil_1',
    title: 'Filosofi',
    desc: '5 Pilar (Faith in Allah SWT, Respect, Cleanliness, Responsibility, Honesty) & 8 Basis Pembelajaran.',
  },
  {
    id: 'phil_2',
    title: 'Guru yang Kompeten & Handal',
    desc: 'Guru-guru di TK Lukman Hakim adalah pendidik, komunikator, fasilitator, dan motivator untuk setiap murid. Kita tidak hanya mendidik, tetapi kita juga sadar bahwa kita harus bisa menjadi role model dan orang tua kedua bagi murid.',
  },
  {
    id: 'phil_3',
    title: 'Fasilitas',
    desc: 'Ruangan kelas ber-AC, sarana & prasarana lengkap, makan siang dan snack 2 kali sehari, field trip, flexible-seating classroom, halaman luas, parkir luas, dsb.',
  },
  {
    id: 'phil_4',
    title: 'Kurikulum',
    desc: 'Cambridge (Science, Math, English), Nasional, Islamic Montessori, dan Kurikulum Khas TK Lukman Hakim.',
  },
];

const DEFAULT_PILLARS_DATA: PillarItem[] = [
  {
    id: 'pil_1',
    title: 'FAITH IN ALLAH',
    badgeText: 'FAITH IN ALLAH',
    desc: 'Beriman dan percaya atas kebesaran Allah SWT. Pembelajaran di TK Lukman Hakim berasaskan Tauhid sehingga membentuk anak yang berkarakter sesuai Al-Quran dan As-Sunnah.',
    image: '/src/assets/images/tahfidz_tilawati_ceria_1790826065441.jpg',
  },
  {
    id: 'pil_2',
    title: 'HONESTY',
    badgeText: 'HONESTY',
    desc: 'Honesty is the best legacy. Kejujuran dibentuk sejak usia dini melalui pembiasaan berkata jujur, amanah, dan bercerita apa adanya dalam keseharian.',
    image: '/src/assets/images/sentra_balok_montessori_1790826050585.jpg',
  },
  {
    id: 'pil_3',
    title: 'RESPECT',
    badgeText: 'RESPECT',
    desc: 'Menghormati orang tua, ustadzah, dan menyayangi teman sebaya melalui budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) di lingkungan sekolah dan rumah.',
    image: '/src/assets/images/seni_lukis_angklung_1790826091504.jpg',
  },
  {
    id: 'pil_4',
    title: 'RESPONSIBILITY',
    badgeText: 'RESPONSIBILITY',
    desc: 'Melatih kemandirian dan tanggung jawab diri sejak dini, mulai dari merapikan sepatu, mainan edukatif, hingga membereskan peralatan makan sendiri.',
    image: '/src/assets/images/sains_kebun_hidroponik_1790826078024.jpg',
  },
  {
    id: 'pil_5',
    title: 'CLEANLINESS',
    badgeText: 'CLEANLINESS',
    desc: 'Kebersihan adalah sebagian dari iman. Pembiasaan mencuci tangan, menjaga kerapian diri, serta merawat keasrian taman dan kelas bersama-sama.',
    image: '/src/assets/images/daycare_batita_sensorik_1790826101972.jpg',
  },
];

const DEFAULT_APPEARANCE_CONFIG: WebsiteAppearanceConfig = {
  themeColor: 'sky',
  showHeroBanner: true,
  showBalokStrip: false,
  showIdentityCard: true,
  showTrustConversion: false,
  showActivityGallery: false,
  showPhilosophySection: true,
  showCharacterWheel: true,
  showDirectoryHub: true,
  showNatureSection: true,
  showExperienceStats: true,
  showWaHotline: true,
  showTestimonials: true,
  showSentraInSchools: true,
  showPosterCarousel: true,
  announcementBar: {
    enabled: false,
    badge: 'SPMB 2026/2027',
    text: 'Penerimaan Murid Baru (SPMB) T.A. 2026/2027 Resmi Dibuka! Kuota Terbatas & Free Trial Class.',
    linkText: 'Daftar SPMB Online',
    linkAction: 'ppdb',
    bgColor: '#006699',
  },
};

const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'lukmanhakim',
};

export const RATING_LABELS: Record<AspectRating, string> = {
  BSB: 'Berkembang Sangat Baik',
  BSH: 'Berkembang Sesuai Harapan',
  MB: 'Mulai Berkembang',
  BB: 'Belum Berkembang',
};

function formatFirestoreTimestamp(ts: any, fallbackStr?: string): string {
  if (!ts) return fallbackStr || new Date().toLocaleDateString('id-ID');
  if (typeof ts === 'string') return ts;
  if (typeof ts?.toDate === 'function') {
    const d = ts.toDate();
    return `${d.toLocaleDateString('id-ID')} ${d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }
  return fallbackStr || new Date().toLocaleDateString('id-ID');
}

function safeGetJson<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') return fallback;
    const parsed = JSON.parse(saved);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed;
  } catch (err) {
    console.warn(`[SafeStorage] Parse error on key "${key}", using fallback:`, err);
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [lastCloudSyncAt, setLastCloudSyncAt] = useState<string | null>(null);

  const isAdminUser = Boolean(
    auth.currentUser &&
      auth.currentUser.emailVerified &&
      auth.currentUser.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
  );

  const [schoolIdentity, setSchoolIdentity] = useState<SchoolIdentity>(() =>
    safeGetJson(STORAGE_KEYS.SCHOOL_IDENTITY, SCHOOL_IDENTITY)
  );

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() =>
    safeGetJson(STORAGE_KEYS.HERO_SLIDES, INITIAL_HERO_SLIDES)
  );

  const [activityPhotos, setActivityPhotos] = useState<SchoolActivityPhoto[]>(() => {
    const parsed = safeGetJson<SchoolActivityPhoto[] | null>(STORAGE_KEYS.ACTIVITY_PHOTOS, null);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return SCHOOL_ACTIVITY_PHOTOS;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() =>
    safeGetJson(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS)
  );

  const [waContacts, setWaContacts] = useState<WaAdminContact[]>(() =>
    safeGetJson(STORAGE_KEYS.WA_CONTACTS, WA_ADMIN_CONTACTS)
  );

  const [philosophyCards, setPhilosophyCards] = useState<PhilosophyCardItem[]>(() =>
    safeGetJson(STORAGE_KEYS.PHILOSOPHY_CARDS, DEFAULT_PHILOSOPHY_CARDS)
  );

  const [pillarsData, setPillarsData] = useState<PillarItem[]>(() =>
    safeGetJson(STORAGE_KEYS.PILLARS_DATA, DEFAULT_PILLARS_DATA)
  );

  const [appearanceConfig, setAppearanceConfig] = useState<WebsiteAppearanceConfig>(() => {
    const saved = safeGetJson<Partial<WebsiteAppearanceConfig> | null>(STORAGE_KEYS.APPEARANCE_CFG, null);
    if (!saved) return DEFAULT_APPEARANCE_CONFIG;
    const config = { ...DEFAULT_APPEARANCE_CONFIG, ...saved };
    if (config.announcementBar?.text && config.announcementBar.text.toLowerCase().includes('gelombang')) {
      config.announcementBar = {
        ...config.announcementBar,
        badge: 'SPMB 2026/2027',
        text: 'Penerimaan Murid Baru (SPMB) T.A. 2026/2027 Resmi Dibuka! Kuota Terbatas & Free Trial Class.',
        linkText: 'Daftar SPMB Online',
      };
    }
    return config;
  });

  const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>(() => {
    const saved = safeGetJson<CustomFeature[] | null>(STORAGE_KEYS.CUSTOM_FEATURES, null);
    if (Array.isArray(saved) && saved.length > 0) return saved;
    return DEFAULT_CUSTOM_FEATURES;
  });

  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    localStorage.removeItem('tklh_admin_creds_v1');
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS);
    if (saved) {
      try {
        const decoded = JSON.parse(atob(saved));
        if (decoded?.username && decoded?.password) {
          return { username: decoded.username, password: decoded.password };
        }
      } catch {
        // Fallback to default credentials
      }
    }
    return DEFAULT_ADMIN_CREDENTIALS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    sessionStorage.removeItem('tklh_admin_session_v1');
    const rawSession = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (!rawSession) return false;
    try {
      const parsed = JSON.parse(atob(rawSession));
      if (parsed?.authenticated === true && typeof parsed?.expiresAt === 'number') {
        if (Date.now() < parsed.expiresAt) {
          return true;
        }
      }
    } catch {
      // Invalid session token
    }
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    return false;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() =>
    safeGetJson(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS)
  );

  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    safeGetJson(STORAGE_KEYS.GALLERY, INITIAL_GALLERY)
  );

  const [registrations, setRegistrations] = useState<Registration[]>(() =>
    safeGetJson(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS)
  );

  const [tuitionBills, setTuitionBills] = useState<TuitionBill[]>(() =>
    safeGetJson(STORAGE_KEYS.TUITION, INITIAL_TUITION_BILLS)
  );

  const [reports, setReports] = useState<StudentReport[]>(() =>
    safeGetJson(STORAGE_KEYS.REPORTS, INITIAL_REPORTS)
  );

  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>(() =>
    safeGetJson(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATION_LOGS)
  );

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const parsed = safeGetJson<Inquiry[] | null>(STORAGE_KEYS.INQUIRIES, null);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INQUIRIES;
  });

  const [laravelConfig, setLaravelConfig] = useState<LaravelBridgeConfig>(() =>
    safeGetJson(STORAGE_KEYS.LARAVEL_CFG, {
      baseUrl: 'http://127.0.0.1:8000/api',
      apiToken: 'lh_secret_token_live_2025',
      mode: 'internal_cloud',
      autoSync: true,
      lastSyncAt: new Date().toISOString(),
      status: 'connected',
    })
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Track Firebase Auth State + Local Gmail Session
  useEffect(() => {
    let savedLocalUser: any = null;
    const rawSaved = localStorage.getItem(STORAGE_KEYS.LOGGED_GMAIL_USER);
    if (rawSaved) {
      try {
        savedLocalUser = JSON.parse(rawSaved);
      } catch {}
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthReady(true);
        if (user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()) {
          setIsAdminLoggedIn(true);
        }
      } else if (savedLocalUser && savedLocalUser.email) {
        setCurrentUser(savedLocalUser);
        setIsAuthReady(true);
        if (savedLocalUser.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()) {
          setIsAdminLoggedIn(true);
        }
      } else {
        setCurrentUser(null);
        setIsAuthReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Attach Firestore Real-Time Listeners when Auth is Ready and User is Verified
  useEffect(() => {
    if (!isAuthReady || !auth.currentUser || !currentUser) {
      setIsCloudSynced(false);
      return;
    }

    const uid = auth.currentUser.uid;
    const unsubscribes: (() => void)[] = [];

    // 1. Registrations listener
    const regPath = 'registrations';
    const regRef = isAdminUser
      ? collection(db, regPath)
      : query(collection(db, regPath), where('ownerId', '==', uid));

    unsubscribes.push(
      onSnapshot(
        regRef,
        (snapshot) => {
          setIsCloudSynced(true);
          setLastCloudSyncAt(new Date().toLocaleTimeString('id-ID'));
          if (!snapshot.empty) {
            const docs: Registration[] = snapshot.docs.map((d) => {
              const data = d.data();
              return {
                id: data.id || d.id,
                regNumber: data.regNumber,
                childName: data.childName,
                nickname: data.nickname,
                nik: data.nik,
                birthPlace: data.birthPlace,
                birthDate: data.birthDate,
                gender: data.gender,
                program: data.program,
                parentName: data.parentName,
                motherName: data.motherName,
                phone: data.phone,
                occupation: data.occupation,
                address: data.address,
                email: data.email || '',
                status: data.status,
                createdAt: formatFirestoreTimestamp(data.createdAt),
                notes: data.notes || '',
                waSent: Boolean(data.waSent),
              };
            });
            setRegistrations((prev) => {
              const cloudIds = new Set(docs.map((item) => item.id));
              const remainingLocal = isAdminUser ? [] : prev.filter((p) => !cloudIds.has(p.id));
              return [...docs, ...remainingLocal];
            });
          }
        },
        (error) => {
          console.warn(`Firestore sync paused for ${regPath}:`, error);
          setIsCloudSynced(false);
        }
      )
    );

    // 2. Tuition Bills listener
    const tuitionPath = 'tuition_bills';
    const tuitionRef = isAdminUser
      ? collection(db, tuitionPath)
      : query(collection(db, tuitionPath), where('ownerId', '==', uid));

    unsubscribes.push(
      onSnapshot(
        tuitionRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const docs: TuitionBill[] = snapshot.docs.map((d) => {
              const data = d.data();
              return {
                id: data.id || d.id,
                studentId: data.studentId,
                studentName: data.studentName,
                nis: data.nis,
                classGroup: data.classGroup,
                month: data.month,
                year: Number(data.year),
                tuitionFee: Number(data.tuitionFee),
                cateringFee: Number(data.cateringFee),
                activityFee: Number(data.activityFee),
                totalAmount: Number(data.totalAmount),
                status: data.status,
                paidAt: data.paidAt || undefined,
                paymentMethod: data.paymentMethod || undefined,
                receiptNumber: data.receiptNumber || undefined,
              };
            });
            setTuitionBills((prev) => {
              const cloudIds = new Set(docs.map((item) => item.id));
              const remainingLocal = isAdminUser ? [] : prev.filter((p) => !cloudIds.has(p.id));
              return [...docs, ...remainingLocal];
            });
          }
        },
        (error) => {
          console.warn(`Firestore sync paused for ${tuitionPath}:`, error);
          setIsCloudSynced(false);
        }
      )
    );

    // 3. Inquiries listener
    const inquiriesPath = 'inquiries';
    const inquiriesRef = isAdminUser
      ? collection(db, inquiriesPath)
      : query(collection(db, inquiriesPath), where('ownerId', '==', uid));

    unsubscribes.push(
      onSnapshot(
        inquiriesRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const docs: Inquiry[] = snapshot.docs.map((d) => {
              const data = d.data();
              return {
                id: data.id || d.id,
                ownerId: data.ownerId,
                name: data.name,
                phone: data.phone,
                childAge: data.childAge || '',
                interest: data.interest,
                message: data.message,
                createdAt: formatFirestoreTimestamp(data.createdAt),
              };
            });
            setInquiries(docs);
          }
        },
        (error) => {
          console.warn(`Firestore sync paused for ${inquiriesPath}:`, error);
        }
      )
    );

    // 4. Notification logs listener
    const notifPath = 'notification_logs';
    const notifRef = isAdminUser
      ? collection(db, notifPath)
      : query(collection(db, notifPath), where('ownerId', '==', uid));

    unsubscribes.push(
      onSnapshot(
        notifRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const docs: NotificationLog[] = snapshot.docs.map((d) => {
              const data = d.data();
              return {
                id: data.id || d.id,
                recipientPhone: data.recipientPhone,
                recipientName: data.recipientName,
                type: data.type,
                title: data.title,
                message: data.message,
                channel: data.channel,
                status: data.status,
                timestamp: formatFirestoreTimestamp(data.createdAt),
                gatewayMessageId: data.gatewayMessageId,
              };
            });
            setNotificationLogs(docs);
          }
        },
        (error) => {
          console.warn(`Firestore sync paused for ${notifPath}:`, error);
        }
      )
    );

    // 5. Admin-managed collections (teachers, gallery, student_reports)
    if (isAdminUser) {
      const teachersPath = 'teachers';
      unsubscribes.push(
        onSnapshot(
          collection(db, teachersPath),
          (snapshot) => {
            if (!snapshot.empty) {
              const docs: Teacher[] = snapshot.docs.map((d) => {
                const data = d.data();
                return {
                  id: data.id || d.id,
                  name: data.name,
                  nip: data.nip,
                  role: data.role,
                  education: data.education,
                  experienceYears: Number(data.experienceYears),
                  photo: data.photo,
                  bio: data.bio,
                  phone: data.phone,
                  specialty: data.specialty,
                };
              });
              setTeachers(docs);
            }
          },
          (error) => {
            console.warn(`Firestore sync paused for ${teachersPath}:`, error);
          }
        )
      );

      const galleryPath = 'gallery';
      unsubscribes.push(
        onSnapshot(
          collection(db, galleryPath),
          (snapshot) => {
            if (!snapshot.empty) {
              const docs: GalleryItem[] = snapshot.docs.map((d) => {
                const data = d.data();
                return {
                  id: data.id || d.id,
                  title: data.title,
                  category: data.category,
                  imageUrl: data.imageUrl,
                  date: data.date,
                  description: data.description,
                };
              });
              setGallery(docs);
            }
          },
          (error) => {
            console.warn(`Firestore sync paused for ${galleryPath}:`, error);
          }
        )
      );

      const reportsPath = 'student_reports';
      unsubscribes.push(
        onSnapshot(
          collection(db, reportsPath),
          (snapshot) => {
            if (!snapshot.empty) {
              const docs: StudentReport[] = snapshot.docs.map((d) => {
                const data = d.data();
                const makeAspect = (rating: AspectRating, desc: string) => ({
                  rating,
                  ratingLabel: RATING_LABELS[rating] || 'Berkembang Sesuai Harapan',
                  description: desc,
                  evidenceNotes: 'Terdokumentasi pada portofolio harian santri.',
                });
                return {
                  id: data.id || d.id,
                  studentId: data.studentId,
                  studentName: data.studentName,
                  nis: data.nis,
                  classGroup: data.classGroup,
                  semester: data.semester,
                  academicYear: data.academicYear,
                  teacherName: data.teacherName,
                  aspects: {
                    religiousMoral: makeAspect(data.religiousMoralRating || 'BSB', 'Capaian nilai agama dan akhlak mulia.'),
                    motorSkills: makeAspect(data.motorSkillsRating || 'BSH', 'Perkembangan fisik motorik kasar dan halus.'),
                    cognitive: makeAspect(data.cognitiveRating || 'BSB', 'Kemampuan berpikir logis dan eksplorasi sains.'),
                    language: makeAspect(data.languageRating || 'BSH', 'Kemampuan berbahasa santun dan ekspresif.'),
                    socialEmotional: makeAspect(data.socialEmotionalRating || 'BSB', 'Kemandirian dan empati bersama teman.'),
                    arts: makeAspect(data.artsRating || 'BSB', 'Kreativitas seni dan imajinasi karya.'),
                  },
                  attendance: { present: 88, sick: 1, permit: 1, absent: 0 },
                  teacherNotes: data.teacherNotes || '',
                  publishedAt: data.publishedAt,
                  isPublished: Boolean(data.isPublished),
                };
              });
              setReports(docs);
            }
          },
          (error) => {
            console.warn(`Firestore sync paused for ${reportsPath}:`, error);
          }
        )
      );
    }

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [isAuthReady, currentUser, isAdminUser]);

  // Sync to local storage as offline cache
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TUITION, JSON.stringify(tuitionBills));
  }, [tuitionBills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notificationLogs));
  }, [notificationLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LARAVEL_CFG, JSON.stringify(laravelConfig));
  }, [laravelConfig]);

  // Auth Actions
  const signInWithGoogleAccount = async (): Promise<User | any | null> => {
    try {
      const user = await loginWithGoogle();
      if (user) {
        setCurrentUser(user);
        localStorage.setItem(
          STORAGE_KEYS.LOGGED_GMAIL_USER,
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
          })
        );
        if (user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()) {
          setIsAdminLoggedIn(true);
        }
        return user;
      }
      return null;
    } catch (err: any) {
      console.warn('Google Sign-In popup interrupted or blocked:', err);
      return null;
    }
  };

  const signInWithGmailAddress = async (email: string, name?: string): Promise<any> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || cleanEmail.split('@')[0]).trim();
    const customUser = {
      uid: `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email: cleanEmail,
      displayName: cleanName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=006699&color=fff`,
      emailVerified: true,
      isCustomAuth: true,
    };
    setCurrentUser(customUser as any);
    localStorage.setItem(STORAGE_KEYS.LOGGED_GMAIL_USER, JSON.stringify(customUser));
    if (cleanEmail === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()) {
      setIsAdminLoggedIn(true);
    }
    return customUser;
  };

  const signOutAccount = async (): Promise<void> => {
    try {
      await logoutFirebase();
    } catch {}
    localStorage.removeItem(STORAGE_KEYS.LOGGED_GMAIL_USER);
    setCurrentUser(null);
    setIsAdminLoggedIn(false);
  };

  const getAdminRequestHeaders = async (): Promise<Record<string, string>> => {
    if (
      !auth.currentUser?.emailVerified ||
      auth.currentUser.email?.toLowerCase() !== BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
    ) {
      throw new Error('Silakan masuk dengan akun Google admin terverifikasi.');
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
    };
  };

  // Direct Gmail Dispatch Methods
  const sendPpdbConfirmationEmail = async (reg: Registration) => {
    const toEmail = reg.email || '';
    if (!toEmail) return { success: false };
    try {
      const res = await fetch('/api/mail/send-ppdb-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmail,
          childName: reg.childName,
          nickname: reg.nickname,
          regNumber: reg.regNumber,
          program: reg.program,
          parentName: reg.parentName,
          phone: reg.phone,
          address: reg.address,
        }),
      });
      const data = await res.json();
      if (data && (data.gmailWebLink || data.gmailInboxLink)) {
        setRegistrations((prev) =>
          prev.map((r) =>
            r.id === reg.id
              ? {
                  ...r,
                  gmailWebLink: data.gmailWebLink,
                  mailtoLink: data.mailtoLink,
                  gmailInboxLink: data.gmailInboxLink,
                  whatsappLink: data.whatsappLink,
                  portalUrl: data.portalUrl,
                }
              : r
          )
        );
      }
      return data;
    } catch (err) {
      console.warn('Failed to send PPDB confirmation email:', err);
      return { success: false };
    }
  };

  const sendAnnouncementEmail = async (params: {
    to: string;
    subject: string;
    body: string;
    childName: string;
    regNumber: string;
    status: string;
    program: string;
    parentName?: string;
  }) => {
    try {
      const headers = await getAdminRequestHeaders();
      const res = await fetch('/api/mail/send-announcement', {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to send announcement email:', err);
      return { success: false };
    }
  };

  const sendTuitionReceiptEmail = async (params: {
    to: string;
    studentName: string;
    nis: string;
    month: string;
    year: number;
    totalAmount: number;
    paymentMethod: string;
    receiptNumber?: string;
  }) => {
    try {
      const headers = await getAdminRequestHeaders();
      const res = await fetch('/api/mail/send-spp-receipt', {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to send tuition receipt email:', err);
      return { success: false };
    }
  };

  const fetchInboxEmails = async (email: string) => {
    if (!email || !auth.currentUser || !isAdminUser) return [];
    try {
      const res = await fetch(`/api/mail/inbox/${encodeURIComponent(email)}`, {
        headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}` },
      });
      const data = await res.json();
      return data.messages || [];
    } catch {
      return [];
    }
  };

  // Seed / Sync Local Dataset to Cloud Firestore
  const syncLocalDataToFirestore = async (): Promise<void> => {
    if (!auth.currentUser || !auth.currentUser.emailVerified) {
      throw new Error('Silakan login dengan akun Google terverifikasi terlebih dahulu.');
    }
    const uid = auth.currentUser.uid;

    // 1. Sync Registrations
    for (const r of registrations) {
      const safeId = sanitizeId(r.id);
      const path = 'registrations';
      try {
        await setDoc(doc(db, path, safeId), {
          id: safeId,
          ownerId: uid,
          regNumber: sanitizeString(r.regNumber, VALIDATION_LIMITS.regNumberMax, 'PPDB-LHP-2026-001'),
          childName: sanitizeString(r.childName, VALIDATION_LIMITS.childNameMax, 'Calon Santri'),
          nickname: sanitizeString(r.nickname, VALIDATION_LIMITS.nicknameMax, 'Ananda'),
          nik: sanitizeString(r.nik, VALIDATION_LIMITS.nikMax, '3302000000000000'),
          birthPlace: sanitizeString(r.birthPlace, VALIDATION_LIMITS.birthPlaceMax, 'Purwokerto'),
          birthDate: sanitizeString(r.birthDate, VALIDATION_LIMITS.birthDateMax, '2021-01-01'),
          gender: r.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki',
          program: r.program,
          parentName: sanitizeString(r.parentName, VALIDATION_LIMITS.parentNameMax, 'Orang Tua'),
          motherName: sanitizeString(r.motherName, VALIDATION_LIMITS.motherNameMax, ''),
          phone: sanitizeString(r.phone, VALIDATION_LIMITS.phoneMax, '6287713551412'),
          occupation: sanitizeString(r.occupation, VALIDATION_LIMITS.occupationMax, ''),
          address: sanitizeString(r.address, VALIDATION_LIMITS.addressMax, 'Purwokerto'),
          status: 'Menunggu Verifikasi',
          notes: sanitizeString(r.notes || '', VALIDATION_LIMITS.notesMax, ''),
          waSent: Boolean(r.waSent),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }

    // 2. Sync Tuition Bills
    for (const b of tuitionBills) {
      const safeId = sanitizeId(b.id);
      const path = 'tuition_bills';
      try {
        await setDoc(doc(db, path, safeId), {
          id: safeId,
          ownerId: uid,
          studentId: sanitizeString(b.studentId, 64, 'std_1'),
          studentName: sanitizeString(b.studentName, 120, 'Santri'),
          nis: sanitizeString(b.nis, 40, '2025001'),
          classGroup: sanitizeString(b.classGroup, 80, 'TK A'),
          month: sanitizeString(b.month, 30, 'Juli'),
          year: Number(b.year) || 2025,
          tuitionFee: Number(b.tuitionFee) || 0,
          cateringFee: Number(b.cateringFee) || 0,
          activityFee: Number(b.activityFee) || 0,
          totalAmount: Number(b.totalAmount) || 0,
          status: b.status === 'Lunas' ? 'Lunas' : 'Belum Lunas',
          paidAt: sanitizeString(b.paidAt || '', 50, ''),
          paymentMethod: b.paymentMethod || '',
          receiptNumber: sanitizeString(b.receiptNumber || '', 60, ''),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }

    // 3. Sync Inquiries
    for (const inq of inquiries) {
      const safeId = sanitizeId(inq.id);
      const path = 'inquiries';
      try {
        await setDoc(doc(db, path, safeId), {
          id: safeId,
          ownerId: uid,
          name: sanitizeString(inq.name, VALIDATION_LIMITS.parentNameMax, 'Orang Tua'),
          phone: sanitizeString(inq.phone, VALIDATION_LIMITS.phoneMax, '6287713551412'),
          childAge: sanitizeString(inq.childAge || '', 40, ''),
          interest: sanitizeString(inq.interest, VALIDATION_LIMITS.inquiryInterestMax, 'Informasi PPDB'),
          message: sanitizeString(inq.message, VALIDATION_LIMITS.inquiryMessageMax, 'Konsultasi pendaftaran'),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }

    // 4. If Admin, sync Teachers, Gallery, and Student Reports
    if (isAdminUser) {
      for (const t of teachers) {
        const safeId = sanitizeId(t.id);
        const path = 'teachers';
        try {
          await setDoc(doc(db, path, safeId), {
            id: safeId,
            authorId: uid,
            name: sanitizeString(t.name, VALIDATION_LIMITS.teacherNameMax, 'Guru'),
            nip: sanitizeString(t.nip, VALIDATION_LIMITS.teacherNipMax, '19900101'),
            role: sanitizeString(t.role, VALIDATION_LIMITS.teacherRoleMax, 'Wali Kelas'),
            education: sanitizeString(t.education, VALIDATION_LIMITS.teacherEduMax, 'S1 PAUD'),
            experienceYears: Math.min(80, Math.max(0, Number(t.experienceYears) || 1)),
            photo: sanitizeString(t.photo, VALIDATION_LIMITS.teacherPhotoMax, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'),
            bio: sanitizeString(t.bio, VALIDATION_LIMITS.teacherBioMax, 'Pendidik TK Lukman Hakim.'),
            phone: sanitizeString(t.phone, VALIDATION_LIMITS.teacherPhoneMax, '6287713551412'),
            specialty: sanitizeString(t.specialty, VALIDATION_LIMITS.teacherSpecialtyMax, 'PAUD'),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      }

      for (const g of gallery) {
        const safeId = sanitizeId(g.id);
        const path = 'gallery';
        try {
          await setDoc(doc(db, path, safeId), {
            id: safeId,
            authorId: uid,
            title: sanitizeString(g.title, VALIDATION_LIMITS.galleryTitleMax, 'Kegiatan'),
            category: g.category,
            imageUrl: sanitizeString(g.imageUrl, VALIDATION_LIMITS.galleryUrlMax, 'https://images.unsplash.com/photo-1580582932707-520aed937b7b'),
            date: sanitizeString(g.date, VALIDATION_LIMITS.galleryDateMax, '2025-07-15'),
            description: sanitizeString(g.description, VALIDATION_LIMITS.galleryDescMax, 'Dokumentasi sekolah.'),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      }

      for (const rep of reports) {
        const safeId = sanitizeId(rep.id);
        const path = 'student_reports';
        try {
          await setDoc(doc(db, path, safeId), {
            id: safeId,
            ownerId: uid,
            studentId: sanitizeString(rep.studentId, 64, 'std_1'),
            studentName: sanitizeString(rep.studentName, 120, 'Santri'),
            nis: sanitizeString(rep.nis, 40, '2025001'),
            classGroup: sanitizeString(rep.classGroup, 80, 'TK A'),
            semester: rep.semester,
            academicYear: sanitizeString(rep.academicYear, 30, '2025/2026'),
            teacherName: sanitizeString(rep.teacherName, 120, 'Ustadzah'),
            religiousMoralRating: rep.aspects.religiousMoral.rating,
            motorSkillsRating: rep.aspects.motorSkills.rating,
            cognitiveRating: rep.aspects.cognitive.rating,
            languageRating: rep.aspects.language.rating,
            socialEmotionalRating: rep.aspects.socialEmotional.rating,
            artsRating: rep.aspects.arts.rating,
            teacherNotes: sanitizeString(rep.teacherNotes, 600, ''),
            publishedAt: sanitizeString(rep.publishedAt, 40, '2025-12-20'),
            isPublished: Boolean(rep.isPublished),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      }
    }

    setLastCloudSyncAt(new Date().toLocaleTimeString('id-ID'));
  };

  // ==================== 1. TEACHERS CRUD ====================
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const safeId = sanitizeId(`t_${Date.now()}`);
    const newTeacher: Teacher = { ...teacher, id: safeId };
    setTeachers((prev) => [newTeacher, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const path = 'teachers';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        authorId: auth.currentUser.uid,
        name: sanitizeString(teacher.name, VALIDATION_LIMITS.teacherNameMax, 'Guru Baru'),
        nip: sanitizeString(teacher.nip, VALIDATION_LIMITS.teacherNipMax, '19900101'),
        role: sanitizeString(teacher.role, VALIDATION_LIMITS.teacherRoleMax, 'Pendidik'),
        education: sanitizeString(teacher.education, VALIDATION_LIMITS.teacherEduMax, 'S1 PG-PAUD'),
        experienceYears: Math.min(80, Math.max(0, Number(teacher.experienceYears) || 1)),
        photo: sanitizeString(teacher.photo, VALIDATION_LIMITS.teacherPhotoMax, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'),
        bio: sanitizeString(teacher.bio, VALIDATION_LIMITS.teacherBioMax, 'Pendidik berdedikasi.'),
        phone: sanitizeString(teacher.phone, VALIDATION_LIMITS.teacherPhoneMax, '6287713551412'),
        specialty: sanitizeString(teacher.specialty, VALIDATION_LIMITS.teacherSpecialtyMax, 'Pendidikan Anak'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'teachers';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.name !== undefined) payload.name = sanitizeString(updated.name, VALIDATION_LIMITS.teacherNameMax, 'Guru');
      if (updated.nip !== undefined) payload.nip = sanitizeString(updated.nip, VALIDATION_LIMITS.teacherNipMax, '19900101');
      if (updated.role !== undefined) payload.role = sanitizeString(updated.role, VALIDATION_LIMITS.teacherRoleMax, 'Pendidik');
      if (updated.education !== undefined) payload.education = sanitizeString(updated.education, VALIDATION_LIMITS.teacherEduMax, 'S1 PAUD');
      if (updated.experienceYears !== undefined) payload.experienceYears = Math.min(80, Math.max(0, Number(updated.experienceYears) || 0));
      if (updated.photo !== undefined) payload.photo = sanitizeString(updated.photo, VALIDATION_LIMITS.teacherPhotoMax, '/assets/budi_mulia_hero.jpg');
      if (updated.bio !== undefined) payload.bio = sanitizeString(updated.bio, VALIDATION_LIMITS.teacherBioMax, 'Pendidik.');
      if (updated.phone !== undefined) payload.phone = sanitizeString(updated.phone, VALIDATION_LIMITS.teacherPhoneMax, '6287713551412');
      if (updated.specialty !== undefined) payload.specialty = sanitizeString(updated.specialty, VALIDATION_LIMITS.teacherSpecialtyMax, 'PAUD');

      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'teachers';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 2. GALLERY CRUD ====================
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const safeId = sanitizeId(`g_${Date.now()}`);
    const newItem: GalleryItem = { ...item, id: safeId };
    setGallery((prev) => [newItem, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const path = 'gallery';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        authorId: auth.currentUser.uid,
        title: sanitizeString(item.title, VALIDATION_LIMITS.galleryTitleMax, 'Dokumentasi'),
        category: item.category,
        imageUrl: sanitizeString(item.imageUrl, VALIDATION_LIMITS.galleryUrlMax, '/assets/budi_mulia_hero.jpg'),
        date: sanitizeString(item.date, VALIDATION_LIMITS.galleryDateMax, new Date().toISOString().split('T')[0]),
        description: sanitizeString(item.description, VALIDATION_LIMITS.galleryDescMax, 'Dokumentasi kegiatan sekolah.'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'gallery';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.title !== undefined) payload.title = sanitizeString(updated.title, VALIDATION_LIMITS.galleryTitleMax, 'Dokumentasi');
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.imageUrl !== undefined) payload.imageUrl = sanitizeString(updated.imageUrl, VALIDATION_LIMITS.galleryUrlMax, '/assets/budi_mulia_hero.jpg');
      if (updated.date !== undefined) payload.date = sanitizeString(updated.date, VALIDATION_LIMITS.galleryDateMax, '2025-07-15');
      if (updated.description !== undefined) payload.description = sanitizeString(updated.description, VALIDATION_LIMITS.galleryDescMax, 'Dokumentasi kegiatan sekolah.');

      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'gallery';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 3. REGISTRATIONS (PPDB) CRUD ====================
  const addRegistration = (
    reg: Omit<Registration, 'id' | 'regNumber' | 'createdAt' | 'waSent'> & { status?: Registration['status'] }
  ) => {
    const count = registrations.length + 1;
    const regNumber = `PPDB-LHP-${new Date().getFullYear()}-${String(count).padStart(3, '0')}`;
    const now = new Date();
    const createdAt = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    const safeId = sanitizeId(`reg_${Date.now()}`);
    const userEmail = reg.email || currentUser?.email || auth.currentUser?.email || '';
    const safeSummary = `Assalamu’alaikum Ayah/Bunda ${reg.parentName},\nAlhamdulillah pendaftaran PPDB Online Ananda ${reg.childName} (${regNumber}) telah resmi tercatat di sistem TK LUKMAN HAKIM Purwokerto.\nJenjang: ${reg.program} | WA: ${reg.phone}\nPanitia PPDB: +62 877-1355-1412`;
    const initialGmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(userEmail)}&su=${encodeURIComponent(`[BUKTI PPDB] ${reg.childName} (${regNumber})`)}&body=${encodeURIComponent(safeSummary)}`;
    const initialMailtoLink = `mailto:${encodeURIComponent(userEmail)}?subject=${encodeURIComponent(`[BUKTI PPDB] ${reg.childName} (${regNumber})`)}&body=${encodeURIComponent(safeSummary)}`;

    const newReg: Registration = {
      ...reg,
      id: safeId,
      regNumber,
      email: userEmail,
      createdAt,
      status: reg.status || 'Menunggu Verifikasi',
      waSent: true,
      gmailWebLink: initialGmailLink,
      mailtoLink: initialMailtoLink,
    };

    setRegistrations((prev) => [newReg, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const path = 'registrations';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        ownerId: auth.currentUser.uid,
        regNumber: sanitizeString(regNumber, VALIDATION_LIMITS.regNumberMax, 'PPDB-LHP-2026-001'),
        childName: sanitizeString(reg.childName, VALIDATION_LIMITS.childNameMax, 'Calon Siswa'),
        nickname: sanitizeString(reg.nickname || reg.childName.split(' ')[0], VALIDATION_LIMITS.nicknameMax, 'Ananda'),
        nik: sanitizeString(reg.nik || '3302000000000000', VALIDATION_LIMITS.nikMax, '3302000000000000'),
        birthPlace: sanitizeString(reg.birthPlace, VALIDATION_LIMITS.birthPlaceMax, 'Purwokerto'),
        birthDate: sanitizeString(reg.birthDate, VALIDATION_LIMITS.birthDateMax, '2021-01-01'),
        gender: reg.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki',
        program: reg.program,
        parentName: sanitizeString(reg.parentName, VALIDATION_LIMITS.parentNameMax, 'Orang Tua'),
        motherName: sanitizeString(reg.motherName || '', VALIDATION_LIMITS.motherNameMax, ''),
        email: sanitizeString(userEmail, VALIDATION_LIMITS.emailMax || 256, userEmail),
        phone: sanitizeString(reg.phone, VALIDATION_LIMITS.phoneMax, '6287713551412'),
        occupation: sanitizeString(reg.occupation || '', VALIDATION_LIMITS.occupationMax, ''),
        address: sanitizeString(reg.address, VALIDATION_LIMITS.addressMax, 'Purwokerto'),
        status: 'Menunggu Verifikasi',
        notes: sanitizeString(reg.notes || '', VALIDATION_LIMITS.notesMax, ''),
        waSent: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }

    sendGatewayNotification(
      reg.phone,
      reg.parentName,
      'PPDB',
      'Pendaftaran Siswa Baru Berhasil Diterima',
      `Assalamu’alaikum Ayah/Bunda ${reg.parentName}. Pendaftaran Ananda ${reg.childName} di TK Lukman Hakim Purwokerto telah diterima dengan No. Registrasi: ${regNumber}. Panitia akan segera menghubungi untuk jadwal observasi.`
    );

    if (userEmail) {
      sendPpdbConfirmationEmail(newReg)
        .then((res) => {
          if (res && res.gmailWebLink) {
            setRegistrations((prev) =>
              prev.map((r) =>
                r.id === safeId
                  ? { ...r, gmailWebLink: res.gmailWebLink, mailtoLink: res.mailtoLink }
                  : r
              )
            );
          }
        })
        .catch(() => {});
    }

    return newReg;
  };

  const updateRegistration = (id: string, updated: Partial<Registration>) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );

    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'registrations';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.childName !== undefined) payload.childName = sanitizeString(updated.childName, VALIDATION_LIMITS.childNameMax, 'Calon Siswa');
      if (updated.nickname !== undefined) payload.nickname = sanitizeString(updated.nickname, VALIDATION_LIMITS.nicknameMax, 'Ananda');
      if (updated.nik !== undefined) payload.nik = sanitizeString(updated.nik, VALIDATION_LIMITS.nikMax, '3302000000000000');
      if (updated.birthPlace !== undefined) payload.birthPlace = sanitizeString(updated.birthPlace, VALIDATION_LIMITS.birthPlaceMax, 'Purwokerto');
      if (updated.birthDate !== undefined) payload.birthDate = sanitizeString(updated.birthDate, VALIDATION_LIMITS.birthDateMax, '2021-01-01');
      if (updated.gender !== undefined) payload.gender = updated.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki';
      if (updated.program !== undefined) payload.program = updated.program;
      if (updated.parentName !== undefined) payload.parentName = sanitizeString(updated.parentName, VALIDATION_LIMITS.parentNameMax, 'Orang Tua');
      if (updated.motherName !== undefined) payload.motherName = sanitizeString(updated.motherName, VALIDATION_LIMITS.motherNameMax, '');
      if (updated.phone !== undefined) payload.phone = sanitizeString(updated.phone, VALIDATION_LIMITS.phoneMax, '6287713551412');
      if (updated.occupation !== undefined) payload.occupation = sanitizeString(updated.occupation, VALIDATION_LIMITS.occupationMax, '');
      if (updated.address !== undefined) payload.address = sanitizeString(updated.address, VALIDATION_LIMITS.addressMax, 'Purwokerto');
      if (updated.status !== undefined) payload.status = updated.status;
      if (updated.notes !== undefined) payload.notes = sanitizeString(updated.notes, VALIDATION_LIMITS.notesMax, '');

      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const updateRegistrationStatus = (id: string, status: Registration['status']) => {
    const existing = registrations.find((r) => r.id === id);
    const targetEmail = (existing?.email || currentUser?.email || 'ml0752960@gmail.com').trim();

    if (existing) {
      sendGatewayNotification(
        existing.phone,
        existing.parentName,
        'PPDB',
        `Update Status PPDB: ${status}`,
        `Status pendaftaran Ananda ${existing.childName} di TK Lukman Hakim Purwokerto telah diperbarui menjadi: "${status}". Silakan cek portal PPDB atau hubungi admin kami.`
      );

      const subject = `[PENGUMUMAN RESMI PPDB] Keputusan Hasil Seleksi Ananda ${existing.childName} (${existing.regNumber}): ${status}`;
      const isAccepted = status === 'Diterima';
      const body = `Assalamu’alaikum Warahmatullahi Wabarakatuh Ayah/Bunda ${existing.parentName},\n\nAlhamdulillah, Panitia PPDB TK LUKMAN HAKIM Purwokerto mengumumkan bahwa pendaftaran ananda:\n\n• Nama Calon Siswa : ${existing.childName} (${existing.nickname || existing.childName})\n• No. Registrasi   : ${existing.regNumber}\n• Pilihan Jenjang  : ${existing.program}\n• Status Seleksi   : ${status.toUpperCase()}\n\n${isAccepted ? 'Selamat! Ananda dinyatakan RESMI DITERIMA sebagai Santri Baru TK Lukman Hakim Purwokerto Tahun Ajaran 2026/2027. Silakan konfirmasi jadwal pengukuran seragam & daftar ulang.' : 'Silakan pantau status pendaftaran secara berkala melalui menu Portal PPDB di website sekolah.'}\n\nJazakumullahu Khairan Katsiran,\nPanitia PPDB TK LUKMAN HAKIM Purwokerto\nHotline WhatsApp: +62 877-1355-1412 | Email: tklukmanhakim.pwt@gmail.com`;

      sendAnnouncementEmail({
        to: targetEmail,
        subject,
        body,
        childName: existing.childName,
        regNumber: existing.regNumber,
        status,
        program: existing.program,
        parentName: existing.parentName,
      }).catch((err) => console.warn('Announcement dispatch error:', err));
    }

    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, email: r.email || targetEmail } : r))
    );

    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'registrations';
      updateDoc(doc(db, path, safeId), {
        status,
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.UPDATE, path));
    }
  };

  const deleteRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'registrations';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 4. TUITION BILLS (SPP) CRUD ====================
  const payTuitionBill = (id: string, method: TuitionBill['paymentMethod'] = 'QRIS') => {
    const now = new Date();
    const paidAt = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    const receiptNumber = `KW-LHP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}${String(now.getDate()).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;

    setTuitionBills((prev) =>
      prev.map((bill) => {
        if (bill.id === id) {
          const updatedBill: TuitionBill = {
            ...bill,
            status: 'Lunas',
            paidAt,
            paymentMethod: method,
            receiptNumber,
          };

          sendGatewayNotification(
            '081234567890',
            `Wali ${bill.studentName}`,
            'SPP',
            'Pembayaran SPP Sukses Terverifikasi',
            `Alhamdulillah, pembayaran tagihan SPP ${bill.month} ${bill.year} Ananda ${bill.studentName} sebesar Rp ${bill.totalAmount.toLocaleString(
              'id-ID'
            )} via ${method} telah terverifikasi lunas. No. Kuitansi: ${receiptNumber}.`
          );

          return updatedBill;
        }
        return bill;
      })
    );

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const safeId = sanitizeId(id);
      const path = 'tuition_bills';
      updateDoc(doc(db, path, safeId), {
        status: 'Lunas',
        paidAt: sanitizeString(paidAt, 50, ''),
        paymentMethod: method || 'QRIS',
        receiptNumber: sanitizeString(receiptNumber, 60, ''),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.UPDATE, path));
    }
  };

  const addTuitionBill = (bill: Omit<TuitionBill, 'id'>) => {
    const safeId = sanitizeId(`bill_${Date.now()}`);
    const newBill: TuitionBill = { ...bill, id: safeId };
    setTuitionBills((prev) => [newBill, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const path = 'tuition_bills';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        ownerId: auth.currentUser.uid,
        studentId: sanitizeString(bill.studentId, 64, 'std_1'),
        studentName: sanitizeString(bill.studentName, 120, 'Santri'),
        nis: sanitizeString(bill.nis, 40, '2025001'),
        classGroup: sanitizeString(bill.classGroup, 80, 'TK A'),
        month: sanitizeString(bill.month, 30, 'Juli'),
        year: Number(bill.year) || 2025,
        tuitionFee: Number(bill.tuitionFee) || 0,
        cateringFee: Number(bill.cateringFee) || 0,
        activityFee: Number(bill.activityFee) || 0,
        totalAmount: Number(bill.totalAmount) || 0,
        status: bill.status === 'Lunas' ? 'Lunas' : 'Belum Lunas',
        paidAt: sanitizeString(bill.paidAt || '', 50, ''),
        paymentMethod: bill.paymentMethod || '',
        receiptNumber: sanitizeString(bill.receiptNumber || '', 60, ''),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }
  };

  const updateTuitionBill = (id: string, updated: Partial<TuitionBill>) => {
    setTuitionBills((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'tuition_bills';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.studentName !== undefined) payload.studentName = sanitizeString(updated.studentName, 120, 'Santri');
      if (updated.nis !== undefined) payload.nis = sanitizeString(updated.nis, 40, '2025001');
      if (updated.classGroup !== undefined) payload.classGroup = sanitizeString(updated.classGroup, 80, 'TK A');
      if (updated.month !== undefined) payload.month = sanitizeString(updated.month, 30, 'Juli');
      if (updated.year !== undefined) payload.year = Number(updated.year) || 2025;
      if (updated.tuitionFee !== undefined) payload.tuitionFee = Number(updated.tuitionFee) || 0;
      if (updated.cateringFee !== undefined) payload.cateringFee = Number(updated.cateringFee) || 0;
      if (updated.activityFee !== undefined) payload.activityFee = Number(updated.activityFee) || 0;
      if (updated.totalAmount !== undefined) payload.totalAmount = Number(updated.totalAmount) || 0;
      if (updated.status !== undefined) payload.status = updated.status === 'Lunas' ? 'Lunas' : 'Belum Lunas';
      if (updated.paidAt !== undefined) payload.paidAt = sanitizeString(updated.paidAt, 50, '');
      if (updated.paymentMethod !== undefined) payload.paymentMethod = updated.paymentMethod || '';
      if (updated.receiptNumber !== undefined) payload.receiptNumber = sanitizeString(updated.receiptNumber, 60, '');

      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const deleteTuitionBill = (id: string) => {
    setTuitionBills((prev) => prev.filter((b) => b.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'tuition_bills';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 5. STUDENT REPORTS (E-RAPORT) CRUD ====================
  const updateReport = (id: string, updated: Partial<StudentReport>) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'student_reports';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.studentName !== undefined) payload.studentName = sanitizeString(updated.studentName, 120, 'Santri');
      if (updated.nis !== undefined) payload.nis = sanitizeString(updated.nis, 40, '2025001');
      if (updated.classGroup !== undefined) payload.classGroup = sanitizeString(updated.classGroup, 80, 'TK A');
      if (updated.semester !== undefined) payload.semester = updated.semester;
      if (updated.academicYear !== undefined) payload.academicYear = sanitizeString(updated.academicYear, 30, '2025/2026');
      if (updated.teacherName !== undefined) payload.teacherName = sanitizeString(updated.teacherName, 120, 'Ustadzah');
      if (updated.aspects !== undefined) {
        payload.religiousMoralRating = updated.aspects.religiousMoral.rating;
        payload.motorSkillsRating = updated.aspects.motorSkills.rating;
        payload.cognitiveRating = updated.aspects.cognitive.rating;
        payload.languageRating = updated.aspects.language.rating;
        payload.socialEmotionalRating = updated.aspects.socialEmotional.rating;
        payload.artsRating = updated.aspects.arts.rating;
      }
      if (updated.teacherNotes !== undefined) {
        payload.teacherNotes = sanitizeString(updated.teacherNotes, 600, '');
      }
      if (updated.publishedAt !== undefined) {
        payload.publishedAt = sanitizeString(updated.publishedAt, 40, '2025-12-20');
      }
      if (updated.isPublished !== undefined) {
        payload.isPublished = Boolean(updated.isPublished);
      }
      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const addReport = (report: Omit<StudentReport, 'id'>) => {
    const safeId = sanitizeId(`rep_${Date.now()}`);
    const newReport: StudentReport = { ...report, id: safeId };
    setReports((prev) => [newReport, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const path = 'student_reports';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        ownerId: auth.currentUser.uid,
        studentId: sanitizeString(report.studentId, 64, 'std_1'),
        studentName: sanitizeString(report.studentName, 120, 'Santri'),
        nis: sanitizeString(report.nis, 40, '2025001'),
        classGroup: sanitizeString(report.classGroup, 80, 'TK A'),
        semester: report.semester,
        academicYear: sanitizeString(report.academicYear, 30, '2025/2026'),
        teacherName: sanitizeString(report.teacherName, 120, 'Ustadzah'),
        religiousMoralRating: report.aspects.religiousMoral.rating,
        motorSkillsRating: report.aspects.motorSkills.rating,
        cognitiveRating: report.aspects.cognitive.rating,
        languageRating: report.aspects.language.rating,
        socialEmotionalRating: report.aspects.socialEmotional.rating,
        artsRating: report.aspects.arts.rating,
        teacherNotes: sanitizeString(report.teacherNotes, 600, ''),
        publishedAt: sanitizeString(report.publishedAt, 40, new Date().toISOString().split('T')[0]),
        isPublished: Boolean(report.isPublished),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'student_reports';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 6. NOTIFICATION GATEWAY CRUD ====================
  const sendGatewayNotification = async (
    phone: string,
    recipientName: string,
    type: NotificationLog['type'],
    title: string,
    message: string,
    channel: NotificationLog['channel'] = 'WhatsApp API Gateway'
  ) => {
    const messageId = `MSG-GW-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    const safeId = sanitizeId(`notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);

    const newLog: NotificationLog = {
      id: safeId,
      recipientPhone: phone,
      recipientName,
      type,
      title,
      message,
      channel,
      status: 'Terkirim',
      timestamp,
      gatewayMessageId: messageId,
    };

    setNotificationLogs((prev) => [newLog, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const path = 'notification_logs';
      setDoc(doc(db, path, safeId), {
        id: safeId,
        ownerId: auth.currentUser.uid,
        recipientPhone: sanitizeString(phone, 30, '6287713551412'),
        recipientName: sanitizeString(recipientName, 120, 'Wali Santri'),
        type,
        title: sanitizeString(title, 150, 'Notifikasi Sekolah'),
        message: sanitizeString(message, 1000, 'Pesan otomatis TK Lukman Hakim.'),
        channel,
        status: 'Terkirim',
        gatewayMessageId: sanitizeString(messageId, 80, 'MSG-GW-001'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((error) => handleFirestoreError(error, OperationType.CREATE, path));
    }

    try {
      await fetch('/api/gateway/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientPhone: phone, recipientName, type, title, message, channel }),
      });
    } catch {
      // Gateway simulation fallback
    }

    return { success: true, messageId };
  };

  const deleteNotificationLog = (id: string) => {
    setNotificationLogs((prev) => prev.filter((n) => n.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'notification_logs';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  // ==================== 7. INQUIRIES (BUKU TAMU & KONSULTASI) CRUD ====================
  const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> => {
    const safeId = sanitizeId(`inq_${Date.now()}`);
    const now = new Date();
    const createdAt = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newInquiry: Inquiry = {
      ...inquiry,
      id: safeId,
      ownerId: auth.currentUser?.uid,
      createdAt,
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const path = 'inquiries';
      try {
        await setDoc(doc(db, path, safeId), {
          id: safeId,
          ownerId: auth.currentUser.uid,
          name: sanitizeString(inquiry.name, VALIDATION_LIMITS.parentNameMax, 'Orang Tua'),
          phone: sanitizeString(inquiry.phone, VALIDATION_LIMITS.phoneMax, '6287713551412'),
          childAge: sanitizeString(inquiry.childAge || '', 40, ''),
          interest: sanitizeString(inquiry.interest, VALIDATION_LIMITS.inquiryInterestMax, 'Informasi PPDB'),
          message: sanitizeString(inquiry.message, VALIDATION_LIMITS.inquiryMessageMax, 'Konsultasi pendaftaran'),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }

    return newInquiry;
  };

  const updateInquiry = (id: string, updated: Partial<Inquiry>) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, ...updated } : inq)));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'inquiries';
      const payload: Record<string, any> = { updatedAt: serverTimestamp() };
      if (updated.name !== undefined) payload.name = sanitizeString(updated.name, VALIDATION_LIMITS.parentNameMax, 'Orang Tua');
      if (updated.phone !== undefined) payload.phone = sanitizeString(updated.phone, VALIDATION_LIMITS.phoneMax, '6287713551412');
      if (updated.childAge !== undefined) payload.childAge = sanitizeString(updated.childAge, 40, '');
      if (updated.interest !== undefined) payload.interest = sanitizeString(updated.interest, VALIDATION_LIMITS.inquiryInterestMax, 'Informasi PPDB');
      if (updated.message !== undefined) payload.message = sanitizeString(updated.message, VALIDATION_LIMITS.inquiryMessageMax, 'Konsultasi');

      updateDoc(doc(db, path, safeId), payload).catch((error) =>
        handleFirestoreError(error, OperationType.UPDATE, path)
      );
    }
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    if (auth.currentUser && auth.currentUser.emailVerified && isAdminUser) {
      const safeId = sanitizeId(id);
      const path = 'inquiries';
      deleteDoc(doc(db, path, safeId)).catch((error) =>
        handleFirestoreError(error, OperationType.DELETE, path)
      );
    }
  };

  const updateLaravelConfig = (cfg: Partial<LaravelBridgeConfig>) => {
    setLaravelConfig((prev) => ({ ...prev, ...cfg }));
  };

  // ==================== 8. WEBSITE CMS CRUD (IDENTITY, HERO, PHOTOS, TESTIMONIALS, WA) ====================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHOOL_IDENTITY, JSON.stringify(schoolIdentity));
  }, [schoolIdentity]);

  useEffect(() => {
    const settingsRef = doc(db, 'site_settings', 'public');
    return onSnapshot(settingsRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const settings = snapshot.data().settings;
      if (!settings || typeof settings !== 'object') return;
      if (settings.schoolIdentity) setSchoolIdentity(settings.schoolIdentity);
      if (Array.isArray(settings.heroSlides)) setHeroSlides(settings.heroSlides);
      if (Array.isArray(settings.activityPhotos)) setActivityPhotos(settings.activityPhotos);
      if (Array.isArray(settings.testimonials)) setTestimonials(settings.testimonials);
      if (Array.isArray(settings.waContacts)) setWaContacts(settings.waContacts);
      if (Array.isArray(settings.philosophyCards)) setPhilosophyCards(settings.philosophyCards);
      if (Array.isArray(settings.pillarsData)) setPillarsData(settings.pillarsData);
      if (settings.appearanceConfig) setAppearanceConfig(settings.appearanceConfig);
      if (Array.isArray(settings.customFeatures)) setCustomFeatures(settings.customFeatures);
      if (Array.isArray(settings.teachers)) setTeachers(settings.teachers);
      if (Array.isArray(settings.gallery)) setGallery(settings.gallery);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'site_settings/public');
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_PHOTOS, JSON.stringify(activityPhotos));
  }, [activityPhotos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WA_CONTACTS, JSON.stringify(waContacts));
  }, [waContacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHILOSOPHY_CARDS, JSON.stringify(philosophyCards));
  }, [philosophyCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PILLARS_DATA, JSON.stringify(pillarsData));
  }, [pillarsData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPEARANCE_CFG, JSON.stringify(appearanceConfig));
  }, [appearanceConfig]);

  const resetActivityPhotos = () => {
    setActivityPhotos(SCHOOL_ACTIVITY_PHOTOS);
  };

  const updatePhilosophyCard = (id: string, updated: Partial<PhilosophyCardItem>) => {
    setPhilosophyCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const updatePillarItem = (id: string, updated: Partial<PillarItem>) => {
    setPillarsData((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const updateAppearanceConfig = (updated: Partial<WebsiteAppearanceConfig>) => {
    setAppearanceConfig((prev) => ({ ...prev, ...updated }));
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FEATURES, JSON.stringify(customFeatures));
    } catch {}
  }, [customFeatures]);

  const addCustomFeature = (feat: Omit<CustomFeature, 'id' | 'createdAt'>) => {
    if (!isAdminAuthenticated) return;
    const newFeat: CustomFeature = {
      ...feat,
      id: `feat_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCustomFeatures((prev) => [newFeat, ...prev]);
  };

  const updateCustomFeature = (id: string, updated: Partial<CustomFeature>) => {
    if (!isAdminAuthenticated) return;
    setCustomFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const deleteCustomFeature = (id: string) => {
    if (!isAdminAuthenticated) return;
    setCustomFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleCustomFeature = (id: string) => {
    if (!isAdminAuthenticated) return;
    setCustomFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
  };

  const updateAdminCredentials = (updated: Partial<AdminCredentials>) => {
    if (!isAdminAuthenticated) return;
    setAdminCredentials((prev) => {
      const next = {
        username: (updated.username ?? prev.username).trim(),
        password: updated.password ?? prev.password,
      };
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, btoa(JSON.stringify(next)));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  };

  const loginAdminWithCredentials = (username: string, password: string): boolean => {
    const cleanUser = username.trim();
    if (!cleanUser || !password) return false;

    const uMatch = cleanUser === adminCredentials.username.trim();
    const pMatch = password === adminCredentials.password;
    if (uMatch && pMatch) {
      setIsAdminAuthenticated(true);
      const tokenPayload = {
        authenticated: true,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours active session
      };
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, btoa(JSON.stringify(tokenPayload)));
      return true;
    }
    return false;
  };

  const logoutAdminSession = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    sessionStorage.removeItem('tklh_admin_session_v1');
  };

  const updateSchoolIdentity = (updated: Partial<SchoolIdentity>) => {
    setSchoolIdentity((prev) => {
      const merged = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEYS.SCHOOL_IDENTITY, JSON.stringify(merged));
      } catch (err) {
        console.warn('Storage save warning:', err);
      }
      return merged;
    });
  };

  const saveAllSettingsToServer = async (): Promise<boolean> => {
    try {
      if (
        !auth.currentUser?.emailVerified ||
        auth.currentUser.email?.toLowerCase() !== BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
      ) return false;
      const settings = {
          schoolIdentity,
          heroSlides,
          activityPhotos,
          testimonials,
          waContacts,
          philosophyCards,
          pillarsData,
          appearanceConfig,
          customFeatures,
          teachers,
          gallery,
      };
      const sizeBytes = new TextEncoder().encode(JSON.stringify(settings)).length;
      if (sizeBytes > 900_000) return false;
      await setDoc(doc(db, 'site_settings', 'public'), {
        settings,
        updatedAt: serverTimestamp(),
        updatedBy: auth.currentUser.uid,
      });
      return true;
    } catch (error) {
      console.warn('Gagal menyimpan pengaturan website:', error);
      return false;
    }
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = { ...slide, id: `hero_${Date.now()}` };
    setHeroSlides((prev) => [...prev, newSlide]);
  };

  const updateHeroSlide = (id: string, updated: Partial<HeroSlide>) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  };

  const addActivityPhoto = (photo: Omit<SchoolActivityPhoto, 'id' | 'order'>) => {
    const newPhoto: SchoolActivityPhoto = {
      ...photo,
      id: `doc_${Date.now()}`,
      order: activityPhotos.length + 1,
    };
    setActivityPhotos((prev) => [newPhoto, ...prev]);
  };

  const updateActivityPhoto = (id: string, updated: Partial<SchoolActivityPhoto>) => {
    setActivityPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteActivityPhoto = (id: string) => {
    setActivityPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newItem: TestimonialItem = { ...item, id: `testi_${Date.now()}` };
    setTestimonials((prev) => [newItem, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => (prev.length > 1 ? prev.filter((t) => t.id !== id) : prev));
  };

  const addWaContact = (contact: Omit<WaAdminContact, 'id'>) => {
    const newContact: WaAdminContact = { ...contact, id: `wa_${Date.now()}` };
    setWaContacts((prev) => {
      const merged = [...prev, newContact];
      try {
        localStorage.setItem(STORAGE_KEYS.WA_CONTACTS, JSON.stringify(merged));
      } catch (err) {
        console.warn('Storage save warning:', err);
      }
      return merged;
    });
  };

  const updateWaContact = (id: string, updated: Partial<WaAdminContact>) => {
    setWaContacts((prev) => {
      const merged = prev.map((w) => (w.id === id ? { ...w, ...updated } : w));
      try {
        localStorage.setItem(STORAGE_KEYS.WA_CONTACTS, JSON.stringify(merged));
      } catch (err) {
        console.warn('Storage save warning:', err);
      }
      return merged;
    });
  };

  const deleteWaContact = (id: string) => {
    setWaContacts((prev) => {
      const merged = prev.filter((w) => w.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.WA_CONTACTS, JSON.stringify(merged));
      } catch (err) {
        console.warn('Storage save warning:', err);
      }
      return merged;
    });
  };

  const exportCloudBackup = async (): Promise<string> => {
    const fullDataset = {
      institution: 'TK Lukman Hakim Purwokerto',
      exportedAt: new Date().toISOString(),
      encryption: 'AES-256-GCM / SHA-256',
      data: {
        teachers,
        gallery,
        registrations,
        tuitionBills,
        reports,
        notificationLogs,
        inquiries,
        laravelConfig,
      },
    };

    try {
      const headers = await getAdminRequestHeaders();
      const response = await fetch('/api/backup/export', {
        method: 'POST',
        headers,
        body: JSON.stringify({ dataset: fullDataset }),
      });
      const result = await response.json();
      return JSON.stringify(result.backupPackage || fullDataset, null, 2);
    } catch {
      return JSON.stringify(fullDataset, null, 2);
    }
  };

  const restoreCloudBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const data = parsed.data || parsed.backupPackage?.data || parsed;
      if (data.teachers) setTeachers(data.teachers);
      if (data.gallery) setGallery(data.gallery);
      if (data.registrations) setRegistrations(data.registrations);
      if (data.tuitionBills) setTuitionBills(data.tuitionBills);
      if (data.reports) setReports(data.reports);
      if (data.notificationLogs) setNotificationLogs(data.notificationLogs);
      if (data.inquiries) setInquiries(data.inquiries);
      return true;
    } catch (err) {
      console.error('Failed to parse backup JSON:', err);
      return false;
    }
  };

  const resetToDefaultData = () => {
    setSchoolIdentity(SCHOOL_IDENTITY);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setActivityPhotos(SCHOOL_ACTIVITY_PHOTOS);
    setTestimonials(TESTIMONIALS);
    setWaContacts(WA_ADMIN_CONTACTS);
    setPhilosophyCards(DEFAULT_PHILOSOPHY_CARDS);
    setPillarsData(DEFAULT_PILLARS_DATA);
    setAppearanceConfig(DEFAULT_APPEARANCE_CONFIG);
    setTeachers(INITIAL_TEACHERS);
    setGallery(INITIAL_GALLERY);
    setRegistrations(INITIAL_REGISTRATIONS);
    setTuitionBills(INITIAL_TUITION_BILLS);
    setReports(INITIAL_REPORTS);
    setNotificationLogs(INITIAL_NOTIFICATION_LOGS);
    setInquiries(INITIAL_INQUIRIES);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthReady,
        isAdminUser,
        isCloudSynced,
        lastCloudSyncAt,
        signInWithGoogleAccount,
        signInWithGmailAddress,
        signOutAccount,
        syncLocalDataToFirestore,
        sendPpdbConfirmationEmail,
        sendAnnouncementEmail,
        sendTuitionReceiptEmail,
        fetchInboxEmails,
        schoolIdentity,
        updateSchoolIdentity,
        saveAllSettingsToServer,
        heroSlides,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        activityPhotos,
        addActivityPhoto,
        updateActivityPhoto,
        deleteActivityPhoto,
        resetActivityPhotos,
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
        isAdminAuthenticated,
        loginAdminWithCredentials,
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
        updateReport,
        addReport,
        deleteReport,
        notificationLogs,
        sendGatewayNotification,
        deleteNotificationLog,
        inquiries,
        addInquiry,
        updateInquiry,
        deleteInquiry,
        laravelConfig,
        updateLaravelConfig,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        exportCloudBackup,
        restoreCloudBackup,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
