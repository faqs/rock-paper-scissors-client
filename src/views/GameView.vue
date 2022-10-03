<template>
  <div :class="$style.game">
    <div>
      <Nickname :nickname="nickname" is-disabled/>
    </div>
    <div :class="$style.gameInfo">
      <GameId :game-id="gameId" is-disabled/>
      <Rounds :rounds="round" is-disabled/>
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
import StartPage from '@/components/StartPage.vue';
import Nickname from '@/components/Nickname.vue';
import StartGameView from '@/components/StartGameView.vue';
import Rounds from '@/components/Rounds.vue';
import GameId from '@/components/GameId.vue';
import StartButton from '@/components/StartButton.vue';
import { Variants } from '@/dictionary';

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
  nickname = '';
  round = 0;
  gameId = 0;
  selectedVariant: Variants | null = null;

  get variants() {
    return Variants;
  }

  selectVariant(variant: Variants): void {
    this.selectedVariant = variant;
  }

  makeTurn(): void {
    console.log('make move function template');
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
}

.variants img.selected {
  width: 120px;
  height: 168px;
}
</style>
