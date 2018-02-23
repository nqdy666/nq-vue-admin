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
          dropdown1: {
            label: '下拉选项1',
            type: 'dropdown',
            extra: {
              options: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 }
              ]
            },
            validate: {
              required: {
                message: '请选择'
              }
            }
          },
          dropdown2: {
            label: '下拉选项2',
            type: 'dropdown',
            extra: {
              options: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 }
              ]
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
