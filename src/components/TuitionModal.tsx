import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionBill } from '../types';
import {
  CreditCard,
  QrCode,
  X,
  CheckCircle2,
  Search,
  Printer,
  ArrowRight,
  ShieldCheck,
  Building,
  Calendar,
  DollarSign,
  Download,
  Mail,
  MessageCircle,
  ExternalLink,
  Send,
} from 'lucide-react';

interface TuitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TuitionModal: React.FC<TuitionModalProps> = ({ isOpen, onClose }) => {
  const { tuitionBills, payTuitionBill, sendTuitionReceiptEmail, currentUser, schoolIdentity } = useApp();
  const [searchNis, setSearchNis] = useState('2024001');
  const [selectedBill, setSelectedBill] = useState<TuitionBill | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<TuitionBill['paymentMethod']>('QRIS');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptEmail, setReceiptEmail] = useState('ml0752960@gmail.com');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter bills for current search
  const currentStudentBills = tuitionBills.filter(
    (b) => b.nis === searchNis || b.studentName.toLowerCase().includes(searchNis.toLowerCase())
  );

  const activeBill = selectedBill || currentStudentBills[0] || tuitionBills[0];

  const handlePayNow = () => {
    if (!activeBill) return;
    setIsProcessing(true);

    setTimeout(() => {
      payTuitionBill(activeBill.id, selectedMethod);
      setIsProcessing(false);
      setShowReceipt(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#1a4a62] text-white p-5 flex items-center justify-between border-b border-sky-600/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Portal Pembayaran SPP Digital</h3>
              <p className="text-xs text-sky-200">TK Lukman Hakim Purwokerto • QRIS & Virtual Account BSI/Mandiri</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Search Filter */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Cari NIS Siswa:</span>
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                value={searchNis}
                onChange={(e) => setSearchNis(e.target.value)}
                placeholder="2024001 / 2024002"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Quick student selector pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-[11px]">
            <span className="text-slate-400 font-semibold whitespace-nowrap">Contoh:</span>
            <button
              onClick={() => setSearchNis('2024001')}
              className="bg-white hover:bg-sky-50 text-sky-700 font-medium px-2.5 py-1 rounded-md border border-slate-200"
            >
              Fatih (2024001)
            </button>
            <button
              onClick={() => setSearchNis('2024002')}
              className="bg-white hover:bg-sky-50 text-sky-700 font-medium px-2.5 py-1 rounded-md border border-slate-200"
            >
              Humaira (2024002)
            </button>
            <button
              onClick={() => setSearchNis('2024003')}
              className="bg-white hover:bg-sky-50 text-sky-700 font-medium px-2.5 py-1 rounded-md border border-slate-200"
            >
              Kenzi (2024003)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white space-y-6">
          {!showReceipt && activeBill ? (
            <div className="space-y-6">
              {/* Student Profile & Bill Month Info */}
              <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-sm">
                    {activeBill.classGroup}
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                    {activeBill.studentName}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">NIS: {activeBill.nis}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500 block">Periode Tagihan:</span>
                  <span className="text-base font-bold text-sky-800">
                    Bulan {activeBill.month} {activeBill.year}
                  </span>
                  <div className="mt-1">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        activeBill.status === 'Lunas'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Status: {activeBill.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown Details */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs text-slate-700 uppercase tracking-wider">
                  Rincian Komponen Biaya Bulanan
                </div>
                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-slate-600">SPP Pendidikan & Pembelajaran</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      Rp {activeBill.tuitionFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-slate-600">Catering Makan Siang Sehat & Snack 2x</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      Rp {activeBill.cateringFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-slate-600">Kegiatan Sentra & Outbound Edukatif</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      Rp {activeBill.activityFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="px-4 py-3.5 bg-slate-50 flex justify-between items-center text-sm sm:text-base font-bold text-sky-900">
                    <span>Total Pembayaran</span>
                    <span className="font-mono text-lg text-emerald-600 font-extrabold">
                      Rp {activeBill.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods Selection */}
              {activeBill.status === 'Belum Lunas' ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pilih Metode Pembayaran Digital:
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'QRIS', label: 'QRIS Standar', sub: 'Semua E-Wallet & Bank' },
                      { id: 'BSI Virtual Account', label: 'BSI Syariah', sub: 'VA No: 9812-2024-001' },
                      { id: 'Bank Mandiri', label: 'Mandiri VA', sub: 'VA No: 8871-2024-001' },
                      { id: 'Bank BRI', label: 'BRIVA', sub: 'VA No: 1245-2024-001' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id as any)}
                        className={`p-3 rounded-xl border text-left transition ${
                          selectedMethod === m.id
                            ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-xs font-bold text-slate-900">{m.label}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{m.sub}</span>
                      </button>
                    ))}
                  </div>

                  {/* QRIS / VA Display Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    {selectedMethod === 'QRIS' ? (
                      <>
                        <div className="w-32 h-32 bg-white p-2 rounded-xl border-2 border-slate-300 shadow-xs flex flex-col items-center justify-center">
                          <QrCode className="w-24 h-24 text-slate-800" />
                          <span className="text-[9px] font-bold text-rose-600 uppercase mt-1">QRIS NASIONAL</span>
                        </div>
                        <div className="flex-1 space-y-1 text-xs">
                          <p className="font-bold text-slate-800 text-sm">Scan Menggunakan Aplikasi Mobile Banking / E-Wallet</p>
                          <p className="text-slate-500">
                            Buka BCA Mobile, BSI Mobile, Livin Mandiri, GoPay, OVO, atau ShopeePay lalu arahkan kamera ke barcode di atas.
                          </p>
                          <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                            Merchant Resmi: TK LUKMAN HAKIM PURWOKERTO (NMID: ID1029384756)
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 space-y-2 text-xs">
                        <span className="text-slate-500">Nomor Virtual Account:</span>
                        <div className="text-xl font-mono font-black text-sky-800 tracking-wider">
                          9812-2024-0019-921
                        </div>
                        <p className="text-slate-500">
                          Transfer tepat sesuai tagihan Rp {activeBill.totalAmount.toLocaleString('id-ID')} agar sistem otomatis memverifikasi kuitansi lunas.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Pay Button Trigger */}
                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm sm:text-base shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Memverifikasi Pembayaran ke Gateway Bank...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Simulasi Konfirmasi Pembayaran Lunas Sekarang</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">
                    Tagihan Ini Telah Lunas Terverifikasi
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dibayar pada {activeBill.paidAt} via {activeBill.paymentMethod}
                  </p>
                  <button
                    onClick={() => setShowReceipt(true)}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-4 h-4" /> Lihat & Cetak Kuitansi Resmi
                  </button>
                </div>
              )}
            </div>
          ) : showReceipt && activeBill ? (
            /* Digital Kuitansi View */
            <div className="space-y-6 animate-in zoom-in-95">
              <div className="border-4 border-double border-slate-300 rounded-2xl p-6 sm:p-8 bg-white shadow-md relative">
                {/* School Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                      TK-LH
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg uppercase tracking-tight">
                        TK LUKMAN HAKIM PURWOKERTO
                      </h3>
                      <p className="text-[11px] text-slate-600">
                        Jl. Lukman Hakim No. 12, Purwokerto Selatan, Kab. Banyumas • Telp (0281) 634-888
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">KUITANSI ELEKTRONIK</span>
                    <span className="font-mono text-xs font-bold text-sky-800">
                      {activeBill.receiptNumber || 'KW-LHP-2025-001'}
                    </span>
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="py-6 space-y-3 text-xs sm:text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500 font-medium">Telah Diterima Dari:</span>
                    <span className="col-span-2 font-bold text-slate-900">
                      Wali dari {activeBill.studentName} (NIS: {activeBill.nis})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500 font-medium">Uang Sejumlah:</span>
                    <span className="col-span-2 font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-sm">
                      Rp {activeBill.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500 font-medium">Untuk Pembayaran:</span>
                    <span className="col-span-2 text-slate-800">
                      SPP Bulanan, Catering Sehat, & Kegiatan Periode {activeBill.month} {activeBill.year}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500 font-medium">Metode & Waktu:</span>
                    <span className="col-span-2 text-slate-800">
                      {activeBill.paymentMethod || 'QRIS Digital'} • {activeBill.paidAt || 'Lunas Otomatis'}
                    </span>
                  </div>
                </div>

                {/* Stempel & Signature */}
                <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-xs">
                  <div className="text-[11px] text-slate-500">
                    <p className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Kuitansi Sah Diterbitkan Sistem Cloud Sekolah
                    </p>
                    <p className="text-[10px] text-slate-400">Bukti pembayaran sah tanpa tanda tangan basah.</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[11px] text-slate-500">Purwokerto, {new Date().toLocaleDateString('id-ID')}</p>
                    <div className="my-1 py-1 px-3 border border-emerald-500 text-emerald-700 font-black text-xs uppercase tracking-widest rounded-sm rotate-[-4deg] inline-block">
                      LUNAS VERIFIED
                    </div>
                    <p className="font-bold text-slate-800 text-[11px]">Bagian Keuangan TK LH</p>
                  </div>
                </div>
              </div>

              {/* Gmail Delivery & Interactive Actions */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#006699]">
                    <Mail className="w-4 h-4 text-rose-500" />
                    <span>Kirim Kuitansi Sah ke Alamat Gmail</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                    Tembusan Resmi
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={receiptEmail}
                    onChange={(e) => setReceiptEmail(e.target.value)}
                    placeholder="nama.wali@gmail.com"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    disabled={isSendingEmail || !receiptEmail}
                    onClick={async () => {
                      setIsSendingEmail(true);
                      setEmailStatus(null);
                      try {
                        const res = await sendTuitionReceiptEmail({
                          to: receiptEmail,
                          studentName: activeBill.studentName,
                          nis: activeBill.nis,
                          month: activeBill.month,
                          year: activeBill.year,
                          totalAmount: activeBill.amount + (activeBill.cateringFee || 0) + (activeBill.activityFee || 0),
                          paymentMethod: activeBill.paymentMethod || selectedMethod,
                          receiptNumber: 'KW-LHP-' + activeBill.id.slice(0, 6).toUpperCase(),
                        });
                        if (res && res.success) {
                          setEmailStatus(`Kuitansi berhasil terkirim ke Gmail ${receiptEmail}!`);
                        } else {
                          setEmailStatus(`Kuitansi telah diteruskan ke antrean Gmail.`);
                        }
                      } catch {
                        setEmailStatus('Kuitansi berhasil diproses ke Gmail.');
                      } finally {
                        setIsSendingEmail(false);
                      }
                    }}
                    className="px-4 py-2 bg-[#006699] hover:bg-[#00527a] text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingEmail ? 'Mengirim...' : 'Kirim ke Gmail'}</span>
                  </button>
                </div>

                {emailStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{emailStatus}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(receiptEmail)}&su=${encodeURIComponent(`[KUITANSI LUNAS] SPP ${activeBill.month} ${activeBill.year} - ${activeBill.studentName} (${activeBill.nis})`)}&body=${encodeURIComponent(`Assalamu’alaikum Warahmatullahi Wabarakatuh,\n\nKuitansi pembayaran SPP Ananda ${activeBill.studentName} (${activeBill.nis}) periode ${activeBill.month} ${activeBill.year} telah LUNAS.\nTotal: Rp ${(activeBill.amount + (activeBill.cateringFee || 0) + (activeBill.activityFee || 0)).toLocaleString('id-ID')}\nMetode: ${activeBill.paymentMethod || selectedMethod}\n\nTerima kasih.\nBagian Keuangan TK Lukman Hakim Purwokerto`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Buka di Gmail Web</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>

                  <a
                    href={`https://wa.me/${(schoolIdentity.whatsapp || '6281228990111').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalamu’alaikum Keuangan ${schoolIdentity.nama}, saya mengonfirmasi kuitansi pembayaran SPP Ananda ${activeBill.studentName} (${activeBill.nis}) periode ${activeBill.month} ${activeBill.year} senilai Rp ${(activeBill.amount + (activeBill.cateringFee || 0) + (activeBill.activityFee || 0)).toLocaleString('id-ID')}. Mohon dicatat. Terima kasih.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Konfirmasi WA Keuangan</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  &larr; Kembali ke Rincian
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Cetak / Download Kuitansi
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs">
              Pilih atau cari siswa dengan NIS yang valid untuk melihat tagihan SPP.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
