<!-- 主页 -->
<script setup lang="ts">
import { amapIP } from '@/apis/amap';
import { storage } from '@/utils';
import LayoutUpDown from '@comps/layout/LayoutUpDown.vue';
import LayoutLeftRight from '@comps/layout/LayoutLeftRight.vue';

import HeaderTitle from '@comps/layout/Main/HeaderTitle.vue';
import HeaderMenu from '@comps/layout/Main/HeaderMenu.vue';
import HeaderOption from '@comps/layout/Main/HeaderOption.vue';
import HeaderTabs from '@comps/layout/Main/HeaderTabs.vue';
import Breadcrumb from '@comps/layout/Main/Breadcrumb.vue';

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
        <!-- 标题 -->
        <template v-slot:Title>
          <HeaderTitle />
        </template>
        <!-- 菜单 -->
        <template v-slot:Menu>
          <HeaderMenu is-aside="vertical" />
        </template>
        <!-- 面包屑导航 -->
        <template v-slot:Breadcrumb>
          <Breadcrumb />
        </template>
        <!-- 操作项 -->
        <template v-slot:Option>
          <HeaderOption />
        </template>
        <!-- 标签页 -->
        <template v-slot:Tabs>
          <HeaderTabs />
        </template>
        <!-- 内容主体 -->
        <template v-slot:Container>
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in" appear>
              <component :is="Component"></component>
            </transition>
          </router-view>
        </template>
      </LayoutLeftRight>
      <LayoutUpDown v-if="systemSettings.layoutType === 'UpDown'">
        <!-- 标题 -->
        <template v-slot:Title>
          <HeaderTitle />
        </template>
        <!-- 菜单 -->
        <template v-slot:Menu>
          <HeaderMenu />
        </template>
        <!-- 操作项 -->
        <template v-slot:Option>
          <HeaderOption />
        </template>
        <!-- 标签页 -->
        <template v-slot:Tabs>
          <HeaderTabs />
        </template>
        <!-- 内容主体 -->
        <template v-slot:Container>
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in" appear>
              <component :is="Component"></component>
            </transition>
          </router-view>
        </template>
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
