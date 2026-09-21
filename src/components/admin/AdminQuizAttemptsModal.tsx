import React, { useState, useMemo } from 'react';
import {
  type QuizExam,
  type QuizAttempt,
  exportQuizAttemptsCSV,
} from '../../services/adminStorage';
import {
  X,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Eye,
  Award,
  Calendar,
  Phone,
} from 'lucide-react';

interface AdminQuizAttemptsModalProps {
  quiz: QuizExam | null; // filter to specific quiz, or all if null
  attempts: QuizAttempt[];
  isDark: boolean;
  onClose: () => void;
}

export const AdminQuizAttemptsModal: React.FC<AdminQuizAttemptsModalProps> = ({
  quiz,
  attempts,
  isDark,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPassed, setFilterPassed] = useState<'all' | 'passed' | 'failed'>('all');
  const [inspectAttempt, setInspectAttempt] = useState<QuizAttempt | null>(null);

  // Filter attempts
  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      // If quiz is specified, filter by quizId
      if (quiz && a.quizId !== quiz.id) return false;

      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        a.studentName.toLowerCase().includes(q) ||
        a.studentPhone.includes(q) ||
        a.quizTitle.toLowerCase().includes(q);

      // Status
      const matchPassed =
        filterPassed === 'all' ||
        (filterPassed === 'passed' && a.passed) ||
        (filterPassed === 'failed' && !a.passed);

      return matchSearch && matchPassed;
    });
  }, [attempts, quiz, searchQuery, filterPassed]);

  // Statistics
  const totalAttempts = filteredAttempts.length;
  const passedCount = filteredAttempts.filter((a) => a.passed).length;
  const avgScore =
    totalAttempts > 0
      ? Math.round(
          filteredAttempts.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts
        )
      : 0;
  const passRate = totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0;

  const handleExportCSV = () => {
    exportQuizAttemptsCSV(filteredAttempts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isDark ? 'bg-[#111420] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#161a2b]' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-['Space_Grotesk']">
                {quiz ? `Rekap Nilai Siswa: ${quiz.title}` : 'Semua Riwayat Pengerjaan Kuis Siswa'}
              </h3>
              <p className="text-xs text-slate-400">
                Laporan nilai capaian ujian, persentase kelulusan, dan audit perolehan Bee-XP.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Mini KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6 pb-2">
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Pengerjaan
            </span>
            <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
              {totalAttempts}
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Siswa Lulus
            </span>
            <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-500 mt-1">
              {passedCount}
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Rata-rata Skor
            </span>
            <div className="text-2xl font-black font-['Space_Grotesk'] text-blue-500 mt-1">
              {avgScore} / 100
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Tingkat Kelulusan
            </span>
            <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-500 mt-1">
              {passRate}%
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari siswa atau nomor WhatsApp..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterPassed}
              onChange={(e) => setFilterPassed(e.target.value as any)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">Semua Status</option>
              <option value="passed">Hanya Lulus</option>
              <option value="failed">Belum Lulus</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {filteredAttempts.length === 0 ? (
            <div
              className={`p-10 text-center rounded-2xl border ${
                isDark ? 'bg-slate-900/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
              <p className="text-sm font-semibold">Belum ada rekaman nilai pengerjaan yang cocok.</p>
              <p className="text-xs text-slate-400 mt-1">
                Siswa dapat mengerjakan kuis secara mandiri melalui Portal Mandiri Siswa.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead
                  className={`uppercase font-bold tracking-wider ${
                    isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <tr>
                    <th className="py-3 px-4">Nama Siswa</th>
                    <th className="py-3 px-4">No. WhatsApp</th>
                    <th className="py-3 px-4">Kuis</th>
                    <th className="py-3 px-4">Waktu Selesai</th>
                    <th className="py-3 px-4 text-center">Skor</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Reward</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? 'divide-slate-800/60 bg-[#121624]' : 'divide-slate-200 bg-white'
                  }`}
                >
                  {filteredAttempts.map((att) => (
                    <tr
                      key={att.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {att.studentName}
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{att.studentPhone}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {att.quizTitle}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {new Date(att.completedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-black text-sm">
                        <span
                          className={
                            att.passed
                              ? 'text-emerald-500'
                              : 'text-rose-500'
                          }
                        >
                          {att.score}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {' '}({att.correctAnswers}/{att.totalQuestions})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {att.passed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Lulus</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            <span>Coba Lagi</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          <Sparkles className="w-3 h-3" />
                          <span>+{att.xpEarned} XP</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setInspectAttempt(att)}
                          className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="Lihat Lembar Jawaban Siswa"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between text-xs ${
            isDark ? 'border-slate-800 bg-[#161a2b] text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          <span>Menampilkan {filteredAttempts.length} data percobaan pengerjaan</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Mini Modal Detail Lembar Jawaban Siswa */}
      {inspectAttempt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-4 ${
              isDark ? 'bg-[#111420] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base font-['Space_Grotesk']">
                  Lembar Evaluasi Jawaban
                </h4>
                <p className="text-xs text-slate-400">
                  {inspectAttempt.studentName} &bull; {inspectAttempt.quizTitle}
                </p>
              </div>
              <button
                onClick={() => setInspectAttempt(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] text-slate-400 block">Skor</span>
                <span className="text-xl font-black text-amber-500">{inspectAttempt.score}</span>
              </div>
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] text-slate-400 block">Benar</span>
                <span className="text-xl font-black text-emerald-500">{inspectAttempt.correctAnswers} / {inspectAttempt.totalQuestions}</span>
              </div>
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] text-slate-400 block">Reward XP</span>
                <span className="text-xl font-black text-purple-500">+{inspectAttempt.xpEarned}</span>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rekaman Pilihan Jawaban:
              </h5>
              {Object.entries(inspectAttempt.answers).map(([qId, selectedIdx], i) => (
                <div
                  key={qId}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="font-semibold text-slate-300">Soal #{i + 1}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-500 font-bold">
                    Opsi Pilihan: {String.fromCharCode(65 + Number(selectedIdx))}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setInspectAttempt(null)}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
