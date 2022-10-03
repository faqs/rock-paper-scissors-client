import { createStore } from 'vuex';
import { GameInfo, PlayerInfo } from '@/store/types';

const state: {
  game: GameInfo,
  player: PlayerInfo,
} = {
  game: {
    id: null,
    totalRounds: null,
    currentRound: null,
  },
  player: {
    nickname: '',
  },
};

export default createStore({
  state,
  mutations: {
    setGameInfo(state, gameInfo: GameInfo) {
      state.game = gameInfo;
    },

    setPlayerInfo(state, playerInfo: PlayerInfo) {
      state.player = playerInfo;
    },
  },
});
