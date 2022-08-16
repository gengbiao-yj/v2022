<!-- 系统设置 - 侧拉抽屉 -->
<script setup lang="ts">
/*  init
------------------------------------------------ */
import { defineProps, defineEmits } from 'vue';
import type { SystemSetType } from '@/types/index';
import basicPinia from '@/pinia/storagePinia';
const basicStore = basicPinia();
const { getSystemParams, setSystemParams } = basicStore;

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

/*  el-drawer 显示隐藏控制
------------------------------------------------ */
const showDraw = ref<boolean>(props.modelValue || false);
watch(
  () => props.modelValue,
  newV => {
    showDraw.value = newV;
  }
);
const updateState = () => {
  emit('update:modelValue', false);
};

/*  存储设置数据
------------------------------------------------ */
const systemSettings = computed<SystemSetType>(() => {
  return getSystemParams();
});
// 设置新主题
const newPrimaryColor = () => {
  systemSettings.value.historyPrimaryCol.unshift(
    systemSettings.value.primaryColor
  );
  if (systemSettings.value.historyPrimaryCol.length > 6) {
    systemSettings.value.historyPrimaryCol.splice(5);
  }
  setSystemParams(systemSettings.value);
};

// 选择历史主题
const selectOldPrimary = (e: string) => {
  systemSettings.value.primaryColor = e;
  setSystemParams(systemSettings.value);
};

// 选择布局方式
const selectLayoutType = (e: 'UpDown' | 'LeftRight') => {
  systemSettings.value.layoutType = e;
  setSystemParams(systemSettings.value);
};
</script>

<template>
  <!-- 设置 -->
  <el-drawer
    v-model="showDraw"
    title="系统设置"
    direction="rtl"
    custom-class="setting-draw"
    :size="270"
    @close="updateState"
  >
    <div class="setting-draw-content">
      <el-divider> 主题颜色 </el-divider>
      <el-color-picker
        v-model="systemSettings.primaryColor"
        @change="newPrimaryColor"
      />
      <div class="primary-box">
        <div v-for="(e, i) in systemSettings.historyPrimaryCol" :key="i">
          <span
            class="primary-box-item"
            :style="{ background: e }"
            @click="selectOldPrimary(e)"
          ></span>
          <span
            v-if="e === systemSettings.primaryColor"
            class="circle-tip"
          ></span>
        </div>
      </div>
      <el-divider> 布局方式 </el-divider>
      <div class="layout-type-box">
        <!-- 左右 -->
        <div class="layout-type">
          <div @click="selectLayoutType('LeftRight')">
            <div class="layout-aside"></div>
          </div>
          <span>左右</span>
          <span
            v-if="systemSettings.layoutType === 'LeftRight'"
            class="circle-tip"
          ></span>
        </div>
        <!-- 上下 -->
        <div class="layout-type">
          <div @click="selectLayoutType('UpDown')">
            <div class="layout-header"></div>
          </div>
          <span>上下</span>
          <span
            v-if="systemSettings.layoutType === 'UpDown'"
            class="circle-tip"
          ></span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-draw {
  &-content {
    width: 100%;
    height: 100%;
    @include flex(column, flex-start, center);
  }
}

.circle-tip {
  margin-top: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #03be32;
}

.primary-box {
  width: 100%;
  margin-top: 10px;
  height: auto;
  @include flex(row, space-around, center);
  flex-wrap: wrap;
  > div {
    width: 26px;
    height: 40px;
    @include flex(column, flex-start, center);
    > .primary-box-item {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      padding: 1px;
      border: 1px solid #afafaf;
      cursor: pointer;
    }
  }
}

.layout-type-box {
  width: 100%;
  height: auto;
  @include flex(row, space-around, center);
  > .layout-type {
    height: 80px;
    @include flex(column, flex-start, center);
    > div {
      width: 50px;
      height: 40px;
      position: relative;
      background: #d4d4d4;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 10px 2px #ededed;
      .layout-aside {
        width: 15px;
        height: 100%;
        background: #1a1a1a;
        position: absolute;
        left: 0px;
      }
      .layout-header {
        height: 10px;
        width: 100%;
        background: #ffffff;
        position: absolute;
        top: 0px;
      }
    }
    > span:nth-child(2) {
      font-size: 12px;
      color: #333333;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'SystemSetting'
};
</script>
