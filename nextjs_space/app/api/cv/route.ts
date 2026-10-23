import { type NextRequest } from 'next/server';
import { listResume, pick } from '@/lib/content';
import { buildPdf, type PdfLine } from '@/lib/pdf';
import { formatMonthYear } from '@/lib/format';

export const dynamic = 'force-dynamic';

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') === 'en' ? 'en' : 'tr';
  const entries = await listResume();

  const lines: PdfLine[] = [];
  lines.push({ text: 'MEHMET KUM', size: 24, bold: true, gap: 40, color: [0.08, 0.08, 0.09] });
  lines.push({
    text:
      locale === 'en'
        ? 'Computer Engineer - Public Administrator - Firefighter'
        : 'Bilgisayar Mühendisi - Kamu Yöneticisi - İtfaiyeci',
    size: 11,
    gap: 20,
    color: [0.85, 0.25, 0.05],
  });
  lines.push({
    text: 'mehmet@mehmetkum.com  ·  mehmetkum.com  ·  Ankara, Türkiye',
    size: 9,
    gap: 30,
    color: [0.4, 0.4, 0.44],
  });

  for (const entry of entries) {
    const range = `${formatMonthYear(entry.startDate, locale)} — ${
      entry.isCurrent
        ? locale === 'en'
          ? 'Present'
          : 'Devam ediyor'
        : entry.endDate
          ? formatMonthYear(entry.endDate, locale)
          : ''
    }`;

    lines.push({ text: range.toUpperCase(), size: 8.5, bold: true, gap: 18, color: [0.85, 0.25, 0.05] });
    lines.push({
      text: `${pick(locale, entry.titleTr, entry.titleEn)} — ${pick(locale, entry.orgTr, entry.orgEn)}`,
      size: 11.5,
      bold: true,
      gap: 16,
      color: [0.08, 0.08, 0.09],
    });

    const description = pick(locale, entry.descTr, entry.descEn);
    if (description) {
      for (const wrapped of wrap(description, 104).slice(0, 3)) {
        lines.push({ text: wrapped, size: 9, gap: 12.5, color: [0.25, 0.25, 0.28] });
      }
    }

    if (entry.tags.length) {
      lines.push({
        text: entry.tags.join(' · '),
        size: 8.5,
        gap: 16,
        color: [0.45, 0.45, 0.5],
      });
    }
  }

  const pdf = buildPdf(lines);

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="mehmet-kum-cv-${locale}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
