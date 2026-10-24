import Link from 'next/link';
import { ArrowUpRight, Cpu, Droplets, Flame } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import { StatCounter } from '@/components/shared/stat-counter';

const badges = [
  { icon: Flame, label: 'Fire', color: '#ff5a1f' },
  { icon: Droplets, label: 'Water', color: '#0ea5b7' },
  { icon: Cpu, label: 'Signal', color: '#0f766e' },
];

export function AboutStrip({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <section
      id="hakkimda"
      className="relative scroll-mt-24 border-t border-white/10 bg-[#08090c] px-6 py-20 text-white md:px-10 lg:px-[72px] lg:py-28"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#0c0e12]">
            <div className="absolute inset-0 bg-[conic-gradient(from_150deg_at_60%_40%,rgba(255,90,31,0.30),rgba(14,165,183,0.24),rgba(15,118,110,0.28),rgba(255,90,31,0.30))] blur-2xl" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:46px_46px]" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,9vw,7rem)] font-medium tracking-[-0.06em] text-white/10">
              MK
            </span>
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="flex items-center gap-1.5 border border-white/12 bg-[#08090c]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55 backdrop-blur-sm"
                  >
                    <Icon className="h-2.5 w-2.5" style={{ color: badge.color }} />
                    {badge.label}
                  </span>
                );
              })}
            </div>
            <span className="absolute right-4 top-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              <span className="h-1 w-1 animate-flicker rounded-full bg-[#0f766e]" />
              online
            </span>
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{t.about.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.035em]">
            {t.about.title}
          </h2>

          <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-white/50">
            {t.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4">
            {t.about.stats.map((stat) => (
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
            {t.about.cta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
