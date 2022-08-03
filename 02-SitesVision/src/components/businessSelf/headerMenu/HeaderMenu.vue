<!-- 操作菜单 -->
<script setup lang="ts">
// import { nanoid } from 'nanoid';
// 细分组件
import SmartRecommend from '@comps/businessSelf/headerMenu/SmartRecommend.vue';
import ListMenus from '@comps/businessSelf/headerMenu/ListMenus.vue';
import { SmartReportType, DataTableType } from '@/data/headerMenu';

// header下拉菜单展开收缩标志位
const smartRecommendShow = ref<boolean>(false); // 智能推荐
const smartReportShow = ref<boolean>(false); // 评估报告
const dataTableShow = ref<boolean>(false); // 数据管理
</script>

<template>
  <div class="header-menu-root">
    <!-- 智能推荐 -->
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
        <div class="select-menu">
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
      trigger="hover"
      :hide-after="120"
      @before-enter="smartReportShow = true"
      @before-leave="smartReportShow = false"
      popper-class="header-menu-popover"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <div class="select-menu">
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
      trigger="hover"
      :hide-after="120"
      @before-enter="dataTableShow = true"
      @before-leave="dataTableShow = false"
      popper-class="header-menu-popover"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <div class="select-menu">
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
