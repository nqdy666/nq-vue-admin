const code = `
<template>
  <vue-table ref="table"
    id-key="id"
    :columns="columns"
    :fetch-api="queryDataList"
    :init-page-size="10"
    :show-page="true">
  </vue-table>
</template>

<script>
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', dataKey: 'name' }
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
      }
    }
  }
</script>
`
export default code
