const code = `
<template>
  <vue-table ref="table"
     id-key="id"
     :columns="columns"
     :datum="datum"
     :show-page="false">
  </vue-table>
</template>
<script>
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
`
export default code
