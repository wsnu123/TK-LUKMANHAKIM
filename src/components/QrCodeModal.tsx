import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Sparkles,
  Smartphone,
  Printer,
  Globe,
  MessageCircle,
  FileText,
  MapPin,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QrTarget = 'website' | 'spmb' | 'whatsapp' | 'maps';

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const { schoolIdentity } = useApp();
  const [selectedTarget, setSelectedTarget] = useState<QrTarget>('website');
  const [copied, setCopied] = useState(false);
  const [originUrl, setOriginUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
    }
  }, []);

  if (!isOpen) return null;

  // Domain resmi TK Lukman Hakim Purwokerto
  const officialDomain = schoolIdentity.websiteUrl || 'https://tklukmanhakim.sch.id';
  const cleanPhone = (schoolIdentity.whatsapp || '6287713551412').replace(/[^0-9]/g, '');

  const TARGET_OPTIONS: {
    id: QrTarget;
    label: string;
    sublabel: string;
    icon: typeof Globe;
    url: string;
    description: string;
  }[] = [
    {
      id: 'website',
      label: 'Website Resmi',
      sublabel: 'tklukmanhakim.sch.id',
      icon: Globe,
      url: officialDomain,
      description: 'Scan untuk membuka website resmi TK Lukman Hakim Purwokerto (tklukmanhakim.sch.id).',
    },
    {
      id: 'spmb',
      label: 'PPDB Online',
      sublabel: 'Formulir Pendaftaran',
      icon: FileText,
      url: `${officialDomain}/#spmb`,
      description: 'Scan langsung menuju formulir pendaftaran murid baru online T.A. 2026/2027.',
    },
    {
      id: 'whatsapp',
      label: 'Chat WhatsApp',
      sublabel: 'Hotline Panitia SPMB',
      icon: MessageCircle,
      url: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        'Assalamu’alaikum Panitia PPDB TK Lukman Hakim, saya ingin berkonsultasi mengenai pendaftaran santri baru.'
      )}`,
      description: 'Scan untuk langsung terhubung ke nomor WhatsApp Panitia PPDB resmi.',
    },
    {
      id: 'maps',
      label: 'Lokasi Kampus',
      sublabel: 'Google Maps Teluk',
      icon: MapPin,
      url: schoolIdentity.googleMapsUrl || 'https://maps.google.com/?q=TK+Islam+Lukman+Hakim+Purwokerto',
      description: 'Scan untuk petunjuk arah langsung menuju kampus TK Lukman Hakim.',
    },
  ];

  const currentOption = TARGET_OPTIONS.find((t) => t.id === selectedTarget) || TARGET_OPTIONS[0];

  // High-Resolution QR Generator URL via qrserver with safety margins
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=15&format=png&data=${encodeURIComponent(
    currentOption.url
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentOption.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `QR-${schoolIdentity.nama.replace(/\s+/g, '_')}-${selectedTarget}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback open in new tab
      window.open(qrImageUrl, '_blank');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="relative px-5 py-4 bg-gradient-to-r from-[#006699] to-[#0284c7] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs border border-white/20">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                Scan &amp; Bagikan QR Code
              </h3>
              <p className="text-[11px] text-sky-100">
                {schoolIdentity.nama} Purwokerto
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Target Tabs */}
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Pilih Tujuan QR Code:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TARGET_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedTarget === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedTarget(opt.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-[#006699] text-[#006699] shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-[#006699]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold leading-tight">{opt.label}</span>
                    <span className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{opt.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Official Printable QR Card */}
          <div className="relative bg-gradient-to-b from-sky-50 via-white to-sky-50/40 p-5 rounded-3xl border-2 border-sky-100 flex flex-col items-center text-center shadow-inner">
            {/* Top School Branding in Card */}
            <div className="flex items-center gap-2 mb-3">
              <LukmanHakimLogo variant="emblem" size={32} />
              <div className="text-left leading-none">
                <span className="block text-xs font-extrabold text-[#0F2937] tracking-tight">
                  {schoolIdentity.nama}
                </span>
                <span className="text-[9px] font-bold text-[#006699]">
                  NPSN {schoolIdentity.npsn} • TERAKREDITASI A
                </span>
              </div>
            </div>

            {/* QR Box with Logo Overlay */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-md flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt={`QR Code ${currentOption.label}`}
                className="w-full h-full object-contain"
              />

              {/* Center Logo Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-[#006699] shadow-md flex items-center justify-center">
                  <LukmanHakimLogo variant="emblem" size={38} />
                </div>
              </div>
            </div>

            {/* QR Description */}
            <div className="mt-3.5 max-w-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Arahkan Kamera HP ke QR</span>
              </span>
              <p className="text-xs text-slate-600 font-medium mt-1.5">
                {currentOption.description}
              </p>
            </div>

            {/* URL Display */}
            <div className="mt-3 w-full bg-white/90 border border-slate-200 px-3 py-1.5 rounded-xl text-left flex items-center justify-between text-[11px] text-slate-500 font-mono overflow-hidden">
              <span className="truncate pr-2">{currentOption.url}</span>
              <button
                onClick={handleCopyLink}
                className="text-[#006699] hover:text-sky-700 font-bold shrink-0 inline-flex items-center gap-1 text-[10px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownloadQr}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#006699] hover:bg-[#0F2937] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Gambar QR</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm shadow-2xs transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
