'use client';

import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { EmberCanvas } from '@/components/hero/ember-canvas';
import { HeroText } from '@/components/hero/hero-text';

export function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);

  const onPointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-28 pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-gradient" />
      <EmberCanvas className="pointer-events-none absolute inset-0 h-full w-full" />

      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="relative h-[min(70vw,520px)] w-[min(70vw,520px)]">
          <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_38%_32%,rgba(255,214,170,0.85),rgba(255,69,0,0.55)_42%,rgba(122,27,0,0.25)_72%,transparent_78%)] blur-xl" />
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,69,0,0.55)_70deg,transparent_150deg,rgba(30,144,255,0.35)_250deg,transparent_330deg)] [mask-image:radial-gradient(circle,transparent_58%,black_60%,black_64%,transparent_66%)]" />
          <div className="absolute inset-[12%] animate-[spin_38s_linear_infinite_reverse] rounded-full border border-white/[0.07]" />
        </div>
      </motion.div>

      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-white/45"
        >
          {t.hero.eyebrow}
        </motion.p>

        <HeroText
          text={t.hero.title}
          className="font-display text-[clamp(2.9rem,12vw,9.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-8 max-w-2xl text-balance text-base text-white/60 md:text-xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href={`/api/cv?locale=${locale}`}
            className="pill group inline-flex items-center gap-2 bg-gradient-fire px-7 py-3.5 text-sm font-medium text-white hover:shadow-[0_16px_40px_-12px_rgba(255,69,0,0.85)]"
          >
            {t.resume.download}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href={`/${locale}/projeler`}
            className="pill inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            {t.nav.projects}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
          {t.hero.scroll}
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-6 animate-scroll-hint bg-gradient-fire" />
        </span>
      </div>
    </section>
  );
}
