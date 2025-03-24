import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientThemeProvider from '../components/client-theme-provider'
import { CartProvider } from '../components/shop/CartProvider'
import Cart from '../components/shop/Cart'
import Debug from '../components/Debug'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CT Studio | Premium Webentwicklung & Digitale Lösungen',
  description: 'Maßgeschneiderte Webentwicklung mit innovativen Technologien, kreativem Design und SEO-Optimierung für Ihren digitalen Erfolg.',
  keywords: 'Webdesign, Webentwicklung, SEO, React, Next.js, Premium-Websites, E-Commerce, Digitale Transformation'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          id="stripe-js"
          src="https://js.stripe.com/v3/"
          async
        ></script>
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black min-h-screen`}>
        <ClientThemeProvider>
          <CartProvider>
            {children}
            <Cart />
            {process.env.NODE_ENV !== 'production' && <Debug />}
          </CartProvider>
        </ClientThemeProvider>
      </body>
    </html>
  )
} 