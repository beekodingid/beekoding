import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ARCADE_GAMES_LIST } from './types';
import { BeeHoneyGame } from './BeeHoneyGame';
import { SpaceShooterGame } from './SpaceShooterGame';
import { RobloxObbyGame } from './RobloxObbyGame';
import { MazeLogicGame } from './MazeLogicGame';
import { isSoundMuted, setSoundMuted } from './soundFX';
import {
  Gamepad2,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface PlayableArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGameId?: string;
  onOpenTrialEvents?: () => void;
}

export const PlayableArcadeModal: React.FC<PlayableArcadeModalProps> = ({
  isOpen,
  onClose,
  initialGameId,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();
  const [selectedGameId, setSelectedGameId] = useState<string>(
    initialGameId || 'bee-honey-catch'
  );
  const [muted, setMuted] = useState(() => isSoundMuted());

  useEffect(() => {
    if (initialGameId) {
      setSelectedGameId(initialGameId);
    }
  }, [initialGameId]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentGame =
    ARCADE_GAMES_LIST.find((g) => g.id === selectedGameId) || ARCADE_GAMES_LIST[0];

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  const handleShareArcade = () => {
    const text = `🎮 Hai teman-teman! Coba mainkan 4 game buatan murid Beekoding langsung gratis di browser tanpa install:\nhttps://beekoding.my.id/#arcade\n\nAda Bee Honey Catch, Roblox Obby Lava Runner, Maze Logika Algoritma, & Space Galaxy Defender!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[95vh] ${
          isDark
            ? 'bg-[#0f1422] border-amber-500/30 text-white shadow-black/60'
            : 'bg-white border-amber-300 text-slate-900 shadow-amber-900/10'
        }`}
      >
        {/* Top Retro Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-amber-600/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-inner">
              <Gamepad2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base font-['Space_Grotesk'] tracking-tight">
                  Beekoding Playable Arcade
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-950 text-amber-300">
                  Live in Browser
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-900/80 hidden sm:block -mt-0.5">
                Mainkan langsung game buatan murid-murid cilik Beekoding!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 transition-colors cursor-pointer"
              title={muted ? 'Aktifkan Suara' : 'Bisukan Suara'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShareArcade}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 hover:text-white text-xs font-black transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Ajak Teman</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Tutup Arcade"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Tabs Selector */}
        <div
          className={`px-4 sm:px-6 py-2.5 border-b flex items-center gap-2 overflow-x-auto ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/60 border-amber-200'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline flex-shrink-0">
            Pilih Game:
          </span>
          {ARCADE_GAMES_LIST.map((game) => {
            const isSelected = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => setSelectedGameId(game.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <span>{game.thumbnail}</span>
                <span>{game.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body: Two Columns (Game Canvas + Creator Info / Tips) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Playable Game Area */}
          <div className="lg:col-span-7 flex justify-center">
            {currentGame.gameType === 'canvas-bee' && (
              <BeeHoneyGame onOpenTrialEvents={onOpenTrialEvents} />
            )}
            {currentGame.gameType === 'canvas-obby' && (
              <RobloxObbyGame onOpenTrialEvents={onOpenTrialEvents} />
            )}
            {currentGame.gameType === 'interactive-maze' && (
              <MazeLogicGame onOpenTrialEvents={onOpenTrialEvents} />
            )}
            {currentGame.gameType === 'canvas-space' && (
              <SpaceShooterGame onOpenTrialEvents={onOpenTrialEvents} />
            )}
          </div>

          {/* Right Column: Game Details, Student Creator, & Learning Pathway */}
          <div className="lg:col-span-5 space-y-4">
            {/* Creator Card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INFORMASI KARYA SISWA</span>
              </div>
              <h3 className="text-xl font-black font-['Space_Grotesk'] leading-tight">
                {currentGame.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentGame.subtitle}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-700/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-base shadow-sm">
                  {currentGame.studentName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold">{currentGame.studentName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentGame.studentAge} Tahun • {currentGame.gradeLevel}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {currentGame.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Play Box */}
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-white border-amber-200'
              }`}
            >
              <h4 className="text-xs font-black uppercase text-slate-400 mb-1.5">
                🎮 Cara Memainkan:
              </h4>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {currentGame.instructions}
              </p>
            </div>

            {/* Educational Conversion Card */}
            <div
              className={`p-5 rounded-2xl border relative overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-amber-500/10 via-[#161a29] to-[#121622] border-amber-500/40'
                  : 'bg-gradient-to-br from-amber-100/70 via-white to-amber-50 border-amber-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 uppercase tracking-wider mb-2">
                <Rocket className="w-3.5 h-3.5" />
                <span>Belajar Koding Seru Beekoding</span>
              </div>
              <h4 className="text-base font-black font-['Space_Grotesk'] leading-snug">
                Anak Anda Juga Bisa Menciptakan Game Sendiri!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Di Beekoding, anak belajar logika computational thinking lewat pembuatan game yang mereka sukai. Bukan cuma jadi penikmat gadget, tapi jadi pencipta teknologi!
              </p>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Free Trial Class 45 Menit (100% Gratis)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Rasio kecil 1 mentor : maksimal 4 murid</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Sertifikat digital QR Code &amp; Portofolio online</span>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenTrialEvents) {
                      onOpenTrialEvents();
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Klaim Free Trial Class Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
