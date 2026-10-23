'use client';

import { useEffect } from 'react';

/**
 * Lenis ile yumuşak kaydırma. prefers-reduced-motion tercihinde
 * tamamen devre dışı bırakılır ve native scroll korunur.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (prefersReduced || isTouch) return;

    let cleanup: (() => void) | undefined;

    void import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
        anchors: { offset: -80 },
      });

      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => cleanup?.();
  }, []);

  return <>{children}</>;
}
