<!-- name: 设置全屏 -->
<script lang="ts" setup>
import { fullScreen } from '@/utils/hooks';
import { defineProps } from 'vue';

const props = defineProps({
  // 表格实例
  tableInstance: {
    type: Object,
    required: true
  }
});
const tableContent = computed(() => props.tableInstance);
let _fullScreen: () => void;
const setRestFullScreen = () => {
  if (_fullScreen) {
    _fullScreen();
  } else {
    _fullScreen = fullScreen(tableContent.value);
    _fullScreen();
  }
};
</script>

<template>
  <!-- 全屏 -->
  <el-tooltip effect="dark" content="全屏" placement="top-start">
    <FullScreen class="svg-18" @click="setRestFullScreen" />
  </el-tooltip>
</template>

<style scoped></style>
<script lang="ts">
export default {
  name: 'SvFullScreen'
};
</script>
