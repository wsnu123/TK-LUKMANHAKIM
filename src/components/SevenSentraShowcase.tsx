import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Box,
  Activity,
  Users,
  Palette,
  BookOpen,
  Calculator,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  GraduationCap,
  HeartHandshake,
  Layers,
  ArrowRight,
  Plus,
  Upload,
  Image as ImageIcon,
  Trash2,
  Info,
  ExternalLink,
  Copy,
  Check,
  Quote,
} from 'lucide-react';
import {
  SEVEN_SENTRA_DATA,
  ALL_SENTRA_CLIENT_PHOTOS,
  SentraItem,
} from '../data/sentraData';
import { PageTab, UserUploadedPhoto } from '../types';
import { useApp } from '../context/AppContext';
import { compressImageFile } from '../utils/imageCompressor';

interface SevenSentraShowcaseProps {
  onOpenPpdb?: () => void;
  onNavigate?: (page: PageTab) => void;
}

export const SevenSentraShowcase: React.FC<SevenSentraShowcaseProps> = ({
  onOpenPpdb,
  onNavigate,
}) => {
  const { sentraPhotos: userPhotos, addSentraPhoto, deleteSentraPhoto, isAdminAuthenticated } = useApp();
  const [activeSentraId, setActiveSentraId] = useState<string>('sentra-alam-cair');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [activeTabMode, setActiveTabMode] = useState<'sentra' | 'gallery'>('sentra');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTargetSentra, setUploadTargetSentra] = useState<string>('sentra-alam-cair');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadDesc, setUploadDesc] = useState<string>('');
  const [selectedFileDataUrls, setSelectedFileDataUrls] = useState<string[]>([]);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxList, setLightboxList] = useState<
    { src: string; title: string; desc: string; sentraName?: string; isCustom?: boolean; id?: string }[]
  >([]);

  // Reset active photo index when active sentra changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeSentraId]);

  const activeSentra: SentraItem =
    SEVEN_SENTRA_DATA.find((s) => s.id === activeSentraId) || SEVEN_SENTRA_DATA[0];

  // User photos for the currently active sentra
  const activeSentraUserPhotos = userPhotos.filter((p) => p.sentraId === activeSentra.id);

  // Combined photos for the currently active sentra
  const activeSentraPhotos = [
    ...activeSentra.gallery.map((g) => ({
      src: g.src,
      title: g.activity,
      desc: g.caption,
      sentraName: activeSentra.name,
      isCustom: false,
      id: g.src,
    })),
    ...activeSentraUserPhotos.map((p) => ({
      src: p.src,
      title: p.title,
      desc: p.desc,
      sentraName: p.sentraName,
      isCustom: true,
      id: p.id,
    })),
  ];

  // All combined photos across all 7 sentra
  const allCombinedPhotos = [
    ...ALL_SENTRA_CLIENT_PHOTOS,
    ...userPhotos.map((p) => ({
      id: p.id,
      src: p.src,
      sentraId: p.sentraId,
      sentraName: p.sentraName,
      title: p.title,
      desc: p.desc,
      isCustom: true,
    })),
  ];

  const currentPreviewPhoto =
    activeSentraPhotos[activePhotoIndex] || activeSentraPhotos[0];

  const getSentraIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'Box':
        return <Box className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'Activity':
        return <Activity className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'Users':
        return <Users className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'Palette':
        return <Palette className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'Calculator':
        return <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Layers className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const openSentraLightbox = (index: number) => {
    setLightboxList(activeSentraPhotos);
    setLightboxIndex(index);
  };

  const openFullGalleryLightbox = (
    index: number,
    filteredPhotos: typeof allCombinedPhotos
  ) => {
    const list = filteredPhotos.map((p) => ({
      src: p.src,
      title: p.title,
      desc: p.desc,
      sentraName: p.sentraName,
      isCustom: (p as any).isCustom,
      id: p.id,
    }));
    setLightboxList(list);
    setLightboxIndex(index);
  };

  const handleNextPhoto = () => {
    if (lightboxIndex !== null && lightboxList.length > 0) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % lightboxList.length);
    }
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex !== null && lightboxList.length > 0) {
      setLightboxIndex((prev) =>
        prev === 0 ? lightboxList.length - 1 : (prev ?? 1) - 1
      );
    }
  };

  const handleNextPreview = () => {
    if (activeSentraPhotos.length > 0) {
      setActivePhotoIndex((prev) => (prev + 1) % activeSentraPhotos.length);
    }
  };

  const handlePrevPreview = () => {
    if (activeSentraPhotos.length > 0) {
      setActivePhotoIndex((prev) =>
        prev === 0 ? activeSentraPhotos.length - 1 : prev - 1
      );
    }
  };

  const handleCopyWebsiteLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const compressed = await compressImageFile(file, { maxDimension: 1200, quality: 0.78 });
        urls.push(compressed);
      } catch (err) {
        console.warn('Gagal mengompresi foto:', err);
      }
    }
    setSelectedFileDataUrls((prev) => [...prev, ...urls]);
  };

  const handleSaveUploadedPhotos = async () => {
    if (!isAdminAuthenticated) return;
    if (selectedFileDataUrls.length === 0) return;

    const targetSentraObj = SEVEN_SENTRA_DATA.find((s) => s.id === uploadTargetSentra);
    const sentraName = targetSentraObj ? targetSentraObj.name : 'Sentra Belajar';

    for (const url of selectedFileDataUrls) {
      await addSentraPhoto({
        src: url,
        sentraId: uploadTargetSentra,
        sentraName: sentraName,
        title: uploadTitle.trim() || `Dokumentasi Tambahan ${sentraName}`,
        desc: uploadDesc.trim() || 'Foto kegiatan nyata santri TK Lukman Hakim.',
      });
    }

    setSelectedFileDataUrls([]);
    setUploadTitle('');
    setUploadDesc('');
    setIsUploadModalOpen(false);
  };

  const handleDeleteUserPhoto = (id: string) => {
    if (!isAdminAuthenticated) return;
    deleteSentraPhoto(id);
    if (lightboxIndex !== null) {
      setLightboxIndex(null);
    }
  };

  const filteredClientPhotos =
    galleryFilter === 'all'
      ? allCombinedPhotos
      : allCombinedPhotos.filter((p) => p.sentraId === galleryFilter);

  return (
    <section
      id="tujuh-sentra-sekolah"
      className="py-16 sm:py-24 bg-gradient-to-b from-sky-50/40 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006699]/10 border border-[#006699]/20 text-[#006699] text-xs sm:text-sm font-extrabold shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Pusat Unggulan Kurikulum Merdeka PAUD (Metode BCCT)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2937] tracking-tight leading-tight">
            Eksplorasi <span className="text-[#006699]">7 Sentra Belajar</span> Holistik
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Metode Beyond Centers and Circle Time (BCCT) mengoptimalkan potensi fitrah, adab islami, serta kemandirian santri. Dilengkapi <strong>foto dokumentasi nyata</strong> kegiatan santri di dalam kelas!
          </p>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTabMode('sentra')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 ${
                activeTabMode === 'sentra'
                  ? 'bg-[#006699] text-white shadow-sky-200 shadow-md ring-2 ring-[#006699]/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tampilan Interaktif 7 Sentra</span>
            </button>

            <button
              onClick={() => setActiveTabMode('gallery')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 ${
                activeTabMode === 'gallery'
                  ? 'bg-amber-500 text-[#0F2937] shadow-amber-200 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>
                Galeri Semua Foto ({allCombinedPhotos.length} Foto Nyata)
              </span>
            </button>

            {isAdminAuthenticated && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-500"
                title="Hanya Admin: Unggah foto dokumentasi baru"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Foto Baru (Admin)</span>
              </button>
            )}

            <button
              onClick={handleCopyWebsiteLink}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5 bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              title="Salin Link Website"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-extrabold">Link Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Salin Link Web</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODE 1: DETAIL 7 SENTRA TAB VIEW                              */}
        {/* ============================================================== */}
        {activeTabMode === 'sentra' && (
          <div className="space-y-6">
            {/* 7 Sentra Quick Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
              {SEVEN_SENTRA_DATA.map((sentra) => {
                const isActive = activeSentraId === sentra.id;
                return (
                  <button
                    key={sentra.id}
                    onClick={() => setActiveSentraId(sentra.id)}
                    className={`relative p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-[#006699] shadow-md ring-2 ring-[#006699]/20 -translate-y-0.5'
                        : 'bg-white/90 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                          isActive
                            ? 'bg-[#006699] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sentra.number}
                      </span>
                      <span
                        className={`p-1.5 rounded-lg ${
                          isActive ? 'text-[#006699] bg-sky-50' : 'text-slate-400 bg-slate-50'
                        }`}
                      >
                        {getSentraIcon(sentra.iconName)}
                      </span>
                    </div>

                    <div>
                      <div className="font-extrabold text-xs text-[#0F2937] leading-snug line-clamp-1">
                        {sentra.name}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {sentra.subtitle.split(',')[0]}
                      </div>
                    </div>

                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#006699] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Showcase Container (Card) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
              
              {/* Card Header Banner */}
              <div className="bg-gradient-to-r from-[#0F2937] via-[#005585] to-[#006699] p-5 sm:p-7 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
                  <span className="text-[110px] font-black">{activeSentra.number}</span>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xs text-white text-xs font-bold">
                      <span>Sentra #{activeSentra.number} dari 7 Sentra</span>
                      <span>•</span>
                      <span>{activeSentra.fullName}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                      {activeSentra.name}
                    </h3>

                    <p className="text-sky-100 text-xs sm:text-sm font-normal leading-relaxed">
                      {activeSentra.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-full font-extrabold bg-[#fbbf24] text-[#0F2937] shadow-xs">
                      {activeSentraPhotos.length} Foto Dokumentasi
                    </span>
                  </div>
                </div>
              </div>

              {/* Balanced 2-Column Content Grid */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ========================================================== */}
                {/* LEFT COLUMN: Curricular Description, Skills & Tools (6 cols) */}
                {/* ========================================================== */}
                <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
                  
                  {/* Philosophy Quote Box */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <Quote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold italic">"{activeSentra.philosophy}"</p>
                    </div>
                  </div>

                  {/* Core Description */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Gambaran Pembelajaran
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {activeSentra.fullDesc}
                    </p>
                  </div>

                  {/* Core Developmental Skills */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#006699]" />
                      <span>Stimulasi & Capaian Tumbuh Kembang</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeSentra.coreSkills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Media & Materials Used */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-amber-500" />
                      <span>Alat Peraga Edukatif (APE) & Bahan Konkret</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSentra.materials.map((mat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 text-[#005585] text-xs font-medium border border-sky-100"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    {onOpenPpdb && (
                      <button
                        onClick={onOpenPpdb}
                        className="px-5 py-3 rounded-full bg-[#006699] hover:bg-[#0F2937] text-white font-bold text-xs sm:text-sm shadow-md transition duration-200 cursor-pointer flex items-center gap-2"
                      >
                        <span>Daftarkan Ananda Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('facilities')}
                        className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition duration-200 cursor-pointer"
                      >
                        <span>Lihat Ruang Kelas Sentra</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* ========================================================== */}
                {/* RIGHT COLUMN: Master-Detail Interactive Photo Stage (6 cols) */}
                {/* ========================================================== */}
                <div className="lg:col-span-6 space-y-3">
                  
                  {/* Top Bar for Stage */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-extrabold text-slate-700">
                        Dokumentasi Kegiatan Santri
                      </span>
                    </div>
                    <span className="text-slate-400 font-semibold text-[11px]">
                      Foto {activePhotoIndex + 1} dari {activeSentraPhotos.length}
                    </span>
                  </div>

                  {/* Main Featured Photo Box (Fixed Aspect Ratio 16:10, No distortion) */}
                  <div
                    onClick={() => openSentraLightbox(activePhotoIndex)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group cursor-pointer"
                  >
                    <img
                      src={currentPreviewPhoto?.src}
                      alt={currentPreviewPhoto?.title || 'Dokumentasi Sentra'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#0F2937]/80 backdrop-blur-xs text-white text-[11px] font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{currentPreviewPhoto?.title}</span>
                      </span>
                      {currentPreviewPhoto?.isCustom && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                          Foto Tambahan
                        </span>
                      )}
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0F2937]/75 backdrop-blur-xs text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition shadow-sm">
                      <Maximize2 className="w-4 h-4 text-amber-300" />
                    </div>

                    {/* Navigation Buttons on Main Stage */}
                    {activeSentraPhotos.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevPreview();
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition cursor-pointer opacity-90 group-hover:opacity-100"
                          title="Foto Sebelumnya"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextPreview();
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition cursor-pointer opacity-90 group-hover:opacity-100"
                          title="Foto Berikutnya"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Bottom Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3.5 pt-8 text-white">
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                        {currentPreviewPhoto?.desc}
                      </p>
                    </div>
                  </div>

                  {/* Uniform Thumbnail Selector Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-0.5">
                      <span>Pilih Foto ({activeSentraPhotos.length} foto tersedia):</span>
                      <button
                        onClick={() => openSentraLightbox(activePhotoIndex)}
                        className="text-[#006699] hover:underline cursor-pointer font-bold flex items-center gap-1"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Buka Layar Penuh</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {activeSentraPhotos.map((photo, pIdx) => {
                        const isSelected = activePhotoIndex === pIdx;
                        return (
                          <button
                            key={photo.id || pIdx}
                            onClick={() => setActivePhotoIndex(pIdx)}
                            className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-slate-100 ${
                              isSelected
                                ? 'border-[#006699] ring-2 ring-[#006699]/30 scale-102 shadow-sm'
                                : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                            }`}
                            title={photo.title}
                          >
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {photo.isCustom && (
                              <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emerald-500" />
                            )}
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#006699]/15" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Mini Toolbar */}
                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                    <span>*Klik foto utama untuk melihat tampilan resolusi penuh.</span>
                    {isAdminAuthenticated && (
                      <button
                        onClick={() => {
                          setUploadTargetSentra(activeSentra.id);
                          setIsUploadModalOpen(true);
                        }}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tambah Foto ke Sentra Ini (Admin)</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODE 2: FULL ALL-PHOTOS CLIENT DOCUMENTATION GALLERY           */}
        {/* ============================================================== */}
        {activeTabMode === 'gallery' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setGalleryFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === 'all'
                    ? 'bg-[#006699] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Semua Foto ({allCombinedPhotos.length})
              </button>
              {SEVEN_SENTRA_DATA.map((s) => {
                const count = allCombinedPhotos.filter((p) => p.sentraId === s.id).length;
                return (
                  <button
                    key={s.id}
                    onClick={() => setGalleryFilter(s.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      galleryFilter === s.id
                        ? 'bg-[#006699] text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{s.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        galleryFilter === s.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Uniform Responsive Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4.5">
              {filteredClientPhotos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => openFullGalleryLightbox(idx, filteredClientPhotos)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer bg-slate-100 aspect-[4/3] flex flex-col justify-end"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Tag */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-[#0F2937]/80 backdrop-blur-xs text-white text-[10px] font-bold line-clamp-1">
                      {photo.sentraName}
                    </span>
                    {(photo as any).isCustom && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold">
                        Baru
                      </span>
                    )}
                  </div>

                  {/* Hover Caption Overlay */}
                  <div className="relative z-10 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-extrabold text-xs text-amber-300 line-clamp-1">
                        {photo.title}
                      </h5>
                      <Maximize2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-200 line-clamp-1 mt-0.5">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Menampilkan <strong>{filteredClientPhotos.length}</strong> foto dokumentasi otentik kegiatan sentra santri TK Lukman Hakim Purwokerto.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: UNGGAH / TAMBAH FOTO BARU UNTUK 7 SENTRA               */}
      {/* ============================================================== */}
      {isUploadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F2937]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Tambah Foto Dokumentasi Sentra
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Foto akan langsung tampil rapi di galeri sentra pilihan Anda.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Sentra Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Pilih Sentra Belajar:
              </label>
              <select
                value={uploadTargetSentra}
                onChange={(e) => setUploadTargetSentra(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-[#006699]"
              >
                {SEVEN_SENTRA_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.number}. {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title & Desc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  Judul Aktivitas (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Misal: Eksplorasi Sensori"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">
                  Keterangan Singkat:
                </label>
                <input
                  type="text"
                  placeholder="Deskripsi kegiatan santri..."
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            {/* File Input Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Pilih File Foto (Bisa pilih beberapa sekaligus):
              </label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition p-4 text-center">
                <ImageIcon className="w-7 h-7 text-emerald-600 mb-1" />
                <span className="text-xs font-extrabold text-emerald-800">
                  Klik untuk Memilih File Foto dari HP / Laptop
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Format JPG, JPEG, PNG (Mendukung multi-select)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelection}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview of chosen files */}
            {selectedFileDataUrls.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{selectedFileDataUrls.length} Foto Siap Ditambahkan</span>
                  <button
                    onClick={() => setSelectedFileDataUrls([])}
                    className="text-rose-600 hover:underline text-[11px] cursor-pointer"
                  >
                    Batal Semua
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto py-1">
                  {selectedFileDataUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="preview"
                      className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveUploadedPhotos}
                disabled={selectedFileDataUrls.length === 0}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition shadow-xs cursor-pointer ${
                  selectedFileDataUrls.length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Simpan &amp; Tampilkan ({selectedFileDataUrls.length} Foto)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR REAL CLIENT PHOTOS              */}
      {/* ============================================================== */}
      {lightboxIndex !== null && lightboxList[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F2937]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-900/90 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#006699] text-white text-xs font-bold">
                  {lightboxList[lightboxIndex].sentraName || 'Sentra Belajar'}
                </span>
                <span className="text-xs text-slate-400">
                  {lightboxIndex + 1} dari {lightboxList.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isAdminAuthenticated && lightboxList[lightboxIndex].isCustom && lightboxList[lightboxIndex].id && (
                  <button
                    onClick={() =>
                      handleDeleteUserPhoto(lightboxList[lightboxIndex].id!)
                    }
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Hapus foto ini (Hanya Admin)"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Hapus</span>
                  </button>
                )}

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  title="Tutup Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[300px] sm:min-h-[480px] p-2 overflow-hidden">
              <img
                src={lightboxList[lightboxIndex].src}
                alt={lightboxList[lightboxIndex].title}
                className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-lg"
              />

              {/* Prev / Next navigation */}
              {lightboxList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                    title="Foto Sebelumnya"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                    title="Foto Selanjutnya"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-amber-300">
                  {lightboxList[lightboxIndex].title}
                </h5>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lightboxList[lightboxIndex].desc}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 shrink-0">
                Dokumentasi TK Lukman Hakim
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
