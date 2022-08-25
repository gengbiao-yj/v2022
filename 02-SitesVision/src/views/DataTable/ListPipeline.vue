<!-- 数据表格- 机会项目 -->
<script lang="ts" setup>
import type { _HTMLDivElement, DataArea } from '@/types';
import { getDataArea } from '@/utils/hooks';
import { listViewSites } from '@/apis/user';
import basicPinia from '@/pinia/storagePinia';
import { ElMessage } from 'element-plus';

const { getUserInfo } = basicPinia();
const userInfo = getUserInfo();

/*  筛选项目展开折叠
------------------------------------------------ */
const filterBoxClose = ref(true); // 折叠展开标志
const filterBox = ref() as _HTMLDivElement;
const changeFilterBoxH = () => {
  filterBox.value.style.willChange = 'height';
  if (filterBoxClose.value) {
    filterBox.value.style.height = filterBox.value.scrollHeight + 'px';
  } else {
    filterBox.value.style.height = 120 + 'px';
  }
  filterBoxClose.value = !filterBoxClose.value;
};

/*  省市区查询
------------------------------------------------ */
const filterForm = reactive({
  province: '',
  city: '',
  county: '',
  pipelineCode: ''
});

const province = reactive<Array<DataArea>>([]); // 省
const city = reactive<Array<DataArea>>([]); // 市
const county = reactive<Array<DataArea>>([]); // 区

/**
 * 省市区列表查询
 * @param JoinCOde  关联编码
 * @param TypeID
 */
const getAreaList = async (JoinCOde: string, TypeID: number) => {
  const res = await getDataArea(JoinCOde, TypeID);
  if (res) {
    if (TypeID === 101) {
      province.length = 0;
      res.forEach(e => province.push(e));
    } else if (TypeID === 102) {
      city.length = 0;
      res.forEach(e => city.push(e));
    } else if (TypeID === 103) {
      county.length = 0;
      res.forEach(e => county.push(e));
    }
  }
};

/*  数据列表
------------------------------------------------ */
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
      parameter: '',
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
  // 省份列表
  getAreaList('0', 101);
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
    <div class="filter-box" ref="filterBox">
      <div class="filter-title">
        <span class="ft-s-16 ft-w-6 title-color">查询条件</span>
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
          :model="filterForm"
          label-position="left"
          label-width="70px"
          size="middle"
          class="demo-form-inline"
        >
          <!-- 省份 -->
          <el-form-item label="省份">
            <el-select
              v-model="filterForm.province"
              placeholder=""
              @change="val => getAreaList(val, 102)"
            >
              <el-option
                :label="e.cnName"
                :value="e.code"
                v-for="(e, i) in province"
                :key="i"
              />
            </el-select>
          </el-form-item>
          <!-- 城市 -->
          <el-form-item label="城市">
            <el-select
              v-model="filterForm.city"
              placeholder=""
              @change="val => getAreaList(val, 103)"
            >
              <el-option
                :label="e.cnName"
                :value="e.code"
                v-for="(e, i) in city"
                :key="i"
              />
            </el-select>
          </el-form-item>
          <!-- 区县 -->
          <el-form-item label="区县">
            <el-select v-model="filterForm.county" placeholder="">
              <el-option
                :label="e.cnName"
                :value="e.code"
                v-for="(e, i) in county"
                :key="i"
              />
            </el-select>
          </el-form-item>
          <!-- 项目编号 -->
          <el-form-item label="项目编号">
            <el-input v-model="filterForm.pipelineCode" placeholder="" />
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary" @click="searchTable">查询</el-button>
          <el-button type="danger" @click="onSubmit">清空</el-button>
        </div>
      </div>
    </div>
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
              <svg class="icon svg-24" aria-hidden="true">
                <use href="#icon-dizhi"></use>
              </svg>
              <span>
                {{ scope.row.address }}
              </span>
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
    <CopyrightLine />
  </div>
</template>

<style lang="scss" scoped>
.list-pipeline {
  @include box-size(100%, 100%);
  @include flex(column, center, flex-start);
  .filter-box {
    @include box-size(100%, 120px);
    transition: all 0.3s ease-in-out;
    background: white;
    border-radius: 6px;
    padding: 8px 10px 0px;
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
</style>

<script lang="ts">
export default {
  name: 'ListPipeline'
};
</script>
