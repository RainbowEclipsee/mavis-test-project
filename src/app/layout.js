import '../styles/global.css'

export const metadata = { title: 'Schedule App' };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}