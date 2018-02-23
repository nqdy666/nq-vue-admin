const code = `
<template>
 <div>
   <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
   <p>{{formRst}}</p>
 </div>
</template>

<script>
  import code from 'code/search/form'

  export default {
    data () {
      return {
        code,
        formRst: ''
      }
    },
    computed: {
      cells () {
        return {
          name: {
            label: '名称',
            type: 'textfield',
            attrs: {
              placeholder: '名称'
            }
          },
          enable: {
            label: '状态',
            type: 'dropdown',
            attrs: {
              placeholder: '请选择状态'
            },
            extra: {
              options: [
                { label: '全部', value: '' },
                { label: '启用', value: 1 },
                { label: '禁用', value: 2 }
              ]
            }
          },
          range_time: {
            label: '创建时间',
            type: 'rangedatepicker',
            attrs: {
              startPlaceholder: '有效开始时间',
              endPlaceholder: '有效结束时间'
            }
          }
        }
      }
    },
    methods: {
      filterChange (data) {
        this.formRst = JSON.stringify(data)
      }
    },
    components: {
    }
  }
</script>
`
export default code
