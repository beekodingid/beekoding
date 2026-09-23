# Panduan Deploy Beekoding ke Cloudflare Pages

Panduan ini menjelaskan cara meluncurkan website Beekoding ke **Cloudflare Pages** secara gratis, cepat, dan menghubungkannya dengan domain kustom **`beekoding.id`**.

---

## 🚀 Langkah 1: Hubungkan Repositori GitHub ke Cloudflare Pages

1. Masuk ke [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Pada menu navigasi sebelah kiri, buka **Workers & Pages** -> Pilih tab **Pages**.
3. Klik tombol **Connect to Git** (atau **Create application** -> **Pages** -> **Connect to Git**).
4. Pilih akun GitHub Anda dan pilih repositori:
   - **`beekodingid/beekoding`**
5. Klik **Begin setup**.

---

## ⚙️ Langkah 2: Konfigurasi Pengaturan Build (Build Settings)

Isi formulir konfigurasi proyek dengan nilai berikut:

| Pengaturan | Nilai Konfigurasi |
| :--- | :--- |
| **Project Name** | `beekoding` *(atau sesuai keinginan)* |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(Biarkan kosong / default)* |

### 🔑 Environment Variables (Variabel Lingkungan)
Di bagian bawah formulir (sebelum klik Save and Deploy), buka menu **Environment variables (advanced)** dan tambahkan variabel berikut:

1. `NODE_VERSION` = `20`
2. `VITE_SUPABASE_URL` = `https://nmsfffkwpikiokycfdml.supabase.co`
3. `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tc2ZmZmt3cGlraW9reWNmZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTcxMjEsImV4cCI6MjEwNTUzMzEyMX0.WU5hZIdTj0wAzp6zQ_voqAgizgqXCIVgGVHu56MtMUg`
4. `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_RIoeFHqpLMkL3e30BCe92A_L7Y0PljV`

6. Klik **Save and Deploy**.  
Proses build akan berjalan sekitar 1–2 menit, dan website Anda langsung aktif di subdomain gratis:  
👉 **`https://beekoding.pages.dev`**

---

## 🌐 Langkah 3: Menghubungkan Domain Kustom `beekoding.id`

Setelah deploy pertama berhasil:

1. Di halaman proyek Cloudflare Pages Anda, buka tab **Custom domains**.
2. Klik **Set up a domain**.
3. Masukkan nama domain: **`beekoding.id`**, lalu klik **Continue**.
4. Ulangi langkah di atas untuk **`www.beekoding.id`**.
5. Ikuti petunjuk DNS yang diberikan:
   - Jika domain Anda dikelola langsung di DNS Cloudflare: Cukup klik **Activate domain** (otomatis 1 klik).
   - Jika domain dikelola di registrar luar (Niagahoster, DomaiNesia, dll.): Tambahkan CNAME record yang mengarah ke `beekoding.pages.dev`.
6. Cloudflare akan otomatis mengaktifkan sertifikat **SSL (HTTPS)** dalam beberapa menit.

---

## 📁 Berkas Khusus yang Sudah Disediakan Otomatis di Proyek:
- **`public/_redirects`**: Mencegah error 404 saat pengguna me-refresh halaman rute SPA (`#talent`, `#portal`, `#admin`).
- **`public/_headers`**: Proteksi keamanan (anti-clickjacking, nosniff) dan optimasi cache aset Vite agar loading website super cepat di seluruh dunia.
