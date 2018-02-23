<template>
  <radio
    :checked="value"
    :options="extra.options"
    :label-key="extra.labelKey"
    :value-key="extra.valueKey"
    @update="handleUpdate">
  </radio>
</template>

<script>
  import mField from './mField'
  import Radio from '../Radio'

  export default {
    mixins: [mField],

    methods: {
      handleUpdate (val) {
        this.value = val
      }
    },
    components: {
      Radio
    }
  }
</script>
