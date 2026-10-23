import { notFound } from 'next/navigation';
import { getMessages, isLocale } from '@/lib/i18n';
import { listGallery } from '@/lib/content';
import { CollectionManager, type AdminField } from '@/components/admin/collection-manager';

export default async function AdminGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  const images = await listGallery();

  const fields: AdminField[] = [
    { name: 'titleTr', label: t.admin.titleTr, type: 'text' },
    { name: 'titleEn', label: t.admin.titleEn, type: 'text' },
    {
      name: 'category',
      label: t.admin.category,
      type: 'select',
      options: [
        { value: 'FIRE', label: t.galleryCategories.FIRE },
        { value: 'SOFTWARE', label: t.galleryCategories.SOFTWARE },
        { value: 'PERSONAL', label: t.galleryCategories.PERSONAL },
      ],
    },
    { name: 'sortOrder', label: t.admin.order, type: 'number' },
    { name: 'imagePath', label: t.admin.imagePath, type: 'image', required: true, full: true },
    { name: 'descriptionTr', label: t.admin.descriptionTr, type: 'textarea', full: true },
    { name: 'descriptionEn', label: t.admin.descriptionEn, type: 'textarea', full: true },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white">
        {t.admin.gallery}
      </h1>
      <p className="mt-2 text-sm text-white/45">{t.gallery.lead}</p>

      <div className="mt-8">
        <CollectionManager
          endpoint="/api/gallery"
          fields={fields}
          rows={images}
          titleField="titleTr"
          subtitleField="category"
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
