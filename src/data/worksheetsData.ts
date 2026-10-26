export type WorksheetAgeGroup = 'all' | '5-8' | '7-10' | '8-13';

export interface PrintableWorksheet {
  id: string;
  slug: string;
  numberBadge: string;
  title: string;
  subtitle: string;
  description: string;
  ageRange: string;
  ageGroup: WorksheetAgeGroup;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  skillsTrained: string[];
  estimatedMinutes: number;
  pdfUrl: string;
  pdfFilename: string;
  accentColor: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple' | 'cyan';
  iconEmoji: string;
  previewHighlights: string[];
  answerKeySummary: string;
  parentTip: string;
}

export const MEGA_BUNDLE_WORKSHEET: PrintableWorksheet = {
  id: 'bundle-all-in-one',
  slug: 'bundel-lengkap-worksheet-logika-beekoding-2026',
  numberBadge: 'BUNDEL LENGKAP 6-IN-1',
  title: 'Buku Aktivitas Logika Koding, Maze & Mewarnai Beeby (Edisi 2026)',
  subtitle: 'Paket lengkap 6 lembar kerja cetak A4 + Kunci Jawaban Orang Tua untuk aktivitas tanpa layar (Unplugged Coding) di rumah.',
  description:
    'Kumpulan seluruh 6 misi latihan berpikir komputasional (Labirin Algoritma, Detektif Pola, Misi Debugging, Mewarnai Pixel Art Beeby, Sandi Rahasia Biner AI, hingga Blueprint Perancang Game) dalam 1 file PDF siap cetak.',
  ageRange: 'Usia 5 – 13 Tahun',
  ageGroup: 'all',
  difficulty: 'Pemula',
  skillsTrained: [
    'Algoritma & Sequence',
    'Pattern Recognition',
    'Debugging Kode',
    'Pixel Art & Kreativitas',
    'Sandi Biner & Logika AI',
    'Perancangan Game',
  ],
  estimatedMinutes: 90,
  pdfUrl: '/worksheets/bundel-lengkap-worksheet-logika-beekoding-2026.pdf',
  pdfFilename: 'Bundel-6in1-Worksheet-Logika-Beekoding-2026.pdf',
  accentColor: 'amber',
  iconEmoji: '📚',
  previewHighlights: [
    '6 Lembar Aktivitas A4 Resolusi Tinggi (Siap Cetak Hitam-Putih maupun Warna)',
    'Dilengkapi Kunci Jawaban & Panduan Pendampingan Orang Tua di setiap halaman',
    'Mengurangi kecanduan layar (Screen-Free Activity) sambil melatih otak logika',
  ],
  answerKeySummary: 'Seluruh kunci jawaban tersedia di bagian bawah tiap lembar halaman.',
  parentTip:
    'Cetak bundel ini di kertas HVS A4 dan kerjakan 1 lembar setiap akhir pekan bersama anak untuk membangun kebiasaan berpikir terstruktur.',
};

export const PRINTABLE_WORKSHEETS: PrintableWorksheet[] = [
  {
    id: 'ws-1-maze',
    slug: 'worksheet-1-labirin-algoritma-beeby',
    numberBadge: 'Lembar Kerja #1',
    title: 'Labirin Algoritma Beeby (Maze Coding Unplugged)',
    subtitle: 'Bantu maskot lebah Beeby menemukan jalan menuju Sarang Madu Emas menggunakan blok panah instruksi!',
    description:
      'Anak belajar menyusun urutan langkah (Sequence) dari titik Start menuju Sarang Madu sambil menghindari rintangan batu dan mengumpulkan bunga bonus, lalu meringkas langkahnya dengan rumus Perulangan (Loop).',
    ageRange: 'Usia 5 – 8 Tahun',
    ageGroup: '5-8',
    difficulty: 'Pemula',
    skillsTrained: ['Sequence (Urutan)', 'Spatial Logic', 'Looping Dasar'],
    estimatedMinutes: 15,
    pdfUrl: '/worksheets/worksheet-1-labirin-algoritma-beeby.pdf',
    pdfFilename: 'Worksheet-1-Labirin-Algoritma-Beeby.pdf',
    accentColor: 'amber',
    iconEmoji: '🐝',
    previewHighlights: [
      'Papan Grid Labirin 5x5 dengan Koordinat (X, Y) ramah anak',
      '8 Kotak Penyusunan Blok Kode Arah Panah (Atas, Bawah, Kanan, Kiri)',
      'Tantangan Bonus Level 2: Meringkas langkah dengan blok ULANGI (Loop)',
    ],
    answerKeySummary: '1.BAWAH -> 2.KANAN -> 3.KANAN -> 4.KANAN -> 5.KANAN -> 6.BAWAH -> 7.BAWAH -> 8.BAWAH (Sarang Madu).',
    parentTip:
      'Gunakan koin atau mainan kecil di atas kertas sebagai pion Beeby agar anak bisa menggerakkannya selangkah demi selangkah.',
  },
  {
    id: 'ws-2-pattern',
    slug: 'worksheet-2-detektif-pola-logika',
    numberBadge: 'Lembar Kerja #2',
    title: 'Detektif Pola & Dekomposisi Robot Roket',
    subtitle: 'Temukan rahasia urutan pola blok kode dan pecah gambar roket luar angkasa menjadi bangun datar!',
    description:
      'Melatih dua pilar utama Computational Thinking: mengenali pola berulang (Pattern Recognition) serta memecah bentuk kompleks menjadi bagian-bagian sederhana (Decomposition).',
    ageRange: 'Usia 6 – 9 Tahun',
    ageGroup: '5-8',
    difficulty: 'Pemula',
    skillsTrained: ['Pattern Recognition', 'Dekomposisi Visual', 'Logika Geometri'],
    estimatedMinutes: 15,
    pdfUrl: '/worksheets/worksheet-2-detektif-pola-logika.pdf',
    pdfFilename: 'Worksheet-2-Detektif-Pola-Logika-Beekoding.pdf',
    accentColor: 'emerald',
    iconEmoji: '🔍',
    previewHighlights: [
      '4 Tantangan Deret Pola Blok Kode & Kombinasi Huruf-Angka',
      'Misi Dekomposisi: Menghitung komponen Segitiga, Persegi Panjang, dan Lingkaran pada Roket',
      'Melatih ketelitian visual & kesiapan matematika dasar SD',
    ],
    answerKeySummary: 'Pola 1: Lingkaran, Segitiga | Pola 2: Lompat, Maju | Pola 3: 60, 70 | Dekomposisi Roket: 3 Segitiga, 2 Persegi Panjang, 2 Lingkaran.',
    parentTip:
      'Tanyakan pada anak mengapa ia memilih jawaban tersebut untuk melatih kemampuan menjelaskan alasan secara logis.',
  },
  {
    id: 'ws-3-debugging',
    slug: 'worksheet-3-misi-debugging-kode',
    numberBadge: 'Lembar Kerja #3',
    title: 'Misi Debugging: Cari & Perbaiki Bug Kode!',
    subtitle: 'Temukan langkah instruksi robot yang keliru (Bug) dan tulis ulang algoritma yang benar!',
    description:
      'Dalam pemrograman, kesalahan kode disebut "Bug". Lembar kerja ini melatih anak agar tidak takut salah dan terbiasa menganalisis letak kekeliruan instruksi secara kritis.',
    ageRange: 'Usia 7 – 10 Tahun',
    ageGroup: '7-10',
    difficulty: 'Menengah',
    skillsTrained: ['Debugging (Evaluasi)', 'Critical Thinking', 'Problem Solving'],
    estimatedMinutes: 15,
    pdfUrl: '/worksheets/worksheet-3-misi-debugging-kode.pdf',
    pdfFilename: 'Worksheet-3-Misi-Debugging-Kode-Beekoding.pdf',
    accentColor: 'rose',
    iconEmoji: '🐞',
    previewHighlights: [
      'Kasus #1: Robot Salah Belok ke Kolam Lumpur',
      'Kasus #2: Urutan Kode Pagi Hari yang Terbalik (Sequence Bug)',
      'Kasus #3: Perulangan Tanpa Henti (Infinite Loop Bug)',
    ],
    answerKeySummary: 'Kasus #1: Langkah 3 diganti ATAS | Kasus #2: Urutan 2-3-1-4 | Kasus #3: Ganti ULANGI SELAMANYA menjadi ULANGI 3 KALI.',
    parentTip:
      'Ceritakan bahwa istilah "Bug" berasal dari kisah nyata seekor ngengat yang masuk ke komputer tua milik ilmuwan Grace Hopper pada tahun 1947!',
  },
  {
    id: 'ws-4-coloring-pixel',
    slug: 'worksheet-4-mewarnai-pixel-art-beeby',
    numberBadge: 'Lembar Kerja #4',
    title: 'Mewarnai Maskot Beeby & Kode Pixel Art',
    subtitle: 'Warnai kotak piksel sesuai logika IF-THEN dan hias maskot lebah Beeby dengan warna favoritmu!',
    description:
      'Menggabungkan seni mewarnai dengan konsep pemrograman Conditionals (Jika-Maka) dan representasi citra komputer (Pixel Art Grid 9x9). Cocok untuk anak visual dan kreatif.',
    ageRange: 'Usia 5 – 9 Tahun',
    ageGroup: '5-8',
    difficulty: 'Pemula',
    skillsTrained: ['Logika IF-THEN', 'Koordinat Piksel', 'Motorik & Kreativitas'],
    estimatedMinutes: 20,
    pdfUrl: '/worksheets/worksheet-4-mewarnai-pixel-art-beeby.pdf',
    pdfFilename: 'Worksheet-4-Mewarnai-Pixel-Art-Beeby.pdf',
    accentColor: 'purple',
    iconEmoji: '🎨',
    previewHighlights: [
      'Grid Pixel Art 9x9 dengan aturan logika warna (IF angka = 2 THEN Kuning Madu)',
      'Ilustrasi Line-Art Maskot Beeby ukuran besar siap diwarnai',
      'Pertanyaan refleksi visual untuk menebak objek tersembunyi',
    ],
    answerKeySummary: 'Kotak piksel membentuk gambar Lebah Beeby dengan 1 kotak sengat bernomor 3 di baris paling bawah.',
    parentTip:
      'Siapkan pensil warna kuning, hitam, dan biru muda. Biarkan anak menambahkan gambar latar seperti laptop atau bintang di sekitar Beeby.',
  },
  {
    id: 'ws-5-binary-ai',
    slug: 'worksheet-5-sandi-rahasia-biner-ai',
    numberBadge: 'Lembar Kerja #5',
    title: 'Sandi Rahasia Biner & Logika Pohon Keputusan AI',
    subtitle: 'Pecahkan pesan rahasia komputer menggunakan angka 0 dan 1 serta cara kerja Kecerdasan Buatan!',
    description:
      'Memperkenalkan cara komputer menyimpan data lewat kode biner (0 dan 1) sekaligus bagaimana Artificial Intelligence (AI) mengklasifikasikan objek lewat Decision Tree.',
    ageRange: 'Usia 8 – 12 Tahun',
    ageGroup: '8-13',
    difficulty: 'Menengah',
    skillsTrained: ['Binary Cryptography', 'AI Decision Tree', 'Klasifikasi Data'],
    estimatedMinutes: 15,
    pdfUrl: '/worksheets/worksheet-5-sandi-rahasia-biner-ai.pdf',
    pdfFilename: 'Worksheet-5-Sandi-Rahasia-Biner-AI-Beekoding.pdf',
    accentColor: 'blue',
    iconEmoji: '🤖',
    previewHighlights: [
      'Kamus Sandi Biner 5-Bit untuk menerjemahkan kata rahasia',
      'Diagram Pohon Keputusan AI (Decision Tree YA / TIDAK)',
      'Pengantar seru menuju pemrograman Python & AI',
    ],
    answerKeySummary: 'Sandi Biner = K - O - D - I - N - G | Pohon Keputusan AI: 1. Lebah (Beeby), 2. Kereta Api / MRT.',
    parentTip:
      'Tantang anak untuk menulis namanya sendiri menggunakan kamus angka biner 0 dan 1 di balik kertas!',
  },
  {
    id: 'ws-6-game-canvas',
    slug: 'worksheet-6-kanvas-perancang-game',
    numberBadge: 'Lembar Kerja #6',
    title: 'Blueprint Perancang Game Pertamaku (Scratch & Roblox)',
    subtitle: 'Ubah anak dari sekadar pemain game menjadi Perancang Game (Game Designer) dengan kanvas storyboard ini!',
    description:
      'Lembar kerja favorit anak yang suka bermain Roblox, Minecraft, atau Scratch. Anak merancang karakter Hero, rintangan, item penambah skor, serta aturan variabel nyawa dan kemenangan.',
    ageRange: 'Usia 7 – 13 Tahun',
    ageGroup: '8-13',
    difficulty: 'Lanjutan',
    skillsTrained: ['Game Design Logic', 'Event Driven (When-Do)', 'Konsep Variabel Skor & Nyawa'],
    estimatedMinutes: 20,
    pdfUrl: '/worksheets/worksheet-6-kanvas-perancang-game.pdf',
    pdfFilename: 'Worksheet-6-Kanvas-Perancang-Game-Beekoding.pdf',
    accentColor: 'cyan',
    iconEmoji: '🎮',
    previewHighlights: [
      '3 Kotak Sketsa Karakter: Hero Utama, Musuh/Rintangan, dan Item Bonus',
      'Tabel Aturan Pemrograman Event (KETIKA tombol ditekan -> MAKA...)',
      'Bisa langsung diwujudkan menjadi game sungguhan saat Kelas Trial Gratis Beekoding!',
    ],
    answerKeySummary: 'Karya rancangan terbuka sesuai imajinasi anak. Dapat dibawa saat sesi Kelas Trial Gratis bersama mentor Beekoding.',
    parentTip:
      'Setelah anak selesai menggambar rancangan gamenya, foto hasilnya dan tunjukkan kepada mentor saat mengikuti Kelas Trial Gratis Beekoding!',
  },
];

/**
 * Membuka jendela cetak A4 terpersonalisasi dengan nama & usia anak tertera di header lembar kerja
 */
export function openPersonalizedWorksheetPrint(
  worksheet: PrintableWorksheet,
  childName: string,
  childAge: string | number
): void {
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) {
    window.open(worksheet.pdfUrl, '_blank');
    return;
  }

  const safeChildName = (childName || 'Kreator Cilik').replace(/[<>]/g, '');
  const safeAge = String(childAge || '8').replace(/[<>]/g, '');

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>${worksheet.title} — Lembar Kerja ${safeChildName}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      margin: 0;
      padding: 20px;
    }
    .toolbar {
      max-width: 210mm;
      margin: 0 auto 16px auto;
      background: #0f172a;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .toolbar button, .toolbar a {
      background: #f59e0b;
      color: #0f172a;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .sheet {
      width: 210mm;
      min-height: 273mm;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #f59e0b;
      border-radius: 16px;
      padding: 16mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    .header-box {
      background: #fffbeb;
      border: 2px solid #f59e0b;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 12px;
    }
    .badges { display: flex; gap: 8px; margin-bottom: 8px; font-size: 11px; font-weight: 800; }
    .badge-amber { background: #f59e0b; color: #0f172a; padding: 3px 10px; border-radius: 99px; text-transform: uppercase; }
    .badge-navy { background: #0f172a; color: #fde68a; padding: 3px 10px; border-radius: 99px; }
    .student-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      padding: 10px 16px;
      margin-bottom: 16px;
      font-size: 13px;
      font-weight: 700;
    }
    .student-bar span strong { color: #b45309; font-size: 15px; text-decoration: underline; }
    .activity-area {
      flex: 1;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 16px;
    }
    .grid-maze {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
      max-width: 340px;
      margin: 14px auto;
    }
    .grid-cell {
      aspect-ratio: 1;
      border: 2px solid #0f172a;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 12px;
      padding: 4px;
      text-align: center;
    }
    .step-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 14px;
    }
    .step-item {
      border: 1.5px solid #0f172a;
      border-radius: 8px;
      padding: 8px 12px;
      font-weight: 700;
      font-size: 12px;
      background: #fffbeb;
    }
    .answer-box {
      background: #ecfdf5;
      border: 1.5px solid #10b981;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 11px;
    }
    .footer-line {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .toolbar { display: none !important; }
      .sheet { box-shadow: none; width: 100%; min-height: auto; border-width: 1.5px; padding: 10mm; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>
      <strong>🖨️ Mode Cetak A4 Terpersonalisasi — Khusus untuk ${safeChildName}</strong>
    </div>
    <div style="display:flex;gap:10px;">
      <a href="${worksheet.pdfUrl}" download="${worksheet.pdfFilename}">⬇️ Unduh File PDF Asli</a>
      <button onclick="window.print()">🖨️ Cetak / Simpan PDF Sekarang</button>
    </div>
  </div>

  <div class="sheet">
    <div>
      <div class="header-box">
        <div class="badges">
          <span class="badge-amber">${worksheet.numberBadge}</span>
          <span class="badge-navy">${worksheet.ageRange}</span>
          <span class="badge-navy">Level: ${worksheet.difficulty}</span>
        </div>
        <h1 style="margin:0 0 4px 0;font-size:20px;font-weight:900;">${worksheet.iconEmoji} ${worksheet.title}</h1>
        <p style="margin:0;font-size:12px;color:#334155;">${worksheet.subtitle}</p>
      </div>

      <div class="student-bar">
        <span>Nama Kreator Cilik: <strong>${safeChildName}</strong></span>
        <span>Usia: <strong>${safeAge} Tahun</strong></span>
        <span>Skor Bintang: ⭐ ⭐ ⭐ ⭐ ⭐</span>
      </div>

      <div class="activity-area">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#b45309;text-transform:uppercase;">🎯 Misi & Instruksi Aktivitas:</h3>
        <p style="margin:0 0 12px 0;font-size:12.5px;line-height:1.5;">${worksheet.description}</p>

        <div class="grid-maze">
          <div class="grid-cell" style="background:#fef3c7;">🐝<br/>START</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell" style="background:#fff1f2;">🌸<br/>+10</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#fff1f2;">🌸<br/>+10</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#fff1f2;">🌸<br/>+10</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#cbd5e1;">🪨<br/>BATU</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell">⬜</div>
          <div class="grid-cell" style="background:#d1fae5;">🍯<br/>FINISH</div>
        </div>

        <h4 style="margin:14px 0 6px 0;font-size:13px;">Tuliskan Algoritma / Jawabanmu di Bawah Ini:</h4>
        <div class="step-list">
          <div class="step-item">Langkah 1: _______________________</div>
          <div class="step-item">Langkah 2: _______________________</div>
          <div class="step-item">Langkah 3: _______________________</div>
          <div class="step-item">Langkah 4: _______________________</div>
          <div class="step-item">Langkah 5: _______________________</div>
          <div class="step-item">Langkah 6: _______________________</div>
          <div class="step-item">Langkah 7: _______________________</div>
          <div class="step-item">Langkah 8: _______________________</div>
        </div>
      </div>
    </div>

    <div>
      <div class="answer-box">
        <strong>💡 Tips Pendampingan Orang Tua:</strong> ${worksheet.parentTip}<br/>
        <strong>🔑 Kunci Jawaban Singkat:</strong> ${worksheet.answerKeySummary}
      </div>
      <div class="footer-line">
        <span>BEEKODING — Sarang Edukasi Coding & AI Anak (Usia 6-16 Thn) • www.beekoding.my.id</span>
        <span>Klaim Kelas Trial Gratis via WhatsApp: 0818-1890-1737</span>
      </div>
    </div>
  </div>
</body>
</html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
