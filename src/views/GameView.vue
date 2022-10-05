<template>
  <div :class="$style.game">
    <div>
      <Nickname :nickname="nickname" is-disabled/>
    </div>
    <div :class="$style.gameInfo">
      <GameId :game-id="gameId" is-disabled/>
      <Rounds :rounds="round" is-disabled is-single/>
    </div>
    <div :class="$style.variants">
      <img
          src="@/assets/Rock.png"
          alt="Rock"
          :class="{[$style.selected]: selectedVariant === variants.Rock}"
          @click="selectVariant(variants.Rock)"
      />
      <img
          src="@/assets/Paper.png"
          alt="Paper"
          :class="{[$style.selected]: selectedVariant === variants.Paper}"
          @click="selectVariant(variants.Paper)"
      />
      <img
          src="@/assets/Scissors.png"
          alt="Scissors"
          :class="{[$style.selected]: selectedVariant === variants.Scissors}"
          @click="selectVariant(variants.Scissors)"
      />
    </div>

    <StartButton @click="makeTurn"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { gameService } from '@/api/gameService';
import { Variants } from '@/dictionary';
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';
import GameId from '@/components/GameId.vue';
import StartButton from '@/components/StartButton.vue';

@Options({
  components: {
    StartButton,
    GameId,
    Rounds,
    StartGameView,
    Nickname,
    StartPage,
  },
})
export default class GameView extends Vue {
  selectedVariant: Variants | null = null;

  get variants() {
    return Variants;
  }

  get nickname() {
    return store.state.player.nickname;
  }

  get round() {
    return store.state.game.currentRound;
  }

  get gameId() {
    return store.state.game.id;
  }

  selectVariant(variant: Variants): void {
    this.selectedVariant = variant;
  }

  async makeTurn(): Promise<void> {
    if (!this.selectedVariant || !this.nickname || !this.gameId) {
      return;
    }

    const requestData = {
      playerNickname: this.nickname,
      gameId: this.gameId,
      variant: this.selectedVariant,
    };

    const { data } = await gameService.makeTurn(requestData);

    store.commit('setGameInfo', {
      id: data.id,
      totalRounds: data.totalRounds,
      currentRound: data.currentRound,
    });
  }
}
</script>

<style module>
.game {
  width: 500px;
}

.gameInfo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.variants {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
}

.variants img {
  cursor: pointer;
  width: 100px;
  height: 140px;
  border: 2px solid darkgrey;
  border-radius: 4px;
}

.variants img:hover {
  border-color: lightskyblue;
}

.variants img.selected {
  border-color: lightgreen;
}
</style>
