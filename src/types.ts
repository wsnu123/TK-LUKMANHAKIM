export type AspectRating = 'BSB' | 'BSH' | 'MB' | 'BB';

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  role: string;
  education: string;
  experienceYears: number;
  photo: string;
  bio: string;
  phone: string;
  specialty: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kegiatan Belajar' | 'Outbound & Bermain' | 'Pentas Seni & Kreasi' | 'Fasilitas' | 'Ibadah & Tahfidz' | 'Eksplorasi Alam';
  imageUrl: string;
  date: string;
  description: string;
}

export interface Registration {
  id: string;
  regNumber: string;
  childName: string;
  nickname: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  program: 'Playgroup (Usia 2-3 Th)' | 'TK A (Usia 4-5 Th)' | 'TK B (Usia 5-6 Th)' | 'Kelas Tahfidz Cilik (Usia 4-6 Th)';
  parentName: string;
  motherName: string;
  email?: string;
  phone: string;
  occupation: string;
  address: string;
  status: 'Menunggu Verifikasi' | 'Wawancara Terjadwal' | 'Diterima' | 'Berkas Belum Lengkap';
  createdAt: string;
  notes?: string;
  waSent: boolean;
  gmailWebLink?: string;
  mailtoLink?: string;
  gmailInboxLink?: string;
  whatsappLink?: string;
  portalUrl?: string;
}

export interface TuitionBill {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  classGroup: string;
  month: string;
  year: number;
  tuitionFee: number;
  cateringFee: number;
  activityFee: number;
  totalAmount: number;
  amount?: number;
  dueDate?: string;
  breakdown?: any;
  status: 'Lunas' | 'Belum Lunas';
  paidAt?: string;
  paymentMethod?: 'QRIS' | 'BSI Virtual Account' | 'Bank Mandiri' | 'Bank BRI' | 'BCA' | string;
  receiptNumber?: string;
}

export interface DevelopmentAspect {
  rating: AspectRating;
  ratingLabel: string;
  description: string;
  evidenceNotes: string;
}

export interface StudentReport {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  classGroup: string;
  semester: 'Ganjil' | 'Genap';
  academicYear: string;
  teacherName: string;
  aspects: {
    religiousMoral: DevelopmentAspect;
    motorSkills: DevelopmentAspect;
    cognitive: DevelopmentAspect;
    language: DevelopmentAspect;
    socialEmotional: DevelopmentAspect;
    arts: DevelopmentAspect;
    [key: string]: any;
  };
  attendance: {
    present: number;
    sick: number;
    permit: number;
    absent: number;
    hadir?: number;
    sakit?: number;
    izin?: number;
    alpa?: number;
  };
  teacherNotes: string;
  teacherNote?: string;
  heightCm?: number;
  weightKg?: number;
  tahfidzProgress?: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface NotificationLog {
  id: string;
  recipientPhone: string;
  recipientName: string;
  type: 'PPDB' | 'SPP' | 'RAPORT' | 'BROADCAST';
  title: string;
  message: string;
  channel: 'WhatsApp API Gateway' | 'SMS Gateway';
  status: 'Terkirim' | 'Dibaca' | 'Gagal';
  timestamp: string;
  gatewayMessageId: string;
}

export interface Inquiry {
  id: string;
  ownerId?: string;
  name: string;
  phone: string;
  childAge: string;
  interest: string;
  message: string;
  status?: string;
  createdAt: string;
}

export interface LaravelBridgeConfig {
  baseUrl: string;
  apiToken: string;
  mode: 'internal_cloud' | 'laravel_rest_api';
  autoSync: boolean;
  lastSyncAt: string | null;
  status: 'connected' | 'offline' | 'standby';
}

export interface SchoolActivityPhoto {
  id: string;
  order: number;
  fileName: string;
  title: string;
  category: 'Gerbang & Identitas' | 'Karakter & Ibadah' | 'Adab & Makan Sehat' | 'Outing Class' | 'Edukasi Motorik' | 'Audio Visual' | 'Eksplorasi Alam';
  placement: string;
  description: string;
  aspectRatio: '16:9' | '4:3' | '3:4';
  location: string;
  defaultPath: string;
  customDataUrl?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  welcome: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: string;
}

export interface SchoolIdentity {
  nama: string;
  npsn: string;
  alamat: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  statusSekolah: string;
  bentukPendidikan: string;
  jenjangPendidikan: string;
  instagram: string;
  instagramUrl: string;
  whatsapp: string;
  email: string;
  mapsQuery: string;
  customLogoUrl?: string;
  tagline?: string;
  telepon?: string;
  akreditasi?: string;
  kepalaSekolah?: string;
  jamOperasional?: string;
  yayasan?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  googleMapsUrl?: string;
  websiteUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string;
}

export interface WaAdminContact {
  id: string;
  unit: string;
  name: string;
  phone: string;
  role: string;
}

export interface PhilosophyCardItem {
  id: string;
  title: string;
  desc: string;
}

export interface PillarItem {
  id: string;
  title: string;
  badgeText: string;
  desc: string;
  image: string;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  badge: string;
  text: string;
  linkText?: string;
  linkAction?: 'ppdb' | 'schools' | 'contact' | 'wa';
  bgColor?: string;
}

export interface WebsiteAppearanceConfig {
  themeColor: 'sky' | 'emerald' | 'teal' | 'navy';
  showHeroBanner: boolean;
  showBalokStrip: boolean;
  showIdentityCard: boolean;
  showTrustConversion: boolean;
  showActivityGallery: boolean;
  showPhilosophySection: boolean;
  showCharacterWheel: boolean;
  showDirectoryHub: boolean;
  showNatureSection: boolean;
  showExperienceStats: boolean;
  showWaHotline: boolean;
  showTestimonials: boolean;
  showSentraInSchools?: boolean;
  showPosterCarousel?: boolean;
  announcementBar?: AnnouncementBarConfig;
}

export interface AdminCredentials {
  username: string;
  password: string;
  accessCode?: string;
}

export interface EmailNotificationRecord {
  id: string;
  to: string;
  from: string;
  subject: string;
  bodyText: string;
  bodyHtml: string;
  type: 'PPDB_CONFIRMATION' | 'ANNOUNCEMENT' | 'SYSTEM';
  status: 'Terkirim ke Gmail' | 'Terkirim';
  timestamp: string;
  regNumber?: string;
  childName?: string;
  program?: string;
  deliveryMethod?: string;
  gmailWebLink?: string;
  mailtoLink?: string;
}

export interface CustomFeature {
  id: string;
  title: string;
  category: 'Akademik' | 'Karakter' | 'Fasilitas' | 'Layanan' | 'Ekstrakurikuler' | 'Lainnya';
  icon: string;
  description: string;
  badge?: string;
  isActive: boolean;
  targetAudience?: string;
  actionText?: string;
  actionUrl?: string;
  createdAt: string;
}

export type PageTab = 'home' | 'about' | 'schools' | 'facilities' | 'contact' | 'admin';


export interface UserUploadedPhoto {
  id: string;
  src: string;
  sentraId: string;
  sentraName: string;
  title: string;
  desc: string;
}
