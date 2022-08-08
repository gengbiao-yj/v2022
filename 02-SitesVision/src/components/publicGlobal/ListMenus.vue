<!-- 操作菜单 - 选项列表 -->
<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  menus: {
    type: Array as PropType<Array<{ label: string; value: string }>>,
    required: true
  }
});
</script>

<template>
  <div class="list-menus-root">
    <div class="type-item" v-for="(e, i) in props.menus" :key="i">
      {{ e.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-menus-root {
  .type-item {
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 15px;
    color: #666;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    &:hover {
      color: var(--primary-color);
      transition: all 0.3s ease-in-out;
    }
    &:hover::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--primary-color);
      opacity: 0.18;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'ListMenus'
};
</script>
