import { ReactNode } from 'react'

import Header from '@/components/Header/Header'
import '../styles/global.css'

export const metadata = { title: 'МАВИС | Графики' }

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
