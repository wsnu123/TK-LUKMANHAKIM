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
import { SchoolActivityGallery } from '../components/SchoolActivityGallery';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  UserCheck,
  MapPin,
} from 'lucide-react';

interface HomePageProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
  onNavigate: (page: PageTab, section?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenPpdb,
  onOpenChatbot,
  onNavigate,
}) => {
  const { appearanceConfig, customFeatures, schoolIdentity } = useApp();
  const activeCustomFeatures = (customFeatures || []).filter((f) => f.isActive);
  const announcement = appearanceConfig.announcementBar;

  const handleAnnouncementClick = () => {
    if (!announcement) return;
    if (announcement.linkAction === 'ppdb') {
      onOpenPpdb();
    } else if (announcement.linkAction === 'schools') {
      onNavigate('schools');
    } else if (announcement.linkAction === 'contact') {
      onNavigate('contact');
    } else if (announcement.linkAction === 'wa') {
      const waDigits = (schoolIdentity.whatsapp || '6287713551412').replace(/\D/g, '').replace(/^0/, '62');
      window.open(`https://wa.me/${waDigits}`, '_blank');
    }
  };

  return (
    <div className="space-y-0 bg-[#FAFBFD]">
      {/* 1. Editorial Cinema Hero */}
      {appearanceConfig.showHeroBanner && (
        <HeroBanner
          onOpenPpdb={onOpenPpdb}
          onOpenChatbot={onOpenChatbot}
          onNavigate={onNavigate}
        />
      )}

      {/* 1.5 Mobile-Only App Quick Access Strip */}
      <section
        aria-label="Pintasan Cepat Mobile"
        className="lg:hidden bg-[#FAFBFD] px-3.5 pt-3.5 pb-3 border-b border-slate-200/60"
      >
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={onOpenPpdb}
            className="bg-white border border-slate-200/80 rounded-2xl py-2.5 px-1.5 flex flex-col items-center justify-center gap-1.5 shadow-[0_6px_16px_-8px_rgba(9,35,56,0.12)] active:scale-95 transition cursor-pointer min-h-[68px]"
          >
            <span className="w-8 h-8 rounded-xl bg-[#092338] text-amber-300 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-extrabold text-[#092338] leading-tight text-center">
              SPMB
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('schools')}
            className="bg-white border border-slate-200/80 rounded-2xl py-2.5 px-1.5 flex flex-col items-center justify-center gap-1.5 shadow-[0_6px_16px_-8px_rgba(9,35,56,0.12)] active:scale-95 transition cursor-pointer min-h-[68px]"
          >
            <span className="w-8 h-8 rounded-xl bg-[#006699] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-extrabold text-[#092338] leading-tight text-center">
              Jenjang
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about', 'profil-kepala-sekolah')}
            className="bg-white border border-slate-200/80 rounded-2xl py-2.5 px-1.5 flex flex-col items-center justify-center gap-1.5 shadow-[0_6px_16px_-8px_rgba(9,35,56,0.12)] active:scale-95 transition cursor-pointer min-h-[68px]"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-[#092338] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-extrabold text-[#092338] leading-tight text-center">
              Kepsek
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="bg-white border border-slate-200/80 rounded-2xl py-2.5 px-1.5 flex flex-col items-center justify-center gap-1.5 shadow-[0_6px_16px_-8px_rgba(9,35,56,0.12)] active:scale-95 transition cursor-pointer min-h-[68px]"
          >
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-extrabold text-[#092338] leading-tight text-center">
              Lokasi
            </span>
          </button>
        </div>
      </section>

      {/* Optional Announcement Ribbon */}
      {announcement?.enabled && announcement.text && (
        <div
          className="w-full py-2.5 px-4 text-white text-xs sm:text-sm font-bold"
          style={{ backgroundColor: announcement.bgColor || '#006699' }}
        >
          <div className="max-w-[1560px] mx-auto flex flex-wrap items-center justify-center gap-2.5 text-center">
            {announcement.badge && (
              <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-[0.16em]">
                {announcement.badge} ·
              </span>
            )}
            <span>{announcement.text}</span>
            {announcement.linkText && (
              <button
                type="button"
                onClick={handleAnnouncementClick}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#092338] hover:bg-amber-300 text-[11px] font-extrabold transition cursor-pointer"
              >
                <span>{announcement.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Architectural Trust Metric Strip */}
      {appearanceConfig.showBalokStrip && <HeroBalokStrip />}

      {/* 3. Official Institutional Dossier */}
      {appearanceConfig.showIdentityCard && <IdentityCardSection />}

      {/* 4. Editorial Photography Bento Showcase & School Tour Invitation */}
      {appearanceConfig.showTrustConversion && (
        <TrustPillarsConversion onOpenPpdb={onOpenPpdb} />
      )}

      {/* 5. Official SPMB Poster Showcase */}
      {(appearanceConfig.showPosterCarousel ?? true) && (
        <SpmbPosterCarousel onOpenPpdb={onOpenPpdb} onNavigate={onNavigate} />
      )}

      {/* 6. Philosophy, 4 Keunggulan, 5 Pilar & 8 Basis */}
      {appearanceConfig.showPhilosophySection && <PhilosophyCards />}

      {/* 7. Interactive 8-Basis Character Wheel */}
      {appearanceConfig.showCharacterWheel && <CharacterAndEightBasesSection />}

      {/* 8. Optional Custom Features (Managed via Admin Panel) */}
      {activeCustomFeatures.length > 0 && (
        <section className="py-12 sm:py-20 bg-[#FAFBFD] border-y border-slate-200/70">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
              <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#006699]">
                Program &amp; Layanan Unggulan
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#092338] tracking-tight">
                Inovasi Layanan {schoolIdentity.nama}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeCustomFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className="bg-white rounded-2xl border border-slate-200/85 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#006699] mb-2">
                      {feat.category}
                      {feat.badge ? ` · ${feat.badge}` : ''}
                    </p>
                    <h3 className="font-display text-lg font-extrabold text-[#092338] leading-snug">
                      {feat.title}
                    </h3>
                    {feat.targetAudience && (
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Sasaran: {feat.targetAudience}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Heritage Collage, Stats & Jelajahi Directory */}
      {(appearanceConfig.showExperienceStats || appearanceConfig.showDirectoryHub) && (
        <ExperienceStats
          onNavigate={onNavigate}
          showDedication={appearanceConfig.showExperienceStats}
          showExplore={appearanceConfig.showDirectoryHub}
        />
      )}

      {/* 10. Activity Gallery (Optional Admin Toggle) */}
      {appearanceConfig.showActivityGallery && <SchoolActivityGallery />}

      {/* 11. Official WhatsApp Consultation Directory */}
      {appearanceConfig.showWaHotline && (
        <TanyaAdminWA onOpenChatbot={onOpenChatbot} />
      )}

      {/* 12. Parent Voices Editorial Testimonials */}
      {appearanceConfig.showTestimonials && <Testimonials />}
    </div>
  );
};
