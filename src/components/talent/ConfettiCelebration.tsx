import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

const COLORS = [
  '#f59e0b', // amber-500
  '#fbbf24', // amber-400
  '#10b981', // emerald-500
  '#06b6d4', // cyan-500
  '#8b5cf6', // purple-500
  '#ec4899', // pink-500
  '#ffffff', // white
];

export const ConfettiCelebration: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Generate confetti particles
    const particleCount = Math.min(Math.floor(width / 12), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * (width * 0.4),
        y: height * 0.25 + (Math.random() - 0.5) * 50,
        size: Math.random() * 8 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 12 - 5,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        opacity: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    const duration = 3200; // 3.2 detik

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const fadeOut = elapsed > duration - 800 ? (duration - elapsed) / 800 : 1;

      particles.forEach((p) => {
        // Physics
        p.vy += 0.35; // gravity
        p.vx *= 0.985; // air drag
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.wobble += p.wobbleSpeed;

        const currentOpacity = Math.max(0, p.opacity * fadeOut);

        ctx.save();
        ctx.translate(p.x + Math.sin(p.wobble) * 4, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.6);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
