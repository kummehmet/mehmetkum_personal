import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { CustomCursor } from '@/components/shared/custom-cursor';

// Tüm içerik sayfaları veritabanından okur; panelden yapılan düzenlemelerin
// anında canlıya düşmesi için statik derlemeye izin verme.
export const dynamic = 'force-dynamic';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  return (
    <>
      <SmoothScroll>
        <Header locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
      </SmoothScroll>
      <CustomCursor />
    </>
  );
}
