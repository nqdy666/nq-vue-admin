<template>
  <div class="wrapper">
    <demo title="操作-删除" :vertical="true">
      <div slot="demo">
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
      </div>
      <div slot="desc">
        <p>删除操作。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/action-del'
  import { sGetDataList, sDeleteData } from 'apis/demo'

  export default {
    data () {
      return {
        code,
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
<style>
</style>
