import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    // In production, fetch real leaderboard data from contract
    const topPlayers = [
      { address: '0x1234...5678', score: 15234 },
      { address: '0xabcd...efgh', score: 12890 },
      { address: '0x9876...4321', score: 11456 },
    ]

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
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '40px',
            }}
          >
            🏆 Leaderboard
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '80%',
            }}
          >
            {topPlayers.map((player, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '20px 40px',
                  borderRadius: '15px',
                  color: 'white',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '36px' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div style={{ fontSize: '28px' }}>{player.address}</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {player.score.toLocaleString()}
                </div>
              </div>
            ))}
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
    return new Response('Failed to generate image', { status: 500 })
  }
}
