import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMessages, isLocale } from '@/lib/i18n';
import { listProjects } from '@/lib/content';
import { ProjectCard } from '@/components/projects/project-card';
import { FadeIn } from '@/components/ui/animate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  return { title: t.meta.projects.title, description: t.meta.projects.description };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const projects = await listProjects();

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-14 pt-36 md:px-10 lg:px-[72px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,69,0,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
              <span className="h-1.5 w-1.5 rounded-full bg-fire" />
              {t.projects.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
              {t.projects.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50">{t.projects.lead}</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-[72px]">
        <div className="mx-auto max-w-[1600px]">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={project.id} id={project.id}>
                <FadeIn delay={index * 0.05}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    labels={{
                      live: t.projects.status.live,
                      source: t.projects.source,
                      stack: t.projects.stack,
                      soon: t.projects.status.soon,
                    }}
                  />
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
