'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

const navItems = (t: Messages['nav'], locale: Locale) => [
  { label: t.about, href: `/${locale}/#hakkimda` },
  { label: t.resume, href: `/${locale}/ozgecmis` },
  { label: t.articles, href: `/${locale}/makaleler` },
  { label: t.gallery, href: `/${locale}/galeri` },
  { label: t.projects, href: `/${locale}/projeler` },
];

export function Header({ locale, t }: { locale: Locale; t: Messages }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = navItems(t.nav, locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/10 bg-black/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-[72px]">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.28em] text-white"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-fire shadow-[0_0_12px_rgba(255,69,0,0.9)] transition-transform duration-500 group-hover:scale-150" />
            Mehmet Kum
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-fire transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher locale={locale} />
            </div>
            <Link
              href={`/${locale}/iletisim`}
              className="pill hidden items-center gap-1.5 bg-gradient-fire px-5 py-2.5 text-sm font-medium text-white hover:shadow-[0_10px_30px_-8px_rgba(255,69,0,0.8)] md:inline-flex"
            >
              {t.nav.talk}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="pill bg-paper px-5 py-2.5 text-sm font-medium text-black hover:bg-white"
              aria-label={t.nav.menu}
            >
              {t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6 md:px-10 lg:px-[72px]">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-[0.28em] text-white/40">
                  {t.nav.menu}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="pill bg-paper px-5 py-2.5 text-sm font-medium text-black hover:bg-white"
                >
                  {t.nav.close}
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-6 border-b border-white/10 py-4 font-display text-4xl font-bold tracking-tight text-white transition-colors hover:text-fire md:text-6xl"
                    >
                      <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-3">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <LanguageSwitcher locale={locale} />
                  <a
                    href="mailto:mehmet@mehmetkum.com"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    mehmet@mehmetkum.com
                  </a>
                </div>
                <Link
                  href={`/${locale}/iletisim`}
                  onClick={() => setOpen(false)}
                  className="pill inline-flex items-center gap-1.5 bg-gradient-fire px-5 py-2.5 text-sm font-medium text-white"
                >
                  {t.nav.talk}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
