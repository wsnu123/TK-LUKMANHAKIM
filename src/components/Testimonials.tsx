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
    <section className="py-20 sm:py-24 bg-slate-50/70">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Clean Minimalist Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex justify-center gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kesan & Testimoni Orang Tua
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Kepercayaan Ayah dan Bunda di Purwokerto adalah amanah terbesar bagi kami.
          </p>
        </div>

        {/* Featured Editorial Testimonial Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs relative">
          <Quote className="w-10 h-10 text-sky-100 absolute top-6 right-6 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={current.photo}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#0084d6] font-medium">
                    {current.role}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Wali Murid Terverifikasi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Clean Selector Avatars */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {testimonials.map((item, idx) => {
            const isSelected = safeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#0084d6] shadow-xs ring-1 ring-[#0084d6]/30'
                    : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
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
