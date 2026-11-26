import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex >= testimonials.length ? 0 : activeIndex;
  const current = testimonials[safeIndex] || testimonials[0];
  if (!current) return null;

  return (
    <section className="py-10 sm:py-24 bg-[#FAFBFD]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-14 space-y-2">
          <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
            Suara Ayah &amp; Bunda
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] tracking-tight">
            Kesan &amp; Testimoni Orang Tua
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kepercayaan keluarga di Purwokerto adalah amanah terbesar yang kami jaga setiap hari.
          </p>
        </div>

        {/* Featured Editorial Quote Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-[32px] p-5 sm:p-12 border border-slate-200/85 shadow-[0_18px_46px_-24px_rgba(9,35,56,0.14)] relative">
            {/* Warm Gold Star Row */}
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Wali Murid Terverifikasi</span>
              </span>
            </div>

            <blockquote className="font-serif italic text-sm sm:text-2xl text-[#092338] leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 flex items-center gap-3 sm:gap-4">
              <img
                src={current.photo}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-13 sm:h-13 rounded-full object-cover ring-2 ring-sky-100 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-display text-sm sm:text-base font-extrabold text-[#092338] truncate">
                  {current.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#006699] font-semibold truncate">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          {/* Selector Strip: Horizontal Swipe on Mobile, 3-Col Grid on sm+ */}
          <div className="mt-3.5 sm:mt-6 flex overflow-x-auto gap-2.5 pb-1 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-3 sm:gap-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
            {testimonials.map((item, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-[200px] shrink-0 sm:w-auto p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#092338] text-white border-[#092338] shadow-md'
                      : 'bg-white border-slate-200/80 hover:border-sky-300 text-[#092338]'
                  }`}
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-white/30"
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-extrabold truncate ${
                        isSelected ? 'text-white' : 'text-[#092338]'
                      }`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-[10.5px] truncate ${
                        isSelected ? 'text-amber-300' : 'text-slate-500'
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
