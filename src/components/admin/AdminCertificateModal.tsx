import React, { useRef, useState } from 'react';
import { type StudentCertificate } from '../../services/adminStorage';
import { printIsolatedElement } from '../../services/printUtils';
import {
  CERTIFICATE_THEME_LIST,
  type CertificateThemeId,
} from '../../services/certificateThemes';
import { CertificateCanvas } from './CertificateCanvas';
import {
  generateCertificateNotification,
} from '../../services/parentNotification';
import { ShareParentNotificationModal } from './ShareParentNotificationModal';
import {
  Printer,
  Share2,
  Copy,
  X,
  CheckCircle2,
  Award,
  Palette,
} from 'lucide-react';

interface AdminCertificateModalProps {
  certificate: StudentCertificate;
  isDark: boolean;
  onClose: () => void;
}

export const AdminCertificateModal: React.FC<AdminCertificateModalProps> = ({
  certificate,
  isDark,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<CertificateThemeId>(
    certificate.theme || 'royal_gold'
  );

  const notificationPayload = generateCertificateNotification(certificate);

  const handlePrint = () => {
    printIsolatedElement(printRef.current, {
      orientation: 'landscape',
      isCertificate: true,
      title: `Sertifikat-${activeTheme}-${certificate.studentName.replace(/\s+/g, '_')}`,
    });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(notificationPayload.whatsappText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Container Modal */}
      <div
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:rounded-none ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Header Modal - Hidden on Print */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b print:hidden ${
            isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Studio Sertifikat Resmi Siswa
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  A4 Landscape
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{certificate.certificateNumber}</p>
            </div>
          </div>

          {/* Theme Selector Toolbar */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-300/50 dark:border-slate-700">
            <div className="px-2 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Tema:</span>
            </div>
            {CERTIFICATE_THEME_LIST.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTheme(t.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTheme === t.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
                }`}
                title={t.description}
              >
                <span>
                  {t.id === 'royal_gold'
                    ? '👑'
                    : t.id === 'cyber_dark'
                    ? '⚡'
                    : t.id === 'modern_minimal'
                    ? '🏛️'
                    : '🐝'}
                </span>
                <span className="text-[11px]">{t.name.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            {/* Tombol Bagikan ke Orang Tua (WA & Email) */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Kirim Verifikasi & E-Sertifikat via WhatsApp atau Email Orang Tua"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kirim ke Orang Tua</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Salin Rincian & Tautan Sertifikat"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (A4 Landscape Formatted) */}
        <div className="p-4 sm:p-8 bg-slate-950/20 overflow-x-auto flex justify-center print:p-0 print:bg-white">
          <CertificateCanvas
            certificate={certificate}
            themeId={activeTheme}
            printRef={printRef}
          />
        </div>

        {/* Copy Notification Toast */}
        {copied && (
          <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs shadow-lg flex items-center gap-2 border border-slate-700 animate-bounce print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Format ucapan & data sertifikat disalin ke clipboard!</span>
          </div>
        )}
      </div>

      {/* Modal Kirim Notifikasi Orang Tua */}
      {isShareModalOpen && (
        <ShareParentNotificationModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          title="Kirim E-Sertifikat ke Orang Tua / Wali"
          documentType="certificate"
          studentName={certificate.studentName}
          identifier={certificate.certificateNumber}
          payload={notificationPayload}
          isDark={isDark}
        />
      )}
    </div>
  );
};
