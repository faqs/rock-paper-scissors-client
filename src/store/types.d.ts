type GamePlayerInfo = {
  id: number;
  nickname: string;
  isGamePaused: boolean;
}

export type GameInfo = {
  id: number | null;
  firstPlayer?: GamePlayerInfo;
  secondPlayer?: GamePlayerInfo;
  totalRounds: number | null;
  currentRound: number | null;
  isPaused: boolean;
  isFinished: boolean;
  gameWinner?: string;
}

export type PlayerInfo = {
  nickname: string;
}
