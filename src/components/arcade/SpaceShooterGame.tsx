import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  playLaserSound,
  playHitSound,
  playGameOverSound,
  playVictorySound,
} from './soundFX';
import {
  Shield,
  Trophy,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  Crosshair,
} from 'lucide-react';

interface SpaceShooterGameProps {
  onGameOver?: (score: number) => void;
  onOpenTrialEvents?: () => void;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Asteroid {
  x: number;
  y: number;
  speed: number;
  size: number;
  icon: string;
  points: number;
  hp: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

export const SpaceShooterGame: React.FC<SpaceShooterGameProps> = ({
  onGameOver,
  onOpenTrialEvents,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('beekoding_arcade_space_highscore') || '0', 10);
  });
  const [shields, setShields] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Control keys
  const keysRef = useRef<{ left: boolean; right: boolean; shoot: boolean }>({
    left: false,
    right: false,
    shoot: false,
  });

  const gameStateRef = useRef<{
    playerX: number;
    playerY: number;
    playerSpeed: number;
    bullets: Bullet[];
    asteroids: Asteroid[];
    particles: Particle[];
    score: number;
    shields: number;
    lastSpawn: number;
    lastShot: number;
    animationFrame: number;
  }>({
    playerX: 240,
    playerY: 570,
    playerSpeed: 7,
    bullets: [],
    asteroids: [],
    particles: [],
    score: 0,
    shields: 3,
    lastSpawn: 0,
    lastShot: 0,
    animationFrame: 0,
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
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysRef.current.shoot = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysRef.current.shoot = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const shootBullet = useCallback(() => {
    const state = gameStateRef.current;
    if (state.animationFrame - state.lastShot < 14) return;
    state.lastShot = state.animationFrame;
    state.bullets.push({
      x: state.playerX,
      y: state.playerY - 22,
      speed: 10,
    });
    playLaserSound();
  }, []);

  const startGame = useCallback(() => {
    gameStateRef.current = {
      playerX: 240,
      playerY: 570,
      playerSpeed: 8,
      bullets: [],
      asteroids: [],
      particles: [],
      score: 0,
      shields: 3,
      lastSpawn: 0,
      lastShot: 0,
      animationFrame: 0,
    };
    setScore(0);
    setShields(3);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  // Main Loop
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

      // 1. Draw Space Background with Twinkling Stars
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, gameWidth, gameHeight);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let s = 0; s < 35; s++) {
        const starX = ((s * 47 + state.animationFrame * 0.4) % gameWidth);
        const starY = ((s * 93 + state.animationFrame * 0.8) % gameHeight);
        ctx.fillRect(starX, starY, (s % 3) + 1, (s % 3) + 1);
      }

      // 2. Update Player
      if (keysRef.current.left) {
        state.playerX = Math.max(25, state.playerX - state.playerSpeed);
      }
      if (keysRef.current.right) {
        state.playerX = Math.min(gameWidth - 25, state.playerX + state.playerSpeed);
      }
      if (keysRef.current.shoot) {
        shootBullet();
      }

      // 3. Bullets update & draw
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      for (let b = state.bullets.length - 1; b >= 0; b--) {
        const bullet = state.bullets[b];
        bullet.y -= bullet.speed;

        ctx.fillRect(bullet.x - 2.5, bullet.y - 10, 5, 12);

        if (bullet.y < -20) {
          state.bullets.splice(b, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 4. Spawn Asteroids & Space Bugs
      if (state.animationFrame - state.lastSpawn > Math.max(30, 65 - Math.floor(state.score / 50))) {
        state.lastSpawn = state.animationFrame;
        const isBug = Math.random() < 0.35;
        state.asteroids.push({
          x: Math.random() * (gameWidth - 60) + 30,
          y: -30,
          speed: 2.5 + Math.random() * 2 + Math.min(3, state.score / 200),
          size: isBug ? 30 : 34,
          icon: isBug ? '👾' : '☄️',
          points: isBug ? 25 : 10,
          hp: isBug ? 2 : 1,
        });
      }

      // 5. Update Asteroids
      for (let a = state.asteroids.length - 1; a >= 0; a--) {
        const ast = state.asteroids[a];
        ast.y += ast.speed;

        // Draw Asteroid
        ctx.font = `${ast.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ast.icon, ast.x, ast.y);

        // Check Collision with Bullets
        for (let b = state.bullets.length - 1; b >= 0; b--) {
          const bullet = state.bullets[b];
          const bDist = Math.hypot(ast.x - bullet.x, ast.y - bullet.y);
          if (bDist < ast.size) {
            ast.hp--;
            state.bullets.splice(b, 1);

            // Explosion particles
            for (let p = 0; p < 8; p++) {
              state.particles.push({
                x: ast.x,
                y: ast.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: ast.icon === '👾' ? '#c084fc' : '#fb923c',
                size: Math.random() * 4 + 2,
                life: 20,
              });
            }

            if (ast.hp <= 0) {
              playHitSound();
              state.score += ast.points;
              setScore(state.score);
              state.asteroids.splice(a, 1);
              break;
            }
          }
        }

        // Check Collision with Player Spaceship
        const pDist = Math.hypot(ast.x - state.playerX, ast.y - state.playerY);
        if (pDist < 35) {
          playHitSound();
          state.shields -= 1;
          setShields(state.shields);
          state.asteroids.splice(a, 1);

          // Danger particles
          for (let p = 0; p < 15; p++) {
            state.particles.push({
              x: state.playerX,
              y: state.playerY,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              color: '#ef4444',
              size: Math.random() * 5 + 3,
              life: 25,
            });
          }

          if (state.shields <= 0) {
            playGameOverSound();
            setGameOver(true);
            setIsPlaying(false);
            if (onGameOver) onGameOver(state.score);

            if (state.score > highScore) {
              setHighScore(state.score);
              localStorage.setItem('beekoding_arcade_space_highscore', String(state.score));
              playVictorySound();
            }
            return;
          }
          continue;
        }

        // Offscreen removal
        if (ast.y > gameHeight + 40) {
          state.asteroids.splice(a, 1);
        }
      }

      // 6. Update Particles
      for (let p = state.particles.length - 1; p >= 0; p--) {
        const pt = state.particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();

        if (pt.life <= 0) {
          state.particles.splice(p, 1);
        }
      }

      // 7. Draw Player Spaceship
      const px = state.playerX;
      const py = state.playerY;

      ctx.save();
      ctx.translate(px, py);

      // Rocket Body
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.lineTo(16, 16);
      ctx.lineTo(-16, 16);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, -5, 6, 0, Math.PI * 2);
      ctx.fill();

      // Wings
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(-16, 8);
      ctx.lineTo(-26, 22);
      ctx.lineTo(-12, 18);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(16, 8);
      ctx.lineTo(26, 22);
      ctx.lineTo(12, 18);
      ctx.closePath();
      ctx.fill();

      // Thruster Flame
      const flameHeight = 10 + Math.random() * 8;
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-6, 16);
      ctx.lineTo(0, 16 + flameHeight);
      ctx.lineTo(6, 16);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore, shootBullet, onGameOver]);

  const handleShareWhatsApp = () => {
    const text = `🚀 Skorku di game *Space Galaxy Defender* buatan murid Beekoding adalah *${score} poin*!\n\nBisa tembak meteor lebih banyak dariku? Coba mainkan langsung gratis di browser:\nhttps://beekoding.my.id/#arcade`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://beekoding.my.id/#arcade');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto select-none">
      {/* Top Header Bar */}
      <div className="w-full bg-slate-900 text-white rounded-t-2xl p-3 sm:p-4 flex items-center justify-between border-b-2 border-purple-500 shadow-md">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-slate-300">Skor:</span>
          <span className="text-lg font-black font-['Space_Grotesk'] text-purple-400">
            {score}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shield
              key={i}
              className={`w-5 h-5 transition-transform ${
                i < shields ? 'fill-sky-400 text-sky-400 scale-100' : 'text-slate-700 scale-90 opacity-40'
              }`}
            />
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Tertinggi: <span className="font-bold text-white">{highScore}</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[3/4] bg-slate-950 overflow-hidden shadow-2xl">
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
            gameStateRef.current.playerX = Math.max(25, Math.min(455, relativeX * 480));
          }}
          onClick={() => {
            if (isPlaying && !gameOver) shootBullet();
          }}
        />

        {/* Start Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-4xl mb-3 animate-pulse">
              🚀
            </div>
            <h3 className="text-2xl font-black font-['Space_Grotesk'] text-white">
              Space Galaxy Defender
            </h3>
            <p className="text-xs text-purple-300 font-bold mt-1">
              Dibuat oleh: Nathania Putri (Usia 9 Thn, Scratch 3.0)
            </p>
            <p className="text-xs text-slate-300 max-w-xs mt-3 leading-relaxed">
              Tembak meteor ☄️ (+10) dan monster alien 👾 (+25). Jaga stasiun dari tabrakan!
            </p>

            <button
              type="button"
              onClick={startGame}
              className="mt-6 px-8 py-3.5 rounded-full text-sm font-black bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 text-white hover:brightness-110 shadow-lg shadow-purple-500/40 hover:scale-105 transition-all cursor-pointer"
            >
              Mulai Misi Antariksa 🚀
            </button>
            <span className="text-[11px] text-slate-400 mt-2 block">
              Panah Kiri/Kanan &amp; Spasi untuk tembak laser (atau sentuh layar di HP)
            </span>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
            <div className="text-4xl mb-2">💥</div>
            <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              Misi Berakhir!
            </h3>
            <div className="my-3 p-4 rounded-2xl bg-slate-900 border border-purple-500/30 w-full max-w-xs">
              <div className="text-xs text-slate-400 uppercase font-bold">Skor Pertahanan Kamu</div>
              <div className="text-4xl font-black text-purple-400 font-['Space_Grotesk'] my-1">
                {score}
              </div>
              <div className="text-xs text-slate-400">
                {score >= highScore && score > 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> REKOR GALAXY BARU!
                  </span>
                ) : (
                  <span>Rekor Tertinggi: {highScore} pts</span>
                )}
              </div>
            </div>

            {/* Share */}
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
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Play Again */}
            <button
              type="button"
              onClick={startGame}
              className="w-full max-w-xs py-3 rounded-xl text-xs font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:brightness-110 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luncurkan Lagi</span>
            </button>

            {onOpenTrialEvents && (
              <div className="mt-4 pt-3 border-t border-slate-800 w-full max-w-xs">
                <p className="text-[11px] text-slate-300">
                  Game dibuat oleh siswi Beekoding usia 9 tahun. Ingin anak Anda bisa merancang game sendiri?
                </p>
                <button
                  type="button"
                  onClick={onOpenTrialEvents}
                  className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Daftar Free Trial Class Beekoding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Virtual Controls for Mobile */}
      <div className="w-full bg-slate-900 border-t-2 border-slate-800 rounded-b-2xl p-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onMouseDown={() => (keysRef.current.left = true)}
          onMouseUp={() => (keysRef.current.left = false)}
          onTouchStart={() => (keysRef.current.left = true)}
          onTouchEnd={() => (keysRef.current.left = false)}
          className="flex-1 py-3 bg-slate-800 active:bg-purple-600 active:text-white text-white rounded-xl font-black text-base border border-slate-700 active:scale-95 transition-transform select-none"
        >
          ◀ Kiri
        </button>

        <button
          type="button"
          onClick={shootBullet}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 active:brightness-125 text-white rounded-xl font-black text-base shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1 select-none"
        >
          <Crosshair className="w-4 h-4 text-purple-200" />
          <span>Tembak</span>
        </button>

        <button
          type="button"
          onMouseDown={() => (keysRef.current.right = true)}
          onMouseUp={() => (keysRef.current.right = false)}
          onTouchStart={() => (keysRef.current.right = true)}
          onTouchEnd={() => (keysRef.current.right = false)}
          className="flex-1 py-3 bg-slate-800 active:bg-purple-600 active:text-white text-white rounded-xl font-black text-base border border-slate-700 active:scale-95 transition-transform select-none"
        >
          Kanan ▶
        </button>
      </div>
    </div>
  );
};
