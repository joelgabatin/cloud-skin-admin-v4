import type { Metadata } from 'next'
import { DM_Sans, Inter, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-quote',
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Cloud Skin Admin Portal',
  description: 'Cloud Skin Clinic + Wellness - Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${jetBrainsMono.variable} ${cormorantGaramond.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
