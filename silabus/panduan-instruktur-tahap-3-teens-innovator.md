# ⚡ BUKU PANDUAN UTAMA INSTRUKTUR: TAHAP 3 — TEENS INNOVATOR (SESI 1 – 96)
### *Kurikulum Lengkap 2 Tahun Berkelanjutan (Pathway 96 Sesi Standar Industri)*
*Pedoman Pedagogi, Python 3 Lanjut, Modern React 19 & TypeScript, AI Vision & Machine Learning, Cloud Backend, & Persiapan Portofolio Beasiswa/Kuliah*

- **Kode Dokumen**: `BK-INSTR-STAGE-03-FULL96`
- **Target Usia**: 13 – 17 Tahun (SMP & SMA / SMK)
- **Jenjang Program**: 
  - **Tahun 1 (Level 1–4 / Sesi 1–48)**: Python Core & OOP, Modern Fullstack Web (React & Tailwind), Machine Learning & AI API Integration, Cloud Deployment.
  - **Tahun 2 (Level 5–8 / Sesi 49–96)**: Computer Vision & MediaPipe, Backend RESTful API & Supabase, Data Science & Analytics, Grand Capstone Startup Incubator.
- **Prasyarat Siswa**: Memiliki pemikiran logis dasar, kemampuan aljabar dasar, dan kenyamanan mengoperasikan sistem operasi komputer & keyboard.
- **Rasio Pembimbing**: 1 Instruktur : Maksimal 6–8 Siswa (Online) / 10–12 Siswa (Offline Lab).

---

## 🎯 PRINSIP PEDAGOGIS KHUSUS REMAJA (TEEN INNOVATORS)
1. **Perlakukan Sebagai Calon Junior Developer**: Hindari nada bicara anak-anak. Gunakan terminologi industri nyata (*version control, API contract, state management, asynchronous, authentication*).
2. **Konteks Relevansi Karir & Pendidikan Tinggi**: Kaitkan setiap modul dengan kegunaannya: persiapan portofolio masuk PTN ternama, beasiswa luar negeri (misal: MIT, NUS, NTU), atau magang industri teknologi.
3. **Standar Kode Produksi**: Biasakan menggunakan git branching, linter PEP 8 / ESLint, dokumentasi docstring, serta pengelolaan environment variable aman (`.env`).
4. **Problem Solving Berbasis Riset Mandiri**: Latih siswa membaca dokumentasi resmi library (*Read the Docs*) dan mencari solusi error di Stack Overflow / GitHub Issues.

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90 – 120 MENIT)
| Menit | Segmen Kelas | Panduan Instruktur |
| :---: | :--- | :--- |
| **00–10'** | **Engineering Standup & System Architecture** | Pembahasan arsitektur modul hari ini dan studi kasus industri teknologi nyata. |
| **10–30'** | **Deep Dive Tech Concept & Code Boilerplate** | Bedah sintaks, design pattern, dan demonstrasi implementasi live coding mentor. |
| **30–75'** | **Hands-on Production Code & Feature Build** | Siswa membangun fitur di IDE VS Code, mengintegrasikan library pihak ketiga. |
| **75–95'** | **Debugging Sprint & Edge Case Hardening** | Menangani unhandled promise, null pointer, syntax error, dan validasi input. |
| **95–110'**| **Git Commit, Push & Peer Code Review** | Siswa melakukan push ke GitHub, saling memberikan feedback pull request. |
| **110–120'**| **Tech Insight & Roadmap Mentoring** | Wawasan tren AI terbaru dan konsultasi portofolio akademik pribadi. |

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-1 (SESI 01 – 48)

## 📌 LEVEL 1: PYTHON CORE PROGRAMMING & OBJECT-ORIENTED PROGRAMMING (SESI 01 – 12)
- **Sesi 01: Ekosistem Python 3 Modern, Terminal Shell & Standar PEP 8**
  - *Konsep*: VS Code environment, virtual environment (`venv`), pip package manager, sintaks clean code PEP 8.
- **Sesi 02: Tipe Data Kompleks: List Comprehensions, Dictionaries, Sets & Tuples**
  - *Kode*: `data = [x**2 for x in range(10) if x % 2 == 0]`. Dictionary nested data structures.
- **Sesi 03: Penanganan Kesalahan Eksepsi (Robust Exception Handling: Try-Except-Finally)**
  - *Konsep*: Mencegah aplikasi crash: `try: res = int(val) except ValueError as err: logger.error(err)`.
- **Sesi 04: Pemrograman Berorientasi Objek (OOP) Bagian 1: Class, Objects & `__init__`**
  - *Kode*: `class Student: def __init__(self, name, xp): self.name = name; self.xp = xp`.
- **Sesi 05: OOP Bagian 2: Enkapsulasi, Getter-Setter & Metode Spesial (`__repr__`, `__str__`)**
  - *Konsep*: Melindungi variabel internal kelas dari manipulasi tidak sah.
- **Sesi 06: OOP Bagian 3: Pewarisan (Inheritance) & Polimorfisme Antar Class**
  - *Kode*: `class PremiumUser(User): def get_discount(self): return self.rate * 0.8`.
- **Sesi 07: Sistem Manipulasi File Lanjut: JSON, CSV Parsing & Pathlib**
  - *Konsep*: Membaca dataset format `.json` dan mengekspor laporan terstruktur ke format `.csv`.
- **Sesi 08: Algoritma Pencarian & Pengurutan Lanjut (QuickSort & Lambda Functions)**
  - *Kode*: `sorted_list = sorted(products, key=lambda p: p['price'], reverse=True)`.
- **Sesi 09: Pengenalan Pygame 2D Engine: Game Loop, Display Surface & Event Handling**
  - *Konsep*: Refresh rate 60 FPS, memproses event keyboard dan mouse tanpa jeda.
- **Sesi 10: Pygame Sprite Groups, Rect Collision & Vektor Gerak 2D**
  - *Kode*: Menembakkan laser peluru dan mendeteksi tabrakan dengan musuh alien.
- **Sesi 11: Game Space Shooter Lengkap: Sistem Skor, Audio Synth & Particle Explosion**
- **Sesi 12: CAPSTONE LEVEL 1: 'Python Space Defense Game' & Code Review Refactoring**
  - *Output*: Game 2D modular berbasis OOP Python dengan arsitektur kode bersih.
  - *Apresiasi*: Sertifikat *Junior Python Software Engineer Level 1*.

---

## 📌 LEVEL 2: MODERN FRONTEND WEB (REACT 19, VITE & TAILWIND CSS) (SESI 13 – 24)
- **Sesi 13: Arsitektur Web Modern: Single Page Application (SPA) vs Multi Page**
  - *Konsep*: Mengapa raksasa teknologi beralih ke React, Next.js, dan Vite bundler cepat.
- **Sesi 14: Komponen React & Sintaks JSX Modern**
  - *Kode*: Membuat komponen fungsi reusable: `function ProductCard({ title, price })`.
- **Sesi 15: Styling Modern dengan Tailwind CSS Utility Classes**
  - *Konsep*: Flexbox, grid, responsif breakpoint (`sm:`, `md:`, `lg:`), dan styling dark mode.
- **Sesi 16: Manajemen State Komponen dengan Hook `useState`**
  - *Kode*: Pengaturan state form input, counter angka dinamis, dan toggle menu.
- **Sesi 17: Siklus Hidup Komponen & Efek Samping dengan Hook `useEffect`**
  - *Konsep*: Mengambil data API saat komponen pertama kali dimuat (*fetch on mount*).
- **Sesi 18: Penanganan Form Terkendali (Controlled Forms & Input Validation)**
  - *Konsep*: Validasi nomor telepon dan format email secara realtime sebelum submit.
- **Sesi 19: Rendering List Dinamis & Kunci Unik React (`key` prop)**
  - *Kode*: `items.map(item => <ItemRow key={item.id} data={item} />)`.
- **Sesi 20: Manajemen State Global dengan React Context API**
  - *Konsep*: Mengalirkan state Theme (Dark/Light) dan Authentication ke seluruh halaman aplikasi.
- **Sesi 21: Routing Halaman Multi-View dengan Client-Side Routing**
  - *Konsep*: Navigasi antar halaman Home, Dashboard, dan Profil tanpa reload browser.
- **Sesi 22: Desain Dashboard Portofolio Developer Profesional**
  - *Praktik*: Membangun antarmuka dashboard dengan diagram visual grafik dan widget metrik.
- **Sesi 23: Optimasi Kinerja Web: Code Splitting & Lazy Loading (`React.lazy`)**
- **Sesi 24: CAPSTONE LEVEL 2: 'Modern Developer Showcase Web App' & Live Cloud Deploy**
  - *Output*: Web App React modern yang terdeploy live di Cloudflare Pages / Vercel.
  - *Apresiasi*: Sertifikat *Junior React Frontend Engineer Level 2*.

---

## 📌 LEVEL 3: MACHINE LEARNING & INTEGRASI GENERATIVE AI API (SESI 25 – 36)
- **Sesi 25: Pengantar Kecerdasan Buatan Modern: Machine Learning vs Deep Learning**
  - *Konsep*: Bagaimana AI dilatih menggunakan data (Dataset -> Training -> Model -> Inference).
- **Sesi 26: Analisis Data Eksploratif Menggunakan Python Pandas & Numpy**
  - *Kode*: Membaca file dataset CSV, membersihkan missing value, dan menghitung statistik rata-rata.
- **Sesi 27: Visualisasi Data Interaktif dengan Matplotlib & Seaborn**
  - *Karya*: Menampilkan grafik heatmap korelasi data dan diagram sebaran scatter plot.
- **Sesi 28: Model Prediksi Machine Learning Pertama: Regresi Linear (Scikit-learn)**
  - *Studi Kasus*: Memprediksi harga rumah atau nilai ujian berdasarkan jam belajar siswa.
- **Sesi 29: Model Klasifikasi Data: Decision Tree & Random Forest**
  - *Studi Kasus*: Mengklasifikasikan email spam vs bukan spam secara otomatis.
- **Sesi 30: Evaluasi Akurasi Model AI: Precision, Recall, & Confusion Matrix**
  - *Konsep*: Menghindari bias data dan mengukur keandalan model prediksi kecerdasan buatan.
- **Sesi 31: Pengenalan Large Language Models (LLM) & Arsitektur Transformer**
  - *Konsep*: Cara kerja tokenisasi, context window, embeddings, dan temperature pada model AI.
- **Sesi 32: Integrasi REST API LLM Modern (Google Gemini API / OpenAI API)**
  - *Kode*: Mengirim request HTTP POST dari Python untuk meminta generasi jawaban teks cerdas.
- **Sesi 33: Prompt Engineering Tingkat Mahir: Few-Shot Prompting & Structured JSON Output**
  - *Konsep*: Memaksa output LLM selalu berupa JSON schema valid agar mudah diproses program.
- **Sesi 34: Membangun Aplikasi 'AI Smart Study Buddy' Berbasis Web**
  - *Fitur*: Asisten belajar pintar yang mampu meringkas modul PDF dan membuat latihan kuis otomatis.
- **Sesi 35: Etika AI, Keamanan Data Pribadi & Manajemen Rahasia API Key (`.env`)**
  - *Aturan*: Tidak boleh mengunggah kunci API rahasia ke repositori publik GitHub.
- **Sesi 36: CAPSTONE LEVEL 3: 'AI Powered Learning Assistant' & Pitching Presentasi**
  - *Output*: Aplikasi web kecerdasan buatan terintegrasi API yang siap pakai.
  - *Apresiasi*: Sertifikat *Junior AI & Machine Learning Specialist Level 3*.

---

## 📌 LEVEL 4: CLOUD BACKEND & DATABASE SUPABASE (SESI 37 – 48)
- **Sesi 37: Arsitektur Backend Modern: Monolith vs Microservices & Serverless**
  - *Konsep*: Memahami peran server cloud, database relasional SQL, dan API gateway.
- **Sesi 38: Pengenalan Database Relasional PostgreSQL & Cloud Platform Supabase**
  - *Konsep*: Tabel, baris, kolom, tipe data UUID, primary key, dan foreign key relasi.
- **Sesi 39: Desain Skema Database Terstruktur (Entity Relationship Diagram - ERD)**
  - *Desain*: Merancang skema tabel untuk sistem kursus: Users, Courses, Batches, dan Transactions.
- **Sesi 40: Operasi Database CRUD Lengkap Menggunakan Supabase JS Client**
  - *Kode*: `supabase.from('tasks').select('*')`, `.insert()`, `.update()`, dan `.delete()`.
- **Sesi 41: Sistem Autentikasi Pengguna: Registrasi, Login & JWT Session Management**
  - *Fitur*: Login email & password aman, reset password, dan proteksi sesi pengguna aktif.
- **Sesi 42: Keamanan Data Tingkat Baris (Postgres Row Level Security - RLS)**
  - *Aturan SQL*: Pengguna hanya boleh membaca dan mengubah data miliknya sendiri.
- **Sesi 43: Cloud Storage: Upload Foto Profil & Dokumen ke Bucket Cloud**
  - *Kode*: Mengunggah file avatar gambar ke Supabase Storage dan menyimpan URL publiknya.
- **Sesi 44: Realtime Database Subscriptions (Live Data Sync)**
  - *Konsep*: Data di layar otomatis terupdate tanpa reload saat ada pengguna lain mengubah data.
- **Sesi 45: Integrasi Penuh Frontend React dengan Backend Cloud Supabase**
- **Sesi 46: Penanganan Keamanan & Sanitasi Input (Mencegah SQL Injection & XSS)**
- **Sesi 47: CI/CD Pipeline & Automated Cloud Deployment dengan GitHub Actions**
- **Sesi 48: GRAND CAPSTONE TAHUN KE-1: 'Fullstack Cloud Web Application'**
  - *Puncak Acara*: Presentasi aplikasi fullstack cloud mandiri di hadapan dewan penilai.
  - *Apresiasi*: Sertifikat Resmi *Teens Innovator Annual Graduate (48 Sesi)*.

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-2 (SESI 49 – 96)

## 📌 LEVEL 5: COMPUTER VISION & REALTIME AI GESTURE (SESI 49 – 60)
- **Sesi 49: Pengantar Computer Vision & Library OpenCV Python**
  - *Konsep*: Matriks piksel warna BGR, pemrosesan citra digital, dan akses webcam realtime.
- **Sesi 50: Operasi Pengolahan Citra: Grayscale, Gaussian Blur & Edge Detection Canny**
  - *Kode*: `cv2.cvtColor()`, `cv2.GaussianBlur()`, `cv2.Canny()` untuk deteksi garis tepi objek.
- **Sesi 51: Pelacakan Fitur Wajah & Deteksi Landmark dengan MediaPipe Face Mesh**
  - *Konsep*: 468 titik koordinat landmark wajah 3D untuk deteksi ekspresi mata dan senyuman.
- **Sesi 52: Deteksi Gestur Tangan (Hand Tracking Landmark 21 Titik)**
  - *Konsep*: Membaca koordinat ujung jari telunjuk (Landmark 8) dan ibu jari (Landmark 4).
- **Sesi 53: Aplikasi 'Air Canvas': Melukis di Udara Menggunakan Ujung Jari Tangan**
  - *Karya*: Menggerakkan jari di depan kamera untuk menggambar garis warna tanpa menyentuh layar.
- **Sesi 54: Pengenalan Gerakan Cubit (Pinch Gesture) untuk Seleksi Objek Virtual**
  - *Rumus*: Menghitung jarak euclidean antara ibu jari dan telunjuk: jika < 30px -> Mode Klik.
- **Sesi 55: Game Pengendali Tanpa Sentuh (Touchless Game Controller)**
  - *Integrasi*: Menggunakan gerakan tangan di kamera untuk mengendalikan mobil balap virtual.
- **Sesi 56: Deteksi Postur Tubuh (MediaPipe Pose Tracking 33 Landmark)**
  - *Studi Kasus*: Aplikasi Fitness AI penghitung otomatis push-up dan squat olahraga.
- **Sesi 57: Klasifikasi Gestur Kustom Menggunakan Model Machine Learning K-NN**
- **Sesi 58: Optimasi Kecepatan Frame Rate (FPS) & Threading Webcam Python**
- **Sesi 59: Gladi Bersih Proyek Computer Vision Interaktif**
- **Sesi 60: CAPSTONE LEVEL 5: 'Touchless AI Vision Application' & Pameran Interaktif**
  - *Output*: Aplikasi Computer Vision mandiri interaktif responsif.
  - *Apresiasi*: Sertifikat *Junior Computer Vision Engineer Level 5*.

---

## 📌 LEVEL 6: BACKEND API RESTFUL DENGAN PYTHON FASTAPI / NODE.JS (SESI 61 – 72)
- **Sesi 61: Arsitektur RESTful API & Standar HTTP Protocols (GET, POST, PUT, DELETE)**
  - *Konsep*: Endpoint URL, status code (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Error).
- **Sesi 62: Pengenalan Framework FastAPI Python & Asynchronous Programming (`async`/`await`)**
  - *Kode*: `@app.get("/api/v1/users") async def get_users(): return {"status": "success"}`.
- **Sesi 63: Validasi Skema Data Otomatis Menggunakan Pydantic Models**
  - *Konsep*: Memastikan data request JSON sesuai format tipe data yang ditentukan sebelum diproses.
- **Sesi 64: Dokumentasi API Otomatis dengan Swagger UI (Interactive API Docs)**
  - *Keunggulan*: Dokumentasi endpoint terstandar industri otomatis dapat diuji via browser di `/docs`.
- **Sesi 65: Koneksi Database Relasional Menggunakan ORM (Object Relational Mapping)**
  - *Konsep*: Berinteraksi dengan database menggunakan objek Python tanpa menulis query SQL manual.
- **Sesi 66: Sistem Autentikasi Modern: Hash Password bcrypt & OAuth2 JWT Bearer Tokens**
  - *Keamanan*: Password tidak pernah disimpan dalam bentuk teks biasa, melainkan hash kriptografi.
- **Sesi 67: Mekanisme Middleware: CORS (Cross-Origin Resource Sharing) & Rate Limiting**
  - *Konsep*: Mengizinkan frontend React mengakses API dan membatasi request spam agar server tidak tumbang.
- **Sesi 68: Background Task & Pemrosesan Tugas Asinkron (Asynchronous Worker)**
  - *Studi Kasus*: Mengirim email notifikasi di latar belakang tanpa membuat pengguna menunggu lama.
- **Sesi 69: Pengujian API Otomatis (Automated Unit Testing dengan Pytest)**
  - *Standar*: Menguji bahwa setiap endpoint menghasilkan response yang benar secara otomatis sebelum deploy.
- **Sesi 70: Containerization: Membuat Image Docker Pertama untuk Aplikasi Backend**
  - *Kode*: Menulis `Dockerfile` untuk membungkus environment aplikasi agar bisa dijalankan di server mana saja.
- **Sesi 71: Deploy Backend ke Cloud Serverless (Render / Railway / AWS)**
- **Sesi 72: CAPSTONE LEVEL 6: Produksi RESTful API Microservice Mandiri**
  - *Output*: Backend API live di cloud dengan otentikasi token JWT dan dokumentasi Swagger resmi.
  - *Apresiasi*: Sertifikat *Junior Backend API Specialist Level 6*.

---

## 📌 LEVEL 7: DATA SCIENCE, BIG DATA ANALYTICS & PREDICTIVE MODELING (SESI 73 – 84)
- **Sesi 73: Siklus Hidup Proyek Data Science: Dari Data Mentah Menjadi Wawasan Bisnis**
  - *Konsep*: CRISP-DM Framework (Business Understanding, Data Prep, Modeling, Evaluation, Deployment).
- **Sesi 74: Web Scraping Beretika: Mengambil Data Publik dari Internet (`BeautifulSoup4`)**
  - *Kode*: Mengumpulkan harga barang pasar atau ulasan pengguna secara otomatis dari halaman web.
- **Sesi 75: Data Wrangling & Feature Engineering Tingkat Lanjut**
  - *Konsep*: Normalisasi skala data, one-hot encoding variabel kategori, dan ekstraksi fitur tanggal.
- **Sesi 76: Analisis Deret Waktu (Time Series Forecasting Dasar)**
  - *Studi Kasus*: Memprediksi tren penjualan masa depan berdasarkan data historis tahun sebelumnya.
- **Sesi 77: Pemrosesan Bahasa Alami (Natural Language Processing - NLP) & Sentiment Analysis**
  - *Studi Kasus*: Mengklasifikasikan komentar media sosial apakah bernada positif, netral, atau negatif.
- **Sesi 78: Unsupervised Learning: Pengelompokan Data (Clustering K-Means)**
  - *Studi Kasus*: Segmentasi profil pelanggan untuk rekomendasi produk yang dipersonalisasi.
- **Sesi 79: Pembangunan Dashboard Visualisasi Bisnis Interaktif dengan Streamlit**
  - *Karya*: Mengubah skrip analisis Python menjadi dashboard web visual interaktif dalam 50 baris kode.
- **Sesi 80: Integrasi Model Prediksi ke Dalam Dashboard Web Streamlit**
- **Sesi 81: Uji Validitas Statistik & Pengujian Hipotesis (A/B Testing Fundamentals)**
- **Sesi 82: Pembuatan Laporan Eksekutif Data Science untuk Pengambilan Keputusan**
- **Sesi 83: Deploy Dashboard Data Analytics ke Streamlit Cloud Publik**
- **Sesi 84: CAPSTONE LEVEL 7: 'Big Data Predictive Analytics Dashboard'**
  - *Output*: Dashboard analitik data live yang menyajikan prediksi cerdas dan visualisasi interaktif.
  - *Apresiasi*: Sertifikat *Junior Data Scientist & Analytics Specialist*.

---

## 📌 LEVEL 8: GRAND CAPSTONE STARTUP INCUBATOR & PORTFOLIO BEASISWA (SESI 85 – 96)
- **Sesi 85: Inkubasi Ide Startup Teknologi: Identifikasi Problem Pasar & Solusi Nyata**
  - *Metodologi*: Design Thinking & Lean Canvas. Menentukan Value Proposition dan Target Pengguna.
- **Sesi 86: Arsitektur Sistem Terpadu Skala Besar (Fullstack + Backend API + AI Engine)**
  - *Desain*: Merancang arsitektur monorepo / multi-service menggabungkan seluruh keahlian 2 tahun.
- **Sesi 87: Sprint 1 Pengembangan: Setup Repositori GitHub Organisasi & Database Cloud**
- **Sesi 88: Sprint 2 Pengembangan: Pembangunan Core Engine & Logika Bisnis Aplikasi**
- **Sesi 89: Sprint 3 Pengembangan: Integrasi Layanan AI Cerdas & Pemrosesan Data**
- **Sesi 90: Sprint 4 Pengembangan: Desain Antarmuka Pengguna Responsif & Aksesibilitas**
- **Sesi 91: Security Audit & Performance Profiling (Lighthouse 95+, Enkripsi Data, RLS)**
- **Sesi 92: Deployment Multi-Cloud (Frontend Cloudflare, Backend Railway, Database Supabase)**
  - *Standar*: Konfigurasi domain kustom HTTPS SSL, CI/CD automated test pass.
- **Sesi 93: Penyusunan Dokumen Portofolio Akademik & GitHub Profile README Profesional**
  - *Bimbingan*: Menulis portofolio standar kurikulum internasional untuk modal beasiswa / CV kampus.
- **Sesi 94: Pitch Deck Standar Investor Silicon Valley & Teknik Presentasi Demo Day**
  - *Pelatihan*: Struktur pitch 5 menit: Problem -> Solution -> Demo -> Tech Stack -> Roadmap.
- **Sesi 95: Rehearsal Akbar & Evaluasi Panel Dewan Juri Praktisi Industri**
- **Sesi 96: GRAND DEMO DAY & BEEKODING TEENS GRADUATION (SESI 96)**
  - *Puncak Acara*: Wisuda Akbar Kelulusan 2 Tahun Tahap 3 Teens Innovator.
  - *Penganugerahan*: Sertifikat Kelulusan *Teens Innovator Master Graduate (96 Sesi)*, Rekomendasi Akademik Instruktur Resmi, dan Gelar Kehormatan *Beekoding Junior Tech Leader*.

---

## 🛠️ RUBRIK ASESMEN KELULUSAN MAHASISWA & REMAJA (TEENS INNOVATOR)
| Dimensi Penilaian | Kriteria Pengujian Standar Industri | Bobot |
| :--- | :--- | :---: |
| **Arsitektur Sistem & Kode** | Kerapian modular, penanganan error, kepatuhan konvensi PEP 8 / Clean Code. | 25% |
| **Integrasi Teknologi & Fungsionalitas** | Keterhubungan sukses antara Frontend, Backend API, Cloud DB, dan Model AI. | 25% |
| **Keamanan & Standar Cloud** | Pengelolaan `.env`, otentikasi token, kepatuhan RLS, performa Lighthouse. | 20% |
| **Inovasi & Dampak Masalah** | Solusi orisinal yang memecahkan masalah nyata dengan pendekatan teknologi tepat. | 15% |
| **Pitching & Dokumentasi Publik** | Repositori GitHub terawat, dokumentasi `README.md`, dan presentasi persuasif. | 15% |

*Dokumen panduan mengajar resmi diterbitkan oleh Dewan Akademik & Kurikulum Beekoding Academy.*
