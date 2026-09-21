# 🧠 Silabus Modul 03: Machine Learning & Eksperimen Data
### *Computer Vision, Pelatihan Model Cerdas, Klasifikasi Pola, dan Eksperimen Data Terapan*

- **Kode Modul**: `MOD-03-MLDATA`
- **Fokus Utama**: Dataset, Model Supervised Learning, Deteksi Objek/Wajah/Gestur, Klasifikasi Audio, dan Integrasi Kontrol Interaktif.
- **Korelasi 8 Pilar**: *Pattern Recognition*, *Logical Thinking*, *Numerical Thinking*, *Problem Solving*, dan *Persistence*.

---

## 🧭 Kerangka Progresi Belajar Lintas Jenjang

```
[ TAHAP 1: Junior Explorer (6-9 Thn) ]
Sensori Gambar & Suara ➔ Permainan Klasifikasi Pola Fisik ➔ AI Pengenal Senyuman Ceria
                       ⬇
[ TAHAP 2: Intermediate Coder (10-12 Thn) ]
Google Teachable Machine (Image, Sound, Pose) ➔ Evaluasi Akurasi Dataset ➔ Game Kontrol Gestur
                       ⬇
[ TAHAP 3: Teens Innovator (13-17 Thn) ]
Python Computer Vision (MediaPipe / OpenCV) ➔ Landmark Koordinat Tubuh/Tangan ➔ Sistem Pengawas Cerdas
```

---

## 🐣 TAHAP 1: JUNIOR EXPLORER (Usia 6 – 9 Tahun / TK B – SD Kelas 1-3)
*Pendekatan: Pengalaman inderawi, klasifikasi pola konkret dengan kartu bergambar, dan permainan interaktif melalui kamera ramah anak.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Mengerti perbedaan bagaimana manusia melihat benda dengan bagaimana kamera komputer mengenali gambar.
2. Memahami bahwa komputer perlu diberi banyak contoh gambar agar bisa "mengingat" bentuk benda.
3. Mampu melakukan uji coba model kamera pengenal emosi (wajah tersenyum vs wajah cemberut).
4. Menikmati proses interaksi nyata saat gerakan tubuh menggerakkan objek di layar komputer.

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Mata Robot: Bagaimana Komputer Melihat Dunia?**
  - Konsep: Mata kita mengirim sinyal ke otak; kamera komputer mengirim gambar berupa kumpulan titik warna (piksel) ke prosesor.
  - Aktivitas: Permainan tebak gambar piksel raksasa (menebak benda yang tersusun dari balok warna buram).
- **Pertemuan 2: Permainan Menyortir & Mengelompokkan (Un-plugged Dataset)**
  - Konsep: Komputer belajar dari kelompok benda serupa (kategori/label).
  - Aktivitas: Menyortir kartu buah-buahan, hewan, dan sayuran ke dalam keranjang yang tepat. Membahas apa yang terjadi jika ada kartu yang membingungkan (misal: tomat, buah atau sayur?).
- **Pertemuan 3: Mengenalkan Benda ke Kamera Komputer**
  - Konsep: Memberikan 20 contoh gambar benda A (buku tulis) dan 20 contoh benda B (tempat pensil).
  - Aktivitas: Memandu anak mengambil sampel gambar menggunakan webcam secara bergantian dengan teman.
- **Pertemuan 4: Detektor Senyuman & Wajah Gembira**
  - Konsep: Melatih model pengenal ekspresi wajah sederhana: Senang vs Terkejut.
  - Aktivitas: Anak melatih model AI untuk menyalakan kembang api animasi di layar setiap kali mereka tersenyum lebar.
- **Pertemuan 5: Pengenal Suara Hewan Peliharaan**
  - Konsep: Suara memiliki pola gelombang yang berbeda; suara tepukan vs suara siulan.
  - Aktivitas: Melatih komputer merespons tepuk tangan satu kali untuk menyalakan bintang di layar.
- **Pertemuan 6: Pesta Interaktif: Robot Kucing Sahabat Anak**
  - Konsep: Menggabungkan deteksi kamera dengan respon karakter animasi.
  - Aktivitas: Jika anak mengangkat mainan ikan di depan kamera, karakter kucing di layar akan melompat gembira dan bersuara "Meong!".

---

## ⚡ TAHAP 2: INTERMEDIATE CODER (Usia 10 – 12 Tahun / SD Kelas 4-6)
*Pendekatan: Penggunaan Google Teachable Machine secara mendalam, analisis kualitas dataset, metrik confidence score, dan integrasi dengan game Scratch.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Menguasai alur kerja Machine Learning: **Pengumpulan Data (Data Collection)** ➔ **Pelatihan (Training)** ➔ **Uji Validasi (Testing)**.
2. Mampu menganalisis masalah overfitting dan bias dataset (mengapa model salah tebak saat pencahayaan ruangan berubah).
3. Melatih model klasifikasi gambar (Image Model), audio (Sound Model), dan kerangka tubuh (Pose Model).
4. Menghubungkan model hasil ekspor (*TensorFlow.js*) ke lingkungan pemrograman blok Scratch untuk mengendalikan game secara *real-time*.

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Alur Kerja Supervised Machine Learning**
  - Konsep: Label, fitur (*features*), data latih (*training data*), dan data uji (*test data*).
  - Aktivitas: Eksperimen Teachable Machine membuat 3 kelas gambar (Tangan Kiri, Tangan Kanan, Tanpa Tangan).
- **Pertemuan 2: Kualitas Dataset & Mengatasi Salah Prediksi (Misclassification)**
  - Konsep: Mengapa model gagal? Variasi sudut, latar belakang yang berubah-ubah, dan jumlah sampel yang tidak seimbang.
  - Aktivitas: Melakukan audit dataset: membersihkan foto-foto blur dan menambahkan variasi pencahayaan untuk mendongkrak akurasi dari 60% menjadi 95%.
- **Pertemuan 3: Melatih Model Audio: Sistem Perintah Cerdas Suara**
  - Konsep: Kalibrasi *Background Noise*; frekuensi suara dan durasi sampel audio.
  - Aktivitas: Melatih model pengenal 3 perintah vokal: "Lompat!", "Maju!", dan "Berhenti!".
- **Pertemuan 4: Pose Estimation: Deteksi Kerangka Tulang Manusia**
  - Konsep: Bagaimana algoritma mendeteksi titik sendi tubuh (hidung, bahu, siku, pergelangan tangan, lutut) tanpa sensor khusus di tubuh.
  - Aktivitas: Melatih model yang membedakan pose berdiri tegak, merentangkan tangan, dan membungkuk.
- **Pertemuan 5: Menghubungkan Teachable Machine ke Scratch (TM2Scratch Extension)**
  - Konsep: Komunikasi data web socket/link model; variabel prediksi yang diperbarui setiap detik.
  - Aktivitas: Mengimpor link model AI ke Scratch dan mengaitkannya dengan blok percabangan: `JIKA model mendeteksi "Lompat" MAKA ubah Y karakter sebesar +50`.
- **Pertemuan 6: Proyek Aksi: Flappy Bee Game Dikendalikan Gerakan Tangan**
  - Konsep: Integrasi utuh antara model Computer Vision dengan logika mekanika game.
  - Aktivitas: Menyelesaikan game terbang lebah yang dikendalikan oleh kepakan tangan siswa di depan kamera tanpa menyentuh keyboard sama sekali.

---

## 🚀 TAHAP 3: TEENS INNOVATOR (Usia 13 – 17 Tahun / SMP – SMA)
*Pendekatan: Pemrograman Machine Learning berbasis Python murni, pustaka Computer Vision (OpenCV & Google MediaPipe), pengolahan koordinat landmark spasial, dan pembuatan aplikasi cerdas.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Memahami representasi gambar digital sebagai matriks angka array multidimensi NumPy (RGB dan Grayscale).
2. Menguasai pustaka Google MediaPipe untuk melacak 21 titik sendi tangan (*Hand Landmarks*) dan 33 titik pose tubuh secara *real-time*.
3. Mampu menghitung jarak euclidian antar titik sendi untuk mengenali gestur spesifik (misal: jarak ujung jempol dan telunjuk untuk aksi klik).
4. Mampu merancang aplikasi utilitas terapan berbasis penglihatan komputer (misal: pengatur volume nirsentuh atau penghitung repetisi olahraga).

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Dasar Pemrosesan Citra Digital dengan Python & OpenCV**
  - Konsep: Menangkap video stream dari webcam (`cv2.VideoCapture`), membaca frame per detik (FPS), dan konversi ruang warna BGR ke RGB.
  - Aktivitas: Membuat skrip Python untuk menampilkan feed video webcam dengan filter warna dan teks penunjuk koordinat.
- **Pertemuan 2: Pelacakan Tangan Tingkat Tinggi dengan Google MediaPipe**
  - Konsep: Arsitektur deteksi telapak tangan (*Palm Detection*) dan regresi koordinat 21 titik sendi tangan (*Hand Landmark Model*).
  - Aktivitas: Menulis kode Python untuk mendeteksi tangan dan menggambar garis kerangka tangan di atas layar secara *real-time*.
- **Pertemuan 3: Matematika Gestur: Menghitung Jarak Titik & Posisi Jari**
  - Konsep: Rumus jarak 2D/3D antara koordinat ujung jari (Landmark 4, 8, 12, 16, 20); mendeteksi apakah jari sedang tertekuk atau terbuka.
  - Aktivitas: Membangun sistem penghitung jumlah jari yang terangkat (0 sampai 5) dengan akurasi tinggi.
- **Pertemuan 4: Virtual Air Canvas: Melukis di Udara dengan Ujung Jari**
  - Konsep: Menyimpan jejak koordinat titik telunjuk dari frame ke frame; kanvas grafis terpisah yang digabungkan ke video feed.
  - Aktivitas: Membuat aplikasi menggambar di mana siswa bisa memilih warna dengan mendekatkan dua jari dan menggambar garis di udara.
- **Pertemuan 5: Pengendali Komputer Nirsentuh (Virtual Mouse & Volume Control)**
  - Konsep: Memetakan koordinat kamera ke resolusi monitor desktop; integrasi pustaka pengendali sistem (`pyautogui`).
  - Aktivitas: Mengatur volume suara komputer dengan merenggangkan atau merapatkan jarak antara jempol dan telunjuk.
- **Pertemuan 6: Proyek Inovasi Teens: AI Smart Fitness Trainer & Repetition Counter**
  - Konsep: Pelacakan sudut sendi siku dan lutut; *state machine* untuk mendeteksi satu siklus gerakan squat atau push-up yang sempurna.
  - Aktivitas: Membangun aplikasi pelatih kebugaran cerdas yang menghitung repetisi olahraga secara otomatis dan memberi peringatan suara jika postur salah.

---

## 📝 Rubrik Asesmen Modul 03

| Kriteria / Level | Perlu Bimbingan (0 - 60) | Cakap (61 - 80) | Mahir / Unggul (81 - 100) |
| :--- | :--- | :--- | :--- |
| **Kualitas Dataset & Pelatihan Model** | Sampel data sangat minim (<10 sampel), banyak noise, akurasi prediksi buruk. | Dataset cukup beragam, memahami penyebab kesalahan tebak dasar dan mampu memperbaikinya. | Dataset tertata rapi, mempertimbangkan variasi ekstrim (cahaya, sudut, jarak), akurasi model konsisten >90%. |
| **Integrasi Logika Interaktif** | Model AI tidak terhubung dengan sistem aksi atau sering mengalami lag parah. | Mampu menghubungkan hasil deteksi AI untuk memicu aksi dasar pada game atau program. | Integrasi sangat mulus, responsivitas tinggi (*low latency*), dilengkapi umpan balik visual yang intuitif. |
| **Pemahaman Konseptual AI** | Menganggap AI bekerja secara mistis tanpa memahami peran data latih. | Mampu menjelaskan secara runtut konsep input ➔ model ➔ prediksi berdasarkan data. | Memahami konsep matematis di balik fitur, pemetaan koordinat landmark, dan batas limitasi model. |

---

*Hak Cipta © 2026 Beekoding. Silabus Modul 03 — Machine Learning & Eksperimen Data.*
