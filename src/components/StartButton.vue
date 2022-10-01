<template>
  <button :class="$style.startGameButton"/>
</template>

<script>
import { Vue } from 'vue-class-component';

export default class StartButton extends Vue {
}
</script>

<style module>
  .startGameButton {
    width: 0;
    height: 0;
    padding: 0;
    background-color: transparent;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 100px solid green;
    border-right: 0;
    cursor: pointer;
  }
</style>
