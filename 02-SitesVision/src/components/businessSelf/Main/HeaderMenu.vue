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
      mode="horizontal"
      router
      style="height: 50px"
      :default-active="defaultActive"
      :active-text-color="systemSettings.primaryColor || '#000'"
      @select="menuSelect"
    >
      <el-menu-item>
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
              <Guide class="svg-16 mg-r-5" />
              <span>智能推荐</span>
              <ArrowDown class="svg-12" v-rotate:180="smartRecommendShow" />
            </div>
          </template>
          <SmartRecommend />
        </el-popover>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title><Coin class="svg-16 mg-r-5" />数据管理</template>
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
        <template #title><SetUp class="svg-16 mg-r-5" />系统维护</template>
      </el-menu-item>
      <el-menu-item index="/Main/ManagementCockpit">
        <template #title><DataLine class="svg-16 mg-r-5" />企业驾驶舱</template>
      </el-menu-item>
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
