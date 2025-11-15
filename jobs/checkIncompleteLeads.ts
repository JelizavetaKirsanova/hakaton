import { db } from '../lib/db';
import { checkIncompleteLead } from '../services/leadEnrichment';

export async function runCheckIncompleteLeads() {
  const leads = await db.lead.findMany({ where: { status: 'new' } });
  for (const lead of leads) {
    await checkIncompleteLead(lead.id);
  }
}
