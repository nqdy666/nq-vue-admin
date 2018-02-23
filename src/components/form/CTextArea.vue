<template>
  <textarea
    class="textarea"
    :field="field"
    v-model="value"
    v-bind="attrs"
    debounce="100">
  </textarea>
</template>

<script>
  import mField from './mField'

  export default {
    mixins: [mField]
  }
</script>
<style lang="less" scoped>
  .textarea {
    width:100%;
    height:80px;
  }
</style>