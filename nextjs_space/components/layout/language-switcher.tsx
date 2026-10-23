'use client';

import { usePathname, useRouter } from 'next/navigation';
import { localeLabel, locales, otherLocale, type Locale } from '@/lib/i18n';

export function LanguageSwitcher({
  locale,
  className = '',
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const next = otherLocale(locale);

  const onSelect = (target: Locale) => {
    if (target === locale) return;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) segments[0] = target;
    else segments.unshift(target);
    router.replace(`/${segments.join('/')}`);
    router.refresh();
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          aria-current={item === locale}
          className={`rounded-full px-3 py-1 transition-colors ${
            item === locale ? 'bg-white text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          {localeLabel(item)}
        </button>
      ))}
      <span className="sr-only">{next}</span>
    </div>
  );
}
