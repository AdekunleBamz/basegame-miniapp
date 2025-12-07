'use client'

import { useState, useEffect, useCallback } from 'react'

interface ColorMatchGameProps {
  onScoreUpdate: (score: number) => void
  currentScore: number
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
const GAME_DURATION = 30 // seconds

export default function ColorMatchGame({ onScoreUpdate, currentScore }: ColorMatchGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [targetColor, setTargetColor] = useState(COLORS[0])
  const [options, setOptions] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)

  const generateNewRound = useCallback(() => {
    const target = COLORS[Math.floor(Math.random() * COLORS.length)]
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5).slice(0, 4)
    if (!shuffled.includes(target)) {
      shuffled[Math.floor(Math.random() * 4)] = target
    }
    setTargetColor(target)
    setOptions(shuffled)
  }, [])

  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setGameStarted(true)
    setGameOver(false)
    generateNewRound()
  }

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          setGameStarted(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver])

  const handleColorClick = (color: string) => {
    if (color === targetColor) {
      setScore(prev => prev + 100)
      generateNewRound()
    } else {
      setScore(prev => Math.max(0, prev - 50))
    }
  }

  const submitScore = () => {
    if (score > currentScore) {
      onScoreUpdate(score)
    }
  }

  return (
    <div className="game-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">🎨 Color Match</h2>
      
      {!gameStarted && !gameOver ? (
        <div className="text-center py-12">
          <p className="text-gray-300 mb-6">
            Click the matching color as fast as you can!
          </p>
          <button onClick={startGame} className="btn-primary">
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center text-white">
            <div>
              <span className="text-lg">Score: </span>
              <span className="text-2xl font-bold">{score}</span>
            </div>
            <div>
              <span className="text-lg">Time: </span>
              <span className="text-2xl font-bold">{timeLeft}s</span>
            </div>
          </div>

          {!gameOver ? (
            <>
              <div className="mb-6 text-center">
                <p className="text-white mb-4 text-lg">Match this color:</p>
                <div
                  className="w-32 h-32 mx-auto rounded-lg shadow-lg"
                  style={{ backgroundColor: targetColor }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {options.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorClick(color)}
                    className="w-full h-32 rounded-lg shadow-lg hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-xl mb-4">
                Final Score: <span className="font-bold text-3xl">{score}</span>
              </p>
              {score > currentScore && (
                <button onClick={submitScore} className="btn-primary mr-4">
                  Submit Score
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
