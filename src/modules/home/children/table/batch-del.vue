<template>
  <div class="wrapper">
    <demo title="批量删除" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
          id-key="id"
          :columns="columns"
          :fetch-api="queryDataList"
          :init-page-size="5"
          :show-page="true"
          :multiselect="true"
          :delete-api="delDataList"
          :allow-batch-del="true">
        </vue-table>
      </div>
      <div slot="desc">
        <p>批量删除。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/batch-del'
  import { sGetDataList, sDeleteData } from 'apis/demo'

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
      },
      delDataList (data) {
        return sDeleteData(data.id)
      }
    }
  }
</script>
<style>
</style>
