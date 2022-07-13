import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: `/Main`,
    name: `MainPage`,
    component: () => import('@/views/BusinessPage/Main.vue'),
    meta: {
      title: '主页',
      requireAuth: false
    }
  }
] as RouteRecordRaw[];

export default routes;
