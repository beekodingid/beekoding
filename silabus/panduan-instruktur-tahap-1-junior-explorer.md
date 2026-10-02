# 🐝 PANDUAN LENGKAP INSTRUKTUR: TAHAP 1 — JUNIOR EXPLORER
### *Kurikulum & Rencana Pembelajaran Siap Ajar (Instruktur Teaching Handbook & Lesson Plans)*

- **Kode Dokumen**: `BK-INSTR-STAGE-01`
- **Target Usia**: 6 – 9 Tahun (TK B – SD Kelas 1, 2, dan 3)
- **Prasyarat Siswa**: Zero Experience (Belum pernah koding sebelumnya; cukup mampu mengenali huruf, angka, dan menggunakan mouse/touchpad)
- **Format Pertemuan**: 12 Sesi Pembelajaran Terpadu @ 75–90 Menit
- **Platform Utama**: *ScratchJr (Tablet/PC)* & *Scratch 3.0 (Web)*, AI Creative Media Tools, Unplugged Logic Kits
- **Rasio Mentor**: 1 Instruktur : Maksimal 4–5 Siswa (Online) / 6–8 Siswa (Offline Lab)

---

## 🎯 PEDOMAN PEDAGOGIS & KARAKTERISTIK KOGNITIF ANAK USIA 6–9 TAHUN

Sebagai instruktur Beekoding, pahami prinsip psikologi perkembangan anak pada jenjang ini:
1. **Peralihan dari Konkret ke Simbolik**: Anak usia 6–9 tahun berpikir melalui apa yang mereka lihat dan sentuh. Selalu mulai dengan contoh visual nyata atau analogi fisik sebelum menyusun blok kode.
2. **Rentang Perhatian (Attention Span) 15–20 Menit**: Jangan memberikan ceramah teori panjang! Gunakan pola *Chunking*: 10 menit penjelasan/demo $\rightarrow$ 15 menit praktik mandiri $\rightarrow$ 5 menit mini-game/cek bersama.
3. **Pemberian Reward & Apresiasi Positif (Praise the Effort, Not Just the Result)**: Gunakan stiker virtual, tepuk tangan koding ("Bee High-Five!"), dan puji ketekunan anak ketika berhasil membetulkan kesalahan (*debugging*).
4. **Kesabaran Motorik Halus**: Sebagian siswa kelas 1 SD masih belajar mengklik ganda (*double-click*) atau *drag-and-drop*. Berikan waktu dan pandu dengan mouse pointer berwarna kontras.

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90 MENIT)

| Durasi | Segmen Pembelajaran | Aktivitas Mentor |
| :---: | :--- | :--- |
| **00 – 10 Min** | **Ice Breaking & Warm-up** | Sapa nama setiap anak, review 1 menit materi minggu lalu, perlihatkan cuplikan game keren yang akan dibuat hari ini. |
| **10 – 25 Min** | **Live Guided Demo (Show & Tell)** | Mentor mendemokan blok kode langkah demi langkah di layar bersama; jelaskan konsep inti dengan analogi cerita. |
| **25 – 60 Min** | **Hands-on Student Coding (Praktik)** | Siswa membuka Scratch, menyusun blok dipandu mentor. Mentor meminta siswa share screen bergantian untuk memastikan tidak ada yang tertinggal. |
| **60 – 75 Min** | **Mini Challenge (Eksplorasi Kreatif)** | Berikan tantangan modifikasi warna, suara, atau kecepatan sesuai imajinasi masing-masing anak. |
| **75 – 85 Min** | **Showcase & Peer Celebration** | Setiap anak menunjukkan karyanya selama 1–2 menit, teman sekelas memberikan tepuk tangan dan pujian. |
| **85 – 90 Min** | **Wrap-up & Quest Rumah Ringan** | Rangkuman 1 kalimat hikmah logika hari ini dan pengumuman misi rahasia untuk pertemuan berikutnya. |

---

# 📚 RENCANA PELAKSANAAN PEMBELAJARAN (LESSON PLANS SESI 1 – 12)

---

## MODUL 1: FONDASI ALGORITMA VISUAL & GERAK DASAR (SESI 1 – 4)

### SESI 01: Petualangan Robot Lebah (Unplugged Computational Thinking)
- **Tujuan Pembelajaran**: Siswa memahami bahwa komputer tidak bisa menebak pikiran manusia; komputer hanya menjalankan instruksi urutan langkah (*step-by-step sequence*) yang tepat.
- **Konsep Kunci**: Algoritma, Instruksi, Urutan (*Sequence*), Arah (Maju, Belok Kanan, Belok Kiri).
- **Analogi Ramah Anak**: 
  > *"Bayangkan kamu punya robot pelayan di rumah. Kalau kamu bilang 'Robot, ambil minum!', robot akan bingung karena tidak tahu harus jalan berapa langkah dan membuka kulkas yang mana. Robot butuh instruksi detail: Maju 3 langkah $\rightarrow$ Belok kanan $\rightarrow$ Buka pintu kulkas $\rightarrow$ Ambil botol."*
- **Aktivitas Praktik Mentor**:
  1. *Game Unplugged*: Mentor berpura-pura menjadi "Robot Bee yang Rusak". Siswa harus memberikan perintah suara ("Maju 1 langkah!", "Putar ke kanan!") agar mentor berhasil mengambil botol madu di atas meja tanpa menabrak kursi.
  2. Siswa menggambar diagram peta petak 4x4 di kertas, memandu lebah menuju bunga terdekat dengan panah arah: `[↑] [↑] [→] [↑]`.
- **Tantangan Siswa**: Temukan jalur tercepat menuju sarang lebah tanpa melewati sarang laba-laba.
- **Common Bugs & Solusi**: Siswa sering terbalik antara "Belok Kanan" dan "Maju ke Kanan". Mentor mengingatkan: *"Putar badan dulu menghadap arah bunga, baru langkahkan kaki!"*

---

### SESI 02: Menghidupkan Karakter di Scratch (Stage, Sprite, & Motion)
- **Tujuan Pembelajaran**: Siswa mengenal antarmuka Scratch 3.0, mampu memilih karakter (*Sprite*), memilih latar (*Backdrop*), dan menyusun blok gerak pertama.
- **Konsep Kunci**: *Stage* (Panggung Pertunjukan), *Sprite* (Aktor/Karakter), *Code Workspace* (Buku Mantra Koding).
- **Langkah Demi Langkah Instruktur (Live Demo Script)**:
  1. Arahkan siswa membuka `scratch.mit.edu` $\rightarrow$ Klik **Create**.
  2. Hapus kucing Scratch default, klik tombol kucing kecil di pojok kanan bawah $\rightarrow$ Pilih sprite lebah (*Bee*) atau kumbang (*Ladybug*).
  3. Klik tombol pemandangan di pojok paling kanan $\rightarrow$ Pilih latar belakang taman bunga (*Garden* / *Flowers*).
  4. Ambil kategori warna biru **Motion (Gerakan)**:
     - Tarik blok `move (10) steps`.
     - Klik blok tersebut dengan mouse. Perhatikan sprite bergerak!
  5. Tarik kategori warna kuning **Events**:
     - Pasang balok topi emas `when green flag clicked` di atas blok gerak.
- **Contoh Script Kode Siswa**:
  ```text
  [When Green Flag Clicked]
    move (50) steps
    say [Halo, aku Beeby Si Lebah Ceria!] for (2) seconds
  ```
- **Tantangan Siswa**: Ubah angka 50 menjadi 100, lalu ganti pesan salam dengan nama panggilan anak masing-masing.

---

### SESI 03: Pemicu Peristiwa (Events: Sentuh, Klik, & Tombol)
- **Tujuan Pembelajaran**: Siswa memahami hubungan sebab-akibat (*cause and effect*); aksi pengguna memicu reaksi karakter di layar.
- **Konsep Kunci**: *Event Trigger* (Pemicu), Input Klik Mouse, Efek Visual (Ukuran & Suara).
- **Analogi Ramah Anak**: 
  > *"Seperti bel pintu rumah. Rumah kita tidak akan berbunyi kalau belnya tidak ditekan. Tombol klik mouse adalah jari kita yang menekan bel ajaib pada karakter!"*
- **Langkah Demi Langkah Instruktur**:
  1. Masukkan sprite bunga (*Flower*).
  2. Tambahkan script pada sprite bunga:
  ```text
  [When this sprite clicked]
    change size by (20)
    start sound [Magic Spell v]
    say [Terima kasih sudah menyiramku! ✨] for (2) seconds
    wait (1) seconds
    set size to (100) %
  ```
  3. Bimbing siswa mencoba mengklik bunga berulang-ulang di layar panggung.
- **Tantangan Siswa**: Tambahkan 3 bunga berbeda warna. Ketika diklik, masing-masing mengeluarkan suara nada berbeda (*Pop*, *Boing*, *Coin*).

---

### SESI 04: Kepakan Sayap Lebah (Perulangan: Repeat & Forever)
- **Tujuan Pembelajaran**: Siswa memahami konsep perulangan otomatis agar tidak perlu menyusun blok yang sama ratusan kali.
- **Konsep Kunci**: *Loop* (Perulangan), *Forever* (Selamanya), Pergantian Kostum (*Next Costume*).
- **Analogi Ramah Anak**: 
  > *"Apakah jantung kita berhenti berdetak saat kita tidur? Tidak, jantung kita bekerja 'Forever' (selamanya). Di koding, kalau kita ingin sayap lebah mengepak terus tanpa henti, kita masukkan ke dalam balok pelindung Forever!"*
- **Langkah Demi Langkah Instruktur**:
  1. Pilih sprite Bee. Klik tab **Costumes** di kiri atas, tunjukkan pada anak bahwa sprite lebah punya 2 gambar (sayap naik dan sayap turun).
  2. Kembali ke tab **Code**, susun script kepakan sayap:
  ```text
  [When Green Flag Clicked]
    forever
      next costume
      wait (0.2) seconds
      move (5) steps
      if on edge, bounce
    end
  ```
  3. Jelaskan mengapa `wait (0.2) seconds` diperlukan: *"Kalau tidak diberi jeda istirahat, sayap lebah mengepak secepat kilat sampai mata kita pusing!"*
- **Tantangan Siswa**: Buat lebah berputar haluan saat membentur dinding dengan menambahkan blok `set rotation style [left-right v]`.

---

## MODUL 2: DONGENG INTERAKTIF, SENI AI & SUARA (SESI 5 – 8)

### SESI 05: Komunikasi Dua Karakter & Pergantian Giliran (Broadcast & Wait)
- **Tujuan Pembelajaran**: Siswa mampu mengatur alur percakapan dua karakter yang santun, saling menunggu giliran bicara.
- **Konsep Kunci**: Sinkronisasi Waktu (*Timing & Delay*), *Wait Block*, Dialog Balon Kata.
- **Analogi Ramah Anak**: 
  > *"Ketika Ayah sedang berbicara, kita mendengarkan dulu. Setelah Ayah selesai, baru giliran kita menjawab. Karakter di koding juga harus saling mendengarkan menggunakan balok Wait!"*
- **Langkah Demi Langkah Instruktur**:
  1. Tambahkan 2 karakter di panggung: Karakter A (Lebah) di kiri, Karakter B (Kupu-kupu) di kanan.
  2. Script Karakter A (Lebah):
  ```text
  [When Green Flag Clicked]
    say [Hai Kupu-kupu, maukah kamu mencari madu bersamaku?] for (3) seconds
    wait (3) seconds
    say [Hore! Ayo kita terbang ke kebun matahari!] for (2) seconds
  ```
  3. Script Karakter B (Kupu-kupu):
  ```text
  [When Green Flag Clicked]
    wait (3) seconds
    say [Tentu saja Beeby! Aku tahu ladang bunga terindah!] for (3) seconds
  ```
- **Common Bugs & Solusi**: Dialog muncul bersamaan dan bertumpuk di layar. Solusi: Pastikan waktu `wait` pada karakter kedua sama persis dengan durasi `say ... for (x) seconds` karakter pertama.

---

### SESI 06: Studio Musik & AI Voice Generator (Text-to-Speech)
- **Tujuan Pembelajaran**: Menambahkan ekstensi Text-to-Speech agar karakter bisa benar-benar berbicara mengeluarkan suara bahasa manusia.
- **Konsep Kunci**: Ekstensi Tambahan Scratch, *Text-to-Speech AI*, Pengaturan Karakter Suara (*Alto, Tenor, Squeak*).
- **Langkah Demi Langkah Instruktur**:
  1. Klik tombol **Add Extension** (ikon balok biru di pojok kiri paling bawah Scratch).
  2. Pilih ekstensi **Text to Speech**.
  3. Ambil blok baru warna hijau toska:
  ```text
  [When this sprite clicked]
    set voice to [squeak v]
    set language to [Indonesian v]
    speak [Halo teman-teman! Selamat datang di sarang koding!]
  ```
- **Tantangan Siswa**: Tambahkan karakter katak dengan suara `giant`, dan karakter anak kucing dengan suara `kitten`. Siswa merekam percakapan lucu antar-karakter.

---

### SESI 07: Merancang Karakter Hero Bersama AI (Kid-Safe Image Prompting)
- **Tujuan Pembelajaran**: Memperkenalkan konsep dasar Generative AI pada anak secara aman; merancang karakter maskot impian melalui deskripsi kata-kata visual.
- **Konsep Kunci**: Prompt Gambar, Deskripsi Visual (Warna, Pakaian, Bentuk, Emosi), Pahlawan Digital Ramah.
- **Panduan Praktik Mentor (Menggunakan Canva Magic Media / DALL-E / Bing Creator ramah anak)**:
  1. Mentor mendemokan di layar utama: *"Kita ingin membuat teman baru untuk Beeby Si Lebah. Yuk kita beri tahu AI seperti apa karakternya!"*
  2. Formula Prompt Anak:
     `[Karakter Binatang] + [Pakaian/Topi] + [Gaya Gambar Kartun 3D Lucu] + [Warna Favorit]`
  3. Contoh Input Prompt Guru:
     ```text
     Cute friendly baby bee wearing a tiny blue astronaut helmet and red sneakers, 3D Pixar animated cartoon style, bright sunny flower meadow background, happy smile
     ```
  4. Unduh hasil gambar, gunakan tools hapus background instan, dan unggah (*Upload Sprite*) ke dalam Scratch siswa.
- **Nilai Karakter**: Ajarkan anak bahwa AI adalah kuas lukis ajaib, tetapi ide dan imajinasinya 100% berasal dari kepala mereka sendiri.

---

### SESI 08: Evaluasi Proyek Mini 1: Buku Cerita Interaktif (Storybook Showcase)
- **Tujuan Pembelajaran**: Siswa menyatukan karakter buatan AI, dialog suara, dan pergerakan menjadi buku cerita digital 2 babak.
- **Struktur Proyek**:
  - Halaman 1: Perkenalan karakter di sekolah lebah.
  - Halaman 2: Menemukan peta misterius menggunakan tombol panah lanjut (*Next Page Button*).
- **Rubrik Penilaian Mentor**:
  - [x] Memiliki minimal 2 karakter berbeda.
  - [x] Karakter bergerak dan mengeluarkan dialog bergantian.
  - [x] Ada tombol interaktif yang bisa diklik.
  - [x] Siswa mampu menjelaskan cerita karyanya selama 60 detik di depan kelas.

---

## MODUL 3: PEMBUATAN GAME INTERAKTIF PERDANA (SESI 9 – 12)

### SESI 09: Labirin Sarang Lebah (Navigasi Tombol Panah & Sensing)
- **Tujuan Pembelajaran**: Siswa mampu mengendalikan sprite dengan 4 tombol keyboard panah dan mendeteksi tabrakan tembok (*Color Sensing*).
- **Konsep Kunci**: Sensor Warna (*Touching Color*), Kontrol Keyboard Panah, Posisi Awal (*Spawn Point*).
- **Langkah Demi Langkah Instruktur**:
  1. Gambar backdrop labirin sederhana (jalan putih, tembok warna biru tebal).
  2. Atur ukuran sprite lebah menjadi kecil (`set size to 40%`).
  3. Script Kontrol Panah:
  ```text
  [When Green Flag Clicked]
    go to x: (-200) y: (140)
    forever
      if <key [up arrow v] pressed?> then
        change y by (6)
      end
      if <key [down arrow v] pressed?> then
        change y by (-6)
      end
      if <key [right arrow v] pressed?> then
        change x by (6)
      end
      if <key [left arrow v] pressed?> then
        change x by (-6)
      end
      if <touching color [#0000FF] ?> then
        say [Aduh, menabrak tembok!] for (0.5) seconds
        go to x: (-200) y: (140)
      end
    end
  ```
- **Common Bugs & Solusi**: Sprite lebah tersangkut di tembok labirin. Solusi: Pastikan garis labirin digambar cukup lebar dan ukuran sprite dikecilkan agar leluasa melintas.

---

### SESI 10: Mengumpulkan Bunga & Menambah Skor (Variables)
- **Tujuan Pembelajaran**: Siswa memahami fungsi variabel sebagai wadah penyimpanan angka yang dapat bertambah.
- **Konsep Kunci**: Variabel (*Variable*), Skor (*Score*), Sembunyi (*Hide*), Tampil (*Show*).
- **Analogi Ramah Anak**: 
  > *"Variabel itu seperti keranjang tabungan madu. Di awal game keranjang kita kosong (Skor = 0). Setiap kali lebah berhasil menyentuh bunga, kita masukkan 1 botol madu ke dalam keranjang (Skor bertambah 1)!"*
- **Langkah Demi Langkah Instruktur**:
  1. Buka kategori warna oranye **Variables** $\rightarrow$ Klik **Make a Variable** $\rightarrow$ Beri nama `Madu Dikumpulkan`.
  2. Script pada Sprite Lebah:
  ```text
  [When Green Flag Clicked]
    set [Madu Dikumpulkan v] to (0)
  ```
  3. Script pada Sprite Bunga Madu:
  ```text
  [When Green Flag Clicked]
    show
    forever
      if <touching [Bee v] ?> then
        change [Madu Dikumpulkan v] by (1)
        start sound [Chomp v]
        hide
        stop [this script v]
      end
    end
  ```
- **Tantangan Siswa**: Gandakan (*Duplicate*) bunga menjadi 5 buah dan sebar di berbagai sudut labirin.

---

### SESI 11: Rintangan Laba-Laba Bergerak & Pesan Menang/Kalah
- **Tujuan Pembelajaran**: Menambahkan musuh bergerak otomatis yang harus dihindari siswa dan layar akhir permainan (*Win/Lose Screen*).
- **Konsep Kunci**: Animasi Patroli Musuh, Sinyal Siaran (*Broadcast Message*), Backdrop Kemenangan.
- **Langkah Demi Langkah Instruktur**:
  1. Tambahkan sprite musuh Laba-laba (*Spider*).
  2. Buat laba-laba bergerak bolak-balik berpatroli:
  ```text
  [When Green Flag Clicked]
    forever
      glide (2) secs to x: (0) y: (50)
      glide (2) secs to x: (0) y: (-50)
    end
  ```
  3. Deteksi tabrakan antara Lebah dan Laba-laba:
  ```text
  [When Green Flag Clicked]
    forever
      if <touching [Spider v] ?> then
        broadcast [Game Over v]
        say [Oh tidak! Kena laba-laba!] for (1) seconds
        stop [all v]
      end
    end
  ```
  4. Ketika madu terkumpul 5, siarkan `[You Win v]` dan ganti latar belakang pesta kembang api.

---

### SESI 12: CAPSTONE JUNIOR: "BEE HONEY HARVEST" & MINI DEMO DAY
- **Tujuan Pembelajaran**: Siswa merampungkan game ciptaan mereka secara mandiri, memberikan sentuhan dekorasi unik, dan mempresentasikan di hadapan mentor serta orang tua.
- **Checklist Kesiapan Karya Siswa**:
  1. Punya judul game buatan sendiri di pojok atas Scratch.
  2. Karakter bergerak lincah dengan 4 tombol panah.
  3. Ada minimal 3 madu yang bisa dikoleksi dengan efek suara riang.
  4. Skor madu bertambah dengan benar di layar.
  5. Ada tantangan musuh atau rintangan warna.
- **Format Presentasi Siswa (Durasi 2 Menit per Anak)**:
  - *"Halo semua, nama aku [Nama Anak]."*
  - *"Hari ini aku membuat game bernama [Judul Game]."*
  - *"Cara memainkannya: tekan tombol panah untuk menggerakkan lebah mengambil madu. Jangan sampai kena laba-laba!"*
  - *"Bagian paling seru yang aku buat adalah [Suara/Warna/Gerakan]."*
- **Apresiasi Mentor**: Berikan Sertifikat Kelulusan *Junior Code Explorer* dan lencana digital kebanggaan anak.

---

## 🛠️ TIPS MENGATASI KENDALA TEKNIS SPESIFIK JUNIOR

1. **Siswa Salah Meletakkan Script di Sprite yang Salah**:
   - *Ciri-ciri*: Anak bingung kenapa lebah tidak bergerak, ternyata script diletakkan di backdrop atau sprite bunga.
   - *Solusi Instruktur*: Ingatkan anak selalu melihat ikon kecil di pojok kanan atas area kode: *"Cek foto aktor di pojok kanan atas ya! Pastikan gambar Lebah yang sedang aktif bersinar biru!"*
2. **Karakter Terlalu Besar Sampai Tidak Muat di Layar**:
   - *Solusi*: Arahkan ke kolom `Size` di bawah panggung, ganti angka 100 menjadi 50 atau 40.
3. **Koneksi Internet Lambat di Scratch Web**:
   - *Solusi Backup*: Minta orang tua mengunduh aplikasi *Scratch Desktop (Offline Editor)* gratis sebelum kelas dimulai sebagai antisipasi jaringan terputus.
