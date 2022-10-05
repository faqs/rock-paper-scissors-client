export type GameInfo = {
  id: number | null;
  totalRounds: number | null;
  currentRound: number | null;
  isFinished: boolean;
  gameWinner?: string;
}

export type PlayerInfo = {
  nickname: string;
}
