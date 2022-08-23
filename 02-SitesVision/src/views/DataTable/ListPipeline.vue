<!-- 数据表格- 机会项目 -->
<script lang="ts" setup>
const formInline = reactive({
  user: '',
  region: ''
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
<template>
  <div class="list-pipeline">
    <div class="filter-box">
      <div class="mg-b-15">
        <span class="ft-s-16 ft-w-6 title-color">筛选条件</span>
      </div>
      <div class="pd-l-15">
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

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="danger" @click="onSubmit">清空</el-button>
          </el-form-item>
        </el-form>
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
  .filter-box {
    @include box-size(100%, 135px);
    background: white;
    border-radius: 6px;
    padding: 8px 10px;
  }
  .table-box {
    @include box-size(100%, calc(100% - 190px));
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
