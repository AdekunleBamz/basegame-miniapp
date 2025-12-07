'use client'

import { useState, useEffect } from 'react'

interface MemoryGameProps {
  onScoreUpdate: (score: number) => void
  currentScore: number
}

const EMOJIS = ['🎮', '🏆', '💎', '⚡', '🔥', '🌟', '🎯', '💰']

export default function MemoryGame({ onScoreUpdate, currentScore }: MemoryGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setScore(0)
    setGameOver(false)
  }

  const startGame = () => {
    setGameStarted(true)
    initializeGame()
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const timer = setTimeout(() => {
        if (cards[flipped[0]] === cards[flipped[1]]) {
          setMatched([...matched, ...flipped])
          setScore(prev => prev + 200)
        } else {
          setScore(prev => Math.max(0, prev - 20))
        }
        setFlipped([])
        setMoves(prev => prev + 1)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [flipped, cards, matched])

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true)
      const finalScore = Math.max(0, 3200 - moves * 50)
      setScore(finalScore)
    }
  }, [matched, cards, moves])

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }
    setFlipped([...flipped, index])
  }

  const submitScore = () => {
    if (score > currentScore) {
      onScoreUpdate(score)
    }
  }

  return (
    <div className="game-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">🧠 Memory Match</h2>
      
      {!gameStarted ? (
        <div className="text-center py-12">
          <p className="text-gray-300 mb-6">
            Match all pairs with the fewest moves!
          </p>
          <button onClick={startGame} className="btn-primary">
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center text-white">
            <div>
              <span className="text-lg">Moves: </span>
              <span className="text-2xl font-bold">{moves}</span>
            </div>
            <div>
              <span className="text-lg">Matched: </span>
              <span className="text-2xl font-bold">{matched.length / 2}/{EMOJIS.length}</span>
            </div>
          </div>

          {!gameOver ? (
            <div className="grid grid-cols-4 gap-3">
              {cards.map((emoji, index) => {
                const isFlipped = flipped.includes(index) || matched.includes(index)
                return (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square text-4xl rounded-lg transition-all duration-300 ${
                      isFlipped
                        ? 'bg-white dark:bg-gray-700'
                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                    } ${matched.includes(index) ? 'opacity-50' : ''}`}
                    disabled={isFlipped}
                  >
                    {isFlipped ? emoji : '?'}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-xl mb-2">🎉 Perfect!</p>
              <p className="text-white text-xl mb-4">
                Final Score: <span className="font-bold text-3xl">{score}</span>
              </p>
              <p className="text-gray-400 mb-6">Completed in {moves} moves</p>
              {score > currentScore && (
                <button onClick={submitScore} className="btn-primary mr-4">
                  Submit Score
                </button>
              )}
              <button onClick={initializeGame} className="btn-secondary">
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
