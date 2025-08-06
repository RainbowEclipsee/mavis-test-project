import Header from '@/components/Header/Header'
import '../styles/global.css'

export const metadata = { title: 'МАВИС | Графики' }

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
