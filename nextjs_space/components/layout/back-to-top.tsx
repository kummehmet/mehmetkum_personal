'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group flex items-center gap-2 transition-colors hover:text-white"
    >
      {label}
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-fire group-hover:bg-fire">
        <ArrowUp className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
