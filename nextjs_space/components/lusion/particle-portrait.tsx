'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Dot = {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  sprite: number;
};

const SRC = '/images/photos/portre-01.jpg';

const SPRITE_COLORS = [
  'rgba(226, 233, 240, 1)',
  'rgba(176, 186, 198, 1)',
  'rgba(255, 122, 58, 1)',
  'rgba(14, 165, 183, 1)',
]; // ana küllü beyaz, ikincil gri, nadir kor/ateş ve su dokunuşu

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeSprite(color: string) {
  const size = 24;
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  if (!ctx) return sprite;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, color.replace(', 1)', ', 0.6)'));
  gradient.addColorStop(1, color.replace(', 1)', ', 0)'));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Lusion "team" bölümündeki portre düzenine göre tasarlanan nokta tabanlı portre:
 * fotoğraf, koyu zemine dokunan küçük tanelere dönüşür; imleç hızına göre savrulur
 * ve yerine süzülür. Tercih: hareket azaltma seçiliyse tek kare çizilir.
 */
export function ParticlePortrait({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    const sprites = SPRITE_COLORS.map(makeSprite);
    let frame = 0;
    let width = 0;
    let height = 0;
    let radius = 120;

    const pointer = { x: -9999, y: -9999, speed: 0, lastX: -9999, lastY: -9999 };

    const build = (img: HTMLImageElement) => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Kaynağı object-cover gibi kırpıp örnekle
      const sample = document.createElement('canvas');
      const cols = Math.max(48, Math.round(width / 7));
      const rows = Math.max(56, Math.round(height / 7));
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;

      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const cropW = cols / scale;
      const cropH = rows / scale;
      sctx.drawImage(
        img,
        (img.naturalWidth - cropW) / 2,
        (img.naturalHeight - cropH) / 2,
        cropW,
        cropH,
        0,
        0,
        cols,
        rows,
      );
      const pixels = sctx.getImageData(0, 0, cols, rows).data;

      // Kenarlardan flood-fill ile fon maskesi: gradyanlı (mavi→beyaz→gri) fonu
      // komşu renk benzerliğiyle baştan sona siter; yüz ve forma kontrastle durdurulur.
      const bgMask = new Uint8Array(cols * rows);
      const queue: number[] = [];
      let head = 0;
      const seed = (col: number, row: number) => {
        const idx = row * cols + col;
        if (bgMask[idx]) return;
        bgMask[idx] = 1;
        queue.push(idx);
      };
      for (let col = 0; col < cols; col += 1) {
        seed(col, 0);
        seed(col, rows - 1);
      }
      for (let row = 0; row < rows; row += 1) {
        seed(0, row);
        seed(cols - 1, row);
      }
      const pxAt = (col: number, row: number) => {
        const i = (row * cols + col) * 4;
        return [pixels[i], pixels[i + 1], pixels[i + 2]];
      };
      while (head < queue.length) {
        const idx = queue[head];
        head += 1;
        const row = (idx / cols) | 0;
        const col = idx - row * cols;
        const cur = pxAt(col, row);
        const pushIf = (ncol: number, nrow: number) => {
          if (ncol < 0 || nrow < 0 || ncol >= cols || nrow >= rows) return;
          const nIdx = nrow * cols + ncol;
          if (bgMask[nIdx]) return;
          const np = pxAt(ncol, nrow);
          const diff = Math.hypot(np[0] - cur[0], np[1] - cur[1], np[2] - cur[2]);
          if (diff <= 26) {
            bgMask[nIdx] = 1;
            queue.push(nIdx);
          }
        };
        pushIf(col + 1, row);
        pushIf(col - 1, row);
        pushIf(col, row + 1);
        pushIf(col, row - 1);
      }

      const cellW = width / cols;
      const cellH = height / rows;
      radius = Math.max(70, Math.min(240, width * 0.38));

      const next: Dot[] = [];
      const grainScale = Math.max(2.4, Math.min(4.6, cellW * 1.35));
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const i = (row * cols + col) * 4;
          const lum =
            0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
          if (lum < 46) continue;
          if (bgMask[row * cols + col]) continue;

          const x = (col + 0.5) * cellW + rand(-1.1, 1.1);
          const y = (row + 0.5) * cellH + rand(-1.1, 1.1);
          const brightness = lum / 255;
          const roll = Math.random();
          next.push({
            x,
            y,
            hx: x,
            hy: y,
            vx: 0,
            vy: 0,
            r: (0.55 + brightness * 1.75) * grainScale,
            alpha: 0.28 + brightness * 0.62,
            sprite: roll > 0.985 ? 2 : roll > 0.97 ? 3 : roll > 0.4 ? 0 : 1,
          });
        }
      }
      dots = next;
      setReady(true);

      if (reduced) {
        paintStatic();
      }
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.globalAlpha = dot.alpha;
        ctx.drawImage(sprites[dot.sprite], dot.x - dot.r, dot.y - dot.r, dot.r * 2, dot.r * 2);
      }
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      const active = !reduced && pointer.speed > 0.2;
      const focus = Math.min(1, pointer.speed / 22);

      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distanceSq = dx * dx + dy * dy;
        if (!reduced && distanceSq < radius * radius) {
          const distance = Math.sqrt(distanceSq) || 1;
          const falloff = 1 - distance / radius;
          const force = falloff * falloff * (1.4 + focus * 7) * (active ? 1.35 : 0.5);
          dot.vx += (dx / distance) * force - (dy / distance) * force * 0.22;
          dot.vy += (dy / distance) * force + (dx / distance) * force * 0.22;
        }
        dot.vx += (dot.hx - dot.x) * 0.018;
        dot.vy += (dot.hy - dot.y) * 0.018;
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x += dot.vx;
        dot.y += dot.vy;

        const glide = Math.hypot(dot.vx, dot.vy);
        ctx.globalAlpha = Math.min(1, dot.alpha * (active ? 0.7 + Math.min(0.6, glide * 0.08) : 1));
        const scale = dot.r * (1 + Math.min(1.6, glide * 0.2));
        ctx.drawImage(sprites[dot.sprite], dot.x - scale, dot.y - scale, scale * 2, scale * 2);
      }
      ctx.globalAlpha = 1;

      pointer.speed *= 0.9;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (pointer.lastX > -9000) {
        const moved = Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY);
        pointer.speed = Math.min(40, pointer.speed * 0.6 + moved * 1.4);
      }
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.speed = 0;
      pointer.lastX = -9999;
      pointer.lastY = -9999;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduced) frame = requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const img = new window.Image();
        img.onload = () => build(img);
        img.src = SRC;
      }, 140);
    };

    const img = new window.Image();
    img.onload = () => {
      build(img);
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    img.src = SRC;

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', onLeave);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={className}>
      <Image
        src={SRC}
        alt="Mehmet Kum"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`pointer-events-none object-cover grayscale transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-45'}`}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
