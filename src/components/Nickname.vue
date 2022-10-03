<template>
  <div :class="$style.nickname">
    <div :class="$style.label">Nickname</div>
    <input
      autocomplete="off"
      :class="$style.nicknameInput"
      :value="nickname"
      :disabled="isDisabled"
      @input.prevent="onNicknameChange"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    nickname: String,
    isDisabled: Boolean,
  },
})
export default class Nickname extends Vue {
  nickname!: string;

  onNicknameChange($event: any) {
    this.$emit('update:nickname', $event.currentTarget.value);
  }
}
</script>

<style module>
  .nickname {
    max-width: 300px;
    padding: 8px;
    text-align: left;
  }

  .label {
    margin-bottom: 8px;
  }
</style>
