import React, { useState } from 'react';
import { Play, Instagram, Youtube, X } from 'lucide-react';

export const SocialFeeds: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{ title: string; desc: string } | null>(null);

  const feeds = [
    {
      title: 'Bermain Balok & Lego Sentra Rancang Bangun',
      tag: 'Kreativitas',
      duration: '02:15',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      desc: 'Anak-anak dilatih merancang menara, jembatan, dan masjid cilik untuk mengasah konsentrasi motorik halus.',
    },
    {
      title: 'Mengenal Bagian Rumah & Adab Mengetuk Pintu',
      tag: 'Adab Islami',
      duration: '01:45',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      desc: 'Pembelajaran kontekstual tentang ucapan salam, adab meminta izin masuk ke kamar orang tua, dan kebersihan.',
    },
    {
      title: 'Gebyar Hari Anak Nasional - Senam & Drumband Cilik',
      tag: 'Pentas Seni',
      duration: '03:10',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      desc: 'Keceriaan ananda TK A dan TK B menampilkan kreasi drumband dan tarian lagu islami di alun-alun Purwokerto.',
    },
    {
      title: 'Melipat Origami Ceria & Menempel Kolase Biji',
      tag: 'Motorik Halus',
      duration: '02:00',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      desc: 'Melatih kesabaran jemari tangan anak dalam membentuk bunga, burung, dan perahu kertas yang warna-warni.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Kanal Video Edukasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Keseruan Aktivitas Siswa di YouTube & Instagram
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <Youtube className="w-4 h-4" /> YouTube Channel
            </a>
            <a
              href="https://www.instagram.com/pg.tk.lukmanhakimpwt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <Instagram className="w-4 h-4" /> @pg.tk.lukmanhakimpwt
            </a>
          </div>
        </div>

        {/* Video Cards Grid matching screenshot 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feeds.map((feed, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVideo(feed)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={feed.image}
                  alt={feed.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                  {feed.duration}
                </span>
                <span className="absolute top-2 left-2 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {feed.tag}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 group-hover:text-rose-600 transition line-clamp-2">
                    {feed.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                    {feed.desc}
                  </p>
                </div>
                <span className="text-[11px] text-rose-600 font-semibold mt-3 flex items-center gap-1">
                  <Play className="w-3 h-3 fill-rose-600" /> Tonton Video
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 text-white">
            <div className="flex items-center justify-between p-4 bg-slate-800">
              <h4 className="font-semibold text-sm line-clamp-1">{activeVideo.title}</h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black flex flex-col items-center justify-center p-6 text-center">
              <Play className="w-16 h-16 text-rose-500 mb-3 animate-pulse" />
              <p className="font-bold text-lg">{activeVideo.title}</p>
              <p className="text-xs text-slate-400 max-w-md mt-2">{activeVideo.desc}</p>
              <p className="text-[11px] text-sky-400 mt-4">
                Memutar dari Arsip Dokumentasi Resmi TK Lukman Hakim Purwokerto
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
