import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayout } from '@/components/dom/ClientLayout'
import { DynamicIsland } from '@/components/dom/DynamicIsland'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CONSOLE LOGS BY TEJA',
  description: 'Creative Developer Portfolio',
}

import { UIProvider } from '@/context/UIContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UIProvider>
          <ClientLayout>
            <DynamicIsland />
            {children}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-100 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
          </ClientLayout>
        </UIProvider>
      </body>
    </html>
  )
}
