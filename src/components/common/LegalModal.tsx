import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Shield,
  AlertCircle,
  X,
  Lock,
  Cookie,
  CheckCircle,
  ExternalLink,
  Scale,
} from 'lucide-react';

export type LegalTabType = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-[#0f131f] border-slate-700/80 text-slate-100 shadow-black/60'
            : 'bg-white border-amber-200 text-slate-800 shadow-amber-900/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-5 border-b ${
            isDark ? 'border-slate-800 bg-[#121727]' : 'border-amber-100 bg-[#fffdfa]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-[2px] shadow-sm">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                  isDark ? 'bg-[#0f131f]' : 'bg-white'
                }`}
              >
                <Shield className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-['Space_Grotesk'] tracking-tight">
                Halaman Legalitas & Kebijakan Transparansi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Beekoding — Standar Kepatuhan Google AdSense & Regulasi Perlindungan Data Pribadi (UU PDP)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'hover:bg-amber-100 text-slate-500 hover:text-slate-800'
            }`}
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex items-center gap-2 px-6 pt-3 border-b text-xs font-bold overflow-x-auto ${
            isDark ? 'border-slate-800 bg-[#121727]/50' : 'border-amber-100 bg-[#faf8f4]'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-amber-500 text-amber-500 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Kebijakan Privasi (Privacy Policy)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-amber-500 text-amber-500 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Syarat & Ketentuan (Terms of Service)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'disclaimer'
                ? 'border-amber-500 text-amber-500 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Penafian (Disclaimer)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Cookie className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                      Kepatuhan Kebijakan Iklan Google AdSense & Cookies Pihak Ketiga
                    </h4>
                    <p className="text-xs leading-relaxed opacity-90">
                      Situs ini menggunakan layanan Google AdSense untuk penayangan iklan. Google dan vendor pihak ketiga
                      menggunakan berkas cookie guna menayangkan iklan relevan berdasarkan kunjungan pengguna sebelumnya di situs ini
                      atau situs web lain di internet.
                    </p>
                  </div>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
                  <span>1. Pengantar & Komitmen Privasi</span>
                </h3>
                <p>
                  Selamat datang di <strong>Beekoding</strong> (dapat diakses melalui{' '}
                  <code className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-xs">
                    https://beekoding.id
                  </code>{' '}
                  dan{' '}
                  <code className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-xs">
                    https://beekoding.pages.dev
                  </code>
                  ). Kami sangat menghargai privasi siswa, wali murid, dan pengunjung situs web kami. Dokumen Kebijakan Privasi ini
                  menguraikan jenis informasi yang kami kumpulkan, cara kami mencatatnya, serta hak Anda atas data tersebut sesuai
                  dengan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022) di Indonesia dan standar perlindungan anak
                  internasional.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
                  <span>2. Penggunaan Cookie & Google AdSense</span>
                </h3>
                <p>
                  Seperti situs web profesional pada umumnya, Beekoding menggunakan <em>cookies</em>. Berkas cookie ini digunakan
                  untuk menyimpan preferensi pengunjung, sesi interaktif, dan halaman yang diakses pengunjung guna mengoptimalkan
                  pengalaman pengguna.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>
                    <strong>Google sebagai Vendor Pihak Ketiga:</strong> Google menggunakan cookie (seperti cookie DoubleClick /
                    cookie periklanan Google) untuk menayangkan iklan kepada pengguna kami berdasarkan kunjungan mereka ke Beekoding
                    dan situs lainnya di internet.
                  </li>
                  <li>
                    <strong>Pengaturan Iklan yang Dipersonalisasi:</strong> Pengguna dapat memilih untuk menonaktifkan iklan yang
                    dipersonalisasi kapan saja dengan mengunjungi{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 underline font-semibold inline-flex items-center gap-0.5"
                    >
                      Google Ads Settings <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    Pengguna juga dapat memilih keluar dari penggunaan cookie vendor pihak ketiga untuk iklan berbasis minat dengan
                    mengunjungi situs konsorsium{' '}
                    <a
                      href="http://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 underline font-semibold inline-flex items-center gap-0.5"
                    >
                      www.aboutads.info <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
                  <span>3. Informasi yang Kami Kumpulkan</span>
                </h3>
                <p>
                  Kami hanya mengumpulkan data yang diberikan secara sukarela oleh orang tua atau calon siswa untuk kepentingan
                  akademik dan konsultasi:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                  <li>Nama orang tua/wali dan nama siswa saat mengisi formulir konsultasi atau pendaftaran bootcamp.</li>
                  <li>Nomor WhatsApp dan email aktif untuk konfirmasi jadwal kelas uji coba (*Free Trial Class*).</li>
                  <li>Jawaban kuesioner Tes Minat & Bakat Digital untuk menghasilkan laporan rekomendasi peminatan koding.</li>
                  <li>
                    Berkas log standar (alamat IP, jenis peramban, Internet Service Provider, stempel waktu, dan halaman rujukan)
                    yang diolah murni untuk analisis statistik performa situs tanpa mengidentifikasi individu secara langsung.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
                  <span>4. Perlindungan Privasi Anak-Anak (Children's Online Privacy)</span>
                </h3>
                <p>
                  Sebagai platform edukasi koding anak dan remaja usia 6–18 tahun, kami memprioritaskan keamanan anak di ruang digital:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                  <li>Kami tidak pernah meminta data sensitif anak tanpa persetujuan dan pendampingan orang tua/wali murid.</li>
                  <li>Portal Siswa Beekoding dienkripsi dan hanya dapat diakses melalui verifikasi token/identitas terdaftar.</li>
                  <li>
                    Jika orang tua meyakini bahwa anak Anda telah memberikan informasi pribadi tanpa persetujuan, silakan hubungi kami
                    segera agar kami dapat menghapus data tersebut dari catatan kami dalam kurun waktu 1x24 jam.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500 flex items-center gap-2">
                  <span>5. Kontak Petugas Perlindungan Data</span>
                </h3>
                <p>
                  Jika Anda memiliki pertanyaan seputar Kebijakan Privasi ini, silakan hubungi tim kami melalui:
                </p>
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 space-y-1 text-xs font-mono">
                  <div>📧 Email: halo@beekoding.id / beekoding.id@gmail.com</div>
                  <div>📱 WhatsApp: +62 822-7901-7890</div>
                  <div>🏢 Alamat: Beekoding Learning Hub, Indonesia</div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">1. Persetujuan Syarat Layanan</h3>
                <p>
                  Dengan mengakses dan menggunakan situs web Beekoding, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan
                  Layanan ini, semua peraturan perundang-undangan yang berlaku di Republik Indonesia, dan bertanggung jawab atas
                  kepatuhan terhadap hukum setempat yang berlaku.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">2. Hak Kekayaan Intelektual (Hak Cipta)</h3>
                <p>
                  Semua materi di situs ini, termasuk namun tidak terbatas pada artikel blog edukasi, kurikulum pembelajaran, modul
                  Scratch, materi Python, grafis maskot Bee, logo Beekoding, antarmuka portal siswa, serta kode perangkat lunak,
                  adalah hak milik intelektual resmi dari <strong>Beekoding</strong> dan dilindungi oleh undang-undang hak cipta.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                  <li>Anda diizinkan membagikan tautan artikel blog untuk tujuan edukasi non-komersial dengan menyertakan kredit sumber.</li>
                  <li>Dilarang menyalin, menduplikasi, menjual, atau mengeksploitasi materi kurikulum kami untuk kepentingan komersial pihak ketiga tanpa izin tertulis.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">3. Ketentuan Pendaftaran Kelas & Konsultasi</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Sesi *Free Trial Class* diberikan satu kali per calon siswa baru untuk penyesuaian kurikulum dan evaluasi awal mentor.</li>
                  <li>Pendaftaran bootcamp atau kelas intensif tunduk pada konfirmasi ketersediaan jadwal instruktur dan kuota kelas demi menjaga rasio belajar optimal.</li>
                  <li>Sertifikat kelulusan digital diterbitkan secara resmi dengan nomor registrasi unik setelah siswa menyelesaikan minimal 80% proyek kurikulum.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">4. Perubahan Syarat Layanan</h3>
                <p>
                  Beekoding berhak merevisi syarat layanan ini kapan saja tanpa pemberitahuan sebelumnya. Dengan tetap menggunakan situs web ini, Anda setuju untuk terikat oleh versi Syarat dan Ketentuan Layanan yang sedang berlaku pada saat itu.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">1. Penafian Konten Edukasi</h3>
                <p>
                  Seluruh informasi dan materi yang dipublikasikan di blog dan situs web Beekoding disajikan dengan itikad baik dan semata-mata untuk tujuan pemberian informasi umum serta edukasi computational thinking anak dan remaja.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">2. Hasil Belajar & Kecepatan Penguasaan</h3>
                <p>
                  Setiap anak memiliki modalitas belajar, kecepatan pemahaman, dan minat yang unik. Contoh proyek, studi kasus coding, dan ilustrasi portofolio yang ditampilkan di situs web kami adalah representasi pencapaian siswa yang telah dibimbing. Kami tidak menjamin bahwa setiap siswa akan mencapai kecepatan atau portofolio yang identik tanpa komitmen belajar dan bimbingan yang konsisten.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">3. Penafian Tautan Pihak Ketiga & Sponsor</h3>
                <p>
                  Situs web kami mungkin menyertakan tautan menuju situs eksternal atau unit iklan dari mitra terverifikasi (seperti Google AdSense). Meskipun kami berupaya hanya menyediakan tautan berkualitas dan etis, kami tidak memiliki kendali atas konten, kebijakan, atau praktik situs pihak ketiga tersebut. Kami menyarankan pengguna untuk membaca kebijakan privasi masing-masing situs yang dikunjungi.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-amber-500">4. Kemitraan & Merek Dagang</h3>
                <p>
                  Nama merek atau produk pihak ketiga yang disebutkan di artikel edukasi kami (seperti Scratch oleh MIT Media Lab, Roblox oleh Roblox Corp, Python Software Foundation, Minecraft, dll.) adalah merek dagang terdaftar milik masing-masing pemiliknya. Penyebutan nama-nama tersebut murni bersifat edukatif untuk menjelaskan platform coding yang digunakan dalam proses belajar.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t text-xs ${
            isDark ? 'border-slate-800 bg-[#121727]' : 'border-amber-100 bg-[#fffdfa]'
          }`}
        >
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Terakhir diperbarui: 7 Oktober 2026 • Versi Dokumen 2.1</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline font-bold text-xs flex items-center gap-1"
            >
              <span>Verifikasi ads.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors cursor-pointer"
            >
              Saya Mengerti & Setuju
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
