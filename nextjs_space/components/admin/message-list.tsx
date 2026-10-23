'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Mail, MailOpen, Trash2 } from 'lucide-react';
import type { ContactMessage } from '@/lib/content';
import { formatDate } from '@/lib/format';

export function MessageList({
  messages,
  locale,
  labels,
}: {
  messages: ContactMessage[];
  locale: string;
  labels: { empty: string; markRead: string; delete: string; from: string; date: string; confirmDelete: string };
}) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleRead = async (message: ContactMessage) => {
    await fetch(`/api/contact/${message.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: !message.isRead }),
    });
    router.refresh();
  };

  const remove = async (message: ContactMessage) => {
    if (!window.confirm(labels.confirmDelete)) return;
    await fetch(`/api/contact/${message.id}`, { method: 'DELETE' });
    router.refresh();
  };

  if (messages.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
        {labels.empty}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-2xl border p-5 transition-colors ${
            message.isRead
              ? 'border-white/10 bg-white/[0.02]'
              : 'border-fire/30 bg-[linear-gradient(140deg,rgba(255,69,0,0.08),rgba(255,255,255,0.02))]'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => setOpenId(openId === message.id ? null : message.id)}
              className="min-w-0 flex-1 text-left"
            >
              <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                {!message.isRead ? <span className="h-1.5 w-1.5 rounded-full bg-fire" /> : null}
                {message.subject}
              </p>
              <p className="mt-1 font-mono text-[11px] text-white/40">
                {message.name} · {message.email} · {formatDate(message.createdAt, locale)}
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed text-white/60 ${
                  openId === message.id ? '' : 'line-clamp-1'
                }`}
              >
                {message.message}
              </p>
            </button>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => toggleRead(message)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                aria-label={labels.markRead}
                title={labels.markRead}
              >
                {message.isRead ? <MailOpen className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </button>
              <a
                href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                aria-label="E-posta"
              >
                <Mail className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => remove(message)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-red-500/60 hover:text-red-400"
                aria-label={labels.delete}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
