import React, { useState } from 'react';
import {
  type CodingEvent,
  type EventRegistrationItem,
  type EventRegistrationStatus,
  registerForEvent,
  updateEventRegistrationStatus,
  deleteEventRegistration,
  generateEventWhatsAppReminder,
  exportEventParticipantsCSV,
} from '../../services/adminStorage';
import {
  X,
  Users,
  Download,
  Plus,
  Send,
  Trash2,
  Calendar,
  Clock,
  Video,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface AdminEventParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CodingEvent;
  onRefreshData: () => void;
  isDark: boolean;
}

export const AdminEventParticipantsModal: React.FC<AdminEventParticipantsModalProps> = ({
  isOpen,
  onClose,
  event,
  onRefreshData,
  isDark,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(8);
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCount = event.registrations.length;
  const fillPercent = Math.min(Math.round((currentCount / event.capacity) * 100), 100);

  const handleStatusChange = (regId: string, newStatus: EventRegistrationStatus) => {
    updateEventRegistrationStatus(event.id, regId, newStatus);
    onRefreshData();
  };

  const handleDeleteParticipant = (regId: string) => {
    if (window.confirm('Hapus pendaftar ini dari daftar peserta?')) {
      deleteEventRegistration(event.id, regId);
      onRefreshData();
    }
  };

  const handleSendReminder = (reg: EventRegistrationItem) => {
    const message = generateEventWhatsAppReminder(event, reg);
    const cleanPhone = reg.parentPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const url = `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddManualParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!parentName.trim() || !parentPhone.trim() || !childName.trim()) {
      setErrorMessage('Harap isi nama wali, nomor WhatsApp, dan nama anak.');
      return;
    }

    const result = registerForEvent(event.id, {
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim() || undefined,
      childName: childName.trim(),
      childAge: Number(childAge) || 8,
      notes: notes.trim() || undefined,
    });

    if (!result.success) {
      setErrorMessage(result.error || 'Gagal menambahkan peserta.');
      return;
    }

    // Reset Form
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setChildName('');
    setChildAge(8);
    setNotes('');
    setShowAddForm(false);
    onRefreshData();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          isDark
            ? 'bg-[#121624] border-amber-500/30 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center border border-amber-500/30 shrink-0">
              {event.posterUrlOrEmoji || '🐝'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  {event.eventType === 'trial_class'
                    ? 'Free Trial Class'
                    : event.eventType === 'workshop'
                    ? 'Workshop'
                    : event.eventType === 'webinar'
                    ? 'Webinar'
                    : 'Game Jam'}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Jenjang: {event.tier.toUpperCase()}
                </span>
              </div>
              <h3 className="font-bold text-lg sm:text-xl font-['Space_Grotesk'] mt-1">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  {event.startTime} - {event.endTime} WIB
                </span>
                {event.meetingUrl && (
                  <a
                    href={event.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sky-500 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Link Zoom</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => exportEventParticipantsCSV(event)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ekspor CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quota Progress Bar */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold">
              Keterisian Peserta: {currentCount} dari {event.capacity} Kursi ({fillPercent}%)
            </span>
          </div>
          <div className="w-full sm:w-64 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                fillPercent >= 100
                  ? 'bg-rose-500'
                  : fillPercent >= 75
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Action Bar: Add participant button */}
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm sm:text-base font-['Space_Grotesk'] flex items-center gap-2">
              <span>Daftar Calon Murid & Wali</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-mono">
                {currentCount} Orang
              </span>
            </h4>

            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Tutup Form' : 'Tambah Peserta Manual'}</span>
            </button>
          </div>

          {/* Add Form (Collapsible) */}
          {showAddForm && (
            <form
              onSubmit={handleAddManualParticipant}
              className={`p-4 rounded-2xl border space-y-4 animate-fadeIn ${
                isDark ? 'bg-slate-900/90 border-amber-500/30' : 'bg-amber-50/70 border-amber-300'
              }`}
            >
              <div className="font-bold text-xs uppercase tracking-wider text-amber-500">
                Pendaftaran Manual Peserta Baru
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bpk/Ibu Bambang"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Nomor WhatsApp Wali *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="081234567890"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Email Wali (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="wali@gmail.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Nama Lengkap Anak *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kenzo Alvaro"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Usia Anak (Tahun) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="18"
                    required
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Catatan Khusus (Device / OS)
                  </label>
                  <input
                    type="text"
                    placeholder="Laptop Windows 11"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800/80 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-xs"
                >
                  Daftarkan Peserta
                </button>
              </div>
            </form>
          )}

          {/* Table of Participants */}
          {event.registrations.length === 0 ? (
            <div
              className={`p-10 rounded-2xl border text-center ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <Users className="w-10 h-10 mx-auto text-slate-500 opacity-40 mb-2" />
              <p className="text-sm font-bold text-slate-400">
                Belum ada peserta yang mendaftar pada agenda ini.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Gunakan tombol &quot;Tambah Peserta Manual&quot; di atas atau bagikan link pendaftaran
                ke calon wali murid.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[11px] ${
                        isDark ? 'bg-slate-900/80 text-slate-400' : 'bg-slate-100/80 text-slate-600'
                      }`}
                    >
                      <th className="p-3.5">Calon Siswa</th>
                      <th className="p-3.5">Wali Murid</th>
                      <th className="p-3.5">Kontak WhatsApp</th>
                      <th className="p-3.5">Status Kehadiran</th>
                      <th className="p-3.5 text-right">Aksi & Reminder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {event.registrations.map((reg) => {
                      const statusColor =
                        reg.status === 'confirmed'
                          ? 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                          : reg.status === 'attended'
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : reg.status === 'cancelled'
                          ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-500 border-amber-500/30';

                      return (
                        <tr
                          key={reg.id}
                          className={`transition-colors ${
                            isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/40'
                          }`}
                        >
                          <td className="p-3.5 font-medium">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {reg.childName}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {reg.childAge} Tahun
                              {reg.notes && <span> • {reg.notes}</span>}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-medium text-slate-800 dark:text-slate-200">
                              {reg.parentName}
                            </div>
                            {reg.parentEmail && (
                              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" />
                                <span>{reg.parentEmail}</span>
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{reg.parentPhone}</span>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <select
                              value={reg.status}
                              onChange={(e) =>
                                handleStatusChange(reg.id, e.target.value as EventRegistrationStatus)
                              }
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${statusColor} ${
                                isDark ? 'bg-slate-900' : 'bg-white'
                              }`}
                            >
                              <option value="registered">Terdaftar (Registered)</option>
                              <option value="confirmed">Terkonfirmasi (Confirmed)</option>
                              <option value="attended">Hadir di Kelas (Attended)</option>
                              <option value="cancelled">Batal (Cancelled)</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleSendReminder(reg)}
                                title="Kirim Pengingat Jadwal & Link Zoom via WhatsApp"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                                <span>Kirim WA</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteParticipant(reg.id)}
                                title="Hapus Peserta"
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
