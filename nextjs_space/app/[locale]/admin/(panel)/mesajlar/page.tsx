import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listMessages } from '@/lib/content';
import { MessageList } from '@/components/admin/message-list';

export default async function AdminMessagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const messages = await listMessages();
  const unread = messages.filter((message) => !message.isRead).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
          {t.admin.messages}
        </h1>
        <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
          {unread} {t.admin.unread.toLowerCase()}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/45">{t.contact.lead}</p>

      <div className="mt-8">
        <MessageList
          messages={messages}
          locale={locale}
          labels={{
            empty: t.admin.empty,
            markRead: t.admin.markRead,
            delete: t.common.delete,
            from: t.admin.from,
            date: t.admin.date,
            confirmDelete: t.admin.confirmDelete,
          }}
        />
      </div>
    </div>
  );
}
