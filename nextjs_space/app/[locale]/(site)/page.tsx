import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { listArticles, listProjects } from '@/lib/content';
import { Hero } from '@/components/hero/hero';
import { Marquee } from '@/components/shared/marquee';
import { AboutSection } from '@/components/about/about-section';
import { ArticleCard } from '@/components/articles/article-card';
import { ProjectCard } from '@/components/projects/project-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const [articles, projects] = await Promise.all([
    listArticles({ publishedOnly: true }),
    listProjects(),
  ]);

  const featuredArticles = articles.slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2);

  return (
    <>
      <Hero locale={locale} t={t} />
      <Marquee items={t.hero.keywords} />

      <AboutSection locale={locale} t={t} />

      <section className="section-gradient px-6 py-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.articles.eyebrow} title={t.articles.title} lead={t.articles.lead} />
            <Link
              href={`/${locale}/makaleler`}
              className="pill group inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/50"
            >
              {t.articles.back}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <StaggerItem key={article.id} className="h-full">
                <ArticleCard
                  article={article}
                  locale={locale}
                  categoryLabel={t.categories[article.category]}
                  readLabel={t.articles.minutes}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />

          <div className="mt-12 space-y-8">
            {featuredProjects.map((project) => (
              <FadeIn key={project.id}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  labels={{
                    live: t.projects.status.live,
                    source: t.projects.source,
                    stack: t.projects.stack,
                    soon: t.projects.status.soon,
                  }}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-[72px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,69,0,0.12),transparent_70%)]" />
        <FadeIn className="relative mx-auto max-w-[1600px]">
          <p className="text-center font-display text-[clamp(2rem,8.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white/15">
            <span className="text-white">KOD</span> · <span className="fire-text">YANGIN</span> ·{' '}
            <span className="text-white">YÖNETİM</span>
          </p>
          <div className="mt-12 flex justify-center">
            <Link
              href={`/${locale}/iletisim`}
              className="pill group inline-flex items-center gap-2 bg-gradient-fire px-7 py-3.5 text-sm font-medium text-white hover:shadow-[0_16px_40px_-12px_rgba(255,69,0,0.85)]"
            >
              {t.nav.talk}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
