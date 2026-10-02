# 🐝 BUKU PANDUAN UTAMA INSTRUKTUR: TAHAP 1 — JUNIOR EXPLORER (SESI 1 – 96)
### *Kurikulum Lengkap 2 Tahun Berkelanjutan (Pathway 96 Sesi Siap Ajar)*
*Pedoman Pedagogi, Rundown Mengajar, Analogi Ramah Anak, Kode Blok Scratch 3.0, Micro:bit Sensor & Proyek Karya Mandiri*

- **Kode Dokumen**: `BK-INSTR-STAGE-01-FULL96`
- **Target Usia**: 6 – 9 Tahun (TK B, SD Kelas 1, 2, dan 3)
- **Jenjang Program**: 
  - **Tahun 1 (Level 1–4 / Sesi 1–48)**: Fondasi Computational Thinking, Scratch 3.0 Game Mechanics, & Physical Computing Micro:bit.
  - **Tahun 2 (Level 5–8 / Sesi 49–96)**: Scratch Advanced Extensions, Algoritma Matematika, Junior Robotics & Game Jam Portofolio.
- **Prasyarat Siswa**: Zero Experience (Mampu mengenali huruf/angka sederhana & menggunakan mouse/layar sentuh).
- **Rasio Pembimbing**: 1 Instruktur : Maksimal 4–5 Siswa (Online) / 6–8 Siswa (Offline Lab).

---

## 🎯 PRINSIP PEDAGOGIS KHUSUS USIA 6–9 TAHUN
1. **Pendekatan Konkret ke Abstrak**: Anak usia ini belum siap memahami konsep abstrak seperti variabel memori tanpa analogi fisik (gunakan analogi "Kotak Celengan Berlabel").
2. **Aturan 15 Menit (Chunking Method)**: 10 menit live demo -> 15 menit praktik mandiri -> 5 menit tepuk koding/ice breaking.
3. **Praise the Effort, Not Just the Result**: Puji ketekunan saat anak berhasil membetulkan bug (debugging).
4. **Visual & Auditori**: Manfaatkan suara, musik ceria, dan warna kontras untuk memperkuat memori asosiasi logika.

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90 MENIT)
| Menit | Segmen Kelas | Panduan Instruktur |
| :---: | :--- | :--- |
| **00–10'** | **Ice Breaking & Review** | Sapa nama setiap anak, review 1 menit sesi lalu, demonstrasikan karya seru hari ini. |
| **10–25'** | **Guided Live Demo** | Instruktur mendemokan blok kode di layar bersama langkah-demi-langkah dengan cerita. |
| **25–60'** | **Hands-on Student Coding** | Siswa menyusun blok di komputernya. Mentor memantau share screen bergantian. |
| **60–75'** | **Creative Challenge** | Tantangan memodifikasi warna, suara, kecepatan, atau rintangan secara mandiri. |
| **75–85'** | **Showcase & Celebration** | Siswa memamerkan hasil karyanya, teman sekelas memberi apresiasi tepuk koding. |
| **85–90'** | **Wrap-up & Quest Rumah** | Kesimpulan 1 kalimat hikmah logika dan pengumuman misi pertemuan berikutnya. |

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-1 (SESI 01 – 48)

## 📌 LEVEL 1: STARTER FOUNDATION & VISUAL MOTION (SESI 01 – 12)
- **Sesi 01: Petualangan Robot Lebah (Unplugged Computational Thinking)**
  - *Konsep*: Algoritma adalah urutan instruksi presisi. Komputer tidak bisa menebak pikiran manusia.
  - *Analogi*: Robot dapur yang butuh panduan langkah per langkah untuk mengambil botol minum.
  - *Aktivitas*: Game fisik arah panah [↑] [↑] [→] [↑] di atas grid lantai labirin.
- **Sesi 02: Menghidupkan Karakter di Scratch (Stage, Sprite & Motion)**
  - *Konsep*: Aktor panggung (*Sprite*), Panggung (*Stage*), dan Blok Gerak Biru (*Motion*).
  - *Kode Blok*: `[When Green Flag Clicked] -> move (50) steps -> say [Halo, aku Beeby!] for (2) secs`.
  - *Tips*: Ajarkan anak memilih background *Flowers* dan sprite *Bee* dikecilkan ke 50%.
- **Sesi 03: Pemicu Peristiwa (Events: Klik, Sentuh, & Efek Suara)**
  - *Konsep*: Hubungan sebab-akibat (Cause & Effect) melalui blok topi emas.
  - *Kode Blok*: `[When this sprite clicked] -> change size by (20) -> start sound [Magic Spell] -> set size to (100)%`.
  - *Tantangan*: Tambahkan 3 bunga berbeda yang bersuara Pop, Boing, dan Coin.
- **Sesi 04: Kepakan Sayap Lebah (Perulangan Loop: Repeat & Forever)**
  - *Konsep*: Menghindari menyusun puluhan blok yang sama dengan perulangan otomatis.
  - *Kode Blok*: `[When Green Flag Clicked] -> forever [next costume -> wait (0.2) secs -> move (5) steps -> if on edge, bounce]`.
  - *Common Bug*: Sayap mengepak secepat kilat. Solusi: Pastikan ada `wait (0.2) secs`.
- **Sesi 05: Percakapan Dua Karakter (Timing & Wait Block)**
  - *Konsep*: Percakapan dua arah bergantian; karakter saling menunggu giliran bicara.
  - *Kode Blok*: Sprite A bicara 3 detik -> Sprite B `wait (3) secs` -> baru menjawab `say [Halo juga!]`.
  - *Analogi*: "Saat teman bicara di telepon, kita mendengarkan dulu baru merespons."
- **Sesi 06: Ekstensi AI Text-to-Speech (Karakter Berbicara Nyata)**
  - *Konsep*: Sintesis suara kecerdasan buatan dalam Bahasa Indonesia.
  - *Kode Blok*: `set voice to [squeak] -> set language to [Indonesian] -> speak [Halo teman-teman Beekoding!]`.
  - *Tantangan*: Buat katak bersuara berat (*giant*) dan anak kucing bersuara imut (*kitten*).
- **Sesi 07: Merancang Karakter Hero Bersama AI Generator**
  - *Konsep*: Prompt gambar ramah anak: [Karakter] + [Pakaian/Topi] + [Gaya Kartun 3D] + [Warna].
  - *Demo*: *"Cute baby bee with tiny astronaut helmet, 3D Pixar cartoon style"*.
  - *Aktivitas*: Unduh hasil gambar AI, hapus background, upload sprite ke Scratch anak.
- **Sesi 08: Evaluasi Mini Proyek 1: Buku Cerita Animasi Interaktif**
  - *Karya*: Menggabungkan karakter AI, Text-to-Speech, dan tombol navigasi halaman cerita digital.
  - *Rubrik*: Ada 2 karakter, percakapan bergantian rapi, dan efek suara klik.
- **Sesi 09: Labirin Sarang Lebah (Navigasi Tombol Panah & Sensing Warna)**
  - *Konsep*: Kontrol 4 arah tombol keyboard dan deteksi tabrakan tembok (*Color Sensing*).
  - *Kode Blok*: `if <key [up arrow] pressed?> then [change y by (6)]`. `if <touching color [biru]?> then [go to x: (-200) y: (140)]`.
  - *Common Bug*: Sprite macet di lorong labirin. Solusi: Perkecil ukuran sprite lebah ke 35%.
- **Sesi 10: Panen Madu & Variabel Skor (Variables System)**
  - *Konsep*: Variabel sebagai wadah tabungan angka yang bertambah setiap mengumpulkan nektar.
  - *Kode Blok*: `set [Skor v] to (0)`. Pada bunga: `if <touching [Bee]?> then [change [Skor v] by (1) -> hide]`.
  - *Tantangan*: Gandakan (*Duplicate*) bunga menjadi 6 buah di sudut labirin yang berbeda.
- **Sesi 11: Rintangan Laba-Laba Berpatroli & Layar Game Over**
  - *Konsep*: Musuh meluncur otomatis (*glide*), siaran pesan (*broadcast message*), dan backdrop kemenangan.
  - *Kode Blok*: `forever [glide (2) secs to x:(0) y:(50) -> glide (2) secs to x:(0) y:(-50)]`. Tabrakan memicu `broadcast [Game Over]`.
  - *Penyelesaian*: Jika Skor = 6 -> siarkan `broadcast [You Win]` dan mainkan suara kembang api.
- **Sesi 12: CAPSTONE LEVEL 1: 'Bee Honey Harvest' & Demo Day Cilik**
  - *Output*: Game arcade mandiri buatan anak yang utuh dan siap dimainkan.
  - *Showcase*: Presentasi 2 menit di depan kelas: nama game, cara main, dan fitur yang paling disukai.
  - *Apresiasi*: Pembagian Sertifikat Kelulusan *Junior Code Explorer Level 1*.

---

## 📌 LEVEL 2: GAME MECHANICS & LOGIKA DINAMIS (SESI 13 – 24)
- **Sesi 13: Game Tangkap Buah Apel Jatuh (Koordinat X dan Y)**
  - *Konsep*: Memahami sumbu vertikal Y (atas = positif, bawah = negatif).
  - *Kode Blok*: `[When Green Flag Clicked] -> forever [change y by (-6) -> if <y position < (-160)> then [go to x: (pick random (-200) to (200)) y: (170)]]`.
  - *Tantangan*: Gerakkan mangkuk penangkap dengan mouse: `set x to (mouse x)`.
- **Sesi 14: Efek Partikel dan Animasi Skor Terapung**
  - *Konsep*: Kloning efek kilau saat apel berhasil ditangkap mangkuk.
  - *Kode Blok*: `when I start as a clone -> repeat (10) [change y by (4) -> change [ghost v] effect by (10)] -> delete this clone`.
- **Sesi 15: Sistem Timer Hitung Mundur & Alarm Kemenangan**
  - *Konsep*: Variabel waktu `Waktu`. Loop `repeat until <Waktu = 0> [wait (1) secs -> change [Waktu v] by (-1)]`.
  - *Analogi*: Jam pasir yang butirannya jatuh satu per satu setiap detik.
- **Sesi 16: Logika Nyawa (Health Heart) & Buah Beracun**
  - *Konsep*: Variabel nyawa berkurang jika menangkap buah busuk. Jika Nyawa = 0 -> Game Over.
  - *Kode Blok*: `if <touching [Buah Busuk]?> then [change [Nyawa v] by (-1) -> start sound [Oops]]`.
- **Sesi 17: Multi-Level Switching (Kenaikan Tingkat Kesulitan)**
  - *Konsep*: Jika Skor >= 10, ganti background ke Level 2 dan naikkan kecepatan jatuh apel dari -6 menjadi -10.
- **Sesi 18: Fisika Lompat Sederhana (Gravitasi & Velocity Y Dasar)**
  - *Konsep*: Karakter melompat ke atas lalu tertarik kembali ke tanah secara natural.
  - *Kode Blok*: `if <key [space] pressed?> then [repeat (10) [change y by (8)] -> repeat (10) [change y by (-8)]]`.
- **Sesi 19: Game Flappy Bee: Menembus Pipa Rintangan**
  - *Konsep*: Layar bergerak menyamping (scrolling rintangan) dan karakter menjaga ketinggian terbang.
- **Sesi 20: Papan Peringkat Sederhana (High Score System)**
  - *Konsep*: Membandingkan nilai: `if <Skor > HighScore> then [set [HighScore v] to (Skor)]`.
- **Sesi 21: Efek Suara Latar Dinamis (Background Music Loop & Mute Button)**
  - *Konsep*: Sprite tombol musik yang bisa diklik untuk menghidupkan dan mematikan suara game.
- **Sesi 22: Brainstorming & Sketsa Storyboard Capstone Level 2**
  - *Aktivitas*: Anak menggambar alur game impiannya di kertas template Beekoding Game Sheet.
- **Sesi 23: Produksi Proyek Mandiri: Game Platformer Cilik**
  - *Praktik*: Siswa membangun game dengan bimbingan 1-on-1 dari instruktur.
- **Sesi 24: CAPSTONE LEVEL 2: 'Flappy Bee Adventure' & Laporan Semester**
  - *Output*: Game multi-level interaktif lengkap dengan sistem skor, nyawa, dan suara.
  - *Apresiasi*: Pembagian Sertifikat Kompetensi Semester 1 & Badge *Master of Game Mechanics*.

---

## 📌 LEVEL 3: SENSORY & PHYSICAL COMPUTING (SESI 25 – 36)
- **Sesi 25: Mengenal Dunia Fisik & Mikrokontroler (Micro:bit / Makey Makey)**
  - *Konsep*: Komputer bukan hanya layar monitor; komputer ada di jam tangan, remote, dan mobil.
- **Sesi 26: Menampilkan Animasi LED Emotikon & Senyum Digital**
  - *Kode*: Menyalakan matriks LED 5x5 membentuk ikon hati berdetak dan wajah tersenyum.
- **Sesi 27: Tombol Fisik A dan B (Input Hardware)**
  - *Konsep*: Menghubungkan tombol fisik hardware untuk menggerakkan sprite di layar komputer.
- **Sesi 28: Sensor Goyang (Accelerometer) & Game Dadu Ajaib**
  - *Konsep*: Deteksi getaran dan kemiringan (Shake gesture). Saat digoyang, angka dadu 1-6 muncul acak.
- **Sesi 29: Kompas Digital & Sensor Magnetik**
  - *Konsep*: Menentukan arah mata angin Utara, Selatan, Barat, dan Timur dengan koding.
- **Sesi 30: Detektor Suara & Sensor Kebisingan Mikrofon**
  - *Konsep*: Deteksi desibel ruangan. Jika suara tepuk tangan keras, karakter di Scratch melompat.
- **Sesi 31: Instrumen Musik Pisang Ajaib (Makey Makey Piano)**
  - *Konsep*: Konduktivitas listrik buah dan playdough. Menyentuh pisang menghasilkan tangga nada Do-Re-Mi.
- **Sesi 32: Sensor Suhu & Alarm Termometer Pintar**
  - *Konsep*: Membaca sensor panas. Jika suhu > 30°C, muncul ikon matahari dan suara sirine.
- **Sesi 33: Jam Tangan Pintar Penghitung Langkah (Smart Pedometer)**
  - *Konsep*: Menghitung setiap hentakan langkah kaki saat anak melompat di tempat.
- **Sesi 34: Game Controller Fisik Buatan Sendiri (DIY Cardboard Gamepad)**
  - *Aktivitas*: Membuat controller game dari kardus dan aluminium foil untuk mengontrol game Scratch.
- **Sesi 35: Integrasi Proyek Hardware-Software Interaktif**
  - *Praktik*: Menggabungkan sensor gerak fisik dengan animasi Scratch di layar lebar.
- **Sesi 36: CAPSTONE LEVEL 3: Pameran Gadget Cilik & Showcase Hardware**
  - *Output*: Proyek perangkat sensor buatan sendiri yang terhubung dengan game komputer.
  - *Apresiasi*: Sertifikat *Junior Hardware & Sensory Creator*.

---

## 📌 LEVEL 4: JUNIOR GAME JAM & KOLABORASI KARYA (SESI 37 – 48)
- **Sesi 37: Pengenalan Game Jam & Pembentukan Tim Kreator Cilik**
  - *Konsep*: Bekerja sama dalam tim: pembagian tugas antara desainer aset grafis dan programmer logika.
- **Sesi 38: Mendesain Dunia Game Impian (World Building & Lore)**
  - *Aktivitas*: Merancang peta dunia fantasi sarang lebah, desa bunga, dan hutan rintangan.
- **Sesi 39: Sistem Dialog Kompleks & NPC Quest Pemberi Misi**
  - *Konsep*: Karakter pendukung (NPC) yang memberikan misi: "Kumpulkan 3 nektar emas untuk membuka gerbang!".
- **Sesi 40: Sistem Inventori Cilik (Kantung Barang Pemain)**
  - *Konsep*: List variabel sederhana untuk mencatat item kunci yang sudah didapatkan.
- **Sesi 41: Boss Fight Battle: Logika Serangan Musuh Raksasa**
  - *Konsep*: Musuh besar yang memiliki nyawa tebal (*Boss HP = 20*) dan pola tembakan beruntun.
- **Sesi 42: Efek Visual Layar Bergetar (Screen Shake) & Kamera Mengikuti**
  - *Konsep*: Mengubah koordinat panggung dengan cepat untuk efek ledakan yang dramatis.
- **Sesi 43: Audio Foley & Perekaman Suara Karakter Siswa Sendiri**
  - *Aktivitas*: Siswa merekam suara mereka sendiri lewat mikrofon untuk mengisi dubbing karakter game.
- **Sesi 44: Debugging Jam: Menemukan & Memperbaiki Bug Teman**
  - *Konsep*: Belajar membaca kode teman, saling memberi masukan positif, dan memperbaiki error bersama.
- **Sesi 45: Polishing Game: Menambahkan Menu Pembuka, Kredit & Instruksi**
  - *Karya*: Membuat tombol "Play", "How to Play", dan nama pencipta game di halaman judul.
- **Sesi 46: Latihan Presentasi & Public Speaking Cilik**
  - *Keterampilan*: Melatih kontak mata, intonasi suara percaya diri, dan struktur demo game.
- **Sesi 47: Final Rehearsal & Uji Coba Bersama Orang Tua**
  - *Simulasi*: Uji coba memainkan game teman sekelas dan persiapan pameran akbar.
- **Sesi 48: GRAND CAPSTONE TAHUN KE-1: Junior Coding Expo & Sertifikasi Tahunan**
  - *Puncak Acara*: Pameran portofolio tahunan, presentasi proyek di depan orang tua dan dewan juri.
  - *Apresiasi*: Penganugerahan Sertifikat Resmi *Junior Explorer Annual Graduate (48 Sesi)*.

---

# 📅 RENCANA PEMBELAJARAN TAHUN KE-2 (SESI 49 – 96)

## 📌 LEVEL 5: ADVANCED SCRATCH EXTENSIONS & SENI DIGITAL (SESI 49 – 60)
- **Sesi 49: Ekstensi Pena Koding (Pen Extension & Menggambar Garis)**
  - *Konsep*: Mengontrol pena digital panggung: `pen down`, `set pen color`, `move steps`.
- **Sesi 50: Menggambar Bangun Datar Geometri Otomatis**
  - *Konsep*: Hubungan derajat putar bangun datar (Segitiga 120°, Persegi 90°, Lingkaran 1° loop 360 kali).
- **Sesi 51: Pola Bunga Mandala & Fraktal Ajaib (Matematika Kreatif)**
  - *Kode Blok*: Perulangan bersarang (*Nested Loop*) untuk membuat mandala pelangi simetris otomatis.
- **Sesi 52: Menggambar Spidol Ajaib dengan Pelacak Kursor Mouse**
  - *Konsep*: Aplikasi papan gambar digital mandiri (Paint App buatan sendiri dengan pilihan kuas warna).
- **Sesi 53: Ekstensi Musik & Pemrograman Ritme Drum MIDI**
  - *Konsep*: Ketukan birama (BPM), instrumen piano, drum snare, dan bassline digital.
- **Sesi 54: Komposisi Lagu 'Twinkle Little Star' dengan Koding Blok**
  - *Aktivitas*: Menyusun tangga nada musik klasik menggunakan blok `play note (60) for (0.5) beats`.
- **Sesi 55: Ekstensi Video Sensing (Kamera Web Interaktif)**
  - *Konsep*: Deteksi gerakan fisik tubuh nyata di depan kamera komputer (*Motion Detection*).
- **Sesi 56: Game Menepuk Balon Udara di Depan Kamera**
  - *Kode Blok*: `when video motion > 20 on sprite -> start sound [Pop] -> change score by 1 -> hide`.
- **Sesi 57: Filter Wajah Digital AR Sederhana (Kacamata & Topi Bergerak)**
  - *Konsep*: Efek Augmented Reality (AR) di mana sprite kacamata menempel pada pergerakan kepala anak.
- **Sesi 58: Integrasi Seni, Musik, dan Gerakan Kamera**
  - *Praktik*: Membuat instalasi seni digital interaktif yang merespons tepuk tangan dan tarian anak.
- **Sesi 59: Gladi Bersih Proyek Seni Digital Interaktif**
- **Sesi 60: CAPSTONE LEVEL 5: Digital Art & Interactive Music Expo**
  - *Output*: Aplikasi galeri interaktif multi-ekstensi. Sertifikat *Digital Creative Artist*.

---

## 📌 LEVEL 6: ALGORITMA MATEMATIKA, LOGIKA LABIRIN & STRUKTUR DATA (SESI 61 – 72)
- **Sesi 61: Operasi Aritmatika Cerdas (Penjumlahan, Pengurangan, & Perkalian)**
  - *Konsep*: Operator hijau Scratch: `(+)`, `(-)`, `(*)`, dan perbandingan `(>)`, `(<)`, `(=)`.
- **Sesi 62: Game Kuis Matematika Kilat Berwaktu (Math Challenge)**
  - *Kode Blok*: Komputer membuat 2 angka acak, meminta input anak: `ask [Berapa 7 + 8?] and wait`.
  - *Validasi*: `if <answer = (Angka1 + Angka2)> then [say [Benar!] -> change score by 10] else [say [Coba lagi!]]`.
- **Sesi 63: Mengenal Struktur Data List (Daftar Belanja Karakter)**
  - *Konsep*: Perbedaan variabel tunggal dengan List (bisa menampung banyak data nama dalam 1 wadah).
- **Sesi 64: Game Tebak Kata & Kamus Mini Bahasa Inggris**
  - *Konsep*: Memanggil data secara acak dari dalam daftar: `item (pick random 1 to (length of list)) of [Kamus v]`.
- **Sesi 65: Algoritma Pencarian Linear (Linear Search Sederhana)**
  - *Konsep*: Memeriksa satu per satu barang di dalam tas ransel apakah ada ramuan obat yang dicari.
- **Sesi 66: Logika Labirin Otomatis (Algoritma Penelusur Tembok Kiri)**
  - *Konsep*: Robot yang bisa mencari jalan keluar dari labirin rumit dengan aturan selalu menempel di tembok kiri.
- **Sesi 67: Simulasi Ekosistem Akuarium Virtual (Ikan Besar Makan Ikan Kecil)**
  - *Konsep*: Kecerdasan buatan perilaku hewan (*Artificial Life Simulation*). Sprite ikan mencari makan sendiri.
- **Sesi 68: Sistem Ekonomi Mini: Jual Beli Madu di Toko Desa**
  - *Konsep*: Logika transaksi: Kurangi stok madu, tambah tabungan koin emas, beli ramuan kecepatan.
- **Sesi 69: Penyusunan Puzzle Logika Asah Otak (Bebras Challenge Kids)**
  - *Latihan*: Memecahkan soal-soal komputasional berpikir kritis internasional standar SD awal.
- **Sesi 70: Pengembangan Game Puzzle Asah Otak Mandiri**
- **Sesi 71: Pengujian Kasus Ekstrem (Edge Cases & Debugging Lanjut)**
- **Sesi 72: CAPSTONE LEVEL 6: 'Smart Bee Kingdom' & Sertifikasi Logika Komputasi**
  - *Output*: Game simulasi kerajaan lebah dengan sistem kuis, inventory list, dan ekonomi koin.

---

## 📌 LEVEL 7: ROBOTIK CERDAS & SIMULASI DUNIA NYATA (SESI 73 – 84)
- **Sesi 73: Pengenalan Robot Otonom & Kendaraan Masa Depan**
  - *Konsep*: Bagaimana mobil tanpa sopir (*Self-Driving Car*) tahu kapan harus berhenti di lampu merah.
- **Sesi 74: Simulasi Robot Pengantar Makanan di Restoran (Line Follower Virtual)**
  - *Konsep*: Robot berbelok mengikuti jalur garis hitam di lantai menggunakan 2 sensor mata warna.
- **Sesi 75: Logika Palang Pintu Kereta Api Pintar Otomatis**
  - *Konsep*: Deteksi jarak ultrasonik virtual. Jika kereta mendekat < 50 langkah, palang pintu turun dan lampu merah berkedip.
- **Sesi 76: Lampu Taman Pintar Hemat Energi (Smart Home Lighting)**
  - *Konsep*: Sensor cahaya ambient. Jika suasana panggung gelap malam hari, lampu taman menyala otomatis.
- **Sesi 77: Robot Pembersih Debu Otomatis (Vacuum Robot Logic)**
  - *Konsep*: Menjelajah ruangan secara acak, memantul saat menabrak meja, dan kembali ke pangkalan saat baterai lemah.
- **Sesi 78: Simulator Sistem Lalu Lintas 4 Persimpangan Lampu Merah**
  - *Konsep*: Pengaturan waktu siklus: Merah 5 detik, Kuning 2 detik, Hijau 5 detik agar mobil tidak tabrakan.
- **Sesi 79: Robot Pengelompok Sampah Cerdas (Smart Recycling Sorter)**
  - *Konsep*: Klasifikasi objek: botol plastik masuk tong biru, sisa apel masuk tong cokelat.
- **Sesi 80: Rumah Kaca Pintar & Penyiram Tanaman Otomatis**
  - *Konsep*: Sensor kelembaban tanah: jika tanah kering, pompa air menyala selama 3 detik.
- **Sesi 81: Perancangan Miniatur Kota Pintar (Smart City Beeville)**
  - *Proyek*: Menggabungkan mobil otonom, lampu pintar, dan palang otomatis ke dalam 1 panggung besar.
- **Sesi 82: Uji Ketahanan Sistem Kota Pintar (Stress Test Sim)**
- **Sesi 83: Pembuatan Video Dokumentasi Karya Robotik Anak**
- **Sesi 84: CAPSTONE LEVEL 7: Pameran Kota Pintar 'Beeville Smart City'**
  - *Output*: Simulasi kota cerdas interaktif karya siswa. Sertifikat *Junior Robotics & IoT Pioneer*.

---

## 📌 LEVEL 8: PRE-CODE TRANSISI & PORTFOLIO GRAND FINALE (SESI 85 – 96)
- **Sesi 85: Jembatan Menuju Koding Teks (Dari Blok Warna ke Bahasa Teks)**
  - *Konsep*: Memperlihatkan bahwa blok Scratch sebenarnya adalah kalimat bahasa pemrograman sungguhan.
- **Sesi 86: Menulis Perintah Teks Pertama: Turtle Graphics (Python Visual)**
  - *Konsep*: Menulis sintaks sederhana: `forward(100)`, `right(90)` untuk menggambar rumah.
- **Sesi 87: Mengenal Struktur Variabel Teks: Nama dan Nilai Angka**
  - *Konsep*: Memahami penulisan variabel teks: `player_name = "Budi"` dan `score = 100`.
- **Sesi 88: Logika Kondisional Teks (If-Else Teks Ramah Anak)**
  - *Konsep*: Membaca kode percabangan: `if score > 50: print("Hebat!") else: print("Ayo coba lagi!")`.
- **Sesi 89: Perancangan Proyek Portofolio Mahakarya 2 Tahun (Grand Capstone)**
  - *Brainstorming*: Menentukan proyek pamungkas impian siswa menggabungkan seluruh keahlian 2 tahun.
- **Sesi 90: Produksi Grand Capstone Bagian 1: Desain Dunia & Mekanika Inti**
- **Sesi 91: Produksi Grand Capstone Bagian 2: Integrasi AI, Suara & Sistem Level**
- **Sesi 92: Produksi Grand Capstone Bagian 3: Polishing Visual, Partikel & Cerita**
- **Sesi 93: Uji Coba Kualitas (Playtesting) Bersama Seluruh Instruktur**
- **Sesi 94: Penyusunan Profil Portofolio Digital Siswa di Web Beekoding**
  - *Dokumentasi*: Membuat halaman web mini berisi foto anak, video demo game, dan sertifikat prestasi.
- **Sesi 95: Gladi Bersih Wisuda Kelulusan 2 Tahun & Pitching Practice**
- **Sesi 96: GRADUATION DAY & BEEKODING YOUTH EXPO (SESI 96)**
  - *Puncak Acara*: Wisuda Akbar 2 Tahun Kelulusan Tahap 1.
  - *Penganugerahan*: Sertifikat Resmi *Junior Explorer Master Graduate (96 Sesi)* & Tiket Emas Naik Kelas ke *Tahap 2: Intermediate Coder*.

---

## 🛠️ LEMBAR EVALUASI KELULUSAN & RUBRIK ASESMEN SISWA
| Aspek Kompetensi | Indikator Keberhasilan | Target Minimum Kelulusan |
| :--- | :--- | :---: |
| **Logika Sekuensial & Algoritma** | Mampu menyusun alur perintah berurutan tanpa langkah terbalik. | 85 / 100 |
| **Pemahaman Variabel & State** | Mampu membuat dan mengupdate skor, nyawa, dan timer permainan. | 80 / 100 |
| **Kemandirian Debugging** | Mampu menemukan blok yang salah saat karakter tidak bergerak sesuai rencana. | 75 / 100 |
| **Kreativitas & Desain Aset** | Mampu memodifikasi warna, kostum, suara, dan memilih latar bertema. | 85 / 100 |
| **Public Speaking & Presentasi** | Percaya diri menjelaskan karya sendiri di depan orang tua dan teman. | 80 / 100 |

*Dokumen panduan mengajar ini resmi diterbitkan oleh Tim Akademik Beekoding Academy untuk seluruh instruktur berlisensi.*
