<template>
  <div class="newGame">
    <StartGameView
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

  startNewGame():void {
    console.log('start new game function template');
  }
}
</script>

<style module>
  .inputs {
    display: flex;
    justify-content: space-between;
  }
</style>
