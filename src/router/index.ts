import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'startPage',
    component: HomeView,
  },
  {
    path: '/new',
    name: 'newGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewGameView.vue'),
  },
  {
    path: '/connect',
    name: 'connectToGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConnectToGameView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
