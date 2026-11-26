import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
} from 'lucide-react';
import { PageTab } from '../types';
import { useApp } from '../context/AppContext';
import { triggerConfetti } from '../utils/confetti';
import { playCelebrationChime } from '../utils/audioChime';

interface ContactPageProps {
  onOpenPpdb: () => void;
  onOpenChatbot?: () => void;
  onNavigate: (page: PageTab, section?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenPpdb,
}) => {
  const { addInquiry, schoolIdentity: SCHOOL_IDENTITY } = useApp();

  const rawWa = (SCHOOL_IDENTITY.whatsapp || '6287713551412').replace(/\D/g, '');
  const officialWhatsApp = rawWa.startsWith('0')
    ? '62' + rawWa.slice(1)
    : rawWa.startsWith('62')
    ? rawWa
    : '62' + rawWa;

  // Contact Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Bottom Quick Callback / Info State
  const [quickContact, setQuickContact] = useState('');
  const [quickSent, setQuickSent] = useState(false);

  const fullAddress = `${SCHOOL_IDENTITY.alamat}, Kel. ${SCHOOL_IDENTITY.desaKelurahan}, Kec. ${SCHOOL_IDENTITY.kecamatan}, Kab. ${SCHOOL_IDENTITY.kabupaten}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${SCHOOL_IDENTITY.nama}, ${fullAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleDirectWhatsApp = () => {
    const emailInfo = email ? ` (Email: ${email})` : '';
    const subjectInfo = subject ? ` [Perihal: ${subject}]` : '';
    const text = encodeURIComponent(
      `Assalamu’alaikum Sekretariat ${SCHOOL_IDENTITY.nama}. Saya ${
        name || 'Ayah/Bunda'
      }${emailInfo}${subjectInfo} ingin berkonsultasi mengenai pendaftaran/kunjungan sekolah. Pesan: ${
        message || 'Mohon informasi jadwal kunjungan sekolah & brosur SPMB 2026/2027.'
      }`
    );
    window.open(`https://wa.me/${officialWhatsApp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    setIsSubmitting(true);

    const combinedMessage = [
      email ? `[Email: ${email}]` : '',
      subject ? `[Subjek: ${subject}]` : '',
      message || 'Mohon informasi pendaftaran & jadwal trial class.',
    ]
      .filter(Boolean)
      .join(' ');

    try {
      await addInquiry({
        name: name.trim() || 'Orang Tua Calon Santri',
        phone: subject.match(/\d{8,}/) ? subject.trim() : SCHOOL_IDENTITY.telepon,
        childAge: 'Usia TK / KB',
        interest: subject.trim() || 'Konsultasi Kontak & Kunjungan Kampus',
        message: combinedMessage,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Pesan belum berhasil disimpan.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
    playCelebrationChime();

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setSubject('');
      setName('');
      setMessage('');
    }, 6000);
  };

  const handleQuickStart = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = quickContact.trim();
    if (!val) {
      onOpenPpdb();
      return;
    }
    try {
      await addInquiry({
        name: 'Calon Wali Santri (Kontak Cepat)',
        phone: val.includes('@') ? SCHOOL_IDENTITY.telepon : val,
        childAge: 'Usia TK / KB / Daycare',
        interest: 'Permintaan Info Brosur & Jadwal SPMB 2026/2027',
        message: `Kontak cepat dari halaman Hubungi Kami: ${val}`,
      });
      setQuickSent(true);
      setQuickContact('');
      setTimeout(() => setQuickSent(false), 5000);
    } catch {
      onOpenPpdb();
    }
  };

  return (
    <div className="bg-[#F9F8F6] text-slate-800 min-h-screen overflow-x-hidden flex flex-col font-sans selection:bg-[#006699] selection:text-white">
      {/* ==================================================================== */}
      {/* 1. AIRY PLAYFUL HEADER TITLE (Matches Reference Top Hero)            */}
      {/* ==================================================================== */}
      <section className="relative pt-14 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 text-center bg-[#F9F8F6]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#006699] tracking-wide mb-3">
            <span>Layanan Resmi Sekretariat</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">{SCHOOL_IDENTITY.nama}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none [text-wrap:balance]">
            <span className="text-[#0B3B5B]">Hubungi </span>
            <span className="text-[#006699]">Kami</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Pintu sekretariat kami selalu terbuka hangat bagi Ayah &amp; Bunda untuk konsultasi
            kurikulum sentra, jadwal kunjungan kampus, maupun pendaftaran SPMB 2026/2027.
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. SCALLOPED CLOUD BAND + 4 CONTACT CARDS (Signature Reference Look) */}
      {/* ==================================================================== */}
      <section className="relative w-full">
        {/* Top Puffy Cloud Edge */}
        <div className="w-full overflow-hidden leading-none bg-[#F9F8F6]" aria-hidden="true">
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="w-full h-14 sm:h-20 lg:h-24 text-[#D8ECF8] block"
            fill="currentColor"
          >
            <path d="M0,110 L0,62 C36,42 78,44 108,62 C136,28 196,24 234,54 C272,18 342,16 382,52 C424,14 504,14 548,50 C590,12 666,14 708,52 C748,16 824,18 864,54 C908,16 984,18 1024,54 C1068,14 1144,16 1184,52 C1228,18 1296,24 1334,56 C1372,34 1412,38 1440,58 L1440,110 Z" />
          </svg>
        </div>

        {/* Cloud Body with 4 Contact Cards */}
        <div className="bg-[#D8ECF8] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
              {/* CARD 1: TELEPON / WHATSAPP */}
              <a
                href={`https://wa.me/${officialWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#FAFCFE] hover:bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg border border-white transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Soft decorative corner cloud shape like reference */}
                <span
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#EAF4FC] pointer-events-none transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-12 w-14 h-14 rounded-full bg-[#EAF4FC]/80 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center shadow-sm mb-5 group-hover:bg-[#006699] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-[#0B3B5B] tracking-tight tabular-nums leading-snug">
                    {SCHOOL_IDENTITY.telepon}
                  </h2>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Layanan telepon &amp; WhatsApp respon cepat untuk konsultasi SPMB dan jadwal
                    trial class.
                  </p>
                </div>
              </a>

              {/* CARD 2: EMAIL RESMI */}
              <a
                href={`mailto:${SCHOOL_IDENTITY.email}`}
                className="group relative bg-[#FAFCFE] hover:bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg border border-white transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#EAF4FC] pointer-events-none transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-12 w-14 h-14 rounded-full bg-[#EAF4FC]/80 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center shadow-sm mb-5 group-hover:bg-[#006699] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-base sm:text-[17px] font-black text-[#0B3B5B] tracking-tight leading-snug break-all">
                    {SCHOOL_IDENTITY.email}
                  </h2>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Surat elektronik resmi sekretariat untuk administrasi berkas santri dan
                    kerjasama.
                  </p>
                </div>
              </a>

              {/* CARD 3 (FEATURED DEEP NAVY CARD — Matches Reference Dark Highlight Card #3!) */}
              <a
                href={SCHOOL_IDENTITY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-[#0B3B5B] to-[#005580] text-white rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                <span
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none transition-transform duration-300 group-hover:scale-110"
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white text-[#0B3B5B] flex items-center justify-center shadow-sm mb-5 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                    Purwokerto Selatan
                  </h2>
                  <p className="mt-2 text-xs sm:text-[13px] text-sky-100/95 leading-relaxed">
                    {SCHOOL_IDENTITY.alamat}, Kel. {SCHOOL_IDENTITY.desaKelurahan}, Kec.{' '}
                    {SCHOOL_IDENTITY.kecamatan}.
                  </p>
                </div>
              </a>

              {/* CARD 4: INSTAGRAM / PORTAL SEKOLAH */}
              <a
                href={SCHOOL_IDENTITY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#FAFCFE] hover:bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg border border-white transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#EAF4FC] pointer-events-none transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-12 w-14 h-14 rounded-full bg-[#EAF4FC]/80 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center shadow-sm mb-5 group-hover:bg-[#006699] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-[#0B3B5B] tracking-tight leading-snug">
                    tklukmanhakim.sch.id
                  </h2>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Ikuti keseharian ceria santri, dokumentasi sentra, dan pembaruan SPMB di media
                    sosial resmi.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Puffy Cloud Edge transitioning cleanly into Pure White */}
        <div className="w-full overflow-hidden leading-none bg-white" aria-hidden="true">
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            className="w-full h-14 sm:h-20 lg:h-24 text-[#D8ECF8] block"
            fill="currentColor"
          >
            <path d="M0,0 L1440,0 L1440,52 C1408,74 1368,72 1334,48 C1296,86 1228,88 1184,52 C1142,92 1068,90 1024,54 C982,92 908,90 864,54 C824,90 748,92 708,52 C664,92 588,92 548,54 C504,92 424,90 382,52 C340,90 272,88 234,54 C196,84 136,82 108,48 C76,70 36,72 0,48 Z" />
          </svg>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. TWO-COLUMN MAIN AREA: FORM (LEFT) + INFO, MAP & SOSMED (RIGHT)    */}
      {/* ==================================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN (6 Cols): Clean Soft-Filled Contact Form */}
            <div className="lg:col-span-6 lg:pr-8 lg:border-r lg:border-slate-200/80">
              {isSubmitted ? (
                <div className="bg-[#F2F8FC] border border-sky-200 rounded-3xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#006699] text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#0B3B5B]">
                    Alhamdulillah, Pesan Berhasil Terkirim!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    Terima kasih Ayah &amp; Bunda. Pesan telah tercatat di sistem sekretariat kami.
                    Bila ingin respon lebih cepat, lanjutkan langsung ke WhatsApp panitia.
                  </p>
                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-[#0B253A] text-xs sm:text-sm font-black transition cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Lanjutkan via WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <p
                      role="alert"
                      className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm text-rose-800"
                    >
                      {submitError} Silakan hubungi kami lewat WhatsApp bila mendesak.
                    </p>
                  )}

                  {/* Field 1: Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-[#0B3B5B] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full bg-[#F1F7FB] border border-sky-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                    />
                  </div>

                  {/* Field 2: Nama */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-[#0B3B5B] mb-1.5"
                    >
                      Nama Ayah / Bunda
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Lengkap Ayah / Bunda"
                      className="w-full bg-[#F1F7FB] border border-sky-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                    />
                  </div>

                  {/* Field 3: Subjek / No. WhatsApp */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold text-[#0B3B5B] mb-1.5"
                    >
                      No. WhatsApp / Perihal
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Contoh: 0812-xxxx-xxxx · Info SPMB / Trial Class"
                      className="w-full bg-[#F1F7FB] border border-sky-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                    />
                  </div>

                  {/* Field 4: Pesan */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-[#0B3B5B] mb-1.5"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan pertanyaan mengenai program Daycare, KB, TK A/B, biaya pendidikan, atau jadwal kunjungan..."
                      className="w-full bg-[#F1F7FB] border border-sky-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition resize-none"
                    />
                  </div>

                  {/* Full-Width Rounded Gold Submit Button (Exact Reference Rhythm + Site Brand Accent) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-[#0B253A] font-black text-sm tracking-wide shadow-sm hover:shadow-md transition-all active:scale-[0.99] inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN (6 Cols): Two-Tone Heading + Copy + Embedded Map + Social Media */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight [text-wrap:balance]">
                  <span className="text-[#0B3B5B]">Butuh Informasi? Kirim </span>
                  <span className="text-[#006699]">Pesan ke Kami</span>
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Tim panitia SPMB dan ustadzah kami siap menjawab setiap pertanyaan Ayah &amp; Bunda
                  seputar metode Tilawati, 7 Sentra belajar, hingga jadwal observasi ramah anak.
                </p>

                {/* Quiet Inline Operational Schedule Metadata */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5 text-[#006699]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Senin – Jumat: 07.00 – 14.00 WIB</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Sabtu: 07.30 – 11.30 WIB</span>
                </div>
              </div>

              {/* Embedded Interactive Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 h-60 sm:h-64 relative">
                <iframe
                  title="Peta Lokasi TK Islam Lukman Hakim Purwokerto"
                  src="https://maps.google.com/maps?q=TK+Islam+Lukman+Hakim+Purwokerto,+Jl.+Hos+Noto+Suwiryo+No.+5,+Teluk,+Kec.+Purwokerto+Selatan,+Kabupaten+Banyumas&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Compact Map Utilities */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 font-bold text-[#006699] hover:text-[#0B3B5B] transition-colors cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Alamat Berhasil Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>

                <a
                  href={SCHOOL_IDENTITY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#006699] hover:text-[#0B3B5B] transition-colors"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Follow Us On Social Media Row (Exact Reference Bottom-Right Element) */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-extrabold text-[#0B3B5B]">
                  Ikuti Sosial Media Kami :
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={SCHOOL_IDENTITY.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram Resmi"
                    className="w-9 h-9 rounded-full bg-[#006699] hover:bg-[#0B3B5B] text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={SCHOOL_IDENTITY.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook Resmi"
                    className="w-9 h-9 rounded-full bg-[#006699] hover:bg-[#0B3B5B] text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={SCHOOL_IDENTITY.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube Resmi"
                    className="w-9 h-9 rounded-full bg-[#006699] hover:bg-[#0B3B5B] text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${officialWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp Panitia SPMB"
                    className="w-9 h-9 rounded-full bg-[#006699] hover:bg-[#0B3B5B] text-white flex items-center justify-center transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. SOFT CLOUD CTA SECTION (Matches Reference Lower Cloud Band)       */}
      {/* ==================================================================== */}
      <section className="relative w-full mt-auto">
        {/* Soft Top Cloud Wave */}
        <div className="w-full overflow-hidden leading-none bg-white" aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 text-[#EDF6FC] block"
            fill="currentColor"
          >
            <path d="M0,90 L0,48 C48,26 102,28 148,50 C196,18 268,18 316,48 C368,14 446,16 496,48 C548,14 624,16 674,48 C728,16 804,18 854,48 C908,16 984,18 1034,48 C1088,16 1164,18 1214,48 C1268,18 1344,22 1392,50 C1414,40 1428,38 1440,42 L1440,90 Z" />
          </svg>
        </div>

        <div className="bg-[#EDF6FC] pt-6 pb-14 sm:pb-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug [text-wrap:balance]">
              <span className="text-[#0B3B5B]">Siap Menemani </span>
              <span className="text-[#006699]">Langkah Ceria Ananda?</span>
              <br />
              <span className="text-[#0B3B5B]">Mulai Pendaftaran </span>
              <span className="text-[#006699]">Hari Ini</span>
            </h2>

            {quickSent ? (
              <div className="mt-6 inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terima kasih! Panitia SPMB akan segera menghubungi Anda.</span>
              </div>
            ) : (
              <form
                onSubmit={handleQuickStart}
                className="mt-7 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <input
                  type="text"
                  value={quickContact}
                  onChange={(e) => setQuickContact(e.target.value)}
                  placeholder="Masukkan No. WhatsApp atau Email Ayah / Bunda..."
                  className="flex-1 bg-white border border-sky-200/80 rounded-full px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-500 text-[#0B253A] font-black text-sm shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-1.5"
                >
                  <span>{quickContact.trim() ? 'Kirim Kontak' : 'Daftar SPMB'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
