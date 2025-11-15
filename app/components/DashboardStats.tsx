'use client'
export function DashboardStats({ stats }: { stats: any }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">Новые лиды: {stats.newLeads}</div>
        <div className="p-4 bg-green-100 rounded">В обработке: {stats.inProgress}</div>
        <div className="p-4 bg-yellow-100 rounded">Среднее время обработки: {stats.avgTime} ч</div>
      </div>
    );
  }
  