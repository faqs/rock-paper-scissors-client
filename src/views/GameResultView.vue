<template>
  <div class="gameResult">
    <h2 :class="[
        $style.gameResult,
        {[$style[resultCssClass]]: resultCssClass}
    ]">
      {{ resultMessage }}
    </h2>
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
</style>
