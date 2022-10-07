import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import GameResultView from '@/views/GameResultView.vue';
import { ROUTES_NAMES } from '@/router/routesNames';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTES_NAMES.START_PAGE,
    component: HomeView,
  },
  {
    path: '/new',
    name: ROUTES_NAMES.NEW_GAME,
    component: () => import(/* webpackChunkName: "newGame" */ '../views/NewGameView.vue'),
  },
  {
    path: '/connect',
    name: ROUTES_NAMES.CONNECT_TO_GAME,
    component: () => import(/* webpackChunkName: "connectToGame" */ '../views/ConnectToGameView.vue'),
  },
  {
    path: '/game',
    name: ROUTES_NAMES.GAME,
    component: GameView,
  },
  {
    path: '/result',
    name: ROUTES_NAMES.GAME_RESULT,
    component: GameResultView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
