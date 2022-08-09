import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: `/Login`,
    name: `Login`,
    component: () => import('@/views/BusinessPage/Login.vue'),
    meta: {}
  },
  {
    path: `/Main`,
    name: `Main`,
    component: () => import('@/views/BusinessPage/Main.vue'),
    meta: {},
    children: [
      /*  数据表格
      ------------------------------------------------ */
      {
        path: '/Main/ListPipeline',
        name: 'ListPipeline',
        component: () =>
          import('@/views/BusinessPage/DataTable/ListPipeline.vue'),
        meta: {
          title: '机会点列表',
          requireAuth: true
        }
      },
      {
        path: '/Main/ListStore',
        name: 'ListStore',
        component: () => import('@/views/BusinessPage/DataTable/ListStore.vue'),
        meta: {
          title: '已开门店列表',
          requireAuth: true
        }
      },
      {
        path: '/Main/ListCompetitor',
        name: 'ListCompetitor',
        component: () =>
          import('@/views/BusinessPage/DataTable/ListCompetitor.vue'),
        meta: {
          title: '关注竞品列表',
          requireAuth: true
        }
      },
      {
        path: '/Main/ListBusinessCircle',
        name: 'ListBusinessCircle',
        component: () =>
          import('@/views/BusinessPage/DataTable/ListBusinessCircle.vue'),
        meta: {
          title: '已有商圈列表',
          requireAuth: true
        }
      },
      /*  功能页面
      ------------------------------------------------ */
      {
        path: '/Main/404',
        name: '404',
        component: () => import('@/views/FunctionPage/404.vue'),
        meta: {
          title: '404',
          requireAuth: true
        }
      }
    ]
  }
] as RouteRecordRaw[];

export default routes;
