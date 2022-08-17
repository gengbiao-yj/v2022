<!-- 操作菜单 -->
<script setup lang="ts">
import { busOn } from '@/utils/hooks';
import { defineProps } from 'vue';
// props
const props = defineProps({
  isAside: {
    type: String,
    default: 'horizontal',
    validator(value: string) {
      return ['horizontal', 'vertical'].includes(value);
    }
  }
});

// 订阅总线事件
busOn('menuCollapse', (param: boolean) => {
  menuCollapseState.value = param;
});
const menuCollapseState = ref(false);

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
import SmartRecommend from './SmartRecommend.vue';
import { DataTableType } from '@/data/headerMenu';

// header下拉菜单展开收缩标志位
const smartRecommendShow = ref<boolean>(false); // 智能推荐

// 菜单栏
const activeIndex = ref('0');
const menuSelect = (e: any) => {
  activeIndex.value = e;
};

// 路由刷新，动态激活默认选项
const router = useRouter();
const route = useRoute();
const defaultActive = ref<string>('');
onBeforeMount(() => {
  defaultActive.value = router.currentRoute.value.path;
});
watch(route, newV => {
  defaultActive.value = newV.path;
});
</script>

<template>
  <div class="header-menu-root">
    <el-menu
      :mode="props.isAside"
      :collapse="menuCollapseState"
      router
      :default-active="defaultActive"
      :active-text-color="systemSettings.primaryColor || '#000'"
      :class="{
        'header-height': props.isAside === 'horizontal',
        'aside-height': props.isAside === 'vertical',
        'remove-border': props.isAside === 'vertical'
      }"
      class="menuCollapse"
      @select="menuSelect"
      collapse-transition
    >
      <el-menu-item v-if="false">
        <el-popover
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
              :class="{ 'select-menu-asside': props.isAside === 'vertical' }"
              :style="{
                color:
                  activeIndex == 1 ? systemSettings.primaryColor : '#303133'
              }"
            >
              <Guide class="svg-16 mg-r-5" />
              <span>智能推荐</span>
              <ArrowDown class="svg-12" v-rotate:180="smartRecommendShow" />
            </div>
          </template>
          <SmartRecommend />
        </el-popover>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title
          ><Coin class="svg-18 mg-r-5" /><span>数据管理</span></template
        >
        <el-menu-item
          :index="e.path"
          v-for="(e, i) in DataTableType"
          :key="`3-${i}`"
        >
          <Operation class="svg-16 mg-r-10" />
          {{ e.label }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/Main/SystemManagement">
        <SetUp class="svg-18 mg-r-5" />
        <template #title><span>系统维护</span></template>
      </el-menu-item>

      <el-menu-item index="/Main/ManagementCockpit">
        <DataLine class="svg-18 mg-r-5" />
        <template #title><span>企业驾驶舱</span></template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.header-menu-root {
  .select-menu {
    height: 100%;
    min-width: 85px;
    position: relative;
    @include flex(row, flex-start, center);
    color: #303133;
    cursor: pointer;
    span {
      font-size: 15px;
      margin-right: 5px;
    }
  }
}
.header-height {
  height: 50px;
}
.aside-height {
  height: calc(100% - 50px);
}
.remove-border {
  border: none !important;
}
.select-menu-asside {
  width: 100% !important;
  > svg:nth-child(3) {
    position: absolute;
    right: 1px;
  }
}

.menuCollapse:not(.el-menu--collapse) {
  width: 210px !important;
}
</style>

<script lang="ts">
export default {
  name: 'HeaderMenu'
};
</script>
