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
          description: {
            label: '描述',
            type: 'textfield',
            attrs: {
              placeholder: '描述'
            },
            validate: {
            }
          },
          subform: {
            label: '第二层',
            type: 'subform',
            className: 'box',
            extra: {
              cells: {
                description: {
                  label: '描述',
                  type: 'textfield',
                  attrs: {
                    placeholder: '描述'
                  },
                  validate: {
                    required: {
                      message: '请输入描述'
                    }
                  }
                },
                subform: {
                  label: '第三层',
                  type: 'subform',
                  className: 'box',
                  extra: {
                    horizontal: true,  // 水平布局
                    cells: {
                      description: {
                        label: '描述',
                        type: 'textfield',
                        attrs: {
                          placeholder: '描述'
                        },
                        validate: {
                          maxlength: {
                            rule: 256,
                            message: '描述不长于256个字符'
                          }
                        }
                      }
                    }
                  },
                  validate: {
                  }
                }
              }
            },
            validate: {
              required: {
                message: '请输入描述'
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
