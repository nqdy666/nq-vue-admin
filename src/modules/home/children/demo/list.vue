<template>
  <div class="wrapper">
    <div class="box">
      <h4 class="title is-4">DEMO数据</h4>
      <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
      <vue-table ref="table"
         id-key="id"
         :columns="columns"
         :item-actions="itemActions"
         :fetch-api="queryDataList"
         :delete-api="delDataList"
         :delete-label="deleteLabel"
         :init-page-size="pageSize"
         :multiselect="true"
         :allow-batch-del="true"
         @action="action"  >
        <router-link slot="top" class="button is-primary" :to="{ name: 'demo-add' }" exact>新增</router-link>
      </vue-table>
    </div>
  </div>
</template>

<script>
  import { sGetDataList, sDeleteData, sModifyData } from 'apis/demo'
  import { dateFormat, strEllipsisOver120 } from 'utils/utilFunc'
  import message from 'components/message'

  export default {
    data () {
      return {
        deleteLabel: '确定要删除此数据？',
        pageSize: '10',
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '160', dataKey: 'name' },
          { title: '值', minWidth: '10', dataKey: 'value', pFun: strEllipsisOver120 },
          { title: '进度条', minWidth: '100', dataKey: 'progress', render: 'progress' },
          { title: '启用状态', minWidth: '100', dataKey: 'enable', render: { type: 'checkbox', action: this.handleEnableAction } },
          { title: '创建时间', width: '180', dataKey: 'create_time', pFun: dateFormat },
          { title: '描述', minWidth: '250', dataKey: 'description', pFun: strEllipsisOver120 },
          { title: '操作', width: '150' }
        ],
        itemActions: [
          { name: 'edit-item', label: '编辑', class: 'button is-info mr5' },
          { name: 'del', label: '删除', class: 'button is-danger' }
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
      'action' (actionName, data) {
        switch (actionName) {
          case 'edit-item':
            this.$router.push({
              name: 'demo-edit',
              params: {
                id: data['id']
              }
            })
            break
          default:
            break
        }
      },
      queryDataList ({ $offset, $limit } = {}) {
        return sGetDataList({
          $count: true,
          $offset: $offset || 0,
          $limit: $limit || 20,
          ...this.filterData
        })
      },
      transformEnable (enable) {
        return enable === 1 ? '已启用' : '未启用'
      },
      handleEnableAction (actionName, rowData, rowIndex, checked) {
        sModifyData(rowData.id, {
          enable: checked ? 1 : 2
        }).catch(err => {
          message.info('设置失败' + err.message)
          rowData['enable'] = checked ? 2 : 1
        })
      },
      delDataList (data) {
        return sDeleteData(data.id)
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
<style>
</style>
