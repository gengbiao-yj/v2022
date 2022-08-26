<!-- 数据表格- 机会项目 -->
<script lang="ts" setup>
import { listViewSites } from '@/apis/user';
import basicPinia from '@/pinia/storagePinia';
import { ElMessage } from 'element-plus';

const { getUserInfo } = basicPinia();
const userInfo = getUserInfo();

/*  数据列表
------------------------------------------------ */
const filterForm = reactive({
  province: '', // 省份
  city: '', // 城市
  county: '', // 区县
  pipelineCode: '' // 项目编号
});
const currentPage = ref(1); // 当前页码
const pageSize = ref(15); // 每页数据量
const totalPipeline = ref(0);
const loading = ref(false); // 加载动画
// 每页数据量改变
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  searchTableData();
};

// 页码改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  searchTableData();
};

const tableData = reactive<Array<object>>([]); // 表格数据

// 查询列表数据
const searchTableData = async () => {
  try {
    loading.value = true;
    const { data, code } = await listViewSites({
      cusNo: userInfo.cusNo || '',
      provinceCode: filterForm.province,
      cityCode: filterForm.city,
      districtCode: filterForm.county,
      parameter: filterForm.pipelineCode,
      size: pageSize.value,
      page: currentPage.value
    });
    loading.value = false;
    if (code === 200) {
      tableData.length = 0;
      data.rows.forEach((e: object) => tableData.push(e));
      totalPipeline.value = data.total;
    }
  } catch (error) {
    loading.value = false;
    ElMessage.warning('查询失败！');
    console.log(error);
  }
};

// 按钮查询
const searchTable = () => {
  searchTableData();
};

/*  生命周期
------------------------------------------------ */
onBeforeMount(() => {
  // 数据查询
  searchTableData();
});
</script>
<template>
  <div
    class="list-pipeline"
    v-loading="loading"
    element-loading-background="rgba(100,100,100,0.4)"
    element-loading-text="加载中..."
  >
    <sv-table-filter>
      <template #form>
        <el-form
          :inline="true"
          :model="filterForm"
          label-position="left"
          label-width="70px"
          class="demo-form-inline"
        >
          <sv-area-data
            v-model:province="filterForm.province"
            v-model:city="filterForm.city"
            v-model:county="filterForm.county"
          />
          <!-- 项目编号 -->
          <el-form-item label="项目编号">
            <el-input v-model="filterForm.pipelineCode" placeholder="">
              <template #suffix>
                <transition name="upDown" mode="out-in" appear>
                  <el-icon
                    v-if="filterForm.pipelineCode"
                    class="el-input__icon cur-pointer"
                    @click="filterForm.pipelineCode = ''"
                    ><CircleClose
                  /></el-icon>
                  <el-icon v-else class="el-input__icon"><EditPen /></el-icon>
                </transition>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #btn>
        <el-button type="primary" @click="searchTable">查询</el-button>
        <el-button type="danger">清空</el-button>
      </template>
    </sv-table-filter>
    <div class="table-box">
      <div class="table-content">
        <el-table
          :data="tableData"
          height="calc(100% - 65px)"
          style="width: 100%"
          header-cell-class-name="table-header-cell"
          cell-class-name="table-cell"
        >
          <el-table-column label="#" type="index" />
          <el-table-column
            prop="siteCode"
            label="项目编号"
            width="130"
            show-overflow-tooltip
          />
          <el-table-column
            prop="siteName"
            label="项目名称"
            width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="progressName"
            label="项目进度"
            show-overflow-tooltip
          />
          <el-table-column
            prop="siteStatusName"
            label="状态"
            show-overflow-tooltip
          />
          <el-table-column
            prop="planOpenDate"
            label="预计开业日期"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="busTypeName"
            label="经营性质"
            show-overflow-tooltip
          />
          <el-table-column
            prop="provinceName"
            label="省份"
            show-overflow-tooltip
          />
          <el-table-column prop="cityName" label="城市" show-overflow-tooltip />
          <el-table-column
            prop="districtName"
            label="区县"
            show-overflow-tooltip
          />
          <el-table-column
            prop="storeCode"
            label="门店编号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="address"
            label="地址"
            width="280"
            show-overflow-tooltip
          >
            <template #default="scope">
              <div class="address-column">
                <svg class="icon svg-24" aria-hidden="true">
                  <use href="#icon-dizhi"></use>
                </svg>
                <span>
                  {{ scope.row.address }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="220"
            show-overflow-tooltip
          />
        </el-table>
        <div class="table-pagination">
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPipeline"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <sv-copyright-line />
  </div>
</template>

<style lang="scss" scoped>
.list-pipeline {
  @include box-size(100%, 100%);
  @include flex(column, center, flex-start);

  .table-box {
    @include box-size(100%, 100%);
    flex: 1;
    margin-top: 10px;
    background: white;
    border-radius: 6px;
    padding: 0px 0px 0px;
    overflow: hidden;

    .table-content {
      height: 100%;
      overflow-y: auto;
    }

    .table-pagination {
      @include box-size(100%, 65px);
      @include flex(row, flex-end, center);
      padding-right: 20px;
      overflow-x: auto;
    }
  }

  .title-color {
    @include primary-color();
  }

  &::v-deep {
    .table-header-cell {
      @include primary-bg-color(0.5);
      color: #333333;
    }

    .table-cell .cell {
      font-size: 13px;
      .address-column {
        @include flex(row, flex-start, center);
        > svg {
          width: 28px;
          cursor: pointer;
        }

        > span {
          width: calc(100% - 28px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'ListPipeline'
};
</script>
