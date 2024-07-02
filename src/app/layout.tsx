import { Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const title = 'expense.namk.dev – Track your expenses with ease'
const description = 'Effortlessly Track and Manage Expenses.'

export const metadata = {
  title,
  description,
  manifest: 'https://expense.namk.dev/manifest.json',
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@gokul_i',
    images: ['https://expense.namk.dev/og.jpg'],
  },
  openGraph: {
    title,
    description,
    url: 'https://expense.namk.dev',
    type: 'website',
    images: ['https://expense.namk.dev/og.jpg'],
  },
  icons: {
    icon: 'https://expense.namk.dev/icons/icon.svg',
    shortcut: 'https://expense.namk.dev/favicon.ico',
    apple: 'https://expense.namk.dev/icons/apple-icon.png',
  },
  appleWebApp: {
    title,
    statusBarStyle: 'black',
    startupImage: ['https://expense.namk.dev/icons/apple-icon.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  themeColor: '#09090b',
}

export const revalidate = 0

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>
        {children}
      </body>
    </html>
  )
}
