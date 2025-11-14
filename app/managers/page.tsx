'use client';

import { useEffect, useState } from 'react';
import { ManagerCard } from '../components/ManagerCard';

type Manager = {
  id: string;
  name: string;
  region?: string;
  specialization?: string;
  currentLoad: number;
};

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/managers')
      .then(res => res.json())
      .then(data => {
        setManagers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Загрузка менеджеров...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Менеджеры</h1>
      <div className="space-y-4">
        {managers.map(manager => (
          <ManagerCard key={manager.id} manager={manager} />
        ))}
      </div>
    </div>
  );
}
