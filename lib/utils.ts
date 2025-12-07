export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEth = (wei: bigint): string => {
  const eth = Number(wei) / 1e18;
  return eth.toFixed(4);
};

export const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const formatTimeRemaining = formatTime;
export const formatEther = formatEth;

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export const calculateRank = (score: number, allScores: number[]): number => {
  const sorted = [...allScores].sort((a, b) => b - a);
  return sorted.indexOf(score) + 1;
};
