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
        :is-disabled="isMakeTurnButtonDisabled"
        :title="makeTurnButtonTooltip"
        @click="makeTurn"
    />
    <div
        v-else
        :class="$style.watingMessage"
    >
      Wating other player turn
    </div>

    <div :class="$style.pauseGameButtonContainer">

      <button
          :class="$style.pauseGameButton"
          @click="() => isGamePausedByMe ? continueGame() : pauseGame()"
      >
        {{ isGamePausedByMe ? 'Continue game' : 'Pause game'}}
      </button>
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
import { ROUTES_NAMES } from '@/router/routesNames';
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';
import GameId from '@/components/GameId.vue';
import PlayButton from '@/components/PlayButton.vue';
import { GameSuspenseEvent } from '@/api/interfaces/game.interface';

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

  get isGamePaused() {
    return store.state.game.isPaused;
  }

  get isGamePausedByMe() {
    const playerField = store.state.game.firstPlayer?.nickname === this.nickname ? 'firstPlayer' : 'secondPlayer';

    return store.state.game.isPaused && store.state.game[playerField]?.isGamePaused;
  }

  get isMakeTurnButtonDisabled(): boolean {
    return !this.selectedVariant || this.isGamePaused;
  }

  get makeTurnButtonTooltip(): string {
    return this.isMakeTurnButtonDisabled ? 'You need to select variant' : '';
  }

  selectVariant(variant: Variants): void {
    if (this.isTurnMade || this.isGamePaused) {
      return;
    }

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

  async toggleGamePause(isPaused: boolean) {
    const method = isPaused ? 'pauseGame' : 'continueGame';

    const { data } = await gameService[method]({
      playerNickname: this.nickname,
      gameId: this.gameId!,
    });

    store.commit('setGameInfo', data);
  }

  async pauseGame() {
    await this.toggleGamePause(true);
  }

  async continueGame() {
    await this.toggleGamePause(false);
  }

  handleGameSuspense({
    game,
    playerNickname,
  }: GameSuspenseEvent, actionName: string) {
    if (game.id !== this.gameId || playerNickname === this.nickname) {
      return;
    }

    alert(`Other player ${actionName} the game`);

    store.commit('setGameInfo', game);
  }

  created() {
    SocketProvider.on('roundResult', ({
      game,
      winner,
    }) => {
      if (game.id !== this.gameId) {
        return;
      }

      alert(formResultMessage(this.nickname, 'round', String(winner)));

      store.commit('setGameInfo', game);

      if (game.isFinished) {
        this.$router.push({ name: ROUTES_NAMES.GAME_RESULT });
      } else {
        this.isTurnMade = false;
        this.selectedVariant = null;
      }
    });

    SocketProvider.on('gamePaused', (eventData) => {
      this.handleGameSuspense(eventData, 'paused');
    });

    SocketProvider.on('gameContinued', (eventData) => {
      this.handleGameSuspense(eventData, 'continued');
    });

    SocketProvider.on('playerConnected', (eventData) => {
      this.handleGameSuspense(eventData, 'connected');
    });
  }

  unmounted() {
    SocketProvider.off('roundResult');
    SocketProvider.off('gamePaused');
    SocketProvider.off('gameContinued');
    SocketProvider.off('playerConnected');
    this.pauseGame();
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

.pauseGameButtonContainer {
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;
}

.pauseGameButton {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #2c3e50;
  cursor: pointer;
}
</style>
