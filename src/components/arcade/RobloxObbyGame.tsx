import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  playCollectSound,
  playHitSound,
  playGameOverSound,
  playVictorySound,
  playLaserSound,
} from './soundFX';
import {
  Heart,
  Trophy,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface RobloxObbyGameProps {
  onGameOver?: (score: number) => void;
  onOpenTrialEvents?: () => void;
}

interface ObstacleItem {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'lava' | 'laser' | 'coin' | 'checkpoint';
  collected?: boolean;
  passed?: boolean;
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

export const RobloxObbyGame: React.FC<RobloxObbyGameProps> = ({
  onGameOver,
  onOpenTrialEvents,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('beekoding_arcade_obby_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const gameStateRef = useRef<{
    playerY: number;
    playerVy: number;
    jumpsRemaining: number;
    isGrounded: boolean;
    runSpeed: number;
    distance: number;
    stage: number;
    score: number;
    lives: number;
    invincibleTimer: number;
    obstacles: ObstacleItem[];
    particles: Particle[];
    spawnTimer: number;
    legAngle: number;
  }>({
    playerY: 420,
    playerVy: 0,
    jumpsRemaining: 2,
    isGrounded: true,
    runSpeed: 5.2,
    distance: 0,
    stage: 1,
    score: 0,
    lives: 3,
    invincibleTimer: 0,
    obstacles: [],
    particles: [],
    spawnTimer: 0,
    legAngle: 0,
  });

  const triggerJump = useCallback(() => {
    const st = gameStateRef.current;
    if (st.jumpsRemaining > 0) {
      st.playerVy = st.jumpsRemaining === 2 ? -12.8 : -11.2;
      st.isGrounded = false;
      st.jumpsRemaining -= 1;
      playLaserSound();
      // Spawn jump dust particles
      for (let i = 0; i < 6; i++) {
        st.particles.push({
          x: 95,
          y: st.playerY + 46,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2 + 0.5,
          color: st.jumpsRemaining === 0 ? '#38bdf8' : '#fde047',
          size: 5,
          life: 18,
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'W'
      ) {
        if (isPlaying) {
          e.preventDefault();
          triggerJump();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, triggerJump]);

  const startGame = useCallback(() => {
    gameStateRef.current = {
      playerY: 420,
      playerVy: 0,
      jumpsRemaining: 2,
      isGrounded: true,
      runSpeed: 5.2,
      distance: 0,
      stage: 1,
      score: 0,
      lives: 3,
      invincibleTimer: 0,
      obstacles: [],
      particles: [],
      spawnTimer: 30,
      legAngle: 0,
    };
    setScore(0);
    setStage(1);
    setLives(3);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const GROUND_Y = 420; // Top of base platform is at 468 (player height 48)

    const renderLoop = () => {
      const st = gameStateRef.current;

      // Update physics
      st.distance += st.runSpeed;
      st.runSpeed = Math.min(9.2, 5.2 + Math.floor(st.score / 120) * 0.45);
      st.legAngle += 0.25;
      if (st.invincibleTimer > 0) st.invincibleTimer--;

      st.playerVy += 0.65; // Gravity
      st.playerY += st.playerVy;

      if (st.playerY >= GROUND_Y) {
        st.playerY = GROUND_Y;
        st.playerVy = 0;
        st.isGrounded = true;
        st.jumpsRemaining = 2;
      }

      // Spawn obstacles, coins, & checkpoints
      st.spawnTimer--;
      if (st.spawnTimer <= 0) {
        const rand = Math.random();
        if (rand < 0.42) {
          // Red Lava Block on ground
          st.obstacles.push({
            x: 500,
            y: 440,
            w: 44,
            h: 28,
            type: 'lava',
          });
          // Put a coin arc above the lava
          st.obstacles.push({
            x: 510,
            y: 350,
            w: 24,
            h: 24,
            type: 'coin',
          });
          st.spawnTimer = Math.floor(55 + Math.random() * 35);
        } else if (rand < 0.72) {
          // Tall Neon Laser Pillar (requires jump or double jump)
          const tall = Math.random() > 0.5;
          st.obstacles.push({
            x: 500,
            y: tall ? 392 : 412,
            w: 22,
            h: tall ? 76 : 56,
            type: 'laser',
          });
          st.obstacles.push({
            x: 500,
            y: tall ? 320 : 345,
            w: 24,
            h: 24,
            type: 'coin',
          });
          st.spawnTimer = Math.floor(60 + Math.random() * 35);
        } else if (rand < 0.9) {
          // Row of 3 Gold Robux Coins
          for (let c = 0; c < 3; c++) {
            st.obstacles.push({
              x: 500 + c * 38,
              y: 365 - (c === 1 ? 22 : 0),
              w: 24,
              h: 24,
              type: 'coin',
            });
          }
          st.spawnTimer = 55;
        } else {
          // Stage Checkpoint Flag
          st.obstacles.push({
            x: 500,
            y: 388,
            w: 32,
            h: 80,
            type: 'checkpoint',
          });
          st.spawnTimer = 70;
        }
      }

      // Draw Sky Background (Roblox Obby Skybox style)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 600);
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(0.55, '#1e293b');
      skyGrad.addColorStop(1, '#31102f');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 480, 600);

      // Draw Floating Background Obby Blocks (Parallax)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      for (let i = 0; i < 5; i++) {
        const bx = ((i * 120 - (st.distance * 0.3) % 600) + 600) % 600 - 80;
        const by = 110 + (i % 3) * 65;
        ctx.fillRect(bx, by, 68, 18);
      }

      // Draw Glowing Lava Sea at bottom
      const lavaGrad = ctx.createLinearGradient(0, 515, 0, 600);
      lavaGrad.addColorStop(0, '#ef4444');
      lavaGrad.addColorStop(1, '#991b1b');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, 515, 480, 85);

      // Draw Base Obby Studded Track
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 468, 480, 48);
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 468, 480, 8);

      // Moving studs on the platform
      ctx.fillStyle = '#64748b';
      const studOffset = Math.floor(st.distance) % 40;
      for (let sx = -studOffset; sx < 480; sx += 40) {
        ctx.fillRect(sx, 464, 18, 4);
      }

      // Update & Draw Obstacles
      const playerBox = {
        x: 78,
        y: st.playerY + 4,
        w: 32,
        h: 42,
      };

      for (let i = st.obstacles.length - 1; i >= 0; i--) {
        const ob = st.obstacles[i];
        ob.x -= st.runSpeed;

        // Draw obstacle
        if (ob.type === 'lava') {
          ctx.fillStyle = '#ff2a2a';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;
          ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(ob.x + 4, ob.y + 3, ob.w - 8, 5);
          ctx.shadowBlur = 0;
        } else if (ob.type === 'laser') {
          ctx.fillStyle = '#f43f5e';
          ctx.shadowColor = '#fb7185';
          ctx.shadowBlur = 14;
          ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
          ctx.fillStyle = '#fff';
          ctx.fillRect(ob.x + 7, ob.y + 4, 8, ob.h - 8);
          ctx.shadowBlur = 0;
        } else if (ob.type === 'coin' && !ob.collected) {
          ctx.save();
          ctx.translate(ob.x + 12, ob.y + 12);
          ctx.fillStyle = '#fbbf24';
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('R$', 0, 1);
          ctx.restore();
        } else if (ob.type === 'checkpoint') {
          // Pole
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(ob.x, ob.y, 5, ob.h);
          // Flag
          ctx.fillStyle = ob.passed ? '#10b981' : '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(ob.x + 5, ob.y);
          ctx.lineTo(ob.x + 34, ob.y + 14);
          ctx.lineTo(ob.x + 5, ob.y + 28);
          ctx.closePath();
          ctx.fill();
        }

        // Collision check
        const intersects =
          playerBox.x < ob.x + ob.w &&
          playerBox.x + playerBox.w > ob.x &&
          playerBox.y < ob.y + ob.h &&
          playerBox.y + playerBox.h > ob.y;

        if (intersects) {
          if (ob.type === 'coin' && !ob.collected) {
            ob.collected = true;
            st.score += 15;
            setScore(st.score);
            playCollectSound();
          } else if (ob.type === 'checkpoint' && !ob.passed) {
            ob.passed = true;
            st.stage += 1;
            st.score += 50;
            setStage(st.stage);
            setScore(st.score);
            playVictorySound();
          } else if (
            (ob.type === 'lava' || ob.type === 'laser') &&
            st.invincibleTimer <= 0
          ) {
            st.lives -= 1;
            st.invincibleTimer = 50;
            setLives(st.lives);
            playHitSound();

            if (st.lives <= 0) {
              playGameOverSound();
              setIsPlaying(false);
              setGameOver(true);
              if (st.score > highScore) {
                setHighScore(st.score);
                localStorage.setItem(
                  'beekoding_arcade_obby_highscore',
                  String(st.score)
                );
              }
              if (onGameOver) onGameOver(st.score);
              return;
            }
          }
        }

        // Award +5 points when jumping cleanly over a hazard
        if (
          (ob.type === 'lava' || ob.type === 'laser') &&
          !ob.passed &&
          ob.x + ob.w < playerBox.x
        ) {
          ob.passed = true;
          st.score += 10;
          setScore(st.score);
        }

        if (ob.x < -80) {
          st.obstacles.splice(i, 1);
        }
      }

      // Draw Roblox Blocky Character ("Beeby Blox Avatar")
      ctx.save();
      if (st.invincibleTimer > 0 && Math.floor(st.invincibleTimer / 4) % 2 === 0) {
        ctx.globalAlpha = 0.45;
      }
      const px = 76;
      const py = st.playerY;

      // Legs (Animated running swing)
      const swing = st.isGrounded ? Math.sin(st.legAngle) * 6 : 5;
      ctx.fillStyle = '#16a34a'; // Classic green blocky legs
      ctx.fillRect(px + 5 - swing * 0.5, py + 34, 10, 14);
      ctx.fillRect(px + 19 + swing * 0.5, py + 34, 10, 14);

      // Torso (Bright Blue Roblox Torso with Bee Badge)
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(px + 4, py + 16, 26, 19);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(px + 12, py + 21, 10, 8);

      // Arms
      ctx.fillStyle = '#facc15';
      ctx.fillRect(px - 2, py + 17, 6, 15);
      ctx.fillRect(px + 30, py + 17, 6, 15);

      // Head (Classic Yellow Block Head with Rounded Stud)
      ctx.fillStyle = '#facc15';
      ctx.fillRect(px + 7, py, 20, 16);
      ctx.fillRect(px + 12, py - 3, 10, 3);
      // Face
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px + 13, py + 5, 3, 3);
      ctx.fillRect(px + 21, py + 5, 3, 3);
      ctx.beginPath();
      ctx.arc(px + 18, py + 10, 4, 0, Math.PI);
      ctx.stroke();
      ctx.restore();

      // Draw & update particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) st.particles.splice(i, 1);
      }

      // Draw HUD Banner on Canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.fillRect(12, 12, 456, 44);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.strokeRect(12, 12, 456, 44);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`STAGE ${st.stage}`, 24, 39);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`SKOR: ${st.score}`, 120, 39);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(
        st.jumpsRemaining === 2
          ? '⚡ DOUBLE JUMP SIAP'
          : st.jumpsRemaining === 1
          ? '⚡ 1x LOMPAT LAGI'
          : '🔥 DI UDARA',
        295,
        38
      );

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, highScore, onGameOver]);

  const handleShareScore = () => {
    const shareText = `🧱🔥 Aku berhasil mencapai Stage ${stage} dengan Skor ${score} di game Roblox Obby Parkour Runner buatan murid Beekoding! Berani kalahkan skorku? Mainkan gratis di: https://beekoding.my.id/#arcade`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[440px]">
      {/* Score & Lives Top Bar */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 mb-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs font-bold">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-4 h-4" /> Skor: <strong>{score}</strong>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400">Rekor: {highScore}</span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Heart
              key={idx}
              className={`w-4 h-4 transition-all ${
                idx < lives
                  ? 'text-rose-500 fill-rose-500 scale-100'
                  : 'text-slate-700 scale-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Canvas Container */}
      <div
        onClick={() => {
          if (isPlaying) triggerJump();
        }}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-2xl bg-slate-950 select-none cursor-pointer"
      >
        <canvas
          ref={canvasRef}
          width={480}
          height={600}
          className="w-full h-full block"
        />

        {/* Start Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-4xl mb-4 shadow-lg shadow-rose-500/30 animate-bounce">
              🧱
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
              Roblox Studio Lua • Parkour Obby
            </span>
            <h3 className="text-2xl font-black font-['Space_Grotesk'] mb-2">
              Roblox Obby Lava Runner
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mb-6 leading-relaxed">
              Lompati balok lava merah &amp; laser neon! Tekan <strong>Spasi / Tap Layar 2x</strong> untuk melakukan <strong>Double Jump</strong> dan kumpulkan koin R$!
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-rose-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              ▶️ MULAI PARKOUR OBBY!
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
            <div className="text-4xl mb-2">🔥🧱</div>
            <h3 className="text-2xl font-black font-['Space_Grotesk'] text-rose-400">
              Terjatuh ke Lava!
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">
              Kamu mencapai <strong>Stage {stage}</strong> di Roblox Obby Parkour!
            </p>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-full max-w-xs mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Skor Akhir:</span>
                <span className="font-black text-amber-400 text-base">{score}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Rekor Terbaik:</span>
                <span className="font-bold text-emerald-400">{highScore}</span>
              </div>
            </div>

            <div className="flex gap-2 w-full max-w-xs mb-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Main Lagi</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareScore();
                }}
                className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan</span>
                  </>
                )}
              </button>
            </div>

            {onOpenTrialEvents && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTrialEvents();
                }}
                className="w-full max-w-xs py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Belajar Buat Game Roblox Sendiri (Gratis)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Jump Button */}
      <div className="w-full mt-3">
        <button
          type="button"
          onClick={() => {
            if (!isPlaying) {
              startGame();
            } else {
              triggerJump();
            }
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 active:scale-98 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>LOMPAT / DOUBLE JUMP! (SPASI / TAP)</span>
        </button>
      </div>
    </div>
  );
};
