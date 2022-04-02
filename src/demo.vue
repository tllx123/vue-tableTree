<template>
  <div>
    <div>
      <t-button theme="default" @click="setData1">重置数据</t-button>
    </div>
    <br />
    <!-- 第一列展开树结点，缩进为 24px，子节点字段 childrenKey 默认为 children -->
    <!-- !!! 树形结构 EnhancedTable 才支持，普通 Table 不支持 !!! -->
    <!-- treeNodeColumnIndex 定义第几列作为树结点展开列，默认为第一列 -->
    <t-enhanced-table
      ref="table"
      rowKey="key"
      :data="data"
      :columns="columns"
      :tree="{ childrenKey: 'list', treeNodeColumnIndex: 1 }"
      :pagination="pagination"
      @page-change="onPageChange"
    ></t-enhanced-table>

    <!-- 第二列展开树结点，缩进为 12px，示例代码有效，勿删 -->
    <!-- indent 定义缩进距离 -->
    <!-- 如果子结点字段不是 'children'，可以使用 childrenKey 定义字段别名，如 `:tree="{ childrenKey: 'list' }"` -->
    <!-- <t-enhanced-table
      ref="table"
      rowKey="key"
      :pagination="defaultPagination"
      :data="data"
      :columns="columns"
      :tree="{ indent: 12, childrenKey: 'list' }"
      @page-change="onPageChange"
    ></t-enhanced-table> -->
  </div>
</template>
<script lang="jsx">
import { EnhancedTable } from 'tdesign-vue';

function getData(currentPage = 1) {
  const data = [{}];
  const pageInfo = `第 ${currentPage} 页`;

  return data;
}

const data = getData();

export default {
  components: { TEnhancedTable: EnhancedTable },
  data() {
    return {
      data,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 100,
      },
      defaultPagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: 100,
      },
      columns: [
        {
          width: 220,
          colKey: 'name',
          title: '模块名称',
          ellipsis: true,
          cell: (h, { row }) => (
            <td class="func-name" style="width: 400px; ">
              <span style="margin-left: 30px;"></span>
              <span
                class="tree-icon fa fa-cube123"
                style="margin: 0px 5px;margin-left: 30px;"
              ></span>
              <img src="vteam/biz/iteration/img/mods.svg" class="icon-info" />
              <div class="func-name-title">A1</div>
              <span class="oper-container" style="display: none;">
                <i
                  class="fa fa-plus oper-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-container="body"
                  data-original-title="添加同级模块"
                ></i>
                <i
                  class="fa fa-plus-square-o oper-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-container="body"
                  data-original-title="添加子模块"
                ></i>
                <i
                  class="fa fa-edit oper-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-container="body"
                  data-original-title="编辑"
                ></i>
                <i
                  class="fa fa-arrows-v oper-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-container="body"
                  data-original-title="移动到..."
                ></i>
                <i
                  class="fa fa-remove oper-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-container="body"
                  data-original-title="删除"
                ></i>
              </span>
            </td>
          ),
        },
        {
          colKey: 'isOutputTitle',
          title: '特性',
        },
        {
          colKey: 'totalPlanDate',
          title: '总计划起止',
        },
        {
          colKey: 'totalMemberName',
          width: 280,
          title: '总负责人',
          align: 'center',
          // 增、删、改、查 等操作
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        },
      ],
    };
  },

  methods: {
    // 全新赋值
    setData1() {
      this.data = getData();
    },

    // 更新
    onEditClick(row) {
      const newData = {
        ...row,
        platform: 'New',
        type: 'Symbol',
        default: 'undefined',
      };
      this.$refs.table.setData(row.key, newData);
      this.$message.success('数据已更新');
    },

    // 删除
    onDeleteConfirm(row) {
      this.$refs.table.remove(row.key);
      this.$message.success('删除成功');
    },

    // 查看数据
    onLookUp(row) {
      const allRowData = this.$refs.table.getData(row.key);
      const message =
        '当前行全部数据，包含节点路径、父节点、子节点、是否展开、是否禁用等';
      this.$message.success(`打开控制台查看${message}`);
      console.log(`${message}：`, allRowData);
    },

    // 新增
    appendTo(row) {
      const randomKey =
        Math.round(Math.random() * Math.random() * 1000) + 10000;
      this.$refs.table.appendTo(row.key, {
        id: randomKey,
        key: `我是 ${randomKey} 号`,
        platform: '私有',
        type: 'Number',
      });
      this.$message.success(`已插入子节点我是 ${randomKey} 号，请展开查看`);
    },

    onPageChange(pageInfo) {
      this.pagination.current = pageInfo.current;
      this.pagination.pageSize = pageInfo.pageSize;
      this.data = getData(pageInfo.current);
    },
  },
};
</script>

<style>
.tdesign-table-demo__table-operations div {
  display: inline-block;
}
.tdesign-table-demo__table-operations .t-button {
  padding: 0 8px;
}
</style>
