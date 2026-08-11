import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/hooks/useCart'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sushi Dendermonde — Vers, Premium & Authentiek',
  description:
    'Bestel verse sushi online of reserveer een tafel bij Sushi Dendermonde. Premium kwaliteit, authentieke Japanse bereiding.',
  keywords: 'sushi, Dendermonde, online bestellen, tafel reserveren, Japans restaurant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
