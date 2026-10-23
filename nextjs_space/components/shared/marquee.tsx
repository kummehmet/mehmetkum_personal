export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.35em] text-white/35"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-fire/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
