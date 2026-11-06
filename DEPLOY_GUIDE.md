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

Di Vercel, buka **Project → Settings → Environment Variables** dan isi nilai berikut. Jangan memasukkan service-account JSON atau App Password ke source code, GitHub, atau chat.

```env
FIREBASE_SERVICE_ACCOUNT=<seluruh isi JSON service account Firebase dalam satu baris>
FIREBASE_PROJECT_ID=refreshing-ticket-pgmzr
FIREBASE_DATABASE_ID=ai-studio-tklukmanhakimpur-8395c4ff-b3ba-4cd2-86ee-4d3936c47055
ADMIN_EMAILS=ml0752960@gmail.com
SMTP_USER=alamat-gmail-pengirim@gmail.com
SMTP_PASS=<Google App Password>
```

Gunakan Google App Password dengan verifikasi dua langkah aktif. Service account dibuat dari Firebase Console → Project settings → Service accounts. Setelah mengubah environment variable, jalankan redeploy di Vercel. Endpoint admin menerima Firebase ID token dari akun Google yang emailnya terverifikasi.

API Express dipasang sebagai Vercel Function melalui `api/[...path].ts`. Pastikan domain Vercel tercantum di Firebase Authentication → Settings → Authorized domains, dan deploy `firestore.rules` ke database yang ID-nya tercantum di atas.

Setelah kode berada di GitHub Anda (`ml0752960`), Anda dapat memilih platform hosting berikut:

#### Vercel (repository hosting: wsnu123/TK-LUKMANHAKIM)
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda (`ml0752960`).
2. Pastikan project `tklukmanhakim` terhubung ke repo `wsnu123/TK-LUKMANHAKIM` dengan Production Branch `main`.
3. Aktifkan Auto-Deploy untuk push ke branch `main`, atau redeploy commit terbaru secara manual.
4. Build command: `npm run build`; output frontend: `dist`.
5. Setelah deploy berstatus **Ready**, buka domain Production dan refresh paksa.

#### Hosting lain
Jika memakai Render/Railway/Cloud Run, gunakan build `npm run build` dan start `npm start`; set environment variable yang sama.

#### Netlify (statis saja)
1. Buka [https://netlify.com](https://netlify.com) dan login dengan akun GitHub Anda.
2. Klik **Add new site** -> **Import an existing project**.
3. Pilih GitHub -> pilih repository Anda.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Klik **Deploy site**.

#### Opsi 3: Fullstack Server (Cloud Run / Railway / Render)
Aplikasi ini sudah dilengkapi dengan server backend Express (`server.ts` & `npm start`), sehingga juga mendukung hosting fullstack node.js di platform mana pun.
