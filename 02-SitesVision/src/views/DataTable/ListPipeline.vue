<!-- 数据表格- 机会项目 -->
<script lang="ts" setup></script>
<template>
  <div class="list-pipeline">
    <div class="filter-box">
      <div>
        <span class="ft-s-16 ft-w-6">筛选条件</span>
      </div>
      <div></div>
    </div>
    <div class="table-box"></div>
    <CopyrightLine />
  </div>
</template>

<style lang="scss" scoped>
.list-pipeline {
  @include box-size(100%, 100%);
  .filter-box {
    @include box-size(100%, 135px);
    background: white;
    border-radius: 6px;
    padding: 8px 10px;
  }
  .table-box {
    @include box-size(100%, calc(100% - 190px));
    margin-top: 5px;
    background: white;
    border-radius: 6px;
  }
}
</style>

<script lang="ts">
export default {
  name: 'ListPipeline'
};
</script>
