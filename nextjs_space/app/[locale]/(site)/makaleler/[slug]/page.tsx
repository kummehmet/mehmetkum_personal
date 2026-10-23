import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { getArticleBySlug, listArticles, pick } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { ArticleBody } from '@/components/articles/article-body';
import { ArticleCover } from '@/components/articles/article-cover';
import { ShareActions } from '@/components/articles/share-actions';
import { FadeIn } from '@/components/ui/animate';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const title = pick(locale, article.titleTr, article.titleEn);
  const description = pick(locale, article.summaryTr, article.summaryEn);

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const article = await getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  const title = pick(locale, article.titleTr, article.titleEn);
  const summary = pick(locale, article.summaryTr, article.summaryEn);
  const content = locale === 'en' && article.contentEn ? article.contentEn : article.contentTr;

  const all = await listArticles({ publishedOnly: true });
  const related = all
    .filter((item) => item.category === article.category && item.id !== article.id)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Person', name: 'Mehmet Kum' },
    inLanguage: locale === 'en' ? 'en' : 'tr',
    wordCount: article.contentTr.split(/\s+/).length,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {article.coverImage ? (
        <div className="pt-16">
          <ArticleCover src={article.coverImage} alt={title} />
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-10">
        <FadeIn>
          <Link
            href={`/${locale}/makaleler`}
            className="mt-14 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-fire"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.articles.back}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="rounded-full bg-fire px-3 py-1 text-white">
              {t.categories[article.category]}
            </span>
            <span className="text-white/40">{formatDate(article.createdAt, locale)}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-white/40">
              {article.readMinutes} {t.articles.minutes}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white">
            {title}
          </h1>

          {summary ? (
            <p className="mt-6 text-lg leading-relaxed text-white/55">{summary}</p>
          ) : null}

          <div className="mt-8 border-y border-white/10 py-6">
            <ShareActions
              title={title}
              url={`https://mehmetkum.com/${locale}/makaleler/${article.slug}`}
              labels={{
                share: t.articles.share,
                copyLink: t.articles.copyLink,
                copied: t.articles.copied,
              }}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ArticleBody content={content} />
        </FadeIn>

        {article.tags.length ? (
          <div className="mt-16 flex flex-wrap gap-2 border-t border-white/10 pt-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {related.length ? (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white">
              {t.articles.related}
            </h2>
            <div className="mt-6 space-y-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/makaleler/${item.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/25"
                >
                  <span className="text-sm text-white/80 transition-colors group-hover:text-fire">
                    {pick(locale, item.titleTr, item.titleEn)}
                  </span>
                  <span className="font-mono text-[11px] text-white/35">
                    {item.readMinutes} {t.articles.minutes}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
