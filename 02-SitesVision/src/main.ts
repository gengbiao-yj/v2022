import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';

async function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  await router.isReady(); // 路由挂载完成再渲染页面
  app.mount('#app');
}

bootstrap();
