<!-- 地图主页 -->
<script setup lang="ts">
import { amapIP } from '@apis/amap';
import { storage } from '@/utils';
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
      <el-header height="50px">Header</el-header>
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
    background: #009dff;
  }
}
</style>

<script lang="ts">
export default {
  name: 'MainMap'
};
</script>
