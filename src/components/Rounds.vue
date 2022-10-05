<template>
  <div :class="$style.rounds">
    <div :class="$style.label">{{isSingle ? 'Round' : 'Rounds'}}</div>
    <input
      autocomplete="off"
      :class="$style.roundsInput"
      :value="rounds"
      :disabled="isDisabled"
      @input.prevent="onRoundsChange"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    rounds: Number,
    isDisabled: Boolean,
    isSingle: Boolean,
  },
})
export default class Rounds extends Vue {
  rounds!: number;

  onRoundsChange($event: any) {
    this.$emit('update:rounds', Number($event.currentTarget.value));
  }
}
</script>

<style module>
  .rounds {
    padding: 8px;
    text-align: left;
  }

  .label {
    margin-bottom: 8px;
  }

  .roundsInput {
    width: 50px;
  }
</style>
