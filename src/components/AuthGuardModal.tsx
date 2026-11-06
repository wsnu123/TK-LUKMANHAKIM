import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { playCelebrationChime } from '../utils/audioChime';

interface AuthGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
  redirectTarget?: string | null;
  customTitle?: string;
  customDescription?: string;
}

export const AuthGuardModal: React.FC<AuthGuardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  redirectTarget = 'spmb',
  customTitle,
  customDescription,
}) => {
  const { signInWithGoogleAccount, signInWithGmailAddress, currentUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManualEmail, setShowManualEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [manualName, setManualName] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGoogleAccount();
      if (user) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        playCelebrationChime();
        if (onSuccess) {
          onSuccess(user);
        }
        onClose();
      } else {
        setErrorMessage(
          'Jendela login Google ditutup atau diblokir oleh browser. Anda juga dapat masuk dengan memasukkan alamat Gmail di bawah.'
        );
        setShowManualEmail(true);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          'Terjadi kendala saat menghubungkan ke akun Google. Silakan coba lagi atau gunakan input Gmail.'
      );
      setShowManualEmail(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail.trim()) {
      setErrorMessage('Mohon masukkan alamat Gmail aktif Ayah / Bunda.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGmailAddress(manualEmail.trim(), manualName.trim());
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
      playCelebrationChime();
      if (onSuccess) {
        onSuccess(user);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Gagal masuk akun. Silakan periksa kembali email Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0F2937] via-[#006699] to-[#0A2540] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-amber-300 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Autentikasi Terverifikasi</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {customTitle || 'Akses SPMB Terproteksi'}
              </h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5 bg-white">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {customDescription ||
              'Untuk keamanan data ananda dan kemudahan melacak status formulir, silakan masuk menggunakan akun Google (Gmail) Ayah / Bunda sebelum melanjutkan ke Formulir SPMB Online 2026/2027.'}
          </p>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Primary Action: Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl border-2 border-slate-200 hover:border-[#006699] bg-white hover:bg-sky-50/50 text-slate-800 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 text-[#006699] animate-spin" />
                <span>Menghubungkan ke Google...</span>
              </>
            ) : (
              <>
                {/* Official Google SVG Icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="group-hover:text-[#006699] transition">
                  Lanjutkan dengan Akun Google
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#006699] group-hover:translate-x-0.5 transition" />
              </>
            )}
          </button>

          {/* Benefits Bullet List */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Email & nomor registrasi otomatis terhubung aman</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bukti pendaftaran langsung dikirimkan ke Gmail Anda</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Mudah mengecek riwayat verifikasi berkas & observasi</span>
            </div>
          </div>

          {/* Toggle Manual Gmail Input */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setShowManualEmail(!showManualEmail)}
              className="text-xs font-semibold text-slate-500 hover:text-[#006699] transition underline cursor-pointer"
            >
              {showManualEmail
                ? 'Tutup input email manual'
                : 'Kendala popup Google? Masuk dengan alamat Gmail manual'}
            </button>
          </div>

          {/* Manual Gmail Input Form */}
          {showManualEmail && (
            <form
              onSubmit={handleManualEmailSignIn}
              className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl space-y-3 animate-in fade-in"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Mail className="w-4 h-4 text-[#006699]" />
                <span>Masuk Cepat dengan Alamat Gmail</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Ayah / Bunda
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#006699] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Alamat Gmail Aktif *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contoh: ayah.bunda@gmail.com"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#006699] bg-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#006699] hover:bg-[#00527a] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Masuk & Lanjut ke SPMB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400">
            Data pribadi Ayah & Bunda dilindungi standar kerahasiaan TK Islam Lukman Hakim.
          </span>
        </div>
      </div>
    </div>
  );
};
