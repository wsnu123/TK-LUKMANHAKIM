import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FloatingAssistantProps {
  onOpenChatbot?: () => void;
  onOpenPortalWali?: () => void;
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
}) => {
  const { schoolIdentity } = useApp();
  const cleanWa = (schoolIdentity.whatsapp || '6287713551412').replace(/[^0-9]/g, '');
  const targetWa = cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa;

  const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(
    `Assalamu’alaikum Admin ${schoolIdentity.nama}, saya ingin bertanya seputar pendaftaran santri baru dan informasi sekolah.`
  )}`;

  return (
    <aside
      aria-label="Layanan Konsultasi AI & WhatsApp Resmi"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 select-none flex flex-col items-end gap-2.5"
    >
      {/* Top Button: Tanya AI (Executive Professional Style) */}
      {onOpenChatbot && (
        <button
          onClick={onOpenChatbot}
          className="group flex items-center gap-3 bg-[#0F2937] hover:bg-[#006699] text-white pl-3 pr-4 py-2.5 rounded-xl shadow-[0_10px_28px_rgba(15,41,55,0.28)] hover:shadow-[0_14px_34px_rgba(0,102,153,0.38)] transition-all duration-200 cursor-pointer active:scale-95 border border-white/15"
          title="Layanan Asisten AI Resmi TK Lukman Hakim"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#006699] group-hover:bg-white/15 text-sky-100 border border-sky-400/30 transition-colors">
            <ExecutiveAiIcon className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0F2937]" />
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

      {/* Bottom Button: Official WhatsApp (Stacked Below Tanya AI) */}
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
            Sekretariat & SPMB
          </span>
        </div>
      </a>
    </aside>
  );
};
