'use client'

import { useState } from 'react'

interface GameInstructionsProps {
  onClose: () => void
}

export default function GameInstructions({ onClose }: GameInstructionsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="game-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">📚 How to Play</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-bold text-white mb-3">🎮 Game Rules</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Deposit 0.0001 ETH to join the current game</li>
              <li>Each game lasts exactly 7 days</li>
              <li>Play the arcade runner to earn points</li>
              <li>Your highest score is recorded on-chain</li>
              <li>The player with the highest score wins!</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">🕹️ Game Controls</h3>
            <ul className="space-y-2">
              <li><kbd className="px-2 py-1 bg-gray-700 rounded">←</kbd> Move Left</li>
              <li><kbd className="px-2 py-1 bg-gray-700 rounded">→</kbd> Move Right</li>
              <li><kbd className="px-2 py-1 bg-gray-700 rounded">Space</kbd> Boost (earn extra points)</li>
              <li>🚗 Avoid obstacles (💥) to keep playing</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">💰 Prize Pool</h3>
            <p className="mb-2">
              All entry fees go into a prize pool. When the 7-day timer ends:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>The #1 player on the leaderboard wins the entire pot</li>
              <li>Winner must claim their prize manually</li>
              <li>A new game starts automatically</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">⚡ Strategy Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Practice makes perfect - play multiple times</li>
              <li>Use boosts strategically for max points</li>
              <li>Watch the leaderboard to track competition</li>
              <li>Submit your best score before time runs out</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">🔒 Smart Contract</h3>
            <p className="mb-2">
              BaseArcade is fully decentralized and trustless:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>All game logic is on-chain</li>
              <li>No one can manipulate results</li>
              <li>Contract: <code className="text-xs bg-gray-700 px-1 rounded">0x0c55...86CC</code></li>
              <li>Verified on BaseScan</li>
            </ul>
          </section>
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full mt-6"
        >
          Got it! Let's Play
        </button>
      </div>
    </div>
  )
}

export function HelpButton() {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowInstructions(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-40 text-2xl"
        title="Help"
      >
        ?
      </button>

      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
    </>
  )
}
