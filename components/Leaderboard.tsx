'use client'

import { formatAddress } from '@/lib/utils'

interface LeaderboardProps {
  leaderboardData: readonly [readonly `0x${string}`[], readonly bigint[]] | undefined
  currentUserAddress: `0x${string}` | undefined
  currentLeader: string
}

export default function Leaderboard({
  leaderboardData,
  currentUserAddress,
  currentLeader,
}: LeaderboardProps) {
  const addresses = leaderboardData?.[0] || []
  const scores = leaderboardData?.[1] || []

  // Combine and sort leaderboard
  const leaderboard = addresses
    .map((addr, idx) => ({
      address: addr,
      score: Number(scores[idx] || BigInt(0)),
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, idx) => ({ ...entry, rank: idx + 1 }))

  return (
    <div className="game-card sticky top-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🏆 Leaderboard
      </h2>

      {leaderboard.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No players yet. Be the first to join!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry) => {
            const isCurrentUser =
              currentUserAddress?.toLowerCase() === entry.address.toLowerCase()
            const isLeader =
              currentLeader?.toLowerCase() === entry.address.toLowerCase()

            return (
              <div
                key={entry.address}
                className={`leaderboard-item ${
                  isLeader ? 'pulse-win border-2 border-yellow-400' : ''
                } ${isCurrentUser ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl font-bold ${
                      entry.rank === 1
                        ? 'text-yellow-500'
                        : entry.rank === 2
                        ? 'text-gray-400'
                        : entry.rank === 3
                        ? 'text-orange-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {formatAddress(entry.address)}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                          You
                        </span>
                      )}
                      {isLeader && (
                        <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                          👑 Leader
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Score: {entry.score.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
