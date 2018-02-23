const code = `
<template>
  <vue-table ref="table"
    id-key="id"
    :columns="columns"
    :fetch-api="queryDataList"
    :init-page-size="5"
    :show-page="true"
    :delete-api="delDataList"
    :delete-label="deleteLabel"
    :item-actions="itemActions">
  </vue-table>
</template>

<script>
  import { sGetDataList, sDeleteData } from 'apis/demo'

  export default {
    data () {
      return {
        deleteLabel: '确定要删除此数据？',
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', dataKey: 'name' },
          { title: '操作', width: '150' }
        ],
        itemActions: [
          { name: 'del', label: '删除', class: 'button is-danger' }
        ]
      }
    },
    methods: {
      queryDataList ({ $offset, $limit } = {}) {
        return sGetDataList({
          $count: true,
          $offset: $offset || 0,
          $limit: $limit || 20
        })
      },
      delDataList (data) {
        return sDeleteData(data.id)
      }
    }
  }
</script>
`
export default code
