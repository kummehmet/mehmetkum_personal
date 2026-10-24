import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listProjects, listResume, pick } from '@/lib/content';
import { SiteHero } from '@/components/lusion/site-hero';
import { WorkIndex } from '@/components/lusion/work-index';
import { AboutStrip } from '@/components/lusion/about-strip';
import { StoryList, type StoryRow } from '@/components/lusion/story-list';
import { WorkTogether } from '@/components/lusion/work-together';
import { PageAtmosphere } from '@/components/lusion/page-atmosphere';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const [projects, resume] = await Promise.all([listProjects(), listResume()]);

  const year = (value: string | null) => (value ? new Date(value).getFullYear() : null);
  const rows: StoryRow[] = resume.map((entry) => ({
    id: entry.id,
    period: `${year(entry.startDate) ?? ''} — ${entry.isCurrent ? t.resume.present : (year(entry.endDate) ?? '')}`,
    title: pick(locale, entry.titleTr, entry.titleEn),
    org: pick(locale, entry.orgTr, entry.orgEn),
    current: entry.isCurrent,
    fire: entry.isFireTheme,
  }));

  return (
    <>
      <PageAtmosphere />
      <SiteHero locale={locale} t={t} />
      <WorkIndex locale={locale} t={t} projects={projects} />
      <AboutStrip locale={locale} t={t} />
      <StoryList t={t} rows={rows} />
      <WorkTogether locale={locale} t={t} />
    </>
  );
}
