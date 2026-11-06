import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SchoolsPage } from './pages/SchoolsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ContactPage } from './pages/ContactPage';
import { ContactFooter } from './components/ContactFooter';
import { PpdbModal } from './components/PpdbModal';
import { AuthGuardModal } from './components/AuthGuardModal';
import { TuitionModal } from './components/TuitionModal';
import { ReportModal } from './components/ReportModal';
import { PortalWaliModal } from './components/PortalWaliModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingAssistant } from './components/FloatingAssistant';
import { ChatbotModal } from './components/ChatbotModal';
import { ScrollProgressBar } from './components/effects/ScrollProgressBar';
import { ClickEffect } from './components/effects/ClickEffect';
import { PageTab } from './types';

function MainApp() {
  const { currentUser } = useApp();
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const [isPpdbOpen, setIsPpdbOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectTarget, setAuthRedirectTarget] = useState<string | null>(null);
  const [isTuitionOpen, setIsTuitionOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPortalWaliOpen, setIsPortalWaliOpen] = useState(false);
  const [portalWaliTab, setPortalWaliTab] = useState<'spp' | 'raport' | 'jadwal'>('spp');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // SPMB Route Guard: If user is authenticated, open SPMB; otherwise show Google OAuth Login Modal
  const handleOpenProtectedPpdb = () => {
    if (currentUser) {
      setIsPpdbOpen(true);
    } else {
      setAuthRedirectTarget('spmb');
      setIsAuthModalOpen(true);
    }
  };

  // Direct login from Navbar/Home "Masuk Gmail" button
  const handleOpenLogin = () => {
    setAuthRedirectTarget(null);
    setIsAuthModalOpen(true);
  };

  // Post-login redirect handler
  const handleAuthSuccess = () => {
    if (authRedirectTarget === 'spmb') {
      setIsPpdbOpen(true);
      setAuthRedirectTarget(null);
    }
  };

  // URL Hash/Route Guard Protection (#spmb / #ppdb / ?tab=spmb)
  useEffect(() => {
    const checkHashRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const isSpmbUrl =
        hash === '#spmb' ||
        hash === '#ppdb' ||
        search.includes('spmb') ||
        search.includes('ppdb');

      if (isSpmbUrl) {
        if (currentUser) {
          setIsPpdbOpen(true);
        } else {
          setAuthRedirectTarget('spmb');
          setIsAuthModalOpen(true);
        }
      }
    };

    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, [currentUser]);

  const handleOpenPortalWali = (tab: 'spp' | 'raport' | 'jadwal' = 'spp') => {
    setPortalWaliTab(tab);
    setIsPortalWaliOpen(true);
  };

  const handleNavigate = (page: PageTab, section?: string) => {
    setCurrentPage(page);
    setActiveSection(section);
    if (!section) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const yOffset = -96;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F6] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#006699] selection:text-white">
      {/* Interactive Click Ripple & Sparkle Effects */}
      <ClickEffect />

      {/* Top Reading/Scroll Progress Bar */}
      {currentPage !== 'admin' && <ScrollProgressBar />}

      {/* Navigation Bar (Hidden when inside Full-Screen Admin Panel) */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenPpdb={handleOpenProtectedPpdb}
          onOpenLogin={handleOpenLogin}
          onOpenSpp={() => handleOpenPortalWali('spp')}
          onOpenReport={() => handleOpenPortalWali('raport')}
          onOpenPortalWali={handleOpenPortalWali}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onOpenAdmin={() => handleNavigate('admin')}
        />
      )}

      {/* Dynamic Multi-Page Router */}
      <main
        className={`flex-1 ${
          currentPage === 'admin'
            ? 'pt-0 min-h-screen flex flex-col'
            : currentPage !== 'home'
            ? 'pt-[72px]'
            : ''
        }`}
      >
        {currentPage === 'home' && (
          <HomePage
            onOpenPpdb={handleOpenProtectedPpdb}
            onOpenChatbot={() => setIsChatbotOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenPpdb={handleOpenProtectedPpdb}
            onOpenChatbot={() => setIsChatbotOpen(true)}
          />
        )}

        {currentPage === 'schools' && (
          <SchoolsPage
            activeSection={activeSection}
            onOpenPpdb={handleOpenProtectedPpdb}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'facilities' && (
          <FacilitiesPage
            activeSection={activeSection}
            onOpenPpdb={handleOpenProtectedPpdb}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenPpdb={handleOpenProtectedPpdb}
            onOpenChatbot={() => setIsChatbotOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            isOpen={true}
            isFullPage={true}
            onClose={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer (Ditampilkan di semua halaman, KECUALI Admin Panel) */}
      {currentPage !== 'admin' && (
        <ContactFooter
          currentPage={currentPage}
          onOpenPpdb={handleOpenProtectedPpdb}
          onOpenSpp={() => handleOpenPortalWali('spp')}
          onOpenReport={() => handleOpenPortalWali('raport')}
          onOpenAdmin={() => handleNavigate('admin')}
          onNavigate={handleNavigate}
        />
      )}

      {/* Vertical Stacked Tanya AI & Official WhatsApp Launcher (Hidden in Admin Panel) */}
      {currentPage !== 'admin' && (
        <FloatingAssistant
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onOpenPortalWali={() => handleOpenPortalWali('spp')}
        />
      )}

      {/* AI Assistant Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenPpdb={() => {
          setIsChatbotOpen(false);
          handleOpenProtectedPpdb();
        }}
        onOpenSpp={() => {
          setIsChatbotOpen(false);
          handleOpenPortalWali('spp');
        }}
        onOpenReport={() => {
          setIsChatbotOpen(false);
          handleOpenPortalWali('raport');
        }}
      />

      {/* Unified Parent Portal Modal (SPP + E-Raport + Menu Gizi & Agenda) */}
      <PortalWaliModal
        isOpen={isPortalWaliOpen}
        initialTab={portalWaliTab}
        onClose={() => setIsPortalWaliOpen(false)}
      />

      {/* Google OAuth Auth Guard Modal */}
      <AuthGuardModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthRedirectTarget(null);
        }}
        onSuccess={handleAuthSuccess}
        redirectTarget={authRedirectTarget}
      />

      {/* School Management & Registration Modals */}
      <PpdbModal
        isOpen={isPpdbOpen}
        onClose={() => setIsPpdbOpen(false)}
        onRequestLogin={() => {
          setIsPpdbOpen(false);
          setAuthRedirectTarget('spmb');
          setIsAuthModalOpen(true);
        }}
      />

      <TuitionModal
        isOpen={isTuitionOpen}
        onClose={() => setIsTuitionOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
