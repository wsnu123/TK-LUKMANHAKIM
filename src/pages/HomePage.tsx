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
import { PrincipalProfileSection } from '../components/PrincipalProfileSection';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  BookOpen,
  UserCheck,
  MapPin,
} from 'lucide-react';

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
    <div className="space-y-0">
      {/* 1. Panoramic Hero */}
      {appearanceConfig.showHeroBanner && (
        <HeroBanner
          onOpenPpdb={onOpenPpdb}
          onOpenChatbot={onOpenChatbot}
          onNavigate={onNavigate}
        />
      )}

      {/* 1.5 Mobile-Only App Quick Access Grid (Bespoke Smartphone Experience) */}
      <section
        aria-label="Pintasan Cepat Mobile"
        className="lg:hidden bg-[#F9F8F6] px-4 pt-5 pb-3"
      >
        <div className="grid grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={onOpenPpdb}
            className="bg-white border border-sky-100 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer min-h-[78px]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#006699] text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-amber-300" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#0B3B5B] leading-tight text-center">
              SPMB
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('schools')}
            className="bg-white border border-sky-100 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer min-h-[78px]"
          >
            <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#0B3B5B] leading-tight text-center">
              Jenjang
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById('profil-kepala-sekolah')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white border border-sky-100 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer min-h-[78px]"
          >
            <span className="w-9 h-9 rounded-xl bg-amber-400 text-[#0B253A] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#0B3B5B] leading-tight text-center">
              Kepsek
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="bg-white border border-sky-100 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer min-h-[78px]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#0B3B5B] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 text-sky-300" />
            </span>
            <span className="text-[10.5px] font-extrabold text-[#0B3B5B] leading-tight text-center">
              Lokasi
            </span>
          </button>
        </div>
      </section>

      {/* Optional Announcement Ribbon (Hanya muncul bila diaktifkan secara khusus oleh Admin) */}
      {announcement?.enabled && announcement.text && (
        <div
          className="w-full py-3 px-4 text-white text-xs sm:text-sm font-bold shadow-xs"
          style={{ backgroundColor: announcement.bgColor || '#006699' }}
        >
          <div className="max-w-[1560px] mx-auto flex flex-wrap items-center justify-center gap-2.5 text-center">
            {announcement.badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-amber-200 text-[10px] font-extrabold uppercase tracking-wider">
                {announcement.badge}
              </span>
            )}
            <span>{announcement.text}</span>
            {announcement.linkText && (
              <button
                type="button"
                onClick={handleAnnouncementClick}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#0F2937] hover:bg-amber-300 text-[11px] font-extrabold transition cursor-pointer"
              >
                <span>{announcement.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. 3 Balok Keunggulan */}
      {appearanceConfig.showBalokStrip && <HeroBalokStrip />}

      {/* 3. Official School Identity Banner */}
      {appearanceConfig.showIdentityCard && <IdentityCardSection />}

      {/* 3.5 Profil & Sambutan Kepala Sekolah */}
      <PrincipalProfileSection onOpenPpdb={onOpenPpdb} compact />

      {/* 4. Trust & Conversion Section */}
      {appearanceConfig.showTrustConversion && (
        <TrustPillarsConversion onOpenPpdb={onOpenPpdb} />
      )}

      {/* 5. Poster Showcase SPMB & Keunggulan */}
      {(appearanceConfig.showPosterCarousel ?? true) && (
        <SpmbPosterCarousel onOpenPpdb={onOpenPpdb} onNavigate={onNavigate} />
      )}

      {/* 6. 4 Kartu Keunggulan + 5 Pilar + 8 Basis Pembelajaran */}
      {appearanceConfig.showPhilosophySection && <PhilosophyCards />}

      {/* 7. Pendidikan Karakter & 8 Basis Pembelajaran Wheel */}
      {appearanceConfig.showCharacterWheel && <CharacterAndEightBasesSection />}

      {/* 8. Program & Fitur Unggulan Tambahan (Dikelola Penuh dari Panel Admin -> Pusat Buat Fitur) */}
      {activeCustomFeatures.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F9F8F6] border-y border-slate-200/70">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#006699] text-xs font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Program &amp; Layanan Unggulan</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F2937] tracking-tight">
                Inovasi Layanan {schoolIdentity.nama}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCustomFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#006699] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                        {feat.category}
                      </span>
                      {feat.badge && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          {feat.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0F2937] leading-snug">
                      {feat.title}
                    </h3>
                    {feat.targetAudience && (
                      <p className="text-xs font-semibold text-[#006699] mt-1">
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

      {/* 9. Dedikasi & Pengalaman + Jelajahi Sekolah */}
      {(appearanceConfig.showExperienceStats || appearanceConfig.showDirectoryHub) && (
        <ExperienceStats
          onNavigate={onNavigate}
          showDedication={appearanceConfig.showExperienceStats}
          showExplore={appearanceConfig.showDirectoryHub}
        />
      )}

      {/* 10. Galeri Keseharian Ceria (Tampil bila diaktifkan dari Panel Admin) */}
      {appearanceConfig.showActivityGallery && <SchoolActivityGallery />}

      {/* 11. Direct WhatsApp Consultation & AI Support */}
      {appearanceConfig.showWaHotline && (
        <TanyaAdminWA onOpenChatbot={onOpenChatbot} />
      )}

      {/* 12. Testimonials from Parents */}
      {appearanceConfig.showTestimonials && <Testimonials />}
    </div>
  );
};
