import event1Img from '../assets/images/event-1.png';
import event2Img from '../assets/images/event-2.png';
import event3Img from '../assets/images/event-3.png';
import event4Img from '../assets/images/event-4.png';
import event5Img from '../assets/images/event-5.png';
import event6Img from '../assets/images/event-6.png';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'bootcamp' | 'workshop' | 'showcase' | 'competition';
  title: string;
  caption: string;
  location: string;
  date: string;
  metricBadge: string;
  learningImpact: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: string;
  studentQuote?: {
    name: string;
    grade: string;
    text: string;
  };
}

export const galleryCategories = [
  { id: 'all', label: 'Semua Kegiatan' },
  { id: 'bootcamp', label: 'Summer Bootcamp' },
  { id: 'workshop', label: 'School & Workshop' },
  { id: 'showcase', label: 'Demo Day & Portofolio' },
  { id: 'competition', label: 'Lab & Hands-on' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'act-1',
    type: 'image',
    category: 'bootcamp',
    title: 'Hands-on AI Prompting & Logika Kreatif',
    caption: 'Siswa mempraktikkan langsung perancangan instruksi cerdas untuk Generative AI dan menghubungkannya dengan logika komputasi.',
    location: 'Beekoding Learning Hive, Jakarta',
    date: 'Juni 2026',
    metricBadge: '25 Siswa / Batch Intensif',
    learningImpact: 'Menguasai Prompt Engineering, Logika Algoritma & Creative Thinking',
    thumbnailUrl: event1Img,
    studentQuote: {
      name: 'Kenzo (Grade 5)',
      grade: 'SD Mentari',
      text: 'Awalnya ngira coding susah, tapi di Beekoding diajarin bikin game sendiri pakai AI, seru banget!',
    },
  },
  {
    id: 'act-2',
    type: 'video',
    category: 'showcase',
    title: 'Demo Day: Pameran Aplikasi & Game Mandiri Siswa',
    caption: 'Presentasi langsung karya proyek AI dan game mandiri siswa di hadapan para orang tua, mentor, dan dewan juri tamu.',
    location: 'Grand Auditorium Beekoding Hub',
    date: 'Juli 2026',
    metricBadge: '100% Proyek Mandiri Berfungsi',
    learningImpact: 'Melatih Public Speaking, Problem Solving & Portofolio Nyata',
    thumbnailUrl: event2Img,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2:30 Menit Highlight',
    studentQuote: {
      name: 'Nadia (Grade 8)',
      grade: 'SMP Bintang Mandiri',
      text: 'Bisa nunjukin aplikasi pendeteksi suasana hati buatan sendiri ke mama papa bikin bangga banget!',
    },
  },
  {
    id: 'act-3',
    type: 'image',
    category: 'workshop',
    title: 'Immersive Mobile Planetarium 360° & STEM Astro-Code',
    caption: 'Petualangan sains antariksa imersif dalam kubah tiup 360° berpadu simulasi algoritma pelacakan satelit dan konstelasi bintang.',
    location: 'Mitra Sekolah Global Prestasi',
    date: 'Mei 2026',
    metricBadge: '300+ Siswa Terinspirasi',
    learningImpact: 'Menghubungkan Sains Astronomi Dunia Nyata dengan Kode Komputer',
    thumbnailUrl: event3Img,
    studentQuote: {
      name: 'Rian (Grade 6)',
      grade: 'SD Al-Azhar',
      text: 'Masuk ke kubah bintangnya keren abis! Terus diajarin logika gimana teleskop bisa melacak planet.',
    },
  },
  {
    id: 'act-4',
    type: 'image',
    category: 'competition',
    title: 'Eksperimen Machine Learning Teachable Machine',
    caption: 'Anak-anak melatih model Computer Vision langsung dengan webcam laptop untuk mengenali gestur tangan dan objek nyata.',
    location: 'Lab Riset Beekoding',
    date: 'April 2026',
    metricBadge: 'Computer Vision Hands-on',
    learningImpact: 'Memahami Cara Kerja Dataset, Algoritma Pelatihan & Akurasi Prediksi AI',
    thumbnailUrl: event4Img,
    studentQuote: {
      name: 'Fahri (Grade 7)',
      grade: 'SMP Citra Kasih',
      text: 'Sekarang aku paham gimana AI bisa tahu muka orang. Ternyata seru banget pas model AI-nya berhasil nebak benar!',
    },
  },
  {
    id: 'act-5',
    type: 'video',
    category: 'workshop',
    title: 'Workshop Guru: Transformasi Pedagogi AI Ramah Anak',
    caption: 'Sesi bimbingan intensif bagi tenaga pendidik sekolah mitra untuk mengintegrasikan alat bantu AI ke dalam modul ajar kelas interaktif.',
    location: 'Ruang Edukasi Akar Inti Teknologi',
    date: 'Maret 2026',
    metricBadge: '65+ Pendidik Tersertifikasi',
    learningImpact: 'Standarisasi Pengajaran Coding & Etika AI untuk Sekolah Dasar-Menengah',
    thumbnailUrl: event5Img,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:15 Menit Recap',
  },
  {
    id: 'act-6',
    type: 'image',
    category: 'showcase',
    title: 'Wisuda & Penyerahan Sertifikat Junior AI Expert',
    caption: 'Momen kebanggaan para siswa berprestasi yang berhasil menuntaskan 24 sesi kurikulum dan memamerkan portofolio mandiri.',
    location: 'Beekoding Main Hall',
    date: 'Februari 2026',
    metricBadge: 'Sertifikasi Terakreditasi',
    learningImpact: 'Apresiasi Resmi & Portofolio Bukti Kompetensi Masa Depan',
    thumbnailUrl: event6Img,
  },
];

export const galleryImpactHighlights = [
  {
    value: '100%',
    label: 'Karya Nyata Mandiri',
    sublabel: 'Setiap anak pulang membawa portofolio game & proyek AI buatan sendiri',
  },
  {
    value: '1 : 6',
    label: 'Rasio Mentor & Siswa',
    sublabel: 'Pendampingan intensif & personal agar setiap anak terpantau optimal',
  },
  {
    value: '65+',
    label: 'Kemitraan Sekolah',
    sublabel: 'Dipercaya sekolah-sekolah unggulan untuk workshop teknologi masa depan',
  },
  {
    value: '12+ Thn',
    label: 'Fondasi Pendidik',
    sublabel: 'Metode pedagogi teruji oleh praktisi Akar Inti Teknologi & Beekoding',
  },
];
