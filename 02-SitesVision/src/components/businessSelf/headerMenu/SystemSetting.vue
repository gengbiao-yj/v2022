<script setup lang="ts">
/*  init
------------------------------------------------ */
import { defineProps, defineEmits } from 'vue';
import type { SystemSetType } from '@/types/Components';
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

/*  el-drawer 显示隐藏控制
------------------------------------------------ */
const showDraw = ref<boolean>(props.modelValue || false);
watch(
  () => props.modelValue,
  newV => {
    showDraw.value = newV;
  }
);
const updateState = () => {
  emit('update:modelValue', false);
};

/*  存储设置数据
------------------------------------------------ */
const systemSettings = reactive<SystemSetType>({
  primaryColor: '#5aa3ec'
});
</script>

<template>
  <!-- 设置 -->
  <el-drawer
    v-model="showDraw"
    title="系统设置"
    direction="rtl"
    custom-class="setting-draw"
    :size="270"
    @close="updateState"
  >
    <div class="setting-draw-content">
      <el-divider> 主题颜色 </el-divider>
      <el-color-picker v-model="systemSettings.primaryColor" />
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-draw {
  &-content {
    width: 100%;
    height: 100%;
    @include flex(column, flex-start, center);
  }
}
</style>

<script lang="ts">
export default {
  name: 'SystemSetting'
};
</script>
