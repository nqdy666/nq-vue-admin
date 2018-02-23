<template>
  <div class="wrapper">
    <demo title="数据来自云端" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
           id-key="id"
           :columns="columns"
           :fetch-api="queryDataList"
           :show-page="false">
        </vue-table>
      </div>
      <div slot="desc">
        <p>从服务端获取数据并渲染。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/fetch'
  import moment from 'moment'

  function transformBirthday (val) {
    return moment(val).format('YYYY-MM')
  }

  function transformDeskMate (val, rowData) {
    return new Promise(resolve => {
      setTimeout(() => { resolve(rowData.name + val) }, 1000)
    })
  }

  const tableData = [
    { id: '1', name: '秦', age: '18', 'desk_mate': 1, birthday: 1006161572000 },
    { id: '2', name: '赵', age: '18', 'desk_mate': 2, birthday: 1106381572000 },
    { id: '3', name: '王', age: '18', 'desk_mate': 3, birthday: 1206791572000 },
    { id: '4', name: '郑', age: '18', 'desk_mate': 4, birthday: 1306701572000 },
    { id: '5', name: '吴', age: '18', 'desk_mate': 5, birthday: 1406751572000 }
  ]

  export default {
    data () {
      return {
        code,
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '名称', width: '160', dataKey: 'name' },
          { title: '年龄', minWidth: '30', dataKey: 'age' },
          { title: '同桌', minWidth: '50', dataKey: 'desk_mate', pFun: transformDeskMate },
          { title: '出生年月', width: '180', dataKey: 'birthday', pFun: transformBirthday }
        ]
      }
    },
    methods: {
      queryDataList () {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ items: tableData, count: tableData.length })
          }, 500)
        })
      }
    }
  }
</script>
<style>
</style>
