'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

type Field = 'name' | 'email' | 'subject' | 'message';

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    newMessage: string;
  };
}) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: Field, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('request_failed');
      setStatus('success');
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-fire/25 bg-[radial-gradient(circle_at_50%_0%,rgba(255,69,0,0.14),transparent_60%)] p-10 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-fire">
          <Check className="h-8 w-8 text-white" />
        </span>
        <p className="mt-6 font-display text-xl font-bold text-white">{labels.success}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="pill mt-6 border border-white/20 px-5 py-2.5 text-sm text-white/70 hover:border-white/50 hover:text-white"
        >
          {labels.newMessage}
        </button>      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <FieldInput
          id="name"
          type="text"
          label={labels.name}
          value={values.name}
          onChange={(value) => update('name', value)}
          required
        />
        <FieldInput
          id="email"
          type="email"
          label={labels.email}
          value={values.email}
          onChange={(value) => update('email', value)}
          required
        />
      </div>

      <FieldInput
        id="subject"
        type="text"
        label={labels.subject}
        value={values.subject}
        onChange={(value) => update('subject', value)}
        required
      />

      <div className="relative">
        <textarea
          id="message"
          rows={6}
          placeholder=" "
          required
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          className="peer w-full resize-none border-b border-white/15 bg-transparent pb-2 pt-6 text-white outline-none transition-colors focus:border-fire"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-0 top-2 text-sm text-white/40 transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-fire peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm"
        >
          {labels.message}
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="pill group inline-flex items-center gap-2 bg-gradient-fire px-7 py-3.5 text-sm font-medium text-white disabled:opacity-60 hover:shadow-[0_16px_40px_-12px_rgba(255,69,0,0.85)]"
        >
          {status === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
          {status === 'sending' ? labels.sending : labels.submit}
        </button>

        <AnimatePresence>
          {status === 'error' ? (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-400"
            >
              {labels.error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function FieldInput({
  id,
  type,
  label,
  value,
  onChange,
  required = false,
}: {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer w-full border-b border-white/15 bg-transparent pb-2 pt-6 text-white outline-none transition-colors focus:border-fire"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-2 text-sm text-white/40 transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-fire peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm"
      >
        {label}
      </label>
    </div>
  );
}
