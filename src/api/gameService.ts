import axios from 'axios';
import { ConnectToGameDto, CreateNewGameDto } from '@/api/dto/game.dto';
import { Game } from '@/api/interfaces/game.interface';

const BASE_URL = 'http://localhost:3000';

export const gameService: {
  startNewGame: (request: CreateNewGameDto) => Promise<{data:Game}>,
  connectToGame: (request: ConnectToGameDto) => Promise<{data:Game}>,
} = {
  startNewGame: request => axios.post(`${BASE_URL}/game`, request),
  connectToGame: request => axios.put(`${BASE_URL}/game`, request),
};
