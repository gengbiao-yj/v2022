<!-- Tabs- 导航标签页 -->
<script lang="ts" setup>
import type { TabsItem } from '@/types/index';
import type { TabsPaneContext } from 'element-plus';
import basicPinia from '@/pinia/storagePinia';
const basicStore = basicPinia();
const { setTabs, getTabs } = basicStore;

// 初始数据
const editableTabsValue = ref('1');
const editableTabs = ref<Array<TabsItem>>(getTabs());
const router = useRouter();
const route = useRoute();

// 监视路由变化动态增减 tabs
watch(route, newV => {
  console.log(newV);
  const isRecord = editableTabs.value.some(e => newV.path === e.path);
  if (!isRecord) {
    editableTabs.value.push({
      title: newV.meta.title + '',
      name: editableTabs.value.length + 1 + '',
      path: newV.path
    });
    editableTabsValue.value = editableTabs.value.length + '';
    setTabs(editableTabs.value);
  } else {
    let index = editableTabs.value.findIndex(e => e.path === newV.fullPath);
    if (index !== -1) {
      editableTabsValue.value = index + 1 + '';
    }
  }
});

// 移除 tab
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter(tab => tab.name !== targetName);
  setTabs(editableTabs.value);
  activeTabRouter(activeName);
};

// 点击 tab
const clickTab = (e: TabsPaneContext) => {
  activeTabRouter(e.paneName as string);
};

// 过滤当前激活中tab，并跳转路由
const activeTabRouter = (activePaneName: string) => {
  let activeItem = editableTabs.value.find(k => k.name === activePaneName);
  if (activeItem!.path) {
    router.push(activeItem!.path);
  }
};
</script>
<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="header-tabs"
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="item.name !== '1'"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'HeaderTabs'
};
</script>
