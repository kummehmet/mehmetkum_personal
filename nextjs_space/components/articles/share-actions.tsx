'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

export function ShareActions({
  title,
  url,
  labels,
}: {
  title: string;
  url: string;
  labels: { share: string; copyLink: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // paylaşım iptal edildi — panoya kopyalamaya düşülür
      }
    }
    await copy();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={share}
        className="pill inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
      >
        <Share2 className="h-4 w-4" />
        {labels.share}
      </button>
      <button
        type="button"
        onClick={copy}
        className="pill inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-fire" /> : null}
        {copied ? labels.copied : labels.copyLink}
      </button>
    </div>
  );
}
