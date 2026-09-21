import React, { useState, useEffect } from 'react';
import {
  type CodingEvent,
  type CodingEventType,
  type CodingEventTier,
  type CodingEventLocationType,
  type CodingEventStatus,
} from '../../services/adminStorage';
import {
  X,
  Calendar,
  Clock,
  Video,
  User,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface AdminEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<CodingEvent, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: CodingEvent | null;
  isDark: boolean;
}

export const AdminEventModal: React.FC<AdminEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isDark,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [eventType, setEventType] = useState<CodingEventType>('trial_class');
  const [tier, setTier] = useState<CodingEventTier>('junior');
  const [instructorName, setInstructorName] = useState('');
  const [instructorTitle, setInstructorTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:15');
  const [locationType, setLocationType] = useState<CodingEventLocationType>('online_zoom');
  const [locationDetail, setLocationDetail] = useState('Zoom Cloud Meeting Room #1');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [capacity, setCapacity] = useState<number>(12);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [posterUrlOrEmoji, setPosterUrlOrEmoji] = useState('🐝');
  const [status, setStatus] = useState<CodingEventStatus>('upcoming');
  const [isFeatured, setIsFeatured] = useState(true);

  // Learning Outcomes
  const [outcomes, setOutcomes] = useState<string[]>([
    'Memahami konsep logika koding dan algoritma dasar',
    'Membuat proyek interaktif pertama secara mandiri',
  ]);
  const [outcomeInput, setOutcomeInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setEventType(initialData.eventType);
      setTier(initialData.tier);
      setInstructorName(initialData.instructorName);
      setInstructorTitle(initialData.instructorTitle);
      setDate(initialData.date);
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setLocationType(initialData.locationType);
      setLocationDetail(initialData.locationDetail);
      setMeetingUrl(initialData.meetingUrl || '');
      setCapacity(initialData.capacity);
      setPrice(initialData.price);
      setDescription(initialData.description);
      setPosterUrlOrEmoji(initialData.posterUrlOrEmoji);
      setStatus(initialData.status);
      setIsFeatured(initialData.isFeatured);
      setOutcomes(initialData.learningOutcomes || []);
    } else {
      setTitle('');
      setSlug('');
      setEventType('trial_class');
      setTier('junior');
      setInstructorName('Sarah Amalia, S.T.');
      setInstructorTitle('Lead Educator - Junior Explorer');
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setDate(tomorrow);
      setStartTime('10:00');
      setEndTime('11:15');
      setLocationType('online_zoom');
      setLocationDetail('Zoom Cloud Meeting Room #1');
      setMeetingUrl('https://zoom.us/j/9812739123');
      setCapacity(12);
      setPrice(0);
      setDescription('');
      setPosterUrlOrEmoji('🐝');
      setStatus('upcoming');
      setIsFeatured(true);
      setOutcomes([
        'Memahami konsep logika koding dan algoritma dasar',
        'Membuat proyek interaktif pertama secara mandiri',
        'Mendapatkan e-Certificate of Participation resmi',
      ]);
    }
  }, [initialData, isOpen]);

  // Auto generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleAddOutcome = () => {
    if (!outcomeInput.trim()) return;
    setOutcomes((prev) => [...prev, outcomeInput.trim()]);
    setOutcomeInput('');
  };

  const handleRemoveOutcome = (idx: number) => {
    setOutcomes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime) {
      alert('Harap lengkapi judul, tanggal, dan jam pelaksanaan acara.');
      return;
    }

    onSave({
      title: title.trim(),
      slug: slug.trim() || `event-${Date.now()}`,
      eventType,
      tier,
      instructorName: instructorName.trim(),
      instructorTitle: instructorTitle.trim(),
      date,
      startTime,
      endTime,
      locationType,
      locationDetail: locationDetail.trim(),
      meetingUrl: meetingUrl.trim() || undefined,
      capacity: Number(capacity) || 10,
      price: Number(price) || 0,
      description: description.trim(),
      learningOutcomes: outcomes.length > 0 ? outcomes : ['Memahami dasar pemrograman interaktif'],
      posterUrlOrEmoji: posterUrlOrEmoji.trim() || '🐝',
      status,
      isFeatured,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          isDark
            ? 'bg-[#121624] border-amber-500/30 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl font-['Space_Grotesk']">
                {initialData ? 'Ubah Agenda Event / Trial Class' : 'Tambah Agenda Event Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Atur jadwal Free Trial Class, Weekend Workshop, atau Webinar Edukasi.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Judul & Slug */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Judul Agenda Acara <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Free Trial Class: Petualangan Koding Pertama Scratch 3.0"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-700 text-slate-100 focus:border-amber-500'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Slug URL Web
                </label>
                <input
                  type="text"
                  placeholder="free-trial-scratch-game"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-700 text-slate-100 focus:border-amber-500'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Ikon Emoji / Simbol Acara
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="🐝 atau 🎮 atau 🤖"
                    value={posterUrlOrEmoji}
                    onChange={(e) => setPosterUrlOrEmoji(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-slate-100 focus:border-amber-500'
                        : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-xl flex items-center justify-center shrink-0 border border-amber-500/30">
                    {posterUrlOrEmoji || '🐝'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tipe Acara & Jenjang Sasaran */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Tipe Agenda
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as CodingEventType)}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="trial_class">🎯 Free Trial Class (Uji Coba)</option>
                <option value="workshop">🛠️ Weekend Workshop</option>
                <option value="webinar">💡 Webinar Edukasi Digital</option>
                <option value="competition">🏆 Lomba / Game Jam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Jenjang Sasaran
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as CodingEventTier)}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="junior">Junior Explorer (Usia 6-10)</option>
                <option value="middle">Middle Coder (Usia 10-14)</option>
                <option value="teens">Teens Innovator (Usia 13-18)</option>
                <option value="all">Semua Usia / Terbuka Umum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Status Acara
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CodingEventStatus)}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="upcoming">Buka Pendaftaran (Upcoming)</option>
                <option value="ongoing">Sedang Berlangsung (Live)</option>
                <option value="completed">Selesai (Completed)</option>
                <option value="cancelled">Dibatalkan (Cancelled)</option>
              </select>
            </div>
          </div>

          {/* Tanggal, Jam & Kapasitas Kursi */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Tanggal Pelaksanaan <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Jam Mulai (WIB)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Jam Selesai (WIB)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Kapasitas Kuota Kursi
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  max="500"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Lokasi / Meeting Link & Instruktur */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Format Lokasi & Ruang
              </label>
              <div className="flex gap-2">
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as CodingEventLocationType)}
                  className={`w-40 px-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="online_zoom">Zoom Cloud</option>
                  <option value="online_gmeet">Google Meet</option>
                  <option value="offline_studio">Studio Offline</option>
                </select>

                <input
                  type="text"
                  placeholder="Nama Ruangan / Lab"
                  value={locationDetail}
                  onChange={(e) => setLocationDetail(e.target.value)}
                  className={`flex-1 px-3 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Tautan Meeting (Zoom / Google Meet URL)
              </label>
              <div className="relative">
                <Video className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://zoom.us/j/9812739123"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Instruktur & Biaya */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Nama Instruktur / Pembicara
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Sarah Amalia, S.T."
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Jabatan / Gelar Instruktur
              </label>
              <input
                type="text"
                placeholder="Lead Educator - Junior Explorer"
                value={instructorTitle}
                onChange={(e) => setInstructorTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                Biaya Pendaftaran (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="10000"
                placeholder="0 (Gratis)"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
              <span className="text-[10px] text-emerald-500 font-semibold mt-0.5 block">
                {price === 0 ? '100% GRATIS (Free Trial / Open Webinar)' : `Rp ${price.toLocaleString('id-ID')}`}
              </span>
            </div>
          </div>

          {/* Deskripsi Acara */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
              Deskripsi Acara & Silabus Singkat
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan aktivitas seru yang akan dialami anak dan keunggulan sesi ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs focus:outline-none leading-relaxed ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>

          {/* Hasil Belajar (Learning Outcomes) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Poin Hasil Belajar (*Learning Outcomes*)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: Menguasai perulangan loop dalam game Scratch..."
                value={outcomeInput}
                onChange={(e) => setOutcomeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddOutcome();
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={handleAddOutcome}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {outcomes.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-2 p-2 rounded-xl border text-xs ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOutcome(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox Featured */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-300">
                Tampilkan sebagai Sorotan Utama (*Featured Event*) di Landing Page & Hero Banner
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{initialData ? 'Simpan Perubahan' : 'Terbitkan Agenda'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
