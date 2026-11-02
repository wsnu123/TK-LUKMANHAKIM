import React, { useState } from 'react';
import { Sparkles, PartyPopper, Bell, Check, SlidersHorizontal, Eye } from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { playCelebrationChime } from '../../utils/audioChime';

interface EffectsControllerProps {
  onToggleParticles?: (enabled: boolean) => void;
  particlesEnabled?: boolean;
}

export const EffectsController: React.FC<EffectsControllerProps> = ({
  onToggleParticles,
  particlesEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCelebrate = () => {
    triggerConfetti(undefined, undefined, 85);
    if (soundEnabled) {
      playCelebrationChime();
    }
    showToast('🎉 Efek Confetti & Chime Aktif!');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-6 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-sky-400/40 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Discrete Bottom-Left Effect Control Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-14 left-0 w-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0084d6]" />
                  <span className="font-bold text-xs text-slate-900">Pusat Efek Visual Interaktif</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 pt-3">
                {/* 1. Trigger Confetti */}
                <button
                  onClick={handleCelebrate}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-sm hover:scale-102 active:scale-98 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PartyPopper className="w-4 h-4" />
                    Ledakan Confetti PPDB
                  </span>
                  <span className="text-[10px] bg-slate-950/10 px-1.5 py-0.5 rounded-md">Klik!</span>
                </button>

                {/* 2. Toggle Floating Particles */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-700 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-sky-500" />
                    Partikel Ambient
                  </span>
                  <button
                    onClick={() => onToggleParticles && onToggleParticles(!particlesEnabled)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      particlesEnabled
                        ? 'bg-[#0084d6] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {particlesEnabled ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                {/* 3. Audio Chime */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-700 flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-amber-500" />
                    Suara Bell & Chime
                  </span>
                  <button
                    onClick={() => {
                      const next = !soundEnabled;
                      setSoundEnabled(next);
                      if (next) playCelebrationChime();
                      showToast(next ? '🔔 Suara Bell Diaktifkan' : 'Suara Dimatikan');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      soundEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {soundEnabled ? 'Aktif' : 'Mute'}
                  </button>
                </div>

                {/* Features summary badge */}
                <div className="text-[10px] text-slate-500 bg-sky-50/70 p-2 rounded-xl border border-sky-100/80 leading-relaxed">
                  <p className="font-semibold text-sky-800 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Fitur Efek yang Terpasang:
                  </p>
                  <p className="mt-0.5">• Scroll Progress Bar • 3D Tilt Card Shine • Live CountUp Counter • Smooth Image Lightbox</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200/90 text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md group"
            title="Buka Pengaturan Efek Keren"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0084d6] group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline">Efek Interaktif</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>
        </div>
      </div>
    </>
  );
};
