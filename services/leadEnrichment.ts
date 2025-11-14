import { db } from '../lib/db';
import { log } from '../lib/logger';

export async function checkIncompleteLead(leadId: string) {
  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead) return;

  if (!lead.email || !lead.phone) {
    log(`Лид ${lead.id} неполный. Отправляем запрос клиенту`);
    // Здесь можно вызвать чат-бота или отправить e-mail
  }
}
