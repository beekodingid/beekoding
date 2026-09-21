import React, { useState } from 'react';
import {
  type WhatsAppGatewayConfig,
  type QueuedWhatsAppMessage,
  type DispatchTriggerType,
  type DispatchMessageStatus,
  type GatewayProvider,
  getGatewayConfig,
  saveGatewayConfig,
  updateGatewayTriggerStatus,
  getQueuedMessages,
  deleteQueuedMessage,
  clearQueue,
  retryMessage,
  processSingleQueuedMessage,
  processAllPendingQueue,
  generateAutomatedBatchReminders,
  exportGatewayLogsCSV,
  enqueueMessage,
} from '../../services/adminStorage';
import {
  Smartphone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Trash2,
  Search,
  FileSpreadsheet,
  Settings,
  Sparkles,
  Calendar,
  CheckCheck,
  Zap,
  Copy,
  Phone,
  MessageSquare,
  ExternalLink,
  Eye,
  X,
  Play,
  Pause,
  Bell,
  CreditCard,
  HeartHandshake,
  Award,
} from 'lucide-react';

interface AdminWhatsAppGatewayProps {
  isDark: boolean;
}

const TRIGGER_META: Record<
  DispatchTriggerType,
  { label: string; icon: any; color: string; timing: string; defaultTemplate: string }
> = {
  class_reminder_h1: {
    label: 'Pengingat Sesi Kelas H-1',
    icon: Calendar,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    timing: 'Terkirim 24 jam sebelum sesi kelas berlangsung',
    defaultTemplate: 'Mengingatkan jadwal sesi koding ananda besok lengkap dengan link room virtual & mentor.',
  },
  attendance_summary: {
    label: 'Rekap Presensi & Catatan Materi',
    icon: CheckCheck,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    timing: 'Terkirim 15 menit setelah mentor menutup absensi kelas',
    defaultTemplate: 'Laporan kehadiran anak hari ini beserta resume topik koding yang berhasil dipelajari.',
  },
  report_card_published: {
    label: 'Penerbitan Rapor Akademik',
    icon: Award,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    timing: 'Terkirim saat status rapor diubah menjadi "Diterbitkan"',
    defaultTemplate: 'Notifikasi rapor kelulusan modul siap diunduh dalam format PDF beserta predikat nilai.',
  },
  payment_invoice: {
    label: 'Pengingat Tagihan SPP',
    icon: CreditCard,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    timing: 'Terkirim H-3 dan saat hari H jatuh tempo pembayaran',
    defaultTemplate: 'Informasi tagihan invoice berkala dan instruksi pembayaran via Transfer / QRIS.',
  },
  payment_success: {
    label: 'Kuitansi Pembayaran Lunas',
    icon: CheckCircle2,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    timing: 'Terkirim otomatis saat verifikasi transaksi berstatus Berhasil',
    defaultTemplate: 'Tanda terima resmi nomor kuitansi pelunasan dan konfirmasi status aktif siswa.',
  },
  counseling_reminder: {
    label: 'Reminder Konseling Belajar 1-on-1',
    icon: HeartHandshake,
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    timing: 'Terkirim 2 jam sebelum sesi bimbingan bersama konselor',
    defaultTemplate: 'Pengingat jadwal konsultasi privat, link Zoom meeting, dan nama konselor.',
  },
  trial_class_invitation: {
    label: 'Undangan Trial Class & Workshop',
    icon: Sparkles,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    timing: 'Terkirim setelah formulir pendaftaran event diterima',
    defaultTemplate: 'Konfirmasi pendaftaran free trial class anak dan panduan persiapan perangkat.',
  },
  quiz_announcement: {
    label: 'Pengumuman Kuis Baru',
    icon: Zap,
    color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    timing: 'Terkirim saat evaluasi kuis mingguan dirilis oleh instruktur',
    defaultTemplate: 'Tantangan kuis logika koding interaktif untuk mengasah pemahaman materi.',
  },
  custom_broadcast: {
    label: 'Siaran Pengumuman Khusus',
    icon: Bell,
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    timing: 'Terkirim sesuai jadwal broadcast manual administrator',
    defaultTemplate: 'Siaran berita, pengumuman libur nasional, atau update kebijakan akademik.',
  },
};

export const AdminWhatsAppGateway: React.FC<AdminWhatsAppGatewayProps> = ({ isDark }) => {
  const [config, setConfig] = useState<WhatsAppGatewayConfig>(() => getGatewayConfig());
  const [queue, setQueue] = useState<QueuedWhatsAppMessage[]>(() => getQueuedMessages());
  const [activeTab, setActiveTab] = useState<'queue' | 'triggers' | 'logs' | 'tester'>('queue');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter & Search states for queue & logs
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DispatchMessageStatus>('all');

  // Modal Settings
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [cfgProvider, setCfgProvider] = useState<GatewayProvider>(config.provider);
  const [cfgDeviceNumber, setCfgDeviceNumber] = useState(config.deviceNumber);
  const [cfgDeviceName, setCfgDeviceName] = useState(config.deviceName);
  const [cfgApiKey, setCfgApiKey] = useState(config.apiKeyOrToken);
  const [cfgDelay, setCfgDelay] = useState(config.antiSpamDelaySeconds);
  const [cfgQuota, setCfgQuota] = useState(config.dailyQuota);

  // Interactive Tester States
  const [testPhone, setTestPhone] = useState('+62 812-3456-7890');
  const [testName, setTestName] = useState('Bunda Sarah (Wali Kenzo)');
  const [testTrigger, setTestTrigger] = useState<DispatchTriggerType>('class_reminder_h1');
  const [testStudentName, setTestStudentName] = useState('Kenzo Alvaro');
  const [testBatchName, setTestBatchName] = useState('Scratch Game Maker Batch 4');
  const [testMeetUrl, setTestMeetUrl] = useState('https://meet.google.com/bk-junior-kenzo');
  const [testInstructor, setTestInstructor] = useState('Kak Sarah Amalia');
  const [testTime, setTestTime] = useState('Sabtu, 09.00 - 10.30 WIB');
  const [testCustomMessage, setTestCustomMessage] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);

  // Message Detail View Modal
  const [selectedMessage, setSelectedMessage] = useState<QueuedWhatsAppMessage | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshData = () => {
    setConfig(getGatewayConfig());
    setQueue(getQueuedMessages());
  };

  // Master Automation Toggle
  const handleToggleMasterAutomation = () => {
    const nextState = !config.isAutomationActive;
    const updated = saveGatewayConfig({ isAutomationActive: nextState });
    setConfig(updated);
    showToast(
      nextState
        ? 'Mesin Otomatisasi WhatsApp telah DIAKTIFKAN!'
        : 'Mesin Otomatisasi WhatsApp telah DIJEDA sementara.'
    );
  };

  // Individual Trigger Toggle
  const handleToggleTrigger = (trigger: DispatchTriggerType) => {
    const currentVal = !!config.autoTriggers[trigger];
    const updated = updateGatewayTriggerStatus(trigger, !currentVal);
    setConfig(updated);
    showToast(`Pemicu "${TRIGGER_META[trigger].label}" berhasil di-${!currentVal ? 'aktifkan' : 'non-aktifkan'}.`);
  };

  // Run Batch Scanner
  const handleScanBatches = () => {
    const res = generateAutomatedBatchReminders();
    refreshData();
    if (res.count > 0) {
      showToast(`Berhasil menjadwalkan ${res.count} pesan pengingat kelas baru ke antrean!`);
    } else {
      showToast('Semua siswa pada batch aktif sudah memiliki pengingat di antrean.');
    }
  };

  // Process all queue items
  const handleProcessAllQueue = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    showToast('Memproses antrean pesan keluar...');

    setTimeout(() => {
      const res = processAllPendingQueue();
      refreshData();
      setIsProcessing(false);
      showToast(`Sukses mengeksekusi ${res.processedCount} pesan ke WhatsApp Gateway!`);
    }, 1200);
  };

  // Process single queue message
  const handleProcessSingle = (id: string) => {
    const res = processSingleQueuedMessage(id);
    if (res.success) {
      refreshData();
      showToast('Pesan berhasil diproses dan dikirim!');
    }
  };

  // Retry single message
  const handleRetry = (id: string) => {
    const ok = retryMessage(id);
    if (ok) {
      refreshData();
      showToast('Pesan dikembalikan ke status antrean (Pending) untuk dicoba kembali.');
    }
  };

  // Delete single message
  const handleDeleteMessage = (id: string) => {
    if (confirm('Hapus pesan ini dari antrean/log?')) {
      deleteQueuedMessage(id);
      refreshData();
      showToast('Pesan berhasil dihapus.');
    }
  };

  // Clear all pending queue
  const handleClearQueue = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan seluruh pesan berstatus Antrean (Pending)?')) {
      clearQueue('pending');
      refreshData();
      showToast('Antrean pending berhasil dikosongkan.');
    }
  };

  // Save Gateway Settings
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveGatewayConfig({
      provider: cfgProvider,
      deviceNumber: cfgDeviceNumber.trim(),
      deviceName: cfgDeviceName.trim(),
      apiKeyOrToken: cfgApiKey.trim(),
      antiSpamDelaySeconds: Number(cfgDelay),
      dailyQuota: Number(cfgQuota),
    });
    setConfig(updated);
    setShowConfigModal(false);
    showToast('Konfigurasi WhatsApp Gateway berhasil diperbarui.');
  };

  // Build simulated message for tester
  const getCompiledTestMessage = () => {
    if (testCustomMessage.trim()) return testCustomMessage;
    return `Halo ${testName}! 🐝\n\nMengingatkan sesi koding besok untuk ananda *${testStudentName}* pada kelas "${testBatchName}".\n\n⏰ Waktu: ${testTime}\n📌 Link Kelas: ${testMeetUrl}\n👨‍🏫 Mentor: ${testInstructor}\n\nMohon pastikan laptop & koneksi internet ananda telah siap. Sampai jumpa di kelas koding BeeKoding! 🚀✨`;
  };

  // Send Test Message
  const handleSendTestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingTest(true);

    const compiled = getCompiledTestMessage();
    setTimeout(() => {
      enqueueMessage({
        recipientPhone: testPhone,
        recipientName: testName,
        recipientRole: 'parent',
        triggerType: testTrigger,
        content: compiled,
        status: 'delivered',
        scheduledAt: new Date().toISOString(),
      });
      refreshData();
      setIsSendingTest(false);
      showToast(`Pesan uji coba berhasil dikirim ke ${testPhone}!`);
    }, 600);
  };

  // Auto-fill student data into tester
  const handleSelectStudentForTest = (studentName: string, phone: string, parentName: string) => {
    setTestStudentName(studentName);
    setTestPhone(phone || '+62 812-3456-7890');
    setTestName(parentName ? `${parentName} (Wali ${studentName})` : `Wali ${studentName}`);
    showToast(`Data ananda ${studentName} berhasil dimuat ke formulir uji coba.`);
  };

  // Metrics calculation
  const pendingCount = queue.filter((m) => m.status === 'pending').length;
  const deliveredCount = queue.filter((m) => m.status === 'delivered' || m.status === 'read').length;
  const failedCount = queue.filter((m) => m.status === 'failed').length;
  const successRate = queue.length > 0 ? Math.round((deliveredCount / queue.length) * 100) : 100;

  // Filtered queue items
  const filteredQueue = queue.filter((m) => {
    const matchSearch =
      m.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.recipientPhone.includes(searchQuery) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        className={`p-6 rounded-3xl border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 shadow-xl shadow-black/20'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                WhatsApp Gateway & Auto-Dispatcher
              </span>
              <span className="text-xs text-slate-400">• Anti-Spam Protected</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Otomatisasi Notifikasi WhatsApp Gateway
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Mesin otomatisasi pengiriman pesan pengingat kelas H-1, rekap presensi, link rapor, invoice SPP,
              dan reminder konseling langsung ke nomor WhatsApp orang tua murid.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Master Automation Toggle */}
            <button
              type="button"
              onClick={handleToggleMasterAutomation}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                config.isAutomationActive
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300'
              }`}
            >
              {config.isAutomationActive ? (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Otomasi: AKTIF</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Otomasi: DIJEDA</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={exportGatewayLogsCSV}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Ekspor Log Pengiriman Pesan ke CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Ekspor Log</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCfgProvider(config.provider);
                setCfgDeviceNumber(config.deviceNumber);
                setCfgDeviceName(config.deviceName);
                setCfgApiKey(config.apiKeyOrToken);
                setCfgDelay(config.antiSpamDelaySeconds);
                setCfgQuota(config.dailyQuota);
                setShowConfigModal(true);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-amber-500" />
              <span>Konfigurasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gateway Status & Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Device Status */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider">Device Gateway</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <div className="text-base font-black text-slate-900 dark:text-white truncate">
            {config.deviceNumber}
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold mt-0.5 flex items-center gap-1 truncate">
            <CheckCircle2 className="w-3 h-3" />
            <span>Terhubung ({config.provider.toUpperCase().replace(/_/g, ' ')})</span>
          </p>
        </div>

        {/* Daily Quota */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider">Kuota Hari Ini</span>
            <Smartphone className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {config.quotaUsedToday} <span className="text-xs text-slate-400 font-normal">/ {config.dailyQuota}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-amber-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (config.quotaUsedToday / config.dailyQuota) * 100)}%` }}
            />
          </div>
        </div>

        {/* Pending Queue */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider">Antrean Pending</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-sky-500">{pendingCount} Pesan</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Jeda anti-spam {config.antiSpamDelaySeconds} detik</p>
        </div>

        {/* Delivery Rate */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider">Delivery Rate</span>
            <CheckCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-500">{successRate}%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {deliveredCount} terkirim • {failedCount} gagal
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'queue'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Antrean Pesan ({pendingCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('triggers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'triggers'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Aturan Pemicu Otomatis ({Object.values(config.autoTriggers).filter(Boolean).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'logs'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Riwayat Pesan Keluar ({queue.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tester')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'tester'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Simulator Uji Coba & HP Preview</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: LIVE MESSAGE QUEUE                                             */}
      {/* ===================================================================== */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={handleProcessAllQueue}
                disabled={isProcessing || pendingCount === 0}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>Jalankan Antrean Sekarang ({pendingCount})</span>
              </button>

              <button
                type="button"
                onClick={handleScanBatches}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 transition-all flex items-center gap-2 cursor-pointer"
                title="Scan jadwal batch aktif & masukkan reminder ke antrean"
              >
                <Sparkles className="w-4 h-4" />
                <span>Scan Pengingat Kelas H-1</span>
              </button>

              {pendingCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearQueue}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  Kosongkan Pending
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari penerima / no. HP..."
                  className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="delivered">Terkirim</option>
                <option value="read">Dibaca</option>
                <option value="failed">Gagal</option>
              </select>
            </div>
          </div>

          {/* Queue List Cards */}
          <div className="space-y-3">
            {filteredQueue.length === 0 ? (
              <div
                className={`p-12 text-center rounded-3xl border ${
                  isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                <Smartphone className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Tidak Ada Pesan yang Sesuai
                </h3>
                <p className="text-xs mt-1">
                  Klik tombol <strong>"Scan Pengingat Kelas H-1"</strong> untuk mengisi antrean secara otomatis dari jadwal batch.
                </p>
              </div>
            ) : (
              filteredQueue.map((item) => {
                const triggerInfo = TRIGGER_META[item.triggerType];
                const TriggerIcon = triggerInfo?.icon || MessageSquare;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      item.status === 'pending'
                        ? 'border-sky-500/40 bg-sky-500/5'
                        : item.status === 'failed'
                        ? 'border-rose-500/40 bg-rose-500/5'
                        : isDark
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          triggerInfo?.color || 'text-slate-400 bg-slate-800 border-slate-700'
                        }`}
                      >
                        <TriggerIcon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                            {item.recipientName}
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {item.recipientPhone}
                          </span>

                          <span
                            className={`text-[10px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider ${
                              item.status === 'pending'
                                ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                                : item.status === 'delivered'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : item.status === 'read'
                                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {item.status}
                          </span>

                          <span className="text-[10px] text-slate-400">
                            • {triggerInfo?.label || item.triggerType}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>

                        {item.errorMessage && (
                          <p className="text-[11px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.errorMessage}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      {item.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleProcessSingle(item.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Kirim</span>
                        </button>
                      )}

                      {item.status === 'failed' && (
                        <button
                          type="button"
                          onClick={() => handleRetry(item.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500 text-amber-500 hover:text-slate-950 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedMessage(item)}
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Lihat Rincian Pesan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: AUTOMATION TRIGGER RULES                                      */}
      {/* ===================================================================== */}
      {activeTab === 'triggers' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Aktifkan pemicu otomatis untuk membiarkan sistem menyusun dan mengeksekusi pesan sesuai siklus kalender belajar.
              </span>
            </div>
            <span className="font-bold text-amber-500">
              {Object.values(config.autoTriggers).filter(Boolean).length} dari 9 Pemicu Aktif
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(TRIGGER_META) as DispatchTriggerType[]).map((trigKey) => {
              const meta = TRIGGER_META[trigKey];
              const Icon = meta.icon;
              const isEnabled = !!config.autoTriggers[trigKey];

              return (
                <div
                  key={trigKey}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                    isEnabled
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : isDark
                      ? 'bg-slate-900/50 border-slate-800'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 ${meta.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleTrigger(trigKey)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                          isEnabled ? 'bg-emerald-500' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            isEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                      {meta.label}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                      {meta.defaultTemplate}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate">{meta.timing}</span>
                    <span
                      className={`font-bold shrink-0 ${
                        isEnabled ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    >
                      {isEnabled ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: OUTBOX & DELIVERY LOGS                                        */}
      {/* ===================================================================== */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Menampilkan <strong>{filteredQueue.length}</strong> riwayat log pengiriman pesan keluar.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportGatewayLogsCSV}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Unduh CSV Log</span>
              </button>
            </div>
          </div>

          {/* Logs Table */}
          <div
            className={`rounded-3xl border overflow-hidden ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b font-extrabold uppercase tracking-wider text-[10px] ${
                    isDark ? 'bg-slate-800/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <tr>
                    <th className="py-3 px-4">Penerima & Nomor</th>
                    <th className="py-3 px-4">Tipe Pemicu</th>
                    <th className="py-3 px-4">Isi Pesan Cuplikan</th>
                    <th className="py-3 px-4">Waktu Terkirim</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredQueue.map((log) => (
                    <tr key={log.id} className="hover:bg-amber-500/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        <div>{log.recipientName}</div>
                        <div className="text-[11px] font-mono text-slate-400">{log.recipientPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {TRIGGER_META[log.triggerType]?.label || log.triggerType}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-500 dark:text-slate-400">
                        {log.content}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {log.sentAt ? new Date(log.sentAt).toLocaleString('id-ID') : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            log.status === 'delivered' || log.status === 'read'
                              ? 'bg-emerald-500/15 text-emerald-500'
                              : log.status === 'pending'
                              ? 'bg-sky-500/15 text-sky-500'
                              : 'bg-rose-500/15 text-rose-500'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedMessage(log)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            title="Detail Pesan"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`https://wa.me/${log.recipientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              log.content
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10"
                            title="Buka di WhatsApp Web"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: SIMULATOR & MOBILE SCREEN PREVIEW                             */}
      {/* ===================================================================== */}
      {activeTab === 'tester' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Pengujian Cepat (Left 7 Cols) */}
          <div
            className={`lg:col-span-7 p-6 rounded-3xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Formulir Uji Coba Pengiriman Langsung
                </h3>
                <p className="text-xs text-slate-400">
                  Ketik nomor tujuan dan gunakan data siswa untuk mencoba otomatisasi dispatch.
                </p>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Sandbox Mode
              </span>
            </div>

            <form onSubmit={handleSendTestMessage} className="space-y-4">
              {/* Quick Pick from Enrolled Students */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Pilih Data Siswa Cepat (Quick Autofill):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'Kenzo Alvaro', phone: '+62 812-3456-7890', parent: 'Bunda Sarah' },
                    { name: 'Alya Putri', phone: '+62 813-9876-5432', parent: 'Ayah Hendra' },
                    { name: 'Rizky Ramadhan', phone: '+62 857-1122-3344', parent: 'Bunda Rini' },
                    { name: 'Shakila Az-Zahra', phone: '+62 819-5566-7788', parent: 'Ayah Denny' },
                  ].map((st) => (
                    <button
                      key={st.name}
                      type="button"
                      onClick={() => handleSelectStudentForTest(st.name, st.phone, st.parent)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      {st.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    No. WhatsApp Tujuan *
                  </label>
                  <input
                    type="text"
                    required
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Nama Penerima (Wali Murid) *
                  </label>
                  <input
                    type="text"
                    required
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Bunda Sarah (Wali Kenzo)"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Jenis Pemicu (Trigger)
                  </label>
                  <select
                    value={testTrigger}
                    onChange={(e) => setTestTrigger(e.target.value as DispatchTriggerType)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {Object.entries(TRIGGER_META).map(([key, meta]) => (
                      <option key={key} value={key}>
                        {meta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Nama Batch Kelas
                  </label>
                  <input
                    type="text"
                    value={testBatchName}
                    onChange={(e) => setTestBatchName(e.target.value)}
                    placeholder="Scratch Game Maker Batch 4"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Waktu / Sesi Kelas
                  </label>
                  <input
                    type="text"
                    value={testTime}
                    onChange={(e) => setTestTime(e.target.value)}
                    placeholder="Sabtu, 09.00 - 10.30 WIB"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Link Virtual Meet
                  </label>
                  <input
                    type="text"
                    value={testMeetUrl}
                    onChange={(e) => setTestMeetUrl(e.target.value)}
                    placeholder="https://meet.google.com/bk-junior-kenzo"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Mentor Pengajar
                  </label>
                  <input
                    type="text"
                    value={testInstructor}
                    onChange={(e) => setTestInstructor(e.target.value)}
                    placeholder="Kak Sarah Amalia"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Teks Kustom Pesan (Opsional - Biarkan kosong untuk template otomatis):
                </label>
                <textarea
                  rows={3}
                  value={testCustomMessage}
                  onChange={(e) => setTestCustomMessage(e.target.value)}
                  placeholder="Ketik pesan kustom di sini jika ingin mengubah isi pesan..."
                  className={`w-full p-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  ⚡ Pesan akan tercatat ke Antrean & Outbox Gateway secara instan.
                </span>

                <button
                  type="submit"
                  disabled={isSendingTest}
                  className="px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSendingTest ? <RotateCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Simulasikan Kirim Pesan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Realistic Mobile Screen Mockup (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Pratinjau Layar WhatsApp Orang Tua</span>
            </span>

            {/* Phone Shell */}
            <div className="w-full max-w-[320px] rounded-[40px] border-4 border-slate-800 dark:border-slate-700 bg-slate-950 shadow-2xl p-3 overflow-hidden">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                <div className="w-8 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* Screen Area */}
              <div className="rounded-[28px] overflow-hidden bg-[#0b141a] text-slate-100 flex flex-col h-[480px] shadow-inner">
                {/* WhatsApp Chat Top Bar */}
                <div className="bg-[#202c33] p-3 flex items-center justify-between border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="/bee-mascot.png"
                      alt="BeeKoding Bot"
                      className="w-8 h-8 rounded-full bg-amber-500/20 p-1 object-contain shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs truncate text-white flex items-center gap-1">
                        <span>BeeKoding Hotline</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-current shrink-0" />
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium">online • Official Bot</div>
                    </div>
                  </div>
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>

                {/* Chat Background with Bubbles */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[radial-gradient(#121b22_1px,transparent_1px)] [background-size:12px_12px] flex flex-col justify-end">
                  {/* Incoming Chat Bubble from BeeKoding Gateway */}
                  <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tl-xs shadow-md max-w-[90%] self-start space-y-1.5 text-xs leading-relaxed">
                    <p className="whitespace-pre-line break-words text-[11px]">
                      {getCompiledTestMessage()}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200">
                      <span>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Bottom Input Bar */}
                <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-slate-800 shrink-0">
                  <div className="flex-1 bg-[#2a3942] rounded-full py-1 px-3 text-[11px] text-slate-400">
                    Ketik pesan...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                    <Send className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL CONFIGURATION SETTINGS                                          */}
      {/* ===================================================================== */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 transition-all ${
              isDark ? 'bg-[#151928] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base">Konfigurasi WhatsApp Gateway</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Provider Koneksi Gateway
                </label>
                <select
                  value={cfgProvider}
                  onChange={(e) => setCfgProvider(e.target.value as GatewayProvider)}
                  className={`w-full px-3.5 py-2 rounded-xl border font-semibold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="sandbox_simulator">Sandbox Simulator (Demo Bawaan - Tanpa Biaya)</option>
                  <option value="meta_cloud_api">Meta WhatsApp Business Cloud API (Official)</option>
                  <option value="fonnte">Fonnte WhatsApp API Gateway</option>
                  <option value="wablas">Wablas Gateway Indonesia</option>
                  <option value="custom_webhook">Custom Webhook Integration</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Nomor WhatsApp Gateway
                  </label>
                  <input
                    type="text"
                    required
                    value={cfgDeviceNumber}
                    onChange={(e) => setCfgDeviceNumber(e.target.value)}
                    placeholder="+62 853-1131-7127"
                    className={`w-full px-3.5 py-2 rounded-xl border font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Nama Device / Sender
                  </label>
                  <input
                    type="text"
                    required
                    value={cfgDeviceName}
                    onChange={(e) => setCfgDeviceName(e.target.value)}
                    placeholder="BeeKoding Hotline Bot"
                    className={`w-full px-3.5 py-2 rounded-xl border font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                  API Key / Token Otentikasi
                </label>
                <input
                  type="password"
                  value={cfgApiKey}
                  onChange={(e) => setCfgApiKey(e.target.value)}
                  placeholder="bk_live_token_xxxx"
                  className={`w-full px-3.5 py-2 rounded-xl border font-mono ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Jeda Anti-Spam (Detik)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={cfgDelay}
                    onChange={(e) => setCfgDelay(Number(e.target.value))}
                    className={`w-full px-3.5 py-2 rounded-xl border font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Batas Kuota Harian
                  </label>
                  <input
                    type="number"
                    min={50}
                    value={cfgQuota}
                    onChange={(e) => setCfgQuota(Number(e.target.value))}
                    className={`w-full px-3.5 py-2 rounded-xl border font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL DETAIL PESAN                                                    */}
      {/* ===================================================================== */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 transition-all ${
              isDark ? 'bg-[#151928] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-base">Rincian Pesan WhatsApp</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Penerima</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedMessage.recipientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Nomor WhatsApp</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedMessage.recipientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tipe Pemicu</span>
                  <span className="font-semibold text-amber-500">{TRIGGER_META[selectedMessage.triggerType]?.label || selectedMessage.triggerType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-black text-emerald-500 uppercase">{selectedMessage.status}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Isi Pesan:</span>
                <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {selectedMessage.content}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMessage.content);
                    showToast('Isi pesan berhasil disalin ke clipboard!');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Pesan</span>
                </button>

                <a
                  href={`https://wa.me/${selectedMessage.recipientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    selectedMessage.content
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di WhatsApp Web</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
