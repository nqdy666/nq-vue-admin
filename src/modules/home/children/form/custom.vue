<template>
  <div class="wrapper">
    <demo title="自定义表单组件" :vertical="true">
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
        <p>自定义表单组件，这里以自定义一个输入框表单组件为例。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/custom'
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
          text: {
            label: '自定义输入框',
            type: 'textfield',
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
<style>
</style>
