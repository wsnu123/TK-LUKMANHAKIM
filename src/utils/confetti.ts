/**
 * High-performance lightweight celebration confetti particle engine
 * Uses zero external heavy dependencies for instant 60fps burst animation.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'strip';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
  drag: number;
}

const COLORS = [
  '#0084d6', // Lukman Blue
  '#00a896', // Emerald Teal
  '#f59e0b', // Amber Sun
  '#10b981', // Islamic Green
  '#ec4899', // Joy Pink
  '#8b5cf6', // Violet
  '#38bdf8', // Sky Blue
  '#fbbf24', // Gold
];

export function triggerConfetti(originX?: number, originY?: number, particleCount = 75) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = (canvas.width = window.innerWidth * dpr);
  let height = (canvas.height = window.innerHeight * dpr);

  const startX = (originX !== undefined ? originX : window.innerWidth / 2) * dpr;
  const startY = (originY !== undefined ? originY : window.innerHeight * 0.4) * dpr;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 12 + 6) * dpr;
    const shapes: ('circle' | 'square' | 'strip')[] = ['circle', 'square', 'strip'];

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (Math.random() * 5 + 3) * dpr,
      size: (Math.random() * 8 + 5) * dpr,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.28 * dpr,
      drag: 0.965,
    });
  }

  let animationFrameId: number;
  const startTime = performance.now();
  const duration = 2800; // ms

  function animate(now: number) {
    const elapsed = now - startTime;
    if (elapsed > duration || particles.length === 0) {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
      return;
    }

    ctx?.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - elapsed / duration);

      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.globalAlpha = p.opacity;
      ctx!.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx!.beginPath();
        ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx!.fill();
      } else if (p.shape === 'square') {
        ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        // Strip ribbon
        ctx!.fillRect(-p.size / 2, -p.size / 4, p.size * 1.5, p.size / 2);
      }

      ctx!.restore();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}
