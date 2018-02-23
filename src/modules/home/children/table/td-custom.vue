<template>
  <div class="wrapper">
    <demo title="单元格-自定义" :vertical="true">
      <div slot="demo">
        <vue-table ref="table"
           id-key="id"
           :columns="columns"
           :datum="datum"
           :show-page="false">
        </vue-table>
      </div>
      <div slot="desc">
        <p>表格单元格-自定义。这里以进度条的实现为例。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/table/td-custom'

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
        code,
        columns: [
          { title: 'ID', width: '30', dataKey: 'id' },
          { title: '自定义进度组件', dataKey: 'progress', render: { type: 'progress', max: 100, precision: 2 } }
        ],
        datum: tableData
      }
    }
  }
</script>
<style>
</style>
