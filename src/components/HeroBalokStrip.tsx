import React from 'react';
import { Award, GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';

export const HeroBalokStrip: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      metric: 'Grade A',
      title: 'Akreditasi Unggul',
      sub: 'Standar PAUD Nasional',
      accent: 'text-amber-300',
    },
    {
      icon: GraduationCap,
      metric: '25+ Thn',
      title: 'Mengabdi & Dipercaya',
      sub: '3.200+ Alumni Santri',
      accent: 'text-sky-300',
    },
    {
      icon: BookOpen,
      metric: '7 Sentra',
      title: 'Tahfidz & Montessori',
      sub: 'Tilawati · Bilingual Fun',
      accent: 'text-emerald-300',
    },
    {
      icon: ShieldCheck,
      metric: '100%',
      title: 'Ramah Anak & Ber-AC',
      sub: 'Disiplin Positif & Aman',
      accent: 'text-amber-200',
    },
  ];

  return (
    <div className="relative z-30 bg-[#092338] border-y border-white/10">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 sm:gap-4 px-2.5 py-3 sm:px-5 sm:py-5 lg:py-6 group transition-colors hover:bg-white/[0.03]"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-amber-300/40 transition-colors">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.accent}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display text-sm sm:text-xl font-extrabold text-white tracking-tight tabular-nums leading-none">
                      {item.metric}
                    </span>
                    <span className="hidden sm:inline text-[11px] font-bold text-white/80 truncate">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-300/85 font-medium mt-0.5 leading-tight truncate">
                    <span className="sm:hidden">{item.title}</span>
                    <span className="hidden sm:inline">{item.sub}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
