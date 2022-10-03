<template>
  <div :class="$style.gameId">
    <div :class="$style.label">Game Id</div>
    <input
      autocomplete="off"
      :class="$style.gameIdInput"
      :value="gameId"
      :disabled="isDisabled"
      @input.prevent="onRoundsChange"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    gameId: Number,
    isDisabled: Boolean,
  },
})
export default class GameId extends Vue {
  gameId!: number;

  onRoundsChange($event: any) {
    this.$emit('update:gameId', Number($event.currentTarget.value));
  }
}
</script>

<style module>
  .gameId {
    padding: 8px;
    text-align: left;
  }

  .label {
    margin-bottom: 8px;
  }

  .gameIdInput {
    width: 150px;
  }
</style>
