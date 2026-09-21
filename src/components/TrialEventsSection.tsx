import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  getCodingEvents,
  type CodingEvent,
  type CodingEventTier,
} from '../services/adminStorage';
import {
  Calendar,
  Clock,
  Video,
  Flame,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface TrialEventsSectionProps {
  onOpenTrialEventsModal: (event?: CodingEvent) => void;
}

export const TrialEventsSection: React.FC<TrialEventsSectionProps> = ({
  onOpenTrialEventsModal,
}) => {
  const { isDark } = useTheme();
  const [events] = useState<CodingEvent[]>(() => getCodingEvents());
  const [selectedTier, setSelectedTier] = useState<CodingEventTier>('all');

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.status === 'upcoming')
      .filter((e) => selectedTier === 'all' || e.tier === selectedTier || e.tier === 'all')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedTier]);

  return (
    <section
      id="events"
      className={`py-20 sm:py-24 relative overflow-hidden transition-colors duration-300 border-t ${
        isDark ? 'bg-[#0b0e17] border-amber-500/20' : 'bg-[#fffaf0] border-amber-200/80'
      }`}
    >
      {/* Background Subtle Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-amber-100/80 border-amber-300 text-amber-900'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Jadwal Terdekat & Kuota Terbatas</span>
          </div>

          <h2
            className={`text-2xl sm:text-4xl font-black tracking-tight font-['Space_Grotesk'] mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Workshop, Webinar & <span className="text-amber-500">Free Trial Class</span>
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Ajak ananda merasakan serunya koding, logika game 3D, dan dasar AI secara live interaktif
            bersama mentor ahli. 100% Bebas Biaya pendaftaran dan kuota kelas terbatas per sesi!
          </p>

          {/* Age Tier Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: 'all' as CodingEventTier, label: 'Semua Agenda' },
              { id: 'junior' as CodingEventTier, label: 'Junior Explorer (6-10 Th)' },
              { id: 'middle' as CodingEventTier, label: 'Middle Coder (10-14 Th)' },
              { id: 'teens' as CodingEventTier, label: 'Teens Innovator (13-18 Th)' },
            ].map((tierItem) => {
              const isActive = selectedTier === tierItem.id;
              return (
                <button
                  key={tierItem.id}
                  type="button"
                  onClick={() => setSelectedTier(tierItem.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-105'
                      : isDark
                      ? 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {tierItem.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length === 0 ? (
            <div
              className={`col-span-full text-center py-16 px-4 rounded-3xl border ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-amber-200'
              }`}
            >
              <Calendar className="w-12 h-12 mx-auto text-amber-500/40 mb-3" />
              <h4 className="text-base font-bold mb-1 text-slate-800 dark:text-slate-200">
                Belum ada agenda untuk jenjang ini
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Silakan pilih kategori jenjang lain atau hubungi customer care kami untuk mengajukan sesi khusus.
              </p>
            </div>
          ) : (
            upcomingEvents.map((evt) => {
              const regCount = evt.registrations.length;
              const seatsLeft = Math.max(0, evt.capacity - regCount);
              const fillPct = Math.min(Math.round((regCount / evt.capacity) * 100), 100);

              const typeBadge =
                evt.eventType === 'trial_class'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : evt.eventType === 'workshop'
                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
                  : evt.eventType === 'webinar'
                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                  : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';

              const typeName =
                evt.eventType === 'trial_class'
                  ? 'Free Trial Class'
                  : evt.eventType === 'workshop'
                  ? 'Workshop Praktek'
                  : evt.eventType === 'webinar'
                  ? 'Webinar Edukasi'
                  : 'Mini Game Jam';

              return (
                <div
                  key={evt.id}
                  className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative ${
                    isDark
                      ? 'bg-[#111422]/90 border-slate-800 hover:border-amber-500/40 shadow-black/20'
                      : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-amber-900/5'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Row: Badge & Seats Remaining */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border ${typeBadge}`}
                      >
                        {typeName}
                      </span>

                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          seatsLeft <= 3
                            ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 animate-pulse'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        <Users className="w-3 h-3" />
                        <span>Sisa {seatsLeft} Kursi!</span>
                      </div>
                    </div>

                    {/* Title and Emoji */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                        {evt.posterUrlOrEmoji || '🐝'}
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Mentor: <span className="font-semibold text-slate-300 dark:text-slate-300">{evt.instructorName}</span>
                        </p>
                      </div>
                    </div>

                    {/* Schedule & Platform Box */}
                    <div
                      className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-50/60 border-amber-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 font-medium text-slate-700 dark:text-slate-200">
                        <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          {new Date(evt.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{evt.startTime} - {evt.endTime} WIB</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                        <Video className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="truncate">{evt.locationDetail}</span>
                      </div>
                    </div>

                    {/* Outcomes Highlights */}
                    {evt.learningOutcomes && evt.learningOutcomes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Apa yang Dipelajari:
                        </div>
                        {evt.learningOutcomes.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quota Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Keterisian Kuota</span>
                        <span className="font-bold">{regCount} / {evt.capacity} Siswa</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Register Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onOpenTrialEventsModal(evt)}
                      className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                    >
                      <span>{evt.eventType === 'trial_class' ? 'Daftar Trial Gratis (1-Klik)' : 'Daftar Ikuti Workshop'}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div
          className={`mt-12 p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left ${
            isDark
              ? 'bg-[#121624] border-amber-500/20 text-slate-300'
              : 'bg-white border-amber-200 text-slate-700 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                100% Bebas Biaya (Gratis)
              </div>
              <div className="text-[11px] text-slate-400">
                Uji coba tanpa ikatan kontrak & tanpa syarat tersembunyi
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                E-Sertifikat Keikutsertaan
              </div>
              <div className="text-[11px] text-slate-400">
                Sertifikat resmi tanda apresiasi karya ananda
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Live Bersama Mentor Ahli
              </div>
              <div className="text-[11px] text-slate-400">
                Interaktif tanya jawab dan bimbingan step-by-step
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
