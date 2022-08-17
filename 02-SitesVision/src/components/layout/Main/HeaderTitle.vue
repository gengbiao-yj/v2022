<!-- name: -->
<script lang="ts" setup>
import { busOn } from '@/utils/hooks';
// 订阅总线事件，左右布局宽度跟随菜单栏变化
const isAsideMenuCollapse = ref<boolean>(false);
let ti: any = null;
busOn('menuCollapse', (param: boolean) => {
  if (!param) {
    if (ti) clearTimeout(ti);
    ti = setTimeout(() => {
      isAsideMenuCollapse.value = param;
      clearTimeout(ti);
    }, 200);
  } else {
    clearTimeout(ti);
    isAsideMenuCollapse.value = param;
  }
});
</script>

<template>
  <transition-group name="breadcrumb">
    <template v-if="!isAsideMenuCollapse">
      <img src="@/assets/img/logo1.png" />
      <span>智慧选址平台</span>
    </template>
    <img v-else src="@/assets/img/logo2.png" />
  </transition-group>
</template>

<style scoped lang="scss">
img {
  height: 30px;
}
span {
  color: white;
  margin-left: 10px;
  font-size: 15px;
}
</style>

<script lang="ts">
export default {
  name: 'HeaderTitle'
};
</script>
