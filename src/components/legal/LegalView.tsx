import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Shield,
  Lock,
  Scale,
  AlertCircle,
  ArrowLeft,
  Cookie,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { siteConfig } from '../../data/content';

export type LegalTabType = 'privacy' | 'terms' | 'disclaimer';

interface LegalViewProps {
  initialTab?: LegalTabType;
  onBackToHome?: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  initialTab = 'privacy',
  onBackToHome,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTab]);

  useEffect(() => {
    const metaMap: Record<LegalTabType, { slug: string; title: string }> = {
      privacy: {
        slug: 'kebijakan-privasi',
        title: 'Kebijakan Privasi (Privacy Policy) & AdSense Cookie | Beekoding',
      },
      terms: {
        slug: 'syarat-ketentuan',
        title: 'Syarat & Ketentuan Layanan (Terms of Service) | Beekoding',
      },
      disclaimer: {
        slug: 'penafian',
        title: 'Penafian Resmi (Disclaimer) | Beekoding',
      },
    };
    const current = metaMap[activeTab];
    document.title = current.title;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `https://beekoding.my.id/${current.slug}`);
  }, [activeTab]);

  const handleTabChange = (tab: LegalTabType) => {
    setActiveTab(tab);
    const slugMap: Record<LegalTabType, string> = {
      privacy: 'kebijakan-privasi',
      terms: 'syarat-ketentuan',
      disclaimer: 'penafian',
    };
    window.history.pushState(null, '', `/${slugMap[tab]}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-amber-500 selection:text-slate-950 ${
        isDark ? 'bg-[#0d0f15] text-slate-100' : 'bg-[#fbf9f3] text-slate-800'
      }`}
    >
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#0d0f15]/90 border-slate-800 text-slate-100'
            : 'bg-[#fbf9f3]/90 border-amber-200/80 text-slate-800'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                  : 'bg-white border-amber-200 hover:bg-amber-50 text-slate-700 shadow-sm'
              }`}
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <a href="/" onClick={(e) => { e.preventDefault(); handleBack(); }} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1.5px] shadow-sm">
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#10141e]' : 'bg-white'
                  }`}
                >
                  <img src="/beekoding-logo.png" alt="Beekoding Logo" className="w-6 h-6 object-contain" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight font-['Space_Grotesk']">
                Bee<span className="text-amber-500">koding</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                isDark
                  ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                  : 'border-amber-300 text-amber-800 hover:bg-amber-100/50'
              }`}
            >
              <span>ads.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-4">
            <Shield className="w-4 h-4" />
            <span>Transparansi & Kepatuhan Standar Google AdSense</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-tight mb-3">
            Halaman Legalitas & Kebijakan Resmi
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Komitmen transparansi data, perlindungan privasi anak (UU PDP), dan kepatuhan terhadap kebijakan penayangan iklan Google AdSense.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex justify-center mb-8">
          <div
            className={`inline-flex p-1.5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => handleTabChange('privacy')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Kebijakan Privasi</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('terms')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Syarat & Ketentuan</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('disclaimer')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'disclaimer'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>Penafian (Disclaimer)</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div
          className={`rounded-3xl border p-6 sm:p-10 shadow-xl leading-relaxed text-sm ${
            isDark
              ? 'bg-[#121622] border-slate-800 text-slate-200 shadow-black/40'
              : 'bg-white border-amber-200/80 text-slate-700 shadow-amber-900/5'
          }`}
        >
          {/* ================= TAB 1: PRIVACY POLICY ================= */}
          {activeTab === 'privacy' && (
            <article className="space-y-7 animate-in fade-in duration-200">
              {/* AdSense Mandatory Cookie Alert */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                    : 'bg-amber-50/90 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h2 className="font-black text-xs sm:text-sm uppercase tracking-wider text-amber-500">
                      Pernyataan Kepatuhan Kebijakan Iklan Google AdSense & Cookies Pihak Ketiga
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                      Situs web <strong>Beekoding</strong> menggunakan layanan periklanan dari Google AdSense. Google dan vendor pihak ketiga menggunakan berkas cookie untuk menayangkan iklan yang dipersonalisasi berdasarkan kunjungan pengguna sebelumnya di situs ini maupun situs web lain di internet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: Pengantar */}
              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  1. Pengantar & Komitmen Perlindungan Data
                </h2>
                <p>
                  Selamat datang di platform edukasi <strong>Beekoding</strong> (dapat diakses melalui domain resmi{' '}
                  <code className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-xs">
                    https://{siteConfig.domain}
                  </code>{' '}
                  dan subdomain Cloudflare{' '}
                  <code className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-xs">
                    https://beekoding.pages.dev
                  </code>
                  ). Kami sangat menghargai dan menjunjung tinggi hak privasi seluruh siswa, wali murid, dan pengunjung situs web kami.
                </p>
                <p>
                  Dokumen Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda sesuai dengan <strong>Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong> serta standar perlindungan privasi global.
                </p>
              </section>

              {/* Section 2: Cookies & Google AdSense */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  2. Kebijakan Berkas Cookie (Cookies) & Google AdSense
                </h2>
                <p>
                  Seperti halnya situs web edukasi modern lainnya, Beekoding menggunakan <em>cookies</em> untuk menyimpan preferensi sesi pengunjung dan menganalisis performa halaman.
                </p>
                <div className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <p>
                    <strong>A. Google sebagai Vendor Pihak Ketiga:</strong> Google menggunakan berkas cookie (termasuk cookie DoubleClick dan cookie penayangan iklan Google) untuk menyajikan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs ini atau situs lain di World Wide Web.
                  </p>
                  <p>
                    <strong>B. Penonaktifan Iklan yang Dipersonalisasi (Opt-Out):</strong> Pengunjung dapat memilih untuk tidak menerima iklan yang dipersonalisasi kapan saja melalui halaman resmi:{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 underline font-bold inline-flex items-center gap-1"
                    >
                      Google Ads Settings <ExternalLink className="w-3 h-3" />
                    </a>.
                  </p>
                  <p>
                    <strong>C. Pilihan Melalui Konsorsium Periklanan:</strong> Anda juga dapat menolak penggunaan cookie dari vendor pihak ketiga melalui portal:{' '}
                    <a
                      href="http://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 underline font-bold inline-flex items-center gap-1"
                    >
                      www.aboutads.info <ExternalLink className="w-3 h-3" />
                    </a>.
                  </p>
                </div>
              </section>

              {/* Section 3: Data yang Dikumpulkan */}
              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  3. Jenis Informasi yang Kami Kumpulkan
                </h2>
                <p>Kami hanya mengumpulkan data yang diberikan secara sukarela untuk keperluan konsultasi pendidikan dan akademik:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Informasi Kontak Orang Tua/Wali:</strong> Nama, alamat email, dan nomor WhatsApp saat mengisi formulir konsultasi, pendaftaran bootcamp, atau kelas uji coba gratis.</li>
                  <li><strong>Data Siswa:</strong> Nama panggilan dan jenjang usia anak guna penyesuaian kurikulum dan rasio kelas kecil.</li>
                  <li><strong>Hasil Tes Minat & Bakat:</strong> Jawaban survei minat koding anak yang digunakan secara murni untuk menyusun laporan rekomendasi akademik (Academic Talent Report).</li>
                  <li><strong>Berkas Log Standar (Log Files):</strong> Alamat IP, jenis peramban (browser), ISP, cap waktu tanggal/jam, dan rujukan halaman untuk memantau keamanan situs tanpa mengidentifikasi identitas pribadi secara langsung.</li>
                </ul>
              </section>

              {/* Section 4: Perlindungan Data Anak */}
              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  4. Komitmen Khusus Perlindungan Privasi Anak
                </h2>
                <p>
                  Sebagai lembaga pendidikan coding anak usia 6–18 tahun, kami sangat memprioritaskan keamanan anak di internet:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Kami tidak pernah secara sengaja mengumpulkan data pribadi sensitif anak di bawah usia 13 tahun tanpa persetujuan eksplisit dari orang tua atau wali sah.</li>
                  <li>Semua komunikasi pendaftaran dan pembayaran kelas dilakukan langsung melalui kontak orang tua/wali murid terdaftar.</li>
                  <li>Jika Anda meyakini bahwa anak Anda telah memberikan informasi pribadi tanpa sepengetahuan Anda, silakan hubungi kami segera dan kami akan menghapusnya dalam waktu 1x24 jam.</li>
                </ul>
              </section>

              {/* Section 5: Kontak Resmi */}
              <section className="space-y-3 pt-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  5. Kontak Petugas Perlindungan Data
                </h2>
                <p>Untuk pertanyaan, koreksi data, atau permintaan penghapusan informasi pribadi, silakan hubungi tim kami:</p>
                <div className={`p-4 rounded-2xl border space-y-1.5 font-mono text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/50 border-amber-200'}`}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span>Email: {siteConfig.email} / halo@beekoding.id</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>WhatsApp Resmi: {siteConfig.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-500" />
                    <span>Lembaga: Beekoding Academy — Indonesia</span>
                  </div>
                </div>
              </section>
            </article>
          )}

          {/* ================= TAB 2: TERMS OF SERVICE ================= */}
          {activeTab === 'terms' && (
            <article className="space-y-7 animate-in fade-in duration-200">
              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  1. Persetujuan Syarat Layanan
                </h2>
                <p>
                  Dengan mengakses dan menggunakan situs web <strong>Beekoding</strong>, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan Layanan ini, serta tunduk pada seluruh peraturan perundang-undangan yang berlaku di Republik Indonesia. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  2. Hak Kekayaan Intelektual (Hak Cipta)
                </h2>
                <p>
                  Seluruh materi yang terdapat pada situs ini—termasuk silabus kurikulum, modul proyek Scratch dan Python, ilustrasi maskot Beeby, artikel blog edukasi, desain antarmuka, serta kode program—adalah hak milik intelektual resmi <strong>Beekoding</strong> dan dilindungi oleh Undang-Undang Hak Cipta No. 28 Tahun 2014.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Pengguna diperkenankan membaca dan membagikan artikel blog edukasi untuk tujuan non-komersial dengan mencantumkan tautan sumber rujukan resmi.</li>
                  <li>Dilarang keras menyalin, memperjualbelikan, atau menduplikasi materi kurikulum pelatihan kami tanpa izin tertulis dari manajemen Beekoding.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  3. Ketentuan Program Kelas & Sertifikasi
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Free Trial Class:</strong> Sesi uji coba kelas coding diberikan secara gratis 1x kepada setiap calon siswa baru sesuai ketersediaan jadwal instruktur.</li>
                  <li><strong>Rasio Kelas Kecil:</strong> Demi efektivitas belajar, kelas reguler dan bootcamp dibatasi maksimal 3–5 siswa per instruktur.</li>
                  <li><strong>Sertifikat Resmi:</strong> Sertifikat digital resmi yang dapat diverifikasi melalui QR Code diterbitkan setelah siswa menyelesaikan proyek akhir dan memenuhi syarat kehadiran minimal 80%.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  4. Perubahan Syarat Layanan
                </h2>
                <p>
                  Beekoding berhak memperbarui dan merevisi syarat ketentuan ini sewaktu-waktu. Perubahan akan segera berlaku setelah dipublikasikan pada halaman ini dengan pembaruan tanggal efektif.
                </p>
              </section>
            </article>
          )}

          {/* ================= TAB 3: DISCLAIMER ================= */}
          {activeTab === 'disclaimer' && (
            <article className="space-y-7 animate-in fade-in duration-200">
              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  1. Penafian Konten Edukasi
                </h2>
                <p>
                  Seluruh informasi, panduan koding, dan materi presentasi yang dipublikasikan di situs web Beekoding disajikan semata-mata untuk tujuan pendidikan, literasi teknologi, dan stimulasi computational thinking bagi anak-anak dan remaja.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  2. Hasil Pembelajaran & Kecepatan Penguasaan
                </h2>
                <p>
                  Setiap anak memiliki minat, bakat, dan kecepatan belajar yang unik. Contoh hasil proyek game atau aplikasi yang dicontohkan di situs ini mencerminkan pencapaian siswa yang telah mengikuti bimbingan intensif. Kami tidak menjamin hasil identik bagi setiap individu tanpa komitmen belajar yang sepadan.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  3. Tautan Pihak Ketiga & Iklan Mitra
                </h2>
                <p>
                  Situs ini dapat menyertakan tautan menuju platform luar atau unit iklan Google AdSense. Kami tidak bertanggung jawab atas isi, kebijakan privasi, atau ketersediaan layanan dari situs pihak ketiga yang ditautkan tersebut.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base sm:text-lg font-black text-amber-500 font-['Space_Grotesk']">
                  4. Merek Dagang & Afiliasi
                </h2>
                <p>
                  Penyebutan platform coding pihak ketiga (seperti Scratch oleh MIT Media Lab, Python oleh Python Software Foundation, Roblox oleh Roblox Corp, atau Minecraft oleh Mojang/Microsoft) adalah untuk keperluan penjelasan materi pembelajaran. Beekoding adalah lembaga edukasi independen.
                </p>
              </section>
            </article>
          )}

          {/* Footer of the Box */}
          <div
            className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-amber-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Terakhir Diperbarui: 20 Oktober 2026 • Versi Dokumen Kepatuhan 2.2</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-amber-500">
              <FileText className="w-4 h-4" />
              <span>Kepatuhan Resmi Google AdSense & UU PDP No. 27/2022</span>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer
        className={`border-t py-8 text-center text-xs transition-colors ${
          isDark ? 'bg-[#07090f] text-slate-500 border-slate-800' : 'bg-[#ede7da] text-slate-600 border-amber-300'
        }`}
      >
        <p>© 2026 Beekoding Academy. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};
