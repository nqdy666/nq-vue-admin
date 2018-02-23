<template>
  <div class="wrapper">
    <demo title="输入框" :vertical="true">
      <div slot="demo">
        <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>输入框。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/textfield'

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
