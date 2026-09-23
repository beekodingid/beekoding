import React, { useState } from 'react';
import {
  X,
  Check,
  Award,
  Sparkles,
  BookOpen,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import {
  type StudentAcademicReport,
  type AcademicCompetencyScores,
  type ReportPeriod,
  type ClassBatch,
  getBatches,
  getAttendanceRecords,
  calculateGradeAndPredicate,
  createAcademicReport,
  updateAcademicReport,
} from '../../services/adminStorage';

interface AdminAcademicReportModalProps {
  report: StudentAcademicReport | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (savedReport: StudentAcademicReport) => void;
  isDark?: boolean;
}

const COMPETENCY_FIELDS: {
  key: keyof AcademicCompetencyScores;
  label: string;
  hint: string;
}[] = [
  {
    key: 'computationalThinking',
    label: 'Logika Algoritma & Computational Thinking',
    hint: 'Sekuensial, percabangan logika, loop, dan pemahaman variabel',
  },
  {
    key: 'creativityDesign',
    label: 'Kreativitas & Desain Proyek Visual',
    hint: 'Keunikan ide karya, estetika grafis, dan kenyamanan antarmuka',
  },
  {
    key: 'problemSolving',
    label: 'Kemandirian Debugging & Problem Solving',
    hint: 'Ketekunan menelusuri bug galat dan mencari solusi alternatif',
  },
  {
    key: 'codeMastery',
    label: 'Penguasaan Sintaks & Penggunaan Alat',
    hint: 'Navigasi software, penulisan kode/blok visual, dan struktur file',
  },
  {
    key: 'teamworkAttitude',
    label: 'Sikap Belajar, Keaktifan & Kolaborasi',
    hint: 'Kedisiplinan, keaktifan bertanya di kelas, dan etika diskusi',
  },
];

export const AdminAcademicReportModal: React.FC<AdminAcademicReportModalProps> = ({
  report,
  isOpen,
  onClose,
  onSaved,
  isDark = false,
}) => {
  const [batches] = useState<ClassBatch[]>(() => getBatches());
  const [attendanceList] = useState(() => getAttendanceRecords());

  const defaultBatch = batches[0];
  const initialResolvedTier = report
    ? report.tier
    : defaultBatch
    ? defaultBatch.tier === 'all'
      ? 'junior'
      : defaultBatch.tier
    : 'junior';

  // Helper to compute attendance rate for student
  const computeStudentAttendance = (bId: string, sId: string): number => {
    const relevantSessions = attendanceList.filter((a) => a.batchId === bId);
    if (relevantSessions.length === 0) return 100.0;

    let presentOrLate = 0;
    let totalMonitored = 0;

    relevantSessions.forEach((sess) => {
      const match = sess.students.find((s) => s.studentId === sId);
      if (match) {
        totalMonitored++;
        if (match.status === 'present' || match.status === 'late') {
          presentOrLate++;
        }
      }
    });

    if (totalMonitored === 0) return 100.0;
    return Number(((presentOrLate / totalMonitored) * 100).toFixed(1));
  };

  // State Form initialization
  const [selectedBatchId, setSelectedBatchId] = useState<string>(() => {
    if (report) return report.batchId;
    return defaultBatch ? defaultBatch.id : '';
  });

  const [batchName, setBatchName] = useState<string>(() => {
    if (report) return report.batchName;
    return defaultBatch ? defaultBatch.name : '';
  });

  const [tier, setTier] = useState<'junior' | 'middle' | 'teens'>(() => initialResolvedTier);

  const [studentId, setStudentId] = useState<string>(() => {
    if (report) return report.studentId;
    return defaultBatch?.enrolledStudents?.[0]?.id || 'stud-001';
  });

  const [studentName, setStudentName] = useState<string>(() => {
    if (report) return report.studentName;
    return defaultBatch?.enrolledStudents?.[0]?.studentName || '';
  });

  const [parentName, setParentName] = useState<string>(() => {
    if (report) return report.parentName;
    return defaultBatch?.enrolledStudents?.[0]?.parentName || '';
  });

  const [parentPhone, setParentPhone] = useState<string>(() => {
    if (report) return report.parentPhone;
    return defaultBatch?.enrolledStudents?.[0]?.parentPhone || '';
  });

  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>(() => {
    if (report) return report.reportPeriod;
    return 'final_term';
  });

  const [attendanceRate, setAttendanceRate] = useState<number>(() => {
    if (report) return report.attendanceRate;
    if (defaultBatch?.enrolledStudents?.[0]) {
      return computeStudentAttendance(defaultBatch.id, defaultBatch.enrolledStudents[0].id);
    }
    return 100.0;
  });

  const [scores, setScores] = useState<AcademicCompetencyScores>(() => {
    if (report) return report.scores;
    return {
      computationalThinking: 90,
      creativityDesign: 92,
      problemSolving: 88,
      codeMastery: 90,
      teamworkAttitude: 92,
    };
  });

  const [capstoneProjectTitle, setCapstoneProjectTitle] = useState<string>(() => {
    if (report) return report.capstoneProjectTitle;
    return '';
  });

  const [capstoneProjectDesc, setCapstoneProjectDesc] = useState<string>(() => {
    if (report) return report.capstoneProjectDesc;
    return '';
  });

  const [instructorNotes, setInstructorNotes] = useState<string>(() => {
    if (report) return report.instructorNotes;
    return '';
  });

  const [nextStepRecommendation, setNextStepRecommendation] = useState<string>(() => {
    if (report) return report.nextStepRecommendation;
    return '';
  });

  const [instructorName, setInstructorName] = useState<string>(() => {
    if (report) return report.instructorName;
    return defaultBatch?.instructorName || 'Sarah Amalia, S.T.';
  });

  const [issueDate, setIssueDate] = useState<string>(() => {
    if (report) return report.issueDate;
    return new Date().toISOString().split('T')[0];
  });

  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  // Selected batch object
  const currentBatch = batches.find((b) => b.id === selectedBatchId) || defaultBatch;

  // Handle Batch Change
  const handleBatchChange = (newBatchId: string) => {
    setSelectedBatchId(newBatchId);
    const chosen = batches.find((b) => b.id === newBatchId);
    if (!chosen) return;

    setBatchName(chosen.name);
    const resolvedTier = chosen.tier === 'all' ? 'junior' : chosen.tier;
    setTier(resolvedTier);
    if (chosen.instructorName) {
      setInstructorName(chosen.instructorName);
    }

    // Auto-select first student
    const firstStu = chosen.enrolledStudents?.[0];
    if (firstStu) {
      setStudentId(firstStu.id);
      setStudentName(firstStu.studentName);
      setParentName(firstStu.parentName || '');
      setParentPhone(firstStu.parentPhone || '');
      const computed = computeStudentAttendance(chosen.id, firstStu.id);
      setAttendanceRate(computed);
    } else {
      setStudentId('');
      setStudentName('');
      setParentName('');
      setParentPhone('');
      setAttendanceRate(100);
    }
  };

  // Handle Student Change
  const handleStudentChange = (newStudentId: string) => {
    setStudentId(newStudentId);
    const stu = currentBatch?.enrolledStudents?.find((s) => s.id === newStudentId);
    if (stu) {
      setStudentName(stu.studentName);
      setParentName(stu.parentName || '');
      setParentPhone(stu.parentPhone || '');
      const computed = computeStudentAttendance(selectedBatchId, stu.id);
      setAttendanceRate(computed);
    }
  };

  // Handle competency score change
  const handleScoreChange = (key: keyof AcademicCompetencyScores, val: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(val) ? 0 : val));
    setScores((prev) => ({
      ...prev,
      [key]: clamped,
    }));
  };

  // Dynamic calculation of grade and predicate
  const calculatedGrade = calculateGradeAndPredicate(scores);

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setFormError('Nama siswa wajib diisi atau pilih dari daftar siswa batch.');
      return;
    }
    if (!capstoneProjectTitle.trim()) {
      setFormError('Judul Proyek Capstone / Hasil Karya Akhir wajib diisi.');
      return;
    }
    if (!instructorNotes.trim()) {
      setFormError('Catatan evaluasi pengajar wajib diisi.');
      return;
    }

    try {
      const payload = {
        studentId,
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        batchId: selectedBatchId,
        batchName,
        tier,
        reportPeriod,
        attendanceRate,
        scores,
        averageScore: calculatedGrade.averageScore,
        gradeLetter: calculatedGrade.gradeLetter,
        predicateTitle: calculatedGrade.predicateTitle,
        capstoneProjectTitle: capstoneProjectTitle.trim(),
        capstoneProjectDesc: capstoneProjectDesc.trim(),
        instructorNotes: instructorNotes.trim(),
        nextStepRecommendation: nextStepRecommendation.trim(),
        instructorName: instructorName.trim() || 'Tim Akademik Beekoding',
        issueDate,
      };

      let saved: StudentAcademicReport | null = null;
      if (report) {
        saved = updateAcademicReport(report.id, payload);
      } else {
        saved = createAcademicReport(payload);
      }

      if (saved) {
        onSaved(saved);
        onClose();
      } else {
        setFormError('Gagal menyimpan rapor. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Terjadi kesalahan saat menyimpan data rapor.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 ${
          isDark ? 'bg-[#12151d] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                {report ? 'Edit Rapor Hasil Belajar' : 'Terbitkan Rapor Belajar Baru'}
              </h2>
              <p className="text-xs text-slate-400">
                Penilaian 5 pilar kompetensi, lembar capaian resmi A4 & evaluasi mentor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Batch & Siswa */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <GraduationCap className="w-4 h-4" />
              <span>Identitas Siswa & Kelas Pembelajaran</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Batch Selector */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Pilih Batch Kelas *</label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => handleBatchChange(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Selector */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Pilih Siswa *</label>
                {currentBatch?.enrolledStudents && currentBatch.enrolledStudents.length > 0 ? (
                  <select
                    value={studentId}
                    onChange={(e) => handleStudentChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    {currentBatch.enrolledStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.studentName} ({s.parentName || 'Wali'})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nama lengkap siswa..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                )}
              </div>

              {/* Wali Murid & Kontak WA */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Nama Orang Tua / Wali</label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Nama orang tua..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">WhatsApp Orang Tua</label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Periode Rapor & Tingkat Kehadiran */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Periode Evaluasi</label>
                <select
                  value={reportPeriod}
                  onChange={(e) => setReportPeriod(e.target.value as ReportPeriod)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <option value="final_term">Akhir Sesi / Kelulusan (Final-Term)</option>
                  <option value="mid_term">Tengah Sesi (Mid-Term)</option>
                </select>
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Kehadiran Kelas (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={attendanceRate}
                  onChange={(e) => setAttendanceRate(Number(e.target.value))}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Nama Instruktur Mentor</label>
                <input
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="Instruktur pengampu..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Tanggal Terbit</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Penilaian 5 Pilar Kompetensi Coding */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                <Sparkles className="w-4 h-4" />
                <span>Penilaian 5 Aspek Kompetensi (Skor 0 - 100)</span>
              </div>

              {/* Live Preview Predicate Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 shadow-sm">
                  {calculatedGrade.gradeLetter} ({calculatedGrade.averageScore}/100)
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {calculatedGrade.predicateTitle}
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              {COMPETENCY_FIELDS.map((comp) => {
                const score = scores[comp.key];
                return (
                  <div
                    key={comp.key}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="font-bold text-xs text-slate-200 dark:text-slate-200">
                          {comp.label}
                        </span>
                        <p className="text-[10px] text-slate-400">{comp.hint}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={score}
                          onChange={(e) => handleScoreChange(comp.key, Number(e.target.value))}
                          className={`w-14 text-center py-1 rounded-lg border text-xs font-black focus:outline-none focus:ring-1 focus:ring-amber-500/40 ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-amber-400'
                              : 'bg-white border-slate-300 text-amber-700'
                          }`}
                        />
                        <span className="text-xs text-slate-400">/ 100</span>
                      </div>
                    </div>

                    {/* Range Slider */}
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={score}
                      onChange={(e) => handleScoreChange(comp.key, Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-700/30 rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Proyek Kelulusan Capstone & Catatan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <BookOpen className="w-4 h-4" />
              <span>Karya Proyek Capstone & Catatan Pembina</span>
            </div>

            <div className="space-y-3">
              {/* Judul Proyek Capstone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Judul Proyek Capstone Siswa *</label>
                <input
                  type="text"
                  value={capstoneProjectTitle}
                  onChange={(e) => setCapstoneProjectTitle(e.target.value)}
                  placeholder="Contoh: Petualangan Lebah Penyelamat Hutan (Bee Adventure 2D)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Deskripsi Proyek */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">
                  Deskripsi & Fitur Utama Proyek Capstone
                </label>
                <textarea
                  rows={2}
                  value={capstoneProjectDesc}
                  onChange={(e) => setCapstoneProjectDesc(e.target.value)}
                  placeholder="Rangkuman mekanik game atau fitur aplikasi web yang berhasil dibuat oleh siswa..."
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Catatan Evaluasi Instruktur */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">
                  Catatan Kualitatif Evaluasi Instruktur *
                </label>
                <textarea
                  rows={3}
                  value={instructorNotes}
                  onChange={(e) => setInstructorNotes(e.target.value)}
                  placeholder="Apresiasi perkembangan cara berpikir anak, sikap positif, serta hal-hal yang dapat terus ditingkatkan..."
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Rekomendasi Level Berikutnya */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">
                  Rekomendasi Tingkatan Belajar Lanjutan
                </label>
                <input
                  type="text"
                  value={nextStepRecommendation}
                  onChange={(e) => setNextStepRecommendation(e.target.value)}
                  placeholder="Contoh: Disarankan melanjutkan ke Middle Coder (Roblox Studio & Pengantar Python 3)..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="text-xs text-slate-400">
            Rata-rata: <span className="font-bold text-amber-500">{calculatedGrade.averageScore}</span> • Predikat:{' '}
            <span className="font-bold text-slate-200">{calculatedGrade.gradeLetter}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{report ? 'Simpan Perubahan Rapor' : 'Terbitkan Rapor Siswa'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
