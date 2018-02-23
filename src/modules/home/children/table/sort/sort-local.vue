<template>
  <div class="wrapper">
    <demo title="排序-本地" :vertical="false">
      <div slot="demo">
        <vue-table ref="table"
           id-key="id"
           :columns="columns"
           :datum="datum"
           :show-page="false">
        </vue-table>
      </div>
      <div slot="desc">
        <p>本地排序。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/sort-local'

  const tableData = [
    { id: '1', name: '秦', age: 17 },
    { id: '2', name: '赵', age: 18 },
    { id: '3', name: '王', age: 25 },
    { id: '4', name: '郑', age: 20 },
    { id: '5', name: '吴', age: 21 }
  ]

  // 默认排序方式
  function sortMethod (a, b, type) {
    if (type === 'asc') {
      return a > b ? 1 : -1
    } else if (type === 'desc') {
      return a < b ? 1 : -1
    }
  }

  export default {
    data () {
      return {
        code,
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '100', dataKey: 'name' },
          { title: '年龄', minWidth: '50', dataKey: 'age', sortable: true, sortMethod }
        ],
        datum: tableData
      }
    }
  }
</script>
<style>
</style>
