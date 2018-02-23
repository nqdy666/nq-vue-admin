<template>
  <div class="wrapper">
    <div class="box">
      <p class="title is-4">其他</p>
      <div>
        <p class="title is-5">属性</p>
        <vue-table
           id-key="id"
           :columns="propColumns"
           :datum="propDatum"
           :show-page="false">
        </vue-table>
      </div>
      <div>
        <p class="title is-5">方法</p>
        <vue-table ref="table"
           id-key="id"
           :columns="funColumns"
           :datum="funDatum"
           :show-page="false">
        </vue-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        propColumns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '属性名称', width: '160', dataKey: 'name' },
          { title: '描述', dataKey: 'desc' },
          { title: '默认值', width: '100', dataKey: 'defaultValue' }
        ],
        propDatum: [
          { id: '1', name: 'id-key', desc: '标识数组每一项唯一的属性名称', defaultValue: 'id' }
        ],
        funColumns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '方法名称', width: '160', dataKey: 'name' },
          { title: '描述', dataKey: 'desc' }
        ],
        funDatum: [
          { id: '1', name: 'loadData', desc: '加载数据，会触发重新渲染' },
          { id: '2', name: 'clearAndRefresh', desc: '清空状态并重新加载，会清空分页和排序状态' }
        ]
      }
    }
  }
</script>
<style>
</style>
