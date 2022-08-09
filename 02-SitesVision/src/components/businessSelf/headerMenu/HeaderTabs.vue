<!-- Tabs- 导航标签页 -->
<script lang="ts" setup>
import type { TabsItem } from '@/types/index';
// const router = useRouter();
const route = useRoute();

// 监视路由变化动态增减 tabs
watch(route, newV => {
  const isRecord = editableTabs.value.some(e => newV.fullPath === e.path);
  if (!isRecord) {
    editableTabs.value.push({
      title: newV.meta.title + '',
      name: editableTabs.value.length + 1 + '',
      path: newV.fullPath
    });
    console.log(editableTabs.value);
    editableTabsValue.value = editableTabs.value.length + '';
  } else {
    let index = editableTabs.value.findIndex(e => e.path === newV.fullPath);
    if (index !== -1) {
      editableTabsValue.value = index + 1 + '';
    }
  }
});

const editableTabsValue = ref('1');
const editableTabs = ref<Array<TabsItem>>([
  {
    title: '地图主页',
    name: '1',
    path: '/Main'
  }
]);
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
};
</script>
<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="header-tabs"
    @tab-remove="removeTab"
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
