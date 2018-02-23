<template>
  <div class="wrapper">
    <demo title="时间范围选择" :vertical="true">
      <div slot="demo">
        <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>时间范围选择。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/range-datepicker'

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
