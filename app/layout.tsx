import '../styles/globals.css';

export const metadata = {
  title: 'CRM Лидов',
  description: 'Система автоматического распределения лидов',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
