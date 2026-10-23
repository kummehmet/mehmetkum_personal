import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMessages, isLocale } from '@/lib/i18n';
import { listArticles } from '@/lib/content';
import { ArticleExplorer } from '@/components/articles/article-explorer';
import { FadeIn } from '@/components/ui/animate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  return { title: t.meta.articles.title, description: t.meta.articles.description };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const articles = await listArticles({ publishedOnly: true });

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-14 pt-36 md:px-10 lg:px-[72px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,69,0,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
              <span className="h-1.5 w-1.5 rounded-full bg-fire" />
              {t.articles.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
              {t.articles.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">{t.articles.lead}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <ArticleExplorer
            articles={articles}
            locale={locale}
            labels={{
              all: t.common.all,
              search: t.articles.search,
              searchPlaceholder: t.articles.searchPlaceholder,
              empty: t.articles.empty,
              minutes: t.articles.minutes,
              categories: t.categories,
            }}
          />
        </div>
      </section>
    </>
  );
}
