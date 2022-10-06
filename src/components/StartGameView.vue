<template>
  <div :class="$style.gameView">
    <slot name="inputs" :class="$style.inputs"/>

    <PlayButton @click="$emit('startGame')" :is-disabled="isStartButtonDisabled"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PlayButton from '@/components/PlayButton.vue';

@Options({
  props: {
    isStartButtonDisabled: Boolean,
  },
  components: {
    PlayButton,
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
