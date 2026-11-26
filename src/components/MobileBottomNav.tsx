import React from 'react';
import { Home, UserCheck, GraduationCap, BookOpen, Phone } from 'lucide-react';
import { PageTab } from '../types';

interface MobileBottomNavProps {
  currentPage: PageTab;
  onNavigate: (page: PageTab, section?: string) => void;
  onOpenPpdb: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenPpdb,
}) => {
  const navItems: {
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    isPrimary?: boolean;
    onClick: () => void;
  }[] = [
    {
      id: 'home',
      label: 'Beranda',
      icon: Home,
      isActive: currentPage === 'home',
      onClick: () => onNavigate('home'),
    },
    {
      id: 'about',
      label: 'Profil',
      icon: UserCheck,
      isActive: currentPage === 'about',
      onClick: () => onNavigate('about'),
    },
    {
      id: 'spmb',
      label: 'Daftar',
      icon: GraduationCap,
      isActive: false,
      isPrimary: true,
      onClick: onOpenPpdb,
    },
    {
      id: 'schools',
      label: 'Sekolah',
      icon: BookOpen,
      isActive: currentPage === 'schools',
      onClick: () => onNavigate('schools'),
    },
    {
      id: 'contact',
      label: 'Kontak',
      icon: Phone,
      isActive: currentPage === 'contact',
      onClick: () => onNavigate('contact'),
    },
  ];

  return (
    <nav
      aria-label="Navigasi Cepat Mobile"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-6px_24px_rgba(11,59,91,0.08)] pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1.5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#006699] to-[#0B3B5B] text-white shadow-lg shadow-[#006699]/30 flex items-center justify-center ring-4 ring-white group-active:scale-95 transition-transform">
                  <Icon className="w-5 h-5 text-amber-300" />
                </span>
                <span className="text-[10px] font-extrabold text-[#006699] mt-1 leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`relative min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl transition-colors cursor-pointer ${
                item.isActive ? 'text-[#006699]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-full bg-[#006699]"
                />
              )}
              <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.4]' : 'stroke-[1.9]'}`} />
              <span
                className={`text-[10px] leading-none whitespace-nowrap ${
                  item.isActive ? 'font-extrabold' : 'font-semibold'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
