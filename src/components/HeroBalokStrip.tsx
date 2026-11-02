import React from 'react';
import { Award, Star, Compass } from 'lucide-react';

export const HeroBalokStrip: React.FC = () => {
  return (
    <div className="relative z-30 bg-slate-900 border-t border-b border-white/10 py-5 sm:py-6">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Balok 1: Akreditasi Grade A */}
          <div className="group relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400 shadow-xs group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <h4 className="text-base font-bold text-white leading-tight">
                Akreditasi Grade A
              </h4>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Predikat Unggul Nasional
              </p>
            </div>
          </div>

          {/* Balok 2: 25+ Tahun Mengabdi */}
          <div className="group relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-xs group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <h4 className="text-base font-bold text-white leading-tight">
                25+ Tahun Mengabdi
              </h4>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">
                3.200+ Alumni Berprestasi
              </p>
            </div>
          </div>

          {/* Balok 3: Tahfidz & Bilingual */}
          <div className="group relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-sky-400/40 text-white shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 text-sky-400 shadow-xs group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6 text-sky-400" />
            </div>
            <div className="text-left">
              <h4 className="text-base font-bold text-white leading-tight">
                Tahfidz & Bilingual
              </h4>
              <p className="text-xs text-sky-300 font-medium mt-0.5">
                Cambridge Friendly & Adab
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
