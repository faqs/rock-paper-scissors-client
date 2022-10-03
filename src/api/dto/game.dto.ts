export type CreateNewGameDto = {
  playerNickname: string;
  totalRounds: number;
}

export type ConnectToGameDto = {
  playerNickname: string;
  gameId: number;
}
