// Data struktur dan Bank Soal Talent Assessment Beekoding
// 8 Pilar: Logical, Numerical, Spatial, Pattern, Creativity, Problem Solving, Language, Persistence

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
}

export interface TalentQuestion {
  id: string;
  tier: AgeTier;
  category: AssessmentCategory;
  sectionNumber: number;
  questionNumber: number; // 1 - 5 di tiap babak
  prompt: string;
  visualHint?: string; // emoji / diagram representatif
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

// Bank Soal per Tier Usia (8 Kategori x 5 Soal = 40 Soal per tier)
export const QUESTION_BANK: Record<AgeTier, TalentQuestion[]> = {
  // ==========================================
  // JUNIOR (6-9 Tahun)
  // ==========================================
  junior: [
    // 1. Logical Thinking
    {
      id: 'jr-log-1',
      tier: 'junior',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 1,
      prompt: 'Kelinci suka wortel 🥕. Kucing suka ikan 🐟. Jika BeeBot membawa wortel, hewan manakah yang akan mendekat?',
      visualHint: '🥕 🐇 vs 🐟 🐱',
      options: [
        { id: 'A', text: 'Kelinci, karena kelinci menyukai wortel', score: 20 },
        { id: 'B', text: 'Kucing, karena kucing lapar', score: 5 },
        { id: 'C', text: 'Keduanya mendekat bersamaan', score: 5 },
        { id: 'D', text: 'Tidak ada hewan yang mendekat', score: 0 },
      ],
    },
    {
      id: 'jr-log-2',
      tier: 'junior',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 2,
      prompt: 'Lampu lalu lintas: Hijau berarti JALAN 🟢, Merah berarti BERHENTI 🔴. Robot BeeBot melihat lampu MERAH menyala. Apa yang harus dilakukan BeeBot?',
      visualHint: '🚦 🔴 🤖',
      options: [
        { id: 'A', text: 'Terus berjalan maju', score: 0 },
        { id: 'B', text: 'Segera berhenti dan menunggu', score: 20 },
        { id: 'C', text: 'Berlari lebih kencang', score: 5 },
        { id: 'D', text: 'Membunyikan klakson saja', score: 5 },
      ],
    },
    {
      id: 'jr-log-3',
      tier: 'junior',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 3,
      prompt: 'Payung dipakai saat hujan ☔. Jaket tebal dipakai saat dingin 🧥. Jika di luar sedang turun hujan lebat dan dingin, apa yang sebaiknya dipakai?',
      visualHint: '🌧️ ☔ 🧥',
      options: [
        { id: 'A', text: 'Hanya kacamata hitam', score: 0 },
        { id: 'B', text: 'Payung dan jaket tebal', score: 20 },
        { id: 'C', text: 'Hanya baju renang', score: 0 },
        { id: 'D', text: 'Topi pantai', score: 5 },
      ],
    },
    {
      id: 'jr-log-4',
      tier: 'junior',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 4,
      prompt: 'Aturan Pintu Ajaib: "Pintu hanya terbuka jika kamu tersenyum 😊 DAN melambaikan tangan 👋". Budi tersenyum tapi tangannya diam di saku. Apakah pintu terbuka?',
      visualHint: '🚪 🔒 (Syarat: 😊 + 👋)',
      options: [
        { id: 'A', text: 'Ya, terbuka lebar', score: 0 },
        { id: 'B', text: 'Tidak, karena harus memenuhi KEDUA syarat', score: 20 },
        { id: 'C', text: 'Pintu terbuka setengah saja', score: 5 },
        { id: 'D', text: 'Pintu rusak', score: 0 },
      ],
    },
    {
      id: 'jr-log-5',
      tier: 'junior',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 5,
      prompt: 'Mobil mainan berjalan dari titik A ke B, lalu ke C. Jika jembatan antara B dan C putus, di manakah mobil mainan akan terhenti?',
      visualHint: '🏁 A ─── B ──❌── C',
      options: [
        { id: 'A', text: 'Berhenti di titik B', score: 20 },
        { id: 'B', text: 'Sampai di titik C', score: 0 },
        { id: 'C', text: 'Kembali sendiri ke titik A', score: 5 },
        { id: 'D', text: 'Menghilang ke udara', score: 0 },
      ],
    },

    // 2. Numerical Thinking
    {
      id: 'jr-num-1',
      tier: 'junior',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 1,
      prompt: 'BeeBot punya 3 bintang emas ⭐⭐⭐. Kakak memberi lagi 2 bintang ⭐⭐. Berapa total bintang BeeBot sekarang?',
      visualHint: '⭐⭐⭐ + ⭐⭐ = ?',
      options: [
        { id: 'A', text: '4 bintang', score: 5 },
        { id: 'B', text: '5 bintang', score: 20 },
        { id: 'C', text: '6 bintang', score: 5 },
        { id: 'D', text: '3 bintang', score: 0 },
      ],
    },
    {
      id: 'jr-num-2',
      tier: 'junior',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 2,
      prompt: 'Kotak A berisi 8 kelereng. Kotak B berisi 4 kelereng. Berapa banyak kelereng yang harus dipindahkan dari Kotak A ke Kotak B agar isinya sama banyak?',
      visualHint: '📦 A (8) | 📦 B (4)',
      options: [
        { id: 'A', text: '1 kelereng', score: 5 },
        { id: 'B', text: '2 kelereng (keduanya jadi 6)', score: 20 },
        { id: 'C', text: '4 kelereng', score: 5 },
        { id: 'D', text: '3 kelereng', score: 10 },
      ],
    },
    {
      id: 'jr-num-3',
      tier: 'junior',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 3,
      prompt: 'Perhatikan timbangan seimbang: 1 Apel 🍎 sama beratnya dengan 2 Stroberi 🍓🍓. Berapa buah stroberi yang dibutuhkan untuk menimbang 3 Apel 🍎🍎🍎?',
      visualHint: '⚖️ 1 🍎 = 2 🍓',
      options: [
        { id: 'A', text: '3 stroberi', score: 5 },
        { id: 'B', text: '5 stroberi', score: 5 },
        { id: 'C', text: '6 stroberi', score: 20 },
        { id: 'D', text: '4 stroberi', score: 10 },
      ],
    },
    {
      id: 'jr-num-4',
      tier: 'junior',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 4,
      prompt: 'Lihat deret angka ini: 2, 4, 6, 8, ... Angka berapakah yang datang berikutnya?',
      visualHint: '2 ➜ 4 ➜ 6 ➜ 8 ➜ ❓',
      options: [
        { id: 'A', text: '9', score: 0 },
        { id: 'B', text: '10', score: 20 },
        { id: 'C', text: '12', score: 5 },
        { id: 'D', text: '7', score: 0 },
      ],
    },
    {
      id: 'jr-num-5',
      tier: 'junior',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 5,
      prompt: 'Ibu memotong 1 pizza menjadi 4 potong sama besar 🍕. Adik memakan 1 potong. Berapa potong pizza yang tersisa di piring?',
      visualHint: '🍕 (4 potong) - 1 potong',
      options: [
        { id: 'A', text: '3 potong', score: 20 },
        { id: 'B', text: '2 potong', score: 5 },
        { id: 'C', text: '1 potong', score: 0 },
        { id: 'D', text: '5 potong', score: 0 },
      ],
    },

    // 3. Spatial Thinking
    {
      id: 'jr-spa-1',
      tier: 'junior',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 1,
      prompt: 'Jika anak panah ⬆️ diputar ke arah kanan sekali (searah jarum jam), anak panah akan menunjuk ke arah mana?',
      visualHint: '⬆️ ↻ (Putar ke kanan)',
      options: [
        { id: 'A', text: '➡️ (Menunjuk ke Kanan)', score: 20 },
        { id: 'B', text: '⬇️ (Menunjuk ke Bawah)', score: 5 },
        { id: 'C', text: '⬅️ (Menunjuk ke Kiri)', score: 0 },
        { id: 'D', text: 'Tetap ke atas', score: 0 },
      ],
    },
    {
      id: 'jr-spa-2',
      tier: 'junior',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 2,
      prompt: 'Sebuah balok kubus memiliki sisi berwarna: Atas Kuning 🟨, Bawah Hitam ⬛. Jika kubus dibalik sehingga sisi bawah menjadi di atas, warna apa yang ada di atas?',
      visualHint: '🟨 (Atas) / ⬛ (Bawah) ➔ Dibalik 🔄',
      options: [
        { id: 'A', text: 'Hitam ⬛', score: 20 },
        { id: 'B', text: 'Kuning 🟨', score: 0 },
        { id: 'C', text: 'Biru 🟦', score: 0 },
        { id: 'D', text: 'Hijau 🟩', score: 0 },
      ],
    },
    {
      id: 'jr-spa-3',
      tier: 'junior',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 3,
      prompt: 'Ada 3 balok ditumpuk ke atas: Balok Merah paling bawah, Balok Hijau di tengah, Balok Biru paling atas. Balok warna apa yang harus dipindahkan pertama kali jika ingin membongkar tumpukan dari atas?',
      visualHint: '🟦 (Atas)\n🟩 (Tengah)\n🟥 (Bawah)',
      options: [
        { id: 'A', text: 'Balok Biru 🟦', score: 20 },
        { id: 'B', text: 'Balok Merah 🟥', score: 0 },
        { id: 'C', text: 'Balok Hijau 🟩', score: 5 },
        { id: 'D', text: 'Semua balok sekaligus', score: 5 },
      ],
    },
    {
      id: 'jr-spa-4',
      tier: 'junior',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 4,
      prompt: 'Bentuk cermin dari tangan kiri yang membuka telapak tangan ke arah cermin akan tampak seperti...?',
      visualHint: '✋ | 🪞 | 🤚',
      options: [
        { id: 'A', text: 'Tangan kanan yang membuka ke arah kita', score: 20 },
        { id: 'B', text: 'Kaki kiri', score: 0 },
        { id: 'C', text: 'Tangan kiri terbalik ke bawah', score: 5 },
        { id: 'D', text: 'Bentuk bola', score: 0 },
      ],
    },
    {
      id: 'jr-spa-5',
      tier: 'junior',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 5,
      prompt: 'Robot Lebah berada di kotak (1,1). Ia maju 2 langkah ke kanan ➡️ dan 1 langkah ke atas ⬆️. Di manakah posisinya sekarang?',
      visualHint: '🗺️ Grid: [Mulai di 1,1] ➔ 2 langkah Kanan ➔ 1 langkah Atas',
      options: [
        { id: 'A', text: 'Kotak (3, 2)', score: 20 },
        { id: 'B', text: 'Kotak (1, 3)', score: 5 },
        { id: 'C', text: 'Kotak (2, 2)', score: 5 },
        { id: 'D', text: 'Kotak (4, 1)', score: 0 },
      ],
    },

    // 4. Pattern Recognition
    {
      id: 'jr-pat-1',
      tier: 'junior',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 1,
      prompt: 'Perhatikan pola buah berikut: 🍎 🍌 🍎 🍌 🍎 ... Buah apakah selanjutnya?',
      visualHint: '🍎 🍌 🍎 🍌 🍎 ❓',
      options: [
        { id: 'A', text: 'Pisang 🍌', score: 20 },
        { id: 'B', text: 'Apel 🍎', score: 0 },
        { id: 'C', text: 'Jeruk 🍊', score: 0 },
        { id: 'D', text: 'Semangka 🍉', score: 0 },
      ],
    },
    {
      id: 'jr-pat-2',
      tier: 'junior',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 2,
      prompt: 'Lihat pola bentuk ini: ⚪ ⬛ ⚪ ⬛ ⚪ ... Bentuk apakah berikutnya?',
      visualHint: '⚪ ⬛ ⚪ ⬛ ⚪ ❓',
      options: [
        { id: 'A', text: 'Kotak Hitam ⬛', score: 20 },
        { id: 'B', text: 'Lingkaran Putih ⚪', score: 0 },
        { id: 'C', text: 'Segitiga 🔺', score: 0 },
        { id: 'D', text: 'Bintang ⭐', score: 0 },
      ],
    },
    {
      id: 'jr-pat-3',
      tier: 'junior',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 3,
      prompt: 'Pola ukuran balok: Kecil ▫️, Sedang ◽, Besar ◻️, Kecil ▫️, Sedang ◽, ... Apa selanjutnya?',
      visualHint: '▫️ ◽ ◻️ ▫️ ◽ ❓',
      options: [
        { id: 'A', text: 'Besar ◻️', score: 20 },
        { id: 'B', text: 'Kecil ▫️', score: 5 },
        { id: 'C', text: 'Sedang ◽', score: 0 },
        { id: 'D', text: 'Sangat Kecil', score: 0 },
      ],
    },
    {
      id: 'jr-pat-4',
      tier: 'junior',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 4,
      prompt: 'Manakah dari benda-benda ini yang TIDAK COCOK dengan kelompoknya? (Kucing 🐱, Anjing 🐶, Kelinci 🐰, Mobil 🚗)',
      visualHint: '🐱 🐶 🐰 🚗',
      options: [
        { id: 'A', text: 'Mobil 🚗 (karena mobil adalah kendaraan, bukan hewan)', score: 20 },
        { id: 'B', text: 'Kelinci 🐰', score: 0 },
        { id: 'C', text: 'Kucing 🐱', score: 0 },
        { id: 'D', text: 'Semuanya sama saja', score: 0 },
      ],
    },
    {
      id: 'jr-pat-5',
      tier: 'junior',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 5,
      prompt: 'Perhatikan lompatan katak: Lompat ke batu 1, lalu 3, lalu 5. Batu nomor berapakah tempat katak mendarat berikutnya?',
      visualHint: '🐸 1 ➔ 3 ➔ 5 ➔ ❓',
      options: [
        { id: 'A', text: 'Batu nomor 7 (selalu loncat melewati 1 angka)', score: 20 },
        { id: 'B', text: 'Batu nomor 6', score: 5 },
        { id: 'C', text: 'Batu nomor 8', score: 0 },
        { id: 'D', text: 'Batu nomor 4', score: 0 },
      ],
    },

    // 5. Creativity
    {
      id: 'jr-cre-1',
      tier: 'junior',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 1,
      prompt: 'Kamu punya kardus bekas berukuran besar 📦 di rumah. Apa hal paling seru yang terpikir untuk kamu buat dengannya?',
      visualHint: '📦 ✨ 🚀',
      options: [
        { id: 'A', text: 'Membuat pesawat ruang angkasa atau istana robot rahasia!', score: 20 },
        { id: 'B', text: 'Membuat kotak penyimpanan mainan bergambar', score: 15 },
        { id: 'C', text: 'Membiarkannya di pojok ruangan', score: 5 },
        { id: 'D', text: 'Membuangnya langsung ke tempat sampah', score: 0 },
      ],
    },
    {
      id: 'jr-cre-2',
      tier: 'junior',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 2,
      prompt: 'Jika kamu membuat game petualangan sendiri, karakter utama apa yang ingin kamu ciptakan?',
      visualHint: '🎮 🎨 👾',
      options: [
        { id: 'A', text: 'Karakter unik ciptaanku (misal lebah yang bisa menembakkan madu pelangi)', score: 20 },
        { id: 'B', text: 'Karakter superhero yang sudah terkenal di TV', score: 12 },
        { id: 'C', text: 'Orang biasa yang hanya berjalan kaki', score: 8 },
        { id: 'D', text: 'Belum tahu, meniru game yang sudah ada saja', score: 5 },
      ],
    },
    {
      id: 'jr-cre-3',
      tier: 'junior',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 3,
      prompt: 'Ketika sedang menggambar pohon, cat warna hijau daunmu habis 🎨. Apa yang akan kamu lakukan?',
      visualHint: '🖌️ 🚫🟩 ➜ 💡?',
      options: [
        { id: 'A', text: 'Mencampur cat warna kuning dan biru untuk membuat warna hijau!', score: 20 },
        { id: 'B', text: 'Menggambar pohon ajaib musim gugur dengan warna oranye atau ungu', score: 18 },
        { id: 'C', text: 'Menunggu dibelikan cat baru sebelum melanjutkan', score: 8 },
        { id: 'D', text: 'Berhenti menggambar dan merobek kertasnya', score: 0 },
      ],
    },
    {
      id: 'jr-cre-4',
      tier: 'junior',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 4,
      prompt: 'Bagaimana caramu membantu kucing kecil yang terjebak di atas dahan pohon rendah?',
      visualHint: '🐱 🌳 🪜',
      options: [
        { id: 'A', text: 'Menaruh kardus empuk di bawah, memanggilnya dengan makanan kesukaannya, atau minta bantuan orang dewasa', score: 20 },
        { id: 'B', text: 'Melempar batu ke atas pohon', score: 0 },
        { id: 'C', text: 'Berteriak sekencang-kencangnya agar kucing takut', score: 0 },
        { id: 'D', text: 'Meninggalkannya begitu saja', score: 5 },
      ],
    },
    {
      id: 'jr-cre-5',
      tier: 'junior',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 5,
      prompt: 'Jika kamu bisa menambahkan 1 tombol ajaib di keyboard komputermu, tombol apa yang ingin kamu ciptakan?',
      visualHint: '⌨️ 🔘 ✨',
      options: [
        { id: 'A', text: 'Tombol untuk otomatis mengubah imajinasi gambarku menjadi animasi bergerak!', score: 20 },
        { id: 'B', text: 'Tombol pembuat kue cokelat hangat otomatis', score: 15 },
        { id: 'C', text: 'Tombol suara musik ceria saat belajar', score: 12 },
        { id: 'D', text: 'Tidak butuh tombol apa pun lagi', score: 5 },
      ],
    },

    // 6. Problem Solving
    {
      id: 'jr-ps-1',
      tier: 'junior',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 1,
      prompt: 'Robot BeeBot ingin mengambil madu di seberang sungai 🍯. Ada jembatan kayu yang licin. Apa langkah paling aman untuk BeeBot?',
      visualHint: '🤖 🌊 🌉 🍯',
      options: [
        { id: 'A', text: 'Berjalan perlahan, memeriksa setiap pijakan kayu satu per satu', score: 20 },
        { id: 'B', text: 'Langsung berlari kencang sambil memejamkan mata', score: 0 },
        { id: 'C', text: 'Menceburkan diri ke air sungai yang dalam', score: 0 },
        { id: 'D', text: 'Menunggu sampai air sungainya kering', score: 5 },
      ],
    },
    {
      id: 'jr-ps-2',
      tier: 'junior',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 2,
      prompt: 'Urutan memakai sepatu yang benar adalah: 1. Ikat tali sepatu, 2. Pasang kaus kaki, 3. Masukkan kaki ke sepatu. Urutan mana yang tepat?',
      visualHint: '🧦 ➜ 👟 ➜ 🎀',
      options: [
        { id: 'A', text: '2 ➜ 3 ➜ 1 (Kaus kaki ➔ Sepatu ➔ Ikat tali)', score: 20 },
        { id: 'B', text: '1 ➜ 2 ➜ 3', score: 0 },
        { id: 'C', text: '3 ➜ 1 ➜ 2', score: 5 },
        { id: 'D', text: '2 ➜ 1 ➜ 3', score: 5 },
      ],
    },
    {
      id: 'jr-ps-3',
      tier: 'junior',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 3,
      prompt: 'Kamu sedang merakit balok Lego, tapi ada 1 potongan kunci yang hilang. Apa yang kamu lakukan pertama kali?',
      visualHint: '🧱 🔍 💡',
      options: [
        { id: 'A', text: 'Mencari di sekitar lantai meja, atau mencoba menggantinya dengan 2 balok kecil yang ukurannya setara', score: 20 },
        { id: 'B', text: 'Marah dan menghancurkan semua Lego yang sudah terpasang', score: 0 },
        { id: 'C', text: 'Menangis dan tidak mau main lagi', score: 0 },
        { id: 'D', text: 'Menunggu sampai besok', score: 5 },
      ],
    },
    {
      id: 'jr-ps-4',
      tier: 'junior',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 4,
      prompt: 'Untuk membuka peti harta karun dibutuhkan 2 anak kunci: Kunci Emas 🔑 dan Kunci Perak 🗝️. BeeBot sudah punya Kunci Emas. Apa yang harus dicari BeeBot selanjutnya?',
      visualHint: '🗝️ 🔑 🔒 🏆',
      options: [
        { id: 'A', text: 'Mencari Kunci Perak 🗝️', score: 20 },
        { id: 'B', text: 'Mencari kunci emas lagi', score: 0 },
        { id: 'C', text: 'Memaksa membuka tanpa kunci kedua', score: 5 },
        { id: 'D', text: 'Meninggalkan peti', score: 0 },
      ],
    },
    {
      id: 'jr-ps-5',
      tier: 'junior',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 5,
      prompt: 'Jalur ke rumah nenek: Jika belok Kiri ada jalan berlubang 🕳️. Jika belok Kanan ada jalan aspal mulus 🛣️. Jalur mana yang sebaiknya dipilih sepeda BeeBot?',
      visualHint: '🚲 ➜ [⬅️ 🕳️] atau [➡️ 🛣️] ?',
      options: [
        { id: 'A', text: 'Belok Kanan ke jalan aspal mulus', score: 20 },
        { id: 'B', text: 'Belok Kiri ke jalan berlubang', score: 0 },
        { id: 'C', text: 'Berhenti di tengah jalan selamanya', score: 0 },
        { id: 'D', text: 'Mundur pulang ke rumah', score: 5 },
      ],
    },

    // 7. Language & Communication
    {
      id: 'jr-lan-1',
      tier: 'junior',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 1,
      prompt: 'Guru memberi instruksi: "Ambil buku gambarmu, letakkan di atas meja, lalu siapkan pensil warna." Manakah urutan yang sesuai instruksi guru?',
      visualHint: '📖 ➜ 🪵 ➜ ✏️',
      options: [
        { id: 'A', text: 'Ambil buku ➔ Taruh di meja ➔ Siapkan pensil warna', score: 20 },
        { id: 'B', text: 'Siapkan pensil ➔ Buka tas ➔ Menyanyi', score: 0 },
        { id: 'C', text: 'Menaruh pensil di lantai ➔ Ambil buku', score: 5 },
        { id: 'D', text: 'Langsung menggambar tanpa buku', score: 0 },
      ],
    },
    {
      id: 'jr-lan-2',
      tier: 'junior',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 2,
      prompt: 'Hubungan kata: "BURUNG berhubungan dengan TERBANG 🦅, seperti IKAN berhubungan dengan ...?"',
      visualHint: '🦅 : Terbang = 🐟 : ❓',
      options: [
        { id: 'A', text: 'Berenang 🏊', score: 20 },
        { id: 'B', text: 'Berlari 🏃', score: 0 },
        { id: 'C', text: 'Melompat 🦘', score: 5 },
        { id: 'D', text: 'Tidur 😴', score: 0 },
      ],
    },
    {
      id: 'jr-lan-3',
      tier: 'junior',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 3,
      prompt: 'Jika kamu ingin meminjam pensil teman di kelas, kalimat sopan manakah yang paling baik diucapkan?',
      visualHint: '🤝 ✏️ 💬',
      options: [
        { id: 'A', text: '"Bolehkan aku meminjam pensilmu sebentar? Terima kasih ya!"', score: 20 },
        { id: 'B', text: '"Berikan pensilmu sekarang!"', score: 0 },
        { id: 'C', text: 'Mengambil pensilnya diam-diam saat temannya lengah', score: 0 },
        { id: 'D', text: '"Pensilmu jelek, tapi mau kupakai."', score: 0 },
      ],
    },
    {
      id: 'jr-lan-4',
      tier: 'junior',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 4,
      prompt: 'Ibu berkata: "Hari ini matahari bersinar cerah dan udara sangat hangat." Ini berarti hari ini sedang...?',
      visualHint: '☀️ 🌤️',
      options: [
        { id: 'A', text: 'Cuaca cerah dan siang hari yang terang', score: 20 },
        { id: 'B', text: 'Badai petir dan hujan lebat', score: 0 },
        { id: 'C', text: 'Tengah malam yang gelap', score: 0 },
        { id: 'D', text: 'Musim salju dingin', score: 0 },
      ],
    },
    {
      id: 'jr-lan-5',
      tier: 'junior',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 5,
      prompt: 'Ketika kamu berhasil membuat proyek animasi bergerak, bagaimana kamu menceritakannya ke orang tuamu?',
      visualHint: '🗣️ 💻 👪',
      options: [
        { id: 'A', text: 'Menjelaskan langkah-langkahnya dengan antusias: bagaimana cara menggerakkan karakternya!', score: 20 },
        { id: 'B', text: 'Hanya bilang "bagus kok" tanpa mau menjelaskan', score: 10 },
        { id: 'C', text: 'Malu-malu dan menyembunyikan layarnya', score: 5 },
        { id: 'D', text: 'Tidak mau menceritakannya sama sekali', score: 0 },
      ],
    },

    // 8. Persistence & Learning Behaviour
    {
      id: 'jr-per-1',
      tier: 'junior',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 1,
      prompt: 'Ketika bermain game atau merakit balok, kamu kalah atau baloknya roboh. Apa yang kamu rasakan dan lakukan?',
      visualHint: '🧱 💥 ➔ 🧘 💡',
      options: [
        { id: 'A', text: 'Tersenyum, menarik napas, lalu mencoba merakitnya lagi dengan lebih kokoh!', score: 20 },
        { id: 'B', text: 'Sedih sebentar, lalu minta teman/kakak membantu merakitnya', score: 15 },
        { id: 'C', text: 'Kesal dan tidak mau menyentuh balok itu seharian', score: 5 },
        { id: 'D', text: 'Melempar balok ke dinding', score: 0 },
      ],
    },
    {
      id: 'jr-per-2',
      tier: 'junior',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 2,
      prompt: 'Ketika kamu menemukan tombol baru di komputer/tablet yang belum pernah kamu lihat sebelumnya, apa yang kamu lakukan?',
      visualHint: '💻 🔘 ❓ 🤔',
      options: [
        { id: 'A', text: 'Penasaran! Bertanya ke guru/orang tua atau mencobanya hati-hati untuk tahu fungsinya', score: 20 },
        { id: 'B', text: 'Mencoba memencet berkali-kali tanpa tahu tujuannya', score: 10 },
        { id: 'C', text: 'Takut rusak jadi tidak pernah mau menyentuhnya', score: 8 },
        { id: 'D', text: 'Tidak peduli sama sekali', score: 0 },
      ],
    },
    {
      id: 'jr-per-3',
      tier: 'junior',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 3,
      prompt: 'Saat guru sedang menjelaskan langkah membuat animasi lebah terbang, bagaimana sikapmu?',
      visualHint: '👨‍🏫 🐝 👂',
      options: [
        { id: 'A', text: 'Mendengarkan dengan fokus dan mencoba mempraktikkannya di komputermu', score: 20 },
        { id: 'B', text: 'Mendengarkan sesekali sambil mengobrol dengan teman', score: 10 },
        { id: 'C', text: 'Menggambar coretan lain yang tidak berhubungan', score: 5 },
        { id: 'D', text: 'Bosan dan ingin cepat pulang', score: 0 },
      ],
    },
    {
      id: 'jr-per-4',
      tier: 'junior',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 4,
      prompt: 'Ada teka-teki tebak gambar yang sulit di buku teka-teki. Kamu sudah mencoba 2 kali tapi masih salah. Apa yang kamu lakukan?',
      visualHint: '🧩 🔄 ⏱️',
      options: [
        { id: 'A', text: 'Melihat gambarnya lebih teliti lagi dan mencoba cara ketiga!', score: 20 },
        { id: 'B', text: 'Melihat kunci jawaban di halaman belakang langsung', score: 8 },
        { id: 'C', text: 'Meninggalkan buku dan bermain hp', score: 5 },
        { id: 'D', text: 'Menyerah dan mengatakan teka-tekinya jelek', score: 0 },
      ],
    },
    {
      id: 'jr-per-5',
      tier: 'junior',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 5,
      prompt: 'Berapa lama kamu biasanya tahan duduk membuat kreasi karya (menggambar/merakit/coding) sampai karyamu selesai?',
      visualHint: '⏳ 🎨 🏆',
      options: [
        { id: 'A', text: 'Sangat betah dan asyik sampai karyaku benar-benar jadi dan memuaskan!', score: 20 },
        { id: 'B', text: 'Cukup betah sekitar 20 - 30 menit, setelah itu istirahat dulu sebentar', score: 18 },
        { id: 'C', text: 'Baru 5 menit sudah sering ingin pindah aktivitas lain', score: 8 },
        { id: 'D', text: 'Jarang menyelesaikan apa yang sudah dimulai', score: 0 },
      ],
    },
  ],

  // ==========================================
  // MIDDLE (10-12 Tahun)
  // ==========================================
  middle: [
    // 1. Logical Thinking
    {
      id: 'mid-log-1',
      tier: 'middle',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 1,
      prompt: 'Kondisi: JIKA tombol A ditekan, Lampu 1 menyala. JIKA tombol B ditekan, Lampu 2 menyala. JIKA kedua tombol ditekan bersamaan, sirene berbunyi dan kedua lampu MATI. Jika sekarang Lampu 1 menyala dan Lampu 2 mati, tombol apa yang ditekan?',
      visualHint: '🔘 A ➜ 💡1 | 🔘 B ➜ 💡2 | A+B ➜ 🚨',
      options: [
        { id: 'A', text: 'Hanya Tombol A yang ditekan', score: 20 },
        { id: 'B', text: 'Hanya Tombol B yang ditekan', score: 0 },
        { id: 'C', text: 'Kedua tombol ditekan bersamaan', score: 0 },
        { id: 'D', text: 'Tidak ada tombol yang ditekan', score: 0 },
      ],
    },
    {
      id: 'mid-log-2',
      tier: 'middle',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 2,
      prompt: 'Tiga pelari: Dito lebih cepat dari Reza. Bayu lebih lambat dari Reza. Siapakah yang menjadi pelari paling cepat di antara ketiganya?',
      visualHint: '🏃 Dito > Reza | Reza > Bayu',
      options: [
        { id: 'A', text: 'Dito', score: 20 },
        { id: 'B', text: 'Reza', score: 5 },
        { id: 'C', text: 'Bayu', score: 0 },
        { id: 'D', text: 'Ketiganya sama cepat', score: 0 },
      ],
    },
    {
      id: 'mid-log-3',
      tier: 'middle',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 3,
      prompt: 'Pernyataan 1: Semua robot di lab Beekoding ditenagai baterai surya. Pernyataan 2: Robo-X adalah robot di lab Beekoding. Kesimpulan yang PASTI BENAR adalah...?',
      visualHint: '🤖 Semua Robot ➔ ☀️ Baterai Surya | Robo-X ➔ Robot Lab',
      options: [
        { id: 'A', text: 'Robo-X ditenagai baterai surya', score: 20 },
        { id: 'B', text: 'Robo-X tidak membutuhkan energi surya', score: 0 },
        { id: 'C', text: 'Robo-X bisa terbang', score: 0 },
        { id: 'D', text: 'Semua benda surya adalah Robo-X', score: 5 },
      ],
    },
    {
      id: 'mid-log-4',
      tier: 'middle',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 4,
      prompt: 'Logika Gerbang AND: Output bernilai BENAR hanya jika Sakelar 1 DAN Sakelar 2 ON. Jika Sakelar 1 ON dan Sakelar 2 OFF, apa nilai Output?',
      visualHint: '⚡ Sakelar 1 (ON) AND Sakelar 2 (OFF) = ❓',
      options: [
        { id: 'A', text: 'SALAH (OFF / 0)', score: 20 },
        { id: 'B', text: 'BENAR (ON / 1)', score: 0 },
        { id: 'C', text: 'Setengah Nyala', score: 5 },
        { id: 'D', text: 'Terbakar', score: 0 },
      ],
    },
    {
      id: 'mid-log-5',
      tier: 'middle',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 5,
      prompt: 'Ada 3 kotak misterius: Merah, Hijau, Biru. Hanya satu kotak yang berisi hadiah. Kotak Merah bertuliskan: "Hadiah ada di kotak ini". Kotak Hijau bertuliskan: "Hadiah tidak ada di kotak Merah". Jika hanya satu tulisan yang JUJUR, di kotak manakah hadiah berada?',
      visualHint: '📦🔴 "Hadiah di sini" | 📦🟢 "Bukan di merah" (Hanya 1 benar)',
      options: [
        { id: 'A', text: 'Kotak Biru (karena jika Merah atau Hijau benar, akan timbul kontradiksi)', score: 20 },
        { id: 'B', text: 'Kotak Merah', score: 5 },
        { id: 'C', text: 'Kotak Hijau', score: 10 },
        { id: 'D', text: 'Tidak ada hadiah sama sekali', score: 5 },
      ],
    },

    // 2. Numerical Thinking
    {
      id: 'mid-num-1',
      tier: 'middle',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 1,
      prompt: 'Teka-teki Simbol:\n🤖 + 🤖 = 10\n🤖 + 🍯 = 8\nBerapakah nilai dari 🍯 x 2?',
      visualHint: '🤖 + 🤖 = 10 ➔ 🤖=5 | 5 + 🍯 = 8 ➔ 🍯=3',
      options: [
        { id: 'A', text: '6 (karena 🍯 bernilai 3)', score: 20 },
        { id: 'B', text: '8', score: 5 },
        { id: 'C', text: '5', score: 0 },
        { id: 'D', text: '10', score: 5 },
      ],
    },
    {
      id: 'mid-num-2',
      tier: 'middle',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 2,
      prompt: 'Sebuah program mengalikan angka input dengan 3, lalu menambahkannya dengan 4. Jika angka output yang keluar adalah 19, berapa angka input yang dimasukkan?',
      visualHint: '(Input x 3) + 4 = 19',
      options: [
        { id: 'A', text: '5 (karena 5 x 3 = 15, lalu 15 + 4 = 19)', score: 20 },
        { id: 'B', text: '4', score: 5 },
        { id: 'C', text: '6', score: 5 },
        { id: 'D', text: '7', score: 0 },
      ],
    },
    {
      id: 'mid-num-3',
      tier: 'middle',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 3,
      prompt: 'Kapasitas file game adalah 200 MB. Kecepatan download adalah 20 MB setiap 1 detik. Berapa detik waktu yang dibutuhkan hingga game selesai di-download?',
      visualHint: '📁 200 MB / 20 MB per detik',
      options: [
        { id: 'A', text: '10 detik', score: 20 },
        { id: 'B', text: '20 detik', score: 5 },
        { id: 'C', text: '5 detik', score: 0 },
        { id: 'D', text: '100 detik', score: 0 },
      ],
    },
    {
      id: 'mid-num-4',
      tier: 'middle',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 4,
      prompt: 'Pola kelipatan biner: 1, 2, 4, 8, 16, ... Berapakah angka berikutnya dalam deret ini?',
      visualHint: '1 ➔ 2 ➔ 4 ➔ 8 ➔ 16 ➔ ❓',
      options: [
        { id: 'A', text: '32 (setiap angka dikali 2)', score: 20 },
        { id: 'B', text: '24', score: 5 },
        { id: 'C', text: '30', score: 5 },
        { id: 'D', text: '64', score: 5 },
      ],
    },
    {
      id: 'mid-num-5',
      tier: 'middle',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 5,
      prompt: 'Di sebuah toko coding, harga 3 sensor adalah Rp 45.000. Berapakah harga 5 sensor yang sama?',
      visualHint: '3 sensor = Rp 45.000 ➔ 1 sensor = Rp 15.000',
      options: [
        { id: 'A', text: 'Rp 75.000', score: 20 },
        { id: 'B', text: 'Rp 65.000', score: 5 },
        { id: 'C', text: 'Rp 90.000', score: 5 },
        { id: 'D', text: 'Rp 60.000', score: 0 },
      ],
    },

    // 3. Spatial Thinking
    {
      id: 'mid-spa-1',
      tier: 'middle',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 1,
      prompt: 'Sebuah bentuk huruf "L" diputar 90 derajat searah jarum jam, kemudian dicerminkan secara horizontal (kiri-kanan). Bagaimana orientasi akhirnya?',
      visualHint: '⌐ ➔ Putar 90° ➔ Cermin horizontal',
      options: [
        { id: 'A', text: 'Garis horizontal di atas mengarah ke kiri, garis vertikal di sebelah kanan', score: 20 },
        { id: 'B', text: 'Kembali ke bentuk huruf "L" semula', score: 5 },
        { id: 'C', text: 'Berbentuk huruf "T"', score: 0 },
        { id: 'D', text: 'Terbalik sepenuhnya ke bawah', score: 10 },
      ],
    },
    {
      id: 'mid-spa-2',
      tier: 'middle',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 2,
      prompt: 'Sebuah kubus memiliki 6 sisi bernomor 1 sampai 6. Sisi yang berlawanan selalu berjumlah 7 (misal 1 berlawanan dengan 6). Sisi manakah yang berlawanan dengan sisi nomor 3?',
      visualHint: '🎲 Jumlah sisi berlawanan = 7. Sisi = 3, Lawan = ❓',
      options: [
        { id: 'A', text: 'Sisi nomor 4 (karena 3 + 4 = 7)', score: 20 },
        { id: 'B', text: 'Sisi nomor 5', score: 5 },
        { id: 'C', text: 'Sisi nomor 2', score: 5 },
        { id: 'D', text: 'Sisi nomor 1', score: 0 },
      ],
    },
    {
      id: 'mid-spa-3',
      tier: 'middle',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 3,
      prompt: 'Tumpukan balok kubus berukuran 2x2x2 disusun rapi di atas meja. Berapa total kubus kecil yang ada di dalam tumpukan tersebut?',
      visualHint: '🧊 2 balok panjang x 2 balok lebar x 2 balok tinggi',
      options: [
        { id: 'A', text: '8 balok kecil (2 x 2 x 2 = 8)', score: 20 },
        { id: 'B', text: '6 balok kecil', score: 5 },
        { id: 'C', text: '12 balok kecil', score: 5 },
        { id: 'D', text: '4 balok kecil', score: 0 },
      ],
    },
    {
      id: 'mid-spa-4',
      tier: 'middle',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 4,
      prompt: 'Jika kamu melihat mobil pemadam kebakaran dari sudut tepat di atas atapnya (Top-Down View), bentuk apa yang dominan terlihat?',
      visualHint: '🚒 ➜ Dilihat dari drone tepat di langit',
      options: [
        { id: 'A', text: 'Persegi panjang merah dengan pola tangga dan lampu sirene di tengahnya', score: 20 },
        { id: 'B', text: 'Roda bulat dan pintu samping mobil', score: 0 },
        { id: 'C', text: 'Segitiga lancip', score: 0 },
        { id: 'D', text: 'Kaca spion saja', score: 0 },
      ],
    },
    {
      id: 'mid-spa-5',
      tier: 'middle',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 5,
      prompt: 'Kamera dalam game 3D bergerak: Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter, Belok Kiri 90 derajat, Maju 5 meter. Lintasan apa yang terbentuk?',
      visualHint: '📐 4 sisi sama panjang + 4 sudut 90°',
      options: [
        { id: 'A', text: 'Bujursangkar / Persegi tertutup (kembali ke titik awal)', score: 20 },
        { id: 'B', text: 'Garis lurus panjang 20 meter', score: 0 },
        { id: 'C', text: 'Bentuk Segitiga', score: 0 },
        { id: 'D', text: 'Bentuk Lingkaran', score: 5 },
      ],
    },

    // 4. Pattern Recognition
    {
      id: 'mid-pat-1',
      tier: 'middle',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 1,
      prompt: 'Perhatikan barisan bilangan: 3, 6, 12, 24, 48, ... Angka berikutnya adalah?',
      visualHint: '3 (x2) ➔ 6 (x2) ➔ 12 (x2) ➔ 24 (x2) ➔ 48 ➔ ❓',
      options: [
        { id: 'A', text: '96', score: 20 },
        { id: 'B', text: '60', score: 5 },
        { id: 'C', text: '72', score: 5 },
        { id: 'D', text: '84', score: 5 },
      ],
    },
    {
      id: 'mid-pat-2',
      tier: 'middle',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 2,
      prompt: 'Pola huruf sandi: A = 1, C = 3, E = 5, G = 7. Huruf apakah yang bernilai 9?',
      visualHint: 'A(1) ➔ C(3) ➔ E(5) ➔ G(7) ➔ ❓(9)',
      options: [
        { id: 'A', text: 'Huruf I (melompati 1 huruf dalam abjad)', score: 20 },
        { id: 'B', text: 'Huruf H', score: 5 },
        { id: 'C', text: 'Huruf J', score: 5 },
        { id: 'D', text: 'Huruf K', score: 0 },
      ],
    },
    {
      id: 'mid-pat-3',
      tier: 'middle',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 3,
      prompt: 'Matriks 2x2:\n[ ⚪ ⚫ ]\n[ ⚫ ❓ ]\nBentuk manakah yang melengkapi pola simetri matriks tersebut?',
      visualHint: 'Baris 1: [Putih, Hitam] | Baris 2: [Hitam, ?]',
      options: [
        { id: 'A', text: '⚪ (Lingkaran Putih)', score: 20 },
        { id: 'B', text: '⚫ (Lingkaran Hitam)', score: 5 },
        { id: 'C', text: '🔺 (Segitiga)', score: 0 },
        { id: 'D', text: '⬛ (Kotak)', score: 0 },
      ],
    },
    {
      id: 'mid-pat-4',
      tier: 'middle',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 4,
      prompt: 'Sebuah ritme lagu game berbunyi: "Ketuk, Ketuk, Diam, Ketuk, Ketuk, Diam, Ketuk, Ketuk, ...". Dua aksi berikutnya adalah?',
      visualHint: '🥁 🥁 🤫 | 🥁 🥁 🤫 | 🥁 🥁 ... ❓ ❓',
      options: [
        { id: 'A', text: 'Diam, lalu Ketuk', score: 20 },
        { id: 'B', text: 'Ketuk, lalu Ketuk', score: 5 },
        { id: 'C', text: 'Diam, lalu Diam', score: 0 },
        { id: 'D', text: 'Tidak ada bunyi lagi', score: 0 },
      ],
    },
    {
      id: 'mid-pat-5',
      tier: 'middle',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 5,
      prompt: 'Deret bilangan Fibonacci: 1, 1, 2, 3, 5, 8, 13, ... Berapakah angka selanjutnya? (Petunjuk: Setiap angka adalah penjumlahan dua angka sebelumnya)',
      visualHint: '5 + 8 = 13 ➔ 8 + 13 = ❓',
      options: [
        { id: 'A', text: '21', score: 20 },
        { id: 'B', text: '18', score: 5 },
        { id: 'C', text: '20', score: 5 },
        { id: 'D', text: '26', score: 0 },
      ],
    },

    // 5. Creativity
    {
      id: 'mid-cre-1',
      tier: 'middle',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 1,
      prompt: 'Kamu ingin membuat game bertema daur ulang sampah di Scratch. Mekanisme game seperti apa yang menurutmu paling seru dan mengedukasi pemain?',
      visualHint: '🎮 ♻️ 💡',
      options: [
        { id: 'A', text: 'Game menyortir sampah bergerak cepat di konveyor dengan power-up sains dan info dampak lingkungan setiap berhasil memilah', score: 20 },
        { id: 'B', text: 'Kuis teks biasa dengan pertanyaan pilihan ganda saja', score: 10 },
        { id: 'C', text: 'Hanya menampilkan gambar poster sampah diam', score: 5 },
        { id: 'D', text: 'Menjiplak game Flappy Bird tanpa tema daur ulang', score: 5 },
      ],
    },
    {
      id: 'mid-cre-2',
      tier: 'middle',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 2,
      prompt: 'Jika kamu diminta mendesain website untuk toko hewan peliharaan, fitur unik apa yang akan kamu tambahkan agar berbeda dari website lain?',
      visualHint: '🐾 🌐 ✨',
      options: [
        { id: 'A', text: 'Kuis interaktif pencocokan jenis hewan yang cocok dengan kepribadian pemilik, plus simulasi virtual pet sederhana', score: 20 },
        { id: 'B', text: 'Hanya daftar foto hewan dan nomor telepon', score: 8 },
        { id: 'C', text: 'Halaman kosong dengan tulisan "Hubungi kami"', score: 0 },
        { id: 'D', text: 'Meniru persis toko hewan sebelah tanpa inovasi', score: 5 },
      ],
    },
    {
      id: 'mid-cre-3',
      tier: 'middle',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 3,
      prompt: 'Saat membuat proyek animasi, kamu menyadari musik latar yang kamu inginkan tidak tersedia secara gratis. Apa solusimu?',
      visualHint: '🎵 🚫 ©️ ➔ 💡?',
      options: [
        { id: 'A', text: 'Merekam efek suara sendiri menggunakan benda-benda di rumah atau memakai tool generator melodi digital open-source', score: 20 },
        { id: 'B', text: 'Mengambil musik berhak cipta tanpa izin', score: 0 },
        { id: 'C', text: 'Membatalkan seluruh proyek animasi', score: 0 },
        { id: 'D', text: 'Membiarkan animasinya hening total tanpa berusaha mencari alternatif', score: 8 },
      ],
    },
    {
      id: 'mid-cre-4',
      tier: 'middle',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 4,
      prompt: 'Bagaimana kamu memanfaatkan kecerdasan buatan (AI) untuk membantu belajarmu di sekolah?',
      visualHint: '🤖 📚 🧠',
      options: [
        { id: 'A', text: 'Meminta AI menjelaskan materi sulit dengan analogi mudah dipahami dan memberikan soal latihan untuk menguji pemahamanku', score: 20 },
        { id: 'B', text: 'Menyuruh AI mengerjakan seluruh PR tanpa mau membacanya', score: 0 },
        { id: 'C', text: 'Mengabaikan AI karena menganggapnya tidak berguna', score: 5 },
        { id: 'D', text: 'Hanya dipakai untuk mengarang lelucon', score: 8 },
      ],
    },
    {
      id: 'mid-cre-5',
      tier: 'middle',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 5,
      prompt: 'Jika kamu bisa menciptakan robot yang memecahkan satu masalah di kotamu, masalah apa yang ingin kamu selesaikan?',
      visualHint: '🏙️ 🤖 🌍',
      options: [
        { id: 'A', text: 'Mengembangkan robot sensor pendeteksi banjir dini atau pemilah sampah otomatis di saluran air kota', score: 20 },
        { id: 'B', text: 'Robot yang hanya bisa berjalan maju mundur tanpa tujuan jelas', score: 5 },
        { id: 'C', text: 'Robot untuk membantu bolos sekolah', score: 0 },
        { id: 'D', text: 'Tidak ada ide sama sekali', score: 0 },
      ],
    },

    // 6. Problem Solving
    {
      id: 'mid-ps-1',
      tier: 'middle',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 1,
      prompt: 'Dalam game Scratch yang kamu buat, skor pemain tidak bertambah saat menyentuh koin emas. Apa langkah pertama yang kamu lakukan untuk menemukan penyebabnya?',
      visualHint: '🐞 Debugging: Skor tidak bertambah saat kena koin',
      options: [
        { id: 'A', text: 'Memeriksa blok kode koin: apakah deteksi "touching player" dan blok "change score by 1" sudah terpasang dengan benar di dalam loop berulang', score: 20 },
        { id: 'B', text: 'Menghapus seluruh game dan mulai ulang dari nol', score: 5 },
        { id: 'C', text: 'Mengganti warna koin menjadi hijau', score: 0 },
        { id: 'D', text: 'Mematikan komputer karena panik', score: 0 },
      ],
    },
    {
      id: 'mid-ps-2',
      tier: 'middle',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 2,
      prompt: 'Sebuah robot pengantar paket perlu mengantarkan 3 barang ke lokasi A (jarak 2 km), B (jarak 5 km sejalur dengan A), dan C (jarak 8 km berlawanan arah). Urutan rute paling efisien adalah?',
      visualHint: '📍 C (8km Kiri) ◄── [Robot] ──► A (2km Kanan) ──► B (5km Kanan)',
      options: [
        { id: 'A', text: 'Ke A lalu B (sejalur), baru berputar menuju C', score: 20 },
        { id: 'B', text: 'Ke C dulu, lalu ke A, lalu kembali ke C, lalu ke B', score: 0 },
        { id: 'C', text: 'Bolak-balik acak antar titik', score: 0 },
        { id: 'D', text: 'Menolak mengantarkan paket', score: 0 },
      ],
    },
    {
      id: 'mid-ps-3',
      tier: 'middle',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 3,
      prompt: 'Konsep "Divide and Conquer" (Memecah masalah besar menjadi bagian kecil). Jika kamu diminta membuat game RPG yang rumit, apa strategi terbaik?',
      visualHint: '🧩 Masalah Besar ➔ Modul Karakter + Modul Peta + Modul Musuh',
      options: [
        { id: 'A', text: 'Membuat satu per satu komponen kecil terlebih dahulu (gerakan karakter ➔ sistem scoring ➔ rintangan/musuh) lalu menggabungkannya', score: 20 },
        { id: 'B', text: 'Menulis ribuan baris kode sekaligus tanpa mengujinya sama sekali', score: 0 },
        { id: 'C', text: 'Hanya membuat gambar grafisnya tanpa memprogram mekanismenya', score: 5 },
        { id: 'D', text: 'Menyerah karena game RPG terlalu sulit', score: 0 },
      ],
    },
    {
      id: 'mid-ps-4',
      tier: 'middle',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 4,
      prompt: 'Robot maze menghadapi jalan buntu di depan. Sensor menunjukkan dinding di depan dan kanan, tetapi arah kiri terbuka. Perintah yang tepat untuk robot adalah?',
      visualHint: '🧱 Depan: Tembok | 🧱 Kanan: Tembok | 🟢 Kiri: Bebas',
      options: [
        { id: 'A', text: 'Belok Kiri 90 derajat, lalu Maju 1 langkah', score: 20 },
        { id: 'B', text: 'Terus Maju menabrak dinding depan', score: 0 },
        { id: 'C', text: 'Belok Kanan menabrak dinding', score: 0 },
        { id: 'D', text: 'Mematikan mesin di tempat', score: 5 },
      ],
    },
    {
      id: 'mid-ps-5',
      tier: 'middle',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 5,
      prompt: 'Kamu punya 9 koin logam dengan bentuk identik, tetapi 1 di antaranya koin palsu yang lebih ringan. Menggunakan timbangan neraca, berapa kali penimbangan MINIMAL yang dibutuhkan untuk menemukan koin palsu?',
      visualHint: '⚖️ 9 koin: Bagi jadi 3 kelompok (3, 3, 3)',
      options: [
        { id: 'A', text: '2 kali penimbangan (Timbang 3 vs 3, lalu 1 vs 1)', score: 20 },
        { id: 'B', text: '8 kali penimbangan', score: 5 },
        { id: 'C', text: '4 kali penimbangan', score: 10 },
        { id: 'D', text: '1 kali penimbangan', score: 5 },
      ],
    },

    // 7. Language & Communication
    {
      id: 'mid-lan-1',
      tier: 'middle',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 1,
      prompt: 'Dalam pemrograman, istilah "Bug" merujuk pada kesalahan dalam kode program. Jika temanmu berkata "Programku masih banyak bug-nya!", maksudnya adalah...?',
      visualHint: '💻 🐞 ➔ Apa artinya?',
      options: [
        { id: 'A', text: 'Programnya masih memiliki kesalahan logika atau error yang harus diperbaiki', score: 20 },
        { id: 'B', text: 'Ada semut atau serangga sungguhan di dalam layar laptopnya', score: 0 },
        { id: 'C', text: 'Programnya sudah selesai sempurna tanpa kekurangan', score: 0 },
        { id: 'D', text: 'Programnya sedang diserang virus jahat dari luar angkasa', score: 5 },
      ],
    },
    {
      id: 'mid-lan-2',
      tier: 'middle',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 2,
      prompt: 'Perhatikan kalimat instruksi bersyarat: "Simpan dokumen HANYA JIKA semua kolom bertanda bintang (*) sudah terisi lengkap." Apa yang terjadi jika ada satu kolom bertanda (*) yang masih kosong?',
      visualHint: '📝 Syarat Simpan: Semua (*) terisi',
      options: [
        { id: 'A', text: 'Dokumen TIDAK BOLEH disimpan sebelum kolom (*) tersebut diisi', score: 20 },
        { id: 'B', text: 'Dokumen otomatis terhapus', score: 0 },
        { id: 'C', text: 'Dokumen tetap disimpan tanpa peringatan', score: 5 },
        { id: 'D', text: 'Komputer akan restart', score: 0 },
      ],
    },
    {
      id: 'mid-lan-3',
      tier: 'middle',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 3,
      prompt: 'Analogi Kata: "PENULIS berhubungan dengan BUKU ✍️, seperti PROGRAMMER berhubungan dengan ...?"',
      visualHint: 'Penulis : Buku = Programmer : ❓',
      options: [
        { id: 'A', text: 'Aplikasi / Kode Perangkat Lunak 💻', score: 20 },
        { id: 'B', text: 'Kertas karton', score: 0 },
        { id: 'C', text: 'Kabel listrik', score: 5 },
        { id: 'D', text: 'Meja kantor', score: 0 },
      ],
    },
    {
      id: 'mid-lan-4',
      tier: 'middle',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 4,
      prompt: 'Ketika kamu mempresentasikan proyek coding buatanmu di hadapan teman-teman sekelas, bagian mana yang paling penting dijelaskan terlebih dahulu?',
      visualHint: '🎤 🖥️ 🧑‍🤝‍🧑',
      options: [
        { id: 'A', text: 'Tujuan proyek, apa masalah yang ingin dipecahkan, dan bagaimana cara kerjanya', score: 20 },
        { id: 'B', text: 'Menghafal setiap baris kode yang rumit tanpa menjelaskan fungsinya', score: 8 },
        { id: 'C', text: 'Langsung pamer bahwa karyamu paling hebat tanpa mendengarkan saran', score: 0 },
        { id: 'D', text: 'Hanya membacakan judulnya lalu duduk kembali', score: 0 },
      ],
    },
    {
      id: 'mid-lan-5',
      tier: 'middle',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 5,
      prompt: 'Dalam kerja kelompok membuat game, teman satu timmu mengusulkan ide yang menurutmu kurang efektif. Cara terbaik untuk merespon adalah...?',
      visualHint: '💬 🤝 💡',
      options: [
        { id: 'A', text: 'Mengapresiasi idenya, lalu menjelaskan alasan teknis secara sopan sambil menawarkan alternatif perbaikan', score: 20 },
        { id: 'B', text: 'Langsung mencela idenya bodoh di depan umum', score: 0 },
        { id: 'C', text: 'Diam saja tapi kesal di dalam hati', score: 5 },
        { id: 'D', text: 'Keluar dari kelompok tanpa pamit', score: 0 },
      ],
    },

    // 8. Persistence & Learning Behaviour
    {
      id: 'mid-per-1',
      tier: 'middle',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 1,
      prompt: 'Kamu sudah mencoba menulis script coding selama 1 jam, tetapi muncul pesan error merah di layar. Apa reaksi pertamamu?',
      visualHint: '⚠️ ERROR: Line 14 SyntaxError',
      options: [
        { id: 'A', text: 'Membaca pesan errornya dengan teliti: di baris mana letak kesalahannya, lalu mencari solusinya atau bertanya ke mentor', score: 20 },
        { id: 'B', text: 'Langsung menutup aplikasi dan berhenti belajar coding', score: 0 },
        { id: 'C', text: 'Mengeluh terus menerus tapi tidak membaca pesannya', score: 5 },
        { id: 'D', text: 'Menyalahkan komputernya rusak', score: 0 },
      ],
    },
    {
      id: 'mid-per-2',
      tier: 'middle',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 2,
      prompt: 'Saat kamu melihat proyek buatan teman atau coder lain yang jauh lebih canggih daripada buatanmu saat ini, apa yang kamu rasakan?',
      visualHint: '🌟 🚀 💡',
      options: [
        { id: 'A', text: 'Termotivasi dan terinspirasi! Ingin mempelajari teknik baru apa yang mereka gunakan agar karyaku bisa semakin hebat', score: 20 },
        { id: 'B', text: 'Iri dan merasa rendah diri lalu tidak mau coding lagi', score: 5 },
        { id: 'C', text: 'Mengatakan bahwa karya mereka curang atau tidak asli', score: 0 },
        { id: 'D', text: 'Biasa saja, tidak peduli dengan perkembangan diri', score: 5 },
      ],
    },
    {
      id: 'mid-per-3',
      tier: 'middle',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 3,
      prompt: 'Seberapa sering kamu penasaran ingin membongkar dan mencari tahu cara kerja suatu teknologi (game, website, atau robot)?',
      visualHint: '🔍 ⚙️ 💡',
      options: [
        { id: 'A', text: 'Sering sekali! Aku selalu ingin tahu logika di balik layar dan cara kerjanya', score: 20 },
        { id: 'B', text: 'Kadang-kadang, jika game tersebut sangat menarik', score: 15 },
        { id: 'C', text: 'Jarang, aku hanya suka memainkannya saja sebagai pengguna', score: 10 },
        { id: 'D', text: 'Tidak pernah tertarik sama sekali', score: 0 },
      ],
    },
    {
      id: 'mid-per-4',
      tier: 'middle',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 4,
      prompt: 'Ketika belajar materi coding baru yang cukup abstrak (misal variabel atau perulangan for-loop), berapa lama kamu bersedia berlatih hingga paham?',
      visualHint: '🔁 ⏳ 🧠',
      options: [
        { id: 'A', text: 'Aku akan terus mencoba beberapa contoh latihan berbeda sampai benar-benar paham logikanya', score: 20 },
        { id: 'B', text: 'Hanya mencoba sekali; kalau belum paham ya sudah lewatkan saja', score: 8 },
        { id: 'C', text: 'Langsung minta orang lain yang mengerjakan tugas latihannya', score: 0 },
        { id: 'D', text: 'Memilih pura-pura paham padahal bingung', score: 5 },
      ],
    },
    {
      id: 'mid-per-5',
      tier: 'middle',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 5,
      prompt: 'Jika kamu diberikan waktu bebas 2 jam di akhir pekan, aktivitas mana yang paling membuatmu bersemangat?',
      visualHint: '🎯 ⏰ ✨',
      options: [
        { id: 'A', text: 'Mengeksplorasi proyek kreatif (coding proyek baru, merakit lego/robot, atau belajar skill digital baru)', score: 20 },
        { id: 'B', text: 'Bermain game online bersama teman-teman', score: 15 },
        { id: 'C', text: 'Menonton video pendek tanpa henti', score: 8 },
        { id: 'D', text: 'Melamun dan tidak melakukan apa-apa', score: 0 },
      ],
    },
  ],

  // ==========================================
  // TEENS (13-17 Tahun)
  // ==========================================
  teens: [
    // 1. Logical Thinking
    {
      id: 'tn-log-1',
      tier: 'teens',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 1,
      prompt: 'Diberikan premis:\n1. Jika hari hujan, maka jalanan basah.\n2. Jika jalanan basah, maka mobil melaju lebih lambat.\nFakta: Mobil melaju tidak lambat (mobil melaju cepat).\nKesimpulan logis (Modus Tollens) yang valid adalah...?',
      visualHint: 'P ➔ Q | Q ➔ R | ¬R ∴ ❓',
      options: [
        { id: 'A', text: 'Hari ini tidak hujan (¬P)', score: 20 },
        { id: 'B', text: 'Hari ini pasti hujan lebat', score: 0 },
        { id: 'C', text: 'Jalanan tetap basah kuyup', score: 0 },
        { id: 'D', text: 'Tidak ada hubungan sebab akibat', score: 5 },
      ],
    },
    {
      id: 'mid-tn-log-2',
      tier: 'teens',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 2,
      prompt: 'Evaluasi ekspresi logika boolean berikut:\n`(A AND NOT B) OR (B AND C)`\nJika diketahui A = True, B = False, dan C = True, apakah hasil akhirnya?',
      visualHint: 'A=T, B=F, C=T ➔ (T AND NOT F) OR (F AND T) = ❓',
      options: [
        { id: 'A', text: 'True (karena A AND NOT B bernilai True)', score: 20 },
        { id: 'B', text: 'False', score: 0 },
        { id: 'C', text: 'Null / Undefined', score: 0 },
        { id: 'D', text: 'Error Sintaksis', score: 0 },
      ],
    },
    {
      id: 'tn-log-3',
      tier: 'teens',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 3,
      prompt: 'Empat siswa (Ani, Budi, Citra, Doni) duduk berjajar di bioskop. Ani tidak ingin duduk di ujung. Citra harus duduk tepat di sebelah Budi. Doni duduk di kursi paling kiri (kursi 1). Siapa yang duduk di kursi paling kanan (kursi 4)?',
      visualHint: '💺 [1: Doni] [2: ?] [3: ?] [4: ?] (Ani bukan di ujung)',
      options: [
        { id: 'A', text: 'Citra atau Budi (karena Ani harus di tengah: kursi 2 atau 3)', score: 20 },
        { id: 'B', text: 'Ani', score: 0 },
        { id: 'C', text: 'Doni', score: 0 },
        { id: 'D', text: 'Tidak dapat ditentukan sama sekali', score: 5 },
      ],
    },
    {
      id: 'tn-log-4',
      tier: 'teens',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 4,
      prompt: 'Dalam arsitektur sistem: Sebuah database replikasi menjamin konsistensi jika minimal (N/2 + 1) node aktif (kuorum). Dari total 5 node server, berapa node yang boleh gagal/mati tanpa merusak sistem kuorum?',
      visualHint: 'Total N = 5. Kuorum = (5/2 + 1) = 3 node wajib aktif.',
      options: [
        { id: 'A', text: 'Maksimal 2 node boleh gagal (tersisa minimal 3)', score: 20 },
        { id: 'B', text: 'Maksimal 3 node boleh gagal', score: 5 },
        { id: 'C', text: 'Maksimal 1 node boleh gagal', score: 10 },
        { id: 'D', text: 'Tidak boleh ada node yang gagal sama sekali', score: 0 },
      ],
    },
    {
      id: 'tn-log-5',
      tier: 'teens',
      category: 'logical',
      sectionNumber: 1,
      questionNumber: 5,
      prompt: 'Sebuah program looping memiliki kondisi: `while (x > 0 && x < 10) { x = x + 2; }`. Jika nilai awal x = 3, berapa nilai akhir x saat perulangan selesai?',
      visualHint: 'x=3 ➔ 5 ➔ 7 ➔ 9 ➔ 11 (Kondisi x < 10 tidak terpenuhi lagi)',
      options: [
        { id: 'A', text: '11', score: 20 },
        { id: 'B', text: '9', score: 10 },
        { id: 'C', text: '10', score: 5 },
        { id: 'D', text: 'Tak terhingga (infinite loop)', score: 0 },
      ],
    },

    // 2. Numerical Thinking
    {
      id: 'tn-num-1',
      tier: 'teens',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 1,
      prompt: 'Sebuah algoritma pencarian biner (Binary Search) membelah data menjadi separuh di setiap langkah. Pada array berurutan berisi 128 elemen, berapa jumlah perbandingan MAKSIMAL untuk menemukan suatu angka?',
      visualHint: 'log2(128) = ❓ (128 ➔ 64 ➔ 32 ➔ 16 ➔ 8 ➔ 4 ➔ 2 ➔ 1)',
      options: [
        { id: 'A', text: '7 kali perbandingan (2^7 = 128)', score: 20 },
        { id: 'B', text: '128 kali perbandingan', score: 0 },
        { id: 'C', text: '64 kali perbandingan', score: 5 },
        { id: 'D', text: '14 kali perbandingan', score: 5 },
      ],
    },
    {
      id: 'tn-num-2',
      tier: 'teens',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 2,
      prompt: 'Konversi bilangan biner `1101` ke sistem desimal (basis 10) menghasilkan nilai berapa?',
      visualHint: '1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0) = 8 + 4 + 0 + 1',
      options: [
        { id: 'A', text: '13', score: 20 },
        { id: 'B', text: '11', score: 5 },
        { id: 'C', text: '15', score: 5 },
        { id: 'D', text: '7', score: 0 },
      ],
    },
    {
      id: 'tn-num-3',
      tier: 'teens',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 3,
      prompt: 'Sebuah server API mengenakan biaya $0.002 per request. Jika dalam 1 bulan aplikasi kamu mengirimkan 150.000 request, berapa total tagihan server tersebut?',
      visualHint: '150.000 x $0.002 = ❓',
      options: [
        { id: 'A', text: '$300', score: 20 },
        { id: 'B', text: '$30', score: 5 },
        { id: 'C', text: '$3.000', score: 5 },
        { id: 'D', text: '$150', score: 0 },
      ],
    },
    {
      id: 'tn-num-4',
      tier: 'teens',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 4,
      prompt: 'Sebuah algoritma memiliki kompleksitas waktu kuadratik O(n^2). Jika untuk n = 10 dibutuhkan waktu 100 milidetik, berapa estimasi waktu untuk n = 30?',
      visualHint: '(30/10)^2 = 3^2 = 9 kali lipat',
      options: [
        { id: 'A', text: '900 milidetik', score: 20 },
        { id: 'B', text: '300 milidetik', score: 5 },
        { id: 'C', text: '600 milidetik', score: 5 },
        { id: 'D', text: '10.000 milidetik', score: 0 },
      ],
    },
    {
      id: 'tn-num-5',
      tier: 'teens',
      category: 'numerical',
      sectionNumber: 2,
      questionNumber: 5,
      prompt: 'Peluang melempar dadu standar bersisi 6 dan menghasilkan angka prima (2, 3, 5) adalah...?',
      visualHint: 'Ada 3 angka prima dari total 6 sisi dadu (3/6)',
      options: [
        { id: 'A', text: '1/2 atau 50%', score: 20 },
        { id: 'B', text: '1/3 atau 33.3%', score: 5 },
        { id: 'C', text: '2/3 atau 66.7%', score: 5 },
        { id: 'D', text: '1/6 atau 16.6%', score: 0 },
      ],
    },

    // 3. Spatial Thinking
    {
      id: 'tn-spa-1',
      tier: 'teens',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 1,
      prompt: 'Sebuah jaring-jaring kubus dibentangkan menjadi bentuk salib (1 kotak atas, 1 kotak bawah, 4 kotak sejajar tengah). Jika sisi tengah kedua adalah sisi depan kubus, sisi manakah yang menjadi sisi belakang?',
      visualHint: 'Sisi berlawanan pada jaring-jaring berjarak lompat 1 kotak.',
      options: [
        { id: 'A', text: 'Kotak sejajar tengah urutan keempat (melompati kotak ketiga)', score: 20 },
        { id: 'B', text: 'Kotak paling atas', score: 5 },
        { id: 'C', text: 'Kotak ketiga di sebelahnya', score: 0 },
        { id: 'D', text: 'Kotak paling bawah', score: 5 },
      ],
    },
    {
      id: 'tn-spa-2',
      tier: 'teens',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 2,
      prompt: 'Dalam sistem koordinat 3D (X, Y, Z), sebuah titik berada di (3, 4, 5). Jika titik tersebut diproyeksikan secara ortogonal ke bidang XY (Z=0), di manakah posisinya?',
      visualHint: 'Proyeksi ke bidang XY menghilangkan koordinat Z.',
      options: [
        { id: 'A', text: '(3, 4, 0)', score: 20 },
        { id: 'B', text: '(0, 0, 5)', score: 5 },
        { id: 'C', text: '(3, 0, 5)', score: 0 },
        { id: 'D', text: '(0, 4, 5)', score: 0 },
      ],
    },
    {
      id: 'tn-spa-3',
      tier: 'teens',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 3,
      prompt: 'Dua roda gigi saling terhubung secara langsung. Roda Gigi A (20 gerigi) berputar searah jarum jam dengan kecepatan 60 rpm. Bagaimana perputaran Roda Gigi B (40 gerigi)?',
      visualHint: 'Roda bersentuhan ➔ Arah putaran berlawanan. Rasio gigi 20:40.',
      options: [
        { id: 'A', text: 'Berputar berlawanan arah jarum jam dengan kecepatan 30 rpm', score: 20 },
        { id: 'B', text: 'Berputar searah jarum jam dengan kecepatan 120 rpm', score: 0 },
        { id: 'C', text: 'Berputar berlawanan arah jarum jam dengan kecepatan 60 rpm', score: 5 },
        { id: 'D', text: 'Tidak berputar sama sekali', score: 0 },
      ],
    },
    {
      id: 'tn-spa-4',
      tier: 'teens',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 4,
      prompt: 'Sebuah lembaran kertas berbentuk bujursangkar dilipat diagonal menjadi segitiga, lalu dilipat lagi menjadi segitiga lebih kecil, dan satu lubang bundar dilubangi di tengahnya. Ketika dibuka kembali, ada berapa lubang di lembaran kertas tersebut?',
      visualHint: 'Dilipat 2 kali ➔ Kertas bertumpuk 4 lapisan.',
      options: [
        { id: 'A', text: '4 lubang simetris', score: 20 },
        { id: 'B', text: '2 lubang', score: 5 },
        { id: 'C', text: '1 lubang', score: 5 },
        { id: 'D', text: '8 lubang', score: 5 },
      ],
    },
    {
      id: 'tn-spa-5',
      tier: 'teens',
      category: 'spatial',
      sectionNumber: 3,
      questionNumber: 5,
      prompt: 'Vektor perpindahan dalam game: Karakter melangkah ke arah Timur 6 meter, lalu ke arah Utara 8 meter. Berapakah jarak garis lurus (euclidean distance) karakter dari titik mula-mula?',
      visualHint: 'Teorema Pythagoras: √(6^2 + 8^2) = √(36 + 64)',
      options: [
        { id: 'A', text: '10 meter', score: 20 },
        { id: 'B', text: '14 meter', score: 5 },
        { id: 'C', text: '12 meter', score: 5 },
        { id: 'D', text: '48 meter', score: 0 },
      ],
    },

    // 4. Pattern Recognition
    {
      id: 'tn-pat-1',
      tier: 'teens',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 1,
      prompt: 'Analisis deret rekursif berikut: 2, 5, 11, 23, 47, ... Aturan fungsi yang menghasilkan suku berikutnya (f(n+1)) dari suku sebelumnya (x) adalah?',
      visualHint: '2x2+1=5 | 5x2+1=11 | 11x2+1=23 | 23x2+1=47',
      options: [
        { id: 'A', text: '2x + 1 (Suku selanjutnya adalah 95)', score: 20 },
        { id: 'B', text: '3x - 1', score: 5 },
        { id: 'C', text: 'x^2 + 1', score: 0 },
        { id: 'D', text: '2x + 3', score: 5 },
      ],
    },
    {
      id: 'tn-pat-2',
      tier: 'teens',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 2,
      prompt: 'Dalam model Machine Learning untuk Computer Vision, lapisan Convolutional Neural Network (CNN) bekerja mengenali gambar dengan mendeteksi pola bertingkat. Urutan hierarki deteksi yang benar adalah...?',
      visualHint: 'Piksel mentah ➔ Pola rendah ➔ Pola tinggi',
      options: [
        { id: 'A', text: 'Tepi/Garis sederhana ➔ Tekstur/Bentuk ➔ Bagian objek ➔ Objek utuh', score: 20 },
        { id: 'B', text: 'Objek utuh langsung tanpa memeriksa tepi garis', score: 0 },
        { id: 'C', text: 'Warna latar belakang saja', score: 5 },
        { id: 'D', text: 'Format ekstensi file gambar (.jpg)', score: 0 },
      ],
    },
    {
      id: 'tn-pat-3',
      tier: 'teens',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 3,
      prompt: 'Perhatikan pola heksadesimal representasi warna web CSS: `#000000` (Hitam), `#FFFFFF` (Putih), `#FF0000` (Merah Murni), `#00FF00` (Hijau Murni). Kode warna apa yang merepresentasikan warna KUNING murni (campuran Merah + Hijau)?',
      visualHint: 'Format RGB: #RRGGBB. Campuran Merah Penuh (FF) + Hijau Penuh (FF) + Biru (00)',
      options: [
        { id: 'A', text: '#FFFF00', score: 20 },
        { id: 'B', text: '#00FFFF', score: 5 },
        { id: 'C', text: '#FF00FF', score: 5 },
        { id: 'D', text: '#FFAA00', score: 10 },
      ],
    },
    {
      id: 'tn-pat-4',
      tier: 'teens',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 4,
      prompt: 'Pola struktur data pohon (Binary Search Tree): Nilai anak kiri selalu lebih kecil dari induk, nilai anak kanan selalu lebih besar. Jika root = 15, manakah posisi yang valid untuk angka 18?',
      visualHint: '18 > 15 ➔ Posisi di sub-pohon mana?',
      options: [
        { id: 'A', text: 'Di sub-pohon sebelah KANAN dari root 15', score: 20 },
        { id: 'B', text: 'Di sub-pohon sebelah KIRI dari root 15', score: 0 },
        { id: 'C', text: 'Menggantikan posisi root 15 secara otomatis', score: 5 },
        { id: 'D', text: 'Di luar struktur pohon', score: 0 },
      ],
    },
    {
      id: 'tn-pat-5',
      tier: 'teens',
      category: 'pattern',
      sectionNumber: 4,
      questionNumber: 5,
      prompt: 'Analisis log traffic server web: Setiap 10 menit terjadi spike request sebanyak 5.000 hit yang berasal dari IP address yang sama persis dan mengeksekusi endpoint `/login`. Pola ini mengindikasikan adanya...?',
      visualHint: 'Pola anomali periodik pada endpoint autentikasi',
      options: [
        { id: 'A', text: 'Pola serangan otomatis (brute force bot / credential stuffing)', score: 20 },
        { id: 'B', text: 'Pengguna normal yang lupa password secara kebetulan', score: 5 },
        { id: 'C', text: 'Koneksi internet lambat di sisi klien', score: 0 },
        { id: 'D', text: 'Fitur optimasi kecepatan server', score: 0 },
      ],
    },

    // 5. Creativity
    {
      id: 'tn-cre-1',
      tier: 'teens',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 1,
      prompt: 'Kamu sedang mengembangkan aplikasi mobile untuk membantu siswa mengelola stres belajar. Fitur orisinal dan inovatif apa yang paling bernilai menurutmu?',
      visualHint: '📱 🧠 🧘 ✨',
      options: [
        { id: 'A', text: 'Kombinasi smart timer pomodoro yang memutar audio binaural beat adaptif dan mini-game refleksi jurnal visual harian', score: 20 },
        { id: 'B', text: 'Hanya alarm jam beker biasa tanpa visualisasi atau personalisasi', score: 5 },
        { id: 'C', text: 'Kalkulator perkalian', score: 0 },
        { id: 'D', text: 'Aplikasi yang hanya memuat kumpulan artikel teks panjang membosankan', score: 8 },
      ],
    },
    {
      id: 'tn-cre-2',
      tier: 'teens',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 2,
      prompt: 'Dalam hackathon pembuatan solusi berbasis AI, tim kamu diberi dataset tingkat polusi udara di kota. Bagaimana kamu menyajikannya agar masyarakat tergerak bertindak?',
      visualHint: '📊 🏙️ 🌿 💡',
      options: [
        { id: 'A', text: 'Membuat peta navigasi rute jalan sehat real-time yang memandu pejalan kaki menghindari titik polusi tinggi dan memberi gamifikasi poin tanaman', score: 20 },
        { id: 'B', text: 'Menampilkan tabel angka mentah format Excel yang sulit dibaca', score: 5 },
        { id: 'C', text: 'Membuat akun media sosial tanpa membuat aplikasi apa pun', score: 8 },
        { id: 'D', text: 'Menolak data tersebut karena rumit', score: 0 },
      ],
    },
    {
      id: 'tn-cre-3',
      tier: 'teens',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 3,
      prompt: 'Kamu memiliki ide startup teknologi yang belum pernah ada di pasaran. Langkah pertama yang kamu tempuh untuk memvalidasi ide tersebut adalah...?',
      visualHint: '🚀 💡 🧪',
      options: [
        { id: 'A', text: 'Membangun MVP (Minimum Viable Product) sederhana atau prototype interaktif lalu mewawancarai target pengguna nyata', score: 20 },
        { id: 'B', text: 'Menyimpan idenya rapat-rapat selamanya karena takut ditiru orang', score: 5 },
        { id: 'C', text: 'Meminjam modal miliaran rupiah sebelum tahu apakah ada orang yang mau memakainya', score: 0 },
        { id: 'D', text: 'Menunggu orang lain membuat produk serupa terlebih dahulu', score: 0 },
      ],
    },
    {
      id: 'tn-cre-4',
      tier: 'teens',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 4,
      prompt: 'Ketika sebuah fitur game yang kamu rancang terasa membosankan saat dimainkan (playtesting), bagaimana caramu mencari sudut pandang baru?',
      visualHint: '🎮 🔄 💡',
      options: [
        { id: 'A', text: 'Mengubah mekanik intinya dengan aturan terbalik (misal: bukan menghindari rintangan, tapi memanfaatkan rintangan sebagai pelontar skor)', score: 20 },
        { id: 'B', text: 'Memaksa pemain untuk tetap menyukainya apa adanya', score: 0 },
        { id: 'C', text: 'Menghapus seluruh proyek game dan berhenti membuat karya', score: 0 },
        { id: 'D', text: 'Hanya mengganti musik latarnya tanpa memperbaiki gameplay', score: 8 },
      ],
    },
    {
      id: 'tn-cre-5',
      tier: 'teens',
      category: 'creativity',
      sectionNumber: 5,
      questionNumber: 5,
      prompt: 'Bagaimana caramu menggabungkan minat senimu (seperti musik/desain visual) dengan kemampuan coding yang kamu miliki?',
      visualHint: '🎨 + 💻 = ✨',
      options: [
        { id: 'A', text: 'Menciptakan generative visual art berbasis algoritma shader/p5.js atau audio synthesizer interaktif berbasis web', score: 20 },
        { id: 'B', text: 'Memisahkan keduanya secara kaku dan tidak pernah menghubungkannya', score: 8 },
        { id: 'C', text: 'Menganggap coding hanya untuk angka tanpa ada unsur seni estetika', score: 0 },
        { id: 'D', text: 'Meninggalkan salah satunya sama sekali', score: 5 },
      ],
    },

    // 6. Problem Solving
    {
      id: 'tn-ps-1',
      tier: 'teens',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 1,
      prompt: 'Website yang kamu deploy mendadak lambat dibuka saat jumlah pengunjung mencapai 1.000 orang bersamaan. Hipotesis pertama yang paling masuk akal untuk diinvestigasi adalah...?',
      visualHint: '🌐 ⏱️ 📈 Server Bottleneck Analysis',
      options: [
        { id: 'A', text: 'Melakukan profiling kinerja: memeriksa query database yang lambat (kurang indeks), beban CPU/RAM server, atau caching data statis', score: 20 },
        { id: 'B', text: 'Langsung mengganti seluruh bahasa pemrograman dari awal', score: 0 },
        { id: 'C', text: 'Menyalahkan browser para pengunjung', score: 0 },
        { id: 'D', text: 'Menghapus setengah gambar di website secara acak', score: 5 },
      ],
    },
    {
      id: 'tn-ps-2',
      tier: 'teens',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 2,
      prompt: 'Penerapan konsep "Git Version Control": Kamu secara tidak sengaja membuat bug fatal di commit terbaru dan ingin kembali ke versi kode yang berjalan stabil kemarin. Perintah atau aksi yang tepat adalah...?',
      visualHint: '🐙 Git: Rollback to previous stable state',
      options: [
        { id: 'A', text: 'Melakukan `git revert` atau `git checkout/restore` ke commit stabil sebelumnya untuk mengisolasi perubahan', score: 20 },
        { id: 'B', text: 'Menghapus folder repository lokal dan komputer di-format', score: 0 },
        { id: 'C', text: 'Mencoba mengingat setiap huruf yang diedit kemarin secara manual', score: 5 },
        { id: 'D', text: 'Mengirimkan versi rusak tersebut ke pengguna tanpa peduli', score: 0 },
      ],
    },
    {
      id: 'tn-ps-3',
      tier: 'teens',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 3,
      prompt: 'Masalah Optimasi Knapsack (Ransel): Ranselmu mampu menampung beban maksimal 10 kg. Ada 4 barang: A (7kg, $70), B (5kg, $60), C (5kg, $50), D (2kg, $25). Kombinasi barang manakah yang memberikan total nilai tertinggi tanpa melebihi kapasitas?',
      visualHint: 'Kapasitas <= 10 kg. Cari nilai ($) maksimal.',
      options: [
        { id: 'A', text: 'Barang B (5kg) + Barang C (5kg) = 10kg, bernilai $110', score: 20 },
        { id: 'B', text: 'Barang A (7kg) + Barang D (2kg) = 9kg, bernilai $95', score: 10 },
        { id: 'C', text: 'Barang A (7kg) saja = 7kg, bernilai $70', score: 5 },
        { id: 'D', text: 'Barang B (5kg) + Barang D (2kg) = 7kg, bernilai $85', score: 8 },
      ],
    },
    {
      id: 'tn-ps-4',
      tier: 'teens',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 4,
      prompt: 'Dalam arsitektur cybersecurity, kamu diminta mengamankan sistem autentikasi dari serangan SQL Injection. Pendekatan pencegahan paling efektif adalah...?',
      visualHint: '🛡️ SQL Injection Prevention Standard',
      options: [
        { id: 'A', text: 'Menggunakan Prepared Statements (Parameterized Queries) dan validasi input yang ketat', score: 20 },
        { id: 'B', text: 'Menyimpan password pengguna dalam bentuk teks polos (plain text)', score: 0 },
        { id: 'C', text: 'Hanya menyembunyikan form login dari menu navigasi', score: 0 },
        { id: 'D', text: 'Mengandalkan captcha saja tanpa memperbaiki query database', score: 5 },
      ],
    },
    {
      id: 'tn-ps-5',
      tier: 'teens',
      category: 'problem_solving',
      sectionNumber: 6,
      questionNumber: 5,
      prompt: 'Sebuah fungsi rekursif mengalami error "Maximum call stack size exceeded" (Stack Overflow). Apa penyebab paling umum dari masalah ini?',
      visualHint: '🔁 Function call stack keeps growing infinitely',
      options: [
        { id: 'A', text: 'Fungsi rekursif tidak memiliki kondisi batas berhenti (base case) atau parameternya tidak pernah menuju kondisi batas', score: 20 },
        { id: 'B', text: 'Komputer kehabisan memori harddisk fisik', score: 0 },
        { id: 'C', text: 'Variabel string terlalu pendek', score: 0 },
        { id: 'D', text: 'Monitor komputer tidak mendukung resolusi tinggi', score: 0 },
      ],
    },

    // 7. Language & Communication
    {
      id: 'tn-lan-1',
      tier: 'teens',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 1,
      prompt: 'Dokumentasi API menuliskan status response `404 Not Found` dan `401 Unauthorized`. Jika aplikasi klien gagal mengakses profil user karena belum menyertakan token autentikasi, status manakah yang tepat diharapkan?',
      visualHint: 'HTTP Status Code Conventions: 401 vs 404',
      options: [
        { id: 'A', text: '401 Unauthorized (klien belum terautentikasi secara sah)', score: 20 },
        { id: 'B', text: '404 Not Found (endpoint hilang)', score: 5 },
        { id: 'C', text: '200 OK (berhasil)', score: 0 },
        { id: 'D', text: '500 Internal Server Error', score: 5 },
      ],
    },
    {
      id: 'tn-lan-2',
      tier: 'teens',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 2,
      prompt: 'Saat menulis dokumentasi teknis (README.md) untuk repositori GitHub proyek pribadimu, susunan informasi yang paling profesional adalah...?',
      visualHint: '📄 Standar Repositori Open Source / Portofolio Coder',
      options: [
        { id: 'A', text: 'Judul & deskripsi ringkas ➔ Preview visual/demo ➔ Fitur utama ➔ Panduan instalasi/setup ➔ Panduan berkontribusi & lisensi', score: 20 },
        { id: 'B', text: 'Hanya mencantumkan satu baris: "Proyek coding saya"', score: 0 },
        { id: 'C', text: 'Menempelkan seluruh source code mentah ke dalam README', score: 5 },
        { id: 'D', text: 'Membiarkan README kosong', score: 0 },
      ],
    },
    {
      id: 'tn-lan-3',
      tier: 'teens',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 3,
      prompt: 'Ketika melakukan Code Review terhadap pull request teman satu tim, gaya penyampaian kritik mana yang paling konstruktif?',
      visualHint: '🤝 Constructive Code Review Culture',
      options: [
        { id: 'A', text: '"Keren implementasinya! Ada sedikit saran di baris 42: bagaimana jika memakai map() agar lebih ringkas dan mudah dibaca? Menurutmu bagaimana?"', score: 20 },
        { id: 'B', text: '"Kodinganmu berantakan dan jelek sekali, tolong ganti semuanya."', score: 0 },
        { id: 'C', text: 'Mengabaikan pull request tanpa memberikan tanggapan apa pun', score: 0 },
        { id: 'D', text: 'Langsung approve tanpa memeriksa kodenya sama sekali', score: 5 },
      ],
    },
    {
      id: 'tn-lan-4',
      tier: 'teens',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 4,
      prompt: 'Klien non-teknis bertanya: "Apa bedanya Frontend dan Backend?" Penjelasan sederhana dan akurat mana yang paling tepat diberikan kepada mereka?',
      visualHint: '💡 Komunikasi Teknis ke Khalayak Awam',
      options: [
        { id: 'A', text: '"Frontend adalah bagian tampilan luar restoran (meja, buku menu indah yang dilihat pelanggan), sedangkan Backend adalah dapur di belakang (koki, resep, dan gudang bahan yang mengolah pesanan)."', score: 20 },
        { id: 'B', text: '"Frontend itu HTML CSS Javascript, Backend itu Node.js PostgreSQL Docker Kubernetes." (Terlalu teknis membingungkan)', score: 10 },
        { id: 'C', text: '"Keduanya sama saja tidak ada bedanya sama sekali."', score: 0 },
        { id: 'D', text: '"Anda tidak perlu tahu karena Anda bukan programmer."', score: 0 },
      ],
    },
    {
      id: 'tn-lan-5',
      tier: 'teens',
      category: 'language',
      sectionNumber: 7,
      questionNumber: 5,
      prompt: 'Sebuah fungsi diberi nama: `calculate_monthly_compound_interest_rate()`. Mengapa penamaan variabel/fungsi yang deskriptif dan jelas sangat penting dalam rekayasa software?',
      visualHint: 'Clean Code & Self-Documenting Code Principle',
      options: [
        { id: 'A', text: 'Memudahkan pemeliharaan kode (maintainability), membuat kode mudah dibaca tim tanpa harus menebak maksud singkatan yang samar', score: 20 },
        { id: 'B', text: 'Agar ukuran file program menjadi semakin berat', score: 0 },
        { id: 'C', text: 'Hanya agar terlihat pintar di hadapan guru', score: 0 },
        { id: 'D', text: 'Tidak ada manfaatnya, lebih baik memakai nama singkatan 1 huruf seperti x()', score: 0 },
      ],
    },

    // 8. Persistence & Learning Behaviour
    {
      id: 'tn-per-1',
      tier: 'teens',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 1,
      prompt: 'Kamu mencoba menginstal framework AI / library baru, tetapi muncul puluhan pesan kegagalan dependency yang rumit di terminal. Sikapmu?',
      visualHint: '💻 ⚙️ NPM/Pip Dependency Conflict',
      options: [
        { id: 'A', text: 'Menganalisis konflik versi satu per satu, membaca dokumentasi resmi instalasi, dan mencari log solusi di GitHub Issues atau StackOverflow', score: 20 },
        { id: 'B', text: 'Langsung menyerah dan memutuskan tidak akan pernah memakai AI lagi', score: 0 },
        { id: 'C', text: 'Memukul keyboard dan menyalahkan operating system', score: 0 },
        { id: 'D', text: 'Membiarkan error tersebut berlarut-larut tanpa mencari tahu', score: 5 },
      ],
    },
    {
      id: 'tn-per-2',
      tier: 'teens',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 2,
      prompt: 'Di era teknologi yang bergerak sangat cepat dengan hadirnya AI tools baru setiap bulan, bagaimana cara kamu menjaga relevansi skill-mu?',
      visualHint: '🚀 Continuous Lifelong Learning',
      options: [
        { id: 'A', text: 'Memiliki mindset pembelajar sepanjang hayat: rutin bereksperimen dengan teknologi baru sambil tetap memperkuat fundamental logika dan algoritma dasar', score: 20 },
        { id: 'B', text: 'Menolak semua teknologi baru dan hanya memakai apa yang dipelajari 5 tahun lalu', score: 0 },
        { id: 'C', text: 'Khawatir berlebihan bahwa AI akan menggantikan segalanya tanpa mau beradaptasi', score: 5 },
        { id: 'D', text: 'Mengikuti tren secara membabi buta tanpa memahami konsep intinya', score: 10 },
      ],
    },
    {
      id: 'tn-per-3',
      tier: 'teens',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 3,
      prompt: 'Ketika kamu mengerjakan proyek portofolio pribadi jangka panjang (misal aplikasi full-stack 1 bulan), apa yang membantumu konsisten menyelesaikannya?',
      visualHint: '🎯 Project Milestone & Self-Discipline',
      options: [
        { id: 'A', text: 'Memecah proyek ke dalam target mingguan/harian (sprint kecil), merayakan progres bertahap, dan komitmen waktu rutin setiap hari', score: 20 },
        { id: 'B', text: 'Mengandalkan *mood* sesaat; kalau sedang malas maka proyek ditinggalkan selamanya', score: 5 },
        { id: 'C', text: 'Begadang 3 hari berturut-turut tanpa tidur lalu jatuh sakit', score: 5 },
        { id: 'D', text: 'Membiarkan proyek menumpuk menjadi ide setengah jadi yang tak pernah selesai', score: 0 },
      ],
    },
    {
      id: 'tn-per-4',
      tier: 'teens',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 4,
      prompt: 'Jika karyamu dalam sebuah kompetisi coding nasional tidak berhasil meraih juara, bagaimana kamu merefleksikannya?',
      visualHint: '🏆 ➔ 🌱 Growth Mindset vs Fixed Mindset',
      options: [
        { id: 'A', text: 'Menjadikannya bahan evaluasi berharga: meminta feedback juri, mempelajari karya para juara, dan mempersiapkan proyek yang lebih matang untuk ajang berikutnya', score: 20 },
        { id: 'B', text: 'Merasa diri tidak berbakat di dunia komputer lalu berhenti coding', score: 0 },
        { id: 'C', text: 'Menuduh juri tidak adil tanpa memeriksa kualitas proyek sendiri', score: 0 },
        { id: 'D', text: 'Menghapus karya dan melupakannya begitu saja', score: 5 },
      ],
    },
    {
      id: 'tn-per-5',
      tier: 'teens',
      category: 'persistence',
      sectionNumber: 8,
      questionNumber: 5,
      prompt: 'Apa motivasi terbesarmu dalam mempelajari dunia pemrograman dan teknologi digital?',
      visualHint: '🌟 Personal Purpose & Impact',
      options: [
        { id: 'A', text: 'Mampu menciptakan solusi nyata yang bermanfaat bagi banyak orang dan mengekspresikan inovasi kreatif melalui teknologi masa depan', score: 20 },
        { id: 'B', text: 'Hanya karena disuruh orang tua tanpa ada ketertarikan pribadi', score: 8 },
        { id: 'C', text: 'Hanya ingin pamer di media sosial', score: 5 },
        { id: 'D', text: 'Belum tahu tujuannya sama sekali', score: 5 },
      ],
    },
  ],
};

// Logika Perhitungan Hasil
export function calculateAssessmentResult(
  profile: UserProfile,
  answers: Record<string, string> // questionId -> optionId
): AssessmentResult {
  const tierQuestions = QUESTION_BANK[profile.tier];

  // Inisialisasi total skor per kategori (maksimal 5 soal x 20 poin = 100 poin)
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

  tierQuestions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        categoryScores[q.category] += option.score;
      }
    }
  });

  // Pastikan batas max 100
  CATEGORY_ORDER.forEach((cat) => {
    if (categoryScores[cat] > 100) categoryScores[cat] = 100;
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
  const { profile, scores, totalScore, topStrengths, growthAreas, recommendedProgram } = result;

  const strengthsText = topStrengths
    .map((s) => `• *${CATEGORIES[s].name}* (${scores[s]}/100)`)
    .join('\n');

  const growthText = growthAreas
    .map((g) => `• *${CATEGORIES[g].name}* (${scores[g]}/100)`)
    .join('\n');

  const text = `Halo Beekoding Lab! 🐝
Saya ingin berkonsultasi mengenai hasil *Talent & Aptitude Assessment* ananda:

👤 *Data Ananda:*
• Nama: *${profile.childName}*
• Usia: *${profile.childAge} Tahun* (${getTierLabel(profile.tier)})
• Kelas/Jenjang: *${profile.gradeLevel || '-'}*
• Nama Orang Tua: *${profile.parentName || '-'}*

📊 *Ringkasan Hasil Evaluasi 8 Pilar:*
• Rata-rata Skor: *${totalScore}/100*
${strengthsText}

🌱 *Area yang Ingin Ditumbuhkan:*
${growthText}

🎯 *Rekomendasi Program Beekoding:*
*${recommendedProgram.title}*
_${recommendedProgram.whyFit}_

Mohon informasi jadwal kelas atau sesi konsultasi lanjutan untuk ananda. Terima kasih! 🙏`;

  return encodeURIComponent(text);
}
