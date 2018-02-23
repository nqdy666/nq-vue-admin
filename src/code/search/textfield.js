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
          name: {
            label: '名称',
            type: 'textfield',
            attrs: {
              placeholder: '名称'
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
