import type { MetadataRoute } from 'next';
import { listArticles } from '@/lib/content';
import { locales } from '@/lib/i18n';

const base = 'https://mehmetkum.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await listArticles({ publishedOnly: true });

  const staticPaths = ['', '/ozgecmis', '/makaleler', '/galeri', '/projeler', '/iletisim'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticPaths) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((item) => [item, `${base}/${item}${route}`])),
        },
      });
    }

    for (const article of articles) {
      entries.push({
        url: `${base}/${locale}/makaleler/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
