import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import utilsRoutes from '@/router/utilsRoutes';
import businessRoutes from '@/router/businessRoutes';

const routes: Array<RouteRecordRaw> = [...utilsRoutes, ...businessRoutes];

const router = createRouter({
  history: createWebHashHistory(),
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
export function setupRouter(app: App) {
  app.use(router);
}
