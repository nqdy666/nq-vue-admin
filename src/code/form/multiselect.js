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
          label1: {
            label: '多选1',
            type: 'multiselect',
            attrs: {
              placeholder: '请选择'
            },
            extra: {
              options: [{ name: '孙悟空', label_id: '1' }, { name: '猪八戒', label_id: '2' }, { name: '白龙马', label_id: '3' }],
              multiple: true,
              max: 2,
              key: 'label_id',
              customLabel: ({ label_id, name } = {}) => {
                return label_id ? name : ''
              }
            },
            validate: {
              required: {
                message: '请选择'
              }
            }
          },
          label2: {
            label: '多选2',
            type: 'multiselect',
            attrs: {
              placeholder: '请选择'
            },
            extra: {
              options: [{ name: '孙悟空', label_id: '1' }, { name: '猪八戒', label_id: '2' }, { name: '白龙马', label_id: '3' }],
              multiple: true,
              key: 'label_id',
              label: 'name'
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
