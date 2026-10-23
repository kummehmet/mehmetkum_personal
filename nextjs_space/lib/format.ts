const localeTags: Record<string, string> = { tr: 'tr-TR', en: 'en-US' };

export function formatDate(iso: string, locale: string): string {
  const tag = localeTags[locale] ?? 'tr-TR';
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function formatShortDate(iso: string, locale: string): string {
  const tag = localeTags[locale] ?? 'tr-TR';
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function formatMonthYear(iso: string, locale: string): string {
  const tag = localeTags[locale] ?? 'tr-TR';
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
