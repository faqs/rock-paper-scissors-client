import axios from 'axios';
import { SERVICE_URL } from '@/config';
import { ConnectToGameDto, ContinueGameDto, CreateNewGameDto, MakeTurnDto, PauseGameDto } from '@/api/dto/game.dto';
import { Game } from '@/api/interfaces/game.interface';

export const gameService: {
  startNewGame: (request: CreateNewGameDto) => Promise<{data:Game}>,
  connectToGame: (request: ConnectToGameDto) => Promise<{data:Game}>,
  makeTurn: (request: MakeTurnDto) => Promise<{data:Game}>,
  pauseGame: (request: PauseGameDto) => Promise<{data:Game}>,
  continueGame: (request: ContinueGameDto) => Promise<{data:Game}>,
} = {
  startNewGame: request => axios.post(`${SERVICE_URL}/game`, request),
  connectToGame: request => axios.put(`${SERVICE_URL}/game`, request),
  makeTurn: request => axios.put(`${SERVICE_URL}/game/makeTurn`, request),
  pauseGame: request => axios.put(`${SERVICE_URL}/game/pause`, request),
  continueGame: request => axios.put(`${SERVICE_URL}/game/continue`, request),
};
