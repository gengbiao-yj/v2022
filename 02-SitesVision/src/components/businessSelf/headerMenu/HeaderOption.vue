<script setup lang="ts">
import basicPinia from '@/pinia/storagePinia';

// 获取用户信息
const basicStore = basicPinia();
const { getUserInfo } = basicStore;
const userInfo = getUserInfo();
const userName = ref(userInfo.userName);

const collapse = ref('0');
</script>
<template>
  <div class="header-option-root">
    <span class="svg-item">
      <Setting style="color: white" class="svg-20" />
    </span>
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
        <span class="svg-item">
          <BellFilled style="color: white" class="svg-20" />
          <span class="notice-point"></span>
        </span>
      </template>
      <div>~~~~~~~~~~~</div>
    </el-popover>
    <!-- 用户操作 -->
    <el-popover
      placement="bottom-end"
      title=""
      :width="270"
      trigger="click"
      :hide-after="120"
      transition="el-zoom-in-top"
      popper-class="header-option-popover"
    >
      <template #reference>
        <span class="svg-item"
          ><Avatar style="color: white" class="svg-20"
        /></span>
      </template>
      <div class="user-option">
        <div class="user-option-header">
          <span class="avatar-box"
            ><Avatar style="color: white" class="svg-36"
          /></span>
          <span class="user-name">{{ userName }}</span>
        </div>
        <div class="user-option-list">
          <el-collapse v-model="collapse" accordion>
            <el-collapse-item title="个人信息" name="1">
              <div>111</div>
            </el-collapse-item>
            <el-collapse-item title="后台管理" name="2">
              <div>222</div>
            </el-collapse-item>
            <el-collapse-item title="企业驾驶舱" name="3">
              <div>333</div>
            </el-collapse-item>
            <el-collapse-item title="帮助视频" name="4">
              <div>444</div>
            </el-collapse-item>
            <el-collapse-item title="退出登录" name="5">
              <div>444</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-popover>
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
    background: rgb(121, 182, 246);
    cursor: pointer;
    position: relative;
    margin-right: 20px;
    &:hover {
      background: rgb(255, 198, 60);
    }
    &:nth-child(3) {
      margin-right: 0px;
    }
    .notice-point {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'HeaderOptions'
};
</script>
