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

    <PlayButton
        v-if="!isTurnMade"
        @click="makeTurn" :is-disabled="isMakeTurnButtonDisabled"
    />
    <div
        v-else
        :class="$style.watingMessage"
    >
      Wating other player turn
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { gameService } from '@/api/gameService';
import SocketProvider from '@/socket/SocketProvider';
import { formResultMessage } from '@/utils/helpers';
import { Variants } from '@/dictionary';
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';
import GameId from '@/components/GameId.vue';
import PlayButton from '@/components/PlayButton.vue';

@Options({
  components: {
    PlayButton,
    GameId,
    Rounds,
    StartGameView,
    Nickname,
    StartPage,
  },
})
export default class GameView extends Vue {
  selectedVariant: Variants | null = null;
  isTurnMade = false;

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

  get isMakeTurnButtonDisabled() {
    return !this.selectedVariant;
  }

  selectVariant(variant: Variants): void {
    this.selectedVariant = variant;
  }

  async makeTurn(): Promise<void> {
    if (!this.selectedVariant || !this.nickname || !this.gameId) {
      return;
    }

    this.isTurnMade = true;

    const requestData = {
      playerNickname: this.nickname,
      gameId: this.gameId,
      variant: this.selectedVariant,
    };

    try {
      await gameService.makeTurn(requestData);
    } catch (error) {
      alert(error);
      this.isTurnMade = false;
    }
  }

  created() {
    SocketProvider.on('roundResult', ({
      game,
      winner,
    }) => {
      alert(formResultMessage(this.nickname, 'round', String(winner)));

      store.commit('setGameInfo', game);

      if (game.isFinished) {
        this.$router.push({ name: 'gameResult' });
      } else {
        this.isTurnMade = false;
      }
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

.watingMessage {
  font-size: 14px;
  line-height: 16px;
  color: lightgray;
  padding: 16px 8px;
}
</style>
