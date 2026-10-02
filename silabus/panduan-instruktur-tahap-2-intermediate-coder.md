# 🚀 BUKU PANDUAN UTAMA INSTRUKTUR: TAHAP 2 — INTERMEDIATE CODER (SESI 1 – 96)
### *Kurikulum Lengkap 2 Tahun Berkelanjutan (Pathway 96 Sesi Siap Ajar)*
*Pedoman Pedagogi, MIT App Inventor, Web Frontend (HTML5/CSS3/JavaScript), Game Engine 2D, Python Text Coding & Persiapan Olimpiade*

- **Kode Dokumen**: `BK-INSTR-STAGE-02-FULL96`
- **Target Usia**: 10 – 12 Tahun (SD Kelas 4, 5, dan 6)
- **Jenjang Program**: 
  - **Tahun 1 (Level 1–4 / Sesi 1–48)**: App Inventor Mobile Apps, Logika Game 2D Kartesius, Dasar Web Frontend & Database Lokal TinyDB.
  - **Tahun 2 (Level 5–8 / Sesi 49–96)**: JavaScript Modern DOM, Roblox Lua Game Dev, Python Dasar Teks, & Bimbingan Olimpiade Bebras / OSN Informatika.
- **Prasyarat Siswa**: Sudah mengenal logika dasar percabangan dan koordinat angka positif/negatif.
- **Rasio Pembimbing**: 1 Instruktur : Maksimal 5–6 Siswa (Online) / 8–10 Siswa (Offline Lab).

---

## 🎯 PRINSIP PEDAGOGIS KHUSUS USIA 10–12 TAHUN (TWEEN DEVELOPERS)
1. **Fase Transisi dari Blok ke Teks**: Siswa mulai bosan jika hanya animasi kartun sederhana; mereka ingin membuat aplikasi yang benar-benar bisa diinstal di ponsel pintar mereka sendiri atau game yang bisa dimainkan bersama teman.
2. **Koneksi Dunia Nyata (Real-World Utility)**: Tunjukkan kegunaan praktis koding: kalkulator pintar, aplikasi catatan, pengatur alarm, atau game mobile berfitur skor tinggi.
3. **Analisis Debugging Mandiri**: Ajarkan membaca pesan error di konsol (*Console Log*) dan membaca diagram alir logika (*Flowchart*).
4. **Project-Based Ownership**: Berikan kebebasan memilih tema aplikasi dan palet warna desain agar siswa memiliki rasa kepemilikan tinggi (*sense of ownership*).

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90 MENIT)
| Menit | Segmen Kelas | Panduan Instruktur |
| :---: | :--- | :--- |
| **00–10'** | **Sprint Review & Problem Framing** | Bedah masalah dunia nyata (misal: "Bagaimana aplikasi Gojek mendeteksi lokasi GPS kita?"). |
| **10–25'** | **Architecture & Concept Breakdown** | Jelaskan struktur UI Designer dan blok algoritma di belakang layar. |
| **25–60'** | **Code Implementation (Live Coding)** | Siswa mengimplementasikan kode pada perangkat masing-masing, uji coba via emulator / live test. |
| **60–75'** | **Feature Expansion & Debugging Challenge**| Berikan tantangan penambahan fitur unik (validasi input, suara efek, animasi transisi). |
| **75–85'** | **App Demo & Code Review** | Siswa mendemokan aplikasi di smartphone/layar browser dan membedah blok logika andalannya. |
| **85–90'** | **Summary & Next Horizon Teaser** | Pembahasan arsitektur lanjutan untuk pertemuan berikutnya. |

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-1 (SESI 01 – 48)

## 📌 LEVEL 1: MOBILE APP CREATION DENGAN MIT APP INVENTOR (SESI 01 – 12)
- **Sesi 01: Arsitektur Aplikasi Smartphone & MIT App Inventor Companion**
  - *Konsep*: Perbedaan UI Designer (tampilan antarmuka) dan Blocks Editor (otak logika). Menghubungkan ponsel via AI Companion WiFi QR code.
- **Sesi 02: Aplikasi Soundboard Interaktif & Button Events**
  - *Komponen*: Layout horizontal, Image Button, Sound Component. Logika `when Button.Click do Sound.Play`.
- **Sesi 03: Sensor Gerak Smartphone (Accelerometer) & Aplikasi Kocok Dadu**
  - *Konsep*: Membaca sensor guncangan fisik ponsel: `when AccelerometerSensor.Shaking do set Image.Picture to (random dice)`.
- **Sesi 04: Penerjemah Suara Cerdas (Text-to-Speech & Speech Recognizer)**
  - *Konsep*: Pengenalan suara kecerdasan buatan. Siswa berbicara ke ponsel, ponsel menuliskan teks dan menerjemahkannya.
- **Sesi 05: Desain UI Modern: Palet Warna Hex, Tipografi, & Padding Layout**
  - *Konsep*: Estetika UI/UX profesional pada layar ponsel kecil. Penggunaan CardView dan border radius.
- **Sesi 06: Aplikasi Kalkulator Konversi Nilai & Logika Variabel Matematika**
  - *Komponen*: TextBox input angka, Label hasil, dan operasi matematika: `Hasil = (Input1 * Input2) / 100`.
- **Sesi 07: Logika Percabangan Kompleks: Penentu Skor Nilai Ujian Siswa**
  - *Konsep*: `if - else if - else`. Jika nilai >= 85 -> Grade A (Teks hijau). Jika < 60 -> Perlu remedial (Teks merah).
- **Sesi 08: Database Lokal Ponsel (TinyDB: Menyimpan Data Permanen)**
  - *Konsep*: Data tidak boleh hilang saat aplikasi ditutup: `TinyDB.StoreValue(tag: "username", value: Text)`.
- **Sesi 09: Membaca & Menghapus Data Lokal TinyDB (Aplikasi To-Do List)**
  - *Konsep*: Mengambil data: `TinyDB.GetValue(tag, valueIfTagNotThere)`. Menampilkan daftar agenda harian.
- **Sesi 10: Animasi Canvas 2D & Game Sentuh Objek Bergerak (Whack-a-Mole)**
  - *Komponen*: Canvas, ImageSprite, Clock Timer. Sprite berpindah posisi acak setiap 1000 milidetik.
- **Sesi 11: Export Berkas APK Mandiri & Instalasi di Ponsel Pribadi Siswa**
  - *Praktik*: Melakukan build `.apk`, menginstal aplikasi di ponsel Android anak dan orang tua.
- **Sesi 12: CAPSTONE LEVEL 1: 'My First Android Utility App' & Showcase Kelas**
  - *Output*: Aplikasi Android fungsional buatan siswa yang terpasang nyata di smartphone.
  - *Apresiasi*: Sertifikat *Junior Mobile App Developer Level 1*.

---

## 📌 LEVEL 2: WEB FRONTEND FUNDAMENTALS (HTML5 & CSS3) (SESI 13 – 24)
- **Sesi 13: Anatomi Halaman Web Dunia: Cara Kerja Internet, Server & Browser**
  - *Konsep*: URL, Client-Server, HTTP request, dan teks editor profesional (VS Code).
- **Sesi 14: Struktur Tulang HTML5 Semantik (Header, Main, Section, Footer)**
  - *Kode*: Tag pembuka dan penutup: `<h1>`, `<p>`, `<a>`, `<img>`, `<ul>`, `<li>`.
- **Sesi 15: Merancang Halaman Profil Biodata Developer Cilik**
  - *Karya*: Website portofolio pribadi berisi foto diri, hobi, dan daftar proyek coding.
- **Sesi 16: Pengenalan CSS3: Memberi Warna, Font Google, & Gaya Visual**
  - *Konsep*: Selector, Property, Value. Mengubah warna latar `background-color`, `color`, dan `font-family`.
- **Sesi 17: Memahami CSS Box Model (Margin, Border, Padding, & Content)**
  - *Analogi*: Kotak kado berbingkai. Jarak luar (*margin*) vs jarak ruang dalam (*padding*).
- **Sesi 18: Tata Letak Modern dengan CSS Flexbox (Align & Justify Content)**
  - *Konsep*: Mengatur susunan tombol dan gambar agar sejajar rapi secara horizontal dan vertikal.
- **Sesi 19: Form Input Interaktif (Kotak Teks, Password, Dropdown & Tombol Submit)**
  - *Kode*: Tag `<form>`, `<input type="text">`, `<select>`, `<button>`.
- **Sesi 20: Desain Responsif & Media Queries (Tampilan Rapi di Laptop & HP)**
  - *Kode*: `@media (max-width: 600px)` untuk mengatur layout 1 kolom saat dibuka di ponsel.
- **Sesi 21: Efek Animasi Transisi Halus (Hover Effects & CSS Keyframes)**
  - *Konsep*: Tombol yang membesar halus saat didekati kursor: `transition: all 0.3s ease`.
- **Sesi 22: Penyusunan Layout Portofolio Karya Lengkap Siswa**
  - *Praktik*: Menggabungkan seluruh komponen HTML/CSS menjadi 1 website multi-halaman.
- **Sesi 23: Code Review & Pembersihan Struktur Kode (HTML/CSS Validator)**
  - *Standar*: Kerapian indentasi spasi dan penamaan class yang bermakna.
- **Sesi 24: CAPSTONE LEVEL 2: 'My Personal Digital Portfolio' & Demo Online**
  - *Output*: Website profil interaktif responsif siap dipamerkan di internet.
  - *Apresiasi*: Sertifikat *Junior Web Designer Level 2*.

---

## 📌 LEVEL 3: INTERAKTIVITAS JAVASCRIPT & LOGIKA WEB DINAMIS (SESI 25 – 36)
- **Sesi 25: Menghidupkan Web: Otak Logika JavaScript di Balik Browser**
  - *Konsep*: Jika HTML adalah tulang dan CSS adalah pakaian, maka JS adalah otot dan saraf gerak.
- **Sesi 26: Variabel Modern (`let`, `const`) & Tipe Data Primitif**
  - *Kode*: `let skor = 0; const nama = "Budi"; console.log(nama);`.
- **Sesi 27: Manipulasi DOM (Document Object Model): Membaca & Mengubah Teks**
  - *Kode*: `document.getElementById("judul").innerText = "Selamat Datang!";`.
- **Sesi 28: Menangkap Aksi Pengguna (Event Listeners: `click`, `mouseover`)**
  - *Kode*: `tombol.addEventListener("click", function() { alert("Halo!"); });`.
- **Sesi 29: Mengubah Warna & Gaya Tampilan Web Secara Dinamis via JS**
  - *Kode*: Fitur toggle Night Mode / Dark Mode dengan memanipulasi `classList.toggle("dark")`.
- **Sesi 30: Struktur Logika Pengkondisian JS & Operator Perbandingan**
  - *Konsep*: `if (umur >= 12) { izinkan(); } else { tolak(); }`.
- **Sesi 31: Logika Perulangan (`for` loop) & Pengenalan Array Daftar Data**
  - *Kode*: `let buah = ["Apel", "Mangga", "Jeruk"]; for (let i = 0; i < buah.length; i++)`.
- **Sesi 32: Merender Daftar Elemen Dinamis ke Layar Web (List Rendering)**
  - *Kode*: Menambahkan elemen tag `<li>` otomatis dari array ke dalam halaman web.
- **Sesi 33: Aplikasi Web To-Do List Interaktif (Tambah & Coret Tugas Selesai)**
  - *Karya*: Pengguna mengetik tugas, klik tambah, tugas muncul di daftar dan bisa dicoret.
- **Sesi 34: Penyimpanan Web Lokal (Browser LocalStorage)**
  - *Kode*: `localStorage.setItem("tasks", JSON.stringify(daftarTugas))`. Data tidak hilang saat refresh.
- **Sesi 35: Integrasi Audio & Efek Suara pada Tombol Web**
- **Sesi 36: CAPSTONE LEVEL 3: Aplikasi Web Interaktif Mandiri & Sertifikasi Web Coder**
  - *Output*: Web App interaktif JavaScript mandiri dengan penyimpanan LocalStorage.
  - *Apresiasi*: Sertifikat *Junior JavaScript Developer Level 3*.

---

## 📌 LEVEL 4: GAME ENGINE 2D & FISIKA GAME JAVASCRIPT (SESI 37 – 48)
- **Sesi 37: Pengenalan HTML5 Canvas & Game Loop Berkelanjutan**
  - *Konsep*: Siklus game loop: `update() -> clear() -> draw() -> requestAnimationFrame()`.
- **Sesi 38: Menggambar Karakter Geometri & Animasi Gerak Sumbu X-Y**
  - *Kode*: Menggerakkan kotak pemain dengan keyboard panah kiri/kanan.
- **Sesi 39: Sistem Gravitasi dan Deteksi Menapak Tanah (Ground Collision)**
  - *Konsep*: Kecepatan vertikal bertambah ke bawah setiap frame kecuali menyentuh lantai.
- **Sesi 40: Algoritma Deteksi Tabrakan Kotak (AABB Collision Detection)**
  - *Rumus*: `if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x ...)`
- **Sesi 41: Spawning Rintangan Rintangan Acak & Skor Berjalan**
- **Sesi 42: Game Endless Runner 2D: 'Dino Bee Jump'**
  - *Karya*: Karakter melompati rintangan kaktus yang bergerak menyamping semakin cepat.
- **Sesi 43: Mengganti Kotak dengan Gambar Sprite Animasi (Sprite Sheet)**
  - *Konsep*: Memotong bingkai gambar berjalan (*walking frames*) dari file gambar PNG.
- **Sesi 44: Audio Manager Game (Musik Latar, Efek Lompat, & Suara Game Over)**
- **Sesi 45: Menu Utama Game, Pause Screen, & Tombol Restart**
- **Sesi 46: Playtesting Antarteman & Balancing Tingkat Kesulitan Permainan**
- **Sesi 47: Deploy Game ke Hosting Gratis (GitHub Pages / Cloudflare Pages)**
  - *Aktivitas*: Game buatan anak live di internet dengan URL web yang bisa dibagikan ke keluarga.
- **Sesi 48: GRAND CAPSTONE TAHUN KE-1: '2D Browser Arcade Championship'**
  - *Puncak Acara*: Turnamen pameran game browser karya siswa. Laporan Evaluasi Akademik Tahun 1.
  - *Apresiasi*: Sertifikat Resmi *Intermediate Coder Annual Graduate (48 Sesi)*.

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-2 (SESI 49 – 96)

## 📌 LEVEL 5: ROBLOX LUA GAME ENGINEERING DASAR (SESI 49 – 60)
- **Sesi 49: Pengenalan Roblox Studio, 3D Workspace, & Kamera Navigasi**
  - *Konsep*: Sumbu 3D (X, Y, Z), Part geometri (Block, Sphere, Wedge), Material & Anchor.
- **Sesi 50: Membangun Rintangan 3D Pertama (Obstacle Course / Obby Level 1)**
  - *Desain*: Menyusun blok lompat lava yang menantang dan titik checkpoint (*SpawnLocation*).
- **Sesi 51: Mengenal Bahasa Pemrograman Lua & Scripting Dasar di Roblox**
  - *Konsep*: Menulis script Lua di dalam Part: `script.Parent.BrickColor = BrickColor.new("Bright red")`.
- **Sesi 52: Event Sentuhan (`Touched`) & Blok Laser Pembunuh (Kill Brick)**
  - *Kode Lua*: `part.Touched:Connect(function(hit) hit.Parent:FindFirstChild("Humanoid").Health = 0 end)`.
- **Sesi 53: Variabel, Nilai Properti, & Operasi Aritmatika Lua**
  - *Kode Lua*: Mengubah transparansi blok, kecepatan lari karakter (`WalkSpeed`), dan gravitasi.
- **Sesi 54: Timer & Platform Penghilang Jejak (Disappearing Platforms)**
  - *Kode Lua*: Saat diinjak, blok berkedip selama 2 detik lalu tembus pandang (*CanCollide = false*).
- **Sesi 55: Papan Peringkat Roblox (Leaderstats: Koin & Level Checkpoint)**
  - *Kode*: Menyimpan data skor koin dan level pemain di papan peringkat global server.
- **Sesi 56: Benda Koleksi Koin Berputar & Animasi Efek Partikel 3D**
  - *Konsep*: Koin emas berputar otomatis dengan rotasi CFrame dan mengeluarkan efek bintang saat diambil.
- **Sesi 57: Pintu Toko Interaktif & Pembelian Power-Up Kecepatan**
  - *Logika*: Jika Koin >= 10, kurangi 10 koin dan gandakan `WalkSpeed` pemain menjadi 32.
- **Sesi 58: Playtesting Multiplayer Bersama Seluruh Siswa di Server yang Sama**
- **Sesi 59: Menambahkan Efek Suara, Musik Ambient, & Lighting Pencahayaan 3D**
- **Sesi 60: CAPSTONE LEVEL 5: Publikasi Game Obby 3D Mandiri di Platform Roblox**
  - *Output*: Game 3D Roblox live yang bisa dimainkan bersama teman-teman secara online.
  - *Apresiasi*: Sertifikat *Junior Roblox Game Developer Level 5*.

---

## 📌 LEVEL 6: TRANSISI KE BAHASA TEKS MURNI: PYTHON 3 (SESI 61 – 72)
- **Sesi 61: Selamat Datang di Dunia Koding Profesional: Python 3 & VS Code**
  - *Konsep*: Menulis sintaks teks asli. Fungsi output pertama: `print("Halo Dunia!")`.
- **Sesi 62: Variabel Python, Input Dinamis dari Pengguna & Format String**
  - *Kode*: `nama = input("Siapa nama kamu? "); print(f"Selamat datang, {nama}!")`.
- **Sesi 63: Operasi Matematika & Tipe Data Python (Integer, Float, String, Boolean)**
  - *Konsep*: Menghitung luas persegi panjang, konversi tipe data `int()` dan `float()`.
- **Sesi 64: Logika Percabangan Teks (`if`, `elif`, `else`) & Indentasi Tab**
  - *Aturan*: Python mewajibkan indentasi spasi/tab rapi sebagai penanda blok kode.
- **Sesi 65: Game Tebak Angka Misterius 1–100 (Modul `random` Python)**
  - *Kode*: Komputer memilih angka rahasia. Siswa menebak dengan petunjuk "Terlalu besar" atau "Terlalu kecil".
- **Sesi 66: Perulangan `while` Loop & Penanganan Kesalahan Input Dasar**
  - *Konsep*: Game loop berbasis teks yang terus berjalan sampai pemain mengetik "keluar".
- **Sesi 67: Perulangan `for` Loop & Manipulasi Teks Karakter demi Karakter**
  - *Kode*: Menghitung jumlah huruf vokal dalam sebuah kalimat secara otomatis.
- **Sesi 68: Struktur Data List di Python (Menyimpan & Mengurutkan Data)**
  - *Operasi*: `list.append()`, `list.remove()`, `list.sort()`, dan menghitung nilai tertinggi `max()`.
- **Sesi 69: Membuat Fungsi Mandiri (`def`) & Parameter Argumen**
  - *Konsep*: Modularitas kode: membungkus logika perhitungan ke dalam fungsi agar bisa dipakai berulang kali.
- **Sesi 70: Proyek Aplikasi Konsol Teks: Sistem Kasir Mini & Manajemen Stok Barang**
- **Sesi 71: Membaca & Menulis Berkas Catatan Teks (`file.txt` Read/Write)**
  - *Kode*: `with open("catatan.txt", "w") as f: f.write("Data tersimpan aman!")`.
- **Sesi 72: CAPSTONE LEVEL 6: Aplikasi Utilitas Python Mandiri & Sertifikasi Python Dasar**
  - *Output*: Program utilitas Python berbasis teks terminal yang fungsional.
  - *Apresiasi*: Sertifikat *Junior Python Programmer Level 6*.

---

## 📌 LEVEL 7: OLIMPIADE KOMPUTASI & PROBLEM SOLVING BERPIKIR TINGKAT TINGGI (SESI 73 – 84)
- **Sesi 73: Pengenalan Kompetisi Informatika: Bebras Challenge & Olimpiade Sains Nasional (OSN)**
  - *Konsep*: 4 pilar Computational Thinking: Dekomposisi, Abstraksi, Pengenalan Pola, dan Algoritma.
- **Sesi 74: Dekomposisi Masalah Rumit Menjadi Sub-Tugas Sederhana**
  - *Latihan*: Analisis jadwal sibuk, optimasi rute perjalanan terpendek (Graph Sederhana).
- **Sesi 75: Pengenalan Pola & Barisan Deret Aritmatika-Geometri**
  - *Latihan*: Menemukan formula matematis pola bilangan dan menuliskannya dalam Python.
- **Sesi 76: Logika Boolean Kompleks & Tabel Kebenaran (AND, OR, NOT, XOR)**
  - *Latihan*: Memecahkan teka-teki logika ruang rahasia dengan saklar lampu logika.
- **Sesi 77: Algoritma Pencarian Efisien: Binary Search vs Linear Search**
  - *Analogi*: Menebak nomor halaman kamus dengan selalu membuka halaman tengah (Bagi Dua).
- **Sesi 78: Algoritma Pengurutan Nilai: Bubble Sort & Visualisasi Gerak Data**
  - *Konsep*: Menukar dua angka bersebelahan yang posisinya salah sampai seluruh daftar terurut.
- **Sesi 79: Konsep Tumpukan (Stack: LIFO) dan Antrean (Queue: FIFO)**
  - *Analogi*: Tumpukan piring cuci (terakhir ditaruh, pertama dicuci) vs antrean kasir tiket bioskop.
- **Sesi 80: Simulasi Soal-Soal Ujian Bebras Kategori Benjamins (Usia 10-12 Tahun) Bagian 1**
- **Sesi 81: Simulasi Soal-Soal Ujian Bebras Kategori Benjamins Bagian 2**
- **Sesi 82: Pembahasan Trik Cepat & Strategi Manajemen Waktu Ujian Kompetisi**
- **Sesi 83: Try Out Mandiri Olimpiade Informatika Tingkat Dasar**
- **Sesi 84: CAPSTONE LEVEL 7: Evaluasi Kompetensi Algoritma & Medali Asah Otak**
  - *Output*: Hasil evaluasi skor uji kompetensi logika dan portofolio solusi algoritma.
  - *Apresiasi*: Sertifikat *Computational Thinking & Olympiad Ready*.

---

## 📌 LEVEL 8: INTEGRASI PROYEK AKHIR 2 TAHUN & PORTOFOLIO MASA DEPAN (SESI 85 – 96)
- **Sesi 85: Merancang Portofolio Mahakarya 2 Tahun (Grand Capstone Intermediate)**
  - *Pilihan Kategori*: Web App Interaktif, Game 3D Roblox Kompleks, atau Utilitas Python Cerdas.
- **Sesi 86: Arsitektur Proyek, Wireframing UI & Penyusunan Milestone Pengerjaan**
- **Sesi 87: Sprint 1 Pengerjaan: Fondasi Struktur Kode & Database Penyimpanan**
- **Sesi 88: Sprint 2 Pengerjaan: Logika Interaktivitas & Fitur Andalan Aplikasi**
- **Sesi 89: Sprint 3 Pengerjaan: Pengujian Bug, Validasi Input & Keamanan Kode**
- **Sesi 90: Sprint 4 Pengerjaan: Sentuhan Estetika UI/UX & Audio Visual**
- **Sesi 91: Pengenalan Git Dasar & Upload Source Code ke Repositori GitHub**
  - *Standar Industri*: Siswa memiliki akun GitHub pribadi dengan dokumentasi `README.md` rapi.
- **Sesi 92: Deployment Aplikasi ke Cloud Hosting Publik (Domain Live Online)**
- **Sesi 93: Pembuatan Video Demo & Pitch Deck Presentasi Proyek Siswa**
- **Sesi 94: Gladi Bersih Presentasi di Hadapan Panel Instruktur Senior**
- **Sesi 95: Rehearsal Wisuda Kelulusan & Diskusi Jalur Peminatan Teens Innovator**
- **Sesi 96: GRADUATION DAY & BEEKODING INTERMEDIATE EXPO (SESI 96)**
  - *Puncak Acara*: Wisuda Akbar Kelulusan Tahap 2 Intermediate Coder (96 Sesi).
  - *Penganugerahan*: Sertifikat Kelulusan *Intermediate Master Graduate* & Tiket Masuk Tahap 3: Teens Innovator.

---

## 🛠️ LEMBAR RUBRIK PENILAIAN KELULUSAN SISWA INTERMEDIATE
| Aspek Kompetensi | Kriteria Evaluasi | Bobot |
| :--- | :--- | :---: |
| **Arsitektur & Logika Kode** | Struktur program rapi, modular dengan fungsi, minim bug fatal. | 25% |
| **Kemandirian Problem Solving** | Mampu membaca pesan error dan mencari solusi debugging secara terarah. | 25% |
| **Desain Antarmuka (UI/UX)** | Tata letak rapi, intuitif digunakan, konsisten secara visual. | 20% |
| **Penyimpanan Data Permanen** | Berhasil mengimplementasikan TinyDB / LocalStorage / File IO. | 15% |
| **Presentasi & Dokumentasi** | Mampu menjelaskan alur kerja kode dan mendemokan aplikasi dengan percaya diri. | 15% |

*Dokumen panduan mengajar resmi diterbitkan oleh Divisi Kurikulum Beekoding Academy.*
