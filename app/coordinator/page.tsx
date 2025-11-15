'use client';

import { useEffect, useState } from 'react';

type Lead = { id: string; status: string };
type Manager = { id: string; currentLoad: number };

export default function CoordinatorPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/leads');
        if (!res.ok) throw new Error('Ошибка API');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // обязательно меняем loading
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-4">Загрузка данных...</p>;

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'Новый').length;
  const avgLoad = managers.length ? (managers.reduce((sum, m) => sum + m.currentLoad, 0) / managers.length).toFixed(1) : 0;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Координатор</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>Всего лидов: {totalLeads}</p>
        <p>Новые лиды: {newLeads}</p>
        <p>Средняя загрузка менеджеров: {avgLoad}</p>
      </div>
    </div>
  );
}
