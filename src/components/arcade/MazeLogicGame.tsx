import React, { useState, useEffect, useRef } from 'react';
import {
  playCollectSound,
  playHitSound,
  playVictorySound,
  playLaserSound,
} from './soundFX';
import {
  Play,
  RotateCcw,
  Trash2,
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Repeat,
} from 'lucide-react';

interface MazeLogicGameProps {
  onOpenTrialEvents?: () => void;
}

type DirectionCmd = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Coord {
  r: number;
  c: number;
}

interface MazeLevel {
  level: number;
  title: string;
  hint: string;
  parMoves: number;
  start: Coord;
  goal: Coord;
  rocks: Coord[];
  flowers: Coord[];
  portalIn?: Coord;
  portalOut?: Coord;
}

const MAZE_LEVELS: MazeLevel[] = [
  {
    level: 1,
    title: 'Level 1: Langkah Pertama Beeby',
    hint: 'Susun 3 blok [➡️ KANAN] lalu 1 blok [⬇️ BAWAH] untuk mencapai Sarang Madu!',
    parMoves: 4,
    start: { r: 1, c: 0 },
    goal: { r: 2, c: 3 },
    rocks: [
      { r: 0, c: 2 },
      { r: 2, c: 0 },
      { r: 2, c: 1 },
      { r: 3, c: 2 },
    ],
    flowers: [{ r: 1, c: 2 }],
  },
  {
    level: 2,
    title: 'Level 2: Tikungan Batu Labirin',
    hint: 'Hindari batu abu-abu! Ambil bunga merah muda (+25 poin) sebelum masuk ke sarang.',
    parMoves: 6,
    start: { r: 0, c: 0 },
    goal: { r: 3, c: 3 },
    rocks: [
      { r: 0, c: 1 },
      { r: 1, c: 1 },
      { r: 1, c: 3 },
      { r: 2, c: 3 },
      { r: 3, c: 1 },
    ],
    flowers: [
      { r: 2, c: 0 },
      { r: 2, c: 2 },
    ],
  },
  {
    level: 3,
    title: 'Level 3: Jurus Perulangan (Loop 2x)',
    hint: 'Tips Programmer: Gunakan tombol [🔁 ULANGI 2x] setelah memilih arah agar lebih cepat!',
    parMoves: 6,
    start: { r: 4, c: 0 },
    goal: { r: 0, c: 4 },
    rocks: [
      { r: 3, c: 0 },
      { r: 3, c: 1 },
      { r: 3, c: 2 },
      { r: 1, c: 2 },
      { r: 1, c: 3 },
      { r: 1, c: 4 },
    ],
    flowers: [
      { r: 4, c: 2 },
      { r: 2, c: 4 },
    ],
  },
  {
    level: 4,
    title: 'Level 4: Portal Teleportasi Kuantum',
    hint: 'Jalan tertutup tembok batu! Masuklah ke Portal Biru (🌀) untuk berteleportasi menembus tembok!',
    parMoves: 4,
    start: { r: 0, c: 0 },
    goal: { r: 4, c: 4 },
    rocks: [
      { r: 2, c: 0 },
      { r: 2, c: 1 },
      { r: 2, c: 2 },
      { r: 2, c: 3 },
      { r: 2, c: 4 },
    ],
    flowers: [{ r: 0, c: 1 }, { r: 3, c: 3 }],
    portalIn: { r: 0, c: 2 },
    portalOut: { r: 3, c: 2 },
  },
  {
    level: 5,
    title: 'Level 5: Misi Master Algoritma AI',
    hint: 'Level Terakhir! Kumpulkan bunga, masuk ke portal, dan capai Sarang Madu Emas!',
    parMoves: 7,
    start: { r: 4, c: 0 },
    goal: { r: 0, c: 4 },
    rocks: [
      { r: 4, c: 1 },
      { r: 3, c: 1 },
      { r: 1, c: 1 },
      { r: 1, c: 2 },
      { r: 1, c: 3 },
      { r: 2, c: 3 },
    ],
    flowers: [
      { r: 2, c: 0 },
      { r: 0, c: 2 },
    ],
    portalIn: { r: 2, c: 2 },
    portalOut: { r: 0, c: 1 },
  },
];

const CMD_META: Record<DirectionCmd, { label: string; emoji: string; color: string }> = {
  UP: { label: 'ATAS', emoji: '⬆️', color: 'bg-sky-500 text-slate-950' },
  DOWN: { label: 'BAWAH', emoji: '⬇️', color: 'bg-amber-500 text-slate-950' },
  LEFT: { label: 'KIRI', emoji: '⬅️', color: 'bg-purple-500 text-white' },
  RIGHT: { label: 'KANAN', emoji: '➡️', color: 'bg-emerald-500 text-slate-950' },
};

export const MazeLogicGame: React.FC<MazeLogicGameProps> = ({ onOpenTrialEvents }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = MAZE_LEVELS[levelIdx];

  const [program, setProgram] = useState<DirectionCmd[]>([]);
  const [beePos, setBeePos] = useState<Coord>(currentLevel.start);
  const [collectedFlowers, setCollectedFlowers] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState<{
    type: 'idle' | 'bug' | 'win' | 'all_clear';
    text: string;
  }>({ type: 'idle', text: currentLevel.hint });

  const [totalScore, setTotalScore] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Reset position when level changes
  useEffect(() => {
    const lvl = MAZE_LEVELS[levelIdx];
    setBeePos(lvl.start);
    setProgram([]);
    setCollectedFlowers([]);
    setIsRunning(false);
    setActiveStepIdx(null);
    setStatusMsg({ type: 'idle', text: lvl.hint });
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [levelIdx]);

  const resetPositionOnly = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setBeePos(currentLevel.start);
    setCollectedFlowers([]);
    setIsRunning(false);
    setActiveStepIdx(null);
    setStatusMsg({ type: 'idle', text: currentLevel.hint });
  };

  const handleAddCmd = (cmd: DirectionCmd) => {
    if (isRunning || program.length >= 12) return;
    resetPositionOnly();
    playLaserSound();
    setProgram((prev) => [...prev, cmd]);
  };

  const handleRepeatLast = () => {
    if (isRunning || program.length === 0 || program.length >= 12) return;
    resetPositionOnly();
    playCollectSound();
    const last = program[program.length - 1];
    setProgram((prev) => [...prev, last]);
  };

  const handleClearProgram = () => {
    if (isRunning) return;
    resetPositionOnly();
    setProgram([]);
  };

  const handleRunProgram = () => {
    if (isRunning || program.length === 0) return;
    setBeePos(currentLevel.start);
    setCollectedFlowers([]);
    setIsRunning(true);
    setStatusMsg({ type: 'idle', text: 'Menjalankan baris kode algoritma Beeby...' });

    let step = 0;
    let curR = currentLevel.start.r;
    let curC = currentLevel.start.c;
    const localFlowers = new Set<string>();

    const executeStep = () => {
      if (step >= program.length) {
        setIsRunning(false);
        setActiveStepIdx(null);
        if (curR === currentLevel.goal.r && curC === currentLevel.goal.c) {
          playVictorySound();
          const gained = 100 + localFlowers.size * 25;
          setTotalScore((s) => s + gained);
          if (levelIdx < MAZE_LEVELS.length - 1) {
            setStatusMsg({
              type: 'win',
              text: `🎉 ALGORITMA BERHASIL! +${gained} Poin! Siap lanjut ke Level ${
                levelIdx + 2
              }?`,
            });
          } else {
            setStatusMsg({
              type: 'all_clear',
              text: `🏆 LUAR BIASA! Kamu menyelesaikan seluruh 5 Level Master Algoritma!`,
            });
          }
        } else {
          playHitSound();
          setStatusMsg({
            type: 'bug',
            text: `🐞 BUG: Kode selesai dijalankan, tapi Beeby belum sampai di Sarang Madu! Tambahkan atau perbaiki blok kode.`,
          });
        }
        return;
      }

      setActiveStepIdx(step);
      const cmd = program[step];
      let nextR = curR;
      let nextC = curC;
      if (cmd === 'UP') nextR -= 1;
      if (cmd === 'DOWN') nextR += 1;
      if (cmd === 'LEFT') nextC -= 1;
      if (cmd === 'RIGHT') nextC += 1;

      // Check boundaries
      if (nextR < 0 || nextR >= 5 || nextC < 0 || nextC >= 5) {
        playHitSound();
        setIsRunning(false);
        setStatusMsg({
          type: 'bug',
          text: `🐞 BUG pada Langkah #${step + 1} (${
            CMD_META[cmd].label
          }): Beeby menabrak batas luar papan!`,
        });
        return;
      }

      // Check rocks
      const hitRock = currentLevel.rocks.some((rk) => rk.r === nextR && rk.c === nextC);
      if (hitRock) {
        playHitSound();
        setIsRunning(false);
        setStatusMsg({
          type: 'bug',
          text: `🐞 BUG pada Langkah #${step + 1} (${
            CMD_META[cmd].label
          }): Beeby menabrak Batu Rintangan!`,
        });
        return;
      }

      curR = nextR;
      curC = nextC;

      // Check flower
      const flowerKey = `${curR},${curC}`;
      if (
        currentLevel.flowers.some((fl) => fl.r === curR && fl.c === curC) &&
        !localFlowers.has(flowerKey)
      ) {
        localFlowers.add(flowerKey);
        setCollectedFlowers(Array.from(localFlowers));
        playCollectSound();
      } else {
        playLaserSound();
      }

      // Check portal teleportation
      if (
        currentLevel.portalIn &&
        currentLevel.portalOut &&
        curR === currentLevel.portalIn.r &&
        curC === currentLevel.portalIn.c
      ) {
        curR = currentLevel.portalOut.r;
        curC = currentLevel.portalOut.c;
        playCollectSound();
      }

      setBeePos({ r: curR, c: curC });
      step += 1;
      timerRef.current = window.setTimeout(executeStep, 340);
    };

    timerRef.current = window.setTimeout(executeStep, 220);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-4 text-white shadow-2xl select-none">
      {/* Top Level & Score Bar */}
      <div className="w-full flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
            PUZZLE LOGIKA ALGORITMA ({levelIdx + 1}/{MAZE_LEVELS.length})
          </span>
          <h4 className="text-sm font-black font-['Space_Grotesk']">{currentLevel.title}</h4>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>{totalScore} Poin</span>
        </div>
      </div>

      {/* 5x5 Interactive Maze Grid */}
      <div className="grid grid-cols-5 gap-1.5 w-full max-w-[300px] aspect-square p-2.5 rounded-2xl bg-slate-950 border border-slate-800 mb-3">
        {Array.from({ length: 25 }).map((_, idx) => {
          const r = Math.floor(idx / 5);
          const c = idx % 5;
          const isBee = beePos.r === r && beePos.c === c;
          const isGoal = currentLevel.goal.r === r && currentLevel.goal.c === c;
          const isRock = currentLevel.rocks.some((rk) => rk.r === r && rk.c === c);
          const isFlower =
            currentLevel.flowers.some((fl) => fl.r === r && fl.c === c) &&
            !collectedFlowers.includes(`${r},${c}`);
          const isPortalIn =
            currentLevel.portalIn?.r === r && currentLevel.portalIn?.c === c;
          const isPortalOut =
            currentLevel.portalOut?.r === r && currentLevel.portalOut?.c === c;

          return (
            <div
              key={idx}
              className={`rounded-xl border flex items-center justify-center text-2xl transition-all duration-200 relative ${
                isRock
                  ? 'bg-slate-800 border-slate-700'
                  : isGoal
                  ? 'bg-emerald-500/20 border-emerald-500/50'
                  : isPortalIn || isPortalOut
                  ? 'bg-sky-500/20 border-sky-400/50'
                  : 'bg-slate-900/90 border-slate-800/80'
              }`}
            >
              <span className="absolute top-0.5 left-1 text-[8px] font-mono text-slate-600">
                {c + 1},{5 - r}
              </span>
              {isBee ? (
                <span className="animate-bounce z-10 drop-shadow-md">🐝</span>
              ) : isGoal ? (
                <span>🍯</span>
              ) : isRock ? (
                <span>🪨</span>
              ) : isPortalIn ? (
                <span title="Portal Masuk">🌀</span>
              ) : isPortalOut ? (
                <span title="Portal Keluar">✨</span>
              ) : isFlower ? (
                <span className="text-lg">🌸</span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Status / Bug / Hint Banner */}
      <div
        className={`w-full p-2.5 rounded-xl border text-xs mb-3 flex items-center justify-between gap-2 ${
          statusMsg.type === 'bug'
            ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
            : statusMsg.type === 'win' || statusMsg.type === 'all_clear'
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
            : 'bg-slate-800/80 border-slate-700 text-slate-300'
        }`}
      >
        <div className="flex items-start gap-2">
          {statusMsg.type === 'bug' ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          ) : statusMsg.type === 'win' || statusMsg.type === 'all_clear' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <span className="leading-snug font-medium">{statusMsg.text}</span>
        </div>

        {statusMsg.type === 'win' && (
          <button
            type="button"
            onClick={() => setLevelIdx((l) => Math.min(MAZE_LEVELS.length - 1, l + 1))}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Level {levelIdx + 2}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Program Queue Display (Visual Scratch-style Code Blocks) */}
      <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-2.5 mb-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1.5">
          <span>BARIS BLOK KODE ({program.length}/12 Maks):</span>
          {program.length > 0 && (
            <button
              type="button"
              onClick={handleClearProgram}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Hapus Semua
            </button>
          )}
        </div>

        <div className="min-h-[38px] flex flex-wrap items-center gap-1.5">
          {program.length === 0 ? (
            <span className="text-xs text-slate-600 italic">
              Klik tombol arah di bawah untuk menyusun algoritma Beeby...
            </span>
          ) : (
            program.map((cmd, idx) => {
              const meta = CMD_META[cmd];
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!isRunning) {
                      setProgram((prev) => prev.filter((_, i) => i !== idx));
                    }
                  }}
                  title="Klik untuk menghapus blok ini"
                  className={`px-2 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer ${
                    meta.color
                  } ${
                    isActive
                      ? 'ring-2 ring-white scale-110 shadow-lg'
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Command Palette Buttons */}
      <div className="grid grid-cols-5 gap-1.5 w-full mb-3">
        {(['UP', 'DOWN', 'LEFT', 'RIGHT'] as DirectionCmd[]).map((cmd) => {
          const meta = CMD_META[cmd];
          return (
            <button
              key={cmd}
              type="button"
              disabled={isRunning || program.length >= 12}
              onClick={() => handleAddCmd(cmd)}
              className="py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-xs font-black flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-base">{meta.emoji}</span>
              <span className="text-[10px]">{meta.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          disabled={isRunning || program.length === 0 || program.length >= 12}
          onClick={handleRepeatLast}
          className="py-2 px-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 border border-amber-500/40 text-amber-300 text-xs font-black flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer active:scale-95"
          title="Gandakan perintah terakhir (Loop 2x)"
        >
          <Repeat className="w-4 h-4 text-amber-400" />
          <span className="text-[10px]">ULANGI 2x</span>
        </button>
      </div>

      {/* Execute & Reset Controls */}
      <div className="flex gap-2 w-full">
        <button
          type="button"
          disabled={isRunning || program.length === 0}
          onClick={handleRunProgram}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:brightness-110 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>JALANKAN KODE (RUN)</span>
        </button>

        <button
          type="button"
          onClick={resetPositionOnly}
          className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          title="Ulangi Posisi Beeby"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {statusMsg.type === 'all_clear' && onOpenTrialEvents && (
        <button
          type="button"
          onClick={onOpenTrialEvents}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Klaim Kelas Trial Coding Gratis Sekarang!</span>
        </button>
      )}
    </div>
  );
};
