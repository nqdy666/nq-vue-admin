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
    { id: '1', text_str: '你好', text_num: 18, 'text_html': '1、很有趣<br/>2、很酷' },
    { id: '2', text_str: '你好', text_num: 100, 'text_html': '1、很有趣<br/>2、很酷' },
    { id: '3', text_str: '你好', text_num: 123, 'text_html': '1、很有趣<br/>2、很酷' },
    { id: '4', text_str: '你好', text_num: 3.1415926, 'text_html': '1、很有趣<br/>2、很酷' },
    { id: '5', text_str: '你好', text_num: 1000, 'text_html': '1、很有趣<br/>2、很酷' }
  ]

  export default {
    data () {
      return {
        columns: [
          { title: 'ID', width: '70', dataKey: 'id' },
          { title: '字符串', width: '160', dataKey: 'text_str' },
          { title: '数字', dataKey: 'text_num' },
          { title: 'html文本', html: true, dataKey: 'text_html' }
        ],
        datum: tableData
      }
    }
  }
</script>
`
export default code
