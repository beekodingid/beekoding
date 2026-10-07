import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getWhatsAppInquiryUrl } from '../../data/content';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  Star,
  MessageCircle,
  Brain,
  Layers,
  ChevronDown,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

export type AgeLandingTier = 'sd' | 'teens';

interface AgeTierLandingPageProps {
  tier: AgeLandingTier;
  onBackToHome: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenTrialEvents?: () => void;
  onOpenBootcampModal?: () => void;
}

interface TierContent {
  tierBadge: string;
  ageLabel: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  targetPersona: string;
  keyBenefits: { icon: string; title: string; desc: string }[];
  curriculumSteps: {
    level: string;
    sessions: string;
    title: string;
    badge: string;
    desc: string;
    tools: string[];
    deliverables: string[];
  }[];
  projectShowcase: {
    title: string;
    student: string;
    tag: string;
    description: string;
    icon: string;
  }[];
  pricingPlans: {
    name: string;
    sessions: string;
    tag: string;
    isPopular?: boolean;
    price: string;
    desc: string;
    features: string[];
    inquiryMsg: string;
  }[];
  faqs: { q: string; a: string }[];
  testimonials: {
    parent: string;
    child: string;
    city: string;
    quote: string;
    avatar: string;
    rating: number;
  }[];
}

const TIER_DATA: Record<AgeLandingTier, TierContent> = {
  sd: {
    tierBadge: 'KHUSUS ANAK SD (USIA 6–10 TAHUN)',
    ageLabel: 'Usia 6–10 Tahun (TK B & SD Kelas 1–4)',
    heroTitle: 'Ubah Hobi Main Game Menjadi Prestasi Kreator Game & AI',
    heroHighlight: 'Belajar Coding Anak SD yang Menyenangkan & Bebas Stres',
    heroSubtitle:
      'Kurikulum visual berbasis Scratch 3.0 & Roblox ramah anak. Melatih daya nalar logis, fokus, dan kreativitas buah hati bersama mentor ramah berpengalaman.',
    targetPersona:
      'Sangat cocok untuk anak yang gemar bermain gadget/game, punya rasa ingin tahu tinggi, atau ingin diarahkan agar screen time-nya 100% produktif.',
    keyBenefits: [
      {
        icon: '🧩',
        title: 'Visual Block Coding (Zero Typing Burden)',
        desc: 'Tanpa mengetik kode rumit. Anak menyusun blok logika warna-warni layaknya bermain puzzle Lego virtual.',
      },
      {
        icon: '🧠',
        title: 'Melatih Logika & Problem Solving',
        desc: 'Membiasakan computational thinking: memahami urutan algoritma, sebab-akibat, perulangan, dan debugging mandiri.',
      },
      {
        icon: '👨‍🏫',
        title: 'Kelas Live Interaktif (Maksimal 4 Siswa)',
        desc: 'Pendampingan intensif bersama mentor sabar. Tersedia opsi kelas privat 1-on-1 atau kelompok kecil yang interaktif.',
      },
      {
        icon: '🏆',
        title: 'Portofolio Nyata & E-Sertifikat QR',
        desc: 'Setiap level menghasilkan game atau animasi ciptaan anak sendiri yang dapat dimainkan dan dibagikan ke keluarga.',
      },
    ],
    curriculumSteps: [
      {
        level: 'Level 1: Starter Minat',
        sessions: '12 Sesi (~3 Bulan)',
        title: 'Fondasi Logika Komputasional & Animasi Visual',
        badge: 'Pemula Ramah Anak',
        desc: 'Pengenalan Scratch 3.0, sistem koordinat layar, karakter sprite, event klik, perulangan (loops), dan Text-to-Speech AI.',
        tools: ['Scratch 3.0', 'Blockly Logic', 'Voice AI'],
        deliverables: [
          'Game Arcade Bee Honey Harvest mandiri',
          'Animasi kartu ucapan interaktif bersuara',
          'Sertifikat Kelulusan Level 1 & Raport Logika',
        ],
      },
      {
        level: 'Level 2: Semester Mastery',
        sessions: '24 Sesi (~6 Bulan)',
        title: 'Logika Game 2D, Variabel Skor & Sensor Kamera',
        badge: 'Paling Diminati Orang Tua',
        desc: 'Memperdalam variabel skor, timer, broadcast message, dan sensor video gerak webcam tangan untuk interaksi game fisik.',
        tools: ['Video Sensing Webcam', 'Physics Engine 2D', 'Game Logic'],
        deliverables: [
          '3 Game Arcade & Labirin Utuh buatan sendiri',
          'Game interaktif kontrol gerak tangan via webcam',
          'Sertifikat Kompetensi Semester & Portofolio Web',
        ],
      },
      {
        level: 'Level 3: Game Creator & AI Kids',
        sessions: '48 Sesi (~1 Tahun)',
        title: 'Roblox Lua Dasar & Mini AI Machine Learning',
        badge: 'Tingkat Mahir SD',
        desc: 'Transisi bertahap ke Roblox Studio (bahasa Lua) dan pengenalan konsep kecerdasan buatan (pengenalan gambar & suara).',
        tools: ['Roblox Studio', 'Lua Basics', 'Teachable Machine AI'],
        deliverables: [
          'Game 3D Roblox Adventure yang bisa dimainkan teman',
          'Model AI pengenal ekspresi wajah sederhana',
          'Sertifikat Junior AI Explorer & Galeri Portofolio',
        ],
      },
    ],
    projectShowcase: [
      {
        title: 'Space Rocket Defender 2D',
        student: 'Kenzo Alvaro (8 thn, Kelas 3 SD)',
        tag: 'Scratch Game',
        description:
          'Game arcade tembak asteroid luar angkasa dengan sistem nyawa, level kesulitan bertahap, dan efek suara retro.',
        icon: '🚀',
      },
      {
        title: 'Kamera Labirin Tangkap Madu',
        student: 'Nathania Putri (9 thn, Kelas 4 SD)',
        tag: 'Webcam Motion Game',
        description:
          'Pemain menggerakkan lebah madu hanya dengan melambaikan tangan di depan kamera laptop tanpa menyentuh keyboard.',
        icon: '🐝',
      },
      {
        title: 'Chatbot Robot Penolong PR Matematika',
        student: 'Arkan Danu (10 thn, Kelas 5 SD)',
        tag: 'AI Kids Logic',
        description:
          'Program robot interaktif yang bisa menjawab tebak-tebakan matematika dan memberikan motivasi belajar bersuara.',
        icon: '🤖',
      },
    ],
    pricingPlans: [
      {
        name: 'Starter Minat (12 Sesi)',
        sessions: '12 Pertemuan (~3 Bulan)',
        tag: 'Coba Fondasi',
        price: 'Rp 1.050.000',
        desc: 'Cocok untuk membuktikan minat dan adaptasi anak terhadap dunia logika komputasi.',
        features: [
          '12x Pertemuan Live Interactive (75–90 menit/sesi)',
          'Rasio mentor maksimal 4 anak atau privat',
          '1 Game Proyek Mandiri + Raport Logika',
          'E-Sertifikat Resmi ber-QR Code',
          'Rekaman kelas & panduan orang tua',
        ],
        inquiryMsg: 'Halo Beekoding, saya ingin tanya Program Starter SD 12 Sesi untuk anak saya.',
      },
      {
        name: 'Semester Mastery (24 Sesi)',
        sessions: '24 Pertemuan (~6 Bulan)',
        tag: 'Paling Populer',
        isPopular: true,
        price: 'Rp 1.950.000',
        desc: 'Paket ideal untuk membangun kebiasaan berpikir logis dan menghasilkan portofolio lengkap.',
        features: [
          '24x Pertemuan Live Interactive intensif',
          'Prioritas jadwal & fleksibilitas reschedule',
          '3 Game Arcade + 1 Webcam Sensor Game',
          'Akses Portal Siswa & Rapor 8 Pilar Kognitif',
          'Diskon Khusus & Bebas Biaya Registrasi',
        ],
        inquiryMsg: 'Halo Beekoding, saya ingin konsultasi Paket Semester SD 24 Sesi untuk ananda.',
      },
      {
        name: 'Annual Champion (48 Sesi)',
        sessions: '48 Pertemuan (~1 Tahun)',
        tag: 'Investasi Terlengkap',
        price: 'Rp 3.600.000',
        desc: 'Pendampingan menyeluruh dari Scratch hingga fondasi Roblox Lua & AI Machine Learning.',
        features: [
          '48x Pertemuan live terjadwal 1 tahun penuh',
          'Transisi mulus ke Roblox Lua & AI Machine Learning',
          'Showcase karya di web resmi Beekoding',
          'Bimbingan kompetisi lomba koding anak',
          'Konsultasi privat perkembangan talenta anak',
        ],
        inquiryMsg: 'Halo Beekoding, saya tertarik dengan Program Annual Champion SD 48 Sesi.',
      },
    ],
    faqs: [
      {
        q: 'Apakah anak harus bisa bahasa Inggris dan pintar matematika dulu?',
        a: 'Sama sekali tidak perlu! Aplikasi Scratch 3.0 mendukung bahasa Indonesia dan simbol visual. Konsep matematika diajarkan secara alami melalui permainan (misalnya menghitung skor atau mengatur lompatan karakter).',
      },
      {
        q: 'Spesifikasi laptop apa yang dibutuhkan?',
        a: 'Laptop atau PC standar (Windows, Mac, atau Chromebook) dengan RAM minimal 4GB, webcam aktif, dan browser Google Chrome sudah sangat cukup. Tidak memerlukan laptop gaming yang mahal.',
      },
      {
        q: 'Bagaimana jika anak berhalangan hadir di hari les?',
        a: 'Kami menyediakan fleksibilitas kelas pengganti (make-up class) serta rekaman rekaman sesi agar anak tidak tertinggal materi sedikitpun.',
      },
      {
        q: 'Apakah ada kelas uji coba gratis (Free Trial)?',
        a: 'Ya! Beekoding menyediakan Free Trial Class & Tes Bakat Logika gratis bagi orang tua untuk melihat langsung kecocokan anak dengan gaya belajar mentor kami.',
      },
    ],
    testimonials: [
      {
        parent: 'Bambang Pratama',
        child: 'Kenzo (8 thn)',
        city: 'Bandung',
        quote:
          'Kenzo awalnya cuma main game seharian. Setelah 2 bulan di Beekoding, dia sekarang bangga bisa pamer game buatannya sendiri ke keluarga. Logika matematika di sekolahnya juga membaik drastis!',
        avatar: '👨‍💼',
        rating: 5,
      },
      {
        parent: 'Dewi Kusuma',
        child: 'Nathania (9 thn)',
        city: 'Surabaya',
        quote:
          'Mentornya ramah dan sangat sabar mengarahkan anak perempuan saya. Cara mengajarnya menyenangkan, laporan rapor perkembangannya pun sangat rinci dan profesional.',
        avatar: '👩‍⚕️',
        rating: 5,
      },
    ],
  },
  teens: {
    tierBadge: 'KHUSUS REMAJA SMP & SMA (USIA 11–17 TAHUN)',
    ageLabel: 'Usia 11–17 Tahun (SMP & SMA / SMK)',
    heroTitle: 'Kuasai Python, Roblox Lua, Web Modern & Artificial Intelligence',
    heroHighlight: 'Bangun Portofolio Nyata untuk Olimpiade, Kampus & Karier IT',
    heroSubtitle:
      'Kurikulum koding teks profesional yang aplikatif. Belajar logika algoritma Python, data science, pembuatan game 3D Roblox, dan pemanfaatan AI masa kini secara etis dan produktif.',
    targetPersona:
      'Dirancang untuk remaja yang ingin melampaui sekadar pengguna aplikasi menjadi pembuat software, bersiap untuk seleksi OSN Informatika, atau menyusun portofolio masuk perguruan tinggi unggulan.',
    keyBenefits: [
      {
        icon: '🐍',
        title: 'Bahasa Python Standar Industri',
        desc: 'Mempelajari bahasa pemrograman terpopuler di dunia yang digunakan oleh Google, NASA, dan OpenAI untuk kecerdasan buatan.',
      },
      {
        icon: '🤖',
        title: 'AI Literacy & Prompt Engineering',
        desc: 'Bukan sekadar pakai chatbot, melainkan memahami cara kerja Machine Learning, integrasi API AI, dan pembuatan aplikasi cerdas.',
      },
      {
        icon: '🎮',
        title: 'Roblox 3D Game Dev (Bahasa Lua)',
        desc: 'Membuat mekanisme permainan multiplayer 3D, fisika game, dan scripting sistem inventory di Roblox Studio.',
      },
      {
        icon: '🌐',
        title: 'Portofolio Nyata di GitHub & Web Hosting',
        desc: 'Siswa memiliki repositori kode mandiri dan website aktif sebagai bukti kemampuan teknis yang diakui secara akademis.',
      },
    ],
    curriculumSteps: [
      {
        level: 'Modul 1: Algoritma & Python Foundation',
        sessions: '12 Sesi (~3 Bulan)',
        title: 'Struktur Data, Percabangan & Automasi Script',
        badge: 'Fondasi Esensial',
        desc: 'Sintaks Python modern, tipe data, looping, fungsi, manipulasi berkas, dan logika pemecahan masalah setara soal OSN Informatika pemula.',
        tools: ['Python 3.12', 'VS Code', 'GitHub'],
        deliverables: [
          'Aplikasi Terminal CLI Mini Calculator & Task Manager',
          'Game Tebak Angka & Kuis Interaktif dengan Algoritma',
          'Sertifikat Kompetensi Python Foundation',
        ],
      },
      {
        level: 'Modul 2: Roblox Lua / Web Fullstack',
        sessions: '24 Sesi (~6 Bulan)',
        title: 'Game 3D Studio atau Web Modern React',
        badge: 'Paling Diminati Remaja',
        desc: 'Pilihan peminatan: Skrip bahasa Lua di Roblox Studio 3D Multiplayer ATAU Pembuatan Web Frontend modern (HTML, Tailwind CSS, JavaScript).',
        tools: ['Roblox Studio / Lua', 'Tailwind CSS', 'React / TypeScript'],
        deliverables: [
          'Game 3D Obby / Tycoon Multiplayer di Roblox',
          'Website Portofolio Interaktif live di internet',
          'Sertifikat Intermediate Developer & Verifikasi Kode',
        ],
      },
      {
        level: 'Modul 3: AI & Machine Learning Builder',
        sessions: '48 Sesi (~1 Tahun)',
        title: 'Data Science, Computer Vision & AI Assistant',
        badge: 'Tingkat Mahir Masa Depan',
        desc: 'Pengenalan pustaka Python (Pandas, Matplotlib), integrasi Model AI (OpenAI API / Claude), dan perancangan aplikasi cerdas mandiri.',
        tools: ['Pandas / Data Analysis', 'OpenAI API', 'HuggingFace AI'],
        deliverables: [
          'AI Smart Assistant / Chatbot Berbasis Data Khusus',
          'Portofolio GitHub terverifikasi untuk beasiswa/SNBP',
          'Sertifikat Senior Teens Tech Innovator',
        ],
      },
    ],
    projectShowcase: [
      {
        title: 'Smart AI Study Assistant',
        student: 'Rafi Danendra (15 thn, Kelas 1 SMA)',
        tag: 'Python & AI API',
        description:
          'Aplikasi berbasis Python yang meringkas materi pelajaran sekolah dan otomatis membuatkan kuis flashcard latihan mandiri.',
        icon: '💡',
      },
      {
        title: 'Roblox Multiplayer Island Quest',
        student: 'Alya Zahra (13 thn, Kelas 2 SMP)',
        tag: 'Lua 3D Game',
        description:
          'Dunia game 3D dengan sistem quest, toko koin, dan leaderboard yang dimainkan lebih dari 500 pengguna aktif di Roblox.',
        icon: '🏰',
      },
      {
        title: 'Web Portofolio Developer & Algoritma',
        student: 'Farhan Maulana (16 thn, Kelas 2 SMA)',
        tag: 'Web Fullstack',
        description:
          'Website pribadi yang memamerkan visualisasi algoritma sorting dan kalkulator fisika SMA untuk persiapan beasiswa kampus.',
        icon: '💻',
      },
    ],
    pricingPlans: [
      {
        name: 'Starter Python / Lua (12 Sesi)',
        sessions: '12 Pertemuan (~3 Bulan)',
        tag: 'Fondasi Koding Teks',
        price: 'Rp 1.200.000',
        desc: 'Ideal untuk transisi dari visual coding atau pemula yang ingin langsung belajar bahasa nyata.',
        features: [
          '12x Sesi Live Interactive (90 menit/sesi)',
          'Pendampingan intensif & bedah kode (Code Review)',
          '1 Proyek Aplikasi Mandiri di GitHub',
          'Sertifikat Resmi ber-QR Code untuk CV/Akademik',
          'Akses forum tanya jawab mentor di luar jam kelas',
        ],
        inquiryMsg: 'Halo Beekoding, saya ingin tanya Program Starter Python Remaja 12 Sesi.',
      },
      {
        name: 'Semester Builder (24 Sesi)',
        sessions: '24 Pertemuan (~6 Bulan)',
        tag: 'Rekomendasi Portofolio',
        isPopular: true,
        price: 'Rp 2.250.000',
        desc: 'Fokus menghasilkan karya nyata: Game 3D Roblox atau Website Modern yang bisa dipamerkan.',
        features: [
          '24x Sesi Live intensif bersama mentor praktisi IT',
          'Fleksibilitas jadwal & konsultasi persiapan OSN',
          '2 Proyek Utuh (Web Hosting / Game Multiplayer)',
          'Bimbingan pembuatan akun GitHub & Portofolio Digital',
          'Bebas Biaya Pendaftaran & Garansi Bimbingan',
        ],
        inquiryMsg: 'Halo Beekoding, saya ingin konsultasi Paket Semester Python Remaja 24 Sesi.',
      },
      {
        name: 'Annual AI Innovator (48 Sesi)',
        sessions: '48 Pertemuan (~1 Tahun)',
        tag: 'Investasi Masa Depan',
        price: 'Rp 4.200.000',
        desc: 'Program terlengkap menuju penguasaan Data Science, Machine Learning, dan Web Fullstack.',
        features: [
          '48x Sesi live terjadwal 1 tahun penuh',
          'Materi Machine Learning, AI API & Data Analysis',
          'Portofolio resmi berbobot untuk seleksi SNBP/Beasiswa',
          'Surat Rekomendasi Mentor untuk pendaftaran universitas',
          'Mentoring privat 1-on-1 proyek akhir inovasi teknologi',
        ],
        inquiryMsg: 'Halo Beekoding, saya tertarik dengan Program Annual AI Innovator Remaja 48 Sesi.',
      },
    ],
    faqs: [
      {
        q: 'Apakah pemula yang belum pernah koding sama sekali bisa langsung ikut kelas ini?',
        a: 'Sangat bisa! Kurikulum dirancang dari nol konsep fundamental (variabel, logika IF/ELSE, loop) dengan analogi dunia nyata sehingga remaja tanpa background IT tetap nyaman mengikuti alur belajar.',
      },
      {
        q: 'Apakah sertifikat Beekoding bisa dilampirkan untuk portofolio SNBP atau beasiswa?',
        a: 'Bisa! Setiap sertifikat memiliki link verifikasi unik dengan QR Code serta portofolio repositori proyek yang dapat diverifikasi oleh reviewer kampus atau panitia beasiswa.',
      },
      {
        q: 'Bagaimana perbandingan materi ini dengan persiapan Olimpiade Informatika (OSN)?',
        a: 'Materi algoritma dasar Python melatih logika pemecahan masalah, penanganan struktur data array/list, dan efisiensi kode yang merupakan inti dari silabus OSN Informatika jenjang SMP/SMA.',
      },
      {
        q: 'Apakah siswa diajarkan AI secara aman dan bertanggung jawab?',
        a: 'Ya, kurikulum kami menekankan etika kecerdasan buatan, keamanan siber dasar, serta bagaimana menjadikan AI sebagai alat mempercepat inovasi, bukan sarana plagiarisme.',
      },
    ],
    testimonials: [
      {
        parent: 'Hendra Gunawan',
        child: 'Rafi (15 thn)',
        city: 'Tangerang',
        quote:
          'Sebagai orang tua praktisi IT, kurikulum Beekoding sangat relevan dan modern. Rafi diajarkan best-practice koding seperti di industri, dan sekarang punya portofolio GitHub sendiri!',
        avatar: '👨‍💻',
        rating: 5,
      },
      {
        parent: 'Siti Nurhaliza',
        child: 'Alya (13 thn)',
        city: 'Jakarta Selatan',
        quote:
          'Mentornya asyik dan mengerti bahasa anak muda. Alya jadi antusias bikin game di Roblox Studio dan belajar scripting Lua tanpa merasa terpaksa.',
        avatar: '👩‍🏫',
        rating: 5,
      },
    ],
  },
};

export const AgeTierLandingPage: React.FC<AgeTierLandingPageProps> = ({
  tier,
  onBackToHome,
  onOpenTalentAssessment,
  onOpenTrialEvents,
  onOpenBootcampModal,
}) => {
  const { isDark } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const data = TIER_DATA[tier];

  const handleWhatsAppConsultation = (customMsg?: string) => {
    const text =
      customMsg ||
      (tier === 'sd'
        ? 'Halo Beekoding, saya ingin konsultasi mengenai kelas coding Scratch & AI untuk anak SD (usia 6-10 tahun). Mohon info jadwal dan trial gratisnya ya.'
        : 'Halo Beekoding, saya ingin konsultasi mengenai kursus Python, Roblox, dan AI untuk remaja SMP/SMA (usia 11-17 tahun). Mohon info selengkapnya ya.');
    const url = getWhatsAppInquiryUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0b0e14] text-slate-100' : 'bg-[#fbf9f3] text-slate-900'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB                                                */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? 'bg-[#0b0e14]/90 border-amber-500/20 shadow-md shadow-black/40'
            : 'bg-[#fffdf8]/95 border-amber-300/60 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold border ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50'
                  : 'bg-white border-amber-200 text-slate-700 hover:text-slate-900 hover:border-amber-400'
              }`}
              title="Kembali ke Beranda Beekoding"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <div className="flex items-center gap-2">
              <a href="#home" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="flex items-center gap-2">
                <span className="text-lg font-black font-['Space_Grotesk'] tracking-tight">
                  Bee<span className="text-amber-500">koding</span>
                </span>
              </a>
              <span className="text-slate-400 text-xs hidden md:inline">/</span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 truncate max-w-[200px] sm:max-w-none">
                {tier === 'sd' ? 'Coding Anak SD (6–10 thn)' : 'Python & AI Remaja (11–17 thn)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleWhatsAppConsultation()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Konsultasi WA</span>
              <span className="sm:hidden">WA</span>
            </button>
            {onOpenTalentAssessment && (
              <button
                type="button"
                onClick={onOpenTalentAssessment}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Tes Bakat</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 overflow-hidden border-b border-amber-500/10">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Target Audience Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6 shadow-sm bg-gradient-to-r from-amber-500/20 to-yellow-500/15 border border-amber-500/40 text-amber-500 dark:text-amber-300">
            <span>{tier === 'sd' ? '🎮' : '🚀'}</span>
            <span>{data.tierBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Space_Grotesk'] tracking-tight leading-[1.18] max-w-4xl mx-auto mb-6">
            {data.heroTitle} —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 drop-shadow-sm">
              {data.heroHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {data.heroSubtitle}
          </p>

          {/* Social Proof Pill (Rating 4.9 & 380+ Ulasan) */}
          <div className="flex justify-center mb-8">
            <div
              className={`inline-flex items-center gap-3 py-1.5 px-4 rounded-full border text-xs font-bold shadow-xs ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                  : 'bg-amber-50 border-amber-200 text-slate-800'
              }`}
            >
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Rating 4.9/5 dari 380+ Wali Murid Terverifikasi</span>
              <span className="hidden sm:inline">• Bebas Biaya Pendaftaran</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (onOpenTrialEvents) {
                  onOpenTrialEvents();
                } else {
                  handleWhatsAppConsultation();
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-extrabold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/25 hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Daftar Free Trial Class ({data.ageLabel.split(' ')[0]} {data.ageLabel.split(' ')[1]})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleWhatsAppConsultation()}
              className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#141824] hover:bg-[#1a2030] text-emerald-400 border-emerald-500/30'
                  : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Tanya Mentor via WhatsApp</span>
            </button>

            {onOpenBootcampModal && (
              <button
                type="button"
                onClick={onOpenBootcampModal}
                className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#141824] hover:bg-[#1a2030] text-amber-300 border-amber-500/30'
                    : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-300 shadow-sm'
                }`}
              >
                <span>Info Bootcamp 2026</span>
              </button>
            )}
          </div>

          {/* Target Persona Note */}
          <p className="text-xs text-slate-400 dark:text-slate-400 max-w-xl mx-auto mt-6 italic">
            💡 {data.targetPersona}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY HIGHLIGHTS / KEUNGGULAN                                            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Mengapa Anak Anda Akan Suka Belajar di Sini?
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Metode pengajaran ramah generasi digital yang mengutamakan rasa ingin tahu dan kepuasan menciptakan karya nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? 'bg-[#131722]/90 border-amber-500/20 hover:border-amber-400/50'
                    : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-2">{benefit.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STEP-BY-STEP CURRICULUM ROADMAP                                        */}
      {/* ========================================================================= */}
      <section
        className={`py-16 sm:py-24 border-t border-b transition-colors ${
          isDark ? 'bg-[#0e111a] border-amber-500/20' : 'bg-[#f7f3e8] border-amber-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Silabus Terstruktur & Aplikatif</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Tahapan Belajar dari Nol Hingga Mandiri
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Setiap sesi memiliki target output yang jelas. Orang tua menerima laporan rapor kemajuan secara berkala.
            </p>
          </div>

          <div className="space-y-6">
            {data.curriculumSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-[#151926] border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-md shadow-amber-900/5'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      {step.level} • {step.sessions}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] mb-2">{step.title}</h3>
                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.desc}
                </p>

                {/* Tools & Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/40 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      🛠️ Tools & Bahasa:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      🎁 Output Proyek Siswa:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm">
                      {step.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROJECT SHOWCASE IN THIS TIER                                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Contoh Proyek Buatan Siswa
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Bukan sekadar teori hafalan kode. Siswa bangga memamerkan aplikasi dan game karya mandirinya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projectShowcase.map((proj, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                  isDark
                    ? 'bg-[#131722] border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-amber-200/90 shadow-sm hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{proj.icon}</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                      {proj.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-1.5">{proj.title}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-3">
                    Oleh: {proj.student}
                  </p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PAKET BIAYA & INVESTASI BELAJAR TRANSPARAN                             */}
      {/* ========================================================================= */}
      <section
        className={`py-16 sm:py-24 border-t border-b transition-colors ${
          isDark ? 'bg-[#0e111a] border-amber-500/20' : 'bg-[#fffdf8] border-amber-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Investasi Terjangkau & Transparan</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Pilihan Paket Kelas Pembelajaran
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Tanpa biaya registrasi tersembunyi. Termasuk seluruh fasilitas sertifikat digital, portofolio, dan rekaman kelas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                  plan.isPopular
                    ? isDark
                      ? 'bg-[#171c2b] border-amber-400 shadow-xl shadow-amber-500/10 scale-[1.02]'
                      : 'bg-white border-amber-500 shadow-xl shadow-amber-900/10 scale-[1.02]'
                    : isDark
                    ? 'bg-[#121520] border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                    {plan.tag}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      {plan.sessions}
                    </span>
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] mt-1">{plan.name}</h3>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {plan.desc}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-700/40 dark:border-slate-800">
                    <span className="text-3xl font-black font-['Space_Grotesk'] text-amber-500">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ paket program</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppConsultation(plan.inquiryMsg)}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Daftar / Tanya Paket Ini</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TESTIMONIALS                                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Kata Wali Murid yang Telah Bergabung
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pengalaman nyata orang tua mendampingi ananda belajar coding dan AI di Beekoding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#131722] border-slate-800'
                    : 'bg-white border-amber-200/90 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className={`text-sm italic leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-500/20 text-xl flex items-center justify-center select-none">
                    {t.avatar}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm">{t.parent}</h4>
                    <p className="text-xs text-slate-400">
                      Wali dari {t.child} • {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ ACCORDION                                                          */}
      {/* ========================================================================= */}
      <section
        className={`py-16 sm:py-20 border-t transition-colors ${
          isDark ? 'bg-[#0b0e14] border-slate-800' : 'bg-[#fbf9f3] border-amber-200'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
              Pertanyaan yang Sering Diajukan Orang Tua
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Informasi seputar format kelas, spesifikasi perangkat, dan jaminan kenyamanan belajar ananda.
            </p>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#131722] border-slate-800'
                      : 'bg-white border-amber-200/90 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer font-bold text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-500 transition-transform flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed border-t border-slate-700/20 dark:border-slate-800 pt-3">
                      <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM FINAL BANNER CTA                                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-3xl mb-2 inline-block">🐝</span>
          <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight mb-4">
            Siap Mengembangkan Potensi Digital Buah Hati?
          </h2>
          <p className="text-sm sm:text-base font-semibold max-w-2xl mx-auto mb-8 opacity-90">
            Daftarkan ananda ke sesi Free Trial Class atau konsultasikan kebutuhan belajar bersama mentor Beekoding sekarang.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (onOpenTrialEvents) {
                  onOpenTrialEvents();
                } else {
                  handleWhatsAppConsultation();
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-black bg-slate-950 text-amber-400 hover:bg-slate-900 shadow-xl transition-all cursor-pointer"
            >
              <span>Klaim Free Trial Class</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleWhatsAppConsultation()}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat Tim Mentor WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer minimal info */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-700/20">
        <p>© 2026 Beekoding. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};
