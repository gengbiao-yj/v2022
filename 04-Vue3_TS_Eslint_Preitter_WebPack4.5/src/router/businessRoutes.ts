import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: `/Login`,
    name: `Login`,
    component: () => import('@/views/BusinessPage/ModelUser/Login.vue'),
    meta: {
      title: '登录'
    }
  }
] as RouteRecordRaw[];

export default routes;
