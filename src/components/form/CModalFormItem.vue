<template>
  <modal-form-item
    :table-init-data.sync="value"
    :table-params="extra && extra.tableParams"
    :form-params="extra && extra.formParams"
    @tabledatachange="handleChange">
  </modal-form-item>
</template>

<script>
  import mField from './mField'
  import modalFormItem from '../modal-form-item/index'

  export default {
    mixins: [mField],
    data () {
      return {}
    },
    methods: {
      getDefaultVal () {
        return []
      },
      handleChange (val) {
        this._validate()
      }
    },
    props: {
      initValue: {
        default () {
          return []
        }
      }
    },
    components: {
      modalFormItem
    }
  }
</script>