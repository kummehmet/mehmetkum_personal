'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Messages } from '@/lib/i18n';
import type { AboutContent } from '@/lib/content-types';

type AboutPair = { dataTr: AboutContent; dataEn: AboutContent };

function groupClass() {
  return 'flex flex-col gap-1.5';
}

function inputClass() {
  return 'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-fire focus:outline-none';
}

export function AboutForm({ pair, t }: { pair: AboutPair; t: Messages }) {
  const router = useRouter();
  const [state, setState] = useState<AboutPair>(pair);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const set = (locale: 'dataTr' | 'dataEn', field: keyof AboutContent, value: unknown) => {
    setState((prev) => ({ ...prev, [locale]: { ...prev[locale], [field]: value } }));
  };

  const setStat = (locale: 'dataTr' | 'dataEn', index: number, field: 'value' | 'suffix' | 'label', value: string) => {
    setState((prev) => {
      const stats = [...prev[locale].stats];
      const current = stats[index] ?? { value: 0, suffix: '', label: '' };
      stats[index] = {
        value: field === 'value' ? Number(value) || 0 : current.value,
        suffix: field === 'suffix' ? value : current.suffix,
        label: field === 'label' ? value : current.label,
      };
      return { ...prev, [locale]: { ...prev[locale], stats } };
    });
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!response.ok) throw new Error('save-failed');
      setMessage(t.admin.saved);
      router.refresh();
    } catch {
      setMessage('Kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  const section = (locale: 'dataTr' | 'dataEn', title: string) => {
    const data = state[locale];
    return (
      <div className="border border-white/10 rounded-2xl p-5 md:p-6">
        <h2 className="font-display text-lg font-bold text-white">{title}</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className={groupClass()}>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {t.admin.aboutEyebrow}
            </label>
            <input
              className={inputClass()}
              value={data.eyebrow}
              onChange={(event) => set(locale, 'eyebrow', event.target.value)}
            />
          </div>
          <div className={groupClass()}>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {t.admin.aboutTitle}
            </label>
            <input
              className={inputClass()}
              value={data.title}
              onChange={(event) => set(locale, 'title', event.target.value)}
            />
          </div>
          <div className={groupClass()}>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {t.admin.aboutCta}
            </label>
            <input
              className={inputClass()}
              value={data.cta}
              onChange={(event) => set(locale, 'cta', event.target.value)}
            />
          </div>
        </div>

        <div className={`mt-4 ${groupClass()}`}>
          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            {t.admin.aboutBody}
          </label>
          <textarea
            rows={7}
            className={`${inputClass()} font-mono text-[13px] leading-relaxed`}
            value={data.body.join('\n\n')}
            onChange={(event) =>
              set(
                locale,
                'body',
                event.target.value
                  .split(/\n{2,}/)
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>

        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{t.admin.aboutStats}</p>
          <div className="mt-2 space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-fire focus:outline-none"
                  value={data.stats[index]?.value ?? 0}
                  onChange={(event) => setStat(locale, index, 'value', event.target.value)}
                />
                <input
                  className="w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-fire focus:outline-none"
                  placeholder="+"
                  value={data.stats[index]?.suffix ?? ''}
                  onChange={(event) => setStat(locale, index, 'suffix', event.target.value)}
                />
                <input
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-fire focus:outline-none"
                  value={data.stats[index]?.label ?? ''}
                  onChange={(event) => setStat(locale, index, 'label', event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {message ? (
        <p className="text-sm text-fire">{message}</p>
      ) : null}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {section('dataTr', t.admin.turkish)}
        {section('dataEn', t.admin.english)}
      </div>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? t.common.loading : t.common.save}
      </button>
    </div>
  );
}
