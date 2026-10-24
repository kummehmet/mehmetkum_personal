import type { Messages } from '@/lib/i18n';

export type StoryRow = {
  id: string;
  period: string;
  title: string;
  org: string;
  current: boolean;
  fire: boolean;
};

export function StoryList({ t, rows }: { t: Messages; rows: StoryRow[] }) {
  return (
    <section className="relative border-t border-white/10 bg-[#08090c] px-6 py-20 text-white md:px-10 lg:px-[72px] lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
            {t.home.story.eyebrow}
          </p>
          <div className="hidden gap-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 md:flex">
            <span className="w-28">{t.home.story.period}</span>
            <span className="w-64">{t.home.story.role}</span>
            <span>{t.home.story.org}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10">
          {rows.map((row) => (
            <div
              key={row.id}
              className="group grid grid-cols-1 gap-2 border-b border-white/8 py-5 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-12 md:items-baseline md:gap-8 md:px-2"
            >
              <div className="flex items-center gap-2 md:col-span-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                  style={{ background: row.fire ? '#ff5a1f' : '#0f766e' }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  {row.period}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-medium leading-snug tracking-[-0.02em] md:text-xl">
                  {row.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 md:col-span-5">
                <p className="text-[13px] text-white/40">{row.org}</p>
                {row.current ? (
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#0f766e]">
                    <span className="h-1 w-1 animate-flicker rounded-full bg-[#0f766e]" />
                    {t.resume.present}
                  </span>
                ) : null}
              </div>
              <div className="hidden justify-end md:col-span-1 md:flex">
                <span className="h-px w-0 bg-white transition-all duration-500 group-hover:w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
