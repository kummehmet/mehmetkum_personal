import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listProjects } from '@/lib/content';
import { CollectionManager, type AdminField } from '@/components/admin/collection-manager';

export default async function AdminProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const projects = await listProjects();

  const fields: AdminField[] = [
    { name: 'titleTr', label: t.admin.titleTr, type: 'text', required: true },
    { name: 'titleEn', label: t.admin.titleEn, type: 'text' },
    { name: 'liveUrl', label: t.admin.liveUrl, type: 'text', placeholder: 'https://' },
    { name: 'githubUrl', label: t.admin.githubUrl, type: 'text', placeholder: 'https://github.com/...' },
    { name: 'sortOrder', label: t.admin.order, type: 'number' },
    { name: 'featured', label: t.admin.featured, type: 'checkbox' },
    { name: 'screenshotPath', label: 'Ekran görüntüsü', type: 'image', full: true },
    { name: 'techStack', label: t.admin.techStack, type: 'tags', full: true },
    { name: 'descriptionTr', label: t.admin.descriptionTr, type: 'textarea', required: true, full: true },
    { name: 'descriptionEn', label: t.admin.descriptionEn, type: 'textarea', full: true },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.projects}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.projects.lead}</p>

      <div className="mt-8">
        <CollectionManager
          endpoint="/api/projects"
          fields={fields}
          rows={projects}
          titleField="titleTr"
          subtitleField="liveUrl"
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
