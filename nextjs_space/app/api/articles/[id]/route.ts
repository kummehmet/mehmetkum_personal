import { NextResponse } from 'next/server';
import { deleteArticle, saveArticle } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ArticleInput } from '@/lib/content-types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<ArticleInput>;
  const article = await saveArticle({
    id,
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

  return NextResponse.json(article);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await deleteArticle(id);
  return NextResponse.json({ ok: true });
}
