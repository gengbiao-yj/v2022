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
    path: `/MainMap`,
    name: `MainMap`,
    component: () => import('@/views/BusinessPage/ModelMap/MainMap.vue'),
    meta: {
      title: '主页'
    }
  }
] as RouteRecordRaw[];

export default routes;
