import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import GameResultView from '@/views/GameResultView.vue';

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
  {
    path: '/result',
    name: 'gameResult',
    component: GameResultView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
