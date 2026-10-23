'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

export function ProjectCard({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: Locale;
  labels: { live: string; source: string; stack: string; soon: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [8, -8]), {
    stiffness: 180,
    damping: 18,
  });

  const title = locale === 'en' ? project.titleEn || project.titleTr : project.titleTr;
  const description =
    locale === 'en' ? project.descriptionEn || project.descriptionTr : project.descriptionTr;
  const isLive = Boolean(project.liveUrl);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-500 group-hover:border-white/25">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {project.screenshotPath ? (
            <Image
              src={project.screenshotPath}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
              isLive ? 'bg-fire text-white' : 'border border-white/25 text-white/70'
            }`}
          >
            {isLive ? labels.live : labels.soon}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
              {title}
            </h3>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
          <div>
            <p className="text-sm leading-relaxed text-white/55">{description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-end gap-3 md:items-end">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="pill inline-flex items-center gap-2 bg-gradient-fire px-5 py-3 text-sm font-medium text-white hover:shadow-[0_14px_34px_-12px_rgba(255,69,0,0.8)]"
              >
                {labels.live}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="pill inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm text-white/40">
                {labels.soon}
              </span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" />
                {labels.source}
              </a>
            ) : null}
            <Link
              href={`/${locale}/projeler#${project.id}`}
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              #{project.id}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
