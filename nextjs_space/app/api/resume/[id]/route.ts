import { NextResponse } from 'next/server';
import { deleteResume, saveResume } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ResumeInput } from '@/lib/content-types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<ResumeInput>;
  const entry = await saveResume({
    id,
    titleTr: body.titleTr ?? '',
    titleEn: body.titleEn ?? null,
    orgTr: body.orgTr ?? '',
    orgEn: body.orgEn ?? null,
    descTr: body.descTr ?? null,
    descEn: body.descEn ?? null,
    startDate: body.startDate ?? new Date().toISOString(),
    endDate: body.endDate ?? null,
    isCurrent: Boolean(body.isCurrent),
    category: body.category === 'EDUCATION' ? 'EDUCATION' : 'WORK',
    tags: Array.isArray(body.tags) ? body.tags : [],
    sortOrder: Number(body.sortOrder ?? 0),
    isFireTheme: Boolean(body.isFireTheme),
  });

  return NextResponse.json(entry);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await deleteResume(id);
  return NextResponse.json({ ok: true });
}
