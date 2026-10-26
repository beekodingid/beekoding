import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  PRINTABLE_WORKSHEETS,
  MEGA_BUNDLE_WORKSHEET,
  openPersonalizedWorksheetPrint,
  type PrintableWorksheet,
  type WorksheetAgeGroup,
} from '../../data/worksheetsData';
import { saveInquiry } from '../../services/adminStorage';
import { ConfettiCelebration } from '../talent/ConfettiCelebration';
import { siteConfig } from '../../data/content';
import {
  ArrowLeft,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  FileText,
  Star,
  Users,
  Clock,
  ShieldCheck,
  MessageCircle,
  Eye,
  X,
  Gift,
  BookOpen,
  Lightbulb,
} from 'lucide-react';

interface WorksheetsViewProps {
  onBackToHome: () => void;
  onOpenTrialEvents?: () => void;
  onOpenQuizMinat?: () => void;
}

interface SavedWorksheetLead {
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  unlockedAt: string;
}

const LEAD_STORAGE_KEY = 'beekoding_worksheet_lead_v1';

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({
  onBackToHome,
  onOpenTrialEvents,
  onOpenQuizMinat,
}) => {
  const { isDark } = useTheme();

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<WorksheetAgeGroup>('all');
  const [savedLead, setSavedLead] = useState<SavedWorksheetLead | null>(() => {
    try {
      const raw = localStorage.getItem(LEAD_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Lead Gate Modal State
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [pendingWorksheet, setPendingWorksheet] = useState<PrintableWorksheet | null>(null);
  const [pendingAction, setPendingAction] = useState<'download' | 'print'>('download');

  // Form inputs
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('8');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success & Preview Modal State
  const [showConfetti, setShowConfetti] = useState(false);
  const [justUnlockedWorksheet, setJustUnlockedWorksheet] = useState<PrintableWorksheet | null>(null);
  const [previewWorksheet, setPreviewWorksheet] = useState<PrintableWorksheet | null>(null);

  useEffect(() => {
    document.title =
      'Download Worksheet Logika Coding & Maze Anak SD Gratis (PDF) | Beekoding';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = 'Beekoding - Next-Gen Coding & AI Academy for Kids';
    };
  }, []);

  const triggerPdfDownload = (ws: PrintableWorksheet) => {
    const link = document.createElement('a');
    link.href = ws.pdfUrl;
    link.download = ws.pdfFilename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequestWorksheet = (
    ws: PrintableWorksheet,
    action: 'download' | 'print' = 'download'
  ) => {
    if (savedLead) {
      if (action === 'print') {
        openPersonalizedWorksheetPrint(ws, savedLead.childName, savedLead.childAge);
      } else {
        triggerPdfDownload(ws);
        setJustUnlockedWorksheet(ws);
      }
      return;
    }

    setPendingWorksheet(ws);
    setPendingAction(action);
    setFormError('');
    setGateModalOpen(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanParent = parentName.trim();
    const cleanChild = childName.trim() || 'Kreator Cilik';
    const cleanPhone = phone.replace(/[^\d+]/g, '').trim();

    if (cleanParent.length < 2) {
      setFormError('Mohon isi nama Ayah / Bunda terlebih dahulu.');
      return;
    }
    if (cleanPhone.length < 9) {
      setFormError('Mohon masukkan nomor WhatsApp aktif yang valid (contoh: 0812xxxx).');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const targetWs = pendingWorksheet || MEGA_BUNDLE_WORKSHEET;

    try {
      saveInquiry({
        name: `${cleanParent} (Ortu dari ${cleanChild}, ${childAge} Thn)`,
        email: '-',
        phone: cleanPhone,
        role: 'Orang Tua (Lead Magnet Worksheet PDF)',
        program: `Download PDF: ${targetWs.title}`,
        message: `Mengunduh Printable Logic Worksheet (${targetWs.numberBadge}) untuk anak bernama ${cleanChild} (Usia ${childAge} Tahun).`,
        type: 'konsultasi',
      });
    } catch (err) {
      console.warn('Silent inquiry save fallback:', err);
    }

    const leadData: SavedWorksheetLead = {
      parentName: cleanParent,
      phone: cleanPhone,
      childName: cleanChild,
      childAge,
      unlockedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leadData));
    } catch {
      // ignore storage quota errors
    }

    setTimeout(() => {
      setSavedLead(leadData);
      setIsSubmitting(false);
      setGateModalOpen(false);
      setShowConfetti(true);
      setJustUnlockedWorksheet(targetWs);

      if (pendingAction === 'print') {
        openPersonalizedWorksheetPrint(targetWs, cleanChild, childAge);
      } else {
        triggerPdfDownload(targetWs);
      }
    }, 450);
  };

  const handleSendToWhatsApp = (ws: PrintableWorksheet) => {
    const leadName = savedLead?.parentName || 'Orang Tua';
    const cName = savedLead?.childName || 'Anak';
    const cAge = savedLead?.childAge || '8';
    const fullPdfUrl = `${window.location.origin}${ws.pdfUrl}`;
    const text = `Halo Tim Beekoding! 👋 Saya *${leadName}* (Orang tua dari *${cName}*, usia ${cAge} tahun).\n\nSaya baru saja mengunduh *${ws.title}* (${fullPdfUrl}) dan ingin mendapatkan info jadwal *Kelas Trial Gratis Coding & AI* untuk anak saya. Terima kasih!`;
    const waUrl = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredWorksheets =
    selectedAgeGroup === 'all'
      ? PRINTABLE_WORKSHEETS
      : PRINTABLE_WORKSHEETS.filter((w) => w.ageGroup === selectedAgeGroup);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0a0d14] text-slate-100' : 'bg-[#fffdf9] text-slate-900'
      }`}
    >
      {showConfetti && <ConfettiCelebration onComplete={() => setShowConfetti(false)} />}

      {/* Sticky Top Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#0d111a]/90 border-slate-800'
            : 'bg-white/90 border-amber-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 text-sm font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                : 'text-slate-700 hover:text-slate-950 hover:bg-amber-100/60'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-3">
            {savedLead ? (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  isDark
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Akses Terbuka: {savedLead.childName} ({savedLead.childAge} Thn)</span>
              </div>
            ) : (
              <div
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  isDark
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    : 'bg-amber-100 border-amber-300 text-amber-900'
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Gratis • Cetak A4 di Rumah</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5 border ${
              isDark
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Unplugged Coding Activity • Kurikulum Logika Anak</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] leading-tight mb-5">
            Lembar Kerja <span className="text-amber-500">Logika Koding, Labirin</span> &amp; Mewarnai Beeby (PDF Gratis)
          </h1>

          <p
            className={`text-base sm:text-lg leading-relaxed mb-6 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kurangi waktu menatap layar HP (*Screen Time*) dengan 6 lembar aktivitas cetak A4 yang
            melatih **Algoritma, Pattern Recognition, Debugging, dan Kreativitas** anak usia 5–13
            tahun di rumah!
          </p>

          {/* Social Proof Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              Diunduh 1.480+ Orang Tua Indonesia
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-emerald-500" />
              Ukuran Standar Kertas A4 + Kunci Jawaban Orang Tua
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Rating 4.9/5 dari Komunitas Bunda &amp; Guru SD
            </span>
          </div>
        </div>

        {/* FEATURED MEGA BUNDLE 6-IN-1 BANNER */}
        <div
          className={`relative rounded-3xl p-6 sm:p-9 mb-14 border-2 overflow-hidden transition-all ${
            isDark
              ? 'bg-gradient-to-br from-amber-500/15 via-[#121723] to-[#0f131d] border-amber-500/40 shadow-2xl shadow-amber-500/5'
              : 'bg-gradient-to-br from-amber-100/90 via-amber-50/70 to-white border-amber-400 shadow-xl shadow-amber-500/10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                  🔥 PALING FAVORIT • BUNDEL LENGKAP 6-IN-1
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isDark ? 'bg-slate-800 text-amber-300' : 'bg-white text-amber-900 border border-amber-300'
                  }`}
                >
                  {MEGA_BUNDLE_WORKSHEET.ageRange} • 6 Halaman A4 Penuh
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] leading-snug">
                {MEGA_BUNDLE_WORKSHEET.title}
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {MEGA_BUNDLE_WORKSHEET.description}
              </p>

              <ul className="space-y-2 pt-1">
                {MEGA_BUNDLE_WORKSHEET.previewHighlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div
                className={`rounded-2xl p-5 border text-center ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
                }`}
              >
                <div className="text-4xl mb-2">📚🐝</div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                  E-Book Worksheet Siap Cetak
                </div>
                <div className="text-2xl font-black font-['Space_Grotesk'] mb-1">
                  Rp 0 <span className="text-xs font-normal line-through opacity-60">Rp 79.000</span>
                </div>
                <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Langsung unduh file PDF ke HP / Laptop Anda
                </p>

                <button
                  type="button"
                  onClick={() => handleRequestWorksheet(MEGA_BUNDLE_WORKSHEET, 'download')}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Bundel 6-in-1 (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRequestWorksheet(MEGA_BUNDLE_WORKSHEET, 'print')}
                  className={`w-full mt-2.5 py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'border-amber-300 hover:bg-amber-50 text-slate-800'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cetak dengan Nama Anak di Header</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AGE FILTER TABS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk']">
              Pilih Lembar Kerja Sesuai Usia &amp; Topik
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Klik pada salah satu misi di bawah untuk melihat preview atau mengunduh PDF satuan
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Semua (6 Lembar)' },
              { id: '5-8', label: 'Usia 5–8 Thn (TK/SD)' },
              { id: '7-10', label: 'Usia 7–10 Thn (SD)' },
              { id: '8-13', label: 'Usia 8–13 Thn (SD/SMP)' },
            ].map((tab) => {
              const active = selectedAgeGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedAgeGroup(tab.id as WorksheetAgeGroup)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 WORKSHEETS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredWorksheets.map((ws) => (
            <div
              key={ws.id}
              className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#111622] border-slate-800 hover:border-amber-500/40 shadow-lg'
                  : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-md'
              }`}
            >
              <div>
                {/* Visual Worksheet Mini Preview Header */}
                <div
                  className={`p-5 border-b relative ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-amber-50/70 border-amber-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                      {ws.numberBadge}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                        isDark ? 'bg-slate-800 text-amber-300' : 'bg-white text-slate-700 border border-amber-200'
                      }`}
                    >
                      {ws.ageRange}
                    </span>
                  </div>

                  {/* Simulated A4 Paper Miniature */}
                  <div
                    onClick={() => setPreviewWorksheet(ws)}
                    className={`rounded-xl p-3.5 border cursor-pointer group transition-all ${
                      isDark
                        ? 'bg-[#0b0f17] border-slate-800 hover:border-amber-500/50'
                        : 'bg-white border-amber-200 hover:border-amber-400 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{ws.iconEmoji}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 group-hover:underline">
                        <Eye className="w-3 h-3" /> Preview Isi
                      </span>
                    </div>
                    <h3 className="font-black text-base font-['Space_Grotesk'] leading-snug mb-1">
                      {ws.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {ws.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Skills Trained Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {ws.skillsTrained.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          isDark
                            ? 'bg-slate-800/90 text-slate-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 text-xs">
                    {ws.previewHighlights.map((hl, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Parent Tip Box */}
                  <div
                    className={`p-3 rounded-xl text-xs border ${
                      isDark
                        ? 'bg-amber-500/5 border-amber-500/20 text-slate-300'
                        : 'bg-amber-50/60 border-amber-200/80 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-amber-500 flex items-center gap-1 mb-0.5">
                      <Lightbulb className="w-3.5 h-3.5" /> Tips Orang Tua:
                    </div>
                    <p className="leading-relaxed">{ws.parentTip}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold opacity-75 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" /> Estimasi {ws.estimatedMinutes} Menit
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-3 h-3 text-emerald-500" /> Format A4 Siap Cetak
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestWorksheet(ws, 'download')}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/15 transition-all cursor-pointer"
                >
                  {savedLead ? (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF Sekarang</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unduh PDF Gratis</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleRequestWorksheet(ws, 'print')}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isDark
                      ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                      : 'border-slate-200 hover:bg-amber-50 text-slate-700'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cetak dengan Nama Anak</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Cross-Sell CTA to Quiz Minat & Free Trial Class */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border text-center ${
            isDark ? 'bg-[#111622] border-slate-800' : 'bg-amber-50/80 border-amber-200'
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] mb-3">
            Anak Suka Memecahkan Teka-Teki di Atas? 🌟
          </h3>
          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto mb-6 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Itu tandanya si kecil memiliki potensi **Computational Thinking** yang kuat! Lanjutkan
            ke **Kuis Minat Coding 1 Menit** atau klaim **Sesi Trial Class Live 1-on-1 Gratis**
            bersama mentor Beekoding.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenTrialEvents && (
              <button
                type="button"
                onClick={onOpenTrialEvents}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                🚀 Klaim Kelas Trial Coding Gratis
              </button>
            )}
            {onOpenQuizMinat && (
              <button
                type="button"
                onClick={onOpenQuizMinat}
                className={`px-6 py-3.5 rounded-xl font-bold text-sm border cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-white'
                    : 'border-amber-300 bg-white hover:bg-amber-100 text-slate-900'
                }`}
              >
                🧭 Ikuti Kuis Minat Coding (1 Menit)
              </button>
            )}
          </div>
        </div>
      </main>

      {/* ===================================================================== */}
      {/* MODAL 1: LEAD CAPTURE GATE (NAMA ORANG TUA, ANAK & WHATSAPP)          */}
      {/* ===================================================================== */}
      {gateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div
            className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark
                ? 'bg-[#121723] border-amber-500/40 text-slate-100'
                : 'bg-white border-amber-300 text-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setGateModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full opacity-70 hover:opacity-100 cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 text-2xl">
                🎁
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-500">
                Akses Instan • 100% Gratis
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] mt-2">
                Kemana Lembar Kerja Ini Kami Berikan?
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Isi data singkat di bawah untuk membuka akses unduhan **seluruh 6 PDF Worksheet +
                Kunci Jawaban Orang Tua** sekaligus mencetak nama anak di lembar kerja!
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1">
                  Nama Ayah / Bunda <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Contoh: Bunda Rina"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 focus:border-amber-500 text-white'
                      : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 focus:border-amber-500 text-white'
                      : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold mb-1">
                    Nama Panggilan Anak <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Contoh: Kenzo"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-all ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 focus:border-amber-500 text-white'
                        : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Usia Anak</label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className={`w-full px-2.5 py-2.5 rounded-xl text-sm border outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((age) => (
                      <option key={age} value={String(age)}>
                        {age} Thn
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? 'Menyiapkan Lembar Kerja...'
                    : 'Buka & Unduh PDF Sekarang (Gratis)'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] opacity-70 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Data aman &amp; bebas spam sesuai Kebijakan Privasi Beekoding.</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: POST-DOWNLOAD SUCCESS & WHATSAPP BONUS                       */}
      {/* ===================================================================== */}
      {justUnlockedWorksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div
            className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl text-center ${
              isDark
                ? 'bg-[#121723] border-emerald-500/40 text-slate-100'
                : 'bg-white border-emerald-400 text-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setJustUnlockedWorksheet(null)}
              className="absolute top-4 right-4 p-2 rounded-full opacity-70 hover:opacity-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black font-['Space_Grotesk'] mb-1">
              Yeay! PDF Sedang Diunduh 🎉
            </h3>
            <p className={`text-xs sm:text-sm mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              File <strong>{justUnlockedWorksheet.title}</strong> telah dibuka untuk{' '}
              <strong>{savedLead?.childName || 'Ananda'}</strong>. Anda kini juga bebas mengunduh ke-6
              lembar kerja lainnya tanpa perlu mengisi ulang formulir!
            </p>

            <div className="space-y-2.5">
              <a
                href={justUnlockedWorksheet.pdfUrl}
                download={justUnlockedWorksheet.pdfFilename}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Klik di Sini Jika Unduhan Belum Mulai</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  openPersonalizedWorksheetPrint(
                    justUnlockedWorksheet,
                    savedLead?.childName || 'Kreator Cilik',
                    savedLead?.childAge || '8'
                  )
                }
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-white'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-900'
                }`}
              >
                <Printer className="w-4 h-4 text-amber-500" />
                <span>Cetak Versi Nama "{savedLead?.childName}" di Kertas A4</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendToWhatsApp(justUnlockedWorksheet)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Klaim Bonus Sesi Trial Live via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: PREVIEW WORKSHEET DETAILS                                    */}
      {/* ===================================================================== */}
      {previewWorksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark
                ? 'bg-[#121723] border-slate-700 text-slate-100'
                : 'bg-white border-amber-300 text-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setPreviewWorksheet(null)}
              className="absolute top-4 right-4 p-2 rounded-full opacity-70 hover:opacity-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500 text-slate-950">
                {previewWorksheet.numberBadge}
              </span>
              <span className="text-xs font-bold text-amber-500">
                {previewWorksheet.ageRange} • Level {previewWorksheet.difficulty}
              </span>
            </div>

            <h3 className="text-xl font-black font-['Space_Grotesk'] mb-2">
              {previewWorksheet.iconEmoji} {previewWorksheet.title}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {previewWorksheet.description}
            </p>

            <div
              className={`rounded-2xl p-4 border mb-5 space-y-2 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Apa Saja yang Ada di Lembar PDF Ini?
              </div>
              <ul className="space-y-1.5 text-xs">
                {previewWorksheet.previewHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const ws = previewWorksheet;
                  setPreviewWorksheet(null);
                  handleRequestWorksheet(ws, 'download');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PDF Gratis</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const ws = previewWorksheet;
                  setPreviewWorksheet(null);
                  handleRequestWorksheet(ws, 'print');
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-white'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-900'
                }`}
              >
                <Printer className="w-4 h-4 text-amber-500" />
                <span>Cetak A4</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
