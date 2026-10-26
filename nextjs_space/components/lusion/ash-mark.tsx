'use client';

import { useEffect, useRef } from 'react';

type Grain = {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  sprite: number;
  phase: number;
  phaseSpeed: number;
};

type AshVariant = 'light' | 'dark';

const VARIANTS = {
  light: {
    sprites: [
      'rgba(240, 231, 219, 1)',
      'rgba(196, 184, 169, 1)',
      'rgba(255, 132, 66, 1)',
      'rgba(255, 246, 236, 1)',
    ],
    baseStops: ['rgba(245, 235, 221, 0.2)', 'rgba(210, 193, 172, 0.12)', 'rgba(255, 122, 58, 0.1)'],
    glow: 'rgba(255, 98, 38, 0.16)',
    density: 1.15,
    force: 1,
    radiusFactor: 0.42,
    grainScale: 4.6,
    sizeRange: [0.55, 1.85] as [number, number],
    alphaRange: [0.3, 0.95] as [number, number],
    tilt: true,
    capDesktop: 12400,
    capMobile: 6600,
  },
  dark: {
    sprites: [
      'rgba(58, 58, 66, 1)',
      'rgba(98, 98, 108, 1)',
      'rgba(255, 122, 58, 1)',
      'rgba(30, 30, 36, 1)',
    ],
    baseStops: ['rgba(255, 255, 255, 0.13)', 'rgba(214, 206, 196, 0.06)', 'rgba(255, 122, 58, 0.06)'],
    glow: 'rgba(255, 98, 38, 0.1)',
    density: 1.2,
    force: 0.42,
    radiusFactor: 1.05,
    grainScale: 4.2,
    sizeRange: [0.7, 2.2] as [number, number],
    alphaRange: [0.2, 0.72] as [number, number],
    tilt: false,
    capDesktop: 8600,
    capMobile: 4600,
  },
} as const;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeSprite(color: string) {
  const size = 32;
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  if (!ctx) return sprite;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.45, color.replace(', 1)', ', 0.55)'));
  gradient.addColorStop(1, color.replace(', 1)', ', 0)'));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Kül kaplı yazı işareti. Harflerin üzerinde kül gibi bir katman durur;
 * imleç üzerinden geçtiğinde kül, imleç hızına göre savrulur ve yerine süzülür.
 * variant "light" (tekil işaret) ve "dark" (footer, daha koyu kül) olarak ayarlanır.
 */
export function AshMark({
  text,
  variant = 'light',
  fontClass = 'font-round',
  fontWeight = 800,
  className,
}: {
  text: string;
  variant?: AshVariant;
  fontClass?: string;
  fontWeight?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = VARIANTS[variant];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const family = getComputedStyle(canvas).fontFamily || 'sans-serif';
    const needRead: CanvasRenderingContext2DSettings = { willReadFrequently: true };

    let width = 0;
    let height = 0;
    let fontSize = 200;
    let baseX = 0;
    let baselineY = 0;
    let textWidth = 0;
    let radius = 160;
    let frame = 0;
    let visible = true;

    let grains: Grain[] = [];
    let sprites: HTMLCanvasElement[] = [];

    const pointer = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      lastX: -9999,
      lastY: -9999,
    };

    const tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const setFont = (target: CanvasRenderingContext2D, size: number) => {
      target.font = `${fontWeight} ${size}px ${family}`;
    };

    const measure = (size: number) => {
      setFont(ctx, size);
      const m = ctx.measureText(text);
      return {
        width: m.width,
        ascent: m.actualBoundingBoxAscent,
        descent: m.actualBoundingBoxDescent,
      };
    };

    let baseLayer: HTMLCanvasElement | null = null;

    const renderBaseLayer = () => {
      const layer = document.createElement('canvas');
      layer.width = Math.max(1, Math.floor(width * dpr));
      layer.height = Math.max(1, Math.floor(height * dpr));
      const layerCtx = layer.getContext('2d');
      if (!layerCtx) return;
      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = layerCtx.createLinearGradient(
        0,
        baselineY - fontSize * 0.8,
        0,
        baselineY + fontSize * 0.08,
      );
      gradient.addColorStop(0, config.baseStops[0]);
      gradient.addColorStop(0.55, config.baseStops[1]);
      gradient.addColorStop(1, config.baseStops[2]);

      layerCtx.save();
      setFont(layerCtx, fontSize);
      layerCtx.textBaseline = 'alphabetic';
      layerCtx.shadowColor = config.glow;
      layerCtx.shadowBlur = Math.min(90, fontSize * 0.14);
      layerCtx.fillStyle = gradient;
      layerCtx.fillText(text, baseX, baselineY);
      layerCtx.restore();

      baseLayer = layer;
    };

    const paintBase = () => {
      if (baseLayer) ctx.drawImage(baseLayer, 0, 0, width, height);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const probe = measure(100);
      const byWidth = (width * 0.94) / (probe.width / 100);
      const byHeight = (height * 0.9) / ((probe.ascent + probe.descent) / 100);
      fontSize = Math.max(40, Math.min(byWidth, byHeight));

      const metrics = measure(fontSize);
      textWidth = metrics.width;
      baseX = (width - textWidth) / 2;
      baselineY = height / 2 + (metrics.ascent - metrics.descent) / 2;
      radius = Math.max(70, Math.min(340, fontSize * config.radiusFactor));

      const mask = document.createElement('canvas');
      mask.width = Math.ceil(width);
      mask.height = Math.ceil(height);
      const maskCtx = mask.getContext('2d', needRead);
      if (!maskCtx) return;

      const paintMask = () => {
        maskCtx.clearRect(0, 0, mask.width, mask.height);
        setFont(maskCtx, fontSize);
        maskCtx.textBaseline = 'alphabetic';
        maskCtx.fillStyle = '#fff';
        maskCtx.fillText(text, baseX, baselineY);
      };

      paintMask();
      let pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;

      let minX = mask.width;
      let maxX = -1;
      let minY = mask.height;
      let maxY = -1;
      for (let y = 0; y < mask.height; y += 2) {
        for (let x = 0; x < mask.width; x += 2) {
          if (pixels[(y * mask.width + x) * 4 + 3] > 100) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX > minX && maxY > minY) {
        baseX += width / 2 - (minX + maxX + 1) / 2;
        baselineY += height / 2 - (minY + maxY + 1) / 2;
        paintMask();
        pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
      }

      renderBaseLayer();

      const isInside = (x: number, y: number) => {
        const px = x | 0;
        const py = y | 0;
        if (px < 0 || py < 0 || px >= mask.width || py >= mask.height) return false;
        return pixels[(py * mask.width + px) * 4 + 3] > 128;
      };

      sprites = config.sprites.map(makeSprite);

      const cap = width < 768 ? config.capMobile : config.capDesktop;
      const count = reduced
        ? 2600
        : Math.max(1200, Math.min(cap, Math.round(textWidth * fontSize * 0.032 * config.density)));

      const next: Grain[] = [];
      let guard = 0;
      while (next.length < count && guard < count * 40) {
        guard += 1;
        const x = rand(0, width);
        const y = rand(0, height);
        if (!isInside(x, y)) continue;
        const roll = Math.random();
        next.push({
          x,
          y,
          hx: x,
          hy: y,
          vx: 0,
          vy: 0,
          size: rand(config.sizeRange[0], config.sizeRange[1]) * Math.min(1.5, Math.max(0.6, fontSize / 480)),
          alpha: rand(config.alphaRange[0], config.alphaRange[1]),
          sprite: roll > 0.95 ? 2 : roll > 0.5 ? 1 : roll > 0.22 ? 0 : 3,
          phase: rand(0, Math.PI * 2),
          phaseSpeed: rand(0.006, 0.02),
        });
      }
      grains = next;
    };

    const drawGrains = (moving: boolean) => {
      for (const grain of grains) {
        const glide = moving ? Math.hypot(grain.vx, grain.vy) : 0;
        const scale = grain.size * (config.grainScale + Math.min(3.4, glide * 0.26));
        ctx.globalAlpha = Math.min(
          1,
          grain.alpha * (moving ? 0.6 + Math.min(0.7, glide * 0.05) : 0.9),
        );
        ctx.drawImage(sprites[grain.sprite], grain.x - scale / 2, grain.y - scale / 2, scale, scale);
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      paintBase();

      const active = !reduced && pointer.speed > 0.2;
      const focus = Math.min(1, pointer.speed / 24);
      const forceScale = config.force;

      for (const grain of grains) {
        const dx = grain.x - pointer.x;
        const dy = grain.y - pointer.y;
        const distanceSq = dx * dx + dy * dy;

        if (!reduced && distanceSq < radius * radius) {
          const distance = Math.sqrt(distanceSq) || 1;
          const falloff = 1 - distance / radius;
          const force =
            falloff * falloff * (1.6 + focus * 7.5) * (0.55 + (active ? 1 : 0.2)) * forceScale;
          grain.vx +=
            (dx / distance) * force -
            (dy / distance) * force * 0.22 +
            pointer.vx * 0.1 * falloff * forceScale;
          grain.vy +=
            (dy / distance) * force +
            (dx / distance) * force * 0.22 +
            pointer.vy * 0.1 * falloff * forceScale;
        }

        grain.phase += grain.phaseSpeed;
        grain.vx += (grain.hx - grain.x) * 0.016 + Math.cos(grain.phase) * 0.05;
        grain.vy += (grain.hy - grain.y) * 0.016 + Math.sin(grain.phase * 1.3) * 0.045;
        grain.vx *= 0.92;
        grain.vy *= 0.92;
        grain.x += grain.vx;
        grain.y += grain.vy;
      }

      drawGrains(true);

      pointer.speed *= 0.9;
      pointer.vx *= 0.88;
      pointer.vy *= 0.88;

      if (config.tilt && !reduced) {
        tilt.x += (tilt.targetX - tilt.x) * 0.06;
        tilt.y += (tilt.targetY - tilt.y) * 0.06;
        canvas.style.transform = `translate3d(${tilt.x.toFixed(2)}px, ${tilt.y.toFixed(2)}px, 0) rotate(${(
          tilt.x * 0.05
        ).toFixed(3)}deg)`;
      }

      frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      if (pointer.lastX > -9000) {
        const moveX = pointer.x - pointer.lastX;
        const moveY = pointer.y - pointer.lastY;
        const moved = Math.hypot(moveX, moveY);
        pointer.speed = Math.min(48, pointer.speed * 0.62 + moved * 1.35);
        pointer.vx = Math.max(-70, Math.min(70, pointer.vx * 0.55 + moveX * 1.6));
        pointer.vy = Math.max(-70, Math.min(70, pointer.vy * 0.55 + moveY * 1.6));
      }
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;

      if (config.tilt) {
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;
        tilt.targetX = Math.max(-11, Math.min(11, nx * 11));
        tilt.targetY = Math.max(-7, Math.min(7, ny * 7));
      }
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.speed = 0;
      pointer.lastX = -9999;
      pointer.lastY = -9999;
      tilt.targetX = 0;
      tilt.targetY = 0;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && visible) frame = requestAnimationFrame(step);
    };

    // Ekran dışındaki küllü işaret KSA dongusunu yarim birak (sayfada üç işaret var)
    let observer: IntersectionObserver | null = null;

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) {
          ctx.clearRect(0, 0, width, height);
          paintBase();
          drawGrains(false);
        }
      }, 120);
    };

    build();

    // Fontlar async yüklenirse ilk ölçümde yedek fontla sıkısir — hazır olunca bir kez yeniden kur
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (canvas.isConnected) {
          build();
          if (reduced) {
            ctx.clearRect(0, 0, width, height);
            paintBase();
            drawGrains(false);
          }
        }
      }).catch(() => {});
    }

    if (reduced) {
      paintBase();
      drawGrains(false);
    } else {
      frame = requestAnimationFrame(step);
    }

    if (!reduced && typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !document.hidden) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(frame);
        }
      });
      observer.observe(canvas);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', onLeave);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [text, variant, fontClass, fontWeight]);

  return (
    <div className="relative w-full" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className={`block w-full ${fontClass} will-change-transform ${className ?? 'h-full'}`}
      />
    </div>
  );
}
