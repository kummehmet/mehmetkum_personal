import { NextResponse } from 'next/server';
import { deleteProject, saveProject } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ProjectInput } from '@/lib/content-types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<ProjectInput>;
  const project = await saveProject({
    id,
    titleTr: body.titleTr ?? '',
    titleEn: body.titleEn ?? null,
    descriptionTr: body.descriptionTr ?? '',
    descriptionEn: body.descriptionEn ?? null,
    liveUrl: body.liveUrl ?? null,
    githubUrl: body.githubUrl ?? null,
    screenshotPath: body.screenshotPath ?? null,
    techStack: Array.isArray(body.techStack) ? body.techStack : [],
    sortOrder: Number(body.sortOrder ?? 0),
    featured: Boolean(body.featured),
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
