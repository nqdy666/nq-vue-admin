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
          range_time1: {
            label: '时间范围1',
            type: 'rangedatepicker',
            attrs: {
              placeholder: '请选择时间'
            },
            validate: {
              required: {
                message: '请选择时间'
              }
            }
          },
          range_time2: {
            label: '时间范围2',
            type: 'rangedatepicker',
            attrs: {
              placeholder: '请选择时间'
            },
            extra: {
              type: 'day', // 'min', 'multi-day'
              format: 'YYYY-MM-DD'
            },
            validate: {
              rangeTime: {
                message: '请选择起止时间'
              },
              minBeginTime: {
                rule: new Date().getTime(),
                message: '开始时间不能小于当前时间'
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
