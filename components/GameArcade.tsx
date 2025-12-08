'use client'

import { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, GAME_ARCADE_ABI } from '@/lib/contract'
import { formatTimeRemaining, formatEther } from '@/lib/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Leaderboard from './Leaderboard'
import GameControls from './GameControls'
import GameStats from './GameStats'
import ArcadeGame from './ArcadeGame'

export default function GameArcade() {
  const { address, isConnected } = useAccount()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  const { data: gameStatus, refetch: refetchGameStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GAME_ARCADE_ABI,
    functionName: 'getGameStatus',
    query: {
      refetchInterval: 5000, // Refetch every 5 seconds
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
    },
  })

  const { data: playerData, refetch: refetchPlayer } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GAME_ARCADE_ABI,
    functionName: 'getPlayer',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000, // Refetch every 5 seconds (avoid rate limits)
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
    },
  })

  // Debug logging
  useEffect(() => {
    if (playerData) {
      console.log('Player Data:', {
        address: (playerData as any)?.[0],
        score: (playerData as any)?.[1]?.toString(),
        depositAmount: (playerData as any)?.[2]?.toString(),
        lastPlayTime: (playerData as any)?.[3]?.toString(),
        hasPlayed: (playerData as any)?.[4],
      })
    }
  }, [playerData])

  // Debug game status
  useEffect(() => {
    if (gameStatus) {
      console.log('Game Status:', {
        isActive: (gameStatus as any)?.[0],
        gameId: (gameStatus as any)?.[1]?.toString(),
        endTime: (gameStatus as any)?.[2]?.toString(),
        totalPot: (gameStatus as any)?.[3]?.toString(),
        currentLeader: (gameStatus as any)?.[4],
        topScore: (gameStatus as any)?.[5]?.toString(),
        totalPlayers: (gameStatus as any)?.[6]?.toString(),
      })
    }
  }, [gameStatus])

  const { data: leaderboardData, refetch: refetchLeaderboard } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GAME_ARCADE_ABI,
    functionName: 'getLeaderboard',
    query: {
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStatus && gameStatus[0]) {
        const endTime = Number(gameStatus[2])
        const now = Math.floor(Date.now() / 1000)
        const remaining = Math.max(0, endTime - now)
        setTimeRemaining(remaining)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStatus])

  const refreshData = async () => {
    console.log('🔄 Force refreshing all data...')
    await Promise.all([
      refetchGameStatus(),
      refetchPlayer(),
      refetchLeaderboard(),
    ])
    console.log('✅ Data refreshed')
  }

  const isGameActive = (gameStatus as any)?.[0] || false
  const totalPot = (gameStatus as any)?.[3] || BigInt(0)
  const currentLeader = (gameStatus as any)?.[4] || ''
  const topScore = (gameStatus as any)?.[5] || BigInt(0)
  const totalPlayers = (gameStatus as any)?.[6] || BigInt(0)

  // The contract's Player struct is: [playerAddress, score, depositAmount, lastPlayTime, hasPlayed]
  // Use `depositAmount` (index 2) as the indicator that a user has joined (paid the entry fee),
  // but also ensure the on-chain player address matches the connected wallet address.
  const depositAmount = (playerData as any)?.[2] ?? BigInt(0)
  const onChainPlayerAddress = ((playerData as any)?.[0] || '').toString().toLowerCase()
  const connectedAddr = (address || '').toString().toLowerCase()
  
  // Primary check: deposit amount from getPlayer
  const hasJoinedFromPlayer = depositAmount > BigInt(0) && onChainPlayerAddress === connectedAddr
  
  // Fallback check: if player appears in leaderboard, they've joined
  const leaderboard = (leaderboardData as any) || []
  const isInLeaderboard = leaderboard.some((entry: any) => {
    const entryAddr = (entry?.[0] || '').toString().toLowerCase()
    return entryAddr === connectedAddr
  })
  
  // Combined check: use either method
  const hasJoined = hasJoinedFromPlayer || isInLeaderboard

  // Console debug (non-UI) to help diagnose mismatched addresses or stale reads.
  // This prints only to the browser console and helps confirm whether the
  // connected wallet address matches the on-chain player record.
  useEffect(() => {
    console.debug('GameArcade debug:', {
      connectedAddr,
      onChainPlayerAddress,
      depositAmount: depositAmount?.toString?.() ?? String(depositAmount),
      hasJoinedFromPlayer,
      isInLeaderboard,
      hasJoined,
      gameStatus,
    })
  }, [connectedAddr, onChainPlayerAddress, depositAmount, hasJoinedFromPlayer, isInLeaderboard, hasJoined, gameStatus])

  const playerScore = (playerData as any)?.[1] || BigInt(0)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 BaseArcade
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Play to Win on Base • 0.0001 ETH Entry • Winner Takes All
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>

        {/* Game Status Bar */}
        {isGameActive && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm opacity-80">Time Remaining</p>
                <p className="text-2xl font-bold">{formatTimeRemaining(timeRemaining)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Prize Pool</p>
                <p className="text-2xl font-bold">{formatEther(totalPot)} ETH</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Players</p>
                <p className="text-2xl font-bold">{totalPlayers.toString()}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Top Score</p>
                <p className="text-2xl font-bold">{topScore.toString()}</p>
              </div>
            </div>
          </div>
        )}

        {!isConnected ? (
          <div className="game-card text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet to Play</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect your wallet to join the game and compete for the prize pool!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Game Controls & Game */}
            <div className="lg:col-span-2 space-y-6">
              <GameControls
                isGameActive={isGameActive}
                hasJoined={hasJoined}
                playerScore={Number(playerScore)}
                onSuccess={refreshData}
              />

              {hasJoined && isGameActive && (
                <ArcadeGame
                  currentScore={Number(playerScore)}
                  onScoreUpdate={refreshData}
                />
              )}

              <GameStats
                totalPot={totalPot}
                totalPlayers={Number(totalPlayers)}
                timeRemaining={timeRemaining}
                isGameActive={isGameActive}
              />
            </div>

            {/* Right Column - Leaderboard */}
            <div className="lg:col-span-1">
              <Leaderboard
                leaderboardData={leaderboardData}
                currentUserAddress={address}
                currentLeader={currentLeader}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
