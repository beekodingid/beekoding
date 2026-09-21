import React, { useState, useEffect } from 'react';
import {
  type CounselingSession,
  type CounselingTopic,
  type CounselingSessionType,
  type CounselingStatus,
  getSubmissions,
  getInstructors,
} from '../../services/adminStorage';
import {
  X,
  Calendar,
  User,
  Sparkles,
  HeartHandshake,
  FileText,
  Save,
} from 'lucide-react';

interface AdminCounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<CounselingSession, 'id' | 'sessionNumber' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: CounselingSession | null;
  isDark: boolean;
}

export const AdminCounselingModal: React.FC<AdminCounselingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isDark,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [counselorName, setCounselorName] = useState('Febri Hasan, S.Kom., M.T.');
  const [counselorTitle, setCounselorTitle] = useState('Founder & Chief Learning Officer');
  const [tier, setTier] = useState('Junior Explorer');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('15:00 - 15:45 WIB');
  const [topic, setTopic] = useState<CounselingTopic>('evaluasi_belajar');
  const [sessionType, setSessionType] = useState<CounselingSessionType>('online_zoom');
  const [meetingLink, setMeetingLink] = useState('https://zoom.us/j/9128374650');
  const [status, setStatus] = useState<CounselingStatus>('scheduled');
  const [studentStrengths, setStudentStrengths] = useState('');
  const [challengesFaced, setChallengesFaced] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [curriculumRecommendation, setCurriculumRecommendation] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [parentFeedback, setParentFeedback] = useState('');

  // Auto-fill student data list
  const submissions = getSubmissions();
  const instructors = getInstructors();

  useEffect(() => {
    if (initialData) {
      setStudentName(initialData.studentName);
      setStudentPhone(initialData.studentPhone);
      setParentName(initialData.parentName);
      setParentPhone(initialData.parentPhone);
      setCounselorName(initialData.counselorName);
      setCounselorTitle(initialData.counselorTitle);
      setTier(initialData.tier);
      setDate(initialData.date);
      setTime(initialData.time);
      setTopic(initialData.topic);
      setSessionType(initialData.sessionType);
      setMeetingLink(initialData.meetingLink || '');
      setStatus(initialData.status);
      setStudentStrengths(initialData.studentStrengths || '');
      setChallengesFaced(initialData.challengesFaced || '');
      setActionPlan(initialData.actionPlan || '');
      setCurriculumRecommendation(initialData.curriculumRecommendation || '');
      setInternalNotes(initialData.internalNotes || '');
      setParentFeedback(initialData.parentFeedback || '');
    } else {
      setStudentName('');
      setStudentPhone('');
      setParentName('');
      setParentPhone('');
      setCounselorName('Febri Hasan, S.Kom., M.T.');
      setCounselorTitle('Founder & Chief Learning Officer');
      setTier('Junior Explorer');
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setDate(tomorrow);
      setTime('15:00 - 15:45 WIB');
      setTopic('evaluasi_belajar');
      setSessionType('online_zoom');
      setMeetingLink('https://zoom.us/j/9128374650');
      setStatus('scheduled');
      setStudentStrengths('');
      setChallengesFaced('');
      setActionPlan('');
      setCurriculumRecommendation('');
      setInternalNotes('');
      setParentFeedback('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleCounselorChange = (name: string) => {
    setCounselorName(name);
    const found = instructors.find((i) => i.name === name);
    if (found) {
      setCounselorTitle(found.title);
    }
  };

  const handleSelectStudentProfile = (subId: string) => {
    const sub = submissions.find((s) => s.id === subId);
    if (sub) {
      setStudentName(sub.profile.childName);
      setStudentPhone(sub.profile.parentPhone);
      setParentName(sub.profile.parentName);
      setParentPhone(sub.profile.parentPhone);
      setTier(
        sub.profile.tier === 'junior'
          ? 'Junior Explorer'
          : sub.profile.tier === 'middle'
          ? 'Middle Coder'
          : 'Teens Innovator'
      );
      setStudentStrengths(
        `Kekuatan pilar kecerdasan: ${sub.topStrengths.join(', ')}. Skor bakat komputasi: ${sub.totalScore}/100.`
      );
      setCurriculumRecommendation(sub.recommendedProgram.title);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentName.trim() || !date) {
      alert('Harap lengkapi nama siswa, nama wali, dan tanggal sesi.');
      return;
    }

    onSave({
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim() || parentPhone.trim(),
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      counselorName: counselorName.trim(),
      counselorTitle: counselorTitle.trim(),
      tier,
      date,
      time,
      topic,
      sessionType,
      meetingLink: meetingLink.trim() || undefined,
      status,
      studentStrengths: studentStrengths.trim(),
      challengesFaced: challengesFaced.trim(),
      actionPlan: actionPlan.trim(),
      curriculumRecommendation: curriculumRecommendation.trim(),
      internalNotes: internalNotes.trim() || undefined,
      parentFeedback: parentFeedback.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          isDark
            ? 'bg-[#121624] border-amber-500/30 text-white'
            : 'bg-white border-amber-200 text-slate-900 shadow-amber-900/10'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30 text-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk']">
                {initialData ? 'Ubah Sesi Konseling & Bimbingan' : 'Jadwalkan Sesi Konseling Baru'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pencatatan bimbingan 1-on-1, observasi karakter belajar, & kesepakatan orang tua.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Quick Autocomplete from Existing Students */}
          {!initialData && (
            <div
              className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/60 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-amber-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Isi Otomatis dari Data Asesmen Siswa (Opsional):</span>
                </span>
                <span className="text-[10px] text-slate-400">1-Klik Auto-Fill</span>
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) handleSelectStudentProfile(e.target.value);
                }}
                defaultValue=""
                className={`w-full p-2 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="">-- Pilih Nama Murid Terdaftar --</option>
                {submissions.slice(0, 10).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.profile.childName} ({s.profile.tier}) - Wali: {s.profile.parentName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Group 1: Student & Parent Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Identitas Siswa & Orang Tua</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Kenzo Alvaro Pratama"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Jenjang Belajar
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Junior Explorer">Junior Explorer (6-10 Th)</option>
                  <option value="Middle Coder">Middle Coder (10-14 Th)</option>
                  <option value="Teens Innovator">Teens Innovator (13-18 Th)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Nama Orang Tua / Wali *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Contoh: Ibu Dewi Rahmawati"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Nomor WhatsApp Wali *
                </label>
                <input
                  type="tel"
                  required
                  value={parentPhone}
                  onChange={(e) => {
                    setParentPhone(e.target.value);
                    if (!studentPhone) setStudentPhone(e.target.value);
                  }}
                  placeholder="Contoh: 081234567890"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Group 2: Schedule & Format */}
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal, Konselor & Media Pertemuan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Konselor / Mentor Pembimbing
                </label>
                <select
                  value={counselorName}
                  onChange={(e) => handleCounselorChange(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.name}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Tanggal Pertemuan *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Waktu Pelaksanaan
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Contoh: 15:00 - 15:45 WIB"
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Topik Bimbingan
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as CounselingTopic)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="evaluasi_belajar">Evaluasi Kemajuan & Minat Koding</option>
                  <option value="kendala_fokus">Konseling Fokus & Screen Time</option>
                  <option value="rekomendasi_kurikulum">Rekomendasi Roadmap Kurikulum</option>
                  <option value="persiapan_lomba">Persiapan Lomba & Portofolio</option>
                  <option value="konsultasi_perangkat">Konsultasi Perangkat & Lab</option>
                  <option value="lainnya">Lainnya / Khusus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Media Pertemuan
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as CounselingSessionType)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="online_zoom">Zoom Cloud Meeting</option>
                  <option value="online_gmeet">Google Meet</option>
                  <option value="offline_studio">Studio Offline BeeKoding</option>
                  <option value="whatsapp_call">WhatsApp Video Call</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Status Sesi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CounselingStatus)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="scheduled">Terjadwal (Mendatang)</option>
                  <option value="completed">Selesai & Ada Rekap</option>
                  <option value="follow_up_needed">Perlu Follow-Up Khusus</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                Tautan Meeting (Zoom / GMeet)
              </label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://zoom.us/j/9128374650"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Group 3: Observation & Pedagogical Records */}
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Catatan Observasi Karakter & Kesepakatan Bersama</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Kelebihan, Minat & Potensi Unik Anak
                </label>
                <textarea
                  rows={2}
                  value={studentStrengths}
                  onChange={(e) => setStudentStrengths(e.target.value)}
                  placeholder="Contoh: Daya imajinasi spasial Scratch sangat menonjol. Cepat memahami logika koordinat X-Y..."
                  className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Tantangan / Kendala Fokus yang Dihadapi
                </label>
                <textarea
                  rows={2}
                  value={challengesFaced}
                  onChange={(e) => setChallengesFaced(e.target.value)}
                  placeholder="Contoh: Mudah lelah jika mengetik lebih dari 20 menit terus-menerus tanpa jeda mini-kuis..."
                  className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Rencana Aksi Bersama Orang Tua di Rumah (*Action Plan*)
                </label>
                <textarea
                  rows={2}
                  value={actionPlan}
                  onChange={(e) => setActionPlan(e.target.value)}
                  placeholder="Contoh: Terapkan metode Pomodoro 20 menit koding + 5 menit istirahat. Dampingi ananda di 10 menit awal..."
                  className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                  Rekomendasi Roadmap Kurikulum / Jenjang Berikutnya
                </label>
                <input
                  type="text"
                  value={curriculumRecommendation}
                  onChange={(e) => setCurriculumRecommendation(e.target.value)}
                  placeholder="Contoh: Selesaikan Modul Scratch Labirin, tunda dulu transisi Python teks."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                    Catatan Internal Tim Mentor (Rahasia)
                  </label>
                  <textarea
                    rows={2}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Catatan privat untuk instruktur kelas berikutnya..."
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300 dark:text-slate-300">
                    Tanggapan / Harapan Orang Tua (*Feedback*)
                  </label>
                  <textarea
                    rows={2}
                    value={parentFeedback}
                    onChange={(e) => setParentFeedback(e.target.value)}
                    placeholder="Feedback atau harapan orang tua setelah sesi konseling..."
                    className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Sesi Konseling</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
