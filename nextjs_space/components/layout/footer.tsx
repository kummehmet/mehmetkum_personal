import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { FooterType } from '@/components/layout/footer-type';
import { BackToTop } from '@/components/layout/back-to-top';

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const year = 2026;
  const links = [
    { label: t.nav.home, href: `/${locale}` },
    { label: t.nav.resume, href: `/${locale}/ozgecmis` },
    { label: t.nav.articles, href: `/${locale}/makaleler` },
    { label: t.nav.gallery, href: `/${locale}/galeri` },
    { label: t.nav.projects, href: `/${locale}/projeler` },
    { label: t.nav.contact, href: `/${locale}/iletisim` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] bg-[radial-gradient(ellipse_82%_82%_at_50%_115%,rgba(255,77,0,0.46),rgba(255,90,31,0.16)_55%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(ellipse_60%_74%_at_50%_118%,rgba(255,140,64,0.52),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[radial-gradient(ellipse_38%_60%_at_50%_122%,rgba(255,190,120,0.28),transparent_78%)]" />

      <div className="relative mx-auto max-w-[1720px] px-6 py-24 md:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.75fr_1.4fr] lg:gap-16">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>

          <nav className="flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              {t.nav.menu}
            </span>
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-1.5 text-[15px] leading-none text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              Elsewhere
            </span>
            <a
              href="https://www.linkedin.com/in/mehmetkum"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1.5 text-[15px] leading-none text-white/70 transition-colors hover:text-white"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="https://ipekbaca.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1.5 text-[15px] leading-none text-white/70 transition-colors hover:text-white"
            >
              ipekbaca.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="https://simalogistic.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1.5 text-[15px] leading-none text-white/70 transition-colors hover:text-white"
            >
              simalogistic.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="mailto:mehmet@mehmetkum.com"
              className="group flex w-fit items-center gap-1.5 text-[15px] leading-none text-white/70 transition-colors hover:text-white"
            >
              mehmet@mehmetkum.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <FooterType text="MEHMET KUM" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} Mehmet Kum. {t.footer.copyright}
          </p>
          <BackToTop label={t.footer.backToTop} />
        </div>
      </div>
    </footer>
  );
}
