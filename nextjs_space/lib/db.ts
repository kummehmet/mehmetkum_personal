import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma istemcisi yalnızca DATABASE_URL tanımlıyken oluşturulur; aksi hâlde
 * Prisma bağlantı hatası fırlatır. Yerel geliştirmede veri katmanı JSON
 * deposuna (data/local-content.json) düşer.
 */
export function getPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL tanımlı değil. Prisma bağlantısı kullanılamaz.');
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
