import React, { useState } from 'react';
import {
  Upload,
  MapPin,
  Check,
  X,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Settings2,
} from 'lucide-react';
import { SCHOOL_ACTIVITY_PHOTOS } from '../data/initialData';
import { SchoolActivityPhoto } from '../types';
import { useApp } from '../context/AppContext';

interface SchoolActivityGalleryProps {
  onSelectPhotoForHero?: (photoUrl: string) => void;
}

export const SchoolActivityGallery: React.FC<SchoolActivityGalleryProps> = () => {
  const { activityPhotos: photos, updateActivityPhoto, isAdminAuthenticated } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<SchoolActivityPhoto | null>(null);
  const [uploadSuccessId, setUploadSuccessId] = useState<string | null>(null);
  const [isManageMode, setIsManageMode] = useState<boolean>(false);

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateActivityPhoto(id, { customDataUrl: dataUrl });
      setUploadSuccessId(id);
      setTimeout(() => setUploadSuccessId(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File, index: number) => {
      const targetPhoto = photos[index];
      if (!targetPhoto) return;

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        updateActivityPhoto(targetPhoto.id, { customDataUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    });

    setUploadSuccessId('batch');
    setTimeout(() => setUploadSuccessId(null), 4000);
  };

  const handleResetPhotos = () => {
    SCHOOL_ACTIVITY_PHOTOS.forEach((def) => {
      updateActivityPhoto(def.id, { customDataUrl: undefined, defaultPath: def.defaultPath });
    });
  };

  const categories = [
    'Semua',
    'Gerbang & Identitas',
    'Karakter & Ibadah',
    'Adab & Makan Sehat',
    'Outing Class',
    'Edukasi Motorik',
    'Audio Visual',
    'Eksplorasi Alam',
  ];

  const filteredPhotos =
    selectedCategory === 'Semua'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="galeri-kegiatan"
      className="py-16 sm:py-24 bg-slate-50/70 relative overflow-hidden border-y border-slate-100"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Clean Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0084d6] block mb-2">
            Galeri Kegiatan & Dokumentasi Nyata
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Keseharian Ceria di TK LUKMAN HAKIM
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
            Potret autentik aktivitas belajar, ibadah sholat berjamaah, makan bersama, hingga eksplorasi alam terbuka santri kami di Purwokerto.
          </p>
        </div>

        {/* Filter Bar & Subtle Admin Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0084d6] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isAdminAuthenticated && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsManageMode(!isManageMode)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium transition cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{isManageMode ? 'Tutup Kelola Foto' : 'Kelola Foto (Admin)'}</span>
              </button>

              {isManageMode && (
                <>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0084d6] hover:bg-[#0070b8] text-white rounded-lg text-xs font-semibold cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBatchUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={handleResetPhotos}
                    title="Reset ke foto bawaan"
                    className="p-1.5 text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {uploadSuccessId && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Foto dokumentasi berhasil diperbarui.</span>
          </div>
        )}

        {/* Clean 3-Column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => {
            const imageSrc = item.customDataUrl || item.defaultPath;

            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/75 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/budi_mulia_hero.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-20">
                    <span className="px-3.5 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Perbesar</span>
                    </span>

                    {isManageMode && isAdminAuthenticated && (
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-[#0084d6] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Ganti</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(item.id, e)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#0084d6] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto &&
        (() => {
          const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
          const handlePrev = (e: React.MouseEvent) => {
            e.stopPropagation();
            const prevIdx = currentIndex <= 0 ? photos.length - 1 : currentIndex - 1;
            setActivePhoto(photos[prevIdx]);
          };
          const handleNext = (e: React.MouseEvent) => {
            e.stopPropagation();
            const nextIdx = currentIndex >= photos.length - 1 ? 0 : currentIndex + 1;
            setActivePhoto(photos[nextIdx]);
          };

          return (
            <div
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-200 relative"
              >
                <div className="relative aspect-16/10 bg-slate-900">
                  <img
                    src={activePhoto.customDataUrl || activePhoto.defaultPath}
                    alt={activePhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />

                  <button
                    onClick={() => setActivePhoto(null)}
                    className="absolute top-3 right-3 z-20 p-2 bg-slate-950/60 hover:bg-slate-950/80 text-white rounded-full transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#0084d6] font-semibold">
                    <span>{activePhoto.category}</span>
                    <span>•</span>
                    <span className="text-slate-500 font-normal">{activePhoto.location}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activePhoto.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
    </section>
  );
};
