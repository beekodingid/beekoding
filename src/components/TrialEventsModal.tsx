import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../data/content';
import {
  getCodingEvents,
  registerForEvent,
  type CodingEvent,
  type CodingEventTier,
} from '../services/adminStorage';
import {
  X,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Flame,
  Send,
} from 'lucide-react';

interface TrialEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: CodingEventTier;
  initialSelectedEvent?: CodingEvent | null;
}

export const TrialEventsModal: React.FC<TrialEventsModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 'all',
  initialSelectedEvent = null,
}) => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState<CodingEvent[]>(() => getCodingEvents());
  const [selectedTier, setSelectedTier] = useState<CodingEventTier>(defaultTier);
  const [selectedEventForReg, setSelectedEventForReg] = useState<CodingEvent | null>(null);

  // Form registration state
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(8);
  const [formError, setFormError] = useState<string | null>(null);
  const [regSuccessData, setRegSuccessData] = useState<{
    event: CodingEvent;
    childName: string;
    parentName: string;
  } | null>(null);

  const refreshEvents = () => {
    setEvents(getCodingEvents());
  };

  const handleStartRegister = (event: CodingEvent) => {
    setSelectedEventForReg(event);
    setFormError(null);
    setRegSuccessData(null);
    if (event.tier === 'junior') setChildAge(8);
    else if (event.tier === 'middle') setChildAge(11);
    else if (event.tier === 'teens') setChildAge(14);
    else setChildAge(10);
  };

  useEffect(() => {
    if (isOpen) {
      refreshEvents();
      if (initialSelectedEvent) {
        handleStartRegister(initialSelectedEvent);
        setSelectedTier(initialSelectedEvent.tier);
      } else {
        setSelectedEventForReg(null);
        setRegSuccessData(null);
        setSelectedTier(defaultTier);
      }
    }
  }, [isOpen, initialSelectedEvent, defaultTier]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.status === 'upcoming')
      .filter((e) => selectedTier === 'all' || e.tier === selectedTier || e.tier === 'all')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedTier]);

  if (!isOpen) return null;

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForReg) return;
    setFormError(null);

    if (!parentName.trim() || !parentPhone.trim() || !childName.trim()) {
      setFormError('Harap lengkapi nama orang tua, nomor WhatsApp, dan nama ananda.');
      return;
    }

    const result = registerForEvent(selectedEventForReg.id, {
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim() || undefined,
      childName: childName.trim(),
      childAge: Number(childAge) || 8,
    });

    if (!result.success) {
      setFormError(result.error || 'Pendaftaran gagal.');
      return;
    }

    // Success!
    setRegSuccessData({
      event: selectedEventForReg,
      childName: childName.trim(),
      parentName: parentName.trim(),
    });
    refreshEvents();
  };

  const handleOpenWhatsAppAdmin = () => {
    if (!regSuccessData) return;
    const msg = `Halo Tim BeeKoding! Saya *${regSuccessData.parentName}*, baru saja mendaftarkan ananda *${regSuccessData.childName}* untuk agenda *${regSuccessData.event.title}* pada ${regSuccessData.event.date} jam ${regSuccessData.event.startTime} WIB. Mohon konfirmasi jadwal & link Zoom kelas ya. Terima kasih! 🐝✨`;
    window.open(`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          isDark
            ? 'bg-[#121624] border-amber-500/30 text-white'
            : 'bg-white border-amber-200 text-slate-900 shadow-amber-900/10'
        }`}
      >
        {/* Header Hero */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden bg-gradient-to-br from-amber-500/15 via-yellow-500/5 to-transparent">
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Free Trial Class & Coding Workshops</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] tracking-tight">
                Jadwal Uji Coba Koding & Workshop Gratis
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Pilih tanggal sesi yang cocok untuk ananda. Belajar live interaktif bersama mentor
                ahli dari rumah via Zoom. 100% Bebas Biaya & Kuota Terbatas!
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tier Pills Filter */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 relative z-10">
            {[
              { id: 'all' as CodingEventTier, label: 'Semua Agenda' },
              { id: 'junior' as CodingEventTier, label: 'Junior Explorer (6-10 Th)' },
              { id: 'middle' as CodingEventTier, label: 'Middle Coder (10-14 Th)' },
              { id: 'teens' as CodingEventTier, label: 'Teens Innovator (13-18 Th)' },
            ].map((t) => {
              const isActive = selectedTier === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedTier(t.id);
                    setSelectedEventForReg(null);
                    setRegSuccessData(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* SUCCESS SCREEN */}
          {regSuccessData ? (
            <div className="text-center py-8 px-4 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center text-3xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Pendaftaran Berhasil Terverifikasi! 🎉
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Kursi untuk ananda <strong>{regSuccessData.childName}</strong> telah berhasil diamankan.
                  Detail jadwal dan link Zoom sudah kami siapkan.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border max-w-md mx-auto text-left text-xs space-y-2 ${
                  isDark ? 'bg-slate-900 border-amber-500/20' : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="font-bold text-amber-500 uppercase text-[11px]">
                  Rincian Sesi Anda:
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {regSuccessData.event.title}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {new Date(regSuccessData.event.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    {regSuccessData.event.startTime} - {regSuccessData.event.endTime} WIB
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Video className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{regSuccessData.event.locationDetail}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppAdmin}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Konfirmasi via WhatsApp Kami</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRegSuccessData(null);
                    setSelectedEventForReg(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer"
                >
                  Lihat Agenda Lainnya
                </button>
              </div>
            </div>
          ) : selectedEventForReg ? (
            /* REGISTRATION FORM FOR SELECTED EVENT */
            <div className="space-y-5 animate-fadeIn">
              {/* Event Selected Header Summary */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-slate-900 border-amber-500/30' : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedEventForReg.posterUrlOrEmoji || '🐝'}</span>
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {selectedEventForReg.title}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{selectedEventForReg.date}</span>
                      <span>•</span>
                      <span>
                        {selectedEventForReg.startTime} - {selectedEventForReg.endTime} WIB
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEventForReg(null)}
                  className="text-xs text-amber-500 hover:underline font-bold cursor-pointer shrink-0"
                >
                  Ganti Sesi
                </button>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                <div className="font-bold text-sm font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Lengkapi Data Pendaftaran Calon Murid
                </div>

                {formError && (
                  <div className="p-3 rounded-xl text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Nama Orang Tua / Wali Murid *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ayah Bambang / Bunda Siti"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="081234567890"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-500'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Nama Lengkap Anak *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Kenzo Alvaro"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Usia Anak (Tahun) *
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="18"
                      required
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Email Orang Tua (Opsional, untuk link kalender Google)
                  </label>
                  <input
                    type="email"
                    placeholder="wali@gmail.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEventForReg(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer font-['Space_Grotesk']"
                  >
                    <span>Daftarkan Sekarang (100% Gratis)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* EVENTS LIST */
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div
                  className={`p-10 rounded-2xl border text-center ${
                    isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Calendar className="w-10 h-10 mx-auto text-slate-500 opacity-40 mb-2" />
                  <p className="text-sm font-bold text-slate-400">
                    Belum ada jadwal sesi terbuka untuk kategori ini.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Silakan cek kategori lain atau hubungi tim konsultan kami via WhatsApp.
                  </p>
                </div>
              ) : (
                filteredEvents.map((evt) => {
                  const regCount = evt.registrations.length;
                  const remainingSeats = Math.max(evt.capacity - regCount, 0);
                  const isFull = remainingSeats <= 0;

                  return (
                    <div
                      key={evt.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDark
                          ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                          : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-2xl flex items-center justify-center border border-amber-500/30 shrink-0">
                          {evt.posterUrlOrEmoji || '🐝'}
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                              {evt.eventType === 'trial_class'
                                ? 'Free Trial Class'
                                : evt.eventType === 'workshop'
                                ? 'Workshop'
                                : 'Webinar'}
                            </span>
                            <span className="text-[10px] font-bold uppercase text-slate-400">
                              {evt.tier.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500">
                              {evt.price === 0 ? '100% GRATIS' : `Rp ${evt.price.toLocaleString('id-ID')}`}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                            {evt.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1 text-slate-300 dark:text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-amber-500" />
                              {new Date(evt.date).toLocaleDateString('id-ID', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-blue-500" />
                              {evt.startTime} - {evt.endTime} WIB
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3.5 h-3.5 text-emerald-500" />
                              {evt.locationDetail}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-mono font-bold">
                          {isFull ? (
                            <span className="text-rose-500">Kuota Kursi Penuh</span>
                          ) : (
                            <span className="text-amber-500">
                              Tersisa {remainingSeats} Kursi
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          disabled={isFull}
                          onClick={() => handleStartRegister(evt)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isFull
                              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-xs'
                          }`}
                        >
                          <span>Daftar Sesi Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
