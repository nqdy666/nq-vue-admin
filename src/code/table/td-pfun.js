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
  import moment from 'moment'

  function transformBirthday (val) {
    return moment(val).format('YYYY-MM')
  }

  // 支持promise转换
  function transformDeskMate (val, rowData) {
    return new Promise(resolve => {
      setTimeout(() => { resolve(rowData.name + val) }, 1000)
    })
  }

  function transformAge (val, rowData) {
    return val + '岁'
  }

  function transformStatus (val, rowData) {
    return val ? 1 : 2
  }

  export default {
    data () {
      return {
        code,
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '100', dataKey: 'name' },
          { title: '年龄', minWidth: '30', dataKey: 'age', pFun: transformAge },
          { title: '同桌', minWidth: '50', dataKey: 'desk_mate', pFun: transformDeskMate },
          { title: '状态', minWidth: '80', dataKey: 'status', render: { type: 'checkbox' }, pFun: transformStatus },
          { title: '出生年月', width: '180', dataKey: 'birthday', pFun: transformBirthday }
        ],
        datum: [
          { id: '1', name: '秦', age: '18', 'desk_mate': 1, status: true, birthday: 1006161572000 },
          { id: '2', name: '赵', age: '18', 'desk_mate': 2, status: false, birthday: 1106381572000 },
          { id: '3', name: '王', age: '18', 'desk_mate': 3, status: true, birthday: 1206791572000 },
          { id: '4', name: '郑', age: '18', 'desk_mate': 4, status: false, birthday: 1306701572000 },
          { id: '5', name: '吴', age: '18', 'desk_mate': 5, status: true, birthday: 1406751572000 }
        ]
      }
    }
  }
`
export default code
