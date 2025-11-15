'use client'; // если будут хуки, иначе можно убрать

type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  status: string;
};

interface LeadCardProps {
  lead: Lead;
}

// Named export — обязательно, чтобы работать с import { LeadCard } ...
export function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold">{lead.name}</h2>
      <p>Телефон: {lead.phone}</p>
      {lead.email && <p>Email: {lead.email}</p>}
      {lead.product && <p>Продукт: {lead.product}</p>}
      <p>Статус: {lead.status}</p>
    </div>
  );
}
