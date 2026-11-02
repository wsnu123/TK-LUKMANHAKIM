import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { HeroBalokStrip } from '../components/HeroBalokStrip';
import { TrustPillarsConversion } from '../components/TrustPillarsConversion';
import { IdentityCardSection } from '../components/IdentityCardSection';
import { PhilosophyCards } from '../components/PhilosophyCards';
import { CharacterAndEightBasesSection } from '../components/CharacterAndEightBasesSection';
import { ExperienceStats } from '../components/ExperienceStats';
import { TanyaAdminWA } from '../components/TanyaAdminWA';
import { Testimonials } from '../components/Testimonials';
import { SpmbPosterCarousel } from '../components/SpmbPosterCarousel';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
  onNavigate: (page: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenPpdb,
  onOpenChatbot,
  onNavigate,
}) => {
  const { appearanceConfig } = useApp();

  return (
    <div className="space-y-0">
      {/* 1. Panoramic Hero */}
      {appearanceConfig.showHeroBanner && (
        <HeroBanner
          onOpenPpdb={onOpenPpdb}
          onOpenChatbot={onOpenChatbot}
          onNavigate={onNavigate}
        />
      )}

      {/* 2. 3 Balok Keunggulan */}
      {appearanceConfig.showBalokStrip && <HeroBalokStrip />}

      {/* 3. Official School Identity Banner */}
      {appearanceConfig.showIdentityCard && <IdentityCardSection />}

      {/* 4. Trust & Conversion Section */}
      {appearanceConfig.showTrustConversion && (
        <TrustPillarsConversion onOpenPpdb={onOpenPpdb} />
      )}

      {/* 5. Poster Showcase SPMB & Keunggulan (4 Poster Dinamis Bergeser 2x2 Mulus di atas Apakah Kalian Tau) */}
      {(appearanceConfig.showPosterCarousel ?? true) && (
        <SpmbPosterCarousel onOpenPpdb={onOpenPpdb} onNavigate={onNavigate} />
      )}

      {/* 6. 4 Kartu Keunggulan + 5 Pilar + 8 Basis Pembelajaran (Apakah Kalian Tau Lukman Hakim) */}
      {appearanceConfig.showPhilosophySection && <PhilosophyCards />}

      {/* 7. Pendidikan Karakter & 8 Basis Pembelajaran Wheel (Sesuai Screenshot 1) */}
      {appearanceConfig.showCharacterWheel && <CharacterAndEightBasesSection />}

      {/* 8. Dedikasi & Pengalaman + Jelajahi TK Lukman Hakim (Sesuai Referensi Gambar Kanan) */}
      {(appearanceConfig.showExperienceStats || appearanceConfig.showDirectoryHub) && (
        <ExperienceStats
          onNavigate={onNavigate}
          showDedication={appearanceConfig.showExperienceStats}
          showExplore={appearanceConfig.showDirectoryHub}
        />
      )}

      {/* 10. Direct WhatsApp Consultation & AI Support */}
      {appearanceConfig.showWaHotline && (
        <TanyaAdminWA onOpenChatbot={onOpenChatbot} />
      )}

      {/* 11. Testimonials from Parents */}
      {appearanceConfig.showTestimonials && <Testimonials />}
    </div>
  );
};
