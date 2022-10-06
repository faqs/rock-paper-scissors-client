<template>
  <div class="gameResult">
    <h2 :class="[
        $style.gameResult,
        {[$style[resultCssClass]]: resultCssClass}
    ]">
      {{ resultMessage }}
    </h2>

    <router-link
        :to="{name: 'startPage'}"
    >
      <button :class="$style.newGame">Start another game</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import store from '@/store';
import { formResultMessage } from '@/utils/helpers';

@Options({})
export default class GameResultView extends Vue {
  get nickname() {
    return store.state.player.nickname;
  }

  get game() {
    return store.state.game;
  }

  get resultCssClass() {
    if (this.game.gameWinner === 'Draw') {
      return;
    }

    return this.nickname === this.game.gameWinner ? 'won' : 'lost';
  }

  get resultMessage() {
    return formResultMessage(this.nickname, 'game', String(this.game.gameWinner));
  }
}
</script>

<style module>
  .won {
    color: lawngreen;
  }

  .lost {
    color: indianred;
  }

  .newGame {
    margin-top: 40px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #2c3e50;
    cursor: pointer;
  }
</style>
