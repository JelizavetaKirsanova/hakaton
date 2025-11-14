'use client';

import { useState, useEffect } from 'react';
import { LeadCard } from '../components/LeadCard';

type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  status: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads');
        if (!res.ok) throw new Error('Ошибка API');
        const data = await res.json(); // data должен быть валидным JSON
        setLeads(data);
      } catch (err) {
        console.error('Ошибка загрузки лидов:', err);
      } finally {
        setLoading(false); // обязательно отключаем индикатор загрузки
      }
    }
    fetchLeads();
  }, []);

  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, product }),
    });
    const newLead = await res.json();
    setLeads(prev => [...prev, newLead]);
    setName('');
    setPhone('');
    setEmail('');
    setProduct('');
  }

  if (loading) return <p className="p-4">Загрузка лидов...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Лиды</h1>

      <form onSubmit={addLead} className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <input className="border p-2 w-full" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border p-2 w-full" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required />
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Продукт" value={product} onChange={e => setProduct(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Добавить лид</button>
      </form>

      <div className="space-y-4">
        {leads.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
