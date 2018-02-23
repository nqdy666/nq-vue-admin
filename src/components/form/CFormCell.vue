<template>
  <div class="form-item-wrapper field">
    <div class="">
      <label class="label" v-if="model.label"><span v-if="isRequired" class="star">*</span>{{model.label}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <slot></slot>
        <span class="help is-danger" v-if="validationRst">{{validationRst.message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      field: {
        type: String,
        default: ''
      },
      model: {
        type: Object,
        default () {
          return {}
        }
      },
      value: {}
    },
    deactivated () {
      this.resetError()
    },
    computed: {
      isRequired () {
        const model = this.model
        return model.validate && model.validate.required
      },
      // 过滤出某个表单字段的报错信息
      validationRst () {
        let error
        if (this.$parentValidation && this.$parentValidation.errors) {
          if (this.$parentValidation.errors.length > 0) {
            error = this.$parentValidation.errors.filter(error => error.field === this.field)[0]
          }
        }
        return error
      }
    },
    methods: {
      resetError () {
        const error = this.$parentValidation.errors.filter(error => error.field === this.field)[0]
        const index = this.$parentValidation.errors.indexOf(error)
        if (error && index !== -1) {
          this.$parentValidation.errors.splice(index, 1)
        }
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="less">
  .star {
    margin-right: 2px;
    color: red;
  }
  .form-item-wrapper {
    margin-bottom: 10px !important;
    &.is-horizontal {
      .label {
        padding-top: 0.4rem;
        margin-right: 0.5rem;
      }
    }
    .label {
      margin-bottom: 3px
    }
  }
</style>
