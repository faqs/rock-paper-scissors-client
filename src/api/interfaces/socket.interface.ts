import { RoundResult } from '@/api/interfaces/game.interface';

export interface ServerToClientEvents {
  roundResult: (roundResult: RoundResult) => void;
}
