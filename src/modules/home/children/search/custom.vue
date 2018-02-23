<template>
  <div class="wrapper">
    <demo title="自定义表单搜索组件" :vertical="true">
      <div slot="demo">
        <t-search-form :cells="cells"  @filterchange="filterChange"></t-search-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>自定义表单搜索组件。</p>
        <p>因为表单组件和表单搜索很类似，故已经注册到表单的组件可以在搜索组件直接使用，比如<code>multiselect</code>组件。</p>
        <p>也可以自定义表单搜索组件。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/search/custom'

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
              placeholder: '请输入名称'
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
