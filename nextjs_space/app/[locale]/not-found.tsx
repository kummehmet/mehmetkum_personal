import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,rgba(255,69,0,0.16),transparent_70%)]" />

      <p className="relative font-mono text-[11px] uppercase tracking-[0.4em] text-fire">404</p>
      <h1 className="relative mt-4 font-display text-[clamp(2.4rem,8vw,5rem)] font-bold leading-none tracking-[-0.04em] text-white">
        Sayfa bulunamadı
      </h1>
      <p className="relative mt-3 text-sm text-white/40">Page not found</p>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/tr"
          className="pill bg-gradient-fire px-6 py-3 text-sm font-medium text-white"
        >
          Ana sayfa
        </Link>
        <Link
          href="/en"
          className="pill border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
