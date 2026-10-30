import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import type { AboutContent } from '@/lib/content-types';
import { StatCounter } from '@/components/shared/stat-counter';
import { ParticlePortrait } from '@/components/lusion/particle-portrait';

export function AboutStrip({
  locale,
  t,
  about,
}: {
  locale: Locale;
  t: Messages;
  about?: Messages['about'];
}) {
  const content = about ?? t.about;
  return (
    <section
      id="hakkimda"
      className="relative scroll-mt-24 border-t border-white/10 bg-[#08090c] px-6 py-20 text-white md:px-10 lg:px-[72px] lg:py-28"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#050608]">
            <ParticlePortrait className="absolute inset-0" />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{content.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.035em]">
            {content.title}
          </h2>

          <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-white/50">
            {content.body.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-medium tracking-[-0.03em] text-white">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/ozgecmis`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white hover:text-white"
          >
            {content.cta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
