<template>
  <div class="newGame">
    <StartGameView
      :is-start-button-disabled="isStartButtonDisabled"
      @startGame="startNewGame"
    >
      <template v-slot:inputs>
        <div :class="$style.inputs">
          <Nickname v-model:nickname="nickname"/>
          <Rounds v-model:rounds="rounds"/>
        </div>
      </template>
    </StartGameView>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { gameService } from '@/api/gameService';
import { ROUTES_NAMES } from '@/router/routesNames';
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';

@Options({
  components: {
    Rounds,
    StartGameView,
    Nickname,
    StartPage,
  },
})
export default class NewGameView extends Vue {
  nickname = '';
  rounds = 0;

  get isStartButtonDisabled() {
    return !this.nickname || !this.rounds;
  }

  async startNewGame(): Promise<void> {
    const { data } = await gameService.startNewGame({
      playerNickname: this.nickname,
      totalRounds: this.rounds,
    });

    store.commit('setGameInfo', data);
    store.commit('setPlayerInfo', { nickname: this.nickname });

    this.$router.push({ name: ROUTES_NAMES.GAME });
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
