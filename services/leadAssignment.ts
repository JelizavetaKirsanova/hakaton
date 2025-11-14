import { db } from '../lib/db';
import { sendNotification } from './notifications';

export async function assignLead(lead: any) {
  // Простейшая логика: выбрать менеджера с минимальной загрузкой
  const manager = await db.manager.findFirst({
    orderBy: { currentLoad: 'asc' },
  });

  if (!manager) {
    console.log('Нет доступных менеджеров');
    return;
  }

  // Назначение менеджера
  await db.lead.update({
    where: { id: lead.id },
    data: { managerId: manager.id, status: 'assigned' },
  });

  // Увеличиваем нагрузку менеджера
  await db.manager.update({
    where: { id: manager.id },
    data: { currentLoad: { increment: 1 } },
  });

  // Отправляем уведомление
  await sendNotification(manager, lead);
}
