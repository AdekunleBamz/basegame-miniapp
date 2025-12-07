export interface Player {
  playerAddress: string;
  score: bigint;
  depositAmount: bigint;
  lastPlayTime: bigint;
  hasPlayed: boolean;
}

export interface GameStatus {
  active: boolean;
  startTime: bigint;
  endTime: bigint;
  pot: bigint;
  leader: string;
  topScore: bigint;
  totalPlayers: bigint;
}

export interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
  isCurrentUser?: boolean;
}
