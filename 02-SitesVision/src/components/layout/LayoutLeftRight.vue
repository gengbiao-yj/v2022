<!-- name:左右布局 -->
<script lang="ts" setup>
import { busOn } from '@/utils/hooks';
// 订阅总线事件
const isAsideMenuCollapse = ref<boolean>(false);
busOn('menuCollapse', (param: boolean) => {
  isAsideMenuCollapse.value = param;
});
</script>

<template>
  <el-container>
    <el-aside
      :class="{
        asideCollapse: isAsideMenuCollapse,
        asideOpen: !isAsideMenuCollapse
      }"
    >
      <div class="aside-title">
        <slot name="Title"></slot>
      </div>
      <div class="aside-menu">
        <slot name="Menu"></slot>
      </div>
    </el-aside>
    <el-container style="width: 100%">
      <el-header height="50px">
        <div class="header">
          <div class="header-left">
            <slot name="Breadcrumb"></slot>
          </div>
          <div class="header-right">
            <slot name="Option"></slot>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="tabs">
          <slot name="Tabs"></slot>
        </div>
        <div class="main-container">
          <slot name="Container"></slot>
        </div>
      </el-main>
    </el-container>
  </el-container>
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
</style>

<script lang="ts">
export default {
  name: 'LayoutLeftRight'
};
</script>
