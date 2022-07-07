import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import utilsRoutes from '@/router/utilsRoutes';
import businessRoutes from '@/router/businessRoutes';
import { storageData } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [...utilsRoutes, ...businessRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // 登录验证
  if (to.meta.requireAuth) {
    if (storageData.getLocalStorage('token')) {
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
