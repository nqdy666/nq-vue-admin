<template>
  <div class="wrapper">
    <demo title="分页" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
          id-key="id"
          :columns="columns"
          :fetch-api="queryDataList"
          :init-page-size="10"
          :show-page="true">
        </vue-table>
      </div>
      <div slot="desc">
        <p>从服务端获取数据并分页显示。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/page'
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        code,
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
<style>
</style>
