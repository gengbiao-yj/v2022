<!-- 数据表格- 机会项目 -->
<script lang="ts" setup>
import { _HTMLDivElement } from '@/types';

const formInline = reactive({
  user: '',
  region: ''
});

const onSubmit = () => {
  console.log('submit!');
};

/*  筛选项目展开折叠
------------------------------------------------ */
const filterBoxClose = ref(true); // 折叠展开标志
const filterBox = ref() as _HTMLDivElement;
const changeFilterBoxH = () => {
  filterBox.value.style.willChange = 'height';
  if (filterBoxClose.value) {
    filterBox.value.style.height = filterBox.value.scrollHeight + 'px';
  } else {
    filterBox.value.style.height = 100 + 'px';
  }
  filterBoxClose.value = !filterBoxClose.value;
};
</script>
<template>
  <div class="list-pipeline">
    <div class="filter-box" ref="filterBox">
      <div class="filter-title">
        <span class="ft-s-16 ft-w-6 title-color">筛选条件</span>
        <span class="open-icon" @click="changeFilterBoxH">
          <transition name="breadcrumb">
            <span v-if="filterBoxClose">展开</span>
            <span v-else>折叠</span>
          </transition>
          <svg
            v-rotate:180="filterBoxClose"
            ref="iconCollapse"
            class="icon svg-24"
            aria-hidden="true"
          >
            <use href="#icon-open-up-down"></use>
          </svg>
        </span>
      </div>
      <div class="filter-form">
        <el-form
          :inline="true"
          :model="formInline"
          label-position="left"
          label-width="70px"
          size="small"
          class="demo-form-inline"
        >
          <el-form-item label="省份">
            <el-select v-model="formInline.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item label="城市">
            <el-select v-model="formInline.user" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item label="区县">
            <el-select v-model="formInline.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-form-item label="项目编号">
            <el-input v-model="formInline.user" placeholder="Approved by" />
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="danger" @click="onSubmit">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-box">
      <div>
        <span class="ft-s-16 ft-w-6 title-color">机会点项目列表</span>
      </div>
    </div>
    <CopyrightLine />
  </div>
</template>

<style lang="scss" scoped>
.list-pipeline {
  @include box-size(100%, 100%);
  @include flex(column, center, flex-start);
  .filter-box {
    @include box-size(100%, 100px);
    transition: all 0.3s ease-in-out;
    background: white;
    border-radius: 6px;
    padding: 8px 10px;
    overflow: hidden;
    .filter-title {
      padding-bottom: 6px;
      margin-bottom: 8px;
      position: relative;
    }
    .filter-form {
      @include flex(row, center, flex-start);
      padding-left: 15px;
      > form {
        width: calc(100% - 220px);
      }

      > div:nth-child(2) {
        width: 220px;
        padding-right: 10px;
        @include flex(row, flex-end, center);
      }
    }

    .open-icon {
      font-size: 13px;
      height: 24px;
      position: absolute;
      bottom: -14px;
      top: 0px;
      right: 20px;
      cursor: pointer;
      @include flex(row, flex-start, center);
    }
  }

  .table-box {
    @include box-size(100%, 100%);
    flex: 1;
    margin-top: 5px;
    background: white;
    border-radius: 6px;
    padding: 8px 10px;
  }

  .title-color {
    color: #2c3e50;
  }
}
</style>

<script lang="ts">
export default {
  name: 'ListPipeline'
};
</script>
