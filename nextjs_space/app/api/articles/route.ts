import { NextResponse } from 'next/server';
import { listArticles, saveArticle } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ArticleInput } from '@/lib/content-types';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const publishedOnly = url.searchParams.get('published') !== 'all';
  const articles = await listArticles({ publishedOnly });
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ArticleInput>;
  const article = await saveArticle({
    id: body.id,
    slug: body.slug ?? '',
    titleTr: body.titleTr ?? '',
    titleEn: body.titleEn ?? null,
    summaryTr: body.summaryTr ?? null,
    summaryEn: body.summaryEn ?? null,
    contentTr: body.contentTr ?? '',
    contentEn: body.contentEn ?? null,
    locale: body.locale ?? 'tr',
    category: body.category ?? 'TECH',
    tags: Array.isArray(body.tags) ? body.tags : [],
    coverImage: body.coverImage ?? null,
    published: Boolean(body.published),
    readMinutes: Number(body.readMinutes ?? 5),
  });

  return NextResponse.json(article, { status: 201 });
}
