import React, { useState } from 'react';
import {
  type UserProfile,
  getTierFromAge,
  getTierLabel,
  CATEGORIES,
  CATEGORY_ORDER,
} from '../../data/talentQuestions';
import {
  Sparkles,
  ArrowRight,
  User,
  GraduationCap,
  Phone,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Brain,
} from 'lucide-react';

interface TalentOnboardingProps {
  onStart: (profile: UserProfile) => void;
  isDark: boolean;
}

export const TalentOnboarding: React.FC<TalentOnboardingProps> = ({ onStart, isDark }) => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(9);
  const [gradeLevel, setGradeLevel] = useState('Kelas 4 SD');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const currentTier = getTierFromAge(childAge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      setErrorMsg('Mohon masukkan nama panggilan atau nama lengkap ananda.');
      return;
    }
    if (!parentPhone.trim()) {
      setErrorMsg('Mohon masukkan nomor WhatsApp orang tua untuk pengiriman laporan hasil.');
      return;
    }

    setErrorMsg('');
    onStart({
      childName: childName.trim(),
      childAge,
      gradeLevel,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      tier: currentTier,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {/* Hero Title & Mascot Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diagnostic Aptitude & Digital Talent Test</span>
        </div>
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Temukan Potensi & Gaya Belajar <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Kecerdasan Digital Ananda
          </span>
        </h1>
        <p
          className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Asesmen komprehensif 8 pilar pemikiran untuk memetakan bakat logika, kreativitas,
          dan ketangguhan belajar anak, lengkap dengan radar chart dan rekomendasi kelas yang tepat.
        </p>

        {/* Highlight Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs sm:text-sm">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            8 Babak (5 Soal/Babak • Total 40 Soal)
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            Tingkat Kesulitan Adaptif Usia
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% Gratis & Laporan Konsultasi WA
          </span>
        </div>
      </div>

      {/* Grid: 8 Pilar Preview & Formulir Pendaftaran */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 8 Pilar Kemampuan Overview */}
        <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isDark
                ? 'bg-[#121520]/80 border-slate-800'
                : 'bg-white border-amber-100 shadow-xl shadow-amber-900/5'
            }`}
          >
            <h3
              className={`text-base font-bold mb-3 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>8 Pilar Kemampuan yang Diuji:</span>
            </h3>
            <div className="space-y-2.5">
              {CATEGORY_ORDER.map((catKey) => {
                const cat = CATEGORIES[catKey];
                return (
                  <div
                    key={catKey}
                    className={`p-2.5 rounded-xl border flex items-start gap-3 transition-colors ${
                      isDark
                        ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                        : 'bg-slate-50/70 border-slate-200/60 hover:border-amber-200'
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-bold ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {cat.order}. {cat.name}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {cat.shortDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Formulir Input Profil */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#151928] border-amber-500/25 shadow-2xl shadow-black/40'
                : 'bg-white border-amber-300/80 shadow-2xl shadow-amber-900/10'
            }`}
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500" />

            <div className="mb-6">
              <h2
                className={`text-xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Isi Profil Ananda Sebelum Memulai
              </h2>
              <p
                className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                Tingkat kesulitan soal akan disesuaikan secara otomatis berdasarkan usia yang dipilih.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              {/* Nama Anak */}
              <div>
                <label
                  className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Nama Panggilan / Lengkap Ananda <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Contoh: Farhan / Aurel"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* Usia Anak & Tier Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className={`text-xs font-bold ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Usia Ananda: <span className="text-amber-500 text-sm">{childAge} Tahun</span>
                  </label>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    {getTierLabel(currentTier)}
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="17"
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>6 Thn (Junior)</span>
                  <span>10 Thn (Middle)</span>
                  <span>13 Thn (Teens)</span>
                  <span>17 Thn</span>
                </div>
              </div>

              {/* Kelas / Jenjang */}
              <div>
                <label
                  className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Kelas / Jenjang Sekolah Saat Ini
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="TK / PAUD">TK / PAUD</option>
                    <option value="Kelas 1 SD">Kelas 1 SD</option>
                    <option value="Kelas 2 SD">Kelas 2 SD</option>
                    <option value="Kelas 3 SD">Kelas 3 SD</option>
                    <option value="Kelas 4 SD">Kelas 4 SD</option>
                    <option value="Kelas 5 SD">Kelas 5 SD</option>
                    <option value="Kelas 6 SD">Kelas 6 SD</option>
                    <option value="Kelas 7 SMP">Kelas 7 SMP</option>
                    <option value="Kelas 8 SMP">Kelas 8 SMP</option>
                    <option value="Kelas 9 SMP">Kelas 9 SMP</option>
                    <option value="Kelas 10 SMA/SMK">Kelas 10 SMA/SMK</option>
                    <option value="Kelas 11 SMA/SMK">Kelas 11 SMA/SMK</option>
                    <option value="Kelas 12 SMA/SMK">Kelas 12 SMA/SMK</option>
                  </select>
                </div>
              </div>

              {/* Nama Orang Tua */}
              <div>
                <label
                  className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Nama Ayah / Bunda
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Contoh: Ibu Rina"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* WhatsApp Orang Tua */}
              <div>
                <label
                  className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Nomor WhatsApp Orang Tua <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="081234567890"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Digunakan untuk konfirmasi dan mengirimkan salinan sertifikat/laporan bakat.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <span>Mulai Asesmen Bakat (Babak 1)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-3">
                🔒 Data dijaga kerahasiaannya untuk keperluan evaluasi bakat dan edukasi anak.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
