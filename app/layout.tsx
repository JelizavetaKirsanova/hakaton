import '../styles/globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow p-4 flex space-x-4">
          <Link href="/leads" className="font-medium hover:text-blue-500">Лиды</Link>
          <Link href="/managers" className="font-medium hover:text-green-500">Менеджеры</Link>
          <Link href="/coordinator" className="font-medium hover:text-yellow-500">Координатор</Link>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
