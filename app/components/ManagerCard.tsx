'use client'; // если внутри будут хуки, иначе можно убрать

type Manager = {
  id: string;
  name: string;
  region?: string;
  specialization?: string;
  currentLoad: number;
};

interface ManagerCardProps {
  manager: Manager;
}

// Named export — обязательно, чтобы import { ManagerCard } работал
export function ManagerCard({ manager }: ManagerCardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold">{manager.name}</h2>
      {manager.region && <p>Регион: {manager.region}</p>}
      {manager.specialization && <p>Специализация: {manager.specialization}</p>}
      <p>Загрузка: {manager.currentLoad}</p>
    </div>
  );
}
