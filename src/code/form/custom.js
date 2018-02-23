const code = `
// 自定义组件 CCustomTextField
<template>
  <input
    class="input"
    type="text"
    :field="field"
    v-model="value"
    v-bind="attrs"
    debounce="100" />
</template>

<script>
  import mField from './mField'

  export default {
    mixins: [mField]
  }
</script>

// 注册组件，需要以'c-'开头
Vue.component('c-custom-textfield', CCustomTextField)

// 使用
<template>
   <c-form :cells="cells" ref="form" :init-data="initialData">
      <p class="control" slot="footer">
        <button class="button is-primary" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click.prevent="submit">提交</button>
      </p>
   </c-form>
   <p>{{formRst}}</p>
</template>

<script>
  import message from 'components/message'

  export default {
    data () {
      return {
        isSubmitBtnDisabled: false,
        initialData: {},
        formRst: ''
      }
    },
    computed: {
       cells () {
        return {
          text: {
            label: '自定义输入框',
            type: 'custom-textfield',
            attrs: {
              placeholder: '请输入文本'
            },
            validate: {
              required: {
                message: '请输入文本'
              },
              maxlength: {
                rule: 32,
                message: '名称不长于32个字符'
              }
            }
          }
        }
      }
    },
    methods: {
      submit () {
        this.isSubmitBtnDisabled = true
        let step = 'validate'
        this.$refs.form.validateAll().then(() => {
          step = 'getData'
          return this.$refs.form.defaultMutate()
        }).then(data => {
          this.formRst = JSON.stringify(data)
        }).catch(error => {
          if (step === 'validate') {
            message.info('校验不通过')
          } else if (step === 'getData') {
            message.info(error.message)
          }
        }).finally(() => {
          this.isSubmitBtnDisabled = false
        })
        return false
      }
    }
  }
</script>
`
export default code
