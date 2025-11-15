import { PrismaClient } from '@prisma/client';

declare global {
  // чтобы не создавать новый клиент при HMR
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query'], // можно убрать или оставить для отладки
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
