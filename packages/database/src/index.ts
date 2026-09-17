/**
 * @nioshcert/database — Public API
 *
 * Eksport PrismaClient sebagai singleton supaya boleh digunakan
 * oleh backend dan scripts.
 */

import { PrismaClient } from '@prisma/client';

// Singleton pattern — elak multiple instances semasa dev (HMR)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Eksport jenis Prisma untuk kegunaan lain
export * from '@prisma/client';
export { PrismaClient };
