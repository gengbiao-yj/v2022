<script setup lang="ts">
import { config } from './config';
import type { configType } from './config';
import Editor from './packages/editor.tsx';

const data = ref<configType>(config);
</script>

<template>
  <div class="main-root">
    <Editor :data="data"></Editor>
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
