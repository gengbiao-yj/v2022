import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

async function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  await router.isReady(); // 路由挂载完成再渲染页面
  app.mount('#app');
}

bootstrap();
