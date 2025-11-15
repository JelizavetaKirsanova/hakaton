// /services/leadAssignment.ts

import { db } from '../lib/db';
import { log } from '../lib/logger';
import { AssignmentResult } from '../app/types/lead';

interface Manager {
  id: string;
  country: string | null;
  isActive: boolean;
  workload: number; // например количество текущих лидов
}

interface Dealer {
  id: string;
  country: string | null;
  isActive: boolean;
}

async function findDealerByCountry(country: string) {
  return await db.dealer.findFirst({
    where: {
      country,
      isActive: true,
    }
  });
}

async function findManagerByCountry(country: string) {
  return await db.manager.findFirst({
    where: {
      country,
      isActive: true,
    },
    orderBy: {
      workload: "asc" // отдаём лид менеджеру с минимальной загруженностью
    }
  });
}

export async function assignLead(leadId: string): Promise<AssignmentResult> {
  const lead = await db.lead.findUnique({ where: { id: leadId } });

  if (!lead) {
    log(`❌ Лид ${leadId} не найден`);
    return {
      status: "Unassigned",
      reason: "Lead not found",
    };
  }

  if (!lead.detectedCountry) {
    log(`⚠ Лид ${lead.id}: страна не определена — просим клиента уточнить`);
    return {
      status: "WaitingForInfo",
      reason: "Country not detected",
    };
  }

  const country = lead.detectedCountry;

  // 1. Проверяем дилера
  const dealer = await findDealerByCountry(country);

  if (dealer) {
    await db.lead.update({
      where: { id: leadId },
      data: {
        assignedToDealerId: dealer.id,
        assignmentStatus: "assigned",
      },
    });

    log(`📦 Лид ${lead.id} назначен дилеру ${dealer.id} (${country})`);

    return {
      status: "Assigned",
      assignedToId: dealer.id,
      assignedToType: "dealer",
      reason: "Assigned to dealer by country",
    };
  }

  // 2. Если дилера нет → назначаем менеджеру
  const manager = await findManagerByCountry(country);

  if (manager) {
    await db.lead.update({
      where: { id: leadId },
      data: {
        assignedToManagerId: manager.id,
        assignmentStatus: "assigned",
      },
    });

    log(`👤 Лид ${lead.id} назначен менеджеру ${manager.id} (${country})`);

    return {
      status: "Assigned",
      assignedToId: manager.id,
      assignedToType: "manager",
      reason: "Assigned to manager by country",
    };
  }

  // 3. Если вообще никого нет → ошибка
  log(`❌ В стране ${country} нет ни дилера, ни менеджера`);

  return {
    status: "Unassigned",
    reason: `No active managers or dealers for country ${country}`,
  };
}
