<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';

import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import pt from 'element-plus/lib/locale/lang/pt';
import fr from 'element-plus/lib/locale/lang/fr';
import ja from 'element-plus/lib/locale/lang/ja';
import ko from 'element-plus/lib/locale/lang/ko';

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup() {
    const languages = [zhCn, en, pt, fr, ja, ko];
    return {
      languages,
      locale: languages[Math.floor(Math.random() * languages.length)]
    };
  }
});
</script>

<style lang="scss">
@import 'assets/scss/public.scss';
#app,
body {
  @include box-size(100vw, 100vh);
  overflow: hidden;
}
</style>
