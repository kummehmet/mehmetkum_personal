'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';

type Category = GalleryImage['category'];

export function GalleryGrid({
  images,
  locale,
  labels,
}: {
  images: GalleryImage[];
  locale: string;
  labels: {
    all: string;
    empty: string;
    hint: string;
    previous: string;
    next: string;
    close: string;
    categories: Record<Category, string>;
  };
}) {
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = useMemo(() => Array.from(new Set(images.map((image) => image.category))), [images]);
  const filtered = useMemo(
    () => (category === 'ALL' ? images : images.filter((image) => image.category === category)),
    [images, category],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((index) => (index === null ? index : (index + 1) % filtered.length)),
    [filtered.length],
  );
  const previous = useCallback(
    () =>
      setActiveIndex((index) =>
        index === null ? index : (index - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, next, previous]);

  const active = activeIndex === null ? null : filtered[activeIndex];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-8">
        {(['ALL', ...categories] as const).map((item) => {
          const activeFilter = category === item;
          const label = item === 'ALL' ? labels.all : labels.categories[item as Category];
          return (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item as Category | 'ALL');
                setActiveIndex(null);
              }}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {activeFilter ? (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-gradient-fire"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-white/40">{labels.empty}</p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-surface text-left"
            >
              <Image
                src={image.imagePath}
                alt={image.titleTr ?? ''}
                width={900}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fire">
                  {labels.categories[image.category]}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-white">
                  {locale === 'en' ? image.titleEn || image.titleTr : image.titleTr}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white"
              aria-label={labels.close}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white md:left-8"
              aria-label={labels.previous}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white md:right-8"
              aria-label={labels.next}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl"
            >
              <Image
                src={active.imagePath}
                alt={active.titleTr ?? ''}
                width={1400}
                height={1800}
                className="mx-auto max-h-[75vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-5 text-center">
                <p className="font-display text-lg font-bold text-white">
                  {locale === 'en' ? active.titleEn || active.titleTr : active.titleTr}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {locale === 'en' ? active.descriptionEn || active.descriptionTr : active.descriptionTr}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                  {labels.hint}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
