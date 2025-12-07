'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🎮 BaseArcade</h3>
            <p className="text-gray-400 text-sm">
              The first competitive game arcade on Base blockchain. Play, compete, and win ETH!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://basescan.org/address/0x0c55c47baC21052F3802a7c92Eb4b536f47A86CC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  View Contract ↗
                </a>
              </li>
              <li>
                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  Base Network ↗
                </a>
              </li>
              <li>
                <a href="/api/frame" className="text-gray-400 hover:text-white transition">
                  Farcaster Frame
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/AdekunleBamz/basegame-miniapp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://twitter.com/basearcade" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  Twitter ↗
                </a>
              </li>
              <li>
                <a href="https://warpcast.com/basearcade" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  Farcaster ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} BaseArcade. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with ❤️ on <span className="text-blue-400">Base</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
