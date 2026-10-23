import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMessages, isLocale } from '@/lib/i18n';
import { listGallery } from '@/lib/content';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { FadeIn } from '@/components/ui/animate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  return { title: t.meta.gallery.title, description: t.meta.gallery.description };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const images = await listGallery();

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-14 pt-36 md:px-10 lg:px-[72px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,69,0,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
              <span className="h-1.5 w-1.5 rounded-full bg-fire" />
              {t.gallery.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
              {t.gallery.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">{t.gallery.lead}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <GalleryGrid
            images={images}
            locale={locale}
            labels={{
              all: t.common.all,
              empty: t.gallery.empty,
              hint: t.gallery.hint,
              previous: t.common.previous,
              next: t.common.next,
              close: t.common.close,
              categories: t.galleryCategories,
            }}
          />
        </div>
      </section>
    </>
  );
}
