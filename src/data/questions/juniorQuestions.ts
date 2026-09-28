// Junior Explorer Questions (Usia 6 - 9 Tahun)
// 8 Kategori x 15 Soal = 120 Soal di Pool Bank Soal
import type { TalentQuestion } from '../talentQuestions';

export const JUNIOR_QUESTIONS: TalentQuestion[] = [
  {
    "id": "jr-log-1",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 1,
    "prompt": "Kelinci suka wortel 🥕. Kucing suka ikan 🐟. Jika BeeBot membawa wortel, hewan manakah yang akan mendekat?",
    "visualHint": "🥕 🐇 vs 🐟 🐱",
    "options": [
      {
        "id": "A",
        "text": "Kelinci, karena kelinci menyukai wortel",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kucing, karena kucing lapar",
        "score": 5
      },
      {
        "id": "C",
        "text": "Keduanya mendekat bersamaan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada hewan yang mendekat",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-log-2",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 2,
    "prompt": "Lampu lalu lintas: Hijau berarti JALAN 🟢, Merah berarti BERHENTI 🔴. Robot BeeBot melihat lampu MERAH menyala. Apa yang harus dilakukan BeeBot?",
    "visualHint": "🚦 🔴 🤖",
    "options": [
      {
        "id": "A",
        "text": "Terus berjalan maju",
        "score": 0
      },
      {
        "id": "B",
        "text": "Segera berhenti dan menunggu",
        "score": 20
      },
      {
        "id": "C",
        "text": "Berlari lebih kencang",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membunyikan klakson saja",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-log-3",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 3,
    "prompt": "Payung dipakai saat hujan ☔. Jaket tebal dipakai saat dingin 🧥. Jika di luar sedang turun hujan lebat dan dingin, apa yang sebaiknya dipakai?",
    "visualHint": "🌧️ ☔ 🧥",
    "options": [
      {
        "id": "A",
        "text": "Hanya kacamata hitam",
        "score": 0
      },
      {
        "id": "B",
        "text": "Payung dan jaket tebal",
        "score": 20
      },
      {
        "id": "C",
        "text": "Hanya baju renang",
        "score": 0
      },
      {
        "id": "D",
        "text": "Topi pantai",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-log-4",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 4,
    "prompt": "Aturan Pintu Ajaib: \"Pintu hanya terbuka jika kamu tersenyum 😊 DAN melambaikan tangan 👋\". Budi tersenyum tapi tangannya diam di saku. Apakah pintu terbuka?",
    "visualHint": "🚪 🔒 (Syarat: 😊 + 👋)",
    "options": [
      {
        "id": "A",
        "text": "Ya, terbuka lebar",
        "score": 0
      },
      {
        "id": "B",
        "text": "Tidak, karena harus memenuhi KEDUA syarat",
        "score": 20
      },
      {
        "id": "C",
        "text": "Pintu terbuka setengah saja",
        "score": 5
      },
      {
        "id": "D",
        "text": "Pintu rusak",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-log-5",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 5,
    "prompt": "Mobil mainan berjalan dari titik A ke B, lalu ke C. Jika jembatan antara B dan C putus, di manakah mobil mainan akan terhenti?",
    "visualHint": "🏁 A ─── B ──❌── C",
    "options": [
      {
        "id": "A",
        "text": "Berhenti di titik B",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sampai di titik C",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kembali sendiri ke titik A",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menghilang ke udara",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-6",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 6,
    "prompt": "Robot Beeby ingin membuat jus jeruk 🍊. Urutan langkah mana yang paling tepat?",
    "visualHint": "🍊 ➡️ 🔪 ➡️ 🥤",
    "options": [
      {
        "id": "A",
        "text": "Kupas jeruk ➡️ masukkan ke blender ➡️ nyalakan blender ➡️ tuang ke gelas",
        "score": 20
      },
      {
        "id": "B",
        "text": "Nyalakan blender ➡️ tuang ke gelas ➡️ kupas jeruk",
        "score": 0
      },
      {
        "id": "C",
        "text": "Minum air kosong dulu ➡️ simpan jeruk di lemari es",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tuang ke gelas ➡️ blender jeruk bulat-bulat",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-log-7",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 7,
    "prompt": "Semua burung memiliki sayap 🕊️. Pinguin adalah salah satu jenis burung 🐧. Apakah pinguin memiliki sayap?",
    "visualHint": "🕊️ (Punya Sayap) + 🐧 (Burung)",
    "options": [
      {
        "id": "A",
        "text": "Ya, pinguin punya sayap meski dipakai untuk berenang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tidak, pinguin hanya punya sirip ikan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Pinguin bukan hewan yang nyata",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya pinguin dewasa yang punya sayap",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-log-8",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 8,
    "prompt": "Sensor Gerak: Jika ada orang lewat, lampu lorong menyala 💡. Jika lorong sepi, lampu padam. Seekor kucing lewat di depan sensor, apa yang terjadi?",
    "visualHint": "🚶/🐱 ➡️ ⚡ ➡️ 💡",
    "options": [
      {
        "id": "A",
        "text": "Lampu menyala karena sensor mendeteksi adanya gerakan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lampu meledak karena kaget",
        "score": 0
      },
      {
        "id": "C",
        "text": "Lampu tetap padam karena kucing bukan manusia",
        "score": 5
      },
      {
        "id": "D",
        "text": "Lampu berubah warna jadi hijau",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-log-9",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 9,
    "prompt": "Kotak Merah lebih berat dari Kotak Biru 🟥 > 🟦. Kotak Kuning lebih berat dari Kotak Merah 🟨 > 🟥. Kotak manakah yang PALING BERAT?",
    "visualHint": "🟨 > 🟥 > 🟦",
    "options": [
      {
        "id": "A",
        "text": "Kotak Kuning",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kotak Biru",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kotak Merah",
        "score": 5
      },
      {
        "id": "D",
        "text": "Semua kotak sama beratnya",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-10",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 10,
    "prompt": "Beeby punya 3 kunci: Kunci Emas membuka peti harta 🗝️✨, Kunci Perak membuka lemari buku 🗝️📖, Kunci Perunggu membuka pintu kebun 🗝️🌻. Beeby ingin membaca dongeng, kunci apa yang diambil?",
    "visualHint": "🗝️✨ Harta | 🗝️📖 Buku | 🗝️🌻 Kebun",
    "options": [
      {
        "id": "A",
        "text": "Kunci Perak, karena lemari buku berisi buku dongeng",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kunci Emas, karena warnanya berkilau",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kunci Perunggu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak butuh kunci sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-11",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 11,
    "prompt": "Syarat wahana komedi putar 🎠: Tinggi badan minimal 100 cm. Tinggi Didi 105 cm, tinggi Lili 95 cm. Siapa yang boleh naik wahana?",
    "visualHint": "📏 Syarat: ≥ 100 cm | Didi: 105 cm | Lili: 95 cm",
    "options": [
      {
        "id": "A",
        "text": "Hanya Didi yang memenuhi syarat tinggi badan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya Lili",
        "score": 0
      },
      {
        "id": "C",
        "text": "Keduanya boleh naik bersama",
        "score": 5
      },
      {
        "id": "D",
        "text": "Keduanya tidak boleh naik",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-12",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 12,
    "prompt": "Ada jejak kaki basah di lantai dari pintu masuk menuju ke arah dapur 🐾💦. Kesimpulan apa yang paling masuk akal?",
    "visualHint": "🚪 ➡️ 🐾💦 ➡️ 🍳",
    "options": [
      {
        "id": "A",
        "text": "Seseorang baru masuk dari luar saat hujan/basah lalu berjalan ke dapur",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ada ikan yang berenang di lantai dapur",
        "score": 0
      },
      {
        "id": "C",
        "text": "Lantai dapur bocor ke atas langit",
        "score": 0
      },
      {
        "id": "D",
        "text": "Pintu rumah sedang menangis",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-13",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 13,
    "prompt": "Jika baterai tablet habis, tablet akan mati 🪫. Layar tablet Rani tiba-tiba gelap dan tidak merespons tombol power. Apa yang harus dicoba pertama kali?",
    "visualHint": "📱 🪫 ➡️ 🔌 ⚡",
    "options": [
      {
        "id": "A",
        "text": "Menyambungkan charger listrik untuk mengisi ulang daya baterai",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membuang tablet ke tempat sampah",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memukul layar tablet dengan sendok",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mencuci tablet dengan sabun mandi",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-14",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 14,
    "prompt": "Perahu kertas mengapung di atas air ⛵. Batu kerikil tenggelam ke dasar air 🪨. Jika Beeby meletakkan daun kering di atas air, apa yang kemungkinan besar terjadi?",
    "visualHint": "⛵ Terapung | 🪨 Tenggelam | 🍃 ?",
    "options": [
      {
        "id": "A",
        "text": "Daun akan mengapung karena bobotnya ringan seperti perahu kertas",
        "score": 20
      },
      {
        "id": "B",
        "text": "Daun akan langsung meledak",
        "score": 0
      },
      {
        "id": "C",
        "text": "Daun tenggelam secepat batu kerikil",
        "score": 5
      },
      {
        "id": "D",
        "text": "Air akan berubah warna jadi pelangi",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-log-15",
    "tier": "junior",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 15,
    "prompt": "Aturan Game: Tekan tombol [A] untuk lompat ⬆️, tombol [B] untuk merayap ⬇️. Ada rintangan batu tinggi di depan Beeby. Tombol apa yang ditekan?",
    "visualHint": "🎮 [A]: Lompat ⬆️ | [B]: Merayap ⬇️ | Rintangan: 🪨 Tinggi",
    "options": [
      {
        "id": "A",
        "text": "Tombol [A] untuk melompati batu tinggi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tombol [B] untuk merayap menabrak batu",
        "score": 5
      },
      {
        "id": "C",
        "text": "Tidak menekan tombol apa-apa",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mematikan layar game",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-num-1",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 1,
    "prompt": "BeeBot punya 3 bintang emas ⭐⭐⭐. Kakak memberi lagi 2 bintang ⭐⭐. Berapa total bintang BeeBot sekarang?",
    "visualHint": "⭐⭐⭐ + ⭐⭐ = ?",
    "options": [
      {
        "id": "A",
        "text": "4 bintang",
        "score": 5
      },
      {
        "id": "B",
        "text": "5 bintang",
        "score": 20
      },
      {
        "id": "C",
        "text": "6 bintang",
        "score": 5
      },
      {
        "id": "D",
        "text": "3 bintang",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-num-2",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 2,
    "prompt": "Kotak A berisi 8 kelereng. Kotak B berisi 4 kelereng. Berapa banyak kelereng yang harus dipindahkan dari Kotak A ke Kotak B agar isinya sama banyak?",
    "visualHint": "📦 A (8) | 📦 B (4)",
    "options": [
      {
        "id": "A",
        "text": "1 kelereng",
        "score": 5
      },
      {
        "id": "B",
        "text": "2 kelereng (keduanya jadi 6)",
        "score": 20
      },
      {
        "id": "C",
        "text": "4 kelereng",
        "score": 5
      },
      {
        "id": "D",
        "text": "3 kelereng",
        "score": 10
      }
    ]
  },
  {
    "id": "jr-num-3",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 3,
    "prompt": "Perhatikan timbangan seimbang: 1 Apel 🍎 sama beratnya dengan 2 Stroberi 🍓🍓. Berapa buah stroberi yang dibutuhkan untuk menimbang 3 Apel 🍎🍎🍎?",
    "visualHint": "⚖️ 1 🍎 = 2 🍓",
    "options": [
      {
        "id": "A",
        "text": "3 stroberi",
        "score": 5
      },
      {
        "id": "B",
        "text": "5 stroberi",
        "score": 5
      },
      {
        "id": "C",
        "text": "6 stroberi",
        "score": 20
      },
      {
        "id": "D",
        "text": "4 stroberi",
        "score": 10
      }
    ]
  },
  {
    "id": "jr-num-4",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 4,
    "prompt": "Lihat deret angka ini: 2, 4, 6, 8, ... Angka berapakah yang datang berikutnya?",
    "visualHint": "2 ➜ 4 ➜ 6 ➜ 8 ➜ ❓",
    "options": [
      {
        "id": "A",
        "text": "9",
        "score": 0
      },
      {
        "id": "B",
        "text": "10",
        "score": 20
      },
      {
        "id": "C",
        "text": "12",
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
    "id": "jr-num-5",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 5,
    "prompt": "Ibu memotong 1 pizza menjadi 4 potong sama besar 🍕. Adik memakan 1 potong. Berapa potong pizza yang tersisa di piring?",
    "visualHint": "🍕 (4 potong) - 1 potong",
    "options": [
      {
        "id": "A",
        "text": "3 potong",
        "score": 20
      },
      {
        "id": "B",
        "text": "2 potong",
        "score": 5
      },
      {
        "id": "C",
        "text": "1 potong",
        "score": 0
      },
      {
        "id": "D",
        "text": "5 potong",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-6",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 6,
    "prompt": "Beeby mengumpulkan 3 toples madu di pagi hari 🍯🍯🍯 dan 4 toples madu di sore hari 🍯🍯🍯🍯. Berapa total toples madu Beeby?",
    "visualHint": "3 + 4 = ?",
    "options": [
      {
        "id": "A",
        "text": "7 toples madu",
        "score": 20
      },
      {
        "id": "B",
        "text": "6 toples madu",
        "score": 5
      },
      {
        "id": "C",
        "text": "8 toples madu",
        "score": 5
      },
      {
        "id": "D",
        "text": "12 toples madu",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-7",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 7,
    "prompt": "Sebuah mobil robot memiliki 4 roda 🛞. Jika ada 3 mobil robot di bengkel Beekoding, berapa jumlah seluruh rodanya?",
    "visualHint": "4 + 4 + 4 = ?",
    "options": [
      {
        "id": "A",
        "text": "12 roda (3 x 4 roda)",
        "score": 20
      },
      {
        "id": "B",
        "text": "7 roda",
        "score": 5
      },
      {
        "id": "C",
        "text": "10 roda",
        "score": 5
      },
      {
        "id": "D",
        "text": "16 roda",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-8",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 8,
    "prompt": "Budi memiliki 10 koin bintang ⭐. Budi menukar 3 koin untuk membeli topi koki Beeby. Berapa sisa koin bintang Budi sekarang?",
    "visualHint": "10 - 3 = ?",
    "options": [
      {
        "id": "A",
        "text": "7 koin bintang",
        "score": 20
      },
      {
        "id": "B",
        "text": "6 koin bintang",
        "score": 5
      },
      {
        "id": "C",
        "text": "8 koin bintang",
        "score": 5
      },
      {
        "id": "D",
        "text": "13 koin bintang",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-9",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 9,
    "prompt": "Deret lompatan Beeby pada bunga: 2, 4, 6, 8, ... Berapa angka pada bunga berikutnya?",
    "visualHint": "+2, +2, +2, ...",
    "options": [
      {
        "id": "A",
        "text": "10 (tambah 2 setiap lompatan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "9",
        "score": 5
      },
      {
        "id": "C",
        "text": "12",
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
    "id": "ju-num-10",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 10,
    "prompt": "Di piring ada 8 potong kue biskuit 🍪. Beeby ingin membaginya sama rata kepada Kiki dan Koko (2 orang). Berapa potong yang didapat masing-masing?",
    "visualHint": "8 dibagi 2 teman = ?",
    "options": [
      {
        "id": "A",
        "text": "4 potong kue untuk masing-masing",
        "score": 20
      },
      {
        "id": "B",
        "text": "2 potong kue",
        "score": 5
      },
      {
        "id": "C",
        "text": "6 potong kue",
        "score": 5
      },
      {
        "id": "D",
        "text": "8 potong kue untuk satu orang saja",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-11",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 11,
    "prompt": "Sebuah lift mulai bergerak dari Lantai 1 🏢. Lift naik 3 lantai, lalu turun 1 lantai. Di lantai berapakah lift sekarang?",
    "visualHint": "Lantai 1 ➡️ (+3) ➡️ (-1) = ?",
    "options": [
      {
        "id": "A",
        "text": "Lantai 3",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lantai 4",
        "score": 5
      },
      {
        "id": "C",
        "text": "Lantai 2",
        "score": 5
      },
      {
        "id": "D",
        "text": "Lantai 5",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-12",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 12,
    "prompt": "Koin Emas bernilai 5 poin 🪙. Koin Perak bernilai 2 poin 🥈. Jika Beeby punya 1 koin emas dan 2 koin perak, berapa total skornya?",
    "visualHint": "5 + 2 + 2 = ?",
    "options": [
      {
        "id": "A",
        "text": "9 poin",
        "score": 20
      },
      {
        "id": "B",
        "text": "7 poin",
        "score": 5
      },
      {
        "id": "C",
        "text": "10 poin",
        "score": 5
      },
      {
        "id": "D",
        "text": "4 poin",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-13",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 13,
    "prompt": "Pilihan mana yang memiliki jumlah permen paling banyak? 🍬",
    "visualHint": "📦 Paket A (2 kantong @ 5 permen) vs 📦 Paket B (1 kantong 9 permen)",
    "options": [
      {
        "id": "A",
        "text": "Paket A (2 kantong masing-masing 5 permen = 10 permen)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Paket B (1 kantong berisi 9 permen)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Keduanya sama persis",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada yang punya permen",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-14",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 14,
    "prompt": "Jam dinding menunjukkan pukul 03.00 sore 🕒. Kelas coding robotik dimulai 2 jam lagi. Pukul berapakah kelas dimulai?",
    "visualHint": "03.00 + 2 jam = ?",
    "options": [
      {
        "id": "A",
        "text": "Pukul 05.00 sore",
        "score": 20
      },
      {
        "id": "B",
        "text": "Pukul 04.00 sore",
        "score": 5
      },
      {
        "id": "C",
        "text": "Pukul 06.00 sore",
        "score": 5
      },
      {
        "id": "D",
        "text": "Pukul 01.00 siang",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-num-15",
    "tier": "junior",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 15,
    "prompt": "Hitung mundur roket Beeby: 10, 9, 8, 7, [ ? ], 5, 4, 3, 2, 1, 🚀 BLAST OFF! Angka apakah yang hilang?",
    "visualHint": "10, 9, 8, 7, ..., 5",
    "options": [
      {
        "id": "A",
        "text": "Angka 6",
        "score": 20
      },
      {
        "id": "B",
        "text": "Angka 0",
        "score": 0
      },
      {
        "id": "C",
        "text": "Angka 4",
        "score": 5
      },
      {
        "id": "D",
        "text": "Angka 11",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-spa-1",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 1,
    "prompt": "Jika anak panah ⬆️ diputar ke arah kanan sekali (searah jarum jam), anak panah akan menunjuk ke arah mana?",
    "visualHint": "⬆️ ↻ (Putar ke kanan)",
    "options": [
      {
        "id": "A",
        "text": "➡️ (Menunjuk ke Kanan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "⬇️ (Menunjuk ke Bawah)",
        "score": 5
      },
      {
        "id": "C",
        "text": "⬅️ (Menunjuk ke Kiri)",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tetap ke atas",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-spa-2",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 2,
    "prompt": "Sebuah balok kubus memiliki sisi berwarna: Atas Kuning 🟨, Bawah Hitam ⬛. Jika kubus dibalik sehingga sisi bawah menjadi di atas, warna apa yang ada di atas?",
    "visualHint": "🟨 (Atas) / ⬛ (Bawah) ➔ Dibalik 🔄",
    "options": [
      {
        "id": "A",
        "text": "Hitam ⬛",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kuning 🟨",
        "score": 0
      },
      {
        "id": "C",
        "text": "Biru 🟦",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hijau 🟩",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-spa-3",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 3,
    "prompt": "Ada 3 balok ditumpuk ke atas: Balok Merah paling bawah, Balok Hijau di tengah, Balok Biru paling atas. Balok warna apa yang harus dipindahkan pertama kali jika ingin membongkar tumpukan dari atas?",
    "visualHint": "🟦 (Atas)\n🟩 (Tengah)\n🟥 (Bawah)",
    "options": [
      {
        "id": "A",
        "text": "Balok Biru 🟦",
        "score": 20
      },
      {
        "id": "B",
        "text": "Balok Merah 🟥",
        "score": 0
      },
      {
        "id": "C",
        "text": "Balok Hijau 🟩",
        "score": 5
      },
      {
        "id": "D",
        "text": "Semua balok sekaligus",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-spa-4",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 4,
    "prompt": "Bentuk cermin dari tangan kiri yang membuka telapak tangan ke arah cermin akan tampak seperti...?",
    "visualHint": "✋ | 🪞 | 🤚",
    "options": [
      {
        "id": "A",
        "text": "Tangan kanan yang membuka ke arah kita",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kaki kiri",
        "score": 0
      },
      {
        "id": "C",
        "text": "Tangan kiri terbalik ke bawah",
        "score": 5
      },
      {
        "id": "D",
        "text": "Bentuk bola",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-spa-5",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 5,
    "prompt": "Robot Lebah berada di kotak (1,1). Ia maju 2 langkah ke kanan ➡️ dan 1 langkah ke atas ⬆️. Di manakah posisinya sekarang?",
    "visualHint": "🗺️ Grid: [Mulai di 1,1] ➔ 2 langkah Kanan ➔ 1 langkah Atas",
    "options": [
      {
        "id": "A",
        "text": "Kotak (3, 2)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kotak (1, 3)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kotak (2, 2)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Kotak (4, 1)",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-6",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 6,
    "prompt": "Robot Beeby menghadap ke arah UTARA ⬆️. Jika Beeby berputar ke arah KANAN 90 derajat, ke arah manakah Beeby sekarang menghadap?",
    "visualHint": "⬆️ ➡️ Putar Kanan 90°",
    "options": [
      {
        "id": "A",
        "text": "Menghadap ke arah TIMUR (Kanan ➡️)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghadap ke arah SELATAN (Bawah ⬇️)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menghadap ke arah BARAT (Kiri ⬅️)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tetap menghadap ke Utara",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-7",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 7,
    "prompt": "Labirin Kotak: Dari titik START, robot harus jalan 2 langkah ke DEPAN, lalu 1 langkah ke KIRI untuk mengambil madu 🍯. Rute mana yang tepat?",
    "visualHint": "🏁 ⬆️ ⬆️ ⬅️ 🍯",
    "options": [
      {
        "id": "A",
        "text": "Maju 2 langkah ➡️ Belok Kiri 1 langkah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mundur 2 langkah ➡️ Belok Kanan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Maju 1 langkah ➡️ Putar Balik",
        "score": 5
      },
      {
        "id": "D",
        "text": "Belok Kiri 3 langkah",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-8",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 8,
    "prompt": "Jika dua segitiga siku-siku sama besar 📐 + 📐 digabungkan pada sisi miringnya, bentuk bangun datar apa yang terbentuk?",
    "visualHint": "📐 + 📐 = ?",
    "options": [
      {
        "id": "A",
        "text": "Persegi panjang atau persegi (bujur sangkar)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lingkaran bulat sempurna",
        "score": 0
      },
      {
        "id": "C",
        "text": "Bintang lima sudut",
        "score": 0
      },
      {
        "id": "D",
        "text": "Garis lurus saja",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-9",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 9,
    "prompt": "Beeby melihat huruf \"L\" di depan cermin datar 🪞. Bagaimana bentuk pantulan bayangan huruf L di cermin?",
    "visualHint": "L | 🪞 | ?",
    "options": [
      {
        "id": "A",
        "text": "Huruf L terbalik menghadap ke arah kiri (simetri cermin)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Huruf O bulat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Huruf L terbalik ke bawah menjadi angka 7",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hurufnya hilang tidak terlihat di cermin",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-10",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 10,
    "prompt": "Susunan Balok: 3 balok ditumpuk tegak ke atas, lalu 1 balok diletakkan di samping kanan balok paling bawah 🧱. Mirip seperti huruf apa bentuknya?",
    "visualHint": "🧱🧱🧱 + 🧱 di kanan bawah",
    "options": [
      {
        "id": "A",
        "text": "Mirip huruf L",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mirip huruf O",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mirip huruf X",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mirip huruf H",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-spa-11",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 11,
    "prompt": "Kertas persegi dilipat dua dari kiri ke kanan 📄. Bagian tengah lipatan dilubangi satu lingkaran dengan pembolong kertas ⭕. Saat kertas dibuka kembali, ada berapa lubang?",
    "visualHint": "📄 Lipat dua ➡️ ⭕ Lubang ➡️ Buka kembali",
    "options": [
      {
        "id": "A",
        "text": "2 lubang lingkaran simetris",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya 1 lubang",
        "score": 5
      },
      {
        "id": "C",
        "text": "4 lubang",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada lubang sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-12",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 12,
    "prompt": "Roda Gigi A berputar searah jarum jam ⚙️➡️. Roda Gigi B menempel rapat di samping Roda Gigi A. Ke arah manakah Roda Gigi B berputar?",
    "visualHint": "⚙️(A: Searah Jarum Jam) 🔄 ⚙️(B: ?)",
    "options": [
      {
        "id": "A",
        "text": "Berlawanan arah jarum jam ⚙️⬅️",
        "score": 20
      },
      {
        "id": "B",
        "text": "Searah jarum jam juga",
        "score": 5
      },
      {
        "id": "C",
        "text": "Roda Gigi B diam tidak berputar",
        "score": 0
      },
      {
        "id": "D",
        "text": "Maju mundur seperti ayunan",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-13",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 13,
    "prompt": "Jika kamu melihat mobil dari atas helikopter di udara 🚁🚗, bagian mobil manakah yang paling terlihat jelas?",
    "visualHint": "🚁 Pandangan Mata Burung (Top-Down)",
    "options": [
      {
        "id": "A",
        "text": "Atap mobil dan kaca depan-belakang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Roda mobil bagian bawah",
        "score": 0
      },
      {
        "id": "C",
        "text": "Lampu sein bagian bawah",
        "score": 5
      },
      {
        "id": "D",
        "text": "Knalpot di bawah mesin",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-14",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 14,
    "prompt": "Beeby berdiri menghadap cermin dan mengangkat tangan KANANNYA ✋. Di cermin, bayangan Beeby tampak mengangkat tangan yang berada di sisi sebelah mana bagi kita?",
    "visualHint": "🧑✋ 🪞 🪞✋",
    "options": [
      {
        "id": "A",
        "text": "Tampak di sisi kiri pandangan kita karena pembalikan cermin",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tampak di atas kepala",
        "score": 0
      },
      {
        "id": "C",
        "text": "Tampak di sisi kanan kita",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tangan bayangan tidak bergerak",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-spa-15",
    "tier": "junior",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 15,
    "prompt": "Pola sarang lebah tempat tinggal Beeby terbuat dari bentuk bangun datar bersisi enam ⬡. Disebut apakah bangun datar bersisi enam tersebut?",
    "visualHint": "⬡ 6 Sisi Sama Panjang",
    "options": [
      {
        "id": "A",
        "text": "Segienam (Heksagon)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Segitiga (3 sisi)",
        "score": 0
      },
      {
        "id": "C",
        "text": "Segiempat (4 sisi)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Lingkaran tanpa sudut",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-pat-1",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 1,
    "prompt": "Perhatikan pola buah berikut: 🍎 🍌 🍎 🍌 🍎 ... Buah apakah selanjutnya?",
    "visualHint": "🍎 🍌 🍎 🍌 🍎 ❓",
    "options": [
      {
        "id": "A",
        "text": "Pisang 🍌",
        "score": 20
      },
      {
        "id": "B",
        "text": "Apel 🍎",
        "score": 0
      },
      {
        "id": "C",
        "text": "Jeruk 🍊",
        "score": 0
      },
      {
        "id": "D",
        "text": "Semangka 🍉",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-pat-2",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 2,
    "prompt": "Lihat pola bentuk ini: ⚪ ⬛ ⚪ ⬛ ⚪ ... Bentuk apakah berikutnya?",
    "visualHint": "⚪ ⬛ ⚪ ⬛ ⚪ ❓",
    "options": [
      {
        "id": "A",
        "text": "Kotak Hitam ⬛",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lingkaran Putih ⚪",
        "score": 0
      },
      {
        "id": "C",
        "text": "Segitiga 🔺",
        "score": 0
      },
      {
        "id": "D",
        "text": "Bintang ⭐",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-pat-3",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 3,
    "prompt": "Pola ukuran balok: Kecil ▫️, Sedang ◽, Besar ◻️, Kecil ▫️, Sedang ◽, ... Apa selanjutnya?",
    "visualHint": "▫️ ◽ ◻️ ▫️ ◽ ❓",
    "options": [
      {
        "id": "A",
        "text": "Besar ◻️",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kecil ▫️",
        "score": 5
      },
      {
        "id": "C",
        "text": "Sedang ◽",
        "score": 0
      },
      {
        "id": "D",
        "text": "Sangat Kecil",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-pat-4",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 4,
    "prompt": "Manakah dari benda-benda ini yang TIDAK COCOK dengan kelompoknya? (Kucing 🐱, Anjing 🐶, Kelinci 🐰, Mobil 🚗)",
    "visualHint": "🐱 🐶 🐰 🚗",
    "options": [
      {
        "id": "A",
        "text": "Mobil 🚗 (karena mobil adalah kendaraan, bukan hewan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kelinci 🐰",
        "score": 0
      },
      {
        "id": "C",
        "text": "Kucing 🐱",
        "score": 0
      },
      {
        "id": "D",
        "text": "Semuanya sama saja",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-pat-5",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 5,
    "prompt": "Perhatikan lompatan katak: Lompat ke batu 1, lalu 3, lalu 5. Batu nomor berapakah tempat katak mendarat berikutnya?",
    "visualHint": "🐸 1 ➔ 3 ➔ 5 ➔ ❓",
    "options": [
      {
        "id": "A",
        "text": "Batu nomor 7 (selalu loncat melewati 1 angka)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Batu nomor 6",
        "score": 5
      },
      {
        "id": "C",
        "text": "Batu nomor 8",
        "score": 0
      },
      {
        "id": "D",
        "text": "Batu nomor 4",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-6",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 6,
    "prompt": "Pola Warna Lampu: Merah 🔴, Kuning 🟡, Hijau 🟢, Merah 🔴, Kuning 🟡, [ ? ]. Warna apakah berikutnya?",
    "visualHint": "🔴, 🟡, 🟢, 🔴, 🟡, ...",
    "options": [
      {
        "id": "A",
        "text": "Hijau 🟢 (melengkapi siklus 3 warna)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hitam ⚫",
        "score": 0
      },
      {
        "id": "C",
        "text": "Merah 🔴",
        "score": 5
      },
      {
        "id": "D",
        "text": "Biru 🔵",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pat-7",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 7,
    "prompt": "Pola Buah: 🍎 🍌 🍌 🍎 🍌 🍌 🍎 🍌 [ ? ]. Buah apakah yang tepat melengkapi pola?",
    "visualHint": "1 Apel, 2 Pisang, 1 Apel, 2 Pisang...",
    "options": [
      {
        "id": "A",
        "text": "🍌 Pisang (karena pisang berpasangan dua kali)",
        "score": 20
      },
      {
        "id": "B",
        "text": "🍎 Apel",
        "score": 5
      },
      {
        "id": "C",
        "text": "🍇 Anggur",
        "score": 0
      },
      {
        "id": "D",
        "text": "🍉 Semangka",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-8",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 8,
    "prompt": "Pola Ukuran: Kecil ⏺️, Sedang 🟣, Besar 🔴, Kecil ⏺️, Sedang 🟣, [ ? ]. Ukuran apakah selanjutnya?",
    "visualHint": "Kecil ➡️ Sedang ➡️ Besar ➡️ ...",
    "options": [
      {
        "id": "A",
        "text": "Besar 🔴",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kecil ⏺️",
        "score": 5
      },
      {
        "id": "C",
        "text": "Sangat Kecil",
        "score": 0
      },
      {
        "id": "D",
        "text": "Sedang 🟣",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pat-9",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 9,
    "prompt": "Deret Bangun Datar: Segitiga (3 sisi) 🔺, Persegi (4 sisi) ⏹️, Segilima (5 sisi) ⬟, [ ? ]. Bangun apakah berikutnya?",
    "visualHint": "3 sisi, 4 sisi, 5 sisi, ...",
    "options": [
      {
        "id": "A",
        "text": "Segienam (6 sisi)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Lingkaran (0 sisi)",
        "score": 0
      },
      {
        "id": "C",
        "text": "Garis lurus (1 sisi)",
        "score": 0
      },
      {
        "id": "D",
        "text": "Segitiga kembali (3 sisi)",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pat-10",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 10,
    "prompt": "Ritme Ketukan Musik Robot: Prok-Prok-Plak 👏 👏 💥, Prok-Prok-Plak 👏 👏 💥, Prok-Prok-[ ? ]. Ketukan penutupnya adalah?",
    "visualHint": "👏 👏 💥 | 👏 👏 💥 | 👏 👏 ?",
    "options": [
      {
        "id": "A",
        "text": "Plak 💥 (pukulan ketiga selalu Plak)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Prok 👏",
        "score": 5
      },
      {
        "id": "C",
        "text": "Hening diam",
        "score": 0
      },
      {
        "id": "D",
        "text": "Suitan peluit",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pat-11",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 11,
    "prompt": "Pola Arah Panah: ⬆️ Atas, ➡️ Kanan, ⬇️ Bawah, ⬅️ Kiri, ⬆️ Atas, ➡️ Kanan, [ ? ]. Ke manakah arah panah berikutnya?",
    "visualHint": "Berputar searah jarum jam: ⬆️ ➡️ ⬇️ ⬅️",
    "options": [
      {
        "id": "A",
        "text": "⬇️ Bawah",
        "score": 20
      },
      {
        "id": "B",
        "text": "⬅️ Kiri",
        "score": 5
      },
      {
        "id": "C",
        "text": "⬆️ Atas",
        "score": 5
      },
      {
        "id": "D",
        "text": "↖️ Serong kiri",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-12",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 12,
    "prompt": "Matriks Pasangan: Siang berpasangan dengan Matahari ☀️. Malam berpasangan dengan Bulan 🌙. Hujan berpasangan dengan [ ? ].",
    "visualHint": "☀️ Siang | 🌙 Malam | 🌧️ ?",
    "options": [
      {
        "id": "A",
        "text": "Awan mendung & Payung / Pelangi 🌈",
        "score": 20
      },
      {
        "id": "B",
        "text": "Es krim cokelat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Lampu lalu lintas",
        "score": 0
      },
      {
        "id": "D",
        "text": "Sepeda motor",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-13",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 13,
    "prompt": "Pola Bilangan Ganjil: 1 biji madu, 3 biji madu, 5 biji madu, [ ? ]. Berapa jumlah biji madu berikutnya?",
    "visualHint": "1, 3, 5, ... (+2)",
    "options": [
      {
        "id": "A",
        "text": "7 biji madu",
        "score": 20
      },
      {
        "id": "B",
        "text": "6 biji madu",
        "score": 5
      },
      {
        "id": "C",
        "text": "9 biji madu",
        "score": 5
      },
      {
        "id": "D",
        "text": "4 biji madu",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-14",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 14,
    "prompt": "Pola Huruf Kode: A, B, C, A, B, C, A, B, [ ? ]. Huruf apakah yang harus diketik Beeby selanjutnya?",
    "visualHint": "ABC ABC AB...",
    "options": [
      {
        "id": "A",
        "text": "Huruf C",
        "score": 20
      },
      {
        "id": "B",
        "text": "Huruf A",
        "score": 5
      },
      {
        "id": "C",
        "text": "Huruf D",
        "score": 0
      },
      {
        "id": "D",
        "text": "Huruf Z",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pat-15",
    "tier": "junior",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 15,
    "prompt": "Pola Bunga di Taman: Mawar Merah 🌹, Melati Putih 💮, Mawar Merah 🌹, Melati Putih 💮, [ ? ]. Bunga apakah berikutnya?",
    "visualHint": "🌹 💮 🌹 💮 ...",
    "options": [
      {
        "id": "A",
        "text": "Mawar Merah 🌹",
        "score": 20
      },
      {
        "id": "B",
        "text": "Bunga Bangkai",
        "score": 0
      },
      {
        "id": "C",
        "text": "Melati Putih 💮",
        "score": 5
      },
      {
        "id": "D",
        "text": "Kaktus berduri",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-cre-1",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 1,
    "prompt": "Kamu punya kardus bekas berukuran besar 📦 di rumah. Apa hal paling seru yang terpikir untuk kamu buat dengannya?",
    "visualHint": "📦 ✨ 🚀",
    "options": [
      {
        "id": "A",
        "text": "Membuat pesawat ruang angkasa atau istana robot rahasia!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membuat kotak penyimpanan mainan bergambar",
        "score": 15
      },
      {
        "id": "C",
        "text": "Membiarkannya di pojok ruangan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuangnya langsung ke tempat sampah",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-cre-2",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 2,
    "prompt": "Jika kamu membuat game petualangan sendiri, karakter utama apa yang ingin kamu ciptakan?",
    "visualHint": "🎮 🎨 👾",
    "options": [
      {
        "id": "A",
        "text": "Karakter unik ciptaanku (misal lebah yang bisa menembakkan madu pelangi)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Karakter superhero yang sudah terkenal di TV",
        "score": 12
      },
      {
        "id": "C",
        "text": "Orang biasa yang hanya berjalan kaki",
        "score": 8
      },
      {
        "id": "D",
        "text": "Belum tahu, meniru game yang sudah ada saja",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-cre-3",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 3,
    "prompt": "Ketika sedang menggambar pohon, cat warna hijau daunmu habis 🎨. Apa yang akan kamu lakukan?",
    "visualHint": "🖌️ 🚫🟩 ➜ 💡?",
    "options": [
      {
        "id": "A",
        "text": "Mencampur cat warna kuning dan biru untuk membuat warna hijau!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menggambar pohon ajaib musim gugur dengan warna oranye atau ungu",
        "score": 18
      },
      {
        "id": "C",
        "text": "Menunggu dibelikan cat baru sebelum melanjutkan",
        "score": 8
      },
      {
        "id": "D",
        "text": "Berhenti menggambar dan merobek kertasnya",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-cre-4",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 4,
    "prompt": "Bagaimana caramu membantu kucing kecil yang terjebak di atas dahan pohon rendah?",
    "visualHint": "🐱 🌳 🪜",
    "options": [
      {
        "id": "A",
        "text": "Menaruh kardus empuk di bawah, memanggilnya dengan makanan kesukaannya, atau minta bantuan orang dewasa",
        "score": 20
      },
      {
        "id": "B",
        "text": "Melempar batu ke atas pohon",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berteriak sekencang-kencangnya agar kucing takut",
        "score": 0
      },
      {
        "id": "D",
        "text": "Meninggalkannya begitu saja",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-cre-5",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 5,
    "prompt": "Jika kamu bisa menambahkan 1 tombol ajaib di keyboard komputermu, tombol apa yang ingin kamu ciptakan?",
    "visualHint": "⌨️ 🔘 ✨",
    "options": [
      {
        "id": "A",
        "text": "Tombol untuk otomatis mengubah imajinasi gambarku menjadi animasi bergerak!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tombol pembuat kue cokelat hangat otomatis",
        "score": 15
      },
      {
        "id": "C",
        "text": "Tombol suara musik ceria saat belajar",
        "score": 12
      },
      {
        "id": "D",
        "text": "Tidak butuh tombol apa pun lagi",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-cre-6",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 6,
    "prompt": "Beeby punya kotak kardus bekas berukuran besar 📦. Selain untuk tempat barang, ide kreasi apa yang paling seru dimainkan?",
    "visualHint": "📦 Kardus Bekas ➡️ Kreasi Kreatif",
    "options": [
      {
        "id": "A",
        "text": "Dibuat jadi istana robot atau pesawat luar angkasa dengan tombol stiker",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung dibuang ke tempat sampah tanpa dipikirkan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Didiamkan saja berdebu di sudut kamar",
        "score": 0
      },
      {
        "id": "D",
        "text": "Disobek-sobek jadi potongan kecil",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-cre-7",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 7,
    "prompt": "Kamu diminta mendesain karakter monster game yang ramah dan disukai anak-anak 👾. Ciri visual apa yang paling cocok?",
    "visualHint": "👾 Karakter Sahabat Anak",
    "options": [
      {
        "id": "A",
        "text": "Warna cerah ceria, mata bulat besar, dan tersenyum ramah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Taring tajam berdarah dan mata merah menyeramkan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Warna abu-abu gelap tanpa ekspresi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Bentuk kotak polos tanpa muka sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-cre-8",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 8,
    "prompt": "Jika kamu bisa merakit robot pembantu impian di rumah 🤖, kemampuan unik apa yang paling menyenangkan?",
    "visualHint": "🤖 Robot Impian",
    "options": [
      {
        "id": "A",
        "text": "Bisa merapikan mainan sambil memutar lagu riang dan bercerita dongeng",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya bisa diam di pojok seperti patung batu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya membunyikan alarm keras yang memekakkan telinga",
        "score": 0
      },
      {
        "id": "D",
        "text": "Bisa berjalan lurus menabrak pintu",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-cre-9",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 9,
    "prompt": "Beeby kehabisan cat warna hijau untuk mewarnai daun 🎨. Apa yang bisa dicampur dari warna cat yang ada?",
    "visualHint": "🔵 Biru + 🟡 Kuning = ?",
    "options": [
      {
        "id": "A",
        "text": "Mencampur warna Biru dan Kuning untuk menghasilkan warna Hijau",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menangis dan berhenti menggambar",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mencampur warna Hitam dan Putih",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mencampur air putih dengan pasir",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-cre-10",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 10,
    "prompt": "Dalam sebuah video game balapan 🏎️, selain mobil biasa, kendaraan imajinasi apa yang paling keren dikemudikan Beeby?",
    "visualHint": "🏎️ Kendaraan Fantasi",
    "options": [
      {
        "id": "A",
        "text": "Sepatu roket bertenaga madu yang bisa meluncur dan melompat di atas awan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Gerobak dorong rusak tanpa roda",
        "score": 0
      },
      {
        "id": "C",
        "text": "Sepeda yang bannya kempes",
        "score": 5
      },
      {
        "id": "D",
        "text": "Batu kali yang didorong manual",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-cre-11",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 11,
    "prompt": "Bagaimana caramu mengirim pesan rahasia kepada sahabat karibmu agar tidak bisa dibaca orang lain? 📜",
    "visualHint": "📜 Pesan Rahasia Coder",
    "options": [
      {
        "id": "A",
        "text": "Mengganti setiap huruf dengan simbol emoji atau angka yang hanya dipahami berdua",
        "score": 20
      },
      {
        "id": "B",
        "text": "Berteriak kencang di depan banyak orang",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menulis di papan pengumuman sekolah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membuang kertasnya ke selokan",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-cre-12",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 12,
    "prompt": "Di game petualangan hutan ajaib buatanmu 🌲, kejutan rahasia apa yang ingin kamu sembunyikan di balik air terjun?",
    "visualHint": "🌊 Air Terjun Misterius",
    "options": [
      {
        "id": "A",
        "text": "Sebuah gua kristal bercahaya dengan peti misteri berisi kacamata masa depan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tembok semen polos yang buntu",
        "score": 5
      },
      {
        "id": "C",
        "text": "Layar game over langsung kalah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada apa-apa",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-cre-13",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 13,
    "prompt": "Efek suara apa yang paling pas saat roket Beeby berhasil mendarat mulus di permukaan planet Mars? 🚀🔴",
    "visualHint": "🚀 Mars Landing Sound",
    "options": [
      {
        "id": "A",
        "text": "Suara lonceng kemenangan \"Ting-ting!\" diiringi gemuruh kembang api riang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Suara tangisan orang sedih",
        "score": 0
      },
      {
        "id": "C",
        "text": "Suara klakson mobil macet",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hening senyap seperti mati lampu",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-cre-14",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 14,
    "prompt": "Jika kamu bisa memberi kemampuan super pada tas sekolahmu 🎒✨, kemampuan apa yang paling kamu impikan?",
    "visualHint": "🎒 Tas Super Cerdas",
    "options": [
      {
        "id": "A",
        "text": "Bisa merapikan buku sendiri dan menjadi ringan saat digendong ke sekolah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menjadi semakin berat seperti batu gunung",
        "score": 0
      },
      {
        "id": "C",
        "text": "Bisa robek otomatis saat kena angin",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengubah semua buku menjadi kertas kosong",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-cre-15",
    "tier": "junior",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 15,
    "prompt": "Cara kreatif apa yang bisa kamu pakai untuk bermain seru di kamar bersama teman saat mati lampu? 🔦",
    "visualHint": "🔦 Lampu Senter & Kegelapan",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan lampu senter untuk membuat atraksi wayang bayangan tangan kelinci di dinding",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menangis ketakutan di bawah selimut",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berteriak-teriak sampai tenggorokan serak",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidur tanpa bicara sepatah kata pun",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-ps-1",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 1,
    "prompt": "Robot BeeBot ingin mengambil madu di seberang sungai 🍯. Ada jembatan kayu yang licin. Apa langkah paling aman untuk BeeBot?",
    "visualHint": "🤖 🌊 🌉 🍯",
    "options": [
      {
        "id": "A",
        "text": "Berjalan perlahan, memeriksa setiap pijakan kayu satu per satu",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung berlari kencang sambil memejamkan mata",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menceburkan diri ke air sungai yang dalam",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menunggu sampai air sungainya kering",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-ps-2",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 2,
    "prompt": "Urutan memakai sepatu yang benar adalah: 1. Ikat tali sepatu, 2. Pasang kaus kaki, 3. Masukkan kaki ke sepatu. Urutan mana yang tepat?",
    "visualHint": "🧦 ➜ 👟 ➜ 🎀",
    "options": [
      {
        "id": "A",
        "text": "2 ➜ 3 ➜ 1 (Kaus kaki ➔ Sepatu ➔ Ikat tali)",
        "score": 20
      },
      {
        "id": "B",
        "text": "1 ➜ 2 ➜ 3",
        "score": 0
      },
      {
        "id": "C",
        "text": "3 ➜ 1 ➜ 2",
        "score": 5
      },
      {
        "id": "D",
        "text": "2 ➜ 1 ➜ 3",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-ps-3",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 3,
    "prompt": "Kamu sedang merakit balok Lego, tapi ada 1 potongan kunci yang hilang. Apa yang kamu lakukan pertama kali?",
    "visualHint": "🧱 🔍 💡",
    "options": [
      {
        "id": "A",
        "text": "Mencari di sekitar lantai meja, atau mencoba menggantinya dengan 2 balok kecil yang ukurannya setara",
        "score": 20
      },
      {
        "id": "B",
        "text": "Marah dan menghancurkan semua Lego yang sudah terpasang",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menangis dan tidak mau main lagi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menunggu sampai besok",
        "score": 5
      }
    ]
  },
  {
    "id": "jr-ps-4",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 4,
    "prompt": "Untuk membuka peti harta karun dibutuhkan 2 anak kunci: Kunci Emas 🔑 dan Kunci Perak 🗝️. BeeBot sudah punya Kunci Emas. Apa yang harus dicari BeeBot selanjutnya?",
    "visualHint": "🗝️ 🔑 🔒 🏆",
    "options": [
      {
        "id": "A",
        "text": "Mencari Kunci Perak 🗝️",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mencari kunci emas lagi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memaksa membuka tanpa kunci kedua",
        "score": 5
      },
      {
        "id": "D",
        "text": "Meninggalkan peti",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-ps-5",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 5,
    "prompt": "Jalur ke rumah nenek: Jika belok Kiri ada jalan berlubang 🕳️. Jika belok Kanan ada jalan aspal mulus 🛣️. Jalur mana yang sebaiknya dipilih sepeda BeeBot?",
    "visualHint": "🚲 ➜ [⬅️ 🕳️] atau [➡️ 🛣️] ?",
    "options": [
      {
        "id": "A",
        "text": "Belok Kanan ke jalan aspal mulus",
        "score": 20
      },
      {
        "id": "B",
        "text": "Belok Kiri ke jalan berlubang",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berhenti di tengah jalan selamanya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mundur pulang ke rumah",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pro-6",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 6,
    "prompt": "BeeBot terhalang pagar kayu saat ingin pulang ke sarang 🚧. Di dekatnya ada tangga lipat, tali tambang, dan ember air. Cara paling aman melewati pagar adalah?",
    "visualHint": "🤖 🚧 🪜",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan tangga lipat secara hati-hati untuk menyeberangi pagar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menabrakkan diri sekuat tenaga ke pagar kayu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyiram pagar dengan air dari ember",
        "score": 5
      },
      {
        "id": "D",
        "text": "Duduk diam menunggu pagar hilang sendiri",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-7",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 7,
    "prompt": "Aplikasi game di tablet tiba-tiba macet (layar beku tidak bergerak). Tindakan pertama apa yang paling cerdas dilakukan?",
    "visualHint": "📱 Layar Freeze / Macet",
    "options": [
      {
        "id": "A",
        "text": "Menutup aplikasi lalu membukanya kembali (restart app)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membanting tablet ke lantai",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengetuk layar keras-keras dengan batu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menangis tersedu-sedu",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-8",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 8,
    "prompt": "Beeby ingin mengantar madu ke 3 rumah: Rumah A (dekat), Rumah B (sangat jauh), Rumah C (jarak sedang). Rute mana yang paling hemat tenaga?",
    "visualHint": "🏠 A (Dekat) | 🏠 C (Sedang) | 🏠 B (Jauh)",
    "options": [
      {
        "id": "A",
        "text": "Kunjungi Rumah A dahulu ➡️ Rumah C ➡️ baru ke Rumah B yang terjauh",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung ke Rumah B ➡️ Rumah A ➡️ Rumah B lagi",
        "score": 5
      },
      {
        "id": "C",
        "text": "Bolak-balik tanpa membawa madu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak jadi mengantar madu",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-9",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 9,
    "prompt": "Segelas air tumpah mengenai meja tempat kamu sedang mewarnai gambar 🥛💦. Langkah awal penyelamatan tercepat adalah?",
    "visualHint": "🥛💦 Meja Gambar Basah",
    "options": [
      {
        "id": "A",
        "text": "Segera pindahkan kertas gambar ke tempat kering lalu lap meja dengan kain",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menambah tumpahan air lagi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Meniup air dengan mulut perlahan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tinggalkan meja dan pergi bermain game",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-10",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 10,
    "prompt": "Robot pembersih lantai menabrak kaki meja berkali-kali dan berputar-putar di tempat 🧹🤖. Apa penyebab yang paling mungkin?",
    "visualHint": "🤖 Sensor Terhalang / Roda Macet",
    "options": [
      {
        "id": "A",
        "text": "Sensor depan robot kotor terhalang debu atau ada benang tersangkut di rodanya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Robot sedang menari gembira",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kaki meja berpindah-pindah sendiri",
        "score": 0
      },
      {
        "id": "D",
        "text": "Lantai rumah terlalu bersih",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-11",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 11,
    "prompt": "Beeby menyusun menara balok lego tapi selalu miring dan roboh saat balok ke-5 dipasang 🗼. Bagian mana yang harus diperbaiki?",
    "visualHint": "🗼 Pondasi Lebar vs Pondasi Sempit",
    "options": [
      {
        "id": "A",
        "text": "Membuat pondasi balok paling bawah lebih lebar dan kokoh",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyusunnya lebih cepat agar tidak sempat roboh",
        "score": 5
      },
      {
        "id": "C",
        "text": "Memakai balok yang basah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Melempar semua balok ke kasur",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-12",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 12,
    "prompt": "Mobil-mobilan favoritmu hilang di dalam kamar tidur 🚗. Cara mencari mana yang paling rapi dan cepat membuahkan hasil?",
    "visualHint": "🔍 Pencarian Sistematis vs Acak",
    "options": [
      {
        "id": "A",
        "text": "Mencari secara teratur sudut demi sudut (kolong kasur, lemari, rak mainan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengacak-acak semua sprei dan pakaian ke lantai",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mencari di dalam kulkas dapur",
        "score": 5
      },
      {
        "id": "D",
        "text": "Duduk menunggu mainan berjalan sendiri ke tanganmu",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-13",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 13,
    "prompt": "Temanmu tidak sengaja mencoret halaman buku gambarmu dengan krayon hitam 🖍️. Solusi kreatif & damai apa yang bisa kamu ambil?",
    "visualHint": "🖍️ Coretan ➡️ Karya Baru",
    "options": [
      {
        "id": "A",
        "text": "Mengubah coretan krayon hitam tersebut menjadi gambar pemandangan malam atau siluet hewan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membalas mencoret baju temanmu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Merobek seluruh buku gambar",
        "score": 0
      },
      {
        "id": "D",
        "text": "Memusuhi temanmu selamanya",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-pro-14",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 14,
    "prompt": "Lampu senter tidak mau menyala meskipun baterainya baru saja dipasang 🔦. Apa yang perlu dicek terlebih dahulu?",
    "visualHint": "🔋 Kutub Positif (+) & Negatif (-)",
    "options": [
      {
        "id": "A",
        "text": "Mengecek apakah posisi kutub positif (+) dan negatif (-) baterai terpasang terbalik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merendam lampu senter di ember air",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengguncang senter sekuat tenaga sampai pecah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menjemur senter di bawah terik matahari",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-pro-15",
    "tier": "junior",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 15,
    "prompt": "Hujan deras turun saat kamu dan temanmu hanya membawa 1 payung kecil untuk berdua ☔. Bagaimana solusinya?",
    "visualHint": "☔ 1 Payung untuk 2 Teman",
    "options": [
      {
        "id": "A",
        "text": "Berjalan berdekatan rapat di bawah payung atau mencari tempat berteduh bersama",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merebut payung dan lari meninggalkan teman",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membuang payung dan hujan-hujanan sampai basah kuyup",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuka payung terbalik",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-lan-1",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 1,
    "prompt": "Guru memberi instruksi: \"Ambil buku gambarmu, letakkan di atas meja, lalu siapkan pensil warna.\" Manakah urutan yang sesuai instruksi guru?",
    "visualHint": "📖 ➜ 🪵 ➜ ✏️",
    "options": [
      {
        "id": "A",
        "text": "Ambil buku ➔ Taruh di meja ➔ Siapkan pensil warna",
        "score": 20
      },
      {
        "id": "B",
        "text": "Siapkan pensil ➔ Buka tas ➔ Menyanyi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menaruh pensil di lantai ➔ Ambil buku",
        "score": 5
      },
      {
        "id": "D",
        "text": "Langsung menggambar tanpa buku",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-lan-2",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 2,
    "prompt": "Hubungan kata: \"BURUNG berhubungan dengan TERBANG 🦅, seperti IKAN berhubungan dengan ...?\"",
    "visualHint": "🦅 : Terbang = 🐟 : ❓",
    "options": [
      {
        "id": "A",
        "text": "Berenang 🏊",
        "score": 20
      },
      {
        "id": "B",
        "text": "Berlari 🏃",
        "score": 0
      },
      {
        "id": "C",
        "text": "Melompat 🦘",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidur 😴",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-lan-3",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 3,
    "prompt": "Jika kamu ingin meminjam pensil teman di kelas, kalimat sopan manakah yang paling baik diucapkan?",
    "visualHint": "🤝 ✏️ 💬",
    "options": [
      {
        "id": "A",
        "text": "\"Bolehkan aku meminjam pensilmu sebentar? Terima kasih ya!\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Berikan pensilmu sekarang!\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengambil pensilnya diam-diam saat temannya lengah",
        "score": 0
      },
      {
        "id": "D",
        "text": "\"Pensilmu jelek, tapi mau kupakai.\"",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-lan-4",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 4,
    "prompt": "Ibu berkata: \"Hari ini matahari bersinar cerah dan udara sangat hangat.\" Ini berarti hari ini sedang...?",
    "visualHint": "☀️ 🌤️",
    "options": [
      {
        "id": "A",
        "text": "Cuaca cerah dan siang hari yang terang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Badai petir dan hujan lebat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Tengah malam yang gelap",
        "score": 0
      },
      {
        "id": "D",
        "text": "Musim salju dingin",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-lan-5",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 5,
    "prompt": "Ketika kamu berhasil membuat proyek animasi bergerak, bagaimana kamu menceritakannya ke orang tuamu?",
    "visualHint": "🗣️ 💻 👪",
    "options": [
      {
        "id": "A",
        "text": "Menjelaskan langkah-langkahnya dengan antusias: bagaimana cara menggerakkan karakternya!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya bilang \"bagus kok\" tanpa mau menjelaskan",
        "score": 10
      },
      {
        "id": "C",
        "text": "Malu-malu dan menyembunyikan layarnya",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak mau menceritakannya sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-6",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 6,
    "prompt": "Instruksi Robot: \"Maju 3 langkah, AMBIL bola merah 🔴, lalu LETAKKAN di keranjang biru 🧺\". Benda apa yang diambil oleh robot?",
    "visualHint": "🤖 ➡️ 🔴 ➡️ 🧺",
    "options": [
      {
        "id": "A",
        "text": "Bola merah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Keranjang biru",
        "score": 5
      },
      {
        "id": "C",
        "text": "Tali sepatu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Bola hijau",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-7",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 7,
    "prompt": "Lawan kata (antonim) dari kata \"CEPAT\" ⚡ dalam lomba lari robot adalah?",
    "visualHint": "⚡ Cepat vs ? 🐢",
    "options": [
      {
        "id": "A",
        "text": "LAMBAT 🐢",
        "score": 20
      },
      {
        "id": "B",
        "text": "TINGGI 🦒",
        "score": 0
      },
      {
        "id": "C",
        "text": "PANAS 🔥",
        "score": 0
      },
      {
        "id": "D",
        "text": "TERANG 💡",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-8",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 8,
    "prompt": "Bacalah kalimat berikut: \"Kucing putih melompat lincah ke atas meja makan.\" Siapa yang melakukan aksi melompat?",
    "visualHint": "🐱 Melompat ke Meja",
    "options": [
      {
        "id": "A",
        "text": "Kucing putih",
        "score": 20
      },
      {
        "id": "B",
        "text": "Meja makan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Piring kosong",
        "score": 0
      },
      {
        "id": "D",
        "text": "Lantai dapur",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-9",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 9,
    "prompt": "Alat komputer yang berfungsi untuk mengetik huruf, angka, dan perintah kode pemrograman disebut? ⌨️",
    "visualHint": "⌨️ Alat Pengetik Komputer",
    "options": [
      {
        "id": "A",
        "text": "Keyboard (Papan Tombol Ketik)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mouse (Tetikus)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Monitor (Layar)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Speaker (Pengeras Suara)",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-10",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 10,
    "prompt": "Kalimat manakah yang paling santun saat kamu ingin meminjam pensil warna dari teman kelasmu? ✏️",
    "visualHint": "🤝 Etika Berkomunikasi Sopan",
    "options": [
      {
        "id": "A",
        "text": "\"Bolehkah aku meminjam pensil warna birumu sebentar? Terima kasih ya!\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Sini kasih pensilmu cepat!\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengambil langsung dari tempat pensilnya tanpa bicara",
        "score": 0
      },
      {
        "id": "D",
        "text": "\"Pensilmu jelek tapi aku pinjam ya!\"",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-lan-11",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 11,
    "prompt": "Cerita Singkat: \"Pagi hari matahari bersinar terang 🌅. Ayam jantan berkokok riang 🐓. Beeby bersiap terbang mencari sari bunga.\" Kapan cerita ini berlangsung?",
    "visualHint": "🌅 Pagi Hari Cerah",
    "options": [
      {
        "id": "A",
        "text": "Pagi hari",
        "score": 20
      },
      {
        "id": "B",
        "text": "Tengah malam buta",
        "score": 0
      },
      {
        "id": "C",
        "text": "Sore hari menjelang malam",
        "score": 5
      },
      {
        "id": "D",
        "text": "Saat musim salju",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-12",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 12,
    "prompt": "Kata majemuk \"Matahari\" ☀️ terbentuk dari dua kata: \"Mata\" dan \"Hari\". Apakah arti kata Matahari sama dengan mata yang ada di wajah kita?",
    "visualHint": "👁️ Mata vs ☀️ Matahari",
    "options": [
      {
        "id": "A",
        "text": "Berbeda, matahari adalah bintang pusat tata surya penghasil cahaya dan kehangatan bumi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sama persis, matahari adalah mata raksasa yang berkedip",
        "score": 5
      },
      {
        "id": "C",
        "text": "Matahari adalah nama jenis buah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Matahari adalah kacamata renang",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-13",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 13,
    "prompt": "Instruksi Resep Kue: \"Kocok telur hingga mengembang SEBELUM memasukkan tepung terigu 🥣\". Kapan tepung terigu harus dimasukkan?",
    "visualHint": "1. Telur Mengembang ➡️ 2. Tepung Terigu",
    "options": [
      {
        "id": "A",
        "text": "Setelah telur selesai dikocok hingga mengembang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sebelum telur dipecahkan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Saat kue sudah selesai dipanggang",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak perlu memasukkan tepung sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-14",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 14,
    "prompt": "Kata sifat apa yang paling tepat menggambarkan perasaan seorang anak saat karya game buatannya di Beekoding dicoba dan dipuji orang tuanya? 🌟",
    "visualHint": "🎉 Bangga & Bahagia",
    "options": [
      {
        "id": "A",
        "text": "Bangga, antusias, dan bahagia",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kecewa dan murung",
        "score": 0
      },
      {
        "id": "C",
        "text": "Takut dan cemas",
        "score": 0
      },
      {
        "id": "D",
        "text": "Bosan sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-lan-15",
    "tier": "junior",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 15,
    "prompt": "\"Semut-semut kecil bekerja sama menggotong remah roti ke sarangnya 🐜🍞.\" Apa makna dari ungkapan \"Bekerja Sama\"?",
    "visualHint": "🐜🤝🐜 Gotong Royong",
    "options": [
      {
        "id": "A",
        "text": "Melakukan pekerjaan bersama-sama saling membantu demi tujuan yang sama",
        "score": 20
      },
      {
        "id": "B",
        "text": "Bekerja sendiri-sendiri sambil berebut makanan",
        "score": 0
      },
      {
        "id": "C",
        "text": "Tidur bersama di sarang",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyuruh teman bekerja sendirian",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-per-1",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 1,
    "prompt": "Ketika bermain game atau merakit balok, kamu kalah atau baloknya roboh. Apa yang kamu rasakan dan lakukan?",
    "visualHint": "🧱 💥 ➔ 🧘 💡",
    "options": [
      {
        "id": "A",
        "text": "Tersenyum, menarik napas, lalu mencoba merakitnya lagi dengan lebih kokoh!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sedih sebentar, lalu minta teman/kakak membantu merakitnya",
        "score": 15
      },
      {
        "id": "C",
        "text": "Kesal dan tidak mau menyentuh balok itu seharian",
        "score": 5
      },
      {
        "id": "D",
        "text": "Melempar balok ke dinding",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-per-2",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 2,
    "prompt": "Ketika kamu menemukan tombol baru di komputer/tablet yang belum pernah kamu lihat sebelumnya, apa yang kamu lakukan?",
    "visualHint": "💻 🔘 ❓ 🤔",
    "options": [
      {
        "id": "A",
        "text": "Penasaran! Bertanya ke guru/orang tua atau mencobanya hati-hati untuk tahu fungsinya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mencoba memencet berkali-kali tanpa tahu tujuannya",
        "score": 10
      },
      {
        "id": "C",
        "text": "Takut rusak jadi tidak pernah mau menyentuhnya",
        "score": 8
      },
      {
        "id": "D",
        "text": "Tidak peduli sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-per-3",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 3,
    "prompt": "Saat guru sedang menjelaskan langkah membuat animasi lebah terbang, bagaimana sikapmu?",
    "visualHint": "👨‍🏫 🐝 👂",
    "options": [
      {
        "id": "A",
        "text": "Mendengarkan dengan fokus dan mencoba mempraktikkannya di komputermu",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mendengarkan sesekali sambil mengobrol dengan teman",
        "score": 10
      },
      {
        "id": "C",
        "text": "Menggambar coretan lain yang tidak berhubungan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Bosan dan ingin cepat pulang",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-per-4",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 4,
    "prompt": "Ada teka-teki tebak gambar yang sulit di buku teka-teki. Kamu sudah mencoba 2 kali tapi masih salah. Apa yang kamu lakukan?",
    "visualHint": "🧩 🔄 ⏱️",
    "options": [
      {
        "id": "A",
        "text": "Melihat gambarnya lebih teliti lagi dan mencoba cara ketiga!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Melihat kunci jawaban di halaman belakang langsung",
        "score": 8
      },
      {
        "id": "C",
        "text": "Meninggalkan buku dan bermain hp",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyerah dan mengatakan teka-tekinya jelek",
        "score": 0
      }
    ]
  },
  {
    "id": "jr-per-5",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 5,
    "prompt": "Berapa lama kamu biasanya tahan duduk membuat kreasi karya (menggambar/merakit/coding) sampai karyamu selesai?",
    "visualHint": "⏳ 🎨 🏆",
    "options": [
      {
        "id": "A",
        "text": "Sangat betah dan asyik sampai karyaku benar-benar jadi dan memuaskan!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Cukup betah sekitar 20 - 30 menit, setelah itu istirahat dulu sebentar",
        "score": 18
      },
      {
        "id": "C",
        "text": "Baru 5 menit sudah sering ingin pindah aktivitas lain",
        "score": 8
      },
      {
        "id": "D",
        "text": "Jarang menyelesaikan apa yang sudah dimulai",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-6",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 6,
    "prompt": "Saat menyusun blok coding di Scratch, karakter kucing milikmu tidak mau melompat saat tombol ditekan 🐱❌. Apa yang kamu lakukan?",
    "visualHint": "🐞 Debugging dengan Sabar",
    "options": [
      {
        "id": "A",
        "text": "Memeriksa kembali susunan blok kode satu per satu untuk menemukan blok yang keliru",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung mematikan komputer dan menyerah",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memukul layar monitor",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghapus seluruh proyek game",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-per-7",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 7,
    "prompt": "Kamu kalah di ronde pertama saat memainkan tantangan teka-teki logika 🎮. Sikap mental apa yang paling hebat?",
    "visualHint": "💪 Pantang Menyerah",
    "options": [
      {
        "id": "A",
        "text": "Mencoba kembali dengan strategi baru yang lebih matang dan teliti",
        "score": 20
      },
      {
        "id": "B",
        "text": "Marah-marah dan melempar joystick",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyalahkan teman di sebelahmu",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak mau bermain game lagi selamanya",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-8",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 8,
    "prompt": "Ada panduan merakit robot lego yang memiliki 20 langkah instruksi 📘. Kamu baru sampai langkah ke-6 dan mulai merasa agak lelah. Apa tindakan terbaik?",
    "visualHint": "📘 Langkah 6/20 ➡️ Istirahat Sejenak",
    "options": [
      {
        "id": "A",
        "text": "Istirahat minum air sebentar 5 menit, lalu melanjutkan perakitan dengan sabar sampai tuntas",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membongkar paksa semua lego yang sudah dipasang",
        "score": 0
      },
      {
        "id": "C",
        "text": "Melompati langsung ke langkah 20 tanpa memasang bagian tengah",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuang buku panduannya",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-9",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 9,
    "prompt": "Teman sekelasmu berhasil menyelesaikan kuis lebih cepat daripada kamu. Bagaimana perasaan dan sikapmu?",
    "visualHint": "🤝 Fokus pada Progres Sendiri",
    "options": [
      {
        "id": "A",
        "text": "Mengucapkan selamat kepada teman, dan tetap fokus menyelesaikan tugas sendiri dengan teliti",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merasa iri dan mengganggu pengerjaan teman",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menjawab asal-asalan agar cepat selesai juga",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menangis di pojok kelas",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-10",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 10,
    "prompt": "Ketika kamu belum memahami penjelasan mentor tentang konsep \"Looping\" (Pengulangan), apa yang kamu lakukan? 🔄",
    "visualHint": "🙋 Bertanya pada Mentor",
    "options": [
      {
        "id": "A",
        "text": "Mengangkat tangan dan bertanya dengan santun: \"Kak, bolehkah tolong jelaskan bagian ini sekali lagi?\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "Pura-pura paham padahal sebenarnya bingung",
        "score": 5
      },
      {
        "id": "C",
        "text": "Diam saja dan tidak mau mengerjakan latihan",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidur saat kelas berlangsung",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-11",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 11,
    "prompt": "Kamu ingin membuat animasi roket terbang sendiri tapi belum pernah belajar coding sebelumnya 🚀. Pikiran apa yang muncul di benakmu?",
    "visualHint": "🌱 Growth Mindset",
    "options": [
      {
        "id": "A",
        "text": "\"Pasti seru! Kalau aku tekun berlatih dan mengikuti bimbingan, aku pasti bisa membuatnya!\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Coding itu mustahil untuk anak-anak seperti aku\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "\"Hanya orang jenius dari lahir yang bisa coding\"",
        "score": 0
      },
      {
        "id": "D",
        "text": "\"Lebih baik nonton video saja tanpa pernah mencoba\"",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-per-12",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 12,
    "prompt": "Proyek gambar digitalmu terhapus tidak sengaja karena komputermu mati mendadak sebelum disimpan 💾❌. Apa respon terbaikmu?",
    "visualHint": "🔄 Bangkit & Mulai Lagi",
    "options": [
      {
        "id": "A",
        "text": "Tarik napas panjang, jadikan pelajaran untuk rajin menekan tombol Simpan (Save), lalu buat gambar baru yang lebih bagus!",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengamuk dan membanting meja belajar",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berhenti menggambar untuk selamanya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyalahkan cuaca di luar rumah",
        "score": 0
      }
    ]
  },
  {
    "id": "ju-per-13",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 13,
    "prompt": "Berapa lama kamu biasanya dapat duduk fokus merakit puzzle atau menyusun balok bangunan sampai selesai? 🧩",
    "visualHint": "🧩 Daya Konsentrasi",
    "options": [
      {
        "id": "A",
        "text": "Dapat fokus tekun sampai tantangan puzzle berhasil diselesaikan dengan baik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya bertahan 1 menit lalu cepat bosan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Sering teralihkan melihat hal-hal lain di sekitar",
        "score": 10
      },
      {
        "id": "D",
        "text": "Sama sekali tidak suka menyusun puzzle",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-per-14",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 14,
    "prompt": "Ketika menghadapi soal teka-teki logika yang panjang dan tampak rumit, caramu menyelesaikannya adalah:",
    "visualHint": "🔍 Membaca Bertahap & Analisis",
    "options": [
      {
        "id": "A",
        "text": "Membaca soal dengan tenang, memecahnya menjadi bagian-bagian kecil, lalu menyelesaikannya tahap demi tahap",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menebak jawaban secara acak tanpa membaca soal",
        "score": 0
      },
      {
        "id": "C",
        "text": "Langsung melewati soal tanpa mencoba berpikir",
        "score": 0
      },
      {
        "id": "D",
        "text": "Meminta orang lain menjawabkan seluruhnya untukmu",
        "score": 5
      }
    ]
  },
  {
    "id": "ju-per-15",
    "tier": "junior",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 15,
    "prompt": "Mengapa lebah Beeby bisa menghasilkan madu manis yang melimpah di sarangnya? 🐝🍯",
    "visualHint": "🐝 Rajin & Tekun Setiap Hari",
    "options": [
      {
        "id": "A",
        "text": "Karena lebah rajin terbang mengunjungi ribuan bunga setiap hari dengan tekun tanpa mudah menyerah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya karena faktor keberuntungan semata",
        "score": 5
      },
      {
        "id": "C",
        "text": "Karena lebah membeli madu di minimarket",
        "score": 0
      },
      {
        "id": "D",
        "text": "Madu muncul sendiri tanpa lebah perlu bekerja",
        "score": 0
      }
    ]
  }
];
