import React, { useState } from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { saveInquiry } from '../services/adminStorage';
import {
  Sparkles,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Send,
  Building,
  User,
  ExternalLink,
} from 'lucide-react';

interface ContactProps {
  selectedProgram?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedProgram = '' }) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Orang Tua',
    program: selectedProgram || 'Summer AI & Coding Bootcamp 2026',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      saveInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        program: formData.program,
        message: formData.message,
        type: formData.program.toLowerCase().includes('bootcamp') ? 'pendaftaran' : 'konsultasi',
      });
    } catch (err) {
      console.error('Failed to auto-save inquiry to admin storage:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0a0c12] border-amber-500/20' : 'bg-[#f4efe4] border-amber-300/50'
      }`}
    >
      {/* Background glow in honey yellow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
              isDark
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pendaftaran & Konsultasi</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Masa Depan Tidak Menunggu.{' '}
            <span className="text-gradient-honey">Mulai Langkah Hari Ini!</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kecerdasan Buatan dan otomasi tengah mentransformasi berbagai bidang.
            Coding dan computational thinking adalah literasi baru abad ini.
          </p>
          <p
            className={`text-lg sm:text-xl font-bold italic font-['Space_Grotesk'] ${
              isDark ? 'text-amber-300' : 'text-amber-700'
            }`}
          >
            Apakah buah hati atau sekolah Anda sudah siap menyambutnya?
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contact & Mascot Hint */}
          <div className="lg:col-span-5 space-y-6">
            {/* Friendly Mascot Consultation Box */}
            <div
              className={`p-6 rounded-3xl border flex items-center gap-4 shadow-xl transition-colors ${
                isDark
                  ? 'bg-gradient-to-br from-[#1c2234] to-[#121622] border-amber-500/30'
                  : 'bg-white border-amber-300 shadow-amber-900/5'
              }`}
            >
              <img
                src="/bee-mascot.png"
                alt="Bee Mascot"
                className="w-16 h-16 object-contain flex-shrink-0"
              />
              <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Bingung Pilih Program?
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Konsultasikan minat dan usia anak Anda langsung dengan tim konselor Beekoding via WhatsApp!
                </p>
              </div>
            </div>

            <div
              className={`p-7 rounded-3xl border space-y-6 backdrop-blur-md shadow-xl transition-colors ${
                isDark
                  ? 'bg-[#131724]/90 border-amber-500/20'
                  : 'bg-white border-amber-200 shadow-amber-900/5'
              }`}
            >
              <h3 className={`text-xl font-bold font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Saluran Komunikasi Cepat
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Hubungi tim akademik Beekoding untuk pendaftaran privat, kelas batch terdekat, atau undangan roadshow sekolah.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Card */}
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors group ${
                    isDark
                      ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-emerald-50 border-emerald-300 hover:border-emerald-500'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/30 transition-colors flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-600 font-bold block">WhatsApp Instan</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className={`text-sm font-bold transition-colors ${isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                      Chat Langsung via WhatsApp
                    </span>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors group ${
                    isDark
                      ? 'bg-[#0e111a] border-slate-800 hover:border-amber-400/50'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/25 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Telepon Layanan & WhatsApp</span>
                    <span className={`text-sm font-bold transition-colors ${isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'}`}>
                      {siteConfig.phoneDisplay}
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors group ${
                    isDark
                      ? 'bg-[#0e111a] border-slate-800 hover:border-amber-400/50'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/25 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Email Resmi</span>
                    <span className={`text-sm font-bold transition-colors ${isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'}`}>
                      {siteConfig.email}
                    </span>
                  </div>
                </a>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs ${isDark ? 'bg-[#1a1f30]/60 border-slate-800 text-slate-300' : 'bg-amber-50/70 border-amber-200 text-slate-600'}`}>
                <Building className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Melayani kelas tatap muka, daring interaktif, dan program in-school di seluruh kota.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 sm:p-10 rounded-3xl border-2 backdrop-blur-xl shadow-2xl transition-colors ${
                isDark
                  ? 'bg-[#131724]/95 border-amber-500/30'
                  : 'bg-white border-amber-300/80 shadow-amber-900/10'
              }`}
            >
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Terima Kasih atas Minat Anda!
                  </h3>
                  <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Data Anda untuk program <strong>{formData.program}</strong> telah kami terima. Tim konselor Beekoding akan segera menghubungi Anda melalui nomor <strong>{formData.phone || formData.email}</strong>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          role: 'Orang Tua',
                          program: 'Summer AI & Coding Bootcamp 2026',
                          message: '',
                        });
                      }}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold transition-colors ${
                        isDark ? 'bg-[#1e2436] hover:bg-[#28314a] text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      Kirim Pertanyaan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className={`text-xl font-bold font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Formulir Konsultasi & Pendaftaran
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Silakan lengkapi formulir singkat ini. Konselor kami akan memandu informasi jadwal, biaya, dan silabus.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Nama Lengkap <span className="text-amber-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="contoh: Budi Santoso"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                            isDark
                              ? 'bg-[#0c0f16] border-amber-500/20 text-white placeholder-slate-500'
                              : 'bg-amber-50/40 border-amber-300 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Alamat Email <span className="text-amber-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@email.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                            isDark
                              ? 'bg-[#0c0f16] border-amber-500/20 text-white placeholder-slate-500'
                              : 'bg-amber-50/40 border-amber-300 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Nomor WhatsApp Aktif <span className="text-amber-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0853-xxxx-xxxx"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                            isDark
                              ? 'bg-[#0c0f16] border-amber-500/20 text-white placeholder-slate-500'
                              : 'bg-amber-50/40 border-amber-300 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Status Anda <span className="text-amber-500">*</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                          isDark
                            ? 'bg-[#0c0f16] border-amber-500/20 text-white'
                            : 'bg-amber-50/40 border-amber-300 text-slate-900'
                        }`}
                      >
                        <option value="Orang Tua">Orang Tua Murid</option>
                        <option value="Siswa">Siswa / Pelajar</option>
                        <option value="Kepala Sekolah">Kepala Sekolah / Yayasan</option>
                        <option value="Guru">Guru / Pendidik</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="Mitra Lainnya">Lembaga / Mitra Lainnya</option>
                      </select>
                    </div>
                  </div>

                  {/* Program of Interest */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Pilihan Program <span className="text-amber-500">*</span>
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                        isDark
                          ? 'bg-[#0c0f16] border-amber-500/20 text-white'
                          : 'bg-amber-50/40 border-amber-300 text-slate-900'
                      }`}
                    >
                      <option value="Summer AI & Coding Bootcamp 2026">Summer AI & Coding Bootcamp 2026 (Grade 4–10)</option>
                      <option value="Beekoding AI & Tech Academy">Beekoding AI & Tech Academy (Reguler / Semester)</option>
                      <option value="Mobile Planetarium & Space Tech Drive">Mobile Planetarium & Space Tech Drive (Kunjungan Sekolah)</option>
                      <option value="21st Century Skills & Creative Lab">21st Century Skills & Creative Lab</option>
                      <option value="Robotics & IoT Day">Robotics & IoT Day (Workshop 1 Hari)</option>
                      <option value="Virtual Reality (VR) 360° Studio">Virtual Reality (VR) 360° Studio</option>
                      <option value="Teachers' AI & Tech Training">Teachers' AI & Tech Training (Pelatihan Guru)</option>
                      <option value="School Tech Transformation Partner">School Tech Transformation Partner (Kemitraan Sekolah)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Pesan Tambahan / Usia Anak (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan jenjang kelas anak, jadwal yang diinginkan, atau pertanyaan lainnya..."
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none ${
                        isDark
                          ? 'bg-[#0c0f16] border-amber-500/20 text-white placeholder-slate-500'
                          : 'bg-amber-50/40 border-amber-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:brightness-110 disabled:opacity-70 transition-all"
                  >
                    {isSubmitting ? (
                      <span>Mengirimkan Formulir...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Permohonan Konsultasi</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
