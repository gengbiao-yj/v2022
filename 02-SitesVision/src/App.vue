<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import pt from 'element-plus/lib/locale/lang/pt';
import fr from 'element-plus/lib/locale/lang/fr';
import ja from 'element-plus/lib/locale/lang/ja';
import ko from 'element-plus/lib/locale/lang/ko';

import basicPinia from '@/pinia/storagePinia';
const basicStore = basicPinia();
const { getSystemParams } = basicStore;
/*  初始化系统设置
------------------------------------------------ */
// 主题色初始化
const systemSettings = getSystemParams();
document.documentElement.style.setProperty(
  '--primary-color',
  systemSettings.primaryColor
);

/*  element plus 中英文切换
------------------------------------------------ */
const languages = ref([zhCn, en, pt, fr, ja, ko]);
const locale = ref(
  languages.value[Math.floor(Math.random() * languages.value.length)]
);
</script>

<style lang="scss">
@import 'scss/public.scss';
#app,
body {
  @include box-size(100vw, 100vh);
  overflow: hidden;
}
</style>
