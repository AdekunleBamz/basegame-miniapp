export const gameVariations = [
  {
    id: 'runner',
    name: '🏎️ Arcade Runner',
    description: 'Dodge obstacles and collect points',
    difficulty: 'Medium',
  },
  {
    id: 'collector',
    name: '💎 Gem Collector',
    description: 'Collect falling gems before they disappear',
    difficulty: 'Easy',
  },
  {
    id: 'shooter',
    name: '🎯 Space Shooter',
    description: 'Shoot targets for maximum points',
    difficulty: 'Hard',
  },
]

export const achievementBadges = [
  {
    id: 'first_play',
    name: 'First Play',
    icon: '🎮',
    description: 'Played your first game',
  },
  {
    id: 'top_10',
    name: 'Top 10',
    icon: '🏅',
    description: 'Reached top 10 on leaderboard',
  },
  {
    id: 'top_3',
    name: 'Top 3',
    icon: '🥉',
    description: 'Reached top 3 on leaderboard',
  },
  {
    id: 'champion',
    name: 'Champion',
    icon: '👑',
    description: 'Won a game cycle',
  },
  {
    id: 'high_score',
    name: 'High Scorer',
    icon: '⭐',
    description: 'Scored over 10,000 points',
  },
]

export const powerUps = [
  {
    id: 'shield',
    name: 'Shield',
    icon: '🛡️',
    cost: 100,
    duration: 10,
    description: 'Protect from one collision',
  },
  {
    id: 'multiplier',
    name: '2x Score',
    icon: '✨',
    cost: 200,
    duration: 15,
    description: 'Double your score for 15 seconds',
  },
  {
    id: 'slowmo',
    name: 'Slow Motion',
    icon: '⏰',
    cost: 150,
    duration: 10,
    description: 'Slow down obstacles',
  },
]
