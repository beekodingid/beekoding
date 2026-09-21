import React, { useState } from 'react';
import {
  type WhatsAppTemplate,
  type TemplateCategory,
  getWhatsAppTemplates,
  createWhatsAppTemplate,
  updateWhatsAppTemplate,
  deleteWhatsAppTemplate,
  resetWhatsAppTemplatesToDefault,
  interpolateTemplate,
  getSubmissions,
  getInquiries,
  getBatches,
} from '../../services/adminStorage';
import {
  MessageSquareText,
  Send,
  Plus,
  Copy,
  Check,
  Edit2,
  Trash2,
  RotateCcw,
  Search,
  Sparkles,
  Phone,
  X,
  Layers,
  Award,
  CalendarDays,
  CreditCard,
  UserCheck,
  Megaphone,
} from 'lucide-react';

interface AdminWhatsAppTemplatesProps {
  isDark: boolean;
}

const CATEGORY_LABELS: Record<TemplateCategory, { label: string; icon: any; color: string }> = {
  assessment_followup: {
    label: 'Follow-Up Asesmen',
    icon: Award,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  },
  trial_invite: {
    label: 'Free Trial Class',
    icon: Sparkles,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
  },
  class_reminder: {
    label: 'Pengingat Kelas H-1',
    icon: CalendarDays,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/25',
  },
  payment_info: {
    label: 'Info Pembayaran',
    icon: CreditCard,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  },
  consultation: {
    label: 'Jadwal Konsultasi',
    icon: UserCheck,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  },
  batch_announcement: {
    label: 'Pengumuman Batch',
    icon: Megaphone,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
  },
  custom: {
    label: 'Kustom Lainnya',
    icon: Layers,
    color: 'text-slate-400 bg-slate-500/10 border-slate-500/25',
  },
};

const COMMON_VARIABLES = [
  { key: 'nama_anak', label: 'Nama Anak' },
  { key: 'nama_ortu', label: 'Nama Ortu' },
  { key: 'usia_anak', label: 'Usia Anak' },
  { key: 'skor_bakat', label: 'Skor Tes' },
  { key: 'pilar_terkuat', label: 'Pilar Terkuat' },
  { key: 'rekomendasi_modul', label: 'Rekomendasi Modul' },
  { key: 'nama_batch', label: 'Nama Batch' },
  { key: 'jadwal_kelas', label: 'Jadwal Hari' },
  { key: 'jam_kelas', label: 'Jam Belajar' },
  { key: 'format_kelas', label: 'Format (Online/Offline)' },
  { key: 'link_meet', label: 'Link Meet' },
  { key: 'biaya', label: 'Biaya Program' },
  { key: 'instruktur', label: 'Instruktur' },
];

export const AdminWhatsAppTemplates: React.FC<AdminWhatsAppTemplatesProps> = ({ isDark }) => {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(() => getWhatsAppTemplates());

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WhatsAppTemplate | null>(null);

  // Quick Sender Modal
  const [isSenderOpen, setIsSenderOpen] = useState(false);
  const [senderTemplate, setSenderTemplate] = useState<WhatsAppTemplate | null>(null);

  // Form State Editor
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<TemplateCategory>('assessment_followup');
  const [formDescription, setFormDescription] = useState('');
  const [formBody, setFormBody] = useState('');

  // Quick Sender State
  const [senderRecipientPhone, setSenderRecipientPhone] = useState('');
  const [senderVars, setSenderVars] = useState<Record<string, string>>({
    nama_anak: 'Kenzo',
    nama_ortu: 'Bunda Rahma',
    usia_anak: '8',
    skor_bakat: '88',
    pilar_terkuat: 'Logika & Berpikir Algoritmik',
    rekomendasi_modul: 'Junior Explorer: Scratch & AI Prompting',
    nama_batch: 'Summer AI & Coding Bootcamp (Batch 1)',
    jadwal_kelas: 'Sabtu, 6 Juni 2026',
    jam_kelas: '09:00 - 10:30 WIB',
    format_kelas: 'Online Interactive',
    link_meet: 'https://meet.google.com/bee-koding-jun',
    biaya: 'Rp 750.000',
    instruktur: 'Kak Febri Hasan',
  });

  // Action Alerts & Copy States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3500);
  };

  const refreshTemplates = () => {
    setTemplates(getWhatsAppTemplates());
  };

  // Open Create / Edit Modal
  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setFormTitle('');
    setFormCategory('assessment_followup');
    setFormDescription('');
    setFormBody('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (tpl: WhatsAppTemplate) => {
    setEditingTemplate(tpl);
    setFormTitle(tpl.title);
    setFormCategory(tpl.category);
    setFormDescription(tpl.description);
    setFormBody(tpl.body);
    setIsEditorOpen(true);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formBody.trim()) {
      showAlert('error', 'Judul dan isi pesan wajib diisi.');
      return;
    }

    if (editingTemplate) {
      updateWhatsAppTemplate(editingTemplate.id, {
        title: formTitle.trim(),
        category: formCategory,
        description: formDescription.trim(),
        body: formBody.trim(),
      });
      showAlert('success', `Template "${formTitle}" berhasil diperbarui.`);
    } else {
      createWhatsAppTemplate({
        title: formTitle.trim(),
        category: formCategory,
        description: formDescription.trim(),
        body: formBody.trim(),
      });
      showAlert('success', `Template "${formTitle}" berhasil ditambahkan.`);
    }

    setIsEditorOpen(false);
    refreshTemplates();
  };

  const handleDeleteTemplate = (tpl: WhatsAppTemplate) => {
    if (window.confirm(`Hapus template "${tpl.title}"?`)) {
      deleteWhatsAppTemplate(tpl.id);
      showAlert('success', `Template "${tpl.title}" telah dihapus.`);
      refreshTemplates();
    }
  };

  // Open Quick Sender Modal
  const handleOpenQuickSender = (tpl: WhatsAppTemplate) => {
    setSenderTemplate(tpl);
    setIsSenderOpen(true);
  };

  // Quick Pick Recipient from Submissions, Inquiries, or Batches
  const handlePickSubmission = (subId: string) => {
    const list = getSubmissions();
    const sub = list.find((s) => s.id === subId);
    if (!sub) return;

    setSenderRecipientPhone(sub.profile.parentPhone);
    setSenderVars((prev) => ({
      ...prev,
      nama_anak: sub.profile.childName,
      nama_ortu: sub.profile.parentName || 'Ayah/Bunda',
      usia_anak: String(sub.profile.childAge),
      skor_bakat: String(sub.totalScore),
      pilar_terkuat: sub.topStrengths.join(' & '),
      rekomendasi_modul: sub.recommendedProgram?.title || 'Coding Bootcamp Kids',
    }));
    showAlert('success', `Data siswa ${sub.profile.childName} dimuat ke template.`);
  };

  const handlePickInquiry = (inqId: string) => {
    const list = getInquiries();
    const inq = list.find((i) => i.id === inqId);
    if (!inq) return;

    setSenderRecipientPhone(inq.phone);
    setSenderVars((prev) => ({
      ...prev,
      nama_anak: inq.name,
      nama_ortu: inq.name,
      rekomendasi_modul: inq.program,
    }));
    showAlert('success', `Kontak ${inq.name} dimuat ke template.`);
  };

  const handlePickBatch = (batchId: string) => {
    const list = getBatches();
    const batch = list.find((b) => b.id === batchId);
    if (!batch) return;

    setSenderVars((prev) => ({
      ...prev,
      nama_batch: batch.name,
      rekomendasi_modul: batch.programType,
      jadwal_kelas: `${batch.scheduleDays.join(', ')} (${batch.startDate})`,
      jam_kelas: batch.scheduleTime,
      format_kelas: batch.format.toUpperCase(),
      link_meet: batch.meetUrl || 'https://meet.google.com/bee-koding',
      biaya: `Rp ${batch.price.toLocaleString('id-ID')}`,
      instruktur: batch.instructorName,
    }));
    showAlert('success', `Jadwal batch ${batch.name} dimuat ke template.`);
  };

  // Copy raw or preview message to clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showAlert('success', 'Pesan tersalin ke clipboard!');
    setTimeout(() => setCopiedId(null), 3000);
  };

  // Launch WhatsApp Web or App
  const handleSendToWhatsApp = () => {
    if (!senderTemplate) return;
    const cleanPhone = senderRecipientPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      showAlert('error', 'Silakan isi nomor WhatsApp tujuan.');
      return;
    }

    const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const finalBody = interpolateTemplate(senderTemplate.body, senderVars);
    const encodedUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(finalBody)}`;
    window.open(encodedUrl, '_blank');
  };

  // Filtered Templates
  const filteredTemplates = templates.filter((tpl) => {
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const submissionsList = getSubmissions().slice(0, 15);
  const inquiriesList = getInquiries().slice(0, 15);
  const batchesList = getBatches().slice(0, 10);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Alert Notification */}
      {alert && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg animate-fadeIn ${
            alert.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
          }`}
        >
          <span>{alert.message}</span>
          <button type="button" onClick={() => setAlert(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-[#131622] to-slate-900 border-slate-800'
            : 'bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-emerald-200/80 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-bold uppercase tracking-wider">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>WhatsApp Follow-Up & Broadcast Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Template Pesan WhatsApp & Automasi
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Koleksi pesan resmi Beekoding untuk menyapa orang tua siswa, mengirim pengingat kelas,
            mengundang free trial, dan instruksi pembayaran dengan variabel otomatis 1-klik ke WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset template ke koleksi default resmi Beekoding?')) {
                resetWhatsAppTemplatesToDefault();
                refreshTemplates();
                showAlert('success', 'Template pesan WhatsApp di-reset ke data bawaan.');
              }
            }}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            title="Reset Template Default"
          >
            <RotateCcw className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Template Baru</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Total Template</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-500">{templates.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Format pesan siap pakai</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Kategori Pesan</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">6 Kategori</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Asesmen, kelas, pembayaran, dll</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Variabel Dinamis</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-500">13 Tag</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Auto-replace data siswa & kelas</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Integrasi WhatsApp</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-400">1-Klik wa.me</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Langsung ke obrolan orang tua</div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul template, kata kunci pesan, atau kategori..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-white focus:border-emerald-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua
          </button>
          {Object.entries(CATEGORY_LABELS).map(([catKey, catVal]) => {
            const Icon = catVal.icon;
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{catVal.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTemplates.map((tpl) => {
          const categoryMeta = CATEGORY_LABELS[tpl.category] || CATEGORY_LABELS.custom;
          const CategoryIcon = categoryMeta.icon;

          // Find variables present in template
          const usedVars = COMMON_VARIABLES.filter((v) => tpl.body.includes(`{${v.key}}`));

          return (
            <div
              key={tpl.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group hover:shadow-lg ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/40'
                  : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
              }`}
            >
              <div>
                {/* Header: Badge & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${categoryMeta.color}`}
                  >
                    <CategoryIcon className="w-3 h-3" />
                    <span>{categoryMeta.label}</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(tpl)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      title="Edit Template"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!tpl.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleDeleteTemplate(tpl)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Hapus Template"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-black tracking-tight mb-1 text-slate-900 dark:text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{tpl.description}</p>

                {/* WhatsApp Chat Bubble Mockup */}
                <div
                  className={`p-4 rounded-2xl rounded-tr-none border relative mb-4 font-sans text-xs leading-relaxed whitespace-pre-line shadow-inner max-h-56 overflow-y-auto ${
                    isDark
                      ? 'bg-[#0f241a] border-emerald-900/60 text-emerald-100'
                      : 'bg-[#e7f8ee] border-emerald-200 text-emerald-950'
                  }`}
                >
                  {tpl.body}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400/80 mt-2 font-mono">
                    <span>10:30</span>
                    <span className="font-bold text-emerald-400">✓✓</span>
                  </div>
                </div>

                {/* Used Variables Pills */}
                {usedVars.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Variabel Terdeteksi ({usedVars.length}):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {usedVars.map((v) => (
                        <span
                          key={v.key}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-amber-300 border border-amber-500/20"
                          title={`Variabel ${v.label}`}
                        >
                          {`{${v.key}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyText(tpl.body, tpl.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    copiedId === tpl.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title="Salin template mentah"
                >
                  {copiedId === tpl.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenQuickSender(tpl)}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan Cepat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: PENGIRIM CEPAT WHATSAPP (QUICK SENDER)           */}
      {/* ========================================================= */}
      {isSenderOpen && senderTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="sticky top-0 z-10 p-5 border-b backdrop-blur-md flex items-center justify-between bg-inherit border-inherit">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">
                    Quick WhatsApp Sender
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">
                    {senderTemplate.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSenderOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Sumber Data Penerima Cepat */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Pilih Cepat Penerima dari Sistem:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Select from Submissions */}
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 block mb-1">
                      Data Siswa Tes Bakat ({submissionsList.length})
                    </span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) handlePickSubmission(e.target.value);
                      }}
                      className={`w-full p-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                      }`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Siswa Asesmen...
                      </option>
                      {submissionsList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.profile.childName} ({s.totalScore} Poin)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select from Inquiries */}
                  <div>
                    <span className="text-[11px] font-bold text-blue-400 block mb-1">
                      Data Konsultasi / Lead WA ({inquiriesList.length})
                    </span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) handlePickInquiry(e.target.value);
                      }}
                      className={`w-full p-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                      }`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Kontak Lead...
                      </option>
                      {inquiriesList.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name} ({i.program})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select from Batches */}
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                      Data Jadwal Batch Kelas ({batchesList.length})
                    </span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) handlePickBatch(e.target.value);
                      }}
                      className={`w-full p-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                      }`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Jadwal Batch...
                      </option>
                      {batchesList.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Input Nomor Telepon Penerima */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  2. Nomor WhatsApp Tujuan (Format: 08xx atau +628xx)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={senderRecipientPhone}
                    onChange={(e) => setSenderRecipientPhone(e.target.value)}
                    placeholder="+62 812-3456-7890"
                    required
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Form Override Variabel */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. Sesuaikan Nilai Variabel Pesan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(senderVars)
                    .filter(([key]) => senderTemplate.body.includes(`{${key}}`))
                    .map(([key, val]) => (
                      <div key={key}>
                        <span className="text-[10px] font-mono text-amber-400 block mb-0.5">
                          {`{${key}}`}
                        </span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) =>
                            setSenderVars((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-medium ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                          }`}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Pratinjau Pesan yang Akan Terkirim */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    4. Pratinjau Pesan Siap Kirim (Live WhatsApp Preview):
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        interpolateTemplate(senderTemplate.body, senderVars),
                        'preview-copy'
                      )
                    }
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin Pesan</span>
                  </button>
                </div>

                <div
                  className={`p-5 rounded-2xl rounded-tr-none border whitespace-pre-line text-xs sm:text-sm leading-relaxed max-h-72 overflow-y-auto font-sans shadow-inner ${
                    isDark
                      ? 'bg-[#0f241a] border-emerald-800/80 text-emerald-100'
                      : 'bg-[#e7f8ee] border-emerald-300 text-emerald-950'
                  }`}
                >
                  {interpolateTemplate(senderTemplate.body, senderVars)}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400/80 mt-3 font-mono">
                    <span>Baru saja</span>
                    <span className="font-bold text-emerald-400">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSenderOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Tutup
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        interpolateTemplate(senderTemplate.body, senderVars),
                        'final-copy'
                      )
                    }
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 flex-1 sm:flex-none flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Salin Teks</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/25 flex-1 sm:flex-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Buka WhatsApp Sekarang</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: BUAT / EDIT TEMPLATE KUSTOM                      */}
      {/* ========================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="sticky top-0 z-10 p-5 border-b backdrop-blur-md flex items-center justify-between bg-inherit border-inherit">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">
                    {editingTemplate ? 'Edit Template Pesan WhatsApp' : 'Buat Template Pesan Baru'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Susun format komunikasi otomatis dengan dukungan variabel dinamis.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-6 space-y-4 text-xs sm:text-sm">
              {/* Judul Template */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Judul Template
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Undangan Sesi Konsultasi Privat Akhir Pekan"
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Kategori & Deskripsi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Kategori Pesan
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as TemplateCategory)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, val]) => (
                      <option key={k} value={k}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Deskripsi Ringkas
                  </label>
                  <input
                    type="text"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Contoh: Digunakan untuk menghubungi orang tua murid..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Tombol Sisip Variabel Cepat */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Klik untuk Menyisipkan Variabel Otomatis:
                </label>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl border border-dashed border-slate-700/60 dark:border-slate-800">
                  {COMMON_VARIABLES.map((v) => (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => setFormBody((prev) => prev + `{${v.key}}`)}
                      className="px-2 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-800 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors border border-amber-500/20 cursor-pointer"
                    >
                      + {`{${v.key}}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Isi Pesan WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Isi Pesan WhatsApp
                </label>
                <textarea
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  rows={9}
                  placeholder="Ketik draf pesan WhatsApp di sini... Gunakan *teks* untuk tebal dan _teks_ untuk miring."
                  required
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed transition-colors ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {editingTemplate ? 'Simpan Perubahan' : 'Simpan Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
