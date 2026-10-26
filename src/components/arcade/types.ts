export type ArcadeGameType =
  | 'canvas-bee'
  | 'canvas-space'
  | 'canvas-obby'
  | 'interactive-maze'
  | 'scratch-embed';

export interface ArcadeGame {
  id: string;
  title: string;
  subtitle: string;
  studentName: string;
  studentAge: number;
  gradeLevel: string;
  platform: 'scratch' | 'roblox' | 'web' | 'python';
  gameType: ArcadeGameType;
  scratchProjectId?: string;
  description: string;
  instructions: string;
  tags: string[];
  thumbnail: string;
  accentColor: string;
  gradientBg: string;
}

export const ARCADE_GAMES_LIST: ArcadeGame[] = [
  {
    id: 'bee-honey-catch',
    title: 'Bee Honey Adventure Quest',
    subtitle: 'Koleksi Madu & Hindari Badai',
    studentName: 'Kenzo Alvaro Pratama',
    studentAge: 8,
    gradeLevel: 'Kelas 3 SD (Level Junior Explorer)',
    platform: 'scratch',
    gameType: 'canvas-bee',
    description:
      'Bantu Maskot Beeby terbang mengumpulkan tetesan madu emas dan bunga nektar sambil menghindari petir dan lebah pengganggu!',
    instructions:
      'Gunakan tombol Panah Kiri/Kanan atau A/D (atau sentuh layar di HP) untuk mengarahkan Beeby.',
    tags: ['Scratch 3.0', 'Arcade 2D', 'Logika Gerak', 'Collision Detection'],
    thumbnail: '🐝',
    accentColor: '#f59e0b',
    gradientBg: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'roblox-obby-runner',
    title: 'Roblox Obby Lava Runner',
    subtitle: 'Parkour Double-Jump & Hindari Lava!',
    studentName: 'Raffasya Danendra',
    studentAge: 11,
    gradeLevel: 'Kelas 5 SD (Level Intermediate Roblox Lua)',
    platform: 'roblox',
    gameType: 'canvas-obby',
    description:
      'Lari melewati rintangan balok lava merah dan laser neon di dunia Obby! Kumpulkan koin R$ dan capai bendera Checkpoint untuk naik Stage!',
    instructions:
      'Tekan Spasi / Panah Atas / W atau Tap layar (bisa 2x beruntun untuk Double Jump di udara!) agar tidak jatuh ke lava.',
    tags: ['Roblox Studio Lua', 'Obby Parkour', 'Physics & Gravity', 'Double Jump'],
    thumbnail: '🧱',
    accentColor: '#f43f5e',
    gradientBg: 'from-rose-500 to-amber-500',
  },
  {
    id: 'maze-logika-algoritma',
    title: 'Maze Logika Algoritma Beeby',
    subtitle: 'Susun Blok Kode & Teleportasi 5 Level',
    studentName: 'Alisha Zahra Kirana',
    studentAge: 10,
    gradeLevel: 'Kelas 4 SD (Level Computational Thinking & Python)',
    platform: 'python',
    gameType: 'interactive-maze',
    description:
      ' Rasakan serunya jadi Programmer sejati! Susun barisan blok instruksi arah dan perulangan (Loop 2x), lalu tekan RUN untuk memandu Beeby menembus labirin dan portal kuantum!',
    instructions:
      'Klik tombol arah (Atas, Bawah, Kiri, Kanan, atau Ulangi 2x) untuk menyusun algoritma, lalu klik tombol hijau JALANKAN KODE (RUN).',
    tags: ['Algoritma & Sequence', 'Looping 2x', 'Debugging', 'Python Logic'],
    thumbnail: '🧩',
    accentColor: '#10b981',
    gradientBg: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'space-crystal-defender',
    title: 'Space Galaxy Defender',
    subtitle: 'Pertempuran Antariksa Klasik',
    studentName: 'Nathania Putri Kusuma',
    studentAge: 9,
    gradeLevel: 'Kelas 4 SD (Level Junior Explorer)',
    platform: 'scratch',
    gameType: 'canvas-space',
    description:
      'Kendalikan pesawat luar angkasa, tembak asteroid dan meteor kristal sebelum menabrak stasiun luar angkasa!',
    instructions:
      'Panah Kiri/Kanan untuk bergerak, Spasi (atau tombol tembak di HP) untuk meluncurkan laser.',
    tags: ['Scratch 3.0', 'Space Shooter', 'Variables & Score', 'Broadcasting'],
    thumbnail: '🚀',
    accentColor: '#8b5cf6',
    gradientBg: 'from-purple-600 to-indigo-700',
  },
];
