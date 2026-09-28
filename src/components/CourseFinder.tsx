import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../data/content';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  Clock,
  Award,
  Gamepad2,
  Bot,
  Globe,
  Brain,
} from 'lucide-react';

interface CourseRecommendation {
  title: string;
  badge: string;
  level: string;
  description: string;
  tools: string[];
  deliverables: string[];
  duration: string;
  recommendedBatch: string;
}

const AGE_OPTIONS = [
  {
    id: 'age-little',
    label: '6 – 8 Tahun',
    sublabel: 'SD Awal (Little Coders)',
    icon: '🐣',
  },
  {
    id: 'age-junior',
    label: '9 – 12 Tahun',
    sublabel: 'SD Akhir (Junior Devs)',
    icon: '🚀',
  },
  {
    id: 'age-teen',
    label: '13 – 15 Tahun',
    sublabel: 'SMP (Teen Innovators)',
    icon: '⚡',
  },
  {
    id: 'age-senior',
    label: '16 – 18 Tahun',
    sublabel: 'SMA / SMK (Tech Leaders)',
    icon: '👑',
  },
];

const INTEREST_OPTIONS = [
  {
    id: 'game',
    label: 'Membuat Game',
    sublabel: 'Roblox, Scratch & Arcade',
    icon: Gamepad2,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'ai',
    label: 'Kecerdasan Buatan (AI)',
    sublabel: 'Prompting, Bots & Vision AI',
    icon: Bot,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'app',
    label: 'Web & Aplikasi',
    sublabel: 'Website, UI/UX & Coding Teks',
    icon: Globe,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'logic',
    label: 'Logika dari Nol',
    sublabel: 'Computational Thinking',
    icon: Brain,
    color: 'from-emerald-500 to-teal-500',
  },
];

const SCHEDULE_OPTIONS = [
  {
    id: 'weekend-am',
    label: 'Weekend Pagi',
    time: 'Sabtu / Minggu 09.00 - 10.30 WIB',
    popular: true,
  },
  {
    id: 'weekend-pm',
    label: 'Weekend Sore',
    time: 'Sabtu / Minggu 15.30 - 17.00 WIB',
    popular: false,
  },
  {
    id: 'weekday-pm',
    label: 'Weekday Sore',
    time: 'Senin - Jumat 16.00 - 17.30 WIB',
    popular: false,
  },
  {
    id: 'private',
    label: 'Privat 1-on-1 Eksklusif',
    time: 'Jadwal Bebas & Fleksibel (Bisa Request)',
    popular: false,
  },
];

export const CourseFinder: React.FC<{
  onOpenTalentAssessment?: () => void;
  onOpenTrialEventsModal?: () => void;
}> = ({ onOpenTalentAssessment, onOpenTrialEventsModal }) => {
  const { isDark } = useTheme();

  const [selectedAge, setSelectedAge] = useState<string>('age-junior');
  const [selectedInterest, setSelectedInterest] = useState<string>('game');
  const [selectedSchedule, setSelectedSchedule] = useState<string>('weekend-am');

  const recommendation: CourseRecommendation = useMemo(() => {
    // 6-8 Tahun
    if (selectedAge === 'age-little') {
      if (selectedInterest === 'game' || selectedInterest === 'logic') {
        return {
          title: 'Scratch Junior: Story & Game Creator',
          badge: 'Little Coders • Visual Block',
          level: 'Pemula (Zero Experience)',
          description:
            'Mengasah logika computational thinking anak melalui penyusunan balok visual warna-warni. Anak belajar urutan instruksi, animasi karakter, dan merancang game petualangan sederhana.',
          tools: ['Scratch 3.0', 'Visual Block Logic', 'Pixel Art Sprite Creator'],
          deliverables: [
            '4 Game interaktif mini buatan sendiri',
            'Kartu cerita animasi digital interaktif',
            'E-Sertifikat Kelulusan Resmi Beekoding',
          ],
          duration: '8 Sesi Interaktif (1x seminggu @ 90 menit)',
          recommendedBatch: 'Batch Reguler Weekend Pagi',
        };
      }
      return {
        title: 'Little AI & Sensory Computing Explorer',
        badge: 'Little AI • Eksplorasi Cerdas',
        level: 'Pemula (Zero Experience)',
        description:
          'Pengenalan Artificial Intelligence yang aman dan ramah anak. Melatih logika mengenali gambar kamera, suara, dan memahami bahwa teknologi bisa diciptakan oleh mereka.',
        tools: ['Google Teachable Machine', 'Scratch AI Extension', 'Story Prompting'],
        deliverables: [
          'Model AI pengenal ekspresi wajah dan gerakan tangan',
          'Aplikasi game tebak gambar dengan AI',
          'Sertifikat Eksplorasi Digital Junior',
        ],
        duration: '8 Sesi Interaktif (1x seminggu @ 90 menit)',
        recommendedBatch: 'Batch Reguler Weekend Pagi',
      };
    }

    // 9-12 Tahun
    if (selectedAge === 'age-junior') {
      if (selectedInterest === 'game') {
        return {
          title: 'Roblox Lua & Scratch Game Engineer',
          badge: 'Most Popular • Pilihan Terfavorit',
          level: 'Pemula hingga Menengah',
          description:
            'Mengubah kebiasaan bermain game menjadi pembuat game! Dari visual logika Scratch naik kelas ke Roblox Studio dengan bahasa pemrograman Lua untuk membuat rintangan 3D (Obby) & physics.',
          tools: ['Roblox Studio', 'Lua Scripting', 'Scratch 3.0', 'Game Design Canvas'],
          deliverables: [
            '1 Game 3D Obby multiplayer live di Roblox',
            '2 Game arcade 2D kompleks di Scratch',
            'Sertifikat Game Developer Junior Terverifikasi',
          ],
          duration: '12 Sesi Intensif (1x seminggu @ 90 menit)',
          recommendedBatch: 'Batch Reguler Weekend Pagi / Sore',
        };
      }
      if (selectedInterest === 'ai') {
        return {
          title: 'Junior AI Creator & Python Explorer',
          badge: 'Future Tech • Coding & AI',
          level: 'Pemula',
          description:
            'Mempelajari bagaimana Artificial Intelligence bekerja dari balik layar. Anak diajarkan dasar Python sintaks sederhana, prompt engineering beretika, dan melatih model kecerdasan buatan sendiri.',
          tools: ['Python 3 Basics', 'Teachable Machine', 'Prompt Engineering', 'Turtle GUI'],
          deliverables: [
            'Chatbot asisten pintar interaktif dengan Python',
            'Game tebak kata berbasis logika komputasi',
            'Portofolio AI Explorer Beekoding',
          ],
          duration: '10 Sesi Progresif (1x seminggu @ 90 menit)',
          recommendedBatch: 'Batch Reguler Weekend Pagi',
        };
      }
      return {
        title: 'Junior Python & Web Innovator',
        badge: 'Core Programming • Coding Teks',
        level: 'Pemula (Mulai dari Nol)',
        description:
          'Transisi mulus dari koding visual ke koding teks bahasa Python dan pembuatan halaman web mini. Membangun fondasi algoritma, variabel, loops, dan logika pemecahan masalah nyata.',
        tools: ['Python 3', 'HTML5 & CSS Dasar', 'VS Code for Kids', 'Algoritma'],
        deliverables: [
          'Website profil portofolio karya anak online',
          'Aplikasi kuis interaktif dengan Python',
          'Sertifikat Kompetensi Pemrograman Dasar',
        ],
        duration: '10 Sesi Progresif (1x seminggu @ 90 menit)',
        recommendedBatch: 'Batch Reguler Weekday / Weekend',
      };
    }

    // 13-15 Tahun (SMP)
    if (selectedAge === 'age-teen') {
      if (selectedInterest === 'ai') {
        return {
          title: 'Applied AI, Machine Learning & Python Mastery',
          badge: 'Next-Gen • AI & Data Science',
          level: 'Menengah',
          description:
            'Membekali remaja dengan pemahaman AI modern yang aplikatif: pemodelan machine learning, analisis data dengan Python, serta integrasi API AI untuk memecahkan masalah kehidupan nyata.',
          tools: ['Python 3', 'Scikit-learn', 'OpenAI API / GenAI', 'Streamlit Web UI'],
          deliverables: [
            'Aplikasi web bertenaga AI yang siap dipamerkan di CV',
            'Model prediksi data machine learning mandiri',
            'Sertifikat Kompetensi AI Remaja Terverifikasi',
          ],
          duration: '12 Sesi Proyek Nyata (1x seminggu @ 90 menit)',
          recommendedBatch: 'Batch Reguler Weekend Sore / Privat',
        };
      }
      if (selectedInterest === 'game') {
        return {
          title: 'Advanced Roblox Studio & Unity 2D Development',
          badge: 'Game Engineering • C# & Lua',
          level: 'Menengah',
          description:
            'Eksplorasi pembuatan game tingkat lanjut. Memprogram logika multiplayer, inventory system, sound effect, dan mekanika game profesional yang siap dipublikasikan.',
          tools: ['Roblox Studio Lua', 'Unity Game Engine', 'C# Fundamental', 'Git Basics'],
          deliverables: [
            'Game multiplayer 3D kompleks di Roblox',
            'Prototipe game 2D di Unity',
            'Portofolio Game Development untuk jenjang SMA/Kuliah',
          ],
          duration: '12 Sesi Intensif (1x seminggu @ 90 menit)',
          recommendedBatch: 'Batch Reguler Weekend Sore',
        };
      }
      return {
        title: 'Modern Fullstack Web & App Builder',
        badge: 'Web Architecture • Frontend & Backend',
        level: 'Pemula hingga Menengah',
        description:
          'Mempelajari teknologi web modern yang digunakan developer startup: HTML5, CSS Tailwind, JavaScript ES6, dan framework modern. Membangun aplikasi web yang live di domain sendiri.',
        tools: ['HTML5 / CSS3', 'JavaScript ES6', 'React Basics', 'Cloud Deployment'],
        deliverables: [
          'Website personal online interaktif (portofolio digital)',
          'Aplikasi Web CRUD (Create, Read, Update, Delete) mini',
          'Sertifikat Web Developer Muda Beekoding',
        ],
        duration: '12 Sesi Progresif (1x seminggu @ 90 menit)',
        recommendedBatch: 'Batch Reguler Weekend / Weekday Sore',
      };
    }

    // 16-18 Tahun (SMA/SMK)
    return {
      title: 'Career & College Tech Accelerator (Fullstack & AI)',
      badge: 'Portfolio Ready • Siap Kuliah & Magang',
      level: 'Menengah hingga Lanjutan',
      description:
        'Program akselerasi komprehensif bagi siswa SMA/SMK untuk membangun portofolio teknologi kelas dunia sebelum masuk universitas atau magang industri IT.',
      tools: ['Python & Data Science', 'Modern React', 'Git & GitHub Workflow', 'Cloud Deploy'],
      deliverables: [
        'Portofolio GitHub profesional dengan 3 proyek nyata',
        'Aplikasi web AI terintegrasi API yang aktif di internet',
        'Surat rekomendasi instruktur & Sertifikat Resmi',
      ],
      duration: '12 Sesi Mendalam (1x seminggu @ 120 menit)',
      recommendedBatch: 'Batch Intensif Weekend / Privat 1-on-1',
    };
  }, [selectedAge, selectedInterest]);

  // Generate WhatsApp Message
  const ageLabel = AGE_OPTIONS.find((a) => a.id === selectedAge)?.label || '';
  const interestLabel = INTEREST_OPTIONS.find((i) => i.id === selectedInterest)?.label || '';
  const scheduleObj = SCHEDULE_OPTIONS.find((s) => s.id === selectedSchedule);
  const scheduleLabel = scheduleObj ? `${scheduleObj.label} (${scheduleObj.time})` : '';

  const waInquiryText = encodeURIComponent(
    `Halo Tim Beekoding, saya telah mencoba Rekomendasi Program di website:\n\n` +
      `👤 *Jenjang Usia Anak:* ${ageLabel}\n` +
      `🎯 *Minat Utama:* ${interestLabel}\n` +
      `⏰ *Pilihan Jadwal:* ${scheduleLabel}\n` +
      `💡 *Rekomendasi Program:* ${recommendation.title}\n\n` +
      `Mohon info ketersediaan slot batch terdekat, promo pendaftaran, atau jadwal Free Trial Class untuk ananda. Terima kasih!`
  );

  const whatsappUrl = `https://wa.me/${siteConfig.phoneRaw}?text=${waInquiryText}`;

  return (
    <section id="course-finder" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decorative Ambient Light */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Interactive Course & Schedule Finder</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Temukan Program & Jadwal{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Tepat untuk Buah Hati
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Pilih usia, minat, dan waktu luang anak Anda dalam 3 langkah mudah. Sistem kami akan
            langsung mencocokkan kurikulum dan jadwal batch belajar paling ideal.
          </p>
        </div>

        {/* 2-Column Interactive Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3-Step Selection Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Usia Anak */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#151928] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Berapa Usia / Jenjang Kelas Ananda?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {AGE_OPTIONS.map((opt) => {
                  const isSelected = selectedAge === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedAge(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{opt.icon}</div>
                      <div
                        className={`text-xs sm:text-sm font-extrabold ${
                          isSelected ? 'text-amber-500' : isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {opt.sublabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Minat Utama */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#151928] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Apa Minat / Hal yang Paling Disukai Anak?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {INTEREST_OPTIONS.map((opt) => {
                  const isSelected = selectedInterest === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedInterest(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${opt.color} text-white flex items-center justify-center mb-2 shadow-sm`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-extrabold ${
                          isSelected ? 'text-amber-500' : isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {opt.sublabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Pilihan Jadwal */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                isDark ? 'bg-[#151928] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Pilihan Waktu Belajar yang Diinginkan
                </h3>
              </div>

              <div className="space-y-2">
                {SCHEDULE_OPTIONS.map((opt) => {
                  const isSelected = selectedSchedule === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSchedule(opt.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-500'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className={`w-4 h-4 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                        <div>
                          <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                            <span>{opt.label}</span>
                            {opt.popular && (
                              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] font-black uppercase">
                                Terfavorit
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{opt.time}</div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500 text-slate-950'
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Realtime Recommendation Card */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div
              className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-b from-[#181d2e] to-[#121522] border-amber-500/30 shadow-black/60'
                  : 'bg-gradient-to-b from-white to-amber-50/40 border-amber-300 shadow-amber-900/10'
              }`}
            >
              {/* Badge recommendation */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rekomendasi Jalur Terbaik</span>
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {recommendation.badge}
                </span>
              </div>

              {/* Title & Level */}
              <h3
                className={`text-xl sm:text-2xl font-black mb-2 leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {recommendation.title}
              </h3>

              <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-400">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {recommendation.level}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Clock className="w-3.5 h-3.5" />
                  {recommendation.duration}
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {recommendation.description}
              </p>

              {/* Tools & Tech Stack */}
              <div className="mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Tools & Platform yang Digunakan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {recommendation.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        isDark
                          ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables / Output Karya Siswa */}
              <div
                className={`p-4 rounded-2xl border mb-6 ${
                  isDark
                    ? 'bg-purple-950/20 border-purple-500/20'
                    : 'bg-purple-50/60 border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2.5 text-xs font-black uppercase tracking-wider text-purple-400">
                  <Award className="w-4 h-4" />
                  <span>Target Portofolio & Karya Nyata Anak:</span>
                </div>
                <ul className="space-y-1.5">
                  {recommendation.deliverables.map((item) => (
                    <li
                      key={item}
                      className={`text-xs flex items-start gap-2 ${
                        isDark ? 'text-purple-200' : 'text-purple-900'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected Schedule Summary Box */}
              <div
                className={`p-3.5 rounded-xl border mb-6 flex items-center justify-between text-xs ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                    : 'bg-slate-100/70 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>
                    Jadwal Terpilih: <strong>{scheduleLabel}</strong>
                  </span>
                </div>
              </div>

              {/* WhatsApp Priority CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer mb-3"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Daftar / Konsultasi Jadwal Ini (WhatsApp)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Actions: Free Trial & Talent Assessment */}
              <div className="grid grid-cols-2 gap-2 text-center">
                {onOpenTrialEventsModal && (
                  <button
                    type="button"
                    onClick={onOpenTrialEventsModal}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                    }`}
                  >
                    <span>Coba Trial Class Dulu</span>
                  </button>
                )}

                {onOpenTalentAssessment && (
                  <button
                    type="button"
                    onClick={onOpenTalentAssessment}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    <span>Tes Bakat Anak</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
