<script setup lang="ts">
import { nanoid } from 'nanoid';
// 细分组件
import SmartRecommend from '@comps/businessSelf/headerMenu/SmartRecommend.vue';
import ListMenus from '@comps/businessSelf/headerMenu/ListMenus.vue';
import { SmartReportType, DataTableType } from '@/data/headerMenu';

// header下拉菜单展开收缩标志位
const smartRecommendShow = ref<boolean>(false); // 智能推荐
const smartReportShow = ref<boolean>(false); // 评估报告
const dataTableShow = ref<boolean>(false); // 数据管理
// 下拉菜单手风琴
const popoverClose = (index: number) => {
  const menus = [smartRecommendShow, smartReportShow, dataTableShow];
  const currentClick = menus.splice(index, 1);
  currentClick[0].value = !currentClick[0].value;
  menus.forEach(e => {
    e.value = false;
  });
};
// 评估报告 popover 样式选择器
const smartReportPopoverClass: string = nanoid();
console.log(smartReportPopoverClass);
</script>

<template>
  <div class="header-menu-root">
    <!-- 智能推荐 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="700"
      trigger="click"
      :hide-after="120"
      @hide="smartRecommendShow = false"
      v-model="smartRecommendShow"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <div class="select-menu" @click="popoverClose(0)">
          <span> 智能推荐 </span>
          <CaretTop class="svg-16" v-rotate:180="smartRecommendShow" />
        </div>
      </template>
      <SmartRecommend />
    </el-popover>
    <!-- 评估报告 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="100"
      trigger="click"
      :hide-after="120"
      @hide="smartReportShow = false"
      v-model="smartReportShow"
      popper-class="header-menu-popover"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <div class="select-menu" @click="popoverClose(1)">
          <span> 评估报告 </span>
          <CaretTop class="svg-16" v-rotate:180="smartReportShow" />
        </div>
      </template>
      <ListMenus :menus="SmartReportType" />
    </el-popover>
    <!-- 数据管理 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="110"
      trigger="click"
      :hide-after="120"
      @hide="dataTableShow = false"
      v-model="dataTableShow"
      popper-class="header-menu-popover"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <div class="select-menu" @click="popoverClose(2)">
          <span> 数据管理 </span>
          <CaretTop class="svg-16" v-rotate:180="dataTableShow" />
        </div>
      </template>
      <ListMenus :menus="DataTableType" />
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.header-menu-root {
  @include box-size(100%, 100%);
  @include flex(row, flex-start, center);
  .select-menu {
    height: 100%;
    min-width: 120px;
    padding: 0 8px;
    @include flex(row, center, center);
    color: #fff;
    cursor: pointer;
    > span {
      font-size: 15px;
      font-weight: bold;
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
