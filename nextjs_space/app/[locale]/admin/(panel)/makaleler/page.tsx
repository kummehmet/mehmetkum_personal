import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listArticles } from '@/lib/content';
import { CollectionManager, type AdminField } from '@/components/admin/collection-manager';

export default async function AdminArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const articles = await listArticles();

  const fields: AdminField[] = [
    { name: 'titleTr', label: t.admin.titleTr, type: 'text', required: true },
    { name: 'titleEn', label: t.admin.titleEn, type: 'text' },
    { name: 'slug', label: t.admin.slug, type: 'text', required: true, placeholder: 'ornek-makale' },
    {
      name: 'category',
      label: t.admin.category,
      type: 'select',
      options: [
        { value: 'TECH', label: t.categories.TECH },
        { value: 'PUBLIC_ADMIN', label: t.categories.PUBLIC_ADMIN },
        { value: 'FIRE', label: t.categories.FIRE },
        { value: 'PERSONAL', label: t.categories.PERSONAL },
      ],
    },
    {
      name: 'locale',
      label: 'Dil',
      type: 'select',
      options: [
        { value: 'tr', label: 'Türkçe' },
        { value: 'en', label: 'English' },
      ],
    },
    { name: 'readMinutes', label: 'Okuma (dk)', type: 'number' },
    { name: 'published', label: t.admin.published, type: 'checkbox' },
    { name: 'coverImage', label: t.admin.coverImage, type: 'image', full: true },
    { name: 'tags', label: t.admin.tags, type: 'tags', full: true },
    { name: 'summaryTr', label: t.admin.summary + ' (TR)', type: 'textarea', full: true },
    { name: 'summaryEn', label: t.admin.summary + ' (EN)', type: 'textarea', full: true },
    { name: 'contentTr', label: t.admin.content + ' (TR)', type: 'markdown', required: true, full: true },
    { name: 'contentEn', label: t.admin.content + ' (EN)', type: 'markdown', full: true },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.articles}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.articles.lead}</p>

      <div className="mt-8">
        <CollectionManager
          endpoint="/api/articles"
          fields={fields}
          rows={articles}
          titleField="titleTr"
          subtitleField="slug"
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
