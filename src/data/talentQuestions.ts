// Data struktur dan Bank Soal Talent Assessment Beekoding
// 8 Pilar: Logical, Numerical, Spatial, Pattern, Creativity, Problem Solving, Language, Persistence

import { JUNIOR_QUESTIONS } from './questions/juniorQuestions';
import { MIDDLE_QUESTIONS } from './questions/middleQuestions';
import { TEENS_QUESTIONS } from './questions/teensQuestions';

export type AgeTier = 'junior' | 'middle' | 'teens';

export type AssessmentCategory =
  | 'logical'
  | 'numerical'
  | 'spatial'
  | 'pattern'
  | 'creativity'
  | 'problem_solving'
  | 'language'
  | 'persistence';

export interface CategoryInfo {
  id: AssessmentCategory;
  name: string;
  order: number;
  icon: string;
  shortDesc: string;
  color: string;
  bgColor: string;
}

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  score: number; // 0 - 20 (atau bobot poin)
  explanation?: string;
  image?: string; // URL gambar, SVG, atau base64 data-URL
  imageAlt?: string;
}

export interface TalentQuestion {
  id: string;
  tier: AgeTier;
  category: AssessmentCategory;
  sectionNumber: number;
  questionNumber: number; // 1 - 10 di tiap babak aktif
  prompt: string;
  visualHint?: string; // emoji / diagram representatif
  image?: string; // gambar ilustrasi pertanyaan jika ada
  options: QuestionOption[];
}

export interface UserProfile {
  childName: string;
  childAge: number;
  gradeLevel: string;
  parentName: string;
  parentPhone: string;
  tier: AgeTier;
}

export interface PaceAnalysis {
  avgSecondsPerQuestion: number;
  speedRating: 'sangat_cepat' | 'ideal' | 'mendalam';
  speedLabel: string;
  description: string;
}

export interface AssessmentResult {
  profile: UserProfile;
  completedAt: string;
  scores: Record<AssessmentCategory, number>; // 0 - 100
  totalScore: number; // 0 - 100 average
  topStrengths: AssessmentCategory[];
  growthAreas: AssessmentCategory[];
  recommendedProgram: {
    title: string;
    description: string;
    whyFit: string;
  };
  durationSeconds?: number;
  durationFormatted?: string;
  sectionDurations?: Record<AssessmentCategory, number>;
  paceAnalysis?: PaceAnalysis;
}

export const CATEGORIES: Record<AssessmentCategory, CategoryInfo> = {
  logical: {
    id: 'logical',
    name: 'Logical Thinking',
    order: 1,
    icon: 'Brain',
    shortDesc: 'Penalaran sebab-akibat, silogisme, dan logika bersyarat (If-Else).',
    color: '#3b82f6', // blue
    bgColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  },
  numerical: {
    id: 'numerical',
    name: 'Numerical Thinking',
    order: 2,
    icon: 'Calculator',
    shortDesc: 'Kemampuan hitung logis, estimasi kuantitatif, dan relasi nilai bilangan.',
    color: '#10b981', // emerald
    bgColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  },
  spatial: {
    id: 'spatial',
    name: 'Spatial Thinking',
    order: 3,
    icon: 'Boxes',
    shortDesc: 'Imajinasi ruang, rotasi objek 2D/3D, simetri, dan perspektif visual.',
    color: '#8b5cf6', // purple
    bgColor: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  },
  pattern: {
    id: 'pattern',
    name: 'Pattern Recognition',
    order: 4,
    icon: 'Sparkles',
    shortDesc: 'Kejelian menangkap keteraturan, pengulangan ritme, dan matriks visual.',
    color: '#f59e0b', // amber
    bgColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  },
  creativity: {
    id: 'creativity',
    name: 'Creativity',
    order: 5,
    icon: 'Palette',
    shortDesc: 'Fleksibilitas ide, berpikir di luar kebiasaan, dan eksplorasi solusi unik.',
    color: '#ec4899', // pink
    bgColor: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
  },
  problem_solving: {
    id: 'problem_solving',
    name: 'Problem Solving',
    order: 6,
    icon: 'Cpu',
    shortDesc: 'Dekomposisi masalah, langkah algoritmik sistematis, dan optimasi solusi.',
    color: '#06b6d4', // cyan
    bgColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
  },
  language: {
    id: 'language',
    name: 'Language & Communication',
    order: 7,
    icon: 'MessageSquare',
    shortDesc: 'Pemahaman instruksi berlapis, artikulasi ide, dan nalar verbal.',
    color: '#14b8a6', // teal
    bgColor: 'bg-teal-500/10 text-teal-500 border-teal-500/30',
  },
  persistence: {
    id: 'persistence',
    name: 'Persistence & Behaviour',
    order: 8,
    icon: 'Flame',
    shortDesc: 'Daya juang (grit) saat menghadapi bug/tantangan, ketelitian, dan rasa ingin tahu.',
    color: '#f97316', // orange
    bgColor: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
  },
};

export const CATEGORY_ORDER: AssessmentCategory[] = [
  'logical',
  'numerical',
  'spatial',
  'pattern',
  'creativity',
  'problem_solving',
  'language',
  'persistence',
];

export function getTierFromAge(age: number): AgeTier {
  if (age <= 9) return 'junior';
  if (age <= 12) return 'middle';
  return 'teens';
}

export function getTierLabel(tier: AgeTier): string {
  switch (tier) {
    case 'junior':
      return 'Junior Explorer (Usia 6 - 9 Tahun)';
    case 'middle':
      return 'Intermediate Coder (Usia 10 - 12 Tahun)';
    case 'teens':
      return 'Teens Innovator (Usia 13 - 17 Tahun)';
  }
}

// Master Pool Bank Soal per Tier Usia (8 Kategori x 15 Soal = 120 Soal per tier, Total 360 Soal)
export const QUESTION_BANK: Record<AgeTier, TalentQuestion[]> = {
  junior: JUNIOR_QUESTIONS,
  middle: MIDDLE_QUESTIONS,
  teens: TEENS_QUESTIONS,
};

/**
 * Fisher-Yates shuffle algorithm for un-biased randomization
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Memilih secara acak N soal per kategori dari pool bank soal.
 * Menghasilkan total (8 kategori * countPerCategory) soal untuk satu sesi tes peserta.
 * Default countPerCategory = 10 (Total 80 Soal per sesi).
 */
export function getSampledQuestionsForSession(
  tier: AgeTier,
  countPerCategory = 10,
  customPool?: TalentQuestion[]
): TalentQuestion[] {
  const pool = customPool && customPool.length > 0 ? customPool : QUESTION_BANK[tier];
  const sampledQuestions: TalentQuestion[] = [];

  CATEGORY_ORDER.forEach((catKey, catIdx) => {
    const categoryPool = pool.filter((q) => q.category === catKey);
    // Shuffle pool kategori
    const shuffled = shuffleArray(categoryPool);
    // Ambil sejumlah countPerCategory (misal 10 soal)
    const selected = shuffled.slice(0, countPerCategory);

    // Jika bank soal kategori kurang dari countPerCategory, gunakan seluruhnya
    selected.forEach((q, idx) => {
      sampledQuestions.push({
        ...q,
        sectionNumber: catIdx + 1,
        questionNumber: idx + 1,
      });
    });
  });

  return sampledQuestions;
}

/**
 * Format durasi detik menjadi string mudah dibaca (misal: "14 menit 20 detik")
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0 menit';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) {
    return `${secs} detik`;
  }
  if (secs === 0) {
    return `${mins} menit`;
  }
  return `${mins} menit ${secs} detik`;
}

/**
 * Menganalisis kecepatan dan ritme berpikir siswa berdasarkan total durasi dan jumlah soal
 */
export function analyzePace(totalSeconds: number, totalQuestions: number): PaceAnalysis {
  const safeCount = totalQuestions > 0 ? totalQuestions : 80;
  const avgSeconds = totalSeconds > 0 ? Math.round((totalSeconds / safeCount) * 10) / 10 : 15;

  if (avgSeconds < 10) {
    return {
      avgSecondsPerQuestion: avgSeconds,
      speedRating: 'sangat_cepat',
      speedLabel: 'Tangkas & Intuitif',
      description: 'Menjawab dengan kecepatan sangat responsif, menunjukkan intuisi visual kuat dan daya tangkap cepat.',
    };
  }

  if (avgSeconds <= 25) {
    return {
      avgSecondsPerQuestion: avgSeconds,
      speedRating: 'ideal',
      speedLabel: 'Ritme Ideal & Fokus',
      description: 'Keseimbangan prima antara kecepatan membaca, pertimbangan logika, dan verifikasi jawaban.',
    };
  }

  return {
    avgSecondsPerQuestion: avgSeconds,
    speedRating: 'mendalam',
    speedLabel: 'Sangat Teliti & Reflektif',
    description: 'Tipe pemikir mendalam (deep thinker), teliti menimbang setiap opsi dan hati-hati dalam memutuskan.',
  };
}

// Logika Perhitungan Hasil dengan Normalisasi Dinamis Skala 0 - 100
export function calculateAssessmentResult(
  profile: UserProfile,
  answers: Record<string, string>, // questionId -> optionId
  sessionQuestions?: TalentQuestion[],
  durationSeconds?: number,
  sectionDurations?: Record<AssessmentCategory, number>
): AssessmentResult {
  const questionsToScore =
    sessionQuestions && sessionQuestions.length > 0
      ? sessionQuestions
      : QUESTION_BANK[profile.tier];

  // Inisialisasi total skor per kategori
  const categoryScores: Record<AssessmentCategory, number> = {
    logical: 0,
    numerical: 0,
    spatial: 0,
    pattern: 0,
    creativity: 0,
    problem_solving: 0,
    language: 0,
    persistence: 0,
  };

  const categoryMaxPossible: Record<AssessmentCategory, number> = {
    logical: 0,
    numerical: 0,
    spatial: 0,
    pattern: 0,
    creativity: 0,
    problem_solving: 0,
    language: 0,
    persistence: 0,
  };

  questionsToScore.forEach((q) => {
    // Tentukan skor maksimal untuk soal ini (opsi dengan poin tertinggi)
    const maxOptScore = Math.max(...q.options.map((opt) => opt.score), 20);
    categoryMaxPossible[q.category] += maxOptScore;

    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        categoryScores[q.category] += option.score;
      }
    }
  });

  // Normalisasi setiap kategori ke skala standar 0 - 100
  CATEGORY_ORDER.forEach((cat) => {
    const max = categoryMaxPossible[cat];
    if (max > 0) {
      categoryScores[cat] = Math.min(
        100,
        Math.max(0, Math.round((categoryScores[cat] / max) * 100))
      );
    } else {
      categoryScores[cat] = Math.min(100, Math.max(0, categoryScores[cat]));
    }
  });

  const totalPoints = CATEGORY_ORDER.reduce((acc, cat) => acc + categoryScores[cat], 0);
  const averageScore = Math.round(totalPoints / CATEGORY_ORDER.length);

  // Cari pilar terkuat dan pilar yang bisa dikembangkan
  const sortedCategories = [...CATEGORY_ORDER].sort(
    (a, b) => categoryScores[b] - categoryScores[a]
  );

  const topStrengths = sortedCategories.slice(0, 3);
  const growthAreas = sortedCategories.slice(-2);

  // Rekomendasi Program Beekoding Berdasarkan Kekuatan & Usia
  const recommendedProgram = getProgramRecommendation(profile.tier, topStrengths);

  const totalSecs = durationSeconds || 0;
  const durationFormatted = formatDuration(totalSecs);
  const paceAnalysis = analyzePace(totalSecs, questionsToScore.length);

  return {
    profile,
    completedAt: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    scores: categoryScores,
    totalScore: averageScore,
    topStrengths,
    growthAreas,
    recommendedProgram,
    durationSeconds: totalSecs,
    durationFormatted,
    sectionDurations,
    paceAnalysis,
  };
}

function getProgramRecommendation(
  tier: AgeTier,
  topStrengths: AssessmentCategory[]
): { title: string; description: string; whyFit: string } {
  const primary = topStrengths[0];

  if (tier === 'junior') {
    if (primary === 'creativity' || primary === 'spatial') {
      return {
        title: 'Beekoding Little Explorer: Scratch Creative & Animation',
        description:
          'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
        whyFit:
          'Kekuatan imajinasi spasial dan kreativitas anak sangat tinggi, sangat cocok disalurkan melalui blok visual Scratch yang penuh ekspresi seni.',
      };
    }
    return {
      title: 'Beekoding Junior: Logic & Robotics Explorer',
      description:
        'Melatih computational thinking sejak dini melalui simulasi labirin logika, algoritma dasar, dan perakitan robot visual.',
      whyFit:
        'Anak menunjukkan daya nalar logis dan pola pikir struktural yang sangat tajam untuk anak seusianya.',
    };
  }

  if (tier === 'middle') {
    if (primary === 'logical' || primary === 'problem_solving' || primary === 'numerical') {
      return {
        title: 'Beekoding Python & Game Logic Academy',
        description:
          'Transisi dari visual block ke bahasa pemrograman populer dunia (Python) untuk membangun logika algoritma nyata dan mini game interaktif.',
        whyFit:
          'Skor logika pemecahan masalah dan kemampuan numerik anak berada di level unggul, siap untuk melangkah ke coding sintaks profesional.',
      };
    }
    return {
      title: 'Beekoding Web & Creative Tech Maker',
      description:
        'Membangun website interaktif, desain antarmuka modern, dan proyek teknologi kreatif yang dapat diakses online.',
      whyFit:
        'Kombinasi kreativitas, pola pikir desain, dan kegigihan anak sangat selaras dengan pembuatan karya digital mandiri.',
    };
  }

  // Teens
  if (primary === 'logical' || primary === 'problem_solving') {
    return {
      title: 'Beekoding AI & Full-Stack Software Engineering',
      description:
        'Kurikulum komprehensif mencakup fundamental Computer Science, rekayasa prompt AI, Machine Learning dasar, dan pengembangan aplikasi web modern.',
      whyFit:
        'Kemampuan analisis sistemik dan problem solving yang kuat menjadikan siswa kandidat ideal untuk menguasai arsitektur software dan AI modern.',
    };
  }

  return {
    title: 'Beekoding Teen Tech Innovator & Data Science',
    description:
      'Membekali remaja dengan kemampuan analisis data, otomasi kecerdasan buatan, dan pembuatan portofolio teknologi untuk persiapan kuliah dan kompetisi.',
    whyFit:
      'Siswa memiliki keseimbangan nalar analitis dan komunikasi yang ideal untuk menjadi inovator dan tech creator di era digital.',
  };
}

export function generateWhatsAppMessage(result: AssessmentResult): string {
  const {
    profile,
    scores,
    totalScore,
    topStrengths,
    growthAreas,
    recommendedProgram,
    durationFormatted,
    paceAnalysis,
  } = result;

  const strengthsText = topStrengths
    .map((s) => `• *${CATEGORIES[s].name}* (${scores[s]}/100)`)
    .join('\n');

  const growthText = growthAreas
    .map((g) => `• *${CATEGORIES[g].name}* (${scores[g]}/100)`)
    .join('\n');

  const timePaceSection = durationFormatted
    ? `\n⏱️ *Waktu Pengerjaan*: ${durationFormatted} (${paceAnalysis?.speedLabel || 'Selesai'})`
    : '';

  const text = `Halo Beekoding Lab! 🐝
Saya ingin berkonsultasi mengenai hasil *Talent & Aptitude Assessment* ananda:

👤 *Data Ananda:*
• Nama: *${profile.childName}*
• Usia: *${profile.childAge} Tahun* (${getTierLabel(profile.tier)})
• Kelas/Jenjang: *${profile.gradeLevel || '-'}*
• Nama Orang Tua: *${profile.parentName || '-'}*${timePaceSection}

📊 *Ringkasan Hasil Evaluasi 8 Pilar:*
• Rata-rata Skor: *${totalScore}/100*
${strengthsText}

🌱 *Area yang Ingin Ditumbuhkan:*
${growthText}

🎯 *Rekomendasi Program Beekoding:*
*${recommendedProgram.title}*
_${recommendedProgram.whyFit}_

🎁 *Klaim Sesi Free Trial Class:*
Saya ingin mengklaim *1x Sesi Trial Coding Interaktif GRATIS* untuk ananda sesuai rekomendasi di atas.

🔗 *Laporan Resmi*: https://beekoding.id/#portal?child=${encodeURIComponent(profile.childName)}

Mohon info jadwal kelas trial dan konsultasi kurikulum ananda. Terima kasih! 🙏`;

  return encodeURIComponent(text);
}
