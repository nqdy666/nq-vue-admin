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
          radio1: {
            label: '单选框1',
            type: 'radio',
            attrs: {
              placeholder: '请选择'
            },
            extra: {
              options: [{ name: '西西里', label_id: '1' }, { name: '肖申克的救赎', label_id: '2' }, { name: '大话西游', label_id: '3' }],
              labelKey: 'name',
              valueKey: 'label_id'
            },
            validate: {
              required: {
                message: '请选择'
              }
            }
          },
          radio2: {
            label: '单选框2',
            type: 'radio',
            attrs: {
              placeholder: '请选择'
            },
            extra: {
              options: [{ name: '西西里', label_id: '1' }, { name: '肖申克的救赎', label_id: '2' }, { name: '大话西游', label_id: '3' }],
              labelKey: 'name',
              valueKey: 'label_id'
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
