import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  /*  配置
  ------------------------------------------------ */
  {
    path: '/:pathMatch(.*)', // 匹配未定义路由，并重定向至 404 页面
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('_views/404.vue'),
    meta: {
      title: '404',
      requireAuth: true
    }
  },
  {
    path: '/Refresh', // 空页面，用于业务页面强制刷新
    name: 'Refresh',
    component: () => import('_views/Refresh.vue'),
    meta: {
      title: '',
      requireAuth: true
    }
  },
  {
    path: '/',
    redirect: '/Login'
  },
  /*  框架页面
  ------------------------------------------------ */
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // 登录验证
  if (to.meta.requireAuth) {
    if (sessionStorage.userInfo) {
      if (to.meta.title) {
        document.title = to.meta.title as string;
      }
      next();
    } else {
      document.title = '登录';
      next('/Login');
    }
  } else {
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }
    next();
  }
});

export default router;
