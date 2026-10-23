import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getMessages, isLocale } from '@/lib/i18n';
import { ContactForm } from '@/components/contact/contact-form';
import { FadeIn } from '@/components/ui/animate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);
  return { title: t.meta.contact.title, description: t.meta.contact.description };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-[72px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_10%,rgba(255,69,0,0.14),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn>
          <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fire">
            <span className="h-1.5 w-1.5 rounded-full bg-fire" />
            {t.contact.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
            {t.contact.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">{t.contact.lead}</p>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href="mailto:mehmet@mehmetkum.com"
              className="group flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-fire"
            >
              mehmet@mehmetkum.com
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mehmetkum"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-fire"
            >
              {t.contact.linkedin}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
            <ContactForm
              labels={{
                name: t.contact.name,
                email: t.contact.email,
                subject: t.contact.subject,
                message: t.contact.message,
                submit: t.contact.submit,
                sending: t.contact.sending,
                success: t.contact.success,
                error: t.contact.error,
                newMessage: t.contact.newMessage,
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
