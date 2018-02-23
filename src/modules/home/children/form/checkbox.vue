<template>
  <div class="wrapper">
    <demo title="复选框" :vertical="true">
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
        <p>复选框。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/checkbox'
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
          checkbox1: {
            label: '复选框1',
            type: 'checkbox',
            attrs: {
              placeholder: '请勾选'
            },
            extra: {
              options: [{ name: '三字经', label_id: '1' }, { name: '百家姓', label_id: '2' }, { name: '道德经', label_id: '3' }],
              labelKey: 'name',
              valueKey: 'label_id'
            },
            validate: {
              required: {
                message: '请勾选'
              },
              maxlength: {
                rule: 2,
                message: '最多勾选两个'
              }
            }
          },
          checkbox2: {
            label: '复选框2',
            type: 'checkbox',
            attrs: {
              placeholder: '请勾选'
            },
            extra: {
              options: [{ name: '三字经', label_id: '1' }, { name: '百家姓', label_id: '2' }, { name: '道德经', label_id: '3' }],
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
<style>
</style>
