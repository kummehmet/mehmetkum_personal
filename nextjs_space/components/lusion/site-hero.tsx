'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';

const roles = ['Bilgisayar Mühendisi', 'Kamu Yöneticisi', 'İtfaiyeci'];

export function SiteHero({ locale, t }: { locale: Locale; t: Messages }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#08090c] px-6 pb-8 pt-28 text-white md:px-10 lg:px-[72px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(900px circle at 78% 8%, rgba(255,90,31,0.14), transparent 62%), radial-gradient(700px circle at 12% 92%, rgba(14,165,183,0.10), transparent 65%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.35]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40"
        >
          <span>{t.hero.eyebrow}</span>
          <span className="hidden sm:inline">Ankara, TR — 39.9334° N, 32.8597° E</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-[#ff5a1f]" />
            {t.home.hero.availability}
          </span>
        </motion.div>

        <div className="relative mt-10 md:mt-14">
          <h1 className="font-display font-medium uppercase leading-[0.8] tracking-[-0.055em] text-[clamp(3.6rem,16vw,16rem)]">
            <span className="block overflow-hidden">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Mehmet
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Kum
              </motion.span>
            </span>
          </h1>
          <span className="absolute bottom-3 right-0 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 md:flex">
            <span className="h-px w-16 bg-white/20" />
            {t.home.hero.since}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid w-full max-w-[1600px] gap-8 md:grid-cols-12 md:items-end">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-5"
        >
          <ul className="space-y-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            {roles.map((role, index) => (
              <li key={role} className="flex items-baseline gap-3">
                <span className="text-white/20">0{index + 1}</span>
                {role}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-md text-balance text-sm leading-relaxed text-white/50 md:col-span-4 md:col-start-7"
        >
          {t.home.hero.blurb}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 md:col-span-2 md:justify-end"
        >
          <Link
            href={`/${locale}#isler`}
            className="group inline-flex items-center gap-2 border border-white/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#08090c]"
          >
            {t.home.hero.cta}
            <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
          <a
            href={`/api/cv?locale=${locale}`}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
          >
            {t.resume.download}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1600px] items-center justify-between border-t border-white/12 pt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" /> fire
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#0ea5b7]" /> water
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#0f766e]" /> signal
          </span>
        </span>
        <span className="flex items-center gap-2">
          {t.hero.scroll}
          <span className="relative block h-8 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-scroll-hint bg-white" />
          </span>
        </span>
      </div>
    </section>
  );
}
