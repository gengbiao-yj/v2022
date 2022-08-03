<!-- 主页 -->
<script setup lang="ts">
import { amapIP } from '@/apis/amap';
import { storage } from '@/utils';
import HeaderMenu from '@comps/businessSelf/headerMenu/HeaderMenu.vue';
import HeaderOption from '@comps/businessSelf/headerMenu/HeaderOption.vue';
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
  <div class="main-map-root">
    <el-container>
      <el-header height="50px">
        <div class="header-left" ref="headerLeft">
          <img src="@/assets/img/logo1.png" />
          <span>智慧选址平台</span>
        </div>
        <div class="header-menu">
          <HeaderMenu />
        </div>
        <div class="header-right">
          <HeaderOption />
        </div>
      </el-header>
      <el-main>
        <div class="map-container"></div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main-map-root {
  @include box-size(100vw, 100vh);
  overflow: hidden;
  .map-container {
    width: 100%;
    height: calc(100vh - 50px);
  }
  .el-header {
    background: white;
    padding-left: 0px;
    @include flex(row, flex-start, center);
    .header-left {
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
      img {
        height: 30px;
      }
      span {
        color: white;
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .header-menu {
      @include box-size(calc(100% - 500px), 100%);
      border-bottom: 1px solid #dcdfe6;
    }
    .header-right {
      @include box-size(280px, 100%);
      border-bottom: 1px solid #dcdfe6;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'MainMap'
};
</script>
