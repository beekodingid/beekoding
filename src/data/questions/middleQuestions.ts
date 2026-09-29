// Middle Coder Questions (Usia 10 - 12 Tahun)
// 8 Kategori x 15 Soal = 120 Soal di Pool Bank Soal
import type { TalentQuestion } from '../talentQuestions';

export const MIDDLE_QUESTIONS: TalentQuestion[] = [
  {
    "id": "mid-log-1",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 1,
    "prompt": "Kondisi: JIKA tombol A ditekan, Lampu 1 menyala. JIKA tombol B ditekan, Lampu 2 menyala. JIKA kedua tombol ditekan bersamaan, sirene berbunyi dan kedua lampu MATI. Jika sekarang Lampu 1 menyala dan Lampu 2 mati, tombol apa yang ditekan?",
    "visualHint": "🔘 A ➜ 💡1 | 🔘 B ➜ 💡2 | A+B ➜ 🚨",
    "options": [
      {
        "id": "A",
        "text": "Hanya Tombol A yang ditekan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya Tombol B yang ditekan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kedua tombol ditekan bersamaan",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada tombol yang ditekan",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-log-2",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 2,
    "prompt": "Tiga pelari: Dito lebih cepat dari Reza. Bayu lebih lambat dari Reza. Siapakah yang menjadi pelari paling cepat di antara ketiganya?",
    "visualHint": "🏃 Dito > Reza | Reza > Bayu",
    "options": [
      {
        "id": "A",
        "text": "Dito",
        "score": 20
      },
      {
        "id": "B",
        "text": "Reza",
        "score": 5
      },
      {
        "id": "C",
        "text": "Bayu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Ketiganya sama cepat",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-log-3",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 3,
    "prompt": "Pernyataan 1: Semua robot di lab Beekoding ditenagai baterai surya. Pernyataan 2: Robo-X adalah robot di lab Beekoding. Kesimpulan yang PASTI BENAR adalah...?",
    "visualHint": "🤖 Semua Robot ➔ ☀️ Baterai Surya | Robo-X ➔ Robot Lab",
    "options": [
      {
        "id": "A",
        "text": "Robo-X ditenagai baterai surya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Robo-X tidak membutuhkan energi surya",
        "score": 0
      },
      {
        "id": "C",
        "text": "Robo-X bisa terbang",
        "score": 0
      },
      {
        "id": "D",
        "text": "Semua benda surya adalah Robo-X",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-log-4",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 4,
    "prompt": "Logika Gerbang AND: Output bernilai BENAR hanya jika Sakelar 1 DAN Sakelar 2 ON. Jika Sakelar 1 ON dan Sakelar 2 OFF, apa nilai Output?",
    "visualHint": "⚡ Sakelar 1 (ON) AND Sakelar 2 (OFF) = ❓",
    "options": [
      {
        "id": "A",
        "text": "SALAH (OFF / 0)",
        "score": 20
      },
      {
        "id": "B",
        "text": "BENAR (ON / 1)",
        "score": 0
      },
      {
        "id": "C",
        "text": "Setengah Nyala",
        "score": 5
      },
      {
        "id": "D",
        "text": "Terbakar",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-log-5",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 5,
    "prompt": "Ada 3 kotak misterius: Merah, Hijau, Biru. Hanya satu kotak yang berisi hadiah. Kotak Merah bertuliskan: \"Hadiah ada di kotak ini\". Kotak Hijau bertuliskan: \"Hadiah tidak ada di kotak Merah\". Jika hanya satu tulisan yang JUJUR, di kotak manakah hadiah berada?",
    "visualHint": "📦🔴 \"Hadiah di sini\" | 📦🟢 \"Bukan di merah\" (Hanya 1 benar)",
    "options": [
      {
        "id": "A",
        "text": "Kotak Biru (karena jika Merah atau Hijau benar, akan timbul kontradiksi)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kotak Merah",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kotak Hijau",
        "score": 10
      },
      {
        "id": "D",
        "text": "Tidak ada hadiah sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-log-6",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 6,
    "prompt": "Sebuah program game memiliki kondisi: IF (score >= 100 AND lives > 0) THEN show \"Victory Banner\". Jika score = 120 dan lives = 0, apakah pesan \"Victory Banner\" akan muncul?",
    "visualHint": "🎮 IF (score >= 100 AND lives > 0)",
    "options": [
      {
        "id": "A",
        "text": "Tidak muncul, karena operator AND mengharuskan KEDUA syarat terpenuhi (lives harus > 0)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Muncul, karena score sudah melebihi 100",
        "score": 5
      },
      {
        "id": "C",
        "text": "Game akan otomatis me-restart sendiri",
        "score": 5
      },
      {
        "id": "D",
        "text": "Muncul tapi warnanya hitam putih",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-7",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 7,
    "prompt": "Dalam sebuah perlombaan robotik: Robot Cepat finish sebelum Robot Cerdas. Robot Kuat finish setelah Robot Cerdas namun sebelum Robot Lincah. Robot manakah yang meraih Juara 1?",
    "visualHint": "🏁 Cepat ➡️ Cerdas ➡️ Kuat ➡️ Lincah",
    "options": [
      {
        "id": "A",
        "text": "Robot Cepat",
        "score": 20
      },
      {
        "id": "B",
        "text": "Robot Cerdas",
        "score": 5
      },
      {
        "id": "C",
        "text": "Robot Kuat",
        "score": 0
      },
      {
        "id": "D",
        "text": "Robot Lincah",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-8",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 8,
    "prompt": "Di dunia logika pemrograman: \"NOT (True OR False)\". Berapakah hasil akhir dari ekspresi logika tersebut?",
    "visualHint": "⚡ NOT (True OR False) = ?",
    "options": [
      {
        "id": "A",
        "text": "False (karena True OR False bernilai True, lalu dibalik oleh NOT menjadi False)",
        "score": 20
      },
      {
        "id": "B",
        "text": "True",
        "score": 5
      },
      {
        "id": "C",
        "text": "Error",
        "score": 5
      },
      {
        "id": "D",
        "text": "Null / Kosong",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-9",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 9,
    "prompt": "Algoritma lampu kamar tidur pintar: \"Nyalakan lampu HANYA JIKA ruangan gelap DAN ada orang di dalam kamar.\" Ruangan saat ini gelap gulita, namun kamar sedang kosong. Apakah lampu menyala?",
    "visualHint": "💡 Sensor: Gelap (TRUE) & Ada Orang (FALSE)",
    "options": [
      {
        "id": "A",
        "text": "Lampu tetap mati karena tidak ada orang di dalam kamar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lampu menyala karena ruangan sudah gelap",
        "score": 5
      },
      {
        "id": "C",
        "text": "Lampu berkedip-kedip cepat",
        "score": 5
      },
      {
        "id": "D",
        "text": "Lampu mati selama 5 detik lalu menyala",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-10",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 10,
    "prompt": "Perhatikan silogisme berikut: \"Semua peserta kelas Beekoding belajar berpikir komputasi. Farhan adalah peserta kelas Beekoding.\" Kesimpulan yang paling sahih adalah:",
    "visualHint": "🧠 Premis Mayor & Premis Minor",
    "options": [
      {
        "id": "A",
        "text": "Farhan belajar berpikir komputasi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Farhan sudah menjadi hacker profesional",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya Farhan yang bisa coding di kelas",
        "score": 5
      },
      {
        "id": "D",
        "text": "Farhan tidak suka komputer",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-11",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 11,
    "prompt": "Variabel x bernilai 5. Program menjalankan baris kode: x = x + 3, kemudian x = x * 2. Berapakah nilai akhir variabel x?",
    "visualHint": "x = 5 ➡️ x = 5 + 3 (8) ➡️ x = 8 * 2 = ?",
    "options": [
      {
        "id": "A",
        "text": "16",
        "score": 20
      },
      {
        "id": "B",
        "text": "13",
        "score": 5
      },
      {
        "id": "C",
        "text": "11",
        "score": 5
      },
      {
        "id": "D",
        "text": "10",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-12",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 12,
    "prompt": "Tiga sakelar (A, B, C) mengontrol pintu gerbang otomatis. Gerbang HANYA akan terbuka jika sakelar A dinyalakan BERSAMA dengan salah satu dari sakelar B atau C. Kombinasi mana yang berhasil membuka gerbang?",
    "visualHint": "🚪 Syarat: A ON AND (B ON OR C ON)",
    "options": [
      {
        "id": "A",
        "text": "Sakelar A dan C menyala, sedangkan B mati",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya sakelar B dan C yang menyala tanpa sakelar A",
        "score": 5
      },
      {
        "id": "C",
        "text": "Hanya sakelar A saja yang menyala sendirian",
        "score": 5
      },
      {
        "id": "D",
        "text": "Semua sakelar mati",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-13",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 13,
    "prompt": "Sebuah program perulangan (loop) berjalan dari i = 1 sampai i = 4. Pada setiap putaran, program mencetak kata \"Beekoding\". Berapa kali kata \"Beekoding\" tercetak?",
    "visualHint": "🔄 FOR i = 1 TO 4 DO print(\"Beekoding\")",
    "options": [
      {
        "id": "A",
        "text": "4 kali",
        "score": 20
      },
      {
        "id": "B",
        "text": "3 kali",
        "score": 5
      },
      {
        "id": "C",
        "text": "5 kali",
        "score": 5
      },
      {
        "id": "D",
        "text": "1 kali",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-14",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 14,
    "prompt": "Budi, Citra, dan Dani memakai baju warna Merah, Kuning, dan Hijau. Budi tidak suka warna Hijau. Citra memakai baju Kuning. Baju warna apakah yang dipakai Budi?",
    "visualHint": "👕 Budi, Citra, Dani | Merah, Kuning, Hijau",
    "options": [
      {
        "id": "A",
        "text": "Budi memakai baju Merah (karena Kuning dipakai Citra dan Budi tidak memakai Hijau)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Budi memakai baju Hijau",
        "score": 0
      },
      {
        "id": "C",
        "text": "Budi memakai baju Kuning",
        "score": 5
      },
      {
        "id": "D",
        "text": "Budi tidak memakai baju",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-log-15",
    "tier": "middle",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 15,
    "prompt": "Di sebuah game simulasi roket, bahan bakar cukup untuk menempuh jarak 500 km. Jarak planet tujuan adalah 650 km, namun di jarak 400 km terdapat stasiun pengisian bahan bakar. Apakah roket dapat mencapai planet tujuan?",
    "visualHint": "🚀 Jarak: 650 km | Kapasitas: 500 km | Stasiun: di km 400",
    "options": [
      {
        "id": "A",
        "text": "Bisa, jika roket mampir mengisi ulang bahan bakar di stasiun km 400",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tidak bisa, karena bahan bakar awal kurang dari 650 km",
        "score": 5
      },
      {
        "id": "C",
        "text": "Bisa tanpa perlu mampir ke stasiun",
        "score": 0
      },
      {
        "id": "D",
        "text": "Roket akan meledak di km 500",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-num-1",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 1,
    "prompt": "Teka-teki Simbol:\n🤖 + 🤖 = 10\n🤖 + 🍯 = 8\nBerapakah nilai dari 🍯 x 2?",
    "visualHint": "🤖 + 🤖 = 10 ➔ 🤖=5 | 5 + 🍯 = 8 ➔ 🍯=3",
    "options": [
      {
        "id": "A",
        "text": "6 (karena 🍯 bernilai 3)",
        "score": 20
      },
      {
        "id": "B",
        "text": "8",
        "score": 5
      },
      {
        "id": "C",
        "text": "5",
        "score": 0
      },
      {
        "id": "D",
        "text": "10",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-num-2",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 2,
    "prompt": "Sebuah program mengalikan angka input dengan 3, lalu menambahkannya dengan 4. Jika angka output yang keluar adalah 19, berapa angka input yang dimasukkan?",
    "visualHint": "(Input x 3) + 4 = 19",
    "options": [
      {
        "id": "A",
        "text": "5 (karena 5 x 3 = 15, lalu 15 + 4 = 19)",
        "score": 20
      },
      {
        "id": "B",
        "text": "4",
        "score": 5
      },
      {
        "id": "C",
        "text": "6",
        "score": 5
      },
      {
        "id": "D",
        "text": "7",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-num-3",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 3,
    "prompt": "Kapasitas file game adalah 200 MB. Kecepatan download adalah 20 MB setiap 1 detik. Berapa detik waktu yang dibutuhkan hingga game selesai di-download?",
    "visualHint": "📁 200 MB / 20 MB per detik",
    "options": [
      {
        "id": "A",
        "text": "10 detik",
        "score": 20
      },
      {
        "id": "B",
        "text": "20 detik",
        "score": 5
      },
      {
        "id": "C",
        "text": "5 detik",
        "score": 0
      },
      {
        "id": "D",
        "text": "100 detik",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-num-4",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 4,
    "prompt": "Pola kelipatan biner: 1, 2, 4, 8, 16, ... Berapakah angka berikutnya dalam deret ini?",
    "visualHint": "1 ➔ 2 ➔ 4 ➔ 8 ➔ 16 ➔ ❓",
    "options": [
      {
        "id": "A",
        "text": "32 (setiap angka dikali 2)",
        "score": 20
      },
      {
        "id": "B",
        "text": "24",
        "score": 5
      },
      {
        "id": "C",
        "text": "30",
        "score": 5
      },
      {
        "id": "D",
        "text": "64",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-num-5",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 5,
    "prompt": "Di sebuah toko coding, harga 3 sensor adalah Rp 45.000. Berapakah harga 5 sensor yang sama?",
    "visualHint": "3 sensor = Rp 45.000 ➔ 1 sensor = Rp 15.000",
    "options": [
      {
        "id": "A",
        "text": "Rp 75.000",
        "score": 20
      },
      {
        "id": "B",
        "text": "Rp 65.000",
        "score": 5
      },
      {
        "id": "C",
        "text": "Rp 90.000",
        "score": 5
      },
      {
        "id": "D",
        "text": "Rp 60.000",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-6",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 6,
    "prompt": "Sebuah karakter game mengumpulkan 15 koin di Level 1, 25 koin di Level 2, dan 35 koin di Level 3. Jika tren pertambahan koin tetap konstan, berapa koin yang didapat di Level 5?",
    "visualHint": "15, 25, 35, ... (+10 tiap level)",
    "options": [
      {
        "id": "A",
        "text": "55 koin (Level 4: 45 koin, Level 5: 55 koin)",
        "score": 20
      },
      {
        "id": "B",
        "text": "45 koin",
        "score": 5
      },
      {
        "id": "C",
        "text": "50 koin",
        "score": 5
      },
      {
        "id": "D",
        "text": "65 koin",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-7",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 7,
    "prompt": "Sebuah file proyek Scratch berukuran 24 Megabyte (MB). Kecepatan download internet adalah 4 MB per detik. Berapa detik waktu yang dibutuhkan untuk menyelesaikan download?",
    "visualHint": "24 MB / 4 MB/detik = ?",
    "options": [
      {
        "id": "A",
        "text": "6 detik",
        "score": 20
      },
      {
        "id": "B",
        "text": "8 detik",
        "score": 5
      },
      {
        "id": "C",
        "text": "20 detik",
        "score": 0
      },
      {
        "id": "D",
        "text": "96 detik",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-8",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 8,
    "prompt": "Di toko item game, ada diskon 20% untuk Pedang Petir seharga 500 koin emas. Berapakah harga Pedang Petir setelah mendapatkan diskon?",
    "visualHint": "500 - (20% x 500) = ?",
    "options": [
      {
        "id": "A",
        "text": "400 koin emas (diskon 100 koin)",
        "score": 20
      },
      {
        "id": "B",
        "text": "450 koin emas",
        "score": 5
      },
      {
        "id": "C",
        "text": "480 koin emas",
        "score": 5
      },
      {
        "id": "D",
        "text": "300 koin emas",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-9",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 9,
    "prompt": "Jika sebuah drone terbang dengan kecepatan tetap 12 meter per detik, berapakah jarak yang ditempuh drone tersebut dalam waktu setengah menit (30 detik)?",
    "visualHint": "12 meter/detik x 30 detik = ?",
    "options": [
      {
        "id": "A",
        "text": "360 meter",
        "score": 20
      },
      {
        "id": "B",
        "text": "300 meter",
        "score": 5
      },
      {
        "id": "C",
        "text": "240 meter",
        "score": 5
      },
      {
        "id": "D",
        "text": "42 meter",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-10",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 10,
    "prompt": "Berapakah hasil dari operasi aritmatika hierarkis (order of operations): 10 + 5 x 4 - 6?",
    "visualHint": "10 + (5 x 4) - 6 = ?",
    "options": [
      {
        "id": "A",
        "text": "24 (karena perkalian 5 x 4 = 20 dihitung terlebih dahulu)",
        "score": 20
      },
      {
        "id": "B",
        "text": "54",
        "score": 5
      },
      {
        "id": "C",
        "text": "28",
        "score": 5
      },
      {
        "id": "D",
        "text": "19",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-11",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 11,
    "prompt": "Sebuah server komputer memproses 120 data transaksi per menit. Berapa transaksi yang berhasil diproses oleh server tersebut dalam waktu 1 jam?",
    "visualHint": "120 transaksi x 60 menit = ?",
    "options": [
      {
        "id": "A",
        "text": "7.200 transaksi",
        "score": 20
      },
      {
        "id": "B",
        "text": "1.200 transaksi",
        "score": 5
      },
      {
        "id": "C",
        "text": "6.000 transaksi",
        "score": 5
      },
      {
        "id": "D",
        "text": "720 transaksi",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-12",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 12,
    "prompt": "Di sebuah turnamen e-sports anak, Tim Cyber mencatat rasio kemenangan 3 dari 4 pertandingan. Jika tim tersebut telah bertanding sebanyak 20 kali, berapa total kemenangan mereka?",
    "visualHint": "(3 / 4) x 20 = ?",
    "options": [
      {
        "id": "A",
        "text": "15 kemenangan",
        "score": 20
      },
      {
        "id": "B",
        "text": "12 kemenangan",
        "score": 5
      },
      {
        "id": "C",
        "text": "16 kemenangan",
        "score": 5
      },
      {
        "id": "D",
        "text": "18 kemenangan",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-13",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 13,
    "prompt": "Berapa angka biner dari bilangan desimal 13? (Ingat bobot biner: 8, 4, 2, 1)",
    "visualHint": "13 = 8 + 4 + 1 ➡️ [ ? ]",
    "options": [
      {
        "id": "A",
        "text": "1101 (8 + 4 + 0 + 1 = 13)",
        "score": 20
      },
      {
        "id": "B",
        "text": "1011 (8 + 0 + 2 + 1 = 11)",
        "score": 5
      },
      {
        "id": "C",
        "text": "1110",
        "score": 5
      },
      {
        "id": "D",
        "text": "1111",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-14",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 14,
    "prompt": "Kapasitas flashdisk adalah 16 Gigabyte (GB). Sudah terisi video animasi 6 GB dan game 4 GB. Berapa sisa kapasitas kosong yang masih bisa digunakan?",
    "visualHint": "16 - (6 + 4) = ?",
    "options": [
      {
        "id": "A",
        "text": "6 GB",
        "score": 20
      },
      {
        "id": "B",
        "text": "8 GB",
        "score": 5
      },
      {
        "id": "C",
        "text": "10 GB",
        "score": 5
      },
      {
        "id": "D",
        "text": "4 GB",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-num-15",
    "tier": "middle",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 15,
    "prompt": "Sebuah baterai robot terisi 80%. Setiap jam pemakaian aktif berkurang 15%. Berapa sisa baterai robot setelah dipakai berturut-turut selama 3 jam?",
    "visualHint": "80% - (3 x 15%) = ?",
    "options": [
      {
        "id": "A",
        "text": "35% (80% - 45% = 35%)",
        "score": 20
      },
      {
        "id": "B",
        "text": "45%",
        "score": 5
      },
      {
        "id": "C",
        "text": "25%",
        "score": 5
      },
      {
        "id": "D",
        "text": "50%",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-spa-1",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 1,
    "prompt": "Sebuah bentuk huruf \"L\" diputar 90 derajat searah jarum jam, kemudian dicerminkan secara horizontal (kiri-kanan). Bagaimana orientasi akhirnya?",
    "visualHint": "⌐ ➔ Putar 90° ➔ Cermin horizontal",
    "options": [
      {
        "id": "A",
        "text": "Garis horizontal di atas mengarah ke kiri, garis vertikal di sebelah kanan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kembali ke bentuk huruf \"L\" semula",
        "score": 5
      },
      {
        "id": "C",
        "text": "Berbentuk huruf \"T\"",
        "score": 0
      },
      {
        "id": "D",
        "text": "Terbalik sepenuhnya ke bawah",
        "score": 10
      }
    ]
  },
  {
    "id": "mid-spa-2",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 2,
    "prompt": "Sebuah kubus memiliki 6 sisi bernomor 1 sampai 6. Sisi yang berlawanan selalu berjumlah 7 (misal 1 berlawanan dengan 6). Sisi manakah yang berlawanan dengan sisi nomor 3?",
    "visualHint": "🎲 Jumlah sisi berlawanan = 7. Sisi = 3, Lawan = ❓",
    "options": [
      {
        "id": "A",
        "text": "Sisi nomor 4 (karena 3 + 4 = 7)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sisi nomor 5",
        "score": 5
      },
      {
        "id": "C",
        "text": "Sisi nomor 2",
        "score": 5
      },
      {
        "id": "D",
        "text": "Sisi nomor 1",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-spa-3",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 3,
    "prompt": "Tumpukan balok kubus berukuran 2x2x2 disusun rapi di atas meja. Berapa total kubus kecil yang ada di dalam tumpukan tersebut?",
    "visualHint": "🧊 2 balok panjang x 2 balok lebar x 2 balok tinggi",
    "options": [
      {
        "id": "A",
        "text": "8 balok kecil (2 x 2 x 2 = 8)",
        "score": 20,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23ecfdf5'/><g fill='%23059669' stroke='%23064e3b' stroke-width='2'><rect x='25' y='25' width='22' height='22' rx='3'/><rect x='51' y='25' width='22' height='22' rx='3'/><rect x='25' y='51' width='22' height='22' rx='3'/><rect x='51' y='51' width='22' height='22' rx='3'/></g><text x='50' y='88' font-size='11' text-anchor='middle' fill='%23065f46' font-weight='bold'>2x2x2 (8 Balok)</text></svg>"
      },
      {
        "id": "B",
        "text": "6 balok kecil",
        "score": 5,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f8fafc'/><g fill='%2394a3b8' stroke='%2364748b' stroke-width='2'><rect x='25' y='30' width='22' height='22' rx='3'/><rect x='51' y='30' width='22' height='22' rx='3'/><rect x='25' y='56' width='22' height='22' rx='3'/></g><text x='50' y='88' font-size='11' text-anchor='middle' fill='%23475569' font-weight='bold'>6 Balok</text></svg>"
      },
      {
        "id": "C",
        "text": "12 balok kecil",
        "score": 5,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f8fafc'/><g fill='%2394a3b8' stroke='%2364748b' stroke-width='2'><rect x='20' y='25' width='16' height='16' rx='2'/><rect x='40' y='25' width='16' height='16' rx='2'/><rect x='60' y='25' width='16' height='16' rx='2'/><rect x='20' y='45' width='16' height='16' rx='2'/><rect x='40' y='45' width='16' height='16' rx='2'/><rect x='60' y='45' width='16' height='16' rx='2'/></g><text x='50' y='88' font-size='11' text-anchor='middle' fill='%23475569' font-weight='bold'>12 Balok</text></svg>"
      },
      {
        "id": "D",
        "text": "4 balok kecil",
        "score": 0,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23fef2f2'/><g fill='%23f87171' stroke='%23dc2626' stroke-width='2'><rect x='28' y='35' width='20' height='20' rx='3'/><rect x='52' y='35' width='20' height='20' rx='3'/></g><text x='50' y='88' font-size='11' text-anchor='middle' fill='%23991b1b' font-weight='bold'>4 Balok</text></svg>"
      }
    ]
  },
  {
    "id": "mid-spa-4",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 4,
    "prompt": "Jika kamu melihat mobil pemadam kebakaran dari sudut tepat di atas atapnya (Top-Down View), bentuk apa yang dominan terlihat?",
    "visualHint": "🚒 ➜ Dilihat dari drone tepat di langit",
    "options": [
      {
        "id": "A",
        "text": "Persegi panjang merah dengan pola tangga dan lampu sirene di tengahnya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Roda bulat dan pintu samping mobil",
        "score": 0
      },
      {
        "id": "C",
        "text": "Segitiga lancip",
        "score": 0
      },
      {
        "id": "D",
        "text": "Kaca spion saja",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-spa-5",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 5,
    "prompt": "Kamera dalam game 3D bergerak: Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter. Lintasan apa yang terbentuk?",
    "visualHint": "📐 4 sisi sama panjang + 4 sudut 90°",
    "options": [
      {
        "id": "A",
        "text": "Bujursangkar / Persegi tertutup (kembali ke titik awal)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Garis lurus panjang 20 meter",
        "score": 0
      },
      {
        "id": "C",
        "text": "Bentuk Segitiga",
        "score": 0
      },
      {
        "id": "D",
        "text": "Bentuk Lingkaran",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-spa-6",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 6,
    "prompt": "Pada sistem koordinat layar game 2D, karakter berada di posisi (X: 10, Y: 20). Jika karakter bergerak 5 pixel ke KANAN dan 10 pixel ke BAWAH (di mana Y ke bawah bernilai negatif), di manakah posisinya sekarang?",
    "visualHint": "X: 10 + 5 = 15 | Y: 20 - 10 = ?",
    "options": [
      {
        "id": "A",
        "text": "(X: 15, Y: 10)",
        "score": 20
      },
      {
        "id": "B",
        "text": "(X: 5, Y: 30)",
        "score": 5
      },
      {
        "id": "C",
        "text": "(X: 15, Y: 30)",
        "score": 5
      },
      {
        "id": "D",
        "text": "(X: 5, Y: 10)",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-7",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 7,
    "prompt": "Sebuah kubus memiliki huruf A di sisi depan, B di sisi belakang, C di sisi atas, D di sisi bawah, E di sisi kiri, dan F di sisi kanan 🎲. Jika kubus diputar 90 derajat ke arah kanan, huruf apa yang sekarang berada di depan?",
    "visualHint": "🎲 Rotasi Kubus 3D",
    "options": [
      {
        "id": "A",
        "text": "Huruf E (sisi kiri berpindah ke depan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Huruf F (sisi kanan)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Huruf C (sisi atas)",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tetap huruf A",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-8",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 8,
    "prompt": "Berapa banyak kubus satuan kecil yang dibutuhkan untuk menyusun kubus besar pejal berukuran 3 x 3 x 3 balok? 🧊",
    "visualHint": "Panjang 3 x Lebar 3 x Tinggi 3 = ?",
    "options": [
      {
        "id": "A",
        "text": "27 kubus kecil (3 pangkat 3)",
        "score": 20
      },
      {
        "id": "B",
        "text": "9 kubus kecil",
        "score": 5
      },
      {
        "id": "C",
        "text": "18 kubus kecil",
        "score": 5
      },
      {
        "id": "D",
        "text": "36 kubus kecil",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-9",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 9,
    "prompt": "Jika sebuah gambar segitiga di-mirror (dicerminkan) secara horizontal lalu dicerminkan lagi secara vertikal, hasil akhirnya ekuivalen dengan:",
    "visualHint": "🪞 Flip Horizontal + Flip Vertikal = ?",
    "options": [
      {
        "id": "A",
        "text": "Rotasi gambar sebesar 180 derajat",
        "score": 20
      },
      {
        "id": "B",
        "text": "Rotasi 90 derajat searah jarum jam",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kembali ke gambar awal tanpa ada perubahan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menjadi lingkaran",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-10",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 10,
    "prompt": "Tampilan perspektif kamera game isometrik (2.5D) seperti Minecraft atau Roblox menggabungkan sudut pandang:",
    "visualHint": "🎮 Pandangan Isometrik 2.5D",
    "options": [
      {
        "id": "A",
        "text": "Sudut atas-serong 30 derajat yang memperlihatkan sisi atas, depan, dan samping objek sekaligus",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya melihat garis datar dari samping murni (2D Side Scroller)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mata burung murni 90 derajat dari langit (Top-Down)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Kamera gelap gulita tanpa cahaya",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-11",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 11,
    "prompt": "Sebuah kertas origami bujur sangkar dilipat dua diagonal membentuk segitiga 📐, kemudian dilipat dua sekali lagi. Berapa lapisan kertas yang saling menumpuk?",
    "visualHint": "1 lipat (2 lapis) ➡️ 2 lipat (4 lapis)",
    "options": [
      {
        "id": "A",
        "text": "4 lapisan kertas",
        "score": 20
      },
      {
        "id": "B",
        "text": "2 lapisan kertas",
        "score": 5
      },
      {
        "id": "C",
        "text": "3 lapisan kertas",
        "score": 5
      },
      {
        "id": "D",
        "text": "8 lapisan kertas",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-12",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 12,
    "prompt": "Sebuah robot penjelajah berada di pusat peta (0,0). Robot maju ke Utara sejauh 4 meter, lalu belok ke Timur sejauh 3 meter. Berapakah jarak garis lurus terpendek robot dari titik awal? (Teorema Pythagoras)",
    "visualHint": "Segitiga siku-siku alas 3, tinggi 4 ➡️ sisi miring = ?",
    "options": [
      {
        "id": "A",
        "text": "5 meter (akar dari 3² + 4² = 9 + 16 = 25)",
        "score": 20
      },
      {
        "id": "B",
        "text": "7 meter (3 + 4)",
        "score": 5
      },
      {
        "id": "C",
        "text": "6 meter",
        "score": 5
      },
      {
        "id": "D",
        "text": "12 meter",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-13",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 13,
    "prompt": "Berapa banyak simetri lipat yang dimiliki oleh bangun datar persegi panjang (bukan bujur sangkar)?",
    "visualHint": "▭ Simetri Lipat Persegi Panjang",
    "options": [
      {
        "id": "A",
        "text": "2 simetri lipat (garis tengah horizontal dan garis tengah vertikal)",
        "score": 20
      },
      {
        "id": "B",
        "text": "4 simetri lipat",
        "score": 5
      },
      {
        "id": "C",
        "text": "1 simetri lipat",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tak terhingga",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-14",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 14,
    "prompt": "Di software desain 3D, ada 3 sumbu utama: Sumbu X (kiri-kanan), Sumbu Y (depan-belakang / atas-bawah), dan Sumbu Z. Sumbu Z mewakili dimensi apa?",
    "visualHint": "📐 X, Y, Z Koordinat 3D",
    "options": [
      {
        "id": "A",
        "text": "Dimensi kedalaman / ruang 3D (depth)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Warna spektrum cahaya",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kecepatan waktu animasi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tingkat kekerasan objek",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-spa-15",
    "tier": "middle",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 15,
    "prompt": "Tiga roda gigi terpasang berderet: Roda 1 menempel ke Roda 2, dan Roda 2 menempel ke Roda 3. Jika Roda 1 berputar searah jarum jam, ke arah manakah Roda 3 berputar?",
    "visualHint": "⚙️1(CW) ➡️ ⚙️2(CCW) ➡️ ⚙️3(?)",
    "options": [
      {
        "id": "A",
        "text": "Searah jarum jam (sama seperti Roda 1 karena perantara Roda 2 berbalik)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Berlawanan arah jarum jam",
        "score": 5
      },
      {
        "id": "C",
        "text": "Roda 3 tidak akan berputar",
        "score": 0
      },
      {
        "id": "D",
        "text": "Roda 3 pecah karena berlawanan",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-pat-1",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 1,
    "prompt": "Perhatikan barisan bilangan: 3, 6, 12, 24, 48, ... Angka berikutnya adalah?",
    "visualHint": "3 (x2) ➔ 6 (x2) ➔ 12 (x2) ➔ 24 (x2) ➔ 48 ➔ ❓",
    "options": [
      {
        "id": "A",
        "text": "96",
        "score": 20
      },
      {
        "id": "B",
        "text": "60",
        "score": 5
      },
      {
        "id": "C",
        "text": "72",
        "score": 5
      },
      {
        "id": "D",
        "text": "84",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-pat-2",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 2,
    "prompt": "Pola huruf sandi: A = 1, C = 3, E = 5, G = 7. Huruf apakah yang bernilai 9?",
    "visualHint": "A(1) ➔ C(3) ➔ E(5) ➔ G(7) ➔ ❓(9)",
    "options": [
      {
        "id": "A",
        "text": "Huruf I (melompati 1 huruf dalam abjad)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Huruf H",
        "score": 5
      },
      {
        "id": "C",
        "text": "Huruf J",
        "score": 5
      },
      {
        "id": "D",
        "text": "Huruf K",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-pat-3",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 3,
    "prompt": "Matriks 2x2:\n[ ⚪ ⚫ ]\n[ ⚫ ❓ ]\nBentuk manakah yang melengkapi pola simetri matriks tersebut?",
    "visualHint": "Baris 1: [Putih, Hitam] | Baris 2: [Hitam, ?]",
    "options": [
      {
        "id": "A",
        "text": "⚪ Lingkaran Putih",
        "score": 20,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f1f5f9'/><circle cx='50' cy='50' r='32' fill='%23ffffff' stroke='%2394a3b8' stroke-width='6'/></svg>"
      },
      {
        "id": "B",
        "text": "⚫ Lingkaran Hitam",
        "score": 5,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f8fafc'/><circle cx='50' cy='50' r='32' fill='%231e293b'/></svg>"
      },
      {
        "id": "C",
        "text": "🔺 Segitiga Merah",
        "score": 0,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23fee2e2'/><polygon points='50,18 85,78 15,78' fill='%23ef4444'/></svg>"
      },
      {
        "id": "D",
        "text": "⬛ Kotak Hitam",
        "score": 0,
        "image": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f1f5f9'/><rect x='22' y='22' width='56' height='56' rx='8' fill='%231e293b'/></svg>"
      }
    ]
  },
  {
    "id": "mid-pat-4",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 4,
    "prompt": "Sebuah ritme lagu game berbunyi: \"Ketuk, Ketuk, Diam, Ketuk, Ketuk, Diam, Ketuk, Ketuk, ...\". Dua aksi berikutnya adalah?",
    "visualHint": "🥁 🥁 🤫 | 🥁 🥁 🤫 | 🥁 🥁 ... ❓ ❓",
    "options": [
      {
        "id": "A",
        "text": "Diam, lalu Ketuk",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ketuk, lalu Ketuk",
        "score": 5
      },
      {
        "id": "C",
        "text": "Diam, lalu Diam",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada bunyi lagi",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-pat-5",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 5,
    "prompt": "Deret bilangan Fibonacci: 1, 1, 2, 3, 5, 8, 13, ... Berapakah angka selanjutnya? (Petunjuk: Setiap angka adalah penjumlahan dua angka sebelumnya)",
    "visualHint": "5 + 8 = 13 ➔ 8 + 13 = ❓",
    "options": [
      {
        "id": "A",
        "text": "21",
        "score": 20
      },
      {
        "id": "B",
        "text": "18",
        "score": 5
      },
      {
        "id": "C",
        "text": "20",
        "score": 5
      },
      {
        "id": "D",
        "text": "26",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-6",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 6,
    "prompt": "Perhatikan deret pola bilangan berikut: 3, 6, 12, 24, 48, [ ? ]. Bilangan apakah selanjutnya?",
    "visualHint": "x2, x2, x2, ...",
    "options": [
      {
        "id": "A",
        "text": "96 (setiap suku dikalikan 2)",
        "score": 20
      },
      {
        "id": "B",
        "text": "72",
        "score": 5
      },
      {
        "id": "C",
        "text": "60",
        "score": 5
      },
      {
        "id": "D",
        "text": "84",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-7",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 7,
    "prompt": "Deret Fibonacci dalam pemrograman: 1, 1, 2, 3, 5, 8, 13, [ ? ]. Angka berapakah selanjutnya?",
    "visualHint": "Jumlah dua angka sebelumnya (5 + 8 = 13, 8 + 13 = ?)",
    "options": [
      {
        "id": "A",
        "text": "21 (8 + 13 = 21)",
        "score": 20
      },
      {
        "id": "B",
        "text": "18",
        "score": 5
      },
      {
        "id": "C",
        "text": "20",
        "score": 5
      },
      {
        "id": "D",
        "text": "26",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-8",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 8,
    "prompt": "Pola Alfabet Lompat: A, C, F, J, O, [ ? ]. Huruf apakah berikutnya? (Petunjuk: lompat +2, +3, +4, +5, ...)",
    "visualHint": "A (+2) C (+3) F (+4) J (+5) O (+6) ?",
    "options": [
      {
        "id": "A",
        "text": "U (O bernilai 15, 15 + 6 = 21 yaitu huruf U)",
        "score": 20
      },
      {
        "id": "B",
        "text": "T",
        "score": 5
      },
      {
        "id": "C",
        "text": "S",
        "score": 5
      },
      {
        "id": "D",
        "text": "W",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-9",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 9,
    "prompt": "Pola sinyal biner sensor: 101, 1001, 10001, 100001, [ ? ]. Bentuk kode sinyal berikutnya adalah?",
    "visualHint": "Jumlah angka nol di tengah bertambah 1",
    "options": [
      {
        "id": "A",
        "text": "1000001 (dengan lima angka nol di antara dua angka satu)",
        "score": 20
      },
      {
        "id": "B",
        "text": "1100001",
        "score": 5
      },
      {
        "id": "C",
        "text": "1000010",
        "score": 5
      },
      {
        "id": "D",
        "text": "1111111",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-10",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 10,
    "prompt": "Matriks 3x3 Pola Rotasi Simbol: Pada baris pertama panah menunjuk 0°, 90°, 180°. Pada baris kedua 90°, 180°, 270°. Pada baris ketiga 180°, 270°, [ ? ]. Sudut manakah yang hilang?",
    "visualHint": "Pertambahan 90 derajat tiap langkah",
    "options": [
      {
        "id": "A",
        "text": "360° / 0° (kembali menunjuk ke atas)",
        "score": 20
      },
      {
        "id": "B",
        "text": "45°",
        "score": 0
      },
      {
        "id": "C",
        "text": "270°",
        "score": 5
      },
      {
        "id": "D",
        "text": "180°",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pat-11",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 11,
    "prompt": "Pola Barisan Aritmatika Berseling: 2, 20, 4, 18, 6, 16, 8, [ ? ]. Angka apakah selanjutnya?",
    "visualHint": "Suku ganjil (+2): 2, 4, 6, 8... | Suku genap (-2): 20, 18, 16, ?",
    "options": [
      {
        "id": "A",
        "text": "14 (16 dikurangi 2)",
        "score": 20
      },
      {
        "id": "B",
        "text": "10",
        "score": 5
      },
      {
        "id": "C",
        "text": "12",
        "score": 5
      },
      {
        "id": "D",
        "text": "18",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-12",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 12,
    "prompt": "Di game platformer, musuh memiliki pola patroli: Jalan 3 blok Kanan, diam 1 detik, jalan 3 blok Kiri, diam 1 detik. Jika saat ini musuh baru saja selesai diam setelah jalan ke Kanan, aksi apa berikutnya?",
    "visualHint": "Kanan ➡️ Diam ➡️ Kiri ➡️ Diam ➡️ ...",
    "options": [
      {
        "id": "A",
        "text": "Jalan 3 blok ke arah Kiri",
        "score": 20
      },
      {
        "id": "B",
        "text": "Jalan 3 blok ke arah Kanan lagi",
        "score": 5
      },
      {
        "id": "C",
        "text": "Melompat ke atas langit",
        "score": 0
      },
      {
        "id": "D",
        "text": "Diam selamanya tidak bergerak",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-13",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 13,
    "prompt": "Perhatikan pola kata kode: KODE, EKOD, DEKO, [ ? ]. Kata kode berikutnya dalam rotasi huruf melingkar ke kanan adalah?",
    "visualHint": "K-O-D-E ➡️ E-K-O-D ➡️ D-E-K-O ➡️ ?",
    "options": [
      {
        "id": "A",
        "text": "ODEK",
        "score": 20
      },
      {
        "id": "B",
        "text": "EDOK",
        "score": 5
      },
      {
        "id": "C",
        "text": "KEDO",
        "score": 5
      },
      {
        "id": "D",
        "text": "DOKE",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pat-14",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 14,
    "prompt": "Pola warna heksadesimal kode CSS sederhana: #111111 (sangat gelap), #333333, #555555, #777777, [ ? ]. Warna apakah berikutnya?",
    "visualHint": "Pertambahan nilai hex terang (+222222)",
    "options": [
      {
        "id": "A",
        "text": "#999999 (abu-abu semakin terang)",
        "score": 20
      },
      {
        "id": "B",
        "text": "#000000 (hitam pekat)",
        "score": 0
      },
      {
        "id": "C",
        "text": "#888888",
        "score": 5
      },
      {
        "id": "D",
        "text": "#FFFFFF",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pat-15",
    "tier": "middle",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 15,
    "prompt": "Sebuah algoritma sorting (pengurutan) bekerja dengan menukar dua angka berdekatan jika angka sebelah kiri lebih besar dari angka sebelah kanan. Algoritma dengan pola ini dikenal sebagai:",
    "visualHint": "🔄 Swap jika Kiri > Kanan",
    "options": [
      {
        "id": "A",
        "text": "Bubble Sort",
        "score": 20
      },
      {
        "id": "B",
        "text": "Random Shuffle",
        "score": 0
      },
      {
        "id": "C",
        "text": "Linear Search",
        "score": 5
      },
      {
        "id": "D",
        "text": "Binary Tree",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-cre-1",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 1,
    "prompt": "Kamu ingin membuat game bertema daur ulang sampah di Scratch. Mekanisme game seperti apa yang menurutmu paling seru dan mengedukasi pemain?",
    "visualHint": "🎮 ♻️ 💡",
    "options": [
      {
        "id": "A",
        "text": "Game menyortir sampah bergerak cepat di konveyor dengan power-up sains dan info dampak lingkungan setiap berhasil memilah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kuis teks biasa dengan pertanyaan pilihan ganda saja",
        "score": 10
      },
      {
        "id": "C",
        "text": "Hanya menampilkan gambar poster sampah diam",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menjiplak game Flappy Bird tanpa tema daur ulang",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-cre-2",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 2,
    "prompt": "Jika kamu diminta mendesain website untuk toko hewan peliharaan, fitur unik apa yang akan kamu tambahkan agar berbeda dari website lain?",
    "visualHint": "🐾 🌐 ✨",
    "options": [
      {
        "id": "A",
        "text": "Kuis interaktif pencocokan jenis hewan yang cocok dengan kepribadian pemilik, plus simulasi virtual pet sederhana",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya daftar foto hewan dan nomor telepon",
        "score": 8
      },
      {
        "id": "C",
        "text": "Halaman kosong dengan tulisan \"Hubungi kami\"",
        "score": 0
      },
      {
        "id": "D",
        "text": "Meniru persis toko hewan sebelah tanpa inovasi",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-cre-3",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 3,
    "prompt": "Saat membuat proyek animasi, kamu menyadari musik latar yang kamu inginkan tidak tersedia secara gratis. Apa solusimu?",
    "visualHint": "🎵 🚫 ©️ ➔ 💡?",
    "options": [
      {
        "id": "A",
        "text": "Merekam efek suara sendiri menggunakan benda-benda di rumah atau memakai tool generator melodi digital open-source",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengambil musik berhak cipta tanpa izin",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membatalkan seluruh proyek animasi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membiarkan animasinya hening total tanpa berusaha mencari alternatif",
        "score": 8
      }
    ]
  },
  {
    "id": "mid-cre-4",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 4,
    "prompt": "Bagaimana kamu memanfaatkan kecerdasan buatan (AI) untuk membantu belajarmu di sekolah?",
    "visualHint": "🤖 📚 🧠",
    "options": [
      {
        "id": "A",
        "text": "Meminta AI menjelaskan materi sulit dengan analogi mudah dipahami dan memberikan soal latihan untuk menguji pemahamanku",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyuruh AI mengerjakan seluruh PR tanpa mau membacanya",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengabaikan AI karena menganggapnya tidak berguna",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hanya dipakai untuk mengarang lelucon",
        "score": 8
      }
    ]
  },
  {
    "id": "mid-cre-5",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 5,
    "prompt": "Jika kamu bisa menciptakan robot yang memecahkan satu masalah di kotamu, masalah apa yang ingin kamu selesaikan?",
    "visualHint": "🏙️ 🤖 🌍",
    "options": [
      {
        "id": "A",
        "text": "Mengembangkan robot sensor pendeteksi banjir dini atau pemilah sampah otomatis di saluran air kota",
        "score": 20
      },
      {
        "id": "B",
        "text": "Robot yang hanya bisa berjalan maju mundur tanpa tujuan jelas",
        "score": 5
      },
      {
        "id": "C",
        "text": "Robot untuk membantu bolos sekolah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada ide sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-6",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 6,
    "prompt": "Kamu sedang merancang game RPG petualangan tentang dunia masa depan 🚀. Mekanisme unik apa yang bisa kamu tawarkan agar berbeda dari game biasa?",
    "visualHint": "🎮 Inovasi Game Mechanic",
    "options": [
      {
        "id": "A",
        "text": "Pemain bisa mengutak-atik kode sirkuit robot dalam game untuk membuka kemampuan baru secara kustom",
        "score": 20
      },
      {
        "id": "B",
        "text": "Meniru persis game lain tanpa ada perbedaan sama sekali",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya menampilkan teks hitam di atas layar putih",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuat game tidak bisa dimainkan sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-7",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 7,
    "prompt": "Sekolahmu mengadakan festival sains dan teknologi 🎪. Proyek teknologi interaktif apa yang paling kreatif dan menarik pengunjung?",
    "visualHint": "🎪 Pameran Teknologi Interaktif",
    "options": [
      {
        "id": "A",
        "text": "Game edukasi daur ulang sampah menggunakan sensor kamera komputer yang mendeteksi jenis sampah secara otomatis",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya menempelkan poster kertas biasa tanpa alat peraga",
        "score": 5
      },
      {
        "id": "C",
        "text": "Memutar rekaman video orang lain tanpa penjelasan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Meja stan dibiarkan kosong melompong",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-8",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 8,
    "prompt": "Jika kamu diminta mendesain aplikasi smartphone untuk membantu anak-anak lebih rajin membaca buku 📱📚, fitur apa yang paling seru?",
    "visualHint": "📚 Gamifikasi Edukasi",
    "options": [
      {
        "id": "A",
        "text": "Setiap halaman buku yang dibaca membuka petualangan hewan avatar virtual yang bisa berevolusi dan naik level",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memberi alarm bunyi bising setiap 5 menit yang tidak bisa dimatikan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengunci smartphone selamanya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya menampilkan daftar angka halaman polos",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-cre-9",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 9,
    "prompt": "Bagaimana caramu memanfaatkan kecerdasan buatan (AI) untuk membantu menciptakan musik lagu untuk video game buatanmu? 🎵🤖",
    "visualHint": "🎵 AI Co-Creator",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan AI untuk menghasilkan melodi dasar sesuai suasana (misal: tegang saat bos monster, riang di kota), lalu menyempurnakannya sendiri",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membiarkan AI membuat semuanya tanpa mendengarkannya sama sekali",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menolak memakai musik sama sekali karena merepotkan",
        "score": 0
      },
      {
        "id": "D",
        "text": "Merekam suara bising kendaraan di jalan raya",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-cre-10",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 10,
    "prompt": "Dalam desain antarmuka (User Interface) aplikasi Beekoding, bagaimana cara membuat tombol \"Mulai Belajar\" terlihat sangat menarik diklik? ✨",
    "visualHint": "🎨 UI / UX Button Design",
    "options": [
      {
        "id": "A",
        "text": "Warna gradasi hangat (kuning madu ke oranye), teks tebal kontras, ikon roket kecil, dan efek cahaya lembut saat disentuh kursor",
        "score": 20
      },
      {
        "id": "B",
        "text": "Warna abu-abu kusam yang sama persis dengan warna latar belakang sehingga sulit dicari",
        "score": 0
      },
      {
        "id": "C",
        "text": "Ukuran tombol dibuat sangat kecil seukuran semut",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menggunakan huruf acak yang tidak bisa dibaca",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-11",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 11,
    "prompt": "Kamu memiliki ide membuat \"Kandang Kucing Pintar\" berbasis IoT (Internet of Things) 🐱📡. Fitur cerdas apa yang paling bermanfaat bagi pemilik hewan?",
    "visualHint": "🐱 IoT Smart Pet Feeder",
    "options": [
      {
        "id": "A",
        "text": "Dispenser makanan otomatis terjadwal, sensor timbangan berat badan kucing, dan kamera live stream ke smartphone",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kandang yang membunyikan sirene polisi setiap kucing bergerak",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menaruh televisi besar di dalam kandang kucing",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengunci kandang agar kucing tidak bisa makan",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-12",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 12,
    "prompt": "Di game buatanmu, karakter utama kehabisan energi di tengah gurun pasir 🏜️. Ide cerita kreatif apa yang bisa membalikkan keadaan?",
    "visualHint": "🏜️ Plot Twist Kreatif",
    "options": [
      {
        "id": "A",
        "text": "Menemukan reruntuhan kota kuno bertenaga surya di mana karakter dapat memanfaatkan sinar matahari untuk mengisi daya baterai cadangan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Karakter langsung kalah seketika tanpa ada peluang apapun",
        "score": 5
      },
      {
        "id": "C",
        "text": "Game langsung force close keluar sendiri",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tiba-tiba karakter terbang ke surga tanpa alasan logis",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-cre-13",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 13,
    "prompt": "Apa cara paling menarik untuk mengajarkan konsep \"Algoritma\" kepada adik kelasmu di sekolah dasar? 🧒🤖",
    "visualHint": "💡 Storytelling & Analogi",
    "options": [
      {
        "id": "A",
        "text": "Membuat analogi permainan \"Menuntun Robot Buta\" membuat sandwich selai kacang dengan instruksi langkah demi langkah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyuruh mereka membaca buku teks tebal bahasa Inggris tanpa gambar",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menulis rumus matematika rumit di papan tulis tanpa penjelasan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Memarahi mereka jika belum langsung mengerti",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-cre-14",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 14,
    "prompt": "Kamu diminta mendesain logo untuk klub coding sekolah bernama \"CodeNova\" ⭐💻. Konsep visual mana yang paling kuat?",
    "visualHint": "🎨 Brand Identity Design",
    "options": [
      {
        "id": "A",
        "text": "Bintang berkilau yang dibentuk dari susunan tanda kurung kurawal kode \"{ }\" berwarna neon futuristik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Foto pemandangan pohon kelapa",
        "score": 0
      },
      {
        "id": "C",
        "text": "Gambar kotak hitam polos",
        "score": 0
      },
      {
        "id": "D",
        "text": "Gambar mobil pick up barang",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-cre-15",
    "tier": "middle",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 15,
    "prompt": "Jika kamu bisa menciptakan alat masa depan untuk menyelamatkan terumbu karang di lautan 🪸🌊, inovasi teknologi apa yang kamu bayangkan?",
    "visualHint": "🪸 Tech for Planet Earth",
    "options": [
      {
        "id": "A",
        "text": "Robot ikan pintar bertenaga arus laut yang memantau suhu air, menanam bibit karang baru, dan membersihkan mikroplastik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengecat terumbu karang dengan cat minyak biasa",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memindahkan semua air laut ke daratan",
        "score": 0
      },
      {
        "id": "D",
        "text": "Memasang kipas angin raksasa di atas air laut",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-ps-1",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 1,
    "prompt": "Dalam game Scratch yang kamu buat, skor pemain tidak bertambah saat menyentuh koin emas. Apa langkah pertama yang kamu lakukan untuk menemukan penyebabnya?",
    "visualHint": "🐞 Debugging: Skor tidak bertambah saat kena koin",
    "options": [
      {
        "id": "A",
        "text": "Memeriksa blok kode koin: apakah deteksi \"touching player\" dan blok \"change score by 1\" sudah terpasang dengan benar di dalam loop berulang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus seluruh game dan mulai ulang dari nol",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengganti warna koin menjadi hijau",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mematikan komputer karena panik",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-ps-2",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 2,
    "prompt": "Sebuah robot pengantar paket perlu mengantarkan 3 barang ke lokasi A (jarak 2 km), B (jarak 5 km sejalur dengan A), dan C (jarak 8 km berlawanan arah). Urutan rute paling efisien adalah?",
    "visualHint": "📍 C (8km Kiri) ◄── [Robot] ──► A (2km Kanan) ──► B (5km Kanan)",
    "options": [
      {
        "id": "A",
        "text": "Ke A lalu B (sejalur), baru berputar menuju C",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ke C dulu, lalu ke A, lalu kembali ke C, lalu ke B",
        "score": 0
      },
      {
        "id": "C",
        "text": "Bolak-balik acak antar titik",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menolak mengantarkan paket",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-ps-3",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 3,
    "prompt": "Konsep \"Divide and Conquer\" (Memecah masalah besar menjadi bagian kecil). Jika kamu diminta membuat game RPG yang rumit, apa strategi terbaik?",
    "visualHint": "🧩 Masalah Besar ➔ Modul Karakter + Modul Peta + Modul Musuh",
    "options": [
      {
        "id": "A",
        "text": "Membuat satu per satu komponen kecil terlebih dahulu (gerakan karakter ➔ sistem scoring ➔ rintangan/musuh) lalu menggabungkannya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menulis ribuan baris kode sekaligus tanpa mengujinya sama sekali",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya membuat gambar grafisnya tanpa memprogram mekanismenya",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyerah karena game RPG terlalu sulit",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-ps-4",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 4,
    "prompt": "Robot maze menghadapi jalan buntu di depan. Sensor menunjukkan dinding di depan dan kanan, tetapi arah kiri terbuka. Perintah yang tepat untuk robot adalah?",
    "visualHint": "🧱 Depan: Tembok | 🧱 Kanan: Tembok | 🟢 Kiri: Bebas",
    "options": [
      {
        "id": "A",
        "text": "Belok Kiri 90 derajat, lalu Maju 1 langkah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Terus Maju menabrak dinding depan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Belok Kanan menabrak dinding",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mematikan mesin di tempat",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-ps-5",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 5,
    "prompt": "Kamu punya 9 koin logam dengan bentuk identik, tetapi 1 di antaranya koin palsu yang lebih ringan. Menggunakan timbangan neraca, berapa kali penimbangan MINIMAL yang dibutuhkan untuk menemukan koin palsu?",
    "visualHint": "⚖️ 9 koin: Bagi jadi 3 kelompok (3, 3, 3)",
    "options": [
      {
        "id": "A",
        "text": "2 kali penimbangan (Timbang 3 vs 3, lalu 1 vs 1)",
        "score": 20
      },
      {
        "id": "B",
        "text": "8 kali penimbangan",
        "score": 5
      },
      {
        "id": "C",
        "text": "4 kali penimbangan",
        "score": 10
      },
      {
        "id": "D",
        "text": "1 kali penimbangan",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pro-6",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 6,
    "prompt": "Sebuah fungsi di program Python menampilkan pesan error: \"IndexError: list index out of range\". Apa penyebab paling umum dari error ini?",
    "visualHint": "🐍 Python IndexError",
    "options": [
      {
        "id": "A",
        "text": "Program mencoba mengakses nomor elemen data di daftar (list) yang melebihi jumlah elemen yang tersedia",
        "score": 20
      },
      {
        "id": "B",
        "text": "Koneksi kabel internet komputer putus",
        "score": 0
      },
      {
        "id": "C",
        "text": "Komputer kehabisan memori RAM",
        "score": 5
      },
      {
        "id": "D",
        "text": "Salah mengetik nama variabel huruf kapital",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pro-7",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 7,
    "prompt": "Di game platformer buatanmu, karakter sering jatuh menembus lantai saat melompat dari tempat yang sangat tinggi 🧗‍♂️. Solusi teknis apa yang perlu diperbaiki?",
    "visualHint": "🎮 Collision Detection Fix",
    "options": [
      {
        "id": "A",
        "text": "Meningkatkan frekuensi deteksi tabrakan (Continuous Collision Detection) atau mempertebal batas hitbox lantai",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus lantai dari dalam game",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengubah warna karakter menjadi merah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menonaktifkan fitur melompat sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pro-8",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 8,
    "prompt": "Kamu memiliki daftar 1.000 nama siswa yang tersusun acak dan ingin mencari apakah nama \"Rizky\" ada di daftar. Langkah terbaik sebelum melakukan pencarian cepat (Binary Search) adalah:",
    "visualHint": "🔍 Sorting sebelum Binary Search",
    "options": [
      {
        "id": "A",
        "text": "Mengurutkan (sort) daftar nama secara alfabetis terlebih dahulu dari A sampai Z",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus separuh nama secara acak",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membaca dari nama terakhir ke nama pertama",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengganti semua nama menjadi angka",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pro-9",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 9,
    "prompt": "Sebuah robot pengantar barang harus mengunjungi 5 lokasi berbeda di dalam gedung. Apa metode terbaik untuk menentukan rute pengiriman yang paling efisien?",
    "visualHint": "🗺️ Shortest Path Algorithm",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan algoritma jalur terpendek (seperti Dijkstra / Breadth-First Search) berdasarkan total jarak antar lokasi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memilih lokasi secara acak dengan melempar dadu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Selalu kembali ke titik awal setiap selesai mengunjungi satu lokasi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menunggu sampai ada robot lain yang lewat",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pro-10",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 10,
    "prompt": "Saat menguji game multiplayer lokal, pergerakan karakter terasa sangat lambat dan patah-patah (lag berat). Setelah dicek, ada 10.000 partikel asap yang dirender setiap detik. Bagaimana cara optimasinya?",
    "visualHint": "⚡ Game Optimization & FPS",
    "options": [
      {
        "id": "A",
        "text": "Mengurangi jumlah partikel asap, menggunakan sprite sheet yang lebih efisien, dan menghapus partikel yang sudah keluar layar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menambah 10.000 partikel api lagi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memperkecil ukuran layar game menjadi 1 centimeter",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menghapus seluruh game dari komputer",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pro-11",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 11,
    "prompt": "Program kalkulator yang kamu buat mengalami crash saat pengguna memasukkan angka 0 sebagai angka pembagi (misal: 10 / 0). Bagaimana cara mencegah crash ini?",
    "visualHint": "🛡️ Exception Handling (ZeroDivisionError)",
    "options": [
      {
        "id": "A",
        "text": "Menambahkan pengecekan: IF angka_pembagi == 0 THEN tampilkan pesan peringatan \"Tidak bisa membagi dengan angka nol\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengubah angka 0 menjadi angka 100 secara diam-diam",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mematikan komputer pengguna saat error terjadi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membiarkan program crash agar pengguna kapok",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pro-12",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 12,
    "prompt": "Di sebuah proyek tim coding, kamu dan temanmu mengerjakan fitur yang sama sehingga terjadi konflik kode (merge conflict). Sikap pemecahan masalah terbaik adalah:",
    "visualHint": "🤝 Git Merge Conflict Resolution",
    "options": [
      {
        "id": "A",
        "text": "Duduk bersama, membandingkan perbedaan baris kode, dan menggabungkan bagian terbaik dari kedua versi secara mufakat",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus seluruh kode temanmu tanpa memberi tahu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Marah dan keluar dari kelompok proyek",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membatalkan seluruh proyek",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-pro-13",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 13,
    "prompt": "Website buatanmu tampil sempurna di laptop, tetapi tombol dan teksnya terpotong berantakan saat dibuka di layar smartphone. Masalah apa yang harus diperbaiki?",
    "visualHint": "📱 Responsive Web Design (CSS)",
    "options": [
      {
        "id": "A",
        "text": "Menerapkan CSS Responsive Design (Media Queries, flexbox, dan ukuran persentase viewport)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Melarang orang membuka website lewat smartphone",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menghapus seluruh teks di website",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengubah warna latar belakang menjadi hitam",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pro-14",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 14,
    "prompt": "Sensor suhu di proyek greenhouse otomatis membaca nilai yang berubah-ubah secara liar (-50°C lalu +120°C dalam 1 detik). Langkah diagnosis apa yang tepat?",
    "visualHint": "🌡️ Sensor Hardware Troubleshooting",
    "options": [
      {
        "id": "A",
        "text": "Memeriksa apakah kabel konektor sensor kendor, grounding terpasang dengan baik, atau sensor terkena induksi arus pendek",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyiram sensor dengan seember air es",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menganggap suhu ruangan memang berubah secepat itu",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuang greenhouse ke sungai",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-pro-15",
    "tier": "middle",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 15,
    "prompt": "Kamu ingin membuat fitur \"High Score\" yang tetap tersimpan meskipun game ditutup dan komputer dimatikan. Di manakah data skor harus disimpan?",
    "visualHint": "💾 Persistent Storage (LocalStorage / Database)",
    "options": [
      {
        "id": "A",
        "text": "Di penyimpanan permanen seperti LocalStorage, file teks JSON, atau database cloud",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya disimpan di variabel sementara dalam memori RAM game",
        "score": 5
      },
      {
        "id": "C",
        "text": "Di clipboard copy-paste sementara",
        "score": 5
      },
      {
        "id": "D",
        "text": "Skor tidak bisa disimpan di komputer mana pun",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-lan-1",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 1,
    "prompt": "Dalam pemrograman, istilah \"Bug\" merujuk pada kesalahan dalam kode program. Jika temanmu berkata \"Programku masih banyak bug-nya!\", maksudnya adalah...?",
    "visualHint": "💻 🐞 ➔ Apa artinya?",
    "options": [
      {
        "id": "A",
        "text": "Programnya masih memiliki kesalahan logika atau error yang harus diperbaiki",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ada semut atau serangga sungguhan di dalam layar laptopnya",
        "score": 0
      },
      {
        "id": "C",
        "text": "Programnya sudah selesai sempurna tanpa kekurangan",
        "score": 0
      },
      {
        "id": "D",
        "text": "Programnya sedang diserang virus jahat dari luar angkasa",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-lan-2",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 2,
    "prompt": "Perhatikan kalimat instruksi bersyarat: \"Simpan dokumen HANYA JIKA semua kolom bertanda bintang (*) sudah terisi lengkap.\" Apa yang terjadi jika ada satu kolom bertanda (*) yang masih kosong?",
    "visualHint": "📝 Syarat Simpan: Semua (*) terisi",
    "options": [
      {
        "id": "A",
        "text": "Dokumen TIDAK BOLEH disimpan sebelum kolom (*) tersebut diisi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Dokumen otomatis terhapus",
        "score": 0
      },
      {
        "id": "C",
        "text": "Dokumen tetap disimpan tanpa peringatan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Komputer akan restart",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-lan-3",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 3,
    "prompt": "Analogi Kata: \"PENULIS berhubungan dengan BUKU ✍️, seperti PROGRAMMER berhubungan dengan ...?\"",
    "visualHint": "Penulis : Buku = Programmer : ❓",
    "options": [
      {
        "id": "A",
        "text": "Aplikasi / Kode Perangkat Lunak 💻",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kertas karton",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kabel listrik",
        "score": 5
      },
      {
        "id": "D",
        "text": "Meja kantor",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-lan-4",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 4,
    "prompt": "Ketika kamu mempresentasikan proyek coding buatanmu di hadapan teman-teman sekelas, bagian mana yang paling penting dijelaskan terlebih dahulu?",
    "visualHint": "🎤 🖥️ 🧑‍🤝‍🧑",
    "options": [
      {
        "id": "A",
        "text": "Tujuan proyek, apa masalah yang ingin dipecahkan, dan bagaimana cara kerjanya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghafal setiap baris kode yang rumit tanpa menjelaskan fungsinya",
        "score": 8
      },
      {
        "id": "C",
        "text": "Langsung pamer bahwa karyamu paling hebat tanpa mendengarkan saran",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya membacakan judulnya lalu duduk kembali",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-lan-5",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 5,
    "prompt": "Dalam kerja kelompok membuat game, teman satu timmu mengusulkan ide yang menurutmu kurang efektif. Cara terbaik untuk merespon adalah...?",
    "visualHint": "💬 🤝 💡",
    "options": [
      {
        "id": "A",
        "text": "Mengapresiasi idenya, lalu menjelaskan alasan teknis secara sopan sambil menawarkan alternatif perbaikan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung mencela idenya bodoh di depan umum",
        "score": 0
      },
      {
        "id": "C",
        "text": "Diam saja tapi kesal di dalam hati",
        "score": 5
      },
      {
        "id": "D",
        "text": "Keluar dari kelompok tanpa pamit",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-6",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 6,
    "prompt": "Dalam dunia pemrograman, konvensi penamaan variabel seperti \"totalSkorSiswa\" atau \"namaLengkapSiswa\" dikenal dengan istilah:",
    "visualHint": "🐫 totalSkorSiswa (Huruf besar di kata kedua)",
    "options": [
      {
        "id": "A",
        "text": "camelCase",
        "score": 20
      },
      {
        "id": "B",
        "text": "snake_case",
        "score": 5
      },
      {
        "id": "C",
        "text": "kebab-case",
        "score": 5
      },
      {
        "id": "D",
        "text": "SCREAMING_SNAKE_CASE",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-7",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 7,
    "prompt": "Bacalah pseudocode berikut: \"SET skor = 10; IF skor > 5 THEN CETAK 'Lulus' ELSE CETAK 'Remedial'\". Apa output teks yang akan tercetak?",
    "visualHint": "📜 Pseudocode Evaluation",
    "options": [
      {
        "id": "A",
        "text": "Lulus",
        "score": 20
      },
      {
        "id": "B",
        "text": "Remedial",
        "score": 0
      },
      {
        "id": "C",
        "text": "10",
        "score": 5
      },
      {
        "id": "D",
        "text": "skor > 5",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-lan-8",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 8,
    "prompt": "Ketika kamu menemukan bug di sebuah program dan ingin melaporkannya kepada mentor, cara penyampaian mana yang paling jelas dan membantu?",
    "visualHint": "📝 Bug Report yang Efektif",
    "options": [
      {
        "id": "A",
        "text": "\"Kak, saat saya klik tombol Save di formulir, muncul pesan error merah bertuliskan 'Data Kosong', ini tangkapan layarnya.\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Kak, programnya rusak parah, benerin dong!\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "\"Ada yang salah tapi saya lupa di mana.\"",
        "score": 5
      },
      {
        "id": "D",
        "text": "Diam saja dan tidak bilang ke siapa-siapa",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-9",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 9,
    "prompt": "Komentar di dalam kode program (misalnya baris yang diawali dengan tanda \"#\" di Python atau \"//\" di JavaScript) berfungsi untuk:",
    "visualHint": "// Ini adalah catatan penjelasan kode",
    "options": [
      {
        "id": "A",
        "text": "Memberikan penjelasan atau dokumentasi bagi programmer agar kode mudah dipahami manusia tanpa dieksekusi oleh komputer",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membuat game berjalan dua kali lebih cepat",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengunci kode agar tidak bisa diedit",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghapus virus dari komputer",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-10",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 10,
    "prompt": "Kata \"Algoritma\" berasal dari nama seorang ilmuwan matematika muslim legendaris dunia, yaitu:",
    "visualHint": "📚 Sejarah Sains Komputer",
    "options": [
      {
        "id": "A",
        "text": "Muhammad bin Musa Al-Khawarizmi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ibnu Sina (Avicenna)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Al-Biruni",
        "score": 5
      },
      {
        "id": "D",
        "text": "Ibnu Khaldun",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-11",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 11,
    "prompt": "Sebuah fungsi diberi nama \"hitungRataRataNilai(daftarNilai)\". Berdasarkan prinsip Clean Code, apakah nama fungsi tersebut sudah baik?",
    "visualHint": "✨ Clean Code Naming",
    "options": [
      {
        "id": "A",
        "text": "Sangat baik, karena menggunakan kata kerja yang jelas mendeskripsikan tujuan dari fungsi tersebut",
        "score": 20
      },
      {
        "id": "B",
        "text": "Buruk, seharusnya disingkat saja menjadi \"h()\", agar hemat huruf",
        "score": 5
      },
      {
        "id": "C",
        "text": "Buruk, nama fungsi tidak boleh lebih dari 3 huruf",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada pengaruhnya sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-12",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 12,
    "prompt": "Dalam bahasa pemrograman Python, tanda sama dengan ganda (\"==\") memiliki arti yang berbeda dengan tanda sama dengan tunggal (\"=\"). Apa perbedaannya?",
    "visualHint": "x = 5 vs if (x == 5):",
    "options": [
      {
        "id": "A",
        "text": "\"=\" digunakan untuk mengisi nilai ke variabel (assignment), sedangkan \"==\" digunakan untuk membandingkan kesamaan dua nilai (comparison)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Keduanya memiliki fungsi yang sama persis",
        "score": 0
      },
      {
        "id": "C",
        "text": "\"==\" hanya digunakan untuk perkalian",
        "score": 5
      },
      {
        "id": "D",
        "text": "\"=\" untuk menghapus variabel",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-13",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 13,
    "prompt": "Bacalah paragraf berikut: \"Pengembang perangkat lunak harus selalu memvalidasi input dari pengguna sebelum menyimpannya ke database untuk mencegah serangan keamanan berbahaya.\" Makna kata \"Memvalidasi\" adalah:",
    "visualHint": "🛡️ Validasi Data Input",
    "options": [
      {
        "id": "A",
        "text": "Memeriksa keabsahan, format, dan keamanan data sesuai dengan aturan yang telah ditetapkan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus seluruh input pengguna",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mencetak data ke kertas printer",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengirimkan email spam ke pengguna",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-lan-14",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 14,
    "prompt": "Di sebuah presentasi proyek akhir, mentor meminta kamu menjelaskan \"Arsitektur Game\" buatanmu dalam waktu 2 menit. Cara presentasi mana yang paling efektif?",
    "visualHint": "🎤 Presentasi Efektif & Terstruktur",
    "options": [
      {
        "id": "A",
        "text": "Menjelaskan alur utama menggunakan diagram alir sederhana (Input ➡️ Pemrosesan ➡️ Output) dengan bahasa yang ringkas dan percaya diri",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membaca setiap baris kode dari baris 1 sampai baris 500 dengan suara pelan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Diam membisu karena grogi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyombongkan diri tanpa menunjukkan hasil karya game",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-lan-15",
    "tier": "middle",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 15,
    "prompt": "Singkatan dari \"URL\" yang sering kamu ketik di bilah alamat browser web (misal: https://beekoding.id) adalah:",
    "visualHint": "🌐 Uniform Resource Locator",
    "options": [
      {
        "id": "A",
        "text": "Uniform Resource Locator (alamat penunjuk lokasi sumber daya di internet)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Universal Radio Language",
        "score": 0
      },
      {
        "id": "C",
        "text": "United Robot Laboratory",
        "score": 5
      },
      {
        "id": "D",
        "text": "User Running Level",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-per-1",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 1,
    "prompt": "Kamu sudah mencoba menulis script coding selama 1 jam, tetapi muncul pesan error merah di layar. Apa reaksi pertamamu?",
    "visualHint": "⚠️ ERROR: Line 14 SyntaxError",
    "options": [
      {
        "id": "A",
        "text": "Membaca pesan errornya dengan teliti: di baris mana letak kesalahannya, lalu mencari solusinya atau bertanya ke mentor",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung menutup aplikasi dan berhenti belajar coding",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengeluh terus menerus tapi tidak membaca pesannya",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyalahkan komputernya rusak",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-per-2",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 2,
    "prompt": "Saat kamu melihat proyek buatan teman atau coder lain yang jauh lebih canggih daripada buatanmu saat ini, apa yang kamu rasakan?",
    "visualHint": "🌟 🚀 💡",
    "options": [
      {
        "id": "A",
        "text": "Termotivasi dan terinspirasi! Ingin mempelajari teknik baru apa yang mereka gunakan agar karyaku bisa semakin hebat",
        "score": 20
      },
      {
        "id": "B",
        "text": "Iri dan merasa rendah diri lalu tidak mau coding lagi",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengatakan bahwa karya mereka curang atau tidak asli",
        "score": 0
      },
      {
        "id": "D",
        "text": "Biasa saja, tidak peduli dengan perkembangan diri",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-per-3",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 3,
    "prompt": "Seberapa sering kamu penasaran ingin membongkar dan mencari tahu cara kerja suatu teknologi (game, website, atau robot)?",
    "visualHint": "🔍 ⚙️ 💡",
    "options": [
      {
        "id": "A",
        "text": "Sering sekali! Aku selalu ingin tahu logika di balik layar dan cara kerjanya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kadang-kadang, jika game tersebut sangat menarik",
        "score": 15
      },
      {
        "id": "C",
        "text": "Jarang, aku hanya suka memainkannya saja sebagai pengguna",
        "score": 10
      },
      {
        "id": "D",
        "text": "Tidak pernah tertarik sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "mid-per-4",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 4,
    "prompt": "Ketika belajar materi coding baru yang cukup abstrak (misal variabel atau perulangan for-loop), berapa lama kamu bersedia berlatih hingga paham?",
    "visualHint": "🔁 ⏳ 🧠",
    "options": [
      {
        "id": "A",
        "text": "Aku akan terus mencoba beberapa contoh latihan berbeda sampai benar-benar paham logikanya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya mencoba sekali; kalau belum paham ya sudah lewatkan saja",
        "score": 8
      },
      {
        "id": "C",
        "text": "Langsung minta orang lain yang mengerjakan tugas latihannya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Memilih pura-pura paham padahal bingung",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-per-5",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 5,
    "prompt": "Jika kamu diberikan waktu bebas 2 jam di akhir pekan, aktivitas mana yang paling membuatmu bersemangat?",
    "visualHint": "🎯 ⏰ ✨",
    "options": [
      {
        "id": "A",
        "text": "Mengeksplorasi proyek kreatif (coding proyek baru, merakit lego/robot, atau belajar skill digital baru)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Bermain game online bersama teman-teman",
        "score": 15
      },
      {
        "id": "C",
        "text": "Menonton video pendek tanpa henti",
        "score": 8
      },
      {
        "id": "D",
        "text": "Melamun dan tidak melakukan apa-apa",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-6",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 6,
    "prompt": "Kamu sudah menghabiskan waktu 4 jam membuat game di Python, tapi saat dijalankan muncul pesan \"SyntaxError\" beruntun 🐍❌. Apa yang kamu lakukan?",
    "visualHint": "🐛 Debugging dengan Kepala Dingin",
    "options": [
      {
        "id": "A",
        "text": "Membaca baris tempat error terjadi, mencari titik koma atau tanda kurung yang belum tertutup, dan mengujinya kembali secara tenang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membanting keyboard dan berhenti belajar coding",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menghapus file python dan berpura-pura tidak pernah membuatnya",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyalahkan komputer karena dianggap rusak",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-7",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 7,
    "prompt": "Di kelas robotik, kode program buatanmu tidak berhasil membuat robot berbelok sempurna di sudut tikungan labirin. Sikap pengujian (testing) terbaik adalah:",
    "visualHint": "🤖 Iterative Tuning & Calibrating",
    "options": [
      {
        "id": "A",
        "text": "Mengubah parameter kecepatan motor dan durasi sensor secara bertahap (iteratif) sambil mencatat perubahannya pada buku catatan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengubah semua angka sekaligus secara acak tanpa dicatat",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengabaikan tikungan dan menganggap robot sudah sempurna",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menendang robot",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-8",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 8,
    "prompt": "Seorang programmer hebat bernama Grace Hopper menemukan kutu serangga asli yang tersangkut di mesin komputer mekanik (asal mula istilah \"Bug\"). Pelajaran penting dari peristiwa ini adalah:",
    "visualHint": "📜 Kisah Inspiratif Grace Hopper",
    "options": [
      {
        "id": "A",
        "text": "Kesalahan sistem selalu memiliki penyebab logis yang bisa ditemukan dan diperbaiki jika kita melakukan investigasi secara teliti",
        "score": 20
      },
      {
        "id": "B",
        "text": "Komputer tidak boleh ditaruh di dalam ruangan beratap",
        "score": 0
      },
      {
        "id": "C",
        "text": "Serangga adalah musuh abadi programmer",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada yang bisa belajar coding dengan baik",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-9",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 9,
    "prompt": "Kamu memiliki ide proyek aplikasi yang besar dan ambisius. Apa strategi terbaik agar kamu tidak kewalahan dan berhenti di tengah jalan?",
    "visualHint": "🎯 Dekomposisi Milestone Kecil",
    "options": [
      {
        "id": "A",
        "text": "Memecah proyek besar menjadi target-target kecil harian (milestone), dan merayakan setiap pencapaian kecil yang berhasil diselesaikan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mencoba menyelesaikan seluruh aplikasi dalam waktu satu malam tanpa tidur",
        "score": 5
      },
      {
        "id": "C",
        "text": "Hanya bermimpi tanpa pernah mulai menulis baris kode pertama",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membeli aplikasi jadi milik orang lain",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-10",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 10,
    "prompt": "Ketika kamu merasa jenuh atau buntu (*coder block*) saat memecahkan teka-teki algoritma yang rumit, apa tindakan paling produktif yang bisa kamu ambil?",
    "visualHint": "☕ Pomodoro & Refresh Pikiran",
    "options": [
      {
        "id": "A",
        "text": "Beristirahat sejenak 15-20 menit, berjalan santai menghirup udara segar, lalu kembali menatap masalah dengan pikiran yang lebih jernih",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memaksa diri menatap layar monitor selama 12 jam tanpa henti sampai mata sakit",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menyerah dan meninggalkan proyek selamanya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Marah-marah kepada teman satu tim",
        "score": 0
      }
    ]
  },
  {
    "id": "mi-per-11",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 11,
    "prompt": "Di sebuah kompetisi coding anak tingkat nasional, kamu tidak mendapatkan juara podium. Bagaimana respon mental yang paling membangun?",
    "visualHint": "🏆 Growth Mindset Pasca Kompetisi",
    "options": [
      {
        "id": "A",
        "text": "Mempelajari karya dan strategi peserta yang menang, mengevaluasi kekurangan proyek sendiri, dan berlatih lebih giat untuk kompetisi berikutnya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menuduh dewan juri berlaku curang tanpa bukti",
        "score": 0
      },
      {
        "id": "C",
        "text": "Merasa diri bodoh dan tidak berguna",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyembunyikan piagam keikutsertaan di bawah kasur",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-per-12",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 12,
    "prompt": "Dokumentasi bahasa pemrograman Python sangat panjang dan ditulis dalam istilah teknis. Cara terbaikmu mempelajarinya adalah:",
    "visualHint": "📖 Membaca Dokumentasi Resmi",
    "options": [
      {
        "id": "A",
        "text": "Membaca contoh kode (code snippets) yang disediakan di dokumentasi dan langsung mempraktikkannya di kode editor milikmu",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghafal seluruh kamus dokumentasi kata demi kata di luar kepala",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menutup browser dan tidak mau membaca dokumentasi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyalin kode tanpa memahami maksud dari kode tersebut",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-per-13",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 13,
    "prompt": "Dalam siklus pengembangan perangkat lunak (Software Development Life Cycle), mengapa tahap \"Testing & Debugging\" memakan waktu cukup banyak?",
    "visualHint": "🧪 Pentingnya Uji Coba Software",
    "options": [
      {
        "id": "A",
        "text": "Karena memastikan aplikasi berjalan stabil, aman, dan tanpa error untuk pengguna membutuhkan ketelitian dan pengujian berbagai skenario",
        "score": 20
      },
      {
        "id": "B",
        "text": "Karena programmer malas bekerja cepat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya sebagai formalitas agar tampak sibuk",
        "score": 0
      },
      {
        "id": "D",
        "text": "Karena komputer butuh istirahat",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-per-14",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 14,
    "prompt": "Kamu diminta mengajari teman sekelasmu yang tertinggal dalam memahami konsep array dan loop. Sikap apa yang kamu tunjukkan?",
    "visualHint": "🤝 Berbagi Ilmu & Empati",
    "options": [
      {
        "id": "A",
        "text": "Membimbing teman dengan sabar menggunakan analogi sederhana (seperti rak buku bersekat), karena mengajar orang lain juga memperkuat pemahaman sendiri",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengejek teman karena belum mengerti",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menolak membantu karena takut teman jadi lebih pintar",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya memberikan jawaban tugas tanpa menjelaskan konsepnya",
        "score": 5
      }
    ]
  },
  {
    "id": "mi-per-15",
    "tier": "middle",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 15,
    "prompt": "Apa motivasi utama seorang coder muda seperti kamu dalam terus berlatih membuat program dan aplikasi digital? 🌟",
    "visualHint": "💡 Purpose & Vision",
    "options": [
      {
        "id": "A",
        "text": "Ingin menguasai teknologi masa depan agar bisa menciptakan solusi bermanfaat yang memudahkan hidup banyak orang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya agar dipuji teman-teman di media sosial",
        "score": 5
      },
      {
        "id": "C",
        "text": "Karena terpaksa dipaksa orang tua",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak punya tujuan apa pun",
        "score": 0
      }
    ]
  }
];
