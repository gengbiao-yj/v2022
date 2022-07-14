<script setup lang="ts">
import { config } from './packages/config';
import type { configType } from './packages/config';
import ElementImport from '../FunctionPage/ElementImport';
import Editor from './packages/editor/Editor';

const data = ref<configType>(config);
</script>

<template>
  <div class="main-root">
    <Editor v-model="data"></Editor>
    <ElementImport />
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
