'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Article } from '@/lib/content';
import { ArticleCard } from '@/components/articles/article-card';

type Category = Article['category'];

export function ArticleExplorer({
  articles,
  locale,
  labels,
}: {
  articles: Article[];
  locale: string;
  labels: {
    all: string;
    search: string;
    searchPlaceholder: string;
    empty: string;
    minutes: string;
    categories: Record<Category, string>;
  };
}) {
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((article) => article.category)));
    return unique;
  }, [articles]);

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    return articles.filter((article) => {
      const matchesCategory = category === 'ALL' || article.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      const title = locale === 'en' ? article.titleEn || article.titleTr : article.titleTr;
      const summary =
        locale === 'en' ? article.summaryEn || article.summaryTr : article.summaryTr;
      const haystack = `${title} ${summary ?? ''} ${article.contentTr}`.toLocaleLowerCase(locale);
      return haystack.includes(term);
    });
  }, [articles, category, query, locale]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['ALL', ...categories] as const).map((item) => {
            const active = category === item;
            const label = item === 'ALL' ? labels.all : labels.categories[item as Category];
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item as Category | 'ALL')}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="article-filter"
                    className="absolute inset-0 rounded-full bg-gradient-fire"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        <label className="flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 focus-within:border-fire/60 lg:w-72">
          <Search className="h-4 w-4 text-white/35" />
          <span className="sr-only">{labels.search}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
        </label>
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ArticleCard
                article={article}
                locale={locale as 'tr' | 'en'}
                categoryLabel={labels.categories[article.category]}
                readLabel={labels.minutes}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-white/40">{labels.empty}</p>
      ) : null}
    </div>
  );
}
