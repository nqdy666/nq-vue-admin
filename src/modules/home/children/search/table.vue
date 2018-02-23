<template>
  <div class="wrapper">
    <demo title="搜索表单" :vertical="true">
      <div slot="demo">
        <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
        <vue-table ref="table"
           id-key="id"
           :columns="columns"
           :fetch-api="queryDataList"
           :init-page-size="pageSize">
        </vue-table>
      </div>
      <div slot="desc">
        <p>搜索表单在配合表格实现搜索功能。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/table'
  import { sGetDataList, sModifyData } from 'apis/demo'
  import { dateFormat } from 'utils/utilFunc'
  import message from 'components/message'

  export default {
    data () {
      return {
        code,
        pageSize: '10',
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '160', dataKey: 'name' },
          { title: '值', minWidth: '10', dataKey: 'value' },
          { title: '启用状态', minWidth: '100', dataKey: 'enable', render: { type: 'checkbox', action: this.handleEnableAction } },
          { title: '创建时间', width: '180', dataKey: 'create_time', pFun: dateFormat },
          { title: '描述', minWidth: '250', dataKey: 'description' },
          { title: '操作', width: '150' }
        ]
      }
    },
    computed: {
      cells () {
        return {
          name: {
            label: '名称',
            type: 'textfield',
            attrs: {
              placeholder: '名称'
            }
          },
          enable: {
            label: '状态',
            type: 'dropdown',
            attrs: {
              placeholder: '请选择状态'
            },
            extra: {
              options: [
                { label: '全部', value: '' },
                { label: '启用', value: 1 },
                { label: '禁用', value: 2 }
              ]
            }
          },
          create_time: {
            label: '创建时间',
            type: 'rangedatepicker',
            attrs: {
              startPlaceholder: '有效开始时间',
              endPlaceholder: '有效结束时间'
            }
          }
        }
      }
    },
    methods: {
      queryDataList ({ $offset, $limit } = {}) {
        return sGetDataList({
          $count: true,
          $offset: $offset || 0,
          $limit: $limit || 20,
          ...this.filterData
        })
      },
      handleEnableAction (actionName, rowData, rowIndex, checked) {
        sModifyData(rowData.id, {
          enable: checked ? 1 : 2
        }).catch(err => {
          message.info('设置失败' + err.message)
          rowData['enable'] = checked ? 2 : 1
        })
      },
      filterChange (data) {
        this.filterData = {
          ...data,
          begin_timestamp: data.create_time.startime,
          end_timestamp: data.create_time.endtime
        }
        this.$refs.table.clearAndRefresh()
      }
    },
    components: {
    }
  }
</script>
