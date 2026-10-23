import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { isAuthenticated } from '@/lib/auth';
import { listMessages } from '@/lib/content';
import { AdminNav } from '@/components/admin/admin-nav';

export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!(await isAuthenticated())) redirect(`/${locale}/admin/login`);

  const t = await getMessages(locale);
  const messages = await listMessages();
  const unread = messages.filter((message) => !message.isRead).length;

  return (
    <div className="min-h-[100svh] bg-black px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <AdminNav
          locale={locale}
          unread={unread}
          labels={{
            dashboard: t.admin.dashboard,
            resume: t.admin.resume,
            articles: t.admin.articles,
            projects: t.admin.projects,
            gallery: t.admin.gallery,
            messages: t.admin.messages,
            logout: t.admin.logout,
          }}
        />
        {children}
      </div>
    </div>
  );
}
