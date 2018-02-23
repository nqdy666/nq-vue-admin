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
    { id: '1', name: '进度100', progress: 100 },
    { id: '2', name: '进度60', progress: 60 },
    { id: '3', name: '进度40', progress: 40 },
    { id: '4', name: '进度20', progress: 20 },
    { id: '5', name: '进度0', progress: 0 }
  ]

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '30', dataKey: 'id' },
          { title: 'JSX实现进度条', dataKey: 'progress', render: this.renderProgress }
        ],
        datum: tableData
      }
    },
    methods: {
      renderProgress (h, params) {
        const percent = params.data || 0
//        配合babel-plugin-transform-vue-jsx插件https://github.com/vuejs/babel-plugin-transform-vue-jsx，可以用以下写法代替
//        return (
//          <div class="progress-wrap"><progress class="progress is-primary" value={percent} max="100"></progress><span>{percent}%</span></div>
//        )
        return h('div', {
          class: { 'progress-wrap': true }
        }, [
          h('progress', {
            attrs: {
              max: 100,
              value: percent
            },
            class: {
              'progress': true,
              'is-danger': true
            }
          }),
          h('span', {}, percent + '%')
        ])
      }
    }
  }
</script>
<style lang="less">
  .progress-wrap {
    display: flex;
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
`
export default code
