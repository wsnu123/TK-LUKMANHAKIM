================================================================================
  PENGEMBANGAN WEBSITE SEKOLAH BERBASIS INFORMASI LAYANAN DIGITAL
                     DENGAN INTEGRASI AI CHATBOT
              TK LUKMAN AL HAKIM PURWOKERTO (BANYUMAS)
================================================================================

TUGAS / PROYEK : PENILAIAN SUMATIF AKHIR JENJANG (PSAJ / KIK)
STATUS SISTEM  : SUDAH PRODUCTION & TERHOSTING (LIVE)

--------------------------------------------------------------------------------
1. INFORMASI TAUTAN PROYEK (LINKS)
--------------------------------------------------------------------------------
[x] Link GitHub Repositori : 
    https://github.com/wsnu123/TK-LUKMANHAKIM

[x] Link Web Hosting / DSB (Live Demo) : 
    https://tklukmanhakim.sch.id
    (Alternatif Hosting: https://tklukmanhakim.sch.id/#spmb)


--------------------------------------------------------------------------------
2. DATA ANGGOTA KELOMPOK PENGEMBANG
--------------------------------------------------------------------------------
Berikut adalah daftar anggota tim pengembang proyek:

1. NAMA LENGKAP  : Wisnu Satria Sutjatmiko
   PERAN         : Lead Developer & Fullstack Engineer
   NOMOR ABSEN   : [Isi Nomor Absen]
   NOMOR TELEPON : [Isi Nomor HP / WA]
   EMAIL         : wsnu568@gmail.com

2. NAMA LENGKAP  : Saskia Syifa Salsabila
   PERAN         : UI/UX Designer & Frontend Specialist
   NOMOR ABSEN   : [Isi Nomor Absen]
   NOMOR TELEPON : [Isi Nomor HP / WA]

3. NAMA LENGKAP  : Tanisha Nadia Hanz
   PERAN         : AI Engineer & Prompt Specialist
   NOMOR ABSEN   : [Isi Nomor Absen]
   NOMOR TELEPON : [Isi Nomor HP / WA]

4. NAMA LENGKAP  : Vanesha Maulidya Pristiany
   PERAN         : AI Engineer & QA / Content Specialist
   NOMOR ABSEN   : [Isi Nomor Absen]
   NOMOR TELEPON : [Isi Nomor HP / WA]


--------------------------------------------------------------------------------
3. DESKRIPSI PROYEK
--------------------------------------------------------------------------------
Proyek ini merupakan sistem informasi portal sekolah modern berbasis web untuk 
TK Lukman Al Hakim Purwokerto (NPSN: 69981337, Terakreditasi A BAN-PAUD). 
Sistem dirancang untuk mempermudah publikasi profil sekolah, kurikulum sentra, 
layanan administrasi wali murid, pendaftaran SPMB online, serta dilengkapi 
dengan asisten virtual cerdas (Tanya Ustadzah AI) yang ditenagai model terbaru 
Google Gemini 3.8 Flash untuk melayani konsultasi pendaftaran 24/7.


--------------------------------------------------------------------------------
4. FITUR UTAMA SISTEM
--------------------------------------------------------------------------------
1. Portal Informasi Sekolah & Fasilitas:
   - Profil resmi TK Lukman Al Hakim Purwokerto (Visi, Misi, 5 Pilar Karakter).
   - Banner hero dinamis dengan 6 slide lanskap HD auto-slide & hover pause.
   - Informasi 7 sentra tematik ber-AC, kebun hidroponik, & taman lalu lintas.

2. Layanan Administrasi & SPMB Online:
   - Formulir pendaftaran murid baru (SPMB Online) dengan Google OAuth Guard.
   - Portal Wali Santri terpadu untuk pengecekan SPP digital & E-Raport.
   - Modal QR Code resmi dengan 4 target dinamis & fitur unduh gambar PNG.

3. Integrasi AI Chatbot (Tanya Ustadzah AI):
   - Integrasi model Google Gemini 3.8 Flash via backend proxy Express aman.
   - Pengetahuan domain lengkap seputar biaya, kurikulum sentra, dan parenting.
   - Perlindungan timeout 15 detik dan sistem cadangan offline cerdas.


--------------------------------------------------------------------------------
5. PERSYARATAN SISTEM (SYSTEM REQUIREMENTS)
--------------------------------------------------------------------------------
1. Runtime Environment:
   - Node.js >= 18.x / Node.js 22.x
   - NPM >= 9.x

2. Environment Variables (.env):
   - GEMINI_API_KEY      : Kunci API Google Gemini (untuk fitur AI Chatbot)
   - VITE_FIREBASE_*     : Konfigurasi Firebase Firestore & Auth

3. Browser Pendukung:
   - Google Chrome, Microsoft Edge, Mozilla Firefox, Safari (Desktop & Mobile)


--------------------------------------------------------------------------------
6. PETUNJUK INSTALASI & PENGUJIAN LOKAL
--------------------------------------------------------------------------------
1. Clone Repositori dari GitHub:
   git clone https://github.com/wsnu123/TK-LUKMANHAKIM.git
   cd TK-LUKMANHAKIM

2. Pasang Dependensi (Install Dependencies):
   npm install

3. Konfigurasi Lingkungan:
   Salin file `.env.example` ke `.env` dan masukkan API Key:
   GEMINI_API_KEY=kunci_api_gemini_anda

4. Menjalankan Aplikasi:
   npm run dev
   Aplikasi akan berjalan pada: http://localhost:3000

5. Melakukan Build untuk Produksi:
   npm run build


--------------------------------------------------------------------------------
7. STRUKTUR FOLDER CODINGAN
--------------------------------------------------------------------------------
/public       : Aset statis (logo, favicon, gambar banner HD, file QR)
/src/
  ├── components/   : Komponen antarmuka (Navbar, HeroBanner, QrCodeModal, dll)
  ├── context/      : Pusat state global aplikasi (AppContext.tsx)
  ├── data/         : Data identitas resmi sekolah (initialData.ts)
  ├── pages/        : Halaman Single Page Application (Home, About, Facilities)
  ├── types.ts      : Definisi tipe data & interface TypeScript
  └── App.tsx       : Root component & SPA route controller
server.ts     : Backend server Express untuk proxy aman Gemini AI & file server
package.json  : Manajemen paket dan dependensi sistem


================================================================================
     (c) 2026 Tim Pengembang TK Lukman Al Hakim - All Rights Reserved
================================================================================
