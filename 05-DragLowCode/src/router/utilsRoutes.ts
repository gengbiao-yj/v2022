import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)', // 匹配未定义路由，并重定向至 404 页面
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/FunctionPage/404.vue'),
    meta: {
      title: '404',
      requireAuth: true
    }
  },
  {
    path: '/Refresh', // 空页面，用于业务页面强制刷新
    name: 'Refresh',
    component: () => import('@/views/FunctionPage/Refresh.vue'),
    meta: {
      title: '',
      requireAuth: true
    }
  },
  {
    path: '/',
    redirect: '/Main'
  }
] as RouteRecordRaw[];

export default routes;
