import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Farcaster webhook received:', body)

    // Handle cast created event
    if (body.type === 'cast.created') {
      // User created a cast with the frame
      return NextResponse.json({ success: true })
    }

    // Handle button clicked event
    if (body.type === 'frame.button.clicked') {
      // User clicked a button on the frame
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
