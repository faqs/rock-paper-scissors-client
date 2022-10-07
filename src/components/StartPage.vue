<template>
  <div class="startPage">
    <nav :class="$style.menu">
      <router-link
          :class="$style.menuItem"
          :to="{name: ROUTES.NEW_GAME}"
      >
        <button :class="$style.menuItemButton">New game</button>
      </router-link>
      <router-link
          :class="$style.menuItem"
          :to="{name: ROUTES.CONNECT_TO_GAME}"
      >
        <button :class="$style.menuItemButton">Connect to existing game</button>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { ROUTES_NAMES } from '@/router/routesNames';

export default class StartPage extends Vue {
  get ROUTES() {
    return ROUTES_NAMES;
  }
}
</script>

<style module>
.menu {
  padding: 30px;
}

.menu .menuItem:not(:last-child) {
  margin-right: 16px;
}

.menu .menuItemButton {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #2c3e50;
  cursor: pointer;
}
</style>
