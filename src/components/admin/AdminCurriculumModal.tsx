import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Clock,
  Target,
  GraduationCap,
  Layers,
  MessageSquare,
} from 'lucide-react';
import type { LessonSession, CurriculumTier } from '../../services/adminStorage';

interface AdminCurriculumModalProps {
  isOpen: boolean;
  tier: CurriculumTier;
  sessions: LessonSession[];
  onClose: () => void;
  isDark?: boolean;
}

const TIER_META: Record<
  CurriculumTier,
  {
    title: string;
    subtitle: string;
    ageRange: string;
    focusArea: string;
    colorBadge: string;
    accentColor: string;
  }
> = {
  junior: {
    title: 'Junior Explorer: Scratch 3.0 & Creative Logic',
    subtitle: 'Program Dasar Logika Algoritma & Animasi Game 2D untuk Anak Usia Dini',
    ageRange: '6 – 9 Tahun (SD Kelas 1–3)',
    focusArea: 'Computational Thinking, Sequenced Logic, Loops, Events & Game Mechanics',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    accentColor: '#f59e0b',
  },
  middle: {
    title: 'Middle Coder: Python Basics & Roblox Studio 3D',
    subtitle: 'Transisi Kode Teks & Perancangan Lingkungan Virtual 3D Lua',
    ageRange: '10 – 12 Tahun (SD Kelas 4–6 / SMP Kelas 7)',
    focusArea: 'Syntax Programming, Variables, Conditionals, 3D Coordinates & Lua Scripting',
    colorBadge: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    accentColor: '#3b82f6',
  },
  teens: {
    title: 'Teens Innovator: Modern Fullstack Web & AI Engineering',
    subtitle: 'Spesialisasi Frontend Modern, API Cloud, dan Integrasi Artificial Intelligence',
    ageRange: '13 – 17 Tahun (SMP – SMA / SMK)',
    focusArea: 'HTML5/CSS3, Modern JavaScript, React.js, Tailwind, Prompt AI & Cloud Deploy',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    accentColor: '#8b5cf6',
  },
};

export const AdminCurriculumModal: React.FC<AdminCurriculumModalProps> = ({
  isOpen,
  tier,
  sessions,
  onClose,
  isDark = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [waPhone, setWaPhone] = useState('');
  const [showWaInput, setShowWaInput] = useState(false);

  if (!isOpen) return null;

  const meta = TIER_META[tier];
  const sortedSessions = [...sessions].sort((a, b) => a.sessionNumber - b.sessionNumber);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const lines = [
      `*SILABUS PEMBELAJARAN BEEKODING*`,
      `*${meta.title}*`,
      `Jenjang: ${meta.ageRange}`,
      `Fokus: ${meta.focusArea}`,
      `Total: ${sortedSessions.length} Sesi Pertemuan (masing-masing 90 menit)`,
      ``,
      `*ROADMAP 12 PERTEMUAN:*`,
      ...sortedSessions.map(
        (s) =>
          `• *Sesi ${s.sessionNumber}: ${s.title}*\n  - Konsep: ${s.coreConcepts.join(', ')}\n  - Output Proyek: ${s.projectOutcome}`
      ),
      ``,
      `Informasi Pendaftaran & Jadwal Batch:`,
      `WhatsApp: +62 822-1234-5678 | Website: https://beekoding.id`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWA = () => {
    if (!waPhone.trim()) return;
    const cleanPhone = waPhone.replace(/\D/g, '');
    const normalizedPhone = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.substring(1)
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : '62' + cleanPhone;

    const message = `Halo Bapak/Ibu! 👋\n\nBerikut kami lampirkan *Silabus Resmi Pembelajaran BeeKoding* untuk jenjang *${meta.title}* (${meta.ageRange}):\n\n${sortedSessions
      .map(
        (s) =>
          `📌 *Sesi ${s.sessionNumber}:* ${s.title}\n🎯 *Output:* ${s.projectOutcome}`
      )
      .join('\n\n')}\n\nFasilitas mencakup: Slide presentasi, starter code, lembar kerja siswa, rekaman kelas, dan sertifikat resmi kelulusan.\n\nAda pertanyaan lebih lanjut mengenai kurikulum ini? Kami siap membantu! 😊`;

    const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowWaInput(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div
        className={`relative w-full max-w-4xl my-auto rounded-2xl shadow-2xl overflow-hidden transition-all print:shadow-none print:max-w-none print:w-full ${
          isDark ? 'bg-slate-900 border border-slate-700 text-slate-100' : 'bg-white border border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Action Bar (Hidden when printing) */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b print:hidden ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50/70 border-amber-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Pratinjau Silabus Kurikulum Resmi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dokumen kurikulum siap cetak & bagikan ke orang tua murid
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowWaInput(!showWaInput)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 shadow-sm transition-all"
              title="Kirim ke WhatsApp Orang Tua"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kirim ke WA</span>
            </button>

            <button
              onClick={handleCopySummary}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-900 flex items-center space-x-1.5 shadow-sm transition-all font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ${
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Inline Sender Box */}
        {showWaInput && (
          <div
            className={`px-6 py-3 border-b flex flex-wrap items-center gap-2 print:hidden ${
              isDark ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Kirim ringkasan silabus ke WhatsApp:
            </span>
            <input
              type="text"
              placeholder="08123456789 atau 628..."
              value={waPhone}
              onChange={(e) => setWaPhone(e.target.value)}
              className="px-3 py-1 text-xs rounded-md border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-48"
            />
            <button
              onClick={handleSendWA}
              disabled={!waPhone.trim()}
              className="px-3 py-1 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-colors"
            >
              Buka WhatsApp
            </button>
            <button
              onClick={() => setShowWaInput(false)}
              className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Batal
            </button>
          </div>
        )}

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto print:max-h-none print:p-6 print:text-black">
          {/* Document Header with Logo */}
          <div className="border-b-2 border-amber-500 pb-5 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-sm">
                  🐝
                </div>
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black">
                    BEEKODING ACADEMY
                  </h1>
                  <p className="text-xs font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase print:text-amber-800">
                    Syllabus & Curriculum Learning Roadmap
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600">
                    PT BeeKoding Edukasi Nusantara • www.beekoding.id • info@beekoding.id
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${meta.colorBadge}`}
                >
                  {tier.toUpperCase()} TIER
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Revisi: September 2026</p>
              </div>
            </div>
          </div>

          {/* Program Overview Banner */}
          <div
            className={`p-4 rounded-xl border mb-6 ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            } print:bg-slate-50 print:border-slate-300`}
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white print:text-black mb-1">
              {meta.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-700 mb-3">
              {meta.subtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Sasaran Usia</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                    {meta.ageRange}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Durasi Kursus</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                    12 Pertemuan @ 90 Menit
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Metode Belajar</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                    Project-Based Learning
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Output Akhir</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                    Showcase Portofolio & Piagam
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Sessions Breakdown Table / Cards */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Rincian 12 Pertemuan Pembelajaran</span>
            </h3>

            <div className="space-y-3">
              {sortedSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDark
                      ? 'bg-slate-800/40 border-slate-700/80'
                      : 'bg-white border-slate-200'
                  } print:border-slate-300 print:bg-transparent print:p-2.5 print:break-inside-avoid`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-300/40 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        #{session.sessionNumber}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                          {session.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-700 mt-0.5">
                          {session.description}
                        </p>

                        {/* Core Concepts */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Konsep:</span>
                          {session.coreConcepts.map((concept, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 print:border-slate-300"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          session.difficulty === 'beginner'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            : session.difficulty === 'intermediate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                        }`}
                      >
                        {session.difficulty === 'beginner'
                          ? 'Dasar'
                          : session.difficulty === 'intermediate'
                          ? 'Menengah'
                          : 'Mahir'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{session.durationMinutes} menit</div>
                    </div>
                  </div>

                  {/* Project Outcome & Homework */}
                  <div
                    className={`mt-2.5 pt-2.5 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
                      isDark ? 'border-slate-700/60' : 'border-slate-100'
                    } print:border-slate-200`}
                  >
                    <div className="flex items-start space-x-1.5 text-amber-800 dark:text-amber-300">
                      <Target className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                      <div>
                        <span className="font-bold text-[11px]">Output Proyek: </span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-200 print:text-slate-800 font-medium">
                          {session.projectOutcome}
                        </span>
                      </div>
                    </div>

                    {session.homeworkTask && (
                      <div className="flex items-start space-x-1.5 text-blue-800 dark:text-blue-300">
                        <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                        <div>
                          <span className="font-bold text-[11px]">Tantangan Mandiri: </span>
                          <span className="text-[11px] text-slate-700 dark:text-slate-200 print:text-slate-800 font-medium">
                            {session.homeworkTask}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Certification Footer */}
          <div className="border-t-2 border-slate-200 dark:border-slate-700 pt-6 mt-6 print:border-slate-300">
            <div className="grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <p className="text-slate-500 mb-10">Diverifikasi & Disusun Oleh:</p>
                <div className="font-bold text-slate-900 dark:text-white print:text-black">
                  Febri Hasan, S.Kom., M.T.
                </div>
                <div className="text-[11px] text-slate-500">Founder & Chief Learning Officer</div>
                <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                  PT BeeKoding Edukasi Nusantara
                </div>
              </div>

              <div>
                <p className="text-slate-500 mb-10">Ditinjau oleh Dewan Kurikulum:</p>
                <div className="font-bold text-slate-900 dark:text-white print:text-black">
                  Dr. Ir. Hendra Wijaya
                </div>
                <div className="text-[11px] text-slate-500">Academic Board & AI Educator Advisor</div>
                <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                  Bandung Digital Valley
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-[11px] text-slate-400 print:text-slate-500">
              Dokumen kurikulum ini dilindungi hak cipta © 2026 BeeKoding Academy. Seluruh materi
              disesuaikan dengan standar CSTA K-12 Computer Science Standards.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
