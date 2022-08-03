import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: `/Login`,
    name: `Login`,
    component: () => import('@/views/BusinessPage/ModelUser/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: `/Main`,
    name: `Main`,
    component: () => import('@/views/BusinessPage/Main.vue'),
    meta: {
      title: '主页'
    }
  }
] as RouteRecordRaw[];

export default routes;
