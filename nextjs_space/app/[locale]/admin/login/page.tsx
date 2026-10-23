import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { isAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/login-form';

export const metadata: Metadata = { title: 'Admin' };

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect('/tr/admin/login');
  if (await isAuthenticated()) redirect(`/${locale}/admin`);

  const t = await getMessages(locale);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center bg-black px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_50%_20%,rgba(255,69,0,0.14),transparent_70%)]" />

      <div className="relative w-full max-w-sm">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-fire"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.meta.siteName}
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-white">
            {t.admin.login.title}
          </h1>
          <p className="mt-2 text-sm text-white/45">{t.admin.login.description}</p>

          <div className="mt-8">
            <LoginForm
              locale={locale}
              labels={{
                password: t.admin.login.password,
                submit: t.admin.login.submit,
                error: t.admin.login.error,
                hint: t.admin.login.hint,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
