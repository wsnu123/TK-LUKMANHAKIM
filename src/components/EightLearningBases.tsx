import React, { useState } from 'react';
import { EIGHT_LEARNING_BASES } from '../data/initialData';
import { Compass, CheckCircle, Info } from 'lucide-react';
import { LukmanHakimLogo } from './LukmanHakimLogo';

export const EightLearningBases: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Title matching screenshot 3 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            8 Basis Pembelajaran Lukman Al Hakim
          </h2>
          <div className="w-16 h-0.5 bg-[#0084d6] mx-auto mt-3" />
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Prinsip pedagogik memerdekakan potensi alami anak usia dini dengan pendekatan holistik dan penuh kasih sayang.
          </p>
        </div>

        {/* 8 Circles Grid matching screenshot 3 & 8 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 justify-center">
          {EIGHT_LEARNING_BASES.map((base) => {
            const isSelected = selectedBase === base.num;
            return (
              <button
                key={base.num}
                onClick={() => setSelectedBase(isSelected ? null : base.num)}
                className={`group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-white shadow-xl scale-105 ring-2 ring-sky-500'
                    : 'hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Colored Circle with Number matching screenshot 3 */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${base.color} text-white font-extrabold flex flex-col items-center justify-center shadow-md group-hover:scale-110 transition duration-300`}
                >
                  <span className="text-xl sm:text-2xl leading-none">{base.num}</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90">Basis</span>
                </div>

                <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-sky-700 leading-tight">
                  {base.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed active explanation if clicked or default banner */}
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex items-start gap-4">
          <div className="p-3 bg-sky-100 text-sky-700 rounded-xl flex-shrink-0">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            {selectedBase !== null ? (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Basis #{selectedBase}: {EIGHT_LEARNING_BASES[selectedBase - 1].title}
                </span>
                <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                  {EIGHT_LEARNING_BASES[selectedBase - 1].desc}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Klik Lingkaran Basis di Atas
                </span>
                <p className="text-sm text-slate-600 mt-0.5">
                  Setiap basis pembelajaran di TK Lukman Hakim Purwokerto terintegrasi ke dalam Kurikulum Merdeka PAUD dan pembiasaan adab harian santri cilik.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Character Education Graphic Wheel section matching screenshot 8 */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                Siklus Terpadu
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Pendidikan Karakter Terpadu di TK Lukman Hakim Purwokerto
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Karakter mulia bukan hanya materi hafalan, melainkan ekosistem kebiasaan yang dialami anak sejak pertama kali melangkahkan kaki di gerbang sekolah hingga kembali ke pelukan Ayah dan Bunda.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong>Morning Circle & Sholat Dhuha:</strong> Melatih kedisiplinan dan doa tulus.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong>Sentra Eksplorasi & IT Cilik:</strong> Memantik rasa ingin tahu dan kreativitas.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong>Makan Siang Berjamaah:</strong> Menanamkan adab makan dan empati berbagi.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong>Tafakur Alam & Kebun Hijau:</strong> Menumbuhkan cinta pada ciptaan Allah.</span>
                </div>
              </div>
            </div>

            {/* Circular Graphic Visualization with Official TK Lukman Hakim Logo */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-full border-4 border-dashed border-sky-300 flex items-center justify-center p-4 bg-sky-50/40">
                {/* Center Official Seal Logo */}
                <div className="z-10 shadow-xl rounded-full bg-white p-2 border-2 border-sky-200">
                  <LukmanHakimLogo variant="seal" size={170} />
                </div>

                {/* Orbiting Satellites */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-20">
                  Tauhid &amp; Akhlak
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-[#006699] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-20">
                  Kemandirian
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 bg-amber-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-20">
                  Sosial &amp; Empati
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md z-20">
                  Kreativitas Sains
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
