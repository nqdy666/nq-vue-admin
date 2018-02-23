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
    { id: '1', name: '进度0', progress: 10 },
    { id: '2', name: '进度条20', progress: 20.10000 },
    { id: '3', name: '进度条40', progress: 40.232 },
    { id: '4', name: '进度条60', progress: 60 },
    { id: '5', name: '进度条100', progress: 100 }
  ]

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '30', dataKey: 'id' },
          { title: '进度', dataKey: 'progress', render: { type: 'progress', max: 100, precision: 2 } }
        ],
        datum: tableData
      }
    }
  }
</script>
`
export default code
