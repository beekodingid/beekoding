import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  QrCode,
  Sparkles,
  Bot,
  AlertCircle,
  Smartphone,
  Share2,
} from 'lucide-react';
import { QRCodeView } from '../common/QRCodeView';
import {
  type NotificationPayload,
  openWhatsAppDirect,
  openEmailClient,
  queueToWhatsAppGateway,
  normalizeWhatsAppPhone,
} from '../../services/parentNotification';

export interface ShareParentNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentType: 'certificate' | 'report';
  studentName: string;
  identifier: string; // Certificate Number or Report ID
  payload: NotificationPayload;
  isDark?: boolean;
}

export const ShareParentNotificationModal: React.FC<ShareParentNotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  documentType,
  studentName,
  identifier,
  payload,
  isDark = false,
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email' | 'link'>('whatsapp');
  const [phone, setPhone] = useState(payload.recipientPhone);
  const [email, setEmail] = useState(payload.recipientEmail);
  const [waText, setWaText] = useState(payload.whatsappText);
  const [emailSubject, setEmailSubject] = useState(payload.emailSubject);
  const [emailBody, setEmailBody] = useState(payload.emailBody);

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [queuedSuccess, setQueuedSuccess] = useState(false);

  // Sync state when payload changes
  useEffect(() => {
    setPhone(payload.recipientPhone);
    setEmail(payload.recipientEmail);
    setWaText(payload.whatsappText);
    setEmailSubject(payload.emailSubject);
    setEmailBody(payload.emailBody);
    setQueuedSuccess(false);
  }, [payload]);

  if (!isOpen) return null;

  const handleCopy = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2200);
  };

  const handleOpenWhatsApp = () => {
    if (!phone.trim()) {
      alert('Silakan masukkan nomor WhatsApp orang tua terlebih dahulu.');
      return;
    }
    openWhatsAppDirect(phone, waText);
  };

  const handleQueueGateway = () => {
    if (!phone.trim()) {
      alert('Silakan masukkan nomor WhatsApp orang tua terlebih dahulu.');
      return;
    }
    const trigger = documentType === 'certificate' ? 'custom_broadcast' : 'report_card_published';
    queueToWhatsAppGateway(phone, payload.recipientName, trigger, waText);
    setQueuedSuccess(true);
    setTimeout(() => setQueuedSuccess(false), 4000);
  };

  const handleOpenEmail = () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Silakan masukkan alamat email yang valid.');
      return;
    }
    openEmailClient(email, emailSubject, emailBody);
  };

  const normalizedNumber = normalizeWhatsAppPhone(phone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto flex flex-col ${
          isDark ? 'bg-[#10141f] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between gap-4 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a27]' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">{title}</h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {documentType === 'certificate' ? 'Sertifikat' : 'Rapor Belajar'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Siswa: <span className="font-bold text-slate-700 dark:text-slate-200">{studentName}</span> •{' '}
                <span className="font-mono">{identifier}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-2 bg-slate-50/50 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`pb-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Kirim Email</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`pb-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'link'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Tautan & QR Verifikasi</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* TAB 1: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              {queuedSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <Bot className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>
                    <strong>Pesan berhasil dijadwalkan!</strong> Pesan otomatis telah dimasukkan ke
                    antrean WhatsApp Gateway Beekoding untuk dikirimkan ke wali murid.
                  </span>
                </div>
              )}

              {/* Input Nomor Telepon */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Nomor WhatsApp Orang Tua / Wali
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890 atau 6281234567890"
                    className={`w-full pl-10 pr-24 py-2.5 rounded-xl text-xs font-mono font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  {normalizedNumber && (
                    <span className="absolute right-3 top-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      +{normalizedNumber}
                    </span>
                  )}
                </div>
                {!phone.trim() && (
                  <p className="text-[11px] text-amber-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Nomor wali belum tercatat. Masukkan nomor
                    di atas untuk mengirim pesan langsung.
                  </p>
                )}
              </div>

              {/* Teks Pesan WhatsApp */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Isi Pesan WhatsApp (Memuat Tautan Verifikasi)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(waText, 'wa_text')}
                    className="text-[11px] font-bold text-slate-500 hover:text-emerald-500 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedType === 'wa_text' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={waText}
                  onChange={(e) => setWaText(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 leading-relaxed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Action Buttons for WhatsApp */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleQueueGateway}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm'
                  }`}
                  title="Jadwalkan ke sistem Gateway agar dikirim otomatis di background"
                >
                  <Bot className="w-4 h-4 text-emerald-500" />
                  <span>Jadwalkan ke Gateway</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(waText, 'wa_text_btn')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      copiedType === 'wa_text_btn'
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : isDark
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                    }`}
                  >
                    {copiedType === 'wa_text_btn' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedType === 'wa_text_btn' ? 'Tersalin!' : 'Salin Pesan'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Buka WhatsApp Sekarang</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              {/* Input Email Penerima */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Alamat Email Orang Tua / Wali
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: orangtua@gmail.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
                {!email.trim() && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Masukkan email orang tua untuk membuka aplikasi email (Gmail, Outlook, Apple
                    Mail).
                  </p>
                )}
              </div>

              {/* Subjek Email */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Subjek Email
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(emailSubject, 'email_sub')}
                    className="text-[11px] font-bold text-slate-500 hover:text-sky-500 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedType === 'email_sub' ? (
                      <>
                        <Check className="w-3 h-3 text-sky-500" />
                        <span className="text-sky-500">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Subjek</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Isi Email */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Isi Email Resmi
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(emailBody, 'email_body')}
                    className="text-[11px] font-bold text-slate-500 hover:text-sky-500 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedType === 'email_body' ? (
                      <>
                        <Check className="w-3 h-3 text-sky-500" />
                        <span className="text-sky-500">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Isi Email</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={7}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-sky-500/50 leading-relaxed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                />
              </div>

              {/* Action Buttons for Email */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopy(emailBody, 'email_copy_all')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    copiedType === 'email_copy_all'
                      ? 'bg-sky-500 text-white border-sky-500'
                      : isDark
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                  }`}
                >
                  {copiedType === 'email_copy_all' ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedType === 'email_copy_all' ? 'Tersalin!' : 'Salin Teks Lengkap'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Buka di Aplikasi Email (Mailto)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TAUTAN & QR VERIFIKASI */}
          {activeTab === 'link' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl border bg-amber-500/5 border-amber-500/20 flex flex-col sm:flex-row items-center gap-5">
                {/* QR Code Container */}
                <div className="bg-white p-3 rounded-2xl border-2 border-amber-400 shadow-md shrink-0 flex flex-col items-center">
                  <QRCodeView
                    value={payload.portalUrl}
                    size={110}
                    darkColor="#0f172a"
                    lightColor="#ffffff"
                  />
                  <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                    Scan via HP
                  </span>
                </div>

                {/* Deskripsi Tautan */}
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Tautan Verifikasi Resmi Portal Siswa</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Tautan ini dapat diakses secara publik oleh orang tua, siswa, atau institusi lain
                    untuk melihat dokumen digital asli, mengecek keabsahan akreditasi, serta mencetak
                    ulang lembar A4.
                  </p>

                  <div className="pt-1">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                      <input
                        type="text"
                        readOnly
                        value={payload.portalUrl}
                        className="w-full bg-transparent text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(payload.portalUrl, 'portal_url')}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer shrink-0"
                      >
                        {copiedType === 'portal_url' ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Eksternal */}
              <div className="flex items-center justify-end gap-2">
                <a
                  href={payload.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Portal Siswa Sekarang</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
