import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Star,
  Calendar,
  X,
  ChevronDown,
  ArrowRight,
  Building2,
  Trees,
  Sparkles,
  Heart,
  Sun,
  Palette,
  Baby,
  Compass,
  Award,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { VirtualTourModal } from '../components/VirtualTourModal';

interface FacilitiesPageProps {
  activeSection?: string;
  onNavigate: (page: PageTab) => void;
  onOpenPpdb: () => void;
}

interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  areaSize: string;
  locationZone: string;
  image: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  safetyStandard: string;
  coordinator: {
    name: string;
    role: string;
    avatar: string;
  };
}

const ALL_FACILITIES: FacilityItem[] = [
  {
    id: 'outdoor-playground',
    title: 'Playground Alam & Sirkuit Rambu Lalu Lintas',
    subtitle: 'Area bermain motorik kasar & simulasi keselamatan jalan raya',
    category: 'Outdoor & Alam',
    badge: 'Fasilitas sekolah',
    rating: 0,
    reviewsCount: 0,
    areaSize: 'Area luar ruang',
    locationZone: 'Halaman Terbuka Kampus',
    image: '/assets/gallery/foto9-jembatan-motorik.jpg',
    galleryImages: [
      '/assets/gallery/foto9-jembatan-motorik.jpg',
      '/assets/gallery/foto5-tertib-lalu-lintas.jpg',
      '/assets/gallery/foto4-snack-area-bermain.jpg',
    ],
    description:
      'Foto kegiatan anak bermain dan mengenal lingkungan sekolah. Untuk mengetahui fasilitas yang tersedia saat ini, Ayah dan Bunda dapat menjadwalkan kunjungan.',
    highlights: [],
    safetyStandard: '',
    coordinator: {
      name: '',
      role: '',
      avatar: '',
    },
  },
  {
    id: 'sentra-balok-ac',
    title: '7 Ruang Kelas Sentra Ber-AC & Multimedia Audio Visual',
    subtitle: 'Ruang kelas ber-AC mewadahi 7 sentra belajar lengkap dengan ribuan APE ramah anak',
    category: 'Kelas Sentra AC',
    badge: 'Full AC & LCD',
    rating: 5.0,
    reviewsCount: 128,
    areaSize: '7 Ruang Sentra',
    locationZone: 'Gedung Sentra Lantai 1',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01_031c3324.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.55_945243a3.jpeg',
      '/assets/images/sentra_balok_montessori_1790826050585.jpg',
    ],
    description:
      'Foto kegiatan belajar di ruang sentra. Ayah dan Bunda dapat melihat kondisi ruang dan perlengkapan secara langsung saat berkunjung.',
    highlights: [
      'Pendingin ruangan (AC) Daikin Inverter sejuk & sirkulasi HEPA',
      'Balok kayu natural berbagai bentuk geometris bersertifikasi SNI',
      'Smart TV proyektor untuk visualisasi kisah teladan dan sains',
      'Pojok baca (Reading Corner) dengan buku cerita islami bergambar',
    ],
    safetyStandard: 'Meja-kursi ergonomis bersudut tumpul (Child-Safe Furniture).',
    coordinator: {
      name: 'Ustadzah Annisa Dwi Lestari, S.Psi.',
      role: 'Wali Kelas & Tumbuh Kembang',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'musholla-tahfidz',
    title: 'Musholla Santri & Halaqah Tilawati Al-Qurâ€™an',
    subtitle: 'Sentra pembiasaan sholat berjamaah & tahfidz Juz 30',
    category: 'Ibadah & Karakter',
    badge: 'Sentra Ibadah',
    rating: 5.0,
    reviewsCount: 164,
    areaSize: 'Kapasitas Â±80 Santri',
    locationZone: 'Sayap Timur Lantai 1',
    image: '/assets/images/tahfidz_tilawati_ceria_1790826065441.jpg',
    galleryImages: [
      '/assets/images/tahfidz_tilawati_ceria_1790826065441.jpg',
      '/assets/gallery/foto6-sholat-berjamaah.jpg',
      '/assets/images/sholat_berjamaah_1789701704780.jpg',
    ],
    description:
      'Foto kegiatan ibadah dan belajar Al-Qurâ€™an. Jadwal kegiatan dan metode yang digunakan dapat ditanyakan langsung kepada sekolah.',
    highlights: [
      'Karpet empuk bersih dengan jadwal vacuum cleaner harian',
      'Tempat wudhu khusus anak dengan tinggi keran 45â€“55 cm',
      'Peraga Tilawati besar & kartu hijaiyah warna-warni',
      'Mukena & sarung cilik bersih tersimpan di loker terawat',
    ],
    safetyStandard: 'Jalur wudhu berlapis keset karet anti-slip & pemisahan area kering.',
    coordinator: {
      name: 'Ustadz Ahmad Fauzi Al-Hafidz',
      role: 'Koordinator Tahfidz Al-Qurâ€™an',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'sains-kebun-hewan',
    title: 'Kebun Hidroponik & Rumah Merpati Ramah Satwa',
    subtitle: 'Laboratorium alam terbuka untuk sains dan empati fauna',
    category: 'Outdoor & Alam',
    badge: 'Eksplorasi Alam',
    rating: 4.8,
    reviewsCount: 95,
    areaSize: 'Zona Taman Sains',
    locationZone: 'Taman Belakang Kampus',
    image: '/assets/images/sains_kebun_hidroponik_1790826078024.jpg',
    galleryImages: [
      '/assets/images/sains_kebun_hidroponik_1790826078024.jpg',
      '/assets/gallery/foto8-eksplorasi-alam-burung.jpg',
      '/assets/images/rumah_burung_nature_1789701916669.jpg',
    ],
    description:
      'Foto aktivitas eksplorasi alam. Ketersediaan kebun dan area satwa dapat dikonfirmasi saat Ayah dan Bunda berkunjung.',
    highlights: [
      'Instalasi pipa hidroponik vertikal ramah jangkauan anak',
      'Kandang rumah merpati jinak bersih dengan jadwal pakan teratur',
      'Alat penyiram air mini & sarung tangan berkebun khusus balita',
      'Area observasi serangga, kupu-kupu, dan bunga mekar',
    ],
    safetyStandard: 'Satwa jinak tersertifikasi sehat bebas parasit & wastafel cuci sabun.',
    coordinator: {
      name: 'Ustadzah Hj. Siti Nur Azizah, M.Pd.',
      role: 'Kepala Sekolah & Pembina Adiwiyata',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'studio-seni-kriya',
    title: 'Studio Seni Musik Angklung & Sentra Kreasi Lukis',
    subtitle: 'Wadah ekspresi motorik halus, warna, dan instrumen tradisional',
    category: 'Seni & Musik',
    badge: 'Kreativitas',
    rating: 4.9,
    reviewsCount: 110,
    areaSize: 'Sentra Kreasi Seni',
    locationZone: 'Lantai 1 Ruang Seni',
    image: '/assets/images/seni_lukis_angklung_1790826091504.jpg',
    galleryImages: [
      '/assets/images/seni_lukis_angklung_1790826091504.jpg',
      '/assets/images/wisuda_pentas_seni_1790826113606.jpg',
    ],
    description:
      'Foto aktivitas seni dan kreasi anak. Jadwal dan perlengkapan kegiatan dapat ditanyakan kepada pihak sekolah.',
    highlights: [
      'Set lengkap angklung bambu bernada pentatonik anak-anak',
      'Meja lukis easel kayu rendah & kuas spons ramah tangan kecil',
      'Cat air, lilin plastisin & pewarna berlabel Non-Toxic Food-Grade',
      'Panggung pertunjukan mini untuk latihan berani berbicara',
    ],
    safetyStandard: 'Seluruh material prakarya 100% Non-Toxic & celemek plastik pelindung.',
    coordinator: {
      name: 'Ustadzah Maya Anggraini, S.Sn.',
      role: 'Guru Sentra Seni & Budaya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'ruang-makan-sanitasi',
    title: 'Ruang Makan Katering Gizi & Toilet Ramah Balita',
    subtitle: 'Area pembiasaan adab makan sehat dan toilet training mandiri',
    category: 'Kesehatan & Sanitasi',
    badge: 'Higienis & Sehat',
    rating: 4.9,
    reviewsCount: 136,
    areaSize: 'Zona Makan Komunal',
    locationZone: 'Sayap Selatan Kampus',
    image: '/assets/gallery/foto7-makan-siang-bersama.jpg',
    galleryImages: [
      '/assets/gallery/foto7-makan-siang-bersama.jpg',
      '/assets/gallery/foto4-snack-area-bermain.jpg',
      '/assets/images/makan_siang_santri_1789701844034.jpg',
    ],
    description:
      'Foto kegiatan makan bersama. Untuk informasi menu dan layanan yang tersedia, silakan hubungi sekolah.',
    highlights: [
      'Penyajian katering higienis non-MSG dengan sertifikasi gizi',
      'Wastafel baris dengan ketinggian khusus anak & sabun antiseptik',
      'Kloset jongkok dan duduk mini untuk toilet training nyaman',
      'Lantai kamar mandi kering bertekstur kasar anti-terpeleset',
    ],
    safetyStandard: 'Disinfeksi meja & area makan sebelum dan sesudah kegiatan makan santri.',
    coordinator: {
      name: 'Ustadzah Siti Fatimah, A.Md.',
      role: 'Koordinator Gizi & Sanitasi Siswa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  },
];

const CATEGORIES_DATA = [
  {
    id: 'outdoor',
    name: 'Playground Alam',
    metric: 'Â±450 mÂ² Area Terbuka',
    icon: Trees,
    filterKey: 'Outdoor & Alam',
    tag: 'Taman & Lalu Lintas',
  },
  {
    id: 'sentra-ac',
    name: '7 Sentra Belajar AC',
    metric: '7 Ruang Sentra Ber-AC',
    icon: Building2,
    filterKey: 'Kelas Sentra AC',
    tag: 'Montessori & APE',
  },
  {
    id: 'hidroponik',
    name: 'Kebun Hidroponik',
    metric: 'Sains & Rumah Burung',
    icon: Sun,
    filterKey: 'Outdoor & Alam',
    tag: 'Eksplorasi Alam',
  },
  {
    id: 'musholla',
    name: 'Musholla Santri',
    metric: 'Kapasitas 80 Santri',
    icon: Sparkles,
    filterKey: 'Ibadah & Karakter',
    tag: 'Sholat & Tilawati',
  },
  {
    id: 'studio-seni',
    name: 'Studio Seni Musik',
    metric: 'Angklung & Cat Lukis',
    icon: Palette,
    filterKey: 'Seni & Musik',
    tag: 'Kreasi Budaya',
  },
  {
    id: 'multimedia',
    name: 'Multimedia Cilik',
    metric: 'Smart Proyektor Audio',
    icon: Compass,
    filterKey: 'Kelas Sentra AC',
    tag: 'Kisah Nabi & Animasi',
  },
  {
    id: 'daycare',
    name: 'Ruang Daycare Batita',
    metric: 'Playmat Empuk Usia 2-4',
    icon: Baby,
    filterKey: 'Kesehatan & Sanitasi',
    tag: 'Stimulasi Sensorik',
  },
  {
    id: 'k3l-cctv',
    name: 'Sanitasi dan kebersihan',
    metric: 'Area kebersihan sekolah',
    icon: ShieldCheck,
    filterKey: 'Kesehatan & Sanitasi',
    tag: 'Keamanan Berlapis',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Apakah fasilitas di TK Lukman Hakim aman bagi balita usia 3â€“5 tahun?',
    a: 'Ayah dan Bunda dapat melihat area belajar dan bermain saat kunjungan, serta menanyakan langsung pendampingan yang diterapkan sesuai usia ananda.',
  },
  {
    q: 'Bagaimana sistem pendingin udara (AC) dan sirkulasi di ruang kelas sentra?',
    a: 'Kondisi ruang belajar dan fasilitas yang tersedia dapat dilihat langsung saat berkunjung ke sekolah.',
  },
  {
    q: 'Apakah orang tua diperbolehkan melakukan kunjungan (School Tour) sebelum mendaftar?',
    a: 'Tentu. Hubungi panitia untuk mengatur waktu kunjungan, supaya kami dapat menyambut Ayah dan Bunda serta ananda dengan baik.',
  },
  {
    q: 'Bagaimana standar kebersihan toilet balita dan area makan katering?',
    a: 'Silakan tanyakan kondisi area sanitasi, kebiasaan kebersihan, dan layanan makan yang tersedia langsung kepada sekolah saat berkunjung.',
  },
  {
    q: 'Bagaimana sistem keamanan One-Gate System saat jam pulang sekolah?',
    a: 'Tanyakan prosedur antar-jemput dan penjemputan yang berlaku kepada panitia sebelum ananda mulai bersekolah.',
  },
];

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  activeSection,
  onNavigate,
  onOpenPpdb,
}) => {
  const { schoolIdentity } = useApp();

  // Search & Filter State
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('Semua');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<FacilityItem | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  // Handle active section scrolling and auto-open virtual tour
  React.useEffect(() => {
    if (activeSection === 'virtual-tour') {
      setIsVirtualTourOpen(true);
    } else if (activeSection) {
      const el = document.getElementById(activeSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return ALL_FACILITIES.filter((item) => {
      // Category Tab
      if (selectedCategoryTab !== 'Semua' && item.category !== selectedCategoryTab) {
        return false;
      }
      // Zone filter
      if (selectedZone !== 'Semua' && !item.locationZone.toLowerCase().includes(selectedZone.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesZone = item.locationZone.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesCat || matchesZone;
      }
      return true;
    });
  }, [selectedCategoryTab, selectedZone, searchQuery]);

  const categoriesTabs = ['Semua', 'Outdoor & Alam', 'Kelas Sentra AC', 'Ibadah & Karakter', 'Seni & Musik', 'Kesehatan & Sanitasi'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 overflow-x-hidden pt-16 sm:pt-20">
      {/* ======================================================================== */}
      {/* 1. HERO SECTION (EXPANDED TO WIDE CONTAINER TO FILL SCREEN BEAUTIFULLY)  */}
      {/* ======================================================================== */}
      <section className="relative bg-gradient-to-b from-[#006699] via-[#005585] to-[#0F2937] text-white pt-12 pb-24 sm:pb-32 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden rounded-b-[40px] sm:rounded-b-[56px] shadow-xl">
        {/* Playful Hand-Drawn SVG Decorative Curves matching DreamGigs */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <svg className="absolute top-10 left-[15%] w-32 h-20 text-white" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
            <path d="M10 50 Q 50 10 90 30" />
            <path d="M85 20 L90 30 L80 32" fill="currentColor" />
          </svg>
          <svg className="absolute top-14 right-[18%] w-36 h-24 text-white" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
            <path d="M10 20 Q 50 50 90 20" />
            <path d="M80 18 L90 20 L86 28" fill="currentColor" />
          </svg>
        </div>

        {/* Floating Student Avatars / Pill Badge on Top */}
        <div className="max-w-[1560px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 px-5 py-2 rounded-full shadow-lg">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                alt="Santri"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Santri"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=80&q=80"
                alt="Santri"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-sky-100 tracking-wide">
              Â± 1.200 mÂ² Sarana Prasarana Ramah Anak â€¢ Akreditasi A
            </span>
          </div>

          {/* Headline matching DreamGigs Hero */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-5xl mx-auto">
            Fasilitas Penunjang Edukatif &{' '}
            <span className="text-[#fbbf24] underline decoration-wavy decoration-[#fbbf24]/50">
              Ramah Anak
            </span>
          </h1>

          <p className="text-sky-100/90 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Jelajahi lingkungan belajar yang aman, sejuk, dan terstandarisasi. Memadukan kehangatan ruang kelas sentra ber-AC Daikin dengan luasnya taman bermain alam terbuka.
          </p>

          {/* Virtual Tour & Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsVirtualTourOpen(true)}
              type="button"
              className="px-6 py-3 rounded-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#0F2937] font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#006699]" />
              <span>Buka Virtual Tour Interaktif (6 Zona)</span>
            </button>
            <a
              href={`https://wa.me/6287713551412?text=${encodeURIComponent('Assalamu’alaikum Admin TK Lukman Hakim. Saya ingin mendaftar sesi School Tour Langsung / Free Trial Class untuk ananda. Mohon informasi jadwal temu yang tersedia.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 shadow-md flex items-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Jadwalkan Kunjungan Offline (Gratis)</span>
            </a>
          </div>

          {/* ==================================================================== */}
          {/* SEARCH & FILTER BAR DOCK (GENEROUS WIDE DOCK TO FILL SCREEN)         */}
          {/* ==================================================================== */}
          <div className="max-w-5xl mx-auto mt-8 bg-white p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl border border-slate-100 text-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
              {/* Category Select (4 cols) */}
              <div className="sm:col-span-4 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Kategori Fasilitas
                </span>
                <select
                  value={selectedCategoryTab}
                  onChange={(e) => setSelectedCategoryTab(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer mt-0.5 truncate"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Outdoor & Alam">Outdoor & Playground</option>
                  <option value="Kelas Sentra AC">Kelas Sentra Ber-AC</option>
                  <option value="Ibadah & Karakter">Ibadah & Musholla</option>
                  <option value="Seni & Musik">Studio Musik & Angklung</option>
                  <option value="Kesehatan & Sanitasi">Kantin & Toilet Ramah Balita</option>
                </select>
              </div>

              {/* Location Zone (3 cols) */}
              <div className="sm:col-span-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Area / Zona
                </span>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer mt-0.5 truncate"
                >
                  <option value="Semua">Seluruh Zona</option>
                  <option value="Halaman">Halaman Terbuka</option>
                  <option value="Gedung Sentra">Gedung Sentra AC</option>
                  <option value="Sayap Timur">Musholla Lantai 1</option>
                  <option value="Taman">Taman Sains Belakang</option>
                  <option value="Sayap Selatan">Area Makan Sehat</option>
                </select>
              </div>

              {/* Keyword Search (3 cols) */}
              <div className="sm:col-span-3 px-4 py-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Kata Kunci
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Contoh: Balok, CCTV, AC..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Search Action Button (2 cols) */}
              <div className="sm:col-span-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('explore-facilities');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-5 rounded-xl sm:rounded-full bg-[#006699] hover:bg-[#005585] text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Cari</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 2. TRUSTED ACCREDITATION BAR (WIDE CONTAINER)                            */}
      {/* ======================================================================== */}
      <section className="relative z-20 -mt-8 sm:-mt-10 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-[#0F2937] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-700/60">
          <div className="text-center mb-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              Standar & Akreditasi Resmi
            </span>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Fasilitas memenuhi standar sarana prasarana PAUD nasional dan Dinas Pendidikan Banyumas
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {[
              { label: 'Kemendikbudristek Akreditasi A', icon: Award },
              { label: 'Sekolah Ramah Anak (SRA)', icon: ShieldCheck },
              { label: 'Metode Tilawati Resmi', icon: Sparkles },
              { label: 'Program Adiwiyata Berkelanjutan', icon: Trees },
              { label: 'Kemitraan K3L & UKS Puskesmas', icon: Heart },
            ].map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-semibold text-slate-100 transition"
                >
                  <Icon className="w-4 h-4 text-[#fbbf24]" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 3. "POPULAR CATEGORIES" SECTION (WIDE CONTAINER 2-COLUMN LAYOUT)         */}
      {/* ======================================================================== */}
      <section className="py-16 sm:py-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006699] bg-[#E0F2FE] px-3.5 py-1.5 rounded-full">
                Kategori Sarana
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2937] tracking-tight mt-2.5">
                Kategori Fasilitas Unggulan
              </h2>
              <p className="text-xs sm:text-base text-slate-600 mt-1.5 max-w-2xl">
                Setiap sudut lingkungan didesain terencana untuk menunjang 8 kecerdasan jamak dan pembentukan adab islami anak.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryTab('Semua');
                setSearchQuery('');
                setSelectedZone('Semua');
                const el = document.getElementById('explore-facilities');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#006699] hover:text-[#004e75] transition cursor-pointer self-center sm:self-auto"
            >
              <span>Lihat Semua Fasilitas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Section Layout: Left Big Card + Right Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Big Visual Banner Card */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 group flex flex-col justify-end p-7 sm:p-8 min-h-[380px] lg:min-h-full bg-slate-900">
            <img
              src="/assets/gallery/foto9-jembatan-motorik.jpg"
              alt="Playground TK Lukman Hakim"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2937] via-[#0F2937]/60 to-transparent" />

            <div className="relative z-10 space-y-3.5">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-[#fbbf24] text-[#0F2937] px-3 py-1 rounded-md shadow-xs">
                Infrastruktur Ramah Balita
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                Kampus Asri, Nyaman & Aman Seluas Â±1.200 mÂ²
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Tersedia 7 ruang sentra ber-AC, kebun hidroponik, musholla cilik, serta taman lalu lintas mini.
              </p>
              <button
                onClick={() => {
                  setSelectedCategoryTab('Outdoor & Alam');
                  const el = document.getElementById('explore-facilities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs px-5 py-3 rounded-xl border border-white/25 transition cursor-pointer"
              >
                <span>Jelajahi Outdoor Area</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 8 Clean White Rounded Category Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES_DATA.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryTab(cat.filterKey);
                    const el = document.getElementById('explore-facilities');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white hover:bg-[#F4F9FD] border border-slate-200/90 hover:border-[#006699]/40 p-5 rounded-2xl text-center flex flex-col items-center justify-center gap-3 shadow-xs hover:shadow-md transition group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] group-hover:bg-[#006699] text-[#006699] group-hover:text-white flex items-center justify-center transition shadow-xs">
                    <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-800 group-hover:text-[#006699] transition line-clamp-1">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {cat.metric}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 4. "EXPLORE OUR GIGS" -> SHOWCASE FASILITAS (WIDE 3-COLUMN GRID)         */}
      {/* ======================================================================== */}
      <section id="explore-facilities" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006699] bg-[#E0F2FE] px-3.5 py-1.5 rounded-full">
              Pilihan Fasilitas Lengkap
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2937] tracking-tight mt-3">
              Jelajahi Sarana & Prasarana
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mt-2">
              Klik pada salah satu kartu untuk melihat galeri foto lengkap, spesifikasi keamanan, dan penanggung jawab ruangan.
            </p>

            {/* Filter Pills matching DreamGigs Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
              {categoriesTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategoryTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    selectedCategoryTab === tab
                      ? 'bg-[#006699] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredFacilities.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedFacilityModal(item)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-[#006699]/90 backdrop-blur-xs text-white text-xs font-extrabold px-3 py-1.5 rounded-md shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-[#006699]" />
                      <span className="truncate">{item.locationZone}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedFacilityModal(item)}
                      className="text-lg font-extrabold text-[#0F2937] group-hover:text-[#006699] transition cursor-pointer leading-snug line-clamp-2"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                  </div>
                </div>

                {/* Card Footer matching DreamGigs */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedFacilityModal(item)}
                    className="w-full px-4 py-2 rounded-lg bg-[#006699] hover:bg-[#005585] text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFacilities.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700">Tidak ada fasilitas yang cocok</h3>
              <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              <button
                onClick={() => {
                  setSelectedCategoryTab('Semua');
                  setSearchQuery('');
                  setSelectedZone('Semua');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#006699] text-white text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 5. "YOUR FREQUENTLY ADDED QUESTION'S" (FAQ ACCORDION + COLLAGE)          */}
      {/* ======================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visual Collage with teal card */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white h-48 sm:h-52 bg-slate-100">
                    <img
                      src="/assets/images/sentra_balok_montessori_1790826050585.jpg"
                      alt="Kelas Balok"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Teal Experience Badge Card */}
                  <div className="bg-[#006699] text-white p-6 rounded-2xl shadow-lg space-y-1.5 text-center">
                    <span className="text-3xl sm:text-4xl font-extrabold block text-[#fbbf24]">18+</span>
                    <span className="text-xs sm:text-sm font-bold block uppercase tracking-wider">Tahun Dedikasi</span>
                    <p className="text-xs text-sky-100">Membina generasi sholeh & cerdas di Banyumas</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white h-72 sm:h-80 bg-slate-100">
                    <img
                      src="/assets/gallery/foto8-eksplorasi-alam-burung.jpg"
                      alt="Taman Satwa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006699] bg-[#E0F2FE] px-3.5 py-1.5 rounded-full">
                  Pertanyaan Sering Ditanyakan
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2937] tracking-tight mt-2.5">
                  Tanya Jawab Fasilitas & Keamanan
                </h2>
                <p className="text-xs sm:text-base text-slate-600 mt-1.5">
                  Transparansi dan standar keselamatan untuk ketenangan Ayah Bunda menitipkan ananda.
                </p>
              </div>

              <div className="space-y-3.5 pt-3">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-base text-[#0F2937] hover:text-[#006699] transition cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'transform rotate-180 text-[#006699]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 6. CTA BANNER ("Find the right service for your needs")                  */}
      {/* ======================================================================== */}
      <section className="py-14 sm:py-20 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-r from-[#005585] via-[#006699] to-[#0F2937] text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
              <circle cx="100" cy="100" r="80" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Avatar Stack */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Wali Santri"
                  className="w-16 h-16 rounded-full border-3 border-white object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Wali Santri"
                  className="w-16 h-16 rounded-full border-3 border-white object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Kepala Sekolah"
                  className="w-16 h-16 rounded-full border-3 border-white object-cover shadow-md"
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-sky-200 block">Jadwalkan Kunjungan</span>
                <span className="text-lg sm:text-xl font-extrabold text-white block">School Tour & Free Trial</span>
              </div>
            </div>

            {/* Middle: Headline */}
            <div className="lg:col-span-5 space-y-1.5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                Ingin Mengajak Ananda Mencoba Bermain di Kampus Kami?
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                Kunjungi langsung kampus kami di {schoolIdentity.alamat}, {schoolIdentity.kecamatan} pada hari Senin â€“ Sabtu.
              </p>
            </div>

            {/* Right: Actions */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3.5 px-6 rounded-full bg-[#fbbf24] hover:bg-amber-300 text-[#0F2937] font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Tur Kampus</span>
              </button>
              <button
                onClick={onOpenPpdb}
                className="w-full py-3 px-6 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Daftar PPDB Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* 7. TESTIMONIAL SPOTLIGHT ("Why People Love TK Lukman Hakim")             */}
      {/* ======================================================================== */}
      <section className="py-12 pb-24 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-y border-slate-200 py-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Ingin melihat langsung?</h2>
            <p className="text-sm text-slate-600 mt-1">Hubungi sekolah untuk mengatur waktu kunjungan kampus.</p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#006699] text-white text-sm font-bold hover:bg-[#005585]"
          >
            <Calendar className="w-4 h-4" /> Atur kunjungan
          </button>
        </div>
      </section>

      {/* ======================================================================== */}
      {/* MODAL DETAIL FASILITAS                                                   */}
      {/* ======================================================================== */}
      {selectedFacilityModal && (
        <div
          onClick={() => setSelectedFacilityModal(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Header image */}
            <div className="relative h-64 bg-slate-900 shrink-0">
              <img
                src={selectedFacilityModal.image}
                alt={selectedFacilityModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-center text-white">
                <span className="bg-[#006699] px-3.5 py-1.5 rounded-md text-xs font-extrabold">
                  {selectedFacilityModal.category}
                </span>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2937]">
                  {selectedFacilityModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Zona: {selectedFacilityModal.locationZone}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedFacilityModal.description}
              </p>

              {/* Gallery mini preview */}
              {selectedFacilityModal.galleryImages.length > 1 && (
                <div>
                  <h4 className="text-xs font-extrabold text-slate-700 mb-2">Foto Sudut Lainnya:</h4>
                  <div className="grid grid-cols-3 gap-2.5">
                    {selectedFacilityModal.galleryImages.map((gImg, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImg({ src: gImg, title: selectedFacilityModal.title })}
                        className="h-24 rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:opacity-90 transition"
                      >
                        <img src={gImg} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer action */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedFacilityModal(null);
                    onNavigate('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#006699] text-white text-xs sm:text-sm font-extrabold hover:bg-[#005585] transition cursor-pointer"
                >
                  Tanya Ustadzah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* FULLSCREEN LIGHTBOX                                                      */}
      {/* ======================================================================== */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="w-full max-h-[80vh] object-cover"
            />
            <div className="p-4 bg-[#0F2937] text-white flex items-center justify-between">
              <span className="text-sm font-bold">{lightboxImg.title}</span>
              <span className="text-xs text-sky-300">{schoolIdentity.nama}</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Virtual Tour Modal */}
      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        onOpenPpdb={onOpenPpdb}
      />
    </div>
  );
};
