import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listResume } from '@/lib/content';
import { CollectionManager, type AdminField } from '@/components/admin/collection-manager';

export default async function AdminResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const entries = await listResume();

  const fields: AdminField[] = [
    { name: 'titleTr', label: t.admin.titleTr, type: 'text', required: true },
    { name: 'titleEn', label: t.admin.titleEn, type: 'text' },
    { name: 'orgTr', label: 'Kurum (TR)', type: 'text', required: true },
    { name: 'orgEn', label: 'Organization (EN)', type: 'text' },
    {
      name: 'category',
      label: t.admin.category,
      type: 'select',
      options: [
        { value: 'WORK', label: 'WORK' },
        { value: 'EDUCATION', label: 'EDUCATION' },
      ],
    },
    { name: 'startDate', label: t.admin.startDate, type: 'date', required: true },
    { name: 'endDate', label: t.admin.endDate, type: 'date' },
    { name: 'isCurrent', label: t.admin.current, type: 'checkbox' },
    { name: 'isFireTheme', label: 'İtfaiye teması', type: 'checkbox' },
    { name: 'sortOrder', label: t.admin.order, type: 'number' },
    { name: 'tags', label: t.admin.tags, type: 'tags', full: true },
    { name: 'descTr', label: t.admin.descriptionTr, type: 'textarea', full: true },
    { name: 'descEn', label: t.admin.descriptionEn, type: 'textarea', full: true },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.resume}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.resume.lead}</p>

      <div className="mt-8">
        <CollectionManager
          endpoint="/api/resume"
          fields={fields}
          rows={entries}
          titleField="titleTr"
          subtitleField="orgTr"
          labels={{
            newItem: t.admin.newItem,
            save: t.common.save,
            cancel: t.common.cancel,
            delete: t.common.delete,
            edit: t.common.edit,
            empty: t.admin.empty,
            confirmDelete: t.admin.confirmDelete,
            required: t.common.required,
            upload: t.admin.upload,
          }}
        />
      </div>
    </div>
  );
}
