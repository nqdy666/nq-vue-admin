<template>
  <div class="wrapper">
    <breadcrumb :list="[ { label: 'DEMO数据', name: 'demo-list' }, { label: '添加' } ]"></breadcrumb>
    <div class="box mt10">
      <c-form
        :cells="cells"
        :init-data="initialData"
        ref="form">
        <p class="control" slot="footer">
          <button class="button is-primary" :class="{ 'is-disabled': isSubmitBtnDisabled }" @click.prevent="submit">提交</button>
          <button class="button is-link" @click.prevent="cancel">取消</button>
        </p>
      </c-form>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import breadcrumb from 'components/Breadcrumb'
  import { sAddData } from 'apis/demo'
  import message from 'components/message'

  export default {
    data () {
      return {
        isSubmitBtnDisabled: false,
        initialData: {}
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
          value: {
            label: '值',
            type: 'textfield',
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
          progress: {
            label: '进度值',
            type: 'textfield',
            attrs: {
              placeholder: '进度值'
            },
            validate: {
              min: {
                rule: 0,
                message: '请输入0-100的数字'
              },
              max: {
                rule: 100,
                message: '请输入0-100的数字'
              }
            }
          },
          logo_dentry_id: {
            label: 'logo',
            type: 'logouploader',
            validate: {
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
            type: 'textfield',
            attrs: {
              placeholder: '描述'
            },
            validate: {
              required: {
                message: '请输入描述'
              },
              maxlength: {
                rule: 256,
                message: '描述不长于256个字符'
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
          step = 'getDemo'
          return this.$refs.form.defaultMutate()
        }).then(data => {
          step = 'create'
          return sAddData(data)
        }).then(data => {
          this.$router.replace({ name: 'demo-list' })
        }).catch(error => {
          if (step === 'validate') {
            message.info('校验不通过')
          } else if (step === 'getDemo') {
            message.info(error.message)
          } else {
            message.info('新增失败：' + error.message)
          }
        }).finally(() => {
          this.isSubmitBtnDisabled = false
        })
        return false
      },
      cancel () {
        this.$router.replace({ name: 'demo-list' })
      }
    },
    components: {
      breadcrumb
    }
  }
</script>
