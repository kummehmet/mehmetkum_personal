import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import { formatShortDate } from '@/lib/format';

export function ArticleCard({
  article,
  locale,
  categoryLabel,
  readLabel,
}: {
  article: Article;
  locale: Locale;
  categoryLabel: string;
  readLabel: string;
}) {
  const title = locale === 'en' ? article.titleEn || article.titleTr : article.titleTr;
  const summary =
    locale === 'en' ? article.summaryEn || article.summaryTr : article.summaryTr;

  return (
    <Link
      href={`/${locale}/makaleler/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-fire/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
          {categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
          <span>{formatShortDate(article.createdAt, locale)}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>
            {article.readMinutes} {readLabel}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-fire">
          {title}
        </h3>

        {summary ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/50">{summary}</p>
        ) : null}

        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors group-hover:text-fire">
          {readLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
