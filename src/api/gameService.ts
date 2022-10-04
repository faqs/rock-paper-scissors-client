import axios from 'axios';
import { ConnectToGameDto, CreateNewGameDto, MakeTurnDto } from '@/api/dto/game.dto';
import { Game } from '@/api/interfaces/game.interface';

const BASE_URL = 'http://localhost:3000';

export const gameService: {
  startNewGame: (request: CreateNewGameDto) => Promise<{data:Game}>,
  connectToGame: (request: ConnectToGameDto) => Promise<{data:Game}>,
  makeTurn: (request: MakeTurnDto) => Promise<{data:Game}>,
} = {
  startNewGame: request => axios.post(`${BASE_URL}/game`, request),
  connectToGame: request => axios.put(`${BASE_URL}/game`, request),
  makeTurn: request => axios.put(`${BASE_URL}/game/makeTurn`, request),
};
