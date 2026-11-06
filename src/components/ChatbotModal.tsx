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
  { label: 'Metode Belajar 7 Sentra & Sentra Balok', query: 'Bagaimana penerapan 7 sentra bermain dan media Montessori di kelas TK Lukman Hakim?', category: 'kurikulum' },
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
    text: `Assalamu’alaikum Warahmatullahi Wabarakatuh, Ayah & Bunda.\n\nSaya adalah **Asisten Cerdas AI Resmi ${schoolIdentity.nama}** (NPSN: **${schoolIdentity.npsn}** • Terakreditasi A).\n\nSaya siap membantu menjawab segala pertanyaan Anda dengan cerdas dan komprehensif, mulai dari:\n• **Pendaftaran Murid Baru (SPMB T.A. 2026/2027) & Free Trial Class**\n• **Kurikulum Merdeka PAUD, 7 Sentra Belajar, Tahfidz Tilawati & 5 Pilar Karakter**\n• **Fasilitas Kampus, Ruang Sentra Ber-AC, Kebun Hidroponik & Playground Alam**\n• **Konsultasi Parenting, Psikologi Anak, Stimulasi Motorik & Kesiapan Masuk SD**\n• **Wawasan Umum, Sains & Cerita Edukatif**\n\nSilakan ketik pertanyaan Anda atau pilih topik di bawah ini.`,
    timestamp: 'Online 24 Jam',
    suggestedActions: ['open_ppdb', 'wa_admin'],
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

  const getSmartClientReply = (q: string): { text: string; actions: string[] } => {
    const lower = q.toLowerCase().trim();
    const schoolName = schoolIdentity?.nama || 'TK Lukman Hakim';
    const npsn = schoolIdentity?.npsn || '69981337';
    const waNumber = schoolIdentity?.whatsapp || '+62 877-1355-1412';

    // 1. Math & Calculation Solver
    const mathMatch = lower.match(/(\d+(?:\.\d+)?)\s*([+\-x*/:])\s*(\d+(?:\.\d+)?)/);
    if (mathMatch) {
      const a = parseFloat(mathMatch[1]);
      const op = mathMatch[2].toLowerCase();
      const b = parseFloat(mathMatch[3]);
      let res = 0;
      if (op === '+') res = a + b;
      else if (op === '-') res = a - b;
      else if (op === 'x' || op === '*') res = a * b;
      else if ((op === '/' || op === ':') && b !== 0) res = Number((a / b).toFixed(2));
      return {
        text: `Hasil dari **${a} ${op} ${b}** adalah **${res.toLocaleString('id-ID')}**.\n\nDi **${schoolName}**, kami mengenalkan konsep logika berhitung awal kepada ananda melalui media konkret Montessori (seperti balok geometri warna-warni, manik-manik berhitung, dan permainan peran jual-beli) sehingga ananda memahami esensi matematika dengan riang gembira tanpa paksaan.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 2. Worded Math Solver (misal: "berapa 15 kali 25")
    const wordedMath = lower.match(/(?:berapa|hitung)\s+(\d+)\s*(tambah|plus|kurang|minus|kali|bagi)\s*(\d+)/i);
    if (wordedMath) {
      const a = parseFloat(wordedMath[1]);
      const wordOp = wordedMath[2].toLowerCase();
      const b = parseFloat(wordedMath[3]);
      let res = 0;
      let symbol = '+';
      if (wordOp === 'tambah' || wordOp === 'plus') { res = a + b; symbol = '+'; }
      else if (wordOp === 'kurang' || wordOp === 'minus') { res = a - b; symbol = '-'; }
      else if (wordOp === 'kali') { res = a * b; symbol = '×'; }
      else if (wordOp === 'bagi' && b !== 0) { res = Number((a / b).toFixed(2)); symbol = '÷'; }
      return {
        text: `Hasil dari **${a} ${symbol} ${b}** adalah **${res.toLocaleString('id-ID')}**.\n\nDi lingkungan PAUD kami, kemampuan numerasi dan berpikir logis dibangun secara bertahap lewat eksplorasi benda konkret dan puzzle edukatif di Sentra Balok.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 3. Greetings & Courtesy
    if (/^(halo|hai|assalamu|salam|pagi|siang|sore|malam|permisi|tes|ping)\b/i.test(lower)) {
      return {
        text: `Wa'alaikumussalam Warahmatullahi Wabarakatuh, Ayah & Bunda.\n\nSelamat datang di **Asisten Cerdas AI Resmi ${schoolName} Purwokerto** (NPSN: **${npsn}** • Terakreditasi **A Unggul**).\n\nSaya berkemampuan serba bisa setara Gemini yang siap mendampingi Anda 24 jam:\n• **Pendaftaran Siswa Baru (PPDB 2026/2027) & Free Trial Class**\n• **Kurikulum Merdeka, 7 Sentra Bermain Ber-AC, Tahfidz Tilawati & 5 Pilar Karakter**\n• **Program Daycare, Kelompok Bermain (KB), TK A, dan TK B**\n• **Fasilitas Kampus, Kebun Hidroponik & Playground Luar Ruang**\n• **Konsultasi Parenting, Psikologi Anak, hingga Edukasi Sains & Cerita**\n\nSilakan ketik apa saja yang ingin Ayah / Bunda tanyakan!`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 4. Thanks / Appreciation
    if (/^(makasih|terima kasih|syukron|jazakallah|terimakasih|oke|baik|siap|mantap)\b/i.test(lower) && lower.length < 30) {
      return {
        text: `Sama-sama / Afwan Ayah & Bunda! Senang sekali dapat membantu.\n\nJika Ayah & Bunda ingin menjadwalkan kunjungan langsung atau mencoba **Free Trial Class** bersama ananda di kampus kami, silakan klik tombol pendaftaran atau hubungi WhatsApp Sekretariat kami ya. Semoga ananda senantiasa tumbuh sehat, cerdas, dan berkarakter mulia!`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 5. School Profile, NPSN, Accreditation, Address & Location
    if (/(alamat|lokasi|dimana|npsn|akreditasi|profil|sejarah|yayasan|legalitas|berdiri|maps|peta)/i.test(lower)) {
      return {
        text: `**Profil & Identitas Resmi ${schoolName} Purwokerto:**\n\n• **Akreditasi**: Terakreditasi **A (Unggul)** oleh BAN PAUD-PNF.\n• **NPSN Resmi**: **${npsn}**.\n• **Alamat Kampus**: Jl. HOS Noto Suwiryo No. 5, RT 02 / RW 03, Kelurahan Teluk, Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah 53145 (Sangat strategis, sejuk, dekat Taman Kota Andhang Pangrenan).\n• **Layanan Usia**: Daycare Batita (1.5–3 th), Kelompok Bermain (3–4 th), TK A (4–5 th), TK B (5–6 th).\n• **WhatsApp Hotline**: ${waNumber}.\n\nKami memadukan Kurikulum Merdeka PAUD dengan 7 Sentra Belajar dan penanaman 5 Pilar Karakter Islami yang ramah anak.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 6. PPDB, SPMB, Biaya, Syarat, Trial Class
    if (/(ppdb|spmb|daftar|pendaftaran|biaya|syarat|formulir|berkas|trial|coba|open house|registrasi)/i.test(lower)) {
      return {
        text: `**Informasi Pendaftaran Siswa Baru (PPDB T.A. 2026/2027):**\n\n1. **Free Trial Class (100% Gratis)**:\n   Ayah, Bunda, dan ananda dipersilakan merasakan langsung 1 hari bermain di sentra dan playground terbuka kami tanpa dipungut biaya apa pun sebelum memutuskan mendaftar.\n\n2. **Biaya Formulir & Observasi Tumbuh Kembang**: **Rp 150.000**.\n\n3. **Persyaratan Dokumen Administrasi**:\n   • Salinan Akta Kelahiran Ananda\n   • Salinan Kartu Keluarga (KK)\n   • Salinan KTP Orang Tua / Wali\n   • Pas Foto Ananda ukuran 3x4 (3 lembar)\n\n4. **Konsultasi Rincian SPP & Investasi Pendidikan**:\n   Rincian paket seragam, modul sentra, dan SPP bulanan dapat langsung dikonsultasikan secara transparan via formulir online atau WhatsApp Sekretariat kami di ${waNumber}.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 7. Kurikulum, 7 Sentra, Tilawati, 5 Pilar Karakter
    if (/(kurikulum|sentra|metode|tilawati|tahfidz|karakter|pilar|balok|montessori)/i.test(lower)) {
      return {
        text: `**Kurikulum Unggulan & Metode Belajar ${schoolName}:**\n\n1. **Kurikulum Merdeka PAUD**: Pembelajaran berbasis proyek (*Project-Based Learning*) yang berpusat pada minat unik anak.\n2. **7 Sentra Bermain Tematik Ber-AC**:\n   • **Sentra Balok Montessori**: Mengasah logika spasial, arsitektur balok, dan matematika awal.\n   • **Sentra Alam Cair & Sains**: Bereksperimen dengan air, pasir, tekstur alam, dan sebab-akibat.\n   • **Sentra Main Peran Mikro & Makro**: Melatih imajinasi sosial, kosakata, dan empati interpersonal.\n   • **Sentra Seni Kriya**: Mengembangkan motorik halus lewat kolase, melukis, dan membentuk lempung.\n   • **Sentra Olah Tubuh**: Melatih ketangkasan motorik kasar, keseimbangan, dan sportivitas.\n   • **Sentra Persiapan 1 & 2**: Pengenalan pra-baca tulis fonik dan numerasi tanpa drilling yang melelahkan.\n3. **Tahfidz Tilawati PAUD**: Pembelajaran Al-Qur'an Juz 30 berirama Rost yang riang dan gembira.\n4. **5 Pilar Karakter**: Faith (Iman), Honesty (Kejujuran), Respect (Hormat), Responsibility (Tanggung Jawab), Cleanliness (Kebersihan).`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 8. Program Jenjang (Daycare, KB, TK A, TK B) & Jam Belajar
    if (/(daycare|kelompok bermain|kb|tk a|tk b|jenjang|usia|umur|jadwal|jam sekolah|jam belajar)/i.test(lower)) {
      return {
        text: `**Jenjang Program Pendidikan & Jam Belajar di ${schoolName}:**\n\n• **Daycare Batita (Usia 1.5 – 3 Tahun)**: Stimulasi sensorik-motorik, pembiasaan toilet training mandiri, dan istirahat nyaman ber-AC dengan rasio pengasuhan privat.\n• **Kelompok Bermain / KB (Usia 3 – 4 Tahun)**: Sosialisasi awal, pengenalan emosi, serta eksplorasi sensori alam cair.\n• **TK Kelompok A (Usia 4 – 5 Tahun)**: Pengembangan kemandirian, motorik halus, dan adab islami harian.\n• **TK Kelompok B (Usia 5 – 6 Tahun)**: Kesiapan transisi masuk SD yang menyenangkan (fondasi literasi, numerasi, dan konsentrasi).\n\n**Jadwal Masuk & Pulang**:\n• Senin – Kamis: 07.30 – 11.00 WIB\n• Jumat (Jumat Berkah & Ibadah): 07.30 – 10.30 WIB\n• Pendampingan: 2 Ustadzah di setiap ruang kelas demi perhatian maksimal.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 9. Fasilitas Kampus & Keamanan
    if (/(fasilitas|gedung|ruang|kelas|playground|taman|hidroponik|cctv|aman|musholla|toilet)/i.test(lower)) {
      return {
        text: `**Fasilitas Kampus Unggulan ${schoolName}:**\n\n• **7 Ruang Sentra Ber-AC** dengan interior ramah anak, karpet antibakteri, dan rak mainan terorganisir.\n• **Playground Luar Ruang Alami** yang asri dan rindang, dilengkapi ayunan safety, perosotan, dan titian jembatan.\n• **Taman Sirkuit Rambu Lalu Lintas Mini** dengan zebra cross dan sepeda edukasi untuk pengenalan tertib lalu lintas.\n• **Kebun Hidroponik & Rumah Edukasi Satwa Merpati** tempat anak belajar menanam dan menyayangi binatang.\n• **Musholla Anak Raudhatul Jannah** untuk praktik sholat dhuha, wudhu, dan hafalan doa harian.\n• **Kid-Sized Sanitation & Toilet** yang higienis untuk pembiasaan toilet training anak.\n• **One-Gate Security System & CCTV Aktif 24 Jam** di seluruh area kampus.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 10. Parenting: Tantrum, Rewel & Emosi
    if (/(tantrum|rewel|marah|menangis|nangis|emosi|teriak|ngambek)/i.test(lower)) {
      return {
        text: `**Panduan Psikologi Menghadapi Anak Tantrum & Regulasi Emosi:**\n\n1. **Tenangkan Diri Terlebih Dahulu (*Co-Regulation*)**:\n   Sistem saraf anak menyerap ketenangan orang tua. Bila kita panik atau marah, tantrum anak justru akan memuncak. Tarik napas dalam dan bicaralah perlahan.\n2. **Dekati & Sejajarkan Posisi Mata**:\n   Duduklah setinggi anak, lalu validasi emosinya: *"Bunda tahu adik merasa kesal/kecewa. Bunda temani di sini ya."*\n3. **Beri Rasa Aman Tanpa Ceramah Panjang**:\n   Saat puncak tantrum, otak rasional anak sedang offline. Cukup beri kehadiran fisik yang hangat atau pelukan lembut jika anak mengizinkan.\n4. **Ajarkan Solusi Saat Anak Sudah Tenang**:\n   Setelah tangis mereda, ajak anak minum air putih, lalu diskusikan kata-kata yang bisa digunakan untuk mengekspresikan keinginannya tanpa melempar barang.\n\nPara ustadzah di TK Lukman Hakim senantiasa menggunakan pendekatan *mindful caregiving* dalam mendampingi emosi ananda di sekolah.`,
        actions: ['wa_admin', 'open_ppdb'],
      };
    }

    // 11. Parenting: Susah Makan / GTM
    if (/(gtm|susah makan|gamau makan|makan sayur|pilih makanan|melepeh|muntah)/i.test(lower)) {
      return {
        text: `**Solusi Praktis Mengatasi Anak Gerakan Tutup Mulut (GTM):**\n\n1. **Terapkan Aturan Makan Konsisten (*Feeding Rules*)**:\n   • Jadwal makan teratur (3x makan utama, 2x selingan sehat).\n   • Batasi durasi makan maksimal 30 menit. Jika selesai waktu, angkat piring dengan tenang tanpa memarahi anak.\n   • Bebas distraksi: matikan TV, gadget, dan hindari makan sambil diajak jalan-jalan keliling komplek.\n2. **Kekuatan Contoh Teman Sebaya (*Peer Modeling*)**:\n   Anak yang menolak sayur di rumah seringkali lahap makan di sekolah karena melihat teman-temannya makan bersama secara seru di meja sentra.\n3. **Libatkan Anak dalam Penyiapan Makanan**:\n   Ajak anak mencuci buah atau menata potongan wortel. Anak memiliki kebanggaan untuk mencicipi makanan yang ia bantu persiapkan.\n\nDi TK Lukman Hakim, sesi makan bersama diawali adab islami (cuci tangan, basmalah, makan sambil duduk tangan kanan) dan evaluasi asupan gizi harian.`,
        actions: ['wa_admin', 'open_ppdb'],
      };
    }

    // 12. Parenting: Terlambat Bicara / Gadget
    if (/(bicara|speech delay|ngomong|gadget|hp|layar|fokus|kata)/i.test(lower)) {
      return {
        text: `**Stimulasi Kemampuan Bicara & Bijak Penggunaan Gadget:**\n\n1. **Batasi Paparan Layar Pasif (Screen Time)**:\n   Anak balita membutuhkan komunikasi interaktif dua arah bolak-balik, bukan tontonan video cepat satu arah yang memicu speech delay.\n2. **Gunakan Teknik Pilihan & Narasi Harian**:\n   Alih-alih pertanyaan tertutup ya/tidak, berikan pilihan: *"Adik mau apel merah atau pisang kuning?"* dan ceritakan apa yang sedang dilakukan orang tua bersama anak.\n3. **Membacakan Buku Cerita Nyaring (*Read Aloud*)**:\n   Membacakan buku bergambar minimal 10 menit sehari terbukti melipatgandakan kosakata dan daya imajinasi anak usia dini.\n4. **Aktivitas Sentra Main Peran**:\n   Di TK Lukman Hakim, anak secara aktif diajak bermain peran mikro dan makro (dokter-pasien, pasar tradisional, koki cilik) yang secara alami merangsang keberanian anak berbicara lancar.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 13. Parenting: Toilet Training
    if (/(toilet|ompol|ngompol|popok|pampers|kencing|pipis|bab)/i.test(lower)) {
      return {
        text: `**Tips Sukses Toilet Training Mandiri Tanpa Rasa Takut:**\n\n1. **Kenali Tanda Kesiapan Anak**:\n   Anak bisa tetap kering 2 jam berturut-turut, mampu menarik celananya sendiri, dan mulai memberi kode saat ingin buang air.\n2. **Gunakan Toilet Ramah Anak (*Kid-Sized*)**:\n   Anak merasa takut terjatuh jika menggunakan toilet dewasa yang tinggi. Gunakan dudukan khusus atau fasilitas toilet balita.\n3. **Apresiasi Usaha, Bukan Hasil Akhir**:\n   Bila terjadi "kecelakaan" mengompol, jangan dimarahi atau dipermalukan. Katakan: *"Tidak apa-apa, nanti kalau perut adik terasa mules langsung bilang Bunda ya."*\n\nTK Lukman Hakim memiliki sanitasi khusus ukuran balita dan ustadzah yang dengan telaten mendampingi ananda lulus toilet training secara mandiri.`,
        actions: ['wa_admin', 'open_ppdb'],
      };
    }

    // 14. Kesiapan Masuk SD / Calistung
    if (/(sd|kesiapan sd|calistung|baca tulis|masuk sd|lancar baca)/i.test(lower)) {
      return {
        text: `**Kesiapan Transisi PAUD ke SD yang Menyenangkan:**\n\nSesuai pedoman Kurikulum Merdeka Kemendikdasmen, tes calistung dilarang menjadi syarat masuk SD. Yang sesungguhnya dibutuhkan anak adalah **Fondasi Kesiapan Belajar**:\n• **Kematangan Emosi & Kemandirian**: Mampu memakai sepatu sendiri, merapikan alat tulis, dan berani mengutarakan kebutuhan.\n• **Fokus & Rentang Konsentrasi**: Mampu menyimak instruksi sederhana 15–20 menit.\n• **Pra-Literasi & Numerasi Menyenangkan**: Mengenal bunyi huruf (fonik), menyukai buku cerita, dan memahami konsep jumlah lewat benda nyata.\n\nDi kelas TK B Lukman Hakim, ananda dibekali stimulasi Sentra Persiapan sehingga percaya diri dan gembira saat melangkah ke jenjang SD favorit!`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 15. Sains & Eksplorasi Alam Semesta
    if (/(langit|hujan|awan|pelangi|fotosintesis|matahari|bulan|bintang|bumi|planet|dinosaurus|hewan|tumbuhan|gravitasi)/i.test(lower)) {
      return {
        text: `**Wawasan Sains & Eksplorasi Alam Semesta:**\n\nFenomena alam selalu memantik rasa takjub (*sense of wonder*) anak terhadap keagungan Sang Pencipta:\n• **Mengapa Langit Berwarna Biru?** Cahaya matahari merambat melalui atmosfer bumi. Partikel gas di udara menghamburkan gelombang cahaya biru lebih banyak dibanding warna lain, sehingga langit tampak membiru indah.\n• **Bagaimana Pelangi Terbentuk?** Ketika sinar mentari menembus butiran tetes air hujan di udara, tetesan air tersebut bekerja bagaikan prisma yang menguraikan cahaya putih menjadi spektrum pelangi yang mempesona.\n\nDi TK Lukman Hakim, ananda belajar konsep sains secara langsung lewat **Kebun Hidroponik, Eksperimen Sentra Alam Cair, dan Observasi Merpati** agar anak mencintai sains sejak dini!`,
        actions: ['wa_admin', 'open_ppdb'],
      };
    }

    // 16. Storytelling / Dongeng Fabel
    if (/(cerita|dongeng|kisah|fabel|kancil|singa|kelinci|kura)/i.test(lower)) {
      return {
        text: `**Kisah Teladan: Kejujuran Burung Pipit Kecil di Kebun Sekolah**\n\nDi sebuah kebun yang asri, seekor burung pipit kecil bernama Piko melihat sebutir buah manis tergeletak di bawah meja. Perutnya berbunyi lapar, dan teman-temannya menyuruh Piko langsung melahapnya.\n\nNamun Piko teringat nasihat bundanya: *"Setiap barang yang bukan milik kita, tanyakan dulu kepada pemiliknya."*\n\nPiko pun terbang membawa buah itu kepada Pak Kebun yang sedang menyiram bunga. Pak Kebun tersenyum bangga atas kejujuran Piko, lalu memberinya semangkuk penuh biji bunga matahari yang renyah untuk dinikmati bersama teman-temannya.\n\n**Hikmah Cerita:** Kejujuran mendatangkan ketenangan batin dan keberkahan. Nilai budi pekerti ini selalu kami tanamkan setiap hari di TK Lukman Hakim melalui sesi bercerita interaktif di Pojok Baca.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 17. Islamic Adab & Ibadah
    if (/(islam|adab|akhlak|sholat|wudhu|nabi|doa|hadits|puasa|syukur)/i.test(lower)) {
      return {
        text: `**Penanaman Adab & Nilai Keislaman pada Usia Emas:**\n\n1. **Keteladanan Nyata (*Role Model*)**:\n   Anak belajar dari apa yang dilihat. Mencontohkan tutur kata lembut, makan sambil duduk, serta budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) memiliki dampak abadi pada jiwa anak.\n2. **Kaitkan dengan Kasih Sayang Allah SWT**:\n   Kenalkan Allah sebagai Sang Maha Pengasih yang menciptakan bunga, burung, dan keluarga yang saling menyayangi.\n3. **Pembiasaan Berirama Gembira**:\n   Praktik wudhu mandiri, sholat dhuha berjamaah di Musholla Raudhatul Jannah, dan murojaah metode Tilawati PAUD dilakukan dengan irama ceria tanpa rasa tertekan.\n\nKelima pilar karakter (Faith, Honesty, Respect, Responsibility, Cleanliness) menjadi fondasi harian di sekolah kami.`,
        actions: ['open_ppdb', 'wa_admin'],
      };
    }

    // 18. Broad Intelligent Conversational Response (Setara Gemini)
    return {
      text: `Terima kasih atas pertanyaannya, Ayah & Bunda.\n\nSebagai Asisten Pintar Resmi **${schoolName} Purwokerto**, saya memiliki wawasan luas untuk mendampingi Anda:\n• **Informasi Sekolah**: Program Daycare, KB, TK A & TK B, kurikulum 7 sentra, jadwal belajar, dan pendaftaran murid baru.\n• **Konsultasi Pengasuhan Anak**: Psikologi tumbuh kembang balita, regulasi emosi, kemandirian, dan kesiapan transisi SD.\n• **Pengetahuan Umum**: Logika matematika, eksplorasi sains, nilai budi pekerti islami, maupun dongeng anak edukatif.\n\nSilakan ceritakan lebih lanjut pertanyaan atau hal yang sedang Ayah / Bunda hadapi di rumah, dan saya siap membantu dengan senang hati!`,
      actions: ['open_ppdb', 'wa_admin'],
    };
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
    // Fast 1.5s timeout: Never make the user wait 7 seconds!
    const timeoutId = setTimeout(() => controller.abort(), 1500);

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
        text: data.reply || getSmartClientReply(query).text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-live',
        suggestedActions: data.suggestedActions || ['open_ppdb', 'wa_admin'],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      clearTimeout(timeoutId);
      const smartReply = getSmartClientReply(query);
      const fallbackMsg: ChatMessage = {
        id: `bot-res-${Date.now()}`,
        sender: 'bot',
        text: smartReply.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: smartReply.actions,
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
    const cleanText = text.replace(/[*#_ðŸŽ¯ðŸŒŸðŸ“¦ðŸš€ðŸ’¬ðŸ’¡ðŸ«ðŸŒˆðŸ“ŒðŸ“‹ðŸŽðŸ’³ðŸ“±ðŸ“ðŸ“šðŸ•ŒðŸ‘©â€ðŸ«â°ðŸŽ¨ðŸ“ŠðŸ¥—ðŸ“µðŸŽ“ðŸ§¼â€¢]/g, '');
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
      let jenjang = 'TK Kelompok A (Usia 4 - 5 Tahun)';
      if (parsedAge < 3) jenjang = 'Daycare & Batita (Usia 1.5 - 3 Tahun)';
      else if (parsedAge < 4) jenjang = 'Kelompok Bermain / KB (Usia 3 - 4 Tahun)';
      else if (parsedAge >= 5) jenjang = 'TK Kelompok B / Persiapan SD (Usia 5 - 6 Tahun)';

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
            <div className="relative w-11 h-11 rounded-xl bg-white p-1 border border-white/20 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
              <img src="/assets/logo.png" alt="Logo TK Lukman Hakim" className="w-full h-full object-contain" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0F2937] rounded-full" />
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
                Jawab Semua Pertanyaan Sekolah, PPDB, Kurikulum & Konsultasi Parenting 24 Jam
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
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs overflow-hidden ${
                      msg.sender === 'user'
                        ? 'bg-[#006699] text-white'
                        : 'bg-white p-0.5 border border-slate-200'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <img src="/assets/logo.png" alt="AI" className="w-full h-full object-contain" />
                    )}
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
                              `Assalamu'alaikum Admin ${schoolIdentity.nama}, saya ingin berkonsultasi lebih lanjut.`
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
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                    <img src="/assets/logo.png" alt="AI" className="w-full h-full object-contain animate-pulse" />
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
                  Rancang kegiatan bermain edukatif 15 - 30 menit di rumah yang selaras dengan 5 Pilar Karakter TK Lukman Hakim.
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
                  <option value="1.5 - 3 tahun (Daycare / Batita)">1.5 - 3 Tahun (Daycare / Batita)</option>
                  <option value="3 - 4 tahun (Kelompok Bermain / KB)">3 - 4 Tahun (Kelompok Bermain / KB)</option>
                  <option value="4 - 5 tahun (TK A)">4 - 5 Tahun (TK Kelompok A)</option>
                  <option value="5 - 6 tahun (TK B - Persiapan SD)">5 - 6 Tahun (TK Kelompok B)</option>
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
                  <option value="2">1.5 - 2.5 Tahun (Daycare & Batita)</option>
                  <option value="3.5">3 - 4 Tahun (Kelompok Bermain / KB)</option>
                  <option value="4.5">4 - 5 Tahun (TK Kelompok A)</option>
                  <option value="5.5">5 - 6 Tahun (TK Kelompok B / Siap SD)</option>
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
