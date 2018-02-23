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
