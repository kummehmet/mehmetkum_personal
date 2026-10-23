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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(255,69,0,0.16),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1600px] px-6 py-16 md:px-10 lg:px-[72px]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              {t.nav.menu}
            </span>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex w-fit items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              Elsewhere
            </span>
            <a
              href="https://www.linkedin.com/in/mehmetkum"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="https://ipekbaca.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              ipekbaca.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="https://simalogistic.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              simalogistic.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="mailto:mehmet@mehmetkum.com"
              className="group flex w-fit items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
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
