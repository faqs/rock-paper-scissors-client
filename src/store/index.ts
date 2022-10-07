import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { GameInfo, PlayerInfo } from '@/store/types';
import { Game } from '@/api/interfaces/game.interface';

const state: {
  game: GameInfo,
  player: PlayerInfo,
} = {
  game: {
    id: null,
    totalRounds: null,
    currentRound: null,
    isPaused: false,
    isFinished: false,
  },
  player: {
    nickname: '',
  },
};

export default createStore({
  state,
  mutations: {
    setGameInfo(state, gameInfo: Game) {
      state.game = {
        id: gameInfo.id,
        totalRounds: gameInfo.totalRounds,
        currentRound: gameInfo.currentRound,
        firstPlayer: gameInfo.firstPlayer,
        secondPlayer: gameInfo.secondPlayer,
        isPaused: gameInfo.isPaused,
        isFinished: gameInfo.isFinished,
        gameWinner: gameInfo.gameWinner,
      };
    },

    setPlayerInfo(state, playerInfo: PlayerInfo) {
      state.player = playerInfo;
    },
  },
  plugins: [createPersistedState()],
});
