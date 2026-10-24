'use client';

import { useEffect, useRef } from 'react';

type Drop = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  wobble: number;
  wobbleSpeed: number;
  life: number;
};

type Flame = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
  hue: number;
  phase: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * Ana sayfanın tamamında çalışan atmosfer katmanı.
 * - Tıklama: imleç noktasından su damlaları fışkırır.
 * - Basılı tutma: su akmaya devam eder.
 * - Alt kenar: sürekli ateş yanar.
 */
export function PageAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;

    const drops: Drop[] = [];
    const flames: Flame[] = [];

    const pointer = { x: -9999, y: -9999, pressed: false, inside: false };
    let emission = 0;

    const spawnDrop = (x: number, y: number): Drop => ({
      x: x + rand(-10, 10),
      y: y + rand(-8, 8),
      vx: rand(-2.6, 2.6),
      vy: rand(-6.4, -1.2),
      r: rand(1.9, 5.4),
      alpha: rand(0.5, 0.9),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: rand(0.03, 0.075),
      life: 1,
    });

    const spawnFlame = (initial: boolean): Flame => ({
      x: rand(-20, width + 20),
      y: initial ? rand(height - 90, height + 10) : height + rand(4, 30),
      r: rand(10, 46),
      speed: rand(0.6, 2.1),
      drift: rand(-0.45, 0.45),
      alpha: rand(0.22, 0.6),
      hue: rand(14, 38),
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      flames.length = 0;
      const count = reduced ? 20 : Math.min(90, Math.round(width / 18));
      for (let i = 0; i < count; i += 1) flames.push(spawnFlame(true));
    };

    const drawFlames = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      const bed = ctx.createLinearGradient(0, height - 130, 0, height);
      bed.addColorStop(0, 'rgba(255, 90, 31, 0)');
      bed.addColorStop(0.6, 'rgba(255, 90, 31, 0.05)');
      bed.addColorStop(1, 'rgba(255, 106, 26, 0.16)');
      ctx.fillStyle = bed;
      ctx.fillRect(0, height - 130, width, 130);

      ctx.globalCompositeOperation = 'lighter';
      for (const flame of flames) {
        if (!reduced) {
          flame.y -= flame.speed;
          flame.x += flame.drift + Math.sin(time * 0.0012 + flame.phase) * 0.6;
          flame.phase += 0.02;
          if (flame.y < height - 150) Object.assign(flame, spawnFlame(false));
        }

        const fade = Math.max(0, Math.min(1, (flame.y - (height - 150)) / 150));
        const opacity = flame.alpha * fade;
        if (opacity <= 0.005) continue;

        const radius = flame.r * (0.72 + Math.sin(flame.phase) * 0.16);
        const glow = ctx.createRadialGradient(flame.x, flame.y, 0, flame.x, flame.y, radius);
        glow.addColorStop(0, `hsla(${flame.hue}, 100%, 66%, ${opacity})`);
        glow.addColorStop(0.45, `hsla(${flame.hue}, 100%, 50%, ${opacity * 0.4})`);
        glow.addColorStop(1, 'hsla(18, 100%, 46%, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(flame.x, flame.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawDrops = () => {
      ctx.save();
      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        drop.vy += 0.34;
        drop.vx *= 0.994;
        drop.x += drop.vx + Math.sin(drop.wobble) * 0.45;
        drop.y += drop.vy;
        drop.wobble += drop.wobbleSpeed;
        drop.life -= 0.0035;

        if (drop.y > height + 40 || drop.life <= 0) {
          drops.splice(i, 1);
          continue;
        }

        const opacity = drop.alpha * Math.min(1, drop.life * 1.5);
        const stretch = Math.min(2.6, 1 + Math.abs(drop.vy) * 0.11);

        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.scale(1, stretch);

        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, drop.r * 2.6);
        glow.addColorStop(0, `hsla(189, 95%, 52%, ${opacity * 0.55})`);
        glow.addColorStop(0.55, `hsla(190, 90%, 46%, ${opacity * 0.22})`);
        glow.addColorStop(1, 'hsla(190, 90%, 46%, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, drop.r * 2.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(191, 92%, 38%, ${opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, drop.r * 0.6, drop.r, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(186, 100%, 92%, ${opacity * 0.85})`;
        ctx.beginPath();
        ctx.ellipse(-drop.r * 0.18, -drop.r * 0.28, drop.r * 0.2, drop.r * 0.32, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    const emit = (count: number) => {
      for (let i = 0; i < count; i += 1) drops.push(spawnDrop(pointer.x, pointer.y));
    };

    const draw = (now: number) => {
      time = now;
      ctx.clearRect(0, 0, width, height);

      if (pointer.pressed && pointer.inside) {
        emission += 1;
        if (emission % 2 === 0) emit(reduced ? 1 : 3);
      }

      drawFlames();
      drawDrops();
      frame = requestAnimationFrame(draw);
    };

    const onDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      pointer.pressed = true;
      emit(reduced ? 6 : 26);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
    };

    const onUp = () => {
      pointer.pressed = false;
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.pressed = false;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-page-atmosphere="true"
      className="pointer-events-none fixed inset-0 z-30 h-screen w-screen"
    />
  );
}
