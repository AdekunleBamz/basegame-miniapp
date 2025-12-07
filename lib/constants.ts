export const SUPPORTED_CHAINS = {
  BASE_MAINNET: 8453,
  BASE_SEPOLIA: 84532,
} as const

export const RPC_URLS = {
  [SUPPORTED_CHAINS.BASE_MAINNET]: 'https://mainnet.base.org',
  [SUPPORTED_CHAINS.BASE_SEPOLIA]: 'https://sepolia.base.org',
} as const

export const BLOCK_EXPLORERS = {
  [SUPPORTED_CHAINS.BASE_MAINNET]: 'https://basescan.org',
  [SUPPORTED_CHAINS.BASE_SEPOLIA]: 'https://sepolia.basescan.org',
} as const

export const ENTRY_FEE_WEI = BigInt(100000000000000) // 0.0001 ETH
export const ENTRY_FEE_ETH = '0.0001'
export const GAME_DURATION_DAYS = 7
export const GAME_DURATION_SECONDS = 7 * 24 * 60 * 60

export const REFRESH_INTERVAL = 5000 // 5 seconds
export const COUNTDOWN_INTERVAL = 1000 // 1 second
