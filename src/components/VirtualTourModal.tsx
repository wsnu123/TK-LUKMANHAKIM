import React, { useState } from 'react';
import {
  X,
  Compass,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  Calendar,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZoneId?: string;
  onOpenPpdb?: () => void;
}

interface TourHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
}

interface TourZone {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  safetyNote: string;
  hotspots: TourHotspot[];
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  initialZoneId,
  onOpenPpdb,
}) => {
  const { schoolIdentity } = useApp();
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<TourHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const cleanPhone = (schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '');
  const waTarget = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  const tourZones: TourZone[] = [
    {
      id: 'gerbang-utama',
      name: 'Gerbang Utama & One-Gate System',
      subtitle: 'Akses masuk terpadu dengan standar keamanan dan kenyamanan santri',
      category: 'Keamanan & Akses',
      image: '/assets/budi_mulia_hero.jpg',
      description:
        'Pintu gerbang utama sekolah menerapkan sistem satu pintu (One-Gate System) yang diawasi petugas keamanan. Area lobi ramah anak memudahkan Ayah Bunda saat mengantar dan menjemput ananda tercinta.',
      safetyNote: 'Pemeriksaan tamu terdata dan pantauan kamera pengawas 24 jam.',
      hotspots: [
        {
          id: 'h-gate-1',
          x: 25,
          y: 45,
          title: 'Pos Keamanan & One-Gate System',
          description: 'Hanya orang tua/wali terdaftar yang diizinkan menjemput santri demi keselamatan optimal.',
        },
        {
          id: 'h-gate-2',
          x: 70,
          y: 60,
          title: 'Plang Resmi Akreditasi A',
          description: 'Identitas kelembagaan terdaftar resmi di Kemendikbudristek NPSN 69981337.',
        },
      ],
    },
    {
      id: 'playground-motorik',
      name: 'Playground Alam & Lintasan Rambu Lalu Lintas',
      subtitle: 'Area bermain motorik kasar berlapis rumput asri & stimulasi sensori',
      category: 'Outdoor & Motorik',
      image: '/assets/gallery/foto9-jembatan-motorik.jpg',
      description:
        'Halaman bermain terbuka yang luas dilengkapi jembatan titian vestibular, ayunan pengaman ganda, serta sirkuit marka jalan raya untuk melatih keseimbangan fisik dan pengenalan rambu jalan sejak dini.',
      safetyNote: 'Lantai rumput lembut peredam benturan & pendampingan 2 ustadzah.',
      hotspots: [
        {
          id: 'h-play-1',
          x: 48,
          y: 50,
          title: 'Jembatan Titian Kayu Keseimbangan',
          description: 'Mengasah sistem vestibular dan keberanian ananda dengan material kayu halus bersertifikat SNI.',
        },
        {
          id: 'h-play-2',
          x: 80,
          y: 65,
          title: 'Area Rumput Asri & Teduh',
          description: 'Tempat ananda berlari bebas dan menghirup udara segar pagi hari.',
        },
      ],
    },
    {
      id: 'sentra-balok-ac',
      name: '7 Ruang Kelas Sentra Ber-AC & Montessori',
      subtitle: 'Lingkungan belajar sejuk, higienis & kaya media edukasi konkret',
      category: 'Kelas Sentra AC',
      image: '/assets/images/sentra_balok_montessori_1790826050585.jpg',
      description:
        'Setiap ruang kelas sentra didesain tematik dengan pendingin udara Daikin Inverter sejuk, pencahayaan alami yang baik, serta ribuan balok kayu dan puzzle Montessori yang memicu kreativitas tanpa rasa bosan.',
      safetyNote: 'Perabot meja dan kursi bersudut tumpul (Child-Safe Furniture).',
      hotspots: [
        {
          id: 'h-sentra-1',
          x: 35,
          y: 55,
          title: 'Rak Balok Kayu Geometris',
          description: 'Mengembangkan penalaran spasial, matematika awal, dan imajinasi arsitektur ananda.',
        },
        {
          id: 'h-sentra-2',
          x: 82,
          y: 35,
          title: 'Pendingin Udara (AC) & Filter HEPA',
          description: 'Menjaga suhu ruangan tetap sejuk (24°C) agar ananda nyaman beraktivitas sepanjang hari.',
        },
      ],
    },
    {
      id: 'musholla-santri',
      name: 'Musholla Santri & Sentra Tilawati PAUD',
      subtitle: 'Ruang pembiasaan ibadah sholat dhuha & murojaah Al-Qur’an ceria',
      category: 'Ibadah & Karakter',
      image: '/assets/gallery/foto6-sholat-berjamaah.jpg',
      description:
        'Tempat ibadah yang bersih dan nyaman untuk mengenalkan indahnya sholat dhuha berjamaah, doa harian, hafalan surat pendek Juz 30, serta bimbingan membaca Al-Qur’an metode Tilawati PAUD yang berirama riang.',
      safetyNote: 'Karpet lembut higienis dicuci berkala dengan disinfektan ramah anak.',
      hotspots: [
        {
          id: 'h-musholla-1',
          x: 50,
          y: 40,
          title: 'Shaf Sholat Berjamaah Rapi',
          description: 'Mendidik disiplin, kekhusyukan, dan adab berjamaah sejak usia taman kanak-kanak.',
        },
        {
          id: 'h-musholla-2',
          x: 20,
          y: 70,
          title: 'Alat Peraga Tilawati PAUD',
          description: 'Metode belajar huruf hijaiyah dengan lagu dan ketukan nada yang membahagiakan.',
        },
      ],
    },
    {
      id: 'kebun-hidroponik',
      name: 'Kebun Hidroponik Sains & Sahabat Satwa',
      subtitle: 'Laboratorium alam terbuka mengenal tanaman sayur & burung merpati',
      category: 'Sains Alam & Satwa',
      image: '/assets/gallery/foto8-eksplorasi-alam-burung.jpg',
      description:
        'Ananda diajak bersentuhan langsung dengan alam: menyiram tanaman hidroponik, mengamati pertumbuhan benih sayuran, serta memberi makan burung merpati jinak di rumah satwa ramah anak.',
      safetyNote: 'Air penyiram non-kimia dan burung dalam pengawasan dokter hewan puskeswan.',
      hotspots: [
        {
          id: 'h-kebun-1',
          x: 42,
          y: 45,
          title: 'Kandang Burung Merpati Jinak',
          description: 'Melatih rasa welas asih dan empati ananda terhadap sesama makhluk ciptaan Allah SWT.',
        },
        {
          id: 'h-kebun-2',
          x: 75,
          y: 70,
          title: 'Instalasi Pipa Hidroponik Hijau',
          description: 'Eksperimen sains sederhana tentang fotosintesis dan cara menanam sayur organik.',
        },
      ],
    },
    {
      id: 'daycare-makan',
      name: 'Ruang Daycare Batita & Meja Makan Higienis',
      subtitle: 'Pengasuhan penuh kasih, kamar tidur nyaman & menu sehat non-MSG',
      category: 'Daycare & Gizi',
      image: '/assets/gallery/foto4-snack-area-bermain.jpg',
      description:
        'Layanan penitipan anak (Daycare) usia 1.5–3 tahun dengan matras bermain lembut, pendampingan stimulasi tumbuh kembang, serta ruang makan bersama yang menyajikan menu katering bergizi 4 sehat 5 sempurna.',
      safetyNote: 'Sterilisasi peralatan makan dengan air panas & diawasi ustadzah gizi.',
      hotspots: [
        {
          id: 'h-day-1',
          x: 50,
          y: 55,
          title: 'Meja Makan Sehat Bersama',
          description: 'Membiasakan cuci tangan, doa sebelum makan, dan adab makan sambil duduk tenang.',
        },
        {
          id: 'h-day-2',
          x: 85,
          y: 40,
          title: 'Area Istirahat Ber-AC',
          description: 'Kamar tidur bersih dengan tempat tidur empuk untuk istirahat siang berkualitas.',
        },
      ],
    },
  ];

  if (!isOpen) return null;

  const currentZone = tourZones[activeZoneIndex];

  const handleNext = () => {
    setActiveHotspot(null);
    setActiveZoneIndex((prev) => (prev + 1) % tourZones.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setActiveZoneIndex((prev) => (prev - 1 + tourZones.length) % tourZones.length);
  };

  const handleBookingSchoolTour = () => {
    const msg = `Assalamu’alaikum Warahmatullahi Wabarakatuh Admin ${schoolIdentity.nama}.\n\nSaya ingin berkonsultasi & menjadwalkan kunjungan School Tour Offline / Free Trial Class untuk Ananda.\n\nFasilitas yang ingin kami tinjau: *${currentZone.name}*.\nMohon informasi hari dan jam temu yang tersedia. Terima kasih.`;
    window.open(`https://wa.me/${waTarget}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div
        className={`relative w-full bg-slate-900 text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 flex flex-col transition-all duration-300 ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-6xl max-h-[94vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#006699] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-tight text-white">
                  Virtual Tour Fasilitas
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {currentZone.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Jelajahi sudut kampus ramah anak TK Islam Lukman Hakim Purwokerto secara virtual
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              type="button"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              type="button"
              title="Tutup Virtual Tour"
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Stage: Pan/Viewport with Interactive Hotspots */}
        <div className="relative flex-1 bg-black min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden select-none group/stage">
          {/* Main Panorama/Photo */}
          <img
            key={currentZone.id}
            src={currentZone.image}
            alt={currentZone.name}
            className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-500"
          />

          {/* Vignette & Soft Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 pointer-events-none" />

          {/* Interactive Clickable Hotspot Pins */}
          {currentZone.hotspots.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Pulsing Pin Button */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot(isSelected ? null : spot)}
                  className={`relative p-2 rounded-full cursor-pointer transition-all transform hover:scale-125 focus:outline-hidden ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-300/50 shadow-xl'
                      : 'bg-[#006699]/90 text-white hover:bg-[#005585] shadow-lg ring-2 ring-white/80'
                  }`}
                  aria-label={`Lihat info ${spot.title}`}
                >
                  <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40 pointer-events-none" />
                  <Info className="w-4 h-4" />
                </button>

                {/* Hotspot Floating Popup Card */}
                {isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 sm:w-72 bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-sky-200 z-30 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold text-[#006699] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Fasilitas Pilihan
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#0F2937] leading-snug">
                      {spot.title}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Aman & Bersih
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Left / Right Navigation Arrow Buttons */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Zona Sebelumnya"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            type="button"
            aria-label="Zona Selanjutnya"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Title Bar Overlay */}
          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
            <div className="max-w-xl pointer-events-auto bg-slate-950/75 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
              <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
                Zona {activeZoneIndex + 1} dari {tourZones.length}
              </span>
              <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                {currentZone.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {currentZone.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[10.5px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{currentZone.safetyNote}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pointer-events-auto flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleBookingSchoolTour}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kunjungan Offline (Tour Gratis)</span>
              </button>

              {onOpenPpdb && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPpdb();
                  }}
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer active:scale-95"
                >
                  Daftar SPMB
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Zone Thumbnails Strip */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
            {tourZones.map((zone, idx) => {
              const isActive = activeZoneIndex === idx;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setActiveHotspot(null);
                    setActiveZoneIndex(idx);
                  }}
                  type="button"
                  className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#006699]/30 border-sky-400 ring-2 ring-sky-400/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-11 h-11 rounded-lg object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Area {idx + 1}
                    </span>
                    <span className="text-xs font-extrabold text-white line-clamp-1">
                      {zone.name.split('&')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
