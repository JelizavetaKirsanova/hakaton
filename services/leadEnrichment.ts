// /services/leadEnrichment.ts

import { db } from '../lib/db';
import { log } from '../lib/logger';
import { EnrichedLead } from '../app/types/lead';

// Примерная карта телефонных кодов
const phoneCountryMap: Record<string, string> = {
  "+372": "Estonia",
  "+371": "Latvia",
  "+358": "Finland",
  "+49": "Germany",
  "+7": "Russia",
};

// Примерная карта доменов почт
const emailDomainCountryMap: Record<string, string> = {
  "ee": "Estonia",
  "fi": "Finland",
  "lv": "Latvia",
  "lt": "Lithuania",
  "ru": "Russia",
};

function detectFromPhone(phone?: string): string | null {
  if (!phone) return null;

  const normalized = phone.replace(/\s+/g, "");

  for (const prefix of Object.keys(phoneCountryMap)) {
    if (normalized.startsWith(prefix)) {
      return phoneCountryMap[prefix];
    }
  }
  return null;
}

function detectFromEmail(email?: string): string | null {
  if (!email) return null;

  const parts = email.split(".");
  const tld = parts[parts.length - 1];

  return emailDomainCountryMap[tld] || null;
}

function detectFromText(text?: string): string | null {
  if (!text) return null;

  const lower = text.toLowerCase();

  if (lower.includes("estonia") || lower.includes("tallinn")) return "Estonia";
  if (lower.includes("helsinki") || lower.includes("finland")) return "Finland";
  if (lower.includes("latvia")) return "Latvia";
  if (lower.includes("germany")) return "Germany";

  return null;
}

export async function enrichLead(leadId: string): Promise<EnrichedLead | null> {
  const lead = await db.lead.findUnique({ where: { id: leadId } });

  if (!lead) {
    log(`Лид ${leadId} не найден при обогащении`);
    return null;
  }

  let detectedCountry: string | null = null;
  let reason: string | null = null;

  // 1. Проверка телефона
  const byPhone = detectFromPhone(lead.phone || undefined);
  if (byPhone) {
    detectedCountry = byPhone;
    reason = "phone";
  }

  // 2. Проверка email-домена
  if (!detectedCountry) {
    const byEmail = detectFromEmail(lead.email || undefined);
    if (byEmail) {
      detectedCountry = byEmail;
      reason = "email";
    }
  }

  // 3. Проверка текста сообщения
  if (!detectedCountry) {
    const byText = detectFromText(lead.message || undefined);
    if (byText) {
      detectedCountry = byText;
      reason = "message";
    }
  }

  log(
    detectedCountry
      ? `Страна определена: ${detectedCountry} (лид ${leadId})`
      : `Не удалось определить страну (лид ${leadId})`
  );

  const updated = await db.lead.update({
    where: { id: leadId },
    data: {
      detectedCountry,
      detectedCountryReason: reason,
    },
  });

  return {
    ...updated,
    country: updated.detectedCountry,
    countryConfidence: updated.detectedCountry ? 0.7 : 0,
    detectedCountryReason: updated.detectedCountryReason,
  };
}
