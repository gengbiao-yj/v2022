<!-- name:上下布局 -->
<script lang="ts" setup>
import HeaderTitle from '@comps/layout/Main/HeaderTitle.vue';
import HeaderMenu from '@comps/layout/Main/HeaderMenu.vue';
import HeaderOption from '@comps/layout/Main/HeaderOption.vue';
import HeaderTabs from '@comps/layout/Main/HeaderTabs.vue';
</script>

<template>
  <el-container>
    <el-header height="50px">
      <div class="header">
        <div class="header-left">
          <HeaderTitle />
        </div>
        <div class="header-menu">
          <HeaderMenu />
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
</template>

<style scoped lang="scss">
.el-main {
  padding: 0px;
  position: relative;

  .tabs {
    @include box-size(100%, 40px);
    box-shadow: 0 4px 4px rgba(124, 121, 121, 0.12);
    position: relative;
  }

  .main-container {
    @include box-size(100%, calc(100vh - 90px));
    background: #f1f1f1;
    padding: 4px 5px 0px;
  }
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
      @include flex(row, flex-start, flex-end);
      padding-left: 15px;
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
      padding-bottom: 10px;
    }
    &-menu {
      @include box-size(calc(100% - 510px), 100%);
      padding-left: 20px;
    }
    &-right {
      @include box-size(300px, 100%);
      padding-right: 5px;
    }
  }
}
@media screen and (max-width: 550px) {
  .header-menu {
    width: 120px !important;
  }
}

@media screen and (max-width: 700px) {
  .header-menu {
    width: calc(100% - 280px) !important;
  }
  .header-left {
    display: none !important;
  }
}

@media screen and (max-width: 2000px) {
  .header-menu {
    width: calc(100% - 510px) !important;
  }
  .header-left {
    display: initial;
  }
}
</style>

<script lang="ts">
export default {
  name: 'LayoutUpDown'
};
</script>
