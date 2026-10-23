export type ResumeEntry = {
  id: string;
  titleTr: string;
  titleEn: string | null;
  orgTr: string;
  orgEn: string | null;
  descTr: string | null;
  descEn: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  category: 'WORK' | 'EDUCATION';
  tags: string[];
  sortOrder: number;
  isFireTheme: boolean;
};

export type Article = {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string | null;
  summaryTr: string | null;
  summaryEn: string | null;
  contentTr: string;
  contentEn: string | null;
  locale: string;
  category: 'TECH' | 'PUBLIC_ADMIN' | 'FIRE' | 'PERSONAL';
  tags: string[];
  coverImage: string | null;
  published: boolean;
  readMinutes: number;
  createdAt: string;
  updatedAt: string;
};

export type GalleryImage = {
  id: string;
  titleTr: string | null;
  titleEn: string | null;
  descriptionTr: string | null;
  descriptionEn: string | null;
  category: 'FIRE' | 'SOFTWARE' | 'PERSONAL';
  imagePath: string;
  sortOrder: number;
  createdAt: string;
};

export type Project = {
  id: string;
  titleTr: string;
  titleEn: string | null;
  descriptionTr: string;
  descriptionEn: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  screenshotPath: string | null;
  techStack: string[];
  sortOrder: number;
  featured: boolean;
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type LocalDatabase = {
  resume: ResumeEntry[];
  articles: Article[];
  gallery: GalleryImage[];
  projects: Project[];
  messages: ContactMessage[];
};

export type ResumeInput = Omit<ResumeEntry, 'id'> & { id?: string };
export type ArticleInput = Omit<Article, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };
export type GalleryInput = Omit<GalleryImage, 'id' | 'createdAt'> & { id?: string };
export type ProjectInput = Omit<Project, 'id' | 'createdAt'> & { id?: string };
