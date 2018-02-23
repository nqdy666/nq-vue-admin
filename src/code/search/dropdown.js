const code = `
<template>
 <div>
   <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
   <p>{{formRst}}</p>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        formRst: ''
      }
    },
    computed: {
      cells () {
        return {
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
