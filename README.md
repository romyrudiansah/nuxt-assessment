# Movie List App

Movie List App adalah aplikasi berbasis Vue.js (Nuxt 3) yang menampilkan daftar film berdasarkan data dari OMDb API. Aplikasi ini memiliki fitur pencarian, filter berdasarkan genre, serta fitur "Load More" untuk menampilkan lebih banyak film.

## 🚀 Fitur
- Menampilkan daftar film dari OMDb API
- Filter berdasarkan genre
- Sorting berdasarkan popularitas atau tahun rilis
- Tombol "Load More" untuk melihat lebih banyak film

---

## 📌 Persyaratan
Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:
- **Node.js** (Disarankan versi 18 atau lebih baru)
- **npm** atau **yarn**

## 📥 Instalasi
Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan proyek secara lokal:

1. **Clone repository**
   ```sh
   git clone https://github.com/username/movie-list-app.git
   cd movie-list-app
   ```

2. **Instal dependensi**
   ```sh
   npm install  # atau gunakan yarn install
   ```

3. **Buat file konfigurasi `.env`**
   Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
   ```env
   OMDB_API_KEY=your_api_key_here
   OMDB_API_BASE=https://www.omdbapi.com/
   ```
   Atau 
   ```
   cp .env.example .env
   ```
   > **Catatan:** Ganti `your_api_key_here` dengan API key Anda dari [OMDb API](https://www.omdbapi.com/apikey.aspx).

4. **Jalankan proyek dalam mode pengembangan**
   ```sh
   npm run dev  # atau yarn dev
   ```
   Proyek akan berjalan di `http://localhost:3000/` secara default.

---

## 📦 Build untuk Produksi
Jika ingin membangun proyek untuk produksi, jalankan perintah berikut:
```sh
npm run build  # atau yarn build
```
Lalu, untuk menjalankan hasil build:
```sh
npm run start  # atau yarn start
```

---

## ⚠️ Troubleshooting
- **Error "Cannot find module 'dotenv'"** → Pastikan Anda sudah menginstal dependensi dengan `npm install`.
- **API tidak bekerja atau data kosong** → Cek apakah API key valid dan belum mencapai batas pemakaian harian.
- **Port 3000 sudah digunakan** → Gunakan perintah `export PORT=4000 && npm run dev` untuk menjalankan di port lain.

---

## 📜 Lisensi
Proyek ini menggunakan lisensi **MIT**.

---

## ✨ Kontribusi
Jika Anda ingin berkontribusi, silakan fork repository ini dan ajukan pull request!

---

💡 Dibuat dengan ❤️ oleh Romy Rudiansah

