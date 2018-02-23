const code = `
// 自定义组件 TSTextField
<template>
  <input
    class="input"
    type="text"
    :field="field"
    v-model="value"
    v-bind="attrs"/>
</template>

<script>
  import mField from './mField'

  export default {
    mixins: [mField]
  }
</script>

// 注册组件，需要以't-search-'开头
Vue.component('t-search-textfield', TSTextField)

// 使用
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
