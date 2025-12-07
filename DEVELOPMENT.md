# BaseArcade - Development Notes

## Project Structure

```
basearcade/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── ArcadeGame.tsx    # Game logic
│   ├── GameArcade.tsx    # Main game component
│   ├── Leaderboard.tsx   # Leaderboard display
│   └── ...
├── lib/                   # Utilities
│   ├── contract.ts        # Contract ABI & config
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Development Workflow

1. **Setup**:
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

2. **Testing**: Test locally at http://localhost:3000

3. **Building**: `npm run build`

4. **Deployment**: Push to main branch for auto-deploy

## Smart Contract Integration

- **Contract**: `0x0c55c47baC21052F3802a7c92Eb4b536f47A86CC`
- **Chain**: Base Mainnet (8453)
- **Functions**:
  - `joinGame()` - Entry with 0.0001 ETH
  - `updateScore(uint256)` - Submit score
  - `claimPrize()` - Winner claims pot
  - `getGameStatus()` - Get current state

## Key Features Implementation

### Game Mechanics
- Keyboard-controlled runner game
- Real-time scoring
- Obstacle avoidance
- Score submission to blockchain

### Web3 Integration
- Wagmi hooks for contract calls
- RainbowKit for wallet connection
- Viem for type-safe contract interactions

### Farcaster Integration
- Frame metadata in layout
- OG image generation
- Social sharing capabilities

## Performance Optimizations

- Server-side rendering for initial load
- Client-side hydration for interactivity
- Lazy loading of game components
- Optimized bundle size with tree shaking

## Security Considerations

- No private keys in frontend
- Environment variables for sensitive data
- Input validation on all forms
- XSS protection via React
- CORS headers on API routes

## Future Enhancements

- [ ] Multiple game modes
- [ ] NFT rewards for winners
- [ ] Tournament brackets
- [ ] Social features (friends, chat)
- [ ] Mobile app (React Native)
- [ ] Achievement system
- [ ] Referral program

## Common Issues & Solutions

**Issue**: Wallet won't connect
- Solution: Check WalletConnect Project ID

**Issue**: Transactions failing
- Solution: Ensure sufficient ETH for gas

**Issue**: Scores not updating
- Solution: Wait for transaction confirmation

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run lint            # Lint code
npm run format          # Format with Prettier
npm run type-check      # TypeScript check

# Production
npm run build           # Build for production
npm start              # Start production server

# Git
git status             # Check changes
git add .              # Stage all changes
git commit -m "msg"    # Commit with message
git push origin main   # Push to GitHub
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [Base Docs](https://docs.base.org)
- [Farcaster Frames](https://docs.farcaster.xyz/reference/frames/spec)
