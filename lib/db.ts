// /lib/db.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Чтобы не создавались дубли PrismaClient при hot reload
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // можно отключить если не нужно
  });

// В режиме разработки сохраняем клиент в глобальную переменную
if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
