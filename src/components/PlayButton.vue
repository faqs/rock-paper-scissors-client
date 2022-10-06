<template>
  <button
    :class="[$style.playButton, {
      [$style.disabled]: isDisabled,
    }]"
    :disabled="isDisabled"/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    isDisabled: Boolean,
  },
})
export default class PlayButton extends Vue {
}
</script>

<style module>
.playButton {
  width: 100px;
  height: 100px;
  padding: 0;
  -webkit-mask-image: url('@/assets/play-button.svg');
  mask-image: url('@/assets/play-button.svg');
  background-color: grey;
  border: 0;
}

.playButton:not(.disabled):hover {
  cursor: pointer;
  background-color: lightskyblue;;
}

.playButton.disabled {
  background-color: darkslategray;
}

.playButton.disabled:hover {
  cursor: not-allowed;
}
</style>
