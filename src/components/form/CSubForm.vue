<template>
  <div :class="className">
    <c-form
      :cells="cells"
      :init-data="initValue"
      :horizontal="extra && extra.horizontal"
      ref="form"
      @change="handleChange">
    </c-form>
  </div>
</template>

<script>
  import { isObjectEmpty } from 'utils/utilFunc'
  import mField from './mField'

  export default {
    mixins: [mField],
    data () {
      return {
        value: {}
      }
    },
    created () {
      this.customValidateValue = () => {
        // 如果必填，则校验，如果非必填且数据不为空，则校验
        const hasRequiredRule = this.validate && this.validate['required']
        if (hasRequiredRule) {
          return this.formValidate().then(() => {
            return this.formMutate({ validate: true })
          })
        }
        return this.formMutate({ validate: true }).then(res => {
          if (!isObjectEmpty(res)) {
            return this.formValidate().then(() => {
              return res
            })
          }
          return res
        })
      }
    },
    props: {
      initValue: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      cells () {
        return this.extra && this.extra.cells
      }
    },
    methods: {
      reset () {
        return this.$refs.form.reset()
      },
      formValidate () {
        return this.$refs.form.$validate()
      },
      mutate () {
        return this.formMutate()
      },
      formMutate (params) {
        return this.$refs.form.defaultMutate(params)
      },
      handleChange () {
        if (this.validate) {
          this.$parent.resetError()
          const hasRequiredRule = this.validate && this.validate['required']
          if (!hasRequiredRule) {
            this.formMutate({ validate: true }).then(res => {
              if (isObjectEmpty(res)) {
                this.$refs.form.$validation.errors = []
              }
            })
          }
        }
        this.$emit('change')
      }
    }
  }
</script>
