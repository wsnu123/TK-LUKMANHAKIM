import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Application Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearCacheAndReset = () => {
    try {
      const keysToClear = [
        'tklh_hero_slides_v3',
        'tklh_philosophy_cards_v2',
        'tklh_pillars_data_v3',
        'tk_sentra_additional_photos_v1',
      ];
      keysToClear.forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem('tklh_admin_session_v2_sec');
    } catch (e) {
      console.warn('Failed clearing cache:', e);
    }
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0F2937] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Sistem Sedang Memulihkan
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Terjadi kendala sementara saat memuat tampilan. Data utama Anda tetap aman.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 text-left overflow-x-auto max-h-32 text-xs font-mono text-amber-300/90">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#006699] hover:bg-[#00527a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearCacheAndReset}
                className="py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                title="Bersihkan Cache & Pulihkan"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
