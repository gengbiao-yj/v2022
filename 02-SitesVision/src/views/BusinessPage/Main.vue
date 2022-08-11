<!-- 主页 -->
<script setup lang="ts">
import { amapIP } from '@/apis/amap';
import { storage } from '@/utils';
import HeaderTitle from '@comps/businessSelf/Main/HeaderTitle.vue';
import HeaderMenu from '@comps/businessSelf/Main/HeaderMenu.vue';
import HeaderOption from '@comps/businessSelf/Main/HeaderOption.vue';
import HeaderTabs from '@comps/businessSelf/Main/HeaderTabs.vue';

// 浏览器宽度监视
import { getWatchBrowserWidth } from '@/utils/hooks';
const browserWidth = getWatchBrowserWidth();
const headerMenu = ref<HTMLDivElement>();
watch(
  () => browserWidth.value,
  val => {
    if (val <= 765) {
      headerMenu.value!.style.width = `calc(100% - 280px)`;
    }
  }
);
// IP 定位
onMounted(() => {
  IPPosition();
});
const IPPosition = async () => {
  try {
    const data = await amapIP();
    storage.setLocal('currentPosition', data, 120);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="main-root">
    <el-container>
      <el-header height="90px">
        <div class="header">
          <div class="header-left" v-show="browserWidth > 765">
            <HeaderTitle />
          </div>
          <div ref="headerMenu" class="header-menu">
            <HeaderMenu />
          </div>
          <div class="header-right">
            <HeaderOption />
          </div>
        </div>
        <div class="tabs">
          <HeaderTabs />
        </div>
      </el-header>
      <el-main>
        <div class="main-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main-root {
  @include box-size(100vw, 100vh);
  overflow: hidden;
  .el-main {
    padding: 0px;
    .main-container {
      @include box-size(100%, calc(100vh - 90px));
      background: #f1f1f1;
    }
  }
  .el-header {
    background: white;
    padding-left: 0px;
    padding-right: 0px;
    .header {
      @include box-size(100%, 50px);
      @include flex(row, space-between, center);
      &-left {
        @include box-size(220px, 100%);
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
        @include box-size(calc(100% - 520px), 100%);
        border-bottom: 1px solid #dcdfe6;
      }
      &-right {
        @include box-size(300px, 100%);
        border-bottom: 1px solid #dcdfe6;
        padding-right: 5px;
      }
    }
    .tabs {
      @include box-size(100%, 40px);
      box-shadow: 0 5px 10px #ddd;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'MainMap'
};
</script>
