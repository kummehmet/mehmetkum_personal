import { NextResponse } from 'next/server';
import { listProjects, saveProject } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { ProjectInput } from '@/lib/content-types';

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<ProjectInput>;
  const project = await saveProject({
    id: body.id,
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

  return NextResponse.json(project, { status: 201 });
}
