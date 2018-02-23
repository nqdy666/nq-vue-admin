const code = `
<template>
  <vue-table ref="table"
    id-key="id"
    :columns="columns"
    :fetch-api="queryDataList"
    :init-page-size="5"
    :show-page="true"
    @sort-change="handleSortChange">
  </vue-table>
</template>
<script>
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '100', dataKey: 'name' },
          { title: '值', dataKey: 'value', sortable: 'remote' }
        ]
      }
    },
    methods: {
      queryDataList ({ $offset, $limit } = {}) {
        return sGetDataList({
          order: this.orderType,
          $count: true,
          $offset: $offset || 0,
          $limit: $limit || 20
        })
      },
      handleSortChange (column, type) {
        if (column.dataKey === 'value') {
          this.orderType = type === 'asc' ? 'asc' : 'desc'
          this.$refs.table.loadData()
        }
      }
    }
  }
</script>
`
export default code
