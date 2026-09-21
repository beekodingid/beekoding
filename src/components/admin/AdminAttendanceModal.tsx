import React, { useState } from 'react';
import {
  X,
  Check,
  Calendar,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  Share2,
  Sparkles,
  ClipboardCheck,
  Copy,
} from 'lucide-react';
import {
  type SessionAttendanceRecord,
  type StudentAttendanceItem,
  type AttendanceStatus,
  type ClassBatch,
  getBatches,
  getCurriculumSessions,
  createAttendanceRecord,
  updateAttendanceRecord,
} from '../../services/adminStorage';

interface AdminAttendanceModalProps {
  record: SessionAttendanceRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (savedRecord: SessionAttendanceRecord) => void;
  isDark?: boolean;
}

const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; activeClass: string; inactiveClass: string; icon: string }
> = {
  present: {
    label: 'Hadir',
    activeClass: 'bg-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/20',
    inactiveClass:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20',
    icon: '✅',
  },
  excused: {
    label: 'Izin / Sakit',
    activeClass: 'bg-amber-500 text-white font-bold shadow-sm shadow-amber-500/20',
    inactiveClass:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20',
    icon: '📩',
  },
  late: {
    label: 'Terlambat',
    activeClass: 'bg-sky-500 text-white font-bold shadow-sm shadow-sky-500/20',
    inactiveClass:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 border border-sky-500/20',
    icon: '⏰',
  },
  absent: {
    label: 'Alpa',
    activeClass: 'bg-rose-500 text-white font-bold shadow-sm shadow-rose-500/20',
    inactiveClass:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20',
    icon: '❌',
  },
};

export const AdminAttendanceModal: React.FC<AdminAttendanceModalProps> = ({
  record,
  isOpen,
  onClose,
  onSaved,
  isDark = false,
}) => {
  const [batches] = useState<ClassBatch[]>(() => getBatches());
  const [curriculum] = useState(() => getCurriculumSessions());

  const defaultBatch = batches[0];
  const initialResolvedTier = record
    ? record.tier
    : defaultBatch
    ? defaultBatch.tier === 'all'
      ? 'junior'
      : defaultBatch.tier
    : 'junior';

  // Form State initialized directly
  const [selectedBatchId, setSelectedBatchId] = useState<string>(() => {
    if (record) return record.batchId;
    return defaultBatch ? defaultBatch.id : '';
  });

  const [batchName, setBatchName] = useState<string>(() => {
    if (record) return record.batchName;
    return defaultBatch ? defaultBatch.name : '';
  });

  const [tier, setTier] = useState<'junior' | 'middle' | 'teens'>(() => initialResolvedTier);

  const [sessionNumber, setSessionNumber] = useState<number>(() => {
    if (record) return record.sessionNumber;
    return 1;
  });

  const [sessionTopic, setSessionTopic] = useState<string>(() => {
    if (record) return record.sessionTopic;
    const match = curriculum.find(
      (c) => c.tier === initialResolvedTier && c.sessionNumber === 1
    );
    return match ? match.title : 'Pengantar Kelas & Dasar Logika Pemrograman';
  });

  const [date, setDate] = useState<string>(() => {
    if (record) return record.date;
    return new Date().toISOString().split('T')[0];
  });

  const [instructorName, setInstructorName] = useState<string>(() => {
    if (record) return record.instructorName;
    return defaultBatch?.instructorName || 'Kak Febri Hasan';
  });

  const [students, setStudents] = useState<StudentAttendanceItem[]>(() => {
    if (record) return record.students || [];
    if (!defaultBatch) return [];
    return (defaultBatch.enrolledStudents || []).map((s) => ({
      studentId: s.id,
      studentName: s.studentName,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      status: 'present',
      notes: '',
    }));
  });

  const [classNotes, setClassNotes] = useState<string>(() => record?.classNotes || '');
  const [homeworkAssigned, setHomeworkAssigned] = useState<string>(() => record?.homeworkAssigned || '');
  const [formError, setFormError] = useState<string>('');
  const [copiedWA, setCopiedWA] = useState<boolean>(false);

  if (!isOpen) return null;

  // Handle batch change
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

    // Populate students from batch enrolled list
    const mappedStudents: StudentAttendanceItem[] = (chosen.enrolledStudents || []).map((s) => ({
      studentId: s.id,
      studentName: s.studentName,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      status: 'present',
      notes: '',
    }));
    setStudents(mappedStudents);

    // Update topic suggestion
    const matchCur = curriculum.find(
      (c) => c.tier === resolvedTier && c.sessionNumber === sessionNumber
    );
    if (matchCur) {
      setSessionTopic(matchCur.title);
    }
  };

  // Handle session number change & suggest topic
  const handleSessionNumberChange = (num: number) => {
    setSessionNumber(num);
    const matchCur = curriculum.find(
      (c) => c.tier === tier && c.sessionNumber === num
    );
    if (matchCur) {
      setSessionTopic(matchCur.title);
    }
  };

  // 1-Click "Tandai Semua Hadir"
  const handleMarkAllPresent = () => {
    setStudents((prev) =>
      prev.map((st) => ({
        ...st,
        status: 'present',
      }))
    );
  };

  // Update specific student attendance status
  const handleStudentStatusChange = (index: number, newStatus: AttendanceStatus) => {
    setStudents((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], status: newStatus };
      return next;
    });
  };

  // Update student personal note
  const handleStudentNoteChange = (index: number, noteText: string) => {
    setStudents((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], notes: noteText };
      return next;
    });
  };

  // Generate WhatsApp summary text
  const generateWAText = () => {
    const presentList = students.filter((s) => s.status === 'present');
    const lateList = students.filter((s) => s.status === 'late');
    const excusedList = students.filter((s) => s.status === 'excused');
    const absentList = students.filter((s) => s.status === 'absent');

    const lines = [
      `🐝 *LAPORAN PRESENSI KELAS BEEKODING* 🐝`,
      `---------------------------------------`,
      `📚 *Kelas*: ${batchName}`,
      `🎯 *Jenjang*: ${tier.toUpperCase()}`,
      `📌 *Sesi ke*: ${sessionNumber} - ${sessionTopic}`,
      `📅 *Tanggal*: ${date}`,
      `👨‍🏫 *Instruktur*: ${instructorName}`,
      ``,
      `*STATUS KEHADIRAN SISWA:*`,
      `✅ *Hadir (${presentList.length}/${students.length})*:`,
      presentList.length > 0
        ? presentList.map((s, i) => `  ${i + 1}. ${s.studentName}`).join('\n')
        : '  (Tidak ada)',
    ];

    if (lateList.length > 0) {
      lines.push(
        ``,
        `⏰ *Terlambat (${lateList.length})*:`,
        ...lateList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (excusedList.length > 0) {
      lines.push(
        ``,
        `📩 *Izin / Sakit (${excusedList.length})*:`,
        ...excusedList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (absentList.length > 0) {
      lines.push(
        ``,
        `❌ *Alpa (${absentList.length})*:`,
        ...absentList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (classNotes) {
      lines.push(``, `📝 *Catatan Evaluasi Kelas*:`, `"${classNotes}"`);
    }

    if (homeworkAssigned) {
      lines.push(``, `💡 *Tantangan Mandiri / PR*:`, `"${homeworkAssigned}"`);
    }

    lines.push(
      ``,
      `Terima kasih atas semangat belajar anak-anak hari ini! Sampai jumpa di pertemuan berikutnya! 🚀`,
      `_BeeKoding - Next Gen Coding & AI Academy for Kids & Teens_`
    );

    return lines.join('\n');
  };

  const handleCopyWA = () => {
    const text = generateWAText();
    navigator.clipboard.writeText(text);
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2500);
  };

  const handleShareWA = () => {
    const text = generateWAText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchId) {
      setFormError('Silakan pilih Batch Kelas terlebih dahulu.');
      return;
    }
    if (!sessionTopic.trim()) {
      setFormError('Silakan isi Topik Pertemuan sesi ini.');
      return;
    }
    if (students.length === 0) {
      setFormError('Batch ini belum memiliki data murid. Tambahkan murid pada menu Jadwal & Batch.');
      return;
    }

    try {
      const payload = {
        batchId: selectedBatchId,
        batchName,
        tier,
        sessionNumber,
        sessionTopic: sessionTopic.trim(),
        date,
        instructorName: instructorName.trim() || 'Kak Febri Hasan',
        students,
        classNotes: classNotes.trim(),
        homeworkAssigned: homeworkAssigned.trim(),
      };

      let saved: SessionAttendanceRecord | null = null;
      if (record) {
        saved = updateAttendanceRecord(record.id, payload);
      } else {
        saved = createAttendanceRecord(payload);
      }

      if (saved) {
        onSaved(saved);
        onClose();
      } else {
        setFormError('Gagal menyimpan data presensi. Silakan coba kembali.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Terjadi kesalahan saat menyimpan presensi.');
    }
  };

  // Quick stats
  const presentCount = students.filter((s) => s.status === 'present').length;
  const excusedCount = students.filter((s) => s.status === 'excused').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 ${
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
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                {record ? 'Edit Presensi Pertemuan' : 'Catat Presensi Sesi Kelas'}
              </h2>
              <p className="text-xs text-slate-400">
                Dokumentasi kehadiran siswa, catatan materi & laporan ke grup orang tua
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
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

          {/* Section 1: Informasi Sesi & Batch */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <BookOpen className="w-4 h-4" />
              <span>Detail Batch & Jadwal Pertemuan</span>
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
                      {b.name} ({b.enrolledStudents?.length || 0} Siswa)
                    </option>
                  ))}
                </select>
              </div>

              {/* Sesi Ke */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Sesi Ke *</label>
                <select
                  value={sessionNumber}
                  onChange={(e) => handleSessionNumberChange(Number(e.target.value))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Pertemuan {n} (dari 12)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tanggal */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Tanggal Pertemuan *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Topik Pertemuan */}
              <div className="md:col-span-8 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">
                  Topik & Materi Pembelajaran Sesi *
                </label>
                <input
                  type="text"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  placeholder="Contoh: Logika Percabangan (If-Else) & Deteksi Skor"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Nama Instruktur */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Instruktur Pengajar</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    placeholder="Nama Instruktur..."
                    className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Daftar Presensi Siswa */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-sm tracking-tight">
                    Presensi Murid ({students.length} Siswa Terdaftar)
                  </h3>
                </div>
                {/* Summary badges */}
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                    {presentCount} Hadir
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">
                    {excusedCount} Izin/Sakit
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-500 font-bold border border-sky-500/20">
                    {lateCount} Terlambat
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
                    {absentCount} Alpa
                  </span>
                </div>
              </div>

              {/* 1-Click "Tandai Semua Hadir" */}
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 transition-all cursor-pointer self-start sm:self-auto"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tandai Semua Hadir</span>
              </button>
            </div>

            {/* Students List Table / Cards */}
            {students.length === 0 ? (
              <div
                className={`p-8 text-center rounded-2xl border text-sm text-slate-400 ${
                  isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                Belum ada murid di batch ini. Silakan periksa pengaturan batch kelas.
              </div>
            ) : (
              <div className="space-y-2.5">
                {students.map((st, idx) => (
                  <div
                    key={st.studentId || idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDark
                        ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Student Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 font-black text-xs flex items-center justify-center border border-amber-500/20 shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{st.studentName}</p>
                          <p className="text-[11px] text-slate-400">
                            Wali: {st.parentName || '-'} {st.parentPhone ? `(${st.parentPhone})` : ''}
                          </p>
                        </div>
                      </div>

                      {/* Status Toggle Buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(['present', 'excused', 'late', 'absent'] as AttendanceStatus[]).map(
                          (statusKey) => {
                            const conf = STATUS_CONFIG[statusKey];
                            const isActive = st.status === statusKey;
                            return (
                              <button
                                key={statusKey}
                                type="button"
                                onClick={() => handleStudentStatusChange(idx, statusKey)}
                                className={`px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                  isActive ? conf.activeClass : conf.inactiveClass
                                }`}
                              >
                                <span>{conf.icon}</span>
                                <span>{conf.label}</span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* Note input for excused/late or general remarks */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={st.notes || ''}
                        onChange={(e) => handleStudentNoteChange(idx, e.target.value)}
                        placeholder="Catatan individu: e.g. Sakit flu / Terlambat 10m / Sangat aktif menyelesaikan tantangan..."
                        className={`w-full px-2.5 py-1 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500/40 ${
                          isDark
                            ? 'border-slate-800 text-slate-200 placeholder:text-slate-600'
                            : 'border-slate-200 text-slate-700 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Catatan Evaluasi Pengajar & Tugas Mandiri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Rangkuman Evaluasi Sesi Kelas</span>
              </label>
              <textarea
                rows={3}
                value={classNotes}
                onChange={(e) => setClassNotes(e.target.value)}
                placeholder="Catatan kemajuan belajar anak hari ini, materi yang berhasil dikuasai, atau kendala umum yang dihadapi..."
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 leading-relaxed ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Homework Assigned */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                <span>Tantangan Mandiri / Tugas Rumah (PR)</span>
              </label>
              <textarea
                rows={3}
                value={homeworkAssigned}
                onChange={(e) => setHomeworkAssigned(e.target.value)}
                placeholder="Tantangan eksplorasi coding di rumah, mini project, atau link submission tugas..."
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/40 leading-relaxed ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div
          className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          {/* Quick WA share buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyWA}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                copiedWA
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {copiedWA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedWA ? 'Tersalin ke Clipboard!' : 'Salin Format WA'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWA}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share ke Grup WA</span>
            </button>
          </div>

          {/* Form Save & Cancel Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
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
              <span>{record ? 'Simpan Perubahan' : 'Simpan Presensi Sesi'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
