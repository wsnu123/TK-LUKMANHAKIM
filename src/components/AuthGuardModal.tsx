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
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { playCelebrationChime } from '../utils/audioChime';
import { FIREBASE_PROJECT_ID } from '../firebase';

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
  const [isDomainIssue, setIsDomainIssue] = useState(false);
  const [showAdminGuide, setShowAdminGuide] = useState(false);
  const [showManualEmail, setShowManualEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [manualName, setManualName] = useState('');

  if (!isOpen) return null;

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsDomainIssue(false);

    try {
      const user = await signInWithGoogleAccount();
      if (user) {
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        playCelebrationChime();
        if (onSuccess) {
          onSuccess(user);
        }
        onClose();
        return;
      }
    } catch (err: any) {
      const code = err?.code || '';
      console.warn('[AuthGuardModal] Google Sign-In caught:', code, err);

      if (code === 'auth/unauthorized-domain' || err?.isUnauthorizedDomain) {
        setIsDomainIssue(true);
        setErrorMessage(
          `Domain (${currentHost || 'tklukmanhakim.vercel.app'}) sedang dalam proses verifikasi otorisasi. Ayah / Bunda dapat memasukkan email di bawah untuk melanjutkan.`
        );
        setShowManualEmail(true);
      } else if (code === 'auth/popup-blocked' || err?.isPopupBlocked) {
        setErrorMessage(
          'Jendela popup Google diblokir oleh browser. Anda dapat mengizinkan popup atau masukkan email di bawah.'
        );
        setShowManualEmail(true);
      } else if (code === 'auth/popup-closed-by-user') {
        setErrorMessage('Jendela login ditutup sebelum selesai. Silakan klik tombol kembali untuk mencoba lagi.');
      } else {
        setErrorMessage(
          err?.message ||
            'Terjadi kendala saat menghubungkan ke akun Google. Silakan coba kembali atau gunakan input email di bawah.'
        );
        setShowManualEmail(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstantQuickSignIn = async (emailOverride?: string, nameOverride?: string) => {
    const emailToUse = emailOverride || manualEmail.trim() || 'wali.murid@gmail.com';
    const nameToUse = nameOverride || manualName.trim() || 'Ayah / Bunda Wali Murid';

    let formattedEmail = emailToUse.trim().toLowerCase();
    if (!formattedEmail.includes('@')) {
      formattedEmail = `${formattedEmail}@gmail.com`;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGmailAddress(formattedEmail, nameToUse);
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

  const handleManualEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail.trim()) {
      setErrorMessage('Mohon masukkan alamat Gmail aktif Ayah / Bunda.');
      return;
    }
    await handleInstantQuickSignIn(manualEmail, manualName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0F2937] via-[#006699] to-[#0A2540] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-amber-300 shadow-inner shrink-0">
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

        {/* Content Body (Scrollable) */}
        <div className="p-5 sm:p-7 space-y-4 overflow-y-auto bg-white">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {customDescription ||
              'Untuk keamanan data ananda dan kemudahan melacak status formulir pendaftaran, silakan masuk menggunakan akun Google (Gmail) Ayah / Bunda sebelum mengisi Formulir SPMB Online 2026/2027.'}
          </p>

          {/* Diagnostic Notice Banner (Gentle sky/amber if domain issue, rose if error) */}
          {errorMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 animate-in fade-in ${
                isDomainIssue
                  ? 'bg-amber-50/90 border border-amber-200 text-amber-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div className="flex-1 leading-relaxed">
                <span className="font-bold block mb-0.5">
                  {isDomainIssue ? 'Pemberitahuan Sinkronisasi Domain:' : 'Informasi Login:'}
                </span>
                {errorMessage}
              </div>
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
                <span>Menghubungkan ke Akun Google...</span>
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
                ? 'Sembunyikan formulir email manual'
                : 'Ingin menggunakan alamat Gmail pribadi tertentu? Klik di sini'}
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
                <span>Masuk dengan Alamat Gmail Ayah / Bunda</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Ayah / Bunda
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap (contoh: Bunda Siti Rahma)"
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

          {/* Collapsible Admin Guide for Firebase Authorized Domain */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdminGuide(!showAdminGuide)}
              className="w-full flex items-center justify-between text-[11px] text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
            >
              <span>Petunjuk Pengelola Web (Firebase Authorized Domain)</span>
              {showAdminGuide ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showAdminGuide && (
              <div className="mt-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-2 animate-in fade-in">
                <p className="font-semibold text-slate-800">
                  Cara Mengaktifkan Popup Google Asli untuk Domain ({currentHost || 'tklukmanhakim.sch.id'}):
                </p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>
                    Buka{' '}
                    <a
                      href={`https://console.firebase.google.com/project/${FIREBASE_PROJECT_ID}/authentication/settings`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#006699] hover:underline inline-flex items-center gap-0.5 font-bold"
                    >
                      Firebase Console Auth Settings <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Klik tab <strong>Authorized domains</strong> (Domain yang diotorisasi).</li>
                  <li>
                    Klik <strong>Add domain</strong> lalu masukkan domain:{' '}
                    <code className="px-1 py-0.5 bg-white border rounded font-mono text-[10px] text-slate-800">
                      {currentHost || 'tklukmanhakim.sch.id'}
                    </code>
                    {' '}dan{' '}
                    <code className="px-1 py-0.5 bg-white border rounded font-mono text-[10px] text-slate-800">
                      tklukmanhakim.vercel.app
                    </code>
                  </li>
                  <li>Klik Simpan (Save). Selesai! Popup Google otomatis aktif penuh.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center shrink-0">
          <span className="text-[11px] text-slate-400">
            Data pribadi Ayah & Bunda dilindungi standar kerahasiaan TK Islam Lukman Hakim.
          </span>
        </div>
      </div>
    </div>
  );
};

