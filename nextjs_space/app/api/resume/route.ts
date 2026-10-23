import { NextResponse } from 'next/server';
import { listResume, saveResume } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ResumeInput } from '@/lib/content-types';

export async function GET() {
  const entries = await listResume();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ResumeInput>;
  const entry = await saveResume({
    id: body.id,
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

  return NextResponse.json(entry, { status: 201 });
}
