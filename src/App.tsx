import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SchoolsPage } from './pages/SchoolsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ContactPage } from './pages/ContactPage';
import { ContactFooter } from './components/ContactFooter';
import { PpdbModal } from './components/PpdbModal';
import { TuitionModal } from './components/TuitionModal';
import { ReportModal } from './components/ReportModal';
import { PortalWaliModal } from './components/PortalWaliModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingAssistant } from './components/FloatingAssistant';
import { ChatbotModal } from './components/ChatbotModal';
import { ScrollProgressBar } from './components/effects/ScrollProgressBar';
import { ClickEffect } from './components/effects/ClickEffect';
import { PageTab } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const [isPpdbOpen, setIsPpdbOpen] = useState(false);
  const [isTuitionOpen, setIsTuitionOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPortalWaliOpen, setIsPortalWaliOpen] = useState(false);
  const [portalWaliTab, setPortalWaliTab] = useState<'spp' | 'raport' | 'jadwal'>('spp');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
    <AppProvider>
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
            onOpenPpdb={() => setIsPpdbOpen(true)}
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
              onOpenPpdb={() => setIsPpdbOpen(true)}
              onOpenChatbot={() => setIsChatbotOpen(true)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              activeSection={activeSection}
              onNavigate={handleNavigate}
              onOpenPpdb={() => setIsPpdbOpen(true)}
              onOpenChatbot={() => setIsChatbotOpen(true)}
            />
          )}

          {currentPage === 'schools' && (
            <SchoolsPage
              activeSection={activeSection}
              onOpenPpdb={() => setIsPpdbOpen(true)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'facilities' && (
            <FacilitiesPage
              activeSection={activeSection}
              onOpenPpdb={() => setIsPpdbOpen(true)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onOpenPpdb={() => setIsPpdbOpen(true)}
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
            onOpenPpdb={() => setIsPpdbOpen(true)}
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
            setIsPpdbOpen(true);
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

        {/* School Management & Registration Modals */}
        <PpdbModal
          isOpen={isPpdbOpen}
          onClose={() => setIsPpdbOpen(false)}
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
    </AppProvider>
  );
}
