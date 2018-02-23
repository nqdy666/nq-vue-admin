<template>
  <div class="wrapper">
    <demo title="操作" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
          id-key="id"
          :columns="columns"
          :fetch-api="queryDataList"
          :init-page-size="5"
          :show-page="true"
          :item-actions="itemActions"
           @action="action">
        </vue-table>
      </div>
      <div slot="desc">
        <p>放按钮的地方，自定义按钮触发动作。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/action'
  import { sGetDataList } from 'apis/demo'

  export default {
    data () {
      return {
        code,
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', dataKey: 'name' },
          { title: '操作', width: '150' }
        ],
        itemActions: [
          { name: 'edit-item', label: '编辑', class: 'button is-info mr5' },
          { name: 'action', label: '动作', class: 'button is-danger' }
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
      'action' (actionName, data) {
        switch (actionName) {
          case 'edit-item':
            alert('编辑' + data.name + '？')
            break
          case 'action':
            alert('功夫？')
            break
          default:
            break
        }
      }
    }
  }
</script>
<style>
</style>
