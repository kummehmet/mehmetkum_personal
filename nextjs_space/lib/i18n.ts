export const locales = ['tr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeLabel(locale: Locale): string {
  return locale === 'tr' ? 'TR' : 'EN';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'tr' ? 'en' : 'tr';
}

type Dictionary = typeof import('@/messages/tr.json');

type DeepString<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? DeepString<U>[]
      : { [K in keyof T]: DeepString<T[K]> };

export type Messages = DeepString<Dictionary>;

const loaders: Record<Locale, () => Promise<Messages>> = {
  tr: () => import('@/messages/tr.json').then((m) => m.default as unknown as Messages),
  en: () => import('@/messages/en.json').then((m) => m.default as unknown as Messages),
};

export async function getMessages(locale: Locale): Promise<Messages> {
  return loaders[locale]();
}

/** URL yolundan mevcut dilin segmentini değiştirir: /tr/ozgecmis -> /en/ozgecmis */
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return '/' + segments.join('/');
}
