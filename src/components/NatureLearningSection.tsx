import React, { useState } from 'react';
import { Trees, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

interface NatureActivity {
  id: string;
  title: string;
  category: string;
  ageGroup: string;
  image: string;
  description: string;
  benefits: string[];
  quote: string;
}

const NATURE_ACTIVITIES: NatureActivity[] = [
  {
    id: 'mini-zoo-satwa',
    title: 'Sahabat Satwa & Observasi Ikan Air Hidup',
    category: 'Empati Lingkungan',
    ageGroup: '2 - 6 Tahun',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
    description:
      'Santri belajar adab kasih sayang pada makhluk ciptaan Allah melalui observasi dan interaksi langsung dengan ikan hias hidup di baskom air sekolah.',
    benefits: [
      'Menumbuhkan empati dan rasa welas asih pada satwa',
      'Observasi langsung gerak renang dan ekosistem air',
      'Belajar adab menyayangi sesama makhluk ciptaan Allah',
    ],
    quote: '"Lihat ustadzah, ikannya berenang lincah dan mau mendekat ke tangan kami!"',
  },
  {
    id: 'kebun-hidroponik',
    title: 'Kebun Sains & Praktik Menanam Air',
    category: 'Sains & Botanika',
    ageGroup: '3 - 6 Tahun',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.47_c3fc0d83.jpeg',
    description:
      'Santri mempraktikkan langsung cara merawat bibit sayuran kangkung di baki tanam air, mengamati kelembapan akar dan pertumbuhan daun secara nyata.',
    benefits: [
      'Mengenal siklus hidup tumbuhan secara konkret',
      'Melatih kesabaran dan tanggung jawab merawat bibit',
      'Stimulasi sensorik menyentuh tanah basah, air, dan tanaman',
    ],
    quote: '"Senang sekali melihat kangkung yang kami rawat mulai tumbuh tunas hijau!"',
  },
  {
    id: 'sensori-alam',
    title: 'Eksplorasi Pasir Kinetik & Taktil Indera',
    category: 'Sensori Taktil',
    ageGroup: '2 - 5 Tahun',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.53_daac45a0.jpeg',
    description:
      'Stimulasi motorik halus dan kepekaan indera peraba melalui mencetak dan membentuk pasir kinetik warna ramah anak di baki sensori ceria.',
    benefits: [
      'Relaksasi emosi dan stimulasi sensori taktil tangan',
      'Melatih koordinasi pincer grasp dan cetak bentuk',
      'Eksplorasi tekstur pasir basah tanpa membuat kotor',
    ],
    quote: '"Pasirnya lembut sekali di tangan dan bisa dicetak jadi aneka bentuk kue!"',
  },
  {
    id: 'jembatan-motorik',
    title: 'Meracik Herbal Alami dengan Lesung Kayu',
    category: 'Motorik & Bahan Alam',
    ageGroup: '3 - 6 Tahun',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49__1__dbe157c7.jpeg',
    description:
      'Santri menumbuk dedaunan herbal segar menggunakan lesung dan alu kayu tradisional khas Nusantara, menguatkan otot lengan dan koordinasi gerak.',
    benefits: [
      'Menguatkan kekuatan motorik kasar dan cengkeraman tangan',
      'Mengenal alat tumbuk tradisional dan aroma dedaunan herbal',
      'Melatih ritme ketukan dan kesabaran menuntaskan tugas',
    ],
    quote: '"Aroma daun yang ditumbuk di lesung kayu wangi dan segar sekali!"',
  },
  {
    id: 'outing-teratai',
    title: 'Tantangan Mencari Koin di Bebatuan Kali',
    category: 'Eksplorasi Air & Sains',
    ageGroup: '3 - 6 Tahun',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.10_c463d25f.jpeg',
    description:
      'Tantangan seru: "Ayo temukan harta karun di dalam batu!" dalam baskom air jernih, memadukan sensori dingin air, batu kali halus, dan koin perak.',
    benefits: [
      'Ketajaman fokus penglihatan dan koordinasi tangan-mata',
      'Sensasi sensori dingin air dan tekstur bebatuan kali',
      'Kerjasama seru dan kegembiraan memecahkan tantangan',
    ],
    quote: '"Horeee, aku berhasil menemukan koin di antara batu-batu putih di dalam air!"',
  },
  {
    id: 'piknik-adab',
    title: 'Koki Cilik & Jamuan Sup Biji Nusantara',
    category: 'Adab & Main Peran',
    ageGroup: 'Semua Usia',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51__1__7aecc258.jpeg',
    description:
      'Bermain peran menata mangkok sup biji hangat, menyendok takaran dengan centong saji, dan mempraktikkan adab santun makan bersama teman sebaya.',
    benefits: [
      'Kemandirian makan dan menuang makanan tanpa tumpah',
      'Internalisasi adab sopan santun dan saling berbagi hidangan',
      'Sosialisasi hangat dan percakapan dialogis antar kawan',
    ],
    quote: '"Silakan dicicipi mangkok sup hangat buatan koki cilik yang lezat!"',
  },
];

export const NatureLearningSection: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<NatureActivity | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006699] uppercase tracking-wider mb-2">
            <Trees className="w-4 h-4 text-[#0084d6]" />
            <span>Outdoor Learning & Nature Play</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2937] tracking-tight">
            Belajar Riang di Alam Terbuka
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
            Menghadirkan lingkungan sekolah yang asri, hijau, dan dekat dengan alam. Ananda bereksplorasi dengan bebas, menghirup udara segar, dan melatih motorik secara alami.
          </p>
        </div>

        {/* 3 Non-Duplicate Editorial Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {NATURE_ACTIVITIES.map((activity) => (
            <article
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#0084d6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={activity.image}
                  alt={activity.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#0F2937]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-[#0F2937] group-hover:text-[#006699] transition leading-snug">
                      {activity.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#006699] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {activity.description}
                  </p>
                </div>

                {/* Subtle Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Usia {activity.ageGroup}</span>
                  <span className="font-bold text-[#006699]">Lihat Detail</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          onClick={() => setSelectedActivity(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="relative h-56 bg-slate-900">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2937] via-[#0F2937]/30 to-transparent" />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0084d6] px-2.5 py-1 rounded-md">
                  {selectedActivity.category} • Usia {selectedActivity.ageGroup}
                </span>
                <h3 className="text-xl font-extrabold mt-2">{selectedActivity.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedActivity.description}
              </p>

              <div className="bg-[#F4F9FD] rounded-2xl p-4 border border-sky-100 space-y-2">
                <h4 className="text-xs font-extrabold text-[#0F2937] uppercase tracking-wider">
                  Manfaat Tumbuh Kembang:
                </h4>
                {selectedActivity.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#006699] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <blockquote className="text-xs italic text-slate-500 border-l-3 border-[#0084d6] pl-3">
                {selectedActivity.quote}
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
