<!-- 数据表格- 机会项目 -->
<script lang="ts" setup>
import { listViewSites } from '@/apis/user';
import basicPinia from '@/pinia/storagePinia';
import { ElMessage } from 'element-plus';
import { fullScreen } from '@/utils/hooks';
import { _HTMLDivElement } from '@/types';
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DropType } from 'element-plus/es/components/tree/src/tree.type';

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

/*  列表功能
------------------------------------------------ */
/**
 * 全屏
 */
const tableContent = ref() as _HTMLDivElement;
let _fullScreen: () => void;
const setRestFullScreen = () => {
  if (_fullScreen) {
    _fullScreen();
  } else {
    console.log(tableContent.value);
    _fullScreen = fullScreen(tableContent.value);
    _fullScreen();
  }
};

/**
 * 列筛选
 */
const columnPopover = ref(false); // 列设置 popover 展现状态
const treeInstance = ref(); // 列设置 tree instance
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled'
}; // tree props

interface column {
  id: number;
  label: string;
  fixed: string | boolean;
  minWidth: string;
  width: string;
  prop: string;
} // type: tree-node-data 数据类型

const tableColumn = reactive([
  {
    id: 0,
    label: '展示列',
    children: [
      {
        id: 1,
        label: '项目编号',
        fixed: false,
        minWidth: '',
        width: '130',
        prop: 'siteCode'
      },
      {
        id: 2,
        label: '项目名称',
        fixed: false,
        minWidth: '180',
        width: '',
        prop: 'siteName'
      },
      {
        id: 3,
        label: '项目进度',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'progressName'
      },
      {
        id: 4,
        label: '状态',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'siteStatusName'
      },
      {
        id: 5,
        label: '预计开业日期',
        fixed: false,
        minWidth: '',
        width: '120',
        prop: 'planOpenDate'
      },
      {
        id: 6,
        label: '经营性质',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'busTypeName'
      },
      {
        id: 7,
        label: '省份',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'provinceName'
      },
      {
        id: 8,
        label: '城市',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'cityName'
      },
      {
        id: 9,
        label: '区县',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'districtName'
      },
      {
        id: 10,
        label: '门店编号',
        fixed: false,
        minWidth: '',
        width: '',
        prop: 'storeCode'
      },
      {
        id: 11,
        label: '地址',
        fixed: false,
        minWidth: '280',
        width: '',
        prop: 'address'
      },
      {
        id: 12,
        label: '备注',
        fixed: false,
        minWidth: '220',
        width: '',
        prop: 'remark'
      }
    ] as Array<column>
  }
]); // tree node data
const checkedTableColumn = reactive([...tableColumn[0].children]); // 当前已选择要展示的列

// 节点复选框状态变更
const popoverColumnCheck = (
  item: object,
  data: {
    checkedNodes: Array<column>;
  }
) => {
  checkedTableColumn.length = 0;
  // console.log(data);
  data.checkedNodes.forEach(e => {
    if (e.id !== 0) checkedTableColumn.push(e);
  });
};

// 拖拽指示线显示控制
const dragLineShow = (status: 'block' | 'none') => {
  let line = document.querySelector(
    '.table-column-tree + .drag-line'
  ) as HTMLDivElement;
  if (line) {
    line.style.display = status;
    return line;
  }
};

// 重置表格列
const resetTableColumn = (node: object) => {
  checkedTableColumn.length = 0;
  tableColumn[0].children.sort((a, b) => a.id - b.id); // 排序复位
  tableColumn[0] = JSON.parse(JSON.stringify(tableColumn[0])); // 生成新数据，复位DOM排序
  tableColumn[0].children.forEach(e => {
    checkedTableColumn.push(e);
  }); // 表格列顺序复位
  checkedTableColumn.forEach(e => (e.fixed = false)); // 取消所有固定
  nextTick(() => {
    treeInstance.value.setCheckedKeys([0]); // 恢复全选
  });
  // 删除拖拽指示线
  dragLineShow('none');
};

// 列固定
const fixedTableColumn = (node: any, fixed: string) => {
  let filter = checkedTableColumn.filter(e => e.id === node.data.id);
  if (filter.length) {
    filter[0].fixed === fixed
      ? (filter[0].fixed = false)
      : (filter[0].fixed = fixed);
  }
};

// 允许拖拽插入条件
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (dropNode.data.id === 0) {
    return false;
  } else {
    return type === 'prev';
  }
};

// 允许拖拽条件
const allowDrag = (draggingNode: Node) => {
  return draggingNode.data.id !== 0;
};

// 拖拽离开某个节点时触发的事件
const handleDragLeave = (draggingNode: Node, dropNode: Node, ev: any) => {
  const line = dragLineShow('block');
  if (line && ev.target.offsetTop > 50) {
    line.style.top = `${ev.target.offsetTop + 12}px`;
  }
};

// 拖拽完成()成功
const nodeDropSuccess = () => {
  treeInstance.value.setCheckedKeys([0]); // 恢复全选
  let checkedNodes: Array<column> = treeInstance.value.getCheckedNodes(); // 当前选中节点
  // 表格列按新顺序排列
  checkedTableColumn.length = 0;
  checkedNodes = JSON.parse(JSON.stringify(checkedNodes));
  checkedNodes.forEach((e, i) => {
    if (e.id !== 0) {
      e.id = i;
      checkedTableColumn.push(e);
    }
  });
};

// 点击空白处关闭表格列设置弹窗
const closeColumnPopover = () => {
  columnPopover.value = false;
};
onMounted(() => {
  document.body.addEventListener('click', closeColumnPopover);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('click', closeColumnPopover);
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
        <el-button type="primary" @click="searchTable">
          <template #icon>
            <Search />
          </template>
          查询
        </el-button>
        <el-button type="danger">
          <template #icon>
            <Refresh />
          </template>
          清空
        </el-button>
      </template>
    </sv-table-filter>
    <div class="table-box" ref="tableContent">
      <div class="table-setting">
        <div class="tools-box">
          <!-- 新增 -->
          <el-tooltip effect="dark" content="新增" placement="top-start">
            <Plus class="svg-18" />
          </el-tooltip>
          <!-- 刷新 -->
          <el-tooltip effect="dark" content="刷新" placement="top-start">
            <Refresh class="svg-18" @click="searchTable" />
          </el-tooltip>
          <!-- 全屏 -->
          <el-tooltip effect="dark" content="全屏" placement="top-start">
            <FullScreen class="svg-18" @click="setRestFullScreen" />
          </el-tooltip>
          <!-- 列设置 -->
          <el-popover
            v-model:visible="columnPopover"
            placement="bottom"
            :width="230"
            trigger="click"
          >
            <template #reference>
              <div>
                <el-tooltip
                  effect="dark"
                  content="设置列"
                  placement="top-start"
                >
                  <Tools
                    class="svg-18"
                    @click.stop="columnPopover = !columnPopover"
                  />
                </el-tooltip>
              </div>
            </template>
            <el-tree
              :data="tableColumn"
              :props="defaultProps"
              :default-expanded-keys="[0]"
              :default-checked-keys="[0]"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
              class="table-column-tree"
              node-key="id"
              show-checkbox
              ref="treeInstance"
              @check="popoverColumnCheck"
              @node-drag-leave="handleDragLeave"
              @node-drop="nodeDropSuccess"
              @node-collapse="dragLineShow('none')"
              @node-expand="dragLineShow('block')"
            >
              <template #default="{ node }">
                <div class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <div>
                    <el-tooltip
                      effect="dark"
                      content="固定到左侧"
                      placement="bottom-start"
                    >
                      <svg
                        class="icon svg-12 mg-r-15"
                        :class="{ 'primary-color': node.data.fixed == 'left' }"
                        aria-hidden="true"
                        v-show="node.data.id !== 0"
                        @click.stop="fixedTableColumn(node, 'left')"
                      >
                        <use href="#icon-xueyuan-shangyijie"></use>
                      </svg>
                    </el-tooltip>
                    <el-tooltip
                      effect="dark"
                      content="固定到右侧"
                      placement="bottom-start"
                    >
                      <svg
                        class="icon svg-12 mg-r-5"
                        :class="{ 'primary-color': node.data.fixed == 'right' }"
                        aria-hidden="true"
                        v-show="node.data.id !== 0"
                        @click.stop="fixedTableColumn(node, 'right')"
                      >
                        <use href="#icon-xueyuan-xiayijie"></use>
                      </svg>
                    </el-tooltip>
                    <span
                      v-if="node.data.id === 0"
                      class="primary-color ft-s-12"
                      @click.stop="resetTableColumn(node)"
                      >重置</span
                    >
                  </div>
                </div>
              </template>
            </el-tree>
            <div class="drag-line"></div>
          </el-popover>
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
            v-for="item in checkedTableColumn"
            :key="item.id"
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
                v-if="item.id === 11"
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
    overflow: hidden;

    .table-setting {
      @include box-size(100%, 40px);
      @include flex(row, flex-end, center);
      @include primary-bg-color(1);
      .tools-box {
        @include box-size(auto, 100%);
        @include flex(row, flex-end, center);
        color: #5e5e5e;
        padding-right: 10px;
        svg {
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
        > div {
          @include flex(row, center, center);
        }
      }
    }

    .table-content {
      height: calc(100% - 40px);
      //overflow-y: auto;
      &:deep(.el-table) {
        width: 100%;
        border-radius: 0 0 5px 5px;
        border: 1px solid var(--primary-color);
      }
    }

    .table-pagination {
      @include box-size(100%, 60px);
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
      color: #333333;
    }

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
  name: 'ListPipeline'
};
</script>
