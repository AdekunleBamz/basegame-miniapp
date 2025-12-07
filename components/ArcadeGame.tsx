'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, GAME_ARCADE_ABI } from '@/lib/contract'

interface ArcadeGameProps {
  onScoreUpdate: () => void
  currentScore: number
}

export default function ArcadeGame({ onScoreUpdate, currentScore }: ArcadeGameProps) {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [position, setPosition] = useState(50) // Player position (percentage)
  const [obstacles, setObstacles] = useState<{ id: number; position: number; lane: number }[]>([])
  const [gameOver, setGameOver] = useState(false)

  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Start game
  const startGame = () => {
    setScore(0)
    setGameStarted(true)
    setGameOver(false)
    setObstacles([])
  }

  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && position > 10) {
        setPosition(prev => prev - 20)
      } else if (e.key === 'ArrowRight' && position < 90) {
        setPosition(prev => prev + 20)
      } else if (e.key === ' ') {
        setScore(prev => prev + 10)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameOver, position])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameInterval = setInterval(() => {
      setScore(prev => prev + 1)
      
      // Add obstacles
      if (Math.random() < 0.3) {
        setObstacles(prev => [
          ...prev,
          {
            id: Date.now(),
            position: 0,
            lane: Math.floor(Math.random() * 5) * 20 + 10
          }
        ])
      }

      // Move obstacles and check collisions
      setObstacles(prev => {
        const newObstacles = prev
          .map(obs => ({ ...obs, position: obs.position + 5 }))
          .filter(obs => {
            if (obs.position > 90 && obs.position < 110 && Math.abs(obs.lane - position) < 15) {
              setGameOver(true)
              return false
            }
            return obs.position < 100
          })
        return newObstacles
      })
    }, 100)

    return () => clearInterval(gameInterval)
  }, [gameStarted, gameOver, position])

  // Submit score
  const submitScore = async () => {
    if (score > currentScore) {
      try {
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: GAME_ARCADE_ABI,
          functionName: 'updateScore',
          args: [BigInt(score)],
        })
      } catch (error) {
        console.error('Error submitting score:', error)
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onScoreUpdate()
    }
  }, [isSuccess, onScoreUpdate])

  return (
    <div className="game-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">🏎️ Arcade Runner</h2>
      
      {!gameStarted ? (
        <div className="text-center py-12">
          <p className="text-gray-300 mb-6">
            Use ← → arrows to move, SPACE to boost!
          </p>
          <button
            onClick={startGame}
            className="btn-primary"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-white">
              <span className="text-lg">Score: </span>
              <span className="text-2xl font-bold">{score}</span>
            </div>
            {gameOver && (
              <div className="text-red-400 font-bold">GAME OVER!</div>
            )}
          </div>

          {/* Game Canvas */}
          <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Road */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-full h-full relative">
                {/* Lane markers */}
                <div className="absolute inset-0 flex justify-around">
                  {[0, 1, 2, 3, 4].map((lane) => (
                    <div key={lane} className="w-1 h-full border-l-2 border-dashed border-gray-600 opacity-50" />
                  ))}
                </div>

                {/* Player */}
                <div
                  className="absolute bottom-10 w-12 h-12 bg-blue-500 rounded-lg transition-all duration-100 flex items-center justify-center text-2xl"
                  style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                >
                  🏎️
                </div>

                {/* Obstacles */}
                {obstacles.map(obs => (
                  <div
                    key={obs.id}
                    className="absolute w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-2xl"
                    style={{
                      left: `${obs.lane}%`,
                      top: `${obs.position}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    💥
                  </div>
                ))}
              </div>
            </div>
          </div>

          {gameOver && (
            <div className="mt-4 text-center">
              <p className="text-white mb-4">
                Final Score: <span className="font-bold text-2xl">{score}</span>
              </p>
              {score > currentScore && (
                <button
                  onClick={submitScore}
                  disabled={isConfirming}
                  className="btn-primary mr-4"
                >
                  {isConfirming ? 'Submitting...' : 'Submit Score'}
                </button>
              )}
              <button onClick={startGame} className="btn-secondary">
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
