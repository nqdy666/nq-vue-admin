<template>
  <div class="wrapper">
    <demo title="添加数组数据" :vertical="true">
      <div slot="demo">
        <c-form
          :cells="cells"
          :init-data="initialData"
          ref="form">
          <p class="control" slot="footer">
            <button class="button is-primary" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click.prevent="submit">提交</button>
          </p>
        </c-form>
        <p>{{formRst}}</p>
      </div>
      <div slot="desc">
        <p>添加数组数据。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/modalformitem'
  import message from 'components/message'

  export default {
    data () {
      return {
        code,
        isSubmitBtnDisabled: false,
        initialData: {},
        formRst: ''
      }
    },
    computed: {
      cells () {
        return {
          modalformitem: {
            label: '内容',
            type: 'modalformitem',
            extra: {
              tableParams: {
                idKey: 'id',
                columns: [
                  { title: '标题', width: '160', dataKey: 'title' }
                ]
              },
              formParams: {
                cells: {
                  title: {
                    label: '标题',
                    type: 'textfield',
                    attrs: {
                      placeholder: '标题'
                    },
                    validate: {
                      required: {
                        message: '请输入标题'
                      },
                      maxlength: {
                        rule: 64,
                        message: '名称不长于64个字符'
                      }
                    }
                  },
                  detail: {
                    label: '正文',
                    type: 'richtext',
                    attrs: {
                      placeholder: ''
                    },
                    validate: {
                      required: {
                        message: '请输入正文'
                      },
                      maxlength: {
                        rule: 65536,
                        message: '正文不长于65536个字符'
                      }
                    }
                  }
                },
                inFilter: data => {
                  return data
                },
                outFilter: data => {
                  return data
                }
              }
            },
            validate: {
              required: {
                message: '请增加内容项'
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
