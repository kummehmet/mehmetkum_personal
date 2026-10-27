import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { getAbout } from '@/lib/content';
import { AboutForm } from '@/components/admin/about-form';
import type { AboutContent, AboutStat } from '@/lib/content-types';

const toContent = (value: {
  eyebrow: string;
  title: string;
  cta: string;
  body: string[];
  stats: AboutStat[];
}): AboutContent => ({
  eyebrow: value.eyebrow,
  title: value.title,
  cta: value.cta,
  body: [...value.body],
  stats: value.stats.map((stat) => ({ value: stat.value, suffix: stat.suffix, label: stat.label })),
});

export default async function AdminAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);
  const [trDefault, enDefault] = await Promise.all([getMessages('tr'), getMessages('en')]);

  const pair = (await getAbout()) ?? {
    dataTr: toContent(trDefault.about),
    dataEn: toContent(enDefault.about),
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.about}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.about.title}</p>

      <div className="mt-8">
        <AboutForm pair={pair} t={t} />
      </div>
    </div>
  );
}
