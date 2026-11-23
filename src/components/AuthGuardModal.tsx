import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  X,
  CheckCircle2,
  ArrowRight,
  Mail,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LukmanHakimLogo } from './LukmanHakimLogo';

interface AuthGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  redirectTarget?: string | null;
}

export const AuthGuardModal: React.FC<AuthGuardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  redirectTarget,
}) => {
  const { signInWithGoogleAccount, signInWithGmailAddress, currentUser, schoolIdentity } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [manualName, setManualName] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      if (onSuccess) onSuccess();
      onClose();
    }
  }, [isOpen, currentUser, onSuccess, onClose]);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const user = await signInWithGoogleAccount();
      if (user) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setShowEmailForm(true);
        setErrorMsg(
          'Jendela masuk Google ditutup atau terblokir browser. Silakan coba lagi atau masukkan alamat Gmail aktif Anda di bawah ini.'
        );
      }
    } catch {
      setShowEmailForm(true);
      setErrorMsg(
        'Popup Google tidak dapat dibuka di browser ini. Anda tetap dapat melanjutkan dengan alamat Gmail aktif di bawah ini.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = manualEmail.trim().toLowerCase();
    if (!cleaned || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setErrorMsg('Mohon masukkan alamat Gmail yang valid (contoh: bunda.siti@gmail.com).');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGmailAddress(cleaned, manualName.trim() || undefined);
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      setErrorMsg('Gagal memproses akun Gmail. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Branding */}
        <div className="bg-gradient-to-br from-[#0F2937] via-[#005585] to-[#006699] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-sky-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0">
              <LukmanHakimLogo variant="emblem" size={42} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-[10px] font-extrabold tracking-wider uppercase mb-1">
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span>Autentikasi SPMB</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                {redirectTarget === 'spmb' ? 'Masuk untuk Akses SPMB' : 'Masuk Akun Wali Murid'}
              </h3>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Untuk keamanan data ananda dan kemudahan melacak status pendaftaran, silakan masuk menggunakan akun{' '}
            <strong className="text-slate-900">Google (Gmail)</strong> Ayah / Bunda sebelum mengisi Formulir SPMB Online.
          </p>

          {/* Error Feedback (Only when genuinely needed, clean & user-friendly) */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-900 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Primary Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-900 border-2 border-slate-200 hover:border-[#006699] font-extrabold text-sm flex items-center justify-center gap-3 shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-[#006699] animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>{isLoading ? 'Menghubungkan Google...' : 'Lanjutkan dengan Akun Google'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Benefits List */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Email &amp; nomor registrasi otomatis terhubung aman</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Bukti pendaftaran langsung terhubung ke akun Gmail Anda</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Mudah memantau status verifikasi berkas &amp; observasi</span>
            </div>
          </div>

          {/* Discreet Toggle for Manual Gmail Entry (Parents only, fallback if popup blocked) */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="text-xs font-bold text-[#006699] hover:text-[#0F2937] underline cursor-pointer inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>
                {showEmailForm
                  ? 'Sembunyikan formulir Gmail manual'
                  : 'Kendala popup? Masuk dengan alamat Gmail aktif'}
              </span>
            </button>
          </div>

          {showEmailForm && (
            <form
              onSubmit={handleManualGmailSubmit}
              className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#0F2937]">
                <Sparkles className="w-4 h-4 text-[#006699]" />
                <span>Masuk dengan Alamat Gmail Aktif</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Ayah / Bunda
                </label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Contoh: Bunda Siti Rahma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:border-[#006699] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Alamat Gmail Aktif *
                </label>
                <input
                  type="email"
                  required
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="contoh: ayah.bunda@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:border-[#006699] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#006699] hover:bg-[#00527a] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lanjutkan ke Formulir SPMB</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Privacy Note */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Data pribadi Ayah &amp; Bunda dilindungi standar kerahasiaan {schoolIdentity.nama}.
          </p>
        </div>
      </div>
    </div>
  );
};
