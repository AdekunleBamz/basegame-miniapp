'use client'

import { formatTime, formatEth } from '@/lib/utils'

interface GameStatsProps {
  totalPot: bigint
  totalPlayers: number
  timeRemaining: number
  isGameActive: boolean
}

export default function GameStats({
  totalPot,
  totalPlayers,
  timeRemaining,
  isGameActive,
}: GameStatsProps) {
  return (
    <div className="game-card">
      <h2 className="text-2xl font-bold mb-4">📊 Game Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
          <p className="text-lg font-bold">
            {isGameActive ? '🟢 Active' : '🔴 Inactive'}
          </p>
        </div>

        <div className="text-center p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Prize Pool</p>
          <p className="text-lg font-bold">{formatEth(totalPot)} ETH</p>
        </div>

        <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Players</p>
          <p className="text-lg font-bold">{totalPlayers}</p>
        </div>

        <div className="text-center p-4 bg-orange-100 dark:bg-orange-900 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Left</p>
          <p className="text-lg font-bold">
            {isGameActive ? formatTime(timeRemaining) : '--'}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">How to Play</h3>
        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
          <li>1️⃣ Deposit 0.0001 ETH to join the game</li>
          <li>2️⃣ Play the arcade game to earn points</li>
          <li>3️⃣ Climb the leaderboard to rank #1</li>
          <li>4️⃣ Top player after 7 days wins the entire pot!</li>
        </ul>
      </div>
    </div>
  )
}
