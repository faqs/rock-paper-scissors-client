import { Variants } from '@/dictionary';

export type CreateNewGameDto = {
  playerNickname: string;
  totalRounds: number;
}

export type ConnectToGameDto = {
  playerNickname: string;
  gameId: number;
}

export type MakeTurnDto = {
  playerNickname: string;
  variant: Variants;
  gameId: number;
}

export type PauseGameDto = {
  playerNickname: string;
  gameId: number;
}

export type ContinueGameDto = {
  playerNickname: string;
  gameId: number;
}
