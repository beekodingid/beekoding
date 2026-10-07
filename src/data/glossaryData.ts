export interface GlossaryTerm {
  slug: string;
  term: string;
  englishTerm?: string;
  category: 'Dasar Koding' | 'Kecerdasan Buatan' | 'Game Dev' | 'Web & Logika';
  shortDefinition: string;
  kidsAnalogy: string;
  detailedExplanation: string;
  example: string;
  tags: string[];
  icon: string;
}

export const GLOSSARY_CATEGORIES = [
  'Semua',
  'Dasar Koding',
  'Kecerdasan Buatan',
  'Game Dev',
  'Web & Logika',
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'apa-itu-algoritma',
    term: 'Algoritma',
    englishTerm: 'Algorithm',
    category: 'Dasar Koding',
    icon: '📋',
    shortDefinition:
      'Urutan instruksi langkah demi langkah yang teratur dan logis untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu.',
    kidsAnalogy:
      'Bayangkan resep membuat roti bakar lezat: (1) Ambil roti, (2) Oleskan selai cokelat, (3) Panggang 3 menit. Jika urutannya dibalik, rotinya pasti gosong! Algoritma adalah urutan langkah yang tepat itu.',
    detailedExplanation:
      'Komputer tidak bisa menebak apa yang kita mau. Komputer membutuhkan algoritma: kumpulan instruksi terstruktur dari awal hingga akhir. Belajar algoritma melatih otak anak berpikir teratur, logis, dan tidak mudah bingung saat menghadapi masalah yang rumit.',
    example:
      'Di game labirin Scratch, algoritma lebah madu: "Maju 3 langkah -> Jika ada bunga, hisap madu -> Belok kanan -> Selesai."',
    tags: ['algoritma', 'logika koding', 'dasar pemrograman', 'computational thinking'],
  },
  {
    slug: 'apa-itu-loop-perulangan',
    term: 'Loop (Perulangan)',
    englishTerm: 'Loop / Iteration',
    category: 'Dasar Koding',
    icon: '🔁',
    shortDefinition:
      'Perintah dalam koding untuk mengulang suatu tindakan berkali-kali secara otomatis tanpa perlu menulis ulang kodenya.',
    kidsAnalogy:
      'Seperti lagu kesukaanmu yang disetel dengan tombol "Repeat" di playlist musik, atau jarum jam yang terus berputar 60 detik setiap menit tanpa pernah lelah.',
    detailedExplanation:
      'Daripada menulis kode "Lompat" sebanyak 100 kali, programmer cukup menulis: "Ulangi 100 kali: Lompat!". Loop menghemat waktu, membuat kode ringkas, dan memungkinkan animasi berjalan mulus di game.',
    example:
      'Dalam Python: `for i in range(10): print("Halo Beekoding!")` akan menampilkan teks sapaan 10 kali secara instan.',
    tags: ['loop', 'perulangan', 'for loop', 'while loop', 'scratch block'],
  },
  {
    slug: 'apa-itu-variabel',
    term: 'Variabel',
    englishTerm: 'Variable',
    category: 'Dasar Koding',
    icon: '📦',
    shortDefinition:
      'Kotak penyimpanan khusus di dalam memori komputer yang diberi nama untuk menyimpan dan mengubah suatu nilai atau data.',
    kidsAnalogy:
      'Bayangkan toples bekal bertuliskan label "Poin Game". Setiap kali kamu berhasil mengumpulkan bintang emas, angka di dalam toples itu bertambah satu.',
    detailedExplanation:
      'Variabel bisa menyimpan angka (seperti nyawa pemain atau skor), teks (seperti nama karakter), atau status benar/salah. Ketika nilai variabel berubah, seluruh program yang menggunakannya akan otomatis menyesuaikan diri.',
    example:
      'Variabel `skor_pemain = 0`. Setiap kali karakter lebah menyentuh bunga madu, variabel diubah menjadi `skor_pemain = skor_pemain + 10`.',
    tags: ['variabel', 'tipe data', 'skor game', 'memori program'],
  },
  {
    slug: 'apa-itu-debugging-bug',
    term: 'Debugging (Memperbaiki Bug)',
    englishTerm: 'Debugging',
    category: 'Dasar Koding',
    icon: '🐛',
    shortDefinition:
      'Proses menyelidiki, menemukan, dan memperbaiki kesalahan (bug) pada baris kode program agar aplikasi berjalan normal kembali.',
    kidsAnalogy:
      'Seperti menjadi detektif yang mencari potongan puzzle yang salah pasang, atau memeriksa rantai sepeda yang lepas agar sepedamu bisa melaju kencang lagi.',
    detailedExplanation:
      'Istilah "bug" berasal dari serangga ngengat asli yang pernah terjepit di dalam mesin komputer raksasa pada tahun 1947! Dalam koding anak, debugging bukan kegagalan, melainkan kesempatan paling seru untuk melatih ketelitian dan pantang menyerah.',
    example:
      'Karakter lebah tidak mau melompat saat tombol spasi ditekan? Setelah di-debug, ternyata blok "When Space Key Pressed" belum terhubung dengan blok "Change Y by 10".',
    tags: ['debugging', 'bug', 'troubleshooting', 'error fix'],
  },
  {
    slug: 'apa-itu-percabangan-if-else',
    term: 'Percabangan (If - Else)',
    englishTerm: 'Conditional Statement',
    category: 'Dasar Koding',
    icon: '🔀',
    shortDefinition:
      'Instruksi pengambilan keputusan yang membuat program melakukan tindakan berbeda sesuai dengan kondisi yang sedang terjadi.',
    kidsAnalogy:
      '"JIKA (If) hari ini hujan, MAKA bawa payung. JIKA TIDAK (Else), MAKA pakai kacamata hitam." Komputer menggunakan logika yang sama persis!',
    detailedExplanation:
      'Percabangan membuat program dan game terasa cerdas dan interaktif. Tanpa If-Else, game tidak akan pernah tahu kapan pemain menang, kalah, atau kehabisan nyawa.',
    example:
      'Di game Scratch: "Jika (sentuh rintangan), maka (kurangi nyawa 1). Jika (nyawa = 0), maka (tampilkan layar Game Over)."',
    tags: ['percabangan', 'if else', 'kondisi logika', 'conditional'],
  },
  {
    slug: 'apa-itu-fungsi-function',
    term: 'Fungsi (Function)',
    englishTerm: 'Function / Method',
    category: 'Dasar Koding',
    icon: '⚙️',
    shortDefinition:
      'Kumpulan baris kode yang diberi nama khusus untuk melakukan satu tugas tertentu, dan bisa dipanggil kapan saja tanpa perlu ditulis ulang.',
    kidsAnalogy:
      'Seperti tombol saklar blender di dapur. Kamu tidak perlu membongkar dan merakit motor listrik blender setiap kali mau bikin jus buah—cukup tekan satu tombol, dan mesin bekerja!',
    detailedExplanation:
      'Fungsi membuat kode menjadi rapi dan terorganisir (modular). Saat membuat game besar dengan puluhan fitur, fungsi memungkinkan programmer membagi pekerjaan menjadi bagian-bagian kecil yang mudah dikelola.',
    example:
      'Dalam Python: `def tembak_laser():` berisi kode memainkan suara laser dan mengeluarkan peluru. Setiap tombol spasi ditekan, program cukup memanggil `tembak_laser()`.',
    tags: ['fungsi', 'function', 'modul kode', 'clean code'],
  },
  {
    slug: 'apa-itu-artificial-intelligence-ai',
    term: 'Artificial Intelligence (Kecerdasan Buatan / AI)',
    englishTerm: 'Artificial Intelligence (AI)',
    category: 'Kecerdasan Buatan',
    icon: '🤖',
    shortDefinition:
      'Teknologi komputer dan sistem perangkat lunak yang dirancang untuk meniru kemampuan berpikir, belajar, dan memecahkan masalah seperti manusia.',
    kidsAnalogy:
      'Seperti asisten robot cerdas Jarvis di film Iron Man, atau fitur asisten pintar di ponsel yang bisa diajak mengobrol dan mengenali suara pemiliknya.',
    detailedExplanation:
      'AI bekerja dengan memproses informasi dalam jumlah sangat besar, menemukan pola tersembunyi, dan membuat keputusan berdasarkan data tersebut. Di Beekoding, anak diajarkan bukan cuma jadi konsumen AI, tapi kreator yang paham cara kerja dan etikanya.',
    example:
      'Filter Instagram yang otomatis menempelkan telinga kelinci di wajahmu, atau mobil pintar Tesla yang bisa mengerem sendiri saat melihat pejalan kaki.',
    tags: ['artificial intelligence', 'kecerdasan buatan', 'ai anak', 'teknologi masa depan'],
  },
  {
    slug: 'apa-itu-machine-learning',
    term: 'Machine Learning (Pembelajaran Mesin)',
    englishTerm: 'Machine Learning (ML)',
    category: 'Kecerdasan Buatan',
    icon: '🧠',
    shortDefinition:
      'Cabang dari AI di mana komputer belajar sendiri mengenali pola dari ribuan contoh data tanpa perlu diprogram secara manual baris demi baris.',
    kidsAnalogy:
      'Bagaimana kamu belajar membedakan kucing dan anjing saat masih balita? Orang tuamu memperlihatkan banyak gambar kucing dan anjing hingga otakmu hafal ciri-cirinya. Machine learning melatih komputer dengan cara yang sama!',
    detailedExplanation:
      'Dalam pemrograman biasa, manusia menulis semua aturan. Dalam Machine Learning, manusia memberi ribuan contoh data (Dataset), dan komputer yang mencari rumus serta aturannya sendiri.',
    example:
      'Aplikasi Google Photos yang bisa mengelompokkan foto kucingmu secara otomatis dari ribuan foto di galeri ponsel.',
    tags: ['machine learning', 'dataset', 'pembelajaran mesin', 'model ai'],
  },
  {
    slug: 'apa-itu-prompt-engineering',
    term: 'Prompt Engineering',
    englishTerm: 'Prompt Engineering',
    category: 'Kecerdasan Buatan',
    icon: '✍️',
    shortDefinition:
      'Seni dan keterampilan merancang kalimat instruksi (prompt) yang jelas, spesifik, dan terstruktur agar AI menghasilkan jawaban yang paling tepat.',
    kidsAnalogy:
      'Bayangkan memesan es krim ke pelayan: Jika kamu hanya bilang "Minta es krim", kamu bisa dikasih rasa apa saja. Tapi jika kamu bilang "Tolong es krim vanila 2 scoop dengan saus cokelat dan taburan almond", hasilnya pasti persis seperti keinginanmu!',
    detailedExplanation:
      'Prompt engineering adalah salah satu keahlian masa depan paling dicari. Dengan memberikan konteks, peran (role), batasan, dan contoh yang jelas, anak bisa memanfaatkan AI untuk membantu belajar sains, sejarah, atau membuat ide cerita kreatif.',
    example:
      '"Bertindaklah sebagai guru biologi kelas 4 SD yang ramah. Jelaskan proses fotosintesis tumbuhan menggunakan analogi memasak di dapur dalam 3 paragraf pendek."',
    tags: ['prompt engineering', 'prompt ai', 'chatgpt', 'komunikasi ai'],
  },
  {
    slug: 'apa-itu-large-language-model-llm',
    term: 'Large Language Model (LLM)',
    englishTerm: 'Large Language Model',
    category: 'Kecerdasan Buatan',
    icon: '📚',
    shortDefinition:
      'Model AI berskala raksasa yang dilatih membaca milyaran buku dan artikel internet sehingga mampu memahami dan menulis teks seperti manusia.',
    kidsAnalogy:
      'Bayangkan seorang jenius yang telah membaca semua buku di seluruh perpustakaan dunia, lalu kamu bisa bertanya tentang topik apa saja dan dia akan menjawab dengan bahasa yang santai.',
    detailedExplanation:
      'Teknologi di balik ChatGPT, Claude, dan Google Gemini adalah LLM. Model ini bekerja dengan memprediksi kata berikutnya yang paling masuk akal berdasarkan kalimat sebelumnya (next-token prediction).',
    example:
      'Saat kamu meminta AI menerjemahkan dongeng bahasa Indonesia ke bahasa Inggris atau menuliskan puisi tentang robot lebah madu.',
    tags: ['llm', 'large language model', 'generative ai', 'chatgpt'],
  },
  {
    slug: 'apa-itu-computer-vision',
    term: 'Computer Vision (Penglihatan Komputer)',
    englishTerm: 'Computer Vision',
    category: 'Kecerdasan Buatan',
    icon: '👁️',
    shortDefinition:
      'Bidang kecerdasan buatan yang melatih komputer untuk melihat, mengenali, dan memahami objek dari foto atau kamera video digital.',
    kidsAnalogy:
      'Memberikan "mata dan otak" pada kamera laptopmu, sehingga kamera bisa mengenali apakah kamu sedang tersenyum, melambaikan tangan, atau mengacungkan jempol.',
    detailedExplanation:
      'Bagi komputer, gambar hanyalah deretan jutaan angka warna (pixel). Computer Vision menerjemahkan angka-angka piksel tersebut menjadi pemahaman nyata: wajah manusia, rambu lalu lintas, atau rintangan jalan.',
    example:
      'Game Scratch Beekoding di mana anak mengendalikan karakter lebah hanya dengan melambaikan tangan di depan webcam tanpa menyentuh tombol keyboard.',
    tags: ['computer vision', 'webcam ai', 'pengenalan wajah', 'sensor visual'],
  },
  {
    slug: 'apa-itu-sprite-scratch',
    term: 'Sprite (Karakter Scratch)',
    englishTerm: 'Sprite',
    category: 'Game Dev',
    icon: '🐱',
    shortDefinition:
      'Objek grafis 2 dimensi dalam aplikasi Scratch atau game yang bisa bergerak, berganti kostum, bersuara, dan dikendalikan dengan blok koding.',
    kidsAnalogy:
      'Seperti wayang boneka atau aktor mini di panggung teater boneka. Kamu adalah sutradaranya yang memberi instruksi kapan dia harus melompat, menari, atau berbicara.',
    detailedExplanation:
      'Dalam Scratch 3.0, setiap sprite memiliki area skrip kodingnya sendiri. Programmer bisa menggambar sprite sendiri di tab Kostum atau memilih dari ratusan koleksi karakter yang sudah tersedia.',
    example:
      'Sprite lebah madu BeeKodi yang diprogram meluncur ke arah kursor mouse dan memainkan suara "bzzzz" saat menyentuh madu.',
    tags: ['sprite', 'scratch 3.0', 'karakter game', 'animasi 2d'],
  },
  {
    slug: 'apa-itu-roblox-lua-scripting',
    term: 'Roblox Lua Scripting',
    englishTerm: 'Roblox Lua',
    category: 'Game Dev',
    icon: '🧱',
    shortDefinition:
      'Bahasa pemrograman teks ringan dan cepat yang digunakan di dalam Roblox Studio untuk membuat mekanisme permainan dunia 3D.',
    kidsAnalogy:
      'Seperti mantra sihir di dunia Roblox: jika balok biasa disentuh tidak terjadi apa-apa, tapi dengan skrip Lua, balok itu bisa membuat karakter terpental tinggi ke langit atau memberikan koin emas rahasia!',
    detailedExplanation:
      'Lua adalah bahasa pemrograman nyata yang digunakan di industri game profesional. Melalui Roblox Studio, remaja belajar konsep pemrograman tingkat lanjut seperti Event Listener, Client-Server Communication, dan Physics Manipulation sambil bersenang-senang membuat game multiplayer.',
    example:
      'Skrip Lua sederhana untuk membuat balok lava yang mengurangi nyawa pemain: `script.Parent.Touched:Connect(function(hit) hit.Parent.Humanoid.Health = 0 end)`.',
    tags: ['roblox studio', 'lua', 'game dev 3d', 'scripting'],
  },
  {
    slug: 'apa-itu-koordinat-x-dan-y',
    term: 'Koordinat X dan Y (Posisi Layar)',
    englishTerm: 'Cartesian Coordinates (X, Y)',
    category: 'Game Dev',
    icon: '📍',
    shortDefinition:
      'Sistem angka penunjuk alamat lokasi suatu objek di layar: sumbu X untuk kanan-kiri, dan sumbu Y untuk atas-bawah.',
    kidsAnalogy:
      'Seperti peta harta karun di game petualangan: untuk menemukan peti emas, kamu harus melangkah 5 langkah ke Timur (X positif) dan 3 langkah ke Utara (Y positif).',
    detailedExplanation:
      'Di Scratch dan pembuatan game, tengah layar adalah titik (0, 0). Nilai X positif berarti ke kanan, X negatif ke kiri. Nilai Y positif berarti ke atas, dan Y negatif ke bawah. Ini cara paling seru bagi anak belajar matematika koordinat tanpa merasa bosan.',
    example:
      'Blok Scratch "Change X by 10" membuat karakter bergerak ke kanan, sedangkan "Change Y by 10" membuat karakter melompat ke atas.',
    tags: ['koordinat', 'sumbu x y', 'matematika koding', 'scratch canvas'],
  },
  {
    slug: 'apa-itu-computational-thinking',
    term: 'Computational Thinking (Berpikir Komputasional)',
    englishTerm: 'Computational Thinking',
    category: 'Web & Logika',
    icon: '🧩',
    shortDefinition:
      'Metode berpikir terstruktur untuk memecahkan masalah rumit dengan cara yang dapat dipahami dan diselesaikan oleh manusia maupun komputer.',
    kidsAnalogy:
      'Bayangkan kamarmu berantakan total: daripada menangis karena bingung, kamu membaginya: (1) rapikan buku ke rak, (2) masukkan baju kotor ke keranjang, (3) sapu lantai. Masalah raksasa jadi mudah diselesaikan!',
    detailedExplanation:
      'Memiliki 4 pilar utama: Dekomposisi (memecah masalah), Pengenalan Pola (mencari kesamaan), Abstraksi (fokus pada hal penting saja), dan Algoritma (menyusun langkah aksi). Keterampilan ini berguna di semua pelajaran sekolah dan kehidupan nyata.',
    example:
      'Saat membuat game, siswa memecah proyek menjadi: desain karakter, sistem skor, mekanik rintangan, dan suara latar.',
    tags: ['computational thinking', 'daya nalar', 'logika anak', 'problem solving'],
  },
  {
    slug: 'apa-itu-boolean',
    term: 'Boolean (True / False)',
    englishTerm: 'Boolean',
    category: 'Web & Logika',
    icon: '💡',
    shortDefinition:
      'Tipe data logika komputer yang hanya memiliki dua kemungkinan nilai: Benar (True) atau Salah (False).',
    kidsAnalogy:
      'Seperti saklar lampu di kamarmu yang hanya punya dua posisi: MENYALA (True) atau MATI (False). Tidak ada posisi setengah menyala!',
    detailedExplanation:
      'Dinamai dari matematikawan George Boole. Seluruh logika komputer di dunia, mulai dari kalkulator hingga superkomputer AI tercanggih, dibangun di atas fondasi saklar biner Benar dan Salah ini.',
    example:
      'Pertanyaan logika: "Apakah umur anak > 6 tahun?" Jika umurnya 8, komputer menghasilkan nilai Boolean `True`.',
    tags: ['boolean', 'true false', 'logika biner', 'kondisi'],
  },
  {
    slug: 'apa-itu-api',
    term: 'API (Application Programming Interface)',
    englishTerm: 'API',
    category: 'Web & Logika',
    icon: '🔌',
    shortDefinition:
      'Jembatan penghubung yang memungkinkan dua aplikasi perangkat lunak yang berbeda untuk saling berbicara dan bertukar informasi.',
    kidsAnalogy:
      'Seperti pelayan di restoran: kamu (aplikasi A) tidak perlu masuk ke dapur (aplikasi B). Kamu cukup memesan ke pelayan (API), dan pelayan mengantarkan makanan lezat kembali ke mejamu.',
    detailedExplanation:
      'Saat kamu melihat ramalan cuaca di aplikasi game, game tersebut tidak mengukur suhu sendiri di luar angkasa. Game tersebut meminta data cuaca ke BMKG menggunakan API.',
    example:
      'Aplikasi chatbot remaja Beekoding yang mengirimkan pertanyaan siswa ke OpenAI API dan menampilkan jawabannya secara otomatis.',
    tags: ['api', 'integrasi software', 'jaringan web', 'data exchange'],
  },
  {
    slug: 'apa-itu-git-dan-github',
    term: 'Git & GitHub',
    englishTerm: 'Git & GitHub',
    category: 'Web & Logika',
    icon: '🐙',
    shortDefinition:
      'Sistem pelacak riwayat perubahan kode (Git) dan platform online sedunia untuk menyimpan serta memamerkan portofolio aplikasi koding (GitHub).',
    kidsAnalogy:
      'Seperti mesin waktu penyimpanan (Save Point) di video game. Jika kodingmu rusak karena eksperimen, kamu bisa kembali ke titik aman kemarin dengan satu klik!',
    detailedExplanation:
      'GitHub adalah jejaring sosialnya para programmer di seluruh dunia. Bagi remaja SMP dan SMA, memiliki profil GitHub yang aktif adalah bukti kemampuan teknis yang sangat bergengsi saat mendaftar beasiswa kampus atau magang industri IT.',
    example:
      'Siswa kelas Teens Beekoding menyimpan kode website portofolionya di repositori GitHub publik agar bisa dilihat oleh panitia olimpiade dan keluarga.',
    tags: ['git', 'github', 'portofolio koding', 'version control'],
  },
  {
    slug: 'apa-itu-kode-biner',
    term: 'Kode Biner (Binary Code 0 dan 1)',
    englishTerm: 'Binary Code',
    category: 'Web & Logika',
    icon: '⚡',
    shortDefinition:
      'Bahasa paling mendasar dari semua komputer di dunia yang hanya terdiri dari dua simbol angka: 0 (arus mati) dan 1 (arus hidup).',
    kidsAnalogy:
      'Seperti mengirim sinyal rahasia menggunakan senter di malam hari: lampu padam (0) dan lampu menyala (1). Dengan menyusun kedipan cahaya itu, kamu bisa mengirim pesan rahasia apa pun!',
    detailedExplanation:
      'Di dalam chip prosesor komputer terdapat milyaran saklar mikroskopis bernama transistor. Angka 0 mewakili kondisi tidak ada aliran listrik, dan angka 1 mewakili ada aliran listrik.',
    example:
      'Huruf "A" disimpan di memori komputer sebagai deretan biner `01000001`.',
    tags: ['kode biner', 'binary', 'arsitektur komputer', 'transistor'],
  },
  {
    slug: 'apa-itu-syntax-error',
    term: 'Syntax Error (Kesalahan Tata Bahasa Kode)',
    englishTerm: 'Syntax Error',
    category: 'Dasar Koding',
    icon: '⚠️',
    shortDefinition:
      'Kesalahan penulisan aturan tata bahasa dalam kode pemrograman yang membuat komputer bingung dan menolak menjalankan program.',
    kidsAnalogy:
      'Seperti typo fatal saat mengirim chat: misalnya kamu ingin menulis "makan nasi", tapi salah ketik menjadi "nasi makan". Manusia mungkin masih paham, tapi komputer langsung menyerah!',
    detailedExplanation:
      'Setiap bahasa pemrograman memiliki aturan tanda baca yang ketat (misal tanda kurung buka-tutup, titik koma, atau spasi indentasi). Lupa menutup tanda kutip string adalah penyebab syntax error paling umum bagi pemula.',
    example:
      'Di Python: menulis `print("Halo Dunia)` (kurang tanda kutip penutup) akan memicu SyntaxError: unterminated string literal.',
    tags: ['syntax error', 'typo kode', 'debugging', 'aturan bahasa'],
  },
  {
    slug: 'apa-itu-event-listener',
    term: 'Event (Pemicu Peristiwa)',
    englishTerm: 'Event / Event Listener',
    category: 'Game Dev',
    icon: '🎯',
    shortDefinition:
      'Aksi atau kejadian di komputer (seperti tombol keyboard ditekan, mouse diklik, atau sprite bertabrakan) yang memicu program menjalankan kode tertentu.',
    kidsAnalogy:
      'Seperti bel pintu rumah yang berbunyi (Event), yang membuat anjingmu langsung menggonggong dan kamu berlari membuka pintu (Action).',
    detailedExplanation:
      'Pemrograman modern berbasis event (Event-Driven Programming). Komputer selalu "mendengarkan" (listening) apa yang dilakukan pengguna sebelum meresponsnya.',
    example:
      'Blok Scratch paling terkenal: "When Green Flag Clicked" (Ketika Bendera Hijau Diklik) adalah event pembuka seluruh permainan.',
    tags: ['event', 'event listener', 'scratch trigger', 'interaksi game'],
  },
];
