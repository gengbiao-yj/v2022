<!-- 系统维护 -->
<script lang="ts" setup>
import { _HTMLDivElement } from '@/types';

const isAsideCollapse = ref(false);
const arg = [0, 160, 0];

const tag = ref() as _HTMLDivElement;
const asideMenu = ref() as _HTMLDivElement;
// '#f1f1f1'
const asideMenuChange = (i: number) => {
  if (asideMenu.value && tag.value) {
    let currentLi = asideMenu.value.children[i] as HTMLDivElement;
    tag.value.style.transform = `translateY(${currentLi.offsetTop - 20}px)`;
  }
};
</script>
<template>
  <div class="Sys-Mg-root">
    <div class="Sys-Mg-content">
      <div
        class="content-aside"
        v-collapseW:[arg]="!isAsideCollapse"
        :class="{ 'aside-collapse': isAsideCollapse }"
      >
        <transition name="inOut" mode="out-in" appear>
          <ul ref="asideMenu" class="aside-menu" v-show="!isAsideCollapse">
            <li @click="asideMenuChange(0)">
              <SetUp class="svg-16" />
              <span>企业维护</span>
            </li>
            <li @click="asideMenuChange(1)">
              <SetUp class="svg-16" />
              <span>品牌维护</span>
            </li>
            <li @click="asideMenuChange(2)">
              <SetUp class="svg-16" />
              <span>用户维护</span>
            </li>
            <li @click="asideMenuChange(3)">
              <SetUp class="svg-16" />
              <span>数据项维护</span>
            </li>
            <li @click="asideMenuChange(4)">
              <SetUp class="svg-16" />
              <span>字段管理</span>
            </li>
            <li @click="asideMenuChange(5)">
              <SetUp class="svg-16" />
              <span>自定义图层维护</span>
            </li>
            <li @click="asideMenuChange(6)">
              <SetUp class="svg-16" />
              <span>城市维护</span>
            </li>
            <li @click="asideMenuChange(7)">
              <SetUp class="svg-16" />
              <span>竞品维护</span>
            </li>
            <li @click="asideMenuChange(8)">
              <SetUp class="svg-16" />
              <span>报告统计</span>
            </li>
            <li @click="asideMenuChange(9)">
              <SetUp class="svg-16" />
              <span>日志统计</span>
            </li>
            <li ref="tag"></li>
          </ul>
        </transition>
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
      @include box-size(160px, 100%);
      position: relative;
      .aside-menu {
        @include box-size(160px, 100%);
        padding: 20px 0px;
        position: relative;
        li {
          cursor: pointer;
          padding-left: 15px;
          height: 48px;
          font-size: 13px;
          color: #646464;
          @include flex(row, flex-start, center);
          > span {
            margin-left: 5px;
          }
        }
        li:last-child {
          @include box-size(calc(100% - 2px), 28px);
          @include primary-bg-color(0.2);
          border-left: 3px solid var(--primary-color);
          position: absolute;
          top: 30px;
          transition: all 0.3s ease-in-out;
        }
      }
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
