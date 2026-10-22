import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  playCollectSound,
  playHitSound,
  playGameOverSound,
  playVictorySound,
} from './soundFX';
import {
  Heart,
  Trophy,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
} from 'lucide-react';

interface BeeHoneyGameProps {
  onGameOver?: (score: number) => void;
  onOpenTrialEvents?: () => void;
}

interface FallingItem {
  x: number;
  y: number;
  speed: number;
  type: 'honey' | 'flower' | 'star' | 'cloud';
  size: number;
  icon: string;
  points: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  life: number;
}

export const BeeHoneyGame: React.FC<BeeHoneyGameProps> = ({
  onGameOver,
  onOpenTrialEvents,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('beekoding_arcade_bee_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Control keys
  const keysRef = useRef<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  });

  // Game internal state
  const gameStateRef = useRef<{
    playerX: number;
    playerY: number;
    playerSpeed: number;
    items: FallingItem[];
    floatingTexts: FloatingText[];
    score: number;
    lives: number;
    lastSpawn: number;
    spawnInterval: number;
    animationFrame: number;
    wingFlap: number;
  }>({
    playerX: 240,
    playerY: 560,
    playerSpeed: 7,
    items: [],
    floatingTexts: [],
    score: 0,
    lives: 3,
    lastSpawn: 0,
    spawnInterval: 60,
    animationFrame: 0,
    wingFlap: 0,
  });

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = useCallback(() => {
    gameStateRef.current = {
      playerX: 240,
      playerY: 550,
      playerSpeed: 8,
      items: [],
      floatingTexts: [],
      score: 0,
      lives: 3,
      lastSpawn: 0,
      spawnInterval: 50,
      animationFrame: 0,
      wingFlap: 0,
    };
    setScore(0);
    setLives(3);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  // Main Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameWidth = 480;
    const gameHeight = 640;

    const loop = () => {
      const state = gameStateRef.current;
      state.animationFrame++;
      state.wingFlap += 0.2;

      // 1. Clear Screen with Cheerful Sky Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, gameHeight);
      bgGrad.addColorStop(0, '#7dd3fc'); // Sky blue
      bgGrad.addColorStop(0.7, '#bae6fd');
      bgGrad.addColorStop(1, '#fef08a'); // Sunny yellow horizon
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, gameWidth, gameHeight);

      // Decorative Background Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(80, 100, 35, 0, Math.PI * 2);
      ctx.arc(120, 90, 45, 0, Math.PI * 2);
      ctx.arc(160, 100, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(360, 160, 30, 0, Math.PI * 2);
      ctx.arc(395, 150, 40, 0, Math.PI * 2);
      ctx.arc(430, 160, 30, 0, Math.PI * 2);
      ctx.fill();

      // 2. Update Player Position
      if (keysRef.current.left) {
        state.playerX = Math.max(30, state.playerX - state.playerSpeed);
      }
      if (keysRef.current.right) {
        state.playerX = Math.min(gameWidth - 30, state.playerX + state.playerSpeed);
      }

      // 3. Spawn Items
      if (state.animationFrame - state.lastSpawn > state.spawnInterval) {
        state.lastSpawn = state.animationFrame;
        // Make it slightly faster over time
        state.spawnInterval = Math.max(25, 50 - Math.floor(state.score / 60));

        const rand = Math.random();
        let item: FallingItem;

        if (rand < 0.55) {
          // Regular Honey Pot
          item = {
            x: Math.random() * (gameWidth - 60) + 30,
            y: -30,
            speed: 3 + Math.random() * 2.5 + Math.min(3, state.score / 200),
            type: 'honey',
            size: 30,
            icon: '🍯',
            points: 10,
          };
        } else if (rand < 0.75) {
          // Flower Blossom
          item = {
            x: Math.random() * (gameWidth - 60) + 30,
            y: -30,
            speed: 3.5 + Math.random() * 2,
            type: 'flower',
            size: 32,
            icon: '🌸',
            points: 25,
          };
        } else if (rand < 0.85) {
          // Golden Honey Star
          item = {
            x: Math.random() * (gameWidth - 60) + 30,
            y: -30,
            speed: 4.5 + Math.random() * 2,
            type: 'star',
            size: 34,
            icon: '⭐',
            points: 50,
          };
        } else {
          // Storm Lightning Cloud (Danger!)
          item = {
            x: Math.random() * (gameWidth - 60) + 30,
            y: -30,
            speed: 3.8 + Math.random() * 2.5,
            type: 'cloud',
            size: 32,
            icon: '⚡',
            points: 0,
          };
        }
        state.items.push(item);
      }

      // 4. Update & Draw Items
      for (let i = state.items.length - 1; i >= 0; i--) {
        const item = state.items[i];
        item.y += item.speed;

        // Draw Item Emoji
        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.icon, item.x, item.y);

        // Check Collision with Beeby (player at playerX, playerY with radius 28)
        const dx = item.x - state.playerX;
        const dy = item.y - state.playerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40) {
          if (item.type === 'cloud') {
            // Hit hazard!
            playHitSound();
            state.lives -= 1;
            setLives(state.lives);

            state.floatingTexts.push({
              x: state.playerX,
              y: state.playerY - 20,
              text: '-1 ❤️',
              color: '#ef4444',
              opacity: 1,
              life: 30,
            });

            if (state.lives <= 0) {
              // Game Over
              playGameOverSound();
              setGameOver(true);
              setIsPlaying(false);
              if (onGameOver) onGameOver(state.score);

              // Update High Score
              if (state.score > highScore) {
                setHighScore(state.score);
                localStorage.setItem('beekoding_arcade_bee_highscore', String(state.score));
                playVictorySound();
              }
              return;
            }
          } else {
            // Collected sweet item!
            playCollectSound();
            state.score += item.points;
            setScore(state.score);

            state.floatingTexts.push({
              x: item.x,
              y: item.y - 15,
              text: `+${item.points}`,
              color: item.type === 'star' ? '#f59e0b' : '#10b981',
              opacity: 1,
              life: 25,
            });
          }
          state.items.splice(i, 1);
          continue;
        }

        // Remove if off screen
        if (item.y > gameHeight + 40) {
          state.items.splice(i, 1);
        }
      }

      // 5. Draw Floating Texts (+10, +50, -1)
      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y -= 1.2;
        ft.life--;
        ft.opacity = Math.max(0, ft.life / 25);

        ctx.save();
        ctx.globalAlpha = ft.opacity;
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 18px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.life <= 0) {
          state.floatingTexts.splice(i, 1);
        }
      }

      // 6. Draw Player (Beeby the Honeybee Mascot)
      const px = state.playerX;
      const py = state.playerY;

      ctx.save();
      ctx.translate(px, py);

      // Flapping Wings
      const wingAngle = Math.sin(state.wingFlap) * 0.35;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;

      // Left Wing
      ctx.save();
      ctx.rotate(-wingAngle - 0.2);
      ctx.beginPath();
      ctx.ellipse(-14, -18, 16, 8, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Right Wing
      ctx.save();
      ctx.rotate(wingAngle + 0.2);
      ctx.beginPath();
      ctx.ellipse(14, -18, 16, 8, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Bee Body (Golden oval)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Black Stripes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.rect(-8, -19, 6, 38);
      ctx.rect(4, -19, 6, 38);
      ctx.clip();
      ctx.fill();

      // Re-draw body outline
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Cute Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-8, -4, 5, 0, Math.PI * 2);
      ctx.arc(8, -4, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-7, -4, 2.5, 0, Math.PI * 2);
      ctx.arc(9, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Rosy Cheeks
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(-14, 2, 3, 0, Math.PI * 2);
      ctx.arc(14, 2, 3, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 3, 5, 0, Math.PI);
      ctx.stroke();

      // Antennas
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-6, -18);
      ctx.lineTo(-12, -28);
      ctx.moveTo(6, -18);
      ctx.lineTo(12, -28);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(-12, -29, 3, 0, Math.PI * 2);
      ctx.arc(12, -29, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Continue loop
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore, onGameOver]);

  const handleShareWhatsApp = () => {
    const text = `🎮 Skorku di game *Bee Honey Catch* buatan murid Beekoding adalah *${score} poin*!\n\nBisa kalahkan rekor ini? Coba mainkan langsung gratis di browser tanpa install:\nhttps://beekoding.my.id/#arcade`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://beekoding.my.id/#arcade');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto select-none">
      {/* Top Header Bar: Score, Lives, Highscore */}
      <div className="w-full bg-slate-900 text-white rounded-t-2xl p-3 sm:p-4 flex items-center justify-between border-b-2 border-amber-500 shadow-md">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300">Skor:</span>
          <span className="text-lg font-black font-['Space_Grotesk'] text-amber-400">
            {score}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 transition-transform ${
                i < lives ? 'fill-rose-500 text-rose-500 scale-100' : 'text-slate-600 scale-90 opacity-40'
              }`}
            />
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Tertinggi: <span className="font-bold text-white">{highScore}</span>
        </div>
      </div>

      {/* Canvas Game Area */}
      <div className="relative w-full aspect-[3/4] bg-sky-200 overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={480}
          height={640}
          className="w-full h-full object-contain block touch-none"
          onTouchMove={(e) => {
            if (!isPlaying || gameOver) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            const relativeX = (touch.clientX - rect.left) / rect.width;
            gameStateRef.current.playerX = Math.max(30, Math.min(450, relativeX * 480));
          }}
        />

        {/* Start Screen Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl mb-3 animate-bounce">
              🐝
            </div>
            <h3 className="text-2xl font-black font-['Space_Grotesk'] text-white">
              Bee Honey Adventure
            </h3>
            <p className="text-xs text-amber-300 font-bold mt-1">
              Dibuat oleh: Kenzo Alvaro (Usia 8 Thn, Scratch 3.0)
            </p>
            <p className="text-xs text-slate-300 max-w-xs mt-3 leading-relaxed">
              Tangkap madu 🍯 (+10), bunga 🌸 (+25), dan bintang ⭐ (+50). Hindari awan petir ⚡!
            </p>

            <button
              type="button"
              onClick={startGame}
              className="mt-6 px-8 py-3.5 rounded-full text-sm font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              Mulai Mainkan Sekarang 🎮
            </button>
            <span className="text-[11px] text-slate-400 mt-2 block">
              Gunakan tombol Panah Kiri/Kanan atau geser jari di HP
            </span>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              Permainan Selesai!
            </h3>
            <div className="my-3 p-4 rounded-2xl bg-slate-900 border border-amber-500/30 w-full max-w-xs">
              <div className="text-xs text-slate-400 uppercase font-bold">Skor Akhir Kamu</div>
              <div className="text-4xl font-black text-amber-400 font-['Space_Grotesk'] my-1">
                {score}
              </div>
              <div className="text-xs text-slate-400">
                {score >= highScore && score > 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> REKOR BARU TERCIPTA!
                  </span>
                ) : (
                  <span>Rekor Tertinggi: {highScore} pts</span>
                )}
              </div>
            </div>

            {/* Share Challenge */}
            <div className="flex gap-2 w-full max-w-xs mb-3">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Tantang Teman</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-all"
                title="Salin tautan game"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Play Again */}
            <button
              type="button"
              onClick={startGame}
              className="w-full max-w-xs py-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Lagi Sekali</span>
            </button>

            {/* Conversion CTA to Learn */}
            {onOpenTrialEvents && (
              <div className="mt-4 pt-3 border-t border-slate-800 w-full max-w-xs">
                <p className="text-[11px] text-slate-300">
                  Game ini dibuat oleh murid Beekoding usia 8 tahun. Ingin buah hati bisa menciptakan game sendiri?
                </p>
                <button
                  type="button"
                  onClick={onOpenTrialEvents}
                  className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Daftar Free Trial Class Beekoding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Virtual Controls for Mobile / Tablet Users */}
      <div className="w-full bg-slate-900 border-t-2 border-slate-800 rounded-b-2xl p-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onMouseDown={() => (keysRef.current.left = true)}
          onMouseUp={() => (keysRef.current.left = false)}
          onTouchStart={() => (keysRef.current.left = true)}
          onTouchEnd={() => (keysRef.current.left = false)}
          className="flex-1 py-3 bg-slate-800 active:bg-amber-500 active:text-slate-950 text-white rounded-xl font-black text-lg border border-slate-700 active:scale-95 transition-transform flex items-center justify-center gap-2 select-none"
        >
          <span>◀ Kiri</span>
        </button>

        <span className="text-[10px] text-slate-400 hidden sm:inline text-center">
          Keyboard: <strong>Panah Kiri/Kanan</strong> atau <strong>A/D</strong>
        </span>

        <button
          type="button"
          onMouseDown={() => (keysRef.current.right = true)}
          onMouseUp={() => (keysRef.current.right = false)}
          onTouchStart={() => (keysRef.current.right = true)}
          onTouchEnd={() => (keysRef.current.right = false)}
          className="flex-1 py-3 bg-slate-800 active:bg-amber-500 active:text-slate-950 text-white rounded-xl font-black text-lg border border-slate-700 active:scale-95 transition-transform flex items-center justify-center gap-2 select-none"
        >
          <span>Kanan ▶</span>
        </button>
      </div>
    </div>
  );
};
