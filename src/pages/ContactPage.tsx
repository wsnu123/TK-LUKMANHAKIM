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
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Calendar,
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
  onNavigate,
}) => {
  const {
    addInquiry,
    schoolIdentity: SCHOOL_IDENTITY,
  } = useApp();
  const officialWhatsApp = SCHOOL_IDENTITY.whatsapp.replace(/\D/g, '');

  // "Get In Touch" Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${SCHOOL_IDENTITY.nama}, ${SCHOOL_IDENTITY.alamat}, Kel. ${SCHOOL_IDENTITY.desaKelurahan}, ${SCHOOL_IDENTITY.kecamatan}, ${SCHOOL_IDENTITY.kabupaten}`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleDirectWhatsApp = () => {
    const emailInfo = email ? ` (Email: ${email})` : '';
    const text = encodeURIComponent(
      `Assalamu’alaikum Sekretariat ${SCHOOL_IDENTITY.nama}. Saya ${
        name || 'Ayah/Bunda'
      }${emailInfo} ingin berkonsultasi mengenai pendaftaran/kunjungan sekolah. Pesan: ${
        message || 'Mohon informasi jadwal kunjungan sekolah & brosur PPDB.'
      }`
    );
    window.open(`https://wa.me/${officialWhatsApp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const combinedMessage = email
      ? `[Email: ${email}] ${message || 'Mohon informasi pendaftaran & jadwal kunjungan.'}`
      : message || 'Mohon informasi pendaftaran & jadwal trial class.';

    try {
      await addInquiry({
        name: name || 'Orang Tua Calon Santri',
        phone: phone || SCHOOL_IDENTITY.telepon,
        childAge: 'Usia TK / KB',
        interest: 'Konsultasi Kontak & Kunjungan Kampus',
        message: combinedMessage,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Pesan belum berhasil disimpan.');
      return;
    }

    setIsSubmitted(true);
    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
    playCelebrationChime();

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setPhone('');
      setName('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-[#FAF9F5] text-slate-800 min-h-screen overflow-hidden flex flex-col font-sans selection:bg-[#006699] selection:text-white">
      {/* ==================================================================== */}
      {/* 1. TOP ANNOUNCEMENT STRIP (WEBSITE BRAND PALETTE: NAVY & SKY)        */}
      {/* ==================================================================== */}
      <div className="bg-[#0F2937] border-b border-white/10 text-xs text-sky-100 py-2.5 px-4 sm:px-8">
        <div className="max-w-[1560px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-white/90">Butuh Konsultasi atau Info Sekolah? Hubungi Kami Langsung:</span>
            <a
              href={`https://wa.me/${officialWhatsApp}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-amber-300 hover:text-white transition underline sm:no-underline"
            >
              {SCHOOL_IDENTITY.telepon}
            </a>
          </div>

          <div className="flex items-center gap-4 text-sky-200">
            <span className="hidden md:inline text-[11px] text-sky-300/80">
              Layanan Konsultasi & PPDB 2026/2027
            </span>
            <div className="flex items-center gap-3">
              <a
                href={SCHOOL_IDENTITY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={SCHOOL_IDENTITY.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={SCHOOL_IDENTITY.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. HERO SECTION WITH OCEAN BLUE & NAVY GRADIENT                      */}
      {/* ==================================================================== */}
      <section className="relative min-h-[360px] sm:min-h-[440px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#0F2937] via-[#006699] to-[#0A2540]">
        {/* Subtle Campus Photography Background with Atmospheric Scrim */}
        <img
          src="/assets/budi_mulia_hero.jpg"
          alt="TK Luqman Al Hakim Purwokerto"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 mix-blend-luminosity scale-105"
        />

        {/* Soft Radial Ambient Lighting */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-sky-400/15 via-transparent to-[#0F2937]/90 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16 sm:py-24 space-y-4">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-sky-300/40 bg-white/10 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <span>Informasi & Layanan Resmi • {SCHOOL_IDENTITY.nama}</span>
          </div>

          {/* Huge Bold Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
            Hubungi Kami
          </h1>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-sm lg:text-base text-sky-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
            Pintu sekretariat {SCHOOL_IDENTITY.nama} selalu terbuka hangat bagi Ayah & Bunda untuk berkonsultasi mengenai kesiapan sekolah ananda, rincian kurikulum sentra, jadwal tour lingkungan, maupun pendaftaran siswa baru.
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. THREE FLOATING CARDS (CONSISTENT WEBSITE COLOR PALETTE)           */}
      {/* ==================================================================== */}
      <section className="relative z-30 -mt-14 sm:-mt-20 px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* CARD 1 (LEFT): PHONE / CALL */}
            <div className="bg-white border border-sky-100 rounded-3xl p-7 sm:p-9 shadow-xl shadow-sky-950/5 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 group">
              <div>
                {/* Ocean Blue Circular Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#006699] text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Big Phone Number */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {SCHOOL_IDENTITY.telepon}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                  Layanan telepon dan WhatsApp respon cepat untuk konsultasi SPMB, konfirmasi berkas, reservasi trial class santri, serta temu ramah ustadzah.
                </p>
              </div>

              {/* Bottom Link */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={`https://wa.me/${officialWhatsApp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 group-hover:text-[#006699] transition"
                >
                  <span className="w-5 h-5 rounded-full bg-[#006699] text-white flex items-center justify-center text-[10px]">
                    ➜
                  </span>
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* CARD 2 (MIDDLE - HERO ACCENT): EMAIL / MAIL (SIGNATURE OCEAN BLUE & AMBER) */}
            <div className="bg-gradient-to-br from-[#006699] via-[#005580] to-[#0A2540] border border-sky-400/30 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-[#006699]/30 text-white flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 group">
              <div>
                {/* Golden Amber Circular Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Email Address */}
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug break-all">
                  {SCHOOL_IDENTITY.email}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed mt-3">
                  Kirimkan surat elektronik resmi, konfirmasi berkas administrasi calon santri, dokumen kerjasama, atau korespondensi orang tua murid.
                </p>
              </div>

              {/* Bottom Link in Warm Gold */}
              <div className="pt-6 mt-6 border-t border-white/20">
                <a
                  href={`mailto:${SCHOOL_IDENTITY.email}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-white hover:text-amber-300 transition"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px]">
                    ➜
                  </span>
                  <span className="text-amber-300 group-hover:underline">Kirim Email Resmi</span>
                </a>
              </div>
            </div>

            {/* CARD 3 (RIGHT): LOCATION / ADDRESS */}
            <div className="bg-white border border-sky-100 rounded-3xl p-7 sm:p-9 shadow-xl shadow-sky-950/5 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 group">
              <div>
                {/* Ocean Blue Circular Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#006699] text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Location Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Purwokerto, Jawa Tengah
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                  {SCHOOL_IDENTITY.alamat}, Kel. {SCHOOL_IDENTITY.desaKelurahan}, Kec. {SCHOOL_IDENTITY.kecamatan}, Kab. {SCHOOL_IDENTITY.kabupaten}.
                </p>
              </div>

              {/* Bottom Link */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={SCHOOL_IDENTITY.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 group-hover:text-[#006699] transition"
                >
                  <span className="w-5 h-5 rounded-full bg-[#006699] text-white flex items-center justify-center text-[10px]">
                    ➜
                  </span>
                  <span>Petunjuk Rute Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. MAIN CONTENT: OUR WORKING TIME (LEFT) + GET IN TOUCH (RIGHT)      */}
      {/* ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* -------------------------------------------------------------- */}
            {/* LEFT COLUMN (6 Cols): Our Working Time + Location & Map         */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0F2937] tracking-tight">
                  Jam Operasional & Pelayanan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 max-w-xl">
                  Sekretariat dan gerbang kampus kami terbuka melayani Ayah & Bunda untuk pengenalan lingkungan sekolah, konsultasi langsung, serta pendaftaran siswa baru pada jadwal berikut:
                </p>

                {/* Working Hours Schedule with Ocean Blue & Amber Theme */}
                <div className="mt-6 space-y-3.5">
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold p-3.5 rounded-2xl bg-[#F0F7FF] border border-sky-100">
                    <Clock className="w-4 h-4 text-[#006699] shrink-0" />
                    <span>Senin – Jumat : 07.00 – 14.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold p-3.5 rounded-2xl bg-[#F0F7FF] border border-sky-100">
                    <Clock className="w-4 h-4 text-[#006699] shrink-0" />
                    <span>Sabtu : 07.30 – 11.30 WIB</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-rose-700 font-bold">Ahad & Hari Libur Nasional</span>
                    <span className="text-xs text-slate-500 font-normal hidden sm:inline">
                      • Pelayanan offline tutup (Buka khusus jadwal Trial Class berjanji)
                    </span>
                  </div>
                </div>
              </div>

              {/* Location & Embedded Map */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
                  Lokasi Kampus Sekolah :
                </h3>

                {/* Interactive Map Box dengan Koordinat Presisi TK Islam Lukman Hakim Purwokerto */}
                <div className="rounded-2xl overflow-hidden border-2 border-sky-200 shadow-md bg-slate-100 h-72 sm:h-80 relative">
                  <iframe
                    title="Peta Lokasi TK Islam Lukman Hakim Purwokerto"
                    src="https://maps.google.com/maps?q=TK+Islam+Lukman+Hakim+Purwokerto,+Jl.+Hos+Noto+Suwiryo+No.+5,+Teluk,+Kec.+Purwokerto+Selatan,+Kabupaten+Banyumas&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>

                {/* Map Action Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006699] hover:text-[#0A2540] transition cursor-pointer"
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
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006699] hover:text-[#0A2540] transition"
                  >
                    <span>Buka Rute Navigasi Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* RIGHT COLUMN (6 Cols): Contact Us Pill + Get In Touch ! Form   */}
            {/* -------------------------------------------------------------- */}
            <div className="lg:col-span-6">
              {/* Top Contact Us Pill Badge */}
              <div className="flex items-center justify-start">
                <span className="px-5 py-1.5 rounded-full border border-sky-200 text-[#006699] bg-[#F0F7FF] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  Sambung Silaturahmi
                </span>
              </div>

              {/* Title Heading */}
              <h2 className="text-3xl sm:text-5xl font-black text-[#0F2937] tracking-tight mt-3">
                Kirim Pesan & Konsultasi
              </h2>

              {/* Form Card Container (Matching Reference Layout with Consistent Colors) */}
              <div className="mt-8 bg-white border border-sky-100 rounded-3xl p-6 sm:p-9 shadow-xl shadow-sky-950/5">
                {isSubmitted ? (
                  <div className="bg-[#F0F7FF] border border-sky-200 rounded-2xl p-7 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#006699] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      Alhamdulillah, Pesan Berhasil Terkirim!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                      Terima kasih Ayah & Bunda. Pesan telah tercatat di sistem sekretariat kami. Jika membutuhkan konfirmasi cepat saat ini, klik tombol di bawah untuk langsung terhubung ke WhatsApp.
                    </p>
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#006699] hover:bg-[#00527c] text-white text-xs font-bold transition cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Lanjutkan Chat via WhatsApp</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                        {submitError} Hubungi kami lewat WhatsApp bila perlu segera.
                      </p>
                    )}
                    {/* Field 1: Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full bg-[#F8FAFC] border border-sky-200/80 rounded-xl sm:rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                      />
                    </div>

                    {/* Field 2: Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama Lengkap Ayah / Bunda"
                        className="w-full bg-[#F8FAFC] border border-sky-200/80 rounded-xl sm:rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                      />
                    </div>

                    {/* Field 3: Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Contoh: 0812-xxxx-xxxx"
                        className="w-full bg-[#F8FAFC] border border-sky-200/80 rounded-xl sm:rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
                      />
                    </div>

                    {/* Field 4: Message */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan pertanyaan mengenai kurikulum, SPP, trial class, atau jadwal pendaftaran..."
                        className="w-full bg-[#F8FAFC] border border-sky-200/80 rounded-xl sm:rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition resize-none"
                      />
                    </div>

                    {/* Submit Button (Ocean Blue Gradient matching Primary Brand Theme) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-9 py-4 rounded-full bg-gradient-to-r from-[#006699] to-[#0284c7] hover:from-[#00527c] hover:to-[#0274b0] text-white font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Button</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note: The global consistent ContactFooter component renders immediately below this in App.tsx */}
    </div>
  );
};
