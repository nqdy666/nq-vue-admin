<template>
  <div>
    <wangeditor @input="handleChange" :value="value" ref="editor"></wangeditor>
  </div>
</template>

<script>
  import mField from './mField'
  import Wangeditor from '../wangeditor'

  export default {
    mixins: [mField],
    data () {
      return {
        customValidateValue: ''
      }
    },
    created () {
      this.customValidateValue = this.value === this.attrs.placeholder ? '' : this.value
    },
    methods: {
      getDefaultVal () {
        if (!this.initValue) {
          return this.attrs.placeholder
        }
      },
      reset () {
        // 重置标志，用来消除重置导致的不必要校验
        this.isResetFlag = true
        // 还原原始数据
        this.customValidateValue = this.value === this.attrs.placeholder ? '' : this.value
        this.value = this.initValue || this.attrs.placeholder
        this.$refs.editor.reset()
      },
      handleChange (html, text) {
        if (!text && html.indexOf('<img') !== -1) {
          this.customValidateValue = html
        } else if (text) {
          this.customValidateValue = html
        } else {
          this.customValidateValue = text === this.attrs.placeholder ? '' : text
        }
        if (typeof this.customValidateValue === 'undefined') {
          this.customValidateValue = ''
        }
        this.value = html
      }
    },
    watch: {
      customValidateValue (val) {
        this._validate(val && val.length > 0)
      }
    },
    components: {
      Wangeditor
    }
  }

</script>
