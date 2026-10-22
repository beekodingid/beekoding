export interface CityLandingData {
  slug: string;
  cityName: string;
  province: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  popularAreas: string[];
  localCommuteBenefit: string;
  testimonial: {
    parentName: string;
    childName: string;
    area: string;
    quote: string;
    rating: number;
  };
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export const CITIES_DATA: CityLandingData[] = [
  {
    slug: 'kursus-coding-anak-jakarta',
    cityName: 'Jakarta',
    province: 'DKI Jakarta',
    tagline: 'Solusi Kursus Coding Anak Terdepan di Ibu Kota Tanpa Terjebak Macet',
    heroHeadline: 'Kursus Coding Anak Terbaik di Jakarta: Belajar Scratch, Roblox & AI dari Rumah',
    heroSubtitle:
      'Solusi cerdas bagi keluarga modern di Jakarta. Belajar koding interaktif via Google Meet dengan mentor sabar, rasio maksimal 4 anak per kelas, dan portofolio teknologi berstandar internasional.',
    popularAreas: [
      'Jakarta Selatan (Kemang, Pondok Indah, Cilandak, Tebet)',
      'Jakarta Barat (Puri Indah, Kebon Jeruk, Tomang)',
      'Jakarta Timur (Rawamangun, Duren Sawit, Cibubur)',
      'Jakarta Utara (Kelapa Gading, PIK, Sunter)',
      'Jakarta Pusat (Menteng, Cempaka Putih, Tanah Abang)',
    ],
    localCommuteBenefit:
      'Hemat 2–3 jam waktu tempuh di jalanan Jakarta. Anak Anda belajar dengan fokus prima dari meja belajar sendiri tanpa rasa lelah akibat kemacetan.',
    testimonial: {
      parentName: 'Ibu Ratna Dewi (Wali Kenzo, 9 Thn)',
      childName: 'Kenzo',
      area: 'Jakarta Selatan',
      quote:
        'Sangat terbantu! Dulu mau les offline di Jaksel macetnya luar biasa sepulang kerja. Di Beekoding, Kenzo belajar online tapi bimbingan mentornya sangat privat dan detail. Sekarang Kenzo sudah bisa bikin game Scratch sendiri!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Jakarta Terbaik & Terdekat (Online & Privat) | Beekoding',
    metaDescription:
      'Les coding anak SD hingga SMA terbaik di Jakarta. Belajar Scratch 3.0, Roblox Lua, Python & AI interaktif via Google Meet bersama mentor berpengalaman. Rasio max 4 anak. Coba Free Trial Class sekarang!',
    metaKeywords:
      'kursus coding anak jakarta, les coding anak jakarta selatan, les koding jakarta barat, kursus scratch jakarta, les python anak jakarta, coding for kids jakarta, les programming anak jakarta timur, kursus roblox jakarta',
  },
  {
    slug: 'kursus-coding-anak-surabaya',
    cityName: 'Surabaya',
    province: 'Jawa Timur',
    tagline: 'Pusat Pembinaan Talenta Digital Muda Kota Pahlawan',
    heroHeadline: 'Kursus Coding & AI Anak di Surabaya: Ubah Hobi Gadget Jadi Prestasi Nyata',
    heroSubtitle:
      'Membekali anak-anak Surabaya dan sekitarnya (Sidoarjo, Gresik, Malang) dengan keterampilan computational thinking, logika game Scratch, Roblox 3D, dan Python AI.',
    popularAreas: [
      'Surabaya Barat (Citraland, Graha Famili, Pakuwon City)',
      'Surabaya Timur (Mulyosari, Rungkut, Kertajaya)',
      'Surabaya Pusat (Tegalsari, Gubeng)',
      'Surabaya Selatan (Wiyung, Gayungan, Jemursari)',
      'Area Sekitar: Sidoarjo & Gresik',
    ],
    localCommuteBenefit:
      'Fleksibilitas jadwal terbaik menyesuaikan ritme padat sekolah di Surabaya. Sesi kelas interaktif sore dan akhir pekan siap mendampingi anak.',
    testimonial: {
      parentName: 'Bapak Hendra Wijaya (Wali Chelsea, 11 Thn)',
      childName: 'Chelsea',
      area: 'Surabaya Barat',
      quote:
        'Chelsea suka sekali main Roblox, lalu diarahkan ikut kelas Roblox Studio di Beekoding. Sekarang dia paham konsep koordinat 3D dan script Lua. Mentornya komunikatif dan sabar banget!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Surabaya Terbaik: Scratch, Roblox & Python | Beekoding',
    metaDescription:
      'Les coding anak SD, SMP & SMA terbaik di Surabaya & Sidoarjo. Kelas interaktif online dengan rasio kecil (maks 4 anak). Bangun logika dan game perdana buah hati. Free Trial Class!',
    metaKeywords:
      'kursus coding anak surabaya, les coding anak surabaya barat, kursus scratch surabaya, les python anak sidoarjo, coding anak surabaya timur, kursus roblox surabaya, les komputer anak surabaya',
  },
  {
    slug: 'kursus-coding-anak-bandung',
    cityName: 'Bandung',
    province: 'Jawa Barat',
    tagline: 'Kembangkan Daya Kreativitas & Inovasi Teknologi Anak Kota Kembang',
    heroHeadline: 'Kursus Coding Anak di Bandung: Kurikulum Kreatif dari Scratch hingga Python',
    heroSubtitle:
      'Anak-anak Bandung dikenal memiliki daya imajinasi dan seni yang tinggi. Beekoding mengarahkan potensi tersebut menjadi kreator game visual, animasi interaktif, dan aplikasi AI modern.',
    popularAreas: [
      'Bandung Utara (Dago, Setiabudi, Ciumbuleuit)',
      'Bandung Tengah (Riau, Buah Batu, Burangrang)',
      'Bandung Timur (Antapani, Arcamanik)',
      'Bandung Barat & Cimahi (Pasteur, Sariwangi, Cimahi)',
    ],
    localCommuteBenefit:
      'Udara sejuk Bandung dipadu suasana belajar online yang santai dan interaktif. Anak bebas bertanya langsung kepada mentor tanpa rasa sungkan.',
    testimonial: {
      parentName: 'Ibu Annisa Pratiwi (Wali Farhan, 10 Thn)',
      childName: 'Farhan',
      area: 'Dago, Bandung',
      quote:
        'Awalnya saya kira belajar koding itu kaku, ternyata di Beekoding seru banget! Farhan bikin animasi dongeng khas sunda di Scratch. Metode belajarnya sangat ramah anak.',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Bandung Terbaik & Kreatif | Belajar Game & AI Beekoding',
    metaDescription:
      'Les coding anak SD & SMP di Bandung. Belajar Scratch 3.0, game design Roblox, dan logika AI interaktif bersama mentor berpengalaman. Kelas kecil rasio 1:4. Coba Free Trial!',
    metaKeywords:
      'kursus coding anak bandung, les coding anak dago bandung, les koding anak cimahi, kursus python anak bandung, belajar scratch anak bandung, kursus roblox anak bandung',
  },
  {
    slug: 'kursus-coding-anak-tangerang',
    cityName: 'Tangerang & BSD',
    province: 'Banten',
    tagline: 'Pilihan Utama Keluarga Modern di BSD, Serpong, Alam Sutera & Bintaro',
    heroHeadline: 'Kursus Coding Anak di Tangerang & BSD: Persiapan Nyata Talenta Masa Depan',
    heroSubtitle:
      'Komunitas keluarga melek teknologi di Tangerang Raya dan Tangerang Selatan kini bisa memberikan pendidikan STEM terbaik tanpa perlu repot mengantar anak ke tempat les.',
    popularAreas: [
      'BSD City & Serpong',
      'Gading Serpong & Alam Sutera',
      'Bintaro Jaya & Pamulang',
      'Karawaci & Modernland',
      'Tangerang Kota & Ciputat',
    ],
    localCommuteBenefit:
      'Solusi praktis bagi orang tua pekerja komuter BSD-Jakarta. Tetap bisa memantau perkembangan belajar anak lewat Portal Wali Murid 24/7.',
    testimonial: {
      parentName: 'Bapak Gunawan Santoso (Wali Keisha, 8 Thn)',
      childName: 'Keisha',
      area: 'BSD City, Tangerang Selatan',
      quote:
        'Keisha sangat antusias setiap hari Sabtu pagi untuk kelas Beekoding. Sertifikat digitalnya ber-QR code dan bisa langsung saya download di portal. Sangat profesional!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Tangerang & BSD City Terbaik | Scratch & AI Beekoding',
    metaDescription:
      'Les coding anak SD & remaja di BSD City, Gading Serpong, Alam Sutera & Bintaro. Live online interaktif, rasio maksimal 4 anak. Coba Free Trial Class sekarang!',
    metaKeywords:
      'kursus coding anak tangerang, les coding anak bsd, les coding gading serpong, kursus scratch bintaro, kursus python anak alam sutera, les programming anak tangerang selatan',
  },
  {
    slug: 'kursus-coding-anak-bekasi',
    cityName: 'Bekasi',
    province: 'Jawa Barat',
    tagline: 'Pendidikan Logika & Teknologi Terjangkau Berkualitas untuk Anak Patriot',
    heroHeadline: 'Kursus Coding Anak di Bekasi: Belajar Menyenangkan, Berprestasi di Era Digital',
    heroSubtitle:
      'Solusi edukasi teknologi terpercaya bagi orang tua di Bekasi Barat, Timur, Selatan, Utara, dan Cikarang. Mengasah logika matematika dan problem solving sejak usia SD.',
    popularAreas: [
      'Bekasi Barat (Summarecon Bekasi, Harapan Indah)',
      'Bekasi Selatan (Galaxy, Pekayon, Grand Galaxy)',
      'Bekasi Timur & Tambun',
      'Cikarang & Lippo Cikarang',
      'Jatiasih & Cibubur',
    ],
    localCommuteBenefit:
      'Bebas macet jalanan Kalimalang dan tol Cikampek. Anak belajar dari meja kamar yang tenang dengan bimbingan personal mentor sabar.',
    testimonial: {
      parentName: 'Ibu Fitri Handayani (Wali Danis, 12 Thn)',
      childName: 'Danis',
      area: 'Summarecon Bekasi',
      quote:
        'Danis sekarang kelas 7 SMP dan ambil kelas Python di Beekoding. Materi diajarkan dari nol sampai bisa buat kalkulator dan game snake sendiri. Nilai TIK di sekolah langsung 95!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Bekasi Terbaik (Online Live Google Meet) | Beekoding',
    metaDescription:
      'Les coding anak SD, SMP & SMA di Bekasi & Cikarang. Belajar Scratch, Roblox & Python bersama mentor ramah. Rasio maksimal 4 murid. Gratis kelas uji coba!',
    metaKeywords:
      'kursus coding anak bekasi, les coding summarecon bekasi, les koding harapan indah, kursus python cikarang, belajar coding anak galaxy bekasi, les scratch anak bekasi',
  },
  {
    slug: 'kursus-coding-anak-medan',
    cityName: 'Medan',
    province: 'Sumatera Utara',
    tagline: 'Gerbang Edukasi Teknologi Termaju untuk Buah Hati di Kota Medan',
    heroHeadline: 'Kursus Coding Anak di Medan: Asah Daya Pikir Kritis & Logika Digital Buah Hati',
    heroSubtitle:
      'Hadirkan kurikulum koding dan kecerdasan buatan standar internasional langsung ke rumah Anda di Medan, Deli Serdang, dan Binjai.',
    popularAreas: [
      'Medan Baru & Polonia',
      'Medan Kota & Petisah',
      'Medan Sunggal & Ringroad',
      'Medan Helvetia & Marelan',
      'Area Sekitar: Binjai & Deli Serdang',
    ],
    localCommuteBenefit:
      'Akses mentor koding terbaik nasional tanpa batasan geografis. Kelas live Google Meet berkualitas tinggi dengan koneksi lancar.',
    testimonial: {
      parentName: 'Bapak Ricky Siregar (Wali Kevin, 10 Thn)',
      childName: 'Kevin',
      area: 'Medan Sunggal',
      quote:
        'Di Medan pilihan les coding anak dengan kurikulum update masih terbatas. Untung ada Beekoding, kelas online-nya sangat hidup dan interaktif. Kevin tidak pernah absen!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Medan Terbaik: Scratch, Roblox, Python | Beekoding',
    metaDescription:
      'Les coding anak SD hingga SMA di Kota Medan. Belajar logika, pembuatan game, dan Artificial Intelligence secara interaktif via Google Meet. Coba Free Trial Class!',
    metaKeywords:
      'kursus coding anak medan, les coding anak medan sunggal, les koding medan baru, kursus scratch medan, les python anak medan, belajar programming anak deli serdang',
  },
  {
    slug: 'kursus-coding-anak-semarang',
    cityName: 'Semarang',
    province: 'Jawa Tengah',
    tagline: 'Membangun Karakter Anak Cerdas, Teliti & Kreatif di Kota Atlas',
    heroHeadline: 'Kursus Coding Anak di Semarang: Belajar Menyenangkan Tanpa Beban',
    heroSubtitle:
      'Solusi les koding terpercaya untuk anak-anak di Semarang Atas, Semarang Bawah, Ungaran, dan sekitarnya dengan rasio bimbingan intensif 1:4.',
    popularAreas: [
      'Semarang Atas (Tembalang, Banyumanik, Candisari)',
      'Semarang Tengah & Simpang Lima',
      'Semarang Barat (Ngaliyan, BSB City)',
      'Semarang Timur & Pedurungan',
      'Area Sekitar: Ungaran & Salatiga',
    ],
    localCommuteBenefit:
      'Waktu belajar yang efisien dan tenang di rumah, sangat cocok menemani jadwal kegiatan sekolah anak di Semarang.',
    testimonial: {
      parentName: 'Ibu Maya Kusuma (Wali Dimas, 8 Thn)',
      childName: 'Dimas',
      area: 'Banyumanik, Semarang',
      quote:
        'Dimas tipe anak yang pemalu kalau di kelas besar. Di Beekoding muridnya cuma 3 orang per sesi, jadi Dimas aktif sekali bertanya ke mentor Rian. Terima kasih Beekoding!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Semarang Terbaik | Scratch, Roblox, Python Beekoding',
    metaDescription:
      'Les coding anak SD & SMP di Semarang & Ungaran. Kurikulum visual ramah pemula, rasio kecil max 4 anak. Coba sesi Free Diagnostic & Trial Class sekarang!',
    metaKeywords:
      'kursus coding anak semarang, les coding anak banyumanik, les coding tembalang, les koding bsb city semarang, kursus scratch semarang, kursus python anak semarang',
  },
  {
    slug: 'kursus-coding-anak-yogyakarta',
    cityName: 'Yogyakarta',
    province: 'DI Yogyakarta',
    tagline: 'Kearifan Pendidikan Karakter Berpadu Keunggulan Teknologi Masa Depan',
    heroHeadline: 'Kursus Coding Anak di Yogyakarta: Didik Kreator Teknologi yang Santun & Kritis',
    heroSubtitle:
      'Sebagai Kota Pelajar, Yogyakarta adalah tempat terbaik menanamkan kecakapan berpikir komputasional dan literasi Artificial Intelligence sejak usia dini.',
    popularAreas: [
      'Sleman (Depok, Seturan, Kaliurang, Condongcatur)',
      'Kota Yogyakarta (Kraton, Gondomanan, Danurejan)',
      'Bantul (Sewon, Kasihan, Banguntapan)',
      'Area Sekitar: Solo / Surakarta',
    ],
    localCommuteBenefit:
      'Kurikulum pedagogi ramah anak yang menumbuhkan rasa ingin tahu ilmiah tanpa paksaan, sesuai nilai-nilai luhur pendidikan Yogyakarta.',
    testimonial: {
      parentName: 'Bapak Tri Wibowo (Wali Arka, 13 Thn)',
      childName: 'Arka',
      area: 'Sleman, Yogyakarta',
      quote:
        'Arka tertarik ikut Olimpiade Informatika (OSN). Di Beekoding dia dibimbing dasar algoritma Python secara terstruktur. Cara pengajaran mentornya sangat logis dan sistematis.',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Yogyakarta Terbaik: Scratch, Roblox, Python | Beekoding',
    metaDescription:
      'Les coding anak SD, SMP & SMA di Jogja & Sleman. Belajar Scratch, game Roblox, dan bahasa Python bersama mentor berpengalaman. Rasio max 4 anak. Free Trial Class!',
    metaKeywords:
      'kursus coding anak jogja, les coding anak sleman, kursus coding anak yogyakarta, les scratch jogja, les python anak solo yogyakarta, les programming anak bantul',
  },
  {
    slug: 'kursus-coding-anak-bali',
    cityName: 'Bali / Denpasar',
    province: 'Bali',
    tagline: 'Wujudkan Kreator Digital Berwawasan Global dari Pulau Dewata',
    heroHeadline: 'Kursus Coding Anak di Bali: Belajar Kreativitas Digital Standar Internasional',
    heroSubtitle:
      'Membekali anak-anak di Denpasar, Badung, Sanur, Kuta, dan Ubud dengan keterampilan koding, game design 3D, dan Artificial Intelligence masa depan.',
    popularAreas: [
      'Denpasar (Renon, Sanur, Denpasar Barat)',
      'Badung (Kuta, Jimbaran, Nusa Dua, Canggu)',
      'Gianyar & Ubud',
      'Tabanan & sekitarnya',
    ],
    localCommuteBenefit:
      'Fleksibilitas jadwal belajar yang menyatu harmonis dengan rutinitas harian anak dan kegiatan keluarga di Bali.',
    testimonial: {
      parentName: 'Ibu Made Ayu Wulandari (Wali Putu Arya, 9 Thn)',
      childName: 'Putu Arya',
      area: 'Renon, Denpasar',
      quote:
        'Arya sangat suka menggambar. Di kelas Scratch Beekoding, gambar-gambar kartunnya bisa dia buat bergerak dan bersuara jadi game interaktif. Bangga sekali melihat perkembangannya!',
      rating: 5,
    },
    metaTitle: 'Kursus Coding Anak Bali (Denpasar, Badung, Sanur) Terbaik | Beekoding',
    metaDescription:
      'Les coding anak SD & remaja di Bali. Belajar Scratch 3.0, Roblox Lua, dan Python interaktif via Google Meet. Rasio kecil 1:4. Coba Free Trial Class gratis!',
    metaKeywords:
      'kursus coding anak bali, les coding anak denpasar, les koding sanur badung, kursus scratch bali, coding for kids bali, les python anak bali, kursus roblox bali',
  },
];
