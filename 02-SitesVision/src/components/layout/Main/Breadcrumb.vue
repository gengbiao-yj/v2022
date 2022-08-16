<!-- name:面包屑导航 -->
<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';
import { busEmit } from '@/utils/hooks';
// 监视路由变化
const route = useRoute();
const breadcrumbs = shallowReactive([] as Array<RouteLocationMatched>);
watch(route, newV => {
  breadcrumbs.length = 0;
  breadcrumbs.push(
    ...newV.matched.filter(it => {
      return it.meta && it.meta.title;
    })
  );
});

// 刷新初始化
breadcrumbs.push(
  ...route.matched.filter(it => {
    return it.meta && it.meta.title;
  })
);

// 反转菜单的折叠状态 HeaderMenu -> menu
const menuCollapse = ref<boolean>(false);
const reverseState = () => {
  menuCollapse.value = !menuCollapse.value;
  busEmit('menuCollapse', menuCollapse.value);
};
</script>

<template>
  <Fold
    class="svg-18 mg-r-10 menu-collapse-icon"
    v-rotate:180="menuCollapse"
    @click="reverseState"
  />
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.path">
        <span class="breadcrumb-title">{{ item.meta?.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.menu-collapse-icon {
  @include primary-color();
  cursor: pointer;
}
</style>

<script lang="ts">
export default {
  name: 'BreadcrumbTip'
};
</script>
