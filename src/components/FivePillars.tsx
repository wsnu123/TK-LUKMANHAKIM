import React, { useState } from 'react';
import { FIVE_PILLARS } from '../data/initialData';
import { Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const FivePillars: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = FIVE_PILLARS[activePillarIndex];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Decorative background geometry matching screenshot 2 */}
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-sky-50 -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-emerald-50 -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Title matching screenshot 2 & 3 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a4a62] tracking-tight">
            5 Pilar TK LUKMAN HAKIM
          </h2>
          <div className="w-32 h-1 bg-[#1a4a62] mx-auto mt-3 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Pilar pembentukan karakter dan adab islami santri cilik yang diterapkan dalam setiap jengkal kegiatan sekolah.
          </p>
        </div>

        {/* 5 Circular Badges Selector matching screenshot 2 & 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {FIVE_PILLARS.map((pillar, idx) => {
            const isSelected = activePillarIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePillarIndex(idx)}
                className={`group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 focus:outline-hidden ${
                  isSelected
                    ? 'bg-sky-50/80 scale-105 shadow-md border-2 border-sky-400'
                    : 'hover:bg-slate-50 border-2 border-transparent'
                }`}
              >
                {/* Circular image badge with colorful ring */}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 shadow-md transition duration-300 ${
                    isSelected ? 'ring-4 ring-sky-500 ring-offset-2' : 'group-hover:scale-105'
                  }`}
                  style={{ backgroundColor: pillar.color }}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover rounded-full filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-full" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-black uppercase tracking-wider text-center px-2 drop-shadow-md">
                    {pillar.title}
                  </span>
                </div>

                <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-sky-700">
                  {pillar.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Pilar #{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Pillar Showcase Card matching screenshot 3 */}
        <div className="mt-12 max-w-4xl mx-auto bg-[#1b4353] rounded-2xl p-6 sm:p-10 text-white shadow-md border border-slate-700/30 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={activePillar.image}
                  alt={activePillar.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Pilar Ke-{activePillarIndex + 1}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-400" />
                <span className="text-xs uppercase tracking-widest text-sky-200 font-bold">
                  Karakter Unggulan Lukman Hakim
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {activePillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-justify">
                {activePillar.desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-sky-100 font-medium">
                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Diterapkan dalam Sholat & Doa
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Terpantau di E-Raport Anak
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
