'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileText, FolderKanban, Home, Images, LogOut, Mail, UserRound, Info } from 'lucide-react';

const items = (locale: string, labels: Record<string, string>) => [
  { href: `/${locale}/admin`, label: labels.dashboard, icon: Home },
  { href: `/${locale}/admin/ozgecmis`, label: labels.resume, icon: UserRound },
  { href: `/${locale}/admin/makaleler`, label: labels.articles, icon: FileText },
  { href: `/${locale}/admin/hakkimda`, label: labels.about, icon: Info },
  { href: `/${locale}/admin/projeler`, label: labels.projects, icon: FolderKanban },
  { href: `/${locale}/admin/galeri`, label: labels.gallery, icon: Images },
  { href: `/${locale}/admin/mesajlar`, label: labels.messages, icon: Mail },
];

export function AdminNav({
  locale,
  labels,
  unread,
}: {
  locale: string;
  labels: Record<string, string>;
  unread: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-fire font-display text-xs font-bold text-white">
          MK
        </span>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
            Admin
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            mehmetkum.com
          </p>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-1">
        {items(locale, labels).map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors ${
                active ? 'bg-white text-black' : 'text-white/55 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.href.endsWith('/mesajlar') && unread > 0 ? (
                <span className="rounded-full bg-fire px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {unread}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}`}
          className="text-sm text-white/45 transition-colors hover:text-white"
        >
          ← Site
        </Link>
        <button
          type="button"
          onClick={logout}
          disabled={loading}
          className="pill inline-flex items-center gap-2 border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-fire hover:text-fire"
        >
          <LogOut className="h-4 w-4" />
          {labels.logout}
        </button>
      </div>
    </div>
  );
}
