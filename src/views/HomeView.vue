<template>
  <div class="home">
    <StartPage/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StartPage from '@/components/StartPage.vue';

@Options({
  components: {
    StartPage,
  },
})
export default class HomeView extends Vue {}
</script>
