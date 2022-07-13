<script setup lang="ts">
import { config } from './config';
import type { configType } from './config';
import Editor from './packages/editor/Editor';

const data = ref<configType>(config);
</script>

<template>
  <div class="main-root">
    <Editor v-model="data"></Editor>
    <el-button v-show="false">按钮</el-button>
  </div>
</template>

<style scoped lang="scss">
.main-root {
  position: fixed;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
}
</style>

<script lang="ts">
export default {
  name: 'MainPage'
};
</script>
