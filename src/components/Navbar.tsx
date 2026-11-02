import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Settings,
  UserCheck,
  CreditCard,
  GraduationCap,
  Calendar,
  Bot,
  Sparkles,
  Mail,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';

interface NavbarProps {
  currentPage: PageTab;
  activeSection?: string;
  onNavigate: (page: PageTab, section?: string) => void;
  onOpenPpdb: () => void;
  onOpenSpp: () => void;
  onOpenReport: () => void;
  onOpenPortalWali?: (tab?: 'spp' | 'raport' | 'jadwal') => void;
  onOpenChatbot?: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activeSection,
  onNavigate,
  onOpenPpdb,
  onOpenSpp,
  onOpenReport,
  onOpenPortalWali,
  onOpenChatbot,
  onOpenAdmin,
}) => {
  const { schoolIdentity, appearanceConfig, isAdminAuthenticated, currentUser, signInWithGoogleAccount, signOutAccount } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'schools' | 'facilities' | 'portal' | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<'schools' | 'facilities' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageTab, section?: string) => {
    onNavigate(page, section);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const schoolItems = [
    { id: 'unit-daycare', label: 'Daycare & Batita Ceria', desc: 'Usia 1.5 – 3 Tahun • Pengasuhan & Stimulasi Sensorik' },
    { id: 'unit-kb', label: 'Kelompok Bermain (Playgroup)', desc: 'Usia 3 – 4 Tahun • Sosialisasi & Eksplorasi Aktif' },
    { id: 'unit-tka', label: 'Taman Kanak-Kanak A (TK A)', desc: 'Usia 4 – 5 Tahun • Pra-Literasi Fonik & Sains Alam' },
    { id: 'unit-tkb', label: 'Taman Kanak-Kanak B (TK B)', desc: 'Usia 5 – 6 Tahun • Kesiapan Matang Masuk SD' },
  ];

  const facilityItems = [
    { id: 'fasilitas-outdoor', label: 'Playground Alam & Taman Lalu Lintas', desc: 'Jembatan motorik, zebra cross edukasi & rumput asri' },
    { id: 'fasilitas-kebun', label: 'Kebun Hidroponik & Rumah Satwa', desc: 'Eksplorasi botanika & rumah burung merpati jinak' },
    { id: 'fasilitas-indoor', label: '7 Ruang Kelas Sentra & Montessori AC', desc: 'Sentra Alam Cair, Balok, Olah Tubuh, Peran, Seni, Persiapan 1 & 2' },
    { id: 'fasilitas-seni', label: 'Studio Seni Lukis & Musik Angklung', desc: 'Sentra kreativitas seni lukis, kriya & angklung bambu' },
    { id: 'fasilitas-daycare', label: 'Ruang Sensorik & Daycare Batita', desc: 'Matras bermain lembut & ruang istirahat usia 2–4 thn' },
    { id: 'fasilitas-ibadah', label: 'Musholla Santri & Sentra Tilawati', desc: 'Sentra praktik wudhu, sholat dhuha & mengaji' },
  ];

  const isWhiteNav = isScrolled || currentPage !== 'home';

  const handleNavLogin = async () => {
    try {
      const user = await signInWithGoogleAccount();
      if (!user) {
        onOpenPpdb();
      }
    } catch {
      onOpenPpdb();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isWhiteNav
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 py-2.5'
          : 'bg-gradient-to-b from-white/95 via-white/85 to-transparent backdrop-blur-[2px] py-3'
      }`}
    >


      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between gap-4 xl:gap-8">
          {/* Official Emblem & Brand (Left Zone) */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0 shrink"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center">
              <LukmanHakimLogo variant="emblem" size={42} />
            </div>

            <div className="flex flex-col whitespace-nowrap min-w-0">
              <span className="font-extrabold text-base sm:text-[17px] tracking-tight text-[#0F2937] leading-none group-hover:text-[#006699] transition truncate">
                {schoolIdentity.nama}
              </span>
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#006699] uppercase mt-1 truncate">
                PURWOKERTO • NPSN {schoolIdentity.npsn}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Center Zone - Single Line) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-[13.5px] font-semibold text-slate-800 flex-1">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`transition py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#006699]'
                  : 'text-slate-700 hover:text-[#006699]'
              }`}
            >
              Home
            </button>

            {/* About (Focused Single Institutional Profile Page - No Cluttered Dropdown) */}
            <button
              onClick={() => handleNavClick('about')}
              className={`transition py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'about'
                  ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#006699]'
                  : 'text-slate-700 hover:text-[#006699]'
              }`}
            >
              About
            </button>

            {/* Sekolah - Sekolah Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('schools')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('schools')}
                className={`flex items-center gap-1 transition py-1.5 relative cursor-pointer whitespace-nowrap ${
                  currentPage === 'schools'
                    ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#006699]'
                    : 'text-slate-700 hover:text-[#006699]'
                }`}
              >
                <span>Sekolah - Sekolah</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'schools' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'schools' && (
                <div className="absolute top-full left-0 pt-2 w-80 z-50">
                  <div className="bg-white rounded-xl shadow-[0_18px_45px_rgba(15,41,55,0.16)] border border-slate-200/90 p-2 divide-y divide-slate-100">
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        4 Jenjang Pendidikan
                      </span>
                      <span className="text-[10px] font-semibold text-[#006699]">Usia 1.5 – 6 Th</span>
                    </div>
                    <div className="py-1">
                      {schoolItems.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick('schools', item.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-start gap-3 group cursor-pointer ${
                            currentPage === 'schools' && activeSection === item.id
                              ? 'bg-sky-50/90 text-[#006699]'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-[#006699] mt-0.5">
                            0{idx + 1}
                          </span>
                          <div className="flex-1 whitespace-normal">
                            <span className="text-xs font-bold block text-slate-900 group-hover:text-[#006699]">
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

            {/* Fasilitas Penunjang (Single Direct Link) */}
            <button
              onClick={() => handleNavClick('facilities')}
              className={`transition py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'facilities'
                  ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#006699]'
                  : 'text-slate-700 hover:text-[#006699]'
              }`}
            >
              Fasilitas Penunjang
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition py-1.5 relative cursor-pointer whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'text-[#006699] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#006699]'
                  : 'text-slate-700 hover:text-[#006699]'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop Action Buttons (Right Zone - PPDB + Admin) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {currentUser ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-900 font-semibold"
                title={`Akun Google aktif: ${currentUser.email}`}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="w-4 h-4 rounded-full"
                  />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span className="max-w-[110px] truncate">
                  {currentUser.displayName?.split(' ')[0] || currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={signOutAccount}
                  title="Keluar akun Google"
                  className="text-[10px] text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ) : (
              <button
                onClick={handleNavLogin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer whitespace-nowrap shadow-2xs"
                title="Masuk Akun Google (Gmail)"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>Masuk Gmail</span>
              </button>
            )}

            <button
              onClick={onOpenPpdb}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#006699] hover:bg-[#00527a] text-white text-xs font-bold tracking-wide transition cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>SPMB 2026/2027</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              title="Buka Panel Admin Layar Penuh"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                currentPage === 'admin' || isAdminAuthenticated
                  ? 'bg-[#0F2937] text-white border-[#0F2937]'
                  : 'border-slate-200 bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-[#0F2937]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Panel Admin</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-5 py-5 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col divide-y divide-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'home' ? 'text-[#006699]' : 'text-slate-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'about' ? 'text-[#006699]' : 'text-slate-900'
              }`}
            >
              About (Profil Sekolah)
            </button>

            {/* Mobile Schools Accordion */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNavClick('schools')}
                  className={`text-left py-1 font-bold text-sm ${
                    currentPage === 'schools' ? 'text-[#006699]' : 'text-slate-900'
                  }`}
                >
                  Sekolah - Sekolah
                </button>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'schools' ? null : 'schools')}
                  className="p-1.5 text-slate-500"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'schools' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpanded === 'schools' && (
                <div className="pl-3 mt-1 space-y-1 border-l-2 border-slate-200">
                  {schoolItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick('schools', item.id)}
                      className="w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#006699] font-medium block"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Facilities Direct Link */}
            <button
              onClick={() => handleNavClick('facilities')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'facilities' ? 'text-[#006699]' : 'text-slate-900'
              }`}
            >
              Fasilitas Penunjang
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-3 font-bold text-sm ${
                currentPage === 'contact' ? 'text-[#006699]' : 'text-slate-900'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {currentUser ? (
              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-500" />
                  <div className="text-left">
                    <span className="font-bold text-slate-800 block truncate max-w-[180px]">
                      {currentUser.displayName || currentUser.email}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{currentUser.email}</span>
                  </div>
                </div>
                <button
                  onClick={signOutAccount}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavLogin();
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs text-center cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Masuk Akun Google (Gmail)</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPpdb();
              }}
              className="w-full py-2.5 rounded-xl bg-[#006699] text-white font-extrabold text-xs text-center cursor-pointer shadow-xs"
            >
              Formulir SPMB Online 2026/2027
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0F2937] rounded-xl cursor-pointer"
            >
              Panel Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
