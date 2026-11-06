# 📘 PANDUAN TEKNIS & DOKUMENTASI CODINGAN
## Website Resmi TK Lukman Al Hakim Purwokerto (tklukmanhakim.sch.id)
*Dokumen ini dibuat khusus sebagai panduan penjelasan saat merekam video teknis / presentasi tugas PSAJ & KIK.*

---

## 🎯 DAFTAR ISI PEMBAHASAN
1. **Ringkasan Teknologi (Tech Stack)**
2. **Peta Struktur Folder Proyek**
3. **Bedah File Kunci & Logika Kodingan:**
   - `src/App.tsx` (Root Router & Modal Controller)
   - `src/context/AppContext.tsx` (Central Global State Management)
   - `src/components/HeroBanner.tsx` (Auto-Slide Banner & Hover Pause)
   - `server.ts` & `src/components/ChatbotModal.tsx` (Google Gemini 3.8 Flash AI Gateway)
   - `src/components/QrCodeModal.tsx` (Dynamic QR Generator & Blob Download)
   - `src/data/initialData.ts` (Database & Identitas Sekolah)
4. **Naskah Siap Baca untuk Rekaman Video (05:00 Menit)**

---

## 🛠️ 1. RINGKASAN TEKNOLOGI (TECH STACK)
- **Frontend Framework:** React 19 (Functional Components + Hooks)
- **Bahasa Pemrograman:** TypeScript (Type-safe, Clean Architecture)
- **Styling:** Tailwind CSS (Modern Utility-First CSS, Responsive Design)
- **Build Tool:** Vite (Ultra-fast Hot Module Replacement & Bundler)
- **Backend Proxy:** Node.js + Express (Menjaga keamanan API Key Gemini di sisi server)
- **Kecerdasan Buatan (AI):** `@google/genai` (Model `gemini-3.8-flash`)
- **Database & Auth:** Firebase Firestore & Google OAuth 2.0
- **Version Control & CI/CD:** Git & GitHub (`wsnu123/TK-LUKMANHAKIM`)

---

## 📁 2. PETA STRUKTUR FOLDER DI VS CODE
```
├── public/                     # Aset publik statis (gambar, favicon, logo sekolah)
│   ├── assets/images/          # Foto-foto HD kegiatan santri (tahfidz, montessori, kebun)
│   ├── assets/qr_website.png   # File QR Code resmi website
│   └── logo.png                # Logo resmi TK Lukman Al Hakim
├── src/
│   ├── components/             # Komponen UI modular
│   │   ├── Navbar.tsx          # Navigasi atas + tombol akses QR & Portal
│   │   ├── HeroBanner.tsx      # Banner beranda berganti otomatis (Auto-slide)
│   │   ├── ChatbotModal.tsx    # Modal chat asisten pintar "Tanya Ustadzah AI"
│   │   ├── QrCodeModal.tsx     # Modal QR Code 4 target + tombol unduh PNG
│   │   ├── PortalWaliModal.tsx # Portal SPP digital & E-Raport wali santri
│   │   ├── PpdbModal.tsx       # Formulir pendaftaran santri baru (SPMB Online)
│   │   └── ContactFooter.tsx   # Footer lengkap dengan tautan kontak & peta
│   ├── context/
│   │   └── AppContext.tsx      # Central State Management (Pusat data aplikasi)
│   ├── data/
│   │   └── initialData.ts      # Data identitas sekolah, foto, dan banner
│   ├── types.ts                # Definisi TypeScript Interface & Tipe Data
│   ├── App.tsx                 # Root Component & Single Page Router
│   └── main.tsx                # Entry point React ke DOM HTML
├── server.ts                   # Backend proxy server Express & endpoint Gemini AI
└── package.json                # Dependensi proyek & konfigurasi build
```

---

## 💻 3. BEDAH FILE KUNCI & PENJELASAN CODINGAN

### A. `src/App.tsx` (Pusat Kendali Aplikasi)
- **Fungsi:** Mengatur halaman yang aktif (`home`, `about`, `schools`, `facilities`, `contact`, `admin`) tanpa reload halaman (*Single Page Application*).
- **Logika Kunci (Route Guard Autentikasi):**
  ```tsx
  // Jika wali murid ingin daftar SPMB, sistem mengecek login Google
  const handleOpenProtectedPpdb = () => {
    if (currentUser) {
      setIsPpdbOpen(true); // Sudah login -> langsung buka form
    } else {
      setAuthRedirectTarget('spmb');
      setIsAuthModalOpen(true); // Belum login -> buka Google OAuth Login
    }
  };
  ```

### B. `src/components/HeroBanner.tsx` (Banner Slide Otomatis)
- **Fungsi:** Menampilkan 6 slide foto HD kegiatan santri secara bergantian.
- **Logika Kunci (Auto-slide dengan Sensor Hover Mouse):**
  ```tsx
  useEffect(() => {
    // Jika kursor mouse sedang berada di atas banner, hentikan timer
    if (isHovered || heroSlides.length <= 1) return;
    
    // Ganti slide setiap 6.5 detik secara otomatis
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= heroSlides.length - 1 ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);
  ```
- **Kelebihan:** Transisi menggunakan teknik *Stacked Cross-Fade* (`opacity-100` ke `opacity-0`) sehingga gambar berganti halus tanpa kedipan.

### C. `server.ts` & `src/components/ChatbotModal.tsx` (Kecerdasan Buatan AI)
- **Fungsi:** Menjawab pertanyaan wali murid seputar pendaftaran, biaya, kurikulum, dan konsultasi anak tantrum selama 24 jam.
- **Keamanan:** Kunci API (`GEMINI_API_KEY`) disimpan di `process.env` server backend dan tidak pernah dikirim ke browser client.
- **Logika Kunci:**
  ```ts
  // Endpoint API di server.ts
  app.post('/api/chat', async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptDenganKonteksSekolah,
    });
    res.json({ reply: response.text });
  });
  ```

### D. `src/components/QrCodeModal.tsx` (Fitur QR Code & Unduh PNG)
- **Fungsi:** Menghasilkan QR Code resmi ke `https://tklukmanhakim.sch.id` dan memungkinkan wali santri menyimpannya.
- **Logika Kunci (Unduh Otomatis File Gambar):**
  ```tsx
  // Mengonversi URL gambar menjadi Blob lalu memicu klik download browser
  const handleDownloadQr = async () => {
    const response = await fetch(qrImageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `QR-TK_Lukman_Al_Hakim-${selectedTarget}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };
  ```

---

## 🎙️ 4. NASKAH VIDEO SIAP BACA (WALKTHROUGH 5 MENIT)

> **[00:00 - 00:45] Pembukaan**  
> *"Assalamu’alaikum Warahmatullahi Wabarakatuh. Perkenalkan nama saya [Nama Anda]. Di video ini, saya akan mendemonstrasikan aspek teknis dan arsitektur codingan dari Website Resmi TK Lukman Al Hakim Purwokerto yang beralamat di tklukmanhakim.sch.id."*

> **[00:45 - 01:30] Arsitektur & Teknologi**  
> *"Website ini dirancang menggunakan arsitektur modern Single Page Application dengan React 19, TypeScript, dan Tailwind CSS. Untuk backend dan AI, kami mengintegrasikan Express.js dan model terbaru Google Gemini 3.8 Flash, serta Firebase untuk manajemen database santri."*

> **[01:30 - 02:45] Demonstrasi Kode App.tsx & HeroBanner.tsx**  
> *(Buka file `src/App.tsx` dan `src/components/HeroBanner.tsx`)*  
> *"Bisa kita lihat pada file `App.tsx`, di sini menjadi root router yang memuat komponen secara dinamis. Salah satu komponen utamanya adalah `HeroBanner.tsx`. Di dalam file ini, kita menerapkan logika `useEffect` dengan interval 6.5 detik. Apabila kursor pengguna menyentuh area banner, auto-slide akan berhenti sementara berkat state `isHovered`, sehingga pembaca leluasa menyerap informasi."*

> **[02:45 - 03:45] Keamanan & Integrasi AI (server.ts)**  
> *(Buka file `server.ts`)*  
> *"Salah satu nilai inovatif website ini adalah fitur 'Tanya Ustadzah AI'. Kode pemanggilannya sengaja kita tempatkan di `server.ts` melalui route `/api/chat`. Ini merupakan best practice keamanan agar API key rahasia tidak terekspos di browser pengunjung. AI ini telah diprogram dengan knowledge base lengkap tentang TK Lukman Al Hakim."*

> **[03:45 - 04:30] Fitur QR Code & Unduh PNG**  
> *(Buka file `src/components/QrCodeModal.tsx`)*  
> *"Berikutnya adalah fitur QR Code interaktif. Kode ini secara cerdas meng-encode alamat `https://tklukmanhakim.sch.id` secara instan, dan dilengkapi fungsi `handleDownloadQr` berbasis Blob API agar orang tua murid dapat langsung mengunduh gambar QR beresolusi tinggi untuk dicetak atau dibagikan."*

> **[04:30 - 05:00] Penutup & CI/CD GitHub**  
> *"Seluruh codebase ini dikelola menggunakan Git dan repositori GitHub di wsnu123/TK-LUKMANHAKIM dengan pipeline deployment otomatis ke cloud hosting. Terima kasih atas perhatiannya, Wassalamu’alaikum Warahmatullahi Wabarakatuh."*
