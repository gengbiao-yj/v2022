<!-- 数据表格- 已有商圈 -->
<script lang="ts" setup>
import { listViewTas } from '@/apis/user';
import basicPinia from '@/pinia/storagePinia';
import { ElMessage } from 'element-plus';
import { _HTMLDivElement } from '@/types';

const { getUserInfo } = basicPinia();
const userInfo = getUserInfo();

/*  数据列表
------------------------------------------------ */
const filterForm = reactive({
  province: '', // 省份
  city: '', // 城市
  county: '', // 区县
  keyWord: '' // 关键字
});
const currentPage = ref(1); // 当前页码
const pageSize = ref(15); // 每页数据量
const totalPipeline = ref(0);
const loading = ref(false); // 加载动画
const tableData = reactive<Array<object>>([]); // 表格数据

// 重置查询项
const resetFilters = () => {
  filterForm.province = '';
  filterForm.city = ''; // 城市
  filterForm.county = ''; // 区县
  filterForm.keyWord = ''; // 关键字
};

// 查询列表数据
const searchTableData = async () => {
  try {
    loading.value = true;
    const { data, code } = await listViewTas({
      cusNo: userInfo.cusNo || '',
      provinceCode: filterForm.province,
      cityCode: filterForm.city,
      districtCode: filterForm.county,
      parameter: filterForm.keyWord,
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

/*  列表功能
------------------------------------------------ */
const tableContent = ref() as _HTMLDivElement; // 表格容器实例，用于全屏

// 表格列配置
const checkedTableColumn = reactive({
  value: [
    {
      id: 1,
      label: '商圈名称',
      fixed: false,
      minWidth: '',
      width: '240',
      prop: 'cnName'
    },
    {
      id: 2,
      label: '商圈类型',
      fixed: false,
      minWidth: '',
      width: '120',
      prop: 'taTypeName'
    },
    {
      id: 3,
      label: '商圈等级',
      fixed: false,
      minWidth: '',
      width: '',
      prop: 'taLevelName'
    },
    {
      id: 4,
      label: '商圈面积',
      fixed: false,
      minWidth: '',
      width: '',
      prop: 'taArea'
    },
    {
      id: 5,
      label: '评分',
      fixed: false,
      minWidth: '',
      width: '',
      prop: 'score'
    },
    {
      id: 6,
      label: '创建人',
      fixed: false,
      minWidth: '',
      width: '',
      prop: 'creator'
    },
    {
      id: 7,
      label: '创建日期',
      fixed: false,
      minWidth: '',
      width: '180',
      prop: 'createDate'
    }
    // {
    //   id: 8,
    //   label: '省份',
    //   fixed: false,
    //   minWidth: '',
    //   width: '',
    //   prop: 'provinceName'
    // },
    // {
    //   id: 9,
    //   label: '城市',
    //   fixed: false,
    //   minWidth: '',
    //   width: '',
    //   prop: 'cityName'
    // },
    // {
    //   id: 10,
    //   label: '区县',
    //   fixed: false,
    //   minWidth: '',
    //   width: '',
    //   prop: 'districtName'
    // },
    // {
    //   id: 11,
    //   label: '地址',
    //   fixed: false,
    //   minWidth: '280',
    //   width: '',
    //   prop: 'address'
    // }
  ]
});

/*  生命周期
------------------------------------------------ */
onBeforeMount(() => {
  // 数据查询
  searchTableData();
});
</script>
<template>
  <div
    class="list-root"
    v-loading="loading"
    element-loading-background="rgba(100,100,100,0.4)"
    element-loading-text="加载中..."
  >
    <sv-table-filter title="已有商圈">
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
            size="small"
          />
          <!-- 关键字 -->
          <el-form-item label="关键字">
            <el-input v-model="filterForm.keyWord" placeholder="" size="small">
              <template #suffix>
                <transition name="upDown" mode="out-in" appear>
                  <el-icon
                    v-if="filterForm.keyWord"
                    class="el-input__icon cur-pointer"
                    @click="filterForm.keyWord = ''"
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
        <el-button type="primary" @click="searchTable" size="small">
          <template #icon>
            <Search />
          </template>
          查询
        </el-button>
        <el-button type="danger" size="small" @click="resetFilters">
          <template #icon>
            <Refresh />
          </template>
          重置
        </el-button>
      </template>
    </sv-table-filter>
    <div class="table-box" ref="tableContent">
      <div class="table-setting">
        <div class="pd-l-10">
          <el-button size="small">
            <template #icon>
              <Plus class="primary-color" />
            </template>
            <span class="primary-color">新建</span>
          </el-button>
          <el-button size="small">
            <template #icon>
              <Download class="primary-color" />
            </template>
            <span class="primary-color">导出</span>
          </el-button>
        </div>
        <div class="tools-box">
          <!-- 刷新 -->
          <el-tooltip effect="dark" content="刷新" placement="top-start">
            <Refresh class="svg-18" @click="searchTable" />
          </el-tooltip>
          <!-- 全屏 -->
          <sv-full-screen :tableInstance="tableContent" />
          <!-- 列表设置 -->
          <sv-table-column-option
            v-model:tableColumn="checkedTableColumn.value"
          />
        </div>
      </div>
      <div class="table-content">
        <el-table
          :data="tableData"
          height="calc(100% - 60px)"
          header-cell-class-name="table-header-cell"
          cell-class-name="table-cell"
          style="width: 100%"
        >
          <el-table-column key="index" label="#" type="index" fixed="left" />

          <el-table-column
            v-for="(item, i) in checkedTableColumn.value"
            :key="i"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :fixed="item.fixed"
            :min-width="item.minWidth"
            show-overflow-tooltip
          >
            <template #default="scope">
              <svg
                class="icon svg-24 cur-pointer"
                aria-hidden="true"
                v-if="item.id === 9"
              >
                <use href="#icon-dizhi"></use>
              </svg>
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <sv-table-pagination
            v-model:currentPage="currentPage"
            v-model:pageSize="pageSize"
            :total="totalPipeline"
            :pageSizeOption="[5, 10, 15, 20]"
            @change="searchTableData"
          />
        </div>
      </div>
    </div>
    <sv-copyright-line />
  </div>
</template>

<style lang="scss" scoped>
.list-root {
  @include box-size(100%, 100%);
  @include flex(column, center, flex-start);

  .table-box {
    @include box-size(100%, 100%);
    flex: 1;
    margin-top: 10px;
    background: white;
    border-radius: 6px;
    overflow: hidden;

    .table-setting {
      @include box-size(100%, 40px);
      @include flex(row, space-between, center);
      @include primary-bg-color(0.5);
      .tools-box {
        @include box-size(auto, 100%);
        @include flex(row, flex-end, center);
        padding-right: 10px;
        svg,
        &:deep(> svg),
        &:deep(.el-tooltip__trigger > svg) {
          margin-left: 16px;
          cursor: pointer;
          color: white;
          &:hover {
            transition: all 0.5s ease-in-out;
            transform: rotate(180deg);
          }
          &:focus {
            outline: none;
          }
        }
      }
    }

    .table-content {
      height: calc(100% - 40px);
      &:deep(.el-table) {
        width: 100%;
        border-radius: 0 0 5px 5px;
        border: 1px solid;
        @include primary-border-color(0.5);
      }
    }

    .table-pagination {
      @include box-size(100%, 60px);
      @include flex(row, flex-end, center);
      overflow-x: auto;
    }
  }

  &::v-deep {
    // 标题行样式
    .table-header-cell {
      color: #333333;
    }

    // 单元格排布
    .table-cell .cell {
      font-size: 13px;
      position: relative;
      > svg {
        width: 28px;
        position: absolute;
      }

      > span:nth-child(2) {
        margin-left: 32px;
      }
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'ListBusinessCircle'
};
</script>
