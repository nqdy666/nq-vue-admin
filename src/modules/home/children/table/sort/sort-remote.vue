<template>
  <div class="wrapper">
    <demo title="排序-云端" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
          id-key="id"
          :columns="columns"
          :fetch-api="queryDataList"
          :init-page-size="5"
          :show-page="true"
          @sort-change="handleSortChange">
        </vue-table>
      </div>
      <div slot="desc">
        <p>服务器排序。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/sort-remote'
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        code,
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
<style>
</style>
