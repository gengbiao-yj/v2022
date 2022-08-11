<!-- 系统维护 -->
<script lang="ts" setup>
import type { _HTMLDivElement, _SVGElement } from '@/types';
import { CollapseWidth } from '@/utils';
const asideCollapse = ref() as _HTMLDivElement;
const iconCollapse = ref() as _SVGElement;
</script>
<template>
  <div class="Sys-Mg-root">
    <div class="Sys-Mg-content">
      <div class="content-aside" ref="asideCollapse">
        <svg
          ref="iconCollapse"
          class="icon svg-40"
          aria-hidden="true"
          @click="
            CollapseWidth(asideCollapse, iconCollapse, 200, 'Left', '#f1f1f1')
          "
        >
          <use href="#icon-zuohua"></use>
        </svg>
      </div>
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
