<template>
  <div class="connectToGame">
    <StartGameView
        @startGame="connectToGame"
    >
      <template v-slot:inputs>
        <div :class="$style.inputs">
          <Nickname v-model:nickname="nickname"/>
          <GameId v-model:game-id="gameId"/>
        </div>
      </template>
    </StartGameView>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { gameService } from '@/api/gameService';
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';
import GameId from '@/components/GameId.vue';

@Options({
  components: {
    GameId,
    Rounds,
    StartGameView,
    Nickname,
    StartPage,
  },
})
export default class ConnectToGameView extends Vue {
  nickname = '';
  gameId = 0;

  async connectToGame(): Promise<void> {
    const { data } = await gameService.connectToGame({
      playerNickname: this.nickname,
      gameId: this.gameId,
    });

    store.commit('setGameInfo', {
      id: data.id,
      totalRounds: data.totalRounds,
      currentRound: data.currentRound,
    });
    store.commit('setPlayerInfo', { nickname: this.nickname });

    this.$router.push({ name: 'game' });
  }
}
</script>

<style module>
.inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
</style>
