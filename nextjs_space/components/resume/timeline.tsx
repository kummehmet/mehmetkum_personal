'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export type TimelineItem = {
  id: string;
  title: string;
  org: string;
  description: string;
  range: string;
  tags: string[];
  isFireTheme: boolean;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[15px] top-2 w-px bg-gradient-to-b from-fire/70 via-white/15 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-10 md:space-y-14">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                isLeft ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
              }`}
            >
              <span
                className={`absolute left-[8px] top-7 z-10 h-[15px] w-[15px] rounded-full border-2 md:left-auto ${
                  isLeft ? 'md:-right-[7.5px]' : 'md:-left-[7.5px]'
                } ${
                  item.isFireTheme
                    ? 'border-fire bg-fire shadow-[0_0_16px_rgba(255,69,0,0.9)]'
                    : 'border-white/40 bg-black'
                }`}
              />

              <div
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-500 ${
                  item.isFireTheme
                    ? 'border-fire/30 bg-[linear-gradient(140deg,rgba(255,69,0,0.10),rgba(255,255,255,0.02))] hover:border-fire/60'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                {item.isFireTheme ? (
                  <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-fire/20 blur-2xl" />
                ) : null}

                <div
                  className={`relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fire ${
                    isLeft ? 'md:justify-end' : ''
                  }`}
                >
                  {item.isFireTheme ? <Flame className="h-3.5 w-3.5" /> : null}
                  {item.range}
                </div>

                <h3 className="relative mt-3 font-display text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="relative mt-1 text-sm text-white/50">{item.org}</p>

                {item.description ? (
                  <p className="relative mt-4 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                ) : null}

                {item.tags.length ? (
                  <div
                    className={`relative mt-5 flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
