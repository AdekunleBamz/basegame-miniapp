import { NextRequest, NextResponse } from 'next/server'
import { CONTRACT_ADDRESS } from '@/lib/contract'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const baseUrl = `${url.protocol}//${url.host}`

  return new NextResponse(
    `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/og" />
    <meta property="fc:frame:button:1" content="🎮 Play Now" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${baseUrl}" />
    <meta property="fc:frame:button:2" content="🏆 Leaderboard" />
    <meta property="fc:frame:button:2:action" content="post" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame/leaderboard" />
    <meta property="og:title" content="BaseArcade - Play to Win on Base" />
    <meta property="og:description" content="Deposit 0.0001 ETH to play. Top scorer after 7 days wins the pot!" />
    <meta property="og:image" content="${baseUrl}/api/og" />
    <title>BaseArcade</title>
  </head>
  <body>
    <h1>BaseArcade</h1>
    <p>Play games, win ETH on Base blockchain!</p>
  </body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    type: 'frame',
    version: 'vNext',
    image: `${process.env.NEXT_PUBLIC_APP_URL}/api/og`,
    buttons: [
      {
        label: '🎮 Play Now',
        action: 'link',
        target: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      },
    ],
  })
}
