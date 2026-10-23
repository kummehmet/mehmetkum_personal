'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';

export type AdminFieldType =
  | 'text'
  | 'textarea'
  | 'markdown'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'tags'
  | 'date'
  | 'image';

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  full?: boolean;
  placeholder?: string;
};

export type AdminRow = { id: string } & Record<string, unknown>;

type FormValues = Record<string, string | boolean>;

function toFormValues(fields: AdminField[], row?: AdminRow): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    const raw = row?.[field.name];
    if (field.type === 'checkbox') {
      values[field.name] = Boolean(raw);
    } else if (field.type === 'tags') {
      values[field.name] = Array.isArray(raw) ? raw.join(', ') : '';
    } else if (field.type === 'date') {
      values[field.name] = typeof raw === 'string' ? raw.slice(0, 10) : '';
    } else {
      values[field.name] = raw === null || raw === undefined ? '' : String(raw);
    }
  }
  return values;
}

export function CollectionManager({
  endpoint,
  fields,
  rows,
  labels,
  titleField,
  subtitleField,
}: {
  endpoint: string;
  fields: AdminField[];
  rows: AdminRow[];
  labels: {
    newItem: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    empty: string;
    confirmDelete: string;
    required: string;
    upload: string;
  };
  titleField: string;
  subtitleField?: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<AdminRow | null | undefined>(undefined);
  const [values, setValues] = useState<FormValues>({});
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openNew = () => {
    setValues(toFormValues(fields));
    setEditing(null);
    setError(null);
  };

  const openEdit = (row: AdminRow) => {
    setValues(toFormValues(fields, row));
    setEditing(row);
    setError(null);
  };

  const close = () => {
    setEditing(undefined);
    setBusy(false);
    setError(null);
  };

  const setValue = (name: string, value: string | boolean) =>
    setValues((current) => ({ ...current, [name]: value }));

  const uploadImage = async (field: string, file: File) => {
    setUploading(field);
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body });
      const data = (await response.json()) as { path?: string; error?: string };
      if (!response.ok || !data.path) throw new Error(data.error ?? 'upload_failed');
      setValue(field, data.path);
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const missing = fields.filter(
      (field) => field.required && !String(values[field.name] ?? '').trim(),
    );
    if (missing.length) {
      setError(`${labels.required}: ${missing.map((field) => field.label).join(', ')}`);
      return;
    }

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = values[field.name];
      if (field.type === 'checkbox') payload[field.name] = Boolean(raw);
      else if (field.type === 'number') payload[field.name] = Number(raw || 0);
      else if (field.type === 'tags')
        payload[field.name] = String(raw ?? '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      else payload[field.name] = String(raw ?? '') === '' ? null : String(raw);
    }

    setBusy(true);
    try {
      const isEdit = editing != null;
      const response = await fetch(isEdit ? `${endpoint}/${editing.id}` : endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('request_failed');
      close();
      router.refresh();
    } catch {
      setError('Save failed');
      setBusy(false);
    }
  };

  const remove = async (row: AdminRow) => {
    if (!window.confirm(labels.confirmDelete)) return;
    const response = await fetch(`${endpoint}/${row.id}`, { method: 'DELETE' });
    if (response.ok) router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
          {rows.length} kayıt
        </p>
        <button
          type="button"
          onClick={openNew}
          className="pill inline-flex items-center gap-2 bg-gradient-fire px-5 py-2.5 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          {labels.newItem}
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
          {labels.empty}
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-white">
                  {String(row[titleField] ?? row.id)}
                </p>
                {subtitleField ? (
                  <p className="mt-0.5 truncate font-mono text-[11px] text-white/35">
                    {String(row[subtitleField] ?? '')}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(row)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                  aria-label={labels.edit}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(row)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-red-500/60 hover:text-red-400"
                  aria-label={labels.delete}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== undefined ? (
        <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
          <form
            onSubmit={save}
            className="relative my-8 w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0a0a0c] p-6 md:p-8"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:text-white"
              aria-label={labels.cancel}
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-xl font-bold text-white">
              {editing ? labels.edit : labels.newItem}
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.full || field.type === 'markdown' || field.type === 'textarea' ? 'sm:col-span-2' : ''}
                >
                  <label
                    htmlFor={`field-${field.name}`}
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/40"
                  >
                    {field.label}
                  </label>

                  {field.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3">
                      <input
                        id={`field-${field.name}`}
                        type="checkbox"
                        checked={Boolean(values[field.name])}
                        onChange={(event) => setValue(field.name, event.target.checked)}
                        className="h-4 w-4 accent-[#ff4500]"
                      />
                      <span className="text-sm text-white/70">{field.label}</span>
                    </label>
                  ) : field.type === 'select' ? (
                    <select
                      id={`field-${field.name}`}
                      value={String(values[field.name] ?? '')}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#111114] px-4 py-2.5 text-sm text-white outline-none focus:border-fire/60"
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' || field.type === 'markdown' ? (
                    <textarea
                      id={`field-${field.name}`}
                      rows={field.type === 'markdown' ? 14 : 4}
                      value={String(values[field.name] ?? '')}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full resize-y rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-fire/60 ${
                        field.type === 'markdown' ? 'font-mono text-[13px] leading-relaxed' : ''
                      }`}
                    />
                  ) : field.type === 'image' ? (
                    <div className="space-y-2">
                      <input
                        id={`field-${field.name}`}
                        type="text"
                        value={String(values[field.name] ?? '')}
                        onChange={(event) => setValue(field.name, event.target.value)}
                        placeholder="/images/..."
                        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-fire/60"
                      />
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white">
                        {uploading === field.name ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        {labels.upload}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) void uploadImage(field.name, file);
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <input
                      id={`field-${field.name}`}
                      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                      value={String(values[field.name] ?? '')}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-fire/60"
                    />
                  )}

                  {field.type === 'tags' ? (
                    <p className="mt-1.5 font-mono text-[10px] text-white/25">
                      Virgülle ayırın: Next.js, PostgreSQL
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            {error ? <p className="mt-5 text-sm text-red-400">{error}</p> : null}

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={close}
                className="pill border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                {labels.cancel}
              </button>
              <button
                type="submit"
                disabled={busy || uploading !== null}
                className="pill inline-flex items-center gap-2 bg-gradient-fire px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {labels.save}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
