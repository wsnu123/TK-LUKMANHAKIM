import React, { useState } from 'react';
import { MessageCircle, QrCode, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FloatingAssistantProps {
  onOpenChatbot?: () => void;
  onOpenPortalWali?: () => void;
  onOpenQr?: () => void;
}

/**
 * Executive Institutional AI Concierge Emblem (Clean Geometric Vector Crest)
 */
export const ExecutiveAiIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path
      d="M19 16L19.9 18.1L22 19L19.9 19.9L19 22L18.1 19.9L16 19L18.1 18.1L19 16Z"
      fill="currentColor"
    />
    <circle cx="12" cy="10" r="1.6" fill="currentColor" />
  </svg>
);

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  onOpenChatbot,
  onOpenQr,
}) => {
  const { schoolIdentity } = useApp();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const cleanWa = (schoolIdentity.whatsapp || '6287713551412').replace(/[^0-9]/g, '');
  const targetWa = cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa;

  const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(
    `Assalamu’alaikum Admin ${schoolIdentity.nama}, saya ingin bertanya seputar pendaftaran santri baru dan informasi sekolah.`
  )}`;

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP (lg+): Full 3-Button Executive Stack (Unchanged)           */}
      {/* ================================================================== */}
      <aside
        aria-label="Layanan Konsultasi AI, QR Web & WhatsApp Resmi"
        className="hidden lg:flex fixed bottom-6 right-6 z-40 select-none flex-col items-end gap-2.5"
      >
        {onOpenChatbot && (
          <button
            type="button"
            onClick={onOpenChatbot}
            className="group flex items-center gap-3 bg-[#0F2937] hover:bg-[#006699] text-white pl-3 pr-4 py-2.5 rounded-xl shadow-[0_10px_28px_rgba(15,41,55,0.28)] hover:shadow-[0_14px_34px_rgba(0,102,153,0.38)] transition-all duration-200 cursor-pointer active:scale-95 border border-white/15"
            title="Layanan Asisten AI Resmi TK Lukman Hakim"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#006699] group-hover:bg-white/15 text-sky-100 border border-sky-400/30 transition-colors">
              <ExecutiveAiIcon className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold tracking-tight block leading-none text-white">
                Tanya AI Sekolah
              </span>
              <span className="text-[10px] text-sky-200 font-medium block mt-0.5">
                Pusat Informasi 24 Jam
              </span>
            </div>
          </button>
        )}

        {onOpenQr && (
          <button
            type="button"
            onClick={onOpenQr}
            className="group flex items-center gap-3 bg-[#006699] hover:bg-[#0F2937] text-white pl-3 pr-4 py-2.5 rounded-xl shadow-[0_10px_24px_rgba(0,102,153,0.3)] hover:shadow-[0_14px_30px_rgba(15,41,55,0.4)] transition-all duration-200 cursor-pointer active:scale-95 border border-white/20"
            title="Scan & Bagikan QR Code Website Resmi"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400 text-slate-950 border border-amber-300">
              <QrCode className="w-4 h-4 flex-shrink-0" />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold tracking-tight block leading-none text-white">
                Scan QR Web
              </span>
              <span className="text-[10px] text-sky-200 font-medium block mt-0.5">
                tklukmanhakim.sch.id
              </span>
            </div>
          </button>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 bg-[#128C7E] hover:bg-[#075E54] text-white pl-3 pr-4 py-2.5 rounded-xl shadow-[0_10px_24px_rgba(18,140,126,0.28)] hover:shadow-[0_14px_30px_rgba(7,94,84,0.38)] transition-all duration-200 cursor-pointer active:scale-95 border border-white/20"
          title="Chat Langsung WhatsApp Sekretariat"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 text-white border border-white/20">
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold tracking-tight block leading-none text-white">
              WhatsApp Resmi
            </span>
            <span className="text-[10px] text-emerald-100 font-medium block mt-0.5">
              Sekretariat &amp; SPMB
            </span>
          </div>
        </a>
      </aside>

      {/* ================================================================== */}
      {/* MOBILE (< lg): Single Clean Expandable Speed-Dial FAB              */}
      {/* Sits cleanly above MobileBottomNav so it never crowds mobile UI    */}
      {/* ================================================================== */}
      <aside
        aria-label="Layanan Cepat Mobile"
        className="lg:hidden fixed bottom-20 right-4 z-40 select-none flex flex-col items-end gap-2"
      >
        {mobileExpanded && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {onOpenChatbot && (
              <button
                type="button"
                onClick={() => {
                  setMobileExpanded(false);
                  onOpenChatbot();
                }}
                className="flex items-center gap-2.5 bg-[#0F2937] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg border border-white/15 text-xs font-bold cursor-pointer min-h-[44px]"
              >
                <ExecutiveAiIcon className="w-4 h-4 text-sky-300" />
                <span>Tanya AI Sekolah</span>
              </button>
            )}

            {onOpenQr && (
              <button
                type="button"
                onClick={() => {
                  setMobileExpanded(false);
                  onOpenQr();
                }}
                className="flex items-center gap-2.5 bg-[#006699] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg border border-white/15 text-xs font-bold cursor-pointer min-h-[44px]"
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span>Scan QR Web</span>
              </button>
            )}

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileExpanded(false)}
              className="flex items-center gap-2.5 bg-[#128C7E] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg border border-white/15 text-xs font-bold min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileExpanded((prev) => !prev)}
          aria-label={mobileExpanded ? 'Tutup menu bantuan cepat' : 'Buka bantuan WhatsApp & AI'}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-2 border-white transition-all cursor-pointer ${
            mobileExpanded
              ? 'bg-[#0F2937] text-white'
              : 'bg-[#128C7E] text-white hover:bg-[#075E54]'
          }`}
        >
          {mobileExpanded ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </aside>
    </>
  );
};
