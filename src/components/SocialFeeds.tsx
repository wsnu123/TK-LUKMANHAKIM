import React, { useState } from 'react';
import { Instagram, X, CalendarDays, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SocialFeeds: React.FC = () => {
  const { gallery, schoolIdentity } = useApp();
  const [activePhoto, setActivePhoto] = useState<(typeof gallery)[number] | null>(null);
  const feeds = gallery.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Kanal Video Edukasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Cerita Kegiatan di Sekolah
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3">
            <a
              href={schoolIdentity.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <Instagram className="w-4 h-4" /> Instagram Sekolah
            </a>
          </div>
        </div>

        {/* Video Cards Grid matching screenshot 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              onClick={() => setActivePhoto(feed)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={feed.imageUrl}
                  alt={feed.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {feed.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-rose-600 transition line-clamp-2">
                    {feed.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                    {feed.description}
                  </p>
                </div>
                <span className="text-[11px] text-[#006699] font-semibold mt-3 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> {feed.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 text-slate-900">
            <div className="flex items-center justify-between p-4 bg-slate-800">
              <h4 className="font-semibold text-sm line-clamp-1 text-white">{activePhoto.title}</h4>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <img src={activePhoto.imageUrl} alt={activePhoto.title} className="w-full max-h-[60vh] object-contain bg-slate-900" />
              <div className="p-5 space-y-2">
                <p className="text-xs text-slate-500">{activePhoto.category} · {activePhoto.date}</p>
                <p className="text-sm text-slate-700">{activePhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
