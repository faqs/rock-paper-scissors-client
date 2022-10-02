import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '@/views/GameView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'startPage',
    component: HomeView,
  },
  {
    path: '/new',
    name: 'newGame',
    component: () => import(/* webpackChunkName: "newGame" */ '../views/NewGameView.vue'),
  },
  {
    path: '/connect',
    name: 'connectToGame',
    component: () => import(/* webpackChunkName: "connectToGame" */ '../views/ConnectToGameView.vue'),
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
