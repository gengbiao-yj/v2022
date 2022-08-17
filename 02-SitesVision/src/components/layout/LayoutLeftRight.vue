<!-- name:左右布局 -->
<script lang="ts" setup>
import HeaderTitle from '@comps/layout/Main/HeaderTitle.vue';
import HeaderMenu from '@comps/layout/Main/HeaderMenu.vue';
import HeaderOption from '@comps/layout/Main/HeaderOption.vue';
import HeaderTabs from '@comps/layout/Main/HeaderTabs.vue';
import Breadcrumb from '@comps/layout/Main/Breadcrumb.vue';

import { busOn } from '@/utils/hooks';
// 订阅总线事件，左右布局，el-aside 宽度跟随 menu菜单变化
const isAsideMenuCollapse = ref<boolean>(false);
busOn('menuCollapse', (param: boolean) => {
  isAsideMenuCollapse.value = param;
  if (browserWidth.value < 700) {
    asideDrawer.value = param;
    isAsideMenuCollapse.value = !param;
  }
});

// aside 侧边栏转为 draw 左侧抽屉
const asideDrawer = ref(false);
// 浏览器宽度监视
import { getWatchBrowserWidth } from '@/utils/hooks';
const browserWidth = getWatchBrowserWidth((val: number) => {
  let a = val;
});
</script>

<template>
  <el-container>
    <el-aside
      v-if="browserWidth > 700"
      :class="{
        asideCollapse: isAsideMenuCollapse,
        asideOpen: !isAsideMenuCollapse
      }"
    >
      <div class="aside-title">
        <HeaderTitle />
      </div>
      <div class="aside-menu">
        <HeaderMenu is-aside="vertical" />
      </div>
    </el-aside>
    <el-container style="width: 100%">
      <el-header height="50px">
        <div class="header">
          <div class="header-left">
            <Breadcrumb />
          </div>
          <div class="header-right">
            <HeaderOption />
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="tabs">
          <HeaderTabs />
        </div>
        <div class="main-container">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in" appear>
              <component :is="Component"></component>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <el-drawer
    custom-class="menu-draw"
    v-model="asideDrawer"
    :with-header="false"
    direction="ltr"
  >
    <el-aside
      :class="{
        asideCollapse: isAsideMenuCollapse,
        asideOpen: !isAsideMenuCollapse
      }"
    >
      <div class="aside-title">
        <HeaderTitle />
      </div>
      <div class="aside-menu">
        <HeaderMenu is-aside="vertical" />
      </div>
    </el-aside>
  </el-drawer>
</template>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  //width: 210px;
  padding: 0px;
  background: white;
  box-shadow: 2px 5px 10px rgb(0 0 0 / 12%);
  transition: all 0.3s ease;
  z-index: 10;
  .aside-title {
    @include box-size(100%, 50px);
    @include flex(row, flex-start, flex-end);
    overflow: hidden;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      rgba(
        var(--primary-color-r),
        var(--primary-color-g),
        var(--primary-color-b),
        0.25
      )
    );
    padding-left: 15px;
    padding-bottom: 10px;
  }
  .aside-menu {
    overflow: hidden;
    @include box-size(100%, calc(100% - 50px));
  }
}

// 左右布局时，menu菜单折叠，aside 侧边宽度也跟随折叠
.el-aside.asideCollapse {
  will-change: width;
  width: 64px;
}

.el-aside.asideOpen {
  will-change: width;
  width: 210px;
}

.el-header {
  background: white;
  padding-left: 0px;
  padding-right: 0px;
  .header {
    @include box-size(100%, 50px);
    @include flex(row, space-between, center);
    border-bottom: 1px solid #dcdfe6;
    &-left {
      @include box-size(210px, 100%);
      @include flex(row, flex-start, center);
      padding-left: 15px;
    }
    &-right {
      @include box-size(300px, 100%);
      padding-right: 5px;
    }
  }
}

.el-main {
  padding: 0px;
  position: relative;

  .tabs {
    @include box-size(100%, 40px);
    box-shadow: 0 5px 10px #ddd;
  }

  .main-container {
    @include box-size(100%, calc(100vh - 90px));
    background: #f1f1f1;
    margin-top: 5px;
  }
}

.menu-draw > .el-drawer__body {
  padding: 0px !important;
}
</style>

<script lang="ts">
export default {
  name: 'LayoutLeftRight'
};
</script>
