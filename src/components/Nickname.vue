<template>
  <div :class="$style.nickname">
    <span class="label">Nickname</span>
    <input
      :class="$style.nicknameInput"
      :value="nickname"
      @input.prevent="onNicknameChange"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    nickname: String,
  },
})
export default class Nickname extends Vue {
  nickname!: string;

  onNicknameChange($event: any) {
    this.$emit('update:nickname', $event.currentTarget.value );
  }
}
</script>

<style module>
  .nickname {
    width: 200px;
    padding: 8px;
    text-align: left;
  }
</style>
