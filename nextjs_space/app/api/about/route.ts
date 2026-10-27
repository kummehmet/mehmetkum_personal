import { NextResponse } from 'next/server';
import { getAbout, saveAbout } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import type { AboutContent, AboutStat } from '@/lib/content-types';

function asText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asBody(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function asStats(value: unknown): AboutStat[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item): AboutStat | null => {
      if (typeof item !== 'object' || item === null) return null;
      const stat = item as Partial<AboutStat>;
      return {
        value: Number(stat.value) || 0,
        suffix: asText(stat.suffix),
        label: asText(stat.label),
      };
    })
    .filter((item): item is AboutStat => item !== null);
}

function asAbout(value: unknown): AboutContent {
  const source = (typeof value === 'object' && value !== null ? value : {}) as Partial<AboutContent>;
  return {
    eyebrow: asText(source.eyebrow),
    title: asText(source.title),
    cta: asText(source.cta),
    body: asBody(source.body),
    stats: asStats(source.stats),
  };
}

export async function GET() {
  return NextResponse.json(await getAbout());
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as { dataTr?: unknown; dataEn?: unknown };
  const pair = await saveAbout({ dataTr: asAbout(body.dataTr), dataEn: asAbout(body.dataEn) });
  return NextResponse.json(pair);
}
