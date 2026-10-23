import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { listResume, pick } from '@/lib/content';
import { formatMonthYear } from '@/lib/format';
import { skillGroups } from '@/lib/skills';
import { Timeline } from '@/components/resume/timeline';
import { SectionHeading } from '@/components/shared/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  return { title: t.meta.resume.title, description: t.meta.resume.description };
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const entries = await listResume();
  const work = entries.filter((entry) => entry.category === 'WORK');
  const education = entries.filter((entry) => entry.category === 'EDUCATION');

  const timelineItems = work.map((entry) => ({
    id: entry.id,
    title: pick(locale, entry.titleTr, entry.titleEn),
    org: pick(locale, entry.orgTr, entry.orgEn),
    description: pick(locale, entry.descTr, entry.descEn),
    range: `${formatMonthYear(entry.startDate, locale)} — ${
      entry.isCurrent
        ? t.resume.present
        : entry.endDate
          ? formatMonthYear(entry.endDate, locale)
          : ''
    }`,
    tags: entry.tags,
    isFireTheme: entry.isFireTheme,
  }));

  const groupLabels = {
    software: locale === 'en' ? 'Software' : t.resume.software,
    management: locale === 'en' ? 'Management' : t.resume.management,
    emergency: locale === 'en' ? 'Emergency' : t.resume.emergency,
  };

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-36 md:px-10 lg:px-[72px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,69,0,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
              <span className="h-1.5 w-1.5 rounded-full bg-fire" />
              {t.resume.eyebrow}
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h1 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
                {t.resume.title}
              </h1>
              <a
                href={`/api/cv?locale=${locale}`}
                className="pill group inline-flex items-center gap-2 bg-gradient-fire px-6 py-3 text-sm font-medium text-white hover:shadow-[0_14px_34px_-12px_rgba(255,69,0,0.8)]"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                {t.resume.download}
              </a>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">{t.resume.lead}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <Timeline items={timelineItems} />
        </div>
      </section>

      {education.length ? (
        <section className="px-6 pb-24 md:px-10 lg:px-[72px]">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeading eyebrow={t.resume.eyebrow} title={t.resume.education} />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {education.map((entry) => (
                <FadeIn key={entry.id}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fire">
                      {formatMonthYear(entry.startDate, locale)}
                      {entry.endDate ? ` — ${formatMonthYear(entry.endDate, locale)}` : ''}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-bold text-white">
                      {pick(locale, entry.titleTr, entry.titleEn)}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{pick(locale, entry.orgTr, entry.orgEn)}</p>
                    {entry.descTr ? (
                      <p className="mt-4 text-sm leading-relaxed text-white/55">
                        {pick(locale, entry.descTr, entry.descEn)}
                      </p>
                    ) : null}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-gradient px-6 py-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading eyebrow={t.resume.skills} title={t.resume.skills} />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {skillGroups.map((group, index) => (
              <FadeIn key={group.key} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fire">
                    {groupLabels[group.key]}
                  </p>
                  <Stagger className="mt-5 flex flex-wrap gap-2" staggerDelay={0.04}>
                    {group.items.map((item) => (
                      <StaggerItem key={item.tr}>
                        <span className="inline-block rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/70 transition-colors hover:border-fire/50 hover:text-white">
                          {locale === 'en' ? item.en : item.tr}
                        </span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
