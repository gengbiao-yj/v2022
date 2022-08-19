<!-- 主页 -->
<script setup lang="ts">
import { amapIP } from '@/apis/amap';
import { storage } from '@/utils';
import LayoutUpDown from '@comps/layout/LayoutUpDown.vue';
import LayoutLeftRight from '@comps/layout/LayoutLeftRight.vue';

// 获取布局方式
import basicPinia from '@/pinia/storagePinia';
const basicStore = basicPinia();
const systemSettings = ref(basicStore.systemParams);
watch(
  () => basicStore.systemParams,
  val => {
    systemSettings.value = val;
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
    <transition-group name="fade-transform" mode="out-in" appear>
      <LayoutLeftRight v-if="systemSettings.layoutType === 'LeftRight'">
      </LayoutLeftRight>

      <LayoutUpDown v-if="systemSettings.layoutType === 'UpDown'">
      </LayoutUpDown>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.main-root {
  @include box-size(100vw, 100vh);
  overflow: hidden;
}
</style>

<script lang="ts">
export default {
  name: 'MainMap'
};
</script>
