import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AnnouncementBar from '@/components/layout/announcement-bar'
import { Toaster } from 'sonner'
import CookieConsent from '@/components/cookie-consent'
import { AnalyticsProvider } from '@/components/analytics-provider'
import ElementPickerListener from '@/components/element-picker-listener'

const heading = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AutoEdge — Premium Car Accessories',
    template: '%s | AutoEdge',
  },
  description:
    'Upgrade your ride with AutoEdge — premium car accessories engineered for performance, protection, and style.',
  openGraph: {
    siteName: 'AutoEdge',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>
          <ElementPickerListener />
          <AnnouncementBar />
          <Header />
          <main>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </main>
          <Footer />
          <CookieConsent />
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
