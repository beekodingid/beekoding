export type ArcadeGameType = 'canvas-bee' | 'canvas-space' | 'scratch-embed';

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
    instructions: 'Gunakan tombol Panah Kiri/Kanan atau A/D (atau sentuh layar di HP) untuk mengarahkan Beeby.',
    tags: ['Scratch 3.0', 'Arcade 2D', 'Logika Gerak', 'Collision Detection'],
    thumbnail: '🐝',
    accentColor: '#f59e0b',
    gradientBg: 'from-amber-500 to-yellow-600',
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
    instructions: 'Panah Kiri/Kanan untuk bergerak, Spasi (atau tombol tembak di HP) untuk meluncurkan laser.',
    tags: ['Scratch 3.0', 'Space Shooter', 'Variables & Score', 'Broadcasting'],
    thumbnail: '🚀',
    accentColor: '#8b5cf6',
    gradientBg: 'from-purple-600 to-indigo-700',
  },
];
