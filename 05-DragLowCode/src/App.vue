<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import pt from 'element-plus/lib/locale/lang/pt';
import fr from 'element-plus/lib/locale/lang/fr';
import ja from 'element-plus/lib/locale/lang/ja';
import ko from 'element-plus/lib/locale/lang/ko';

import { setupProvide } from './utils/index';

// 语言切换
const languages = [zhCn, en, pt, fr, ja, ko];
const locale = ref(languages[Math.floor(Math.random() * languages.length)]);
// 依赖供给
setupProvide(provide);
</script>

<style lang="scss">
@import 'scss/public.scss';
#app,
body {
  @include box-size(100vw, 100vh);
  overflow: hidden;
}
</style>
