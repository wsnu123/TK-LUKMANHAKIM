# PANDUAN PUBLISH, DEPLOY & KONEKSI GITHUB
## TK LUKMAN HAKIM PURWOKERTO

Akun Pengembang:
- **Nama Akun / Git Author**: `ml0752960`
- **Email Akun**: `ml0752960@gmail.com`
- **Branch Utama**: `main`

---

### CARA MENGHUBUNGKAN REPOSITORY KE GITHUB (ml0752960)

1. **Buat Repository Baru di GitHub**:
   - Buka browser dan login ke akun GitHub Anda: [https://github.com/new](https://github.com/new)
   - Berikan nama repository, contoh: `tk-lukman-hakim-purwokerto` atau `ppdb-tk-lukman-hakim`
   - Pilih visibilitas: **Public** atau **Private** (bebas)
   - Jangan centang "Initialize with README" (karena kode lokal sudah lengkap).
   - Klik tombol hijau **Create repository**.

2. **Jalankan Perintah Push dari Terminal**:
   Buka terminal di folder project ini, lalu jalankan:
   ```bash
   # Hubungkan ke repository GitHub Anda (ganti nama repo jika berbeda)
   git remote add origin https://github.com/ml0752960/tk-lukman-hakim-purwokerto.git

   # Pastikan branch bernama main
   git branch -M main

   # Push seluruh kode ke GitHub
   git push -u origin main
   ```

---

### CARA HOSTING / DEPLOY GRATIS (1-KLIK)

### Konfigurasi Email Gmail

Pengiriman email langsung memakai SMTP Gmail. Atur rahasia berikut pada environment hosting (jangan masukkan App Password ke source code atau repository):

```env
SMTP_USER=alamat-gmail-pengirim@gmail.com
SMTP_PASS=app-password-gmail-16-karakter
FIREBASE_PROJECT_ID=refreshing-ticket-pgmzr
ADMIN_EMAILS=ml0752960@gmail.com
```

Gunakan Google App Password dengan verifikasi dua langkah aktif. Endpoint email admin menerima Firebase ID token dari akun admin yang emailnya terverifikasi. Login admin lokal di browser bukan pengganti autentikasi server.

Setelah kode berada di GitHub Anda (`ml0752960`), Anda dapat memilih platform hosting berikut:

#### Opsi 1: Vercel (Sangat Direkomendasikan & Gratis)
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda (`ml0752960`).
2. Klik **Add New...** -> **Project**.
3. Pilih repository `tk-lukman-hakim-purwokerto` lalu klik **Import**.
4. Framework Preset: **Vite**.
5. Klik **Deploy**.
6. Dalam 1 menit, website Anda sudah aktif dengan URL live HTTPS gratis (contoh: `tk-lukman-hakim.vercel.app`) dan bisa dipasang domain sekolah sendiri (seperti `tklukmanhakim.sch.id`).

#### Opsi 2: Netlify (Gratis)
1. Buka [https://netlify.com](https://netlify.com) dan login dengan akun GitHub Anda.
2. Klik **Add new site** -> **Import an existing project**.
3. Pilih GitHub -> pilih repository Anda.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Klik **Deploy site**.

#### Opsi 3: Fullstack Server (Cloud Run / Railway / Render)
Aplikasi ini sudah dilengkapi dengan server backend Express (`server.ts` & `npm start`), sehingga juga mendukung hosting fullstack node.js di platform mana pun.
