import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { Calendar, Tag, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const FacilityGallery: React.FC = () => {
  const { gallery } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ['Semua', 'Kegiatan Belajar', 'Outbound & Bermain', 'Pentas Seni & Kreasi', 'Fasilitas', 'Ibadah & Tahfidz'];

  const filteredGallery =
    activeCategory === 'Semua'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const showAdjacentPhoto = (direction: -1 | 1) => {
    if (!selectedPhoto || filteredGallery.length < 2) return;
    const currentIndex = filteredGallery.findIndex((item) => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + direction + filteredGallery.length) % filteredGallery.length;
    setSelectedPhoto(filteredGallery[nextIndex]);
  };

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
      if (event.key === 'ArrowLeft') showAdjacentPhoto(-1);
      if (event.key === 'ArrowRight') showAdjacentPhoto(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredGallery]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.fallback) return;
    image.dataset.fallback = 'true';
    image.src = '/assets/budi_mulia_hero.jpg';
  };

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching screenshot 9 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006699] bg-[#E0F2FE] px-3 py-1 rounded-full">
            Dokumentasi & Lingkungan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2937] tracking-tight mt-3">
            Fasilitas Sekolah & Galeri Kegiatan
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Melihat langsung kehangatan suasana belajar, bermain, dan beribadah santri cilik TK Lukman Hakim Purwokerto.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#006699] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setSelectedPhoto(item);
              }}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-sky-700 flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-sky-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-sky-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={() => showAdjacentPhoto(-1)}
                  aria-label="Foto sebelumnya"
                  className="absolute left-3 top-1/3 z-10 w-10 h-10 rounded-full bg-black/55 text-white hover:bg-black/75 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => showAdjacentPhoto(1)}
                  aria-label="Foto berikutnya"
                  className="absolute right-3 top-1/3 z-10 w-10 h-10 rounded-full bg-black/55 text-white hover:bg-black/75 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="relative max-h-[60vh] bg-slate-900 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                decoding="async"
                onError={handleImageError}
                className="max-h-[60vh] w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-white">
              <div className="flex items-center gap-2">
                <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedPhoto.date}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedPhoto.title}
              </h3>
              {filteredGallery.length > 1 && (
                <p className="text-xs text-slate-500">
                  {filteredGallery.findIndex((item) => item.id === selectedPhoto.id) + 1} dari {filteredGallery.length} foto
                </p>
              )}
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
