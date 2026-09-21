import React, { useState } from 'react';
import {
  type AgeTier,
  type AssessmentCategory,
  type TalentQuestion,
  type QuestionOption,
  CATEGORIES,
  CATEGORY_ORDER,
} from '../../data/talentQuestions';
import {
  getAllQuestions,
  saveQuestion,
  deleteQuestion,
  resetQuestionsToDefault,
} from '../../services/adminStorage';
import {
  BookOpen,
  Plus,
  Search,
  RotateCcw,
  Edit2,
  Trash2,
  Sparkles,
  HelpCircle,
  X,
  Save,
} from 'lucide-react';

interface AdminQuestionBankProps {
  isDark: boolean;
}

export const AdminQuestionBank: React.FC<AdminQuestionBankProps> = ({ isDark }) => {
  const [questionsMap, setQuestionsMap] = useState<Record<AgeTier, TalentQuestion[]>>(() =>
    getAllQuestions()
  );

  const [activeTier, setActiveTier] = useState<AgeTier>('junior');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State (Create or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<TalentQuestion | null>(null);

  // Form inputs
  const [formTier, setFormTier] = useState<AgeTier>('junior');
  const [formCategory, setFormCategory] = useState<AssessmentCategory>('logical');
  const [formSectionNumber, setFormSectionNumber] = useState<number>(1);
  const [formQuestionNumber, setFormQuestionNumber] = useState<number>(1);
  const [formPrompt, setFormPrompt] = useState('');
  const [formVisualHint, setFormVisualHint] = useState('');
  const [formOptions, setFormOptions] = useState<QuestionOption[]>([
    { id: 'A', text: '', score: 20 },
    { id: 'B', text: '', score: 10 },
    { id: 'C', text: '', score: 5 },
    { id: 'D', text: '', score: 0 },
  ]);

  const loadQuestions = () => {
    const data = getAllQuestions();
    setQuestionsMap(data);
  };

  const currentQuestions = questionsMap[activeTier] || [];

  // Filter questions
  const filteredQuestions = currentQuestions.filter((q) => {
    const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const qSearch = searchQuery.toLowerCase().trim();
    const matchSearch =
      !qSearch ||
      q.prompt.toLowerCase().includes(qSearch) ||
      q.options.some((opt) => opt.text.toLowerCase().includes(qSearch)) ||
      (q.visualHint && q.visualHint.toLowerCase().includes(qSearch));
    return matchCategory && matchSearch;
  });

  const handleOpenCreateModal = () => {
    setEditingQuestion(null);
    setFormTier(activeTier);
    setFormCategory('logical');
    setFormSectionNumber(1);
    setFormQuestionNumber((currentQuestions.length % 5) + 1);
    setFormPrompt('');
    setFormVisualHint('');
    setFormOptions([
      { id: 'A', text: '', score: 20 },
      { id: 'B', text: '', score: 10 },
      { id: 'C', text: '', score: 5 },
      { id: 'D', text: '', score: 0 },
    ]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q: TalentQuestion) => {
    setEditingQuestion(q);
    setFormTier(q.tier);
    setFormCategory(q.category);
    setFormSectionNumber(q.sectionNumber);
    setFormQuestionNumber(q.questionNumber);
    setFormPrompt(q.prompt);
    setFormVisualHint(q.visualHint || '');
    setFormOptions(JSON.parse(JSON.stringify(q.options)));
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPrompt.trim()) {
      alert('Teks pertanyaan tidak boleh kosong.');
      return;
    }

    const questionToSave: TalentQuestion = {
      id: editingQuestion ? editingQuestion.id : `custom-${formTier}-${Date.now()}`,
      tier: formTier,
      category: formCategory,
      sectionNumber: Number(formSectionNumber),
      questionNumber: Number(formQuestionNumber),
      prompt: formPrompt.trim(),
      visualHint: formVisualHint.trim() || undefined,
      options: formOptions,
    };

    saveQuestion(questionToSave);
    loadQuestions();
    setIsModalOpen(false);
  };

  const handleDelete = (tier: AgeTier, questionId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      deleteQuestion(tier, questionId);
      loadQuestions();
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Reset semua bank soal ke 120 soal original Beekoding? Perubahan kustom akan dihapus.'
      )
    ) {
      resetQuestionsToDefault();
      loadQuestions();
    }
  };

  const handleOptionChange = (index: number, field: keyof QuestionOption, val: any) => {
    const updated = [...formOptions];
    updated[index] = {
      ...updated[index],
      [field]: val,
    };
    setFormOptions(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Bank Soal Asesmen Bakat Digital
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/25">
              {currentQuestions.length} Soal di Level Ini
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
            Dikelompokkan berdasarkan 3 level jenjang sekolah/usia dan 8 pilar pemikiran digital.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetToDefault}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Reset ke 120 Soal Bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset 120 Soal Default</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Soal Baru</span>
          </button>
        </div>
      </div>

      {/* 3 Level Jenjang Tabs (School Level & Age Group) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Junior */}
        <button
          type="button"
          onClick={() => setActiveTier('junior')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTier === 'junior'
              ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10 ring-2 ring-amber-500/30'
              : isDark
              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Level 1 • Junior
            </span>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-500/10">
              {questionsMap.junior.length} Soal
            </span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base">Junior Explorer</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Usia 6 - 9 Tahun • Jenjang TK B & SD Kelas 1-3
          </p>
        </button>

        {/* Middle */}
        <button
          type="button"
          onClick={() => setActiveTier('middle')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTier === 'middle'
              ? 'bg-blue-500/15 border-blue-500/50 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/30'
              : isDark
              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
              Level 2 • Intermediate
            </span>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-500/10">
              {questionsMap.middle.length} Soal
            </span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base">Intermediate Coder</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Usia 10 - 12 Tahun • Jenjang SD Kelas 4-6
          </p>
        </button>

        {/* Teens */}
        <button
          type="button"
          onClick={() => setActiveTier('teens')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTier === 'teens'
              ? 'bg-purple-500/15 border-purple-500/50 shadow-md shadow-purple-500/10 ring-2 ring-purple-500/30'
              : isDark
              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
              Level 3 • Teens
            </span>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-500/10">
              {questionsMap.teens.length} Soal
            </span>
          </div>
          <h3 className="font-extrabold text-sm sm:text-base">Teens Innovator</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Usia 13 - 17 Tahun • Jenjang SMP & SMA
          </p>
        </button>
      </div>

      {/* Filter Category & Search Bar */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="w-full sm:flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan soal, petunjuk visual, atau opsi..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Category Dropdown Filter */}
          <div className="w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Kategori (8 Pilar)</option>
              {CATEGORY_ORDER.map((catKey) => (
                <option key={catKey} value={catKey}>
                  {CATEGORIES[catKey].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 8 Pilar Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semua Pilar
          </button>
          {CATEGORY_ORDER.map((catKey) => {
            const cat = CATEGORIES[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-transparent font-bold text-white shadow-sm'
                    : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-300'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : undefined,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed p-6">
            <HelpCircle className="w-10 h-10 mx-auto mb-2 text-slate-400" />
            <h4 className="font-bold text-sm mb-1">Tidak ada soal yang sesuai</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tidak ditemukan soal pada jenjang dan filter ini. Silakan tambahkan soal baru atau ubah kata kunci pencarian.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const cat = CATEGORIES[q.category] || CATEGORIES.logical;

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Card Top: Section, Question Number, Category, Actions */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Babak {q.sectionNumber} • Soal #{q.questionNumber}
                    </span>

                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{cat.name}</span>
                    </span>

                    {q.visualHint && (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 font-mono">
                        Visual: {q.visualHint}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(q)}
                      className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Edit Soal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(q.tier, q.id)}
                      className="p-1.5 rounded-lg border border-transparent text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Prompt Text */}
                <p className="text-sm sm:text-base font-semibold mb-4 leading-relaxed">
                  {q.prompt}
                </p>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isMaxScore = opt.score >= 20;

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                          isMaxScore
                            ? isDark
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : isDark
                            ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                              isMaxScore
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isMaxScore
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          +{opt.score} pt
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Form Tambah / Edit Soal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl my-auto transition-all overflow-hidden flex flex-col max-h-[90vh] ${
              isDark ? 'bg-[#121622] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-5 border-b flex items-center justify-between ${
                isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base">
                  {editingQuestion ? 'Edit Soal Asesmen' : 'Tambah Soal Asesmen Baru'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-500/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveQuestion} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Jenjang / Tier */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Level Jenjang
                  </label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as AgeTier)}
                    className={`w-full p-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="junior">Junior (6-9 Thn)</option>
                    <option value="middle">Intermediate (10-12 Thn)</option>
                    <option value="teens">Teens (13-17 Thn)</option>
                  </select>
                </div>

                {/* Kategori Pilar */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Pilar Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AssessmentCategory)}
                    className={`w-full p-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    {CATEGORY_ORDER.map((catKey) => (
                      <option key={catKey} value={catKey}>
                        {CATEGORIES[catKey].name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visual Hint */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Visual Hint (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formVisualHint}
                    onChange={(e) => setFormVisualHint(e.target.value)}
                    placeholder="Contoh: 🥕 🐇 vs 🐟 🐱"
                    className={`w-full p-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Teks Pertanyaan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Teks Pertanyaan / Soal
                </label>
                <textarea
                  rows={3}
                  required
                  value={formPrompt}
                  onChange={(e) => setFormPrompt(e.target.value)}
                  placeholder="Tuliskan pertanyaan kuis logika / bakat anak di sini..."
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              {/* 4 Pilihan Opsi Jawaban */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pilihan Jawaban & Bobot Skor (0 - 20)
                </label>

                {formOptions.map((opt, idx) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-xs shrink-0">
                      {opt.id}
                    </span>

                    <input
                      type="text"
                      required
                      value={opt.text}
                      onChange={(e) => handleOptionChange(idx, 'text', e.target.value)}
                      placeholder={`Teks pilihan jawaban ${opt.id}...`}
                      className={`flex-1 p-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                      }`}
                    />

                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="5"
                        value={opt.score}
                        onChange={(e) => handleOptionChange(idx, 'score', Number(e.target.value))}
                        className={`w-16 p-2 rounded-xl border text-xs text-center font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                        }`}
                      />
                      <span className="text-[11px] text-slate-400">pt</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Soal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
