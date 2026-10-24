import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getMessages, isLocale, locales } from '@/lib/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-display' });
const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-soft' });
const mono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-mono' });

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  const base = 'https://mehmetkum.com';

  return {
    metadataBase: new URL(base),
    title: {
      default: t.meta.title,
      template: `%s | ${t.meta.siteName}`,
    },
    description: t.meta.description,
    applicationName: t.meta.siteName,
    authors: [{ name: t.meta.siteName }],
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        tr: `${base}/tr`,
        en: `${base}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: `${base}/${locale}`,
      siteName: t.meta.siteName,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mehmet Kum',
    jobTitle: locale === 'tr' ? 'Bilgisayar Mühendisi ve Kamu Yöneticisi' : 'Computer Engineer and Public Administrator',
    url: `https://mehmetkum.com/${locale}`,
    sameAs: ['https://ipekbaca.com', 'https://simalogistic.com'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Hacettepe University',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'ASKı Genel Müdürlüğü',
    },
  };

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} ${mono.variable} bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
