import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'tklukmanhakim-ai',
        },
      },
    });
  } catch (e) {
    console.warn('Failed to init GoogleGenAI client:', e);
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, errorMsg: string): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error(errorMsg)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

// Comprehensive Encyclopedic Knowledge Base for instant high-precision answers
function getComprehensiveReply(message: string, schoolContext?: any): { reply: string; suggestedActions: string[] } {
  const q = message.toLowerCase().trim();
  const schoolName = schoolContext?.nama || 'TK Lukman Hakim';
  const npsn = schoolContext?.npsn || '69981337';
  const wa = schoolContext?.whatsapp || '+62 877-1355-1412';

  // 1. Math solver
  const mathMatch = q.match(/(\d+(?:\.\d+)?)\s*([+\-x*/:])\s*(\d+(?:\.\d+)?)/);
  if (mathMatch) {
    const a = parseFloat(mathMatch[1]);
    const op = mathMatch[2].toLowerCase();
    const b = parseFloat(mathMatch[3]);
    let result = 0;
    if (op === '+') result = a + b;
    else if (op === '-') result = a - b;
    else if (op === 'x' || op === '*') result = a * b;
    else if ((op === '/' || op === ':') && b !== 0) result = Number((a / b).toFixed(2));
    return {
      reply: `Hasil perhitungan dari **${a} ${op} ${b}** adalah **${result.toLocaleString('id-ID')}**.\n\nDi TK Lukman Hakim, konsep logika numerik dan matematika awal dikenalkan secara kontekstual melalui media konkret Montessori (balok geometri, manik warna, dan permainan peran jual-beli) agar anak memahami esensi berhitung dengan riang tanpa beban rumus kaku.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 2. Greetings
  if (/^(halo|hai|assalamu|salam|pagi|siang|sore|malam|permisi|tes|ping)\b/i.test(q)) {
    return {
      reply: `Wa'alaikumussalam Warahmatullahi Wabarakatuh, Ayah & Bunda.\n\nSelamat datang di **Asisten Cerdas AI Resmi ${schoolName} Purwokerto** (NPSN: ${npsn} • Terakreditasi A).\n\nSaya berkemampuan serba bisa setara Gemini untuk mendampingi Ayah & Bunda. Saya siap menjawab pertanyaan seputar:\n• **Pendaftaran Siswa Baru (SPMB 2026/2027) & Free Trial Class**\n• **Kurikulum Merdeka, 7 Sentra Bermain, Tahfidz Tilawati & 5 Pilar Karakter**\n• **Program Daycare, Kelompok Bermain (KB), TK A, dan TK B**\n• **Fasilitas Kampus, Kebun Hidroponik & Playground Luar Ruang**\n• **Konsultasi Parenting, Psikologi Perkembangan Balita, hingga Wawasan Sains & Edukasi**\n\nSilakan ketik pertanyaan Anda!`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 3. School Profile, NPSN, Accreditation, Address
  if (/(alamat|lokasi|dimana|npsn|akreditasi|profil|sejarah|yayasan|legalitas|berdiri)/i.test(q)) {
    return {
      reply: `**Profil Resmi ${schoolName} Purwokerto:**\n\n• **Status Akreditasi**: Terakreditasi **A (Unggul)** oleh BAN PAUD-PNF.\n• **Nomor Pokok Sekolah Nasional (NPSN)**: **${npsn}**.\n• **Alamat Kampus**: Jl. HOS Noto Suwiryo No. 5, RT 02 / RW 03, Kelurahan Teluk, Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah 53145 (Akses nyaman dekat pusat kota & Taman Andhang Pangrenan).\n• **Layanan Usia**: Daycare Batita (1.5–3 th), Kelompok Bermain (3–4 th), TK A (4–5 th), TK B (5–6 th).\n• **WhatsApp Sekretariat**: ${wa}.\n\nKami mengusung filosofi belajar berbasis fitrah anak dengan pendekatan sentra dan nilai Islam terintegrasi.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 4. PPDB, SPMB, Syarat, Biaya Pendaftaran, Trial Class
  if (/(ppdb|spmb|daftar|pendaftaran|biaya|syarat|formulir|berkas|trial|coba|open house)/i.test(q)) {
    return {
      reply: `**Informasi Pendaftaran Siswa Baru (PPDB 2026/2027):**\n\n1. **Program Free Trial Class (100% Gratis)**:\n   Ayah, Bunda, dan ananda dipersilakan merasakan langsung pengalaman belajar di sentra bermain dan playground sekolah kami secara cuma-cuma sebelum mendaftar.\n\n2. **Biaya Formulir & Observasi Tumbuh Kembang**: Rp 150.000.\n\n3. **Syarat Berkas Administrasi**:\n   • Salinan Akta Kelahiran Ananda\n   • Salinan Kartu Keluarga (KK)\n   • Salinan KTP Orang Tua / Wali\n   • Pas Foto Ananda ukuran 3x4 (3 lembar)\n\n4. **Konsultasi Rincian SPP & Investasi Pendidikan**:\n   Rincian seragam, perlengkapan belajar, dan SPP bulanan dapat langsung dikonsultasikan secara transparan via formulir online atau WhatsApp Sekretariat kami di ${wa}.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 5. Kurikulum, 7 Sentra, Tilawati, Karakter
  if (/(kurikulum|sentra|metode|tilawati|tahfidz|karakter|pilar|balok|montessori)/i.test(q)) {
    return {
      reply: `**Kurikulum Unggulan & Metode Belajar ${schoolName}:**\n\n1. **Kurikulum Merdeka PAUD** yang berpusat pada minat dan keunikan setiap anak.\n2. **Metode 7 Sentra Bermain Ber-AC**:\n   • **Sentra Balok Montessori**: Mengembangkan kecerdasan logika-matematika, spasial, dan konstruksi fisik.\n   • **Sentra Alam Cair & Sains**: Bereksperimen dengan air, pasir, tekstur, dan hukum alam sebab-akibat.\n   • **Sentra Main Peran (Mikro & Makro)**: Menumbuhkan empati sosial, keterampilan komunikasi, dan kepemimpinan.\n   • **Sentra Seni Kriya**: Stimulasi motorik halus melalui melukis, membentuk lempung, dan kolase.\n   • **Sentra Olah Tubuh & Motorik**: Kelincahan motorik kasar, senam irama ceria, dan ketangkasan fisik.\n   • **Sentra Persiapan 1 & 2**: Pengenalan pra-membaca, menulis fonik, dan literasi numerik tanpa drilling yang membebani.\n3. **Tahfidz Tilawati PAUD**: Pembelajaran Al-Qur'an dengan irama lagu Rost yang merdu dan riang.\n4. **5 Pilar Karakter**: Faith (Iman), Honesty (Kejujuran), Respect (Hormat), Responsibility (Tanggung Jawab), Cleanliness (Kebersihan).`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 6. Fasilitas Kampus & Keamanan
  if (/(fasilitas|gedung|ruang|kelas|playground|taman|hidroponik|cctv|aman|musholla)/i.test(q)) {
    return {
      reply: `**Fasilitas Kampus Unggulan ${schoolName}:**\n\n• **7 Ruang Sentra Tematik Ber-AC** dengan sirkulasi udara bersih dan peredam ramah anak.\n• **Playground Alam Terbuka Hijau** dengan rumput alami, ayunan safety, perosotan, dan jaring panjat.\n• **Sirkuit Mini Lalu Lintas** lengkap dengan zebra cross, rambu-rambu edukatif, dan sepeda roda tiga.\n• **Kebun Hidroponik & Rumah Edukasi Satwa Merpati** untuk melatih kasih sayang anak terhadap makhluk hidup.\n• **Musholla Anak Raudhatul Jannah** untuk pembiasaan sholat berjamaah, hafalan doa, dan wudhu mandiri.\n• **Sanitasi Ramah Balita (Kid-sized Toilet)** yang higienis untuk mendukung toilet training mandiri.\n• **Keamanan Penuh dengan CCTV Aktif** dan one-gate security system.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 7. Parenting: Tantrum, Emosi, Rewel
  if (/(tantrum|rewel|marah|menangis|nangis|emosi|teriak|ngambek)/i.test(q)) {
    return {
      reply: `**Panduan Mengatasi Anak Tantrum & Regulasi Emosi:**\n\n1. **Tenangkan Diri Terlebih Dahulu (*Co-Regulation*)**:\n   Anak membaca getaran emosi orang tua. Jika kita ikut terpancing marah, sistem saraf anak akan semakin cemas. Tarik napas dalam-dalam dan bicaralah dengan nada rendah.\n2. **Dekati & Sejajarkan Posisi Mata**:\n   Duduklah setinggi anak. Katakan dengan hangat: *"Bunda tahu adik sedang kesal/sedih. Tidak apa-apa menangis, Bunda temani di sini ya."*\n3. **Jangan Mendebat Saat Puncak Emosi**:\n   Saat otak emosi (amigdala) anak sedang membajak, logika belum bisa masuk. Berikan pelukan atau sentuhan aman jika anak bersedia.\n4. **Beri Batasan yang Jelas Setelah Tenang**:\n   Beri pemahaman bahwa perasaannya valid, namun perilakunya (seperti memukul atau melempar barang) tidak diperbolehkan.\n\nDi TK Lukman Hakim, para ustadzah dilatih secara profesional untuk mendampingi emosi anak secara sabar dan penuh kasih.`,
      suggestedActions: ['wa_admin', 'open_ppdb'],
    };
  }

  // 8. Parenting: GTM / Susah Makan
  if (/(gtm|susah makan|gamau makan|makan sayur|pilih makanan|melepeh)/i.test(q)) {
    return {
      reply: `**Solusi Praktis Mengatasi Anak Gerakan Tutup Mulut (GTM):**\n\n1. **Terapkan Feeding Rules yang Konsisten**:\n   • Jadwal makan teratur (3x makan utama, 2x camilan sehat).\n   • Batasi durasi makan maksimal 30 menit. Jika selesai waktu, bersihkan tanpa marah.\n   • Bebas distraksi: matikan TV, gadget, dan hindari makan sambil diajak jalan-jalan.\n2. **Kekuatan Contoh Sebaya (*Social Modeling*)**:\n   Anak yang susah makan sayur di rumah seringkali lahap makan saat makan bersama teman-temannya di sekolah karena melihat teman lain menikmati makanannya.\n3. **Libatkan Anak Menyiapkan Makanan**:\n   Ajak anak mencuci selada atau menata potongan wortel. Anak memiliki rasa bangga mencicipi makanan yang ia bantu siapkan.\n\nDi TK Lukman Hakim, ada sesi *Snack Time & Lunch Bersama* dengan pembiasaan adab makan islami yang sangat membantu memperbaiki pola makan anak.`,
      suggestedActions: ['wa_admin', 'open_ppdb'],
    };
  }

  // 9. Parenting: Terlambat Bicara / Gadget
  if (/(bicara|speech delay|ngomong|gadget|hp|layar|fokus)/i.test(q)) {
    return {
      reply: `**Stimulasi Keterampilan Bicara & Pembatasan Gadget:**\n\n1. **Kurangi Paparan Gadget / Layar Pasif**:\n   WHO merekomendasikan anak di bawah 2 tahun tanpa screen-time, dan usia 2–5 tahun maksimal 1 jam per hari dengan pendampingan interaktif. Paparan video cepat membuat komunikasi anak menjadi pasif.\n2. **Gunakan Pertanyaan Terbuka & Narasi Sehari-hari**:\n   Alih-alih pertanyaan ya/tidak, berikan pilihan: *"Adik mau pakai baju biru atau kuning?"* dan ceritakan apa pun aktivitas yang sedang dilakukan bersama.\n3. **Membaca Buku Cerita Nyaring (*Read Aloud*)**:\n   Membacakan buku bergambar setiap sebelum tidur terbukti secara ilmiah memperkaya perbendaharaan kata anak hingga ratusan kata baru per bulan.\n4. **Interaksi Aktif di Lingkungan Sosial Sentra**:\n   Sentra Main Peran di TK Lukman Hakim dirancang khusus menstimulasi dialog verbal aktif antar anak dan ustadzah secara alami.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 10. Science & Nature Q&A
  if (/(fotosintesis|kenapa langit|mengapa hujan|pelangi|dinosaurus|planet|tata surya|gravitasi|hewan|tumbuhan)/i.test(q)) {
    return {
      reply: `**Wawasan Sains & Eksplorasi Alam Semesta:**\n\nFenomena alam selalu memicu rasa takjub (*sense of wonder*) pada anak-anak:\n• **Mengapa Langit Berwarna Biru?** Cahaya matahari terdiri dari berbagai spektrum warna. Partikel di atmosfer bumi membiaskan cahaya biru dengan gelombang pendek ke segala arah, sehingga langit tampak biru cerah.\n• **Bagaimana Pelangi Terbentuk?** Ketika sinar matahari mengenai tetesan air hujan di udara, tetesan air tersebut bertindak bagaikan prisma kaca yang membiaskan cahaya menjadi 7 spektrum indah (merah, jingga, kuning, hijau, biru, nila, ungu).\n\nDi TK Lukman Hakim, kami memfasilitasi eksperimen sains sederhana di **Kebun Hidroponik dan Sentra Alam Cair** sehingga anak memahami prinsip sains secara langsung dan mengagumi keagungan ciptaan Allah SWT.`,
      suggestedActions: ['wa_admin', 'open_ppdb'],
    };
  }

  // 11. Storytelling / Dongeng
  if (/(cerita|dongeng|kisah|fabel|kancil|singa|kura)/i.test(q)) {
    return {
      reply: `**Kisah Dongeng: Kejujuran Burung Pipit Kecil di Kebun Buah**\n\nDi sebuah kebun yang asri, seekor burung pipit kecil bernama Piko melihat sebutir anggur manis tergeletak di bawah meja piknik. Perutnya berbunyi lapar, dan teman-temannya bersorak menyuruh Piko langsung memakannya.\n\nNamun Piko teringat pesan ibunya: *"Setiap benda yang bukan milik kita, tanyakan dulu kepada pemiliknya."*\n\nPiko terbang ke arah Pak Kebun dan berkicau riang sambil menunjuk anggur itu. Pak Kebun tersenyum hangat, mengelus kepala Piko, dan berkata: *"Terima kasih sudah jujur, burung kecil. Ini hadiah untuk anak yang jujur."* Pak Kebun memberinya semangkuk penuh biji bunga matahari dan buah manis untuk dimakan bersama teman-temannya.\n\n**Hikmah Cerita:** Kejujuran selalu mendatangkan kebaikan dan keberkahan. Kisah-kisah pembangun karakter seperti ini selalu kami sampaikan melalui sesi mendongeng interaktif di TK Lukman Hakim.`,
      suggestedActions: ['open_ppdb', 'wa_admin'],
    };
  }

  // 12. General Knowledge / Wawasan Umum & Solutif
  return {
    reply: `Terima kasih atas pertanyaannya, Ayah & Bunda.\n\nSebagai Asisten Pintar AI resmi **${schoolName} Purwokerto**, saya memiliki wawasan luas untuk membantu:\n• Menjelaskan seluruh informasi sekolah, kurikulum 7 sentra, metode tilawati, dan pendaftaran murid baru.\n• Berdiskusi seputar psikologi pengasuhan anak usia dini, stimulasi kemandirian, dan kesiapan masuk SD.\n• Menjelaskan konsep matematika dasar, sains, adab islami, maupun cerita edukatif anak.\n\nSilakan jelaskan lebih detail hal yang ingin Ayah / Bunda ketahui, dan saya akan menjawabnya dengan senang hati!`,
    suggestedActions: ['open_ppdb', 'wa_admin'],
  };
}

export default async function handler(req: any, res: any) {
  // Setup CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya metode POST yang diizinkan' });
  }

  try {
    const { message, history, schoolContext } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    const trimmedMsg = message.trim();
    const instantReply = getComprehensiveReply(trimmedMsg, schoolContext);

    // If Gemini client is active, call Gemini with strict timeout
    if (aiClient) {
      try {
        const systemPrompt = `Anda adalah Asisten Pintar AI Resmi dari ${schoolContext?.nama || 'TK Lukman Hakim Purwokerto'} (NPSN ${schoolContext?.npsn || '69981337'}, Terakreditasi A) berkemampuan tinggi setara Google Gemini.

Karakter & Wawasan:
1. Sangat cerdas, hangat, bijaksana, dan solutif. Anda mampu menjawab segala pertanyaan pengguna dengan fasih, akurat, dan berbobot (seputar sekolah, sains, matematika, bahasa, parenting usia dini, kisah teladan berkarakter, hingga wawasan umum).
2. Data Lembaga:
   - TK Lukman Hakim Purwokerto, NPSN: 69981337, Terakreditasi A (Unggul).
   - Alamat: Jl. HOS Noto Suwiryo No. 5, Teluk, Purwokerto Selatan, Banyumas.
   - Kontak WA: +62 877-1355-1412.
   - Program: Daycare (1.5-3 th), KB (3-4 th), TK A (4-5 th), TK B (5-6 th).
   - Metode: 7 Sentra bermain ber-AC, Tilawati PAUD, 5 Pilar Karakter.
   - Free Trial Class 100% gratis, pendaftaran Rp 150.000.
3. Gaya Respon:
   - Format markdown rapi (bullet points / paragraf teratur).
   - Hindari emoji berlebihan.
   - Jawab langsung dengan cerdas tanpa kalimat penolakan kaku.`;

        let promptContent = trimmedMsg;
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-3).map((h: any) => `${h.sender === 'user' ? 'Wali' : 'AI'}: ${h.text}`).join('\n');
          promptContent = `Riwayat percakapan:\n${recent}\n\nPertanyaan pengguna:\n${trimmedMsg}`;
        }

        const geminiCall = aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptContent,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.6,
            maxOutputTokens: 350,
          },
        });

        const geminiResponse = await withTimeout(geminiCall, 2500, 'GEMINI_TIMEOUT');
        if (geminiResponse && geminiResponse.text) {
          return res.status(200).json({
            reply: geminiResponse.text,
            source: 'gemini-live',
            suggestedActions: instantReply.suggestedActions,
          });
        }
      } catch (geminiErr: any) {
        console.warn('[Gemini API Warning]:', geminiErr?.message || geminiErr);
      }
    }

    // Fallback instantly to comprehensive knowledge base
    return res.status(200).json({
      reply: instantReply.reply,
      source: 'smart_knowledge_engine',
      suggestedActions: instantReply.suggestedActions,
    });
  } catch (err: any) {
    console.error('[API Chat Handler Error]:', err);
    return res.status(500).json({ error: 'Gagal memproses pesan', details: err?.message });
  }
}
