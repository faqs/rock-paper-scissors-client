<template>
  <div :class="$style.gameView">
    <slot name="inputs" :class="$style.inputs"/>

    <StartButton @click="$emit('startGame')"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StartButton from '@/components/StartButton.vue';

@Options({
  components: {
    StartButton,
  },
})
export default class StartGameView extends Vue {
}
</script>

<style module>
  .gameView {
    width: 500px;
    text-align: center;
  }

  .inputs {
    margin-bottom: 40px;
  }
</style>
