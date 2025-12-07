import { useEffect, useCallback } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, GAME_ARCADE_ABI } from '@/lib/contract'
import type { Address } from 'viem'

export function useJoinGame(onSuccess?: () => void) {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const joinGame = useCallback(() => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GAME_ARCADE_ABI,
      functionName: 'joinGame',
      value: BigInt(100000000000000), // 0.0001 ETH in wei
    })
  }, [writeContract])

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess()
    }
  }, [isSuccess, onSuccess])

  return {
    joinGame,
    isLoading: isPending || isConfirming,
    isSuccess,
    error,
  }
}

export function useUpdateScore(onSuccess?: () => void) {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateScore = useCallback((score: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GAME_ARCADE_ABI,
      functionName: 'updateScore',
      args: [BigInt(score)],
    })
  }, [writeContract])

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess()
    }
  }, [isSuccess, onSuccess])

  return {
    updateScore,
    isLoading: isPending || isConfirming,
    isSuccess,
    error,
  }
}

export function useClaimPrize(onSuccess?: () => void) {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimPrize = useCallback(() => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GAME_ARCADE_ABI,
      functionName: 'claimPrize',
    })
  }, [writeContract])

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess()
    }
  }, [isSuccess, onSuccess])

  return {
    claimPrize,
    isLoading: isPending || isConfirming,
    isSuccess,
    error,
  }
}
