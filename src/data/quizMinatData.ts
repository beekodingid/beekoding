export type DigitalArchetypeKey =
  | 'game_creator'
  | 'logic_sleuth'
  | 'web_designer'
  | 'ai_builder';

export interface DigitalArchetype {
  key: DigitalArchetypeKey;
  title: string;
  badge: string;
  icon: string;
  tagline: string;
  description: string;
  superpowers: string[];
  recommendedModules: {
    name: string;
    description: string;
    tier: 'SD' | 'SMP/SMA';
  }[];
  futureCareers: string[];
  colorGradient: string;
  accentBg: string;
}

export const ARCHETYPES: Record<DigitalArchetypeKey, DigitalArchetype> = {
  game_creator: {
    key: 'game_creator',
    title: 'The Game Creator',
    badge: 'Arsitek Game & Dunia Virtual',
    icon: '🎮',
    tagline: 'Imajinasi Tanpa Batas & Kreator Pengalaman Interaktif',
    description:
      'Ananda memiliki daya imajinasi visual yang luar biasa! Bukan sekadar suka bermain game, ia sangat penasaran bagaimana aturan main, animasi karakter, dan dunia digital diciptakan. Gaya belajarnya sangat aktif dan paling bersemangat saat karyanya bisa dimainkan langsung oleh teman dan keluarga.',
    superpowers: [
      'Visual-Spatial & World Building (Imajinasi tata letak ruang & karakter)',
      'Storytelling & Narrative Design (Menyusun alur tantangan & level game)',
      'Iterative Prototyping (Mencoba berkali-kali tanpa takut gagal)',
    ],
    recommendedModules: [
      {
        name: 'Visual Scratch 3.0 & Animation',
        description: 'Menciptakan game arcade 2D, labirin madu, dan sistem skor interaktif.',
        tier: 'SD',
      },
      {
        name: 'Roblox Studio & Lua Basics',
        description: 'Membangun game 3D multiplayer di platform Roblox dengan kode nyata.',
        tier: 'SMP/SMA',
      },
    ],
    futureCareers: ['Game Developer', 'Virtual Reality Designer', 'Creative Tech Director'],
    colorGradient: 'from-amber-400 via-orange-500 to-rose-500',
    accentBg: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
  },
  logic_sleuth: {
    key: 'logic_sleuth',
    title: 'The Logic & Data Sleuth',
    badge: 'Detektif Logika & Pemecah Teka-Teki',
    icon: '🧠',
    tagline: 'Pemikir Runtut, Analitis, & Master Algoritma',
    description:
      'Ananda memiliki bakat komputasi alami! Ia menyukai teka-teki, catur, matematika terapan, dan mencari tahu alasan logis di balik suatu masalah. Otaknya bekerja sangat sistematis dan merasa sangat puas saat berhasil menemukan solusi paling efisien.',
    superpowers: [
      'Algorithmic Thinking (Memecah masalah rumit menjadi langkah kecil teratur)',
      'Pattern Recognition (Cepat menemukan pola tersembunyi & sebab-akibat)',
      'Critical Problem Solving (Fokus tinggi dan teliti pada detail logika)',
    ],
    recommendedModules: [
      {
        name: 'Blockly Logic & Computational Puzzles',
        description: 'Melatih dasar algoritma percabangan dan perulangan secara visual.',
        tier: 'SD',
      },
      {
        name: 'Python 3 Foundation & Olimpiade Informatika (OSN)',
        description: 'Bahasa pemrograman teks standar industri untuk problem solving & kompetisi.',
        tier: 'SMP/SMA',
      },
    ],
    futureCareers: ['Data Scientist', 'Cyber Security Specialist', 'Software Engineer'],
    colorGradient: 'from-blue-500 via-indigo-500 to-purple-600',
    accentBg: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
  },
  web_designer: {
    key: 'web_designer',
    title: 'The Web & UI Designer',
    badge: 'Kreator Visual & Web Interaktif',
    icon: '🎨',
    tagline: 'Perpaduan Estetika Seni & Teknologi Aplikasi Modern',
    description:
      'Ananda memiliki sensitivitas visual dan rasa estetika yang tinggi! Ia peduli pada tampilan yang rapi, warna yang serasi, dan kenyamanan pengguna saat memakai aplikasi. Bakat ini sangat langka karena menggabungkan seni desain grafis dengan kemampuan teknis koding.',
    superpowers: [
      'Design Thinking & UI/UX Sense (Peka terhadap keindahan & kenyamanan pengguna)',
      'Human-Centered Creativity (Membuat karya yang ingin dinikmati orang lain)',
      'Frontend Architecture (Menata komponen visual, tombol, & animasi interaktif)',
    ],
    recommendedModules: [
      {
        name: 'Creative Web Canvas & HTML/CSS Visual',
        description: 'Membuat kartu ucapan web bersuara dan animasi antarmuka interaktif.',
        tier: 'SD',
      },
      {
        name: 'Modern Web Development (React & Tailwind CSS)',
        description: 'Membangun website portofolio profesional dan aplikasi web responsif.',
        tier: 'SMP/SMA',
      },
    ],
    futureCareers: ['Frontend Engineer', 'UI/UX Product Designer', 'Creative Web Art Director'],
    colorGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    accentBg: 'bg-teal-500/10 border-teal-500/30 text-teal-500',
  },
  ai_builder: {
    key: 'ai_builder',
    title: 'The Future AI Builder',
    badge: 'Inovator Kecerdasan Buatan',
    icon: '🤖',
    tagline: 'Eksplorator Masa Depan & Master Otomasi Cerdas',
    description:
      'Ananda adalah pionir masa depan! Ia sangat tertarik dengan bagaimana robot, kecerdasan buatan (AI), filter wajah, dan teknologi pintar bekerja. Rasa ingin tahunya luar biasa terhadap hal-hal baru dan siap menjadi pemimpin di era revolusi AI.',
    superpowers: [
      'AI Literacy & Curiosity (Cepat memahami konsep kecerdasan buatan)',
      'Prompt Engineering Thinking (Mahir memberikan instruksi terarah ke sistem cerdas)',
      'Computer Vision & Machine Learning Sense (Tertarik mengajarkan komputer mengenali dunia)',
    ],
    recommendedModules: [
      {
        name: 'AI Kids Explorer & Teachable Machine',
        description: 'Melatih model AI pengenal gambar kamera webcam dan ekspresi wajah.',
        tier: 'SD',
      },
      {
        name: 'Python for AI & Generative AI Bot',
        description: 'Membangun chatbot cerdas, analisis sentimen, dan integrasi API AI modern.',
        tier: 'SMP/SMA',
      },
    ],
    futureCareers: ['AI / Machine Learning Engineer', 'Prompt Engineer', 'Robotics Innovator'],
    colorGradient: 'from-purple-500 via-pink-500 to-amber-400',
    accentBg: 'bg-purple-500/10 border-purple-500/30 text-purple-500',
  },
};

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    subtext: string;
    icon: string;
    target: DigitalArchetypeKey;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Aktivitas apa yang paling membuat ananda betah saat memakai gadget atau komputer?',
    subtitle: 'Pilih kebiasaan yang paling sering ditunjukkan oleh ananda di rumah.',
    options: [
      {
        text: 'Bermain game dunia terbuka (Roblox / Minecraft) atau mendesain karakter',
        subtext: 'Suka berpetualang di dunia virtual & membuat aturan game sendiri',
        icon: '🎮',
        target: 'game_creator',
      },
      {
        text: 'Memecahkan teka-teki, game puzzle, tebak-tebakan, atau nonton video eksperimen',
        subtext: 'Penasaran dengan cara kerja sesuatu dan menyukai tantangan berpikir',
        icon: '🧩',
        target: 'logic_sleuth',
      },
      {
        text: 'Menggambar digital, mengedit foto/video, atau melihat tampilan website keren',
        subtext: 'Peka terhadap keindahan visual, warna, dan susunan gambar',
        icon: '🎨',
        target: 'web_designer',
      },
      {
        text: 'Bicara dengan Google Assistant / Siri, coba filter AI, atau tanya soal robot',
        subtext: 'Sangat takjub dengan teknologi pintar masa depan dan kecerdasan buatan',
        icon: '🤖',
        target: 'ai_builder',
      },
    ],
  },
  {
    id: 2,
    question: 'Di sekolah atau saat belajar mandiri, pelajaran apa yang paling memicu antusiasme ananda?',
    subtitle: 'Bidang pelajaran yang membuat ananda paling bersemangat dan cepat paham.',
    options: [
      {
        text: 'Seni budaya, mendongeng cerita imajinatif, atau prakarya kreasi',
        subtext: 'Suka kebebasan bereksplorasi ide cerita tanpa rumus kaku',
        icon: '🎭',
        target: 'game_creator',
      },
      {
        text: 'Matematika, berhitung cepat, pola logika, atau eksperimen IPA',
        subtext: 'Menyukai kepastian angka dan langkah berpikir sistematis',
        icon: '📐',
        target: 'logic_sleuth',
      },
      {
        text: 'Menggambar, desain presentasi slide tugas sekolah yang rapi dan menarik',
        subtext: 'Ingin hasil tugasnya terlihat keren dan disukai teman sekelas',
        icon: '✨',
        target: 'web_designer',
      },
      {
        text: 'TIK / Komputer, sains modern, bahasa Inggris, atau inovasi teknologi',
        subtext: 'Cepat beradaptasi dengan aplikasi digital baru yang belum pernah diajarkan',
        icon: '💡',
        target: 'ai_builder',
      },
    ],
  },
  {
    id: 3,
    question: 'Saat dihadapkan pada suatu masalah atau tantangan baru, bagaimana reaksi ananda?',
    subtitle: 'Melihat gaya pendekatan alami anak dalam memecahkan rintangan.',
    options: [
      {
        text: 'Mencoba berbagai cara unik tanpa ragu dan mengulang lagi jika gagal',
        subtext: 'Mental petualang yang melihat kegagalan sebagai bagian dari keseruan',
        icon: '🔄',
        target: 'game_creator',
      },
      {
        text: 'Berpikir tenang, menganalisis sebab-akibat, dan mencari cara paling teratur',
        subtext: 'Meneliti detail terlebih dahulu sebelum mengambil tindakan',
        icon: '🔍',
        target: 'logic_sleuth',
      },
      {
        text: 'Mencari cara agar solusinya rapi, bersih, dan memuaskan secara visual',
        subtext: 'Mengutamakan kerapian dan presentasi akhir yang elegan',
        icon: '🖌️',
        target: 'web_designer',
      },
      {
        text: 'Mencari bantuan cerdas, bertanya hal futuristik, atau mencari jalan pintas efisien',
        subtext: 'Cepat memanfaatkan alat bantu teknologi untuk mempermudah pekerjaan',
        icon: '⚡',
        target: 'ai_builder',
      },
    ],
  },
  {
    id: 4,
    question: 'Jika ananda diberi kebebasan membuat 1 karya digital impian, apa yang ingin ia ciptakan?',
    subtitle: 'Cerminan impian terbesar yang ingin dipamerkan anak kepada keluarga.',
    options: [
      {
        text: 'Game petualangan aksi yang seru dan bisa dimainkan bersama teman-temannya',
        subtext: 'Ingin jadi kreator game kebanggaan sekolah',
        icon: '🚀',
        target: 'game_creator',
      },
      {
        text: 'Program pemecah kode rahasia atau kuis teka-teki logika berhadiah skor',
        subtext: 'Bangga saat bisa membuat program cerdas yang rumit',
        icon: '📊',
        target: 'logic_sleuth',
      },
      {
        text: 'Website portofolio galeri karya pribadi atau toko online mini yang cantik',
        subtext: 'Ingin punya halaman web resmi berdesain modern di internet',
        icon: '💻',
        target: 'web_designer',
      },
      {
        text: 'Robot / Chatbot AI yang bisa diajak ngobrol dan mengenali suara atau wajah',
        subtext: 'Ingin menciptakan kecerdasan buatan seperti di film sci-fi',
        icon: '🔮',
        target: 'ai_builder',
      },
    ],
  },
  {
    id: 5,
    question: 'Harapan terbesar Ayah & Bunda untuk masa depan digital buah hati?',
    subtitle: 'Visi orang tua dalam mengarahkan waktu layar (screen time) anak menjadi produktif.',
    options: [
      {
        text: 'Mengubah kebiasaan main game konsumtif menjadi produsen game kreatif & percaya diri',
        subtext: 'Agar waktu bermain menghasilkan karya nyata bernilai tinggi',
        icon: '🏆',
        target: 'game_creator',
      },
      {
        text: 'Melatih fokus, daya pikir kritis, dan persiapan kompetisi logika / olimpiade',
        subtext: 'Investasi fondasi akademis yang kuat untuk masa depan',
        icon: '🎯',
        target: 'logic_sleuth',
      },
      {
        text: 'Membekali skill desain & web aplikatif agar punya portofolio digital sejak dini',
        subtext: 'Keterampilan nyata yang langsung berguna untuk jenjang sekolah berikutnya',
        icon: '🌟',
        target: 'web_designer',
      },
      {
        text: 'Menjadikan anak melek teknologi AI sejak belia agar siap jadi pemimpin masa depan',
        subtext: 'Tidak tertinggal di era disrupsi kecerdasan buatan global',
        icon: '🌐',
        target: 'ai_builder',
      },
    ],
  },
];

export function calculateQuizResult(answers: Record<number, DigitalArchetypeKey>): {
  primary: DigitalArchetype;
  secondary: DigitalArchetype;
  matchPercentage: number;
} {
  const tally: Record<DigitalArchetypeKey, number> = {
    game_creator: 0,
    logic_sleuth: 0,
    web_designer: 0,
    ai_builder: 0,
  };

  Object.values(answers).forEach((key) => {
    if (tally[key] !== undefined) {
      tally[key] += 1;
    }
  });

  const sortedKeys = (Object.keys(tally) as DigitalArchetypeKey[]).sort(
    (a, b) => tally[b] - tally[a]
  );

  const primaryKey = sortedKeys[0];
  const secondaryKey = sortedKeys[1];

  const primaryCount = tally[primaryKey];
  const total = Object.keys(answers).length || 5;
  // Calculate match percentage between 80% to 98%
  const matchPercentage = Math.min(98, Math.max(82, Math.round((primaryCount / total) * 100 + 15)));

  return {
    primary: ARCHETYPES[primaryKey],
    secondary: ARCHETYPES[secondaryKey],
    matchPercentage,
  };
}

export function generateWhatsAppShareUrl(
  childName: string,
  archetype: DigitalArchetype,
  matchPercentage: number
): string {
  const name = childName.trim() || 'Buah Hati';
  const text = `Wah seru banget! Baru aja ikut Kuis Minat Coding Anak di Beekoding, ternyata ananda ${name} teridentifikasi sebagai:

${archetype.icon} *${archetype.title}* (${archetype.badge})
Skor Kecocokan: *${matchPercentage}%*
Superpower: ${archetype.superpowers[0]}

Ayah & Bunda yang mau tahu potensi digital dan kurikulum koding terbaik untuk buah hatinya, yuk coba tes gratis 1 menit di sini:
👉 https://beekoding.id/cek-minat-anak`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppConsultationUrl(
  childName: string,
  childAge: number,
  archetype: DigitalArchetype
): string {
  const name = childName.trim() || 'anak saya';
  const text = `Halo Beekoding, saya sudah mengisi Kuis Minat Coding Anak untuk ${name} (usia ${childAge} thn).

Hasil tes menunjukkan tipe: *${archetype.icon} ${archetype.title}* (${archetype.badge}).

Saya ingin konsultasi lebih lanjut mengenai jadwal kelas dan klaim Free Trial Class yang paling cocok untuk ananda. Terima kasih!`;

  return `https://api.whatsapp.com/send?phone=6285150920037&text=${encodeURIComponent(text)}`;
}
