<template>
  <div class="wrapper">
    <demo title="基础用法" :vertical="true">
      <div slot="demo">
        <c-form
          :cells="cells"
          ref="form">
          <p class="control" slot="footer">
            <button class="button is-primary" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click.prevent="submit">提交</button>
          </p>
        </c-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>表单的最简单用法。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/base'
  import message from 'components/message'

  export default {
    data () {
      return {
        code,
        isSubmitBtnDisabled: false,
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
            },
            validate: {
              required: {
                message: '请输入名称'
              },
              maxlength: {
                rule: 32,
                message: '名称不长于32个字符'
              }
            }
          },
          enable: {
            label: '启用标志',
            type: 'dropdown',
            extra: {
              options: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 2 }
              ]
            },
            validate: {
            }
          },
          logo_dentry_id: {
            label: 'logo',
            type: 'logouploader',
            validate: {
              required: {
                message: '请选择图片'
              }
            }
          },
          publish_time: {
            label: '发布时间',
            type: 'simpledatepicker',
            attrs: {
              placeholder: '发布时间'
            },
            validate: {
            }
          },
          description: {
            label: '描述',
            type: 'textarea',
            attrs: {
              placeholder: '值'
            },
            validate: {
              required: {
                message: '请输入值'
              },
              maxlength: {
                rule: 2048,
                message: '值不长于2048个字符'
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
<style>
</style>
