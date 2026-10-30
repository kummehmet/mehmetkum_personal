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
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(52%_42%_at_50%_36%,rgba(180,202,224,0.12),transparent_72%)]"
            />
            <ParticlePortrait className="absolute inset-0" />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#08090c] via-[#08090c]/55 to-transparent"
            />

            <svg
              aria-hidden="true"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
              fill="none"
              className="absolute inset-x-0 bottom-0 h-[46%] w-full text-white/[0.14]"
            >
              <g stroke="currentColor" strokeWidth="0.7">
                <path d="M-20 108 C 30 92, 80 120, 140 102 S 240 72, 300 94 S 370 118, 420 104" />
                <path d="M-20 128 C 30 108, 80 142, 140 120 S 240 86, 300 112 S 370 140, 420 122" />
                <path d="M-20 148 C 30 124, 80 164, 140 140 S 240 102, 300 132 S 370 164, 420 142" />
                <path d="M-20 168 C 40 140, 90 186, 150 158 S 250 118, 310 150 S 380 184, 420 158" />
                <path d="M-20 184 C 50 160, 100 198, 160 174 S 260 140, 320 168 S 380 196, 420 176" />
              </g>
            </svg>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
              <div className="h-px w-12 bg-white/25" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/65">
                Mehmet Kum
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                {content.role}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
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
