import React from 'react';
import {
  type AssessmentSubmission,
  exportSubmissionsCSV,
  type FollowUpStatus,
} from '../../services/adminStorage';
import {
  type AssessmentCategory,
  CATEGORIES,
  CATEGORY_ORDER,
} from '../../data/talentQuestions';
import { SchoolLevelDonutChart, PillarAnalyticsChart } from './AdminCharts';
import {
  Users,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  ArrowRight,
  Eye,
  Sparkles,
  Phone,
  PieChart,
  MessageSquare,
} from 'lucide-react';

interface AdminDashboardProps {
  submissions: AssessmentSubmission[];
  isDark: boolean;
  onViewReport: (submission: AssessmentSubmission) => void;
  onNavigateToStudents?: () => void;
  onNavigateToInquiries?: () => void;
  onNavigateToEvents?: () => void;
  onNavigateToCounseling?: () => void;
  onNavigateToBatches?: () => void;
  onNavigateToCurriculum?: () => void;
  onNavigateToResources?: () => void;
  onNavigateToInstructors?: () => void;
  onNavigateToAttendance?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToTransactions?: () => void;
  onNavigateToVouchers?: () => void;
  onNavigateToPayroll?: () => void;
  onNavigateToQuests?: () => void;
  onNavigateToCertificates?: () => void;
  onNavigateToShowcase?: () => void;
  onNavigateToTemplates?: () => void;
  onNavigateToAnnouncements?: () => void;
  onNavigateToAudit?: () => void;
  onNavigateToQuizzes?: () => void;
  onNavigateToReferrals?: () => void;
  onNavigateToQuestions?: () => void;
  inquiriesCount?: number;
  newInquiriesCount?: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  submissions,
  isDark,
  onViewReport,
  onNavigateToStudents,
  onNavigateToInquiries,
  inquiriesCount = 0,
  newInquiriesCount = 0,
}) => {
  // 1. Hitung Statistik Utama
  const totalStudents = submissions.length;
  const avgScore =
    totalStudents > 0
      ? Math.round(submissions.reduce((acc, curr) => acc + curr.totalScore, 0) / totalStudents)
      : 0;

  const newSubmissionsCount = submissions.filter((s) => s.status === 'baru').length;
  const enrolledCount = submissions.filter((s) => s.status === 'terdaftar').length;

  // 2. Distribusi Jenjang Usia
  const juniorCount = submissions.filter((s) => s.profile.tier === 'junior').length;
  const middleCount = submissions.filter((s) => s.profile.tier === 'middle').length;
  const teensCount = submissions.filter((s) => s.profile.tier === 'teens').length;

  // 3. Frekuensi Pilar Terkuat di Kalangan Siswa
  const pillarDominance: Record<string, number> = {};
  CATEGORY_ORDER.forEach((cat) => {
    pillarDominance[cat] = 0;
  });

  submissions.forEach((s) => {
    s.topStrengths.forEach((strength) => {
      if (pillarDominance[strength] !== undefined) {
        pillarDominance[strength] += 1;
      }
    });
  });

  // 4. Rata-rata Skor per Pilar
  const pillarAverageScores: Record<AssessmentCategory, number> = {
    logical: 0,
    numerical: 0,
    spatial: 0,
    pattern: 0,
    creativity: 0,
    problem_solving: 0,
    language: 0,
    persistence: 0,
  };

  if (totalStudents > 0) {
    CATEGORY_ORDER.forEach((cat) => {
      const sum = submissions.reduce((acc, curr) => acc + (curr.scores[cat] || 0), 0);
      pillarAverageScores[cat] = Math.round(sum / totalStudents);
    });
  }

  // 5. Siswa Terbaru (Maksimal 5)
  const recentSubmissions = [...submissions].slice(0, 5);

  const getStatusBadge = (status: FollowUpStatus) => {
    switch (status) {
      case 'baru':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/15 text-blue-500 border border-blue-500/30">
            Baru Masuk
          </span>
        );
      case 'dihubungi':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            Sudah Dihubungi
          </span>
        );
      case 'terdaftar':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            Terdaftar Bootcamp
          </span>
        );
      case 'selesai':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-500/15 text-slate-400 border border-slate-500/30">
            Selesai
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-[#161a29] to-[#111420] border-amber-500/20'
            : 'bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border-amber-200 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Analytics & Assessment Control</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Dashboard Pengelolaan Tes Bakat Digital
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Pantau hasil evaluasi bakat siswa dari jenjang SD, SMP, hingga SMA, tindak lanjuti pendaftaran orang tua, dan perbarui bank soal 8 pilar kecerdasan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => exportSubmissionsCSV(submissions)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Ekspor Data (CSV)</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToStudents}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Data Siswa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Siswa */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Siswa Terdata
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-blue-500">{totalStudents}</span>
            <span className="text-xs text-slate-400">anak</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Mengisi profil dan menyelesaikan asesmen
          </p>
        </div>

        {/* Rata-rata Skor */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rata-rata Skor Bakat
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-500">{avgScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Indeks kognitif dari 8 babak pilar
          </p>
        </div>

        {/* Siswa Baru Masuk */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Perlu Dihubungi
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-purple-500">
              {newSubmissionsCount}
            </span>
            <span className="text-xs text-slate-400">siswa baru</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Belum menerima follow-up tim konselor
          </p>
        </div>

        {/* Siswa Terdaftar */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Terdaftar Bootcamp
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-500">{enrolledCount}</span>
            <span className="text-xs text-slate-400">konversi</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {totalStudents > 0 ? Math.round((enrolledCount / totalStudents) * 100) : 0}% rasio konversi peserta
          </p>
        </div>
      </div>

      {/* Quick Follow-up Banner for Inquiries */}
      {onNavigateToInquiries && (
        <div
          className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
            newInquiriesCount > 0
              ? isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                : 'bg-amber-50/80 border-amber-300 text-slate-800 shadow-sm'
              : isDark
                ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                newInquiriesCount > 0
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-blue-500/10 text-blue-500'
              }`}
            >
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  Pusat Tindak Lanjut Konsultasi & Pendaftaran
                </h3>
                {newInquiriesCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-500 text-white animate-pulse">
                    {newInquiriesCount} Baru
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/15 text-slate-400">
                    Semua Terkelola
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {newInquiriesCount > 0
                  ? `Terdapat ${newInquiriesCount} pesan konsultasi dan pendaftaran masuk yang siap di-follow up via WhatsApp oleh tim konselor.`
                  : `Total ${inquiriesCount} data konsultasi dan pendaftaran tercatat dalam sistem.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateToInquiries}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              newInquiriesCount > 0
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <span>Buka Tindak Lanjut</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Analytics Rows: Level Jenjang & Dominasi Pilar (Interactive Visual Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grafik Donut: Distribusi Jenjang Usia & Sekolah (Left) */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base tracking-tight">
                    Distribusi Jenjang Sekolah & Usia
                  </h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/25">
                    Donut Chart
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Segmentasi proporsi siswa SD, SMP, dan SMA
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
            </div>

            {/* Render Donut Chart Component */}
            <div className="py-2">
              <SchoolLevelDonutChart
                juniorCount={juniorCount}
                middleCount={middleCount}
                teensCount={teensCount}
                totalStudents={totalStudents}
                isDark={isDark}
              />
            </div>
          </div>

          <div
            className={`mt-4 p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <span>Kategori paling aktif saat ini:</span>
            <span className="font-bold text-amber-500">
              {juniorCount >= middleCount && juniorCount >= teensCount
                ? 'Junior Explorer (6-9 Thn)'
                : middleCount >= teensCount
                ? 'Intermediate Coder (10-12 Thn)'
                : 'Teens Innovator (13-17 Thn)'}
            </span>
          </div>
        </div>

        {/* Grafik Batang & Radar: Pilar Bakat Paling Menonjol (Right) */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base tracking-tight">
                    Pilar Bakat Paling Menonjol
                  </h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/25">
                    Interactive Chart
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Analisis 8 pilar kecerdasan kognitif & perilaku digital
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Render Pillar Analytics Chart Component */}
            <PillarAnalyticsChart
              pillarDominance={pillarDominance}
              pillarAverageScores={pillarAverageScores}
              totalStudents={totalStudents}
              isDark={isDark}
            />
          </div>

          <div
            className={`mt-4 p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <span>Pilar tertinggi dominan:</span>
            <span className="font-bold text-amber-500">
              {Object.entries(pillarDominance).sort((a, b) => b[1] - a[1])[0]
                ? CATEGORIES[
                    Object.entries(pillarDominance).sort(
                      (a, b) => b[1] - a[1]
                    )[0][0] as AssessmentCategory
                  ]?.name || '-'
                : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabel 5 Submisi Siswa Terbaru */}
      <div
        className={`p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
              Aktivitas Siswa Terbaru Mengikuti Tes Bakat
            </h3>
            <p className="text-xs text-slate-400">
              5 siswa terakhir yang menyelesaikan diagnostic test bakat anak
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToStudents}
            className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Siswa ({totalStudents})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentSubmissions.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            Belum ada data siswa yang mengikuti tes.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="pb-3 font-bold uppercase tracking-wider">Nama Siswa</th>
                  <th className="pb-3 font-bold uppercase tracking-wider">Usia & Jenjang</th>
                  <th className="pb-3 font-bold uppercase tracking-wider">Orang Tua / WA</th>
                  <th className="pb-3 font-bold uppercase tracking-wider">Skor</th>
                  <th className="pb-3 font-bold uppercase tracking-wider">Status</th>
                  <th className="pb-3 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentSubmissions.map((sub) => {
                  const rawPhone = sub.profile.parentPhone.replace(/[^0-9]/g, '');
                  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;

                  return (
                    <tr
                      key={sub.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-sm text-amber-500">
                          {sub.profile.childName}
                        </div>
                        <span className="text-[11px] text-slate-400">{sub.completedAt}</span>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="font-medium">
                          {sub.profile.childAge} Thn • {sub.profile.gradeLevel || '-'}
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase">
                          {sub.profile.tier}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="font-medium">{sub.profile.parentName || '-'}</div>
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{sub.profile.parentPhone}</span>
                        </a>
                      </td>

                      <td className="py-3.5 pr-4">
                        <div className="font-black text-sm text-amber-500">
                          {sub.totalScore}
                          <span className="text-[10px] font-normal text-slate-400">/100</span>
                        </div>
                      </td>

                      <td className="py-3.5 pr-4">{getStatusBadge(sub.status)}</td>

                      <td className="py-3.5 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onViewReport(sub)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
