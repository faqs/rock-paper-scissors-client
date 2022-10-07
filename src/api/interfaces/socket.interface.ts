import { GameSuspenseEvent, RoundResult } from '@/api/interfaces/game.interface';

export interface ServerToClientEvents {
  roundResult: (roundResult: RoundResult) => void;
  gamePaused: (eventData: GameSuspenseEvent) => void;
  gameContinued: (eventData: GameSuspenseEvent) => void;
}
