const code = `
// 自定义组件 TProgress2
<template>
  <div class="progress-wrap">
    <progress :max="max" :value="value" class="progress is-primary">{{value}}%</progress><span>{{progress}}%</span>
  </div>
</template>
<script>
  import mField from './mField'

  export default{
    mixins: [mField],
    computed: {
      max () {
        return this.render.max || 100
      },
      precision () {
        return this.render.precision || 0
      },
      progress () {
        return parseFloat((this.value / this.max * 100).toFixed(this.precision))
      }
    }
  }
</script>
<style lang="less" scoped>
  .progress-wrap {
    display: flex;
    margin-top: 8px;
    progress {
      margin-bottom: 0;
    }
    span {
      width: 65px;
      margin-left: 2px;
      display: inline-block;
      height: 12px;
      line-height: 12px;
    }
  }
</style>

// 注册组件，需要以't-'开头
Vue.component('t-progress2', TProgress2)

// 使用
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
        code,
        columns: [
          { title: 'ID', width: '30', dataKey: 'id' },
          { title: '自定义进度组件', dataKey: 'progress', render: { type: 'progress2', max: 100, precision: 2 } }
        ],
        datum: tableData
      }
    }
  }
</script>
`
export default code
