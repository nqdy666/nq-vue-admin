<template>
  <input
    class="input"
    type="text"
    :field="field"
    v-model="value"
    v-bind="attrs"
    debounce="100" />
</template>

<script>
  import mField from './mField'

  export default {
    mixins: [mField]
  }
</script>
