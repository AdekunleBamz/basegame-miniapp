import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fid, buttonIndex } = body

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (buttonIndex === 2) {
      // Leaderboard button clicked
      return NextResponse.json({
        type: 'frame',
        version: 'vNext',
        image: `${baseUrl}/api/leaderboard-image`,
        buttons: [
          {
            label: '🎮 Play Game',
            action: 'link',
            target: baseUrl,
          },
          {
            label: '🔄 Refresh',
            action: 'post',
          },
        ],
      })
    }

    return NextResponse.json({
      type: 'frame',
      version: 'vNext',
      image: `${baseUrl}/api/og`,
      buttons: [
        {
          label: '🎮 Play Now',
          action: 'link',
          target: baseUrl,
        },
        {
          label: '🏆 Leaderboard',
          action: 'post',
        },
      ],
    })
  } catch (error) {
    console.error('Frame error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
