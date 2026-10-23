'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';

export function LoginForm({
  locale,
  labels,
}: {
  locale: string;
  labels: { password: string; submit: string; error: string; hint: string };
}) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      router.replace(`/${locale}/admin`);
      router.refresh();
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          {labels.password}
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 focus-within:border-fire/60">
          <LockKeyhole className="h-4 w-4 text-white/35" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{labels.error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="pill inline-flex w-full items-center justify-center gap-2 bg-gradient-fire px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {labels.submit}
      </button>

      <p className="text-center font-mono text-[11px] text-white/30">{labels.hint}</p>
    </form>
  );
}
