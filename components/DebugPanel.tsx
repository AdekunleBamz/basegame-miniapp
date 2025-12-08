"use client"

import React from 'react'
import { useAccount } from 'wagmi'

interface DebugPanelProps {
  address?: string | null
  playerData?: any
  gameStatus?: any
  onRefresh: () => void
}

export default function DebugPanel({ address, playerData, gameStatus, onRefresh }: DebugPanelProps) {
  const sdkPresent = typeof window !== 'undefined' && !!(window as any).__FARCASTER_SDK__
  const providerPresent = typeof window !== 'undefined' && !!(window as any).ethereum

  const depositAmount = (playerData as any)?.[2]
  const depositStr = depositAmount ? depositAmount.toString?.() ?? String(depositAmount) : '0'

  return (
    <div style={{position: 'fixed', right: 12, bottom: 12, zIndex: 9999}}>
      <div className="bg-black/70 text-white p-3 rounded-lg text-sm shadow-lg">
        <div><strong>Farcaster SDK:</strong> {sdkPresent ? 'available' : 'not found'}</div>
        <div><strong>Provider:</strong> {providerPresent ? 'available' : 'not found'}</div>
        <div><strong>Account:</strong> {address ?? '—'}</div>
        <div><strong>Deposit:</strong> {depositStr}</div>
        <div style={{marginTop: 8}}>
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
          >
            Force refresh
          </button>
        </div>
      </div>
    </div>
  )
}
