// Teens Innovator Questions (Usia 13 - 17 Tahun)
// 8 Kategori x 15 Soal = 120 Soal di Pool Bank Soal
import type { TalentQuestion } from '../talentQuestions';

export const TEENS_QUESTIONS: TalentQuestion[] = [
  {
    "id": "tn-log-1",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 1,
    "prompt": "Diberikan premis:\n1. Jika hari hujan, maka jalanan basah.\n2. Jika jalanan basah, maka mobil melaju lebih lambat.\nFakta: Mobil melaju tidak lambat (mobil melaju cepat).\nKesimpulan logis (Modus Tollens) yang valid adalah...?",
    "visualHint": "P ➔ Q | Q ➔ R | ¬R ∴ ❓",
    "options": [
      {
        "id": "A",
        "text": "Hari ini tidak hujan (¬P)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hari ini pasti hujan lebat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Jalanan tetap basah kuyup",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada hubungan sebab akibat",
        "score": 5
      }
    ]
  },
  {
    "id": "mid-tn-log-2",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 2,
    "prompt": "Evaluasi ekspresi logika boolean berikut:\n`(A AND NOT B) OR (B AND C)`\nJika diketahui A = True, B = False, dan C = True, apakah hasil akhirnya?",
    "visualHint": "A=T, B=F, C=T ➔ (T AND NOT F) OR (F AND T) = ❓",
    "options": [
      {
        "id": "A",
        "text": "True (karena A AND NOT B bernilai True)",
        "score": 20
      },
      {
        "id": "B",
        "text": "False",
        "score": 0
      },
      {
        "id": "C",
        "text": "Null / Undefined",
        "score": 0
      },
      {
        "id": "D",
        "text": "Error Sintaksis",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-log-3",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 3,
    "prompt": "Empat siswa (Ani, Budi, Citra, Doni) duduk berjajar di bioskop. Ani tidak ingin duduk di ujung. Citra harus duduk tepat di sebelah Budi. Doni duduk di kursi paling kiri (kursi 1). Siapa yang duduk di kursi paling kanan (kursi 4)?",
    "visualHint": "💺 [1: Doni] [2: ?] [3: ?] [4: ?] (Ani bukan di ujung)",
    "options": [
      {
        "id": "A",
        "text": "Citra atau Budi (karena Ani harus di tengah: kursi 2 atau 3)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Ani",
        "score": 0
      },
      {
        "id": "C",
        "text": "Doni",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak dapat ditentukan sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-log-4",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 4,
    "prompt": "Dalam arsitektur sistem: Sebuah database replikasi menjamin konsistensi jika minimal (N/2 + 1) node aktif (kuorum). Dari total 5 node server, berapa node yang boleh gagal/mati tanpa merusak sistem kuorum?",
    "visualHint": "Total N = 5. Kuorum = (5/2 + 1) = 3 node wajib aktif.",
    "options": [
      {
        "id": "A",
        "text": "Maksimal 2 node boleh gagal (tersisa minimal 3)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Maksimal 3 node boleh gagal",
        "score": 5
      },
      {
        "id": "C",
        "text": "Maksimal 1 node boleh gagal",
        "score": 10
      },
      {
        "id": "D",
        "text": "Tidak boleh ada node yang gagal sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-log-5",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 5,
    "prompt": "Sebuah program looping memiliki kondisi: `while (x > 0 && x < 10) { x = x + 2; }`. Jika nilai awal x = 3, berapa nilai akhir x saat perulangan selesai?",
    "visualHint": "x=3 ➔ 5 ➔ 7 ➔ 9 ➔ 11 (Kondisi x < 10 tidak terpenuhi lagi)",
    "options": [
      {
        "id": "A",
        "text": "11",
        "score": 20
      },
      {
        "id": "B",
        "text": "9",
        "score": 10
      },
      {
        "id": "C",
        "text": "10",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tak terhingga (infinite loop)",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-6",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 6,
    "prompt": "Berdasarkan Hukum De Morgan dalam aljabar Boolean: ekspresi \"NOT (A AND B)\" secara logika identik dengan bentuk:",
    "visualHint": "📐 Hukum De Morgan: ¬(A ∧ B) ≡ ?",
    "options": [
      {
        "id": "A",
        "text": "(NOT A) OR (NOT B)",
        "score": 20
      },
      {
        "id": "B",
        "text": "(NOT A) AND (NOT B)",
        "score": 5
      },
      {
        "id": "C",
        "text": "A OR B",
        "score": 5
      },
      {
        "id": "D",
        "text": "A AND (NOT B)",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-7",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 7,
    "prompt": "Sebuah fungsi rekursif menghitung faktorial: def fact(n): return 1 if n <= 1 else n * fact(n-1). Jika fungsi dipanggil dengan fact(-3) tanpa penanganan bilangan negatif, apa yang akan terjadi?",
    "visualHint": "🔄 Rekursi Tak Berhingga ➡️ Stack Overflow",
    "options": [
      {
        "id": "A",
        "text": "Mengembalikan nilai 1 karena kondisi basis n <= 1 langsung bernilai True",
        "score": 20
      },
      {
        "id": "B",
        "text": "Terjadi RecursionError (Stack Overflow) tanpa henti",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengembalikan nilai -6",
        "score": 0
      },
      {
        "id": "D",
        "text": "Komputer me-restart otomatis",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-8",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 8,
    "prompt": "Dalam arsitektur microservices: Service A memanggil Service B secara sinkron (blocking HTTP). Jika Service B mengalami penurunan performa drastis (high latency), dampak logis apa yang paling mungkin menimpa Service A?",
    "visualHint": "⛓️ Cascading Failure & Thread Starvation",
    "options": [
      {
        "id": "A",
        "text": "Thread pool Service A akan terkuras habis karena antrean request menumpuk menunggu respons Service B (Cascading Failure)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Service A akan otomatis menjadi lebih cepat dua kali lipat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Service B akan mentransfer seluruh database-nya ke Service A",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada dampak sama sekali pada Service A",
        "score": 5
      }
    ]
  },
  {
    "id": "te-log-9",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 9,
    "prompt": "Analisis kompleksitas waktu (Big-O Notation): Algoritma manakah yang paling efisien untuk mencari sebuah angka di dalam array berisi 1.000.000 elemen yang SUDAH terurut rapi?",
    "visualHint": "📊 O(1) vs O(log n) vs O(n) vs O(n²)",
    "options": [
      {
        "id": "A",
        "text": "Binary Search dengan kompleksitas waktu O(log n) - hanya butuh maksimal ~20 perbandingan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Linear Search dengan kompleksitas waktu O(n) - butuh rata-rata 500.000 perbandingan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Bubble Sort dengan kompleksitas O(n²)",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menebak angka pertama secara acak O(1)",
        "score": 5
      }
    ]
  },
  {
    "id": "te-log-10",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 10,
    "prompt": "Teka-teki Tahanan Logika: Tiga programmer (A, B, C) mengenakan topi hitam atau putih. Setidaknya ada satu topi hitam. Programmer A melihat topi B dan C, lalu berkata: \"Saya tidak tahu warna topi saya.\" Programmer B mendengar ucapan A, melihat topi C, lalu berkata: \"Saya juga tidak tahu warna topi saya.\" Mendengar keduanya, Programmer C yang tidak bisa melihat topinya sendiri langsung tahu warna topinya. Topi warna apakah yang dipakai C?",
    "visualHint": "🎩 Epistemic Logic & Common Knowledge",
    "options": [
      {
        "id": "A",
        "text": "Topi Hitam (karena jika topi C putih, B pasti sudah tahu topinya hitam dari ucapan A)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Topi Putih",
        "score": 5
      },
      {
        "id": "C",
        "text": "Topi Merah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak dapat disimpulkan oleh siapa pun",
        "score": 5
      }
    ]
  },
  {
    "id": "te-log-11",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 11,
    "prompt": "Sebuah transaksi basis data (Database Transaction) wajib mematuhi prinsip ACID. Apa kepanjangan dari akronim ACID tersebut?",
    "visualHint": "🗄️ Database ACID Guarantees",
    "options": [
      {
        "id": "A",
        "text": "Atomicity, Consistency, Isolation, Durability",
        "score": 20
      },
      {
        "id": "B",
        "text": "Accuracy, Complexity, Integrity, Dependency",
        "score": 5
      },
      {
        "id": "C",
        "text": "Access, Control, Interface, Distribution",
        "score": 5
      },
      {
        "id": "D",
        "text": "Authentication, Cryptography, Identity, Directory",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-12",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 12,
    "prompt": "Di sistem operasi modern, kondisi \"Deadlock\" antar dua proses komputer terjadi apabila:",
    "visualHint": "🔒 Circular Wait Deadlock",
    "options": [
      {
        "id": "A",
        "text": "Proses 1 memegang Resource X dan menunggu Resource Y, sementara Proses 2 memegang Resource Y dan menunggu Resource X (Circular Wait)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kedua proses berjalan sangat cepat secara paralel",
        "score": 5
      },
      {
        "id": "C",
        "text": "Komputer kehabisan ruang harddisk",
        "score": 5
      },
      {
        "id": "D",
        "text": "Kabel charger laptop dilepas",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-13",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 13,
    "prompt": "Manakah dari struktur data berikut yang beroperasi dengan prinsip LIFO (Last-In, First-Out)?",
    "visualHint": "🥞 LIFO Data Structure",
    "options": [
      {
        "id": "A",
        "text": "Stack (Tumpukan, seperti tumpukan piring atau riwayat Undo/Redo)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Queue (Antrean printer bank FIFO)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Hash Table",
        "score": 5
      },
      {
        "id": "D",
        "text": "Linked List",
        "score": 5
      }
    ]
  },
  {
    "id": "te-log-14",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 14,
    "prompt": "Pernyataan kondisional: \"P ➡️ Q\" (Jika P maka Q). Manakah pernyataan kontraposisi yang bernilai ekuivalen secara logika?",
    "visualHint": "📜 Kontraposisi: P ➡️ Q ≡ ?",
    "options": [
      {
        "id": "A",
        "text": "NOT Q ➡️ NOT P",
        "score": 20
      },
      {
        "id": "B",
        "text": "Q ➡️ P (Konvers)",
        "score": 5
      },
      {
        "id": "C",
        "text": "NOT P ➡️ NOT Q (Invers)",
        "score": 5
      },
      {
        "id": "D",
        "text": "P AND Q",
        "score": 0
      }
    ]
  },
  {
    "id": "te-log-15",
    "tier": "teens",
    "category": "logical",
    "sectionNumber": 1,
    "questionNumber": 15,
    "prompt": "Dua buah utas program (multithreading) mengakses dan mengubah variabel saldo rekening bank yang sama secara bersamaan tanpa sinkronisasi mutex. Masalah konkurensi ini disebut:",
    "visualHint": "🏃 Race Condition",
    "options": [
      {
        "id": "A",
        "text": "Race Condition (Kondisi Balapan yang memicu data korup / tidak konsisten)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memory Leak",
        "score": 5
      },
      {
        "id": "C",
        "text": "Buffer Overflow",
        "score": 5
      },
      {
        "id": "D",
        "text": "Null Pointer Exception",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-num-1",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 1,
    "prompt": "Sebuah algoritma pencarian biner (Binary Search) membelah data menjadi separuh di setiap langkah. Pada array berurutan berisi 128 elemen, berapa jumlah perbandingan MAKSIMAL untuk menemukan suatu angka?",
    "visualHint": "log2(128) = ❓ (128 ➔ 64 ➔ 32 ➔ 16 ➔ 8 ➔ 4 ➔ 2 ➔ 1)",
    "options": [
      {
        "id": "A",
        "text": "7 kali perbandingan (2^7 = 128)",
        "score": 20
      },
      {
        "id": "B",
        "text": "128 kali perbandingan",
        "score": 0
      },
      {
        "id": "C",
        "text": "64 kali perbandingan",
        "score": 5
      },
      {
        "id": "D",
        "text": "14 kali perbandingan",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-num-2",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 2,
    "prompt": "Konversi bilangan biner `1101` ke sistem desimal (basis 10) menghasilkan nilai berapa?",
    "visualHint": "1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0) = 8 + 4 + 0 + 1",
    "options": [
      {
        "id": "A",
        "text": "13",
        "score": 20
      },
      {
        "id": "B",
        "text": "11",
        "score": 5
      },
      {
        "id": "C",
        "text": "15",
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
    "id": "tn-num-3",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 3,
    "prompt": "Sebuah server API mengenakan biaya $0.002 per request. Jika dalam 1 bulan aplikasi kamu mengirimkan 150.000 request, berapa total tagihan server tersebut?",
    "visualHint": "150.000 x $0.002 = ❓",
    "options": [
      {
        "id": "A",
        "text": "$300",
        "score": 20
      },
      {
        "id": "B",
        "text": "$30",
        "score": 5
      },
      {
        "id": "C",
        "text": "$3.000",
        "score": 5
      },
      {
        "id": "D",
        "text": "$150",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-num-4",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 4,
    "prompt": "Sebuah algoritma memiliki kompleksitas waktu kuadratik O(n^2). Jika untuk n = 10 dibutuhkan waktu 100 milidetik, berapa estimasi waktu untuk n = 30?",
    "visualHint": "(30/10)^2 = 3^2 = 9 kali lipat",
    "options": [
      {
        "id": "A",
        "text": "900 milidetik",
        "score": 20
      },
      {
        "id": "B",
        "text": "300 milidetik",
        "score": 5
      },
      {
        "id": "C",
        "text": "600 milidetik",
        "score": 5
      },
      {
        "id": "D",
        "text": "10.000 milidetik",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-num-5",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 5,
    "prompt": "Peluang melempar dadu standar bersisi 6 dan menghasilkan angka prima (2, 3, 5) adalah...?",
    "visualHint": "Ada 3 angka prima dari total 6 sisi dadu (3/6)",
    "options": [
      {
        "id": "A",
        "text": "1/2 atau 50%",
        "score": 20
      },
      {
        "id": "B",
        "text": "1/3 atau 33.3%",
        "score": 5
      },
      {
        "id": "C",
        "text": "2/3 atau 66.7%",
        "score": 5
      },
      {
        "id": "D",
        "text": "1/6 atau 16.6%",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-6",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 6,
    "prompt": "Sebuah sistem komputasi awan (Cloud) menjanjikan ketersediaan layanan (High Availability) \"Three Nines\" atau 99.9% uptime dalam satu tahun (365 hari = 8.760 jam). Berapakah batas maksimum waktu downtime yang diizinkan dalam setahun?",
    "visualHint": "0.1% x 8.760 jam = ?",
    "options": [
      {
        "id": "A",
        "text": "Sekitar 8,76 jam (atau ~525 menit per tahun)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sekitar 87,6 jam",
        "score": 5
      },
      {
        "id": "C",
        "text": "Hanya 5 menit per tahun",
        "score": 5
      },
      {
        "id": "D",
        "text": "0 detik (sama sekali tidak boleh mati)",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-7",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 7,
    "prompt": "Konversi bilangan biner 10110101 ke dalam sistem heksadesimal (basis 16). (Petunjuk: bagi menjadi dua kelompok 4-bit: 1011 dan 0101)",
    "visualHint": "1011 (11 desimal = B) | 0101 (5 desimal = 5)",
    "options": [
      {
        "id": "A",
        "text": "B5 (atau 0xB5)",
        "score": 20
      },
      {
        "id": "B",
        "text": "A5",
        "score": 5
      },
      {
        "id": "C",
        "text": "C5",
        "score": 5
      },
      {
        "id": "D",
        "text": "181",
        "score": 5
      }
    ]
  },
  {
    "id": "te-num-8",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 8,
    "prompt": "Sebuah algoritma Machine Learning dilatih pada 10.000 sampel data. Model memprediksi 9.500 sampel dengan benar dan 500 sampel salah. Berapakah akurasi (Accuracy Rate) model tersebut?",
    "visualHint": "(9.500 / 10.000) x 100% = ?",
    "options": [
      {
        "id": "A",
        "text": "95%",
        "score": 20
      },
      {
        "id": "B",
        "text": "90%",
        "score": 5
      },
      {
        "id": "C",
        "text": "98%",
        "score": 5
      },
      {
        "id": "D",
        "text": "5%",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-9",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 9,
    "prompt": "Kombinasi password: Sebuah PIN terdiri dari 4 digit angka (0-9). Jika angka boleh berulang, ada berapa total kemungkinan kombinasi PIN yang dapat dibentuk?",
    "visualHint": "10 x 10 x 10 x 10 = ?",
    "options": [
      {
        "id": "A",
        "text": "10.000 kemungkinan (10 pangkat 4)",
        "score": 20
      },
      {
        "id": "B",
        "text": "5.040 kemungkinan (10P4)",
        "score": 5
      },
      {
        "id": "C",
        "text": "1.000 kemungkinan",
        "score": 5
      },
      {
        "id": "D",
        "text": "40 kemungkinan",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-10",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 10,
    "prompt": "Sebuah server streaming video mentransmisikan data bitrate 8 Megabits per second (8 Mbps). Berapa Megabytes (MB) kuota data yang ditransfer penonton selama 1 menit (60 detik)? (Ingat: 1 Byte = 8 bits)",
    "visualHint": "(8 Mbps / 8 = 1 MB/detik) x 60 detik = ?",
    "options": [
      {
        "id": "A",
        "text": "60 MB",
        "score": 20
      },
      {
        "id": "B",
        "text": "480 MB",
        "score": 5
      },
      {
        "id": "C",
        "text": "120 MB",
        "score": 5
      },
      {
        "id": "D",
        "text": "8 MB",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-11",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 11,
    "prompt": "Fungsi hash kriptografis SHA-256 menghasilkan keluaran (digest) berukuran berapa bit dan berapa karakter heksadesimal?",
    "visualHint": "🔐 256 bits / 4 bits per hex char = ?",
    "options": [
      {
        "id": "A",
        "text": "256 bit (ekuivalen dengan 64 karakter heksadesimal)",
        "score": 20
      },
      {
        "id": "B",
        "text": "128 bit (32 karakter heksadesimal)",
        "score": 5
      },
      {
        "id": "C",
        "text": "512 bit (128 karakter heksadesimal)",
        "score": 5
      },
      {
        "id": "D",
        "text": "1.024 bit",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-12",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 12,
    "prompt": "Dalam graf berbobot (weighted graph), berapa total bobot jalur terpendek dari Node S ke Node T: S ➡️ A (bobot 3), S ➡️ B (bobot 5), A ➡️ T (bobot 4), B ➡️ T (bobot 1)?",
    "visualHint": "Jalur 1: S-A-T (3+4=7) | Jalur 2: S-B-T (5+1=6)",
    "options": [
      {
        "id": "A",
        "text": "Bobot 6 (melalui jalur S ➡️ B ➡️ T)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Bobot 7 (melalui jalur S ➡️ A ➡️ T)",
        "score": 10
      },
      {
        "id": "C",
        "text": "Bobot 8",
        "score": 5
      },
      {
        "id": "D",
        "text": "Bobot 13",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-13",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 13,
    "prompt": "Sebuah cache memory memiliki Hit Rate 90% dengan waktu akses 2 nanodetik (ns). Jika Miss, akses ke memori utama membutuhkan 50 ns. Berapakah rata-rata waktu akses memori efektif (Effective Memory Access Time)?",
    "visualHint": "EAT = (0.90 x 2 ns) + (0.10 x 50 ns) = ?",
    "options": [
      {
        "id": "A",
        "text": "6,8 nanodetik (1,8 ns + 5,0 ns)",
        "score": 20
      },
      {
        "id": "B",
        "text": "26 nanodetik",
        "score": 5
      },
      {
        "id": "C",
        "text": "5,2 nanodetik",
        "score": 5
      },
      {
        "id": "D",
        "text": "52 nanodetik",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-14",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 14,
    "prompt": "Jika sebuah array 2 dimensi A[10][10] disimpan di memori secara Row-Major Order dan setiap elemen berukuran 4 byte, berapa offset alamat byte untuk elemen A[3][4] dari alamat awal A[0][0]?",
    "visualHint": "Offset = ((3 baris x 10 kolom) + 4 kolom) x 4 byte = ?",
    "options": [
      {
        "id": "A",
        "text": "136 byte ((3 x 10 + 4) x 4 = 34 x 4 = 136 byte)",
        "score": 20
      },
      {
        "id": "B",
        "text": "120 byte",
        "score": 5
      },
      {
        "id": "C",
        "text": "160 byte",
        "score": 5
      },
      {
        "id": "D",
        "text": "28 byte",
        "score": 0
      }
    ]
  },
  {
    "id": "te-num-15",
    "tier": "teens",
    "category": "numerical",
    "sectionNumber": 2,
    "questionNumber": 15,
    "prompt": "Berapakah nilai desimal dari operasi bitwise: (12 & 10)? Di mana 12 biner = 1100 dan 10 biner = 1010.",
    "visualHint": "1100 AND 1010 = ?",
    "options": [
      {
        "id": "A",
        "text": "8 (karena 1100 & 1010 menghasilkan 1000 biner = 8 desimal)",
        "score": 20
      },
      {
        "id": "B",
        "text": "14 (hasil operasi bitwise OR |)",
        "score": 10
      },
      {
        "id": "C",
        "text": "6 (hasil operasi bitwise XOR ^)",
        "score": 10
      },
      {
        "id": "D",
        "text": "2",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-spa-1",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 1,
    "prompt": "Sebuah jaring-jaring kubus dibentangkan menjadi bentuk salib (1 kotak atas, 1 kotak bawah, 4 kotak sejajar tengah). Jika sisi tengah kedua adalah sisi depan kubus, sisi manakah yang menjadi sisi belakang?",
    "visualHint": "Sisi berlawanan pada jaring-jaring berjarak lompat 1 kotak.",
    "options": [
      {
        "id": "A",
        "text": "Kotak sejajar tengah urutan keempat (melompati kotak ketiga)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Kotak paling atas",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kotak ketiga di sebelahnya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Kotak paling bawah",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-spa-2",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 2,
    "prompt": "Dalam sistem koordinat 3D (X, Y, Z), sebuah titik berada di (3, 4, 5). Jika titik tersebut diproyeksikan secara ortogonal ke bidang XY (Z=0), di manakah posisinya?",
    "visualHint": "Proyeksi ke bidang XY menghilangkan koordinat Z.",
    "options": [
      {
        "id": "A",
        "text": "(3, 4, 0)",
        "score": 20
      },
      {
        "id": "B",
        "text": "(0, 0, 5)",
        "score": 5
      },
      {
        "id": "C",
        "text": "(3, 0, 5)",
        "score": 0
      },
      {
        "id": "D",
        "text": "(0, 4, 5)",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-spa-3",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 3,
    "prompt": "Dua roda gigi saling terhubung secara langsung. Roda Gigi A (20 gerigi) berputar searah jarum jam dengan kecepatan 60 rpm. Bagaimana perputaran Roda Gigi B (40 gerigi)?",
    "visualHint": "Roda bersentuhan ➔ Arah putaran berlawanan. Rasio gigi 20:40.",
    "options": [
      {
        "id": "A",
        "text": "Berputar berlawanan arah jarum jam dengan kecepatan 30 rpm",
        "score": 20
      },
      {
        "id": "B",
        "text": "Berputar searah jarum jam dengan kecepatan 120 rpm",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berputar berlawanan arah jarum jam dengan kecepatan 60 rpm",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak berputar sama sekali",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-spa-4",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 4,
    "prompt": "Sebuah lembaran kertas berbentuk bujursangkar dilipat diagonal menjadi segitiga, lalu dilipat lagi menjadi segitiga lebih kecil, dan satu lubang bundar dilubangi di tengahnya. Ketika dibuka kembali, ada berapa lubang di lembaran kertas tersebut?",
    "visualHint": "Dilipat 2 kali ➔ Kertas bertumpuk 4 lapisan.",
    "options": [
      {
        "id": "A",
        "text": "4 lubang simetris",
        "score": 20
      },
      {
        "id": "B",
        "text": "2 lubang",
        "score": 5
      },
      {
        "id": "C",
        "text": "1 lubang",
        "score": 5
      },
      {
        "id": "D",
        "text": "8 lubang",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-spa-5",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 5,
    "prompt": "Vektor perpindahan dalam game: Karakter melangkah ke arah Timur 6 meter, lalu ke arah Utara 8 meter. Berapakah jarak garis lurus (euclidean distance) karakter dari titik mula-mula?",
    "visualHint": "Teorema Pythagoras: √(6^2 + 8^2) = √(36 + 64)",
    "options": [
      {
        "id": "A",
        "text": "10 meter",
        "score": 20
      },
      {
        "id": "B",
        "text": "14 meter",
        "score": 5
      },
      {
        "id": "C",
        "text": "12 meter",
        "score": 5
      },
      {
        "id": "D",
        "text": "48 meter",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-6",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 6,
    "prompt": "Dalam grafika komputer 3D, matriks transformasi digunakan untuk memanipulasi posisi objek. Tiga operasi geometris dasar yang membentuk matriks Model-View-Projection (MVP) adalah:",
    "visualHint": "📐 Transformasi 3D",
    "options": [
      {
        "id": "A",
        "text": "Translation (Pergeseran), Rotation (Rotasi), dan Scaling (Penskalaan ukuran)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Coloring, Texturing, dan Shading",
        "score": 5
      },
      {
        "id": "C",
        "text": "Compression, Encryption, dan Decryption",
        "score": 0
      },
      {
        "id": "D",
        "text": "Sorting, Searching, dan Filtering",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-7",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 7,
    "prompt": "Vektor normal (Normal Vector) pada permukaan bidang poligon 3D memiliki arah yang selalu:",
    "visualHint": "📐 Vektor Normal Permukaan",
    "options": [
      {
        "id": "A",
        "text": "Tegak lurus 90 derajat terhadap permukaan bidang poligon",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sejajar (paralel) dengan permukaan poligon",
        "score": 5
      },
      {
        "id": "C",
        "text": "Mengarah ke titik pusat koordinat (0,0,0)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Berubah-ubah secara acak setiap frame",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-8",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 8,
    "prompt": "Topologi Jaringan Komputer: Topologi di mana seluruh komputer klien terhubung ke satu titik switch/hub pusat, sehingga jika satu kabel klien putus tidak mengganggu klien lainnya, adalah:",
    "visualHint": "⭐ Topologi Jaringan Bintang",
    "options": [
      {
        "id": "A",
        "text": "Topologi Star (Bintang)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Topologi Ring (Cincin)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Topologi Bus",
        "score": 5
      },
      {
        "id": "D",
        "text": "Topologi Mesh murni",
        "score": 5
      }
    ]
  },
  {
    "id": "te-spa-9",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 9,
    "prompt": "Dalam teknologi Virtual Reality (VR) dan tracking gerak drone, istilah \"6 Degrees of Freedom\" (6-DoF) mencakup gerakan translasi (Surge, Sway, Heave) dan rotasi:",
    "visualHint": "🕹️ 6-DoF Rotation Axes",
    "options": [
      {
        "id": "A",
        "text": "Pitch (mendongak/menunduk), Yaw (menoleh kiri/kanan), dan Roll (miring kiri/kanan)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Zoom in, Zoom out, dan Pan",
        "score": 5
      },
      {
        "id": "C",
        "text": "RGB, CMYK, dan Grayscale",
        "score": 0
      },
      {
        "id": "D",
        "text": "Latitude, Longitude, dan Altitude",
        "score": 5
      }
    ]
  },
  {
    "id": "te-spa-10",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 10,
    "prompt": "Struktur data pohon biner (Binary Search Tree / BST): Jika nilai node akar adalah 50, di manakah posisi node baru bernilai 30 dan 70 akan ditempatkan?",
    "visualHint": "🌲 BST Insertion Rules",
    "options": [
      {
        "id": "A",
        "text": "Node 30 di cabang anak sebelah KIRI, dan Node 70 di cabang anak sebelah KANAN",
        "score": 20
      },
      {
        "id": "B",
        "text": "Keduanya di cabang sebelah kiri",
        "score": 0
      },
      {
        "id": "C",
        "text": "Node 70 di sebelah kiri, Node 30 di sebelah kanan",
        "score": 5
      },
      {
        "id": "D",
        "text": "Keduanya menggantikan posisi node akar 50",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-11",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 11,
    "prompt": "Dalam desain arsitektur Database Relasional, hubungan (Relationship) antara entitas \"Siswa\" dan entitas \"Mata Pelajaran Ekstrakurikuler\" biasanya berjenis:",
    "visualHint": "🗄️ Database ERD Cardinality",
    "options": [
      {
        "id": "A",
        "text": "Many-to-Many (M:N) - membutuhkan tabel perantara (junction table)",
        "score": 20
      },
      {
        "id": "B",
        "text": "One-to-One (1:1)",
        "score": 5
      },
      {
        "id": "C",
        "text": "One-to-Many (1:N)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Zero-to-Zero",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-12",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 12,
    "prompt": "Di game engine Unity atau Unreal, teknik \"Raycasting\" digunakan untuk:",
    "visualHint": "🎯 Raycasting Physics",
    "options": [
      {
        "id": "A",
        "text": "Menembakkan sinar imajiner dari satu titik koordinat ke arah tertentu untuk mendeteksi objek 3D yang bertabrakan dengan garis sinar tersebut",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membuat suara ledakan game",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyimpan game ke cloud",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengganti resolusi monitor pemain",
        "score": 5
      }
    ]
  },
  {
    "id": "te-spa-13",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 13,
    "prompt": "Struktur data Spasial seperti \"Quadtree\" (2D) dan \"Octree\" (3D) sangat penting dalam video game modern untuk keperluan:",
    "visualHint": "🧊 Spatial Partitioning",
    "options": [
      {
        "id": "A",
        "text": "Partisi ruang (Spatial Partitioning) guna mempercepat deteksi tabrakan dan culling rendering hanya pada objek di area pandang aktif",
        "score": 20
      },
      {
        "id": "B",
        "text": "Enkripsi password pemain",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memutar file musik format MP3",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghitung skor leaderboard",
        "score": 5
      }
    ]
  },
  {
    "id": "te-spa-14",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 14,
    "prompt": "Pada model warna RGB (Red, Green, Blue) 24-bit, warna apa yang dihasilkan oleh kode heksadesimal #00FFFF?",
    "visualHint": "🎨 Red: 0 | Green: 255 | Blue: 255",
    "options": [
      {
        "id": "A",
        "text": "Cyan (Biru Kehijauan terang)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Magenta (Ungu kemerahan)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kuning cerah (#FFFF00)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hitam pekat",
        "score": 0
      }
    ]
  },
  {
    "id": "te-spa-15",
    "tier": "teens",
    "category": "spatial",
    "sectionNumber": 3,
    "questionNumber": 15,
    "prompt": "Berapakah jumlah rusuk (edges) yang dimiliki oleh sebuah prisma segitiga?",
    "visualHint": "📐 2 Segitiga (alas & tutup) + 3 Persegi Samping",
    "options": [
      {
        "id": "A",
        "text": "9 rusuk (3 di alas + 3 di tutup + 3 rusuk tegak)",
        "score": 20
      },
      {
        "id": "B",
        "text": "6 rusuk",
        "score": 5
      },
      {
        "id": "C",
        "text": "12 rusuk",
        "score": 5
      },
      {
        "id": "D",
        "text": "5 rusuk",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-pat-1",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 1,
    "prompt": "Analisis deret rekursif berikut: 2, 5, 11, 23, 47, ... Aturan fungsi yang menghasilkan suku berikutnya (f(n+1)) dari suku sebelumnya (x) adalah?",
    "visualHint": "2x2+1=5 | 5x2+1=11 | 11x2+1=23 | 23x2+1=47",
    "options": [
      {
        "id": "A",
        "text": "2x + 1 (Suku selanjutnya adalah 95)",
        "score": 20
      },
      {
        "id": "B",
        "text": "3x - 1",
        "score": 5
      },
      {
        "id": "C",
        "text": "x^2 + 1",
        "score": 0
      },
      {
        "id": "D",
        "text": "2x + 3",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-pat-2",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 2,
    "prompt": "Dalam model Machine Learning untuk Computer Vision, lapisan Convolutional Neural Network (CNN) bekerja mengenali gambar dengan mendeteksi pola bertingkat. Urutan hierarki deteksi yang benar adalah...?",
    "visualHint": "Piksel mentah ➔ Pola rendah ➔ Pola tinggi",
    "options": [
      {
        "id": "A",
        "text": "Tepi/Garis sederhana ➔ Tekstur/Bentuk ➔ Bagian objek ➔ Objek utuh",
        "score": 20
      },
      {
        "id": "B",
        "text": "Objek utuh langsung tanpa memeriksa tepi garis",
        "score": 0
      },
      {
        "id": "C",
        "text": "Warna latar belakang saja",
        "score": 5
      },
      {
        "id": "D",
        "text": "Format ekstensi file gambar (.jpg)",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-pat-3",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 3,
    "prompt": "Perhatikan pola heksadesimal representasi warna web CSS: `#000000` (Hitam), `#FFFFFF` (Putih), `#FF0000` (Merah Murni), `#00FF00` (Hijau Murni). Kode warna apa yang merepresentasikan warna KUNING murni (campuran Merah + Hijau)?",
    "visualHint": "Format RGB: #RRGGBB. Campuran Merah Penuh (FF) + Hijau Penuh (FF) + Biru (00)",
    "options": [
      {
        "id": "A",
        "text": "#FFFF00",
        "score": 20
      },
      {
        "id": "B",
        "text": "#00FFFF",
        "score": 5
      },
      {
        "id": "C",
        "text": "#FF00FF",
        "score": 5
      },
      {
        "id": "D",
        "text": "#FFAA00",
        "score": 10
      }
    ]
  },
  {
    "id": "tn-pat-4",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 4,
    "prompt": "Pola struktur data pohon (Binary Search Tree): Nilai anak kiri selalu lebih kecil dari induk, nilai anak kanan selalu lebih besar. Jika root = 15, manakah posisi yang valid untuk angka 18?",
    "visualHint": "18 > 15 ➔ Posisi di sub-pohon mana?",
    "options": [
      {
        "id": "A",
        "text": "Di sub-pohon sebelah KANAN dari root 15",
        "score": 20
      },
      {
        "id": "B",
        "text": "Di sub-pohon sebelah KIRI dari root 15",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menggantikan posisi root 15 secara otomatis",
        "score": 5
      },
      {
        "id": "D",
        "text": "Di luar struktur pohon",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-pat-5",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 5,
    "prompt": "Analisis log traffic server web: Setiap 10 menit terjadi spike request sebanyak 5.000 hit yang berasal dari IP address yang sama persis dan mengeksekusi endpoint `/login`. Pola ini mengindikasikan adanya...?",
    "visualHint": "Pola anomali periodik pada endpoint autentikasi",
    "options": [
      {
        "id": "A",
        "text": "Pola serangan otomatis (brute force bot / credential stuffing)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Pengguna normal yang lupa password secara kebetulan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Koneksi internet lambat di sisi klien",
        "score": 0
      },
      {
        "id": "D",
        "text": "Fitur optimasi kecepatan server",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-6",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 6,
    "prompt": "Dalam arsitektur perangkat lunak modern, pola desain (Design Pattern) yang memungkinkan suatu objek memberitahukan perubahan statusnya secara otomatis kepada banyak objek lain yang berlangganan dikenal sebagai:",
    "visualHint": "📡 Observer / Pub-Sub Pattern",
    "options": [
      {
        "id": "A",
        "text": "Observer Pattern (atau Publish-Subscribe Pattern)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Singleton Pattern",
        "score": 5
      },
      {
        "id": "C",
        "text": "Factory Pattern",
        "score": 5
      },
      {
        "id": "D",
        "text": "Adapter Pattern",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pat-7",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 7,
    "prompt": "Pola Regex (Regular Expression): Simbol pola regex mana yang digunakan untuk memvalidasi apakah sebuah string berformat alamat email valid (memiliki teks, simbol @, nama domain, dan TLD)?",
    "visualHint": "🔍 Regex Pattern Matching",
    "options": [
      {
        "id": "A",
        "text": "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
        "score": 20
      },
      {
        "id": "B",
        "text": "^\\d{3}-\\d{3}-\\d{4}$ (Pola nomor telepon)",
        "score": 5
      },
      {
        "id": "C",
        "text": "[0-9]+",
        "score": 5
      },
      {
        "id": "D",
        "text": "http://.*",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-8",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 8,
    "prompt": "Perhatikan urutan arsitektur neural network: Input Layer ➡️ Convolutional Layer ➡️ ReLU Activation ➡️ Max Pooling ➡️ Dense Layer. Urutan pola lapisan ini adalah ciri khas dari:",
    "visualHint": "🧠 CNN (Convolutional Neural Network)",
    "options": [
      {
        "id": "A",
        "text": "CNN (Convolutional Neural Network) untuk pengenalan gambar dan visi komputer",
        "score": 20
      },
      {
        "id": "B",
        "text": "RNN (Recurrent Neural Network) untuk pemrosesan teks murni",
        "score": 5
      },
      {
        "id": "C",
        "text": "Algoritma K-Means Clustering",
        "score": 5
      },
      {
        "id": "D",
        "text": "Linear Regression biasa",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-9",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 9,
    "prompt": "Sebuah deret waktu beban server menunjukkan lonjakan trafik setiap hari Minggu pukul 20.00 WIB dan turun drastis setiap hari Senin pukul 03.00 WIB. Pola keteraturan berulang ini dalam data science disebut:",
    "visualHint": "📈 Time-Series Seasonality",
    "options": [
      {
        "id": "A",
        "text": "Musiman (Seasonality Pattern / Periodic Trend)",
        "score": 20
      },
      {
        "id": "B",
        "text": "White Noise (kebisingan acak)",
        "score": 0
      },
      {
        "id": "C",
        "text": "Outlier murni tanpa arti",
        "score": 5
      },
      {
        "id": "D",
        "text": "Stationary Data tanpa fluktuasi",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pat-10",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 10,
    "prompt": "Pola RESTful API: Method HTTP manakah yang secara konvensi bersifat \"Idempoten\" (eksekusi berkali-kali menghasilkan efek yang sama terhadap data)?",
    "visualHint": "🌐 HTTP Idempotence",
    "options": [
      {
        "id": "A",
        "text": "GET, PUT, dan DELETE",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya POST",
        "score": 5
      },
      {
        "id": "C",
        "text": "PATCH dan POST",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada method HTTP yang idempoten",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-11",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 11,
    "prompt": "Dalam arsitektur Web Development, pola pemisahan tanggung jawab kode \"MVC\" membagi aplikasi menjadi tiga komponen:",
    "visualHint": "🏗️ Model - View - Controller",
    "options": [
      {
        "id": "A",
        "text": "Model (Data & Logika Bisnis), View (Tampilan Antarmuka), Controller (Pengatur Alur Input)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memory, Video, Cache",
        "score": 5
      },
      {
        "id": "C",
        "text": "Microservice, Virtual, Cloud",
        "score": 5
      },
      {
        "id": "D",
        "text": "Monitoring, Verification, Compliance",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-12",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 12,
    "prompt": "Ketika menganalisis log keamanan server web, kamu melihat ribuan request URL berpola: \"/product?id=1 UNION SELECT username, password FROM users--\". Ini adalah indikasi pola serangan:",
    "visualHint": "🛡️ Cyber Attack Detection",
    "options": [
      {
        "id": "A",
        "text": "SQL Injection (SQLi)",
        "score": 20
      },
      {
        "id": "B",
        "text": "DDoS Attack via UDP Flood",
        "score": 5
      },
      {
        "id": "C",
        "text": "Cross-Site Scripting (XSS)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Phishing email biasa",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-13",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 13,
    "prompt": "Pola arsitektur Cloud \"Event-Driven\": Komponen sistem berkomunikasi melalui:",
    "visualHint": "⚡ Event-Driven Message Broker",
    "options": [
      {
        "id": "A",
        "text": "Penerbitan dan penangkapan peristiwa (Events) melalui Message Broker seperti Apache Kafka atau RabbitMQ",
        "score": 20
      },
      {
        "id": "B",
        "text": "Koneksi langsung kabel LAN statis",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membaca file teks di desktop secara manual",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghubungi nomor telepon admin",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pat-14",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 14,
    "prompt": "Dalam algoritma kompresi data Huffman Coding, karakter yang paling sering muncul di dalam teks akan dikodekan dengan:",
    "visualHint": "📦 Huffman Variable-Length Coding",
    "options": [
      {
        "id": "A",
        "text": "Jumlah bit biner yang paling sedikit (pendek) guna meminimalkan ukuran file",
        "score": 20
      },
      {
        "id": "B",
        "text": "Jumlah bit biner yang paling panjang",
        "score": 5
      },
      {
        "id": "C",
        "text": "Selalu 8 bit tetap (fixed-length)",
        "score": 5
      },
      {
        "id": "D",
        "text": "Karakter tersebut dihapus dari file",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pat-15",
    "tier": "teens",
    "category": "pattern",
    "sectionNumber": 4,
    "questionNumber": 15,
    "prompt": "Pola Git Branching \"Git Flow\" membedakan branch utama untuk rilis produksi dan branch pengembangan aktif, yaitu:",
    "visualHint": "🌿 Git Flow Branches",
    "options": [
      {
        "id": "A",
        "text": "Branch \"main\" (atau master) untuk produksi dan branch \"develop\" untuk integrasi fitur baru",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya menggunakan satu branch tanpa cabang sama sekali",
        "score": 5
      },
      {
        "id": "C",
        "text": "Membuat repository baru setiap hari",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengunggah file ZIP lewat email",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-cre-1",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 1,
    "prompt": "Kamu sedang mengembangkan aplikasi mobile untuk membantu siswa mengelola stres belajar. Fitur orisinal dan inovatif apa yang paling bernilai menurutmu?",
    "visualHint": "📱 🧠 🧘 ✨",
    "options": [
      {
        "id": "A",
        "text": "Kombinasi smart timer pomodoro yang memutar audio binaural beat adaptif dan mini-game refleksi jurnal visual harian",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya alarm jam beker biasa tanpa visualisasi atau personalisasi",
        "score": 5
      },
      {
        "id": "C",
        "text": "Kalkulator perkalian",
        "score": 0
      },
      {
        "id": "D",
        "text": "Aplikasi yang hanya memuat kumpulan artikel teks panjang membosankan",
        "score": 8
      }
    ]
  },
  {
    "id": "tn-cre-2",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 2,
    "prompt": "Dalam hackathon pembuatan solusi berbasis AI, tim kamu diberi dataset tingkat polusi udara di kota. Bagaimana kamu menyajikannya agar masyarakat tergerak bertindak?",
    "visualHint": "📊 🏙️ 🌿 💡",
    "options": [
      {
        "id": "A",
        "text": "Membuat peta navigasi rute jalan sehat real-time yang memandu pejalan kaki menghindari titik polusi tinggi dan memberi gamifikasi poin tanaman",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menampilkan tabel angka mentah format Excel yang sulit dibaca",
        "score": 5
      },
      {
        "id": "C",
        "text": "Membuat akun media sosial tanpa membuat aplikasi apa pun",
        "score": 8
      },
      {
        "id": "D",
        "text": "Menolak data tersebut karena rumit",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-cre-3",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 3,
    "prompt": "Kamu memiliki ide startup teknologi yang belum pernah ada di pasaran. Langkah pertama yang kamu tempuh untuk memvalidasi ide tersebut adalah...?",
    "visualHint": "🚀 💡 🧪",
    "options": [
      {
        "id": "A",
        "text": "Membangun MVP (Minimum Viable Product) sederhana atau prototype interaktif lalu mewawancarai target pengguna nyata",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyimpan idenya rapat-rapat selamanya karena takut ditiru orang",
        "score": 5
      },
      {
        "id": "C",
        "text": "Meminjam modal miliaran rupiah sebelum tahu apakah ada orang yang mau memakainya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menunggu orang lain membuat produk serupa terlebih dahulu",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-cre-4",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 4,
    "prompt": "Ketika sebuah fitur game yang kamu rancang terasa membosankan saat dimainkan (playtesting), bagaimana caramu mencari sudut pandang baru?",
    "visualHint": "🎮 🔄 💡",
    "options": [
      {
        "id": "A",
        "text": "Mengubah mekanik intinya dengan aturan terbalik (misal: bukan menghindari rintangan, tapi memanfaatkan rintangan sebagai pelontar skor)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memaksa pemain untuk tetap menyukainya apa adanya",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menghapus seluruh proyek game dan berhenti membuat karya",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya mengganti musik latarnya tanpa memperbaiki gameplay",
        "score": 8
      }
    ]
  },
  {
    "id": "tn-cre-5",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 5,
    "prompt": "Bagaimana caramu menggabungkan minat senimu (seperti musik/desain visual) dengan kemampuan coding yang kamu miliki?",
    "visualHint": "🎨 + 💻 = ✨",
    "options": [
      {
        "id": "A",
        "text": "Menciptakan generative visual art berbasis algoritma shader/p5.js atau audio synthesizer interaktif berbasis web",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memisahkan keduanya secara kaku dan tidak pernah menghubungkannya",
        "score": 8
      },
      {
        "id": "C",
        "text": "Menganggap coding hanya untuk angka tanpa ada unsur seni estetika",
        "score": 0
      },
      {
        "id": "D",
        "text": "Meninggalkan salah satunya sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-6",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 6,
    "prompt": "Kamu ingin membangun startup teknologi berbasis Artificial Intelligence untuk memberdayakan petani lokal di Indonesia 🌾🤖. Solusi inovatif apa yang memiliki dampak nyata terbesar?",
    "visualHint": "🌾 AI Agrotech Innovation",
    "options": [
      {
        "id": "A",
        "text": "Aplikasi mobile AI Computer Vision yang mendiagnosis penyakit daun padi dari foto kamera dan merekomendasikan solusi organik serta prakiraan cuaca lokal",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membuat chatbot teks berbahasa Inggris rumit yang sulit dimengerti petani",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menjual robot humanoid mahal yang tidak terjangkau petani",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membuat game arcade tentang traktor saja",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-7",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 7,
    "prompt": "Bagaimana pendekatan teknik Prompt Engineering terbaik untuk menghasilkan ringkasan dokumen hukum yang akurat dan bebas dari halusinasi AI? 📜🤖",
    "visualHint": "🤖 Advanced Prompt Engineering",
    "options": [
      {
        "id": "A",
        "text": "Memberikan peran ahli (Persona), batasan konteks yang ketat (Grounding), instruksi langkah per langkah (Chain-of-Thought), dan format keluaran terstruktur (JSON/Markdown)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya mengetik satu kata: \"Ringkas!\" tanpa memberikan konteks atau dokumen",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menggunakan huruf kapital semua dengan nada marah",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyuruh AI menebak isi dokumen tanpa mengunggahnya",
        "score": 0
      }
    ]
  },
  {
    "id": "te-cre-8",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 8,
    "prompt": "Kamu sedang merancang sistem autentikasi masa depan yang bebas password (Passwordless Authentication) 🔑. Kombinasi teknologi apa yang paling aman dan ramah pengguna?",
    "visualHint": "🛡️ Passkeys & Biometric Security",
    "options": [
      {
        "id": "A",
        "text": "FIDO2 WebAuthn / Passkeys yang memanfaatkan biometrik perangkat (Fingerprint / Face ID) dan kriptografi asimetris public key",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mewajibkan pengguna menghafal password 50 karakter acak yang harus diganti tiap minggu",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menghapus sistem login sehingga siapa pun bisa masuk tanpa izin",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengirimkan password teks polos melalui SMS biasa",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-9",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 9,
    "prompt": "Dalam pengembangan aplikasi kesehatan mental remaja, bagaimana cara merancang pengalaman pengguna (UX) yang membangun rasa aman dan privasi tinggi? 🧠🛡️",
    "visualHint": "🌱 Privacy-First UX",
    "options": [
      {
        "id": "A",
        "text": "Enkripsi ujung-ke-ujung (End-to-End Encryption), opsi mode anonim tanpa nama asli, desain antarmuka bernuansa tenang dan bebas iklan komersial",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengharuskan pengguna membagikan lokasi GPS live dan nomor KTP",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menampilkan unggahan curhat pengguna di beranda publik yang bisa dikomentari semua orang",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menjual data emosi pengguna ke pengiklan pihak ketiga",
        "score": 0
      }
    ]
  },
  {
    "id": "te-cre-10",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 10,
    "prompt": "Kamu memiliki ide proyek IoT Smart City untuk mengurangi kemacetan ambulans darurat di jalan raya kota besar 🚑🚦. Solusi teknologi apa yang paling efektif?",
    "visualHint": "🚦 V2X Emergency Traffic Routing",
    "options": [
      {
        "id": "A",
        "text": "Sistem komunikasi Vehicle-to-Infrastructure (V2I) di mana GPS ambulans secara otomatis mengubah lampu lalu lintas di rute depannya menjadi hijau (Green Corridor)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Memasang sirine ambulans yang suaranya sepuluh kali lebih keras memekakkan telinga",
        "score": 5
      },
      {
        "id": "C",
        "text": "Melarang semua mobil pribadi keluar rumah selamanya",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menyuruh ambulans terbang menggunakan sayap helikopter manual",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-11",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 11,
    "prompt": "Jika kamu memimpin proyek open-source pembuatan game edukasi coding untuk anak-anak berkebutuhan khusus (Tunanetra) 🎮🦯, bagaimana pendekatan desain aksesibilitasnya?",
    "visualHint": "♿ Accessible Audio Game Engine",
    "options": [
      {
        "id": "A",
        "text": "Audio spatial 3D interaktif, pembaca layar (screen reader) terintegrasi, dan kontrol keyboard haptic berbasis suara instruksi yang kaya konteks",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya mengandalkan grafis visual warna-warni tanpa efek suara sama sekali",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membuat game khusus untuk orang yang bisa melihat saja",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghilangkan semua kontrol suara",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-12",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 12,
    "prompt": "Bagaimana cara memanfaatkan teknologi Blockchain untuk memverifikasi keaslian ijazah dan sertifikat kelulusan siswa Beekoding tanpa perantara calo? 🎓⛓️",
    "visualHint": "📜 Verifiable Digital Credentials",
    "options": [
      {
        "id": "A",
        "text": "Menerbitkan sertifikat digital dengan tanda tangan kriptografis institusi yang tercatat di smart contract blockchain (Verifiable Credentials / SBT)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mencetak sertifikat di kertas fotokopi biasa",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengunggah file sertifikat ke media sosial umum",
        "score": 5
      },
      {
        "id": "D",
        "text": "Meminta siswa menyimpan foto sertifikat di galeri HP",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-13",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 13,
    "prompt": "Di dunia pembuatan konten kreatif digital, apa cara etis seorang kreator muda dalam menggunakan perangkat Generative AI (seperti Midjourney atau ChatGPT)? 🎨🤖",
    "visualHint": "⚖️ AI Ethics & Authorship",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan AI sebagai alat eksplorasi konsep dan inspirasi awal, lalu mengembangkannya dengan sentuhan kreativitas orisinal serta mencantumkan atribusi secara transparan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyalin 100% hasil keluaran AI dan mengakuinya murni buatan tangan sendiri tanpa diedit",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menggunakan AI untuk memalsukan suara dan wajah orang lain tanpa izin (Deepfake jahat)",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menolak semua kemajuan teknologi AI sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-14",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 14,
    "prompt": "Kamu ingin merancang robot asisten belajar mandiri untuk siswa di daerah terpencil yang minim akses sinyal internet 📡❌. Solusi arsitektur apa yang kamu terapkan?",
    "visualHint": "🤖 Edge AI & Offline-First",
    "options": [
      {
        "id": "A",
        "text": "Arsitektur \"Edge AI / Offline-First\" di mana model bahasa AI berukuran ringkas (SLM) dijalankan langsung di perangkat mini komputer lokal (seperti Raspberry Pi)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengharuskan koneksi fiber optik 1 Gbps setiap detik",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membatalkan proyek karena tidak ada sinyal",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya menggunakan kertas koran bekas",
        "score": 5
      }
    ]
  },
  {
    "id": "te-cre-15",
    "tier": "teens",
    "category": "creativity",
    "sectionNumber": 5,
    "questionNumber": 15,
    "prompt": "Apa visi teknologi terbesarmu yang ingin kamu wujudkan 10 tahun dari sekarang untuk kemajuan bangsa Indonesia? 🇮🇩🚀",
    "visualHint": "🌟 Future Tech Leadership",
    "options": [
      {
        "id": "A",
        "text": "Membangun ekosistem teknologi mandiri yang mencetak generasi tech innovators berintegritas tinggi yang mampu memecahkan masalah riil bangsa dan bersaing di kancah global",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya menjadi pengguna konsumtif aplikasi luar negeri",
        "score": 0
      },
      {
        "id": "C",
        "text": "Bekerja asal dapat uang tanpa peduli dampak sosial dan etika teknologi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Meninggalkan dunia sains dan teknologi selamanya",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-ps-1",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 1,
    "prompt": "Website yang kamu deploy mendadak lambat dibuka saat jumlah pengunjung mencapai 1.000 orang bersamaan. Hipotesis pertama yang paling masuk akal untuk diinvestigasi adalah...?",
    "visualHint": "🌐 ⏱️ 📈 Server Bottleneck Analysis",
    "options": [
      {
        "id": "A",
        "text": "Melakukan profiling kinerja: memeriksa query database yang lambat (kurang indeks), beban CPU/RAM server, atau caching data statis",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung mengganti seluruh bahasa pemrograman dari awal",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyalahkan browser para pengunjung",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghapus setengah gambar di website secara acak",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-ps-2",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 2,
    "prompt": "Penerapan konsep \"Git Version Control\": Kamu secara tidak sengaja membuat bug fatal di commit terbaru dan ingin kembali ke versi kode yang berjalan stabil kemarin. Perintah atau aksi yang tepat adalah...?",
    "visualHint": "🐙 Git: Rollback to previous stable state",
    "options": [
      {
        "id": "A",
        "text": "Melakukan `git revert` atau `git checkout/restore` ke commit stabil sebelumnya untuk mengisolasi perubahan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus folder repository lokal dan komputer di-format",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mencoba mengingat setiap huruf yang diedit kemarin secara manual",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengirimkan versi rusak tersebut ke pengguna tanpa peduli",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-ps-3",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 3,
    "prompt": "Masalah Optimasi Knapsack (Ransel): Ranselmu mampu menampung beban maksimal 10 kg. Ada 4 barang: A (7kg, $70), B (5kg, $60), C (5kg, $50), D (2kg, $25). Kombinasi barang manakah yang memberikan total nilai tertinggi tanpa melebihi kapasitas?",
    "visualHint": "Kapasitas <= 10 kg. Cari nilai ($) maksimal.",
    "options": [
      {
        "id": "A",
        "text": "Barang B (5kg) + Barang C (5kg) = 10kg, bernilai $110",
        "score": 20
      },
      {
        "id": "B",
        "text": "Barang A (7kg) + Barang D (2kg) = 9kg, bernilai $95",
        "score": 10
      },
      {
        "id": "C",
        "text": "Barang A (7kg) saja = 7kg, bernilai $70",
        "score": 5
      },
      {
        "id": "D",
        "text": "Barang B (5kg) + Barang D (2kg) = 7kg, bernilai $85",
        "score": 8
      }
    ]
  },
  {
    "id": "tn-ps-4",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 4,
    "prompt": "Dalam arsitektur cybersecurity, kamu diminta mengamankan sistem autentikasi dari serangan SQL Injection. Pendekatan pencegahan paling efektif adalah...?",
    "visualHint": "🛡️ SQL Injection Prevention Standard",
    "options": [
      {
        "id": "A",
        "text": "Menggunakan Prepared Statements (Parameterized Queries) dan validasi input yang ketat",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyimpan password pengguna dalam bentuk teks polos (plain text)",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya menyembunyikan form login dari menu navigasi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengandalkan captcha saja tanpa memperbaiki query database",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-ps-5",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 5,
    "prompt": "Sebuah fungsi rekursif mengalami error \"Maximum call stack size exceeded\" (Stack Overflow). Apa penyebab paling umum dari masalah ini?",
    "visualHint": "🔁 Function call stack keeps growing infinitely",
    "options": [
      {
        "id": "A",
        "text": "Fungsi rekursif tidak memiliki kondisi batas berhenti (base case) atau parameternya tidak pernah menuju kondisi batas",
        "score": 20
      },
      {
        "id": "B",
        "text": "Komputer kehabisan memori harddisk fisik",
        "score": 0
      },
      {
        "id": "C",
        "text": "Variabel string terlalu pendek",
        "score": 0
      },
      {
        "id": "D",
        "text": "Monitor komputer tidak mendukung resolusi tinggi",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-6",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 6,
    "prompt": "Aplikasi web yang baru dideploy ke server produksi tiba-tiba mengalami error HTTP 502 Bad Gateway saat menerima 5.000 pengguna bersamaan. Langkah investigasi sistematis pertama apa yang kamu lakukan?",
    "visualHint": "🛠️ SRE Root Cause Analysis (502 Bad Gateway)",
    "options": [
      {
        "id": "A",
        "text": "Memeriksa log Nginx/Reverse Proxy dan status proses service backend (systemctl status / pm2 logs) untuk melihat apakah aplikasi crash atau kehabisan socket koneksi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung menghapus seluruh database produksi tanpa backup",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyalahkan penyedia domain",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mematikan server dan pura-pura tidak tahu",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-7",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 7,
    "prompt": "Dalam arsitektur frontend web, terjadi masalah \"Memory Leak\" di mana penggunaan RAM browser terus meningkat drastis setiap kali pengguna berpindah halaman. Penyebab paling umum adalah:",
    "visualHint": "🧠 Frontend Memory Leak Debugging",
    "options": [
      {
        "id": "A",
        "text": "Event listener, timer interval, atau subscription WebSocket yang lupa dibersihkan (cleanup) saat komponen di-unmount",
        "score": 20
      },
      {
        "id": "B",
        "text": "Penggunaan font huruf berwarna merah",
        "score": 0
      },
      {
        "id": "C",
        "text": "Resolusi layar monitor pengguna terlalu besar",
        "score": 5
      },
      {
        "id": "D",
        "text": "CSS margin padding terlalu lebar",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-8",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 8,
    "prompt": "Query basis data PostgreSQL milikmu: \"SELECT * FROM orders WHERE customer_email = 'user@beekoding.id'\" berjalan sangat lambat (memakan waktu 4 detik dari 2 juta baris data). Solusi optimasi paling efektif adalah:",
    "visualHint": "⚡ Database Indexing Optimization",
    "options": [
      {
        "id": "A",
        "text": "Menambahkan indeks B-Tree pada kolom \"customer_email\" (CREATE INDEX idx_orders_email ON orders(customer_email))",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghapus 1,9 juta data transaksi lama dari database",
        "score": 5
      },
      {
        "id": "C",
        "text": "Membeli komputer server yang harganya sepuluh kali lipat lebih mahal",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengubah nama kolom menjadi huruf kecil",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-9",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 9,
    "prompt": "Saat menguji keamanan API endpoint login, kamu menemukan bahwa siapapun bisa menebak password ribuan kali per detik tanpa batas. Mekanisme pertahanan apa yang wajib diimplementasikan?",
    "visualHint": "🛡️ Rate Limiting & Brute Force Defense",
    "options": [
      {
        "id": "A",
        "text": "Rate Limiting (pembatasan request per IP/akun), CAPTCHA adaptif, dan penguncian akun sementara setelah 5 kali gagal berturut-turut",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menghilangkan tombol submit login",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyimpan password dalam format teks terbuka tanpa enkripsi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Meminta pengguna login hanya di siang hari",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pro-10",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 10,
    "prompt": "Ketika melakukan profiling performa aplikasi Node.js, kamu menemukan bahwa CPU usage mencapai 100% konstan karena adanya operasi algoritma enkripsi sinkron berat di Event Loop. Solusi arsitekturalnya adalah:",
    "visualHint": "⚙️ Node.js Worker Threads & Offloading",
    "options": [
      {
        "id": "A",
        "text": "Mengalihkan kalkulasi CPU-intensive ke Worker Threads atau background queue worker terpisah agar tidak memblokir Event Loop utama",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menjalankan program di dalam loop while(true) tanpa jeda",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menghapus enkripsi data pengguna",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mematikan antivirus komputer",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pro-11",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 11,
    "prompt": "Dua orang pengguna di belahan dunia berbeda mengedit dokumen kolaboratif yang sama secara simultan tanpa internet (offline). Saat kembali online, algoritma resolusi data apa yang biasa digunakan oleh Google Docs atau Figma?",
    "visualHint": "🤝 CRDT & Operational Transformation",
    "options": [
      {
        "id": "A",
        "text": "CRDT (Conflict-free Replicated Data Types) atau Operational Transformation (OT) untuk menggabungkan suntingan tanpa data loss",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menimpa (overwrite) file dengan versi siapa pun yang sinyalnya lebih cepat",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menghapus dokumen kedua pengguna secara otomatis",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menampilkan pesan error dan mengunci dokumen",
        "score": 5
      }
    ]
  },
  {
    "id": "te-pro-12",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 12,
    "prompt": "Kamu menemukan bug kritis di production di mana total diskon voucher belanja menjadi minus, sehingga pengguna justru membayar lebih murah dari harga modal. Langkah tanggap insiden (Incident Response) yang tepat:",
    "visualHint": "🚨 Production Hotfix Workflow",
    "options": [
      {
        "id": "A",
        "text": "Segera nonaktifkan kode promo terkait (circuit breaker), lakukan reproduksi bug di environment staging, tulis unit test pencegah regresi, lalu deploy hotfix",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyembunyikan masalah dan berharap tidak ada yang menyadari",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyalahkan programmer junior di grup WhatsApp publik",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghapus kode sumber repository proyek",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-13",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 13,
    "prompt": "Website milikmu sering mengalami lonjakan trafik tak terduga (traffic spikes) saat peluncuran event pendaftaran kelas. Strategi arsitektur cloud apa yang paling ekonomis dan elastis?",
    "visualHint": "☁️ Cloud Auto Scaling & Serverless",
    "options": [
      {
        "id": "A",
        "text": "Penerapan Auto-scaling group berbasis Cloud/Serverless dan CDN (Content Delivery Network) untuk caching aset statis di edge servers",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyewa server fisik super besar termahal sepanjang tahun meskipun sering menganggur",
        "score": 5
      },
      {
        "id": "C",
        "text": "Membatasi kuota pengunjung hanya 10 orang per hari",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menutup pendaftaran website",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-14",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 14,
    "prompt": "Dalam arsitektur microservices, bagaimana cara menangani situasi di mana satu service pembayaran gagal di tengah proses checkout barang agar data antar database tidak inkonsisten?",
    "visualHint": "🔄 Saga Pattern & Distributed Transactions",
    "options": [
      {
        "id": "A",
        "text": "Menerapkan Saga Pattern dengan transaksi kompensasi (Compensating Transactions) untuk membatalkan langkah-langkah sebelumnya secara aman",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membiarkan data barang terpotong meskipun pembayaran gagal",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menggabungkan semua database menjadi satu file Excel",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mematikan semua microservice di server",
        "score": 0
      }
    ]
  },
  {
    "id": "te-pro-15",
    "tier": "teens",
    "category": "problem_solving",
    "sectionNumber": 6,
    "questionNumber": 15,
    "prompt": "Di proyek Machine Learning, model yang kamu latih mendapatkan akurasi 99.8% pada data training, tetapi hanya mendapatkan akurasi 62% pada data pengujian baru (data test). Masalah apa yang dialami model ini?",
    "visualHint": "📉 Overfitting vs Underfitting",
    "options": [
      {
        "id": "A",
        "text": "Overfitting (model menghafal noise data latih sehingga kehilangan kemampuan generalisasi pada data baru)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Underfitting",
        "score": 5
      },
      {
        "id": "C",
        "text": "Data leakage murni",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hardware komputer rusak",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-lan-1",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 1,
    "prompt": "Dokumentasi API menuliskan status response `404 Not Found` dan `401 Unauthorized`. Jika aplikasi klien gagal mengakses profil user karena belum menyertakan token autentikasi, status manakah yang tepat diharapkan?",
    "visualHint": "HTTP Status Code Conventions: 401 vs 404",
    "options": [
      {
        "id": "A",
        "text": "401 Unauthorized (klien belum terautentikasi secara sah)",
        "score": 20
      },
      {
        "id": "B",
        "text": "404 Not Found (endpoint hilang)",
        "score": 5
      },
      {
        "id": "C",
        "text": "200 OK (berhasil)",
        "score": 0
      },
      {
        "id": "D",
        "text": "500 Internal Server Error",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-lan-2",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 2,
    "prompt": "Saat menulis dokumentasi teknis (README.md) untuk repositori GitHub proyek pribadimu, susunan informasi yang paling profesional adalah...?",
    "visualHint": "📄 Standar Repositori Open Source / Portofolio Coder",
    "options": [
      {
        "id": "A",
        "text": "Judul & deskripsi ringkas ➔ Preview visual/demo ➔ Fitur utama ➔ Panduan instalasi/setup ➔ Panduan berkontribusi & lisensi",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya mencantumkan satu baris: \"Proyek coding saya\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menempelkan seluruh source code mentah ke dalam README",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membiarkan README kosong",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-lan-3",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 3,
    "prompt": "Ketika melakukan Code Review terhadap pull request teman satu tim, gaya penyampaian kritik mana yang paling konstruktif?",
    "visualHint": "🤝 Constructive Code Review Culture",
    "options": [
      {
        "id": "A",
        "text": "\"Keren implementasinya! Ada sedikit saran di baris 42: bagaimana jika memakai map() agar lebih ringkas dan mudah dibaca? Menurutmu bagaimana?\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Kodinganmu berantakan dan jelek sekali, tolong ganti semuanya.\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengabaikan pull request tanpa memberikan tanggapan apa pun",
        "score": 0
      },
      {
        "id": "D",
        "text": "Langsung approve tanpa memeriksa kodenya sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-lan-4",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 4,
    "prompt": "Klien non-teknis bertanya: \"Apa bedanya Frontend dan Backend?\" Penjelasan sederhana dan akurat mana yang paling tepat diberikan kepada mereka?",
    "visualHint": "💡 Komunikasi Teknis ke Khalayak Awam",
    "options": [
      {
        "id": "A",
        "text": "\"Frontend adalah bagian tampilan luar restoran (meja, buku menu indah yang dilihat pelanggan), sedangkan Backend adalah dapur di belakang (koki, resep, dan gudang bahan yang mengolah pesanan).\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Frontend itu HTML CSS Javascript, Backend itu Node.js PostgreSQL Docker Kubernetes.\" (Terlalu teknis membingungkan)",
        "score": 10
      },
      {
        "id": "C",
        "text": "\"Keduanya sama saja tidak ada bedanya sama sekali.\"",
        "score": 0
      },
      {
        "id": "D",
        "text": "\"Anda tidak perlu tahu karena Anda bukan programmer.\"",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-lan-5",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 5,
    "prompt": "Sebuah fungsi diberi nama: `calculate_monthly_compound_interest_rate()`. Mengapa penamaan variabel/fungsi yang deskriptif dan jelas sangat penting dalam rekayasa software?",
    "visualHint": "Clean Code & Self-Documenting Code Principle",
    "options": [
      {
        "id": "A",
        "text": "Memudahkan pemeliharaan kode (maintainability), membuat kode mudah dibaca tim tanpa harus menebak maksud singkatan yang samar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Agar ukuran file program menjadi semakin berat",
        "score": 0
      },
      {
        "id": "C",
        "text": "Hanya agar terlihat pintar di hadapan guru",
        "score": 0
      },
      {
        "id": "D",
        "text": "Tidak ada manfaatnya, lebih baik memakai nama singkatan 1 huruf seperti x()",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-6",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 6,
    "prompt": "Dalam metodologi Agile Software Development, istilah \"User Story\" ditulis dengan pola baku yang berfokus pada nilai pengguna, yaitu:",
    "visualHint": "📋 Format Standar User Story",
    "options": [
      {
        "id": "A",
        "text": "\"Sebagai [tipe pengguna], saya ingin [tujuan/keinginan], sehingga [alasan/manfaat yang didapat]\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Programmer harus mengetik kode 100 baris dalam 1 jam\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "\"Database SQL harus memiliki 10 tabel\"",
        "score": 5
      },
      {
        "id": "D",
        "text": "\"Komputer harus dinyalakan jam 8 pagi\"",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-7",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 7,
    "prompt": "Apa perbedaan mendasar antara parameter formal dan argumen aktual dalam sebuah fungsi pemrograman?",
    "visualHint": "📝 Parameter vs Argument",
    "options": [
      {
        "id": "A",
        "text": "Parameter adalah variabel penampung yang didefinisikan pada deklarasi fungsi, sedangkan Argumen adalah nilai konkret yang dilewatkan saat fungsi dipanggil",
        "score": 20
      },
      {
        "id": "B",
        "text": "Parameter untuk angka, argumen untuk teks",
        "score": 5
      },
      {
        "id": "C",
        "text": "Keduanya adalah istilah sinonim tanpa perbedaan teknis",
        "score": 5
      },
      {
        "id": "D",
        "text": "Argumen ditulis di dalam file CSS",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-8",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 8,
    "prompt": "Saat melakukan \"Pull Request (PR) Code Review\" terhadap kode rekan satu tim, cara memberikan masukan yang paling profesional dan membangun adalah:",
    "visualHint": "🤝 Constructive Code Review Feedback",
    "options": [
      {
        "id": "A",
        "text": "\"Keren fiturnya sudah berjalan! Bagaimana kalau di baris 42 kita gunakan metode find() alih-alih nested loop agar kompleksitasnya lebih hemat dari O(n²) ke O(n)?\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"Kode ini jelek sekali, siapa yang mengajari kamu nulis begini?\"",
        "score": 0
      },
      {
        "id": "C",
        "text": "Langsung me-reject PR tanpa memberikan catatan alasan sama sekali",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menyetujui (Approve) semua PR tanpa membaca isinya sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "te-lan-9",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 9,
    "prompt": "Istilah \"Idempotent API\" memiliki padanan definisi semantik bahasa:",
    "visualHint": "🌐 Definisi Semantik Idempoten",
    "options": [
      {
        "id": "A",
        "text": "Sifat operasi yang memberikan hasil akhir status sistem yang sama persis terlepas dari berapa kali operasi tersebut diulang",
        "score": 20
      },
      {
        "id": "B",
        "text": "Sistem yang hanya bisa dijalankan satu kali seumur hidup",
        "score": 5
      },
      {
        "id": "C",
        "text": "Bahasa pemrograman yang tidak memerlukan kompilasi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Koneksi internet tanpa kabel",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-10",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 10,
    "prompt": "Di dokumen spesifikasi API open standard (seperti OpenAPI / Swagger), status kode HTTP \"401 Unauthorized\" berbeda maknanya dengan \"403 Forbidden\". Apa letak perbedaannya?",
    "visualHint": "🛡️ HTTP 401 vs HTTP 403",
    "options": [
      {
        "id": "A",
        "text": "401 menandakan pengguna belum terautentikasi (belum login/token tidak valid), sedangkan 403 menandakan pengguna sudah login tetapi tidak memiliki hak akses (permission)",
        "score": 20
      },
      {
        "id": "B",
        "text": "401 untuk error server, 403 untuk error jaringan",
        "score": 5
      },
      {
        "id": "C",
        "text": "Keduanya memiliki arti yang sama persis",
        "score": 0
      },
      {
        "id": "D",
        "text": "403 artinya server sedang restart",
        "score": 5
      }
    ]
  },
  {
    "id": "te-lan-11",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 11,
    "prompt": "Dalam paradigma Object-Oriented Programming (OOP), konsep \"Polymorphism\" (Polimorfisme) secara harfiah dan konsep berarti:",
    "visualHint": "🧬 OOP Polymorphism",
    "options": [
      {
        "id": "A",
        "text": "\"Banyak Bentuk\" - kemampuan objek dari class turunan yang berbeda untuk merespons pemanggilan method yang sama dengan perilaku spesifik masing-masing",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyembunyikan variabel privat agar tidak bisa diakses dari luar (Enkapsulasi)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Membuat salinan class menjadi 10 file berbeda",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menghapus objek dari memori",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-12",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 12,
    "prompt": "Dokumen arsitektur \"RFC\" (Request for Comments) dalam komunitas teknologi dunia (seperti IETF) digunakan untuk:",
    "visualHint": "📜 Internet Standards RFC Documents",
    "options": [
      {
        "id": "A",
        "text": "Mempublikasikan proposal teknis, standar protokol internet, dan spesifikasi teknologi terbuka untuk ditinjau dan disepakati oleh komunitas global",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengirimkan surat tagihan pembayaran hosting server",
        "score": 0
      },
      {
        "id": "C",
        "text": "Membuat postingan opini media sosial",
        "score": 5
      },
      {
        "id": "D",
        "text": "Sertifikat garansi laptop",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-13",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 13,
    "prompt": "Ketika menulis commit message di Git, konvensi standar internasional \"Conventional Commits\" menyarankan format seperti:",
    "visualHint": "🌿 Conventional Commits Standard",
    "options": [
      {
        "id": "A",
        "text": "\"feat(auth): add OAuth2 Google login button\" atau \"fix(cart): resolve discount price rounding issue\"",
        "score": 20
      },
      {
        "id": "B",
        "text": "\"update kode 123 selesai\"",
        "score": 5
      },
      {
        "id": "C",
        "text": "\"fix bug pliss bisa\"",
        "score": 5
      },
      {
        "id": "D",
        "text": "\"asdfghjk\"",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-14",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 14,
    "prompt": "Prinsip desain rekayasa perangkat lunak \"SOLID\": Huruf \"S\" dalam SOLID merupakan singkatan dari:",
    "visualHint": "🏗️ SOLID Principles - Single Responsibility",
    "options": [
      {
        "id": "A",
        "text": "Single Responsibility Principle (Sebuah class/modul hanya boleh memiliki satu alasan untuk berubah / satu tanggung jawab)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Secure Operating Layer Integration Design",
        "score": 5
      },
      {
        "id": "C",
        "text": "Speed Optimization Loop Iteration Data",
        "score": 5
      },
      {
        "id": "D",
        "text": "Synchronous Output Logic Interface Definition",
        "score": 0
      }
    ]
  },
  {
    "id": "te-lan-15",
    "tier": "teens",
    "category": "language",
    "sectionNumber": 7,
    "questionNumber": 15,
    "prompt": "Dalam presentasi teknis di depan investor atau pimpinan teknologi (Tech Pitching), aturan \"Elevator Pitch\" menuntut kemampuan:",
    "visualHint": "⏱️ Concise Tech Communication",
    "options": [
      {
        "id": "A",
        "text": "Menyampaikan proposisi nilai unik produk, masalah yang dipecahkan, dan keunggulan arsitektur secara memikat dalam durasi 30-60 detik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Berbicara secepat mungkin tanpa jeda bernapas",
        "score": 5
      },
      {
        "id": "C",
        "text": "Menggunakan istilah teknis bahasa Inggris serumit mungkin agar pendengar bingung",
        "score": 5
      },
      {
        "id": "D",
        "text": "Menghindari berbicara tentang solusi masalah",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-per-1",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 1,
    "prompt": "Kamu mencoba menginstal framework AI / library baru, tetapi muncul puluhan pesan kegagalan dependency yang rumit di terminal. Sikapmu?",
    "visualHint": "💻 ⚙️ NPM/Pip Dependency Conflict",
    "options": [
      {
        "id": "A",
        "text": "Menganalisis konflik versi satu per satu, membaca dokumentasi resmi instalasi, dan mencari log solusi di GitHub Issues atau StackOverflow",
        "score": 20
      },
      {
        "id": "B",
        "text": "Langsung menyerah dan memutuskan tidak akan pernah memakai AI lagi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memukul keyboard dan menyalahkan operating system",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membiarkan error tersebut berlarut-larut tanpa mencari tahu",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-per-2",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 2,
    "prompt": "Di era teknologi yang bergerak sangat cepat dengan hadirnya AI tools baru setiap bulan, bagaimana cara kamu menjaga relevansi skill-mu?",
    "visualHint": "🚀 Continuous Lifelong Learning",
    "options": [
      {
        "id": "A",
        "text": "Memiliki mindset pembelajar sepanjang hayat: rutin bereksperimen dengan teknologi baru sambil tetap memperkuat fundamental logika dan algoritma dasar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menolak semua teknologi baru dan hanya memakai apa yang dipelajari 5 tahun lalu",
        "score": 0
      },
      {
        "id": "C",
        "text": "Khawatir berlebihan bahwa AI akan menggantikan segalanya tanpa mau beradaptasi",
        "score": 5
      },
      {
        "id": "D",
        "text": "Mengikuti tren secara membabi buta tanpa memahami konsep intinya",
        "score": 10
      }
    ]
  },
  {
    "id": "tn-per-3",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 3,
    "prompt": "Ketika kamu mengerjakan proyek portofolio pribadi jangka panjang (misal aplikasi full-stack 1 bulan), apa yang membantumu konsisten menyelesaikannya?",
    "visualHint": "🎯 Project Milestone & Self-Discipline",
    "options": [
      {
        "id": "A",
        "text": "Memecah proyek ke dalam target mingguan/harian (sprint kecil), merayakan progres bertahap, dan komitmen waktu rutin setiap hari",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengandalkan *mood* sesaat; kalau sedang malas maka proyek ditinggalkan selamanya",
        "score": 5
      },
      {
        "id": "C",
        "text": "Begadang 3 hari berturut-turut tanpa tidur lalu jatuh sakit",
        "score": 5
      },
      {
        "id": "D",
        "text": "Membiarkan proyek menumpuk menjadi ide setengah jadi yang tak pernah selesai",
        "score": 0
      }
    ]
  },
  {
    "id": "tn-per-4",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 4,
    "prompt": "Jika karyamu dalam sebuah kompetisi coding nasional tidak berhasil meraih juara, bagaimana kamu merefleksikannya?",
    "visualHint": "🏆 ➔ 🌱 Growth Mindset vs Fixed Mindset",
    "options": [
      {
        "id": "A",
        "text": "Menjadikannya bahan evaluasi berharga: meminta feedback juri, mempelajari karya para juara, dan mempersiapkan proyek yang lebih matang untuk ajang berikutnya",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merasa diri tidak berbakat di dunia komputer lalu berhenti coding",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menuduh juri tidak adil tanpa memeriksa kualitas proyek sendiri",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghapus karya dan melupakannya begitu saja",
        "score": 5
      }
    ]
  },
  {
    "id": "tn-per-5",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 5,
    "prompt": "Apa motivasi terbesarmu dalam mempelajari dunia pemrograman dan teknologi digital?",
    "visualHint": "🌟 Personal Purpose & Impact",
    "options": [
      {
        "id": "A",
        "text": "Mampu menciptakan solusi nyata yang bermanfaat bagi banyak orang dan mengekspresikan inovasi kreatif melalui teknologi masa depan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya karena disuruh orang tua tanpa ada ketertarikan pribadi",
        "score": 8
      },
      {
        "id": "C",
        "text": "Hanya ingin pamer di media sosial",
        "score": 5
      },
      {
        "id": "D",
        "text": "Belum tahu tujuannya sama sekali",
        "score": 5
      }
    ]
  },
  {
    "id": "te-per-6",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 6,
    "prompt": "Di tengah malam saat jadwal rilis penting, sebuah bug heisenbug (bug misterius yang sulit direproduksi di lokal) muncul di server staging. Mentalitas engineer seperti apa yang kamu miliki?",
    "visualHint": "🦉 Tenang, Metodis, dan Ulet",
    "options": [
      {
        "id": "A",
        "text": "Mengisolasi variabel lingkungan (environment variables), membaca trace log terperinci, menulis skrip replikasi stres test, dan mengatasinya secara metodis tanpa panik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Panik dan langsung mematikan laptop untuk tidur",
        "score": 0
      },
      {
        "id": "C",
        "text": "Menyalahkan rekan tim yang sedang istirahat",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengubah kode secara acak di server produksi langsung tanpa diuji",
        "score": 5
      }
    ]
  },
  {
    "id": "te-per-7",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 7,
    "prompt": "Dunia teknologi dan kecerdasan buatan berkembang dengan kecepatan eksponensial. Bagaimana strategimu untuk tetap relevan dan kompetitif sebagai software engineer masa depan?",
    "visualHint": "📚 Lifelong Learning Mindset",
    "options": [
      {
        "id": "A",
        "text": "Mengadopsi pola pikir pembelajar seumur hidup (Lifelong Learner): menguasai fundamental computer science yang kokoh, aktif membaca riset/paper baru, dan rutin membangun proyek eksperimental mandiri",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merasa sudah paling pintar setelah menguasai satu framework saja dan menolak mempelajari hal baru",
        "score": 0
      },
      {
        "id": "C",
        "text": "Berhenti ngoding karena merasa takut digantikan oleh AI",
        "score": 5
      },
      {
        "id": "D",
        "text": "Hanya mengikuti tren media sosial tanpa mempraktikkannya",
        "score": 5
      }
    ]
  },
  {
    "id": "te-per-8",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 8,
    "prompt": "Kamu menghabiskan waktu dua minggu membangun arsitektur sistem, tetapi saat diuji di benchmark skala besar, performanya tidak memenuhi target latency. Sikapmu terhadap refactoring adalah:",
    "visualHint": "🔄 Arsitektur Refactoring Tanpa Ego",
    "options": [
      {
        "id": "A",
        "text": "Menyingkirkan ego (ego-less programming), menganalisis bottleneck secara objektif berdasarkan data profiler, dan siap merefaktor bagian yang tidak efisien demi kualitas terbaik",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mempertahankan arsitektur yang lambat tersebut hanya karena sudah terlanjur dibuat lama (Sunk Cost Fallacy)",
        "score": 5
      },
      {
        "id": "C",
        "text": "Memalsukan hasil data benchmark agar terlihat cepat",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengundurkan diri dari proyek",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-9",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 9,
    "prompt": "Ketika berkontribusi pada proyek open-source bereputasi global, Pull Request milikmu menerima puluhan komentar perbaikan dan kritik tajam dari maintainer internasional. Respon profesionalmu:",
    "visualHint": "🌍 Open Source Collaboration & Grit",
    "options": [
      {
        "id": "A",
        "text": "Menerima kritik sebagai kesempatan emas untuk belajar standar kelas dunia, merespons setiap feedback dengan sopan, dan memperbaiki kode hingga disetujui (merged)",
        "score": 20
      },
      {
        "id": "B",
        "text": "Merasa tersinggung, membalas dengan kata-kata kasar di komentar GitHub, lalu menutup PR",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengabaikan komentar dan menghapus akun GitHub",
        "score": 0
      },
      {
        "id": "D",
        "text": "Membuat akun palsu untuk menyerang maintainer",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-10",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 10,
    "prompt": "Sebuah proyek startup teknologi yang kamu rintis bersama teman sekolah mengalami kegagalan produk pertama karena kurangnya peminat pasar (market fit). Pelajaran apa yang kamu petik?",
    "visualHint": "🚀 Pivot & Resilience",
    "options": [
      {
        "id": "A",
        "text": "Mewawancarai calon pengguna untuk memahami kebutuhan riil mereka, mengambil pelajaran berharga tentang validasi ide, dan melakukan pivot ke solusi yang lebih dibutuhkan pasar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyalahkan masyarakat karena dianggap tidak melek teknologi",
        "score": 0
      },
      {
        "id": "C",
        "text": "Trauma dan bersumpah tidak akan pernah berinovasi lagi",
        "score": 0
      },
      {
        "id": "D",
        "text": "Menghabiskan tabungan untuk iklan tanpa memperbaiki produk",
        "score": 5
      }
    ]
  },
  {
    "id": "te-per-11",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 11,
    "prompt": "Disiplin terbaik dalam menjaga kesehatan fisik dan mental (ergonomi & burnout prevention) seorang developer remaja yang produktif adalah:",
    "visualHint": "🧘 Healthy Ergonomics & Work-Life Balance",
    "options": [
      {
        "id": "A",
        "text": "Menjaga postur duduk ergonomis, menerapkan aturan 20-20-20 untuk relaksasi mata, rutin berolahraga, dan tidur teratur 7-8 jam per hari",
        "score": 20
      },
      {
        "id": "B",
        "text": "Begadang setiap malam dengan konsumsi minuman berkafein berlebihan tanpa olahraga",
        "score": 0
      },
      {
        "id": "C",
        "text": "Ngoding 24 jam tanpa henti di tempat gelap",
        "score": 0
      },
      {
        "id": "D",
        "text": "Hanya tidur 2 jam per hari",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-12",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 12,
    "prompt": "Kamu sedang mempelajari materi kecerdasan buatan tingkat lanjut (misal: Transformer Architecture atau Reinforcement Learning) yang sarat dengan matematika kalkulus dan aljabar linier kompleks. Caramu menghadapinya:",
    "visualHint": "📐 Menguasai Matematika AI",
    "options": [
      {
        "id": "A",
        "text": "Menguraikan rumus matematika secara bertahap, memvisualisasikan operasi matriks melalui simulasi grafis/kode Python, dan tidak ragu mengulang kembali materi dasar matematika yang belum lancar",
        "score": 20
      },
      {
        "id": "B",
        "text": "Menyerah pada halaman pertama buku teks",
        "score": 0
      },
      {
        "id": "C",
        "text": "Mengabaikan matematika dan hanya memakai library jadi tanpa mengerti cara kerjanya",
        "score": 10
      },
      {
        "id": "D",
        "text": "Menganggap matematika tidak berguna di era digital",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-13",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 13,
    "prompt": "Di dalam tim engineering, kamu bertindak sebagai Tech Lead yang harus memimpin pembagian tugas sprint. Ketika ada anggota tim yang mengalami kesulitan teknis, tindakanmu adalah:",
    "visualHint": "👥 Servant Leadership & Pair Programming",
    "options": [
      {
        "id": "A",
        "text": "Mengajaknya melakukan sesi Pair Programming, membantu mengurai blocker teknisnya secara suportif, dan menciptakan budaya tim yang tidak takut mengakui ketidaktahuan untuk belajar bersama",
        "score": 20
      },
      {
        "id": "B",
        "text": "Mengambil alih seluruh pekerjaannya sendirian sambil mengeluh",
        "score": 5
      },
      {
        "id": "C",
        "text": "Memarahi anggota tim tersebut di depan rapat umum sprint",
        "score": 0
      },
      {
        "id": "D",
        "text": "Mengeluarkannya dari proyek secara sepihak",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-14",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 14,
    "prompt": "Dalam dunia cybersecurity (keamanan siber), integritas etis seorang \"White Hat Hacker\" (Hacker Beretika) diuji saat menemukan celah kerentanan berbahaya di sistem perbankan. Tindakan yang benar adalah:",
    "visualHint": "🛡️ Responsible Vulnerability Disclosure",
    "options": [
      {
        "id": "A",
        "text": "Melaporkan celah tersebut secara privat dan bertanggung jawab kepada tim keamanan institusi terkait (Responsible Disclosure) melalui program Bug Bounty resmi tanpa mengeksploitasi data nasabah",
        "score": 20
      },
      {
        "id": "B",
        "text": "Membocorkan data nasabah ke forum internet gelap (Dark Web) demi ketenaran",
        "score": 0
      },
      {
        "id": "C",
        "text": "Memeras pihak bank untuk meminta uang tebusan secara ilegal",
        "score": 0
      },
      {
        "id": "D",
        "text": "Memanfaatkan celah untuk mencuri saldo rekening secara diam-diam",
        "score": 0
      }
    ]
  },
  {
    "id": "te-per-15",
    "tier": "teens",
    "category": "persistence",
    "sectionNumber": 8,
    "questionNumber": 15,
    "prompt": "Apa motivasi terdalammu dalam memilih jalur ilmu komputer, coding, dan teknologi sebagai passion hidupmu? 🌟🚀",
    "visualHint": "💡 Higher Purpose & Meaningful Impact",
    "options": [
      {
        "id": "A",
        "text": "Kemampuan untuk mengubah baris-baris logika abstrak menjadi produk nyata yang memecahkan penderitaan manusia, membuka akses pendidikan berkualitas, dan memperluas batas peradaban masa depan",
        "score": 20
      },
      {
        "id": "B",
        "text": "Hanya ingin gaji besar tanpa peduli moralitas produk yang dibuat",
        "score": 5
      },
      {
        "id": "C",
        "text": "Karena ikut-ikutan teman saja",
        "score": 5
      },
      {
        "id": "D",
        "text": "Tidak ada alasan khusus",
        "score": 0
      }
    ]
  }
];
