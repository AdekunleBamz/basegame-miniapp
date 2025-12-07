# BaseArcade Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Git configured with SSH
- Vercel account (for deployment)
- WalletConnect Project ID
- Base mainnet RPC access

## Local Development

1. Clone the repository:
```bash
git clone git@github.com:your-username/base-arcade.git
cd base-arcade
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0c55c47baC21052F3802a7c92Eb4b536f47A86CC
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

4. Redeploy after setting env vars:
```bash
vercel --prod
```

## Contract Management

### Start a New Game
Call `startGame()` function from the contract owner address.

### Monitor Game State
Use the dashboard at your deployed URL to monitor:
- Current prize pool
- Number of players
- Time remaining
- Leaderboard standings

### End Game & Distribute Prize
After 7 days, call `endGame()` and the winner can call `claimPrize()`.

## Features

- ✅ Web3 wallet connection
- ✅ Join game with 0.0001 ETH
- ✅ Playable arcade game
- ✅ Live leaderboard
- ✅ Farcaster Frame integration
- ✅ Automatic prize distribution

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Wagmi v2
- RainbowKit
- Viem
- Base blockchain

## Contract Address

**Base Mainnet**: `0x0c55c47baC21052F3802a7c92Eb4b536f47A86CC`

View on BaseScan: https://basescan.org/address/0x0c55c47baC21052F3802a7c92Eb4b536f47A86CC

## Support

For issues or questions, open a GitHub issue or reach out on Farcaster!
