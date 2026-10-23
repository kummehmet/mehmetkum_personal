import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { seedData } from '../data/seed';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL tanımlı değil — seed atlandı (yerel JSON deposu kullanılıyor).');
    return;
  }

  for (const entry of seedData.resume) {
    const data = {
      titleTr: entry.titleTr,
      titleEn: entry.titleEn,
      orgTr: entry.orgTr,
      orgEn: entry.orgEn,
      descTr: entry.descTr,
      descEn: entry.descEn,
      startDate: new Date(entry.startDate),
      endDate: entry.endDate ? new Date(entry.endDate) : null,
      isCurrent: entry.isCurrent,
      category: entry.category,
      tags: entry.tags,
      sortOrder: entry.sortOrder,
      isFireTheme: entry.isFireTheme,
    };
    await prisma.resumeEntry.upsert({ where: { id: entry.id }, create: { id: entry.id, ...data }, update: data });
  }
  console.log(`Özgeçmiş: ${seedData.resume.length} kayıt hazır.`);

  for (const article of seedData.articles) {
    const data = {
      slug: article.slug,
      titleTr: article.titleTr,
      titleEn: article.titleEn,
      summaryTr: article.summaryTr,
      summaryEn: article.summaryEn,
      contentTr: article.contentTr,
      contentEn: article.contentEn,
      locale: article.locale,
      category: article.category,
      tags: article.tags,
      coverImage: article.coverImage,
      published: article.published,
      readMinutes: article.readMinutes,
      createdAt: new Date(article.createdAt),
      updatedAt: new Date(article.updatedAt),
    };
    await prisma.article.upsert({ where: { id: article.id }, create: { id: article.id, ...data }, update: data });
  }
  console.log(`Makale: ${seedData.articles.length} kayıt hazır.`);

  for (const image of seedData.gallery) {
    const data = {
      titleTr: image.titleTr,
      titleEn: image.titleEn,
      descriptionTr: image.descriptionTr,
      descriptionEn: image.descriptionEn,
      category: image.category,
      imagePath: image.imagePath,
      sortOrder: image.sortOrder,
      createdAt: new Date(image.createdAt),
    };
    await prisma.galleryImage.upsert({ where: { id: image.id }, create: { id: image.id, ...data }, update: data });
  }
  console.log(`Galeri: ${seedData.gallery.length} kayıt hazır.`);

  for (const project of seedData.projects) {
    const data = {
      titleTr: project.titleTr,
      titleEn: project.titleEn,
      descriptionTr: project.descriptionTr,
      descriptionEn: project.descriptionEn,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      screenshotPath: project.screenshotPath,
      techStack: project.techStack,
      sortOrder: project.sortOrder,
      featured: project.featured,
      createdAt: new Date(project.createdAt),
    };
    await prisma.project.upsert({ where: { id: project.id }, create: { id: project.id, ...data }, update: data });
  }
  console.log(`Proje: ${seedData.projects.length} kayıt hazır.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
