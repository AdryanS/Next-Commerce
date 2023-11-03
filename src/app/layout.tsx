import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavbarComponent } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next E-Commerce 14',
  description: 'Next E-Commerce usando next 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NavbarComponent />
        <main className='bg-slate-700 h-screen pt-16 px-8'>
          {children}
        </main>
      </body>
    </html>
  )
}
