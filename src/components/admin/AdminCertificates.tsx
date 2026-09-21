import React, { useState, useMemo } from 'react';
import {
  type StudentCertificate,
  type CertificateType,
  type CertificateHonors,
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  resetCertificatesToDefault,
  calculateCertificateStats,
  getBatches,
  getSubmissions,
} from '../../services/adminStorage';
import { AdminCertificateModal } from './AdminCertificateModal';
import {
  Award,
  Plus,
  Search,
  CheckCircle2,
  Printer,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Check,
  Copy,
  X,
  LayoutGrid,
  List,
  ShieldCheck,
} from 'lucide-react';

interface AdminCertificatesProps {
  isDark: boolean;
}

export const AdminCertificates: React.FC<AdminCertificatesProps> = ({ isDark }) => {
  const [certificates, setCertificates] = useState<StudentCertificate[]>(() => getCertificates());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<CertificateType | 'all'>('all');
  const [honorsFilter, setHonorsFilter] = useState<CertificateHonors | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal State
  const [selectedCert, setSelectedCert] = useState<StudentCertificate | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<StudentCertificate | null>(null);
  const [copiedCertNum, setCopiedCertNum] = useState<string | null>(null);

  // Alert State
  const [alertInfo, setAlertInfo] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'info' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Form State untuk Buat / Edit Sertifikat
  const [formStudentName, setFormStudentName] = useState('');
  const [formParentName, setFormParentName] = useState('');
  const [formParentPhone, setFormParentPhone] = useState('');
  const [formProgramName, setFormProgramName] = useState('Junior Explorer: Visual Scratch & AI Logic');
  const [formBatchName, setFormBatchName] = useState('');
  const [formIssueDate, setFormIssueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formCertificateType, setFormCertificateType] = useState<CertificateType>('graduation');
  const [formHonorsLevel, setFormHonorsLevel] = useState<CertificateHonors>('with_distinction');
  const [formHonorsTitle, setFormHonorsTitle] = useState('Dengan Predikat Istimewa (With Distinction)');
  const [formInstructorName, setFormInstructorName] = useState('Febri Hasan, S.Kom., M.T.');
  const [formAdvisorName, setFormAdvisorName] = useState('Dr. Ir. Hendra Wijaya');
  const [formDescription, setFormDescription] = useState(
    'Telah berhasil menyelesaikan seluruh kurikulum intensif, tantangan logika algoritma, dan proyek teknologi interaktif dengan dedikasi serta kreativitas luar biasa.'
  );
  const [formCustomNote, setFormCustomNote] = useState('');

  // Sumber Data untuk Quick Pick
  const batches = useMemo(() => getBatches(), []);
  const submissions = useMemo(() => getSubmissions(), []);

  // Metrik Statistik
  const stats = useMemo(() => calculateCertificateStats(certificates), [certificates]);

  // Filter Sertifikat
  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const matchType = typeFilter === 'all' || c.certificateType === typeFilter;
      const matchHonors = honorsFilter === 'all' || c.honorsLevel === honorsFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.studentName.toLowerCase().includes(q) ||
        c.certificateNumber.toLowerCase().includes(q) ||
        c.programName.toLowerCase().includes(q) ||
        (c.parentName && c.parentName.toLowerCase().includes(q)) ||
        (c.batchName && c.batchName.toLowerCase().includes(q));

      return matchType && matchHonors && matchSearch;
    });
  }, [certificates, typeFilter, honorsFilter, searchQuery]);

  // Helper Pemilihan Predikat
  const handleHonorsLevelChange = (level: CertificateHonors) => {
    setFormHonorsLevel(level);
    switch (level) {
      case 'with_distinction':
        setFormHonorsTitle('Dengan Predikat Istimewa (With Distinction)');
        break;
      case 'excellence':
        setFormHonorsTitle('Excellence in Computational Thinking');
        break;
      case 'honor_roll':
        setFormHonorsTitle('Dean’s Honor Roll of Innovation');
        break;
      case 'merit':
        setFormHonorsTitle('Merit Award in Algorithmic Problem Solving');
        break;
      case 'standard':
        setFormHonorsTitle('Sertifikat Kelulusan Resmi');
        break;
    }
  };

  // Buka Modal Buat Baru
  const handleOpenCreateModal = () => {
    setEditingCert(null);
    setFormStudentName('');
    setFormParentName('');
    setFormParentPhone('');
    setFormProgramName('Junior Explorer: Visual Scratch & AI Logic');
    setFormBatchName(batches[0]?.name || '');
    setFormIssueDate(new Date().toISOString().split('T')[0]);
    setFormCertificateType('graduation');
    handleHonorsLevelChange('with_distinction');
    setFormInstructorName('Febri Hasan, S.Kom., M.T.');
    setFormAdvisorName('Dr. Ir. Hendra Wijaya');
    setFormDescription(
      'Telah berhasil menyelesaikan seluruh kurikulum intensif, tantangan logika algoritma, dan proyek teknologi interaktif dengan dedikasi serta kreativitas luar biasa.'
    );
    setFormCustomNote('');
    setIsCreateModalOpen(true);
  };

  // Buka Modal Edit
  const handleOpenEditModal = (cert: StudentCertificate) => {
    setEditingCert(cert);
    setFormStudentName(cert.studentName);
    setFormParentName(cert.parentName || '');
    setFormParentPhone(cert.parentPhone || '');
    setFormProgramName(cert.programName);
    setFormBatchName(cert.batchName || '');
    setFormIssueDate(cert.issueDate);
    setFormCertificateType(cert.certificateType);
    setFormHonorsLevel(cert.honorsLevel);
    setFormHonorsTitle(cert.honorsTitle);
    setFormInstructorName(cert.instructorName);
    setFormAdvisorName(cert.advisorName);
    setFormDescription(cert.description || '');
    setFormCustomNote(cert.customNote || '');
    setIsCreateModalOpen(true);
  };

  // Simpan Sertifikat (Create / Update)
  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentName.trim() || !formProgramName.trim()) {
      showAlert('error', 'Nama siswa dan nama program wajib diisi.');
      return;
    }

    if (editingCert) {
      const updated = updateCertificate(editingCert.id, {
        studentName: formStudentName.trim(),
        parentName: formParentName.trim() || undefined,
        parentPhone: formParentPhone.trim() || undefined,
        programName: formProgramName.trim(),
        batchName: formBatchName.trim() || undefined,
        issueDate: formIssueDate,
        certificateType: formCertificateType,
        honorsLevel: formHonorsLevel,
        honorsTitle: formHonorsTitle.trim(),
        instructorName: formInstructorName.trim(),
        advisorName: formAdvisorName.trim(),
        description: formDescription.trim() || undefined,
        customNote: formCustomNote.trim() || undefined,
      });

      if (updated) {
        setCertificates(getCertificates());
        showAlert('success', `Sertifikat ${updated.certificateNumber} berhasil diperbarui.`);
        setIsCreateModalOpen(false);
      }
    } else {
      const newCert = createCertificate({
        studentName: formStudentName.trim(),
        parentName: formParentName.trim() || undefined,
        parentPhone: formParentPhone.trim() || undefined,
        programName: formProgramName.trim(),
        batchName: formBatchName.trim() || undefined,
        issueDate: formIssueDate,
        certificateType: formCertificateType,
        honorsLevel: formHonorsLevel,
        honorsTitle: formHonorsTitle.trim(),
        instructorName: formInstructorName.trim(),
        advisorName: formAdvisorName.trim(),
        description: formDescription.trim() || undefined,
        customNote: formCustomNote.trim() || undefined,
      });

      setCertificates(getCertificates());
      showAlert(
        'success',
        `Sertifikat baru ${newCert.certificateNumber} untuk ananda ${newCert.studentName} berhasil diterbitkan.`
      );
      setIsCreateModalOpen(false);
    }
  };

  // Hapus Sertifikat
  const handleDeleteCertificate = (cert: StudentCertificate) => {
    if (confirm(`Hapus sertifikat ${cert.certificateNumber} (${cert.studentName})?`)) {
      deleteCertificate(cert.id);
      setCertificates(getCertificates());
      showAlert('info', `Sertifikat ${cert.certificateNumber} telah dihapus.`);
    }
  };

  // Reset ke Default
  const handleResetToDefault = () => {
    if (confirm('Kembalikan data sertifikat ke sampel default awal pabrik?')) {
      resetCertificatesToDefault();
      setCertificates(getCertificates());
      showAlert('success', 'Data sertifikat berhasil direset ke standar pabrik.');
    }
  };

  // Salin No Sertifikat
  const handleCopyCertNum = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedCertNum(num);
    setTimeout(() => setCopiedCertNum(null), 2000);
  };

  // Quick Pick Siswa dari Batch
  const handlePickFromBatchStudent = (studentName: string, pName?: string, pPhone?: string, bName?: string) => {
    setFormStudentName(studentName);
    if (pName) setFormParentName(pName);
    if (pPhone) setFormParentPhone(pPhone);
    if (bName) setFormBatchName(bName);
    showAlert('info', `Data murid ${studentName} dimuat ke formulir.`);
  };

  // Quick Pick Siswa dari Asesmen
  const handlePickFromSubmission = (subId: string) => {
    const s = submissions.find((sub) => sub.id === subId);
    if (!s) return;
    setFormStudentName(s.profile.childName);
    if (s.profile.parentName) setFormParentName(s.profile.parentName);
    if (s.profile.parentPhone) setFormParentPhone(s.profile.parentPhone);
    if (s.recommendedProgram?.title) setFormProgramName(s.recommendedProgram.title);
    showAlert('info', `Data asesmen ${s.profile.childName} dimuat ke formulir.`);
  };

  // WhatsApp Sender
  const handleSendWhatsAppDirect = (cert: StudentCertificate) => {
    if (!cert.parentPhone) {
      showAlert('info', 'Nomor telepon orang tua belum tersedia pada data sertifikat ini.');
      return;
    }
    const cleanPhone = cert.parentPhone.replace(/\D/g, '');
    let target = cleanPhone;
    if (target.startsWith('0')) {
      target = '62' + target.substring(1);
    }
    const message = [
      `Halo Kak *${cert.parentName || 'Orang Tua / Wali'}*, salam hangat dari BeeKoding! 🐝🎓`,
      ``,
      `Kami mengucapkan selamat atas kelulusan ananda *${cert.studentName}* pada program:`,
      `• *${cert.programName}*`,
      `• *Predikat*: ${cert.honorsTitle}`,
      `• *No. Sertifikat*: ${cert.certificateNumber}`,
      `• *Kode Validasi*: ${cert.verificationCode}`,
      ``,
      `Piagam digital resmi ananda siap dicetak & dibagikan. Terima kasih telah mempercayakan pembelajaran logika dan coding ananda bersama kami! 🚀`,
    ].join('\n');

    window.open(`https://wa.me/${target}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'No. Sertifikat',
      'Kode Verifikasi',
      'Tanggal Terbit',
      'Nama Siswa',
      'Nama Wali',
      'No. WhatsApp',
      'Program',
      'Batch',
      'Tipe Sertifikat',
      'Predikat / Honors',
      'Instruktur',
    ];

    const rows = certificates.map((c) => [
      c.certificateNumber,
      c.verificationCode,
      c.issueDate,
      `"${c.studentName}"`,
      `"${c.parentName || '-'}"`,
      `'${c.parentPhone || '-'}`,
      `"${c.programName}"`,
      `"${c.batchName || '-'}"`,
      c.certificateType.toUpperCase(),
      `"${c.honorsTitle}"`,
      `"${c.instructorName}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `beekoding_sertifikat_siswa_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {alertInfo && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold transition-all shadow-md ${
            alertInfo.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : alertInfo.type === 'error'
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400'
              : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span>{alertInfo.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlertInfo(null)}
            className="p-1 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Halaman & Aksi Utama */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Studio Sertifikat Digital Siswa</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Penerbitan piagam kelulusan A4 Landscape resmi, nomor seri autentikasi & QR verifikasi.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer"
            title="Reset ke Sampel Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Terbitkan Sertifikat Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Diterbitkan */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Sertifikat
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
            {stats.totalCount} Piagam
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Telah diterbitkan & diverifikasi
          </p>
        </div>

        {/* Kelulusan Bootcamp */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kelulusan Program
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {stats.graduationCount} Siswa
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Menyelesaikan seluruh sesi kelas
          </p>
        </div>

        {/* Predikat Istimewa */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Predikat Istimewa
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
            {stats.distinctionCount} Murid
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            With Distinction & Excellence
          </p>
        </div>

        {/* Honor Roll */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dean's Honor Roll
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
            {stats.honorRollCount} Inovator
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Penghargaan proyek inovasi terbaik
          </p>
        </div>
      </div>

      {/* Bar Filter & Kontrol Tampilan */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, nomor sertifikat, atau program studi..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Tipe Sertifikat */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {(
            [
              { id: 'all', label: 'Semua Tipe' },
              { id: 'graduation', label: 'Kelulusan' },
              { id: 'achievement', label: 'Prestasi' },
              { id: 'honor_roll', label: 'Honor Roll' },
              { id: 'completion', label: 'Penyelesaian' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTypeFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                typeFilter === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter Predikat */}
        <select
          value={honorsFilter}
          onChange={(e) => setHonorsFilter(e.target.value as CertificateHonors | 'all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <option value="all">Semua Predikat</option>
          <option value="with_distinction">With Highest Distinction</option>
          <option value="excellence">Excellence in Thinking</option>
          <option value="honor_roll">Dean's Honor Roll</option>
          <option value="merit">Merit Award</option>
          <option value="standard">Sertifikat Standar</option>
        </select>

        {/* Toggle Mode Grid / Table */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            title="Tampilan Kartu Piagam Mini"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            title="Tampilan Tabel Ringkas"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Konten Utama: Mode Grid Galeri vs Mode Tabel */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCertificates.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              <Award className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
              <p className="font-semibold text-sm">Tidak ada sertifikat ditemukan</p>
              <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci atau filter tipe.</p>
            </div>
          ) : (
            filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between group ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                {/* Mini Diploma Frame Visual */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                      {cert.certificateType.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {cert.certificateNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCertNum(cert.certificateNumber)}
                        className="p-0.5 text-slate-400 hover:text-amber-500 cursor-pointer"
                        title="Salin No. Sertifikat"
                      >
                        {copiedCertNum === cert.certificateNumber ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Student Name */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-amber-500 transition-colors">
                    {cert.studentName}
                  </h3>

                  {/* Program & Batch */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 space-y-0.5">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{cert.programName}</p>
                    {cert.batchName && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Batch: {cert.batchName}
                      </p>
                    )}
                  </div>

                  {/* Honors Badge */}
                  <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                      {cert.honorsTitle}
                    </span>
                  </div>

                  {/* Verification code */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span>Terbit: {cert.issueDate}</span>
                    <span className="font-mono">Kode: {cert.verificationCode}</span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Buka / Cetak</span>
                  </button>

                  {cert.parentPhone && (
                    <button
                      type="button"
                      onClick={() => handleSendWhatsAppDirect(cert)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                      title="Kirim ke WhatsApp Wali"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(cert)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Edit Sertifikat"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCertificate(cert)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Hapus Sertifikat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Mode Tabel */
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b font-bold ${
                    isDark
                      ? 'border-slate-800 bg-slate-950/40 text-slate-400'
                      : 'border-slate-100 bg-slate-50 text-slate-600'
                  }`}
                >
                  <th className="py-3.5 px-4">No. Seri & Tanggal</th>
                  <th className="py-3.5 px-4">Nama Siswa</th>
                  <th className="py-3.5 px-4">Program & Batch</th>
                  <th className="py-3.5 px-4">Predikat / Kehormatan</th>
                  <th className="py-3.5 px-3 text-center">Tipe</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                {filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Tidak ada sertifikat ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert) => (
                    <tr
                      key={cert.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-900 dark:text-white">
                          {cert.certificateNumber}
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {cert.issueDate}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {cert.studentName}
                        </div>
                        {cert.parentName && (
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Wali: {cert.parentName}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {cert.programName}
                        </div>
                        {cert.batchName && (
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {cert.batchName}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-amber-700 dark:text-amber-400">
                          {cert.honorsTitle}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase">
                          {cert.certificateType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Cetak</span>
                        </button>

                        {cert.parentPhone && (
                          <button
                            type="button"
                            onClick={() => handleSendWhatsAppDirect(cert)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
                            title="Kirim ke WA Orang Tua"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(cert)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCertificate(cert)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal View & Print Piagam Landscape */}
      {selectedCert && (
        <AdminCertificateModal
          certificate={selectedCert}
          isDark={isDark}
          onClose={() => setSelectedCert(null)}
        />
      )}

      {/* Modal Form Terbitkan Sertifikat Baru / Edit */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingCert ? 'Perbarui Piagam Sertifikat' : 'Terbitkan Sertifikat Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingCert ? `No: ${editingCert.certificateNumber}` : 'Format A4 Landscape Resmi BeeKoding'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Pick Siswa (Saat Buat Baru) */}
            {!editingCert && (
              <div
                className={`p-4 border-b text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-amber-500/5 border-amber-500/10'
                }`}
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilih Cepat dari Murid Terdaftar di Batch:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {batches.flatMap((b) =>
                    b.enrolledStudents.slice(0, 3).map((stu) => (
                      <button
                        key={`${b.id}-${stu.id}`}
                        type="button"
                        onClick={() =>
                          handlePickFromBatchStudent(
                            stu.studentName,
                            stu.parentName,
                            stu.parentPhone,
                            b.name
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors font-medium cursor-pointer"
                      >
                        {stu.studentName} ({b.tier.toUpperCase()})
                      </button>
                    ))
                  )}
                  {submissions.slice(0, 3).map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handlePickFromSubmission(sub.id)}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-colors font-medium cursor-pointer"
                    >
                      {sub.profile.childName} (Tes Bakat)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSaveCertificate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap Siswa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStudentName}
                    onChange={(e) => setFormStudentName(e.target.value)}
                    placeholder="Contoh: Kenzo Alvaro Pratama"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Orang Tua / Wali
                  </label>
                  <input
                    type="text"
                    value={formParentName}
                    onChange={(e) => setFormParentName(e.target.value)}
                    placeholder="Bambang Pratama"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp Wali Murid
                  </label>
                  <input
                    type="text"
                    value={formParentPhone}
                    onChange={(e) => setFormParentPhone(e.target.value)}
                    placeholder="081234567890"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Terbit Piagam
                  </label>
                  <input
                    type="date"
                    required
                    value={formIssueDate}
                    onChange={(e) => setFormIssueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Program *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProgramName}
                    onChange={(e) => setFormProgramName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Batch / Angkatan
                  </label>
                  <input
                    type="text"
                    value={formBatchName}
                    onChange={(e) => setFormBatchName(e.target.value)}
                    placeholder="Batch 1 - Junior Explorer"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Tipe & Predikat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipe Sertifikat
                  </label>
                  <select
                    value={formCertificateType}
                    onChange={(e) => setFormCertificateType(e.target.value as CertificateType)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="graduation">Kelulusan Program (Graduation)</option>
                    <option value="achievement">Penghargaan Prestasi (Achievement)</option>
                    <option value="honor_roll">Dean's Honor Roll</option>
                    <option value="completion">Penyelesaian Modul (Completion)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tingkat Predikat
                  </label>
                  <select
                    value={formHonorsLevel}
                    onChange={(e) => handleHonorsLevelChange(e.target.value as CertificateHonors)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="with_distinction">With Highest Distinction</option>
                    <option value="excellence">Excellence in Computational Thinking</option>
                    <option value="honor_roll">Dean's Honor Roll of Innovation</option>
                    <option value="merit">Merit Award</option>
                    <option value="standard">Sertifikat Standar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Predikat yang Dicetak pada Piagam
                </label>
                <input
                  type="text"
                  required
                  value={formHonorsTitle}
                  onChange={(e) => setFormHonorsTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Pencapaian Kurikulum
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Apresiasi Khusus (Opsional)
                </label>
                <input
                  type="text"
                  value={formCustomNote}
                  onChange={(e) => setFormCustomNote(e.target.value)}
                  placeholder='Contoh: Menciptakan game "Bee Math Adventure" dengan skor 98/100'
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              {/* Tanda Tangan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Instruktur / Founder
                  </label>
                  <input
                    type="text"
                    value={formInstructorName}
                    onChange={(e) => setFormInstructorName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Academic Advisor
                  </label>
                  <input
                    type="text"
                    value={formAdvisorName}
                    onChange={(e) => setFormAdvisorName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer"
                >
                  {editingCert ? 'Simpan Perubahan' : 'Terbitkan Piagam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
