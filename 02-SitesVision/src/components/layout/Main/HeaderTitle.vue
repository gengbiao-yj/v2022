<!-- name: -->
<script lang="ts" setup>
import { busOn } from '@/utils/hooks';

/*  订阅总线事件
------------------------------------------------ */
const isAsideMenuCollapse = ref<boolean>(false); // 左右布局时 menu 折叠、展开状态
const time = (val: boolean) => {
  let ti: any = null;
  return () => {
    if (!val) {
      if (ti) clearTimeout(ti);
      ti = setTimeout(() => {
        isAsideMenuCollapse.value = val;
        clearTimeout(ti);
      }, 200);
    } else {
      isAsideMenuCollapse.value = val;
    }
  };
};
// 事件-- 左右布局时 menu 折叠、展开状态交替
busOn('menuCollapse', (param: boolean) => {
  time(param)();
  // isAsideMenuCollapse.value = param;
});
// 事件-- 左右布局时屏宽800px界限，menu 折叠、展开状态交替
busOn('leftRightWidth800', (param: boolean) => {
  time(param)();
  // isAsideMenuCollapse.value = param;
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
