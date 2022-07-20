import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/user/Login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    redirect: 'login',
    meta: {
      hidden: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
