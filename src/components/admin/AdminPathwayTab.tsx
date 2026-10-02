import React from 'react';
import {
  Download,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import type { CurriculumTier } from '../../services/adminStorage';

export interface PathwayLevel {
  levelNumber: number;
  sessionRange: string;
  sessionsCount: number;
  title: string;
  theme: string;
  description: string;
  badge: string;
  color: string;
  topics: {
    session: number;
    title: string;
    concept: string;
    project: string;
  }[];
}

export const PATHWAY_DATA: Record<
  CurriculumTier,
  {
    stageTitle: string;
    ageRange: string;
    pdfDownloadUrl: string;
    pdfFileName: string;
    levels: PathwayLevel[];
  }
> = {
  junior: {
    stageTitle: 'Tahap 1: Junior Explorer (Usia 6–9 Tahun)',
    ageRange: '6 – 9 Tahun (TK B & SD Kelas 1–3)',
    pdfDownloadUrl: '/curriculum/panduan-instruktur-junior-explorer.pdf',
    pdfFileName: 'Panduan-Instruktur-Junior-Explorer-Sesi-01-96.pdf',
    levels: [
      {
        levelNumber: 1,
        sessionRange: 'Sesi 01 – 12',
        sessionsCount: 12,
        title: 'Starter Foundation & Visual Motion',
        theme: 'Scratch 3.0 Dasar & Cerita Digital',
        description: 'Membangun logika berpikir komputasional, animasi aktor, dan game arcade pertama.',
        badge: 'Level 1 Foundation',
        color: 'amber',
        topics: [
          { session: 1, title: 'Petualangan Robot Lebah', concept: 'Algoritma & Instruksi Presisi', project: 'Unplugged Maze Grid' },
          { session: 2, title: 'Menghidupkan Karakter Scratch', concept: 'Stage, Sprite & Motion', project: 'Animasi Gerak Pertama' },
          { session: 3, title: 'Pemicu Peristiwa (Events)', concept: 'When Clicked & Efek Suara', project: 'Bunga Bersuara Interaktif' },
          { session: 4, title: 'Kepakan Sayap Lebah', concept: 'Perulangan Loop Repeat & Forever', project: 'Animasi Sayap Terbang' },
          { session: 5, title: 'Percakapan Dua Karakter', concept: 'Timing & Blok Wait', project: 'Dialog Cerita Bergantian' },
          { session: 6, title: 'Ekstensi AI Text-to-Speech', concept: 'Sintesis Suara Bahasa Indonesia', project: 'Karakter Berbicara Nyata' },
          { session: 7, title: 'Merancang Hero Bersama AI', concept: 'Image Prompting Ramah Anak', project: 'Karakter Astronot AI' },
          { session: 8, title: 'Evaluasi Mini Proyek 1', concept: 'Interaktivitas Halaman Cerita', project: 'Buku Cerita Digital Interaktif' },
          { session: 9, title: 'Labirin Sarang Lebah', concept: 'Navigasi Panah & Color Sensing', project: 'Labirin Deteksi Tembok' },
          { session: 10, title: 'Panen Madu & Variabel Skor', concept: 'Variables System & Nektar', project: 'Koleksi Madu Berpapan Skor' },
          { session: 11, title: 'Laba-Laba Patroli & Game Over', concept: 'Musuh Bergerak & Broadcast', project: 'Rintangan Laba-Laba' },
          { session: 12, title: 'Capstone 1: Bee Honey Harvest', concept: 'Game Arcade Mandiri Utuh', project: 'Game Panen Madu Lengkap' },
        ],
      },
      {
        levelNumber: 2,
        sessionRange: 'Sesi 13 – 24',
        sessionsCount: 12,
        title: 'Game Mechanics & Logika Dinamis',
        theme: 'Fisika Kartesius, Skor & Nyawa',
        description: 'Mekanika game interaktif sumbu X/Y, timer hitung mundur, nyawa hati, dan fisika gravitasi.',
        badge: 'Level 2 Mechanics',
        color: 'amber',
        topics: [
          { session: 13, title: 'Game Tangkap Apel Jatuh', concept: 'Koordinat Sumbu X dan Y', project: 'Mangkuk Penangkap Buah' },
          { session: 14, title: 'Efek Partikel & Skor Mengapung', concept: 'Kloning Sprite & Efek Kilau', project: 'Animasi Skor Terapung' },
          { session: 15, title: 'Timer Hitung Mundur', concept: 'Variabel Waktu & Alarm', project: 'Papan Waktu 30 Detik' },
          { session: 16, title: 'Logika Nyawa & Buah Busuk', concept: 'Variabel Nyawa & Pengurangan', project: 'Sistem Health Point 3 Hati' },
          { session: 17, title: 'Multi-Level Switching', concept: 'Tingkat Kesulitan Bertingkat', project: 'Kenaikan Level 2 Cepat' },
          { session: 18, title: 'Fisika Lompat Gravitasi', concept: 'Velocity Y & Tarikan Tanah', project: 'Karakter Melompat Natural' },
          { session: 19, title: 'Game Flappy Bee Pipa', concept: 'Scrolling Rintangan Menyamping', project: 'Game Flappy Menembus Pipa' },
          { session: 20, title: 'High Score System', concept: 'Papan Rekor Tertinggi', project: 'Penyimpanan Rekor Terbaik' },
          { session: 21, title: 'Audio Latar & Tombol Mute', concept: 'Background Music Loop', project: 'Kontrol Suara Interaktif' },
          { session: 22, title: 'Storyboard Game Sheet', concept: 'Perancangan Konsep Tertulis', project: 'Sketsa Desain Game' },
          { session: 23, title: 'Produksi Proyek Mandiri', concept: 'Pembangunan Game Platformer', project: 'Coding Platformer Cilik' },
          { session: 24, title: 'Capstone 2: Flappy Bee Adventure', concept: 'Game Multi-Level Lengkap', project: 'Showcase Semester 1' },
        ],
      },
      {
        levelNumber: 3,
        sessionRange: 'Sesi 25 – 36',
        sessionsCount: 12,
        title: 'Sensory & Physical Computing',
        theme: 'Hardware Micro:bit & Makey Makey',
        description: 'Menghubungkan koding dengan dunia nyata: LED matriks, accelerometer, konduksi buah, dan jam pintar.',
        badge: 'Level 3 Hardware',
        color: 'emerald',
        topics: [
          { session: 25, title: 'Dunia Fisik & Mikrokontroler', concept: 'Koneksi Hardware Bluetooth', project: 'Pengenalan Board Fisik' },
          { session: 26, title: 'Animasi LED Matriks 5x5', concept: 'Cahaya LED Nyata & Ikon Hati', project: 'Senyum Digital Berkedip' },
          { session: 27, title: 'Tombol Fisik A dan B', concept: 'Input Tombol Hardware', project: 'Gamepad Dua Tombol' },
          { session: 28, title: 'Sensor Goyang Accelerometer', concept: 'Deteksi Getaran & Kemiringan', project: 'Dadu Ajaib Digital' },
          { session: 29, title: 'Kompas Digital Magnetik', concept: 'Arah Mata Angin Komputer', project: 'Kompas Navigasi Cilik' },
          { session: 30, title: 'Sensor Suara Mikrofon', concept: 'Deteksi Desibel Tepukan', project: 'Lompat Berbasis Suara' },
          { session: 31, title: 'Piano Pisang Makey Makey', concept: 'Konduktivitas Listrik Buah', project: 'Tangga Nada Do-Re-Mi' },
          { session: 32, title: 'Termometer Alarm Pintar', concept: 'Sensor Suhu Ambient', project: 'Alarm Deteksi Panas' },
          { session: 33, title: 'Smart Pedometer Cilik', concept: 'Penghitung Langkah Kaki', project: 'Jam Pelacak Olahraga' },
          { session: 34, title: 'DIY Cardboard Gamepad', concept: 'Gamepad Kardus & Foil', project: 'Controller Game Fisik' },
          { session: 35, title: 'Integrasi Hardware-Software', concept: 'Kalibrasi Respons Sensor', project: 'Game Sensor Layar Lebar' },
          { session: 36, title: 'Capstone 3: Gadget Expo Cilik', concept: 'Pameran Alat Sensor Interaktif', project: 'Pameran Perangkat Cilik' },
        ],
      },
      {
        levelNumber: 4,
        sessionRange: 'Sesi 37 – 48',
        sessionsCount: 12,
        title: 'Junior Game Jam & Kolaborasi Karya',
        theme: 'Kerja Tim, Boss Battle & Expo',
        description: 'Kerja sama desainer dan programmer cilik, lore dunia game, sistem NPC quest, audio dubbing, dan expo tahunan.',
        badge: 'Level 4 Annual Track',
        color: 'emerald',
        topics: [
          { session: 37, title: 'Pembentukan Tim Game Jam', concept: 'Kolaborasi Peran & Komunikasi', project: 'Struktur Tim Kreator' },
          { session: 38, title: 'World Building & Lore', concept: 'Peta Dunia Fantasi Sarang', project: 'Desain Peta Bertingkat' },
          { session: 39, title: 'Dialog Kompleks & NPC Quest', concept: 'Karakter Pemberi Misi Cerita', project: 'Sistem Misi Nektar Emas' },
          { session: 40, title: 'Sistem Inventori Kantung', concept: 'Struktur Data List Sederhana', project: 'Kantung Barang Pemain' },
          { session: 41, title: 'Boss Fight Battle HP 20', concept: 'Musuh Besar & Pola Tembakan', project: 'Pertarungan Boss Raksasa' },
          { session: 42, title: 'Efek Visual Screen Shake', concept: 'Guncangan Layar Ledakan', project: 'Efek Partikel Dramatis' },
          { session: 43, title: 'Audio Foley & Dubbing Siswa', concept: 'Rekaman Suara Mandiri', project: 'Dubbing Karakter Game' },
          { session: 44, title: 'Debugging Jam Bersama', concept: 'Analisis Bug Kode Teman', project: 'Pembersihan Error Bersama' },
          { session: 45, title: 'Menu Pembuka & Kredit Pembuat', concept: 'Polishing Halaman Judul', project: 'Tampilan Judul Game Rilis' },
          { session: 46, title: 'Latihan Public Speaking Cilik', concept: 'Struktur Pitching Demo', project: 'Presentasi Percaya Diri' },
          { session: 47, title: 'Rehearsal Bersama Orang Tua', concept: 'Simulasi Pameran Akbar', project: 'Uji Coba Playtest Final' },
          { session: 48, title: 'Capstone 4: Junior Coding Expo', concept: 'Pameran Portofolio 48 Sesi', project: 'Wisuda Tahun 1 Lengkap' },
        ],
      },
      {
        levelNumber: 5,
        sessionRange: 'Sesi 49 – 60',
        sessionsCount: 12,
        title: 'Advanced Scratch Extensions & Seni Digital',
        theme: 'Pen Koding, Musik MIDI & Video Sensing',
        description: 'Eksplorasi gambar fraktal matematika otomatis, komposisi musik klasik, dan game augmented reality video sensing.',
        badge: 'Level 5 Creative Art',
        color: 'blue',
        topics: [
          { session: 49, title: 'Ekstensi Pen Koding Dasar', concept: 'Pena Digital Panggung', project: 'Kanvas Garis Pelangi' },
          { session: 50, title: 'Gambar Bangun Datar Geometri', concept: 'Derajat Sudut Putar Otomatis', project: 'Segitiga & Persegi Sempurna' },
          { session: 51, title: 'Mandala & Fraktal Pelangi', concept: 'Nested Loop Pola Bunga', project: 'Seni Fraktal Geometris' },
          { session: 52, title: 'Paint App Spidol Ajaib', concept: 'Kuas Pelacak Kursor Mouse', project: 'Aplikasi Papan Gambar' },
          { session: 53, title: 'Ekstensi Musik Drum MIDI', concept: 'Ketukan Birama BPM Audio', project: 'Instrumen Drum Elektronik' },
          { session: 54, title: 'Komposisi Lagu Twinkle Star', concept: 'Nada Balok play note beats', project: 'Harmoni Lagu Klasik Koding' },
          { session: 55, title: 'Ekstensi Video Sensing Kamera', concept: 'Deteksi Gerakan Tubuh Web', project: 'Kamera Pengenal Gerak' },
          { session: 56, title: 'Game Menepuk Balon AR', concept: 'Video Motion On Sprite', project: 'Game Sentuh Balon Udara' },
          { session: 57, title: 'Filter Wajah AR Kacamata', concept: 'Pelacak Gerakan Kepala', project: 'Filter Lucu Ala Sosmed' },
          { session: 58, title: 'Integrasi Seni, Musik & Kamera', concept: 'Instalasi Multimedia Terpadu', project: 'Instalasi Tari Interaktif' },
          { session: 59, title: 'Gladi Bersih Proyek Seni AR', concept: 'Kalibrasi Cahaya Webcam', project: 'Penyempurnaan Responsif AR' },
          { session: 60, title: 'Capstone 5: Digital Art Expo', concept: 'Pameran Seni Multi-Ekstensi', project: 'Galeri Seni Interaktif' },
        ],
      },
      {
        levelNumber: 6,
        sessionRange: 'Sesi 61 – 72',
        sessionsCount: 12,
        title: 'Algoritma Matematika & Logika Labirin',
        theme: 'Operasi Angka, List & Olimpiade Bebras',
        description: 'Operator matematika cerdas, kamus data list, algoritma penelusur labirin otonom, dan soal berpikir kritis komputasi.',
        badge: 'Level 6 Logic & Math',
        color: 'blue',
        topics: [
          { session: 61, title: 'Operasi Aritmatika Cerdas', concept: 'Operator Penjumlahan & Banding', project: 'Kalkulator Cilik Otomatis' },
          { session: 62, title: 'Kuis Matematika Kilat Berwaktu', concept: 'Input Pengguna & Validasi', project: 'Math Challenge Game' },
          { session: 63, title: 'Struktur Data List Inventori', concept: 'Koleksi Multi-Item List', project: 'Daftar Belanja Karakter' },
          { session: 64, title: 'Game Tebak Kata & Kamus Mini', concept: 'Panggilan Acak Isi Daftar', project: 'Kuis Tebak Kosakata' },
          { session: 65, title: 'Pencarian Linear Search', concept: 'Pemeriksaan Elemen Berurut', project: 'Pelacak Ramuan Tas Ransel' },
          { session: 66, title: 'Logika Labirin Tembok Kiri', concept: 'Navigasi Robot Otonom Mandiri', project: 'Penyelesai Labirin Otomatis' },
          { session: 67, title: 'Simulasi Akuarium Virtual', concept: 'Kecerdasan Buatan Perilaku', project: 'Ekosistem Ikan Mandiri' },
          { session: 68, title: 'Ekonomi Mini Jual Beli Madu', concept: 'Transaksi Stok & Koin Emas', project: 'Simulasi Toko Desa' },
          { session: 69, title: 'Asah Otak Bebras Kids 1', concept: 'Dekomposisi Masalah Nyata', project: 'Penyelesaian Teka-Teki Logika' },
          { session: 70, title: 'Game Puzzle Asah Otak', concept: 'Desain Teka-Teki Mandiri', project: 'Game Asah Otak Teman' },
          { session: 71, title: 'Uji Kasus Ekstrem Debugging', concept: 'Penanganan Jawaban Aneh', project: 'Game Tahan Banting Error' },
          { session: 72, title: 'Capstone 6: Smart Bee Kingdom', concept: 'Simulasi Kerajaan Terpadu', project: 'Proyek Kerajaan Cerdas' },
        ],
      },
      {
        levelNumber: 7,
        sessionRange: 'Sesi 73 – 84',
        sessionsCount: 12,
        title: 'Robotik Cerdas & Kota Pintar Beeville',
        theme: 'Kendaraan Otonom, IoT & Smart City',
        description: 'Simulasi mobil otonom tanpa supir, palang pintu kereta pintar, lampu taman hemat energi, dan miniatur kota cerdas.',
        badge: 'Level 7 Smart Robotics',
        color: 'purple',
        topics: [
          { session: 73, title: 'Dunia Robot & Mobil Otonom', concept: 'Logika Kendaraan Otomatis', project: 'Pengenalan Sistem Otonom' },
          { session: 74, title: 'Robot Pengantar Line Follower', concept: 'Sensor Warna Penelusur Garis', project: 'Robot Pelayan Restoran' },
          { session: 75, title: 'Palang Pintu Kereta Pintar', concept: 'Sensor Jarak Dekat Palang', project: 'Palang Kereta Otomatis' },
          { session: 76, title: 'Lampu Taman Smart Home', concept: 'Sensor Cahaya Ambient Gelap', project: 'Lampu Malam Hemat Energi' },
          { session: 77, title: 'Robot Vacuum Pembersih', concept: 'Jelajah Acak & Charger Baterai', project: 'Simulasi Pembersih Lantai' },
          { session: 78, title: 'Lalu Lintas 4 Persimpangan', concept: 'Siklus Waktu Lampu Hijau-Merah', project: 'Pengatur Macet Simpang 4' },
          { session: 79, title: 'Penyortir Sampah Pintar', concept: 'Klasifikasi Objek Daur Ulang', project: 'Tempat Sampah Cerdas' },
          { session: 80, title: 'Penyiram Tanaman Otomatis', concept: 'Sensor Kelembaban Tanah', project: 'Rumah Kaca Pintar' },
          { session: 81, title: 'Miniatur Smart City Beeville', concept: 'Integrasi Multi-Sistem Kota', project: 'Peta Kota Terpadu' },
          { session: 82, title: 'Stress Test Beban Kota', concept: 'Simulasi 20 Mobil Bersamaan', project: 'Uji Ketahanan Sistem Kota' },
          { session: 83, title: 'Video Dokumentasi Robotik', concept: 'Screen Recording Penjelasan', project: 'Video Penjelasan Kota Cerdas' },
          { session: 84, title: 'Capstone 7: Beeville Smart City', concept: 'Pameran Kota Pintar Interaktif', project: 'Showcase Kota Masa Depan' },
        ],
      },
      {
        levelNumber: 8,
        sessionRange: 'Sesi 85 – 96',
        sessionsCount: 12,
        title: 'Pre-Code Transisi & Wisuda Akbar 2 Tahun',
        theme: 'Python Turtle Teks, Web Profile & Wisuda',
        description: 'Transisi mengetik kode teks asli di Python Turtle, perancangan grand capstone 2 tahun, dan penganugerahan wisuda.',
        badge: 'Level 8 Master Graduate',
        color: 'purple',
        topics: [
          { session: 85, title: 'Jembatan Menuju Koding Teks', concept: 'Dari Blok ke Baris Kalimat', project: 'Membaca Kode Teks Asli' },
          { session: 86, title: 'Perintah Teks Python Turtle', concept: 'Sintaks forward dan right', project: 'Gambar Rumah dengan Teks' },
          { session: 87, title: 'Variabel Teks: String & Integer', concept: 'player_name dan score di Python', project: 'Penyimpanan Nilai Teks' },
          { session: 88, title: 'Logika Kondisional If-Else Teks', concept: 'Pengecekan Skor Berbasis Teks', project: 'Kuis Konsol Teks Sederhana' },
          { session: 89, title: 'Perancangan Grand Capstone', concept: 'Masterpiece Project 2 Tahun', project: 'Proposal Mahakarya Siswa' },
          { session: 90, title: 'Produksi Capstone: Core Engine', concept: 'Mekanika Inti Permainan', project: 'Fondasi Proyek Pamungkas' },
          { session: 91, title: 'Produksi Capstone: AI & Suara', concept: 'Integrasi Kecerdasan & Audio', project: 'Penyempurnaan Fitur Cerdas' },
          { session: 92, title: 'Produksi Capstone: Visual Polishing', concept: 'Partikel & Transisi Layar', project: 'Kualitas Visual Profesional' },
          { session: 93, title: 'Playtesting Dewan Instruktur', concept: 'Audit Kualitas Tanpa Bug', project: 'Pengujian Bug Komprehensif' },
          { session: 94, title: 'Pembuatan Web Portofolio Siswa', concept: 'Profil Portofolio Online Resmi', project: 'Halaman Web Profil Karya' },
          { session: 95, title: 'Gladi Bersih Wisuda Kelulusan', concept: 'Pitching Practice & Pidato', project: 'Latihan Presentasi Wisuda' },
          { session: 96, title: 'Grand Graduation Day 96 Sesi', concept: 'Penganugerahan Master Graduate', project: 'Wisuda Akbar 2 Tahun Penuh' },
        ],
      },
    ],
  },
  middle: {
    stageTitle: 'Tahap 2: Intermediate Coder (Usia 10–12 Tahun)',
    ageRange: '10 – 12 Tahun (SD Kelas 4–6 / SMP Kelas 7)',
    pdfDownloadUrl: '/curriculum/panduan-instruktur-intermediate-coder.pdf',
    pdfFileName: 'Panduan-Instruktur-Intermediate-Coder-Sesi-01-96.pdf',
    levels: [
      {
        levelNumber: 1,
        sessionRange: 'Sesi 01 – 12',
        sessionsCount: 12,
        title: 'App Inventor Mobile App Creation',
        theme: 'Aplikasi Android, Sensor & TinyDB',
        description: 'Membangun aplikasi ponsel pintar nyata, pembacaan accelerometer, AI Speech, dan build instalasi APK.',
        badge: 'Level 1 Mobile Dev',
        color: 'blue',
        topics: [
          { session: 1, title: 'Arsitektur Ponsel & MIT Companion', concept: 'Designer vs Blocks & Live QR Test', project: 'Koneksi Aplikasi Android' },
          { session: 2, title: 'Aplikasi Soundboard Interaktif', concept: 'Button Event & Sound Component', project: 'Aplikasi Papan Efek Suara' },
          { session: 3, title: 'Sensor Gerak Ponsel Accelerometer', concept: 'Shake Gesture Membaca Guncangan', project: 'Aplikasi Dadu Goyang Fisik' },
          { session: 4, title: 'Penerjemah Suara Cerdas AI', concept: 'Speech Recognizer & TTS', project: 'Penerjemah Suara Cilik' },
          { session: 5, title: 'Desain UI Modern CardView', concept: 'Palet Warna Hex & Border Radius', project: 'Antarmuka Aplikasi Menawan' },
          { session: 6, title: 'Aplikasi Kalkulator Nilai', concept: 'TextBox Input & Logika Hitung', project: 'Kalkulator Uang Jajan' },
          { session: 7, title: 'Logika Percabangan Grade Ujian', concept: 'if - else if - else Bertingkat', project: 'Penentu Nilai Rapor Digital' },
          { session: 8, title: 'Database Lokal Ponsel TinyDB', concept: 'Penyimpanan Permanen Key-Value', project: 'Sistem Simpan Data Ponsel' },
          { session: 9, title: 'Aplikasi To-Do List Harian', concept: 'TinyDB GetValue & Hapus Data', project: 'Agenda Catatan Tugas' },
          { session: 10, title: 'Canvas 2D Whack-a-Mole', concept: 'Canvas, ImageSprite & Clock Timer', project: 'Game Sentuh Monster Ponsel' },
          { session: 11, title: 'Export Berkas APK Mandiri', concept: 'Build .apk & Instal di Smartphone', project: 'Instalasi Aplikasi Nyata' },
          { session: 12, title: 'Capstone 1: Android Utility App', concept: 'Aplikasi Mobile Fungsional Penuh', project: 'Showcase Aplikasi Android' },
        ],
      },
      {
        levelNumber: 2,
        sessionRange: 'Sesi 13 – 24',
        sessionsCount: 12,
        title: 'Web Frontend Fundamentals (HTML5 & CSS3)',
        theme: 'HTML5 Semantik & CSS3 Flexbox',
        description: 'Pondasi internet dunia nyata, kerangka semantik HTML, box model, tata letak flexbox modern, dan halaman responsif.',
        badge: 'Level 2 Web Design',
        color: 'blue',
        topics: [
          { session: 13, title: 'Anatomi Web: Client & Server', concept: 'HTTP, Browser & VS Code Editor', project: 'Pemahaman Fondasi Internet' },
          { session: 14, title: 'Tulang HTML5 Semantik', concept: 'Tag h1, p, a, img, section, footer', project: 'Kerangka Dokumen Standar' },
          { session: 15, title: 'Halaman Profil Biodata Developer', concept: 'Tabel, List & Gambar Profil Diri', project: 'Website Biodata Pribadi' },
          { session: 16, title: 'Pengenalan Gaya Visual CSS3', concept: 'Selector, Property & Google Fonts', project: 'Pewarnaan & Tipografi Web' },
          { session: 17, title: 'Memahami CSS Box Model', concept: 'Margin, Border, Padding & Content', project: 'Penataan Spasi Rapi' },
          { session: 18, title: 'Tata Letak Modern CSS Flexbox', concept: 'Align items & Justify content', project: 'Susunan Kartu Produk Rapi' },
          { session: 19, title: 'Form Input Interaktif Lengkap', concept: 'Tag form, text, select & button', project: 'Formulir Kontak Responsif' },
          { session: 20, title: 'Desain Responsif Media Queries', concept: 'Tampilan Rapi di Laptop & HP', project: 'Website Mobile-Friendly' },
          { session: 21, title: 'Animasi Transisi Halus CSS', concept: 'Hover Effects & Keyframe Motion', project: 'Tombol & Kartu Animatif' },
          { session: 22, title: 'Penyusunan Portofolio Lengkap', concept: 'Struktur Multi-Halaman Bersih', project: 'Website Portofolio Utuh' },
          { session: 23, title: 'Code Review & Validasi W3C', concept: 'Standar Kode Bersih & Indentasi', project: 'Pembersihan Kode HTML/CSS' },
          { session: 24, title: 'Capstone 2: Personal Web Portfolio', concept: 'Website Interaktif Siap Online', project: 'Demo Web Portofolio Live' },
        ],
      },
      {
        levelNumber: 3,
        sessionRange: 'Sesi 25 – 36',
        sessionsCount: 12,
        title: 'JavaScript & Interaktivitas Web Dinamis',
        theme: 'Manipulasi DOM, Event & LocalStorage',
        description: 'Menghidupkan website menggunakan JavaScript: event listeners, manipulasi teks DOM, array dinamis, dan local storage.',
        badge: 'Level 3 JavaScript',
        color: 'emerald',
        topics: [
          { session: 25, title: 'Otak Logika Web JavaScript', concept: 'Peran JS Menggerakkan Halaman', project: 'Console Log Pertama' },
          { session: 26, title: 'Variabel Modern let & const', concept: 'Tipe Data Primitif String/Number', project: 'Penyimpanan Nilai Memori' },
          { session: 27, title: 'Manipulasi DOM Browser', concept: 'getElementById & innerText', project: 'Teks Dinamis Otomatis' },
          { session: 28, title: 'Event Listener Tombol Interaktif', concept: 'addEventListener click & hover', project: 'Tombol Aksi Responsif' },
          { session: 29, title: 'Toggle Dark Mode Dinamis', concept: 'Manipulasi classList CSS', project: 'Fitur Ganti Tema Gelap/Terang' },
          { session: 30, title: 'Percabangan Logika JS if-else', concept: 'Operator Logika Perbandingan', project: 'Validasi Syarat Masuk' },
          { session: 31, title: 'Perulangan for & Array Koleksi', concept: 'Daftar Array & Indeks Data', project: 'Pemrosesan Kumpulan Nilai' },
          { session: 32, title: 'Rendering List Elemen Dinamis', concept: 'Pembuatan Tag li dari Array JS', project: 'Daftar Belanja Otomatis' },
          { session: 33, title: 'Aplikasi Web To-Do List', concept: 'Tambah, Coret & Hapus Tugas', project: 'Aplikasi Pengatur Agenda' },
          { session: 34, title: 'Browser LocalStorage Permanen', concept: 'JSON.stringify & getItem Storage', project: 'Data Tetap Ada Pasca Refresh' },
          { session: 35, title: 'Integrasi Audio Efek Tombol', concept: 'Audio Object & Sound Trigger', project: 'Sound Effect Interaktif Web' },
          { session: 36, title: 'Capstone 3: Dynamic Web App', concept: 'Aplikasi Web Fungsional Mandiri', project: 'Aplikasi Web Interaktif Utuh' },
        ],
      },
      {
        levelNumber: 4,
        sessionRange: 'Sesi 37 – 48',
        sessionsCount: 12,
        title: 'Game Engine 2D & Fisika Canvas JavaScript',
        theme: 'Canvas HTML5, Gravitasi & Dino Runner',
        description: 'Membangun game 2D di browser dengan siklus game loop 60 FPS, deteksi tabrakan AABB, dan deployment ke cloud.',
        badge: 'Level 4 Annual Track',
        color: 'emerald',
        topics: [
          { session: 37, title: 'Canvas HTML5 & Game Loop', concept: 'requestAnimationFrame 60 FPS', project: 'Kanvas Game Berputar Mulus' },
          { session: 38, title: 'Gerak Sumbu X-Y dengan Keyboard', concept: 'Event Keydown & Posisi Koordinat', project: 'Kontrol Karakter Kotak' },
          { session: 39, title: 'Fisika Gravitasi & Velocity Y', concept: 'Kecepatan Jatuh & Deteksi Lantai', project: 'Simulasi Gravitasi Bumi' },
          { session: 40, title: 'Algoritma Tabrakan AABB', concept: 'Bounding Box Collision Formula', project: 'Deteksi Kena Rintangan' },
          { session: 41, title: 'Spawning Rintangan Meluncur', concept: 'Rintangan Bergerak dari Kanan', project: 'Tantangan Semakin Cepat' },
          { session: 42, title: 'Game Dino Bee Jump Runner', concept: 'Endless Runner Permainan Utuh', project: 'Game Pelari Tak Berujung' },
          { session: 43, title: 'Animasi Karakter Sprite Sheet', concept: 'Memotong Frame Gambar Bergerak', project: 'Animasi Kaki Melangkah' },
          { session: 44, title: 'Audio Manager Multi-Channel', concept: 'Musik Latar & Efek Suara Lompat', project: 'Tata Suara Game Komersial' },
          { session: 45, title: 'State Menu, Pause & Restart', concept: 'Game State Management', project: 'Alur Menu Permainan Rapi' },
          { session: 46, title: 'Playtest & Game Balancing', concept: 'Keseimbangan Tingkat Kesulitan', project: 'Uji Coba Bersama Teman' },
          { session: 47, title: 'Deploy Game ke Cloudflare Pages', concept: 'Hosting Cloud Domain Publik', project: 'Game Online Live di Internet' },
          { session: 48, title: 'Capstone 4: 2D Browser Arcade', concept: 'Turnamen Pameran Game 48 Sesi', project: 'Wisuda Tahun 1 Intermediate' },
        ],
      },
      {
        levelNumber: 5,
        sessionRange: 'Sesi 49 – 60',
        sessionsCount: 12,
        title: 'Roblox Lua 3D Game Engineering',
        theme: 'Roblox Studio, Scripting Lua & Obby 3D',
        description: 'Membangun dunia game 3D di platform Roblox, scripting event sentuhan Lua, leaderstats global, dan rilis multiplayer.',
        badge: 'Level 5 3D Game Dev',
        color: 'purple',
        topics: [
          { session: 49, title: 'Roblox Studio & Ruang 3D', concept: 'Sumbu X, Y, Z & Part Geometri', project: 'Eksplorasi Dunia 3D' },
          { session: 50, title: 'Membangun Obby Parkour Level 1', concept: 'SpawnLocation & Blok Lompatan', project: 'Rintangan Lompat 3D Pertama' },
          { session: 51, title: 'Bahasa Scripting Lua Dasar', concept: 'Menulis Script di Dalam Part', project: 'Perubahan Warna Part Otomatis' },
          { session: 52, title: 'Event Touched & Kill Brick', concept: 'Deteksi Sentuhan Pemain Humanoid', project: 'Balok Lava Merah Mematikan' },
          { session: 53, title: 'Variabel Properti & WalkSpeed', concept: 'Manipulasi Gravitasi & Kecepatan', project: 'Hukum Fisika Virtual Kustom' },
          { session: 54, title: 'Platform Menghilang Berkedip', concept: 'Disappearing Platform Timer', project: 'Jembatan Tembus Pandang' },
          { session: 55, title: 'Papan Peringkat Leaderstats', concept: 'Skor Koin & Level Server Global', project: 'Leaderboard Papan Skor' },
          { session: 56, title: 'Koin Emas Berputar & Partikel', concept: 'Rotasi CFrame 3D & Efek Bintang', project: 'Koleksi Koin Bersinar' },
          { session: 57, title: 'Toko Interaktif & Power-Up', concept: 'Sistem Pembelian Koin Virtual', project: 'Pintu Toko Penambah Lari' },
          { session: 58, title: 'Playtest Server Multiplayer', concept: 'Main Bareng di Server Bersama', project: 'Uji Coba Bersama Sekelas' },
          { session: 59, title: 'Pencahayaan Atmosferik 3D', concept: 'Lighting Atmosphere & SunRays', project: 'Grafis Game Berkualitas Tinggi' },
          { session: 60, title: 'Capstone 5: Publikasi Game Roblox', concept: 'Rilis Publik Game Multiplayer', project: 'Game Obby Live di Roblox' },
        ],
      },
      {
        levelNumber: 6,
        sessionRange: 'Sesi 61 – 72',
        sessionsCount: 12,
        title: 'Transisi ke Bahasa Teks Murni: Python 3',
        theme: 'Sintaks Python, Loop, Fungsi & File I/O',
        description: 'Meninggalkan blok visual menuju bahasa koding teks paling populer di dunia: Python 3 di editor VS Code.',
        badge: 'Level 6 Python Coder',
        color: 'purple',
        topics: [
          { session: 61, title: 'Selamat Datang di Python 3', concept: 'VS Code & print Hello World', project: 'Program Teks Pertama' },
          { session: 62, title: 'Input Pengguna & Format String', concept: 'Fungsi input & f-strings rapi', project: 'Percakapan Terminal Interaktif' },
          { session: 63, title: 'Operasi Aritmatika & Tipe Data', concept: 'Integer, Float & Konversi int()', project: 'Kalkulator Luas Bangun' },
          { session: 64, title: 'Percabangan Teks if-elif-else', concept: 'Indentasi Tab Spasi Wajib', project: 'Pengecekan Syarat Nilai' },
          { session: 65, title: 'Game Tebak Angka Misterius', concept: 'Modul random & Petunjuk Tebakan', project: 'Game Biner Tebak Angka' },
          { session: 66, title: 'Looping while & Kontrol Program', concept: 'Game Loop Berbasis Teks', project: 'Siklus Program Berkelanjutan' },
          { session: 67, title: 'Looping for & Manipulasi String', concept: 'Iterasi Karakter Teks Kalimat', project: 'Penghitung Huruf Vokal' },
          { session: 68, title: 'Struktur Data List di Python', concept: 'Metode append, sort, max list', project: 'Manajemen Daftar Nilai' },
          { session: 69, title: 'Membuat Fungsi Mandiri def', concept: 'Modularitas Fungsi & Return', project: 'Pustaka Rumus Mandiri' },
          { session: 70, title: 'Sistem Kasir Mini Toko Teks', concept: 'Hitung Belanja & Cetak Struk', project: 'Aplikasi Kasir Toko Terminal' },
          { session: 71, title: 'Membaca & Menulis Berkas File', concept: 'with open() mode write & read', project: 'Catatan Tersimpan di Harddisk' },
          { session: 72, title: 'Capstone 6: Python Utility Suite', concept: 'Aplikasi Terminal Lengkap Fungsional', project: 'Program Konsol Python Mandiri' },
        ],
      },
      {
        levelNumber: 7,
        sessionRange: 'Sesi 73 – 84',
        sessionsCount: 12,
        title: 'Olimpiade Komputasi & Problem Solving',
        theme: 'Algoritma Bebras, Binary Search & OSN',
        description: 'Mengasah 4 pilar computational thinking tingkat tinggi: binary search, bubble sort, stack/queue, dan simulasi soal olimpiade.',
        badge: 'Level 7 Olympiad Ready',
        color: 'amber',
        topics: [
          { session: 73, title: 'Pengenalan Bebras & OSN Sains', concept: '4 Pilar Berpikir Komputasional', project: 'Wawasan Kompetisi Sains' },
          { session: 74, title: 'Dekomposisi Masalah Rute', concept: 'Memecah Rute Graf Sederhana', project: 'Pencari Rute Tercepat' },
          { session: 75, title: 'Pola Barisan Deret Angka', concept: 'Formula Matematis dalam Kode', project: 'Generator Barisan Bilangan' },
          { session: 76, title: 'Logika Boolean Saklar Gerbang', concept: 'Tabel Kebenaran AND OR XOR', project: 'Teka-Teki Pintu Rahasia' },
          { session: 77, title: 'Algoritma Binary Search Cepat', concept: 'Membagi Dua Rentang Pencarian', project: 'Pencarian Efisien O(log n)' },
          { session: 78, title: 'Algoritma Urut Bubble Sort', concept: 'Menukar Angka Bersebelahan', project: 'Visualisasi Urutan Angka' },
          { session: 79, title: 'Struktur Data Stack & Queue', concept: 'LIFO Tumpukan vs FIFO Antrean', project: 'Simulasi Antrean Tiket' },
          { session: 80, title: 'Simulasi Soal Bebras Benjamins 1', concept: 'Bedah Soal Logika Dunia Resmi', project: 'Pemecahan Soal Asah Otak 1' },
          { session: 81, title: 'Simulasi Soal Bebras Benjamins 2', concept: 'Strategi Perangkap Soal Logika', project: 'Pemecahan Soal Asah Otak 2' },
          { session: 82, title: 'Trik Cepat & Manajemen Waktu', concept: 'Ketangguhan Mental Kompetisi', project: 'Strategi Pengerjaan Ujian' },
          { session: 83, title: 'Try Out Mandiri Berwaktu', concept: 'Ujian Berwaktu Sistem Skor', project: 'Try Out Simulasi Resmi' },
          { session: 84, title: 'Capstone 7: Evaluasi Logika OSN', concept: 'Portofolio Solusi Berpikir Kritis', project: 'Sertifikasi Asah Otak Level 7' },
        ],
      },
      {
        levelNumber: 8,
        sessionRange: 'Sesi 85 – 96',
        sessionsCount: 12,
        title: 'Integrasi Proyek Akhir & Portofolio Masa Depan',
        theme: 'GitHub, Domain Publik Live & Wisuda',
        description: 'Sprint agile pengerjaan grand capstone, manajemen git version control, live domain publik, dan wisuda akbar 2 tahun.',
        badge: 'Level 8 Master Graduate',
        color: 'amber',
        topics: [
          { session: 85, title: 'Perancangan Grand Capstone 2 Tahun', concept: 'Pemilihan Topik Mahakarya', project: 'Proposal Proyek Puncak' },
          { session: 86, title: 'Wireframing UI & Sprint Plan', concept: 'Manajemen Proyek Software Agile', project: 'Rancangan Milestone Kerja' },
          { session: 87, title: 'Sprint 1: Struktur & Database', concept: 'Penyusunan Fondasi Kode Sistem', project: 'Arsitektur Program Utama' },
          { session: 88, title: 'Sprint 2: Fitur Interaktivitas', concept: 'Implementasi Logika Andalan', project: 'Fitur Unggulan Aplikasi' },
          { session: 89, title: 'Sprint 3: Pengujian Bug Sistem', concept: 'Validasi Input & Error Handling', project: 'Aplikasi Bebas Eror Fatal' },
          { session: 90, title: 'Sprint 4: Polishing Estetika UI', concept: 'Sentuhan Visual Desain Prima', project: 'Tampilan Standar Industri' },
          { session: 91, title: 'Git & Upload Repositori GitHub', concept: 'Version Control & README.md', project: 'Jejak Repositori GitHub Siswa' },
          { session: 92, title: 'Deploy Domain Publik Online', concept: 'Hosting Cloud Aktif 24 Jam', project: 'Aplikasi Live Diakses Publik' },
          { session: 93, title: 'Video Demo & Pitch Deck 2 Menit', concept: 'Komunikasi Visual Proyek Cepat', project: 'Video Portofolio Resmi' },
          { session: 94, title: 'Gladi Bersih Dewan Instruktur', concept: 'Simulasi Tanya Jawab Arsitektur', project: 'Latihan Menjawab Juri' },
          { session: 95, title: 'Rehearsal Wisuda Kelulusan', concept: 'Wawasan Roadmap Teens Innovator', project: 'Persiapan Wisuda Akbar' },
          { session: 96, title: 'Grand Graduation Day 96 Sesi', concept: 'Penganugerahan Master Graduate', project: 'Wisuda 2 Tahun Intermediate' },
        ],
      },
    ],
  },
  teens: {
    stageTitle: 'Tahap 3: Teens Innovator (Usia 13–17 Tahun)',
    ageRange: '13 – 17 Tahun (SMP & SMA / SMK)',
    pdfDownloadUrl: '/curriculum/panduan-instruktur-teens-innovator.pdf',
    pdfFileName: 'Panduan-Instruktur-Teens-Innovator-Sesi-01-96.pdf',
    levels: [
      {
        levelNumber: 1,
        sessionRange: 'Sesi 01 – 12',
        sessionsCount: 12,
        title: 'Python Core & Object-Oriented Programming (OOP)',
        theme: 'PEP 8, List Comp, OOP & Pygame 2D',
        description: 'Standar penulisan clean code industri, struktur data kompleks, paradigma OOP (Inheritance & Polymorphism), dan Pygame 2D.',
        badge: 'Level 1 Python OOP',
        color: 'purple',
        topics: [
          { session: 1, title: 'Ekosistem Python 3 & PEP 8', concept: 'Virtual Environment venv & Clean Code', project: 'Setup Terminal Pengembang' },
          { session: 2, title: 'Tipe Data Kompleks List Comp', concept: 'List Comprehensions & Nested Dict', project: 'Pemrosesan Data Elegan' },
          { session: 3, title: 'Exception Handling Try-Except', concept: 'Mencegah Crash Runtime Error', project: 'Program Tangguh Anti-Eror' },
          { session: 4, title: 'OOP: Class, Object & __init__', concept: 'Konstruktor & Blueprint Objek', project: 'Sistem Data Siswa OOP' },
          { session: 5, title: 'OOP: Enkapsulasi & Getter-Setter', concept: 'Variabel Privat & Magic Methods', project: 'Proteksi Integritas Objek' },
          { session: 6, title: 'OOP: Pewarisan & Polimorfisme', concept: 'Inheritance Multi-Class Efisien', project: 'Hirarki Pengguna Aplikasi' },
          { session: 7, title: 'Manipulasi Berkas JSON & CSV', concept: 'Parsing Dataset & Ekspor Laporan', project: 'Penyimpanan Berkas Terstruktur' },
          { session: 8, title: 'Algoritma Sorting & Lambda', concept: 'QuickSort & Fungsi Anonim Lambda', project: 'Pengurutan Data Kompleks' },
          { session: 9, title: 'Pygame Engine: Display & Event', concept: 'Game Loop 60 FPS Tanpa Lag', project: 'Jendela Kanvas Pygame' },
          { session: 10, title: 'Pygame Sprite Groups & Vektor', concept: 'Matematika Vektor & Hitbox Laser', project: 'Mekanisme Tembakan Laser' },
          { session: 11, title: 'Audio Mixer & Partikel Ledakan', concept: 'Audio Channel & Particle Generator', project: 'Efek Visual & Suara Dinamis' },
          { session: 12, title: 'Capstone 1: Space Defense Game', concept: 'Game 2D Modular OOP Utuh', project: 'Space Shooter Standar Rilis' },
        ],
      },
      {
        levelNumber: 2,
        sessionRange: 'Sesi 13 – 24',
        sessionsCount: 12,
        title: 'Modern Frontend Web (React 19 & Tailwind CSS)',
        theme: 'React SPA, Hooks, Vite & Tailwind',
        description: 'Arsitektur Single Page Application (SPA), komponen JSX, state management dengan hooks, routing, dan optimasi performa web.',
        badge: 'Level 2 React Frontend',
        color: 'blue',
        topics: [
          { session: 13, title: 'Arsitektur Web Modern: SPA', concept: 'Vite Bundler & Ekosistem npm', project: 'Setup Proyek React Vite' },
          { session: 14, title: 'Komponen React & JSX Modern', concept: 'Komponen Fungsi Modular Reusable', project: 'Komponen Kartu Produk Dinamis' },
          { session: 15, title: 'Styling Tailwind CSS Utility', concept: 'Grid, Responsif Breakpoint & Dark', project: 'Desain Antarmuka Elegan' },
          { session: 16, title: 'State Komponen Hook useState', concept: 'Reaktivitas Data Form Input', project: 'Widget Counter & Form Input' },
          { session: 17, title: 'Siklus Hidup Hook useEffect', concept: 'Fetch API on Mount & Cleanup', project: 'Pengambilan Data Eksternal' },
          { session: 18, title: 'Form Terkendali & Validasi', concept: 'Validasi Input Realtime', project: 'Formulir Registrasi Aman' },
          { session: 19, title: 'Rendering List & Kunci Unik key', concept: 'Array Mapping Performa Tinggi', project: 'Render Ribuan Data Cepat' },
          { session: 20, title: 'State Global React Context API', concept: 'Theme & Auth Provider Global', project: 'Manajemen Tema Global' },
          { session: 21, title: 'Routing Halaman Client-Side', concept: 'Navigasi Tanpa Reload Browser', project: 'Website Multi-Halaman SPA' },
          { session: 22, title: 'Desain Dashboard Developer', concept: 'Widget Metrik Grafik Visual', project: 'Dashboard SaaS Modern' },
          { session: 23, title: 'Optimasi Web: Code Splitting', concept: 'React.lazy & Web Vitals LCP/INP', project: 'Website Membuka < 1 Detik' },
          { session: 24, title: 'Capstone 2: Developer Web App', concept: 'Web App React Live di Vercel', project: 'Showcase Web App Mandiri' },
        ],
      },
      {
        levelNumber: 3,
        sessionRange: 'Sesi 25 – 36',
        sessionsCount: 12,
        title: 'Machine Learning & Generative AI API',
        theme: 'Pandas, Scikit-learn & Google Gemini API',
        description: 'Sains data eksploratif, model klasifikasi & regresi machine learning, arsitektur LLM Transformer, dan structured prompt engineering.',
        badge: 'Level 3 AI & Data',
        color: 'emerald',
        topics: [
          { session: 25, title: 'Pengantar AI & Machine Learning', concept: 'Siklus Data, Model & Inference', project: 'Konsep Dasar Pelatihan AI' },
          { session: 26, title: 'Analisis Data Pandas & Numpy', concept: 'Pembersihan Data Missing Values', project: 'Wrangling Dataset CSV' },
          { session: 27, title: 'Visualisasi Matplotlib & Seaborn', concept: 'Heatmap Korelasi & Scatter Plot', project: 'Grafik Visual Analisis Data' },
          { session: 28, title: 'Regresi Linear Scikit-learn', concept: 'Prediksi Angka Berkelanjutan', project: 'Model Prediksi Harga Rumah' },
          { session: 29, title: 'Klasifikasi Random Forest', concept: 'Decision Tree Klasifikasi Kategori', project: 'Pendeteksi Email Spam' },
          { session: 30, title: 'Evaluasi Akurasi Model AI', concept: 'Precision, Recall & Confusion Matrix', project: 'Uji Validitas Model Prediksi' },
          { session: 31, title: 'Arsitektur LLM Transformer', concept: 'Tokenisasi, Embeddings & Temperature', project: 'Membedah Otak Model AI' },
          { session: 32, title: 'Integrasi REST API Gemini AI', concept: 'HTTP POST Request dari Python', project: 'Chatbot Konsol Cerdas' },
          { session: 33, title: 'Advanced Prompting: JSON Schema', concept: 'Structured Output Pemrosesan Kode', project: 'Ekstraktor Data Terstruktur' },
          { session: 34, title: 'Aplikasi AI Study Buddy Web', concept: 'Ringkasan Modul PDF & Kuis Otomatis', project: 'Asisten Belajar Cerdas' },
          { session: 35, title: 'Etika AI & Manajemen Secret .env', concept: 'Perlindungan Kunci API Rahasia', project: 'Audit Keamanan Kunci Cloud' },
          { session: 36, title: 'Capstone 3: AI Learning Assistant', concept: 'Aplikasi Web Bertenaga AI Siap Pakai', project: 'Asisten AI Mandiri Live' },
        ],
      },
      {
        levelNumber: 4,
        sessionRange: 'Sesi 37 – 48',
        sessionsCount: 12,
        title: 'Cloud Backend & Database Supabase',
        theme: 'PostgreSQL Cloud, CRUD & Auth JWT',
        description: 'Pondasi backend cloud modern: PostgreSQL, autentikasi pengguna, Postgres Row Level Security (RLS), dan sinkronisasi realtime.',
        badge: 'Level 4 Annual Track',
        color: 'emerald',
        topics: [
          { session: 37, title: 'Arsitektur Cloud Serverless', concept: 'Peran Cloud DB & API Gateway', project: 'Infrastruktur Cloud Modern' },
          { session: 38, title: 'Database Relasional PostgreSQL', concept: 'Tabel, UUID, Primary & Foreign Key', project: 'Setup Supabase Cloud' },
          { session: 39, title: 'Desain Skema ERD Terstruktur', concept: 'Relasi One-to-Many & Many-to-Many', project: 'Skema Database Kursus' },
          { session: 40, title: 'Operasi CRUD Supabase Client', concept: 'select, insert, update & delete', project: 'Interaksi Data dari Kode' },
          { session: 41, title: 'Sistem Autentikasi Pengguna', concept: 'Login, Register & Token Sesi JWT', project: 'Otentikasi Akun Aman' },
          { session: 42, title: 'Row Level Security (RLS)', concept: 'Aturan SQL Akses Data Mandiri', project: 'Proteksi Kebocoran Data' },
          { session: 43, title: 'Cloud Storage Bucket Media', concept: 'Upload Gambar Avatar & URL Publik', project: 'Penyimpanan Berkas Awan' },
          { session: 44, title: 'Realtime Subscriptions Sync', concept: 'Live Update Tanpa Refresh Halaman', project: 'Fitur Notifikasi Waktu Nyata' },
          { session: 45, title: 'Integrasi Penuh React-Supabase', concept: 'Menghubungkan Frontend & Backend', project: 'Aplikasi Web Fullstack Utuh' },
          { session: 46, title: 'Sanitasi Keamanan Input Web', concept: 'Pencegahan Injeksi SQL & XSS', project: 'Audit Keamanan Web' },
          { session: 47, title: 'CI/CD Pipeline GitHub Actions', concept: 'Otomasi Pengujian & Deployment', project: 'Pipeline Rilis Otomatis' },
          { session: 48, title: 'Capstone 4: Fullstack Cloud App', concept: 'Aplikasi Fullstack Cloud Live 48 Sesi', project: 'Wisuda Tahun 1 Teens' },
        ],
      },
      {
        levelNumber: 5,
        sessionRange: 'Sesi 49 – 60',
        sessionsCount: 12,
        title: 'Computer Vision & Realtime Gesture AI',
        theme: 'OpenCV, MediaPipe Hands & Air Canvas',
        description: 'Pengolahan citra digital kamera, pelacakan 21 sendi jari tangan MediaPipe, melukis di udara, dan pengendali game tanpa sentuh.',
        badge: 'Level 5 Computer Vision',
        color: 'purple',
        topics: [
          { session: 49, title: 'Computer Vision & OpenCV Dasar', concept: 'Matriks Piksel BGR & Akses Webcam', project: 'Akses Frame Kamera Python' },
          { session: 50, title: 'Filter Citra: Blur & Canny Edge', concept: 'Deteksi Garis Tepi Objek Gambar', project: 'Filter Sketsa Gambar Otomatis' },
          { session: 51, title: 'MediaPipe Face Mesh 468 Titik', concept: 'Landmark Wajah 3D Koordinat', project: 'Pendeteksi Ekspresi Wajah' },
          { session: 52, title: 'Hand Tracking 21 Titik Sendi', concept: 'Koordinat Ujung Telunjuk & Jempol', project: 'Pelacak Gerak Jari Tangan' },
          { session: 53, title: 'Aplikasi Air Canvas Melukis', concept: 'Menggambar Garis di Udara Bebas', project: 'Lukisan Udara Tanpa Layar' },
          { session: 54, title: 'Gestur Cubit (Pinch to Click)', concept: 'Jarak Euclidean Pemilih Objek', project: 'Interaksi Gestur Alami' },
          { session: 55, title: 'Controller Game Tanpa Sentuh', concept: 'Kemudi Mobil Balap dengan Jari', project: 'Joystick Udara Virtual' },
          { session: 56, title: 'Pose Tracking Olahraga 33 Titik', concept: 'Deteksi Postur Gerakan Push-Up', project: 'Fitness AI Penghitung Gerak' },
          { session: 57, title: 'Klasifikasi Gestur K-NN Model', concept: 'Melatih Pengenal Bahasa Isyarat', project: 'Penerjemah Isyarat Tangan' },
          { session: 58, title: 'Optimasi Threading Webcam FPS', concept: 'Pemrosesan Paralel 60 FPS Mulus', project: 'Komputasi Vision Ringan' },
          { session: 59, title: 'Gladi Bersih Proyek Vision', concept: 'Kalibrasi Pencahayaan Ruangan', project: 'Penyempurnaan Responsif AI' },
          { session: 60, title: 'Capstone 5: Touchless Vision App', concept: 'Aplikasi Komputer Vision Mandiri', project: 'Showcase Interaksi Kamera AI' },
        ],
      },
      {
        levelNumber: 6,
        sessionRange: 'Sesi 61 – 72',
        sessionsCount: 12,
        title: 'Backend RESTful API dengan FastAPI',
        theme: 'FastAPI Python, Pydantic & Docker',
        description: 'Membangun arsitektur microservices modern: async endpoints, validasi Pydantic, dokumentasi Swagger, dan container Docker.',
        badge: 'Level 6 Backend Engineer',
        color: 'purple',
        topics: [
          { session: 61, title: 'Arsitektur RESTful API & HTTP', concept: 'Endpoint, Status Code & Payload', project: 'Standar Komunikasi Web' },
          { session: 62, title: 'Framework FastAPI Asinkron', concept: 'async & await Eksekusi Cepat', project: 'API Endpoint Pertama' },
          { session: 63, title: 'Validasi Skema Pydantic Models', concept: 'Pencegahan Data Kotor Masuk DB', project: 'Validasi JSON Request Otomatis' },
          { session: 64, title: 'Dokumentasi Interaktif Swagger', concept: 'Dokumentasi API Otomatis di /docs', project: 'Halaman Pengujian Endpoint' },
          { session: 65, title: 'Koneksi Relasional dengan ORM', concept: 'Manipulasi Database Berbasis Objek', project: 'Abstraksi Database Bersih' },
          { session: 66, title: 'Hash Password bcrypt & JWT', concept: 'Keamanan Akun Kriptografi Standar', project: 'Autentikasi Token Aman' },
          { session: 67, title: 'Middleware CORS & Rate Limit', concept: 'Proteksi Spam & Serangan DDoS', project: 'Keamanan Server Produksi' },
          { session: 68, title: 'Background Tasks Worker', concept: 'Pemrosesan Tugas Asinkron Latar', project: 'Pengirim Email Latar Belakang' },
          { session: 69, title: 'Automated Testing Pytest', concept: 'Unit Testing Sebelum Publikasi', project: 'Pengujian Otomatis Tanpa Bug' },
          { session: 70, title: 'Containerization Docker Image', concept: 'Menulis Dockerfile & Environment', project: 'Kontainer Aplikasi Mandiri' },
          { session: 71, title: 'Deploy Serverless ke Railway', concept: 'Server Cloud Aktif Online 24 Jam', project: 'API Produksi Live di Cloud' },
          { session: 72, title: 'Capstone 6: REST API Microservice', concept: 'Backend API Live dengan Dokumentasi', project: 'Microservice Siap Konsumsi' },
        ],
      },
      {
        levelNumber: 7,
        sessionRange: 'Sesi 73 – 84',
        sessionsCount: 12,
        title: 'Data Science & Predictive Analytics',
        theme: 'Scraping, NLP Sentimen & Streamlit',
        description: 'Siklus riset data mentah, scraping web, time series forecasting, analisis sentimen NLP, dan pembuatan dashboard data Streamlit.',
        badge: 'Level 7 Data Scientist',
        color: 'amber',
        topics: [
          { session: 73, title: 'Siklus Proyek CRISP-DM', concept: 'Dari Data Mentah ke Wawasan Bisnis', project: 'Metodologi Sains Data Riset' },
          { session: 74, title: 'Web Scraping Beretika BeautifulSoup', concept: 'Menambang Data Publik Internet', project: 'Kolektor Harga Pasar Otomatis' },
          { session: 75, title: 'Feature Engineering Tingkat Lanjut', concept: 'Normalisasi & One-Hot Encoding', project: 'Persiapan Data Machine Learning' },
          { session: 76, title: 'Time Series Forecasting Tren', concept: 'Prediksi Tren Penjualan Masa Depan', project: 'Model Prediksi Deret Waktu' },
          { session: 77, title: 'NLP Analisis Sentimen Komentar', concept: 'Klasifikasi Komentar Positif-Negatif', project: 'Penganalisis Sentimen Sosmed' },
          { session: 78, title: 'Clustering K-Means Unsupervised', concept: 'Segmentasi Profil Pelanggan AI', project: 'Pengelompokan Otomatis Data' },
          { session: 79, title: 'Dashboard Interaktif Streamlit', concept: 'Aplikasi Web Analitik 50 Baris', project: 'Dashboard Data Visual Cepat' },
          { session: 80, title: 'Integrasi Model Prediksi ke Web', concept: 'Slider Input & Prediksi Realtime', project: 'Aplikasi Kalkulator AI Bisnis' },
          { session: 81, title: 'Uji Validitas Statistik A/B Test', concept: 'Pengambilan Keputusan Data-Driven', project: 'Pengujian Hipotesis Fitur' },
          { session: 82, title: 'Laporan Eksekutif Bisnis', concept: 'Komunikasi Wawasan ke Investor', project: 'Laporan Ringkasan Eksekutif' },
          { session: 83, title: 'Deploy ke Streamlit Cloud Publik', concept: 'Dashboard Live Dibagikan ke Publik', project: 'Dashboard Analytics Online' },
          { session: 84, title: 'Capstone 7: Big Data Dashboard', concept: 'Dashboard Prediktif Data Lengkap', project: 'Sertifikasi Data Science Level 7' },
        ],
      },
      {
        levelNumber: 8,
        sessionRange: 'Sesi 85 – 96',
        sessionsCount: 12,
        title: 'Grand Capstone Startup & Wisuda Akbar',
        theme: 'Multi-Cloud, Pitch Deck Silicon Valley & Wisuda',
        description: 'Inkubasi ide produk teknologi nyata, arsitektur multi-cloud, security audit, penyusunan portofolio beasiswa, dan demo day wisuda.',
        badge: 'Level 8 Master Graduate',
        color: 'amber',
        topics: [
          { session: 85, title: 'Design Thinking & Lean Canvas', concept: 'Problem Solution Fit & Target User', project: 'Perancangan Ide Startup' },
          { session: 86, title: 'Arsitektur Terpadu Multi-Cloud', concept: 'Frontend + API + AI + Cloud DB', project: 'Arsitektur Sistem Skala Besar' },
          { session: 87, title: 'Sprint 1: Repositori & Skema DB', concept: 'Branching Git & Database Cloud', project: 'Fondasi Teknis Startup' },
          { session: 88, title: 'Sprint 2: Core Engine Bisnis', concept: 'Logika Pemecahan Masalah Utama', project: 'Fitur Utama Produk' },
          { session: 89, title: 'Sprint 3: Integrasi Cerdas AI', concept: 'Keunggulan Kompetitif Unik AI', project: 'Penyematan Fitur AI Pintar' },
          { session: 90, title: 'Sprint 4: Antarmuka & Aksesibilitas', concept: 'Pengalaman Pengguna Ramah Mobile', project: 'Tampilan Produk Sempurna' },
          { session: 91, title: 'Security Audit & Lighthouse 95+', concept: 'Enkripsi & Web Vitals Prima', project: 'Kesiapan Produk Produksi' },
          { session: 92, title: 'Multi-Cloud Live Deployment', concept: 'Domain Kustom HTTPS & CI/CD', project: 'Peluncuran Resmi ke Internet' },
          { session: 93, title: 'Portofolio Beasiswa & Profil GitHub', concept: 'Resume Internasional Standar Beasiswa', project: 'Portofolio Profil Kuliah/CV' },
          { session: 94, title: 'Pitch Deck Silicon Valley 5 Menit', concept: 'Teknik Presentasi Demo Day Investor', project: 'Slide Pitching Profesional' },
          { session: 95, title: 'Rehearsal Dewan Juri Industri', concept: 'Simulasi Tanya Jawab Insinyur Senior', project: 'Pematangan Demo Terakhir' },
          { session: 96, title: 'Grand Demo Day & Wisuda Teens', concept: 'Penganugerahan Junior Tech Leader', project: 'Wisuda Akbar 2 Tahun Teens' },
        ],
      },
    ],
  },
};

interface AdminPathwayTabProps {
  selectedTier: CurriculumTier;
  selectedLevel: number | 'all';
  onSelectLevel: (lvl: number | 'all') => void;
  isDark?: boolean;
}

export const AdminPathwayTab: React.FC<AdminPathwayTabProps> = ({
  selectedTier,
  selectedLevel,
  onSelectLevel,
  isDark = false,
}) => {
  const data = PATHWAY_DATA[selectedTier];
  const levels = selectedLevel === 'all'
    ? data.levels
    : data.levels.filter((l) => l.levelNumber === selectedLevel);

  return (
    <div className="space-y-6">
      {/* Banner Ringkasan Pathway */}
      <div
        className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-sm ${
          isDark
            ? 'bg-gradient-to-r from-amber-500/10 via-[#161a26] to-[#121520] border-amber-500/30'
            : 'bg-white border-amber-300 shadow-amber-900/5'
        }`}
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dokumentasi 96 Sesi (2 Tahun Penuh) Siap Ajar</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {data.stageTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sasaran: <strong>{data.ageRange}</strong> • Terbagi dalam 8 Level Progresif (masing-masing 12 sesi)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={data.pdfDownloadUrl}
            download={data.pdfFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 flex items-center space-x-2 shadow-md shadow-amber-500/20 hover:brightness-110 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Buku Panduan 96 Sesi (PDF Resmi)</span>
          </a>
        </div>
      </div>

      {/* Level Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold uppercase text-slate-400 shrink-0">Filter Level:</span>
        <button
          onClick={() => onSelectLevel('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedLevel === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow'
              : isDark
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Semua 8 Level (Sesi 01–96)
        </button>

        {data.levels.map((lvl) => (
          <button
            key={lvl.levelNumber}
            onClick={() => onSelectLevel(lvl.levelNumber)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
              selectedLevel === lvl.levelNumber
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>Level {lvl.levelNumber}</span>
            <span className="text-[10px] opacity-75">({lvl.sessionRange})</span>
          </button>
        ))}
      </div>

      {/* Grid Levels & Breakdown Sessions */}
      <div className="space-y-6">
        {levels.map((lvl) => (
          <div
            key={lvl.levelNumber}
            className={`rounded-2xl border overflow-hidden transition-all shadow-sm ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Level Card Header */}
            <div
              className={`p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50/80 border-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                  L{lvl.levelNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Level {lvl.levelNumber}: {lvl.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      {lvl.sessionRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lvl.theme} • {lvl.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>12 Sesi @ 90 Menit</span>
              </div>
            </div>

            {/* 12 Sessions Table / List */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                    <th className="py-2.5 px-3 w-16">Sesi</th>
                    <th className="py-2.5 px-3">Topik Pembelajaran</th>
                    <th className="py-2.5 px-3">Konsep Kunci & Logika</th>
                    <th className="py-2.5 px-3">Output Target Karya Siswa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {lvl.topics.map((t) => (
                    <tr
                      key={t.session}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-black text-amber-600 dark:text-amber-400">
                        #{t.session < 10 ? `0${t.session}` : t.session}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                        {t.title}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[11px] font-medium">
                          {t.concept}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{t.project}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
