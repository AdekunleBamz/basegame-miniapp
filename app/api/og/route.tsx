import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a0b2e',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                marginBottom: '20px',
              }}
            >
              🎮 BaseArcade
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#e0e0e0',
                textAlign: 'center',
                maxWidth: '800px',
                marginBottom: '30px',
              }}
            >
              Play to Win on Base Blockchain
            </p>
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '20px 40px',
                  borderRadius: '15px',
                }}
              >
                <div style={{ fontSize: '24px', color: '#b0b0b0' }}>Entry Fee</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
                  0.0001 ETH
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '20px 40px',
                  borderRadius: '15px',
                }}
              >
                <div style={{ fontSize: '24px', color: '#b0b0b0' }}>Game Duration</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
                  7 Days
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '20px 40px',
                  borderRadius: '15px',
                }}
              >
                <div style={{ fontSize: '24px', color: '#b0b0b0' }}>Prize</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFD700' }}>
                  Winner Takes All
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error(error)
    return new NextResponse('Failed to generate image', { status: 500 })
  }
}
