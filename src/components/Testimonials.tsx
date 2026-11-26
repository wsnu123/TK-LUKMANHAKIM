import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex >= testimonials.length ? 0 : activeIndex;
  const current = testimonials[safeIndex] || testimonials[0];
  if (!current) return null;

  return (
    <section className="py-8 sm:py-20 bg-slate-50/70">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Clean Minimalist Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-12">
          <div className="flex justify-center gap-1 text-amber-400 mb-1.5 sm:mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kesan &amp; Testimoni Orang Tua
          </h2>
          <p className="text-[11.5px] sm:text-sm text-slate-500 mt-1 sm:mt-2">
            Kepercayaan Ayah dan Bunda di Purwokerto adalah amanah terbesar bagi kami.
          </p>
        </div>

        {/* Featured Editorial Testimonial Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-10 border border-slate-200/80 shadow-xs relative">
          <Quote className="w-7 h-7 sm:w-10 sm:h-10 text-sky-100 absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none" />

          <div className="space-y-3.5 sm:space-y-6 relative z-10">
            <p className="text-xs sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal pr-6 sm:pr-0">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-row items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                <img
                  src={current.photo}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-base font-bold text-slate-900 truncate">
                    {current.name}
                  </h4>
                  <p className="text-[10.5px] sm:text-xs text-[#0084d6] font-medium truncate">
                    {current.role}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Wali Murid Terverifikasi</span>
                <span className="sm:hidden">Terverifikasi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Clean Selector Avatars (Horizontal swipe chips on mobile, 3-col grid on sm+) */}
        <div className="mt-3 sm:mt-6 flex overflow-x-auto gap-2 pb-1 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-3 sm:gap-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
          {testimonials.map((item, idx) => {
            const isSelected = safeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-[185px] shrink-0 sm:w-auto p-2.5 sm:p-3.5 rounded-xl border text-left transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#0084d6] shadow-xs ring-1 ring-[#0084d6]/30'
                    : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                    {item.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
