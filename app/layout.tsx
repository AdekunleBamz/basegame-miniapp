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
    images: ['https://basegame-miniapp.vercel.app/og-image.png'],
    type: 'website',
    siteName: 'BaseArcade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaseArcade - Play to Win on Base',
    description: 'Competitive game arcade on Base blockchain',
    images: ['https://basegame-miniapp.vercel.app/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [{ url: '/icon.png' }],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://basegame-miniapp.vercel.app/api/og',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://basegame-miniapp.vercel.app',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph tags for embed preview */}
        <meta property="og:title" content="BaseArcade" />
        <meta property="og:description" content="Play arcade games and win crypto prizes. Join the 7-day competition on Base blockchain." />
        <meta property="og:image" content="https://basegame-miniapp.vercel.app/og-image.png" />
        <meta property="og:url" content="https://basegame-miniapp.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BaseArcade" />
        <meta name="twitter:description" content="Play arcade games and win crypto prizes" />
        <meta name="twitter:image" content="https://basegame-miniapp.vercel.app/og-image.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
