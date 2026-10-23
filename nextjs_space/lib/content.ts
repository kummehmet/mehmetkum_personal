import { randomUUID } from 'node:crypto';
import { getPrisma } from '@/lib/db';
import { readLocal, writeLocal } from '@/lib/local-store';
import type {
  Article,
  ArticleInput,
  ContactMessage,
  GalleryImage,
  GalleryInput,
  Project,
  ProjectInput,
  ResumeEntry,
  ResumeInput,
} from '@/lib/content-types';

export type { Article, ContactMessage, GalleryImage, Project, ResumeEntry };

const hasDatabase = () => Boolean(process.env.DATABASE_URL);

const iso = (date: Date | null | undefined) => (date ? date.toISOString() : null);

function mapResume(row: {
  id: string;
  titleTr: string;
  titleEn: string | null;
  orgTr: string;
  orgEn: string | null;
  descTr: string | null;
  descEn: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  category: string;
  tags: string[];
  sortOrder: number;
  isFireTheme: boolean;
}): ResumeEntry {
  return { ...row, startDate: row.startDate.toISOString(), endDate: iso(row.endDate), category: row.category as ResumeEntry['category'] };
}

function mapArticle(row: {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string | null;
  summaryTr: string | null;
  summaryEn: string | null;
  contentTr: string;
  contentEn: string | null;
  locale: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  published: boolean;
  readMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}): Article {
  return { ...row, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString(), category: row.category as Article['category'] };
}

/* ---------------------------------- Özgeçmiş --------------------------------- */

export async function listResume(): Promise<ResumeEntry[]> {
  if (hasDatabase()) {
    const rows = await getPrisma().resumeEntry.findMany({ orderBy: { sortOrder: 'asc' } });
    return rows.map((row) => mapResume(row));
  }
  const db = await readLocal();
  return [...db.resume].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveResume(input: ResumeInput): Promise<ResumeEntry> {
  const data = {
    titleTr: input.titleTr,
    titleEn: input.titleEn ?? null,
    orgTr: input.orgTr,
    orgEn: input.orgEn ?? null,
    descTr: input.descTr ?? null,
    descEn: input.descEn ?? null,
    startDate: new Date(input.startDate),
    endDate: input.endDate ? new Date(input.endDate) : null,
    isCurrent: input.isCurrent,
    category: input.category,
    tags: input.tags,
    sortOrder: input.sortOrder,
    isFireTheme: input.isFireTheme,
  };

  if (hasDatabase()) {
    const prisma = getPrisma();
    const row = input.id
      ? await prisma.resumeEntry.update({ where: { id: input.id }, data })
      : await prisma.resumeEntry.create({ data });
    return mapResume(row);
  }

  const db = await readLocal();
  const entry: ResumeEntry = {
    ...input,
    id: input.id ?? `resume-${randomUUID()}`,
    titleEn: input.titleEn ?? null,
    orgEn: input.orgEn ?? null,
    descTr: input.descTr ?? null,
    descEn: input.descEn ?? null,
    endDate: input.endDate ?? null,
    tags: input.tags ?? [],
  };
  const index = db.resume.findIndex((item) => item.id === entry.id);
  if (index >= 0) db.resume[index] = entry;
  else db.resume.push(entry);
  await writeLocal(db);
  return entry;
}

export async function deleteResume(id: string): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().resumeEntry.delete({ where: { id } });
    return;
  }
  const db = await readLocal();
  db.resume = db.resume.filter((item) => item.id !== id);
  await writeLocal(db);
}

/* --------------------------------- Makaleler -------------------------------- */

export async function listArticles(options: { publishedOnly?: boolean } = {}): Promise<Article[]> {
  if (hasDatabase()) {
    const rows = await getPrisma().article.findMany({
      where: options.publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => mapArticle(row));
  }
  const db = await readLocal();
  const items = options.publishedOnly ? db.articles.filter((item) => item.published) : db.articles;
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (hasDatabase()) {
    const row = await getPrisma().article.findUnique({ where: { slug } });
    return row ? mapArticle(row) : null;
  }
  const db = await readLocal();
  return db.articles.find((item) => item.slug === slug) ?? null;
}

export async function saveArticle(input: ArticleInput): Promise<Article> {
  const data = {
    slug: input.slug,
    titleTr: input.titleTr,
    titleEn: input.titleEn ?? null,
    summaryTr: input.summaryTr ?? null,
    summaryEn: input.summaryEn ?? null,
    contentTr: input.contentTr,
    contentEn: input.contentEn ?? null,
    locale: input.locale,
    category: input.category,
    tags: input.tags ?? [],
    coverImage: input.coverImage ?? null,
    published: input.published,
    readMinutes: input.readMinutes ?? 5,
  };

  if (hasDatabase()) {
    const prisma = getPrisma();
    const row = input.id
      ? await prisma.article.update({ where: { id: input.id }, data })
      : await prisma.article.create({ data });
    return mapArticle(row);
  }

  const db = await readLocal();
  const now = new Date().toISOString();
  const existing = input.id ? db.articles.find((item) => item.id === input.id) : undefined;
  const article: Article = {
    ...input,
    id: input.id ?? `article-${randomUUID()}`,
    titleEn: input.titleEn ?? null,
    summaryTr: input.summaryTr ?? null,
    summaryEn: input.summaryEn ?? null,
    contentEn: input.contentEn ?? null,
    tags: input.tags ?? [],
    coverImage: input.coverImage ?? null,
    readMinutes: input.readMinutes ?? 5,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  const index = db.articles.findIndex((item) => item.id === article.id);
  if (index >= 0) db.articles[index] = article;
  else db.articles.push(article);
  await writeLocal(db);
  return article;
}

export async function deleteArticle(id: string): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().article.delete({ where: { id } });
    return;
  }
  const db = await readLocal();
  db.articles = db.articles.filter((item) => item.id !== id);
  await writeLocal(db);
}

/* ---------------------------------- Galeri ---------------------------------- */

export async function listGallery(): Promise<GalleryImage[]> {
  if (hasDatabase()) {
    const rows = await getPrisma().galleryImage.findMany({ orderBy: { sortOrder: 'asc' } });
    return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
  }
  const db = await readLocal();
  return [...db.gallery].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveGallery(input: GalleryInput): Promise<GalleryImage> {
  const data = {
    titleTr: input.titleTr ?? null,
    titleEn: input.titleEn ?? null,
    descriptionTr: input.descriptionTr ?? null,
    descriptionEn: input.descriptionEn ?? null,
    category: input.category,
    imagePath: input.imagePath,
    sortOrder: input.sortOrder,
  };

  if (hasDatabase()) {
    const prisma = getPrisma();
    const row = input.id
      ? await prisma.galleryImage.update({ where: { id: input.id }, data })
      : await prisma.galleryImage.create({ data });
    return { ...row, createdAt: row.createdAt.toISOString() };
  }

  const db = await readLocal();
  const existing = input.id ? db.gallery.find((item) => item.id === input.id) : undefined;
  const image: GalleryImage = {
    ...input,
    id: input.id ?? `gallery-${randomUUID()}`,
    titleTr: input.titleTr ?? null,
    titleEn: input.titleEn ?? null,
    descriptionTr: input.descriptionTr ?? null,
    descriptionEn: input.descriptionEn ?? null,
    sortOrder: input.sortOrder ?? 0,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  const index = db.gallery.findIndex((item) => item.id === image.id);
  if (index >= 0) db.gallery[index] = image;
  else db.gallery.push(image);
  await writeLocal(db);
  return image;
}

export async function deleteGallery(id: string): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().galleryImage.delete({ where: { id } });
    return;
  }
  const db = await readLocal();
  db.gallery = db.gallery.filter((item) => item.id !== id);
  await writeLocal(db);
}

/* --------------------------------- Projeler -------------------------------- */

export async function listProjects(): Promise<Project[]> {
  if (hasDatabase()) {
    const rows = await getPrisma().project.findMany({ orderBy: { sortOrder: 'asc' } });
    return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
  }
  const db = await readLocal();
  return [...db.projects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveProject(input: ProjectInput): Promise<Project> {
  const data = {
    titleTr: input.titleTr,
    titleEn: input.titleEn ?? null,
    descriptionTr: input.descriptionTr,
    descriptionEn: input.descriptionEn ?? null,
    liveUrl: input.liveUrl ?? null,
    githubUrl: input.githubUrl ?? null,
    screenshotPath: input.screenshotPath ?? null,
    techStack: input.techStack ?? [],
    sortOrder: input.sortOrder ?? 0,
    featured: input.featured ?? false,
  };

  if (hasDatabase()) {
    const prisma = getPrisma();
    const row = input.id
      ? await prisma.project.update({ where: { id: input.id }, data })
      : await getPrisma().project.create({ data });
    return { ...row, createdAt: row.createdAt.toISOString() };
  }

  const db = await readLocal();
  const existing = input.id ? db.projects.find((item) => item.id === input.id) : undefined;
  const project: Project = {
    ...input,
    id: input.id ?? `project-${randomUUID()}`,
    titleEn: input.titleEn ?? null,
    descriptionEn: input.descriptionEn ?? null,
    liveUrl: input.liveUrl ?? null,
    githubUrl: input.githubUrl ?? null,
    screenshotPath: input.screenshotPath ?? null,
    techStack: input.techStack ?? [],
    sortOrder: input.sortOrder ?? 0,
    featured: input.featured ?? false,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  const index = db.projects.findIndex((item) => item.id === project.id);
  if (index >= 0) db.projects[index] = project;
  else db.projects.push(project);
  await writeLocal(db);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().project.delete({ where: { id } });
    return;
  }
  const db = await readLocal();
  db.projects = db.projects.filter((item) => item.id !== id);
  await writeLocal(db);
}

/* --------------------------------- Mesajlar -------------------------------- */

export async function listMessages(): Promise<ContactMessage[]> {
  if (hasDatabase()) {
    const rows = await getPrisma().contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
  }
  const db = await readLocal();
  return [...db.messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  if (hasDatabase()) {
    const row = await getPrisma().contactMessage.create({ data: input });
    return { ...row, createdAt: row.createdAt.toISOString() };
  }
  const db = await readLocal();
  const message: ContactMessage = {
    id: `message-${randomUUID()}`,
    ...input,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  db.messages.push(message);
  await writeLocal(db);
  return message;
}

export async function markMessageRead(id: string, isRead: boolean): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().contactMessage.update({ where: { id }, data: { isRead } });
    return;
  }
  const db = await readLocal();
  const found = db.messages.find((item) => item.id === id);
  if (found) found.isRead = isRead;
  await writeLocal(db);
}

export async function deleteMessage(id: string): Promise<void> {
  if (hasDatabase()) {
    await getPrisma().contactMessage.delete({ where: { id } });
    return;
  }
  const db = await readLocal();
  db.messages = db.messages.filter((item) => item.id !== id);
  await writeLocal(db);
}

/* ------------------------------- Yardımcılar -------------------------------- */

export function pick(locale: string, tr: string | null | undefined, en: string | null | undefined): string {
  if (locale === 'en' && en) return en;
  return tr ?? en ?? '';
}
