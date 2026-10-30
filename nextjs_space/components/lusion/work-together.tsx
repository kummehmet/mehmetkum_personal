'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { AshMark } from '@/components/lusion/ash-mark';

export function WorkTogether({ locale, t }: { locale: Locale; t: Messages }) {
  const reduce = useReducedMotion();

  const bigTitle =
    locale === 'tr'
      ? t.home.together.title.toLocaleUpperCase('tr-TR')
      : t.home.together.title.toLocaleUpperCase('en-US');

  return (
    <section
      id="birlikte"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#08090c] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 50% 110%, rgba(255,90,31,0.28), transparent 70%), radial-gradient(45% 40% at 15% 10%, rgba(14,165,183,0.10), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[85svh] w-full max-w-[1600px] flex-col justify-between px-6 pb-10 pt-20 md:px-10 lg:px-[72px]">
        <div className="flex items-start justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
          <span>{t.home.together.eyebrow}</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl text-[clamp(2.6rem,8.6vw,8rem)] font-medium uppercase leading-[0.88] tracking-[-0.05em]"
          >
            <span className="sr-only">{t.home.together.title}</span>
            <span aria-hidden="true" className="block">
              <AshMark
                text={bigTitle}
                variant="light"
                fontClass="font-round2"
                fontWeight={700}
                className="h-[clamp(3rem,10.2vw,9rem)]"
              />
            </span>
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-md text-balance text-sm leading-relaxed text-white/50"
          >
            {t.home.together.body}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href={`/${locale}/iletisim`}
              className="group inline-flex items-center gap-2 bg-white px-7 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#08090c] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.home.together.button}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="mailto:mehmet@mehmetkum.com"
              className="inline-flex items-center gap-2 border border-white/20 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-white hover:text-white"
            >
              mehmet@mehmetkum.com
            </a>
          </motion.div>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-white/25">
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#0ea5b7]" /> {t.home.together.water}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" /> {t.home.together.fire}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
