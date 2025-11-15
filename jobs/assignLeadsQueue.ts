import { db } from '../lib/db';
import { assignLead } from '../services/leadAssignment';

export async function runAssignLeadsQueue() {
  const unassignedLeads = await db.lead.findMany({ where: { status: 'new' } });
  for (const lead of unassignedLeads) {
    await assignLead(lead);
  }
}

