import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  User,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Bot,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Baby,
  Clock,
  BookOpen,
  Mic,
  MicOff,
  CreditCard,
  FileText,
  MessageCircle,
  Trash2,
  Zap,
  RotateCcw,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExecutiveAiIcon } from './FloatingAssistant';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: string;
  suggestedActions?: string[];
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPpdb: () => void;
  onOpenSpp?: () => void;
  onOpenReport?: () => void;
}

type AITab = 'chat' | 'parenting' | 'recommender';

type QuestionCategory = 'semua' | 'ppdb' | 'kurikulum' | 'parenting' | 'fasilitas';

const QUESTION_BANK: { label: string; query: string; category: QuestionCategory }[] = [
  { label: 'Syarat & Biaya PPDB 2026/2027', query: 'Berapa rincian biaya pendaftaran PPDB dan apa saja syarat berkasnya?', category: 'ppdb' },
  { label: 'Biaya SPP & Katering Bulanan', query: 'Berapa biaya SPP bulanan untuk KB, TK A, TK B serta katering makan sehat?', category: 'ppdb' },
  { label: 'Perbedaan Daycare, KB, TK A & TK B', query: 'Jelaskan perbedaan jenjang Daycare, Kelompok Bermain (KB), TK A, dan TK B beserta jam belajarnya!', category: 'kurikulum' },
  { label: 'Metode Tahfidz & 5 Pilar Karakter', query: 'Bagaimana metode Tahfidz Tilawati dan 5 Pilar Karakter diterapkan setiap hari?', category: 'kurikulum' },
  { label: 'Kesiapan Masuk SD Tanpa Stres', query: 'Bagaimana cara TK Lukman Hakim menyiapkan anak lancar baca-tulis-hitung untuk masuk SD favorit tanpa paksaan?', category: 'kurikulum' },
  { label: 'Anak Belum Lulus Toilet Training?', query: 'Bagaimana jika anak saya usia 3.5 tahun belum sepenuhnya lulus toilet training?', category: 'parenting' },
  { label: 'Tips Mengatasi Anak Tantrum / Rewel', query: 'Bagaimana tips psikologi menghadapi anak yang sering tantrum atau menangis saat pisah di pagi hari?', category: 'parenting' },
  { label: 'Solusi Anak Susah Makan (GTM)', query: 'Anak saya agak susah makan sayur di rumah, bagaimana pembiasaan makan bersama di sekolah?', category: 'parenting' },
  { label: '5 Zona Fasilitas & Keamanan CCTV', query: 'Apa saja fasilitas penunjang, playground, dan standar keamanan anak di TK Lukman Hakim?', category: 'fasilitas' },
  { label: 'Lokasi Kampus & Jadwal Trial Class', query: 'Di mana alamat lengkap kampus TK Lukman Hakim dan bagaimana cara ikut Free Trial Class?', category: 'fasilitas' },
];

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  onOpenPpdb,
  onOpenSpp,
  onOpenReport,
}) => {
  const { schoolIdentity } = useApp();
  const [activeTab, setActiveTab] = useState<AITab>('chat');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('semua');

  // Chatbot State
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const initialWelcome: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: `Assalamu’alaikum Warahmatullahi Wabarakatuh, Ayah & Bunda.\n\nSaya adalah **Asisten Pintar AI Resmi ${schoolIdentity.nama}** (NPSN: **${schoolIdentity.npsn}** • Terakreditasi A).\n\nSaya siap membantu menjawab seluruh pertanyaan seputar:\n• **Pendaftaran Murid Baru (SPMB T.A. 2026/2027), Biaya SPP & Observasi Santri**\n• **Kurikulum Merdeka, Tahfidz Tilawati, 5 Pilar & 8 Basis**\n• **Fasilitas Kampus, Jadwal Belajar & Profil Ustadzah**\n• **Konsultasi Parenting, Psikologi Anak, Gizi & Kesiapan SD**\n\nSilakan ketik pertanyaan Anda atau pilih topik di bawah ini.`,
    timestamp: 'Online 24 Jam',
    suggestedActions: ['open_ppdb', 'open_spp', 'wa_admin'],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcome]);

  // Parenting Lab State
  const [parentingAge, setParentingAge] = useState('4-5 tahun (TK A)');
  const [parentingFocus, setParentingFocus] = useState('Sains & Eksplorasi Alam');
  const [parentingDuration, setParentingDuration] = useState('20 Menit');
  const [parentingMaterials, setParentingMaterials] = useState('Bahan sederhana di rumah (kertas, air, daun, krayon)');
  const [parentingResult, setParentingResult] = useState<string | null>(null);
  const [isGeneratingActivity, setIsGeneratingActivity] = useState(false);

  // Class Matcher State
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('4');
  const [childInterests, setChildInterests] = useState('Suka menggambar, berlari, dan mendengarkan cerita');
  const [childSkills, setChildSkills] = useState('Sudah lancar bicara, sedang belajar mandiri toilet training');
  const [recommenderResult, setRecommenderResult] = useState<string | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredQuestions =
    selectedCategory === 'semua'
      ? QUESTION_BANK.slice(0, 6)
      : QUESTION_BANK.filter((q) => q.category === selectedCategory);

  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setInput('Berapa biaya PPDB dan SPP di TK Lukman Hakim?');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInput(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          history: updatedHistory.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
          schoolContext: {
            nama: schoolIdentity.nama,
            npsn: schoolIdentity.npsn,
            akreditasi: schoolIdentity.akreditasi,
            alamat: schoolIdentity.alamat,
            whatsapp: schoolIdentity.whatsapp,
            telepon: schoolIdentity.telepon,
            kepalaSekolah: schoolIdentity.kepalaSekolah,
            jamOperasional: schoolIdentity.jamOperasional,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Jaringan terganggu');
      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text:
          data.reply ||
          `Assalamu’alaikum Ayah/Bunda! Untuk informasi lebih lanjut mengenai "${query}", silakan klik tombol pendaftaran PPDB atau hubungi WhatsApp Sekretariat di ${schoolIdentity.telepon}.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        suggestedActions: data.suggestedActions || ['open_ppdb', 'wa_admin'],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      clearTimeout(timeoutId);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: `Assalamu’alaikum Ayah & Bunda! Berikut informasi resmi dari **${schoolIdentity.nama}**:\n\n• **Biaya PPDB 2026/2027**: Pendaftaran Rp 150.000, SPP KB Rp 300.000/bln, SPP TK A & TK B Rp 350.000/bln.\n• **Alamat Kampus**: ${schoolIdentity.alamat}, Teluk, Purwokerto Selatan (NPSN ${schoolIdentity.npsn} • Akreditasi A Unggul).\n• **Layanan Cepat**: Silakan gunakan tombol di bawah untuk Formulir PPDB Online, Cek SPP Portal Wali, atau chat WhatsApp Sekretariat (${schoolIdentity.telepon}).`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: ['open_ppdb', 'open_spp', 'wa_admin'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text.replace(/\*\*/g, ''));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleToggleSpeak = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_🎯🌟📦🚀💬💡🏫🌈📌📋🎁💳📱📍📚🕌👩‍🏫⏰🎨📊🥗📵🎓🧼•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.02;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateActivity = async () => {
    setIsGeneratingActivity(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch('/api/ai/parenting-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ageGroup: parentingAge,
          focusArea: parentingFocus,
          availableTime: parentingDuration,
          materials: parentingMaterials,
        }),
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      setParentingResult(data.activity || 'Berhasil membuat aktivitas');
    } catch {
      clearTimeout(timeoutId);
      setParentingResult(
        `**Nama Aktivitas: Eksperimen Pelangi Syukur & Jejak Alam (${parentingFocus})**\n\n**Nilai Karakter (${parentingAge}):**\n- Menumbuhkan rasa takjub atas ciptaan Allah SWT (*Faith in Allah*)\n- Melatih motorik halus dan rasa ingin tahu sains anak.\n\n**Alat & Bahan (${parentingDuration}):**\n- ${parentingMaterials}\n\n**Langkah Praktis Bersama Ananda:**\n1. Awali dengan membaca Basmalah bersama ananda.\n2. Ajak ananda mengamati bentuk dan warna bahan di meja.\n3. Berikan kebebasan ananda berkreasi dan mencoba hal baru.\n4. Tutup dengan mencuci tangan dan mengucap Alhamdulillah.`
      );
    } finally {
      clearTimeout(timeoutId);
      setIsGeneratingActivity(false);
    }
  };

  const handleRecommendClass = async () => {
    setIsRecommending(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch('/api/ai/recommend-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          childName: childName || 'Ananda',
          childAgeYears: childAge,
          interests: childInterests,
          currentSkills: childSkills,
        }),
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      setRecommenderResult(data.recommendation || 'Berhasil menganalisis rekomendasi jenjang kelas.');
    } catch {
      clearTimeout(timeoutId);
      const parsedAge = parseFloat(childAge) || 4;
      let jenjang = 'TK Kelompok A (Usia 4 – 5 Tahun)';
      if (parsedAge < 3) jenjang = 'Daycare & Batita (Usia 1.5 – 3 Tahun)';
      else if (parsedAge < 4) jenjang = 'Kelompok Bermain / KB (Usia 3 – 4 Tahun)';
      else if (parsedAge >= 5) jenjang = 'TK Kelompok B / Persiapan SD (Usia 5 – 6 Tahun)';

      setRecommenderResult(
        `**Rekomendasi Jenjang untuk ${childName || 'Ananda'} (${parsedAge} Tahun):**\n**${jenjang}**\n\n**Fokus Pembelajaran di TK Lukman Hakim:**\n- Mengembangkan minat (${childInterests}) melalui 7 Sentra Ber-AC (Alam Cair, Balok, Olah Tubuh, Peran, Seni, Persiapan 1 & 2) dan Montessori.\n- Penguatan kemandirian (${childSkills}) dengan pendampingan 2 ustadzah per kelas.\n- Tahfidz Metode Tilawati PAUD yang berirama gembira.\n\nSilakan daftarkan ananda untuk sesi Free Trial Class sekarang!`
      );
    } finally {
      clearTimeout(timeoutId);
      setIsRecommending(false);
    }
  };

  // Handle Export Chat to .txt file
  const handleExportChat = () => {
    if (messages.length === 0) return;
    const header = `=== RIWAYAT KONSULTASI ASISTEN AI ${schoolIdentity.nama.toUpperCase()} ===\n` +
      `Waktu Export: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })} ${new Date().toLocaleTimeString('id-ID')}\n` +
      `NPSN: ${schoolIdentity.npsn}\n` +
      `Alamat: ${schoolIdentity.alamat}, ${schoolIdentity.kecamatan}\n` +
      `============================================================\n\n`;

    const body = messages
      .map((m) => {
        const senderLabel = m.sender === 'user' ? 'Wali Santri / Pengunjung' : `Asisten AI Resmi (${schoolIdentity.nama})`;
        return `[${m.timestamp}] ${senderLabel}:\n${m.text}\n\n------------------------------------------------------------\n`;
      })
      .join('\n');

    const fullContent = header + body;
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Konsultasi_AI_${schoolIdentity.nama.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Reset Chat & Start New Session
  const handleResetChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    setMessages([initialWelcome]);
    setInput('');
  };

  // Render formatted text with bold support
  const renderFormattedText = (rawText: string) => {
    const parts = rawText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-extrabold text-slate-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl h-[93vh] sm:h-[86vh] bg-white sm:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.45)] flex flex-col border border-slate-200">
        {/* Executive AI Header */}
        <div className="bg-gradient-to-r from-[#0F2937] via-[#133B4E] to-[#006699] text-white px-5 py-4 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-xl bg-[#006699] text-white border border-sky-400/40 flex items-center justify-center shadow-md shrink-0">
              <ExecutiveAiIcon className="w-5 h-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0F2937] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Asisten Pintar AI • {schoolIdentity.nama}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                  <Zap className="w-3 h-3" /> Super Cepat
                </span>
              </div>
              <p className="text-[11px] text-sky-200 mt-0.5">
                Jawab Semua Pertanyaan Sekolah, PPDB, SPP, Kurikulum & Konsultasi Parenting 24 Jam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {activeTab === 'chat' && (
              <>
                {/* Export Chat Button */}
                <button
                  onClick={handleExportChat}
                  title="Export / Simpan Riwayat Chat (.txt)"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-sky-100 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                  aria-label="Export Riwayat Chat"
                >
                  <Download className="w-3.5 h-3.5 text-sky-300" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                {/* Reset Chat Button */}
                <button
                  onClick={handleResetChat}
                  title="Reset Chat / Sesi Baru"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-sky-100 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                  aria-label="Reset Chat"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Reset Chat</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer ml-1"
              aria-label="Tutup Asisten AI"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Smart AI Mode Tabs */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white text-[#006699] shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tanya Jawab Pintar</span>
          </button>

          <button
            onClick={() => setActiveTab('parenting')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeTab === 'parenting'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ide Bermain & Parenting</span>
          </button>

          <button
            onClick={() => setActiveTab('recommender')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeTab === 'recommender'
                ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Cek Jenjang Usia Anak</span>
          </button>
        </div>

        {/* TAB 1: MULTI-DOMAIN SMART CHATBOT */}
        {activeTab === 'chat' && (
          <>
            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#F8FAFC]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#006699] text-white'
                        : 'bg-[#0F2937] text-sky-200 border border-slate-700'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <ExecutiveAiIcon className="w-4 h-4 text-white" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#006699] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    <div className="text-xs sm:text-[13.5px] leading-relaxed whitespace-pre-line">
                      {msg.sender === 'bot' ? renderFormattedText(msg.text) : msg.text}
                    </div>

                    {/* Interactive Contextual Actions inside Bot Message */}
                    {msg.sender === 'bot' && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                        {msg.suggestedActions.includes('open_ppdb') && (
                          <button
                            onClick={onOpenPpdb}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006699] hover:bg-[#00527a] text-white text-[11px] font-bold transition cursor-pointer shadow-2xs"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Buka Formulir PPDB</span>
                          </button>
                        )}
                        {msg.suggestedActions.includes('open_spp') && onOpenSpp && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenSpp();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition cursor-pointer"
                          >
                            <CreditCard className="w-3 h-3" />
                            <span>Cek Tagihan SPP</span>
                          </button>
                        )}
                        {msg.suggestedActions.includes('open_report') && onOpenReport && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenReport();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold transition cursor-pointer"
                          >
                            <GraduationCap className="w-3 h-3" />
                            <span>Lihat E-Raport</span>
                          </button>
                        )}
                        {msg.suggestedActions.includes('open_parenting_tab') && (
                          <button
                            onClick={() => setActiveTab('parenting')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold transition cursor-pointer"
                          >
                            <Lightbulb className="w-3 h-3" />
                            <span>Buka Generator Parenting</span>
                          </button>
                        )}
                        {msg.suggestedActions.includes('wa_admin') && (
                          <a
                            href={`https://wa.me/${schoolIdentity.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Assalamu’alaikum Admin ${schoolIdentity.nama}, saya ingin berkonsultasi lebih lanjut.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Chat WhatsApp Admin</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Message Footer Controls (Timestamp, Voice TTS, Copy) */}
                    <div
                      className={`mt-2.5 flex items-center justify-between gap-2 text-[10px] ${
                        msg.sender === 'user' ? 'text-sky-100' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>

                      {msg.sender === 'bot' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleSpeak(msg.text, msg.id)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
                              speakingId === msg.id
                                ? 'bg-amber-100 text-amber-800'
                                : 'hover:bg-slate-100 text-slate-500'
                            }`}
                            title="Dengarkan Suara Asisten AI"
                          >
                            {speakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3 h-3" /> Berhenti
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3" /> Suara
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-100 text-slate-500 font-semibold transition cursor-pointer"
                            title="Salin Jawaban"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" /> Tersalin
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Salin
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0F2937] text-white flex items-center justify-center shrink-0">
                    <ExecutiveAiIcon className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-2.5">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-[#006699] rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#006699] rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-2 h-2 bg-[#006699] rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      Asisten AI sedang menyusun jawaban terbaik...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Smart Categorized Quick Prompts */}
            <div className="bg-white border-t border-slate-200 px-4 py-2.5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                  {(
                    [
                      { id: 'semua', label: 'Populer' },
                      { id: 'ppdb', label: 'PPDB & Biaya' },
                      { id: 'kurikulum', label: 'Kurikulum & SD' },
                      { id: 'parenting', label: 'Tips Parenting' },
                      { id: 'fasilitas', label: 'Fasilitas & Lokasi' },
                    ] as { id: QuestionCategory; label: string }[]
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#0F2937] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {filteredQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.query)}
                    disabled={isLoading}
                    className="text-[11px] bg-sky-50/90 hover:bg-[#006699] text-[#006699] hover:text-white border border-sky-200 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer shrink-0"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Composer with Voice Mic & Send */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3.5 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleVoiceInput}
                title="Ketik dengan Suara (Bahasa Indonesia)"
                className={`p-3 rounded-xl border transition cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan apa saja (misal: biaya PPDB, tips anak susah makan, kurikulum)..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#006699] focus:bg-white transition"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-[#006699] hover:bg-[#00527a] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm shrink-0"
              >
                <span>Kirim</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

        {/* TAB 2: AI PARENTING & HOME ACTIVITY GENERATOR */}
        {activeTab === 'parenting' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#F8FAFC] space-y-5">
            <div className="bg-emerald-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                  LABORATORIUM PARENTING ISLAMI DI RUMAH
                </span>
                <h4 className="text-base sm:text-lg font-extrabold mt-1">
                  Generator Ide Bermain & Stimulasi Anak Bebas Gadget
                </h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Rancang kegiatan bermain edukatif 15–30 menit di rumah yang selaras dengan 5 Pilar Karakter TK Lukman Hakim.
                </p>
              </div>
              <Lightbulb className="w-10 h-10 text-amber-300 shrink-0 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Baby className="w-3.5 h-3.5 text-emerald-600" /> Usia Ananda
                </label>
                <select
                  value={parentingAge}
                  onChange={(e) => setParentingAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="1.5 - 3 tahun (Daycare / Batita)">1.5 – 3 Tahun (Daycare / Batita)</option>
                  <option value="3 - 4 tahun (Kelompok Bermain / KB)">3 – 4 Tahun (Kelompok Bermain / KB)</option>
                  <option value="4 - 5 tahun (TK A)">4 – 5 Tahun (TK Kelompok A)</option>
                  <option value="5 - 6 tahun (TK B - Persiapan SD)">5 – 6 Tahun (TK Kelompok B)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Fokus Stimulasi Karakter
                </label>
                <select
                  value={parentingFocus}
                  onChange={(e) => setParentingFocus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="Sains & Eksplorasi Alam">Sains & Eksplorasi Alam Ciptaan Allah</option>
                  <option value="Kemandirian & Tanggung Jawab (Responsibility)">Kemandirian & Merapikan Mainan</option>
                  <option value="Motorik Halus & Pra-Menulis Menyenangkan">Motorik Halus & Pra-Menulis Tanpa Stres</option>
                  <option value="Hafalan Surat Pendek & Adab Harian">Tahfidz Ceria & Adab Harian</option>
                  <option value="Logika Matematika & Mengenal Angka">Logika Berhitung Benda Konkret</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Waktu Luang Orang Tua
                </label>
                <select
                  value={parentingDuration}
                  onChange={(e) => setParentingDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="15 Menit">15 Menit (Singkat & Seru)</option>
                  <option value="20 Menit">20 Menit (Ideal Harian)</option>
                  <option value="30 Menit">30 Menit (Eksplorasi Akhir Pekan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bahan yang Ada di Rumah
                </label>
                <input
                  type="text"
                  value={parentingMaterials}
                  onChange={(e) => setParentingMaterials(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 pt-1">
                <button
                  onClick={handleGenerateActivity}
                  disabled={isGeneratingActivity}
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                >
                  {isGeneratingActivity ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Menyusun Rencana Bermain...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" /> Buat Panduan Bermain Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>

            {parentingResult && (
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    Hasil Panduan Aktivitas Ananda
                  </span>
                  <button
                    onClick={() => handleCopy(parentingResult, 'parenting-res')}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'parenting-res' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Salin Panduan</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {renderFormattedText(parentingResult)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI CLASS & AGE RECOMMENDER */}
        {activeTab === 'recommender' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#F8FAFC] space-y-5">
            <div className="bg-[#0F2937] text-white rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                  ASESMEN AWAL KESIAPAN SEKOLAH
                </span>
                <h4 className="text-base sm:text-lg font-extrabold mt-1">
                  Rekomendasi Jenjang Kelas & Fokus Stimulasi Ananda
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Masukkan usia dan minat ananda untuk mengetahui jenjang yang paling tepat di TK Lukman Hakim.
                </p>
              </div>
              <GraduationCap className="w-10 h-10 text-amber-300 shrink-0 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Panggilan Ananda
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Contoh: Adik Azzam / Aisyah"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Usia Ananda Saat Ini (Tahun)
                </label>
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="2">1.5 – 2.5 Tahun (Daycare & Batita)</option>
                  <option value="3.5">3 – 4 Tahun (Kelompok Bermain / KB)</option>
                  <option value="4.5">4 – 5 Tahun (TK Kelompok A)</option>
                  <option value="5.5">5 – 6 Tahun (TK Kelompok B / Siap SD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Hal yang Disukai Ananda
                </label>
                <input
                  type="text"
                  value={childInterests}
                  onChange={(e) => setChildInterests(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Perkembangan Kemandirian Saat Ini
                </label>
                <input
                  type="text"
                  value={childSkills}
                  onChange={(e) => setChildSkills(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 pt-1">
                <button
                  onClick={handleRecommendClass}
                  disabled={isRecommending}
                  className="w-full py-3 rounded-xl bg-[#006699] hover:bg-[#00527a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                >
                  {isRecommending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Menganalisis Jenjang Terbaik...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" /> Analisis Rekomendasi Kelas Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>

            {recommenderResult && (
              <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-xs space-y-4">
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {renderFormattedText(recommenderResult)}
                </div>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  <button
                    onClick={onOpenPpdb}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006699] hover:bg-[#00527a] text-white text-xs font-extrabold transition cursor-pointer"
                  >
                    <span>Daftarkan {childName || 'Ananda'} di PPDB Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
