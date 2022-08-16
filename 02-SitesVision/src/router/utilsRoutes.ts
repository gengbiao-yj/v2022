import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/:pathMatch(.*)', // 匹配未定义路由，并重定向至 404 页面
    redirect: '/Main/404'
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
    redirect: '/Login'
  },
  {
    path: '/Main',
    redirect: '/Main/MainMap'
  },
  {
    path: '/Main/DataList',
    redirect: '/Main/DataList/Pipeline'
  }
] as RouteRecordRaw[];

export default routes;
