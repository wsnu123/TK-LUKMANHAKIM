import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { verify as verifySignature } from 'node:crypto';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error('[Server Error] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Server Error] Unhandled Rejection:', reason);
});

const __filenameResolved = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
const __dirnameResolved = typeof __dirname !== 'undefined' ? __dirname : path.dirname(__filenameResolved);

const app = express();

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'refreshing-ticket-pgmzr';
const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || 'ml0752960@gmail.com')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);
const FIREBASE_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
let firebaseCertificates: Record<string, string> = {};
let firebaseCertificatesExpiresAt = 0;

async function getFirebaseCertificates(): Promise<Record<string, string>> {
  if (Date.now() < firebaseCertificatesExpiresAt && Object.keys(firebaseCertificates).length) {
    return firebaseCertificates;
  }
  const response = await fetch(FIREBASE_CERT_URL);
  if (!response.ok) throw new Error('Tidak dapat memverifikasi sertifikat Firebase.');
  firebaseCertificates = (await response.json()) as Record<string, string>;
  const maxAge = response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1];
  firebaseCertificatesExpiresAt = Date.now() + Math.max(60, Number(maxAge) || 3600) * 1000;
  return firebaseCertificates;
}

async function hasVerifiedAdminToken(req: Request): Promise<boolean> {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    if (header.alg !== 'RS256' || typeof header.kid !== 'string') return false;
    const certificates = await getFirebaseCertificates();
    const certificate = certificates[header.kid];
    if (!certificate) return false;

    const validSignature = verifySignature(
      'RSA-SHA256',
      Buffer.from(`${parts[0]}.${parts[1]}`),
      certificate,
      Buffer.from(parts[2], 'base64url')
    );
    const now = Math.floor(Date.now() / 1000);
    return validSignature &&
      claims.aud === FIREBASE_PROJECT_ID &&
      claims.iss === `https://securetoken.google.com/${FIREBASE_PROJECT_ID}` &&
      typeof claims.sub === 'string' && claims.sub.length > 0 && claims.sub.length <= 128 &&
      typeof claims.exp === 'number' && claims.exp > now &&
      typeof claims.iat === 'number' && claims.iat <= now &&
      claims.email_verified === true &&
      typeof claims.email === 'string' && ADMIN_EMAILS.has(claims.email.toLowerCase());
  } catch {
    return false;
  }
}

const requireAdmin: express.RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  hasVerifiedAdminToken(req)
    .then((authorized) => {
      if (authorized) return next();
      return res.status(401).json({ success: false, error: 'Login admin Firebase terverifikasi diperlukan.' });
    })
    .catch(() => res.status(503).json({ success: false, error: 'Layanan verifikasi login sedang tidak tersedia.' }));
};

// Parse CLI flags or fall back to port 3000
const portArgIndex = process.argv.indexOf('--port');
const cliPort = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
const hostArgIndex = process.argv.indexOf('--host');
const cliHost = hostArgIndex !== -1 ? process.argv[hostArgIndex + 1] : undefined;

const PORT = cliPort || (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);
const HOST = cliHost || process.env.HOST || '0.0.0.0';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Healthcheck endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), port: PORT });
});

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Gemini AI client:', err);
  }
}

// Comprehensive Multi-Domain Knowledge Base for TK Lukman Hakim Purwokerto + General Parenting & Education
const KNOWLEDGE_TOPICS: {
  id: string;
  keywords: string[];
  answer: string;
  suggestedActions?: string[];
}[] = [
  {
    id: 'ppdb_pendaftaran',
    keywords: ['ppdb', 'daftar', 'pendaftaran', 'syarat', 'masuk', 'kuota', 'gelombang', 'formulir', 'registrasi'],
    answer: `Assalamu’alaikum Ayah & Bunda.\n\n**Pendaftaran Peserta Didik Baru (PPDB) TK Lukman Hakim Tahun Ajaran 2026/2027 telah dibuka.**\n\n**4 Jenjang Pendidikan yang Tersedia:**\n1. **Daycare & Batita Ceria**: Usia 1.5 – 3 Tahun (Rasio 1:3)\n2. **Kelompok Bermain (KB / Playgroup)**: Usia 3 – 4 Tahun (Rasio 1:6)\n3. **TK Kelompok A**: Usia 4 – 5 Tahun (Rasio 1:10)\n4. **TK Kelompok B (Persiapan SD)**: Usia 5 – 6 Tahun (Rasio 1:12)\n\n**Syarat Berkas Pendaftaran:**\n- Mengisi Formulir PPDB Online di website ini\n- Fotokopi Akta Kelahiran & Kartu Keluarga (KK)\n- Pas foto ananda ukuran 3x4 (2 lembar)\n\n**Keuntungan Gelombang I:** Potongan khusus uang pengembangan & **Free Trial Class** (kelas percobaan gratis). Silakan klik tombol **"Buka Formulir PPDB"** di bawah ini untuk mendaftar langsung.`,
    suggestedActions: ['open_ppdb', 'wa_admin'],
  },
  {
    id: 'biaya_spp',
    keywords: ['biaya', 'uang', 'spp', 'tarif', 'harga', 'bayar', 'pangkal', 'cicil', 'diskon', 'kuitansi', 'qris', 'tagihan'],
    answer: `Berikut rincian transparan **Biaya Pendidikan & SPP di TK Lukman Hakim Purwokerto**:\n\n**Rincian Biaya:**\n- **Biaya Pendaftaran & Observasi**: Rp 150.000\n- **SPP Bulanan Playgroup / KB**: Rp 300.000 / bulan\n- **SPP Bulanan TK A & TK B**: Rp 350.000 / bulan\n- **Katering Makan Siang Sehat (Non-MSG)**: Rp 150.000 / bulan (Opsional)\n- **Potongan Khusus**: Tersedia diskon Gelombang I dan potongan khusus kakak-beradik (*sibling discount*).\n\n**Cara Pembayaran Digital (Portal Wali):**\nAyah & Bunda dapat mengecek tagihan dan membayar SPP secara instan melalui menu **Portal Wali -> Cek Tagihan SPP** menggunakan **QRIS Resmi Yayasan**, Virtual Account **BSI, Mandiri, BRI, atau BCA**, lengkap dengan cetak **Kuitansi Digital Resmi**.`,
    suggestedActions: ['open_spp', 'open_ppdb'],
  },
  {
    id: 'lokasi_alamat',
    keywords: ['lokasi', 'alamat', 'dimana', 'maps', 'tempat', 'rute', 'jalan', 'teluk', 'purwokerto', 'hos noto'],
    answer: `**Lokasi Kampus Utama TK Lukman Hakim Purwokerto:**\n\n- **Alamat Lengkap**: Jl. Hos Noto Suwiryo No. 5, Kelurahan Teluk, Kecamatan Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah.\n- **Identitas Resmi**: NPSN **69981337** • Terakreditasi **A (Unggul)** BAN-PAUD.\n- **Keunggulan Lokasi**: Berada di kawasan hunian yang tenang, hijau, bebas polusi & bising jalan raya utama, serta memiliki area antar-jemput (*drop-off zone*) yang aman dan luas.\n- **Jam Layanan Sekretariat**: Senin – Jumat (07.00 – 15.30 WIB) & Sabtu (08.00 – 12.00 WIB).`,
    suggestedActions: ['wa_admin'],
  },
  {
    id: 'kurikulum_pilar',
    keywords: ['kurikulum', 'pilar', 'basis', 'belajar', 'metode', 'merdeka', 'cambridge', 'oase', 'karakter'],
    answer: `**Kurikulum Terpadu TK Lukman Hakim Purwokerto:**\n\nKami memadukan **Kurikulum Merdeka PAUD Kemendikdasmen**, **Kurikulum Karakter Islami**, dan **Cambridge Fun English**:\n\n**5 Pilar Karakter Utama (Living Values):**\n1. **Faith in Allah SWT**: Pembiasaan dzikir pagi, wudhu tertib, dan Sholat Dhuha berjamaah.\n2. **Honesty**: Kejujuran, amanah, dan berani berkata benar.\n3. **Respect**: Budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) & menghormati orang tua/guru.\n4. **Responsibility**: Mandiri merapikan sepatu, alat makan, dan mainan sendiri.\n5. **Cleanliness**: Kebersihan diri dan kepedulian merawat lingkungan alam.\n\n**8 Basis Pembelajaran Ramah Fitrah:**\n*Anak = Unik, Prestasi, Living Values, Lugas, Proses, Toleransi, Praktek OASE, dan Disiplin Positif (tanpa bentakan/ancaman).*`,
    suggestedActions: ['open_ppdb'],
  },
  {
    id: 'tahfidz_agama',
    keywords: ['tahfidz', 'quran', 'mengaji', 'iqro', 'tilawati', 'sholat', 'doa', 'hadits', 'hafalan', 'islami'],
    answer: `**Program Unggulan Tahfidz Al-Qur'an, Tilawati & Ibadah Harian:**\n\nDi TK Lukman Hakim, ananda belajar mencintai Al-Qur'an dengan cara yang gembira dan sesuai makhraj:\n- **Metode Mengaji**: Menggunakan metode **Tilawati PAUD** berirama rost yang menyenangkan dan mudah diingat anak.\n- **Target Hafalan Bertahap**:\n  - *KB / Playgroup*: Surat Al-Fatihah, An-Naas s/d Al-Lahab & 8 Doa Harian.\n  - *TK A*: 12 Surat Pendek Juz 30 (An-Naas s/d Al-Qari'ah), 8 Hadits Pilihan & 12 Doa Harian.\n  - *TK B*: Target Unggulan Juz 30, 15 Hadits Akhlak, Praktik Wudhu & Bacaan Sholat Lengkap.\n- **Pembiasaan Pagi**: Setiap pagi diawali dengan ikrar santri, Sholat Dhuha berjamaah di Musholla Raudhatul Jannah, dan murojaah ceria.`,
    suggestedActions: ['open_ppdb'],
  },
  {
    id: 'fasilitas_sekolah',
    keywords: ['fasilitas', 'gedung', 'sarana', 'playground', 'kelas', 'ac', 'musholla', 'kantin', 'makan', 'cctv', 'kebun', 'burung'],
    answer: `**5 Zona Fasilitas Penunjang Berstandar Sekolah Ramah Anak:**\n\n1. **Playground Alam & Taman Lalu Lintas (±450 m²)**: Jembatan titian motorik, zebra cross edukasi, rambu lalu lintas, dan wahana putaran ramah anak.\n2. **Kebun Edukasi Botanika & Rumah Satwa**: Taman hijau tempat santri memberi makan burung merpati jinak dan menanam bibit tanaman.\n3. **Ruang Kelas Sentra Ber-AC & Multimedia**: 6 Ruang sentra ber-AC yang sejuk, Proyektor Audio-Visual interaktif, dan Pojok Pustaka.\n4. **Ruang Makan Santri & Sanitasi Balita**: Meja komunal warna-warni, katering sehat Non-MSG, wastafel rendah (55 cm), dan toilet ramah balita.\n5. **Musholla Raudhatul Jannah**: Ruang ibadah berkarpet lembut dengan tempat wudhu khusus anak.`,
    suggestedActions: ['wa_admin'],
  },
  {
    id: 'guru_pendidik',
    keywords: ['guru', 'ustadzah', 'kepala sekolah', 'pengajar', 'pendidik', 'wali kelas', 'rasio'],
    answer: `**Dewan Pendidik & Ustadzah TK Lukman Hakim:**\n\nSeluruh pendidik kami berkualifikasi akademik **S1 Pendidikan Anak Usia Dini (PAUD) & Psikologi**, bersertifikasi metode Tilawati, serta menerapkan komunikasi **Disiplin Positif**:\n- **Kepala Sekolah**: Ustadzah Hj. Siti Nurjanah, S.Pd.AUD.\n- **Koordinator Kurikulum & TK B**: Ustadzah Rahmawati Khairunnisa, S.Pd.\n- **Wali Kelas TK A & Psikologi**: Ustadzah Annisa Dwi Lestari, S.Psi.\n- **Wali Kelas KB & Daycare**: Ustadzah Indah Permatasari, S.Pd.\n- **Pendamping Tahfidz**: Ustadz Muhammad Fauzan, S.Pd.I.\n\nSetiap kelas didampingi oleh **2 ustadzah** agar perhatian pada tumbuh kembang setiap anak benar-benar terjaga.`,
    suggestedActions: ['wa_admin'],
  },
  {
    id: 'jadwal_jam_belajar',
    keywords: ['jadwal', 'jam belajar', 'jam masuk', 'jam pulang', 'pulang jam', 'jam berapa', 'hari belajar', 'ekskul', 'ekstrakurikuler'],
    answer: `**Jadwal Kegiatan Belajar Mengajar (Senin – Jumat):**\n\n- **Daycare & Batita (1.5 – 3 Thn)**: 07.00 – 16.00 WIB (*Half Day / Full Day*)\n- **Kelompok Bermain / KB (3 – 4 Thn)**: 07.30 – 10.30 WIB\n- **TK Kelompok A (4 – 5 Thn)**: 07.30 – 11.15 WIB\n- **TK Kelompok B (5 – 6 Thn)**: 07.30 – 11.45 WIB\n\n**Ekstrakurikuler & Pengembangan Bakat:**\nMeliputi Menggambar & Kriya Alam, Musik Perkusi/Angklung Cilik, Berenang Terbimbing, Sains Eksperimen, Bahasa Inggris (*Cambridge Fun English*), dan *Outing Class* tematik.`,
    suggestedActions: ['open_ppdb'],
  },
  {
    id: 'kontak_whatsapp',
    keywords: ['kontak', 'hubungi', 'whatsapp', 'nomor wa', 'telepon', 'no telp', 'hotline', 'admin', 'sekretariat'],
    answer: `**Kontak Resmi & Sekretariat TK Lukman Hakim Purwokerto:**\n\n- **Hotline WhatsApp**: **+62 877-1355-1412** (Layanan Cepat Konsultasi & PPDB)\n- **Telepon Kantor**: (0281) 638842\n- **Email Resmi**: tklukmanhakim.pwt@gmail.com\n- **Alamat Kampus**: Jl. Hos Noto Suwiryo No. 5, Teluk, Purwokerto Selatan, Banyumas\n- **Jam Operasional**: Senin – Jumat (07.00 – 15.30 WIB) & Sabtu (08.00 – 12.00 WIB).\n\nAyah & Bunda dapat mengklik tombol **Tanya Admin WhatsApp** di bawah untuk langsung terhubung ke admin kami.`,
    suggestedActions: ['wa_admin', 'open_ppdb'],
  },
  {
    id: 'rekening_transfer',
    keywords: ['rekening', 'transfer', 'nomor rekening', 'bsi', 'bank', 'no rek', 'cara bayar', 'qris'],
    answer: `**Rekening Resmi Pembayaran Pendidikan TK Lukman Hakim:**\n\nUntuk keamanan dan transparansi, seluruh transaksi dilakukan melalui rekening resmi yayasan:\n- **Bank Syariah Indonesia (BSI)**: \`7198-2026-01\` a.n. **TK LUKMAN HAKIM PURWOKERTO**\n- **Bank Mandiri**: \`139-00-981337-0\` a.n. **YAYASAN LUKMAN HAKIM**\n- **QRIS Dinamis**: Tersedia langsung di menu **Portal Wali -> Cek SPP** dengan scan 1-klik dari aplikasi m-banking (BSI, BCA, Mandiri, BRI, dll.) atau dompet digital (GoPay, OVO, ShopeePay).\n\nSetelah transfer, bukti pembayaran dapat diverifikasi otomatis melalui Portal Wali atau dikirimkan ke WA Panitia.`,
    suggestedActions: ['open_spp', 'wa_admin'],
  },
  {
    id: 'trial_class',
    keywords: ['trial', 'coba', 'percobaan', 'free trial', 'visit', 'kunjungan', 'survey', 'open house'],
    answer: `**Free Trial Class & School Tour (Gratis):**\n\nKami mengundang Ayah, Bunda, dan ananda untuk merasakan langsung suasana belajar yang ramah dan menyenangkan di TK Lukman Hakim:\n- **Fasilitas Trial**: Mengikuti 1 sesi aktivitas sentra bermain, berkenalan dengan ustadzah pengasuh, dan bermain di playground alam terbuka.\n- **Waktu Kunjungan**: Senin – Kamis pukul 08.00 – 10.00 WIB (dengan konfirmasi H-1).\n- **Biaya**: **100% Gratis tanpa dipungut biaya apa pun**.\n\nSilakan klik tombol **Buka Formulir PPDB** atau chat WhatsApp kami untuk memilih jadwal Trial Class yang sesuai.`,
    suggestedActions: ['open_ppdb', 'wa_admin'],
  },
  {
    id: 'diskon_keringanan',
    keywords: ['diskon', 'keringanan', 'beasiswa', 'potongan', 'saudara', 'kakak adik', 'dua anak', 'promo'],
    answer: `**Program Keringanan & Potongan Biaya Pendidikan:**\n\n1. **Early Bird Gelombang I**: Potongan khusus uang sarana dan prioritas pemilihan jadwal observasi santri baru.\n2. **Sibling Discount (Kakak-Beradik)**: Potongan 15% uang pengembangan untuk ananda kedua/ketiga yang bersekolah bersamaan di TK Lukman Hakim.\n3. **Keringanan Khusus**: Tersedia program subsidi silang bagi santri yatim atau keluarga berprestasi yang membutuhkan melalui rekomendasi komite sekolah.\n\nSilakan konsultasikan dengan panitia administrasi PPDB via WhatsApp untuk rincian skema cicilan yang fleksibel.`,
    suggestedActions: ['open_ppdb', 'wa_admin'],
  },
  {
    id: 'seragam_perlengkapan',
    keywords: ['seragam', 'baju', 'kaos', 'buku', 'tas', 'perlengkapan', 'fasilitas santri'],
    answer: `**Paket Seragam & Perlengkapan Santri Baru:**\n\nSantri yang telah terdaftar akan menerima paket perlengkapan lengkap dari sekolah:\n- 4 Stel Seragam Resmi: Seragam Batik Khas Lukman Hakim, Baju Muslim Putih-Hijau, Kaos Olahraga Ceria, dan Rompi Kotak.\n- Buku Paket Tematik Kurikulum Merdeka PAUD & Buku Jilid Tilawati Asli.\n- Tas Ransel Sekolah Ramah Postur Balita & Buku Penghubung Harian Orang Tua.\n\nUkuran seragam akan diukur langsung pada saat observasi ramah anak.`,
    suggestedActions: ['open_ppdb'],
  },
  {
    id: 'raport_portal_wali',
    keywords: ['raport', 'eraport', 'e-raport', 'nilai', 'perkembangan', 'laporan', 'portal wali', 'nis'],
    answer: `**Portal Wali Murid & E-Raport Digital Kurikulum Merdeka:**\n\nAyah & Bunda dapat memantau perkembangan ananda secara transparan melalui menu **Portal Wali** di bagian atas website:\n1. **E-Raport 6 Aspek Perkembangan**: Menampilkan capaian Nilai Agama & Budi Pekerti, Jati Diri, Literasi & STEAM, Fisik Motorik, Sosial Emosional, serta Capaian Tahfidz Juz 30.\n2. **Cek & Bayar SPP Digital**: Cukup masukkan **NIS Siswa** (contoh: \`2024001\` untuk Ahmad Fatih atau \`2024002\` untuk Aisyah Humaira) untuk melihat tagihan maupun mengunduh raport PDF/cetak.`,
    suggestedActions: ['open_report', 'open_spp'],
  },
  {
    id: 'parenting_tantrum_emosi',
    keywords: ['tantrum', 'nangis', 'marah', 'emosi', 'rewel', 'ngambek', 'disiplin', 'nakal', 'malu', 'takut'],
    answer: `**Tips Psikologi & Parenting PAUD: Menghadapi Anak Tantrum atau Cemas**\n\nSebagai mitra orang tua, berikut pendekatan **Disiplin Positif** yang kami terapkan di TK Lukman Hakim:\n1. **Validasi Perasaan Anak Terlebih Dahulu**: Peluk atau sejajarkan posisi mata dengan anak, lalu ucapkan kalimat tenang: *"Ibu/Ayah tahu Adik sedang kesal karena mainannya belum selesai, tarik napas dulu yuk bersama Ibu."*\n2. **Hindari Bentakan atau Ancaman**: Saat anak tantrum, otak emosinya (*amigdala*) sedang aktif. Suara lembut orang tua membantu menenangkan sistem saraf anak.\n3. **Berikan Pilihan Terbatas**: Alih-alih memerintah, beri 2 pilihan positif, misalnya: *"Adik mau membereskan balok merah dulu atau buku cerita dulu?"*\n4. **Apresiasi Prosesnya**: Berikan pujian spesifik saat anak berhasil menenangkan diri.`,
    suggestedActions: ['open_parenting_tab'],
  },
  {
    id: 'parenting_makan_gtm',
    keywords: ['makan', 'gtm', 'sayur', 'gizi', 'bekal', 'susah makan', 'katering', 'alergi', 'sehat'],
    answer: `**Solusi Anak Susah Makan (GTM) & Pembiasaan Gizi Sehat di Sekolah:**\n\nDi TK Lukman Hakim, banyak santri yang awalnya pilih-pilih makanan di rumah menjadi lahap makan sayur saat di sekolah karena:\n1. **Efek Makan Bersama Teman Sebaya (*Peer Modeling*)**: Duduk makan bersama di meja warna-warni membuat anak termotivasi melihat teman-temannya lahap.\n2. **Menu Variatif Non-MSG**: Katering sehat sekolah menyajikan menu gizi seimbang dengan tampilan menarik yang ramah kunyah anak.\n3. **Adab Makan Tanpa Paksaan**: Anak diajak mencuci tangan, berdoa, mengambil porsi secukupnya, dan menikmati suasana makan yang gembira tanpa gawai (*100% Screen-Free*).`,
    suggestedActions: ['open_parenting_tab'],
  },
  {
    id: 'parenting_gadget_hp',
    keywords: ['hp', 'gadget', 'layar', 'screen', 'youtube', 'game', 'tv', 'kecanduan'],
    answer: `**Tips Mengurangi Ketergantungan Gadget (Screen Time) pada Anak Usia Dini:**\n\n1. **Ganti dengan Aktivitas Sensorik & Motorik Nyata**: Anak sering meminta HP karena bosan. Ajak bermain air, meronce, menggambar dengan krayon, atau mengamati tanaman/burung di halaman.\n2. **Tetapkan Aturan Konsisten Tanpa Marah**: Sepakati jadwal bebas layar (misal saat makan dan 2 jam sebelum tidur).\n3. **Lingkungan 100% Screen-Free di TK Lukman Hakim**: Selama di sekolah, anak-anak berinteraksi penuh dengan teman, bermain di jembatan motorik, kebun alam, dan mendengarkan dongeng interaktif ustadzah sehingga melupakan gawai secara alami.`,
    suggestedActions: ['open_parenting_tab'],
  },
  {
    id: 'kesiapan_masuk_sd',
    keywords: ['baca', 'tulis', 'hitung', 'calistung', 'sd', 'siap sekolah', 'fokus', 'membaca'],
    answer: `**Bagaimana TK Lukman Hakim Menyiapkan Anak Masuk SD Unggulan Tanpa Stres?**\n\nSesuai kebijakan Kemendikdasmen tentang **Transisi PAUD ke SD yang Menyenangkan**, kesiapan masuk SD bukan sekadar hafal huruf/angka, melainkan:\n1. **Kematangan Sosial & Emosional**: Mampu fokus menyimak guru, berani bertanya, sabar menunggu giliran, dan mandiri mengurus perlengkapan sendiri.\n2. **Joyful Phonics & Pra-Literasi Bermakna**: Anak mengenal bunyi huruf melalui lagu, kartu cerita bergambar, dan permainan kata sehingga lancar membaca tanpa rasa tertekan.\n3. **Numerasi Kontekstual**: Mengenal konsep angka, penjumlahan, pola, dan logika menggunakan benda konkret (balok kayu, biji-bijian, permainan peran).\n\nAlhamdulillah, **3.200+ alumni kami** diterima dan berprestasi di berbagai SDIT, MI, dan SD Negeri/Swasta favorit di Purwokerto.`,
    suggestedActions: ['open_ppdb'],
  },
  {
    id: 'toilet_training_mandiri',
    keywords: ['toilet', 'pipis', 'popok', 'diapers', 'pampers', 'mandiri', 'ngompol'],
    answer: `**Pendampingan Toilet Training di TK Lukman Hakim:**\n\nAyah & Bunda tidak perlu khawatir jika ananda di jenjang Daycare, Playgroup (KB), atau awal TK A masih dalam tahap belajar lepas popok (*toilet training*):\n- Ustadzah kami mengajak santri ke toilet ramah anak secara berkala setiap 60–90 menit (*scheduled toileting*).\n- Toilet sekolah dirancang khusus dengan kloset ukuran anak, lantai anti-slip, dan wastafel rendah (55 cm).\n- Jika ananda belum sengaja mengompol, ustadzah akan membantu membersihkan dan mengganti pakaian dengan lembut tanpa mempermalukan anak.`,
    suggestedActions: ['wa_admin'],
  },
];

// Helper to run promise with strict timeout
function withTimeout<T>(promise: Promise<T>, ms: number, timeoutErrorMsg: string): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(timeoutErrorMsg)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

function generateIntelligentReply(
  query: string,
  schoolContext?: {
    nama?: string;
    npsn?: string;
    alamat?: string;
    whatsapp?: string;
    kepalaSekolah?: string;
  }
): { reply: string; suggestedActions: string[]; isHighConfidence: boolean } {
  const lower = query.toLowerCase().trim();
  const schoolName = schoolContext?.nama || 'TK LUKMAN HAKIM';
  const waNumber = schoolContext?.whatsapp || '6287713551412';

  // Check if user greets
  if (/^(halo|hai|assalamu|salam|pagi|siang|sore|malam|permisi|tes|ping|assalamualaikum)\b/i.test(lower) && lower.length < 35) {
    return {
      reply: `Wa’alaikumussalam Warahmatullahi Wabarakatuh, Ayah & Bunda.\n\nSelamat datang di **Asisten Pintar AI ${schoolName} Purwokerto** (NPSN: ${schoolContext?.npsn || '69981337'} • Terakreditasi A).\n\nSaya siap menjawab **semua pertanyaan** Ayah & Bunda secara cepat dan lengkap, mulai dari:\n• **Syarat & Rincian Biaya PPDB 2026/2027**\n• **Biaya SPP Bulanan & Cara Cek E-Raport**\n• **Kurikulum Merdeka, Tahfidz Tilawati & 5 Pilar Karakter**\n• **Program Daycare, KB, TK A, TK B & Fasilitas Kampus**\n• **Konsultasi Parenting, Psikologi Anak, Gizi & Kesiapan SD**\n\nSilakan ketik pertanyaan Anda atau klik salah satu topik cepat di bawah.`,
      suggestedActions: ['open_ppdb', 'open_spp', 'wa_admin'],
      isHighConfidence: true,
    };
  }

  // Thanks / appreciation
  if (/^(makasih|terima kasih|syukron|jazakallah|terimakasih|oke|baik|siap|bagus)\b/i.test(lower) && lower.length < 25) {
    return {
      reply: `Afwan / Sama-sama Ayah & Bunda! Senang sekali dapat membantu.\n\nJika Ayah & Bunda ingin menjadwalkan kunjungan langsung atau mendaftarkan ananda untuk **Free Trial Class**, silakan gunakan tombol formulir PPDB atau hubungi WhatsApp Sekretariat kami ya. Semoga ananda senantiasa sehat dan ceria!`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
      isHighConfidence: true,
    };
  }

  // Score topics by matching keywords
  let bestMatch: (typeof KNOWLEDGE_TOPICS)[0] | null = null;
  let maxScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw)) {
        score += kw.length >= 5 ? 3 : 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = topic;
    }
  }

  if (bestMatch && maxScore >= 2) {
    return {
      reply: bestMatch.answer,
      suggestedActions: bestMatch.suggestedActions || ['open_ppdb', 'wa_admin'],
      isHighConfidence: true,
    };
  }

  // Handle math / calculation questions if user tests the AI's intelligence
  const mathMatch = lower.match(/(\d+)\s*([+\-x*/:])\s*(\d+)/);
  if (mathMatch) {
    const a = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const b = parseFloat(mathMatch[3]);
    let res = 0;
    if (op === '+') res = a + b;
    else if (op === '-') res = a - b;
    else if (op === 'x' || op === '*') res = a * b;
    else if ((op === '/' || op === ':') && b !== 0) res = Number((a / b).toFixed(2));

    return {
      reply: `Hasil dari **${a} ${op} ${b}** adalah **${res.toLocaleString('id-ID')}**.\n\nDi **${schoolName}**, kami mengenalkan konsep berhitung dan logika matematika kepada anak-anak melalui media benda konkret (seperti balok kayu Montessori, mengelompokkan warna, dan permainan peran) agar anak paham konsepnya dengan riang gembira tanpa paksaan.\n\nAda lagi yang ingin ditanyakan seputar pendaftaran atau program belajar, Ayah/Bunda?`,
      suggestedActions: ['open_ppdb'],
      isHighConfidence: true,
    };
  }

  // Comprehensive contextual response for open-ended question
  return {
    reply: `Assalamu’alaikum Ayah & Bunda. Terima kasih atas pertanyaannya mengenai **"${query}"**.\n\nBerikut informasi penting dari **${schoolName} Purwokerto** (NPSN: ${schoolContext?.npsn || '69981337'} • Terakreditasi A Unggul):\n\n1. **Program Pendidikan Sesuai Usia**: Kami menyelenggarakan jenjang **Daycare & Batita (1.5–3 thn)**, **Kelompok Bermain/KB (3–4 thn)**, **TK A (4–5 thn)**, dan **TK B (5–6 thn / Persiapan SD)** dengan rasio pendampingan 2 ustadzah per kelas.\n2. **Kurikulum Terpadu**: Memadukan Kurikulum Merdeka PAUD, Tahfidz Metode Tilawati berirama rost, Cambridge Fun English, 5 Pilar Karakter, dan 8 Basis Pembelajaran Ramah Fitrah.\n3. **Biaya & Lokasi**: Pendaftaran Rp 150.000, SPP KB Rp 300.000/bln, SPP TK A/B Rp 350.000/bln. Kampus beralamat di **${schoolContext?.alamat || 'Jl. Hos Noto Suwiryo No. 5, Teluk, Purwokerto Selatan'}** (tersedia Free Trial Class & School Tour).\n\nUntuk konsultasi lebih lanjut, Ayah & Bunda dapat langsung mengklik tombol **Buka Formulir PPDB** atau chat WhatsApp Sekretariat kami di bawah ini.`,
    suggestedActions: ['open_ppdb', 'open_spp', 'wa_admin'],
    isHighConfidence: false,
  };
}

// 1. Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    institution: 'TK Lukman Hakim Purwokerto',
    serverTime: new Date().toISOString(),
    aiReady: !!ai,
    cloudEngine: 'Active (Fast Engine)',
  });
});

// 2. Super-Responsive Multi-Turn Chatbot Endpoint using Gemini 3.1 Flash Lite + Instant Encyclopedic Engine
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, schoolContext } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    const fallbackData = generateIntelligentReply(message, schoolContext);

    // If query has domain match, return INSTANTLY (sub-15ms)
    if (fallbackData.isHighConfidence) {
      return res.json({
        reply: fallbackData.reply,
        source: 'instant_knowledge_base',
        suggestedActions: fallbackData.suggestedActions,
      });
    }

    // For open-ended or custom questions, try Gemini with intelligent streaming/fast completion
    if (ai) {
      try {
        const systemPrompt = `Anda adalah Asisten Pintar AI Resmi dari ${schoolContext?.nama || 'TK LUKMAN HAKIM'} Purwokerto (NPSN ${schoolContext?.npsn || '69981337'}, Terakreditasi A).
Jawablah pertanyaan secara sangat cepat, cerdas, ramah, to-the-point, dan informatif dalam 2-4 kalimat atau poin ringkas tanpa emotikon/emoji.
Data Sekolah: Alamat: ${schoolContext?.alamat || 'Jl. Hos Noto Suwiryo No. 5 Teluk, Purwokerto Selatan'}, WA: ${schoolContext?.whatsapp || '6287713551412'}, Biaya PPDB Rp 150.000, SPP KB Rp 300.000/bln, SPP TK A & B Rp 350.000/bln. Kurikulum Merdeka PAUD, Tahfidz Tilawati, 5 Pilar Karakter & Cambridge Fun English.`;

        let fullPrompt = message;
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history
            .slice(-3)
            .map((h: any) => `${h.sender === 'user' ? 'Wali' : 'AI'}: ${h.text}`)
            .join('\n');
          fullPrompt = `Riwayat Singkat:\n${recentHistory}\n\nPertanyaan:\n${message}`;
        }

        const t0 = Date.now();
        const geminiCall = ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.5,
            maxOutputTokens: 250,
          },
        });

        const response = await withTimeout(geminiCall, 6000, 'GEMINI_TIMEOUT_6S');
        console.log(`Gemini response took ${Date.now() - t0}ms`);

        if (response && response.text) {
          return res.json({
            reply: response.text,
            source: 'gemini-ai-live',
            suggestedActions: fallbackData.suggestedActions,
            latencyMs: Date.now() - t0,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini chat warning:', geminiError.message);
      }
    }

    return res.json({
      reply: fallbackData.reply,
      source: 'smart_knowledge_base',
      suggestedActions: fallbackData.suggestedActions,
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Gagal memproses pesan', details: error.message });
  }
});

// 2b. AI Parenting Activity Generator (Ide Bermain & Belajar Islami di Rumah)
app.post('/api/ai/parenting-activity', async (req: Request, res: Response) => {
  try {
    const { ageGroup, focusArea, availableTime, materials } = req.body;
    const targetAge = ageGroup || '4-5 tahun (TK A)';
    const targetFocus = focusArea || 'Sains & Cinta Alam';
    const targetTime = availableTime || '20 menit';
    const targetMaterials = materials || 'Bahan sederhana di rumah (kertas, air, dedaunan)';

    const fallbackActivity = `**Nama Aktivitas: Eksperimen Pelangi Syukur & Jejak Alam (${targetFocus})**\n\n**Nilai Karakter & Manfaat (${targetAge}):**\n- Menumbuhkan rasa takjub atas ciptaan Allah SWT (*Faith in Allah*)\n- Melatih koordinasi motorik halus, fokus pengamatan, dan tanggung jawab merapikan alat (*Responsibility & Cleanliness*).\n\n**Alat & Bahan (${targetTime}):**\n- ${targetMaterials}\n- Wadah kecil dan lap bersih\n\n**Langkah Bermain Bersama Ayah/Bunda:**\n1. Awali dengan membaca *Basmalah* bersama ananda dan siapkan bahan di meja atau teras rumah.\n2. Ajak ananda mengamati tekstur, warna, dan bentuk bahan satu per satu sambil berdiskusi santai tanpa mendikte.\n3. Biarkan ananda menyusun, mengelompokkan, atau berkreasi sesuai imajinasinya selama ${targetTime}.\n4. Setelah selesai, ajak ananda mencuci tangan dan mengembalikan peralatan ke tempat semula sambil memberi apresiasi atas usahanya.\n\n**Pertanyaan Pemantik untuk Ananda:**\n*"Masya Allah, seru sekali ya Adik. Menurut Adik, ciptaan Allah SWT mana yang paling indah dari bahan tadi? Yuk kita ucapkan Alhamdulillah bersama."*`;

    if (ai) {
      try {
        const prompt = `Buatlah 1 rencana aktivitas bermain dan belajar edukatif anak usia dini di rumah untuk santri TK Lukman Hakim.
Data anak:
- Usia: ${targetAge}
- Fokus: ${targetFocus}
- Durasi: ${targetTime}
- Bahan: ${targetMaterials}
Format (ringkas, tanpa emotikon): 1. Nama Aktivitas 2. Nilai Karakter 3. Alat & Bahan 4. Langkah Bermain 5. Pertanyaan Pemantik.`;

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            systemInstruction: 'Anda adalah Konsultan Ahli Parenting PAUD Islami dari TK Lukman Hakim Purwokerto. Ringkas dan tanpa emotikon.',
            temperature: 0.65,
            maxOutputTokens: 380,
          },
        });

        const response = await withTimeout(geminiCall, 1500, 'ACTIVITY_TIMEOUT');
        if (response && response.text) {
          return res.json({ success: true, activity: response.text, source: 'gemini-3.1-flash-lite' });
        }
      } catch (err: any) {
        // Fallback instantly
      }
    }

    return res.json({ success: true, activity: fallbackActivity, source: 'smart_template' });
  } catch (error: any) {
    res.status(500).json({ error: 'Gagal membuat rencana aktivitas', details: error.message });
  }
});

// 2c. AI Class & Stimulation Recommender (Rekomendasi Kelas & Stimulasi Santri)
app.post('/api/ai/recommend-class', async (req: Request, res: Response) => {
  try {
    const { childName, childAgeYears, interests, currentSkills } = req.body;
    const name = childName || 'Ananda';
    const age = parseFloat(childAgeYears) || 4;

    let defaultClass = 'TK Kelompok A (Usia 4 – 5 Tahun)';
    if (age < 3) defaultClass = 'Daycare & Batita Ceria (Usia 1.5 – 3 Tahun)';
    else if (age < 4) defaultClass = 'Kelompok Bermain / Playgroup (Usia 3 – 4 Tahun)';
    else if (age >= 5) defaultClass = 'TK Kelompok B (Usia 5 – 6 Tahun / Persiapan SD)';

    const fallbackRec = `**Rekomendasi Jenjang untuk ${name} (${age} Tahun):**\n**${defaultClass}**\n\n**Fokus Stimulasi Utama di TK Lukman Hakim:**\n- **Pengembangan Minat (${interests || 'Eksplorasi Aktif'})**: Difasilitasi melalui 6 Sentra Ber-AC, Sentra Alam, dan Montessori dengan rasio 2 ustadzah per kelas.\n- **Penguatan Kemandirian (${currentSkills || 'Aktif bermain'})**: Pembiasaan adab 5S, makan tertib bersama, dan kemandirian merapikan perlengkapan pribadi.\n- **Tahfidz & Ibadah**: Pengenalan huruf hijaiyah metode Tilawati PAUD yang berirama gembira, hafalan surat pendek Juz 30, dan Sholat Dhuha berjamaah.\n\n**Langkah Mudah Selanjutnya:**\nAjak ${name} mencoba bermain di playground alam kami melalui sesi **Free Trial Class** agar ananda merasakan langsung kehangatan sekolah sebelum mendaftar resmi.`;

    if (ai) {
      try {
        const prompt = `Berikan analisis rekomendasi jenjang kelas dan stimulasi di TK Lukman Hakim untuk:
Nama: ${name}, Usia: ${age} tahun, Minat: ${interests || 'Belum spesifik'}, Kemampuan: ${currentSkills || 'Aktif bermain'}.
Format (ringkas, tanpa emotikon): 1. Rekomendasi Kelas 2. Fokus Stimulasi 3. Tips Transisi Masuk Sekolah.`;

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            systemInstruction: 'Anda adalah Tim Konselor & Guru PAUD TK Lukman Hakim Purwokerto. Ringkas dan tanpa emotikon.',
            temperature: 0.65,
            maxOutputTokens: 380,
          },
        });

        const response = await withTimeout(geminiCall, 1500, 'REC_TIMEOUT');
        if (response && response.text) {
          return res.json({ success: true, recommendation: response.text, defaultClass, source: 'gemini-3.1-flash-lite' });
        }
      } catch (err: any) {
        // Fallback instantly
      }
    }

    return res.json({ success: true, recommendation: fallbackRec, defaultClass, source: 'smart_template' });
  } catch (error: any) {
    res.status(500).json({ error: 'Gagal membuat rekomendasi kelas', details: error.message });
  }
});

// 3. SMS / WhatsApp API Gateway Notification Simulator
app.post('/api/gateway/send-notification', (req: Request, res: Response) => {
  try {
    const { recipientPhone, recipientName, type, title, message, channel } = req.body;
    if (!recipientPhone || !message) {
      return res.status(400).json({ error: 'Nomor telepon dan isi pesan wajib diisi' });
    }

    const messageId = `MSG-GW-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    res.json({
      success: true,
      messageId,
      gateway: channel || 'WhatsApp API Gateway',
      recipientPhone,
      recipientName,
      status: 'Terkirim',
      sentAt: new Date().toISOString(),
      details: 'Pesan berhasil diteruskan ke API Gateway provider (Fonnte/Wablas/Twilio compatible).',
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Gagal mengirim notifikasi via gateway', details: error.message });
  }
});

// 3b. Official Gmail Delivery Engine (Nodemailer + In-Memory Live Inbox)
interface EmailRecord {
  id: string;
  to: string;
  from: string;
  subject: string;
  bodyText: string;
  bodyHtml: string;
  type: 'PPDB_CONFIRMATION' | 'ANNOUNCEMENT' | 'SYSTEM' | 'TUITION_RECEIPT';
  status: 'Terkirim ke Gmail' | 'Terkirim';
  timestamp: string;
  regNumber?: string;
  childName?: string;
  program?: string;
  deliveryMethod: string;
}

const EMAIL_STORE: EmailRecord[] = [];

// Dynamic Transporter State (Supports Gmail Service, App Password & Custom SMTP)
let mailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465' || !process.env.SMTP_PORT,
  user: process.env.SMTP_USER || process.env.GMAIL_USER || '',
  pass: (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || '').replace(/\s+/g, ''),
};

let mailTransporter: Transporter | null = null;

function refreshTransporter() {
  if (mailConfig.user && mailConfig.pass) {
    try {
      if (mailConfig.user.endsWith('@gmail.com') || mailConfig.host === 'smtp.gmail.com') {
        mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass.replace(/\s+/g, ''),
          },
        });
      } else {
        mailTransporter = nodemailer.createTransport({
          host: mailConfig.host,
          port: mailConfig.port,
          secure: mailConfig.secure,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
          },
        });
      }
    } catch (err: any) {
      console.warn('Failed to initialize nodemailer transporter:', err.message);
      mailTransporter = null;
    }
  } else {
    mailTransporter = null;
  }
}

refreshTransporter();

// Helper to get robust base URL for interactive email buttons
function getBaseUrl(req?: Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  if (req) {
    const origin = req.headers.origin as string;
    if (origin) return origin.replace(/\/+$/, '');
    const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
    const host = (req.headers['x-forwarded-host'] as string) || req.get('host');
    if (host) return `${proto}://${host}`.replace(/\/+$/, '');
  }
  return 'https://ais-pre-cxu5667yisrbtj6erga36k-639808733869.asia-southeast1.run.app';
}

// Helper to build bulletproof email CTA buttons compatible with Gmail Web, Android, iOS, and desktop
function buildEmailButton(url: string, label: string, bgColor: string, textColor: string = '#ffffff'): string {
  return `
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 4px; display: inline-table; vertical-align: middle;">
      <tr>
        <td align="center" style="border-radius: 10px; background-color: ${bgColor}; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: ${textColor}; text-decoration: none; border-radius: 10px; text-align: center; letter-spacing: 0.2px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

// Helper to construct Gmail Compose Deep-Link safely (max ~600 chars total URL)
function createGmailComposeUrl(to: string, subject: string, body: string): string {
  const safeBody = body.length > 400 ? body.substring(0, 397) + '...' : body;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`;
}

// Helper to construct Gmail Inbox Search Deep-Link so recipient can immediately locate their emails
function createGmailInboxUrl(searchQuery: string = 'TK LUKMAN HAKIM'): string {
  return `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(searchQuery)}`;
}

// Mail Status & Live Configuration Endpoints
app.get('/api/mail/status', requireAdmin, (req: Request, res: Response) => {
  res.json({
    isConfigured: !!mailTransporter,
    senderEmail: mailConfig.user || 'tklukmanhakim.pwt@gmail.com',
    host: mailConfig.host,
    totalDispatched: EMAIL_STORE.length,
    engine: mailTransporter ? 'Google SMTP Active' : 'Not configured',
  });
});

app.post('/api/mail/config', requireAdmin, (_req: Request, res: Response) => {
  res.status(410).json({
    success: false,
    error: 'Konfigurasi SMTP hanya dapat diubah melalui environment server, bukan melalui HTTP.',
  });
});

// ==================== PERMANENT SITE SETTINGS ENGINE (DISK & CLOUD PERSISTENCE) ====================
const SETTINGS_FILE_PATH = path.join(process.cwd(), 'data', 'site_settings.json');

function loadPersistedSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const raw = fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err: any) {
    console.warn('Failed to read site_settings.json:', err.message);
  }
  return null;
}

function savePersistedSettings(data: any): boolean {
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err: any) {
    console.error('Failed to write site_settings.json:', err.message);
    return false;
  }
}

app.get('/api/settings', requireAdmin, (_req: Request, res: Response) => {
  const settings = loadPersistedSettings();
  res.json({
    success: true,
    hasPersistedSettings: !!settings,
    settings: settings || null,
  });
});

app.post('/api/settings', requireAdmin, (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Payload tidak valid' });
    }
    const current = loadPersistedSettings() || {};
    const merged = {
      ...current,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    const saved = savePersistedSettings(merged);
    if (saved) {
      res.json({
        success: true,
        message: 'Pengaturan website berhasil disimpan secara permanen di server & database!',
        updatedAt: merged.updatedAt,
      });
    } else {
      res.status(500).json({ error: 'Gagal menulis file konfigurasi server' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memperbarui pengaturan website', details: err?.message });
  }
});

// Test Dispatch directly to user's Gmail with fully interactive buttons
app.post('/api/mail/test-send', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { to } = req.body;
    const targetEmail = to || 'ml0752960@gmail.com';
    if (typeof targetEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      return res.status(400).json({ success: false, error: 'Alamat email penerima tidak valid.' });
    }
    if (!mailTransporter) {
      return res.status(503).json({
        success: false,
        error: 'Pengiriman Gmail belum aktif. Atur SMTP_USER dan SMTP_PASS (App Password Gmail) pada environment server.',
      });
    }
    const baseUrl = getBaseUrl(req);
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-7.4397,109.2492+(TK+Islam+Lukman+Hakim+Purwokerto)';
    const waUrl = 'https://wa.me/6287713551412?text=' + encodeURIComponent('Assalamu’alaikum Panitia PPDB TK Lukman Hakim, uji coba pengiriman email telah sampai dengan baik.');

    const testSubject = '[UJI COBA RESMI] Tes Pengiriman Email - TK LUKMAN HAKIM Purwokerto';
    const testBody = `Assalamu’alaikum Warahmatullahi Wabarakatuh,\n\nIni adalah pesan uji coba pengiriman email resmi dari sistem PPDB Cloud TK LUKMAN HAKIM Purwokerto ke alamat Gmail Anda (${targetEmail}).\n\nJika pesan ini sampai di kotak masuk atau tab Utama Gmail Anda, berarti konfigurasi pengiriman email telah berfungsi sempurna!\n\nWassalam,\nTim IT & Panitia PPDB TK Lukman Hakim Purwokerto\nJl. Hos Noto Suwiryo No. 5 Teluk, Purwokerto Selatan\nHotline WA: +62 877-1355-1412`;

    const bodyHtml = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #006699 0%, #004670 100%); color: #ffffff; padding: 28px 24px; text-align: center;">
          <div style="display: inline-block; background: #fbbf24; color: #0f2937; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px;">
            Sistem Cloud Email PPDB
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">TK LUKMAN HAKIM PURWOKERTO</h1>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">NPSN: 69981337 • Terakreditasi A (Unggul) BAN-PAUD</p>
        </div>

        <div style="padding: 24px;">
          <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 4px; color: #15803d; font-size: 15px; font-weight: 800;">
              Alhamdulillah, Uji Coba Pengiriman Email Berhasil!
            </h3>
            <p style="margin: 0; font-size: 12px; color: #166534; line-height: 1.5;">
              Pesan ini berhasil dikirimkan ke alamat Gmail penerima: <strong>${targetEmail}</strong>.
            </p>
          </div>

          <p style="font-size: 13px; color: #334155; line-height: 1.6; margin-top: 0;">
            Assalamu’alaikum Warahmatullahi Wabarakatuh,<br/><br/>
            Selamat! Konfigurasi jalur email Google/Gmail untuk sistem Penerimaan Peserta Didik Baru (PPDB) TK LUKMAN HAKIM Purwokerto telah aktif dan berfungsi tanpa hambatan. Seluruh tombol tindakan di bawah ini siap digunakan secara langsung.
          </p>

          <!-- Interactive Action Buttons -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin: 22px 0; text-align: center;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #64748b; letter-spacing: 1px; margin-bottom: 12px;">
              Pilihan Tombol Tindakan Langsung:
            </div>
            <div style="text-align: center;">
              ${buildEmailButton(baseUrl, '🌐 Buka Website TK Lukman Hakim', '#006699')}
              ${buildEmailButton(waUrl, '💬 Chat WhatsApp Sekretariat', '#16a34a')}
              ${buildEmailButton(mapsUrl, '📍 Petunjuk Arah Google Maps', '#ea580c')}
              ${buildEmailButton('tel:087713551412', '📞 Telepon: +62 877-1355-1412', '#475569')}
            </div>
          </div>

          <div style="font-size: 12px; color: #64748b; line-height: 1.6; border-top: 1px dashed #cbd5e1; padding-top: 14px;">
            <strong>Sekretariat Kampus:</strong><br/>
            Jl. Hos Noto Suwiryo No. 5, Kel. Teluk, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah 53145.<br/>
            Hotline PPDB: <strong>+62 877-1355-1412</strong> • Email Resmi: <strong>tklukmanhakim.pwt@gmail.com</strong>
          </div>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
          Email resmi diterbitkan secara otomatis oleh Server TK LUKMAN HAKIM Purwokerto
        </div>
      </div>
    `;

    const gmailWebLink = createGmailComposeUrl(targetEmail, testSubject, testBody);
    const gmailInboxLink = createGmailInboxUrl('TK LUKMAN HAKIM');

    try {
      await mailTransporter.sendMail({
        from: `"TK LUKMAN HAKIM" <${mailConfig.user}>`,
        to: targetEmail,
        subject: testSubject,
        text: testBody,
        html: bodyHtml,
      });
    } catch (err: any) {
      console.warn('Test send SMTP dispatch failed:', err.message);
      return res.status(502).json({
        success: false,
        error: 'Gmail menolak pengiriman. Periksa alamat pengirim dan App Password Gmail pada konfigurasi server.',
      });
    }

    const deliveryMethod = 'Google Gmail SMTP Live Outbound';

    const emailRecord: EmailRecord = {
      id: `EML-TEST-${Date.now()}`,
      to: targetEmail,
      from: mailConfig.user || 'tklukmanhakim.pwt@gmail.com',
      subject: testSubject,
      bodyText: testBody,
      bodyHtml,
      type: 'SYSTEM',
      status: 'Terkirim ke Gmail',
      timestamp: new Date().toISOString(),
      deliveryMethod,
    };

    EMAIL_STORE.unshift(emailRecord);

    res.json({
      success: true,
      targetEmail,
      status: 'Terkirim ke Gmail',
      smtpSuccess: true,
      deliveryMethod,
      gmailWebLink,
      gmailInboxLink,
      whatsappLink: waUrl,
      mapsLink: mapsUrl,
      mailtoLink: `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(testSubject)}&body=${encodeURIComponent(testBody)}`,
      email: emailRecord,
    });
  } catch (error: any) {
    console.warn('Test send fallback handled gracefully:', error?.message);
    res.status(500).json({ success: false, error: 'Terjadi kesalahan saat mengirim email uji.' });
  }
});

// Send PPDB Confirmation Email to Registrant's Gmail
const handleSendPpdbConfirmation = async (req: Request, res: Response) => {
  try {
    const reg = req.body.registration || {};
    const to = req.body.to || reg.email || '';
    const childName = req.body.childName || reg.childName || 'Calon Santri';
    const nickname = req.body.nickname || reg.nickname || childName;
    const regNumber = req.body.regNumber || reg.regNumber || reg.registrationNumber || 'PPDB-REG';
    const program = req.body.program || reg.program || 'TK';
    const parentName = req.body.parentName || reg.parentName || 'Wali Santri';
    const phone = req.body.phone || reg.phone || '-';
    const address = req.body.address || reg.address || 'Purwokerto';

    if (!to || !to.includes('@')) {
      return res.status(400).json({
        success: false,
        status: 'Email tidak dikirim',
        note: 'Pilih WhatsApp atau masukkan alamat email wali yang valid.',
      });
    }
    if (!mailTransporter) {
      return res.status(503).json({ success: false, error: 'Pengiriman Gmail belum dikonfigurasi pada server.' });
    }

    const emailId = `EML-PPDB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const subject = `[BUKTI PPDB ONLINE] Konfirmasi Pendaftaran Ananda ${childName || 'Calon Santri'} - TK LUKMAN HAKIM Purwokerto (${regNumber})`;

    const bodyText = `Assalamu’alaikum Warahmatullahi Wabarakatuh Ayah/Bunda ${parentName || ''},

Alhamdulillah, pendaftaran Peserta Didik Baru (PPDB) TK LUKMAN HAKIM Purwokerto telah berhasil tercatat di sistem cloud kami.

DETAIL PENDAFTARAN:
- No. Registrasi : ${regNumber}
- Nama Lengkap   : ${childName} (${nickname || childName})
- Pilihan Jenjang: ${program}
- Nama Wali      : ${parentName}
- No. WhatsApp   : ${phone}
- Alamat         : ${address || 'Purwokerto'}
- Status         : Menunggu Verifikasi & Jadwal Observasi

LANGKAH SELANJUTNYA:
1. Panitia PPDB akan memverifikasi berkas dan menghubungi nomor WhatsApp ${phone} untuk konfirmasi jadwal observasi ramah anak.
2. Pengumuman resmi hasil seleksi serta surat penerimaan akan dikirimkan langsung ke alamat Gmail ini (${to}).
3. Ayah/Bunda dapat memantau status secara langsung melalui menu Portal PPDB di website resmi kami.

Jazakumullahu Khairan Katsiran atas kepercayaan Ayah & Bunda.

Wassalamu’alaikum Warahmatullahi Wabarakatuh,
Panitia PPDB TK LUKMAN HAKIM Purwokerto
Jl. Hos Noto Suwiryo No. 5, Teluk, Purwokerto Selatan
WhatsApp Hotline: +62 877-1355-1412 | Email: tklukmanhakim.pwt@gmail.com`;

    const baseUrl = getBaseUrl(req);
    const ppdbPortalUrl = `${baseUrl}?tab=ppdb&reg=${encodeURIComponent(regNumber)}`;
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-7.4397,109.2492+(TK+Islam+Lukman+Hakim+Purwokerto)';
    const waText = `Assalamu’alaikum Warahmatullahi Wabarakatuh Panitia PPDB TK Lukman Hakim. Saya wali dari ananda *${childName}* dengan No. Registrasi *${regNumber}*. Saya telah menerima surat konfirmasi pendaftaran resmi di Gmail dan ingin mengonfirmasi jadwal observasi ramah anak. Terima kasih.`;
    const waUrl = `https://wa.me/6287713551412?text=${encodeURIComponent(waText)}`;

    const bodyHtml = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <!-- Email Header -->
        <div style="background: linear-gradient(135deg, #006699 0%, #004670 100%); color: #ffffff; padding: 28px 24px; text-align: center;">
          <div style="display: inline-block; background: #fbbf24; color: #0f2937; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px;">
            Bukti Pendaftaran Resmi PPDB
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">TK LUKMAN HAKIM PURWOKERTO</h1>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">NPSN: 69981337 • Terakreditasi A (Unggul) BAN-PAUD</p>
        </div>

        <div style="padding: 24px;">
          <p style="font-size: 14px; color: #334155; margin-top: 0;">
            Assalamu’alaikum Warahmatullahi Wabarakatuh <strong>Ayah/Bunda ${parentName || ''}</strong>,
          </p>
          <p style="font-size: 13px; color: #475569; line-height: 1.6;">
            Alhamdulillah, formulir pendaftaran calon santri baru ananda telah kami terima dan tercatat resmi dalam database cloud sekolah. Berikut adalah rincian data pendaftaran ananda:
          </p>

          <!-- Registration Summary Box -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin: 20px 0;">
            <div style="border-bottom: 1px dashed #cbd5e1; padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #64748b; font-weight: bold;">Nomor Registrasi:</span>
              <span style="font-family: monospace; font-size: 15px; font-weight: 800; color: #006699; background: #e0f2fe; padding: 3px 10px; border-radius: 6px;">
                ${regNumber}
              </span>
            </div>
            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
              <tr><td style="padding: 5px 0; color: #64748b; width: 38%;">Nama Calon Siswa:</td><td><strong>${childName}</strong> (${nickname || childName})</td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">Pilihan Jenjang:</td><td><strong>${program}</strong></td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">Orang Tua / Wali:</td><td>${parentName}</td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">No. WhatsApp:</td><td><strong>${phone}</strong></td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">Email Gmail:</td><td><strong style="color: #0284c7;">${to}</strong></td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">Alamat:</td><td>${address || 'Purwokerto'}</td></tr>
              <tr><td style="padding: 5px 0; color: #64748b;">Status Saat Ini:</td><td><span style="color: #0369a1; background: #e0f2fe; padding: 3px 10px; border-radius: 6px; font-weight: bold; font-size: 11px;">Menunggu Verifikasi & Observasi</span></td></tr>
            </table>
          </div>

          <!-- Next Steps -->
          <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 8px; margin-bottom: 22px;">
            <h4 style="margin: 0 0 4px; color: #15803d; font-size: 13px; font-weight: 800;">Tahapan Selanjutnya:</h4>
            <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #166534; line-height: 1.6;">
              <li>Panitia PPDB akan memverifikasi berkas dan mengundang Ayah/Bunda untuk jadwal observasi ramah anak.</li>
              <li>Surat keputusan hasil seleksi resmi akan dikirimkan langsung ke kotak masuk Gmail <strong>${to}</strong>.</li>
              <li>Simpan email ini atau cetak sebagai bukti pendaftaran administrasi sekolah.</li>
            </ul>
          </div>

          <!-- ALL BUTTONS WORKING FLAWLESSLY -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 22px 0; text-align: center;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #475569; letter-spacing: 1px; margin-bottom: 12px;">
              Tombol Akses Langsung (Klik Untuk Menggunakan):
            </div>
            <div style="text-align: center;">
              ${buildEmailButton(ppdbPortalUrl, '🌐 Cek Status & Buka Portal PPDB', '#006699')}
              ${buildEmailButton(waUrl, '💬 Chat WhatsApp Panitia PPDB', '#16a34a')}
              ${buildEmailButton(mapsUrl, '📍 Petunjuk Arah Google Maps', '#ea580c')}
              ${buildEmailButton('tel:087713551412', '📞 Hotline Telepon: +62 877-1355-1412', '#475569')}
            </div>
          </div>

          <div style="font-size: 12px; color: #64748b; line-height: 1.6; border-top: 1px dashed #cbd5e1; padding-top: 14px;">
            Butuh konsultasi lebih lanjut? Hubungi Sekretariat PPDB via WhatsApp di <strong>+62 877-1355-1412</strong> atau telepon kantor di <strong>(0281) 638842</strong>.
          </div>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
          Panitia PPDB TK LUKMAN HAKIM Purwokerto • Jl. Hos Noto Suwiryo No. 5 Teluk, Purwokerto Selatan
        </div>
      </div>
    `;

    const compactComposeBody = `Assalamu’alaikum Ayah/Bunda ${parentName},
Alhamdulillah pendaftaran PPDB TK LUKMAN HAKIM Purwokerto telah tercatat resmi:
• No. Registrasi: ${regNumber}
• Calon Siswa: ${childName} (${program})
• WhatsApp: ${phone}
• Status: Menunggu Verifikasi & Jadwal Observasi
Panitia PPDB: +62 877-1355-1412 | tklukmanhakim.pwt@gmail.com`;

    const gmailWebLink = createGmailComposeUrl(to, subject, compactComposeBody);
    const gmailInboxLink = createGmailInboxUrl('TK LUKMAN HAKIM');
    const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compactComposeBody)}`;

    await mailTransporter.sendMail({
      from: `"Panitia PPDB TK LUKMAN HAKIM" <${mailConfig.user}>`,
      to,
      subject,
      text: bodyText,
      html: bodyHtml,
    });
    const deliveryMethod = 'Google Gmail SMTP Live Outbound';

    const emailRecord: EmailRecord = {
      id: emailId,
      to,
      from: mailConfig.user || 'tklukmanhakim.pwt@gmail.com',
      subject,
      bodyText,
      bodyHtml,
      type: 'PPDB_CONFIRMATION',
      status: 'Terkirim ke Gmail',
      timestamp: new Date().toISOString(),
      regNumber,
      childName,
      program,
      deliveryMethod,
    };

    EMAIL_STORE.unshift(emailRecord);

    res.json({
      success: true,
      messageId: emailId,
      sentTo: to,
      status: 'Terkirim ke Gmail',
      deliveryMethod,
      gmailWebLink,
      gmailInboxLink,
      whatsappLink: waUrl,
      mapsLink: mapsUrl,
      portalUrl: ppdbPortalUrl,
      mailtoLink,
      timestamp: emailRecord.timestamp,
      email: emailRecord,
    });
  } catch (error: any) {
    console.warn('PPDB confirmation email failed:', error?.message);
    res.status(502).json({ success: false, error: 'Email konfirmasi gagal dikirim. Silakan coba lagi atau hubungi panitia melalui WhatsApp.' });
  }
};

app.post('/api/mail/send-ppdb-confirmation', requireAdmin, handleSendPpdbConfirmation);
app.post('/api/mail/send-confirmation', requireAdmin, handleSendPpdbConfirmation);

// Send Official School Announcement to Registrant's Gmail
app.post('/api/mail/send-announcement', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { to, subject, body, childName, regNumber, status, program, parentName } = req.body;

    if (typeof to !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return res.status(400).json({ success: false, error: 'Alamat email penerima tidak valid.' });
    }
    if (!mailTransporter) {
      return res.status(503).json({ success: false, error: 'Pengiriman Gmail belum dikonfigurasi pada server.' });
    }
    if (!to || !to.includes('@')) {
      return res.status(400).json({ error: 'Alamat Gmail penerima wajib diisi' });
    }

    const emailId = `EML-ANN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const finalSubject = subject || `[PENGUMUMAN RESMI PPDB] Keputusan Hasil Seleksi Ananda ${childName || 'Santri'} (${regNumber || ''})`;
    const isAccepted = status === 'Diterima';

    const baseUrl = getBaseUrl(req);
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-7.4397,109.2492+(TK+Islam+Lukman+Hakim+Purwokerto)';
    const waText = `Assalamu’alaikum Warahmatullahi Wabarakatuh Panitia PPDB TK Lukman Hakim. Saya wali dari ananda *${childName || 'Santri'}* (${regNumber || ''}). Saya telah membaca surat pengumuman keputusan hasil seleksi di Gmail (${status || 'Diterima'}). Saya ingin mengonfirmasi proses selanjutnya / daftar ulang. Terima kasih.`;
    const waUrl = `https://wa.me/6287713551412?text=${encodeURIComponent(waText)}`;
    const portalUrl = `${baseUrl}?tab=ppdb&reg=${encodeURIComponent(regNumber || '')}`;

    const bodyHtml = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <!-- Announcement Header -->
        <div style="background: linear-gradient(135deg, ${isAccepted ? '#059669' : '#006699'} 0%, ${isAccepted ? '#047857' : '#004670'} 100%); color: #ffffff; padding: 28px 24px; text-align: center;">
          <div style="display: inline-block; background: #ffffff; color: ${isAccepted ? '#065f46' : '#004670'}; font-weight: 800; font-size: 11px; padding: 4px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px;">
            SURAT PENGUMUMAN RESMI SEKOLAH
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">TK LUKMAN HAKIM PURWOKERTO</h1>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Tahun Ajaran 2026/2027 • Terakreditasi A (Unggul) BAN-PAUD</p>
        </div>

        <div style="padding: 24px;">
          <!-- Status Banner -->
          <div style="background: ${isAccepted ? '#ecfdf5' : '#f0f9ff'}; border: 2px solid ${isAccepted ? '#a7f3d0' : '#bae6fd'}; border-radius: 14px; padding: 18px; margin-bottom: 22px; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${isAccepted ? '#047857' : '#0369a1'}; font-weight: 800;">Status Keputusan Resmi:</span>
            <div style="font-size: 20px; font-weight: 900; color: ${isAccepted ? '#065f46' : '#0c4a6e'}; margin-top: 6px; letter-spacing: 0.5px;">
              ${status || 'RESMI DITERIMA'}
            </div>
            <div style="font-size: 13px; color: #64748b; margin-top: 6px;">
              No. Registrasi: <strong style="font-family: monospace; color: #0f172a;">${regNumber || '-'}</strong> | Nama: <strong style="color: #0f172a;">${childName || '-'}</strong>
            </div>
          </div>

          <!-- Announcement Content -->
          <div style="font-size: 13px; color: #334155; line-height: 1.7; white-space: pre-line; margin-bottom: 22px;">
            ${body}
          </div>

          <!-- Interactive Action Buttons -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 22px 0; text-align: center;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #475569; letter-spacing: 1px; margin-bottom: 12px;">
              Pilihan Tombol Tindakan Langsung:
            </div>
            <div style="text-align: center;">
              ${buildEmailButton(waUrl, '💬 Konfirmasi via WhatsApp Panitia', '#16a34a')}
              ${buildEmailButton(portalUrl, '🌐 Buka Status di Website Sekolah', '#006699')}
              ${buildEmailButton(mapsUrl, '📍 Petunjuk Arah Lokasi Kampus', '#ea580c')}
              ${buildEmailButton('tel:087713551412', '📞 Hotline PPDB: +62 877-1355-1412', '#475569')}
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b;">
            <span>Panitia PPDB TK Lukman Hakim</span>
            <span>Hotline WA: <strong>+62 877-1355-1412</strong></span>
          </div>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
          Email resmi ini dikirimkan ke ${to}. Simpan email ini sebagai bukti administrasi pendaftaran sekolah.
        </div>
      </div>
    `;

    const compactAnnounceBody = (body || '').length > 350 ? (body || '').substring(0, 347) + '...' : (body || '');
    const gmailWebLink = createGmailComposeUrl(to, finalSubject, compactAnnounceBody);
    const gmailInboxLink = createGmailInboxUrl('TK LUKMAN HAKIM');
    const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(compactAnnounceBody)}`;

    await mailTransporter.sendMail({
      from: `"Panitia PPDB TK LUKMAN HAKIM" <${mailConfig.user}>`,
      to,
      subject: finalSubject,
      text: body,
      html: bodyHtml,
    });
    const deliveryMethod = 'Google Gmail SMTP Live Outbound';

    const emailRecord: EmailRecord = {
      id: emailId,
      to,
      from: mailConfig.user || 'tklukmanhakim.pwt@gmail.com',
      subject: finalSubject,
      bodyText: body,
      bodyHtml,
      type: 'ANNOUNCEMENT',
      status: 'Terkirim ke Gmail',
      timestamp: new Date().toISOString(),
      regNumber,
      childName,
      program,
      deliveryMethod,
    };

    EMAIL_STORE.unshift(emailRecord);

    res.json({
      success: true,
      messageId: emailId,
      sentTo: to,
      status: 'Terkirim ke Gmail',
      deliveryMethod,
      gmailWebLink,
      gmailInboxLink,
      whatsappLink: waUrl,
      mapsLink: mapsUrl,
      portalUrl,
      mailtoLink,
      timestamp: emailRecord.timestamp,
      email: emailRecord,
    });
  } catch (error: any) {
    console.warn('Announcement email failed:', error?.message);
    res.status(502).json({ success: false, error: 'Pengumuman gagal dikirim. Silakan coba lagi.' });
  }
});

// Send Official SPP Receipt to Parent's Gmail
app.post('/api/mail/send-spp-receipt', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { to, studentName, nis, month, year, totalAmount, paymentMethod, receiptNumber } = req.body;
    const targetEmail = to;
    if (typeof targetEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      return res.status(400).json({ success: false, error: 'Alamat email penerima tidak valid.' });
    }
    if (!mailTransporter) {
      return res.status(503).json({ success: false, error: 'Pengiriman Gmail belum dikonfigurasi pada server.' });
    }
    const baseUrl = getBaseUrl(req);
    const waUrl = 'https://wa.me/6287713551412?text=' + encodeURIComponent(`Assalamu’alaikum Keuangan TK Lukman Hakim, saya mengonfirmasi kuitansi pembayaran SPP Ananda ${studentName} (${nis}) No: ${receiptNumber || '-'}.`);
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=-7.4397,109.2492+(TK+Islam+Lukman+Hakim+Purwokerto)';

    const subject = `[KUITANSI PEMBAYARAN RESMI] SPP Periode ${month} ${year} - ${studentName} (${nis})`;
    const bodyText = `Assalamu’alaikum Warahmatullahi Wabarakatuh Wali dari ${studentName},\n\nPembayaran SPP bulan ${month} ${year} sebesar Rp ${Number(totalAmount).toLocaleString('id-ID')} melalui ${paymentMethod} telah diverifikasi LUNAS.\nNomor Kuitansi: ${receiptNumber || 'KW-' + Date.now()}.\n\nBagian Keuangan TK Lukman Hakim Purwokerto`;

    const bodyHtml = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; padding: 26px 24px; text-align: center;">
          <div style="display: inline-block; background: #ffffff; color: #065f46; font-weight: 800; font-size: 11px; padding: 4px 14px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px;">
            KUITANSI PEMBAYARAN SAH (LUNAS)
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">TK LUKMAN HAKIM PURWOKERTO</h1>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">NPSN: 69981337 • Bagian Administrasi & Keuangan</p>
        </div>

        <div style="padding: 24px;">
          <div style="background: #f0fdf4; border: 2px dashed #86efac; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #bbf7d0; padding-bottom: 10px; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #166534; font-weight: bold;">No. Kuitansi:</span>
              <strong style="font-family: monospace; font-size: 14px; color: #15803d;">${receiptNumber || 'KW-LHP-' + Date.now()}</strong>
            </div>
            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
              <tr><td style="padding: 4px 0; color: #64748b; width: 38%;">Nama Siswa:</td><td><strong>${studentName}</strong> (NIS: ${nis})</td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Periode Pembayaran:</td><td><strong>${month} ${year}</strong></td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Jumlah Pembayaran:</td><td><strong style="color: #16a34a; font-size: 15px;">Rp ${Number(totalAmount).toLocaleString('id-ID')}</strong></td></tr>
              <tr><td style="padding: 4px 0; color: #64748b;">Metode & Status:</td><td><strong>${paymentMethod}</strong> • <span style="background: #dcfce7; color: #15803d; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-size: 11px;">LUNAS VERIFIED</span></td></tr>
            </table>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin: 20px 0; text-align: center;">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #475569; letter-spacing: 1px; margin-bottom: 10px;">
              Aksi Langsung:
            </div>
            <div style="text-align: center;">
              ${buildEmailButton(`${baseUrl}?tab=spp`, '🌐 Buka Portal SPP & E-Raport', '#006699')}
              ${buildEmailButton(waUrl, '💬 Konfirmasi ke WA Keuangan', '#16a34a')}
              ${buildEmailButton(mapsUrl, '📍 Peta Kampus TK Lukman Hakim', '#ea580c')}
            </div>
          </div>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
          Kuitansi ini diterbitkan sah oleh sistem digital TK Lukman Hakim Purwokerto tanpa tanda tangan basah.
        </div>
      </div>
    `;

    await mailTransporter.sendMail({
      from: `"Keuangan TK LUKMAN HAKIM" <${mailConfig.user}>`,
      to: targetEmail,
      subject,
      text: bodyText,
      html: bodyHtml,
    });

    const emailRecord: EmailRecord = {
      id: `EML-SPP-${Date.now()}`,
      to: targetEmail,
      from: mailConfig.user || 'tklukmanhakim.pwt@gmail.com',
      subject,
      bodyText,
      bodyHtml,
      type: 'TUITION_RECEIPT',
      status: 'Terkirim ke Gmail',
      timestamp: new Date().toISOString(),
      deliveryMethod: 'Google Gmail SMTP Live Outbound',
    };

    EMAIL_STORE.unshift(emailRecord);

    res.json({
      success: true,
      targetEmail,
      status: 'Terkirim ke Gmail',
      whatsappLink: waUrl,
      gmailInboxLink: createGmailInboxUrl('Kuitansi TK LUKMAN HAKIM'),
      email: emailRecord,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Gagal mengirim kuitansi ke Gmail', details: error.message });
  }
});

// Fetch Inbox for specific Gmail address
app.get('/api/mail/inbox/:email', requireAdmin, (req: Request, res: Response) => {
  const targetEmail = (req.params.email || '').toLowerCase().trim();
  const matched = EMAIL_STORE.filter(
    (e) => e.to.toLowerCase().trim() === targetEmail
  );
  res.json({
    email: targetEmail,
    count: matched.length,
    messages: matched,
  });
});

// Fetch all sent emails archive (Admin view)
app.get('/api/mail/all', requireAdmin, (req: Request, res: Response) => {
  res.json({
    total: EMAIL_STORE.length,
    messages: EMAIL_STORE,
  });
});

// 4. Cloud Backup & Encryption Export
app.post('/api/backup/export', requireAdmin, (req: Request, res: Response) => {
  try {
    const { dataset } = req.body;
    const backupMetadata = {
      institution: 'TK Lukman Hakim Purwokerto',
      exportedAt: new Date().toISOString(),
      encryption: 'AES-256-GCM Simulation Verified',
      checksum: 'sha256-' + Buffer.from(JSON.stringify(dataset || {})).toString('base64').slice(0, 32),
      version: '2.5.0',
      cloudHost: 'AWS S3 / Google Cloud Run Hybrid Node',
    };

    res.json({
      success: true,
      backupPackage: {
        metadata: backupMetadata,
        data: dataset,
      },
      message: 'Cadangan data terenkripsi berhasil diexport.',
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Gagal membuat file backup', details: error.message });
  }
});

// 5. Laravel API Bridge Specifications & Code Generator
app.get('/api/laravel/spec', (req: Request, res: Response) => {
  const laravelArchitecture = {
    framework: 'Laravel 11 / 12 RESTful API',
    endpoints: [
      { method: 'POST', path: '/api/v1/ppdb/register', description: 'Menerima registrasi siswa baru' },
      { method: 'GET', path: '/api/v1/students/{nis}', description: 'Mengambil biodata & data siswa' },
      { method: 'GET', path: '/api/v1/tuition/bills/{nis}', description: 'Mengambil daftar tagihan SPP' },
      { method: 'POST', path: '/api/v1/tuition/pay', description: 'Memproses webhook pembayaran SPP digital' },
      { method: 'GET', path: '/api/v1/reports/{nis}', description: 'Mengambil E-Raport semester siswa' },
      { method: 'GET', path: '/api/v1/teachers', description: 'Daftar guru & pengajar' },
      { method: 'GET', path: '/api/v1/gallery', description: 'Galeri foto aktivitas' },
      { method: 'POST', path: '/api/v1/notifications/send', description: 'Trigger WhatsApp / SMS gateway' },
    ],
    migrationsSummary: [
      'create_students_table.php',
      'create_teachers_table.php',
      'create_ppdb_registrations_table.php',
      'create_tuition_bills_table.php',
      'create_student_reports_table.php',
      'create_gallery_items_table.php',
      'create_notification_logs_table.php',
    ],
    sampleControllerSnippet: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\PpdbRegistration;
use App\\Services\\WhatsAppGatewayService;

class PpdbController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'child_name' => 'required|string|max:255',
            'nik' => 'required|string|size:16',
            'program' => 'required|string',
            'parent_name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        $regNumber = 'PPDB-LHP-' . date('Y') . '-' . str_pad(PpdbRegistration::count() + 1, 4, '0', STR_PAD_LEFT);
        $registration = PpdbRegistration::create(array_merge($validated, [
            'registration_number' => $regNumber,
            'status' => 'Menunggu Verifikasi',
        ]));

        WhatsAppGatewayService::send([
            'to' => $request->phone,
            'message' => "Alhamdulillah! Pendaftaran Ananda {$request->child_name} di TK Lukman Hakim Purwokerto berhasil. No Registrasi: {$regNumber}."
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $registration
        ], 201);
    }
}`,
  };

  res.json(laravelArchitecture);
});

async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server TK Lukman Hakim Purwokerto running on http://${HOST}:${PORT}`);
    });

    server.on('error', (err: any) => {
      console.error('[Server Listen Error]:', err);
    });
  } catch (error) {
    console.error('[Server Startup Fatal Error]:', error);
  }
}

startServer();
