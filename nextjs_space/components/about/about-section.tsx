import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { StatCounter } from '@/components/shared/stat-counter';
import { FadeIn, SlideIn } from '@/components/ui/animate';

export function AboutSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Messages;
}) {
  return (
    <section id="hakkimda" className="relative scroll-mt-24 px-6 py-24 md:px-10 lg:px-[72px] lg:py-32">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <SlideIn from="left" className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-fire opacity-20 blur-3xl" />
            <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,hsl(var(--surface-dark)),#050505)]">
              <span className="select-none font-display text-[8rem] font-bold leading-none tracking-[-0.05em] text-white/[0.07]">
                MK
              </span>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(255,69,0,0.35),transparent_60%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fire/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                <span>Ankara · TR</span>
                <span>Est. 1999</span>
              </div>
            </div>
          </div>
        </SlideIn>

        <div className="order-1 lg:order-2">
          <SlideIn from="right">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
              <span className="h-1.5 w-1.5 rounded-full bg-fire" />
              {t.about.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/55">
              {t.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              {t.about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/ozgecmis`}
              className="pill group mt-10 inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-fire hover:text-fire"
            >
              {t.about.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
