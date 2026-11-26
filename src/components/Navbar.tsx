import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';

interface NavbarProps {
  currentPage: PageTab;
  activeSection?: string;
  onNavigate: (page: PageTab, section?: string) => void;
  onOpenPpdb: () => void;
  onOpenLogin?: () => void;
  onOpenSpp?: () => void;
  onOpenReport?: () => void;
  onOpenPortalWali?: (tab?: 'spp' | 'raport' | 'jadwal') => void;
  onOpenChatbot?: () => void;
  onOpenQr?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeSection,
  onNavigate,
  onOpenPpdb,
}) => {
  const { schoolIdentity } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'schools' | 'facilities' | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<'schools' | 'facilities' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageTab, section?: string) => {
    onNavigate(page, section);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const schoolItems = [
    { id: 'unit-daycare', label: 'Daycare & Batita Ceria', desc: 'Usia 1,5 – 3 Tahun · Pengasuhan & Sensorik' },
    { id: 'unit-kb', label: 'Kelompok Bermain (Playgroup)', desc: 'Usia 3 – 4 Tahun · Sosialisasi & Eksplorasi' },
    { id: 'unit-tka', label: 'Taman Kanak-Kanak A (TK A)', desc: 'Usia 4 – 5 Tahun · Pra-Literasi & Sains Alam' },
    { id: 'unit-tkb', label: 'Taman Kanak-Kanak B (TK B)', desc: 'Usia 5 – 6 Tahun · Kesiapan Matang Masuk SD' },
  ];

  const isSolidNav = isScrolled || currentPage !== 'home' || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolidNav
          ? 'bg-white/92 backdrop-blur-xl shadow-[0_6px_28px_-10px_rgba(9,35,56,0.12)] border-b border-slate-200/80 py-2 sm:py-2.5'
          : 'bg-gradient-to-b from-[#061826]/75 via-[#061826]/35 to-transparent py-2.5 sm:py-4'
      }`}
    >
      <div className="w-full max-w-[1560px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          {/* Left Zone: Brand Emblem & Clean Single-Line Wordmark */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0 flex-1 lg:flex-initial lg:flex-shrink-0"
          >
            <div
              className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                isSolidNav
                  ? 'bg-white ring-1 ring-slate-200/80'
                  : 'bg-white/95 ring-2 ring-white/40 shadow-md'
              }`}
            >
              <LukmanHakimLogo
                variant="emblem"
                size={34}
                className="w-7 h-7 sm:w-9 sm:h-9 border-0 shadow-none"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span
                className={`font-display font-bold text-[12px] sm:text-[15px] xl:text-[16.5px] tracking-tight leading-none transition-colors truncate ${
                  isSolidNav
                    ? 'text-[#092338] group-hover:text-[#006699]'
                    : 'text-white drop-shadow-xs'
                }`}
              >
                {schoolIdentity.nama}
              </span>
              <span
                className={`text-[8.5px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase mt-0.5 sm:mt-1 truncate transition-colors ${
                  isSolidNav ? 'text-[#006699]' : 'text-amber-200/95'
                }`}
              >
                Purwokerto Selatan
              </span>
            </div>
          </div>

          {/* Center Zone: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[13px] xl:text-[14px] font-semibold flex-1">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'home'
                  ? isSolidNav
                    ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#006699]'
                    : 'text-amber-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-amber-300'
                  : isSolidNav
                    ? 'text-slate-700 hover:text-[#006699]'
                    : 'text-white/90 hover:text-white'
              }`}
            >
              Beranda
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`transition-colors py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'about'
                  ? isSolidNav
                    ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#006699]'
                    : 'text-amber-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-amber-300'
                  : isSolidNav
                    ? 'text-slate-700 hover:text-[#006699]'
                    : 'text-white/90 hover:text-white'
              }`}
            >
              Tentang Kami
            </button>

            {/* Sekolah Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('schools')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => handleNavClick('schools')}
                className={`flex items-center gap-1 transition-colors py-1.5 relative cursor-pointer whitespace-nowrap ${
                  currentPage === 'schools'
                    ? isSolidNav
                      ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#006699]'
                      : 'text-amber-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-amber-300'
                    : isSolidNav
                      ? 'text-slate-700 hover:text-[#006699]'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                <span>Jenjang Sekolah</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'schools' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'schools' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[340px] z-50">
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_22px_50px_-12px_rgba(9,35,56,0.2)] border border-slate-200/80 p-2.5 divide-y divide-slate-100">
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        4 Jenjang Pendidikan
                      </span>
                      <span className="text-[11px] font-bold text-[#006699]">Usia 1,5 – 6 Th</span>
                    </div>
                    <div className="py-1.5 space-y-0.5">
                      {schoolItems.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick('schools', item.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-start gap-3 group cursor-pointer ${
                            currentPage === 'schools' && activeSection === item.id
                              ? 'bg-sky-50 text-[#006699]'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span className="text-[11px] font-display font-bold text-amber-600/80 group-hover:text-[#006699] mt-0.5">
                            0{idx + 1}
                          </span>
                          <div className="flex-1 whitespace-normal">
                            <span className="text-xs font-bold block text-[#092338] group-hover:text-[#006699]">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
                              {item.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fasilitas & Tour Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('facilities')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => handleNavClick('facilities')}
                className={`flex items-center gap-1 transition-colors py-1.5 relative cursor-pointer whitespace-nowrap ${
                  currentPage === 'facilities'
                    ? isSolidNav
                      ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#006699]'
                      : 'text-amber-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-amber-300'
                    : isSolidNav
                      ? 'text-slate-700 hover:text-[#006699]'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                <span>Fasilitas &amp; Tour</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'facilities' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'facilities' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-76 z-50">
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_22px_50px_-12px_rgba(9,35,56,0.2)] border border-slate-200/80 p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => handleNavClick('facilities')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl transition hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-[#092338] hover:text-[#006699] cursor-pointer"
                    >
                      <span>Semua Fasilitas Kampus</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('facilities', 'virtual-tour')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl transition bg-[#F4F8FC] hover:bg-sky-50 flex items-center justify-between text-xs font-bold text-[#092338] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#006699]" />
                        <span>Virtual Tour Kampus 360°</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#006699]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`transition-colors py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'contact'
                  ? isSolidNav
                    ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[#006699]'
                    : 'text-amber-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-amber-300'
                  : isSolidNav
                    ? 'text-slate-700 hover:text-[#006699]'
                    : 'text-white/90 hover:text-white'
              }`}
            >
              Kontak &amp; Lokasi
            </button>
          </nav>

          {/* Right Zone: Single Primary Action */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              type="button"
              onClick={onOpenPpdb}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs xl:text-[13px] font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                isSolidNav
                  ? 'bg-[#092338] hover:bg-[#006699] text-white shadow-sm'
                  : 'bg-amber-400 hover:bg-amber-300 text-[#092338] shadow-lg shadow-black/20'
              }`}
            >
              <span>Daftar SPMB 2026/2027</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Compact Header Actions */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenPpdb}
              className={`px-3 py-1.5 min-h-[34px] rounded-full text-[11px] font-extrabold tracking-tight whitespace-nowrap cursor-pointer transition-colors ${
                isSolidNav
                  ? 'bg-[#092338] text-white'
                  : 'bg-amber-400 text-[#092338] shadow-sm'
              }`}
            >
              SPMB
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition cursor-pointer ${
                isSolidNav
                  ? 'text-[#092338] hover:bg-slate-100'
                  : 'text-white bg-white/15 hover:bg-white/25 backdrop-blur-md'
              }`}
              aria-label="Menu Navigasi"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-5 py-4 space-y-2 max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col divide-y divide-slate-100">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'home' ? 'text-[#006699]' : 'text-[#092338]'
              }`}
            >
              Beranda
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'about' ? 'text-[#006699]' : 'text-[#092338]'
              }`}
            >
              Tentang Kami &amp; Kepala Sekolah
            </button>

            {/* Mobile Schools Accordion */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavClick('schools')}
                  className={`text-left py-1.5 font-bold text-sm ${
                    currentPage === 'schools' ? 'text-[#006699]' : 'text-[#092338]'
                  }`}
                >
                  Jenjang Sekolah
                </button>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === 'schools' ? null : 'schools')}
                  className="w-9 h-9 flex items-center justify-center text-slate-500"
                  aria-label="Buka submenu jenjang"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpanded === 'schools' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              {mobileExpanded === 'schools' && (
                <div className="pl-3 mt-1 space-y-1 border-l border-slate-200">
                  {schoolItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick('schools', item.id)}
                      className="w-full text-left py-2 text-xs text-slate-600 hover:text-[#006699] font-semibold block"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Facilities & Virtual Tour */}
            <div className="py-2 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleNavClick('facilities')}
                className={`text-left py-1.5 font-bold text-sm ${
                  currentPage === 'facilities' ? 'text-[#006699]' : 'text-[#092338]'
                }`}
              >
                Fasilitas Kampus
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('facilities', 'virtual-tour')}
                className="text-left py-2.5 px-3.5 rounded-xl bg-[#F4F8FC] text-[#092338] font-bold text-xs flex items-center justify-between border border-sky-100"
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#006699]" />
                  <span>Virtual Tour Interaktif 360°</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#006699]" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'contact' ? 'text-[#006699]' : 'text-[#092338]'
              }`}
            >
              Kontak &amp; Lokasi Sekolah
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPpdb();
              }}
              className="w-full py-3 rounded-xl bg-[#092338] text-white font-extrabold text-xs text-center cursor-pointer shadow-sm"
            >
              Formulir SPMB Online 2026/2027
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
