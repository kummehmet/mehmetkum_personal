'use client';

import { useEffect, useRef } from 'react';

type Ember = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  alpha: number;
  twinkle: number;
  hue: number;
};

/**
 * Ateş kıvılcımı (ember) parçacık sistemi — saf canvas, harici kütüphane yok.
 */
export function EmberCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COUNT = reduced ? 26 : 72;

    let width = 0;
    let height = 0;
    let frame = 0;
    const embers: Ember[] = [];

    const spawn = (initial: boolean): Ember => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 12,
      radius: 0.5 + Math.random() * 1.9,
      speed: 0.22 + Math.random() * 0.95,
      drift: (Math.random() - 0.5) * 0.7,
      alpha: 0.2 + Math.random() * 0.55,
      twinkle: Math.random() * Math.PI * 2,
      hue: 14 + Math.random() * 26,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers.length = 0;
      for (let i = 0; i < COUNT; i += 1) embers.push(spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const ember of embers) {
        ember.y -= ember.speed;
        ember.x += ember.drift + Math.sin((ember.y + ember.twinkle * 40) / 90) * 0.25;
        ember.twinkle += 0.03;

        if (ember.y < -12) {
          Object.assign(ember, spawn(false));
          continue;
        }

        const life = Math.min(1, ember.y / (height * 0.35));
        const opacity = ember.alpha * life * (0.65 + Math.sin(ember.twinkle) * 0.35);

        const glow = ctx.createRadialGradient(
          ember.x,
          ember.y,
          0,
          ember.x,
          ember.y,
          ember.radius * 7,
        );
        glow.addColorStop(0, `hsla(${ember.hue}, 100%, 62%, ${opacity})`);
        glow.addColorStop(0.35, `hsla(${ember.hue}, 100%, 48%, ${opacity * 0.4})`);
        glow.addColorStop(1, 'hsla(16, 100%, 45%, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius * 7, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
