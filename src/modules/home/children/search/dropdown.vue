<template>
  <div class="wrapper">
    <demo title="下拉选择" :vertical="true">
      <div slot="demo">
        <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>下拉选择。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/dropdown'

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
