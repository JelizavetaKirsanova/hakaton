import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8">Система автоматического распределения лидов</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Кнопка на страницу лидов */}
        <Link
          href="/leads"
          className="p-6 bg-white rounded shadow hover:bg-blue-50 transition text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Лиды</h2>
          <p>Просмотр и управление всеми лидами</p>
        </Link>

        {/* Кнопка на страницу менеджеров */}
        <Link
          href="/managers"
          className="p-6 bg-white rounded shadow hover:bg-green-50 transition text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Менеджеры</h2>
          <p>Список менеджеров и их загрузка</p>
        </Link>

        {/* Кнопка на панель координатора */}
        <Link
          href="/coordinator"
          className="p-6 bg-white rounded shadow hover:bg-yellow-50 transition text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Координатор</h2>
          <p>Мониторинг и управление распределением лидов</p>
        </Link>
      </div>
    </div>
  );
}
