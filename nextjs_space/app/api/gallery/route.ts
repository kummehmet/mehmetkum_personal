import { NextResponse } from 'next/server';
import { listGallery, saveGallery } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { GalleryInput } from '@/lib/content-types';

export async function GET() {
  const images = await listGallery();
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<GalleryInput>;
  const image = await saveGallery({
    id: body.id,
    titleTr: body.titleTr ?? null,
    titleEn: body.titleEn ?? null,
    descriptionTr: body.descriptionTr ?? null,
    descriptionEn: body.descriptionEn ?? null,
    category: body.category ?? 'FIRE',
    imagePath: body.imagePath ?? '',
    sortOrder: Number(body.sortOrder ?? 0),
  });

  return NextResponse.json(image, { status: 201 });
}
