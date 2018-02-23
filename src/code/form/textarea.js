const code = `
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
          textarea1: {
            label: '文本1',
            type: 'textarea',
            attrs: {
              placeholder: '请输入文本'
            },
            validate: {
              required: {
                message: '请输入文本'
              },
              maxlength: {
                rule: 256,
                message: '文本不长于256个字符'
              }
            }
          },
          textarea2: {
            label: '文本2',
            type: 'textarea',
            attrs: {
              placeholder: '请输入文本'
            },
            validate: {
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
