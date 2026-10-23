import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, FileText, FolderKanban, Images, Mail, UserRound } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { listArticles, listGallery, listMessages, listProjects, listResume } from '@/lib/content';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const [articles, projects, gallery, messages, resume] = await Promise.all([
    listArticles(),
    listProjects(),
    listGallery(),
    listMessages(),
    listResume(),
  ]);

  const unread = messages.filter((message) => !message.isRead).length;

  const cards = [
    {
      label: t.admin.articles,
      value: articles.length,
      note: `${articles.filter((article) => article.published).length} ${t.admin.published.toLowerCase()}`,
      href: `/${locale}/admin/makaleler`,
      icon: FileText,
    },
    {
      label: t.admin.projects,
      value: projects.length,
      note: `${projects.filter((project) => project.featured).length} ${t.admin.featured.toLowerCase()}`,
      href: `/${locale}/admin/projeler`,
      icon: FolderKanban,
    },
    {
      label: t.admin.gallery,
      value: gallery.length,
      note: '—',
      href: `/${locale}/admin/galeri`,
      icon: Images,
    },
    {
      label: t.admin.messages,
      value: messages.length,
      note: `${unread} ${t.admin.unread.toLowerCase()}`,
      href: `/${locale}/admin/mesajlar`,
      icon: Mail,
    },
    {
      label: t.admin.resume,
      value: resume.length,
      note: '—',
      href: `/${locale}/admin/ozgecmis`,
      icon: UserRound,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.dashboard}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.admin.settings}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-fire/40"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-fire" />
                <ArrowUpRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/60" />
              </div>
              <p className="mt-6 font-display text-3xl font-bold text-white">{card.value}</p>
              <p className="mt-1 text-sm text-white/55">{card.label}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
                {card.note}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="font-display text-lg font-bold text-white">{t.admin.messages}</h2>
        <div className="mt-4 space-y-2">
          {messages.slice(0, 5).map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 text-sm last:border-0"
            >
              <span className="truncate text-white/70">
                {message.isRead ? '' : '● '}
                {message.subject}
              </span>
              <span className="shrink-0 font-mono text-[11px] text-white/30">{message.name}</span>
            </div>
          ))}
          {messages.length === 0 ? (
            <p className="text-sm text-white/35">{t.admin.empty}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
