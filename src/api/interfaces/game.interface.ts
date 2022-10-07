import { Variants } from '@/dictionary';

export type PlayerVariant = {
  playerNickname: string;
  variant: Variants;
}

export interface Round {
  firstVariant?: PlayerVariant,
  secondVariant?: PlayerVariant,
}

export interface GamePlayerInfo {
  id: number;
  nickname: string;
  isGamePaused: boolean;
}

export interface Game {
  id: number;
  firstPlayer: GamePlayerInfo;
  secondPlayer?: GamePlayerInfo;
  totalRounds: number;
  currentRound: number;
  rounds: Round[],
  isPaused: boolean;
  isFinished: boolean;
  gameWinner?: string;
}

export interface RoundResult {
  game: Game,
  winner: string;
}

export interface GameSuspenseEvent {
  game: Game;
  playerNickname: string;
}
