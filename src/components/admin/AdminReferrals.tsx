import React, { useState, useMemo } from 'react';
import {
  Share2,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Download,
  RotateCcw,
  CheckCircle2,
  Clock,
  MessageCircle,
  CreditCard,
  Edit2,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Building,
  UserCheck,
} from 'lucide-react';
import {
  type AmbassadorProfile,
  type ReferralRecord,
  type AmbassadorTier,
  type ReferralStatus,
  type ReferralRewardType,
  getAmbassadors,
  getReferralRecords,
  deleteAmbassador,
  updateReferralStatus,
  approveReferralPayout,
  resetAmbassadorsToDefault,
  resetReferralsToDefault,
  exportReferralsCSV,
  exportAmbassadorsCSV,
  generateAmbassadorWhatsAppInvite,
} from '../../services/adminStorage';
import { AdminAmbassadorModal } from './AdminAmbassadorModal';
import { AdminReferralPayoutModal } from './AdminReferralPayoutModal';

interface AdminReferralsProps {
  isDark: boolean;
}

export const AdminReferrals: React.FC<AdminReferralsProps> = ({ isDark }) => {
  const [activeSubTab, setActiveSubTab] = useState<'records' | 'ambassadors'>('records');

  // State Data
  const [ambassadors, setAmbassadors] = useState<AmbassadorProfile[]>(() => getAmbassadors());
  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => getReferralRecords());

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Modals State
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [editingAmbassador, setEditingAmbassador] = useState<AmbassadorProfile | null>(null);

  const [payoutModalReferral, setPayoutModalReferral] = useState<ReferralRecord | null>(null);

  // Confirmations
  const [deleteAmbassadorTarget, setDeleteAmbassadorTarget] = useState<AmbassadorProfile | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Toast / Copy Feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const reloadData = () => {
    setAmbassadors(getAmbassadors());
    setReferrals(getReferralRecords());
  };

  // KPIs
  const kpiData = useMemo(() => {
    const totalAmbassadors = ambassadors.length;
    const activeAmbassadors = ambassadors.filter((a) => a.isActive).length;

    const totalReferrals = referrals.length;
    const enrolledReferrals = referrals.filter((r) => r.status === 'enrolled' || r.status === 'reward_claimed').length;
    const conversionRate = totalReferrals > 0 ? Math.round((enrolledReferrals / totalReferrals) * 100) : 0;

    const totalDisbursedRp = referrals
      .filter((r) => r.payoutStatus === 'paid')
      .reduce((sum, r) => sum + r.rewardForAmbassadorRp, 0);

    const totalDisbursedXp = referrals
      .filter((r) => r.payoutStatus === 'paid')
      .reduce((sum, r) => sum + r.rewardBeeXp, 0);

    return {
      totalAmbassadors,
      activeAmbassadors,
      totalReferrals,
      enrolledReferrals,
      conversionRate,
      totalDisbursedRp,
      totalDisbursedXp,
    };
  }, [ambassadors, referrals]);

  // Filtered Referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.referredStudentName.toLowerCase().includes(q) ||
        r.ambassadorName.toLowerCase().includes(q) ||
        r.ambassadorCode.toLowerCase().includes(q) ||
        r.referredParentPhone.includes(q) ||
        r.targetCourse.toLowerCase().includes(q);

      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [referrals, searchQuery, statusFilter]);

  // Filtered & Ranked Ambassadors
  const filteredAmbassadors = useMemo(() => {
    const list = ambassadors.filter((a) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.referralCode.toLowerCase().includes(q) ||
        a.phone.includes(q);

      const matchTier = tierFilter === 'all' || a.tier === tierFilter;
      return matchSearch && matchTier;
    });

    // Sort by successful referrals descending
    return list.sort((a, b) => b.successfulReferrals - a.successfulReferrals || b.totalReferrals - a.totalReferrals);
  }, [ambassadors, searchQuery, tierFilter]);

  // Handlers
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleShareWhatsApp = (amb: AmbassadorProfile) => {
    const encoded = generateAmbassadorWhatsAppInvite(amb);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleStatusChange = (referralId: string, newStatus: ReferralStatus) => {
    updateReferralStatus(referralId, newStatus);
    reloadData();
  };

  const handlePayoutConfirm = (referralId: string, rewardType: ReferralRewardType, notes: string) => {
    approveReferralPayout(referralId, rewardType, notes);
    reloadData();
  };

  const handleDeleteAmbassador = () => {
    if (deleteAmbassadorTarget) {
      deleteAmbassador(deleteAmbassadorTarget.id);
      setDeleteAmbassadorTarget(null);
      reloadData();
    }
  };

  const handleResetToDefault = () => {
    resetAmbassadorsToDefault();
    resetReferralsToDefault();
    setShowResetConfirm(false);
    reloadData();
  };

  const getTierBadge = (tier: AmbassadorTier) => {
    switch (tier) {
      case 'diamond':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Diamond
          </span>
        );
      case 'gold':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Award className="w-3 h-3" /> Gold
          </span>
        );
      case 'silver':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/30 flex items-center gap-1">
            <Award className="w-3 h-3" /> Silver
          </span>
        );
      case 'bronze':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 flex items-center gap-1">
            <Award className="w-3 h-3" /> Bronze
          </span>
        );
    }
  };

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'reward_claimed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reward Cair
          </span>
        );
      case 'enrolled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> Siswa Aktif
          </span>
        );
      case 'trial_attended':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Hadir Trial
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            Dibatalkan
          </span>
        );
      case 'registered':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            Baru Daftar
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Program Duta Belajar & Referral</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pusat manajemen kode referral wali murid, mitra duta sekolah, dan konversi reward koding
              </p>
            </div>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => exportReferralsCSV()}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            title="Ekspor CSV Rekap Referral"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Referral CSV</span>
          </button>
          <button
            onClick={() => exportAmbassadorsCSV()}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            title="Ekspor CSV Daftar Duta Belajar"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Duta CSV</span>
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
            title="Reset Data Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setEditingAmbassador(null);
              setIsAmbassadorModalOpen(true);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Duta Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Duta Belajar
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{kpiData.totalAmbassadors}</span>
            <span className="text-xs text-slate-500">duta terdaftar</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{kpiData.activeAmbassadors} duta aktif membagikan kode</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Murid Direferensikan
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{kpiData.totalReferrals}</span>
            <span className="text-xs text-slate-500">anak diajak</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Pertumbuhan pendaftaran organik</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Siswa Sukses Bergabung
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{kpiData.enrolledReferrals}</span>
            <span className="text-xs text-slate-500">siswa resmi kursus</span>
          </div>
          <div className="mt-2 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            Tingkat konversi sukses: <strong>{kpiData.conversionRate}%</strong>
          </div>
        </div>

        {/* KPI 4 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Reward Terdistribusi
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              Rp {kpiData.totalDisbursedRp.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>+{kpiData.totalDisbursedXp.toLocaleString('id-ID')} Bee-XP telah dicairkan</span>
          </div>
        </div>
      </div>

      {/* Tabs Selector & Filter Toolbar */}
      <div
        className={`p-4 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Sub-Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('records')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeSubTab === 'records'
                  ? 'bg-amber-500 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Alur & Transaksi Referral ({filteredReferrals.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ambassadors')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeSubTab === 'ambassadors'
                  ? 'bg-amber-500 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Duta Belajar & Peringkat ({filteredAmbassadors.length})</span>
            </button>
          </div>

          {copiedCode && (
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" /> Kode {copiedCode} berhasil disalin!
            </div>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeSubTab === 'records'
                  ? 'Cari nama murid, nama duta, kode referral, no. HP...'
                  : 'Cari nama duta, kode referral, no. HP...'
              }
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Conditional Filters */}
          {activeSubTab === 'records' ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 py-2 text-xs rounded-xl border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                }`}
              >
                <option value="all">Semua Status Alur</option>
                <option value="registered">Baru Terdaftar</option>
                <option value="trial_attended">Hadir Trial Class</option>
                <option value="enrolled">Resmi Bergabung</option>
                <option value="reward_claimed">Reward Cair</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className={`px-3 py-2 text-xs rounded-xl border transition-colors w-full sm:w-auto ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                }`}
              >
                <option value="all">Semua Tier Duta</option>
                <option value="bronze">Bronze (1-2 Teman)</option>
                <option value="silver">Silver (3-5 Teman)</option>
                <option value="gold">Gold (6-10 Teman)</option>
                <option value="diamond">Diamond (11+ Teman)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'records' ? (
        /* TAB 1: REFERRAL RECORDS TABLE */
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-4 font-semibold">Murid yang Diajak</th>
                  <th className="py-3.5 px-4 font-semibold">Program Diminati</th>
                  <th className="py-3.5 px-4 font-semibold">Duta Pengajak & Kode</th>
                  <th className="py-3.5 px-4 font-semibold">Status Alur</th>
                  <th className="py-3.5 px-4 font-semibold">Benefit & Reward</th>
                  <th className="py-3.5 px-4 font-semibold">Pencairan</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 italic">
                      Tidak ada transaksi referral yang sesuai filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Murid */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          {r.referredStudentName}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>{r.referredParentPhone}</span>
                          <a
                            href={`https://wa.me/62${r.referredParentPhone.replace(/\D/g, '').replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 hover:text-emerald-600"
                            title="Hubungi Wali Murid via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Kursus */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {r.targetCourse}
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {new Date(r.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Duta */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {r.ambassadorName}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <button
                            onClick={() => handleCopyCode(r.ambassadorCode)}
                            className="px-1.5 py-0.5 font-mono text-[10px] font-bold rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-1"
                            title="Salin Kode"
                          >
                            <span>{r.ambassadorCode}</span>
                            <Copy className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(r.status)}
                        <div className="mt-1">
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value as ReferralStatus)}
                            className={`text-[10px] py-0.5 px-1.5 rounded-lg border ${
                              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                            }`}
                          >
                            <option value="registered">Terdaftar</option>
                            <option value="trial_attended">Hadir Trial</option>
                            <option value="enrolled">Resmi Bergabung</option>
                            <option value="reward_claimed">Reward Cair</option>
                            <option value="cancelled">Batalkan</option>
                          </select>
                        </div>
                      </td>

                      {/* Benefit */}
                      <td className="py-3.5 px-4">
                        <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Reward: Rp {r.rewardForAmbassadorRp.toLocaleString('id-ID')}
                        </div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                          +{r.rewardBeeXp} Bee-XP
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Diskon Teman: Rp {r.discountForFriendRp.toLocaleString('id-ID')}
                        </div>
                      </td>

                      {/* Status Pencairan */}
                      <td className="py-3.5 px-4">
                        {r.payoutStatus === 'paid' ? (
                          <div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              Lunas ({r.rewardType === 'tuition_discount' ? 'SPP' : 'Bank'})
                            </span>
                            {r.payoutDate && (
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {new Date(r.payoutDate).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </div>
                            )}
                          </div>
                        ) : r.payoutStatus === 'approved' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                            Siap Dicairkan
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Menunggu Enrolled</span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {r.status === 'enrolled' && r.payoutStatus !== 'paid' && (
                            <button
                              onClick={() => setPayoutModalReferral(r)}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-sm transition-colors"
                              title="Setujui dan Proses Pencairan Reward"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Cairkan</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              const note = prompt('Perbarui catatan referral:', r.notes || '');
                              if (note !== null) {
                                updateReferralStatus(r.id, r.status, note);
                                reloadData();
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                            title="Lihat / Edit Catatan"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* TAB 2: AMBASSADORS & LEADERBOARD */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbassadors.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 italic">
              Tidak ada profil duta belajar yang sesuai kriteria pencarian.
            </div>
          ) : (
            filteredAmbassadors.map((amb, index) => {
              const rankIcon =
                index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
              return (
                <div
                  key={amb.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  } shadow-sm hover:shadow-md`}
                >
                  <div>
                    {/* Top Row: Rank & Tier */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold">{rankIcon}</span>
                        {getTierBadge(amb.tier)}
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          amb.isActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                        }`}
                      >
                        {amb.isActive ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                      {amb.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize mb-3">
                      {amb.role === 'parent'
                        ? 'Wali Murid Aktif'
                        : amb.role === 'student'
                        ? 'Siswa Mandiri'
                        : amb.role === 'school_partner'
                        ? 'Mitra Sekolah / Komite'
                        : 'Alumni & Komunitas'}{' '}
                      • {amb.phone}
                    </p>

                    {/* Referral Code Box */}
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider">
                          Kode Referral
                        </p>
                        <p className="font-mono font-extrabold text-sm text-amber-800 dark:text-amber-300 tracking-wider">
                          {amb.referralCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyCode(amb.referralCode)}
                          className="p-1.5 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors"
                          title="Salin Kode"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShareWhatsApp(amb)}
                          className="p-1.5 rounded-lg hover:bg-amber-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
                          title="Buka Ajakan WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 mb-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">
                          Total Diajak
                        </span>
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {amb.totalReferrals} anak ({amb.successfulReferrals} sukses)
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">
                          Total Reward
                        </span>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                          Rp {amb.totalEarningsRp.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Bank Info preview */}
                    {amb.bankInfo?.accountNumber && (
                      <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>
                          {amb.bankInfo.bankName} {amb.bankInfo.accountNumber} ({amb.bankInfo.accountHolder})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setEditingAmbassador(amb);
                        setIsAmbassadorModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteAmbassadorTarget(amb)}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Hapus Duta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal Tambah/Edit Duta */}
      <AdminAmbassadorModal
        isOpen={isAmbassadorModalOpen}
        onClose={() => setIsAmbassadorModalOpen(false)}
        onSave={() => {
          reloadData();
          setIsAmbassadorModalOpen(false);
        }}
        editingAmbassador={editingAmbassador}
        isDark={isDark}
      />

      {/* Modal Pencairan Reward */}
      <AdminReferralPayoutModal
        isOpen={!!payoutModalReferral}
        onClose={() => setPayoutModalReferral(null)}
        referral={payoutModalReferral}
        onConfirmPayout={handlePayoutConfirm}
        isDark={isDark}
      />

      {/* Modal Konfirmasi Hapus Duta */}
      {deleteAmbassadorTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 border shadow-xl ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">Hapus Duta Belajar?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Anda yakin ingin menghapus profil duta <strong>{deleteAmbassadorTarget.name}</strong> (Kode: {deleteAmbassadorTarget.referralCode})? Aksi ini akan dicatat di log audit.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteAmbassadorTarget(null)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAmbassador}
                className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Reset Bawaan */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 border shadow-xl ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">Kembalikan Data Default?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Semua data duta belajar dan riwayat referral kustom akan direset ke 6 duta bawaan dan 10 riwayat transaksi awal.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                onClick={handleResetToDefault}
                className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
