import React from 'react';
import { EIGHT_LEARNING_BASES } from '../data/initialData';

export const FivePillarsAndEightBasesDisplay: React.FC = () => {
  return (
    <div className="bg-[#599da8] py-16 sm:py-24 border-b border-teal-700/20 relative overflow-hidden">
      {/* Curved decorative geometries */}
      <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full border-4 border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 -left-16 w-80 h-80 rounded-full border-4 border-white/10 pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* ==================================================================== */}
        {/* 8 BASIS PEMBELAJARAN TK LUKMAN HAKIM */}
        {/* ==================================================================== */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e3b48] tracking-tight flex items-center justify-center flex-wrap gap-2.5">
              <span>8 Basis Pembelajaran</span>
              <span className="bg-white text-[#006699] px-4 py-1 rounded-sm font-black tracking-wide uppercase inline-block shadow-md">
                TK LUKMAN HAKIM
              </span>
            </h2>
          </div>

          {/* 8 Bases 2-Column Grid with Numbered Circle Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-6xl mx-auto">
            {EIGHT_LEARNING_BASES.map((base) => {
              const colorsByNum: Record<number, { bg: string; text: string }> = {
                8: { bg: 'bg-[#ffb703]', text: 'text-white' }, // Disiplin Positif (+)
                7: { bg: 'bg-[#f28482]', text: 'text-white' }, // Praktek OASE (Palette)
                6: { bg: 'bg-[#f72585]', text: 'text-white' }, // Toleransi (Hands)
                5: { bg: 'bg-[#48cae4]', text: 'text-white' }, // Proses (Lightbulb/Figure)
                4: { bg: 'bg-[#ffea00]', text: 'text-slate-900' }, // Lugas (Head/Bulb)
                3: { bg: 'bg-[#00b4d8]', text: 'text-white' }, // Living values (Heart in Hand)
                2: { bg: 'bg-[#55a630]', text: 'text-white' }, // Prestasi (Trophy)
                1: { bg: 'bg-[#80b918]', text: 'text-white' }, // Anak = Unik (Avatar)
              };
              const colorInfo = colorsByNum[base.num] || { bg: 'bg-sky-500', text: 'text-white' };

              return (
                <div key={base.num} className="flex items-start gap-5 group">
                  {/* Round Number Badge */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full ${colorInfo.bg} ${colorInfo.text} flex items-center justify-center font-black text-2xl shadow-md border-2 border-white group-hover:scale-105 transition duration-200`}
                    >
                      {base.num === 8 ? '+' : base.num}
                    </div>
                    {/* Small subscript number */}
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs border border-white">
                      {base.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base sm:text-lg font-black text-[#0e3b48] uppercase tracking-wide">
                      {base.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-800/90 leading-relaxed font-normal">
                      {base.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
