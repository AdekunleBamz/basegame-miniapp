import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BaseArcade - Play to Win on Base',
  description: 'Play arcade games and win crypto prizes. Join the 7-day competition on Base blockchain.',
  keywords: ['base', 'blockchain', 'game', 'arcade', 'ethereum', 'web3', 'crypto', 'play to earn'],
  authors: [{ name: 'BaseArcade' }],
  creator: 'BaseArcade',
  publisher: 'BaseArcade',
  metadataBase: new URL('https://basegame-miniapp.vercel.app'),
  openGraph: {
    title: 'BaseArcade',
    description: 'Play arcade games and win crypto prizes. Join the 7-day competition on Base blockchain.',
    url: 'https://basegame-miniapp.vercel.app',
    siteName: 'BaseArcade',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BaseArcade',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaseArcade',
    description: 'Play arcade games and win crypto prizes',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [{ url: '/icon.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph - Basic metadata */}
        <meta property="og:title" content="BaseArcade" />
        <meta property="og:description" content="Play arcade games and win crypto prizes on Base blockchain" />
        <meta property="og:image" content="https://basegame-miniapp.vercel.app/og-1200x630.png" />
        <meta property="og:url" content="https://basegame-miniapp.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Farcaster Mini App - REQUIRED for embed validation */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://basegame-miniapp.vercel.app/og-1200x630.png","button":{"title":"Play BaseArcade","action":{"type":"launch_miniapp","url":"https://basegame-miniapp.vercel.app","splashImageUrl":"https://basegame-miniapp.vercel.app/splash.png","splashBackgroundColor":"#6366f1"}}}' />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
