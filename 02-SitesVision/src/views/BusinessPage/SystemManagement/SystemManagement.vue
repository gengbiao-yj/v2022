<!-- 系统维护 -->
<script lang="ts" setup></script>
<template>
  <div class="Sys-Mg-root">
    <div class="Sys-Mg-content">
      <div class="content-aside"></div>
      <div class="content-main"></div>
    </div>
    <CopyrightLine />
  </div>
</template>

<style lang="scss" scoped>
.Sys-Mg-root {
  @include box-size(100%, 100%);
  background: #f1f1f1;
  .Sys-Mg-content {
    @include box-size(calc(100% - 12px), calc(100% - 55px));
    @include flex(row, flex-start, flex-start);
    margin: 0 auto;
    padding-top: 5px;
    > div {
      border-radius: 5px;
      background: white;
      border: 1px #e1e1e1 solid;
    }
    .content-aside {
      @include box-size(200px, 100%);
    }

    .content-main {
      margin-left: 5px;
      @include box-size(calc(100% - 205px), 100%);
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'SystemManagement'
};
</script>
