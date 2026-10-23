import { NextResponse } from 'next/server';
import { deleteGallery, saveGallery } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { GalleryInput } from '@/lib/content-types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<GalleryInput>;
  const image = await saveGallery({
    id,
    titleTr: body.titleTr ?? null,
    titleEn: body.titleEn ?? null,
    descriptionTr: body.descriptionTr ?? null,
    descriptionEn: body.descriptionEn ?? null,
    category: body.category ?? 'FIRE',
    imagePath: body.imagePath ?? '',
    sortOrder: Number(body.sortOrder ?? 0),
  });

  return NextResponse.json(image);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await deleteGallery(id);
  return NextResponse.json({ ok: true });
}
