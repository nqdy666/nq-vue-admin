<template>
  <checkbox
    :checked="value"
    :options="extra.options"
    :label-key="extra.labelKey"
    :value-key="extra.valueKey"
    @update="handleUpdate">
  </checkbox>
</template>

<script>
  import mField from './mField'
  import Checkbox from '../Checkbox'

  export default {
    mixins: [mField],

    methods: {
      handleUpdate (val) {
        this.value = val
      }
    },
    components: {
      Checkbox
    }
  }
</script>
