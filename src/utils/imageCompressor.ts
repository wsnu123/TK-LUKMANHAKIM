/**
 * Utility kompresi gambar berbasis browser HTML5 Canvas.
 * Mengubah foto kamera/ponsel resolusi tinggi (2-10 MB) menjadi Data URL WebP/JPEG
 * yang tajam, sangat ringan (30-80 KB), dan aman disimpan ke Firestore & LocalStorage
 * sehingga langsung ter-publish ke seluruh publik secara instan tanpa hambatan kuota 1MB.
 */

export interface CompressOptions {
  maxDimension?: number;
  quality?: number;
  targetMime?: 'image/webp' | 'image/jpeg';
}

export async function compressImageFile(
  file: File,
  options: CompressOptions = {}
): Promise<string> {
  // Jika file adalah SVG, tidak perlu dikompresi canvas
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  return compressDataUrl(rawDataUrl, options);
}

export async function compressDataUrl(
  dataUrl: string,
  options: CompressOptions = {}
): Promise<string> {
  const {
    maxDimension = 1280,
    quality = 0.78,
    targetMime = 'image/webp',
  } = options;

  // Jika bukan gambar atau data URL SVG kecil, kembalikan langsung
  if (!dataUrl.startsWith('data:image/') || dataUrl.startsWith('data:image/svg+xml')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width <= 0 || height <= 0) {
          resolve(dataUrl);
          return;
        }

        // Hitung skala rasio agar tidak melebihi batas maksimal dimensi
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Aktifkan filtering berkualitas tinggi
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Untuk transparansi (PNG/WebP), jangan isi background putih jika target webp
        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Coba export ke WebP terlebih dahulu (rasio kompresi terbaik)
        let compressed = canvas.toDataURL(targetMime, quality);

        // Jika browser tidak mendukung webp (mengembalikan png), fallback ke JPEG
        if (compressed.startsWith('data:image/png') && targetMime !== 'image/png') {
          // Bersihkan & beri background putih untuk JPEG
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          compressed = canvas.toDataURL('image/jpeg', quality);
        }

        // Jika hasil kompresi ternyata lebih besar dari file asli (kasus gambar sangat kecil), pakai yang terkecil
        if (compressed.length > dataUrl.length && dataUrl.length < 200_000) {
          resolve(dataUrl);
        } else {
          resolve(compressed);
        }
      } catch (err) {
        console.warn('[ImageCompressor] Kompresi gagal, menggunakan gambar asli:', err);
        resolve(dataUrl);
      }
    };

    img.onerror = () => {
      resolve(dataUrl);
    };

    img.src = dataUrl;
  });
}
