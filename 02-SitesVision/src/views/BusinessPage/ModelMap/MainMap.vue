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
    <div>Map</div>
  </div>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
  name: 'MainMap'
};
</script>
