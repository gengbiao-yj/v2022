<!-- name:面包屑导航 -->
<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';
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
</script>

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.path">
        <span class="breadcrumb-title">{{ item.meta?.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
  name: 'BreadcrumbTip'
};
</script>
