import React from 'react';
import { Award, Star, Compass } from 'lucide-react';

export const HeroBalokStrip: React.FC = () => {
  return (
    <div className="relative z-30 bg-slate-900 border-t border-b border-white/10 py-3 sm:py-6">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          
          {/* Balok 1: Akreditasi Grade A */}
          <div className="group relative overflow-hidden flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-1.5 md:gap-4 px-2 py-2.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400 shadow-xs group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-[10.5px] sm:text-sm md:text-base font-bold text-white leading-tight">
                Akreditasi A
              </h4>
              <p className="text-[9px] sm:text-xs text-amber-300 font-medium mt-0.5 leading-tight">
                Unggul Nasional
              </p>
            </div>
          </div>

          {/* Balok 2: 25+ Tahun Mengabdi */}
          <div className="group relative overflow-hidden flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-1.5 md:gap-4 px-2 py-2.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-xs group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-[10.5px] sm:text-sm md:text-base font-bold text-white leading-tight">
                25+ Tahun
              </h4>
              <p className="text-[9px] sm:text-xs text-emerald-300 font-medium mt-0.5 leading-tight">
                3.200+ Alumni
              </p>
            </div>
          </div>

          {/* Balok 3: Tahfidz & Bilingual */}
          <div className="group relative overflow-hidden flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-1.5 md:gap-4 px-2 py-2.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-sky-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 text-sky-400 shadow-xs group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4 md:w-6 md:h-6 text-sky-400" />
            </div>
            <div>
              <h4 className="text-[10.5px] sm:text-sm md:text-base font-bold text-white leading-tight">
                Tahfidz &amp; Fun
              </h4>
              <p className="text-[9px] sm:text-xs text-sky-300 font-medium mt-0.5 leading-tight">
                Bilingual &amp; Adab
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
