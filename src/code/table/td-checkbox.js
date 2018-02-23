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
    { id: '1', name: '开关1', switch: 1 },  // switch 1开，2关
    { id: '2', name: '开关2', switch: 2 },
    { id: '3', name: '开关3', switch: 2 },
    { id: '4', name: '开关4', switch: 1 },
    { id: '5', name: '开关5', switch: 1 }
  ]

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '30', dataKey: 'id' },
          { title: '名称', width: '100', dataKey: 'name' },
          { title: '开关状态', dataKey: 'switch', render: { type: 'checkbox', action: this.handleEnableAction } }
        ],
        datum: tableData
      }
    },
    methods: {
      handleEnableAction (actionName, rowData, rowIndex, checked) {
        if (checked && rowData.id === '2') {
          rowData['switch'] = 2
          alert(rowData.name + ' 开启失败')
        }
      }
    }
  }
</script>
`
export default code
