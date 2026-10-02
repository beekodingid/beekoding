# 🐝 PANDUAN LENGKAP INSTRUKTUR: TAHAP 2 — INTERMEDIATE CODER
### *Kurikulum & Rencana Pembelajaran Siap Ajar (Instruktur Teaching Handbook & Lesson Plans)*

- **Kode Dokumen**: `BK-INSTR-STAGE-02`
- **Target Usia**: 10 – 12 Tahun (SD Kelas 4, 5, dan 6)
- **Prasyarat Siswa**: Mengenal operasi matematika dasar (penjumlahan, pengurangan, perkalian, konsep angka negatif, koordinat sederhana)
- **Format Pertemuan**: 12 Sesi Pembelajaran Terpadu @ 90 Menit
- **Platform Utama**: *Scratch 3.0 (Lanjutan)*, *Google Teachable Machine (Webcam AI)*, *Python 3 IDLE / VS Code / Replit (Turtle & Scripting)*
- **Rasio Mentor**: 1 Instruktur : Maksimal 5–6 Siswa (Online) / 8–10 Siswa (Offline Lab)

---

## 🎯 PEDOMAN PEDAGOGIS & KARAKTERISTIK KOGNITIF USIA 10–12 TAHUN

1. **Pemikiran Operasional Konkret Menuju Abstrak**: Siswa mulai mampu memahami logika bertingkat (*nested conditions*), konsep variabel tersembunyi, dan perhitungan koordinat matematis.
2. **Minat Tinggi pada Game Kompleks & Kompetisi**: Anak usia ini tidak lagi puas dengan animasi sederhana; mereka ingin membuat game sungguhan seperti di Play Store/Roblox (ada skor tinggi, nyawa, gravitasi, bos musuh, efek partikel).
3. **Mulai Kritis & Mandiri**: Berikan ruang untuk eksperimen nilai parameter (*"Coba kalau gravitasinya diganti -2 apa yang terjadi?"*). Dorong mereka mencari solusi mandiri sebelum mentor memberi tahu jawabannya.
4. **Jembatan Mental dari Blok ke Teks**: Mengetik baris kode teks rentan typo (*Syntax Error*). Jelaskan bahwa tanda titik dua, kurung, dan spasi adalah gramatika bahasa komputer yang harus dihormati.

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90 MENIT)

| Durasi | Segmen Pembelajaran | Aktivitas Mentor |
| :---: | :--- | :--- |
| **00 – 10 Min** | **Problem Statement & Demo** | Tampilkan prototipe game yang sudah jadi. Tantang siswa: *"Bagaimana cara membuat karakter kita bisa melompat seperti Mario Bros?"* |
| **10 – 30 Min** | **Konsep Matematika / Logika** | Bedah konsep logika menggunakan papan tulis virtual / diagram (rumus gravitasi, diagram pohon if-else, alur koordinat X-Y). |
| **30 – 65 Min** | **Guided Coding & Implementation** | Siswa membangun arsitektur koding bersama mentor. Mentor memverifikasi logika variabel dan blok sensor. |
| **65 – 80 Min** | **Custom Feature Challenge** | Siswa menambahkan mekanisme tambahan: efek suara spesial, musuh variasi baru, atau sistem combo skor. |
| **80 – 90 Min** | **Code Review, Testing, & Logika Bug** | Mentor mengambil 1 sampel bug siswa, bahas bersama di layar: *"Kenapa karakter bisa tembus lantai?"* (Melatih analisis debugging). |

---

# 📚 RENCANA PELAKSANAAN PEMBELAJARAN (LESSON PLANS SESI 1 – 12)

---

## MODUL 1: REKAYASA GAME 2D & LOGIKA MATEMATIKA (SESI 1 – 4)

### SESI 01: Presisi Koordinat Kartesius 2D & Mekanika Bidikan
- **Tujuan Pembelajaran**: Siswa menguasai sumbu X (-240 s.d. 240) dan sumbu Y (-180 s.d. 180), arah hadap (*Direction 0° s.d. 360°*), serta pelacakan pointer mouse (*Point Towards*).
- **Konsep Kunci**: Koordinat Kartesius, Sudut Arah, Kecepatan Proyektil (*Bullet Speed*).
- **Analogi Ramah Anak**: 
  > *"Layar komputer kita adalah peta harta karun raksasa. Sumbu X adalah garis mendatar (kiri = minus, kanan = plus). Sumbu Y adalah tiang vertikal (bawah = minus, atas = plus). Titik tengah panggung adalah (0,0)!"*
- **Langkah Demi Langkah Instruktur (Live Demo Script)**:
  1. Pasang backdrop koordinat resmi Scratch (*X-Y Grid*).
  2. Masukkan sprite Meriam Madu (*Honey Cannon*) di posisi `(0, -120)`.
  3. Script Meriam Mengikuti Mouse:
  ```text
  [When Green Flag Clicked]
    go to x: (0) y: (-120)
    forever
      point towards [mouse-pointer v]
    end
  ```
  4. Buat sprite Peluru Madu (*Honey Bullet*) yang meluncur sesuai arah hadap meriam saat spasi ditekan:
  ```text
  [When [space v] key pressed]
    create clone of [myself v]

  [When I start as a clone]
    go to [Honey Cannon v]
    point in direction ([direction v] of [Honey Cannon v])
    show
    repeat until <touching [edge v] ?>
      move (15) steps
    end
    delete this clone
  ```
- **Tantangan Siswa**: Batasi sudut tembak agar meriam tidak bisa menembak ke arah tanah (gunakan blok `if <direction > 0 and direction < 180>`).

---

### SESI 02: Engine Fisika Platformer (Gravitasi, Velocity Y & Lompatan)
- **Tujuan Pembelajaran**: Siswa mampu merancang mekanika fisika realistis tanpa bantuan ekstensi; membuat karakter melompat halus dan berhenti tepat di atas platform tanah.
- **Konsep Kunci**: Kecepatan Vertikal (*Velocity Y*), Gaya Gravitasi (-1 per frame), Deteksi Lantai (*Ground Raycasting*).
- **Formula Logika Mentor**:
  $$\text{Posisi Y Baru} = \text{Posisi Y Lama} + \text{Velocity Y}$$
  $$\text{Velocity Y Berikutnya} = \text{Velocity Y} - 1 \quad (\text{Efek Gravitasi})$$
- **Langkah Demi Langkah Instruktur**:
  1. Buat variabel baru: `velocityY` (*For this sprite only*).
  2. Gambar backdrop dengan platform tanah berwarna hijau solid.
  3. Script Fisika Karakter Utama:
  ```text
  [When Green Flag Clicked]
    go to x: (-180) y: (50)
    set [velocityY v] to (0)
    forever
      // Gravitasi terus menarik ke bawah
      change [velocityY v] by (-1)
      change y by (velocityY)

      // Cek apakah menapak di atas platform tanah
      if <touching color [#22C55E] ?> then
        // Dorong kembali ke atas permukaan agar tidak amblas
        repeat until <not <touching color [#22C55E] ?>>
          change y by (1)
        end
        set [velocityY v] to (0)

        // Lompat hanya bisa dilakukan saat menyentuh tanah
        if <key [up arrow v] pressed?> then
          set [velocityY v] to (14)
          start sound [Jump v]
        end
      end
    end
  ```
- **Common Bugs & Solusi**: Karakter melompat berkali-kali di udara (*Infinite Flying*). Solusi: Pastikan blok cek `key up arrow pressed` berada di **dalam** blok `if touching color tanah`.

---

### SESI 03: Multi-Variable: Health Point, Dynamic Scoring & Countdown Timer
- **Tujuan Pembelajaran**: Siswa mampu mengelola banyak variabel sekaligus untuk menciptakan aturan permainan yang menantang dan seimbang (*game balance*).
- **Konsep Kunci**: Variabel Global (*For all sprites*), Health Bar (Nyawa), Game Loop State, Broadcast Akhir Game.
- **Langkah Demi Langkah Instruktur**:
  1. Buat 3 Variabel: `Skor`, `Nyawa`, dan `Sisa Waktu`.
  2. Script Manager Pengatur Waktu (di Backdrop):
  ```text
  [When Green Flag Clicked]
    set [Skor v] to (0)
    set [Nyawa v] to (3)
    set [Sisa Waktu v] to (60)
    forever
      wait (1) seconds
      change [Sisa Waktu v] by (-1)
      if <(Sisa Waktu) = (0)> then
        broadcast [Waktu Habis v]
        stop [all v]
      end
    end
  ```
  3. Script Pengurangan Nyawa saat Terkena Bahaya:
  ```text
  [When I receive [Kena Racun v]]
    change [Nyawa v] by (-1)
    start sound [Ouch v]
    // Efek karakter berkedip (Invulnerability Frames)
    repeat (5)
      set ghost effect to (50)
      wait (0.1) seconds
      set ghost effect to (0)
      wait (0.1) seconds
    end
    if <(Nyawa) < (1)> then
      broadcast [Game Over v]
      stop [all v]
    end
  ```
- **Tantangan Siswa**: Tambahkan item hati bonus (*Heart Item*) yang jika diambil menambah `Nyawa` +1 (maksimal 5).

---

### SESI 04: Algoritma Kloning & Spawner Musuh Acak
- **Tujuan Pembelajaran**: Memahami pengelolaan memori komputasi menggunakan satu sprite master yang menghasilkan puluhan klon musuh dinamis secara acak.
- **Konsep Kunci**: Kloning (*Cloning*), Generator Bilangan Acak (*Pick Random*), Penghapusan Klon (*Delete this clone*).
- **Analogi Ramah Anak**: 
  > *"Bayangkan mesin pencetak kue. Kita hanya butuh 1 cetakan master (Sprite asli). Dari cetakan itu, kita bisa memproduksi 100 kue kloningan dengan rasa dan warna berbeda-beda tanpa harus membuat 100 sprite baru di Scratch!"*
- **Langkah Demi Langkah Instruktur**:
  1. Buat sprite Musuh Kumbang Tanduk (*Beetle Enemy*). Sembunyikan sprite master asli (`hide`).
  2. Script Spawner Master:
  ```text
  [When Green Flag Clicked]
    hide
    forever
      wait (pick random (1) to (3)) seconds
      create clone of [myself v]
    end
  ```
  3. Script Perilaku Setiap Kloning:
  ```text
  [When I start as a clone]
    // Spawn di sisi kanan layar secara acak di ketinggian Y tertentu
    go to x: (240) y: (pick random (-100) to (120))
    set size to (pick random (50) to (90)) %
    show
    repeat until <<touching [edge v] ?> or <touching [Honey Bullet v] ?>>
      change x by (-6)
    end
    if <touching [Honey Bullet v] ?> then
      change [Skor v] by (10)
      start sound [Pop v]
    end
    delete this clone
  ```
- **Catatan Penting Instruktur**: Selalu ingatkan siswa untuk menambahkan `delete this clone`. Jika klon yang selesai tidak dihapus, Scratch akan mencapai limit 300 klon dan game akan macet total.

---

## MODUL 2: KECERDASAN BUATAN & VISION SENSOR (SESI 5 – 8)

### SESI 05: Anatomi Machine Learning: Data, Training & Inference
- **Tujuan Pembelajaran**: Siswa memahami perbedaan fundamental antara *Traditional Programming* (manusia menulis aturan) dan *Machine Learning* (mesin mempelajari pola dari contoh data).
- **Konsep Kunci**: Dataset Pelatihan, Model AI, *Inference* (Prediksi), Skor Probabilitas (*Confidence Score*), Masalah Bias Data.
- **Perbandingan Konseptual untuk Siswa**:
  - **Koding Tradisional**: `IF tombol spasi ditekan THEN tembak peluru`. (Aturan dibuat kaku oleh manusia).
  - **Machine Learning**: Kita tunjukkan 100 foto tangan terkepal dan 100 foto telapak terbuka. Komputer mengenali perbedaannya sendiri.
- **Aktivitas Interaktif**: Eksperimen *Quick, Draw!* dari Google — mengamati bagaimana jaringan saraf tiruan menebak gambar coretan siswa dalam 20 detik.

---

### SESI 06: Melatih Model Computer Vision Pengenal Gestur Tangan
- **Tujuan Pembelajaran**: Siswa mengumpulkan dataset gambar webcam sendiri dan melatih model klasifikasi multi-kelas menggunakan Google Teachable Machine.
- **Tools**: `teachablemachine.withgoogle.com` (Image Model - Standard).
- **Langkah Demi Langkah Instruktur**:
  1. Arahkan siswa membuka Google Teachable Machine $\rightarrow$ Pilih **Image Project**.
  2. Buat 3 Kelas (*Classes*):
     - **Class 1**: `Tangan Kiri Terangkat` (Rekam 100 sampel kamera dengan berbagai sudut & pencahayaan).
     - **Class 2**: `Tangan Kanan Terangkat` (Rekam 100 sampel kamera).
     - **Class 3**: `Posisi Netral / Diam` (Rekam wajah santai tanpa tangan terangkat).
  3. Klik **Train Model** (tunggu proses epoch training selesai).
  4. Lakukan pengujian di panel Preview: perhatikan persentase akurasi *confidence bar* bergerak realtime.
  5. Klik **Export Model** $\rightarrow$ Pilih tab **Tensorflow.js** $\rightarrow$ Klik **Upload (shareable link)** $\rightarrow$ Salin URL model cloud yang dihasilkan (`https://teachablemachine.withgoogle.com/models/xyz...`).

---

### SESI 07: Menghubungkan Model Kamera AI dengan Game Scratch
- **Tujuan Pembelajaran**: Mengintegrasikan URL model Teachable Machine ke dalam Scratch menggunakan platform ekstensi AI (seperti Adacraft / Stretch3 / TM2Scratch).
- **Langkah Demi Langkah Instruktur**:
  1. Buka Scratch modifikasi ekstensi Teachable Machine (`stretch3.github.io` atau platform pendukung Beekoding).
  2. Masukkan blok: `Load model from URL [Paste Link Model Siswa]`.
  3. Script Kontrol Game Berbasis Gestur:
  ```text
  [When Green Flag Clicked]
    forever
      if <model prediction is [Tangan Kanan Terangkat] with confidence > (0.8)> then
        change x by (10)
        say [Terbang ke Kanan! 👉]
      end
      if <model prediction is [Tangan Kiri Terangkat] with confidence > (0.8)> then
        change x by (-10)
        say [Terbang ke Kiri! 👈]
      end
    end
  ```
- **Tantangan Siswa**: Tambahkan gestur ke-4: `Mulut Membuka` untuk menembakkan laser madu!

---

### SESI 08: Evaluasi Proyek Mini 2: AI Gesture-Controlled Game
- **Tujuan Pembelajaran**: Merampungkan game interaktif utuh yang dikendalikan 100% tanpa menyentuh keyboard mouse, melainkan gerakan tangan di depan webcam.
- **Rubrik Penilaian Mentor**:
  - [x] Model AI memiliki akurasi di atas 80% pada pencahayaan normal.
  - [x] Karakter bergerak mulus merespons gestur tubuh siswa.
  - [x] Ada mekanisme game yang berfungsi (menangkap koin / menghindari rintangan).
  - [x] Siswa mampu menjelaskan kepada teman sekelas bagaimana model AI dilatih.

---

## MODUL 3: JEMBATAN DARI BLOK KE BAHASA TEKS PYTHON (SESI 9 – 12)

### SESI 09: Dari Blok ke Baris Kode: Geometri Python Turtle
- **Tujuan Pembelajaran**: Siswa mengatasi ketakutan terhadap kode teks; memahami bahwa setiap perintah blok Scratch memiliki padanan baris sintaksis di Python.
- **Konsep Kunci**: Modul Python (`import`), Fungsi Pemanggil, Parameter Argumen, Tanda Kurung dan Titik.
- **Tabel Kesetaraan Logika Scratch vs Python**:
  | Logika di Scratch | Baris Kode di Python Turtle |
  | :--- | :--- |
  | `move (100) steps` | `t.forward(100)` |
  | `turn right (90) degrees` | `t.right(90)` |
  | `set pen color to [#FF0000]` | `t.pencolor("red")` |
  | `repeat (4)` | `for i in range(4):` |

- **Contoh Script Python Pertama Siswa**:
  ```python
  import turtle

  # Inisialisasi layar dan kura-kura pelukis
  screen = turtle.Screen()
  screen.bgcolor("#0F172A") # Background navy Beekoding

  t = turtle.Turtle()
  t.shape("turtle")
  t.color("#F59E0B") # Kuning madu
  t.speed(3)
  t.pensize(3)

  # Menggambar Segi Enam (Sarang Lebah Hexagon)
  for i in range(6):
      t.forward(80)
      t.left(60)

  turtle.done()
  ```
- **Tantangan Siswa**: Buat pola bunga sarang lebah dengan memutar hexagon 12 kali dalam perulangan bersarang (*Nested Loop*).

---

### SESI 10: Variabel, Input Interaktif & Operasi Matematika di Python
- **Tujuan Pembelajaran**: Siswa mampu mengambil input teks dan angka dari pengguna menggunakan terminal konsol Python dan melakukan kalkulasi dinamis.
- **Konsep Kunci**: Tipe Data String (`str`), Integer (`int`), Fungsi `input()`, Konversi Tipe Data (*Typecasting*).
- **Langkah Demi Langkah Instruktur**:
  1. Buka Python IDE (Thonny / IDLE / VS Code).
  2. Bahas mengapa `int(input())` dibutuhkan: *"Komputer menganggap semua yang diketik keyboard sebagai huruf/teks. Agar bisa dijumlahkan, teks harus disihir menjadi angka bulat (Integer)!"*
  3. Contoh Script Program Kuis Matematika:
  ```python
  print("=" * 40)
  print("🐝 BEEKODING: ASISTEN MATEMATIKA CERDAS")
  print("=" * 40)

  nama = input("Siapa nama pahlawan kodingmu? ")
  print(f"Senang bertemu denganmu, {nama}! Mari kita hitung panen madu hari ini.\n")

  kotak_madu = int(input("Berapa kotak sarang lebah yang dipanen? "))
  botol_per_kotak = 12

  total_botol = kotak_madu * botol_per_kotak
  harga_per_botol = 75000
  total_rupiah = total_botol * harga_per_botol

  print("\n" + "-" * 30)
  print(f"Total produksi: {total_botol} botol madu murni!")
  print(f"Estimasi pendapatan: Rp {total_rupiah:,}")
  print("-" * 30)
  ```
- **Common Bugs & Solusi**: Siswa lupa mengetik tanda kurung tutup ganda `))`, muncul `SyntaxError: unexpected EOF while parsing`. Solusi: Ajarkan rumus hitung kurung: *"Berapa kurung buka, harus ada kurung tutup yang sama banyaknya!"*

---

### SESI 11: Struktur Percabangan `if - elif - else` & Game Tebak Angka
- **Tujuan Pembelajaran**: Menerapkan logika keputusan bertingkat di Python dan perulangan bersyarat `while loop`.
- **Konsep Kunci**: Kondisi Percabangan, Indentasi Spasi (Tab), Modul `random`.
- **Contoh Script Game Python Lengkap**:
  ```python
  import random

  print("🎮 GAME TEBAK KODE RAHASIA BEEKODING")
  print("Komputer telah memilih angka misterius antara 1 sampai 50.")
  print("Kamu memiliki 6 kesempatan untuk menebak!\n")

  angka_rahasia = random.randint(1, 50)
  kesempatan = 6
  menang = False

  while kesempatan > 0:
      tebakan = int(input(f"Sisa kesempatan ({kesempatan}). Masukkan tebakanmu: "))

      if tebakan == angka_rahasia:
          print(f"🎉 LUAR BIASA! Kamu berhasil menebak angka {angka_rahasia} dengan tepat!")
          menang = True
          break
      elif tebakan < angka_rahasia:
          print("📈 Terlalu KECIL! Coba tebak angka yang lebih tinggi.")
      else:
          print("📉 Terlalu BESAR! Coba tebak angka yang lebih rendah.")

      kesempatan -= 1
      print()

  if not menang:
      print(f"💀 Game Over! Angka rahasia yang benar adalah {angka_rahasia}. Jangan menyerah, coba lagi!")
  ```

---

### SESI 12: CAPSTONE INTERMEDIATE: "PYTHON SMART ADVENTURE BOT" & DEMO DAY
- **Tujuan Pembelajaran**: Siswa membangun proyek mandiri berbasis teks interaktif (Game RPG Naratif atau Bot Asisten) menggabungkan variabel, fungsi, percabangan, dan logika loop.
- **Kriteria Kelulusan Proyek**:
  1. Kode Python berjalan bersih tanpa crash sintaksis.
  2. Memiliki minimal 3 percabangan skenario keputusan pemain.
  3. Menggunakan modul standar Python (`random` atau `time`).
  4. Mampu menjelaskan struktur baris kode kepada audiens selama 2–3 menit.
- **Apresiasi Mentor**: Penyerahan Sertifikat Resmi *Intermediate AI Coder* dan rekomendasi jenjang berikutnya menuju *Teens Innovator*.
