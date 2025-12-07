import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BaseArcade - Play to Win on Base',
  description: 'Competitive game arcade on Base blockchain. Deposit 0.0001 ETH, play for 7 days, and the top scorer wins the pot!',
  keywords: ['base', 'blockchain', 'game', 'arcade', 'ethereum', 'web3', 'crypto', 'play to earn'],
  authors: [{ name: 'BaseArcade' }],
  creator: 'BaseArcade',
  publisher: 'BaseArcade',
  manifest: '/manifest.json',
  openGraph: {
    title: 'BaseArcade - Play to Win on Base',
    description: 'Competitive game arcade on Base blockchain',
    images: ['/og-image.png'],
    type: 'website',
    siteName: 'BaseArcade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaseArcade - Play to Win on Base',
    description: 'Competitive game arcade on Base blockchain',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': process.env.NEXT_PUBLIC_APP_URL + '/api/og',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
