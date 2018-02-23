const code = `
<template>
  <vue-table ref="table"
    id-key="id"
    :columns="columns"
    :fetch-api="queryDataList"
    :init-page-size="5"
    :show-page="true"
    :multiselect="true"
    @selectedupdate="handleSelectUpdate" >
  </vue-table>
  <p>{{JSON.stringify(tableSelected)}}</p>
</template>

<script>
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', dataKey: 'name' }
        ],
        tableSelected: []
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
      handleSelectUpdate (data) {
        this.tableSelected = data.map(item => { return { id: item.id, name: item.name } })
      }
    }
  }
</script>
`
export default code
