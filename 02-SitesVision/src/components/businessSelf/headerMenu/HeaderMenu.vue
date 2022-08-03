<!-- 操作菜单 -->
<script setup lang="ts">
// 获取主体颜色
import basicPinia from '@/pinia/storagePinia';
const basicStore = basicPinia();
const systemSettings = ref(basicStore.systemParams);
watch(
  () => basicStore.systemParams,
  val => {
    systemSettings.value = val;
  }
);

// 细分组件
import SmartRecommend from '@comps/businessSelf/headerMenu/SmartRecommend.vue';
import { SmartReportType, DataTableType } from '@/data/headerMenu';

// header下拉菜单展开收缩标志位
const smartRecommendShow = ref<boolean>(false); // 智能推荐

// 菜单栏
const activeIndex = ref('0');
const menuSelect = (e: any) => {
  activeIndex.value = e;
};
</script>

<template>
  <div class="header-menu-root">
    <el-menu
      mode="horizontal"
      style="height: 50px"
      :active-text-color="systemSettings.primaryColor || '#000'"
      @select="menuSelect"
    >
      <el-menu-item index="1">
        <el-popover
          placement="bottom-end"
          title=""
          :width="700"
          trigger="hover"
          :hide-after="120"
          @before-enter="smartRecommendShow = true"
          @before-leave="smartRecommendShow = false"
          transition="el-zoom-in-top"
        >
          <template #reference>
            <div
              class="select-menu"
              :style="{
                color:
                  activeIndex == 1 ? systemSettings.primaryColor : '#303133'
              }"
            >
              <span> 智能推荐 </span>
              <ArrowDown class="svg-12" v-rotate:180="smartRecommendShow" />
            </div>
          </template>
          <SmartRecommend />
        </el-popover>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>评估报告</template>
        <el-menu-item
          :index="`2-${i}`"
          v-for="(e, i) in SmartReportType"
          :key="`2-${i}`"
        >
          <Operation class="svg-16 mg-r-10" />
          {{ e.label }}
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>数据管理</template>
        <el-menu-item
          :index="`3-${i}`"
          v-for="(e, i) in DataTableType"
          :key="`3-${i}`"
        >
          <Operation class="svg-16 mg-r-10" />
          {{ e.label }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.header-menu-root {
  padding-left: 20px;
  .select-menu {
    height: 100%;
    min-width: 85px;
    @include flex(row, center, center);
    color: #303133;
    cursor: pointer;
    > span {
      font-size: 15px;
      //font-weight: bold;
      margin-right: 5px;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'HeaderMenu'
};
</script>
