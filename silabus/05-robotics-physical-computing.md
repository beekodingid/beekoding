# 🤖 Silabus Modul 05: Robotika, Sensor & Physical Computing
### *Perakitan Robotika Fisik, Mikrokontroler, Logika Sensorik & Dasar Internet of Things (IoT)*

- **Kode Modul**: `MOD-05-ROBOTICS`
- **Fokus Utama**: Sirkuit Listrik Aman, Input/Output Hardware, Sensor Ultrasonik/Cahaya, Penggerak Motorik, dan Otomasi Cerdas IoT.
- **Korelasi 8 Pilar**: *Spatial Thinking*, *Problem Solving*, *Logical Thinking*, *Numerical Thinking*, dan *Persistence*.

---

## 🧭 Kerangka Progresi Belajar Lintas Jenjang

```
[ TAHAP 1: Junior Explorer (6-9 Thn) ]
Kit Balok Robotika Magnetik/Lego ➔ Motor Bergerak ➔ Sensor Sentuh & Jalur Lampu LED
                       ⬇
[ TAHAP 2: Intermediate Coder (10-12 Thn) ]
BBC Micro:bit / Arduino Blok ➔ Sensor Ultrasonik Jarak ➔ Robot Otonom Penghindar Halangan
                       ⬇
[ TAHAP 3: Teens Innovator (13-17 Thn) ]
ESP32 / Raspberry Pi Pico (MicroPython) ➔ Protokol Komunikasi IoT (MQTT / Web Server) ➔ Smart Home
```

---

## 🐣 TAHAP 1: JUNIOR EXPLORER (Usia 6 – 9 Tahun / TK B – SD Kelas 1-3)
*Pendekatan: Aktivitas fisik motorik halus, modul balok elektronik magnetik/plug-and-play ramah anak, memahami aliran daya listrik secara aman, dan kreasi robot mainan.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Memahami konsep sederhana energi listrik: ada sumber daya baterai, sakelar (*switch*), dan keluaran (lampu menyala atau roda berputar).
2. Mampu merakit modul motorik dan roda sederhana untuk membuat mobil robot lebah bergerak maju.
3. Mengenal sensor sebagai "indra robot" (indra peraba/tombol dan indra penglihatan/cahaya).
4. Menghargai keamanan saat menggunakan perangkat elektronik fisik dan merapikan komponen kembali setelah belajar.

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Sirkuit Ajaib: Menyalakan Cahaya Pertama**
  - Konsep: Aliran listrik seperti air yang mengalir dari kutub positif ke negatif; bahaya menyentuh kabel terbuka vs sirkuit ramah anak.
  - Aktivitas: Menghubungkan modul baterai ke modul lampu LED warna-warni dan mengendalikannya dengan sakelar tombol.
- **Pertemuan 2: Roda Berputar: Menggerakkan Sahabat Robot**
  - Konsep: Motor DC mengubah energi listrik menjadi energi putaran gerak.
  - Aktivitas: Memasang roda pada modul motor dan membuat mobil lebah yang bisa melaju lurus di lantai kelas.
- **Pertemuan 3: Sensor Sentuh: Bumper Anti-Tabrak**
  - Konsep: Sensor sentuh (*bumper limit switch*): memberi tahu robot saat menabrak dinding agar segera berhenti.
  - Aktivitas: Merakit bumper depan mobil lebah; jika bumper tertekan dinding, roda robot otomatis berhenti berputar.
- **Pertemuan 4: Sensor Cahaya: Robot Lebah Pencari Bunga Matahari**
  - Konsep: Sensor cahaya (*Photocell/LDR*); robot merespons terang dan gelap.
  - Aktivitas: Membuat robot yang hanya berjalan jika lampu senter diarahkan ke matanya, dan tertidur saat lampu dimatikan.
- **Pertemuan 5: Seni Menghias Bodi Robot: Lebah Penjaga Hutan**
  - Konsep: Desain struktural; menyeimbangkan berat robot agar tidak mudah terguling saat berbelok.
  - Aktivitas: Mengkombinasikan bahan kerajinan daur ulang (kardus, mata boneka, sayap mika) untuk membentuk cangkang tubuh robot lebah yang lucu.
- **Pertemuan 6: Parade Robot Cilik: Jalur Pawai Bersama**
  - Konsep: Demonstrasi kerja sama; menyalakan robot secara bersamaan dalam lintasan arena parade kelas.
  - Aktivitas: Setiap anak mendemokan robot buatannya dan menjelaskan fungsi tombol rahasia di robotnya.

---

## ⚡ TAHAP 2: INTERMEDIATE CODER (Usia 10 – 12 Tahun / SD Kelas 4-6)
*Pendekatan: Pemrograman mikrokontroler berbasis blok visual (MakeCode BBC Micro:bit / Arduino Blok), pin GPIO (General Purpose Input/Output), sensor jarak ultrasonik, dan servo motor.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Memahami arsitektur mikrokontroler: Prosesor, memori, pin digital/analog, sensor terpasang (*built-in accelerometer/compass*), dan matriks LED 5x5.
2. Mampu membaca data sensor lingkungan fisik (suhu ruangan, tingkat kecerahan cahaya, dan jarak dalam centimeter).
3. Mampu mengendalikan aktuator: Motor Servo (sudut 0° sampai 180°) dan Motor DC penggerak roda melalui logika blok bersyarat.
4. Mampu merakit dan memprogram robot otonom penghindar rintangan (*Obstacle Avoidance Robot*).

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Eksplorasi Mikrokontroler BBC Micro:bit**
  - Konsep: Komputer saku berprosesor; matriks 25 lampu LED, 2 tombol fisik (A & B), dan sensor gerak (*Accelerometer Shake*).
  - Aktivitas: Membuat jam saku mini dengan animasi senyum dan dadu angka digital acak saat diguncang.
- **Pertemuan 2: Pin GPIO & Membaca Sensor Lingkungan Nyata**
  - Konsep: Perbedaan sinyal digital (0 atau 1 / Nyala atau Mati) vs sinyal analog (rentang nilai 0 - 1023).
  - Aktivitas: Membuat sistem alarm kelembaban tanah untuk tanaman hias di kelas menggunakan probe pin analog.
- **Pertemuan 3: Sensor Ultrasonik: Mata Kelelawar Robot**
  - Konsep: Prinsip kerja pantulan gelombang suara ultrasonik (Trigger & Echo); rumus kecepatan suara untuk menghitung jarak: `Jarak = (Waktu Pantul x 0.034) / 2`.
  - Aktivitas: Membuat alat pengukur tinggi badan digital dengan tampilan angka sentimeter di layar Micro:bit.
- **Pertemuan 4: Mengendalikan Motor Servo: Palang Pintu Otomatis**
  - Konsep: Motor Servo presisi yang bergerak sesuai derajat sudut (0° = tertutup, 90° = terbuka).
  - Aktivitas: Membangun maket palang pintu parkir pintar: palang terbuka otomatis jika ada mobil mendekat dalam jarak 10 cm.
- **Pertemuan 5: Perakitan Sasis Robot Beroda (Chassis Robot Kit)**
  - Konsep: Driver motor (H-Bridge L298N / Motor Shield); memprogram logika belok kanan (roda kiri berputar, roda kanan diam).
  - Aktivitas: Merakit sasis dua roda + roda ketiga (caster), memasang baterai dan papan mikrokontroler.
- **Pertemuan 6: Proyek Aksi: Autonomous Obstacle-Avoiding Cyber Bee Robot**
  - Konsep: Integrasi algoritma kendali otonom: *Maju terus; JIKA jarak ke dinding < 15 cm MAKA mundur sedikit ➔ belok kanan ➔ lanjutkan maju*.
  - Aktivitas: Uji coba robot menavigasi labirin kardus tanpa menyentuh dinding sama sekali hingga garis finish.

---

## 🚀 TAHAP 3: TEENS INNOVATOR (Usia 13 – 17 Tahun / SMP – SMA)
*Pendekatan: Pemrograman mikrokontroler tingkat lanjut dengan MicroPython / C++ Arduino pada chip ESP32 (Wi-Fi & Bluetooth), konektivitas IoT (Internet of Things), dashboard cloud, dan otomasi cerdas.*

### Capaian Pembelajaran (*Learning Objectives*):
1. Menguasai arsitektur mikrokontroler berfitur nirkabel ESP32 dan lingkungan pengembangan MicroPython / Thonny IDE.
2. Mampu menghubungkan perangkat keras ke jaringan internet Wi-Fi lokal dan mengambil data waktu dunia nyata via NTP (*Network Time Protocol*).
3. Mampu membangun web server lokal tersemat (*embedded web server*) untuk mengontrol perangkat elektronik melalui peramban ponsel pintar.
4. Menerapkan protokol komunikasi data IoT ringan (MQTT atau HTTP REST API) untuk mengirimkan metrik sensor ke dashboard Cloud (Blynk / Adafruit IO).

### Peta Pertemuan & Materi Pembelajaran:
- **Pertemuan 1: Setup ESP32 & Pemrograman Hardware dengan MicroPython**
  - Konsep: Flashing firmware MicroPython ke modul ESP32; modul `machine.Pin`, `time.sleep()`, dan siklus kerja sinyal PWM (*Pulse Width Modulation*).
  - Aktivitas: Menghubungkan ESP32 ke komputer dan membuat efek lampu LED bernapas (*Breathing Fading LED*) dengan kontrol frekuensi PWM.
- **Pertemuan 2: Sensor Lingkungan DHT11/DHT22 & Layar OLED I2C**
  - Konsep: Protokol komunikasi serial dua kabel I2C (SDA & SCL); membaca suhu (°C) dan persentase kelembaban udara (%RH).
  - Aktivitas: Menampilkan grafik data cuaca mini secara estetik di layar OLED mini 0.96 inci.
- **Pertemuan 3: Menghubungkan Hardware ke Jaringan Wi-Fi & NTP Clock**
  - Konsep: Pustaka `network.WLAN`; mode Station (STA) vs Access Point (AP); sinkronisasi waktu atom dunia nyata.
  - Aktivitas: Membangun jam dinding digital futuristik yang otomatis menyetel waktu sendiri melalui koneksi Wi-Fi rumah.
- **Pertemuan 4: Embedded Web Server: Kontrol Elektronik dari Ponsel Pintar**
  - Konsep: Protokol HTTP dasar; menangani request `GET /lampu/on` dan `GET /lampu/off` dengan socket Python murni.
  - Aktivitas: Mengakses alamat IP ESP32 dari browser smartphone untuk menyalakan/mematikan lampu dan kipas miniatur di maket rumah.
- **Pertemuan 5: Protokol IoT & Dashboard Cloud Monitoring (Blynk / MQTT)**
  - Konsep: Arsitektur *Publish-Subscribe* (Broker, Publisher, Subscriber); efisiensi daya dan bandwidth pada jaringan IoT modern.
  - Aktivitas: Mengirimkan data suhu kamar ke aplikasi smartphone Blynk secara *real-time* lengkap dengan notifikasi peringatan jika suhu terlalu panas.
- **Pertemuan 6: Proyek Inovasi Teens: Smart Automated Mini Greenhouse (Rumah Kaca Cerdas)**
  - Konsep: Integrasi sensor tanah, sensor suhu udara, pompa air mini dengan modul relay 5V, dan kendali jarak jauh via Cloud.
  - Aktivitas: Membangun sistem penyiraman tanaman otomatis yang menyiram tanah jika kelembaban di bawah 30% dan mencatat riwayat kesehatan tanaman ke Cloud.

---

## 📝 Rubrik Asesmen Modul 05

| Kriteria / Level | Perlu Bimbingan (0 - 60) | Cakap (61 - 80) | Mahir / Unggul (81 - 100) |
| :--- | :--- | :--- | :--- |
| **Kerapian & Keamanan Sirkuit Fisik** | Kabel berantakan, sambungan longgar/sering lepas, tidak memperhatikan polaritas kutub (+/-). | Rangkaian sirkuit tersambung dengan aman dan benar, peletakan kabel cukup tertata. | Rangkaian sangat rapi, pemanfaatan pin GPIO terencana efisien, tata letak breadboard kokoh dan profesional. |
| **Keandalan Logika Kode Kontrol** | Robot tidak merespons sensor dengan konsisten, pembacaan data sensor sering macet/stuck. | Logika sensor dan motor bekerja sesuai skenario utama pada kecepatan normal. | Algoritma kendali sangat stabil, menangani noise sensor dengan *filtering*, navigasi mulus dan responsif. |
| **Pemecahan Masalah Perangkat Keras (Troubleshooting)** | Pasif saat alat tidak berfungsi; kesulitan membedakan antara kerusakan kabel fisik vs bug sintaksis kode. | Mampu melacak titik masalah secara berurutan: cek kabel baterai ➔ cek pin ➔ cek kode. | Memiliki intuisi teknis yang tajam: mampu menggunakan serial monitor debug untuk mendiagnosis kendala secara mandiri. |

---

*Hak Cipta © 2026 Beekoding. Silabus Modul 05 — Robotika, Sensor & Physical Computing.*
