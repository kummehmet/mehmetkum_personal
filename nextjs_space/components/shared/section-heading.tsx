export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow ? (
        <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
          <span className="h-1.5 w-1.5 rounded-full bg-fire" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-base leading-relaxed text-white/50">{lead}</p> : null}
    </div>
  );
}
