import { Variants } from '@/dictionary';

export type PlayerVariant = {
  playerNickname: string;
  variant: Variants;
}

export interface Round {
  firstVariant?: PlayerVariant,
  secondVariant?: PlayerVariant,
}

export interface Game {
  id: number;
  firstPlayerId: number;
  secondPlayerId?: number;
  totalRounds: number;
  currentRound: number;
  rounds: Round[],
  isFinished: boolean;
  gameWinner?: string;
}

export interface RoundResult {
  game: Game,
  winner: string;
}
