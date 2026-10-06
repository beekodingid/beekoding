export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Coding Anak' | 'Artificial Intelligence' | 'Parenting Digital' | 'Game Dev';
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: BlogAuthor;
  tags: string[];
  content: string;
}

export const BLOG_CATEGORIES = [
  'Semua',
  'Coding Anak',
  'Artificial Intelligence',
  'Parenting Digital',
  'Game Dev',
] as const;

export const blogArticles: BlogArticle[] = [
  {
    slug: '5-alasan-anak-belajar-coding-ai-sejak-dini',
    title: '5 Alasan Mengapa Anak Perlu Belajar Coding & AI Sejak Dini di Era Digital',
    excerpt: 'Belajar koding bukan sekadar mencetak programmer masa depan, melainkan melatih computational thinking, daya nalar kritis, dan problem solving sejak usia emas.',
    category: 'Coding Anak',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-15',
    readTimeMinutes: 5,
    author: {
      name: 'Tim Akademik Beekoding',
      role: 'Curriculum & Pedagogy Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Coding Anak', 'Computational Thinking', 'Pendidikan Masa Depan', 'Logika Berpikir'],
    content: `
## Mengapa Coding Jadi Keterampilan Fundamental Abad ke-21?

Di masa lalu, literasi dasar anak didefinisikan sebagai kemampuan membaca, menulis, dan berhitung (*calistung*). Namun di dekade ini, ketika kecerdasan buatan (Artificial Intelligence) dan otomatisasi merambah ke seluruh lini industri, **literasi digital dan koding telah menjadi bahasa universal kedua**.

Mengajarkan koding kepada anak usia sekolah (6–18 tahun) bukanlah tentang memaksa mereka menjadi software engineer profesional di masa kecil. Yang sesungguhnya diajarkan adalah **Computational Thinking**—sebuah cara terstruktur untuk membedah masalah kompleks, mengidentifikasi pola, dan merumuskan solusi logis langkah demi langkah.

Berikut 5 alasan fundamental mengapa anak yang belajar koding sejak dini memiliki keunggulan kompetitif di masa depan:

---

### 1. Mengasah Logika dan Pemecahan Masalah (Problem Solving)
Saat membuat program komputer atau game sederhana, anak akan sering menemui *bug* (kesalahan kode). Proses mencari letak kesalahan (*debugging*) melatih mental pantang menyerah. Anak tidak lagi melihat kegagalan sebagai jalan buntu, melainkan teka-teki yang bisa dipecahkan melalui penalaran deduktif.

### 2. Mengubah Konsumen Menjadi Kreator Teknologi
Sebagian besar anak saat ini menghabiskan 3–6 jam sehari di depan gawai hanya untuk scrolling media sosial atau bermain game pasif. Dengan belajar koding, pola pikir mereka berbalik 180 derajat:
- Dari sekadar *pemain game* menjadi *perancang game*.
- Dari sekadar *penonton animasi* menjadi *pembuat cerita interaktif*.

### 3. Membangun Daya Tahan Mental dan Resiliensi
Di dunia koding, jarang ada kode yang langsung bekerja sempurna pada percobaan pertama. Siklus: **Merancang -> Mencoba -> Menemukan Error -> Memperbaiki** menumbuhkan *growth mindset*. Anak menjadi terbiasa menghadapi tantangan tanpa rasa takut berlebihan.

### 4. Persiapan Nyata Menghadapi Era Generative AI
AI tidak akan menggantikan manusia, tetapi orang yang memahami cara berinteraksi dan memerintahkan AI akan menggantikan mereka yang buta teknologi. Anak yang memahami dasar logika pemrograman memiliki intuisi alami dalam memberikan prompt sistematis kepada AI (Prompt Engineering) dan memvalidasi keakuratan hasilnya.

### 5. Memperkuat Pemahaman Matematika dan Sains Terapan
Konsep abstrak seperti koordinat cartesius (X, Y), sudut rotasi (derajat), variabel, dan probabilitas menjadi sangat konkret saat diterapkan di dalam blok koding Scratch atau skrip Python. Anak melihat langsung hubungan antara rumus matematika dan pergerakan karakter di layar monitor.

---

> **💡 Kesimpulan untuk Orang Tua:**
> Mulailah dari langkah kecil yang menyenangkan. Kenalkan anak dengan visual block-coding seperti Scratch atau Blockly sebelum beralih ke teks. Yang terpenting bukanlah kecepatan menghafal sintaks, melainkan kegembiraan mereka dalam berkreasi dan memecahkan tantangan.
    `,
  },
  {
    slug: 'panduan-scratch-coding-anak-usia-6-9-tahun',
    title: 'Panduan Lengkap Scratch Coding untuk Anak Usia 6-9 Tahun: Dari Nol Sampai Bikin Game Pertama',
    excerpt: 'Cara paling efektif mengenalkan logika pemrograman pada anak usia dini tanpa pusing menghafal kode teks rumit, lengkap dengan contoh proyek seru.',
    category: 'Coding Anak',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-22',
    readTimeMinutes: 6,
    author: {
      name: 'Kak Rian Saputra',
      role: 'Senior Scratch & Robotics Instructor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Scratch 3.0', 'Visual Coding', 'Game Maker', 'Junior Explorer'],
    content: `
## Mengenal Scratch: Pintu Gerbang Menyenangkan ke Dunia Coding

Dikembangkan oleh laboratorium riset bergengsi **MIT Media Lab**, Scratch adalah platform pemrograman visual berbasis blok warna-warni yang dirancang khusus untuk anak-anak usia 6–16 tahun.

Alih-alih mengetik sintaks bahasa Inggris yang rawan kesalahan tanda titik koma (syntax error), anak cukup menyusun balok logika seperti menyusun balok **LEGO**. Jika balok-balok tersebut cocok secara logika, sprite karakter di layar akan bergerak, berbicara, atau bereaksi sesuai perintah.

---

### Komponen Utama di Antarmuka Scratch
1. **Stage (Panggung):** Tempat di mana karakter (Sprite) dan latar belakang (Backdrop) menjalankan aksinya.
2. **Sprite & Backdrop:** Objek grafis dan latar cerita yang bisa diprogram atau digambar sendiri oleh anak.
3. **Block Palette:** Kumpulan balok perintah yang dikelompokkan berdasarkan warna:
   - 🔵 **Motion (Gerakan):** Mengatur posisi X, Y, langkah, dan rotasi.
   - 🟣 **Looks (Tampilan):** Mengubah kostum, efek grafis, dan balon percakapan.
   - 🟡 **Events (Pemicu):** Mengatur awal mula aksi (misal: "When Green Flag Clicked" atau "When Key Pressed").
   - 🟠 **Control (Kendali Alur):** Pengulangan (*repeat, forever*) dan percabangan (*if-then-else*).
   - 🟢 **Operators:** Logika perbandingan (<, =, >) dan operasi matematika.
   - 🟤 **Variables:** Kotak penyimpan skor, nyawa, atau timer game.

---

### Proyek Pertama yang Direkomendasikan: "Catch The Falling Apple"

Game ini sangat disukai anak-anak pemula karena mudah dipahami dan memberikan kepuasan instan:

1. **Sprite yang Digunakan:** Mangkuk (*Bowl*) dan Buah Apel (*Apple*).
2. **Logika Mangkuk:** Digerakkan ke kiri dan kanan mengikuti tombol panah keyboard atau posisi kursor mouse:
   \`\`\`
   when green flag clicked
   forever
       set x to (mouse x)
   \`\`\`
3. **Logika Apel Jatuh:** Muncul di posisi koordinat X acak di bagian atas layar, lalu meluncur ke bawah:
   \`\`\`
   when green flag clicked
   forever
       go to x: (pick random -200 to 200) y: 160
       repeat until <touching edge? or touching Bowl?>
           change y by -5
       if <touching Bowl?> then
           change [Score v] by 1
           start sound [Pop v]
   \`\`\`

---

### Tips untuk Orang Tua Mendampingi Anak Belajar Scratch:
- **Jangan mengambil alih mouse:** Biarkan anak yang mengklik dan menarik blok sendiri meskipun mereka ragu.
- **Ajukan pertanyaan pemantik:** Daripada memberi tahu jawaban langsung, tanyakan *"Menurut adik, kenapa apelnya tidak mau jatuh? Blok apa yang mengatur gravitasi?"*.
- **Apresiasi ide ceritanya:** Izinkan mereka menggambar karakter kartun favorit mereka sendiri.
    `,
  },
  {
    slug: 'python-vs-scratch-kapan-anak-siap-koding-teks',
    title: 'Python vs Scratch: Kapan Waktu Tepat Anak Beralih ke Bahasa Pemrograman Tekstual?',
    excerpt: 'Perbandingan komprehensif antara visual block coding dan bahasa Python profesional. Kenali tanda-tanda kesiapan anak agar tidak frustrasi.',
    category: 'Coding Anak',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-28',
    readTimeMinutes: 7,
    author: {
      name: 'Tim Akademik Beekoding',
      role: 'Curriculum & Pedagogy Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Python', 'Scratch', 'Transisi Koding', 'Intermediate Coder'],
    content: `
## Dilema Orang Tua: Kapan Anak Harus Mulai Belajar Python?

Banyak orang tua yang beranggapan bahwa Scratch hanyalah "mainan anak-anak" dan ingin langsung mendorong putra-putrinya belajar Python sejak usia 7 atau 8 tahun. Namun dalam pedagogi edukasi teknologi, **transisi yang terlalu dini justru bisa mematikan minat belajar anak**.

Mari kita bedah perbedaan esensial antara Scratch dan Python, serta kapan waktu emas bagi anak untuk beralih.

---

### Tabel Perbandingan: Scratch vs Python

| Parameter | Scratch 3.0 | Python |
| :--- | :--- | :--- |
| **Bentuk Kode** | Visual Drag-and-Drop Blocks | Teks Sintaksis Berbasis Baris |
| **Usia Ideal** | 6 – 10 Tahun (SD Awal - Menengah) | 10 – 18+ Tahun (SD Akhir, SMP, SMA) |
| **Toleransi Typo** | 100% Bebas Typo (Tidak ada syntax error) | Sensitif terhadap huruf kapital, titik koma, dan indentasi |
| **Fokus Belajar** | Logika dasar, alur algoritma, kreativitas cerita | Struktur data, manipulasi algoritma, AI, backend |
| **Output Proyek** | Game 2D, animasi, kartu interaktif | Otomasi, game Pygame, machine learning, web app |

---

### 4 Tanda Anak Sudah Siap Beralih ke Python

1. **Kemampuan Mengetik Keyboard (Touch Typing) yang Cukup Lancar:**
   Jika anak masih membutuhkan waktu 10 detik hanya untuk mencari tombol kurung siku \`[\` atau tanda titik dua \`:\`, belajar koding teks akan terasa melelahkan.
2. **Sudah Menguasai Konsep Variabel & Loop di Scratch:**
   Anak sudah paham betul cara kerja *if-else bertingkat*, *nested loop*, fungsi (*My Blocks*), dan pembuatan variabel global vs lokal.
3. **Mulai Merasa Terbatasi oleh Fitur Scratch:**
   Anak mulai bertanya: *"Kak, bisa nggak game ini disimpan datanya ke database?"* atau *"Bisa nggak bikin bot Discord yang otomatis jawab chat?"*.
4. **Usia Minimal 10 atau 11 Tahun:**
   Pada usia ini, kemampuan berpikir abstrak (*formal operational stage*) menurut psikologi perkembangan Piaget telah mulai terbentuk matang.

---

### Jembatan Transisi: Python Turtle Graphics
Agar anak tidak kaget saat pertama kali melihat layar hitam-putih terminal koding, Beekoding menggunakan metode transisi **Python Turtle**. Dengan modul ini, perintah Python yang diketik anak akan langsung memvisualisasikan goresan gambar di layar, mempertahankan elemen visual yang seru seperti di Scratch.
    `,
  },
  {
    slug: 'mengenalkan-ai-dan-machine-learning-ramah-anak',
    title: 'Mengenalkan Artificial Intelligence & Machine Learning Secara Seru dan Aman untuk Anak',
    excerpt: 'Bagaimana mengajarkan cara kerja kecerdasan buatan, computer vision, dan neural network pada anak tanpa rumus kalkulus yang rumit.',
    category: 'Artificial Intelligence',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-01',
    readTimeMinutes: 6,
    author: {
      name: 'Dr. Aris Kusuma, M.Kom',
      role: 'AI Ethics & Education Consultant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Teens Innovator'],
    content: `
## AI Ada di Sekeliling Anak Kita: Dari YouTube hingga Face Unlock

Saat ini, anak-anak berinteraksi dengan AI setiap hari tanpa mereka sadari:
- Algoritma rekomendasi video YouTube Kids dan TikTok.
- Filter wajah lucu di kamera smartphone.
- Fitur auto-complete saat mengetik pesan.
- Asisten suara seperti Siri atau Google Assistant.

Namun, kebanyakan anak menganggap AI sebagai "keajaiban magis" di dalam komputer. Tugas kita sebagai pendidik dan orang tua adalah **membongkar kotak hitam (black box)** tersebut agar mereka paham prinsip kerja sains di baliknya.

---

### Konsep Dasar AI yang Bisa Diajarkan pada Anak

1. **Bagaimana Komputer "Belajar" (Supervised Learning):**
   Manusia belajar dari pengalaman; AI belajar dari data. Kita mengajarkan anak analogi sederhana:
   *"Jika kita ingin mengajari komputer membedakan kucing dan anjing, kita tidak menulis aturan telinga atau ekor secara manual. Kita memberikan 1.000 foto kucing berlabel 'Kucing' dan 1.000 foto anjing berlabel 'Anjing'. Komputer akan mencari pola pikselnya sendiri."*

2. **Computer Vision & Deteksi Pose (PoseNet):**
   Anak diajak membuat game interaktif menggunakan webcam di mana karakter game digerakkan dengan gerakan tubuh asli anak (misal: melompat di depan kamera untuk membuat karakter melompati rintangan).

3. **Etika AI & Bias Data (Responsible AI):**
   Anak diajarkan bahwa AI bisa salah jika data pelatihannya tidak lengkap atau berat sebelah. Hal ini memupuk kesadaran kritis agar mereka tidak menelan mentah-mentah hasil generatif AI.

---

### Platform Latihan AI Terbaik untuk Siswa Sekolah:
- **Google Teachable Machine:** Alat berbasis web gratis untuk melatih model klasifikasi gambar, suara, dan pose tubuh dalam hitungan menit tanpa koding satu baris pun.
- **Machine Learning for Kids:** Mengintegrasikan model Machine Learning yang telah dilatih langsung ke dalam proyek Scratch 3.0.
- **OpenAI Vision & Text API Playground:** Untuk jenjang remaja (Teens Innovator) yang siap membangun aplikasi web pintar dengan Python dan React.
    `,
  },
  {
    slug: 'tips-digital-parenting-ubah-konsumen-jadi-kreator',
    title: 'Tips Digital Parenting: Mengubah Anak dari "Konsumen Gadget" Menjadi "Kreator Digital"',
    excerpt: 'Strategi praktis bagi orang tua masa kini untuk mengatasi kecanduan screen time anak dan mengalihkannya menjadi karya produktif yang membanggakan.',
    category: 'Parenting Digital',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-03',
    readTimeMinutes: 5,
    author: {
      name: 'Tim Psikologi Pendidikan Beekoding',
      role: 'Child Development Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Digital Parenting', 'Screen Time', 'Kreator Digital', 'Karakter Anak'],
    content: `
## Screen Time: Musuh atau Peluang Emas?

Kekhawatiran terbesar orang tua modern adalah **screen time yang tidak terkendali**. Anak yang tantrum saat gawainya diambil, nilai sekolah yang menurun, hingga berkurangnya interaksi sosial di dunia nyata.

Namun, di era teknologi saat ini, melarang total penggunaan gawai (*cold turkey*) bukanlah solusi realistis. Anak justru akan tertinggal dalam literasi teknologi yang sangat dibutuhkan di masa depan mereka.

Kuncinya bukanlah **menghilangkan layar**, melainkan **mengubah jenis screen time dari pasif menjadi aktif-kreatif**.

---

### Dua Jenis Screen Time yang Wajib Diketahui Orang Tua:

1. **Screen Time Konsumtif (Pasif):**
   - Menonton video shorts / reels berjam-jam tanpa henti.
   - Bermain game arcade instan yang memicu dopamine rush tanpa tantangan kognitif.
   - *Dampak:* Rentang konsentrasi memendek, malas berpikir analitis.

2. **Screen Time Produktif (Aktif & Kreatif):**
   - Merancang logika koding game sendiri di Scratch atau Roblox Studio.
   - Mengedit video presentasi atau menggambar ilustrasi digital.
   - Belajar merakit sirkuit robotik virtual.
   - *Dampak:* Melatih fokus panjang, daya nalar, dan kebanggaan atas karya cipta.

---

### 4 Langkah Menerapkan Aturan "Create Before Consume" di Rumah

1. **Prinsip "Bikin Dulu Baru Nonton":**
   Buat kesepakatan sehat: sebelum anak boleh menonton hiburan YouTube selama 30 menit, mereka harus menyelesaikan 1 tantangan koding atau membaca modul edukasi selama 30 menit terlebih dahulu.
2. **Jadilah Suporter Pertama Karyanya:**
   Ketika anak berhasil membuat game sederhana, luangkan waktu 10 menit untuk memainkannya bersama. Pujilah kerja keras logika di balik gamenya, bukan sekadar grafisnya.
3. **Sediakan Ekosistem dan Mentor Komunitas:**
   Anak akan jauh lebih bersemangat jika mereka memiliki teman sebaya yang memiliki minat sama dan mentor yang membimbing secara sabar dan terstruktur.
4. **Berikan Batasan Fisik yang Konsisten:**
   Pastikan anak belajar di meja belajar yang ergonomis dengan pencahayaan cukup, bukan sambil rebahan di kasur atau di ruangan gelap.
    `,
  },
  {
    slug: 'roblox-studio-belajar-koding-dan-game-design',
    title: 'Roblox Studio untuk Belajar Koding: Melatih Kreativitas 3D dan Logika Scripting Lua',
    excerpt: 'Mengapa Roblox Studio adalah media pembelajaran terbaik untuk mengajarkan konsep fisika 3D, koordinat ruang, dan bahasa pemrograman Lua.',
    category: 'Game Dev',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-05',
    readTimeMinutes: 6,
    author: {
      name: 'Kak Dimas Prasetyo',
      role: 'Game Development & Roblox Studio Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    },
    tags: ['Roblox Studio', 'Lua Scripting', 'Game Design', '3D Modeling'],
    content: `
## Dari Gamer Roblox Menjadi Game Developer Sungguhan

Sebagian besar anak usia 8–15 tahun menggemari game Roblox. Namun sedikit yang menyadari bahwa di balik game-game tersebut terdapat software penciptaan profesional bernama **Roblox Studio**.

Roblox Studio bukan sekadar alat bermain, melainkan engine game 3D berkekuatan penuh yang menggunakan bahasa pemrograman nyata bernama **Lua**.

---

### Apa yang Dipelajari Anak Melalui Roblox Studio?

1. **Pemahaman Ruang 3D & Koordinat Kartesius (X, Y, Z):**
   Anak belajar memposisikan objek di dunia virtual tiga dimensi, memahami rotasi (Yaw, Pitch, Roll), serta skala ukuran. Hal ini secara langsung memperkuat penalaran spasial mereka di pelajaran geometri sekolah.
2. **Simulasi Fisika Terapan:**
   Konsep gaya berat (*gravity*), massa benda, gaya gesek, pantulan (*elasticity*), dan tabrakan (*collision*) diterapkan secara langsung pada setiap objek (Part).
3. **Bahasa Pemrograman Lua:**
   Lua adalah bahasa scripting teks yang sangat ringan, cepat, dan digunakan secara industri di berbagai game engine (termasuk World of Warcraft dan Angry Birds). Anak mempelajari:
   - Event Handling: \`part.Touched:Connect(onHit)\`
   - Kondisi & Variabel: Memeriksa apakah pemain memiliki kunci sebelum pintu terbuka.
   - Sistem Checkpoint & Leaderboard: Menyimpan data skor dan progres pemain.

---

### Contoh Script Sederhana: Membuat Lava Block (Kill Brick)
Berikut adalah contoh script pertama yang dibuat siswa saat merancang arena rintangan (Obby):

\`\`\`lua
local part = script.Parent

local function onTouch(otherPart)
    local character = otherPart.Parent
    local humanoid = character:FindFirstChildWhichIsA("Humanoid")
    if humanoid then
        humanoid.Health = 0 -- Karakter kalah jika menyentuh lava
    end
end

part.Touched:Connect(onTouch)
\`\`\`

Melalui proyek nyata seperti ini, anak tidak lagi melihat koding sebagai barisan teks yang membosankan, melainkan kunci rahasia untuk menghidupkan dunia imajinasi mereka!
    `,
  },
];
