// /types/lead.ts

export interface IncomingLead {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    source?: string; // сайт, лендинг, форма, реклама...
  }
  
  export interface EnrichedLead extends IncomingLead {
    country?: string | null;
    countryConfidence?: number | null;
    detectedCountryReason?: string | null;
  }
  
  export type AssignmentStatus =
    | "Assigned"
    | "WaitingForInfo"
    | "Unassigned";
  
  export interface AssignmentResult {
    assignedToId?: string | null;
    assignedToType?: "dealer" | "manager" | null;
    status: AssignmentStatus;
    reason: string;
  }
  