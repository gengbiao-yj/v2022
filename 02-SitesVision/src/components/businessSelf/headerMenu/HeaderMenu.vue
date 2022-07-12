<script setup lang="ts">
import SmartRecommend from './SmartRecommend';
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
      trigger="click"
      v-model:visible="smartRecommendShow"
    >
      <template #reference>
        <div
          class="select-menu"
          @click="smartRecommendShow = !smartRecommendShow"
        >
          <span> 智能推荐 </span>
          <ArrowDown class="svg-20" v-rotate:180="smartRecommendShow" />
        </div>
      </template>
      <SmartRecommend />
    </el-popover>
    <!-- 评估报告 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="200"
      trigger="click"
      v-model:visible="smartReportShow"
    >
      <template #reference>
        <div class="select-menu" @click="smartReportShow = !smartReportShow">
          <span> 评估报告 </span>
          <ArrowDown class="svg-20" v-rotate:180="smartReportShow" />
        </div>
      </template>
      <div>AAA</div>
    </el-popover>
    <!-- 数据管理 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="200"
      trigger="click"
      v-model:visible="dataTableShow"
    >
      <template #reference>
        <div class="select-menu" @click="dataTableShow = !dataTableShow">
          <span> 数据管理 </span>
          <ArrowDown class="svg-20" v-rotate:180="dataTableShow" />
        </div>
      </template>
      <div>AAA</div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.header-menu-root {
  @include box-size(70%, 100%);
  @include flex(row, flex-start, center);
  .select-menu {
    height: 100%;
    min-width: 120px;
    padding: 0 10px;
    @include flex(row, center, center);
    color: #fff;
    cursor: pointer;
    > span {
      font-size: 16px;
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
