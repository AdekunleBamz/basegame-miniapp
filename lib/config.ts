import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet, walletConnectWallet, rainbowWallet],
    },
  ],
  {
    appName: 'BaseArcade',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'default',
  }
)

export const config = createConfig({
  connectors: [...connectors(), miniAppConnector()],
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
