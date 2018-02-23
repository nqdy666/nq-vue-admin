<template>
  <span v-if="isHtml" v-html="value"></span>
  <span v-else v-text="value"></span>
</template>
<script>
  import mField from './mField'

  export default {
    mixins: [mField],
    methods: {
      delayShowAsyncData () {
        return false
      }
    },
    computed: {
      isHtml () {
        return this.render.html
      }
    }
  }
</script>
