import React, { useState, useMemo } from 'react';
import {
  getLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
  exportResourcesCSV,
  resetLearningResourcesToDefault,
  type LearningResource,
  type ResourceType,
  type ResourceAccessTier,
} from '../../services/adminStorage';
import { AdminResourceModal } from './AdminResourceModal';
import {
  FolderDown,
  Plus,
  Search,
  FileText,
  Code2,
  Presentation,
  BookOpen,
  Download,
  ExternalLink,
  Edit2,
  Trash2,
  Sparkles,
  RotateCcw,
  LayoutGrid,
  List,
} from 'lucide-react';

interface AdminResourcesProps {
  isDark: boolean;
}

export const AdminResources: React.FC<AdminResourcesProps> = ({ isDark }) => {
  const [resources, setResources] = useState<LearningResource[]>(() =>
    getLearningResources()
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | ResourceAccessTier>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | ResourceType>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<LearningResource | null>(null);

  const refreshData = () => {
    setResources(getLearningResources());
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q));

      const matchTier = tierFilter === 'all' || res.tier === tierFilter;
      const matchType = typeFilter === 'all' || res.type === typeFilter;

      return matchSearch && matchTier && matchType;
    });
  }, [resources, searchQuery, tierFilter, typeFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const totalCount = resources.length;
    const worksheetCount = resources.filter((r) => r.type === 'worksheet').length;
    const starterCodeCount = resources.filter((r) => r.type === 'starter_code').length;
    const totalDownloads = resources.reduce((acc, curr) => acc + curr.downloadsCount, 0);

    return {
      totalCount,
      worksheetCount,
      starterCodeCount,
      totalDownloads,
    };
  }, [resources]);

  const handleSave = (
    data: Omit<LearningResource, 'id' | 'downloadsCount' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingResource) {
      updateLearningResource(editingResource.id, data);
    } else {
      createLearningResource(data);
    }
    refreshData();
    setIsModalOpen(false);
    setEditingResource(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Hapus materi ajar "${title}" dari pusat unduhan?`)) {
      deleteLearningResource(id);
      refreshData();
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Reset seluruh materi bahan ajar kembali ke pustaka kurikulum default Beekoding?'
      )
    ) {
      resetLearningResourcesToDefault();
      refreshData();
    }
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'worksheet':
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'slide':
        return <Presentation className="w-4 h-4 text-blue-500" />;
      case 'starter_code':
        return <Code2 className="w-4 h-4 text-amber-500" />;
      case 'cheatsheet':
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      default:
        return <FolderDown className="w-4 h-4 text-pink-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-[#161a29] via-[#121624] to-[#161a29] border-amber-500/20 shadow-xl'
            : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-200 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <FolderDown className="w-3.5 h-3.5" />
            <span>Learning Resource & Worksheets Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
            Pusat Bahan Ajar & Lembar Kerja Siswa
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kelola modul belajar, lembar aktivitas PDF, slide kurikulum, starter code Scratch/GitHub,
            serta cheatsheet sintaks koding untuk diakses mandiri oleh siswa dan wali murid.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => {
              setEditingResource(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Bahan Ajar</span>
          </button>

          <button
            type="button"
            onClick={() => exportResourcesCSV(filteredResources)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-100'
            }`}
            title="Reset Contoh Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot watermark */}
        <img
          src="/bee-mascot.png"
          alt="Bee Mascot"
          className="absolute -right-6 -bottom-10 w-44 h-44 opacity-10 pointer-events-none"
        />
      </div>

      {/* 4 Cards Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Bahan Ajar */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Bahan Ajar
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {metrics.totalCount} Modul
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tersebar di 3 jenjang usia</p>
        </div>

        {/* Card 2: Lembar Kerja PDF */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Worksheet PDF Siap Cetak
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {metrics.worksheetCount} Berkas
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Latihan & puzzle logika komputasi</p>
        </div>

        {/* Card 3: Starter Code */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Starter Code & Template
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-blue-600 dark:text-blue-400">
            {metrics.starterCodeCount} Proyek
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Scratch, Lua Roblox & GitHub Repo</p>
        </div>

        {/* Card 4: Total Unduhan */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Akses & Unduhan
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {metrics.totalDownloads} Kali
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Oleh siswa & wali murid</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        className={`p-4 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul, tag, atau format materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-2xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden transition-all ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior Explorer (6-9 Thn)</option>
            <option value="middle">Middle Coder (10-12 Thn)</option>
            <option value="teens">Teens Innovator (13-17 Thn)</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Tipe Materi</option>
            <option value="worksheet">Lembar Kerja / Worksheet</option>
            <option value="starter_code">Starter Code & Template</option>
            <option value="cheatsheet">Cheatsheet Ringkas</option>
            <option value="slide">Slide Presentasi</option>
            <option value="guide">Buku Panduan</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Tampilan Grid Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Tampilan Tabel Rinci"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Grid or Table */}
      {filteredResources.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <FolderDown className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
          <h4 className="font-bold text-base">Tidak Ada Bahan Ajar yang Sesuai</h4>
          <p className="text-xs text-slate-400 mt-1">
            Coba sesuaikan kata kunci pencarian atau filter jenjang yang Anda pilih.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className={`p-6 rounded-3xl border transition-all relative flex flex-col justify-between group ${
                res.isFeatured
                  ? isDark
                    ? 'bg-gradient-to-br from-amber-500/10 via-[#121624] to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-amber-300 shadow-sm'
                  : isDark
                  ? 'bg-[#121624] border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {getTypeIcon(res.type)}
                      <span>{res.type.replace('_', ' ')}</span>
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        res.tier === 'junior'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : res.tier === 'middle'
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                          : res.tier === 'teens'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {res.tier === 'all'
                        ? 'SEMUA JENJANG'
                        : res.tier.toUpperCase()}
                      {res.sessionNumber ? ` • SESI ${res.sessionNumber}` : ''}
                    </span>
                  </div>

                  {res.isFeatured && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 shrink-0">
                      <Sparkles className="w-3 h-3" /> Unggulan
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-amber-500 transition-colors">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {res.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-400">
                  <span className="font-bold uppercase">{res.fileFormat}</span>
                  {res.fileSize && ` • ${res.fileSize}`}
                  <span className="block mt-0.5">{res.downloadsCount}x diunduh</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={res.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                    title="Unduh Berkas"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingResource(res);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                    title="Edit Materi"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(res.id, res.title)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Materi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div
          className={`rounded-3xl border overflow-hidden transition-colors ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr
                  className={`border-b font-bold ${
                    isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3.5 px-4">Judul Bahan Ajar</th>
                  <th className="py-3.5 px-4">Jenjang & Sesi</th>
                  <th className="py-3.5 px-4">Tipe & Format</th>
                  <th className="py-3.5 px-4 text-center">Ukuran</th>
                  <th className="py-3.5 px-4 text-center">Unduhan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredResources.map((res) => (
                  <tr key={res.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {getTypeIcon(res.type)}
                        <span>{res.title}</span>
                        {res.isFeatured && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-500 font-bold">
                            Unggulan
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {res.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold uppercase text-amber-600 dark:text-amber-400">
                        {res.tier}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {res.sessionNumber ? `Sesi ${res.sessionNumber}` : 'Materi Umum'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium">{res.type.replace('_', ' ')}</div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">
                        {res.fileFormat}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-mono text-slate-500">
                      {res.fileSize || '-'}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-bold text-emerald-500">
                      {res.downloadsCount}x
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <a
                        href={res.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors inline-block"
                        title="Buka Tautan Unduh"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingResource(res);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                        title="Edit Data"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(res.id, res.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <AdminResourceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingResource(null);
          }}
          onSave={handleSave}
          resource={editingResource}
          isDark={isDark}
        />
      )}
    </div>
  );
};
