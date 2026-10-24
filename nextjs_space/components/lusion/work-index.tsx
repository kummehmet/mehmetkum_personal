'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, Messages } from '@/lib/i18n';
import type { Project } from '@/lib/content';

const accents = ['#ff5a1f', '#0ea5b7', '#0f766e', '#b45309', '#be123c', '#1d4ed8', '#6d28d9', '#0d9488', '#c2410c'];

function categoryFor(project: Project, locale: Locale) {
  const tags = project.techStack.join(' ').toLowerCase();
  if (project.id.startsWith('docx-fire')) {
    return locale === 'tr' ? 'İtfaiye • Operasyon' : 'Fire • Operations';
  }
  if (tags.includes('oracle') || tags.includes('bi')) {
    return locale === 'tr' ? 'Veri • Raporlama' : 'Data • Reporting';
  }
  if (project.liveUrl) {
    return locale === 'tr' ? 'Ürün • SaaS' : 'Product • SaaS';
  }
  return locale === 'tr' ? 'Kamu • Yazılım' : 'Public • Software';
}

const stack = [
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Prisma',
  'Tailwind CSS',
  'Oracle DB',
  'PL/SQL',
  'Oracle Forms & Reports',
  'C#',
  'Java',
];

export function WorkIndex({
  locale,
  t,
  projects,
}: {
  locale: Locale;
  t: Messages;
  projects: Project[];
}) {
  return (
    <section
      id="isler"
      className="relative scroll-mt-24 border-t border-white/10 bg-[#08090c] px-6 py-20 text-white md:px-10 lg:px-[72px] lg:py-28"
    >
      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-end gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              {t.home.work.eyebrow}
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,4.6rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em]">
              {t.home.work.title}
              <span className="ml-3 align-super font-mono text-[11px] tracking-[0.2em] text-[#ff5a1f]">
                {String(projects.length).padStart(2, '0')}
              </span>
            </h2>
          </div>
          <Link
            href={`/${locale}/projeler`}
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
          >
            {t.home.work.all}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          {stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>

        <div className="mt-2">
          {projects.map((project, index) => {
            const accent = accents[index % accents.length];
            const title = locale === 'en' ? project.titleEn || project.titleTr : project.titleTr;
            const year = new Date(project.createdAt).getFullYear();
            const number = String(index + 1).padStart(2, '0');

            return (
              <Link
                key={project.id}
                href={`/${locale}/projeler#${project.id}`}
                data-cursor="hover"
                className="group relative block border-b border-white/10 py-6 transition-colors duration-500 hover:bg-white/[0.03] md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: accent }}
                />

                <div className="grid grid-cols-12 items-baseline gap-3 px-1 md:gap-6 md:px-3">
                  <span className="col-span-2 font-mono text-[10px] tracking-[0.2em] text-white/25 md:col-span-1">
                    {number}
                  </span>

                  <h3 className="col-span-10 md:col-span-6">
                    <span className="relative block overflow-hidden font-display text-[clamp(1.5rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[110%]">
                        {title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                        style={{ color: accent }}
                      >
                        {title}
                      </span>
                    </span>
                  </h3>

                  <p className="col-span-10 col-start-3 mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 md:col-span-3 md:col-start-auto md:mt-0">
                    {categoryFor(project, locale)}
                  </p>

                  <div className="col-span-12 mt-2 flex items-center justify-between md:col-span-2 md:mt-0 md:justify-end md:gap-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">{year}</span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[8%] top-1/2 hidden w-[300px] -translate-y-1/2 scale-95 overflow-hidden border border-white/10 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 lg:block"
                  style={{
                    background: `linear-gradient(150deg, #14161c 0%, #0c0e12 55%, ${accent}22 100%)`,
                    aspectRatio: '4 / 3',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `radial-gradient(120% 90% at 20% 15%, ${accent}33 0%, transparent 60%)`,
                    }}
                  />
                  <span
                    className="absolute bottom-4 right-5 font-display text-[5rem] font-medium leading-none tracking-[-0.06em]"
                    style={{ color: accent, opacity: 0.28 }}
                  >
                    {number}
                  </span>
                  <span className="absolute left-5 top-4 font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
                    {categoryFor(project, locale)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
