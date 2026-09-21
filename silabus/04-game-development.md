# 🎮 Silabus Modul 04: Pembuatan Game & Media Interaktif
### *Game Design, Mekanika Fisika Permainan, Logika Event-Driven & Storytelling Interaktif*

- **Kode Modul**: `MOD-04-GAMEDEV`
- **Fokus Utama**: Game Loop, Mekanika Kontrol Pemain, Deteksi Tabrakan, Fisika (Gravitasi & Kecepatan), Desain Level, dan Pygame.
- **Korelasi 8 Pilar**: *Creativity*, *Spatial Thinking*, *Logical Thinking*, *Numerical Thinking*, dan *Persistence*.

---

## 🧭 Kerangka Progresi Belajar Lintas Jenjang

```
[ TAHAP 1: Junior Explorer (6-9 Thn) ]
Animasi Gerak Karakter ➔ Game Mengumpulkan Benda ➔ Sistem Kemenangan Ceria
                       ⬇
[ TAHAP 2: Intermediate Coder (10-12 Thn) ]
Game Platformer 2D ➔ Gravitasi & Lompatan ➔ Multi-Level, Musuh Patroli & Boss Battle
                       ⬇
[ TAHAP 3: Teens Innovator (13-17 Thn) ]
Python Pygame Architecture ➔ Frame Rate & Game Loop ➔ Deteksi Bounding Box & Particle System
```

---

## 🐣 TAHAP 1: JUNIOR EXPLORER (Usia 6 – 9 Tahun / TK B – SD Kelas 1-3)
*Pendekatan: Belajar melalui visual animasi lucu, perancangan game bertema petualangan lebah, tombol navigasi sederhana, dan hadiah visual instan.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Memahami peran pemain (*player*) vs objek target yang harus dikumpulkan (*collectible item*).
2. Mampu merancang kontrol gerakan karakter menggunakan tombol panah keyboard atau sentuhan layar.
3. Mengenal suara efek keberhasilan saat objek target disentuh dan efek perayaan saat menang.
4. Merasakan kebanggaan menciptakan permainan sendiri yang bisa dimainkan oleh orang tua dan teman.

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Karakter Utama & Panggung Pertama Kita**
  - Konsep: Menentukan tokoh utama (pahlawan lebah) dan memilih dunia panggung (hutan bunga ceria).
  - Aktivitas: Menambahkan karakter, mengatur ukuran proporsional, dan memberi nama karakter.
- **Pertemuan 2: Navigasi Gerak: Ayo Terbang ke Kanan dan Kiri!**
  - Konsep: Tombol keyboard panah kiri dan panah kanan memicu perubahan posisi karakter.
  - Aktivitas: Memprogram karakter agar bisa bergerak ke 4 arah mata angin dengan lancar.
- **Pertemuan 3: Hujan Madu: Objek yang Jatuh dari Langit**
  - Konsep: Objek yang bergerak turun dari atas layar ke bawah secara terus-menerus.
  - Aktivitas: Memprogram tetesan madu emas yang meluncur dari langit dengan posisi acak.
- **Pertemuan 4: Deteksi Sentuhan Ajaib (Collision Catch)**
  - Konsep: Ketika karakter lebah menyentuh madu, madu menghilang dan mengeluarkan bunyi "Ting!".
  - Aktivitas: Menghubungkan blok sensor sentuhan dengan efek bunyi dan kembalinya madu ke posisi atas layar.
- **Pertemuan 5: Papan Nilai Skor Bintang (Scoreboard Ceria)**
  - Konsep: Angka skor bertambah 1 setiap kali berhasil menangkap madu emas.
  - Aktivitas: Membuat angka skor besar di sudut layar dan merayakan jika skor mencapai 10 bintang.
- **Pertemuan 6: Pameran Game Mini: "Tangkap Madu Sebanyak-Banyaknya"**
  - Konsep: Sentuhan akhir: menambahkan latar musik riang dan layar penutup "Selamat, Kamu Menang!".
  - Aktivitas: Saling mencoba game teman dan mencatat berapa skor tertinggi yang bisa diraih.

---

## ⚡ TAHAP 2: INTERMEDIATE CODER (Usia 10 – 12 Tahun / SD Kelas 4-6)
*Pendekatan: Pembangunan game arcade & platformer 2D klasik, simulasi gaya gravitasi, rintangan dinamis, kecerdasan musuh dasar, dan sistem multi-level.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Memahami konsep simulasi fisika platformer: gaya gravitasi ke bawah, gaya dorong lompatan ke atas, dan gesekan lantai (*friction*).
2. Mampu membuat sistem scrolling latar belakang (*parallax scrolling*) atau sistem perpindahan layar antar babak (*level progression*).
3. Merancang logika kecerdasan musuh sederhana (*Enemy AI patrol: bolak-balik di atas platform*).
4. Menyusun arsitektur game lengkap: Layar Mulai (*Title Screen*) ➔ Gameplay ➔ Layar Menang/Kalah (*Game Over*).

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Fisika Platformer 2D: Gravitasi & Pijakan Tanah**
  - Konsep: Variabel `Kecepatan_Y`; setiap frame `Kecepatan_Y` dikurangi gravitasi sampai karakter menyentuh warna lantai.
  - Aktivitas: Memprogram karakter agar bisa melompat mulus di atas platform gantung tanpa tembus ke bawah.
- **Pertemuan 2: Desain Peta Level (Tilemap & Rintangan Berbahaya)**
  - Konsep: Menggambar platform rintangan, duri tajam, dan lubang jebakan yang harus dihindari pemain.
  - Aktivitas: Menambahkan rintangan paku; jika tersentuh, nyawa pemain berkurang dan karakter terlempar mundur sedikit (*knockback effect*).
- **Pertemuan 3: Musuh Patroli & Deteksi Sisi Platform**
  - Konsep: Karakter musuh yang berjalan konstan ke kanan dan berbalik arah saat mendekati ujung platform atau dinding.
  - Aktivitas: Memprogram laba-laba patroli dengan logika sensor tepi dan animasi langkah berjalan.
- **Pertemuan 4: Koin Emas Rahasia & Power-up Kecepatan**
  - Konsep: Item spesial yang memberikan efek sementara: *Super Jump* atau *Speed Boost* selama 5 detik.
  - Aktivitas: Membuat ramuan nektar ajaib dengan variabel penghitung durasi efek (*countdown timer*).
- **Pertemuan 5: Pertarungan Bos Akhir (Boss Battle AI)**
  - Konsep: Karakter bos raksasa dengan *Health Bar* (darah 100 poin) dan pola serangan bertahap (*Phase 1: menembak, Phase 2: melompat cepat*).
  - Aktivitas: Membangun mekanika pertarungan klimaks di mana pemain harus melemparkan sengatan lebah ke arah bos.
- **Pertemuan 6: Proyek Karya Game: "The Legend of Cyber Hive: Quest for Golden Code"**
  - Konsep: Mengintegrasikan 2 level berbeda, layar menu awal, musik latar dinamis, dan efek partikel perayaan kemenangan.
  - Aktivitas: Uji coba menyeluruh (*playtesting*), menyeimbangkan tingkat kesulitan (*game balancing*), dan demonstrasi karya.

---

## 🚀 TAHAP 3: TEENS INNOVATOR (Usia 13 – 17 Tahun / SMP – SMA)
*Pendekatan: Rekayasa game profesional dengan bahasa Python murni menggunakan pustaka Pygame, pemahaman siklus hidup game loop, arsitektur OOP (Object-Oriented Programming), dan sistem partikel visual.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Menguasai arsitektur inti Pygame: *Init ➔ Event Handling Loop ➔ State Update ➔ Drawing Canvas ➔ Clock Tick (FPS Control)*.
2. Menerapkan paradigma Pemrograman Berorientasi Objek (OOP) menggunakan kelas `pygame.sprite.Sprite` dan grup sprite.
3. Menerapkan deteksi tabrakan presisi (*AABB Bounding Box* dan *Circle Radius Collision*).
4. Mampu menyusun struktur proyek game modular: memisahkan berkas logika, aset gambar/suara, dan konstanta konfigurasi.

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Arsitektur Game Loop & Kanvas Grafis Pygame**
  - Konsep: Siklus hidup game: memproses antrean peristiwa sistem (`pygame.event.get()`), membersihkan layar dengan warna latar, dan menyegarkan tampilan dengan `pygame.display.flip()`.
  - Aktivitas: Membuka jendela game beresolusi 800x600 pada kecepatan stabil 60 Frame Per Second (FPS).
- **Pertemuan 2: Pemrograman Berorientasi Objek (OOP): Kelas Karakter Pemain**
  - Konsep: Mewarisi `pygame.sprite.Sprite`; atribut `self.image`, `self.rect`, dan metode `update()` untuk membaca input keyboard kontinu (`pygame.key.get_pressed()`).
  - Aktivitas: Membuat kelas `Player` dengan batas area gerak layar agar karakter tidak keluar dari monitor.
- **Pertemuan 3: Kelas Peluru & Sistem Tembak Menembak Dinamis**
  - Konsep: Memanfaatkan `pygame.sprite.Group()`; instansiasi objek peluru saat tombol spasi ditekan dan pembersihan otomatis objek yang keluar layar (`self.kill()`).
  - Aktivitas: Membangun mekanika tembakan sengatan laser lebah dengan interval jeda tembak (*cooldown rate*).
- **Pertemuan 4: Spawning Musuh & Algoritma Deteksi Tabrakan Cepat**
  - Konsep: `pygame.sprite.groupcollide()` dan `pygame.sprite.spritecollide()`; timer spawn musuh menggunakan kustom event `pygame.time.set_timer()`.
  - Aktivitas: Memunculkan gelombang kapal serangga musuh dengan kecepatan acak dan mendeteksi kehancuran musuh saat terkena peluru.
- **Pertemuan 5: Sistem Partikel Ledakan (Particle Explosion System) & Audio Mixer**
  - Konsep: Fisika partikel sederhana: posisi, vektor kecepatan acak, perubahan warna pudar (*fade out*), dan penurunan ukuran seiring waktu. Memuat efek suara WAV dengan `pygame.mixer.Sound`.
  - Aktivitas: Menambahkan efek percikan kembang api spektakuler setiap kali musuh meledak disertai efek suara ledakan.
- **Pertemuan 6: Proyek Inovasi Teens: 2D Space Arcade Shooter "Hive Defender"**
  - Konsep: Menambahkan teks skor render TrueType Font (`pygame.font.Font`), sistem nyawa pemain 3 hati, tingkat kesulitan yang meningkat otomatis setiap menit, dan layar skor tertinggi (*High Score*).
  - Aktivitas: Menyelesaikan game arcade retro mandiri dengan kode bersih, terdokumentasi, dan dapat dimainkan di komputer manapun.

---

## 📝 Rubrik Asesmen Modul 04

| Kriteria / Level | Perlu Bimbingan (0 - 60) | Cakap (61 - 80) | Mahir / Unggul (81 - 100) |
| :--- | :--- | :--- | :--- |
| **Mekanika & Kelancaran Kontrol** | Karakter sering macet, tembus dinding, atau kontrol terasa sangat kaku dan tidak responsif. | Kontrol pemain berjalan mulus, deteksi tabrakan dasar bekerja baik pada kondisi wajar. | Kontrol sangat presisi dan nyaman (*satisfying game feel*), gravitasi dan tabrakan terhitung akurat. |
| **Arsitektur Kode Game** | Seluruh kode menumpuk di satu tempat tanpa fungsi, variabel tidak terstruktur rapi. | Mampu membagi alur game loop, menggunakan sprite dasar dan variabel skor dengan benar. | Menerapkan OOP murni (Class Sprite), modular, efisien mengelola memori, 60 FPS stabil. |
| **Desain Pengalaman Bermain (Game Design)** | Permainan terlalu mudah/mustahil dimainkan, tidak ada instruksi atau tujuan akhir yang jelas. | Permainan memiliki tujuan yang jelas, aturan kemenangan dan kekalahan berfungsi dengan baik. | Memiliki kurva tantangan berjenjang (*progression curve*), umpan balik audio-visual memuaskan, desain level matang. |

---

*Hak Cipta © 2026 Beekoding. Silabus Modul 04 — Pembuatan Game & Media Interaktif.*
