<script setup lang="ts">
import basicPinia from '@/pinia/storagePinia';
import { fullScreen } from '@/utils/others';
import SystemSetting from '@comps/businessSelf/headerMenu/SystemSetting.vue';

// 获取用户信息
const basicStore = basicPinia();
const { getUserInfo } = basicStore;
const userInfo = getUserInfo();
const userName = ref(userInfo.userName);

// const collapse = ref('0');
const setRestFullScreen = fullScreen();

const optionDrawer = ref<boolean>(false);
</script>
<template>
  <div class="header-option-root">
    <!-- 通知 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="110"
      trigger="click"
      :hide-after="120"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <SLMBadge :content="11">
          <span class="svg-item">
            <Bell style="color: white" class="svg-20" />
          </span>
        </SLMBadge>
      </template>
      <div>~~~~~~~~~~~</div>
    </el-popover>
    <!-- 刷新 -->
    <span class="svg-item">
      <Refresh style="color: white" class="svg-20" />
    </span>
    <!-- 全屏 -->
    <span class="svg-item" @click="setRestFullScreen">
      <FullScreen style="color: white" class="svg-20" />
    </span>
    <!-- 设置 -->
    <span class="svg-item" @click="optionDrawer = true">
      <Setting style="color: white" class="svg-20" />
    </span>
    <!-- 用户操作 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="160"
      trigger="click"
      :hide-after="120"
      transition="el-zoom-in-top"
      popper-class="header-option-popover"
    >
      <template #reference>
        <span class="svg-item svg-bg"
          ><Avatar style="color: white" class="svg-20"
        /></span>
      </template>
      <div class="user-option">
        <div class="user-option-header">
          <span class="avatar-box"
            ><Avatar style="color: white" class="svg-30"
          /></span>
          <span class="user-name">{{ userName }}</span>
        </div>
        <div class="user-option-list">
          <div>
            <User class="svg-16" />
            <span>个人信息</span>
          </div>
          <div>
            <SetUp class="svg-16" />
            <span>后台管理</span>
          </div>
          <div>
            <DataLine class="svg-16" />
            <span>企业驾驶舱</span>
          </div>
          <div>
            <VideoCamera class="svg-16" />
            <span>帮助视频</span>
          </div>
          <div>
            <SwitchButton class="svg-16" />
            <span>退出登录</span>
          </div>
        </div>
      </div>
    </el-popover>

    <SystemSetting v-model="optionDrawer" />
  </div>
</template>

<style scoped lang="scss">
.header-option-root {
  @include box-size(100%, 100%);
  @include flex(row, flex-end, center);
  .svg-item {
    @include box-size(35px, 35px);
    @include flex(row, center, center);
    border-radius: 999px;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
    transition: all 0.3s ease-in-out;

    &:last-child {
      margin-right: 5px;
    }
  }

  .svg-bg {
    background: rgb(121, 182, 246);
    &:hover {
      //background: rgba(3, 66, 133, 0.3);
    }
  }
}

.user-option {
  border-radius: 5px;
  overflow: hidden;
  .user-option-header {
    background: #fafafa;
    padding-left: 10px;
    @include box-size(100%, 45px);
    @include flex(row, flex-start, center);
    .avatar-box {
      border-radius: 999px;
      background: #e9e5e5;
      @include box-size(36px, 36px);
      @include flex(row, center, center);
    }
    .user-name {
      margin-left: 8px;
      height: 36px;
      text-align: left;
      line-height: 36px;
      color: #333;
      font-weight: bold;
    }
  }
}

.user-option-list {
  width: 100%;
  min-height: 100px;
  background: white;
  padding: 8px 0;
  @include flex(column, flex-start, center);
  > div {
    height: 35px;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    color: #666;
    &:hover {
      background: #e6f3fc;
      color: #34a0e8;
    }
    @include flex(row, flex-start, center);
    > svg {
      margin-right: 5px;
    }
    > span {
      width: calc(100% - 30px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'HeaderOptions'
};
</script>
