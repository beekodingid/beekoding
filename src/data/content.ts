export interface ProgramItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  target: string;
  duration: string;
  batchSize: string;
  cta: string;
  isPopular?: boolean;
}

export interface ModuleItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  students: string;
  duration: string;
  features: string[];
  icon: string;
}

export interface AudienceItem {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface CurriculumPhase {
  phase: string;
  days: string;
  title: string;
  description: string;
  topics: string[];
}

export const siteConfig = {
  name: "Beekoding",
  domain: "beekoding.id",
  tagline: "Coding & AI for Future-Ready Minds",
  email: "halo@beekoding.id",
  phone: "+62 853-1131-7127",
  phoneRaw: "6285311317127",
  phoneDisplay: "+62 853-1131-7127",
  whatsappUrl: "https://wa.me/6285311317127?text=Halo%20Beekoding%2C%20saya%20ingin%20tanya%20mengenai%20program%20Coding%20%26%20AI.",
  heroHeading: "Empowering Young Minds with Coding & AI Skills for the Future",
  heroSubtitle: "Artificial Intelligence. Coding. Robotics. Creative Tech. Beekoding membimbing generasi muda untuk tidak hanya menjadi konsumen teknologi, tetapi pencipta masa depan yang percaya diri, logis, dan inovatif!",
  aboutText1: "Beekoding adalah ekosistem edukasi masa depan yang menjembatani gap antara kurikulum akademis konvensional dengan keahlian teknologi dunia nyata.",
  aboutText2: "Dunia digital bergerak cepat. Bersama Beekoding, kami membentuk anak-anak menjadi thinkers yang kritis, creators yang imajinatif, innovators yang tangkas, dan implementers yang siap berkarya.",
  aboutQuote: "Belajar coding dan AI semenyenangkan terbang bebas, semanis madu saat melihat karya pertama mereka berfungsi.",
};

export const statsData = [
  { value: "10,000+", label: "Siswa Belajar Coding" },
  { value: "65+", label: "Sekolah & Mitra Kampus" },
  { value: "12+", label: "Tahun Pengalaman Pendidik" },
  { value: "100%", label: "Hands-on & Proyek Nyata" },
];

export const flagshipPrograms: ProgramItem[] = [
  {
    id: "bootcamp",
    badge: "01",
    title: "Summer AI & Coding Bootcamp 2026",
    tagline: "Junior AI & Code Creator — Jangan Hanya Pakai AI, Mari Bikin Karyanya!",
    description: "Program intensif hands-on 25 hari untuk siswa Grade 4–10. Mempelajari AI creativity tools, coding logika (Scratch & Python), machine learning dasar, dan pembuatan proyek aplikasi AI mandiri. Kuota terbatas 25 siswa per batch.",
    features: [
      "AI Creative Tools (Prompt Engineering, Generatif Media)",
      "Logika Pemrograman Visual Scratch & Dasar Python",
      "Eksperimen Machine Learning dengan Teachable Machine",
      "Showcase Proyek Akhir & Sertifikat Resmi Junior AI Expert",
    ],
    target: "Grade 4 sampai 10",
    duration: "25 Hari (24 Sesi Pembelajaran)",
    batchSize: "Maksimal 25 Siswa / Batch",
    cta: "Lihat Kurikulum 24 Sesi",
    isPopular: true,
  },
  {
    id: "ai-school",
    badge: "02",
    title: "Beekoding AI & Tech Academy",
    tagline: "Learn Code. Solve Real Problems. Build Intelligent Systems.",
    description: "Kurikulum coding dan Artificial Intelligence terstruktur untuk siswa mulai dari jenjang SD, SMP, SMA, hingga Mahasiswa. Berfokus pada logika komputasional, otomasi cerdas, dan perancangan alur aplikasi modern.",
    features: [
      "Fondasi Pemrograman Komprehensif (Python, Web, Logic)",
      "Pemahaman Cara Kerja Model AI & Etika Digital",
      "Pengembangan Bot Cerdas & Otomasi Alur Kerja",
      "Penyelesaian Masalah Nyata Berbasis Studi Kasus",
    ],
    target: "Grade 6 hingga Mahasiswa",
    duration: "Program Semester / Tahunan",
    batchSize: "Kelas Terstruktur & Privat",
    cta: "Pelajari Academy",
  },
  {
    id: "planetarium",
    badge: "03",
    title: "Mobile Planetarium & Space Tech Drive",
    tagline: "Membawa Keajaiban Alam Semesta Langsung ke Kampus Sekolah",
    description: "Pengalaman belajar astronomi dan teknologi antariksa imersif kubah 360°. Dirancang untuk membangkitkan rasa ingin tahu ilmiah, cinta sains, dan wawasan kosmis generasi muda.",
    features: [
      "Kapasitas Hingga 600 Siswa / Hari",
      "40 Siswa per Sesi Kubah Imersif 360°",
      "Simulasi Luar Angkasa, Planetarium, dan Eksplorasi Galaksi",
      "Kunjungan Langsung ke Lokasi Sekolah Seluruh Wilayah",
    ],
    target: "Semua Jenjang Siswa (TK - SMA)",
    duration: "1–3 Hari Kunjungan Kampus",
    batchSize: "40 Siswa per Sesi Kubah",
    cta: "Undang ke Sekolah Anda",
  },
  {
    id: "skills-21st",
    badge: "04",
    title: "21st Century Skills & Creative Lab",
    tagline: "Communication • Critical Thinking • Collaboration • Creativity",
    description: "Workshop interaktif berbasis aktivitas langsung yang mengasah 4C (komunikasi, kolaborasi, berpikir kritis, dan kreativitas) yang krusial bagi masa depan anak di era digital.",
    features: [
      "Metodologi Pembelajaran Berbasis Aktivitas & Eksperimen",
      "Sesuai Pendekatan Pembelajaran Merdeka & Terapan",
      "Penilaian Portofolio Berbasis Kinerja Proyek Nyata",
      "Meningkatkan Kepercayaan Diri dan Kemampuan Presentasi",
    ],
    target: "Sekolah, Komunitas, & Lembaga",
    duration: "Modul Workshop Fleksibel",
    batchSize: "Kustom Sesuai Kebutuhan",
    cta: "Konsultasi Program",
  },
];

export const modularPrograms: ModuleItem[] = [
  {
    id: "robotics",
    title: "Robotics & IoT Day",
    tagline: "Eksplorasi Robotika & Coding Praktis",
    description: "Meningkatkan daya nalar logis melalui perakitan robot fisik sederhana, sensor elektronik, pemrograman dasar, dan kompetisi tantangan tim yang seru.",
    students: "Hingga 250 Siswa",
    duration: "1 Hari Penuh",
    icon: "Bot",
    features: [
      "Kit robotika fisik ramah anak",
      "Logika pemrograman sensor & motorik",
      "Tantangan memecahkan labirin tim",
      "Pengenalan dasar otomasi & IoT",
    ],
  },
  {
    id: "vr-experience",
    title: "Virtual Reality (VR) 360° Studio",
    tagline: "Petualangan Belajar Imersif 360°",
    description: "Sensasi belajar sains, anatomi biologi, sejarah peradaban, dan geografi dunia dalam visual 3D interaktif 360° yang seru dan membekas di ingatan.",
    students: "300+ Siswa",
    duration: "1 Hari Pengalaman",
    icon: "Glasses",
    features: [
      "Field trip virtual dasar samudra & luar angkasa",
      "Eksplorasi anatomi organ tubuh interaktif 3D",
      "Simulasi sejarah dan sains fisika menyenangkan",
      "Supervisi instruktur berpengalaman & aman",
    ],
  },
  {
    id: "workshops",
    title: "Skill-Based Tech Workshops",
    tagline: "Pengembangan Skill Digital Terarah",
    description: "Membekali siswa dengan keahlian praktis dalam pembuatan game sederhana, desain antarmuka aplikasi, serta public speaking saat mempresentasikan karya teknologi.",
    students: "Kelas Fleksibel",
    duration: "1–2 Hari",
    icon: "Lightbulb",
    features: [
      "Game development untuk pemula",
      "Kreativitas desain digital & UI dasar",
      "Latihan presentasi karya (Tech Pitching)",
      "Mindset eksploratif & problem solving",
    ],
  },
  {
    id: "teacher-training",
    title: "Teachers' AI & Tech Training",
    tagline: "Memberdayakan Pendidik di Era AI",
    description: "Pelatihan aplikatif bagi bapak/ibu guru untuk memanfaatkan teknologi AI terkini guna efisiensi pembuatan materi ajar, asesmen kreatif, dan metode mengajar interaktif.",
    students: "Semua Guru & Tenaga Pendidik",
    duration: "1–2 Hari Seminar/Workshop",
    icon: "GraduationCap",
    features: [
      "Pemanfaatan AI untuk bahan ajar interaktif",
      "Strategi pembelajaran berbasis proyek & tantangan",
      "Otomasi asesmen dan manajemen kelas modern",
      "Membangun motivasi belajar siswa masa kini",
    ],
  },
  {
    id: "school-growth",
    title: "School Tech Transformation Partner",
    tagline: "Kemitraan Transformasi Digital Sekolah",
    description: "Pendampingan menyeluruh bagi pimpinan sekolah untuk merancang lab coding masa depan, branding sekolah unggulan digital, serta program ekstrakurikuler berkelas.",
    students: "Pimpinan & Manajemen Sekolah",
    duration: "Kemitraan Berkelanjutan",
    icon: "TrendingUp",
    features: [
      "Roadmap kurikulum teknologi & AI sekolah",
      "Standardisasi lab komputer / inovasi modern",
      "Pelibatan orang tua lewat pameran karya siswa",
      "Branding sekolah masa depan berdaya saing",
    ],
  },
];

export const targetAudience: AudienceItem[] = [
  {
    title: "Siswa Sekolah (SD - SMA)",
    subtitle: "Grade 4–12",
    description: "Beralih dari sekadar bermain gadget menjadi pencipta game, coder Python, dan kreator aplikasi AI yang handal.",
    icon: "BookOpen",
  },
  {
    title: "Mahasiswa & Pemuda",
    subtitle: "Tingkat Lanjut & Karir",
    description: "Menguasai alur kerja kecerdasan buatan, otomasi cerdas, dan skill teknologi yang paling dicari industri.",
    icon: "Award",
  },
  {
    title: "Orang Tua Visioner",
    subtitle: "Keluarga Sadar Teknologi",
    description: "Mengubah waktu screen time anak menjadi waktu produktif yang mengasah masa depan dan kecerdasan logika.",
    icon: "HeartHandshake",
  },
  {
    title: "Sekolah & Institusi",
    subtitle: "Sekolah Berorientasi Masa Depan",
    description: "Menghadirkan kurikulum coding terkini, lab planetarium, dan workshop STEM turnkey tanpa kerumitan teknis.",
    icon: "School",
  },
];

export const whyChooseUs = [
  "Pendekatan Praktis & Proyek Nyata — Tidak hanya teori kaku",
  "Kombinasi Warna & Maskot Lebah Ceria — Anak senang, antusias, dan tidak bosan",
  "Dirancang oleh Pendidik & Praktisi Ahli Berpengalaman 12+ Tahun",
  "Kurikulum Berjenjang dari Dasar (Scratch) hingga Mahir (Python & AI)",
  "Pengalaman Imersif Spektakuler (Mobile Planetarium 360° & VR)",
  "Batasan Kelas Ketat: Maksimal 25 Siswa per Kelas untuk Bimbingan Intensif",
  "Setiap Siswa Membangun Portofolio Aplikasi Sendiri",
  "Sertifikasi Resmi Junior AI & Coding Creator",
];

export const founderData = {
  name: "Febri Hasan & Dewan Ahli Beekoding",
  title: "Founder & Chief Academic Strategist — Beekoding",
  credentials: "12+ Tahun Pengalaman Edukasi • Akar Inti Teknologi • Ahli Strategi Pendidikan",
  bio1: "Febri Hasan dan tim pengembang kurikulum Beekoding memiliki rekam jejak lebih dari 12 tahun dalam bidang inovasi teknologi pendidikan dan riset pedagogi. Berakar dari pengalaman di Akar Inti Teknologi, beliau memadukan standar teknologi industri modern dengan pendekatan belajar yang hangat dan mudah dipahami anak-anak.",
  bio2: "Sebagai founder dan praktisi teknologi pendidikan, beliau mendedikasikan Beekoding untuk mengubah paradigma menghafal menjadi budaya berpikir kreatif, eksperimen tanpa takut salah, dan menghasilkan karya nyata.",
  quote: "Anak-anak tidak hanya membutuhkan setumpuk teori. Mereka butuh kemampuan memecahkan masalah nyata dan rasa percaya diri untuk berinovasi.",
};

export const bootcampCurriculum: CurriculumPhase[] = [
  {
    phase: "Fase 1: Fondasi & Literasi Generative AI",
    days: "Sesi 1 – 5",
    title: "Mengenal Dunia Kecerdasan Buatan & AI Tools",
    description: "Siswa diajak memahami apa itu AI secara menyenangkan, etika digital, dan seni berkomunikasi efektif dengan AI (Prompt Engineering).",
    topics: [
      "Perjalanan Komputer hingga Munculnya Generative AI",
      "Berkenalan dengan AI Asisten Cerdas (ChatGPT, Claude, Gemini)",
      "Prompt Engineering: Seni Memberi Perintah Cerdas ke AI",
      "Etika Digital, Keamanan Siber & Cek Fakta Hasil AI",
    ],
  },
  {
    phase: "Fase 2: Studio Kreativitas Media AI",
    days: "Sesi 6 – 10",
    title: "Membuat Karya Seni, Musik & Cerita dengan AI",
    description: "Membuka potensi imajinasi visual dan audio anak menggunakan generator media berbasis AI terkini.",
    topics: [
      "Kreasi Ilustrasi Digital & Karakter Unik Menggunakan AI",
      "Sintesis Suara, Musik Latar & Efek Audio Digital",
      "Storyboarding Cerita Animasi & Video Interaktif",
      "Proyek Mini 1: Membuat Buku Cerita Bergambar Interaktif Mandiri",
    ],
  },
  {
    phase: "Fase 3: Logika Coding & Computational Thinking",
    days: "Sesi 11 – 15",
    title: "Dari Logika Visual Scratch ke Dasar Python",
    description: "Menghubungkan ide kreatif dengan logika coding pemrograman komputer yang terstruktur dan menyenangkan.",
    topics: [
      "Pola Berpikir Algoritmik & Diagram Alur (Flowchart)",
      "Pemrograman Visual Blok Interaktif dengan Scratch",
      "Dasar Bahasa Python: Variabel, Percabangan (If-Else), dan Perulangan (Loop)",
      "Proyek Mini 2: Membangun Bot Kuis Pintar Berbasis Python",
    ],
  },
  {
    phase: "Fase 4: Machine Learning in Action",
    days: "Sesi 16 – 20",
    title: "Melatih Model Kecerdasan Buatan Sendiri",
    description: "Praktik langsung bagaimana komputer belajar dari data gambar, suara, dan pose tubuh menggunakan Google Teachable Machine.",
    topics: [
      "Bagaimana Mesin Belajar dari Data Gambar & Suara",
      "Mengumpulkan Dataset & Melatih Model Pengenalan Wajah/Objek",
      "Menguji Akurasi Model & Menghindari Kesalahan Prediksi",
      "Proyek Mini 3: Aplikasi Game yang Dikendalikan Gerakan Tangan (Gesture)",
    ],
  },
  {
    phase: "Fase 5: Proyek Capstone & Demo Day",
    days: "Sesi 21 – 24",
    title: "Pembuatan Portofolio & Pameran Karya Akbar",
    description: "Siswa membangun proyek aplikasi AI utuh sesuai minat mereka dan mempresentasikannya di depan orang tua dan mentor.",
    topics: [
      "Bimbingan Intensif Ide Proyek Mandiri dari Nol",
      "Pembangunan Prototipe Aplikasi & Pengujian Bug",
      "Latihan Public Speaking & Pembuatan Slide Presentasi Menarik",
      "Demo Day: Pameran Proyek Akbar & Penyerahan Sertifikat Junior AI Expert",
    ],
  },
];
