<!-- 系统维护 -->
<script lang="ts" setup>
const isAsideCollapse = ref(false);
const arg = [0, 0];
// '#f1f1f1'
</script>
<template>
  <div class="Sys-Mg-root">
    <div class="Sys-Mg-content">
      <div
        class="content-aside"
        v-collapseW:[arg]="!isAsideCollapse"
        :class="{ 'aside-collapse': isAsideCollapse }"
      >
        <div style="width: 200px"></div>
        <svg
          class="icon svg-40"
          aria-hidden="true"
          v-rotateY:180="isAsideCollapse"
          @click="isAsideCollapse = !isAsideCollapse"
        >
          <use href="#icon-zuohua"></use>
        </svg>
      </div>
      <div class="content-main"></div>
    </div>
    <sv-copyright-line />
  </div>
</template>

<style lang="scss" scoped>
.Sys-Mg-root {
  @include box-size(100%, 100%);
  background: #f1f1f1;
  .Sys-Mg-content {
    @include box-size(calc(100%), calc(100% - 43px));
    @include flex(row, flex-start, flex-start);
    margin: 0 auto;
    > div {
      border-radius: 5px;
      background: white;
      border: 1px #e1e1e1 solid;
    }
    .content-aside {
      @include box-size(200px, 100%);
      position: relative;
      > svg {
        position: absolute;
        right: -15px;
        top: calc(50% - 20px);
        cursor: pointer;
        &:hover {
          //animation: ShakeUpDown-sm 0.4s ease;
        }
      }
    }

    .aside-collapse {
      margin-left: 8px;
      border-color: #f1f1f1;
    }

    .content-main {
      height: 100%;
      margin-left: 5px;
      flex: 1;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'SystemManagement'
};
</script>
