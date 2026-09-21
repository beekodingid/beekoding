import React, { useState } from 'react';
import { type AuditLogEntry } from '../../services/adminStorage';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  Clock,
  User,
  Globe,
  Tag,
  Copy,
  Check,
  Code,
  Terminal,
} from 'lucide-react';

interface AdminAuditLogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: AuditLogEntry | null;
  isDark: boolean;
}

export const AdminAuditLogDetailModal: React.FC<AdminAuditLogDetailModalProps> = ({
  isOpen,
  onClose,
  log,
  isDark,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !log) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'danger':
        return {
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
          icon: ShieldAlert,
          label: 'Danger / Kritis',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          label: 'Warning / Peringatan',
        };
      case 'success':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          icon: ShieldCheck,
          label: 'Success / Berhasil',
        };
      default:
        return {
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
          icon: Info,
          label: 'Info / Umum',
        };
    }
  };

  const sevStyle = getSeverityStyle(log.severity);
  const SeverityIcon = sevStyle.icon;

  const dateFormatted = new Date(log.timestamp).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeFormatted = new Date(log.timestamp).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
          isDark ? 'bg-[#121624] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${sevStyle.bg}`}
            >
              <SeverityIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${sevStyle.bg}`}
                >
                  {sevStyle.label}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  #{log.id}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] leading-tight mt-0.5">
                {log.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Deskripsi */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Deskripsi Aktivitas
            </span>
            <p className="text-sm font-medium leading-relaxed">{log.description}</p>
          </div>

          {/* Grid Informasi Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pelaksana / Aktor */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-semibold">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Pelaksana (Actor)</span>
              </div>
              <p className="text-sm font-bold">{log.actorName}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">{log.actorRole}</p>
            </div>

            {/* Waktu & Tanggal */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Waktu Pelaksanaan</span>
              </div>
              <p className="text-sm font-bold">{dateFormatted}</p>
              <p className="text-xs text-slate-400">{timeFormatted} WIB</p>
            </div>

            {/* Modul & Tipe Aksi */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-semibold">
                <Tag className="w-3.5 h-3.5 text-purple-500" />
                <span>Modul & Tindakan</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {log.module}
                </span>
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {log.actionType}
                </span>
              </div>
            </div>

            {/* Alamat IP & Sesi */}
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1 font-semibold">
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>Origin IP & Lokasi</span>
              </div>
              <p className="text-xs font-mono font-bold mt-1 text-slate-700 dark:text-slate-300">
                {log.ipAddress}
              </p>
            </div>
          </div>

          {/* Objek Sasaran / Target (Jika ada) */}
          {(log.targetId || log.targetName) && (
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-xs text-slate-400 font-semibold block mb-1">
                Objek / Entitas Sasaran:
              </span>
              <div className="flex items-center gap-2 text-xs">
                {log.targetName && <span className="font-bold text-amber-500">{log.targetName}</span>}
                {log.targetId && (
                  <span className="font-mono text-slate-400">({log.targetId})</span>
                )}
              </div>
            </div>
          )}

          {/* Metadata Teknis (Payload JSON) */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-500" />
                  <span>Metadata Teknis & Payload Data</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
                </button>
              </div>

              <div
                className={`p-3.5 rounded-2xl border font-mono text-xs overflow-x-auto ${
                  isDark ? 'bg-black/60 border-slate-800 text-emerald-400' : 'bg-slate-900 border-slate-800 text-emerald-400'
                }`}
              >
                <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Audit Trail terverifikasi standar keamanan BeeKoding</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
          >
            Tutup Inspeksi
          </button>
        </div>
      </div>
    </div>
  );
};
