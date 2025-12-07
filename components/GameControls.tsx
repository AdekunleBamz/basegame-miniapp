'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, GAME_ARCADE_ABI, ENTRY_FEE } from '@/lib/contract'
import { parseEther } from 'viem'

interface GameControlsProps {
  isGameActive: boolean
  hasJoined: boolean
  playerScore: number
  onSuccess: () => void
}

export default function GameControls({
  isGameActive,
  hasJoined,
  playerScore,
  onSuccess,
}: GameControlsProps) {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { writeContract, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleJoinGame = async () => {
    if (!address) return
    setIsLoading(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: GAME_ARCADE_ABI,
        functionName: 'joinGame',
        value: parseEther(ENTRY_FEE),
      })
    } catch (error) {
      console.error('Error joining game:', error)
      setIsLoading(false)
    }
  }

  const handleStartGame = async () => {
    setIsLoading(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: GAME_ARCADE_ABI,
        functionName: 'startGame',
      })
    } catch (error) {
      console.error('Error starting game:', error)
      setIsLoading(false)
    }
  }

  const handleClaimPrize = async () => {
    setIsLoading(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: GAME_ARCADE_ABI,
        functionName: 'claimPrize',
      })
    } catch (error) {
      console.error('Error claiming prize:', error)
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    setTimeout(() => {
      onSuccess()
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="game-card">
      <h2 className="text-2xl font-bold mb-4">Game Controls</h2>

      {!isGameActive ? (
        <div className="text-center py-8">
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
            No active game. Start a new game to begin playing!
          </p>
          <button
            onClick={handleStartGame}
            disabled={isLoading || isConfirming}
            className="btn-primary"
          >
            {isLoading || isConfirming ? '⏳ Starting...' : '🎮 Start New Game'}
          </button>
        </div>
      ) : !hasJoined ? (
        <div className="text-center py-8">
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Entry Fee</p>
            <p className="text-4xl font-bold text-base-blue">{ENTRY_FEE} ETH</p>
          </div>
          <button
            onClick={handleJoinGame}
            disabled={isLoading || isConfirming}
            className="btn-primary"
          >
            {isLoading || isConfirming ? '⏳ Joining...' : '🎯 Join Game'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4">
            <p className="text-lg font-semibold text-green-800 dark:text-green-200">
              ✅ You're in the game!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Your current score: <span className="font-bold">{playerScore}</span>
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Play the game below to increase your score and climb the leaderboard!
            </p>
          </div>
        </div>
      )}

      {isConfirming && (
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          ⏳ Waiting for confirmation...
        </div>
      )}
    </div>
  )
}
