export interface FAQItem {
  id: string;
  category: 'umum' | 'metode' | 'perangkat' | 'sertifikasi';
  question: string;
  answer: string;
  isPopular?: boolean;
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'Semua Pertanyaan' },
  { id: 'umum', label: 'Umum & Pendaftaran' },
  { id: 'metode', label: 'Metode & Jadwal' },
  { id: 'perangkat', label: 'Perangkat & Alat' },
  { id: 'sertifikasi', label: 'Sertifikat & Portofolio' },
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'umum',
    question: 'Apakah anak harus memiliki dasar koding atau matematika tinggi sebelumnya?',
    answer:
      'Sama sekali tidak perlu! Kurikulum Beekoding dirancang bertahap dari level pengenalan (Zero Experience). Untuk usia 6–9 tahun, pembelajaran dimulai dengan visual block coding berbasis Scratch yang interaktif seperti menyusun balok lego. Anak akan diajak memahami konsep logika dan algoritma secara menyenangkan tanpa tekanan rumus rumit.',
    isPopular: true,
  },
  {
    id: 'faq-2',
    category: 'perangkat',
    question: 'Perangkat dan spesifikasi apa yang dibutuhkan untuk belajar?',
    answer:
      'Anak hanya membutuhkan 1 unit Laptop atau Komputer (PC) dengan sistem operasi Windows atau macOS, dilengkapi webcam, microphone, dan koneksi internet stabil minimal 10 Mbps. Semua aplikasi dan platform belajar yang kami gunakan bersifat ringan dan berbasis peramban (browser-based) atau open-source tanpa perlu laptop spek gaming.',
    isPopular: true,
  },
  {
    id: 'faq-3',
    category: 'metode',
    question: 'Bagaimana metode dan format kelas belajarnya?',
    answer:
      'Kelas berlangsung secara Live Interactive via Google Meet bersama mentor berpengalaman. Rasio kelas kami buat sangat eksklusif, maksimal 4 anak per kelas (atau kelas privat 1-on-1), sehingga setiap anak mendapat bimbingan intensif dan mentor dapat memantau kode layar anak secara langsung (screen-share guidance).',
    isPopular: true,
  },
  {
    id: 'faq-4',
    category: 'metode',
    question: 'Bagaimana jika anak berhalangan hadir pada sesi kelas tertentu?',
    answer:
      'Orang tua tidak perlu khawatir. Setiap sesi kelas direkam (full class recording) dan diunggah ke Portal Siswa untuk dipelajari kembali kapan saja. Jika ada kendala sakit atau agenda keluarga, orang tua dapat mengajukan sesi pengganti (Make-up Class) dengan konfirmasi sebelumnya kepada tim operasional.',
    isPopular: false,
  },
  {
    id: 'faq-5',
    category: 'sertifikasi',
    question: 'Apakah siswa akan memperoleh sertifikat resmi dan portofolio?',
    answer:
      'Ya! Setiap siswa yang menuntaskan modul akan mendapatkan Sertifikat Digital Resmi ber-QR Code verifikasi unik yang dapat diakses di Portal Siswa Beekoding, diprint dengan kualitas sertifikat penghargaan, atau ditautkan ke CV/portofolio akademis sekolah.',
    isPopular: true,
  },
  {
    id: 'faq-6',
    category: 'umum',
    question: 'Apakah ada kelas uji coba gratis (Free Trial Class)?',
    answer:
      'Tentu ada! Kami menyediakan sesi Free Trial Class & Diagnostic Bakat Digital bagi orang tua dan anak untuk merasakan langsung serunya belajar bersama mentor Beekoding sebelum mendaftar program reguler.',
    isPopular: true,
  },
  {
    id: 'faq-7',
    category: 'sertifikasi',
    question: 'Bagaimana orang tua memantau perkembangan belajar anak?',
    answer:
      'Beekoding menyediakan Portal Siswa & Wali Murid terpadu. Orang tua dapat melihat riwayat kehadiran, rekap nilai kuis, rapor akademik semesteran berkala, serta kumpulan karya game dan proyek aplikasi yang berhasil dibuat oleh anak.',
    isPopular: false,
  },
  {
    id: 'faq-8',
    category: 'perangkat',
    question: 'Berapa usia ideal anak untuk mulai belajar di Beekoding?',
    answer:
      'Program kami dirancang untuk anak dan remaja usia 6 hingga 18 tahun (SD, SMP, hingga SMA/SMK). Pembagian kelas disesuaikan dengan usia dan tingkat kematangan berpikir anak melalui hasil Diagnostic Assessment awal.',
    isPopular: false,
  },
];
